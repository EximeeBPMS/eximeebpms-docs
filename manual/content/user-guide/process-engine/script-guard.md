---

title: 'Script Guard'
weight: 82

menu:
  main:
    identifier: "user-guide-process-engine-script-guard"
    parent: "user-guide-process-engine"

---

Script Guard is an EximeeBPMS feature that inspects scripts before execution and blocks — or audits — patterns that could lead to remote code execution, data exfiltration, or other security incidents. It works at the engine level, independently of the scripting language in use.

Script Guard applies to all scripts executed by the process engine: Script Tasks, Execution Listeners, Task Listeners, Condition Expressions, and Input/Output Mappings, as well as scripts submitted dynamically via the REST API or Java API.

# Enforcement Modes

Script Guard operates in three modes:

<table class="table desc-table">
  <tr>
    <th>Mode</th>
    <th>Behavior</th>
  </tr>
  <tr>
    <td><code>ENFORCE</code></td>
    <td>Scripts containing forbidden patterns are <strong>rejected</strong>. A <code>ScriptSecurityException</code> is thrown before the script executes.</td>
  </tr>
  <tr>
    <td><code>AUDIT</code></td>
    <td>Violations are <strong>recorded</strong> but execution continues. Use this mode to inspect existing processes before enabling enforcement.</td>
  </tr>
  <tr>
    <td><code>DISABLED</code></td>
    <td>No checks are performed. Script Guard is inactive.</td>
  </tr>
</table>

