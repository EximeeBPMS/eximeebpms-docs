---

title: 'Script Guard'
weight: 82

menu:
  main:
    identifier: "user-guide-process-engine-script-guard"
    parent: "user-guide-process-engine"

---

Script Guard is an EximeeBPMS feature introduced in 1.3.0 that inspects scripts before execution and blocks patterns that could lead to remote code execution, data exfiltration, or other security incidents. It works at the engine level, independently of the scripting language in use.

Script Guard applies to all scripts executed by the process engine: Script Tasks, Execution Listeners, Task Listeners, Condition Expressions, and Input/Output Mappings, as well as scripts submitted dynamically via the REST API or Java API.

When enabled, scripts containing forbidden patterns are **rejected** — a `ScriptSecurityException` is thrown before the script executes. Script Guard is enabled by default and can be disabled via configuration.

{{< note title="" class="info" >}}
EximeeBPMS 1.4.0 introduces the `AUDIT` mode (record violations without blocking) and a runtime-configurable `mode` property replacing the `enabled` flag.
{{< /note >}}

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
      enabled: true
      allowlisted-process-definition-keys:
        - my-trusted-process
        - legacy-migration-process
```

<table class="table desc-table">
  <tr>
    <th>Property</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>enabled</code></td>
    <td><code>boolean</code></td>
    <td><code>true</code></td>
    <td>Enables or disables Script Guard. When <code>false</code>, no checks are performed.</td>
  </tr>
  <tr>
    <td><code>allowlisted-process-definition-keys</code></td>
    <td><code>list</code></td>
    <td>empty</td>
    <td>Process definition keys whose scripts skip all security checks.</td>
  </tr>
</table>

# Allowlisting Process Definitions

Processes that intentionally use constructs blocked by the policy can be placed on an allowlist. Scripts belonging to allowlisted processes skip all security checks.

The allowlist can be set statically in `application.yml` (see [Configuration](#configuration)).

{{< note title="" class="warning" >}}
Allowlisting disables all Script Guard checks for the listed processes. To temporarily turn off Script Guard globally, set `enabled: false` and re-enable it once the allowlist is complete.
{{< /note >}}
