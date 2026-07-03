---

title: "EximeeBPMS 1.2.0 Release Notes"
weight: 30

menu:
  main:
    name: "1.2.0"
    identifier: "release-notes-1.2.0"
    parent: "release-notes"

---

**Edition:** Community &nbsp;|&nbsp; **Release date:** 10.03.2026

---

## Highlights

- **Spring Boot 4** and **Spring Framework 7** — the first EximeeBPMS release on the Spring Boot 4 generation
- Full **Jakarta EE** namespace throughout the engine and integrations (`jakarta.*` replaces `javax.*`)
- **Tomcat 10.1** as the primary servlet container
- **Hibernate 7** and **Jetty 11** aligning the full stack with the current Jakarta EE generation

---

## Breaking Changes

### Spring Boot 3 → Spring Boot 4

Spring Boot 4 requires Spring Framework 7. Upgrading from 1.1.x requires:

1. Replace all `javax.*` imports in application code with `jakarta.*`.
2. Review [Spring Boot 4 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.0-Migration-Guide) for property renames and removed auto-configurations.
3. Verify that third-party Spring extensions are compatible with Spring Boot 4.

→ [Spring Boot Integration — Configuration]({{< ref "/user-guide/spring-boot-integration/configuration.md" >}})

### Hibernate 5 → Hibernate 7

Hibernate ORM 7 aligns with Jakarta Persistence 3.2. Custom JPA mappings or Hibernate-specific APIs in application code must be reviewed for compatibility. The engine itself uses MyBatis for its own persistence and is not affected.

### Jetty 9 → Jetty 11

Jetty 11 uses the `jakarta.servlet` API. Embedded Jetty configurations in tests or integrations must be updated accordingly.

---

## Configuration Changes

Spring Boot 4 renames several auto-configuration properties. Review the official Spring Boot 4 migration guide for the full list. The engine-specific `eximeebpms.bpm.*` namespace is unchanged.

---

## Technical Updates

### Dependency Updates

| Dependency | Previous | Updated |
|------------|----------|---------|
| Spring Boot | 3.5.6 | 4.0.3 |
| Spring Framework | 5.3.39 | 7.0.5 |
| Tomcat 10 | 10.1.43 | 10.1.50 |
| Tomcat 9 | 9.0.107 | 9.0.113 |
| Jakarta Persistence API | 3.1.0 | 3.2.0 |
| Hibernate | 5.6.5.Final | 7.2.0.Final |
| Jetty | 9.4.57.v20241219 | 11.0.26 |
| AssertJ | 2.9.1 | 3.27.6 |
| Logback Classic | 1.2.11 | 1.2.13 |
| Selenium Java | 4.10.0 | 4.39.0 |
| ShrinkWrap Resolvers | 2.2.7 | 3.3.4 |
| Maven Surefire Plugin | 2.22.2 | 3.5.5 |
| Cargo Maven Plugin | 1.10.20 | 1.10.26 |

---

## Security

No CVE-targeted dependency fixes in this release. The dependency upgrades move the platform to library versions with no known high-severity vulnerabilities at time of release.
