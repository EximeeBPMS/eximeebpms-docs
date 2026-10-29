---
title: 'Worker Monitoring'
weight: 210
menu:
  main:
    identifier: 'external-task-client-monitoring'
    parent: 'external-task-client'
---

{{< note title="Enterprise Edition — upcoming change (BPMS-813)" class="warning" >}}
These monitoring modules require a Java client release containing BPMS-813. Set `eximeebpms.version` below to that published release, consistently for the client, starter and monitoring artifacts. Older releases do not implement the observation SPI.
{{< /note >}}

Workers can publish the same metrics in every customer application. The implementation lives in `eximeebpms-monitor-client`; it does not depend on the process engine. It observes local client activity and reads local executor/pool statistics. It does not call the engine to collect metrics and does not change client settings automatically.

# Spring Boot setup

In addition to the existing external-task-client starter, add:

```xml
<dependency>
  <groupId>org.eximeebpms.bpm.monitor</groupId>
  <artifactId>eximeebpms-monitor-client</artifactId>
  <version>${eximeebpms.version}</version>
</dependency>
<dependency>
  <groupId>org.eximeebpms.bpm.monitor</groupId>
  <artifactId>eximeebpms-monitor-spring-boot</artifactId>
  <version>${eximeebpms.version}</version>
</dependency>
<dependency>
  <groupId>org.eximeebpms.bpm.monitor</groupId>
  <artifactId>eximeebpms-monitor-prometheus</artifactId>
  <version>${eximeebpms.version}</version>
</dependency>
```

Equivalent Gradle dependencies:

```groovy
implementation "org.eximeebpms.bpm.monitor:eximeebpms-monitor-client:${eximeebpmsVersion}"
implementation "org.eximeebpms.bpm.monitor:eximeebpms-monitor-spring-boot:${eximeebpmsVersion}"
runtimeOnly "org.eximeebpms.bpm.monitor:eximeebpms-monitor-prometheus:${eximeebpmsVersion}"
```

The Boot adapter creates one `WorkerMetrics` bean for the application's registry. The standard client starter registers it as both `ExternalTaskClientObserver` and `ExternalTaskExecutionStatsListener`. If you provide your own `WorkerMetrics` bean, auto-configuration reuses it. The common `eximeebpms.monitoring.enabled` switch (default `true`) gates all automatic engine and worker monitoring. Disable only worker integration with `eximeebpms.monitoring.client.enabled=false` (default `true`), or all automatic monitoring with `eximeebpms.monitoring.enabled=false`. This property disables automatic registration of the bean; it does not disable a manually supplied observer.

Expose Prometheus using existing Actuator configuration:

```yaml
management:
  endpoints:
    web:
      exposure:
        include: prometheus
eximeebpms:
  monitoring:
    enabled: true
    client:
      enabled: true
```

The export path is `/actuator/prometheus` unless the application's Actuator path configuration changes it. The application must supply its existing authentication mechanism and map authorized principals to `metricsreader`. The endpoint returns 401 without a principal and 403 without that role. Monitoring does not create users, parse credentials, or install an independent login mechanism. If using a separate management port, register the installation's authentication/security configuration on that server too.

# Plain Java setup

Use `eximeebpms-monitor-client` and, for Prometheus, `eximeebpms-monitor-prometheus`, at the same version. A different Micrometer registry can be supplied instead.

```java
import org.eximeebpms.bpm.extension.monitor.prometheus.PrometheusMeterRegistryFactory;
import io.micrometer.prometheusmetrics.PrometheusMeterRegistry;
import org.eximeebpms.bpm.client.ExternalTaskClient;
import org.eximeebpms.bpm.extension.monitor.client.WorkerMetrics;

PrometheusMeterRegistry registry = new PrometheusMeterRegistryFactory().createRegistry();
WorkerMetrics metrics = new WorkerMetrics(registry);
ExternalTaskClient client = ExternalTaskClient.create()
    .baseUrl(engineRestUrl)
    .addObserver(metrics)
    .addStatsListener(metrics)
    .build();
try {
  // Open the application's topic subscriptions and serve registry.scrape()
  // through the application's authenticated monitoring HTTP endpoint.
} finally {
  client.stop();
  metrics.close();
  registry.close(); // only when this application owns the registry
}
```

