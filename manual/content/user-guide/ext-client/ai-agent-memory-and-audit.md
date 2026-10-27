---
title: 'AI Agent Memory and Audit'
weight: 310
menu:
  main:
    name: "AI Agent Memory and Audit"
    identifier: "external-task-client-ai-agent-memory-audit"
    parent: "external-task-client"
---

{{< note title="Enterprise Edition only" class="warning" >}}
The AI agent worker is part of EximeeBPMS Enterprise Connectors, released separately from the engine.
This page describes the unreleased agent/JDBC work. It requires an engine with worker-driven ad-hoc subprocesses.
{{< /note >}}

The agent runs outside the engine. It receives decision turns from an ad-hoc subprocess, calls a model,
and activates the BPMN tools the model requests. A tool can wait for a person in Tasklist. The model's
conversation and audit are worker data; the engine separately records process execution and turn history.

## Enable JDBC storage

Enable the feature on the worker and choose JDBC in the agent's BPMN input:

```yaml
eximeebpms:
  connectors:
    aiagent:
      memory:
        jdbc:
          enabled: true
          retention: 30d
      audit:
        enabled: true
        content-level: metadata
        retention: 90d
      jdbc:
        schema-update: true
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/agentdemo
    username: ${AGENT_DB_USER}
    password: ${AGENT_DB_PASSWORD}
```

Set the agent input `memory.storage` to `jdbc`. Only the conversation id and version are kept in
`agentContext`; message bodies stay in the worker's database. H2, PostgreSQL, MySQL/MariaDB, SQL Server,
Oracle and DB2 have schema scripts. The bundle ships PostgreSQL, MariaDB, SQL Server, Oracle and H2
drivers; other drivers must be provided by the deployment. In-memory storage requires the explicit
`eximeebpms.connectors.aiagent.jdbc.allow-in-memory-database=true` opt-in.

With JDBC features disabled and no explicit data source, the bundle creates no H2 pool. Keeping a
worker's JDBC data source persistent is necessary to preserve conversations across worker restarts.

## Completion and retention

A turn writes an immutable conversation version before it completes its engine task. A completion
callback marks the version accepted. If the completion outcome is unknown, the version remains:
the engine might already reference it. A later accepted conversation alone is not proof that the
unknown version is abandoned. Definitive failed completions can remove their unaccepted versions;
retention removes conversations only after engine history confirms that their process has ended.

The worker account needs access to the relevant process instances, variables and history. An instance
that the worker cannot see is not treated as ended. An active `toolCall` without a readable call id is
an engine-read failure, not evidence that its tool was cancelled, when the worker activated its flow;
a flow started on entry, through the API or by process instance modification is not a model's call.

## Schema updates

Each conversation stores links to every source process whose conversation state it copied. Surviving
copies retain those links after retention removes an original or intermediate conversation, so an
erasure still finds them.

The agent uses a private Flyway runtime, isolated from an embedded application's
own Flyway or Liquibase. One ordered SQL chain creates the complete memory and
audit schema when either JDBC feature is enabled. Disabled features leave their
tables unused. Migration history is `<prefix>FLYWAY`; the default prefix is
`EXB_AGENT_`. Configured prefixes are normalized to uppercase. For custom-prefix
manual SQL and teardown scripts, replace `${prefix}` with that uppercase form
(for example, configuration `customer_` means SQL prefix `CUSTOMER_`), including
quoted history-table names. There is no separate manual history or custom SQL migration engine.

With `eximeebpms.connectors.aiagent.jdbc.schema-update=true` (default), pending
migrations run before workers start. With `false`, startup validates without
creating or changing the schema or history. Missing, pending, failed or changed
migrations stop startup. A successful newer schema remains usable by an older
worker if its compatibility record permits that worker. Failed newer migrations
also stop older workers. Expand/contract changes require two releases; migration
validation cannot protect workers already running against a destructive change.

