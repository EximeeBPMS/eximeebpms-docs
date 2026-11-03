---

title: 'Tech Stack'
weight: 45

menu:
  main:
    identifier: "user-guide-introduction-tech-stack"
    parent: "user-guide-introduction"

---

Dependency versions across all EximeeBPMS releases. Highlighted cells indicate a change relative to the previous release.

The OSS columns describe their released baselines. On this staging branch, the
Enterprise column tracks the upcoming engine snapshot, including merged changes
after 1.4.2-ee; it does not claim a new release has been published.

By default the table shows the two most recent OSS releases plus the current Enterprise baseline. Use the **Show older versions** selector above the table to bring earlier releases back into view.

{{< tech-stack-table >}}

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

## Upcoming Enterprise monitoring

The Community columns retain the standalone monitor extension versions shipped
with those releases. The Enterprise staging column instead describes monitoring
built in the engine repository under `monitoring/`: the artifacts use group
`org.eximeebpms.bpm.monitor` and **the engine's version**, currently
`1.4.3-SNAPSHOT`. There is no separate monitor release to pin for this baseline.
Enterprise 1.4.2-ee still shipped the former standalone monitor 1.12.0-ee.

The upcoming modules separate common, engine, client, Spring Boot, Prometheus
and servlet integration. Their monitoring baseline uses Micrometer **1.17.2**
and Spring Boot **4.1.2** for the Boot adapter. The common, engine, client and
Prometheus components do not require Spring.

Use a matching released engine/client/monitoring version once this change is
published. Remove the old standalone monitor dependency rather than keeping
both implementations on the classpath: their Java packages overlap. See
[Application Monitoring]({{< ref "/user-guide/process-engine/application-monitoring.md" >}})
and [Worker Monitoring]({{< ref "/user-guide/ext-client/monitoring.md" >}})
for the exact replacement artifacts, configuration and exporter access rules.
