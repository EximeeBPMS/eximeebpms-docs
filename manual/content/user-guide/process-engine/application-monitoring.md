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

The extension needs Spring Boot: it is wired through Spring Boot's auto-configuration and scheduling and reports through Micrometer and Actuator. It runs in a Spring Boot application on the EximeeBPMS Spring Boot starter, and in the Run distribution, which is built on that starter. It is not available in the Tomcat or WildFly distributions, which provide neither a Spring application context nor a Micrometer registry. There, use the engine's own [Metrics]({{< ref "/user-guide/process-engine/metrics.md" >}}), or read the engine API that a gauge below is built on, where the gauge names one.

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
    <td><code>eximeebpms.tasks.created</code>, <code>.completed</code>, <code>.deleted</code></td>
    <td><code>activity</code></td>
  </tr>
  <tr>
    <td><code>eximeebpms.external.tasks.started</code>, <code>.ended</code></td>
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
  <tr>
    <td><code>eximeebpms.script.violations</code>, <code>.total</code></td>
    <td>none — driven directly by the script-execution engine's own violation callback, not a history event or a runtime-table read</td>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.outbox.pending.estimate</code>, <code>.pending.age.oldest.seconds</code></td>
    <td>none — read the Business Events outbox table directly</td>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.publish</code>, <code>.dispatch.batch.database</code>, <code>.dispatched</code>, <code>.dispatch.last.activity.age.seconds</code></td>
    <td>none — driven directly by the business-event dispatcher's own callback</td>
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
    <td><code>eximeebpms.tasks.created</code></td>
    <td>Counter</td>
    <td>Incremented when a task is created.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.tasks.completed</code></td>
    <td>Counter</td>
    <td>Incremented when a task is completed.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.tasks.deleted</code></td>
    <td>Counter</td>
    <td>Incremented when a task is deleted (any non-completion removal, e.g. process instance cancellation).</td>
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
    <td><code>eximeebpms.external.tasks.started</code></td>
    <td>Counter</td>
    <td>Incremented when an external task is created.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.external.tasks.ended</code></td>
    <td>Counter</td>
    <td>Incremented when an external task completes successfully or is deleted.</td>
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

## Business Events Outbox

{{< note title="Not yet in a released extension version" class="warning" >}}
These two gauges are implemented in `eximeebpms-enterprise-bpm-monitor`, but are not yet part of any extension release pinned by an Enterprise engine release. They also need an engine version that provides `BusinessEventService#getOutboxBacklog()`.
{{< /note >}}

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.outbox.pending.estimate</code></td>
    <td>Gauge</td>
    <td>Upper bound on the business events written to the outbox but not yet delivered to the configured publisher: the width of the outbox id range from the oldest undelivered event to the newest event. Not a count — see below.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.outbox.pending.age.oldest.seconds</code></td>
    <td>Gauge</td>
    <td>How long the oldest undelivered business event has been waiting. It stays close to the dispatch interval while delivery works. It grows steadily when the dispatcher is held on an event, because the receiver is unreachable or keeps rejecting it — see <a href="{{< ref "/user-guide/process-engine/business-events.md#when-publishing-fails" >}}">When Publishing Fails</a>.</td>
  </tr>
</table>

Both gauges are registered only while [Business Events]({{< ref "/user-guide/process-engine/business-events.md" >}}) are enabled, and carry no tags.

Both gauges are read from the two ends of the outbox's id index — the oldest undelivered id, the newest id, and the creation date of the oldest — and never by counting rows. The cost of a snapshot therefore does not grow with the backlog, which is also why the extension reports no exact count: counting would scan every pending event on every snapshot, on every node, just when the database is already behind. Measured on PostgreSQL with 5 million pending events, the count took about 220 ms with its index fully in memory, and the backlog read about 0.1 ms. On PostgreSQL, finding the oldest undelivered id also steps over the index entries of events delivered since the table was last vacuumed. That part of the read follows the dispatcher's progress since the last vacuum, not the backlog: 3 ms with 250,000 such entries in the same measurement. Autovacuum keeps it small.

`pending.estimate` is exact only while outbox ids have no gaps, and in practice they do. Every transaction that wrote business events and then rolled back, such as an optimistic-locking retry, consumes ids without leaving rows. Oracle and IBM DB2 identities discard up to 20 cached ids on restart, and SQL Server up to 1,000. On Oracle RAC, each instance hands out ids from its own cache, so ids are not in creation order across instances. Read the gauge as a trend: steady while delivery keeps up, growing when it falls behind. For an alert threshold, prefer `pending.age.oldest.seconds`, which has no such bias.

Both values come from `BusinessEventService#getOutboxBacklog()`, which any deployment can call, including Tomcat and WildFly. An exact count is available on demand from `createBusinessEventOutboxQuery().unprocessed().count()`, at a cost that grows with the backlog.

## Business Events Dispatcher

{{< note title="Not yet in a released extension version" class="warning" >}}
These meters are implemented in `eximeebpms-enterprise-bpm-monitor` but are not yet part of any extension release pinned by an Enterprise engine release. They also need an engine version that provides `BusinessEventDispatchListener`.
{{< /note >}}

The dispatcher reports every publish attempt and every batch, so these meters keep moving during a long drain rather than only when a cycle ends. Every pass of the dispatcher reads at least one batch, so each pass leaves a sample, even when there is nothing to publish.

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.publish</code></td>
    <td>Timer</td>
    <td>Time spent in the publisher per business event, tagged <code>result</code> (<code>success</code>, <code>failure</code>). A slow or unreachable receiver shows here: with the REST publisher, a timeout appears as a <code>failure</code> sample of about the request timeout.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.dispatch.batch.database</code></td>
    <td>Timer</td>
    <td>Time a batch spends outside the publisher — reading it, marking it delivered and committing — tagged <code>outcome</code>: <code>dispatched</code>, <code>empty</code>, <code>failed</code>, <code>lock-contended</code> (another node holds the rows), <code>error</code> (the batch was rolled back and will be published again), <code>interrupted</code>.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.dispatched</code></td>
    <td>Counter</td>
    <td>Business events published and marked delivered on this node.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.dispatch.last.activity.age.seconds</code></td>
    <td>Gauge</td>
    <td>Seconds since this node's dispatcher last completed a batch. A batch that was rolled back (<code>error</code>) does not count. It stays below the dispatch interval plus one batch while the dispatcher runs; alert when it grows.</td>
  </tr>
</table>

These meters are registered only while Business Events are enabled. Percentile histograms are off by default; enable one per meter with Spring Boot's `management.metrics.distribution.percentiles-histogram.<meter-name>=true`.

## Script Guard

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.script.violations</code></td>
    <td>Counter</td>
    <td>Incremented on every Script Guard rule violation, tagged with the offending script's context (see <a href="#tags">Tags</a>).</td>
  </tr>
  <tr>
    <td><code>eximeebpms.script.violations.total</code></td>
    <td>Gauge</td>
    <td>Total Script Guard violations recorded since the instance started, independent of tag values.</td>
  </tr>
</table>

{{< note title="" class="info" >}}
See [Script Guard]({{< ref "/user-guide/process-engine/script-guard.md" >}}) for what a rule violation is and how the underlying policy is configured.
{{< /note >}}

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
- Script Guard violation counter (`eximeebpms.script.violations`, not the `.total` gauge, which carries no tags):
    - `process.definition.key`
    - `activity.id`
    - `language`
    - `origin`
    - `rule.code`

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