Flyway manages database-specific locks; no custom lease or takeover is used, and
the unreleased `schema-lock-timeout` property has been removed. A worker or the
tool waits for another instance's migration without a time limit, so a long
migration never stops healthy instances: PostgreSQL (advisory lock, retried every
second), MySQL/MariaDB (named lock), Oracle and DB2 (`LOCK TABLE` on the history)
wait until the holder finishes; SQL Server's application lock gives up after one
hour, a limit Flyway sets. Startup logs `migrating JDBC schema <prefix>FLYWAY`
before it waits; an operator may stop the process and investigate the holder.
The history always starts with a version-0 baseline row (`<< Flyway Baseline >>`),
recorded before the first migration; `info` lists it. Instances starting together
on a new prefix record it first and then migrate one at a time; on H2, which runs in
one process, the instances of that process take turns. Several processes sharing
one H2 database in server mode are not supported for a concurrent first start. A migrating start holds two connections at once on
PostgreSQL, Oracle, DB2 and H2 (lock and migration): give its pool at least two.

### Administrator tool

Use `eximeebpms-agent-schema-tool-<version>.jar`, or run the bundle image with
`schema` followed by the same arguments. Command mode starts no Spring context,
workers, engine clients or model connections, and exits after the operation.

```sh
java -jar eximeebpms-agent-schema-tool-<version>.jar --help
java -jar eximeebpms-agent-schema-tool-<version>.jar info --config /secure/agent-db.properties
java -jar eximeebpms-agent-schema-tool-<version>.jar migrate --config /secure/agent-db.properties
java -jar eximeebpms-agent-schema-tool-<version>.jar validate --config /secure/agent-db.properties

docker run --rm -v /secure/agent-db.properties:/run/agent-db.properties:ro <bundle-image> schema info --config /run/agent-db.properties
```

The bundle image runs as user `eximeebpms`: make the mounted file readable by that
user, or pass the `EXIMEEBPMS_SCHEMA_*` variables from a secret or an env file.

The Java properties file contains `url`, `user`, `password`, and optionally
`table-prefix`. Protect it as a credential file. Environment variables
`EXIMEEBPMS_SCHEMA_URL`, `EXIMEEBPMS_SCHEMA_USER`, `EXIMEEBPMS_SCHEMA_PASSWORD`,
and `EXIMEEBPMS_SCHEMA_PREFIX` override corresponding file values. These are
command settings; worker deployment continues to use `spring.datasource.*` and
`eximeebpms.connectors.aiagent.jdbc.*`. Do not put credentials in command-line
arguments. Use a migration account for DDL; the normal worker can use an account
without DDL or history-write permissions when automatic migration is disabled.
Validation requires SELECT on every agent table, including disabled features,
plus the Flyway history and coordination tables. Grant data-write permissions
for the enabled features and their process guards/cleanup coordination. Exit codes are 0 for success, 2 for invalid command/configuration, and 1
for a database or schema validation failure. The result goes to stdout; the bundle's `schema` mode logs
to stderr at INFO.

The JAR and image include PostgreSQL, MariaDB (also used for MySQL), SQL Server,
Oracle and H2 drivers. They do not include IBM's DB2 driver or MySQL Connector/J.
For DB2, supply a licensed JDBC driver to the standalone tool, for example
`java -Dloader.path=/drivers/jcc.jar -jar eximeebpms-agent-schema-tool-<version>.jar info --config /secure/agent-db.properties`.
An embedded application supplies its own DataSource and driver. Use `jdbc:mariadb:`
for MySQL with the shipped MariaDB driver.

### Applying SQL manually

1. Set worker `schema-update=false` and stop every worker using this agent schema.
   Keep workers and other administrators stopped through registration/validation.
2. Use the tool from the target release to inspect `info` and the current version
   (zero for a new installation). Obtain the matching
   `eximeebpms-ai-agent-jdbc-<version>-sql-scripts.zip`.
