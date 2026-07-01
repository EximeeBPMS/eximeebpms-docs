---

title: "EximeeBPMS 1.2.x Enterprise Edition Release Notes"
weight: 20

menu:
  main:
    name: "1.2.x EE"
    identifier: "release-notes-1.2-ee"
    parent: "release-notes"

---

**Edition:** Enterprise &nbsp;|&nbsp; **Baseline:** [EximeeBPMS 1.2.0 CE]({{< ref "/release-notes/release-notes-1.2.0.md" >}})

---

## 1.2.18-ee {#12-18-ee}

**Release date:** 16.06.2026

### Highlights

- Spring Framework 7.0.7 and Tomcat 10.1.55 security updates (9 CVEs resolved)
- Removed legacy Tomcat 9 and WildFly 26 from the build matrix
- Jakarta EL API 6.0.1 and Quarkus 3.36.1 upgrades

### Technical Updates

#### Dependency Updates

| Dependency | Previous | Updated |
|------------|----------|---------|
| Spring Boot | 4.0.3 | 4.0.6 |
| Spring Framework | 7.0.5 | 7.0.7 |
| Tomcat 10 | 10.1.50 | 10.1.55 |
| Jakarta EL API | 4.0.0 | 6.0.1 |
| Quarkus | 3.28.4 | 3.36.1 |
| Groovy | 5.0.4 | 5.0.5 |
| AssertJ | 3.27.6 | 3.27.7 |
| Maven Dependency Plugin | 2.8 | 3.11.0 |
| bpm-monitor | — | latest |

#### Resolved CVE Vulnerabilities

##### High

