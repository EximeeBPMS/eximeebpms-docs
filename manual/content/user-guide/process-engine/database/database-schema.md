---

title: 'Database Schema'
weight: 10
menu:
  main:
    identifier: "user-guide-process-engine-database-schema"
    parent: "user-guide-process-engine-database"

---

The database schema of the process engine consists of multiple tables.
The table names all start with ACT. The second part is a two-character
identification of the use case of the table. This use case will also roughly
match the service API.

* `ACT_RE_*`: `RE` stands for repository. Tables with this prefix contain 'static' information such as process definitions and process resources (images, rules, etc.).
* `ACT_RU_*`: `RU` stands for runtime. These are the runtime tables that contain the runtime data of process instances, user tasks, variables, jobs, etc. The engine only stores the runtime data during process instance execution and removes the records when a process instance ends. This keeps the runtime tables small and fast.
* `ACT_ID_*`: `ID` stands for identity. These tables contain identity information such as users, groups, etc.
* `ACT_HI_*`: `HI` stands for history. These are the tables that contain historical data such as past process instances, variables, tasks, etc.
* `ACT_GE_*`: General data, which is used in various use cases.

The main tables of the process engines are the entities of process definitions, executions, tasks, variables and
event subscriptions. Their relationship is shown in the following UML model.

{{< img src="../../img/database-schema.png" title="Database Schema" >}}


## Process Definitions (`ACT_RE_PROCDEF`)

The `ACT_RE_PROCDEF` table contains all deployed process definitions. It
includes information like the version details, the resource name or the
suspension state.


## Executions (`ACT_RU_EXECUTION`)

The `ACT_RU_EXECUTION` table contains all current executions. It includes
information like the process definition, parent execution, business key, the
current activity and different metadata about the state of the execution.


## Tasks (`ACT_RU_TASK`)

The `ACT_RU_TASK` table contains all open tasks of all running process
instances. It includes information like the corresponding process instance,
execution and also metadata such as creation time, assignee or due date.


## Variables (`ACT_RU_VARIABLE`)

The `ACT_RU_VARIABLE` table contains all currently set process or task
variables. It includes the names, types and values of the variables and
information about the corresponding process instance or task.


## Event Subscriptions (`ACT_RU_EVENT_SUBSCR`)

The `ACT_RU_EVENT_SUBSCR` table contains all currently existing event
subscriptions. It includes the type, name and configuration of the expected
event along with information about the corresponding process instance and
execution.

## Schema Log (`ACT_GE_SCHEMA_LOG`)

The `ACT_GE_SCHEMA_LOG` table contains a history of the database
schema version. New entries to the table are written when changes to
the database schema are made. On database creation the initial entry
is added. Every update script adds a new entry containing an `id`,
the `version` the database was updated to and the date and time 
(`timestamp`) of the update.

To retrieve entries from the schema log, the SchemaLogQuery-API can be
used:
```java
List<SchemaLogEntry> entries = managementService.createSchemaLogQuery().list();
```

## Metrics Log (ACT_RU_METER_LOG)

The `ACT_RU_METER_LOG` table contains a collection of runtime metrics that can help draw conclusions about usage, load
and performance of EximeeBPMS. Metrics are reported as numbers in the Java `long` range and count the occurrence of
specific events. Please find detailed information about how metrics are collected in the [Metrics User Guide]({{< ref "/user-guide/process-engine/metrics.md">}}).

The default configuration of the [MetricsReporter]({{< ref "/user-guide/process-engine/metrics.md#metrics-reporter">}}) will create one row per [metric]({{< ref "/user-guide/process-engine/metrics.md#built-in-metrics">}}) in `ACT_RU_METER_LOG` every 15 minutes.

## Task Metrics Log (ACT_RU_TASK_METER_LOG)

The `ACT_RU_TASK_METER_LOG` table contains a collection of task related metrics that can help draw conclusions about usage, load
and performance of the BPM platform. Task metrics contain a pseudonymized and fixed-length value of task assignees and their time of appearance. Please find detailed information about how task metrics are collected in the [Metrics User Guide]({{< ref "/user-guide/process-engine/metrics.md">}}).

