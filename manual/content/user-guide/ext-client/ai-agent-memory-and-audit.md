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

The schema is built by one chain of SQL migrations for each part (`schema-log`, `memory`, `audit`)
and database: `migrations/<db>/<part>/001_<name>.sql`, `002_...`, and so on. A new database runs
every migration; an existing one runs those after the version recorded in its `SCHEMA_LOG` table.
Installation and upgrade follow the same path.

With `eximeebpms.connectors.aiagent.jdbc.schema-update=true` (the default) the worker runs the
pending migrations at startup. If a migration stops half-way, the next start continues after the
last statement recorded. A table or index that already exists is skipped only when it has the
columns the migration creates; otherwise the worker stops and names the object to fix or drop.

### Applying the schema by hand

When the database administrator applies schema changes, set `schema-update=false`. The worker then
changes nothing and, at startup, names the migrations that are still missing. The JDBC module is
released with an archive of the same scripts, `eximeebpms-ai-agent-jdbc-<version>-sql-scripts.zip`:

- `default/` has the default table prefix `EXB_AGENT_` written in and runs as it is;
- `template/` keeps `${prefix}`, to be replaced with the configured
  `eximeebpms.connectors.aiagent.jdbc.table-prefix`;
- `drop/` removes a part's tables and is never run by the worker.

Run the `schema-log` migrations after its recorded version first, then those of each enabled
feature, in order. Each migration records its own version as its last statement.

Schema leases and the cleanup claim use the database clock in UTC, whatever the session's time zone. For transactional DDL, the statement and progress record commit
together. For databases that auto-commit DDL, progress is recorded before checking the lease again;
recovery messages identify the progress record if a process stops between DDL and recording it.

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
The first 100 distinct model names per worker get individual `model` tag values; subsequent names
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