3. Apply every pending SQL migration up to the latest migration of the release
   whose tool you use, in order; `validate` with that tool fails while any of its
   migrations is pending. The ZIP
   contains `default/migrations/<db>/V<N>__<name>.sql` with `EXB_AGENT_` substituted,
   and `template/` with `${prefix}` for a custom prefix. Databases are `h2`,
   `postgres`, `mysql` (including MariaDB), `mssql`, `oracle`, `db2`. Stop on any
   error and inspect the result. Scripts do not write Flyway history themselves.
4. Only after all SQL succeeded, register that exact range, for example:

   ```sh
   java -jar eximeebpms-agent-schema-tool-<version>.jar register-applied --from 0 --to 1 --confirm --config /secure/agent-db.properties
   ```

   `--from` must match the current successful version; `--to` must be known to
   this tool. The command records the range through Flyway without running its
   SQL. For a first manual installation it initializes history at version zero
   before registration. Confirmation is the administrator's assertion of SQL
   success, not a check of arbitrary SQL/data effects. Unexpected versions, gaps,
   failed history and checksum mismatches are rejected. Never insert history rows
   manually or use baseline to hide real migrations.
5. Run `validate` with the target release's tool; start workers only after it
   succeeds. A later deployment may switch back to automatic migration using the
   same Flyway history. Repeating registration with the old `--from` is rejected.

### Failure recovery

A failed migration is named by version, script and the line of its failing statement,
never by its SQL, for example `migration 1 (V1__agent_schema.sql), line 42`.
Migration failure stops startup; no automatic `repair`, table-existence skipping
or per-statement resume occurs. Databases which auto-commit DDL can retain a
partial migration. Transactional behavior must be checked for the actual dialect.
Stop workers, inspect `info`, and restore or complete the affected SQL under the
normal backup/change procedure. Use the matching release's migration tool.

`repair --confirm` is an explicit administrator operation after inspection. It
repairs Flyway history (including removing failed records and potentially aligning
checksums); it does not undo SQL or prove that the database is correct. Do not
silence an unexplained checksum mismatch with repair. After recovery, migrate or
register the completed SQL as appropriate, then validate before starting workers.
The tool exposes no `clean` command. The ZIP's `drop/<db>.sql` script is a
destructive teardown, never an upgrade/recovery shortcut: it removes the complete
agent schema, memory and audit data included, and the Flyway history last. There is
no partial teardown, as the history records one schema.

### Connection failures

The agent and the administrator tool never repeat a JDBC driver's message, which
can contain the JDBC URL or credentials. A failure names the SQL state, the vendor
error code and the exception class instead, for example
`The AI agent cannot reach its JDBC data source (SQL state 28P01, error code 0, org.postgresql.util.PSQLException)`.
Common cases, as reported by the drivers the bundle ships (MySQL through the MariaDB
driver) and, for DB2, by the IBM JCC driver the operator supplies:

| Database | Wrong user or password | Unknown database or service | Port closed | Unknown host |
| --- | --- | --- | --- | --- |
| PostgreSQL | `28P01`, 0 | `3D000`, 0 | `08001`, 0 | `08001`, 0 |
| MySQL, MariaDB | `28000`, 1045 | `42000`, 1049 | `08000`, 0 | `08000`, 0 |
| SQL Server | `S0001`, 18456 | `S0001`, 4060 | `08S01`, 0 | `08S01`, 0 |
| Oracle | `72000`, 1017 (ORA-01017) | `08006`, 12514 (ORA-12514) | `66000`, 12541 (ORA-12541) | `22000`, 17868 |
| DB2 | `28000`, -4214 | `08004`, -4499 | `08001`, -4499 | `08001`, -4222 |
| H2 | `28000`, 28000 | — | — | — |

