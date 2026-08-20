---

title: 'Business Events'
weight: 207

menu:
  main:
    identifier: "user-guide-process-engine-business-events"
    parent: "user-guide-process-engine"

---

{{< note title="Enterprise Edition only" class="warning" >}}
Business Events were introduced in [EximeeBPMS 1.2.16-ee]({{< ref "/release-notes/release-notes-1.2-ee.md" >}}#12-16-ee) (Enterprise Edition). As of this writing, this feature has **not** shipped in any Community Edition release. The set of covered entities was substantially expanded, and the default event type prefix changed, in [1.3.1-ee]({{< ref "/release-notes/release-notes-1.3-ee.md" >}}#131-ee) — see the notes on the [`prefix` configuration property](#configuration) below if you're upgrading from an earlier release.
{{< /note >}}

Business Events let the process engine publish a stream of domain-level occurrences — a task was completed, a variable changed, a process instance ended — to systems outside the engine, without coupling the engine's own transaction to the availability of those systems.

For the exact fields carried by each event type's payload, see [Business Event Field Reference]({{< ref "/user-guide/process-engine/business-events-fields.md" >}}).

# How It Works

Business Events use the **transactional outbox pattern**:

1. When an event-worthy change happens (e.g., a task is completed), the engine writes a row describing it to the `ACT_RU_BUS_EVT_OBX` table, **in the same database transaction** as the change itself.
2. A background dispatcher periodically reads batches of undelivered rows from the outbox and hands them to the configured **publisher**.
3. Once a publisher confirms delivery, the corresponding outbox rows are marked delivered; a separate cleanup job removes delivered rows past their retention period.

Because the outbox write is part of the same transaction as the business change, an event is never recorded for a change that didn't commit, and a committed change never silently fails to produce its event — delivery to the publisher is a separate, retried concern. This gives **at-least-once delivery** to downstream systems: consumers should treat delivery as idempotent (the `metadata.uuid` field described below can be used for deduplication).

# Event Envelope

What a publisher (e.g. the `kafka` publisher, or a custom `BusinessEventPublisher`) actually receives is an `Event` envelope wrapping the business event, not the business event object directly:

```json
{
  "metadata": {
    "timestamp": "2026-07-29T10:15:23.456+00:00",
    "uuid": "1c1a9e2e-2a34-4b7d-9f0a-6e3d3a2b9c11",
    "type": "bpms:task-instance:complete",
    "version": "1.0",
    "origin": "bpms",
    "correlationId": null,
    "processInstanceId": "3f2c...",
    "processDefinitionKey": "invoice-approval",
    "noProcessContext": false
  },
  "payload": "{\"id\":\"...\",\"processInstanceId\":\"3f2c...\", ... }"
}
```

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>metadata.timestamp</code></td><td>Instant</td><td>When the outbox row was written (i.e. when the underlying business change committed), not when it was dispatched.</td></tr>
  <tr><td><code>metadata.uuid</code></td><td>String</td><td>A fresh random UUID generated at dispatch time. Not the same as the business event's own <code>id</code> field — use this for de-duplicating retried deliveries of the <em>same dispatch attempt</em>.</td></tr>
  <tr><td><code>metadata.type</code></td><td>String</td><td>The fully-qualified business event type, in the form <code>&lt;prefix&gt;:&lt;entity&gt;:&lt;event&gt;</code> — see <a href="#business-event-types">Business Event Types</a> below. Mirrors the <code>businessEventType</code> field inside <code>payload</code>.</td></tr>
  <tr><td><code>metadata.version</code></td><td>String</td><td>Envelope schema version. Currently always <code>"1.0"</code>.</td></tr>
  <tr><td><code>metadata.origin</code></td><td>String</td><td>Always the literal <code>"bpms"</code>. Unlike <code>metadata.type</code>, this is <strong>not</strong> affected by the configured <a href="#configuration"><code>prefix</code></a> — don't use it to distinguish between engines that are configured with different prefixes.</td></tr>
  <tr><td><code>metadata.correlationId</code></td><td>String</td><td>Reserved for future use. Currently always <code>null</code>.</td></tr>
  <tr><td><code>metadata.processInstanceId</code></td><td>String</td><td>Root process instance id if the event has a process context; otherwise the literal <code>"no-process-context"</code> (see <code>noProcessContext</code>).</td></tr>
  <tr><td><code>metadata.processDefinitionKey</code></td><td>String</td><td>Process definition key if the event has a process context; otherwise <code>"no-process-context"</code>.</td></tr>
  <tr><td><code>metadata.noProcessContext</code></td><td>boolean</td><td><code>true</code> when the underlying change has no associated process instance (e.g. a job or user operation log entry that isn't tied to a running instance).</td></tr>
  <tr><td><code>payload</code></td><td>String</td><td>The business event itself, serialized to a <strong>JSON string</strong> (not a nested JSON object) using Gson. Its own field names match the Java entity's field names exactly — one-to-one, no getter/property renaming. Deserialize this string separately to access the fields documented in <a href="{{< ref "/user-guide/process-engine/business-events-fields.md" >}}">Business Event Field Reference</a>.</td></tr>
</table>

# Business Event Types

Each business event carries its fully-qualified type in the `businessEventType` field of its payload (and in `metadata.type` of the envelope), in the form `<prefix>:<entity>:<event>`. The default prefix is **`bpms`** and is [configurable](#configuration); examples below use the default.

For the exact payload fields behind each row, follow the links to the [Business Event Field Reference]({{< ref "/user-guide/process-engine/business-events-fields.md" >}}).

## Process & Task Lifecycle

| Fired when | Event type |
|---|---|
| [Process instance]({{< ref "/user-guide/process-engine/business-events-fields.md#process-instance" >}}) started | `bpms:process-instance:start` |
| [Process instance]({{< ref "/user-guide/process-engine/business-events-fields.md#process-instance" >}}) updated | `bpms:process-instance-update:update` |
| [Process instance]({{< ref "/user-guide/process-engine/business-events-fields.md#process-instance" >}}) ended | `bpms:process-instance:end` |
| [Process instance]({{< ref "/user-guide/process-engine/business-events-fields.md#process-instance" >}}) migrated to another process definition version | `bpms:process-instance:migrate` |
| [Activity instance]({{< ref "/user-guide/process-engine/business-events-fields.md#activity-instance" >}}) started | `bpms:activity-instance:start` |
| [Activity instance]({{< ref "/user-guide/process-engine/business-events-fields.md#activity-instance" >}}) updated | `bpms:activity-instance:update` |
| [Activity instance]({{< ref "/user-guide/process-engine/business-events-fields.md#activity-instance" >}}) migrated | `bpms:activity-instance:migrate` |
| [Activity instance]({{< ref "/user-guide/process-engine/business-events-fields.md#activity-instance" >}}) ended | `bpms:activity-instance:end` |
| [Task instance]({{< ref "/user-guide/process-engine/business-events-fields.md#task-instance" >}}) created | `bpms:task-instance:create` |
| [Task instance]({{< ref "/user-guide/process-engine/business-events-fields.md#task-instance" >}}) updated | `bpms:task-instance:update` |
| [Task instance]({{< ref "/user-guide/process-engine/business-events-fields.md#task-instance" >}}) migrated | `bpms:task-instance:migrate` |
| [Task instance]({{< ref "/user-guide/process-engine/business-events-fields.md#task-instance" >}}) completed | `bpms:task-instance:complete` |
| [Task instance]({{< ref "/user-guide/process-engine/business-events-fields.md#task-instance" >}}) deleted | `bpms:task-instance:delete` |

## Variables & Identity Links

| Fired when | Event type |
|---|---|
| [Variable]({{< ref "/user-guide/process-engine/business-events-fields.md#variable-instance" >}}) created | `bpms:variable-instance:create` |
| [Variable]({{< ref "/user-guide/process-engine/business-events-fields.md#variable-instance" >}}) updated | `bpms:variable-instance:update` |
| [Variable]({{< ref "/user-guide/process-engine/business-events-fields.md#variable-instance" >}}) migrated | `bpms:variable-instance:migrate` |
| [Variable]({{< ref "/user-guide/process-engine/business-events-fields.md#variable-instance" >}}) deleted | `bpms:variable-instance:delete` |
| [Identity link]({{< ref "/user-guide/process-engine/business-events-fields.md#identity-link" >}}) added (candidate/assignee/owner) | `bpms:identity-link-add:add-identity-link` |
| [Identity link]({{< ref "/user-guide/process-engine/business-events-fields.md#identity-link" >}}) deleted | `bpms:identity-link-delete:delete-identity-link` |

{{< note title="Upgrading from 1.3.1-ee" class="warning" >}}
In 1.3.1-ee, Variable business events used inconsistent past-tense type names — `variable-instance:created`, `variable-instance:updated`, `variable-instance:deleted` — instead of the imperative-style names every other entity uses. As of [1.3.2-ee]({{< ref "/release-notes/release-notes-1.3-ee.md" >}}#132-ee), these are corrected to `create`/`update`/`delete` as shown above (`migrate` was already correctly named). If you built downstream consumers against the 1.3.1-ee strings, update them — the old strings are no longer published.
{{< /note >}}

## Jobs, Batches & External Tasks

| Fired when | Event type |
|---|---|
| [Job]({{< ref "/user-guide/process-engine/business-events-fields.md#job" >}}) created | `bpms:job:create` |
| [Job]({{< ref "/user-guide/process-engine/business-events-fields.md#job" >}}) execution failed | `bpms:job:fail` |
| [Job]({{< ref "/user-guide/process-engine/business-events-fields.md#job" >}}) executed successfully | `bpms:job:success` |
| [Job]({{< ref "/user-guide/process-engine/business-events-fields.md#job" >}}) deleted | `bpms:job:delete` |
| [Batch]({{< ref "/user-guide/process-engine/business-events-fields.md#batch" >}}) started | `bpms:batch:start` |
| [Batch]({{< ref "/user-guide/process-engine/business-events-fields.md#batch" >}}) execution progress updated | `bpms:batch:update` |
| [Batch]({{< ref "/user-guide/process-engine/business-events-fields.md#batch" >}}) ended | `bpms:batch:end` |
| [External task]({{< ref "/user-guide/process-engine/business-events-fields.md#external-task" >}}) created | `bpms:external-task:create` |
| [External task]({{< ref "/user-guide/process-engine/business-events-fields.md#external-task" >}}) execution failed | `bpms:external-task:fail` |
| [External task]({{< ref "/user-guide/process-engine/business-events-fields.md#external-task" >}}) executed successfully | `bpms:external-task:success` |
| [External task]({{< ref "/user-guide/process-engine/business-events-fields.md#external-task" >}}) deleted | `bpms:external-task:delete` |

## Incidents & Decisions

| Fired when | Event type |
|---|---|
| [Incident]({{< ref "/user-guide/process-engine/business-events-fields.md#incident" >}}) created | `bpms:incident:create` |
| [Incident]({{< ref "/user-guide/process-engine/business-events-fields.md#incident" >}}) migrated | `bpms:incident:migrate` |
| [Incident]({{< ref "/user-guide/process-engine/business-events-fields.md#incident" >}}) resolved | `bpms:incident:resolve` |
| [Incident]({{< ref "/user-guide/process-engine/business-events-fields.md#incident" >}}) updated | `bpms:incident:update` |
| [Incident]({{< ref "/user-guide/process-engine/business-events-fields.md#incident" >}}) deleted | `bpms:incident:delete` |
| [DMN decision]({{< ref "/user-guide/process-engine/business-events-fields.md#dmn-decision-evaluation" >}}) evaluated | `bpms:decision:evaluate` |

## Forms & Audit Trail

| Fired when | Event type |
|---|---|
| [Form property]({{< ref "/user-guide/process-engine/business-events-fields.md#form-property" >}}) submitted/updated via a task or start form | `bpms:form-property:form-property-update` |
| [User operation log]({{< ref "/user-guide/process-engine/business-events-fields.md#user-operation-log" >}}) entry created (one event per changed property) | `bpms:user-operation-log:create` |
| [Script violation]({{< ref "/user-guide/process-engine/business-events-fields.md#script-violation" >}}) detected — [Script Guard]({{< ref "/user-guide/process-engine/script-guard.md" >}}) records a violation (`AUDIT` or `ENFORCE` mode) | `bpms:script-violation:create` |

# Configuration

Business Events are configured under the `eximeebpms.bpm.business-events` prefix and are **disabled by default**:

```yaml
eximeebpms:
  bpm:
    business-events:
      enabled: true
      publisher: kafka
      prefix: bpms
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
  <tr><td><code>prefix</code></td><td><code>bpms</code></td><td>Prefix prepended to every business event's fully-qualified type, i.e. the <code>&lt;prefix&gt;</code> in <code>&lt;prefix&gt;:&lt;entity&gt;:&lt;event&gt;</code>. Added in <a href="{{< ref "/release-notes/release-notes-1.3-ee.md" >}}#131-ee">1.3.1-ee</a>. Does not affect the envelope's <code>metadata.origin</code> field, which is always <code>"bpms"</code> — see <a href="#event-envelope">Event Envelope</a>.</td></tr>
  <tr><td><code>business-event-dispatch-interval-ms</code></td><td><code>5000</code></td><td>How often the dispatcher polls the outbox for undelivered events.</td></tr>
  <tr><td><code>business-event-dispatcher-batch-size</code></td><td><code>100</code></td><td>Maximum number of outbox rows read and handed to the publisher per dispatch cycle.</td></tr>
  <tr><td><code>business-event-outbox-retention-ms</code></td><td><code>604800000</code> (7 days)</td><td>How long delivered outbox rows are kept before cleanup removes them.</td></tr>
  <tr><td><code>business-event-outbox-cleanup-interval-ms</code></td><td><code>3600000</code> (1 hour)</td><td>How often the cleanup job runs.</td></tr>
  <tr><td><code>publisher-properties</code></td><td>empty</td><td>Publisher-specific properties (see below), passed through to <code>BusinessEventPublisher.init(Map)</code>.</td></tr>
</table>

{{< note title="Upgrading from a release before 1.3.1-ee" class="warning" >}}
Releases before 1.3.1-ee published events with the hardcoded prefix `camunda7` (e.g. `camunda7:task-instance:complete`). Starting with 1.3.1-ee, the default prefix is `bpms`. If downstream consumers (SIEM rules, stream processors, dashboards) match on the literal type string, either update them to the `bpms:` prefix or set `prefix: camunda7` explicitly to preserve the previous behavior during migration.
{{< /note >}}

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

As of [1.2.19-ee]({{< ref "/release-notes/release-notes-1.2-ee.md" >}}#12-19-ee), [Script Guard]({{< ref "/user-guide/process-engine/script-guard.md" >}}) violations are published as business events (`bpms:script-violation:create` by default) through this same mechanism. This means routing Script Guard violations to a SIEM is a matter of enabling Business Events and pointing the configured publisher at your SIEM ingestion endpoint (via the Kafka publisher, or a custom `BusinessEventPublisher` implementation) — no separate integration is required. The same applies to the [user operation log]({{< ref "/user-guide/process-engine/business-events-fields.md#user-operation-log" >}}) events introduced in 1.3.1-ee, which give a SIEM a real-time feed of administrative actions (task assignment/suspension, batch/job/deployment operations) in addition to the periodic `ACT_HI_OP_LOG` table.

# Querying the Outbox

The engine exposes a query API over the outbox via `BusinessEventService`:

```java
processEngine.getBusinessEventService()
    .createBusinessEventOutboxQuery()
    .processInstanceId(processInstanceId)
    .eventType("bpms:script-violation:create")
    .list();
```

This is primarily useful for diagnostics and for verifying delivery independently of the configured publisher.
