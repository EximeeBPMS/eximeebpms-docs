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
