---

title: 'New Cockpit'
weight: 90

menu:
  main:
    identifier: "user-guide-cockpit-new-cockpit"
    parent: "user-guide-cockpit"
    pre: "The new Cockpit, bundled alongside the existing web applications"

---

{{< note title="Enterprise Edition only" class="warning" >}}
The new Cockpit is bundled with the Enterprise Edition distributions of EximeeBPMS Run, Tomcat and WildFly.
{{< /note >}}

The Enterprise Edition ships a new Cockpit alongside the existing Cockpit, Tasklist, Admin and Welcome applications. It starts with the web applications; it needs no separate web server, Node.js runtime or extra deployment.

| Application | Default address |
| --- | --- |
| New Cockpit | `/eximeebpms/cockpit/` |
| Existing Cockpit | `/eximeebpms/app/cockpit/` |
| Tasklist, Admin and Welcome | Their existing addresses |

The existing applications, their addresses and the redirect from `/eximeebpms/` are unchanged. With a different context path or [application path]({{< ref "/user-guide/spring-boot-integration/configuration.md" >}}), the new Cockpit follows it, for example `/tenant/custom/cockpit/`.

# Login, Session and Permissions

Both Cockpits use the same web application API, login session and CSRF protection. A user who may open the existing Cockpit may open the new one; there is no separate permission. Logging in or out in one of them does the same in the other. Every operation is still authorized by the engine.

# Configuration

Without configuration the new Cockpit uses the process engine of the web applications, the API under the same address and a local login form. Spring Boot applications, including Run, use the configured process engine name. When their [Spring Security OAuth2 integration]({{< ref "/user-guide/spring-boot-integration/spring-security.md" >}}) is active (in Run, started with `--oauth2`), the login page instead offers sign-in through each client registration that logs users in through the browser (`authorization_code`).

To change this, point the property `eximeebpms.bpm.webapp.cockpit.config-file` at a UTF-8 JSON file:

```json
{
  "engineName": "default",
  "bpmsApiUrl": "/eximeebpms/api",
  "auth": {
    "methods": [
      { "type": "local" },
      { "type": "sso", "label": "Company", "loginUrl": "/oauth2/authorization/company", "logoutUrl": "/logout" }
    ]
  }
}
```

| Field | Meaning |
| --- | --- |
| `engineName` | Process engine the Cockpit works with. Default: `default`, or the configured engine in Spring Boot. |
| `bpmsApiUrl` | Web application API root, a path on the same server starting with `/`. Default: the API of the same web application. |
| `auth.methods` | Login methods offered, in order: `local`, or `sso` with `label`, `loginUrl` and `logoutUrl`. |

The browser receives only these fields; do not put passwords or client secrets into the file. Set the property as a JVM system property (`-Deximeebpms.bpm.webapp.cockpit.config-file=...`); Spring Boot applications also accept it as any other Spring property, for example in Run's `default.yml`. In a WAR deployment, the servlet init parameter `configurationFile` of the `Embedded Cockpit` servlet takes precedence over the property.

The file is read when the web application starts. An invalid file stops Run and other Spring Boot applications from starting. In Tomcat and WildFly the server log reports it and the other applications keep running. While the file stays invalid, each request to the new Cockpit fails and is logged again; once you fix the file, the next request succeeds without a restart. The message names the file and the failing rule, never the file's contents.

An `sso` method only links to a login the server already provides. In Tomcat and WildFly it does not add single sign-on; configure that in the container.

# Security Headers

The new Cockpit sends its own security headers: a Content Security Policy that allows only resources from the same server, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` and `Referrer-Policy: strict-origin-when-cross-origin`. They replace the Content Security Policy and frame options configured for the other web applications. In Spring Boot applications, including Run, none of the `eximeebpms.bpm.webapp.header-security` settings apply to the new Cockpit, HSTS included; in Tomcat and WildFly the other configured headers, such as HSTS, still apply.