The mode is only ever *read* from static configuration once — the first time the engine starts against a database with no Script Guard configuration stored yet. From then on the database is authoritative, and the mode can only be changed at runtime via the [REST API](#rest-api), without restarting the engine — see [Configuration](#configuration) for exactly how that works. All engine nodes pick up a REST-driven change within 30 seconds.

# Blocked Patterns

The built-in policy checks the script source (case-insensitively) against the following patterns:

<table class="table desc-table">
  <tr>
    <th>Rule code</th>
    <th>Blocked construct</th>
    <th>Risk</th>
  </tr>
  <tr><td><code>SCRIPT_SECURITY_LOAD</code></td><td><code>load(</code></td><td>External script loading</td></tr>
  <tr><td><code>SCRIPT_SECURITY_CLASS_FOR_NAME</code></td><td><code>Class.forName(</code></td><td>Dynamic class loading</td></tr>
  <tr><td><code>SCRIPT_SECURITY_CLASS_LOADER</code></td><td><code>getClassLoader(</code></td><td>Class loader access</td></tr>
  <tr><td><code>SCRIPT_SECURITY_REFLECTION</code></td><td><code>java.lang.reflect.</code></td><td>Reflection API</td></tr>
  <tr><td><code>SCRIPT_SECURITY_REFLECTION_METHOD</code></td><td><code>getDeclaredMethod(</code></td><td>Method reflection</td></tr>
  <tr><td><code>SCRIPT_SECURITY_REFLECTION_FIELD</code></td><td><code>getDeclaredField(</code></td><td>Field reflection</td></tr>
  <tr><td><code>SCRIPT_SECURITY_PROCESS_BUILDER</code></td><td><code>ProcessBuilder</code></td><td>OS process execution</td></tr>
  <tr><td><code>SCRIPT_SECURITY_RUNTIME</code></td><td><code>java.lang.Runtime</code></td><td>JVM runtime access</td></tr>
  <tr><td><code>SCRIPT_SECURITY_RUNTIME_EXEC</code></td><td><code>Runtime.getRuntime(</code></td><td>OS command execution</td></tr>
  <tr><td><code>SCRIPT_SECURITY_JAVA_LANG_SYSTEM</code></td><td><code>java.lang.System</code></td><td>System class access</td></tr>
  <tr><td><code>SCRIPT_SECURITY_SYSTEM_EXIT</code></td><td><code>System.exit(</code></td><td>JVM shutdown</td></tr>
  <tr><td><code>SCRIPT_SECURITY_SYSTEM_GETENV</code></td><td><code>System.getenv(</code></td><td>Environment variable access</td></tr>
  <tr><td><code>SCRIPT_SECURITY_SYSTEM_GET_PROPERTY</code></td><td><code>System.getProperty(</code></td><td>System property access</td></tr>
  <tr><td><code>SCRIPT_SECURITY_JAVA_IO</code></td><td><code>java.io.*</code></td><td>File system access</td></tr>
  <tr><td><code>SCRIPT_SECURITY_JAVA_NIO_FILE</code></td><td><code>java.nio.file.*</code></td><td>NIO file system access</td></tr>
  <tr><td><code>SCRIPT_SECURITY_JAVA_NIO_FILE_CHANNEL</code></td><td>NIO file channels</td><td>Low-level file I/O</td></tr>
  <tr><td><code>SCRIPT_SECURITY_JAVA_NIO_NETWORK_CHANNEL</code></td><td>NIO network channels</td><td>Network socket access</td></tr>
  <tr><td><code>SCRIPT_SECURITY_JAVA_NET</code></td><td><code>java.net.*</code></td><td>Network access</td></tr>
  <tr><td><code>SCRIPT_SECURITY_URL_CONNECTION</code></td><td><code>URLConnection</code></td><td>HTTP/URL connections</td></tr>
  <tr><td><code>SCRIPT_SECURITY_HTTP_CLIENT</code></td><td><code>HttpClient</code></td><td>HTTP client</td></tr>
  <tr><td><code>SCRIPT_SECURITY_SOCKET</code></td><td><code>new Socket(</code></td><td>Raw socket creation</td></tr>
  <tr><td><code>SCRIPT_SECURITY_SERVER_SOCKET</code></td><td><code>ServerSocket</code></td><td>Server socket binding</td></tr>
  <tr><td><code>SCRIPT_SECURITY_NEW_JAVA</code></td><td><code>new java.*</code></td><td>Generic Java object instantiation</td></tr>
  <tr><td><code>SCRIPT_SECURITY_GROOVY_SHELL</code></td><td><code>GroovyShell</code></td><td>Dynamic Groovy execution</td></tr>
  <tr><td><code>SCRIPT_SECURITY_GROOVY_METACLASS</code></td><td><code>metaClass</code></td><td>Groovy metaclass manipulation</td></tr>
  <tr><td><code>SCRIPT_SECURITY_JAVA_TYPE</code></td><td><code>java.type(</code>, <code>Packages.</code></td><td>Host class lookup (GraalVM JS)</td></tr>
</table>

# Configuration

Script Guard's enforcement mode and allowlist have two representations — keeping them straight matters:

- **Static configuration** — a Spring Boot property, or a `bpm-platform.xml` property on a plain-XML deployment — supplies only the ***initial*** value. It is read exactly once: the first time the engine starts against a database that has no Script Guard configuration stored yet (a fresh install, or an upgrade from a version that predates Script Guard).
- **The database** (`ACT_GE_PROPERTY`) holds the ***current, authoritative*** value from that point on. Every later engine start reads whatever is already stored there and ignores static configuration entirely. The only way to change the mode or allowlist afterward is the [REST API](#rest-api) — `PUT /script-security/config` — or a direct write to `ACT_GE_PROPERTY`.

This is deliberate: a production deployment is usually a fleet of engine nodes (multiple Tomcat/Spring Boot instances) sharing one database, and each node's own `application.yml`/`bpm-platform.xml` is local to that node — nothing keeps those files identical or in sync across the fleet. Making the database authoritative after the first boot gives the whole fleet a single, consistent source of truth: a [`PUT`](#update-configuration) updates one shared row, and every node picks it up on its own cache refresh within 30 seconds — no per-node file edits, no rolling restart, no risk of nodes disagreeing on the mode.

{{< note title="" class="warning" >}}
Editing `mode`/`allowlisted-process-definition-keys` in `application.yml`, or `scriptSecurityMode`/`scriptSecurityAllowlistedProcessDefinitionKeys` in `bpm-platform.xml`, and restarting the engine has **no effect** once a Script Guard configuration row already exists in the database — which, in practice, means every start after the very first one, on a single-node setup too. Use [`PUT /script-security/config`](#update-configuration) to change the mode or allowlist on a running system.
{{< /note >}}

## Spring Boot

Configured via Spring Boot application properties under the `eximeebpms.bpm.script-security` prefix:

```yaml
eximeebpms:
  bpm:
    script-security:
      mode: ENFORCE
      allowlisted-process-definition-keys:
        - my-trusted-process
        - legacy-migration-process
      violation-store-size: 1000
      retention-days: 30
```

<table class="table desc-table">
  <tr>
    <th>Property</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>mode</code></td>
    <td><code>ENFORCE</code> | <code>AUDIT</code> | <code>DISABLED</code></td>
    <td><code>ENFORCE</code></td>
    <td>Initial enforcement mode — read once on first start, as described above. Change it afterward via the REST API.</td>
  </tr>
  <tr>
    <td><code>allowlisted-process-definition-keys</code></td>
    <td><code>list</code></td>
    <td>empty</td>
    <td>Initial allowlist — process definition keys whose scripts skip all security checks, read once on first start. Extend it afterward via the REST API.</td>
  </tr>
  <tr>
    <td><code>violation-store-size</code></td>
    <td><code>integer</code></td>
    <td><code>1000</code></td>
    <td>Maximum number of violations kept in the in-memory ring buffer. Older entries are evicted when the limit is reached.</td>
  </tr>
  <tr>
    <td><code>retention-days</code></td>
    <td><code>integer</code></td>
    <td><code>0</code></td>
    <td>Number of days to retain violation records in the database. <code>0</code> disables automatic cleanup.</td>
  </tr>
</table>

## Tomcat / plain XML (`bpm-platform.xml`)

A deployment that doesn't use the Spring Boot starter — the Tomcat distribution, or any other container driven by `bpm-platform.xml` — configures the same initial mode and allowlist as plain process-engine properties, no custom `ProcessEnginePlugin` required:

```xml
<property name="scriptSecurityMode">AUDIT</property>
<property name="scriptSecurityAllowlistedProcessDefinitionKeys">my-trusted-process,legacy-migration-process</property>
<property name="scriptViolationRetentionDays">30</property>
```

<table class="table desc-table">
  <tr>
    <th>Property</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>scriptSecurityMode</code></td>
    <td><code>ENFORCE</code> | <code>AUDIT</code> | <code>DISABLED</code></td>
    <td><code>ENFORCE</code></td>
    <td>Initial enforcement mode — same one-time-read, database-authoritative-afterward behavior as the Spring Boot <code>mode</code> property above.</td>
  </tr>
  <tr>
    <td><code>scriptSecurityAllowlistedProcessDefinitionKeys</code></td>
    <td>comma-separated list</td>
    <td>empty</td>
    <td>Initial allowlist, read once on first start. Extend it afterward via the REST API.</td>
  </tr>
  <tr>
    <td><code>scriptViolationRetentionDays</code></td>
    <td><code>integer</code></td>
    <td><code>0</code></td>
    <td>Same as Spring Boot's <code>retention-days</code> — number of days to retain violation records. <code>0</code> disables automatic cleanup. Unlike <code>scriptSecurityMode</code>, this is read fresh from the engine configuration at every cleanup run (see below), not database-authoritative — there's no REST endpoint to change it at runtime on either deployment model.</td>
  </tr>
</table>

A Tomcat/plain-XML deployment persists violations to `ACT_RU_SCRIPT_VIOLATION`, forwards them to the business-event/SIEM outbox, and answers `PUT /script-security/config` exactly like a Spring Boot deployment — no custom `ProcessEnginePlugin` needed for any of it. `violation-store-size` remains a Spring Boot–only YAML property with no equivalent here.

{{< note title="" class="info" >}}
Violation retention/cleanup runs as a single engine-native background job (not a Spring `@Scheduled` task), so it behaves identically regardless of deployment model: it's created automatically on first engine start whenever `scriptViolationRetentionDays`/`retention-days` is greater than zero, deletes expired rows roughly once a day, and keeps rescheduling itself even while the value is `0` — so raising it later takes effect on the next run, without a restart.
{{< /note >}}

{{< note title="" class="info" >}}
Script Guard stores its runtime configuration and violation records in the database. The `ACT_RU_SCRIPT_VIOLATION` table is created automatically during the schema migration (Community Edition: shipped in [1.3.0]({{< ref "/release-notes/release-notes-1.3.0.md" >}}#script-guard); Enterprise Edition: shipped in [1.2.13-ee]({{< ref "/release-notes/release-notes-1.2-ee.md" >}}#12-13-ee)).
{{< /note >}}

# Allowlisting Process Definitions

Processes that intentionally use constructs blocked by the policy can be placed on an allowlist. Scripts belonging to allowlisted processes skip all security checks.

The allowlist's *initial* value can be set statically — in `application.yml` (Spring Boot) or `bpm-platform.xml` (Tomcat/plain XML) — see [Configuration](#configuration). From the first engine start onward it lives in the `ACT_GE_PROPERTY` table and can only be changed via the [REST API](#rest-api); static configuration is not consulted again. Updates propagate to all engine nodes within 30 seconds.

{{< note title="" class="warning" >}}
Allowlisting disables all Script Guard checks for the listed processes. Prefer enabling `AUDIT` mode first to identify which patterns are actually used before committing to an allowlist.
{{< /note >}}

# Violation Monitoring

Whenever a script triggers a rule — in either `ENFORCE` or `AUDIT` mode — Script Guard records a **violation event** containing:

- Timestamp of the violation
- Process definition key and activity ID of the offending script
- Scripting language (e.g., `groovy`, `javascript`)
- Source type: `INLINE_SOURCE`, `DYNAMIC_SOURCE`, `RESOURCE`, `DYNAMIC_RESOURCE`, `EXPRESSION`, or `UNKNOWN`
- Script origin: `USER`, `PROCESS_APPLICATION`, or `PLATFORM`
- Rule code (e.g., `SCRIPT_SECURITY_RUNTIME_EXEC`) and a human-readable reason

Violations are persisted in the `ACT_RU_SCRIPT_VIOLATION` table and can be queried via the [REST API](#rest-api). The in-memory ring buffer holds up to `violation-store-size` recent entries; the total count is always available independently.

{{< note title="" class="info" >}}
If the `eximeebpms-bpm-monitor` extension is used, violations are also exposed as Micrometer meters — see [Application Monitoring]({{< ref "/user-guide/process-engine/application-monitoring.md#script-guard" >}}).
{{< /note >}}

# REST API

The Script Guard REST API is available at:

- `/engine-rest/script-security` — for the default engine
- `/engine-rest/engine/{name}/script-security` — for a named engine

All endpoints require the `ALL` permission on the `SYSTEM` resource (i.e., the `eximeebpms-admin` role). Requests without this permission receive an HTTP `403` response.

## Get Configuration

Returns the current Script Guard configuration — the database-backed value described in [Configuration](#configuration), not the static configuration file.

**`GET /script-security/config`**

**Response** (`200 OK`):

```json
{
  "mode": "ENFORCE",
  "allowlistedKeys": ["my-trusted-process"]
}
```

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>mode</code></td><td><code>string</code></td><td>Current enforcement mode: <code>ENFORCE</code>, <code>AUDIT</code>, or <code>DISABLED</code>.</td></tr>
  <tr><td><code>allowlistedKeys</code></td><td><code>array&lt;string&gt;</code></td><td>Process definition keys that skip all security checks.</td></tr>
</table>

## Update Configuration

Updates the Script Guard configuration at runtime. Changes take effect on all engine nodes within 30 seconds without a restart.

**`PUT /script-security/config`**

**Request body:**

```json
{
  "mode": "AUDIT",
  "allowlistedKeys": ["my-trusted-process", "legacy-migration-process"]
}
```

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
  <tr><td><code>mode</code></td><td><code>string</code></td><td>yes</td><td>New enforcement mode: <code>ENFORCE</code>, <code>AUDIT</code>, or <code>DISABLED</code>.</td></tr>
  <tr><td><code>allowlistedKeys</code></td><td><code>array&lt;string&gt;</code></td><td>no</td><td>Updated allowlist — replaces the existing list entirely.</td></tr>
</table>

**Response** (`200 OK`): the updated configuration (same structure as [Get Configuration](#get-configuration)).

## List Violations

Returns recent Script Guard violations in descending timestamp order.

**`GET /script-security/violations`**

**Query parameters:**

<table class="table desc-table">
  <tr><th>Parameter</th><th>Type</th><th>Default</th><th>Description</th></tr>
  <tr><td><code>firstResult</code></td><td><code>integer</code></td><td><code>0</code></td><td>Pagination offset.</td></tr>
  <tr><td><code>maxResults</code></td><td><code>integer</code></td><td><code>50</code></td><td>Maximum number of results returned.</td></tr>
</table>

**Response** (`200 OK`):

```json
[
  {
    "timestamp": "2026-01-15T10:30:00.000Z",
    "processDefinitionKey": "payment-process",
    "activityId": "scriptTask_1",
    "language": "groovy",
    "sourceType": "INLINE_SOURCE",
    "origin": "PROCESS_APPLICATION",
    "ruleCode": "SCRIPT_SECURITY_RUNTIME_EXEC",
    "reason": "Access to Runtime.getRuntime() is forbidden"
  }
]
```

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>timestamp</code></td><td><code>string</code></td><td>ISO 8601 timestamp of the violation.</td></tr>
  <tr><td><code>processDefinitionKey</code></td><td><code>string</code></td><td>Key of the process definition containing the offending script.</td></tr>
  <tr><td><code>activityId</code></td><td><code>string</code></td><td>ID of the BPMN element that triggered the violation.</td></tr>
  <tr><td><code>language</code></td><td><code>string</code></td><td>Scripting language (e.g., <code>groovy</code>, <code>javascript</code>).</td></tr>
  <tr><td><code>sourceType</code></td><td><code>string</code></td><td><code>INLINE_SOURCE</code>, <code>DYNAMIC_SOURCE</code>, <code>RESOURCE</code>, <code>DYNAMIC_RESOURCE</code>, <code>EXPRESSION</code>, or <code>UNKNOWN</code>.</td></tr>
  <tr><td><code>origin</code></td><td><code>string</code></td><td><code>USER</code>, <code>PROCESS_APPLICATION</code>, <code>PLATFORM</code>, or <code>UNKNOWN</code>.</td></tr>
  <tr><td><code>ruleCode</code></td><td><code>string</code></td><td>Machine-readable rule code that matched (see <a href="#blocked-patterns">Blocked Patterns</a>).</td></tr>
  <tr><td><code>reason</code></td><td><code>string</code></td><td>Human-readable description of why the script was flagged.</td></tr>
</table>

## Get Violation Count

Returns the total number of violations recorded since the engine started.

**`GET /script-security/violations/count`**

**Response** (`200 OK`):

```json
{
  "count": 42
}
```

# External Validation Module

The same rule set Script Guard enforces inside the engine is also available as a standalone library, with no dependency on the process engine. Add it to a process-design tool, a CI pipeline, or any other pre-deployment tooling to check a script or expression before ever attempting to deploy the process definition that contains it — instead of only finding out from a rejected deployment.

## Adding the Dependency

```xml
<dependency>
  <groupId>org.eximeebpms.commons</groupId>
  <artifactId>eximeebpms-commons-script-guard-rules</artifactId>
</dependency>
```

## Usage

```java
ScriptSecurityRuleSet ruleSet = DefaultScriptSecurityRuleSet.INSTANCE;
ScriptValidationResult result = ruleSet.validate(scriptSource, ScriptOrigin.USER);

if (!result.isClean()) {
  for (ScriptSecurityRuleMatch match : result.getMatches()) {
    System.out.println(match.ruleCode() + ": " + match.reason());
  }
}
```

{{< note title="" class="info" >}}
`ScriptValidationResult` reports rule matches only — it never returns an `ENFORCE`/`AUDIT`/`DENY` outcome. Whether a match actually blocks deployment depends on the target engine instance's own configured [mode](#enforcement-modes), which this module has no way to know. Use it to catch a violation before deploying; the engine's own enforcement is still authoritative at deploy time.
{{< /note >}}

Rule codes and reasons reported here are identical to the ones in [Blocked Patterns](#blocked-patterns) and the ones recorded in [Violation Monitoring](#violation-monitoring) — the engine and this module share one rule set, so the two can never disagree.

# Recommended Rollout

{{< img src="../img/script-guard-rollout.svg" title="Script Guard rollout flow" >}}

1. **Audit first** — enable Script Guard with mode `AUDIT`. Existing processes continue to run but violations are recorded.
2. **Review violations** — use the REST API to identify which processes and patterns are flagged.
3. **Allowlist trusted processes** — for processes that intentionally use blocked patterns, add them to the allowlist via the REST API.
4. **Enforce** — switch mode to `ENFORCE` once all violations are resolved or allowlisted.
