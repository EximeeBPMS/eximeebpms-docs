---

title: "EximeeBPMS 1.3.0 Release Notes"
weight: 10

menu:
  main:
    name: "1.3.0"
    identifier: "release-notes-1.3.0"
    parent: "release-notes"

---

**Edition:** Community &nbsp;|&nbsp; **Release date:** 07.05.2026

---

## Highlights

- Multi-threaded external task handling via `ThreadPoolExecutor` for significantly higher throughput
- **UUID v4** replaces legacy UUID v1 as the default identifier generation strategy
- Fixed `OR` query logic for combined `candidateUser` / `candidateGroup` task filters

---

## New Features

### Multi-threaded External Task Handling

The engine now processes external task polling and lock cycles through a dedicated `ThreadPoolExecutor`. On workloads with many concurrent short-lived external tasks this delivers significantly higher throughput compared to the previous single-threaded polling loop.

→ [Job Executor]({{< ref "/user-guide/process-engine/the-job-executor.md" >}})  
→ [External Tasks]({{< ref "/user-guide/process-engine/external-tasks.md" >}})

### UUID v4 as Default ID Generator

The default identifier generation strategy in `StrongUuidGenerator` changes from **UUID v1** (time-based, MAC-address-seeded) to **UUID v4** (randomly generated). UUID v4 eliminates the MAC-address privacy concern of UUID v1 while maintaining good distribution across database indices.

IDs generated after the upgrade use UUID v4 format. Existing rows are not affected. A switch to the time-ordered **UUID v7** format is planned for a future release.

→ [Id Generators]({{< ref "/user-guide/process-engine/id-generator.md" >}})

---

## Configuration Changes

### UUID v1 Fallback

To retain the previous UUID v1 behaviour explicitly, add to `application.properties`:

```properties
eximeebpms.bpm.id-generator=uuid1
```

UUID v1 is available but no longer the default.

### Thread Pool Sizing

The external task thread pool is configured via:

```properties
eximeebpms.bpm.job-executor.core-pool-size=5
eximeebpms.bpm.job-executor.max-pool-size=20
eximeebpms.bpm.job-executor.queue-capacity=100
```

→ [Spring Boot Integration — Configuration]({{< ref "/user-guide/spring-boot-integration/configuration.md" >}})

---

## Bug Fixes

- Fixed `OR` query logic when filtering tasks by both `candidateUser` and `candidateGroup` simultaneously. The combined `OR` clause previously missed tasks matching only one of the two criteria.
- Removed unused `java-uuid-generator` transitive dependencies that were incorrectly pulled into the classpath.

---

## Technical Updates

### Dependency Updates

| Dependency | Previous | Updated |
|------------|----------|---------|
| Java UUID Generator | 5.1.0 | 5.2.0 |

---

## Security

No CVE-targeted fixes in this CE release. For enterprise security patches on the 1.2.x EE track, see [EximeeBPMS 1.2.x EE Release Notes]({{< ref "/release-notes/release-notes-1.2-ee.md" >}}).