| CVE | CVSS | Component | Description | Fixed In |
|-----|:----:|-----------|-------------|----------|
| [CVE-2026-29145](https://nvd.nist.gov/vuln/detail/CVE-2026-29145) | — | `Apache Tomcat` 10.1.50–10.1.52 | "Improper input validation (incomplete fix for CVE-2025-66614)." Fixed in Tomcat 10.1.53. | 1.2.18-ee |

##### Medium

| CVE | CVSS | Component | Description | Fixed In |
|-----|:----:|-----------|-------------|----------|
| [CVE-2026-22740](https://spring.io/security/cve-2026-22740/) | — | `spring-webflux` ≤7.0.6 | "Denial of service via orphaned multipart temporary files when client disconnects." Fixed in Spring Framework 7.0.7. | 1.2.18-ee |
| [CVE-2026-22741](https://spring.io/security/cve-2026-22741/) | — | `spring-webmvc` / `spring-webflux` ≤7.0.6 | "Static resource cache poisoning via specially crafted requests." Fixed in Spring Framework 7.0.7. | 1.2.18-ee |
| [CVE-2026-22745](https://github.com/advisories/GHSA-6p4f-wcwh-5vvm) | — | `spring-webmvc` ≤7.0.6 | "Denial of service in static resource resolution on Windows paths." Fixed in Spring Framework 7.0.7. | 1.2.18-ee |
| [CVE-2026-22737](https://spring.io/security/cve-2026-22737/) | 5.9 | `spring-webmvc` / `spring-webflux` ≤7.0.5 | "Path traversal / information disclosure via script view templates (JRuby/Jython)." Fixed in Spring Framework 7.0.6. | 1.2.18-ee |
| [CVE-2026-22735](https://spring.io/security/cve-2026-22735/) | — | `spring-webmvc` / `spring-webflux` ≤7.0.5 | "Server-Sent Event stream corruption." Fixed in Spring Framework 7.0.6. | 1.2.18-ee |
| [CVE-2026-29129](https://nvd.nist.gov/vuln/detail/CVE-2026-29129) | — | `Apache Tomcat` | "Open redirect via crafted URL when `LoadBalancerDrainingValve` is active." Fixed in Tomcat 10.1.55. | 1.2.18-ee |
| [CVE-2026-24734](https://nvd.nist.gov/vuln/detail/CVE-2026-24734) | — | `Apache Tomcat Native` | "OCSP response not fully verified; certificate revocation bypass." | 1.2.18-ee |
| [CVE-2026-24733](https://nvd.nist.gov/vuln/detail/CVE-2026-24733) | — | `Apache Tomcat` ≤10.1.49 | "HTTP/0.9 GET request bypasses HEAD-only security constraints." Fixed in Tomcat 10.1.50. | since 1.2.16-ee |

### Bug Fixes

- Fixed Jython BOM dependency configuration.
- Resolved integration test failures in the CI matrix (PostgreSQL, cross-database, WildFly + webapps).

### Build Configuration

- Removed legacy **Tomcat 9** and **WildFly 26** from the build matrix. The shaded JUEL dependency was replaced with the standard distribution.

---

## 1.2.17-ee {#12-17-ee}

**Release date:** 03.06.2026

### Highlights

- Java version and dependency refresh
- Critical Jython deserialization vulnerability fixed (CVE-2016-4000)

### Technical Updates

#### Resolved CVE Vulnerabilities

##### Critical

| CVE | CVSS | Component | Description | Fixed In |
|-----|:----:|-----------|-------------|----------|
| [CVE-2016-4000](https://nvd.nist.gov/vuln/detail/CVE-2016-4000) | 9.8 | `org.python:jython` ≤2.7.0 | "Unsafe deserialization of untrusted data enabling arbitrary code execution _(since Jython 2.7.0)_." This vulnerability is exploitable if process definitions use Jython scripts. Fixed by upgrading Jython. | 1.2.17-ee |

---

## 1.2.16-ee {#12-16-ee}

**Release date:** 02.06.2026

### Highlights

- **Business Events with transactional outbox** — guaranteed at-least-once delivery to downstream systems _(EE exclusive)_
- **Configurable OAuth2 endpoints** and custom webapp context path support _(EE exclusive)_
- Script Security Policy NIO enforcement narrowed to file and network APIs only

### New Features

#### Business Events with Transactional Outbox _(EE exclusive)_

A native business event system with a **transactional outbox** pattern. Process-level events (process instance lifecycle, task lifecycle, job execution) are captured inside the engine transaction and written to a dedicated outbox table. A relay component reads from the outbox and delivers events to configured downstream systems (Kafka, HTTP webhooks, etc.), guaranteeing at-least-once delivery without coupling downstream systems to the engine transaction.

A `BusinessEventPublisher` SPI allows custom event routing and transformation. Database schema upgrade scripts for all supported databases are included.

> **[TODO]** Link to the Business Events documentation page once available.

#### Configurable OAuth2 Endpoints _(EE exclusive)_

OAuth2 configuration is now fully externalised. Authorization, token, and userinfo endpoints are configurable via Spring Boot properties. The engine also respects a configurable webapp context path for correct OAuth2 redirect handling.

→ [Spring Security Integration]({{< ref "/user-guide/spring-boot-integration/spring-security.md" >}})

### Configuration Changes

New properties for Business Events and OAuth2:

```properties
# Business Events
eximeebpms.bpm.business-events.enabled=true

# OAuth2 endpoints
eximeebpms.bpm.security.oauth2.authorization-endpoint=https://auth.example.com/oauth2/authorize
eximeebpms.bpm.security.oauth2.token-endpoint=https://auth.example.com/oauth2/token
eximeebpms.bpm.security.oauth2.userinfo-endpoint=https://auth.example.com/oauth2/userinfo

# Webapp context path
eximeebpms.bpm.webapp.path=/bpm
```

### User Experience Improvements

#### Script Security Policy — Reduced False Positives

The NIO blocking enforcement in the Script Security Policy was narrowed to **file and network APIs** only. Pure computation (sorting, string manipulation) is no longer subject to blocking checks, reducing false positives and improving performance of compliant scripts.

→ [Securing Custom Code]({{< ref "/user-guide/process-engine/securing-custom-code.md" >}})

### Technical Updates

#### Dependency Updates

| Dependency | Previous | Updated |
|------------|----------|---------|
| Gson | 2.8.9 | 2.14.0 |
| Jackson | 2.15.2 | 2.21.3 |
| Mockito | 5.10.0 | 5.23.0 |

#### Resolved CVE Vulnerabilities

##### Medium

| CVE | CVSS | Component | Description | Fixed In |
|-----|:----:|-----------|-------------|----------|
| [CVE-2023-35116](https://nvd.nist.gov/vuln/detail/CVE-2023-35116) | 4.7 | `com.fasterxml.jackson.core:jackson-databind` ≤2.15.2 | "Cyclic dependency chain causes denial of service on crafted input. _(Disputed by Jackson maintainers as not externally exploitable — included for completeness.)_" Fixed in jackson-databind 2.16.0. | 1.2.16-ee |

---

## 1.2.15-ee {#12-15-ee}

**Release date:** 22.05.2026

Release-pipeline bookkeeping only. No functional or security changes.

---

## 1.2.14-ee {#12-14-ee}

**Release date:** 22.05.2026

Release-pipeline bookkeeping only. No functional or security changes.

---

## 1.2.13-ee {#12-13-ee}

**Release date:** 21.05.2026

### Highlights

- **Script Security Policy** — enforce which scripts are allowed to execute in the engine _(EE exclusive)_
- Groovy upgraded from 4.x to 5.x

### New Features

#### Script Security Policy _(EE exclusive)_

A framework for controlling which scripts are permitted to execute in the process engine, enforced at two levels:

- **BPMN parse time** — script content is validated when a process definition is deployed; definitions containing disallowed scripts are rejected before they can run.
- **Runtime** — scripts are validated immediately before execution; violations abort execution with a `ScriptEvaluationException`.

A built-in **NIO blocking policy** prevents scripts from performing blocking file system and network calls on the engine thread pool. Policies can be composed freely:

```java
configuration.setScriptSecurityPolicy(new CompositeScriptSecurityPolicy(
    new NioBlockingPolicy(),
    new AllowlistScriptPolicy(allowedScriptIds)
));
```

→ [Securing Custom Code]({{< ref "/user-guide/process-engine/securing-custom-code.md" >}})  
→ [Scripting]({{< ref "/user-guide/process-engine/scripting.md" >}})

### Technical Updates

#### Dependency Updates

| Dependency | Previous | Updated |
|------------|----------|---------|
| Groovy | 4.0.22 | 5.0.4 |

### Bug Fixes

- Fixed Sonar build configuration causing analysis failures on CI.

---

## Infrastructure Releases: 1.2.1-ep – 1.2.12-ee {#infrastructure-releases}

Releases 1.2.1-ep through 1.2.12-ee established the Enterprise Edition release pipeline. 

| Version | Date | Summary |
|---------|------|---------|
| **1.2.1-ep** | 08.05.2026 | First EE release — includes CE 1.3.0 features (multithreaded task handling, UUID v4, task query OR fix) and initial CI/CD pipeline |
| **1.2.2-ep** | 11.05.2026 | Release action configuration; snapshot release pipeline fix |
| **1.2.3-ee** | 11.05.2026 | Nexus TLS certificate for snapshot builds; distribution management release repository |
| **1.2.4-ee** | 12.05.2026 | Version release preparation |
| **1.2.5-ee** | 12.05.2026 | Release workflow fix |
| **1.2.6-ee** | 12.05.2026 | Release workflow fix |
| **1.2.7-ee** | 12.05.2026 | Release workflow fix |
| **1.2.8** | 12.05.2026 | Update Sonar host URL to current internal instance |
| **1.2.9-ee** | 13.05.2026 | Release workflow fixes |
| **1.2.10-ee** | 13.05.2026 | Exclude duplicated sources from release artifact |
| **1.2.11-ee** | 13.05.2026 | Exclude duplicated sources from release artifact |
| **1.2.12-ee** | 13.05.2026 | Workflow simplification; disable snapshot deploys |
