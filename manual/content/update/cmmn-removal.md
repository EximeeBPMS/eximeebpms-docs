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

{{< note title="CMMN support removed in 1.4.0 (Community Edition)" class="warning" >}}
CMMN support is **deprecated as of EximeeBPMS 1.3.0** and will be **removed in 1.4.0**. This guide helps you detect CMMN usage in your environment and prepares you for a safe upgrade. It is not a guide to rewriting CMMN models — see [Mapping CMMN patterns to BPMN](#7-mapping-cmmn-patterns-to-bpmn) for that.
{{< /note >}}

{{< note title="Enterprise Edition: already removed as of 1.2.19-ee" class="warning" >}}
**This page describes the Community Edition timeline above.** For **Enterprise Edition**, CMMN was already **removed** (not merely deprecated) in [1.2.19-ee]({{< ref "/release-notes/release-notes-1.2-ee.md" >}}#12-19-ee) — ahead of the Community Edition schedule described above. Every statement on this page phrased as "will be removed in 1.4.0" or "as of 1.3.0" should be read as **already true today** for Enterprise Edition 1.2.19-ee and later. The detection queries, data-fate guarantees, and BPMN mapping table below still apply to both editions; only the timing differs.
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
| `active_case_instances` = 0 | The migration will proceed. **All CMMN data — deployed definitions, historic case/activity instances, and any residual runtime rows — is permanently deleted by the migration**, regardless of the other counts. Export anything you need to retain *before* upgrading (see [Fate of historical data](#3-fate-of-historical-data)). |
| `active_case_instances` > 0 | **Action required before upgrading** — the migration halts before making any changes (see [Handling active case instances](#2-handling-active-case-instances)). |

{{< note title="Test readiness without waiting for 1.4.0" class="info" >}}
Set `eximeebpms.bpm.cmmn-enabled=false` (Spring Boot) or `<property name="cmmnEnabled" value="false"/>` in your engine's XML configuration on 1.3.0. The engine then behaves like 1.4.0 — CMMN definitions and instances are ignored by queries and the deployment cache.
{{< /note >}}

## 2. Handling active case instances

If the query in step 1(2) returned a result greater than 0, finish or close those instances on version 1.3.0 before upgrading:

- **Java API:** `caseService.withCaseExecution(caseInstanceId).close().execute()` (or `.complete()` / `.terminate()`, depending on the modeled flow).
- **REST API:** `POST /case-instance/{id}/close`, `/complete`, or `/terminate`.

**1.4.0 behavior when `ACT_RU_CASE_EXECUTION` is not empty:** the `1.3-to-1.4` migration halts *before* making any schema changes, with an error along these lines:

```
Cannot upgrade to 1.4: active CMMN case instances exist in ACT_RU_CASE_EXECUTION.
This migration drops CMMN history and runtime tables unconditionally; 
complete or terminate all active case instances before upgrading.
```

Recognize this message in your runbooks. Exactly *when* you see it depends on how your deployment applies schema migrations: for setups with automatic schema updates enabled, this coincides with engine startup; for setups where migrations are applied as a separate step (a CI/CD job, a DBA-run script), it surfaces there instead.

**What to do when you see this error:** the migration halts *before* making any schema changes, so your database is left exactly as it was — there is nothing to roll back or repair. Finish or close the remaining active case instances as described above, then re-run the same migration step again; it will re-check `ACT_RU_CASE_EXECUTION` and proceed normally once the count is `0`.

{{< note title="Deployments with their own, non-engine migration tooling" class="warning" >}}
This fail-fast is implemented in the engine's own schema migration mechanism. If your deployment applies schema changes through separate, independent tooling that doesn't go through the engine's migration path, this guide's guarantees do not extend to it — that tooling is responsible for implementing equivalent protection itself before running the CMMN-removal step.
{{< /note >}}

## 3. Fate of historical data

**The migration deletes CMMN data unconditionally — there is no data-preservation guarantee.** Once the fail-fast check in step 2 passes (no active case instances), the migration drops:

- Deployed case definitions: `ACT_RE_CASE_DEF`
- Historic data: `ACT_HI_CASEINST`, `ACT_HI_CASEACTINST`
- Any remaining CMMN runtime tables: `ACT_RU_CASE_EXECUTION`, `ACT_RU_CASE_SENTRY_PART`

along with CMMN-specific columns on several shared runtime/history tables. This is irreversible — there is no downgrade script and no separate, opt-in cleanup step: the deletion happens as part of the migration itself, every time.

**Important consequence:** the REST history endpoints for case data **are removed in 1.4.0** along with the rest of the CMMN REST API (see [Impact on REST clients](#6-impact-on-rest-clients)). Organizations that need to retain CMMN history (for example, for retention or audit requirements) **must export it before upgrading** — there is no way to recover it afterward, from the REST API or by querying the database directly, since the tables themselves are gone. Run something like this against your 1.3.0 database, and save the results, before starting the upgrade:

```sql
SELECT ci.*, aci.CASE_ACT_ID_, aci.CASE_ACT_NAME_, aci.CREATE_TIME_, aci.END_TIME_
FROM ACT_HI_CASEINST ci
LEFT JOIN ACT_HI_CASEACTINST aci ON aci.CASE_INST_ID_ = ci.CASE_INST_ID_
ORDER BY ci.CASE_INST_ID_, aci.CREATE_TIME_;
```

## 4. Deployment validation

**1.4.0 behavior:** there is no more CMMN parser or deployer in the engine, and no CMMN-specific deployment-time check was added in its place. A `.cmmn`, `.cmmn10.xml`, or `.cmmn11.xml` file included in a deployment is **not rejected** — it is simply not recognized by any deployer, so it is stored as an opaque deployment resource without ever being parsed into a case definition. The deployment itself succeeds; the CMMN content inside it is silently inert.

Because there is no deployment-time safety net, **auditing your deployment artifacts before upgrading is the only reliable way to catch CMMN usage** — search your repositories and CI/CD pipelines for CMMN files:

```bash
grep -rl --include="*.cmmn" --include="*.cmmn10.xml" --include="*.cmmn11.xml" .
find . -iname "*.cmmn" -o -iname "*.cmmn10.xml" -o -iname "*.cmmn11.xml"
```

Setting `eximeebpms.bpm.cmmn-enabled=false` in 1.3.0 (see step 1) still lets you smoke-test the *runtime and query* impact of the removal ahead of time, but it does not simulate deployment-time behavior — deployment of `.cmmn` resources already succeeds unchanged under that flag, exactly as it will after upgrading.

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
