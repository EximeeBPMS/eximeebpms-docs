---

title: 'Script Security'
weight: 81

menu:
  main:
    identifier: "user-guide-process-engine-script-security"
    parent: "user-guide-process-engine"

---


Script Security protects the process engine from executing unsafe script code in BPMN script tasks, script task listeners, execution listeners, and other script-based extension points.

When enabled, the engine validates script source code before execution and blocks scripts that try to access sensitive JVM, operating system, filesystem, network, reflection, or dynamic class-loading APIs.

Script Security is enabled by default in Spring Boot applications.

## Overview

Script execution is a powerful extension mechanism. A process model can use scripts to calculate values, set process variables, assign tasks, or perform lightweight business logic.

However, scripts run inside the process engine runtime. Without additional validation, a script could attempt to:

* read environment variables or JVM system properties,
* access local files,
* open network connections,
* start operating system processes,
* shut down the JVM,
* dynamically load classes,
* use reflection to bypass normal access controls,
* execute additional external scripts.

Script Security reduces this risk by rejecting scripts that match known dangerous patterns before they are evaluated by the script engine.

## Default behavior

By default, Script Security is enabled.

```yaml
eximeebpms:
  bpm:
    script-security:
      enabled: true
```

When enabled, unsafe scripts are blocked during deployment parsing or before runtime execution, depending on where and how the script source is available.

For example, the following script is blocked because it accesses environment variables:

```javascript
System.getenv('HOME');
```

The engine rejects it with an error similar to:

```text
Script execution blocked by script security policy: Access to environment variables is forbidden
```

or, during deployment parsing:

```text
Process deployment blocked by script security policy: Access to environment variables is forbidden
```

## Configuration

Script Security can be configured with the following Spring Boot properties.

```yaml
eximeebpms:
  bpm:
    script-security:
      enabled: true
      allowlisted-process-definition-keys:
        - legacyInvoiceProcess
```

### `enabled`

Enables or disables script security validation.

Default value:

```yaml
eximeebpms:
  bpm:
    script-security:
      enabled: true
```

When set to `false`, the script security policy is not applied. This preserves backward compatibility for installations that explicitly disable the feature.

```yaml
eximeebpms:
  bpm:
    script-security:
      enabled: false
```

{{< note title="Security warning" class="warning" >}}
Disabling Script Security allows scripts to be evaluated without the protection provided by the default security policy. Use this only as a temporary compatibility measure or in trusted environments.
{{< /note >}}

### `allowlisted-process-definition-keys`

Allows selected process definitions to bypass Script Security checks.

```yaml
eximeebpms:
  bpm:
    script-security:
      allowlisted-process-definition-keys:
        - legacyInvoiceProcess
        - oldReportingProcess
```

Process definition keys are matched case-insensitively and surrounding whitespace is ignored.

This option is intended for controlled migration of existing processes. It should not be used as a general-purpose exception mechanism for new process definitions.

{{< note title="Migration recommendation" class="warning" >}}
Use the allowlist only for known legacy processes and remove entries after the scripts have been reviewed and migrated to safer alternatives.
{{< /note >}}

## What is blocked

The default policy blocks script patterns that are commonly associated with host access, privilege escalation, filesystem access, network access, process execution, or dynamic code loading.

### External script loading

The following APIs are blocked:

```javascript
load('/tmp/script.js');
```

Reason:

```text
Loading external scripts is forbidden
```

External script loading is blocked because it can execute code that is not visible in the process definition and may change independently from the deployed process.

### Process execution

The following patterns are blocked:

```groovy
new ProcessBuilder('sh', '-c', 'id').start()
```

```javascript
Java.type('java.lang.ProcessBuilder')
```

```groovy
Runtime.getRuntime().exec('id')
```

Reason:

```text
Process execution via ProcessBuilder is forbidden
Runtime process execution is forbidden
Access to java.lang.Runtime is forbidden
```

Process execution is blocked because it can execute arbitrary operating system commands with the privileges of the process engine.

### JVM system APIs

The following patterns are blocked:

```javascript
System.getenv('HOME');
System.getProperty('user.home');
System.exit(0);
Java.type('java.lang.System');
```

Reason:

```text
Access to environment variables is forbidden
Access to JVM system properties is forbidden
JVM shutdown is forbidden
Access to JVM system APIs is forbidden
```

JVM system APIs are blocked because they can expose secrets, runtime configuration, host details, or affect process engine availability.

### Filesystem access

The following patterns are blocked:

```javascript
new java.io.File('/etc/passwd');
Java.type('java.io.File');
```

Reason:

```text
File system access is forbidden
```

Filesystem access is blocked because scripts must not read, write, delete, or inspect files on the process engine host.

### NIO filesystem access

The default policy blocks direct access to Java NIO APIs:

```groovy
import java.nio.file.Files
import java.nio.file.Paths

Files.readAllBytes(Paths.get('/etc/passwd'))
```

Reason:

```text
NIO access is forbidden
```

