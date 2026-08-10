---

title: "EximeeBPMS 1.4.0 Release Notes"
weight: 1

menu:
  main:
    name: "1.4.0 CE"
    identifier: "release-notes-1.4.0"
    parent: "release-notes"

---

**Edition:** Community &nbsp;|&nbsp; **Release date:** TBD

---

## Highlights

- [**Business Events**]({{< ref "/user-guide/process-engine/business-events.md" >}}) — the native business events mechanism with transactional outbox, previously Enterprise Edition only, now ships in the **Community Edition**
- [**CMMN support removed**](#cmmn-support-removed) — as announced in [1.3.0]({{< ref "/release-notes/release-notes-1.3.0.md" >}}#deprecations); see the [CMMN Deprecation & Removal guide]({{< ref "/update/cmmn-removal.md" >}}) before upgrading
- [**Tomcat 9 and WildFly 26 removed**](#legacy-application-server-support-tomcat-9-wildfly-26-removed) — as announced in 1.3.0
- [**javax (legacy) namespace support dropped**](#javax-legacy-namespace-support-dropped) — the engine and its distributions are now Jakarta-only
- **Java 21 baseline** — up from Java 17; JDK 25 is additionally verified in CI
- [**Five CVE fixes**](#security) ported over from the Enterprise Edition track (jackson-databind, Jython, Spring Framework, Tomcat / Tomcat Native, Netty / Apache Ant)
- [**UUID v1 legacy generator removal deferred**](#legacy-uuid-v1-generator-removal-deferred) — corrects the removal announced for 1.4.0 in the [1.3.0 release notes]({{< ref "/release-notes/release-notes-1.3.0.md" >}}#uuid-v7-as-default-id-generator); the generator remains available and deprecated
- Fixed a race in the External Task Client where `stop()` could return before an in-flight task handler invocation had finished

---

## New Features

### Business Events

Business Events were introduced in Enterprise Edition 1.2.16-ee and substantially expanded in 1.3.1-ee. As of 1.4.0, the same mechanism ships in the **Community Edition**: the engine publishes a stream of domain-level occurrences (task completions, variable changes, incidents, job/batch/external-task lifecycle, user operation log entries, DMN evaluations, Script Guard violations, and more) to systems outside the engine, using a **transactional outbox** — the outbox write happens in the same database transaction as the underlying change, giving at-least-once delivery without coupling the engine's own transaction to the availability of a downstream system.

The feature is **disabled by default**. When enabled, events can be dispatched through the built-in `kafka` publisher or a custom `BusinessEventPublisher` implementation; the event type prefix (default `bpms`) is configurable, and a `BusinessEventService` query API is available for diagnostics.

→ [Business Events]({{< ref "/user-guide/process-engine/business-events.md" >}}) · [Business Event Field Reference]({{< ref "/user-guide/process-engine/business-events-fields.md" >}})

---

## Removed

### CMMN Support Removed {#cmmn-support-removed}

Following the deprecation announced in [1.3.0]({{< ref "/release-notes/release-notes-1.3.0.md" >}}#deprecations), CMMN support is **removed** from the engine in 1.4.0: `CaseService`, the CMMN Java API and model, and the `/case-*` REST endpoints are gone. The `1.3-to-1.4` schema migration deletes CMMN data (deployed case definitions, runtime and historic case data) unconditionally, and halts beforehand if active case instances still exist.

{{< note title="No deployment-time safety net for leftover .cmmn files" class="warning" >}}
Unlike a hard rejection, a `.cmmn` file included in a deployment is now simply **not recognized by any deployer** — the deployment succeeds and the file is stored as an inert, unparsed resource. Auditing your deployment artifacts *before* upgrading is the only reliable way to catch CMMN usage; see the guide below.
{{< /note >}}

→ [CMMN Deprecation & Removal]({{< ref "/update/cmmn-removal.md" >}}) — detection queries, the active-instance fail-fast, data-fate guarantees, REST/Java API impact, and a CMMN-to-BPMN pattern mapping table.

### Legacy Application Server Support (Tomcat 9, WildFly 26) Removed {#legacy-application-server-support-tomcat-9-wildfly-26-removed}

Following the deprecation announced in 1.3.0, the `distro/wildfly26` distribution module and the Tomcat 9 QA test runtime are removed. Supported containers are now **Tomcat 10.1.56+** and **WildFly 40.0.1.Final+** — see the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}}) and [Supported Environments]({{< ref "/introduction/supported-environments.md" >}}).

### javax (Legacy) Namespace Support Dropped {#javax-legacy-namespace-support-dropped}

The engine and its Spring Boot / Quarkus integrations, distributions, and clients are now built exclusively against the **Jakarta EE** namespace; the `javax`-based legacy build path is removed. This mirrors the Enterprise Edition, which dropped `javax` support earlier. Embedded-engine users still referencing `javax.*` APIs for engine integration need to migrate to the corresponding `jakarta.*` types before upgrading.

---

## Changed

### Java 21 Baseline

The minimum and CI-verified Java version moves from **17** to **21**. **JDK 25** is additionally verified in the CI matrix alongside JDK 21, mirroring the Enterprise Edition's 1.3.1-ee tech stack.

### Dependency Updates

A broad set of dependencies was updated, including several security-motivated upgrades — see [Security](#security) below and the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}}) for the full, version-by-version breakdown (Spring Boot, Spring Framework, Quarkus, Groovy, Jackson, Liquibase, Tomcat, WildFly, Netty, Apache Ant, database JDBC drivers, and more).

### SQL Migration Scripts Split Between 1.3 and 1.4

Schema migration scripts are now split per target version instead of being bundled together, giving the engine a dedicated `1.3-to-1.4` upgrade path — this is what the CMMN-removal migration (see above) runs on.

---

## Deprecations

### Legacy UUID v1 Generator Removal Deferred {#legacy-uuid-v1-generator-removal-deferred}

The [1.3.0 release notes]({{< ref "/release-notes/release-notes-1.3.0.md" >}}#uuid-v7-as-default-id-generator) announced that the deprecated `id-generator=uuid-v1` legacy fallback (`UuidV1Generator`) would be removed in 1.4.0. **That removal has not happened** — `UuidV1Generator` and the `uuid-v1` configuration value remain available in 1.4.0, still deprecated, for environments that have not yet migrated off UUID v1. Do not rely on this generator long-term; migrate to the default `StrongUuidGenerator` (UUID v7) when possible.

→ [Id Generators — Legacy UUID v1 Generator]({{< ref "/user-guide/process-engine/id-generator.md" >}}#legacy-uuid-v1-generator-deprecated)

---

## Bug Fixes

### External Task Client — `stop()` Could Return Before In-Flight Executions Finished

In the multi-threaded External Task Client introduced in [1.3.0]({{< ref "/release-notes/release-notes-1.3.0.md" >}}#multi-threaded-external-task-client), calling `stop()` unlocked pending (not-yet-started) tasks correctly, but could return while a task handler invocation already dispatched to the thread pool was still running — racing whatever cleanup the caller performed right after `stop()` returned. `stop()` now additionally waits (up to 10 seconds) for in-flight handler executions to finish before returning.

---

## Security

Five CVE fixes previously shipped only in the Enterprise Edition track are now included in the Community Edition, via the dependency upgrades in this release. Full details for each are published on the [Security Notices](/security/notices/) page.

| Notice | Component | CVEs | Fixed via |
|---|---|---|---|
| [EXBPMS-7](/security/notices/#notice-exbpms-7) | jackson-databind | [CVE-2023-35116](https://nvd.nist.gov/vuln/detail/CVE-2023-35116) | jackson-databind → 2.21.4 |
| [EXBPMS-8](/security/notices/#notice-exbpms-8) | Jython | [CVE-2016-4000](https://nvd.nist.gov/vuln/detail/CVE-2016-4000) | Jython → 2.7.4 |
| [EXBPMS-9](/security/notices/#notice-exbpms-9) | Spring Framework | [CVE-2026-22740](https://spring.io/security/cve-2026-22740/), [CVE-2026-22741](https://spring.io/security/cve-2026-22741/), [CVE-2026-22745](https://github.com/advisories/GHSA-6p4f-wcwh-5vvm), [CVE-2026-22737](https://spring.io/security/cve-2026-22737/), [CVE-2026-22735](https://spring.io/security/cve-2026-22735/) | Spring Framework → 7.0.8 |
| [EXBPMS-10](/security/notices/#notice-exbpms-10) | Apache Tomcat / Tomcat Native | [CVE-2026-29145](https://nvd.nist.gov/vuln/detail/CVE-2026-29145), [CVE-2026-29129](https://nvd.nist.gov/vuln/detail/CVE-2026-29129), [CVE-2026-24734](https://nvd.nist.gov/vuln/detail/CVE-2026-24734), [CVE-2026-24733](https://nvd.nist.gov/vuln/detail/CVE-2026-24733) | Tomcat → 10.1.56 |
| [EXBPMS-11](/security/notices/#notice-exbpms-11) | Netty / Apache Ant | [CVE-2024-29025](https://github.com/advisories/GHSA-5jpm-x58v-624v), [CVE-2021-36373](https://nvd.nist.gov/vuln/detail/CVE-2021-36373), [CVE-2021-36374](https://nvd.nist.gov/vuln/detail/CVE-2021-36374), [CVE-2020-1945](https://nvd.nist.gov/vuln/detail/CVE-2020-1945) | Netty → 4.1.135.Final, Apache Ant → 1.10.17 |

{{< note title="" class="info" >}}
The remaining dependency updates in this release (H2, Liquibase, MySQL Connector/J, Oracle JDBC, PostgreSQL JDBC, Microsoft SQL Server JDBC, Kafka Clients, RESTEasy, Groovy, Jakarta XML Bind API, ShrinkWrap Resolvers, Spring Boot, WildFly, and others) are routine security-motivated bumps; no additional CVE was identified whose affected-version range matches this release's starting versions for those components.
{{< /note >}}
