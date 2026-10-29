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

## Agent JDBC schema migration

The separately delivered enterprise connectors use Flyway (Apache-2.0),
privately relocated with its database modules and the Jackson libraries it uses.
Embedded applications keep their own Flyway/Liquibase and Jackson versions,
configuration and histories. The standalone
administrator tool and bundle command mode use the same migration runtime.

## Upcoming Enterprise monitoring (BPMS-813)

The released-version table above retains the standalone monitor versions shipped
with those releases. The upcoming Enterprise change replaces that separate pin
with the engine's co-released `org.eximeebpms.bpm.monitor` modules. Its monitoring
baseline uses Micrometer **1.17.2** and Spring Boot **4.1.2** for the Boot adapter.
The common, engine, client and Prometheus components do not require Spring.

Use one matching published engine/client/monitoring version containing BPMS-813;
this does not add a new released version to the table in advance. See
[Application Monitoring]({{< ref "/user-guide/process-engine/application-monitoring.md" >}})
and [Worker Monitoring]({{< ref "/user-guide/ext-client/monitoring.md" >}})
for artifact replacement and configuration.