Both registrations are required: the observer records renew/queue/manual-extension events and resource state; the statistics listener supplies the existing execution count/average/maximum meters. Plain Java has no embedded HTTP server supplied by this library. Its owner adds exposition to the existing server with the installation's authentication and `metricsreader` role mapping.

Use one `WorkerMetrics` per registry and reuse it for multiple clients. Stop the clients before closing their adapter. Closing the adapter removes its meters and state, but does not close the registry, HTTP pool or executors. Shared executors and connection pools are deduplicated by object identity. Separate registries are independent; avoid registering the same client through two adapters exporting into the same monitoring destination.

# Custom builders and HTTP pools

A subclass of `ExternalTaskClientBuilderImpl` that replaces `initTopicSubscriptionManager()` must forward the inherited observers. Construct the manager with its observer-aware constructor, using `getObservers()` as the final argument, and forward `getHttpConnectionPoolMetrics()` through `TopicSubscriptionManager.setHttpConnectionPoolMetrics(...)`. Keep forwarding the existing statistics listeners as well. A custom factory must register `WorkerMetrics` as both interfaces; adding a dependency alone cannot instrument a manager created outside the standard builder.

The standard builder observes its own HTTP pool automatically. Once `customizeHttpClient(...)` is used, it cannot know whether the customizer replaced that pool. Supply an explicit provider for the actual manager:

```java
builder.httpConnectionPoolMetrics(HttpConnectionPoolMetrics.of(connectionManager, () -> {
  var stats = connectionManager.getTotalStats();
  return new HttpConnectionPoolMetrics.Snapshot(
      stats.getLeased(), stats.getAvailable(), stats.getPending(), stats.getMax());
}));
```

Use the real manager as identity when it is shared. The supplier must be thread-safe, nonblocking, read-only and perform no I/O. It does not transfer ownership. An unobserved custom pool is unknown, never assumed to have zero connections. The client SPI is independent of Micrometer, so applications can implement another `ExternalTaskClientObserver` if needed. Observer callbacks are synchronous, concurrent and isolated from client processing; keep them short and do no I/O in them.

# Metric catalog

Names in this table are Micrometer names. Prometheus normalizes dots to underscores; timers export seconds with `_seconds_count`, `_seconds_sum`, `_seconds_max`; counters export `_total`. Counters/timers reset on adapter/process restart. The legacy execution counter
exports as `eximeebpms_external_tasks_client_execution_count_total`; average/max
export as `eximeebpms_external_tasks_client_execution_duration_avg_ms` and
`eximeebpms_external_tasks_client_execution_duration_max_ms`. Metrics are registered lazily when a matching event or statistics interval arrives, except the executor gauges registered with the adapter. Missing series before the first event is expected.

| Meter | Type / unit | Tags | Meaning |
|---|---|---|---|
| `eximeebpms.client.lock.renewal` | Timer / seconds on export | `topic`, `phase`, `result` | One observation per automatic renewal attempt; count and request duration |
| `eximeebpms.client.lock.remaining` | Distribution summary / seconds | `topic`, `phase` | Nonnegative local remaining lock time at the **start** of each automatic renew request |
| `eximeebpms.client.queue.wait` | Timer / seconds on export | `topic`, `departure` | Time from receipt of the fetch response to final local departure/dispatch, including pre-start renewal |
| `eximeebpms.client.tasks.skipped` | Counter / tasks | `topic`, `reason` | A pending task is discarded because the lock expired or renewal was rejected |
| `eximeebpms.client.tasks.released` | Counter / tasks | `topic`, `reason=no_progress` | Local release decision after the executor stopped making progress; does not assert that the unlock request succeeded |
| `eximeebpms.client.lock.extension.manual` | Timer / seconds on export | `result` | Explicit task-service `extendLock`, separate from automatic maintenance |
| `eximeebpms.client.executor.queued` | Gauge / tasks | none | Sum of queue sizes across distinct active-client executors |
| `eximeebpms.client.executor.active` | Gauge / threads | none | Sum of active thread counts |
| `eximeebpms.client.executor.pool.size` | Gauge / threads | none | Sum of current pool sizes |
| `eximeebpms.client.executor.pool.max` | Gauge / threads | none | Sum of configured maximum pool sizes |
| `eximeebpms.client.http.connections` | Gauge / connections | `state` | Sum across distinct observed active-client HTTP pools |
| `eximeebpms.external.tasks.client.execution.count` | Counter / tasks | `process.definition.key`, `topic.name` | Existing completed-execution statistics count, delivered in five-minute snapshots |
| `eximeebpms.external.tasks.client.execution.duration.avg.ms` | Gauge / milliseconds | `process.definition.key`, `topic.name` | Rounded average from the last nonempty delivered statistics interval |
| `eximeebpms.external.tasks.client.execution.duration.max.ms` | Gauge / milliseconds | `process.definition.key`, `topic.name` | Maximum from that nonempty interval |