The main risk is `java.nio.file`, which provides filesystem access. If a script uses safe non-filesystem NIO classes, such as `java.nio.charset.Charset`, and this is a valid business requirement, consider moving that logic to a Java delegate or reviewing whether the policy should be narrowed in your installation.

For example, this script may be blocked by the default policy because it imports `java.nio.charset.Charset`:

```groovy
import java.nio.charset.Charset

assert Charset.defaultCharset() == Charset.forName('UTF-8')
```

Although `Charset` itself is not a filesystem API, the default policy is intentionally conservative.

### Network access

The following patterns are blocked:

```javascript
new java.net.Socket('127.0.0.1', 443);
Packages.java.net.Socket;
```

```groovy
new URL('https://example.org').openConnection()
```

Reason:

```text
Network access is forbidden
Socket access is forbidden
Server socket access is forbidden
HTTP client access is forbidden
```

Network access is blocked because scripts could call internal services, exfiltrate data, scan networks, or bypass application-level access controls.

### Reflection and dynamic class loading

The following patterns are blocked:

```groovy
Class.forName('java.lang.Runtime')
```

```groovy
someObject.getClass().getDeclaredMethod('...')
someObject.getClass().getDeclaredField('...')
```

Reason:

```text
Dynamic class loading is forbidden
Reflection access is forbidden
Reflective method access is forbidden
Reflective field access is forbidden
Access to class loaders is forbidden
```

Reflection and dynamic class loading are blocked because they can be used to bypass normal API boundaries and reach sensitive host functionality indirectly.

### Generic Java host class lookup

For user scripts, generic host class lookup is blocked:

```javascript
Java.type('com.example.SomeClass')
Packages.com.example.SomeClass
```

Reason:

```text
Host class lookup is forbidden
Host class lookup via Packages is forbidden
```

This prevents scripts from freely accessing arbitrary JVM classes.

Platform-provided environment scripts may use host class lookup when they are trusted engine bootstrap scripts. Dangerous Java APIs are still blocked by explicit deny rules.

### Groovy dynamic execution

The following patterns are blocked:

```groovy
new GroovyShell().evaluate('println 1')
```

```groovy
someObject.metaClass
```

Reason:

```text
Dynamic Groovy shell execution is forbidden
Groovy metaclass access is forbidden
```

Dynamic Groovy execution and metaclass manipulation are blocked because they can alter runtime behavior or execute code that is not visible in the original process model.

## Recommended alternatives

Unsafe script logic should be moved to controlled application code whenever possible.

Recommended alternatives include:

* Java delegates,
* Spring beans invoked through expressions,
* connector implementations with explicit configuration,
* application services with proper validation and authorization,
* process variables calculated outside of the script engine.

For example, instead of reading the default charset in a Groovy script:

```groovy
import java.nio.charset.Charset

assert Charset.defaultCharset() == Charset.forName('UTF-8')
```

prefer a Java delegate or application health check that validates the runtime environment outside of BPMN script execution.

## Existing process definitions

Script Security can affect already deployed process definitions if they contain unsafe scripts and the engine validates those scripts at runtime.

This means that a process definition may still be visible in the UI, but starting or inspecting it may fail if the underlying BPMN model contains a script that violates the active security policy.

For legacy processes, use one of the following migration strategies:

1. Replace unsafe script logic with a Java delegate or application service.
2. Temporarily add the process definition key to `allowlisted-process-definition-keys`.
3. Disable Script Security only as a temporary rollback mechanism.
4. Redeploy the process after the script has been corrected.

## Production recommendations

For production environments:

* keep Script Security enabled,
* do not allowlist new process definitions,
* review all allowlisted processes regularly,
* prefer Java delegates for host interaction,
* treat script access to JVM classes as privileged behavior,
* keep deployment validation enabled where available,
* monitor logs for `Script security policy denied execution`.

## Troubleshooting

### Script is blocked with `SCRIPT_SECURITY_JAVA_NIO`

The script uses `java.nio.*`.

If the script uses filesystem APIs such as `java.nio.file.Files` or `java.nio.file.Paths`, the block is expected.

If the script only uses `java.nio.charset.Charset`, the block is caused by the conservative default policy. Move the check to application code or review whether your installation should use a custom policy.

### Script is blocked with `SCRIPT_SECURITY_JAVA_TYPE`

The script uses generic host class lookup, for example:

```javascript
Java.type('com.example.SomeClass')
```

or:

```javascript
Packages.com.example.SomeClass
```

User scripts should not access arbitrary JVM classes directly. Move the logic to a Java delegate or explicitly supported application service.

### Script worked before but fails after upgrade

Script Security is enabled by default. Existing scripts that use blocked APIs may fail after the feature is introduced.

Use the allowlist as a temporary compatibility mechanism:

```yaml
eximeebpms:
  bpm:
    script-security:
      allowlisted-process-definition-keys:
        - legacyProcessKey
```

Then migrate the script to a safer implementation and remove the allowlist entry.
