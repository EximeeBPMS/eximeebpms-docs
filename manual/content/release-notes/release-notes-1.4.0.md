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
- [**UUID v1 legacy generator removed**](#legacy-uuid-v1-generator-removed) — as announced in the [1.3.0 release notes]({{< ref "/release-notes/release-notes-1.3.0.md" >}}#uuid-v7-as-default-id-generator); `id-generator=uuid-v1` now silently falls back to the default (UUID v7) with a startup warning instead of activating the legacy generator
- Fixed a race in the External Task Client where `stop()` could return before an in-flight task handler invocation had finished
- [**Script Guard now behaves the same on Tomcat and WildFly**](#script-guard-container-deployments-configuration-and-retention) as it did on Spring Boot — violation persistence, business-event forwarding and database-authoritative policy, configured from `bpm-platform.xml`. The engine's boolean `scriptSecurityEnabled` configuration is replaced by the three-valued `scriptSecurityMode`
- [**Admin user bootstrap refuses to run beside an external identity provider**](#admin-user-bootstrap-refuses-to-run-beside-an-external-identity-provider) — `admin-user.id` together with OAuth2/OIDC or LDAP now fails startup instead of quietly creating a local full-privilege account
- [**Model API `camunda…` methods deprecated**](#model-api-camunda-method-names) — every `camunda`-named method on the BPMN and DMN Model APIs gains an `eximeeBpms…` counterpart; the old names keep working throughout 1.4.x and are removed in 1.5.0. No `.bpmn`/`.dmn` file changes

---

## Breaking changes

Everything on this list requires a decision or an action before you upgrade. Each entry links to the detail below.

**Supported container: Tomcat 11.** The standalone `eximeebpms-bpm-tomcat` distribution runs on **Tomcat 11.0.25** — Servlet 6.1, Jakarta EE 11, up from Servlet 6.0 / Jakarta EE 10 on the Tomcat 10.1 line that 1.3.0 shipped. This is a container generation change, not a patch bump. The **Run distribution is not affected** — it embeds Tomcat through Spring Boot and has been on the Tomcat 11 line since 1.3.0. Deploying the web application archives into your **own** Tomcat 10.1 still works — verified, see the detail. → [detail](#legacy-application-server-support-tomcat-9-wildfly-26-removed)

**Tomcat 9 and WildFly 26 distributions removed.** Both were the `javax`-namespace distributions, and this release builds Jakarta artifacts only. Upgrade the container before you upgrade EximeeBPMS. → [detail](#legacy-application-server-support-tomcat-9-wildfly-26-removed)

**javax (legacy) namespace dropped.** Recompile against the `jakarta.*` APIs and replace every `javax`-targeted artifact with its Jakarta counterpart. There is no javax-compatible build of this release. → [detail](#javax-legacy-namespace-support-dropped)

**CMMN support removed.** Complete or terminate every active case instance before upgrading — the migration halts before making any schema change while rows remain in `ACT_RU_CASE_EXECUTION`. Once it proceeds, CMMN history and deployed case definitions are dropped unconditionally. There is no migrator; the replacement path is remodeling the case in BPMN. → [detail](#cmmn-support-removed) · [CMMN Deprecation & Removal]({{< ref "/update/cmmn-removal.md" >}})

**`camunda:caseRef` on a call activity is rejected at deploy time.** Previously such a model deployed and failed when the process instance started. Remove the attribute from every call activity that still carries it and redeploy those process definitions before upgrading — a model that keeps it now fails deployment.

**Java 21 is the minimum.** Up from Java 17. → [detail](#java-21-baseline)

**Script Guard: `scriptSecurityEnabled` is replaced by `scriptSecurityMode`.** `isScriptSecurityEnabled()` / `setScriptSecurityEnabled(boolean)` are gone; `setScriptSecurityEnabled(false)` becomes `setScriptSecurityMode("DISABLED")`. An unrecognized value now fails engine startup instead of being ignored. → [detail](#script-guard-container-deployments-configuration-and-retention)

**Script Guard: `eximeebpms.bpm.script-security.cleanup-cron` is removed.** Violation retention is now an engine job on a fixed 24-hour interval, gated on `retention-days`. Applications that only customized the schedule can drop the property; the cleanup frequency is no longer configurable. → [detail](#script-guard-container-deployments-configuration-and-retention)

**Admin-user bootstrap fails fast beside an external identity provider.** `eximeebpms.bpm.admin-user.id` together with an OAuth2/OIDC client registration or a read-only identity provider now fails startup. Set `eximeebpms.bpm.admin-user.allow-with-external-identity-provider` to keep the old behaviour deliberately. → [detail](#admin-user-bootstrap-refuses-to-run-beside-an-external-identity-provider)

**Telemetry payload field renamed.** The serialized field `camunda-integration` becomes `eximeebpms-integration`, and the reported product name is `EximeeBPMS BPM Runtime`. Anything parsing collected diagnostics — a dashboard, a SIEM pipeline, an inventory job — must be updated; the old key is no longer emitted.

**SQL Server: `image` columns become `varbinary(max)`.** `ACT_ID_INFO.PASSWORD_`, `ACT_GE_BYTEARRAY.BYTES_` and `ACT_HI_COMMENT.FULL_MSG_` are converted by the `1.3-to-1.4` upgrade script, because Microsoft has deprecated `image`/`text`/`ntext`. Nothing to plan for: the two types share the same LOB storage, so SQL Server applies this as a metadata-only change — measured on a 1 GB `ACT_GE_BYTEARRAY` at 4 ms, with no LOB page rewritten. No maintenance window is needed.

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

Following the deprecation announced in 1.3.0, the `distro/wildfly26` distribution module and the Tomcat 9 QA test runtime are removed. Supported containers are now **Tomcat 11.0.25+** and **WildFly 41.0.1.Final+** — see the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}}) and [Supported Environments]({{< ref "/introduction/supported-environments.md" >}}).

**Why these two.** Both were the `javax`-namespace distributions. Tomcat 9 is the last Tomcat line built on `javax.servlet`; Tomcat 10 moved the whole servlet API to `jakarta.*`. The `wildfly26` module was likewise assembled from the pre-Jakarta artifacts, while the current WildFly distribution uses the `-jakarta` ones. With the javax namespace dropped in this release (see [below](#javax-legacy-namespace-support-dropped)), the build produces Jakarta artifacts only, and there is nothing left for a javax container to deploy.

This is a statement about what this platform builds, not about Tomcat 9 itself: Apache lists end of support for the Tomcat 9.0.x line as no earlier than 31 March 2027 ([Which version do I want?](https://tomcat.apache.org/whichversion.html)). If you run Tomcat 9, it is your EximeeBPMS distribution that requires the container upgrade, not Tomcat 9 that has run out.

{{< note title="Tomcat 10.1 → 11: a container generation change, not just a Tomcat 9 removal" class="warning" >}}
Alongside the Tomcat 9 removal above, the standalone `eximeebpms-bpm-tomcat` distribution itself moves from the **Tomcat 10.1** line to **Tomcat 11** (Servlet 6.1, Jakarta EE 11 — up from Servlet 6.0 / Jakarta EE 10). If you are running the Tomcat distribution — including if you were already on Tomcat 10.1, not just Tomcat 9 — this is a container upgrade, not a patch bump: plan for it the same way you would any major application-server upgrade.

**This does not apply to the Run distribution.** `eximeebpms-bpm-run` embeds Tomcat through Spring Boot, and Spring Boot moved to the Tomcat 11 line a release earlier: 1.3.0 shipped Spring Boot 4.0.3, which manages Tomcat 11.0.18, so Run was never on Tomcat 10.1. Nothing about its container changes here. 1.4.0 only pins the embedded Tomcat explicitly to the same patch release as the standalone distribution (11.0.25) — Spring Boot 4.1.1 manages 11.0.24 — so that every Tomcat jar on the classpath comes from one release.

**The web application archives themselves still deploy on Tomcat 10.1.** If you run your own container and deploy `eximeebpms-webapp-tomcat-jakarta` and `eximeebpms-engine-rest-jakarta` into it, rather than using our distribution, you are not forced onto Tomcat 11 by this release. Verified on 2026-09-15 against a stock **Tomcat 10.1.50** — the version 1.3.0 shipped — with the 1.4.0 platform libraries and `bpm-platform.xml`: the server started in 12 seconds with no warning or error in `catalina.out`, the engine came up (`ENGINE-00001 Process Engine default created`, job executor acquiring), `GET /engine-rest/engine` returned `[{"name":"default"}]` and Cockpit redirected to the first-run admin setup page as it should on an empty database.

This is not an accident of versions: both archives declare a **Servlet 3.0** deployment descriptor (`web-app version="3.0"`) and carry `jakarta.*` classes, so they ask for no Servlet 6.1 feature. Tomcat 10.1 (Servlet 6.0) satisfies them as fully as Tomcat 11 does. The supported container for the *distribution* is still Tomcat 11 — see [Supported Environments]({{< ref "/introduction/supported-environments.md" >}}).
{{< /note >}}

### javax (Legacy) Namespace Support Dropped {#javax-legacy-namespace-support-dropped}

The engine and its Spring Boot / Quarkus integrations, distributions, and clients are now built exclusively against the **Jakarta EE** namespace; the `javax`-based legacy build path is removed. This mirrors the Enterprise Edition, which dropped `javax` support earlier. Embedded-engine users still referencing `javax.*` APIs for engine integration need to migrate to the corresponding `jakarta.*` types before upgrading.

### Legacy UUID v1 Generator Removed {#legacy-uuid-v1-generator-removed}

Following the deprecation announced in [1.3.0]({{< ref "/release-notes/release-notes-1.3.0.md" >}}#uuid-v7-as-default-id-generator) (Community Edition) / [1.2.19-ee]({{< ref "/release-notes/release-notes-1.2-ee.md" >}}#12-19-ee) (Enterprise Edition), `UuidV1Generator` is **removed** in 1.4.0. Setting `id-generator` to `uuid-v1` (Spring Boot, Quarkus, or `bpm-platform.xml`) no longer selects it — the process engine falls back to `StrongUuidGenerator` (UUID v7, the default) instead, and logs a warning at startup. Remove the `id-generator=uuid-v1` setting from your configuration; it no longer has any effect.

→ [Id Generators — Legacy UUID v1 Generator]({{< ref "/user-guide/process-engine/id-generator.md" >}}#legacy-uuid-v1-generator-removed)

---

## Changed

### Java 21 Baseline

The minimum and CI-verified Java version moves from **17** to **21**. **JDK 25** is additionally verified in the CI matrix alongside JDK 21, mirroring the Enterprise Edition's 1.3.1-ee tech stack.

### Dependency Updates

A broad set of dependencies was updated, including several security-motivated upgrades — see [Security](#security) below and the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}}) for the full, version-by-version breakdown (Spring Boot, Spring Framework, Quarkus, Groovy, Jackson, Liquibase, Tomcat, WildFly, Netty, Apache Ant, database JDBC drivers, and more).

### Script Guard — Container Deployments, Configuration, and Retention {#script-guard-container-deployments-configuration-and-retention}

Script Guard shipped in [1.3.0]({{< ref "/release-notes/release-notes-1.3.0.md" >}}), but only a Spring Boot application got the whole mechanism. From 1.4.0 a plain-XML container deployment (Tomcat, WildFly, anything driven by `bpm-platform.xml`) gets the same behaviour: violations are persisted to `ACT_RU_SCRIPT_VIOLATION`, forwarded to the business-event outbox, and the configured mode and allowlist are seeded into `ACT_GE_PROPERTY` on first start. That last part is what makes the Script Guard REST API's hot policy reload work on those deployments too, instead of the policy being fixed for the lifetime of the process. Three properties are read from `bpm-platform.xml`: `scriptSecurityMode`, `scriptSecurityAllowlistedProcessDefinitionKeys` and `scriptViolationRetentionDays`.

**Breaking — engine configuration API.** `ProcessEngineConfigurationImpl`'s boolean `scriptSecurityEnabled` is replaced by the three-valued `scriptSecurityMode` (`ENFORCE` — the default, `AUDIT`, `DISABLED`). `isScriptSecurityEnabled()` and `setScriptSecurityEnabled(boolean)` are gone: `setScriptSecurityEnabled(false)` becomes `setScriptSecurityMode("DISABLED")`, and `isScriptSecurityDisabled()`/`isScriptSecurityAuditMode()` query the current setting. An unrecognized value now fails engine startup with a configuration error instead of being silently ignored. The Spring Boot property `eximeebpms.bpm.script-security.mode` is unaffected — it already took these three values in 1.3.0.

**Breaking — Spring Boot retention schedule.** `eximeebpms.bpm.script-security.cleanup-cron`, and the scheduled bean behind it, are removed. Violation retention is now an engine-native job: it is created whenever `retention-days` is positive, deletes violations older than that, and reschedules itself 24 hours ahead. It therefore runs identically on every deployment model and no longer needs `@EnableScheduling` on the application — but the cleanup schedule is no longer configurable as a cron expression.

→ [Script Guard]({{< ref "/user-guide/process-engine/script-guard.md" >}})

### Admin User Bootstrap Refuses to Run Beside an External Identity Provider {#admin-user-bootstrap-refuses-to-run-beside-an-external-identity-provider}

**Breaking.** Setting `eximeebpms.bpm.admin-user.id` while an OAuth2/OIDC client registration (`spring.security.oauth2.client.registration.*`) or a read-only identity provider — such as the LDAP identity provider plugin — is also configured now **fails startup** with a configuration error. Previously the first case quietly created a local, full-privilege account alongside single sign-on, and the second failed with an opaque `ProcessEngineException` about a missing `WritableIdentityProvider` session factory.

Set the new `eximeebpms.bpm.admin-user.allow-with-external-identity-provider` (default `false`) to keep the old behaviour deliberately — for example for a break-glass account. With a writable provider the account is then created as before; with a read-only provider it cannot be created at all, so startup continues without it and logs a warning instead. When single sign-on is the intended sign-in path, prefer granting administrator rights through the [Administrator Authorization Plugin]({{< ref "/user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}}), which grants them to an existing identity rather than creating a second, local one.

→ [Spring Boot Configuration]({{< ref "/user-guide/spring-boot-integration/configuration.md" >}}) · [Spring Security]({{< ref "/user-guide/spring-boot-integration/spring-security.md" >}})

### SQL Migration Scripts Split Between 1.3 and 1.4

Schema migration scripts are now split per target version instead of being bundled together, giving the engine a dedicated `1.3-to-1.4` upgrade path — this is what the CMMN-removal migration (see above) runs on.

---

## Bug Fixes

### External Task Client — `stop()` Could Return Before In-Flight Executions Finished

In the multi-threaded External Task Client introduced in [1.3.0]({{< ref "/release-notes/release-notes-1.3.0.md" >}}#multi-threaded-external-task-client), calling `stop()` unlocked pending (not-yet-started) tasks correctly, but could return while a task handler invocation already dispatched to the thread pool was still running — racing whatever cleanup the caller performed right after `stop()` returned. `stop()` now additionally waits (up to 10 seconds) for in-flight handler executions to finish before returning.

---

## Deprecations

### Model API `camunda…` Method Names {#model-api-camunda-method-names}

Every `camunda`-named public method on the [BPMN Model API]({{< ref "/user-guide/model-api/bpmn-model-api/_index.md" >}}) and the [DMN Model API]({{< ref "/user-guide/model-api/dmn-model-api/_index.md" >}}) now has an `EximeeBpms`-named counterpart, and the `camunda`-named one is deprecated. This completes a rebrand that previously covered only the extension-element *types* — which is why `UserTask` shipped `getEximeeBpmsFormRef()` next to `getCamundaFormKey()`.

Affected: 80 fluent-builder methods across 19 builder classes (`camundaAsyncBefore()` → `eximeeBpmsAsyncBefore()`, `camundaClass()` → `eximeeBpmsClass()`, `camundaInSourceTarget()` → `eximeeBpmsInSourceTarget()`, …), 147 accessors on 34 interfaces under `org.eximeebpms.bpm.model.bpmn.instance` (`getCamundaFormKey()` → `getEximeeBpmsFormKey()`, …), and 6 accessors on `Decision`/`InputClause` in the DMN Model API.

**Nothing breaks in 1.4.x.** The old names remain and behave identically for the whole 1.4 line. Migration is a mechanical rename — `camundaX` → `eximeeBpmsX`, `getCamundaX` → `getEximeeBpmsX`.

{{< note title="Scheduled for removal in 1.5.0" class="warning" >}}
The `camunda`-named methods are annotated `@Deprecated(forRemoval = true)` and **will be removed in 1.5.0**. Plan the rename during the 1.4 line rather than at the 1.5.0 upgrade.
{{< /note >}}

Two method families were already deprecated before this change and get counterparts that are themselves deprecated, so that a bulk rename still compiles — use the replacement named in each case rather than the new alias: `camundaAsync()`/`camundaAsync(boolean)` (use `eximeeBpmsAsyncBefore()` or `eximeeBpmsAsyncAfter()`) and `Decision.getCamundaHistoryTimeToLive(Integer)` with its setter (use the `String`-typed variant).

**Your `.bpmn` and `.dmn` files are unaffected.** The extension namespace URI stays `http://camunda.org/schema/1.0/bpmn` (and `…/1.0/dmn`) and the attribute names stay as they are — the engine resolves extension attributes by namespace URI, not by Java method name or XML prefix. No process definition needs editing, and no redeployment is required for this change.

---

## Security

Six sets of CVE fixes previously shipped only in the Enterprise Edition track are now included in the Community Edition, via the dependency upgrades in this release. Full details for each are published on the [Security Notices](/security/notices/) page.

| Notice | Component | CVEs | Fixed via |
|---|---|---|---|
| [EXBPMS-7](/security/notices/#notice-exbpms-7) | jackson-databind | [CVE-2023-35116](https://nvd.nist.gov/vuln/detail/CVE-2023-35116) | jackson-databind → 2.22.1 |
| [EXBPMS-8](/security/notices/#notice-exbpms-8) | Jython | [CVE-2016-4000](https://nvd.nist.gov/vuln/detail/CVE-2016-4000) | Jython → 2.7.4 |
| [EXBPMS-9](/security/notices/#notice-exbpms-9) | Spring Framework | [CVE-2026-22740](https://spring.io/security/cve-2026-22740/), [CVE-2026-22741](https://spring.io/security/cve-2026-22741/), [CVE-2026-22745](https://github.com/advisories/GHSA-6p4f-wcwh-5vvm), [CVE-2026-22737](https://spring.io/security/cve-2026-22737/), [CVE-2026-22735](https://spring.io/security/cve-2026-22735/) | Spring Framework → 7.0.8 |
| [EXBPMS-10](/security/notices/#notice-exbpms-10) | Apache Tomcat / Tomcat Native | [CVE-2026-29145](https://nvd.nist.gov/vuln/detail/CVE-2026-29145), [CVE-2026-29129](https://nvd.nist.gov/vuln/detail/CVE-2026-29129), [CVE-2026-24734](https://nvd.nist.gov/vuln/detail/CVE-2026-24734), [CVE-2026-24733](https://nvd.nist.gov/vuln/detail/CVE-2026-24733) | Tomcat → 11.0.25 |
| [EXBPMS-11](/security/notices/#notice-exbpms-11) | Netty / Apache Ant | [CVE-2024-29025](https://github.com/advisories/GHSA-5jpm-x58v-624v), [CVE-2021-36373](https://nvd.nist.gov/vuln/detail/CVE-2021-36373), [CVE-2021-36374](https://nvd.nist.gov/vuln/detail/CVE-2021-36374), [CVE-2020-1945](https://nvd.nist.gov/vuln/detail/CVE-2020-1945) | Netty → 4.1.135.Final, Apache Ant → 1.10.17 |
| [EXBPMS-12](/security/notices/#notice-exbpms-12) | Apache HttpComponents Core 5 / Netty | 23 CVEs — see the notice for the full list | HttpComponents Core 5 → 5.4.3, Netty → 4.1.137.Final |

{{< note title="" class="info" >}}
[EXBPMS-13](/security/notices/#notice-exbpms-13) is also resolved in this release (WireMock's bundled Jetty forced to 12.0.39, webapps' local-development server moved onto the Jetty EE10 Maven plugin 12.1.12), but it is deliberately not listed above: Jetty is a test- and tooling-only dependency here, excluded from every released artifact, so no shipped component was ever affected.

The remaining dependency updates in this release (H2, Liquibase, MySQL Connector/J, Oracle JDBC, PostgreSQL JDBC, Microsoft SQL Server JDBC, Kafka Clients, RESTEasy, Groovy, Jakarta XML Bind API, ShrinkWrap Resolvers, Spring Boot, WildFly, and others) are routine security-motivated bumps; no additional CVE was identified whose affected-version range matches this release's starting versions for those components.
{{< /note >}}
