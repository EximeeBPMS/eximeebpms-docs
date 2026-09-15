---

title: "EximeeBPMS 1.3.x Enterprise Edition Release Notes"
weight: 5

menu:
  main:
    name: "1.3.x EE"
    identifier: "release-notes-1.3-ee"
    parent: "release-notes"

---

**Edition:** Enterprise &nbsp;|&nbsp; **Baseline:** [EximeeBPMS 1.3.0 CE]({{< ref "/release-notes/release-notes-1.3.0.md" >}})

---

## 1.3.3-ee {#133-ee}

**Release date:** 10.09.2026

### Highlights

- **[Script Guard outside Spring Boot](#script-guard-in-container-deployments)** — enforcement mode, allowlisting, violation persistence and business-event forwarding now work in plain-XML and application-server deployments, not just Spring Boot
- **[Selective history exclusion](#history-exclusion-by-process-definition-key)** — turn history recording off for named process definitions without lowering the history level for the whole engine
- **[Admin-user bootstrap guard](#admin-user-bootstrap-guard)** — the Spring Boot starter now refuses to start when a local admin account is configured alongside SSO or LDAP, instead of silently creating it or failing obscurely
- **Telemetry field renamed** — see [Breaking Changes](#133-breaking) below
- **All remaining Critical/High dependency alerts outside `webapps` are closed** — see [Security](#133-security)

### New Features

#### Script Guard in Container Deployments {#script-guard-in-container-deployments}

[Script Guard]({{< ref "/user-guide/process-engine/script-guard.md" >}}) was previously configurable only through the Spring Boot starter. Its configuration now lives on the process engine configuration itself, so a standalone `bpm-platform.xml` deployment on Tomcat, or a WildFly subsystem deployment, gets the same behaviour a Spring Boot deployment has always had: the enforcement mode (`ENFORCE`, `AUDIT`, `DISABLED`), the process-definition allowlist, violation persistence to `ACT_RU_SCRIPT_VIOLATION`, and forwarding of violations to the business-event outbox for SIEM consumption.

An unrecognized mode value is now rejected when the engine is built, rather than being silently ignored — a typo in `scriptSecurityMode` fails startup with the list of valid values instead of leaving enforcement in an unintended state.

Recorded violations can also be aged out automatically: `scriptViolationRetentionDays` (`0`, the default, keeps them indefinitely) drives a cleanup job that removes violation records older than the configured retention. That cleanup now runs on the engine's own job executor instead of a Spring-scheduled task, which is what makes it work outside Spring Boot — the undocumented `eximeebpms.bpm.script-security.cleanup-cron` property that used to drive its schedule is gone and is no longer read.

→ [Script Guard]({{< ref "/user-guide/process-engine/script-guard.md" >}})
→ [Business Events]({{< ref "/user-guide/process-engine/business-events.md" >}})

#### History Exclusion by Process Definition Key {#history-exclusion-by-process-definition-key}

`historyExcludedProcessDefinitionKeys` (Spring Boot: `eximeebpms.bpm.history-excluded-process-definition-keys`) lists process definition keys for which no history is recorded at all, whatever the configured history level. High-volume technical processes can therefore be excluded individually instead of forcing the whole engine down to a lower history level.

Filtering happens at persistence time. Batch history (`HistoricBatchEntity`) is never covered by the exclusion, because a batch is not scoped to a single process definition.

→ [History Configuration]({{< ref "/user-guide/process-engine/history/history-configuration.md" >}})

#### Admin-user Bootstrap Guard {#admin-user-bootstrap-guard}

The Spring Boot starter's `eximeebpms.bpm.admin-user.*` bootstrap now fails startup with an explicit error when `admin-user.id` is set while an external identity provider is active — either an OAuth2/OIDC client registration under `spring.security.oauth2.client.registration.*`, or a read-only identity provider such as the LDAP plugin.

Previously the two combinations failed in two different unhelpful ways: with SSO the local admin account was created silently behind the identity provider's back, and with a read-only provider the engine crashed with an opaque `ProcessEngineException` about a missing `WritableIdentityProvider` session factory.

The previous behaviour is still available deliberately, via `eximeebpms.bpm.admin-user.allow-with-external-identity-provider` (default `false`). With a writable provider the account is created as before; with a read-only provider creation is skipped and a `WARN` is logged, since writing to a read-only provider cannot succeed regardless of intent.

→ [Spring Boot Integration — Configuration]({{< ref "/user-guide/spring-boot-integration/configuration.md" >}})

### Breaking Changes {#133-breaking}

#### Telemetry Field Renamed to `eximeebpms-integration`

The diagnostics/telemetry payload's `camunda-integration` field is renamed to `eximeebpms-integration`, completing the rebranding of the data contract. This is the serialized field name, so it changes what the diagnostics data actually contains.

{{< note title="" class="warning" >}}
If you collect diagnostics data and parse it downstream — a dashboard, a SIEM pipeline, an internal inventory — update the field name. The old name is no longer emitted.

The REST API reference for the 1.3 line documents the Community Edition API, which keeps the old field name — Community Edition 1.3.0 emits `camunda-integration`. The rename applies to Enterprise Edition from this release onward.
{{< /note >}}

→ [Diagnostics Data]({{< ref "/user-guide/process-engine/diagnostics-data.md" >}})

#### `camunda:caseRef` Rejected at Deploy Time

A call activity carrying `camunda:caseRef` — a reference to a CMMN case — is now rejected when the process definition is deployed, with an error naming the attribute and pointing at `calledElement`. Previously such a definition deployed successfully and only failed later, at process start, once the removed CMMN support was actually reached.

Process definitions that still carry `caseRef` and deployed without complaint before will now be refused at deployment. That is the intended outcome: they could never have run.

→ [CMMN Removal — Migration Guide]({{< ref "/update/cmmn-removal.md" >}})

#### `uuid-v1` Id Generator Removed

`UuidV1Generator`, deprecated since 1.3.0, is removed. Setting the id generator to `uuid-v1` — through `bpm-platform.xml`, `eximeebpms.bpm.id-generator`, `quarkus.camunda.id-generator` or the WildFly subsystem — no longer instantiates it.

This is not a hard failure: the engine falls back to the default `StrongUuidGenerator` (UUID v7) and logs a warning (`EnginePersistenceLogger` code `111`), so a leftover `uuid-v1` setting keeps the engine starting, just with the default generator.

#### `enabledEventTypes` Property Removed

The business-events `enabledEventTypes` property (`<property name="enabledEventTypes">`, standalone `bpm-platform.xml` only — never exposed through the Spring Boot starter or Quarkus) is removed. It was parsed and stored but never read by any stage of the produce → outbox-write → dispatch pipeline, so setting it had no effect. No filtering mechanism elsewhere in the engine supersedes it.

→ [Business Events]({{< ref "/user-guide/process-engine/business-events.md" >}})

### Technical Updates

#### System Settings Menu Now Respects Its Backend Permission

Admin's **System Settings** menu entry is now shown only to users holding `READ` on the `System` resource — the permission its backend already required. Users without it no longer see a menu entry that leads to a rejected request.

→ [Admin — System Management]({{< ref "/webapps/admin/system-management.md" >}})

#### Microsoft SQL Server: `image` Columns Replaced with `varbinary(max)`

The deprecated `image` column type is replaced with `varbinary(max)` on `ACT_GE_BYTEARRAY.BYTES_`, `ACT_HI_COMMENT.FULL_MSG_` and `ACT_ID_INFO.PASSWORD_`. New installations get `varbinary(max)` from the create scripts; existing installations keep `image` until the `1.3-to-1.4` upgrade script, which now converts the three columns in place.

`image` has been deprecated by Microsoft for years and is slated for removal; the two types are otherwise equivalent for the engine's use.

→ [Database Schema]({{< ref "/user-guide/process-engine/database/database-schema.md" >}})

#### Monitoring Extension Switched to the Enterprise Fork

The Spring Boot starter now depends on `eximeebpms-enterprise-bpm-spring-boot-monitor` `1.12.0-ee` instead of the Community artifact `eximeebpms-bpm-spring-boot-monitor` `1.7.0`. The two are separately versioned; the Enterprise fork tracks Enterprise's own release train.

→ [Application Monitoring]({{< ref "/user-guide/process-engine/application-monitoring.md" >}})
→ [Tech Stack]({{< ref "/introduction/tech-stack.md" >}})

#### Other Changes

- Batch job configuration byte arrays are now written with a name (`batch.jobConfiguration`), a resource type and a creation timestamp instead of leaving all three null — previously the only rows in `ACT_GE_BYTEARRAY` that could be neither attributed to a mechanism nor dated. Additive, new rows only; no schema change.
- `bpm-platform.xml` `<property>` values can now target `Set<String>`/`List<String>` setters as comma-separated lists, not just `int`/`long`/`float`/`boolean`/`String`. As a side effect `adminGroups`, `adminUsers` and `registeredDeployments` become configurable through plain XML property syntax.
- Tomcat is pinned to 11.0.25 across both the standalone distribution and the Spring Boot runtime, and WildFly is bumped to 41.0.1.Final (WildFly Core 33.0.1.Final).
- Tasklist's internal form type tag is renamed from `camunda-forms` to `eximeebpms-forms`, matching the `eximeebpms-forms:` form key it has always used. Custom Tasklist plugins that branch on `form.type` need updating.

### Bug Fixes

- History events whose payload is binary — job log and external-task log stack traces, and object-typed DMN decision inputs and outputs — wrote that payload to `ACT_GE_BYTEARRAY` before any `HistoryEventHandler` had decided whether to persist the event. A handler that declined the event left an unreferenced row behind that nothing pointed at, that no cleanup sweep could reach (its removal time was null) and that no query could distinguish from live data. The byte array is now created by the handler instead. **Contract note:** a custom handler that persists these events through its own path, rather than delegating to `DbHistoryEventHandler`, now receives the payload on the event itself with the byte-array id unset, and must create the byte array if it wants the payload stored.
- `HistoricBatchEntity` declared an `id` field shadowing the one on `HistoryEvent`. The subclass field was dead — both accessors always resolved to the superclass field — but a reflective, field-based serializer such as Gson saw two fields named `id` and threw, making batch history events unserializable in any custom `HistoryEventHandler` using one. The shadowing field is removed; accessor behaviour is unchanged.
- On WildFly, the `httpclient5` module descriptor did not declare the JDK's `jdk.net` module, which httpclient5 5.6.4 reaches from a static initializer. Every engine with the Connect plugin enabled — in practice all of them — failed with `NoClassDefFoundError` the first time it built an HTTP client. Tomcat's flat classpath was unaffected.
- The dependency-graph refresh job checked for an exact hour to disambiguate its two daily triggers, but the shared runner pool routinely starts a scheduled run hours late, so the check never matched and the job silently no-op'd while reporting success. It now uses a delay-tolerant threshold.

### Security {#133-security}

This release closes every remaining Critical and High severity dependency alert outside the `webapps` module.

- `httpclient5`/`httpcore5` to 5.6.4/5.4.3, `netty` to 4.1.137.Final, `unirest-java` to 3.14.5, `testcontainers` to 2.0.5, `h2` (QA Spring Boot runtime) to 2.4.240, `plexus-utils` to 3.6.1, `xalan` to 2.7.3, `guava` to 33.7.1-jre, `httpclient` to 4.5.14, `lz4-java` to 1.11.2, `opentelemetry` to 1.65.0, `handlebars` to 4.5.4.
- `wiremock` (test scope) migrated from `com.github.tomakehurst:wiremock` 2.27.2 to `org.wiremock:wiremock-jetty12` 3.13.2, which brings Jetty 12 instead of the end-of-life Jetty 11 line — forced on to 12.0.39 to clear CVE-2026-1605 and CVE-2026-10050. `webapps`'s own Jetty usage and its local-development Jetty Maven plugin moved to the Jetty 12 EE10 artifacts (12.1.12) for the same reason.
- Several `jackson-*` and `json-smart` coordinates were resolving a bundled, vulnerable version despite the project already pinning patched ones, because no `dependencyManagement` entry wired the pin into that part of the reactor. Those entries are now in place.

For the full list of security notices, see the [Security Notices](/security/notices/) page.

---

## 1.3.2-ee {#132-ee}

**Release date:** 11.08.2026

### Highlights

- **[External Script Validation Module](#external-script-validation-module)** — the same rule set [Script Guard]({{< ref "/user-guide/process-engine/script-guard.md" >}}) enforces inside the engine is now also available as a standalone, engine-independent library
- **Script Guard meters now available** — bumping the bundled monitor extension to `1.7.0` makes the `eximeebpms.script.violations`/`eximeebpms.script.total` meters available in this combination
- **[CMMN-to-1.4 migration guard](#cmmn-to-14-migration-guard)** — the `1.3-to-1.4` schema migration now halts if active CMMN case instances still exist, instead of proceeding regardless
- **Variable business event type names corrected** — see [Breaking Changes](#breaking-changes) below

### New Features

#### External Script Validation Module {#external-script-validation-module}

The same rule set [Script Guard]({{< ref "/user-guide/process-engine/script-guard.md" >}}) enforces inside the engine is now also available as a standalone library, `org.eximeebpms.commons:eximeebpms-commons-script-guard-rules`, with no dependency on the process engine. Add it to a process-design tool, a CI pipeline, or any other pre-deployment tooling to check a script or expression before ever attempting to deploy the process definition that contains it, instead of only finding out from a rejected deployment. `DefaultScriptSecurityPolicy` now delegates rule matching to this module instead of holding its own rule list, so the engine and the standalone module can never disagree on what a violation is.

→ [Script Guard — External Validation Module]({{< ref "/user-guide/process-engine/script-guard.md" >}}#external-validation-module)

#### Script Guard Meters

Bumping the bundled monitor extension (`version.eximeebpms-monitor`) to `1.7.0` makes the `eximeebpms.script.violations`/`eximeebpms.script.total` Script Guard meters available in this combination.

→ [Application Monitoring]({{< ref "/user-guide/process-engine/application-monitoring.md" >}})
→ [Tech Stack]({{< ref "/introduction/tech-stack.md" >}})

### Breaking Changes

#### Variable Business Event Type Names Corrected

Variable business events introduced in [1.3.1-ee](#131-ee) used inconsistent past-tense type names — `variable-instance:created`, `variable-instance:updated`, `variable-instance:deleted` — instead of the imperative-style names every other entity uses (`create`, `update`, `delete`, and so on). As of 1.3.2-ee, these are corrected to `bpms:variable-instance:create`, `bpms:variable-instance:update`, `bpms:variable-instance:delete` (`bpms:variable-instance:migrate` was already correctly named and is unchanged).

{{< note title="" class="warning" >}}
If you built downstream consumers — SIEM correlation rules, stream processors, dashboards — against the 1.3.1-ee variable event type strings, update them to the corrected names. The old, past-tense strings are no longer published.
{{< /note >}}

→ [Business Events]({{< ref "/user-guide/process-engine/business-events.md" >}})

### Technical Updates

#### CMMN-to-1.4 Migration Guard {#cmmn-to-14-migration-guard}

The `1.3-to-1.4` migration (CMMN removal) now halts before making any schema changes if active CMMN case instances exist in `ACT_RU_CASE_EXECUTION`, via a Liquibase precondition guard on the changeset. CMMN history and deployed definitions are still dropped unconditionally whenever the migration proceeds — this guard protects active runtime instances only, not history.

The migration guide's description of post-upgrade deployment behavior was also corrected: a `.cmmn`/`.cmmn10.xml`/`.cmmn11.xml` file included in a deployment after upgrading is **not rejected** — it is simply not recognized by any deployer, so it is stored as an opaque, silently inert deployment resource. Auditing your deployment artifacts before upgrading remains the only reliable way to catch CMMN usage.

→ [CMMN Removal — Migration Guide]({{< ref "/update/cmmn-removal.md" >}})

### Security

No CVE-targeted fixes in this release. For the most recent enterprise security patches, see the [Security Notices](/security/notices/) page.

---

## 1.3.1-ee {#131-ee}

**Release date:** 29.07.2026

### Highlights

- **[Business Events]({{< ref "/user-guide/process-engine/business-events.md" >}}) massively expanded** — jobs, batches, incidents, external tasks, activity instances, DMN decision evaluations, form property updates, and the user operation log are now all published as business events, on top of the process/task/variable events already available since [1.2.16-ee](https://docs.eximeebpms.org/manual/latest/release-notes/release-notes-1.2-ee/#12-16-ee)
- **[Configurable business event type prefix](#configurable-business-event-prefix)** — the default prefix changes from `camunda7` to `bpms` (see [Breaking Changes](#breaking-changes) below)
- **JDK 25 compatibility** — the CI matrix now verifies the engine on both JDK 21 and JDK 25
- Graceful shutdown now waits for in-flight external task executions to finish before stopping `ExecutorRunner`
- SQL migration scripts split between the upcoming 1.3 and 1.4 schema versions, to keep incremental upgrades scoped correctly

### New Features

#### Business Events Expansion

The [Business Events]({{< ref "/user-guide/process-engine/business-events.md" >}}) transactional outbox, introduced in [1.2.16-ee](https://docs.eximeebpms.org/manual/latest/release-notes/release-notes-1.2-ee/#12-16-ee), now covers most engine-level occurrences instead of just the process/task/variable lifecycle:

- **Activity instances** — `start`, `update`, `migrate`, `end`
- **Jobs** — `create`, `fail`, `success`, `delete`
- **Batches** — `start`, `update`, `end`
- **External tasks** — `create`, `fail`, `success`, `delete`
- **Incidents** — `create`, `migrate`, `resolve`, `update`, `delete`
- **DMN decision evaluations** — `evaluate` (bundles the root decision with any required sub-decisions from the same DRG)
- **Form properties** — `form-property-update`, for both start forms and task forms
- **User operation log** — `create`, one event per changed property, correlated by `operationId`
- **Process instance migration** — `process-instance:migrate` and `task-instance:migrate` alongside the existing `variable-instance:migrate`

This turns Business Events into a general-purpose, real-time feed of engine activity suitable for audit trails, SIEM ingestion, and operational dashboards, without polling the history tables.

→ [Business Events]({{< ref "/user-guide/process-engine/business-events.md" >}})
→ [Business Event Field Reference]({{< ref "/user-guide/process-engine/business-events-fields.md" >}}) — exact payload fields for every event type

#### Configurable Business Event Prefix

The prefix prepended to every business event's fully-qualified type (the `<prefix>` in `<prefix>:<entity>:<event>`) is now configurable:

```properties
eximeebpms.bpm.business-events.prefix=bpms
```

The **default value changes from `camunda7` to `bpms`** — see [Breaking Changes](#breaking-changes).

→ [Business Events — Configuration]({{< ref "/user-guide/process-engine/business-events.md" >}}#configuration)

#### Other Engine Improvements

- **Graceful shutdown** now waits for in-flight external task executions started by `ExecutorRunner` to finish, instead of interrupting them, before the engine stops.

### Breaking Changes

#### Default Business Event Type Prefix Changed (`camunda7` → `bpms`)

Business events published before this release used the hardcoded prefix `camunda7` (e.g. `camunda7:task-instance:complete`). As of 1.3.1-ee, the prefix is configurable and **defaults to `bpms`** (e.g. `bpms:task-instance:complete`).

{{< note title="" class="warning" >}}
If you have downstream consumers — SIEM correlation rules, stream processors, dashboards — that match on the literal event type string, they will stop matching after upgrading unless you either update them to the new `bpms:` prefix, or set `eximeebpms.bpm.business-events.prefix=camunda7` to preserve the previous type strings during a staged migration.
{{< /note >}}

Note that the envelope's `metadata.origin` field is **not** affected by this setting — it remains the literal `bpms` regardless of the configured prefix. See [Business Events — Event Envelope]({{< ref "/user-guide/process-engine/business-events.md" >}}#event-envelope).

### Technical Updates

#### JDK 25 Compatibility

The CI integration test matrix now runs against **JDK 21** (still the primary supported build/runtime target) and **JDK 25**, verifying forward compatibility ahead of a future JDK baseline bump.

→ [Tech Stack]({{< ref "/introduction/tech-stack.md" >}})

#### Tomcat Upgraded to 11.0 {#tomcat-110}

The dependency-managed Tomcat version (`version.tomcat`, which the standalone `eximeebpms-bpm-tomcat` distribution bundles) moves from **Tomcat 10.1.56** to **Tomcat 11.0.24** — Servlet 6.1 / Jakarta EE 11, up from Servlet 6.0 / Jakarta EE 10. This is a container generation change, not a routine patch bump.

{{< note title="" class="warning" >}}
If you run the standalone Tomcat distribution, upgrading to 1.3.1-ee or later changes your servlet container's major version. Web application archives (`eximeebpms-webapp-tomcat-jakarta`, `eximeebpms-engine-rest-jakarta`) deployed to your own, separately managed Tomcat instance are not forced onto Tomcat 11 by this change.
{{< /note >}}

→ [Tech Stack]({{< ref "/introduction/tech-stack.md" >}})

#### Build & CI

- SQL migration scripts are now split between the upcoming 1.3 and 1.4 schema versions: the `ACT_RU_SCRIPT_VIOLATION` table creation (previously bundled into the 1.2-to-1.3 upgrade script) moves to its own dedicated schema component upgrade, and the 1.3-to-1.4 upgrade path becomes an explicit, independently taggable Liquibase changeset (`1.3-to-1.4`). This release does not otherwise change the database schema: the [Business Events](#business-events-expansion) added in this release reuse the existing generic `ACT_RU_BUS_EVT_OBX` outbox table (see [Business Event Outbox]({{< ref "/user-guide/process-engine/database/database-schema.md" >}}#business-event-outbox-act_ru_bus_evt_obx)) — no new tables or columns were required.
- SonarQube analysis runs as a non-blocking CI step, so transient analysis issues no longer fail unrelated builds.
- Lightweight GitHub-hosted CI jobs moved to the `ubuntu-slim` runner image; various self-hosted runner, Dependabot concurrency, and Slack notification fixes to reduce CI flakiness.

### Bug Fixes

- Fixed a race in `LoginIT` causing intermittent timeouts; extended logging added for diagnosis.
- Resolved integration test failures following the SLF4J version bump.
- Fixed integration test database setup issues.
- Fixed a flaky `ExternalTaskHandlerIT` variable assertion.

### Security

No CVE-targeted fixes in this release. For the most recent enterprise security patches, see [EximeeBPMS 1.2.x EE Release Notes]({{< ref "/release-notes/release-notes-1.2-ee.md" >}}#12-19-ee) (1.2.19-ee) and the [Security Notices](/security/notices/) page.

---
