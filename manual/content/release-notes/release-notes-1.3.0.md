---

title: "EximeeBPMS 1.3.0 Release Notes"
weight: 10

menu:
  main:
    name: "1.3.0"
    identifier: "release-notes-1.3.0"
    parent: "release-notes"

---

**Edition:** Community &nbsp;|&nbsp; **Release date:** TBD

---

## Highlights

- [**Script Guard**]({{< ref "/user-guide/process-engine/script-guard.md" >}}) — new pluggable script security policy, enforced both at BPMN parse time and at script runtime
- [**Configurable OAuth2 endpoints**]({{< ref "/user-guide/spring-boot-integration/spring-security.md" >}}#oauth2-endpoints) — authorization and redirection endpoint paths are now configurable and correctly respect a custom webapp context path
- [**Multi-threaded External Task Client**]({{< ref "/user-guide/ext-client/_index.md" >}}#topic-subscription) — fetched tasks are dispatched to a configurable `ThreadPoolExecutor`, with optional execution statistics logging
- [**UUID v7**]({{< ref "/user-guide/process-engine/id-generator.md" >}}) is now the default identifier generation strategy
- [**CMMN is deprecated**]({{< ref "/update/cmmn-removal.md" >}}) and will be removed in EximeeBPMS 1.4.0
- Fixed `OR` query logic for combined `candidateUser` / `candidateGroup` task filters

---

## New Features

### Script Guard

A new `ScriptSecurityPolicy` restricts which scripts the engine is allowed to execute. It is enforced in two places:

- **BPMN parse time** — `ScriptSecurityBpmnParseListener` rejects forbidden scripts in script tasks, execution/task listeners, and I/O mappings while parsing a process definition, so violations surface at deployment instead of at runtime.
- **Script runtime** — `ScriptingEnvironment` and the script engine resolvers enforce the same policy before executing inline, resource-based, or external-task scripts, covering Groovy, GraalJS/Nashorn JavaScript, and JUEL expressions (via `SecureJuelExpressionManager`).

The policy is enabled by default and can be scoped with an allowlist of process definition keys, or disabled entirely. This feature is documented under the name **Script Guard**.

→ [Script Guard]({{< ref "/user-guide/process-engine/script-guard.md" >}})

#### Configuration

```properties
eximeebpms.bpm.script-security.enabled=true
eximeebpms.bpm.script-security.allowlisted-process-definition-keys=
```

`allowlisted-process-definition-keys` accepts a comma-separated list of process definition keys that are exempted from policy enforcement.

### Configurable OAuth2 Endpoints

The OAuth2 authorization and redirection endpoint base URIs used during OAuth2 login were previously fixed to the Spring Security defaults and could break when the webapp was deployed under a custom context path. Both endpoints are now configurable and are sanitized and applied consistently regardless of the configured webapp path.

#### Configuration

```properties
eximeebpms.bpm.oauth2.endpoints.authorization-base-uri=/oauth2/authorization
eximeebpms.bpm.oauth2.endpoints.redirection-base-uri=/login/oauth2/code/*
```

`redirection-base-uri` must stay aligned with `spring.security.oauth2.client.registration.*.redirect-uri`.

→ [Spring Security OAuth2 Integration — OAuth2 Endpoints]({{< ref "/user-guide/spring-boot-integration/spring-security.md" >}}#oauth2-endpoints)

### Multi-threaded External Task Client

The Java External Task Client (`clients/java/client`) now dispatches fetched tasks to a dedicated `ThreadPoolExecutor` per topic subscription instead of handling them one at a time on a single thread, increasing throughput for workers with many concurrent short-lived external tasks. The fetch size is automatically bounded by current pool utilization to avoid over-fetching while threads are busy.

Optional execution statistics (count, min/max/average execution time per process definition and topic) can be collected and logged periodically.

```java
ExternalTaskClient client = ExternalTaskClient.create()
    .baseUrl("http://localhost:8080/engine-rest")
    .threadPoolSize(10)
    .maxFetchedTasksMultiplier(1.5)
    .statsSchedulerEnabled(true)
    .build();
```

→ [External Task Client — Topic Subscription]({{< ref "/user-guide/ext-client/_index.md" >}}#topic-subscription)

### UUID v7 as Default ID Generator

The default identifier generation strategy in `StrongUuidGenerator` changes from **UUID v1** (time-based, MAC-address-seeded) to **UUID v7** (time-ordered epoch, RFC 9562). UUID v7 combines a millisecond-precision timestamp with random bits, giving monotonically ordered, globally unique identifiers — improving database index locality and INSERT throughput — without exposing a MAC address or other node metadata.

IDs generated after the upgrade use UUID v7 format. Existing rows are not affected and remain valid, standard UUID strings. UUID v1 remains available as a deprecated legacy fallback (`id-generator=uuid-v1`) for compatibility and will be removed in EximeeBPMS 1.4.0.

→ [Id Generators]({{< ref "/user-guide/process-engine/id-generator.md" >}})

---

## Deprecations

### CMMN Support (Deprecated — Removal in 1.4.0)

Starting with 1.3.0, support for the CMMN notation is **deprecated** and will be **removed in 1.4.0**. This decision reflects marginal CMMN adoption and EximeeBPMS's strategic focus on BPMN, Human Workflow, and business orchestration — the areas of highest value for banking and insurance customers. The change applies to both the Open Source and Enterprise editions at the same time.

**Behavior in 1.3.0:** no functional changes. The engine logs a warning at startup when it detects CMMN definitions or data in the database, and when a deployment contains a `.cmmn` file. The `CaseService` Java API and the `/case-*` REST endpoints are marked as deprecated.

**Behavior in 1.4.0 (preview):** deployments containing `.cmmn` files will be rejected with an explicit error; engine startup will be blocked when active case instances exist, with instructions on how to proceed; historic CMMN data will remain untouched in the database.

**Recommended actions:**

1. Check your environment for CMMN usage — see [CMMN Deprecation & Removal]({{< ref "/update/cmmn-removal.md" >}}) for detection queries.
2. Test your environment's readiness by setting `eximeebpms.bpm.cmmn-enabled=false` (simulates 1.4.0 behavior).
3. If you use CMMN, finish or close active instances on 1.3.0 and plan a migration of your patterns to BPMN.
4. If you don't use CMMN, no action is required.

Case management remains fully supported through BPMN patterns: ad-hoc subprocesses, event subprocesses, and dynamic tasks. See [CMMN Deprecation & Removal]({{< ref "/update/cmmn-removal.md" >}}) for a pattern mapping table.

### Legacy UUID v1 Generator

See [UUID v7 as Default ID Generator](#uuid-v7-as-default-id-generator) above — `id-generator=uuid-v1` is deprecated and will be removed in 1.4.0.

---

## Bug Fixes

### Task Query `OR` for `candidateUser` / `candidateGroup`

Fixed `OR` query logic when filtering tasks by both `candidateUser` and `candidateGroup` simultaneously. The combined `OR` clause previously missed tasks matching only one of the two criteria; it now correctly returns tasks matching *either* condition.

**Java API:**

```java
List<Task> tasks = taskService.createTaskQuery()
    .or()
      .taskCandidateUser("jdoe")
      .taskCandidateGroupIn(List.of("sales"))
    .endOr()
    .list();
```

**REST API** — `POST /task`:

```json
{
  "orQueries": [
    { "candidateUser": "jdoe" },
    { "candidateGroup": "sales" }
  ]
}
```

Both return tasks for which `jdoe` is a candidate user *or* `sales` is a candidate group.

---

## Security

No CVE-targeted fixes in this CE release. For enterprise security patches on the 1.2.x EE track, see [EximeeBPMS 1.2.x EE Release Notes]({{< ref "/release-notes/release-notes-1.2-ee.md" >}}).
