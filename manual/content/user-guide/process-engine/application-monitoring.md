---

title: 'Application Monitoring'
weight: 206

menu:
  main:
    identifier: "user-guide-process-engine-application-monitoring"
    parent: "user-guide-process-engine"

---

The [`eximeebpms-bpm-monitor`](https://github.com/EximeeBPMS/eximeebpms-bpm-monitor) extension adds application-level monitoring for a Spring Boot application running EximeeBPMS. It exposes [Micrometer](https://micrometer.io/) counter and gauge meters via Spring Boot's Actuator, which can be scraped by vendor-neutral monitoring systems such as Prometheus or forwarded to systems like Elastic.

{{< note title="" class="info" >}}
This page documents the `eximeebpms-bpm-monitor` extension, which is optional and requires an extra dependency. For the process engine's built-in, database-reported metrics that are always available, see [Metrics]({{< ref "/user-guide/process-engine/metrics.md" >}}).
{{< /note >}}

# Setup

Add the extension dependency to a Spring Boot application:

```xml
<dependency>
  <groupId>org.eximeebpms.bpm.extension.monitor</groupId>
  <artifactId>eximeebpms-bpm-spring-boot-monitor</artifactId>
</dependency>
```

The extension is automatically configured via Spring Boot's auto-configuration mechanism — no additional annotations are required.

# History Level Requirements

The extension's *counters* are driven by the process engine's history events, so they only fire for event types your configured `eximeebpms.bpm.history-level` actually produces. The extension's *gauges* read live runtime tables directly and are unaffected by the history level.

<table class="table desc-table">
  <tr>
    <th>Meters</th>
    <th>Minimum <code>history-level</code></th>
  </tr>
  <tr>
    <td><code>eximeebpms.process.instances.started</code>, <code>.ended</code></td>
    <td><code>activity</code></td>
  </tr>
  <tr>
    <td><code>eximeebpms.process.instances.finished.total</code></td>
    <td><code>activity</code></td>
  </tr>
  <tr>
    <td><code>eximeebpms.incidents.created</code>, <code>.resolved</code>, <code>.deleted</code></td>
    <td><code>full</code></td>
  </tr>
  <tr>
    <td>All gauges (<code>*.running.total</code>, <code>*.open.total</code>, <code>*.open.age.*</code>, <code>jobs.failed.total</code>, etc.)</td>
    <td>none — read runtime tables directly</td>
  </tr>
</table>

{{< note title="" class="warning" >}}
At <code>history-level: activity</code> or <code>audit</code>, incident counters silently stay at zero — the engine simply never produces those history events at those levels, so no error is raised. The Spring Boot starter defaults <code>eximeebpms.bpm.history-level</code> to <code>full</code>, so this only matters if it has been explicitly lowered.
{{< /note >}}

# Metrics

## Process Instances

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.process.instances.started</code></td>
    <td>Counter</td>
    <td>Incremented when a process instance starts.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.process.instances.ended</code></td>
    <td>Counter</td>
    <td>Incremented when a process instance ends.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.process.instances.running.total</code></td>
    <td>Gauge</td>
    <td>Number of currently running process instances, per process definition.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.process.instances.running.suspended.total</code></td>
    <td>Gauge</td>
    <td>Number of currently suspended process instances, per process definition.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.process.instances.finished.total</code></td>
    <td>Gauge</td>
    <td>Number of finished process instances currently eligible for history clean up, per process definition.</td>
  </tr>
</table>

## Incidents

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.incidents.created</code></td>
    <td>Counter</td>
    <td>Incremented when an incident is created.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.incidents.resolved</code></td>
    <td>Counter</td>
    <td>Incremented when an incident is resolved.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.incidents.deleted</code></td>
    <td>Counter</td>
    <td>Incremented when an incident is deleted.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.incidents.open.total</code></td>
    <td>Gauge</td>
    <td>Number of currently open incidents, per process definition.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.incidents.open.age.newest.seconds</code></td>
    <td>Gauge</td>
    <td>Age, in seconds, of the newest currently open incident, per process definition.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.incidents.open.age.oldest.seconds</code></td>
    <td>Gauge</td>
    <td>Age, in seconds, of the oldest currently open incident, per process definition.</td>
  </tr>
</table>

{{< note title="" class="info" >}}
The three counters above require <code>history-level: full</code> — see [History Level Requirements](#history-level-requirements). The gauges are unaffected.
{{< /note >}}

## Tasks

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.tasks.open.total</code></td>
    <td>Gauge</td>
    <td>Number of currently open tasks.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.tasks.open.age.newest.seconds</code></td>
    <td>Gauge</td>
    <td>Age, in seconds, of the newest currently open task.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.tasks.open.age.oldest.seconds</code></td>
    <td>Gauge</td>
    <td>Age, in seconds, of the oldest currently open task.</td>
  </tr>
</table>

## External Tasks

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.external.tasks.open.total</code></td>
    <td>Gauge</td>
    <td>Number of currently open external tasks.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.external.tasks.open.error.total</code></td>
    <td>Gauge</td>
    <td>Number of currently open external tasks that have a recorded error from a failed execution attempt.</td>
  </tr>
</table>

## Jobs

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.jobs.failed.total</code></td>
    <td>Gauge</td>
    <td>Number of currently failing jobs (jobs with a recorded exception), per process definition. This is a live snapshot, not a lifetime counter.</td>
  </tr>
</table>

# Tags

Meters are tagged as follows:

- Process instance meters (counters `started`/`ended`):
    - `process.definition.id`
    - `process.definition.key`
- Process instance gauges (`running`, `suspended`, `finished`):
    - `tenant.id`
    - `process.definition.id`
    - `process.definition.key`
- Incident meters:
    - `tenant.id`
    - `process.definition.id`
    - `process.definition.key`
    - `activity.id`
    - `failed.activity.id`
    - `incident.type`
- User task meters (related to a process instance):
    - `tenant.id`
    - `process.definition.id`
    - `process.definition.key`
    - `task.definition.key`
- User task gauges (related to a case instance):
    - `tenant.id`
    - `case.definition.id`
    - `task.definition.key`
- User task meters (stand-alone, not related to a process or case instance):
    - `tenant.id`
    - `task.name`
- External task meters:
    - `tenant.id`
    - `process.definition.id`
    - `process.definition.key`
    - `activity.id`
    - `topic.name`
- Failed job gauge:
    - `tenant.id`
    - `process.definition.id`
    - `process.definition.key`

# Configuration

The extension provides the following Spring Boot properties:

<table class="table desc-table">
  <tr>
    <th>Property</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.monitoring.snapshot.enabled</code></td>
    <td><code>true</code></td>
    <td>Whether gauge snapshot monitoring is enabled. In a cluster with multiple instances sharing the same database, only one running instance needs this enabled.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.monitoring.snapshot.updateRate</code></td>
    <td><code>10000</code></td>
    <td>Rate, in milliseconds, at which the snapshot of gauge metrics is refreshed.</td>
  </tr>
</table>

# Cluster Considerations

When running in a cluster with a shared database, only one instance needs to poll the gauge metrics, since they provide the current snapshot from the database and would report the same value on every node (e.g. `eximeebpms.process.instances.running.total`). All instances, however, should have their counter metrics monitored, since each counts only what happened on that instance since it started.

Set `eximeebpms.monitoring.snapshot.enabled=true` on a single instance in the cluster and `false` on the rest to avoid redundant gauge polling.

# Reporting Limitations

The extension's counters do not look up EximeeBPMS's history database, which keeps it lightweight and scalable. When an instance restarts or crashes, its counters reset to zero — so counter values in the monitoring system may not be exact. This is acceptable for application monitoring but not for reporting use cases that require exact figures. For exact reporting, use the history database directly or a history event handler — see [History Configuration]({{< ref "/user-guide/process-engine/history/history-configuration.md" >}}).
