---

title: "CMMN Deprecation & Removal"
weight: 40

menu:
  main:
    name: "CMMN Deprecation & Removal"
    identifier: "cmmn-removal"
    parent: "migration-guide"
    pre: "Guides you through detecting CMMN usage and safely upgrading to 1.4.0"

---

{{< note title="Enterprise Edition: already removed as of 1.2.19-ee" class="warning" >}}
**This page describes the Community Edition timeline.** For **Enterprise Edition**, CMMN was already **removed** (not merely deprecated) in [1.2.19-ee]({{< ref "/release-notes/release-notes-1.2-ee.md" >}}#12-19-ee) — ahead of the Community Edition schedule described below. Every statement on this page phrased as "will be removed in 1.4.0" or "as of 1.3.0" should be read as **already true today** for Enterprise Edition 1.2.19-ee and later. The detection queries, data-fate guarantees, and BPMN mapping table below still apply to both editions; only the timing differs.
{{< /note >}}

{{< note title="CMMN support removed in 1.4.0 (Community Edition)" class="warning" >}}
CMMN support is **deprecated as of EximeeBPMS 1.3.0** and will be **removed in 1.4.0**. This guide helps you detect CMMN usage in your environment and prepares you for a safe upgrade. It is not a guide to rewriting CMMN models — see [Mapping CMMN patterns to BPMN](#7-mapping-cmmn-patterns-to-bpmn) for that.
{{< /note >}}

## Why CMMN is being removed

Adoption data shows marginal usage of the CMMN notation. EximeeBPMS is concentrating investment on BPMN, Human Workflow, and business orchestration. **Case management patterns remain fully supported through BPMN** — see the mapping table below.

This change applies to both the Open Source and Enterprise editions, though not at the same time — see the Enterprise Edition note above.

## 1. Detect CMMN usage

Check three categories of data in your database: deployed definitions, active instances, and historic data.

### PostgreSQL / Oracle

```sql
-- (1) Deployed CMMN definitions
SELECT COUNT(*) AS deployed_case_definitions FROM ACT_RE_CASE_DEF;

-- (2) Active case instances (a row with no PARENT_ID_ is a top-level instance, not a sub-execution)
SELECT COUNT(*) AS active_case_instances
FROM ACT_RU_CASE_EXECUTION
WHERE PARENT_ID_ IS NULL;

-- (3) Historic CMMN data
SELECT COUNT(*) AS historic_case_instances FROM ACT_HI_CASEINST;
SELECT COUNT(*) AS historic_case_activity_instances FROM ACT_HI_CASEACTINST;
```

### Interpreting the results

| Result | Meaning |
|---|---|
| All queries return 0 | No action needed — the upgrade to 1.4.0 will proceed without issues. |
| `active_case_instances` = 0, but historic counts > 0 | The upgrade will proceed. Historic CMMN data remains untouched in the database (see [Fate of historical data](#3-fate-of-historical-data)). |
| `active_case_instances` > 0 | **Action required before upgrading** — see [Handling active case instances](#2-handling-active-case-instances). |
| `deployed_case_definitions` > 0, but no instances | Definitions remain in the database; the engine neither reads nor removes them (see [Deployment validation](#4-deployment-validation)). |

{{< note title="Test readiness without waiting for 1.4.0" class="info" >}}
Set `eximeebpms.bpm.cmmn-enabled=false` (Spring Boot) or `<property name="cmmnEnabled" value="false"/>` in your engine's XML configuration on 1.3.0. The engine then behaves like 1.4.0 — CMMN definitions and instances are ignored by queries and the deployment cache.
{{< /note >}}

## 2. Handling active case instances

If the query in step 1(2) returned a result greater than 0, finish or close those instances on version 1.3.0 before upgrading:

- **Java API:** `caseService.withCaseExecution(caseInstanceId).close().execute()` (or `.complete()` / `.terminate()`, depending on the modeled flow).
- **REST API:** `POST /case-instance/{id}/close`, `/complete`, or `/terminate`.

**1.4.0 behavior when `ACT_RU_CASE_EXECUTION` is not empty:** the engine performs a **fail-fast at startup** with a message indicating that active case instances are blocking the upgrade and pointing to this guide. Recognize this message in your runbooks.

## 3. Fate of historical data

**Guarantee:** 1.4.0 does not read, modify, or delete CMMN history tables. Schema migration scripts do not touch them.

Tables covered by this guarantee: `ACT_HI_CASEINST`, `ACT_HI_CASEACTINST`.

**Important consequence:** the REST history endpoints for case data **are removed in 1.4.0** along with the rest of the CMMN REST API (see [Impact on REST clients](#6-impact-on-rest-clients)). Organizations that need access to CMMN history after the upgrade (for example, retention or audit requirements) must export the data beforehand, or query the tables directly with SQL afterward, for example:

```sql
SELECT ci.*, aci.CASE_ACT_ID_, aci.CASE_ACT_NAME_, aci.CREATE_TIME_, aci.END_TIME_
FROM ACT_HI_CASEINST ci
LEFT JOIN ACT_HI_CASEACTINST aci ON aci.CASE_INST_ID_ = ci.CASE_INST_ID_
WHERE ci.CLOSE_TIME_ >= :retentionCutoffDate
ORDER BY ci.CASE_INST_ID_, aci.CREATE_TIME_;
```

An optional, separately distributed cleanup script for CMMN historic data (data removal, not schema removal) will be made available independently — to be run only at your own discretion, after taking a backup.

## 4. Deployment validation

**1.4.0 behavior:** deploying a package that contains a `.cmmn`, `.cmmn10.xml`, or `.cmmn11.xml` file results in the **whole deployment being explicitly rejected** with a clear error — files are never silently skipped.

**Audit your deployment artifacts before upgrading** — search your repositories and CI/CD pipelines for CMMN files:

```bash
grep -rl --include="*.cmmn" --include="*.cmmn10.xml" --include="*.cmmn11.xml" .
find . -iname "*.cmmn" -o -iname "*.cmmn10.xml" -o -iname "*.cmmn11.xml"
```

**Smoke-test your whole environment:** setting `eximeebpms.bpm.cmmn-enabled=false` in 1.3.0 (see step 1) lets you verify deployment behavior before the actual upgrade.

## 5. Impact on embedded engine code

The following public Java API classes and interfaces are marked `@Deprecated` as of 1.3.0 and **will be removed in 1.4.0**. To find usages in your code, search for references to the classes below, or compile with `-Xlint:deprecation`.

| Package | Classes / interfaces |
|---|---|
| `org.eximeebpms.bpm.engine` | `CaseService` |
| `org.eximeebpms.bpm.engine.repository` | `CaseDefinition`, `CaseDefinitionQuery` |
| `org.eximeebpms.bpm.engine.runtime` | `CaseInstance`, `CaseInstanceQuery`, `CaseInstanceBuilder`, `CaseExecution`, `CaseExecutionQuery`, `CaseExecutionCommandBuilder` |
| `org.eximeebpms.bpm.engine.delegate` | `CaseExecutionListener`, `CaseVariableListener` |
| `org.eximeebpms.bpm.engine.exception.cmmn` | `CaseException`, `CaseDefinitionNotFoundException`, `CaseExecutionNotFoundException`, `CaseIllegalStateTransitionException`, `CmmnModelInstanceNotFoundException` |
| `org.eximeebpms.bpm.model.cmmn` (module `model-api/cmmn-model`) | `CmmnModelInstance` |

Embedded-engine users who implement `CaseExecutionListener` / `CaseVariableListener`, or call `CaseService` directly, will get compile errors after upgrading to 1.4.0 — removing these references is a prerequisite for the upgrade.

## 6. Impact on REST clients

The following REST endpoints disappear in 1.4.0 (marked `@Deprecated` as of 1.3.0, with `Deprecation: true` and `Sunset` response headers per RFC 8594):

| Resource | Base path | Notes |
|---|---|---|
| Case definition | `/case-definition` | plus sub-resources: `/case-definition/{id}`, `/key/{key}`, `/xml`, `/diagram`, `/create`, `/history-time-to-live` |
| Case instance | `/case-instance` | plus sub-resources: `/case-instance/{id}`, `/complete`, `/close`, `/terminate`, `/variables` |
| Case execution | `/case-execution` | plus sub-resources: `/case-execution/{id}`, `/manual-start`, `/disable`, `/reenable`, `/complete`, `/terminate`, `/localVariables`, `/variables` |
| Case instance history | `/history/case-instance` | |
| Case activity instance history | `/history/case-activity-instance` | |
| Case definition history | `/history/case-definition/{id}/statistics`, `/history/case-definition/cleanable-case-instance-report` | |

If your client is generated from the published OpenAPI specification, you will not see CMMN there — these endpoints were never part of the public OpenAPI spec. If you call these paths manually or from Javadoc-based documentation, use the list above.

## 7. Mapping CMMN patterns to BPMN

The table below is a starting point, not a mechanical recipe — CMMN patterns do not map 1:1 onto BPMN.

| CMMN pattern | BPMN equivalent |
|---|---|
| Human task in a case | User task, or an ad-hoc subprocess containing a single user task |
| Sentry / entry-exit criteria | Conditional events + event subprocess |
| Discretionary items | Dynamically activated tasks inside an ad-hoc subprocess |
| Milestones | Intermediate events, or explicit process state (status variable + gateway) |
| Case plan model (top-level container) | Main process, or a top-level ad-hoc subprocess |

## 8. Feedback channel

If you have questions about migrating your specific CMMN use case, reach out via GitHub Discussions / the issue tracker before planning your 1.4.0 upgrade — every report of production CMMN usage will be reviewed individually.
