---

title: 'Tech Stack'
weight: 45

menu:
  main:
    identifier: "user-guide-introduction-tech-stack"
    parent: "user-guide-introduction"

---

Dependency versions across all EximeeBPMS releases. Highlighted cells indicate a change relative to the previous release.

By default the table shows the two most recent OSS releases plus the current Enterprise release. Use the **Show older versions** selector above the table to bring earlier releases back into view.

{{< tech-stack-table >}}

## Building the Enterprise web applications

The source build installs the Node.js and npm versions pinned in `parent/pom.xml`.
The official Node.js 26 Linux binary requires `libatomic.so.1`; ensure the build
host or CI runner image provides it (the `libatomic1` package on Debian/Ubuntu).
npm remains on 11 because the frontend still uses Git dependencies that npm 12
blocks by default. This toolchain is needed to build the web applications and
REST API reference, not to run the packaged application.

## Agent JDBC schema migration

The separately delivered enterprise connectors use Flyway (Apache-2.0),
privately relocated with its database modules and the Jackson libraries it uses.
Embedded applications keep their own Flyway/Liquibase and Jackson versions,
configuration and histories. The standalone
administrator tool and bundle command mode use the same migration runtime.

## Upcoming Enterprise monitoring

The released-version table above retains the standalone monitor versions shipped
with those releases. The upcoming Enterprise change replaces that separate pin
with the engine's co-released `org.eximeebpms.bpm.monitor` modules. Its monitoring
baseline uses Micrometer **1.17.2** and Spring Boot **4.1.2** for the Boot adapter.
The common, engine, client and Prometheus components do not require Spring.

Use the same Enterprise release for the engine, the External Task Client and
the monitoring modules; the table above lists it once that release is published. See
[Application Monitoring]({{< ref "/user-guide/process-engine/application-monitoring.md" >}})
and [Worker Monitoring]({{< ref "/user-guide/ext-client/monitoring.md" >}})
for artifact replacement and configuration.
