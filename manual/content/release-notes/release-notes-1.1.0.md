---

title: "EximeeBPMS 1.1.0 Release Notes"
weight: 40

menu:
  main:
    name: "1.1.0 CE"
    identifier: "release-notes-1.1.0"
    parent: "release-notes"

---

**Edition:** Community &nbsp;|&nbsp; **Release date:** 19.10.2025

Patch releases: [1.1.1](#111) (24.10.2025) — security fixes &nbsp;|&nbsp; [1.1.2](#112) (25.10.2025) — dependency path fix

---

## Highlights

- **WildFly 27** application server support
- **EximeeBPMS Monitor** metrics available from `eximeebpms-run`
- **JaCoCo** test coverage and **Sonar** static analysis integration
- Upstream engine synchronisation with Camunda 7 up to version 7.24.0
- Broad dependency refresh including several high-severity security fixes

---

## New Features

### WildFly 27 Support

WildFly 27 is now a supported application server. A dedicated distribution is included, and integration tests run against WildFly 27 on CI. WildFly and Tomcat are excluded from the default Maven build profile; use `-P full` to include them.

→ [Install — Full Distribution for JBoss/WildFly]({{< ref "/installation/full/jboss/_index.md" >}})

### EximeeBPMS Monitor Metrics

The `eximeebpms-run` standalone distribution now publishes engine metrics through **EximeeBPMS Monitor**. Job executor statistics, process instance counts, and task queue depths are available as Prometheus-compatible metrics out of the box.

→ [Metrics]({{< ref "/user-guide/process-engine/metrics.md" >}})

### Snapshot Deployment to Sonatype

Snapshot artifacts are automatically deployed to Sonatype Central on every push to `main`, making it easier to test unreleased changes in downstream projects.

---

## Bug Fixes

- Fixed implicit narrowing conversion in compound assignment in engine code.
- Fixed integration test and workflow configuration issues.
- Fixed wrong namespace references (multiple iterations) in build descriptors.
- Fixed snapshot deployment module list and authentication token handling.

---

## Technical Updates

### Build Configuration

- JaCoCo plugin enabled by default. HTML and XML reports generated under `target/site/jacoco/` after `mvn verify`.
- SonarQube/SonarCloud analysis available via the `sonar` Maven profile.
- WildFly and Tomcat excluded from default build; enabled via `-P full`.

### Upstream Sync

- Synchronised upstream Camunda 7 changes up to version 7.24.0

### Dependency Updates

| Dependency | Previous | Updated |
|------------|----------|---------|
| Spring Boot | 3.4.4 | 3.5.5 |
| Spring Framework | 6.2.4 | 6.2.10 |
| Quarkus | 3.20.0 | 3.27.0 |
| Tomcat 10 | 10.1.36 | 10.1.43 |
| Tomcat 9 | 9.0.100 | 9.0.107 |
| WildFly | 35.0.0.Final | 37.0.0.Final |
| WildFly Core test framework | 27.0.0.Final | 29.0.0.Final |
| jersey-json | 1.15 | 1.19.4 |
| Bouncy Castle | 1.47 | 1.70 |
| Guava | 28.2-jre | 33.4.6-jre |
| json-smart | 2.5.0 | 2.5.2 |
| Undertow Servlet | 2.3.0.Final | 2.3.18.Final |
| Apache HttpClient 5 | 5.4.1 | 5.5 |
| Apache HttpComponents | 4.5.10 | 5.3.1 |
| Gson | 2.8.9 | 2.12.1 |
| OkHttp | 3.14.2 | 4.12.0 |
| MyBatis | 3.5.15 | 3.5.19 |
| Java UUID Generator | 4.3.0 | 5.1.0 |
| FEEL Scala engine | 1.19.1 | 1.19.3 |
| Joda-Time | 2.12.5 | 2.14.0 |
| JUnit 4 | 4.13.1 | 4.13.2 |
| XMLUnit Core | 2.6.2 | 2.10.1 |
| OpenAPI Generator Maven Plugin | 4.2.3 | 7.12.0 |
| Swagger Annotations | 1.5.22 | 1.6.14 |
| Commons Lang 3 | 3.9 | 3.18.0 |
| Jetty | 9.4.31.v20200723 | 9.4.57.v20241219 |
| ShrinkWrap Resolvers | 2.2.2 | 2.2.7 |
| Maven Javadoc Plugin | 3.3.1 | 3.11.2 |
| Cargo Maven Plugin | 1.10.16 | 1.10.20 |
| Build Helper Maven Plugin | 1.9.1 | 3.6.0 |
| wsdl4j | 1.6.2 | 1.6.3 |

### Resolved CVE Vulnerabilities

#### Critical

| CVE | CVSS | Component | Description | Fixed In |
|-----|:----:|-----------|-------------|----------|
| [CVE-2019-10202](https://nvd.nist.gov/vuln/detail/CVE-2019-10202) | 9.8 | `jackson-mapper-asl` (bundled in `jersey-json` ≤1.15) | "Unsafe deserialization enabling remote code execution via polymorphic type handling." Fixed by upgrading `jersey-json` 1.15 → 1.19.4. Note: `jackson-mapper-asl` is an abandoned library with no upstream fix available; full remediation requires replacing Jersey JSON. | 1.1.0 |

#### High

| CVE | CVSS | Component | Description | Fixed In |
|-----|:----:|-----------|-------------|----------|
| [CVE-2019-10172](https://nvd.nist.gov/vuln/detail/CVE-2019-10172) | 7.5 | `jackson-mapper-asl` (bundled in `jersey-json` ≤1.15) | "XXE injection via XML parsing in the Jackson 1.x mapper." Fixed by upgrading `jersey-json` 1.15 → 1.19.4. | 1.1.0 |
| [CVE-2024-57699](https://nvd.nist.gov/vuln/detail/CVE-2024-57699) | 7.5 | `net.minidev:json-smart` ≤2.5.1 | "Stack exhaustion denial of service via deeply nested `{` characters in JSON input (incomplete fix of CVE-2023-1370)." Fixed in json-smart 2.5.2. | 1.1.0 |

#### Medium

| CVE | CVSS | Component | Description | Fixed In |
|-----|:----:|-----------|-------------|----------|
| [CVE-2025-41242](https://nvd.nist.gov/vuln/detail/CVE-2025-41242) | 5.9 | `spring-webmvc` / `spring-webflux` ≤6.2.9 | "Path traversal on non-compliant Servlet containers." Fixed in Spring Framework 6.2.10. | 1.1.0 |
| [CVE-2025-41234](https://nvd.nist.gov/vuln/detail/CVE-2025-41234) | 6.5 | `spring-web` ≤6.2.7 | "Reflected File Download (RFD) via `Content-Disposition` filename derived from user input." Fixed in Spring Framework 6.2.8. | 1.1.0 |

#### Low

| CVE | CVSS | Component | Description | Fixed In |
|-----|:----:|-----------|-------------|----------|
| [CVE-2020-8908](https://nvd.nist.gov/vuln/detail/CVE-2020-8908) | 3.3 | `com.google.guava:guava` ≤31.x | "`Files.createTempDir()` creates world-readable (0755) temporary directories, enabling local information disclosure." Fixed by upgrading Guava to 33.x. | 1.1.0 |

---

## 1.1.1 {#111}

**Edition:** Community &nbsp;|&nbsp; **Release date:** 24.10.2025

### Highlights

Security-only patch. Fixes four high-severity CVEs in Spring Framework, Spring Security, and Apache Commons FileUpload.

### Technical Updates

#### Dependency Updates

| Dependency | Previous | Updated |
|------------|----------|---------|
| Spring Boot | 3.5.5 | 3.5.6 |
| Spring Framework | 6.2.10 | 6.2.11 |
| commons-fileupload | 1.5 | 1.6.0 |
| Liquibase | 4.8.0 | 5.0.1 |
| REST Assured | 4.5.0 | 5.5.6 |
| Quarkus | 3.27.0 | 3.28.4 |
| simple-jndi | 0.24.0 | 0.25.0 |

#### Resolved CVE Vulnerabilities

##### High

| CVE | CVSS | Component | Description | Fixed In |
|-----|:----:|-----------|-------------|----------|
| [CVE-2025-48976](https://nvd.nist.gov/vuln/detail/CVE-2025-48976) | — | `commons-fileupload` ≤1.5 | "Allocation of multipart headers without size limits enables denial of service." Fixed in commons-fileupload 1.6.0. | 1.1.1 |
| [CVE-2023-24998](https://nvd.nist.gov/vuln/detail/CVE-2023-24998) | — | `commons-fileupload` ≤1.4 | "Unlimited request part count allows denial of service _(since commons-fileupload 1.0)_." Fixed in 1.5; superseded by CVE-2025-48976 in 1.6. | 1.1.1 |
| [CVE-2025-41249](https://nvd.nist.gov/vuln/detail/CVE-2025-41249) | 7.5 | `spring-framework` ≤6.2.10 | "`@PreAuthorize` annotation detection bypass on generic superclasses allows authorization to be skipped." Fixed in Spring Framework 6.2.11. | 1.1.1 |
| [CVE-2025-41248](https://nvd.nist.gov/vuln/detail/CVE-2025-41248) | 7.5 | `spring-security` (Spring Boot ≤3.5.5) | "Authorization bypass for method security annotations on parameterized types." Fixed in Spring Boot 3.5.6 / Spring Security 6.5.4. | 1.1.1 |

---

## 1.1.2 {#112}

**Edition:** Community &nbsp;|&nbsp; **Release date:** 25.10.2025

### Highlights

Infrastructure patch. Fixes incorrect dependency path resolution for EximeeBPMS artifacts in downstream Maven projects.

### Bug Fixes

- Fixed incorrect EximeeBPMS artifact path resolution in downstream Maven projects consuming snapshot or release artifacts.
- Fixed snapshot release workflow authentication token usage.
