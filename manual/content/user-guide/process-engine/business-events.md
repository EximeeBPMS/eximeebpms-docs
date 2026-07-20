---

title: 'Business Events'
weight: 207

menu:
  main:
    identifier: "user-guide-process-engine-business-events"
    parent: "user-guide-process-engine"

---

{{< note title="Enterprise Edition only" class="warning" >}}
Business Events were introduced in [EximeeBPMS 1.2.16-ee]({{< ref "/release-notes/release-notes-1.2-ee.md" >}}#12-16-ee) (Enterprise Edition). As of this writing, this feature has **not** shipped in any Community Edition release.
{{< /note >}}

Business Events let the process engine publish a stream of domain-level occurrences — a task was completed, a variable changed, a process instance ended — to systems outside the engine, without coupling the engine's own transaction to the availability of those systems.

# How It Works

Business Events use the **transactional outbox pattern**:

1. When an event-worthy change happens (e.g., a task is completed), the engine writes a row describing it to the `ACT_RU_BUS_EVT_OBX` table, **in the same database transaction** as the change itself.
2. A background dispatcher periodically reads batches of undelivered rows from the outbox and hands them to the configured **publisher**.
3. Once a publisher confirms delivery, the corresponding outbox rows are marked delivered; a separate cleanup job removes delivered rows past their retention period.

Because the outbox write is part of the same transaction as the business change, an event is never recorded for a change that didn't commit, and a committed change never silently fails to produce its event — delivery to the publisher is a separate, retried concern. This gives **at-least-once delivery** to downstream systems: consumers should treat delivery as idempotent (event `id` can be used for deduplication).

# Business Event Types

Each business event carries its fully-qualified type in the `businessEventType` field, in the form `camunda7:<entity>:<event>`.

| Fired when | Event type |
|---|---|
| Variable created | `camunda7:variable-instance:created` |
| Variable updated | `camunda7:variable-instance:updated` |
| Variable migrated | `camunda7:variable-instance:migrate` |
| Variable deleted | `camunda7:variable-instance:deleted` |
| Process instance started | `camunda7:process-instance:start` |
| Process instance updated | `camunda7:process-instance-update:update` |
| Process instance ended | `camunda7:process-instance:end` |
| Identity link added | `camunda7:identity-link-add:add-identity-link` |
| Identity link deleted | `camunda7:identity-link-delete:delete-identity-link` |
| Task instance created | `camunda7:task-instance:create` |
| Task instance updated | `camunda7:task-instance:update` |
| Task instance completed | `camunda7:task-instance:complete` |
| Task instance deleted | `camunda7:task-instance:delete` |
| Script violation detected — [Script Guard]({{< ref "/user-guide/process-engine/script-guard.md" >}}) records a violation (`AUDIT` or `ENFORCE` mode) | `camunda7:script-violation:create` |

# Configuration

Business Events are configured under the `eximeebpms.bpm.business-events` prefix and are **disabled by default**:

```yaml
eximeebpms:
  bpm:
    business-events:
      enabled: true
      publisher: kafka
      business-event-dispatch-interval-ms: 5000
      business-event-dispatcher-batch-size: 100
      business-event-outbox-retention-ms: 604800000   # 7 days
      business-event-outbox-cleanup-interval-ms: 3600000  # 1 hour
      publisher-properties:
        kafka.bootstrap-servers: "kafka-1:9092,kafka-2:9092"
        kafka.topic: "eximeebpms.business-events"
```

<table class="table desc-table">
  <tr><th>Property</th><th>Default</th><th>Description</th></tr>
  <tr><td><code>enabled</code></td><td><code>false</code></td><td>Master switch for the whole feature. When disabled, no outbox rows are written and the dispatcher does not run.</td></tr>
  <tr><td><code>publisher</code></td><td><code>noop</code></td><td>Symbolic name of the <a href="#built-in-publishers">publisher</a> to dispatch events to.</td></tr>
  <tr><td><code>business-event-dispatch-interval-ms</code></td><td><code>5000</code></td><td>How often the dispatcher polls the outbox for undelivered events.</td></tr>
  <tr><td><code>business-event-dispatcher-batch-size</code></td><td><code>100</code></td><td>Maximum number of outbox rows read and handed to the publisher per dispatch cycle.</td></tr>
  <tr><td><code>business-event-outbox-retention-ms</code></td><td><code>604800000</code> (7 days)</td><td>How long delivered outbox rows are kept before cleanup removes them.</td></tr>
  <tr><td><code>business-event-outbox-cleanup-interval-ms</code></td><td><code>3600000</code> (1 hour)</td><td>How often the cleanup job runs.</td></tr>
  <tr><td><code>publisher-properties</code></td><td>empty</td><td>Publisher-specific properties (see below), passed through to <code>BusinessEventPublisher.init(Map)</code>.</td></tr>
</table>

# Built-in Publishers

## `noop` (default)

Writes to the outbox but never dispatches anywhere. Useful for exercising the outbox and cleanup mechanics without wiring an external system.

## `kafka`

Publishes events to an Apache Kafka topic. Enable with `publisher: kafka` and configure under `publisher-properties`:

<table class="table desc-table">
  <tr><th>Property</th><th>Required</th><th>Description</th></tr>
  <tr><td><code>kafka.bootstrap-servers</code></td><td>yes</td><td>Comma-separated list of Kafka bootstrap servers.</td></tr>
  <tr><td><code>kafka.topic</code></td><td>yes</td><td>Kafka topic events are published to.</td></tr>
  <tr><td><code>kafka.client-id</code></td><td>no</td><td>Kafka client id.</td></tr>
  <tr><td><code>kafka.send-timeout-ms</code></td><td>no</td><td>Timeout waiting for broker acknowledgement. Default <code>30000</code>.</td></tr>
  <tr><td><code>kafka.client.*</code></td><td>no</td><td>Passed through verbatim to the underlying Kafka producer, with the <code>kafka.client.</code> prefix stripped (e.g. <code>kafka.client.acks=all</code> becomes producer property <code>acks=all</code>).</td></tr>
</table>

# Writing a Custom Publisher

To deliver events somewhere other than Kafka (a webhook, a message broker, a SIEM ingestion endpoint), implement the `BusinessEventPublisher` SPI:

```java
package org.eximeebpms.bpm.commons.eventbus;

public interface BusinessEventPublisher extends AutoCloseable {

  String getName();

  default void init(Map<String, String> properties) {
  }

  BusinessEventPublishResult publish(Event event);

  @Override
  default void close() {
  }
}
```

Register the implementation so it's discoverable under its `getName()` value, then set `publisher: <name>` in configuration. `init(Map<String, String>)` receives whatever is configured under `publisher-properties` for that publisher name.

# Script Guard / SIEM Integration

As of [1.2.19-ee]({{< ref "/release-notes/release-notes-1.2-ee.md" >}}#12-19-ee), [Script Guard]({{< ref "/user-guide/process-engine/script-guard.md" >}}) violations are published as business events (`camunda7:script-violation:create`) through this same mechanism. This means routing Script Guard violations to a SIEM is a matter of enabling Business Events and pointing the configured publisher at your SIEM ingestion endpoint (via the Kafka publisher, or a custom `BusinessEventPublisher` implementation) — no separate integration is required.

# Querying the Outbox

The engine exposes a query API over the outbox via `BusinessEventService`:

```java
processEngine.getBusinessEventService()
    .createBusinessEventOutboxQuery()
    .processInstanceId(processInstanceId)
    .eventType("camunda7:script-violation:create")
    .list();
```

This is primarily useful for diagnostics and for verifying delivery independently of the configured publisher.
