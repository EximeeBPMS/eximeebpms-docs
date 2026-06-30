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

The mode can be changed at runtime via the [REST API](#rest-api) without restarting the engine. All engine nodes pick up the new configuration within 30 seconds.

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

Script Guard is configured via Spring Boot application properties under the `eximeebpms.bpm.script-security` prefix:

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
    <td>Enforcement mode on startup. Can be changed at runtime via the REST API without restarting.</td>
  </tr>
  <tr>
    <td><code>allowlisted-process-definition-keys</code></td>
    <td><code>list</code></td>
    <td>empty</td>
    <td>Process definition keys whose scripts skip all security checks. Can be extended at runtime via the REST API.</td>
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

{{< note title="" class="info" >}}
Script Guard stores its runtime configuration and violation records in the database. The `ACT_RU_SCRIPT_VIOLATION` table is created automatically during the EximeeBPMS 1.4.0 schema migration.
{{< /note >}}

{{< note title="" class="info" >}}
**Migrating from 1.3.0:** The `enabled` boolean property has been replaced by `mode`. Replace `enabled: true` with `mode: ENFORCE` and `enabled: false` with `mode: DISABLED`.
{{< /note >}}

# Allowlisting Process Definitions

Processes that intentionally use constructs blocked by the policy can be placed on an allowlist. Scripts belonging to allowlisted processes skip all security checks.

The allowlist can be set statically in `application.yml` (see [Configuration](#configuration)) or updated at runtime via the [REST API](#rest-api). Runtime updates are stored in the `ACT_GE_PROPERTY` table and propagate to all engine nodes within 30 seconds.

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

# SIEM Integration

Script Guard integrates with the EximeeBPMS Business Event mechanism. When a violation occurs, an event of type `camunda7:script-violation:create` is written to the business event outbox (`ACT_RU_BUS_EVT_OBX`). A configured `BusinessEventPublisher` (for example, a Kafka plugin) forwards these events to an external SIEM system in near real time.

No additional Script Guard configuration is required — the integration listener is wired automatically when business events are enabled in your Spring Boot application.

# REST API

The Script Guard REST API is available at:

- `/engine-rest/script-security` — for the default engine
- `/engine-rest/engine/{name}/script-security` — for a named engine

All endpoints require the `ALL` permission on the `SYSTEM` resource (i.e., the `eximeebpms-admin` role). Requests without this permission receive an HTTP `403` response.

## Get Configuration

Returns the current Script Guard configuration.

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

# Recommended Rollout

{{< img src="../img/script-guard-rollout.svg" title="Script Guard rollout flow" >}}

1. **Audit first** — enable Script Guard with mode `AUDIT`. Existing processes continue to run but violations are recorded.
2. **Review violations** — use the REST API or SIEM integration to identify which processes and patterns are flagged.
3. **Allowlist trusted processes** — for processes that intentionally use blocked patterns, add them to the allowlist via the REST API.
4. **Enforce** — switch mode to `ENFORCE` once all violations are resolved or allowlisted.