Every assignment of a task to an assignee will create one row in `ACT_RU_TASK_METER_LOG`.

## Business Event Outbox (ACT_RU_BUS_EVT_OBX) — Enterprise Edition

The `ACT_RU_BUS_EVT_OBX` table backs [Business Events]({{< ref "/user-guide/process-engine/business-events.md" >}}) (Enterprise Edition), available since EximeeBPMS 1.2.16-ee. It implements the **transactional outbox pattern**: a row is inserted in the same transaction as the business change it describes, and a background dispatcher later reads undelivered rows and hands them to the configured publisher. The table is generic across all [business event types]({{< ref "/user-guide/process-engine/business-events.md" >}}#business-event-types) — adding a new event type (e.g. the job, batch, incident, external task, activity instance, DMN decision, form property, and user operation log events added in [1.3.1-ee]({{< ref "/release-notes/release-notes-1.3-ee.md" >}}#131-ee)) does not require a schema change, since the event payload itself is stored as an opaque JSON string.

<table class="table desc-table">
  <tr><th>Column</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>ID_</code></td><td><code>bigint</code></td><td>Primary key, auto-generated.</td></tr>
  <tr><td><code>CREATED_DATE_</code></td><td><code>timestamp</code></td><td>When the row was written — i.e. when the underlying business change committed, not when it was dispatched.</td></tr>
  <tr><td><code>BUSINESS_EVENT_</code></td><td><code>clob</code></td><td>The business event's payload, serialized to JSON. See the <a href="{{< ref "/user-guide/process-engine/business-events-fields.md" >}}">Business Event Field Reference</a> for the fields behind each event type.</td></tr>
  <tr><td><code>EVENT_TYPE_</code></td><td><code>varchar(255)</code></td><td>The fully-qualified event type, e.g. <code>bpms:task-instance:complete</code> — matches <code>businessEventType</code> inside the payload.</td></tr>
  <tr><td><code>PROC_INST_ID_</code></td><td><code>varchar(64)</code></td><td>Process instance id, when the event has a process context; otherwise <code>NULL</code>.</td></tr>
  <tr><td><code>ROOT_PROC_INST_ID_</code></td><td><code>varchar(64)</code></td><td>Root process instance id (top of the call-activity chain), when applicable.</td></tr>
  <tr><td><code>PROC_DEF_KEY_</code></td><td><code>varchar(255)</code></td><td>Process definition key, when the event has a process context.</td></tr>
  <tr><td><code>TASK_ID_</code></td><td><code>varchar(64)</code></td><td>Task id, when the event is scoped to a task.</td></tr>
  <tr><td><code>PROCESSED_</code></td><td><code>boolean</code></td><td>Whether the dispatcher has successfully delivered this row to the configured publisher. Defaults to <code>false</code>.</td></tr>
  <tr><td><code>PROCESSED_DATE_</code></td><td><code>timestamp</code></td><td>When the row was marked delivered; <code>NULL</code> until then.</td></tr>
</table>

There is no foreign key relationship from `ACT_RU_BUS_EVT_OBX` to the core runtime tables — by design, the outbox must survive the deletion of the process instance or task it describes. Delivered rows are removed automatically past their retention period; see [Business Events — Configuration]({{< ref "/user-guide/process-engine/business-events.md" >}}#configuration).

## Script Violation Log (ACT_RU_SCRIPT_VIOLATION)

The `ACT_RU_SCRIPT_VIOLATION` table stores violation events recorded by [Script Guard]({{< ref "/user-guide/process-engine/script-guard.md" >}}). A row is inserted each time a script triggers a security rule while Script Guard is in `ENFORCE` or `AUDIT` mode. This table is available from EximeeBPMS 1.3.0.

<table class="table desc-table">
  <tr><th>Column</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>ID_</code></td><td><code>varchar(64)</code></td><td>Primary key.</td></tr>
  <tr><td><code>TIMESTAMP_</code></td><td><code>timestamp</code></td><td>Time at which the violation was detected.</td></tr>
  <tr><td><code>PROC_DEF_KEY_</code></td><td><code>varchar(255)</code></td><td>Key of the process definition containing the offending script.</td></tr>
  <tr><td><code>ACTIVITY_ID_</code></td><td><code>varchar(255)</code></td><td>ID of the BPMN element (e.g., Script Task) that triggered the violation.</td></tr>
  <tr><td><code>LANGUAGE_</code></td><td><code>varchar(64)</code></td><td>Scripting language (e.g., <code>groovy</code>, <code>javascript</code>).</td></tr>
  <tr><td><code>SOURCE_TYPE_</code></td><td><code>varchar(64)</code></td><td>Origin of the script source: <code>INLINE_SOURCE</code>, <code>DYNAMIC_SOURCE</code>, <code>RESOURCE</code>, <code>DYNAMIC_RESOURCE</code>, <code>EXPRESSION</code>, or <code>UNKNOWN</code>.</td></tr>
  <tr><td><code>ORIGIN_</code></td><td><code>varchar(64)</code></td><td>Who submitted the script: <code>USER</code>, <code>PROCESS_APPLICATION</code>, <code>PLATFORM</code>, or <code>UNKNOWN</code>.</td></tr>
  <tr><td><code>RULE_CODE_</code></td><td><code>varchar(255)</code></td><td>Machine-readable rule code that matched (e.g., <code>SCRIPT_SECURITY_RUNTIME_EXEC</code>).</td></tr>
  <tr><td><code>REASON_</code></td><td><code>varchar(1000)</code></td><td>Human-readable explanation of why the script was flagged.</td></tr>
</table>

Older records can be purged automatically by setting `retention-days` in the [Script Guard configuration]({{< ref "/user-guide/process-engine/script-guard.md#configuration" >}}).

# Entity Relationship Diagrams

{{< note title="" class="info" >}}
  The database is not part of the **public API**. The database schema may change for MINOR and MAJOR version updates.

  **Please note:**
  The following diagrams are based on the MySQL database schema. For other databases the diagram may be slightly different.
{{< /note >}}


The following Entity Relationship Diagrams visualize the database tables and their explicit foreign key constraints, grouped by Engine with focus on BPMN, Engine with focus on DMN, the Engine History and the Identity. Please note that the diagrams do not visualize implicit connections between the tables.

{{< note title="" class="info" >}}
The tables `ACT_RU_BUS_EVT_OBX` (Enterprise Edition, added in 1.2.16-ee) and `ACT_RU_SCRIPT_VIOLATION` (added in 1.3.0) are not shown in the diagrams below, as neither has foreign key relationships to the core tables. Their structures are documented in the [Business Event Outbox](#business-event-outbox-act_ru_bus_evt_obx) and [Script Violation Log](#script-violation-log-act_ru_script_violation) sections above.
{{< /note >}}

Where Enterprise Edition's schema differs from Community Edition (currently: BPMN and History), an additional Enterprise Edition diagram is included alongside the Community Edition one.

## Engine BPMN

{{< img src="../../img/erd_723_bpmn.svg" title="BPMN Tables (Community Edition)" >}}

### Enterprise Edition (1.2.19-ee and later)

{{< img src="../../img/erd_ee_bpmn.svg" title="BPMN Tables (Enterprise Edition)" >}}


## Engine DMN

{{< img src="../../img/erd_723_dmn.svg" title="DMN Tables" >}}


## History

To allow different configurations and to keep the tables more flexible, the history tables contain no foreign key constraints.

{{< img src="../../img/erd_723_history.svg" title="History Tables (Community Edition)" >}}

### Enterprise Edition (1.2.19-ee and later)

{{< img src="../../img/erd_ee_history.svg" title="History Tables (Enterprise Edition)" >}}


## Identity

{{< img src="../../img/erd_723_identity.svg" title="Identity Tables" >}}
