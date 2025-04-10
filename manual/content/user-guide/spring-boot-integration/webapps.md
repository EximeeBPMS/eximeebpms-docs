---

title: "Web applications"
weight: 40

menu:
  main:
    name: "Web Applications"
    identifier: "user-guide-spring-boot-webapps"
    parent: "user-guide-spring-boot-integration"

---

To enable the [Web Applications]({{<ref "/webapps/_index.md">}}) you can use the following starter in your `pom.xml`:

```xml
<dependency>
  <groupId>org.eximeebpms.bpm.springboot</groupId>
  <artifactId>eximeebpms-bpm-spring-boot-starter-webapp</artifactId>
  <version>{project-version}</version>
</dependency>
```

By default the application path is `/eximeebpms`, so without any further configuration you can access 
the Webapps under [http://localhost:8080/eximeebpms/app/](http://localhost:8080/eximeebpms/app/).

## Enterprise webapps

{{< enterprise >}}
Please note that this feature is only included in the enterprise edition of EximeeBPMS, it is not available in the community edition.
{{< /enterprise >}}

To use the enterprise Web applications, include another starter:
```xml
<dependency>
  <groupId>org.eximeebpms.bpm.springboot</groupId>
  <artifactId>eximeebpms-bpm-spring-boot-starter-webapp-ee</artifactId>
  <version>${project-version}</version>
</dependency>
```

Also don't forget to define the appropriate EximeeBPMS engine version (with "ee" suffix): see [Using Enterprise Edition](../#using-enterprise-edition).

If you are using the enterprise edition, you can also use the [`eximeebpms.bpm.license-file`]({{<ref "/user-guide/spring-boot-integration/configuration.md#license-file">}}) 
property to provide a license file that is inserted on application start. Or copy your license file under the name 
`eximeebpms-license.txt` to your `src/main/resources`. See the dedicated [License docs section]({{< ref "/user-guide/license-use.md" >}})
for more details on how to add a License key to your EximeeBPMS installation.

## Configurations

You can change the application path with the following configuration property in your `application.yaml` file:
```properties
eximeebpms.bpm.webapp.application-path=/my/application/path
```

By default, the starter registers a controller to redirect `/` to EximeeBPMS's bundled `index.html`.
To disable this, you have to add to your application properties:
```properties
eximeebpms.bpm.webapp.index-redirect-enabled=false
```

## Error Pages

The default error handling coming with the Spring Boot ('whitelabel' error page) is enabled in the starter. To switch to the EximeeBPMS error pages (`webjar/META-INF/resources/webjars/eximeebpms/error-XYZ-page.html`), please put them to the application folder structure under `/src/main/resources/public/error/XYZ.html`.

## Building Custom REST APIs

The EximeeBPMS Web Applications use a `CSRF Prevention Filter` that expects a `CSRF Token` on any 
modifying request for paths beginning with `/eximeebpms/api/` or `/eximeebpms/app/`. Any modifying requests 
mapped to these paths will fail, and the current session will be ended if no CSRF Token is present.
You can avoid this by registering your resources on different paths or add your resources to the
CSRF Prevention Filter Whitelist (via the configuration property `eximeebpms.bpm.webapp.csrf.entry-points`).
