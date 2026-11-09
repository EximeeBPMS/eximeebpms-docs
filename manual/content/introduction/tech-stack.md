---

title: 'Tech Stack'
weight: 45

menu:
  main:
    identifier: "user-guide-introduction-tech-stack"
    parent: "user-guide-introduction"

---

Dependency versions across all EximeeBPMS releases. Highlighted cells indicate a change relative to the previous release.

The OSS columns describe their released baselines. The Enterprise column describes
engine **1.4.3-ee**. Enterprise Connectors **1.0.0-ee** has a separate dependency
line, documented below; its version does not advance the engine version.

By default the table shows the two most recent OSS releases plus the current Enterprise baseline. Use the **Show older versions** selector above the table to bring earlier releases back into view.

{{< tech-stack-table >}}

## Building the Enterprise web applications

The source build installs the Node.js and npm versions pinned in `parent/pom.xml`.
The official Node.js 26 Linux binary requires `libatomic.so.1`; ensure the build
host or CI runner image provides it (the `libatomic1` package on Debian/Ubuntu).
npm remains on 11 because the frontend still uses Git dependencies that npm 12
blocks by default. This toolchain is needed to build the web applications and
REST API reference, not to run the packaged application.

## Enterprise Connectors worker

The separately versioned Enterprise Connectors worker has a Java 21 baseline and
uses its own Spring Boot dependency management. Its SDK and library pins are
listed in [Connector Dependencies and Compatibility]({{< ref "/reference/ai-agent-and-connectors/dependencies.md" >}}).
Its supported providers, MCP transports and optional JDBC
storage are described under [AI Agent and Connectors]({{< ref "/user-guide/ai-agent/_index.md" >}}).
This does not change the engine's supported-environment matrix above.

## Agent JDBC schema migration

The separately delivered enterprise connectors use Flyway (Apache-2.0),
privately relocated with its database modules and the Jackson libraries it uses.
Embedded applications keep their own Flyway/Liquibase and Jackson versions,
configuration and histories. The standalone
administrator tool and bundle command mode use the same migration runtime.

## Enterprise monitoring since 1.4.3-ee

The Community columns retain the standalone monitor extension versions shipped
with those releases. The Enterprise column describes monitoring
built in the engine repository under `monitoring/`: the artifacts use group
`org.eximeebpms.bpm.monitor` and **the engine's version**, currently
`1.4.3-ee`. There is no separate monitor release to pin for this baseline.
Enterprise 1.4.2-ee still shipped the former standalone monitor 1.12.0-ee.

The co-released modules separate common, engine, client, Spring Boot, Prometheus
and servlet integration. Their monitoring baseline uses Micrometer **1.17.2**
and Spring Boot **4.1.2** for the Boot adapter. The common, engine, client and
Prometheus components do not require Spring.

Use matching released `1.4.3-ee` engine/client/monitoring artifacts. Remove the
old standalone monitor dependency rather than keeping both implementations on
the classpath: their Java packages overlap. See
[Application Monitoring]({{< ref "/user-guide/process-engine/application-monitoring.md" >}})
and [Worker Monitoring]({{< ref "/user-guide/ext-client/monitoring.md" >}})
for the exact replacement artifacts, configuration and exporter access rules.
