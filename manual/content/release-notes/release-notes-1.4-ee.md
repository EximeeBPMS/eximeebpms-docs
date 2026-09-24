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
