---

title: "EximeeBPMS 1.4.x Enterprise Edition Release Notes"
weight: 1

menu:
  main:
    name: "1.4.x EE"
    identifier: "release-notes-1.4-ee"
    parent: "release-notes"

---

**Edition:** Enterprise &nbsp;|&nbsp; **Baseline:** [EximeeBPMS 1.4.0 CE]({{< ref "/release-notes/release-notes-1.4.0.md" >}})

---

## 1.4.2-ee {#142-ee}

**Release date:** 05.10.2026

The second Enterprise patch on the 1.4.0 baseline. Everything in [1.4.1-ee](#141-ee) applies; this section lists what 1.4.2-ee adds or changes on top of it.

### Highlights

- **[Business events on SQL Server no longer lock the outbox table](#business-events-sql-server-locking)**, which stalled every engine operation that writes a business event
- **[Business events are published on Oracle](#business-events-oracle)**. Before this release the dispatcher published nothing there
- **[The dispatcher commits each batch on its own](#dispatcher-per-batch)**, so a large backlog no longer risks the heap, and an `Error` no longer stops it until restart
- **[Query expressions can be kept away from beans](#query-expressions-without-beans)** with the new `enableBeansInQueryExpressions` setting
- **[Schema patch](#142-schema)**: two new indexes. Liquibase applies them; read this if you apply the scripts by hand
- **[Security](#142-security)**: FreeMarker (EXBPMS-15) and Jackson (EXBPMS-16) are patched, and the Spring Boot starter and Run now get the patched Jackson too

### New Features

#### Restricting Query Expressions to Built-in Functions {#query-expressions-without-beans}

A saved filter stores its query, expressions included, and the engine evaluates them for everyone who runs the filter. In a Spring application, such an expression can by default reach every bean in the application context by name. The new process-engine setting `enableBeansInQueryExpressions` closes that path. Set it to `false` and query expressions keep the built-in functions, such as `currentUser()`, `currentUserGroups()` and `dateTime()`, but resolve no beans. Script Guard still applies.

The default is `true`, which keeps the previous behavior. Turning it off breaks any filter that legitimately calls a bean: such an expression then fails with `Unable to resolve expression`.

→ [Securing Custom Code — Queries]({{< ref "/user-guide/process-engine/securing-custom-code.md" >}}#queries)
→ [Security — Limit the beans an expression can reach]({{< ref "/user-guide/security.md" >}}#limit-the-beans-an-expression-can-reach)

#### Measuring the Outbox Backlog Cheaply

`BusinessEventService#getOutboxBacklog()` returns the creation time of the oldest undelivered event and an upper-bound estimate of how many are pending. It reads only the two ends of the outbox's id index, so unlike `unprocessed().count()` its cost does not grow with the backlog. Use it to poll the backlog in monitoring.

→ [Business Events — Querying the Outbox]({{< ref "/user-guide/process-engine/business-events.md" >}}#querying-the-outbox)

#### Business-Event Dispatch Listeners

The new `BusinessEventDispatchListener` SPI reports every publish attempt and every dispatcher batch: the outcome, the number of records dispatched, and the time spent in the publisher and in the database. Spring Boot registers listener beans automatically. A failing listener is logged as `ENGINE-00021` and never affects dispatching.

{{< note title="Monitoring extension" class="info" >}}
The Micrometer meters built on this SPI, and the outbox backlog gauges built on `getOutboxBacklog()`, are not yet part of the monitoring extension release that 1.4.2-ee ships with (1.12.0-ee). See [Application Monitoring]({{< ref "/user-guide/process-engine/application-monitoring.md" >}}#business-events-dispatcher).
{{< /note >}}

#### Fetch-and-Lock Diagnostic Logs

When the long-polling fetch-and-lock handler rejects requests with "too many requests", it now logs why. `ENGINE-REST-FAL001` summarizes the queued requests by worker, timeout and topic, and `ENGINE-REST-FAL002` reports acquisition cycles longer than one second. Each is logged at most once per interval, set with the new `fetch-and-lock-diagnostic-log-interval` parameter (seconds, default `60`; Spring Boot: `eximeebpms.bpm.rest-api.fetch-and-lock.diagnostic-log-interval`). Which requests are rejected is unchanged.

→ [External Tasks — Diagnostic Logs]({{< ref "/user-guide/process-engine/external-tasks.md" >}}#diagnostic-logs)

#### EximeeBPMS Extension Namespaces

Process and decision definitions may declare extensions in EximeeBPMS' own namespaces, `http://eximeebpms.org/schema/1.0/bpmn` and `http://eximeebpms.org/schema/1.0/dmn`, as well as in Camunda's. Both are read the same way, even mixed in one document. Definitions are still written with the Camunda namespace, so files stay readable by Camunda tooling. Existing definitions need no change.

### Database Schema Update {#142-schema}

1.4.2-ee adds two indexes, so that deletes no longer scan the table:

- on `ACT_RU_BUS_EVT_OBX.TASK_ID_`, used when a standalone task's events are deleted;
- on `ACT_RU_SCRIPT_VIOLATION.TIMESTAMP_`, used by the violation cleanup.

On MySQL and MariaDB, the same patch also changes `ACT_RU_SCRIPT_VIOLATION.TIMESTAMP_` from `timestamp(3)` to `datetime(3)` on schemas that were upgraded, so that it matches a fresh schema.

Liquibase applies the patch. If you apply the scripts by hand, run `$DATABASENAME_engine_1.4_patch_1.4.1_to_1.4.2_1.sql` and `…_2.sql`, and skip a script whose table does not exist: the engine creates `ACT_RU_BUS_EVT_OBX` only with business events enabled, and `ACT_RU_SCRIPT_VIOLATION` only when Script Guard is not disabled. Take a backup before running them.

{{< note title="Schemas installed from the SQL distribution, 1.2.19-ee to 1.4.1-ee" class="warning" >}}
The engine create script in `eximeebpms-sql-scripts` of these versions does not create `ACT_RU_SCRIPT_VIOLATION`. In Script Guard's `AUDIT` mode, an operation whose script triggers a rule then fails instead of recording the violation. Start the engine once with `databaseSchemaUpdate=true` to create the table. The 1.4.2-ee scripts include it again.
{{< /note >}}

→ [Database Schema]({{< ref "/user-guide/process-engine/database/database-schema.md" >}})

### Behavior Changes

- **Outbox and violation cleanups delete in chunks.** Each run of the business-event outbox cleanup and of the script-violation cleanup deletes at most 1,000 rows and reschedules itself immediately while rows remain. One unbounded `DELETE` locked the whole table on SQL Server. → [Business Events — Configuration]({{< ref "/user-guide/process-engine/business-events.md" >}}#configuration)
- **`dispatcher-batch-size` is also the transaction size.** The dispatcher still reads the outbox until it is empty, but now commits after every batch. An aborted cycle redelivers at most one batch.
- **Generated BPMN XML uses the `camunda` prefix.** XML produced by `Bpmn.createProcess()` and the fluent builder declares `xmlns:camunda` and writes `camunda:`-prefixed extension attributes, instead of binding the `eximeebpms` prefix to the Camunda namespace URI. The parsed model is unchanged; only code that compares generated XML as text is affected.
- **`eximeebpms-test-utils-testcontainers` relies on the built-in Testcontainers providers.** It no longer ships its own container providers or `testcontainers.properties`. Test JDBC URLs change from `jdbc:tc:campostgresql:`, `jdbc:tc:cammysql:` and `jdbc:tc:camsqlserver:` to the standard `jdbc:tc:postgresql:`, `jdbc:tc:mysql:` and `jdbc:tc:sqlserver:`.

### Bug Fixes

#### Business Events on SQL Server Locked the Outbox Table {#business-events-sql-server-locking}

On SQL Server, the business-event dispatcher and the outbox cleanup took a lock on the whole outbox table. Every engine operation that writes a business event, jobs included, waited behind it. The dispatcher now reads through the index of undelivered rows, and the cleanup deletes in chunks (see [Behavior Changes](#behavior-changes)).

#### Business Events Were Never Published on Oracle {#business-events-oracle}

On Oracle, the dispatcher's fetch failed on every cycle with `ORA-02014`, because Oracle rejects `FOR UPDATE` on the view its paging builds. Nothing was published. Oracle now has its own statement, which locks only the batch.

#### The Dispatcher Held a Whole Drain in One Transaction {#dispatcher-per-batch}

The dispatcher read and published the entire outbox in one transaction, so a large backlog could exhaust the heap. Each batch now commits on its own. An `Error` thrown while dispatching no longer stops the dispatcher until restart.

#### Other Fixes

- **External tasks:** an `Error` in the long-polling fetch-and-lock handler stopped it for good, and every later `fetchAndLock` with `asyncResponseTimeout` failed with HTTP 500 "too many requests" until restart. The handler now logs the error and keeps running.
- **SQL Server and MySQL/MariaDB:** the dispatcher skipped its cycle whenever an engine transaction had just written an event, which delayed delivery under load. It now takes the events before the uncommitted one and never skips an event.
- **MariaDB and DB2:** a dispatcher that lost the lock to another node logged an unexpected error on every collision. The lock errors are now recognised and the cycle is skipped quietly.
- **Oracle:** a dispatcher stopped in the middle of a batch rolled the batch back and closed its database connection. The batch now commits before the dispatcher stops.
- **DB2:** `BusinessEventService.createBusinessEventOutboxQuery()` failed with `SQLCODE=-134`. It no longer selects `DISTINCT` over the payload.
- **Oracle:** once script security had written its configuration, every command after the first failed with a `NullPointerException`. An empty property value, which Oracle stores as NULL, is now handled.
- **Oracle and DB2, upgrade from 1.3:** the 1.3 → 1.4 upgrade scripts failed on both databases (`ORA-03076` on Oracle, `SQL0104N` on DB2) in the business-event table and index definitions. Both are fixed. The scripts are not idempotent: if you already ran a failed upgrade, account for the objects it created before you run it again.
- **Liquibase on MariaDB:** the changelog named its scripts for MySQL only, so every changeset failed validation on MariaDB. MariaDB now uses the MySQL scripts.

### Technical Updates

#### Dependency Updates

Relative to 1.4.1-ee:

- Jackson 2.22.3 (from 2.22.1). The Spring Boot starter and EximeeBPMS Run now get it too; they previously resolved Jackson 2.21.5 through Spring Boot's dependency management. Jackson 3 (`tools.jackson`) 3.1.7 (from 3.1.5) in the same two distributions
- Apache FreeMarker 2.3.35 (from 2.3.31)
- MariaDB Connector/J 3.5.10 (from 3.5.7)
- Apache HttpCore 5 5.4.4 (from 5.4.3)
- In the web applications: lodash 4.18.1 (from 4.17.21), preact 10.29.8 (from 10.26.8) and qs 6.16.0 (from 6.15.3)
- Monitoring extension: unchanged, `eximeebpms-enterprise-bpm-spring-boot-monitor` 1.12.0-ee

→ [Tech Stack]({{< ref "/introduction/tech-stack.md" >}})

#### Other Changes

- Source files written for EximeeBPMS carry the project's own copyright header. Nineteen of them had carried Camunda's.
- The manual states each supported database version's vendor end-of-life date. → [Supported Environments]({{< ref "/introduction/supported-environments.md" >}})

### Security {#142-security}

| Notice | Component | CVE | Fixed version |
| --- | --- | --- | --- |
| [EXBPMS-15](/security/notices/#notice-exbpms-15) | Apache FreeMarker | [CVE-2026-84939](https://github.com/advisories/GHSA-27j2-h3m2-8237) | FreeMarker → 2.3.35 |
| [EXBPMS-16](/security/notices/#notice-exbpms-16) | `jackson-databind` | [CVE-2026-68497](https://github.com/advisories/GHSA-q4xh-88c3-wmh7), [CVE-2026-19032](https://github.com/advisories/GHSA-wjgm-6hv5-3cvf), [CVE-2026-83557](https://github.com/advisories/GHSA-gx83-3vf8-gh7j) | Jackson → 2.22.3 |

The Spring Boot starter and EximeeBPMS Run resolved Jackson through Spring Boot's own dependency management, so earlier fixes did not reach them. They now get Jackson 2.22.3 and Jackson 3 3.1.7, which also fixes CVE-2026-89407 and CVE-2026-89425 in `jackson-core`, and CVE-2026-91776 and CVE-2026-91777 in `jackson-databind`.

Three libraries bundled into the web applications are upgraded:

- lodash 4.18.1, fixing [CVE-2026-4800](https://github.com/advisories/GHSA-r5fr-rjxr-66jc) (code injection through `_.template`) and [GHSA-f23m-r3pf-42rh](https://github.com/advisories/GHSA-f23m-r3pf-42rh) (prototype pollution in `_.unset` and `_.omit`);
- preact 10.29.8, used by the forms library, fixing [CVE-2026-22028](https://github.com/advisories/GHSA-36hm-qxxp-pg3m) (JSON VNode injection, high severity);
- qs 6.16.0, used by the HTTP client, fixing [CVE-2026-82562](https://github.com/advisories/GHSA-x5fp-wj9c-mxmx) (array-limit bypass) and [CVE-2026-82417](https://github.com/advisories/GHSA-4mjr-xmp4-gh2g) (denial of service).

The other npm advisories cleared in this release are in build and development tooling, which no distribution contains.

For the full list of security notices, see the [Security Notices](/security/notices/) page.

---

## 1.4.1-ee {#141-ee}

**Release date:** 24.09.2026

The first Enterprise patch on the 1.4.0 baseline. Everything in [1.4.0 CE]({{< ref "/release-notes/release-notes-1.4.0.md" >}}) applies; this section lists what 1.4.1-ee adds or changes on top of it.

### Highlights

- **[Business events are no longer lost when the publisher reports a failure](#business-events-lost-on-publisher-failure)**. If your publisher returns a failure result, which the shipped Kafka publisher does on a broker outage, read this first
- **[Business events follow history order](#business-event-order)**. `process-instance:start` now comes before the instance's variables and jobs, and several missing events are now emitted
- **[Selective business-event publication](#business-event-type-filtering)**: allowlist and denylist over event types instead of all-or-nothing
- **[MariaDB is a supported database](#mariadb-support)**: 11.4 and 12.3
- **[Opt-in type validation for Spin `mapTo`](#spin-mapto-type-validation)**
- **Breaking:** the Quarkus configuration prefix, and removal of the Model API's `camunda…` methods. See [Breaking Changes](#141-breaking)
- **[Security](#141-security)**: the WildFly distribution's bundled Netty is patched for CVE-2026-89044 (EXBPMS-14)

### New Features

#### Business Event Type Filtering {#business-event-type-filtering}

Two new business-events settings narrow which event types are published:

- `enabledEventTypes` is an allowlist, default `*`, which means every type.
- `disabledEventTypes` is a denylist. It is applied after the allowlist and wins over it.

For example, `disabled-event-types: variable-instance:*` publishes everything except variable events. Tokens name a type by its `<entity>:<event>` pair (`task-instance:complete`). `<entity>` or `<entity>:*` selects a whole entity, and the fully-qualified `<prefix>:<entity>:<event>` form is accepted too.

The settings are available wherever the business-events configuration already was:

- the Spring Boot Starter and EximeeBPMS Run, as `eximeebpms.bpm.business-events.enabled-event-types` and `disabled-event-types`;
- `BusinessEventConfigurationPlugin` in a standalone `bpm-platform.xml` and in the WildFly subsystem, as comma-separated `enabledEventTypes` and `disabledEventTypes` properties.

They are not available on Quarkus.

A token that names an unknown entity or event fails engine bootstrap with `InvalidBusinessEventTypeException`, even while `enabled` is `false`. Whenever a filter is in effect, the engine logs the effective set of types at startup. A disabled type is skipped before its event is built, so turning off a high-volume type also saves the lookups behind it, not just the outbox row.

This feature is Enterprise Edition only until it is ported to the Community Edition.

→ [Business Events — Limiting Published Event Types]({{< ref "/user-guide/process-engine/business-events.md" >}}#limiting-published-event-types)

#### MariaDB Support {#mariadb-support}

MariaDB is now a supported database, on the MySQL dialect. The supported versions are the two current long-term-support lines, **11.4 and 12.3**, with MariaDB Connector/J 3.5.7. MariaDB 13.0 is verified to work but is not declared supported: it is a rolling release that reaches end of life on 31.12.2026.

MariaDB behind the MySQL driver always worked. The native MariaDB driver did not: it reports the product name `MariaDB`, which the engine could not map to a dialect, so engine startup failed with "couldn't deduct database type from database product name". The engine now maps `MariaDB` onto the `mysql` dialect, and the `mysql` create and upgrade scripts apply unchanged.

→ [Supported Environments — Databases]({{< ref "/introduction/supported-environments.md" >}}#supported-database-products)

#### Spin `mapTo` Type Validation {#spin-mapto-type-validation}

The engine's deserialization type whitelist (`deserializationTypeValidationEnabled`, `deserializationAllowedClasses`, `deserializationAllowedPackages`) previously guarded only the deserialization of `ObjectValue` process variables. The new opt-in `spinMapToTypeValidationEnabled` setting (default `false`) extends it to Spin's `mapTo(Class)` and `mapTo(String)` on JSON and XML nodes. It only takes effect when `deserializationTypeValidationEnabled` is also `true`, and it reuses the same allowed classes and packages.

It is off by default because turning it on rejects any `mapTo` target outside the whitelist, and those targets are usually application DTO classes. List them before you enable it.

Independently of the flag, Spin's JSON `mapTo(String)` now loads the target class without initializing it. A class the whitelist rejects therefore can no longer run its static initializer before validation.

→ [Spin — Mapping JSON]({{< ref "/reference/spin/json/04-mapping-json.md" >}})
→ [Security]({{< ref "/user-guide/security.md" >}})

#### Measuring the Business-Event Backlog

`BusinessEventQuery.unprocessed()` limits an outbox query to events not yet delivered to the publisher, and `BusinessEventOutbox.getCreatedDate()` gives the time each one was written. The default order follows write order, so `createBusinessEventOutboxQuery().unprocessed().listPage(0, 1)` returns the oldest pending event. That is what you need to alert on a backlog after the [behavior change below](#business-events-lost-on-publisher-failure).

→ [Business Events — Querying the Outbox]({{< ref "/user-guide/process-engine/business-events.md" >}}#querying-the-outbox)

### Breaking Changes {#141-breaking}

#### Quarkus Extension: Configuration Prefix Is Now `quarkus.eximeebpms.*`

The Quarkus extension binds its configuration under `quarkus.eximeebpms.*` instead of `quarkus.camunda.*`. Rename any `quarkus.camunda.generic-config.*`, `quarkus.camunda.job-executor.*`, `quarkus.camunda.datasource` or `quarkus.camunda.id-generator` entries in `application.properties`.

{{< note title="" class="warning" >}}
The old prefix is not rejected. Properties under `quarkus.camunda.*` are **silently ignored**, so a missed rename shows up as default behavior, not as a startup error.
{{< /note >}}

The manual and the extension's README have always documented `quarkus.eximeebpms.*`. Only the code bound the other prefix, so the documented prefix never actually worked until now.

→ [Quarkus Integration — Configuration]({{< ref "/user-guide/quarkus-integration/configuration.md" >}})

#### Model API: `camunda…` Methods Removed

[1.4.0 CE]({{< ref "/release-notes/release-notes-1.4.0.md" >}}#model-api-camunda-method-names) deprecated every `camunda`-named method on the BPMN and DMN Model APIs in favor of its `eximeeBpms…` counterpart. On the Enterprise line those deprecated methods are now **removed**: 405 declarations across `eximeebpms-bpmn-model` and `eximeebpms-dmn-model`. Code that still calls them no longer compiles.

The migration is the mechanical rename 1.4.0 describes: `camundaX` becomes `eximeeBpmsX`, and `getCamundaX` becomes `getEximeeBpmsX`. Also removed:

- `Decision.getCamundaHistoryTimeToLive(Integer)` and its setter. Use `getEximeeBpmsHistoryTimeToLiveString()` and `setEximeeBpmsHistoryTimeToLiveString(String)`.
- `isEximeeBpmsAsync()`, `setEximeeBpmsAsync(boolean)` and the builder's `eximeeBpmsAsync(boolean)` on `StartEvent`, `Task`, `CallActivity`, `ParallelGateway` and `SubProcess`. These have been deprecated since 2014; use `asyncBefore`/`asyncAfter`. `SignalEventDefinition` keeps its pair.
- `Process.getEximeeBpmsHistoryTimeToLive()` and `setEximeeBpmsHistoryTimeToLive(Integer)`. Use the `String` variant.

**The XML format does not change.** The extension namespace URI stays `http://camunda.org/schema/1.0/bpmn` (and `…/1.0/dmn`), attribute names stay the same, and no `.bpmn` or `.dmn` file needs editing.

→ [BPMN Model API — Fluent Builder]({{< ref "/user-guide/model-api/bpmn-model-api/fluent-builder-api.md" >}})

#### Business Events: A Failed Publish Now Blocks Delivery

This is the behavior change behind the [fix below](#business-events-lost-on-publisher-failure). While the receiver is unavailable, `ACT_RU_BUS_EVT_OBX` grows instead of being emptied. A record the receiver can never accept holds back every event behind it, in every process, until it goes through. Monitor for this: see [Bug Fixes](#business-events-lost-on-publisher-failure) for what to alert on and how to skip a record deliberately.

#### Business Events: Dispatcher Log Category Changed

The dispatcher now logs through the engine's coded logger (`ENGINE-00014` to `ENGINE-00020`). Its category changes from `org.eximeebpms.bpm.engine.businessevent.BusinessEventDispatcher` to `org.eximeebpms.bpm.engine`. Adjust logging configuration that targets the old class name; package-level settings are unaffected. A blocked record logs `ENGINE-00019` once per cycle, with how long it has been waiting.

#### Business Events: `process-instance-update` Is Now Emitted

`process-instance-update` was never emitted. It now is, on suspend and activate (with the new `SUSPENDED` or `ACTIVE` state), on `setProcessBusinessKey`, on a process-definition version change, and for sub-process instances left behind when a parent is deleted with `skipSubprocesses`. Consumers start receiving it unless it is excluded with `disabledEventTypes`.

### Bug Fixes

#### Business Events Were Lost When the Publisher Reported a Failure {#business-events-lost-on-publisher-failure}

A publisher can signal failure in two ways: throw, or return `BusinessEventPublishResult.failure(...)`. The shipped Kafka publisher uses the second on a broker outage, rejection or timeout. The dispatcher stopped the cycle only on a throw. On a returned failure it logged "stopping cycle", then **marked the record processed and moved on**, so every event dispatched while the receiver was unavailable was lost.

A failed result now stops the cycle exactly like an exception: the record stays unprocessed and is retried, in order, on the next cycle.

**What to monitor.** Alert on `ENGINE-00019`, or on the age of the oldest pending event (see [Measuring the Business-Event Backlog](#measuring-the-business-event-backlog)). Fix the cause and the queue drains in order. A stuck record is not skipped automatically: that would give consumers a gap they cannot see, such as a process end for an instance whose start never arrived.

**Skipping one record.** This is an operator decision, taken knowing that consumers will miss that event:

```sql
UPDATE ACT_RU_BUS_EVT_OBX SET PROCESSED_ = true, PROCESSED_DATE_ = CURRENT_TIMESTAMP WHERE ID_ = '…';
```

Use `true` on PostgreSQL and H2, and `1` on the other databases.

**Recovering events already lost.** Records that were wrongly marked processed stay in the outbox until retention removes them, by default 7 days after `PROCESSED_DATE_`. Their ids are in the dispatcher's error log ("failed to dispatch outbox record id=…"). To queue them again:

```sql
UPDATE ACT_RU_BUS_EVT_OBX SET PROCESSED_ = false, PROCESSED_DATE_ = NULL WHERE ID_ IN (…);
```

Use `false` on PostgreSQL and H2, and `0` on Oracle, SQL Server, MySQL/MariaDB and DB2. Delivery is at-least-once, so consumers may receive duplicates of events that did get through.

→ [Business Events — When Publishing Fails]({{< ref "/user-guide/process-engine/business-events.md" >}}#when-publishing-fails)

#### Business Events Are Recorded in History Order {#business-event-order}

Business events are now recorded in the same relative order as the corresponding history events:

- **`process-instance:start`** used to come from the process-level `start` listener, after the start variables, form properties and timers were set up. A consumer therefore saw `variable-instance:create`, `form-property:form-property-update` and `job:create` for an instance it had not yet seen start. With an `asyncBefore` start event, the start event was even written in a later transaction. It is now emitted where history records the start, before all of those, and exactly once, including for instances started at an activity or restarted.
- **`task-instance:complete` and `task-instance:delete`** used to be emitted before user task listeners ran, so variables set by a `complete` or `delete` listener arrived after the task had ended. They are now emitted after those listeners, and after the task's identity links and variables are removed.

Events that were missing are now emitted:

- **`process-instance-update`** (see [Breaking Changes](#141-breaking));
- **assignee and owner changes** as `identity-link-add` and `identity-link-delete`, as history always recorded them;
- **standalone tasks** (`taskService.newTask()` / `saveTask()`), which now produce the full `task-instance` lifecycle.

Every other event type already matched history.

→ [Business Events — Event Order]({{< ref "/user-guide/process-engine/business-events.md" >}}#event-order)

#### Other Fixes

- **SQL Server, schema created with `sqlcmd`:** the manual now warns that running the `create` scripts through `sqlcmd` without `-I` silently produces an incomplete schema: 57 of 204 indexes are missing, including five unique constraints. The engine's own schema creation is unaffected. → [SQL Server Configuration]({{< ref "/user-guide/process-engine/database/mssql-configuration.md" >}}#running-the-create-scripts-manually)
- **ER diagrams:** the diagrams in the manual are now generated from the engine's own DDL. The previous hand-drawn diagrams had relationships that did not match the schema and still showed CMMN columns. They also lacked `ACT_RU_BUS_EVT_OBX` and `ACT_RU_SCRIPT_VIOLATION`. There is no separate Enterprise diagram any more, because both editions share the same create scripts. → [Database Schema]({{< ref "/user-guide/process-engine/database/database-schema.md" >}}#entity-relationship-diagrams)
- **Spring Boot property metadata:** the starter jars now ship `META-INF/spring-configuration-metadata.json`. IDEs can therefore complete and validate `eximeebpms.bpm.*` properties, and `spring-boot-properties-migrator` works with them.
- **Manual corrections:** `jdbcStatementTimeout` is honored on H2, and batch processing honors it on MariaDB. The manual had said the opposite in both cases.

### Technical Updates

#### Dependency Updates

Relative to 1.4.0 CE:

- Apache Tomcat 11.0.26 (from 11.0.25)
- MariaDB Connector/J 3.5.7 (new)
- Netty 4.1.138.Final, also in the WildFly distribution's own Netty modules (see [Security](#141-security))
- Monitoring extension: `eximeebpms-enterprise-bpm-spring-boot-monitor` 1.12.0-ee, which replaces the Community artifact `eximeebpms-bpm-spring-boot-monitor` 1.7.0

→ [Tech Stack]({{< ref "/introduction/tech-stack.md" >}})

#### Other Changes

- The published POMs and the resource adapter descriptor name the actual vendor, **Consdata S.A.**, instead of a non-existent `EximeeBPMS services GmbH`.
- `eximeebpms-engine-cdi-jakarta:tests-quarkus` no longer contains `ProgrammaticBeanLookupTest` and `SpecializedTestBean`, which Quarkus cannot deploy. The plain test-jar still ships both.
- Test coverage the build had been silently skipping now runs on every change: the Quarkus extension's test suites, the JUnit 4 tests of the Model API, DMN engine and Spring modules, and the database upgrade path through the 1.2→1.3 and 1.3→1.4 scripts. The API-compatibility check has also been repaired.

### Security {#141-security}

| Notice | Component | CVE | Fixed version |
| --- | --- | --- | --- |
| [EXBPMS-14](/security/notices/#notice-exbpms-14) | Netty bundled in WildFly | [CVE-2026-89044](https://github.com/netty/netty/security/advisories/GHSA-hcvj-94mj-jp5c) | Netty → 4.1.138.Final |

WildFly 41.0.1.Final bundles Netty 4.1.137.Final in its own server modules, outside EximeeBPMS's Maven dependencies. The WildFly distribution now overrides those modules with 4.1.138.Final and drops the vulnerable jars at assembly time.

For the full list of security notices, see the [Security Notices](/security/notices/) page.
