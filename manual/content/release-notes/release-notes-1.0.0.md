---

title: "EximeeBPMS 1.0.0 Release Notes"
weight: 50

menu:
  main:
    name: "1.0.0"
    identifier: "release-notes-1.0.0"
    parent: "release-notes"

---

**Edition:** Community &nbsp;|&nbsp; **Release date:** 16.04.2025

---

## Highlights

- **Initial release** of EximeeBPMS — a fully open-source BPMN 2.0 process engine and ecosystem
- Forked from **Camunda Platform 7.23.0**, retaining full API and database schema compatibility
- New REST and Java API: filter process instances by `rootProcessInstanceId`

---

## New Features

### Filter Process Instances by Root Process Instance ID

`GET /process-instance` (REST API) and `RuntimeService.createProcessInstanceQuery()` (Java API) now accept `rootProcessInstanceId` as a filter parameter. This allows callers to retrieve all instances belonging to the same process hierarchy root — particularly useful in deployments that make heavy use of call activities.

→ [Process Engine API]({{< ref "/user-guide/process-engine/process-engine-api.md" >}})

---

## Technical Updates

### Platform Baseline

EximeeBPMS 1.0.0 ships with the following component versions inherited from Camunda Platform 7.23.0:

| Component | Version |
|-----------|---------|
| Java (minimum) | 17 |
| Spring Boot | 3.4.4 |
| Spring Framework | 6.2.4 |
| MyBatis | 3.5.15 |
| Quarkus | 3.20.0 |
| Tomcat 10 | 10.1.36 |
| WildFly | 35.0.0.Final |

### Resolved CVE Vulnerabilities

No CVE-targeted fixes in this release.

---

## Known Limitations

Re-branding of upstream Camunda artifacts (license headers, Javadoc tags, legacy forum links) is intentionally incomplete in this release. CMMN 1.1 is present in this release.