Where a closed port and an unknown host report the same values, check name
resolution and reachability from the worker's host. A TLS failure reports a
connection state as well (PostgreSQL `08004` when the server does not offer TLS,
SQL Server `08S01` for an untrusted certificate). The full driver message remains
available where the driver or the application's connection pool logs it; for
example the MariaDB driver logs access-denied and unknown-database errors at WARN.

## Erase worker data

The erasure service deletes the conversations of the requested process instances, their copied
conversations at any depth, and their audit records. Shared process locks and erasure tombstones
prevent a turn already waiting on a model from later recreating erased conversation or audit content.
Tombstones retain engine process ids, not conversation content. To erase called process instances,
include their process ids as well. Engine history must be deleted separately through engine APIs.

### Erasure tombstones

A process instance can keep running after its agent data is erased, and a turn may be calling the
model at that moment. Without a tombstone, that turn (or its retry) would write the conversation and
audit records back. Every write checks the tombstone first and stores nothing for an erased process
instance.

The cleanup removes a tombstone once engine history shows that the process instance ended longer
than `memory.jdbc.retention` ago. Without that proof (history level `none`, history already removed,
an instance hidden from the worker's account, or audit enabled without JDBC memory) tombstones are
kept indefinitely. To limit how long they are kept, set:

```yaml
eximeebpms:
  connectors:
    aiagent:
      jdbc:
        erased-mark-retention: 365d
```

The retention counts from the latest erasure of the process instance (erasing it again restarts it)
and is unset by default. Set it longer than any process instance with an agent runs: once the
tombstone is gone, a process instance that is still running may store new agent data again. Erased
data is never restored.

The HTTP endpoint is **disabled by default**, and a global
`management.endpoints.access.default` does not enable it. To enable it, set both:

```properties
management.endpoint.aiagentdata.access=unrestricted
management.endpoints.web.exposure.include=health,info,prometheus,aiagentdata
```

Then `POST /actuator/aiagentdata` with a JSON body such as:

```json
{"processInstanceIds":"process-id-1,process-id-2"}
```

Empty ids are HTTP 400. Repeating an erasure is harmless. The bundle provides no authentication:
protect access at deployment level before exposing this endpoint. A broad
`management.endpoints.access.default=unrestricted` can also enable it when it is exposed, so review
global Actuator access settings as well as the endpoint-specific setting.

## Audit and metrics

Metadata is the default audit content level. `content` additionally stores bounded prompt, tool and
model content; these can contain personal data. An individual agent may lower the worker's configured
level, never raise it. Invalid `audit.content-level` configuration fails during property binding.
The audit records early turn failures too, including invalid storage/context settings. Late callbacks
for an erased or removed turn do not recreate audit items. Metadata names are bounded in UTF-8 bytes
so they fit database limits, including DB2.

Metrics `eximeebpms.connectors.aiagent.model.calls` and `.tokens` include failed model attempts.
The first 100 distinct model names per connector (the AI agent, the AI task) get individual `model` tag values; subsequent names
use `other` to limit metric cardinality. The audit retains the actual model name. Configure a fixed
model or a named provider when possible. Prometheus values count usage; they do not calculate billing.

## Events and cancelled tools

`events=waitForToolCallResults` waits for pending results before passing an event to the model.
`interruptToolCalls` answers pending calls as cancelled and permits an immediate model response.
When process instance modification cancels a tool flow, the engine schedules a new worker turn,
including for a single waiting user task. Cancellation appends no tool result and does not evaluate
the modelled completion condition; the worker detects which call was cancelled through engine REST.

An alternative OpenAI-compatible endpoint must also accept event conversations with a user message
following tool results. OpenAI/Anthropic implementations do not imply compatibility with every other
provider's message-ordering rules; verify that endpoint before enabling event flows.

The agent's optional `engine-rest.base-url` override inherits client credentials/interceptors only
for the same origin. For a different scheme, host or port, configure credentials explicitly. A password
without a username fails configuration. This prevents a URL override from forwarding engine credentials
to a different service.