`phase` is `queued` (maintenance while waiting) or `before_start` (renewal immediately before execution). `result` is `success`, `rejected` (HTTP 400/404) or `error` (other failures, including transient errors). These are attempts, not unique tasks. Repeated transient failures can produce multiple observations for the same task. Automatic observations do not include handler-triggered manual extensions.

`departure` is `execution_start`, `lock_unavailable`, `no_progress`, `shutdown` or `submission_failed`. A task emits one terminal departure. Timing begins at the local fetch-response receipt timestamp shared by that batch. For `execution_start` it ends immediately before execution dispatch, after any pre-start renewal; it therefore includes that renewal and is not a pure executor-queue residence time. `execution_start` means it was dispatched to execution, including a failure while preparing its variables; it does not assert successful handler completion. `reason` for skipped tasks is `expired` or `renewal_rejected`.

HTTP `state` is `leased`, `available`, `pending` or `max`. HTTP gauges are absent until a provider has been seen, and report `NaN` when no active pool is observed or a provider fails. A mixture of known and unobserved custom pools reports only the known pools. Executors with no active client contribute zero; a failed read reports `NaN`. A shared executor's queue/active counts include other application work using it, not only external tasks.

Legacy execution meters keep the existing platform semantics: empty intervals do not clear average/max. With multiple clients sharing the same labels, counts add up; average/max reflect the last nonempty interval delivered by any client, not a weighted aggregate across clients. These gauges must not be interpreted as percentiles. They use milliseconds, unlike the new timer exports, which use seconds.

No task ID, worker ID, request URL, process instance ID, exception text, payload or model response is used as a metric label. Topic and process-definition labels come from the model; keep their set bounded. Use Prometheus scrape labels such as `job` and `instance` to identify worker deployments.

# Interpreting and tuning

Count automatic renews over a selected window:

```promql
sum by (topic, phase, result) (
  increase(eximeebpms_client_lock_renewal_seconds_count[15m])
)
```

Average renew latency (seconds):

```promql
sum by (topic) (rate(eximeebpms_client_lock_renewal_seconds_sum[5m]))
/
sum by (topic) (rate(eximeebpms_client_lock_renewal_seconds_count[5m]))
```

Compare renewal frequency with queue wait, executor queue/active/max values and remaining lock time. Frequent successful renews during a large queue can indicate that fetch multiplier/lock duration should be reconsidered; requests rejected by the engine need a different investigation from transient HTTP errors. A rising HTTP `pending` gauge with a saturated pool suggests connection contention. Examine handler duration and throughput before changing lock duration, fetched-task multiplier, executor limits, maintenance pool limits or timeouts. None of these metrics changes settings automatically.

The engine repository's `monitoring/examples/` contains an example Grafana dashboard and parameterized Prometheus alert template. Choose thresholds for the installation's workload; examples are not universal defaults. Histogram-based percentiles require explicitly enabled histogram buckets (for example through Spring Boot's `management.metrics.distribution.percentiles-histogram`) and do not appear by default. Use `increase`/`rate` for counters to handle resets. Do not sum database snapshot gauges from multiple engine nodes that share a database.
