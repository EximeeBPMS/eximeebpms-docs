---

title: 'Business Event Field Reference'
weight: 10

menu:
  main:
    identifier: "user-guide-process-engine-business-events-fields"
    parent: "user-guide-process-engine-business-events"

---

{{< note title="Enterprise Edition only" class="warning" >}}
This page documents the payload fields of [Business Events]({{< ref "/user-guide/process-engine/business-events.md" >}}) (Enterprise Edition).
{{< /note >}}

Every business event is delivered as the `payload` string of the [Event Envelope]({{< ref "/user-guide/process-engine/business-events.md" >}}#event-envelope). Once parsed as JSON, its fields depend on which entity the event describes — but every payload shares a common set of base fields, described first below.

Field names below match the Java class fields **exactly**, since the payload is serialized with Gson, which serializes declared fields rather than getters. Types are the underlying Java types; in JSON, `Date`/`Instant` fields are rendered according to the format `yyyy-MM-dd'T'HH:mm:ss.SSSXXX`, and absent/inapplicable fields are typically omitted or `null` rather than present with an empty value.

# Common Fields

Every business event payload includes these fields (from the base `BusinessEvent` class):

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>id</code></td><td>String</td><td>Identifier of the event's subject (e.g. the process instance id, task id, incident id) — populated for most, but not all, event types; see per-entity notes below.</td></tr>
  <tr><td><code>rootProcessInstanceId</code></td><td>String</td><td>The root process instance in which the event occurred (top of the call-activity chain).</td></tr>
  <tr><td><code>processInstanceId</code></td><td>String</td><td>The process instance in which the event occurred.</td></tr>
  <tr><td><code>executionId</code></td><td>String</td><td>Id of the execution in which the event occurred.</td></tr>
  <tr><td><code>processDefinitionId</code></td><td>String</td><td>Id of the process definition (deployment-specific).</td></tr>
  <tr><td><code>processDefinitionKey</code></td><td>String</td><td>Key of the process definition (stable across versions).</td></tr>
  <tr><td><code>processDefinitionName</code></td><td>String</td><td>Human-readable name of the process definition.</td></tr>
  <tr><td><code>processDefinitionVersion</code></td><td>Integer</td><td>Version of the process definition.</td></tr>
  <tr><td><code>eventType</code></td><td>String</td><td>The short event name, e.g. <code>start</code>, <code>create</code>, <code>update</code> — the last segment of <code>businessEventType</code>.</td></tr>
  <tr><td><code>businessEventType</code></td><td>String</td><td>The fully-qualified type, <code>&lt;prefix&gt;:&lt;entity&gt;:&lt;event&gt;</code> (e.g. <code>bpms:task-instance:complete</code>) — matches <code>metadata.type</code> in the envelope.</td></tr>
  <tr><td><code>sequenceCounter</code></td><td>long</td><td>Execution/variable sequence counter, useful for ordering events that were dispatched out of strict chronological order.</td></tr>
</table>

Several entities (process instance, activity instance's sibling detail entities, task instance, variable instance, form property, script violation) extend a further intermediate base, `BusinessDetailEventEntity`, adding:

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>activityInstanceId</code></td><td>String</td><td>Activity instance associated with the change (meaning varies slightly per entity — see notes below).</td></tr>
  <tr><td><code>taskId</code></td><td>String</td><td>Task id, when the event is scoped to a task; otherwise <code>null</code>.</td></tr>
  <tr><td><code>timestamp</code></td><td>Date</td><td>When the event occurred.</td></tr>
  <tr><td><code>tenantId</code></td><td>String</td><td>Tenant id, in multi-tenant deployments.</td></tr>
  <tr><td><code>userOperationId</code></td><td>String</td><td>Id correlating this change back to the [user operation log](#user-operation-log) entry that caused it, if any (e.g. a task update triggered by an explicit API call vs. an internal engine action).</td></tr>
</table>

Entities that extend `BusinessEvent` directly (activity instance, identity link, incident, job, batch, external task, DMN decision, user operation log) do **not** carry the `BusinessDetailEventEntity` fields above — only the Common Fields plus their own, listed per entity below.

---

# Process Instance

**Types:** `start`, `end`, `migrate` (entity `process-instance`); `update` (entity `process-instance-update`)
**Java:** `BusinessProcessInstanceEventEntity` (extends `BusinessDetailEventEntity`)

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>id</code></td><td>String</td><td>The process instance id (explicitly set to this on all process-instance events).</td></tr>
  <tr><td><code>businessKey</code></td><td>String</td><td>The process instance's business key, if set.</td></tr>
  <tr><td><code>startUserId</code></td><td>String</td><td>Authenticated user id that started the instance, if any.</td></tr>
  <tr><td><code>superProcessInstanceId</code></td><td>String</td><td>Parent process instance id, if this instance was started via a call activity.</td></tr>
  <tr><td><code>startActivityId</code></td><td>String</td><td>BPMN activity id where the instance started.</td></tr>
  <tr><td><code>endActivityId</code></td><td>String</td><td>BPMN activity id where the instance ended (only on <code>end</code>).</td></tr>
  <tr><td><code>deleteReason</code></td><td>String</td><td>Reason string, populated when the instance ended via deletion/cancellation rather than normal completion.</td></tr>
  <tr><td><code>state</code></td><td>String</td><td>One of <code>ACTIVE</code>, <code>SUSPENDED</code>, <code>COMPLETED</code>, <code>INTERNALLY_TERMINATED</code>, <code>EXTERNALLY_TERMINATED</code> (<code>BusinessProcessInstanceState</code>).</td></tr>
  <tr><td><code>startTime</code></td><td>Date</td><td>When the instance started.</td></tr>
  <tr><td><code>endTime</code></td><td>Date</td><td>When the instance ended (only on <code>end</code>).</td></tr>
  <tr><td><code>durationInMillis</code></td><td>Long</td><td><code>endTime - startTime</code>, only populated once both are known.</td></tr>
</table>

# Activity Instance

**Types:** `start`, `update`, `migrate`, `end` (entity `activity-instance`)
**Java:** `BusinessActivityInstanceEventEntity` (extends `BusinessEvent` directly — no `BusinessDetailEventEntity` fields)

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>activityInstanceId</code></td><td>String</td><td>The activity instance id (also set as the common <code>id</code> field).</td></tr>
  <tr><td><code>activityId</code></td><td>String</td><td>BPMN element id (e.g. <code>ServiceTask_1</code>).</td></tr>
  <tr><td><code>activityName</code></td><td>String</td><td>BPMN element name, if set in the model.</td></tr>
  <tr><td><code>activityType</code></td><td>String</td><td>BPMN element type, e.g. <code>serviceTask</code>, <code>userTask</code>, <code>exclusiveGateway</code>.</td></tr>
  <tr><td><code>activityInstanceState</code></td><td>int</td><td><code>0</code> default, <code>1</code> scope complete, <code>2</code> canceled, <code>3</code> starting, <code>4</code> ending (<code>ActivityInstanceState</code>) — only meaningfully set on <code>end</code>.</td></tr>
  <tr><td><code>parentActivityInstanceId</code></td><td>String</td><td>Enclosing activity instance (e.g. the subprocess or call activity instance).</td></tr>
  <tr><td><code>calledProcessInstanceId</code></td><td>String</td><td>Set when this activity is a call activity that spawned a called process instance.</td></tr>
  <tr><td><code>tenantId</code></td><td>String</td><td>Tenant id, in multi-tenant deployments.</td></tr>
  <tr><td><code>startTime</code></td><td>Date</td><td>When the activity instance started.</td></tr>
  <tr><td><code>endTime</code></td><td>Date</td><td>When the activity instance ended (only on <code>end</code>).</td></tr>
  <tr><td><code>durationInMillis</code></td><td>Long</td><td><code>endTime - startTime</code>, only on <code>end</code>.</td></tr>
</table>

# Task Instance

**Types:** `create`, `update`, `migrate`, `complete`, `delete` (entity `task-instance`)
**Java:** `BusinessTaskInstanceEventEntity` (extends `BusinessDetailEventEntity`)

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>id</code> / <code>taskId</code></td><td>String</td><td>The task id.</td></tr>
  <tr><td><code>activityInstanceId</code></td><td>String</td><td>Activity instance backing the task's user task.</td></tr>
  <tr><td><code>assignee</code></td><td>String</td><td>Assigned user id, if any.</td></tr>
  <tr><td><code>owner</code></td><td>String</td><td>Task owner user id, if any.</td></tr>
  <tr><td><code>name</code></td><td>String</td><td>Task name.</td></tr>
  <tr><td><code>description</code></td><td>String</td><td>Task description.</td></tr>
  <tr><td><code>dueDate</code></td><td>Date</td><td>Due date, if set.</td></tr>
  <tr><td><code>followUpDate</code></td><td>Date</td><td>Follow-up date, if set.</td></tr>
  <tr><td><code>priority</code></td><td>int</td><td>Task priority.</td></tr>
  <tr><td><code>parentTaskId</code></td><td>String</td><td>Parent task id, for subtasks.</td></tr>
  <tr><td><code>taskDefinitionKey</code></td><td>String</td><td>Key of the user task in the BPMN model.</td></tr>
  <tr><td><code>taskState</code></td><td>String</td><td>The task's current internal state string.</td></tr>
  <tr><td><code>startTime</code></td><td>Date</td><td>When the task was created.</td></tr>
  <tr><td><code>endTime</code></td><td>Date</td><td>When the task was completed or deleted.</td></tr>
  <tr><td><code>durationInMillis</code></td><td>Long</td><td><code>endTime - startTime</code>, on <code>complete</code>/<code>delete</code>.</td></tr>
  <tr><td><code>deleteReason</code></td><td>String</td><td>Set on <code>complete</code> (e.g. normal completion reason) and <code>delete</code>.</td></tr>
</table>

# Variable Instance

**Types:** `created`, `updated`, `migrate`, `deleted` (entity `variable-instance`)
**Java:** `BusinessVariableUpdateEventEntity` (extends `BusinessDetailEventEntity`)

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>variableName</code></td><td>String</td><td>Name of the variable.</td></tr>
  <tr><td><code>variableInstanceId</code></td><td>String</td><td>Id of the variable instance row.</td></tr>
  <tr><td><code>revision</code></td><td>int</td><td>Optimistic-locking revision of the variable instance at the time of the event.</td></tr>
  <tr><td><code>scopeActivityInstanceId</code></td><td>String</td><td>Activity instance that scopes the variable (may differ from <code>activityInstanceId</code>, which is where it was set).</td></tr>
  <tr><td><code>activityInstanceId</code></td><td>String</td><td>Activity instance in which the variable was set (inherited field; here it identifies the <em>source</em> of the change).</td></tr>
  <tr><td><code>taskId</code></td><td>String</td><td>Task id, when the variable is task-scoped.</td></tr>
  <tr><td><code>serializerName</code></td><td>String</td><td>Name of the variable type's serializer (e.g. <code>string</code>, <code>json</code>, <code>object</code>).</td></tr>
  <tr><td><code>longValue</code></td><td>Long</td><td>Raw persisted <code>LONG_</code> column value, mirroring <code>ACT_RU_VARIABLE</code> — populated depending on the variable's type.</td></tr>
  <tr><td><code>doubleValue</code></td><td>Double</td><td>Raw persisted <code>DOUBLE_</code> column value.</td></tr>
  <tr><td><code>textValue</code></td><td>String</td><td>Raw persisted <code>TEXT_</code> column value (e.g. String variables, or the primary text representation for complex types).</td></tr>
  <tr><td><code>textValue2</code></td><td>String</td><td>Raw persisted <code>TEXT2_</code> column value (secondary text column, used by some serializers, e.g. for a Java class name alongside serialized content).</td></tr>
  <tr><td><code>byteValue</code></td><td>byte[]</td><td>Inline raw bytes, for small binary values.</td></tr>
  <tr><td><code>byteArrayId</code></td><td>String</td><td>Id of the associated blob row, when the value is stored out-of-line as a byte array.</td></tr>
  <tr><td><code>isInitial</code></td><td>Boolean</td><td><code>true</code> when this is the first value ever set for the variable, typically during process instance start.</td></tr>
</table>

{{< note title="Reading the actual variable value" class="info" >}}
The variable's value is spread across `longValue`/`doubleValue`/`textValue`/`textValue2`/`byteValue`/`byteArrayId` depending on `serializerName` — the same low-level representation used internally by `ACT_RU_VARIABLE` and `ACT_GE_BYTEARRAY`. There is no single pre-decoded "value" field; consumers that need the typed value should decode it the same way the corresponding variable serializer does, or query the variable through the regular Java/REST API instead of relying solely on the event payload for complex types.
{{< /note >}}

# Identity Link

**Types:** `add-identity-link` (entity `identity-link-add`), `delete-identity-link` (entity `identity-link-delete`)
**Java:** `BusinessIdentityLinkEventEntity` (extends `BusinessEvent` directly)

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>time</code></td><td>Date</td><td>When the identity link change occurred.</td></tr>
  <tr><td><code>type</code></td><td>String</td><td>Identity link type, e.g. <code>candidate</code>, <code>assignee</code>, <code>owner</code>.</td></tr>
  <tr><td><code>userId</code></td><td>String</td><td>User id the link refers to, if any.</td></tr>
  <tr><td><code>groupId</code></td><td>String</td><td>Group id the link refers to, if any.</td></tr>
  <tr><td><code>taskId</code></td><td>String</td><td>Task id, if the link is on a task; <code>null</code> when the link is on a process definition instead.</td></tr>
  <tr><td><code>operationType</code></td><td>String</td><td>Literal <code>"add"</code> or <code>"delete"</code>.</td></tr>
  <tr><td><code>assignerId</code></td><td>String</td><td>Authenticated user id who performed the operation, if any.</td></tr>
  <tr><td><code>tenantId</code></td><td>String</td><td>Tenant id, in multi-tenant deployments.</td></tr>
</table>

# Incident

**Types:** `create`, `migrate`, `resolve`, `update`, `delete` (entity `incident`)
**Java:** `BusinessIncidentEventEntity` (extends `BusinessEvent` directly)

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>id</code></td><td>String</td><td>The incident id.</td></tr>
  <tr><td><code>createTime</code></td><td>Date</td><td>When the incident was created.</td></tr>
  <tr><td><code>endTime</code></td><td>Date</td><td>When the incident was resolved or deleted (only on those events).</td></tr>
  <tr><td><code>incidentType</code></td><td>String</td><td>Incident type, e.g. <code>failedJob</code>, <code>failedExternalTask</code>.</td></tr>
  <tr><td><code>activityId</code></td><td>String</td><td>BPMN activity id where the incident occurred.</td></tr>
  <tr><td><code>failedActivityId</code></td><td>String</td><td>BPMN activity id where the underlying failure originated (may differ from <code>activityId</code> for incidents that propagate).</td></tr>
  <tr><td><code>causeIncidentId</code></td><td>String</td><td>Id of the incident that directly caused this one, for incident chains.</td></tr>
  <tr><td><code>rootCauseIncidentId</code></td><td>String</td><td>Id of the root incident at the top of the causal chain.</td></tr>
  <tr><td><code>configuration</code></td><td>String</td><td>Incident-type-specific configuration string (e.g. the failed job's id for a <code>failedJob</code> incident).</td></tr>
  <tr><td><code>incidentMessage</code></td><td>String</td><td>Human-readable incident message, typically the underlying exception message.</td></tr>
  <tr><td><code>incidentState</code></td><td>int</td><td><code>0</code> open, <code>1</code> resolved, <code>2</code> deleted (<code>IncidentState</code>).</td></tr>
  <tr><td><code>jobDefinitionId</code></td><td>String</td><td>Job definition id, for job-related incidents.</td></tr>
  <tr><td><code>historyConfiguration</code></td><td>String</td><td>Historic configuration string, retained for incidents surfaced via history.</td></tr>
  <tr><td><code>annotation</code></td><td>String</td><td>Free-text annotation attached to the incident, if any (e.g. via Cockpit).</td></tr>
  <tr><td><code>tenantId</code></td><td>String</td><td>Tenant id, in multi-tenant deployments.</td></tr>
</table>

# Job

**Types:** `create`, `fail`, `success`, `delete` (entity `job`)
**Java:** `JobLogBusinessEvent` (extends `BusinessEvent` directly)

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>jobId</code></td><td>String</td><td>The job id.</td></tr>
  <tr><td><code>timestamp</code></td><td>Date</td><td>When the event occurred.</td></tr>
  <tr><td><code>jobDueDate</code></td><td>Date</td><td>The job's due date at the time of the event.</td></tr>
  <tr><td><code>jobRetries</code></td><td>int</td><td>Remaining retries at the time of the event.</td></tr>
  <tr><td><code>jobPriority</code></td><td>long</td><td>Job priority.</td></tr>
  <tr><td><code>jobExceptionMessage</code></td><td>String</td><td>Failure exception message, set on <code>fail</code>.</td></tr>
  <tr><td><code>exceptionStacktrace</code></td><td>String</td><td>Full failure stack trace, set on <code>fail</code>.</td></tr>
  <tr><td><code>jobDefinitionId</code></td><td>String</td><td>Job definition id, if any.</td></tr>
  <tr><td><code>jobDefinitionType</code></td><td>String</td><td>Job handler type; falls back to the job handler's own type when there is no job definition (e.g. async-continuation/signal jobs).</td></tr>
  <tr><td><code>jobDefinitionConfiguration</code></td><td>String</td><td>Job definition configuration string.</td></tr>
  <tr><td><code>activityId</code></td><td>String</td><td>BPMN activity id associated with the job.</td></tr>
  <tr><td><code>failedActivityId</code></td><td>String</td><td>BPMN activity id where the job failure originated.</td></tr>
  <tr><td><code>deploymentId</code></td><td>String</td><td>Deployment id the job belongs to.</td></tr>
  <tr><td><code>state</code></td><td>int</td><td><code>0</code> created, <code>1</code> failed, <code>2</code> successful, <code>3</code> deleted (<code>JobState</code>).</td></tr>
  <tr><td><code>tenantId</code></td><td>String</td><td>Tenant id, in multi-tenant deployments.</td></tr>
  <tr><td><code>hostname</code></td><td>String</td><td>Hostname of the engine node that processed the job.</td></tr>
  <tr><td><code>batchId</code></td><td>String</td><td>Id of the batch the job belongs to, if it was created as part of a batch operation.</td></tr>
</table>

# Batch

**Types:** `start`, `update`, `end` (entity `batch`)
**Java:** `BatchBusinessEvent` (extends `BusinessEvent` directly)

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>id</code></td><td>String</td><td>The batch id.</td></tr>
  <tr><td><code>type</code></td><td>String</td><td>Batch type, e.g. <code>instance-migration</code>.</td></tr>
  <tr><td><code>totalJobs</code></td><td>int</td><td>Total number of execution jobs the batch will create.</td></tr>
  <tr><td><code>batchJobsPerSeed</code></td><td>int</td><td>Number of execution jobs created per run of the seed job.</td></tr>
  <tr><td><code>invocationsPerBatchJob</code></td><td>int</td><td>Number of entities processed per execution job.</td></tr>
  <tr><td><code>seedJobDefinitionId</code></td><td>String</td><td>Id of the seed job definition.</td></tr>
  <tr><td><code>monitorJobDefinitionId</code></td><td>String</td><td>Id of the monitor job definition.</td></tr>
  <tr><td><code>batchJobDefinitionId</code></td><td>String</td><td>Id of the execution job definition.</td></tr>
  <tr><td><code>tenantId</code></td><td>String</td><td>Tenant id, in multi-tenant deployments.</td></tr>
  <tr><td><code>createUserId</code></td><td>String</td><td>User id that created the batch — only set on <code>start</code>.</td></tr>
  <tr><td><code>startTime</code></td><td>Date</td><td>When the batch started — only on <code>start</code>.</td></tr>
  <tr><td><code>endTime</code></td><td>Date</td><td>When the batch ended — only on <code>end</code>.</td></tr>
  <tr><td><code>executionStartTime</code></td><td>Date</td><td>Timestamp of the reported progress — only on <code>update</code>.</td></tr>
</table>

# External Task

**Types:** `create`, `fail`, `success`, `delete` (entity `external-task`)
**Java:** `ExternalTaskBusinessEvent` (extends `BusinessEvent` directly)

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>externalTaskId</code></td><td>String</td><td>The external task id.</td></tr>
  <tr><td><code>timestamp</code></td><td>Date</td><td>Creation time on <code>create</code>; current time on the other events.</td></tr>
  <tr><td><code>topicName</code></td><td>String</td><td>External task topic name.</td></tr>
  <tr><td><code>workerId</code></td><td>String</td><td>Id of the worker that fetched/locked the task, if any.</td></tr>
  <tr><td><code>priority</code></td><td>long</td><td>Task priority.</td></tr>
  <tr><td><code>retries</code></td><td>Integer</td><td>Remaining retries at the time of the event.</td></tr>
  <tr><td><code>errorMessage</code></td><td>String</td><td>Failure error message, set on <code>fail</code>.</td></tr>
  <tr><td><code>errorDetails</code></td><td>String</td><td>Full failure details/stack trace, set on <code>fail</code>.</td></tr>
  <tr><td><code>activityId</code></td><td>String</td><td>BPMN external task activity id.</td></tr>
  <tr><td><code>activityInstanceId</code></td><td>String</td><td>Activity instance backing the external task.</td></tr>
  <tr><td><code>tenantId</code></td><td>String</td><td>Tenant id, in multi-tenant deployments.</td></tr>
  <tr><td><code>state</code></td><td>int</td><td><code>0</code> created, <code>1</code> failed, <code>2</code> successful, <code>3</code> deleted (<code>ExternalTaskState</code>).</td></tr>
</table>

# DMN Decision Evaluation

**Type:** `evaluate` (entity `decision`)
**Java:** `DmnDecisionEvaluationBusinessEvent` (extends `BusinessEvent` directly)

Bundles the decision that was directly evaluated together with any required (sub-)decisions from the same decision requirements diagram into a single event.

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>rootDecisionInstance</code></td><td>DmnDecisionInstanceEvaluation</td><td>The directly-evaluated decision (see structure below).</td></tr>
  <tr><td><code>requiredDecisionInstances</code></td><td>List&lt;DmnDecisionInstanceEvaluation&gt;</td><td>Any required (sub-)decisions evaluated as part of the same decision requirements diagram. Empty if none.</td></tr>
  <tr><td><code>tenantId</code></td><td>String</td><td>Tenant id, in multi-tenant deployments.</td></tr>
  <tr><td><code>userId</code></td><td>String</td><td>Authenticated user id — only populated when the decision was evaluated ad hoc (no process-execution context), e.g. via the Decision REST API directly.</td></tr>
  <tr><td><code>activityId</code></td><td>String</td><td>The business rule task id, when the decision was evaluated in-process.</td></tr>
  <tr><td><code>activityInstanceId</code></td><td>String</td><td>Activity instance of the business rule task, when evaluated in-process.</td></tr>
</table>

**`DmnDecisionInstanceEvaluation`:**

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>decisionDefinitionId</code></td><td>String</td><td>Id of the decision definition.</td></tr>
  <tr><td><code>decisionDefinitionKey</code></td><td>String</td><td>Key of the decision definition.</td></tr>
  <tr><td><code>decisionDefinitionName</code></td><td>String</td><td>Name of the decision definition.</td></tr>
  <tr><td><code>decisionRequirementsDefinitionId</code></td><td>String</td><td>Id of the decision requirements graph (DRG) definition, if the decision is part of one.</td></tr>
  <tr><td><code>decisionRequirementsDefinitionKey</code></td><td>String</td><td>Key of the DRG definition.</td></tr>
  <tr><td><code>evaluationTime</code></td><td>Date</td><td>When this specific decision was evaluated.</td></tr>
  <tr><td><code>inputs</code></td><td>List&lt;DmnDecisionInputEvaluation&gt;</td><td>The input clause values used for this evaluation.</td></tr>
  <tr><td><code>outputs</code></td><td>List&lt;DmnDecisionOutputEvaluation&gt;</td><td>The output clause values produced by this evaluation.</td></tr>
</table>

**`DmnDecisionInputEvaluation`:**

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>clauseId</code></td><td>String</td><td>Id of the input clause in the DMN table.</td></tr>
  <tr><td><code>clauseName</code></td><td>String</td><td>Name of the input clause.</td></tr>
  <tr><td><code>typeName</code></td><td>String</td><td>FEEL/DMN type name of the value, e.g. <code>string</code>, <code>long</code>.</td></tr>
  <tr><td><code>value</code></td><td>Object</td><td>The actual input value.</td></tr>
</table>

**`DmnDecisionOutputEvaluation`:**

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>clauseId</code></td><td>String</td><td>Id of the output clause in the DMN table.</td></tr>
  <tr><td><code>clauseName</code></td><td>String</td><td>Name of the output clause.</td></tr>
  <tr><td><code>ruleId</code></td><td>String</td><td>Id of the matched rule (row) that produced this output.</td></tr>
  <tr><td><code>ruleOrder</code></td><td>Integer</td><td>Order/index of the matched rule.</td></tr>
  <tr><td><code>variableName</code></td><td>String</td><td>Name of the output variable.</td></tr>
  <tr><td><code>typeName</code></td><td>String</td><td>FEEL/DMN type name of the value.</td></tr>
  <tr><td><code>value</code></td><td>Object</td><td>The actual output value.</td></tr>
</table>

# Form Property

**Type:** `form-property-update` (entity `form-property`)
**Java:** `BusinessFormPropertyEventEntity` (extends `BusinessDetailEventEntity`)

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>propertyId</code></td><td>String</td><td>The form property's key.</td></tr>
  <tr><td><code>propertyValue</code></td><td>String</td><td>The submitted value, as a string.</td></tr>
  <tr><td><code>activityInstanceId</code></td><td>String</td><td>The start activity instance if this is a start form, otherwise the current task's activity instance.</td></tr>
  <tr><td><code>taskId</code></td><td>String</td><td>The task id, for task forms; <code>null</code> for start forms.</td></tr>
  <tr><td><code>userOperationId</code></td><td>String</td><td>Correlates back to the [user operation log](#user-operation-log) entry for the same submission, if any.</td></tr>
  <tr><td><code>tenantId</code></td><td>String</td><td>Tenant id, in multi-tenant deployments.</td></tr>
</table>

# User Operation Log

**Type:** `create` (entity `user-operation-log`)
**Java:** `UserOperationLogBusinessEvent` (extends `BusinessEvent` directly)

One event is published **per changed property** — an operation that changes three properties (e.g. a synchronous message correlation, see [Security — user operation log settings]({{< ref "/user-guide/security.md" >}}#user-operation-log-settings-for-synchronous-operations-affecting-multiple-entities)) produces three separate `user-operation-log:create` events, all sharing the same `operationId`.

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>operationId</code></td><td>String</td><td>Correlates all property-change events that belong to the same logical user operation.</td></tr>
  <tr><td><code>operationType</code></td><td>String</td><td>Operation type, e.g. <code>Suspend</code>, <code>Assign</code>, <code>Complete</code>.</td></tr>
  <tr><td><code>entityType</code></td><td>String</td><td>Type of entity the operation acted on, e.g. <code>Task</code>, <code>ProcessInstance</code>.</td></tr>
  <tr><td><code>property</code></td><td>String</td><td>Name of the specific property that changed.</td></tr>
  <tr><td><code>orgValue</code></td><td>String</td><td>Previous value, stringified.</td></tr>
  <tr><td><code>newValue</code></td><td>String</td><td>New value, stringified.</td></tr>
  <tr><td><code>userId</code></td><td>String</td><td>Authenticated user id that performed the operation.</td></tr>
  <tr><td><code>taskId</code></td><td>String</td><td>Correlation id, when the operation targeted a task.</td></tr>
  <tr><td><code>jobId</code></td><td>String</td><td>Correlation id, when the operation targeted a job.</td></tr>
  <tr><td><code>jobDefinitionId</code></td><td>String</td><td>Correlation id, when the operation targeted a job definition.</td></tr>
  <tr><td><code>deploymentId</code></td><td>String</td><td>Correlation id, when the operation targeted a deployment.</td></tr>
  <tr><td><code>batchId</code></td><td>String</td><td>Correlation id, when the operation targeted a batch.</td></tr>
  <tr><td><code>externalTaskId</code></td><td>String</td><td>Correlation id, when the operation targeted an external task.</td></tr>
  <tr><td><code>category</code></td><td>String</td><td>User operation log category, e.g. <code>TaskWorker</code>, <code>Admin</code>, <code>Operator</code>.</td></tr>
  <tr><td><code>annotation</code></td><td>String</td><td>Free-text annotation attached to the operation, if any.</td></tr>
  <tr><td><code>tenantId</code></td><td>String</td><td>Tenant id, in multi-tenant deployments.</td></tr>
  <tr><td><code>timestamp</code></td><td>Date</td><td>When the operation occurred.</td></tr>
</table>

# Script Violation

**Type:** `create` (entity `script-violation`)
**Java:** `BusinessScriptViolationEventEntity` (extends `BusinessDetailEventEntity`)

Published for every [Script Guard]({{< ref "/user-guide/process-engine/script-guard.md" >}}) violation recorded in `AUDIT` or `ENFORCE` mode. `processInstanceId`/`rootProcessInstanceId` (common fields) are `null` for deployment-time violations detected during BPMN parsing, and populated for runtime violations detected during script task execution.

<table class="table desc-table">
  <tr><th>Field</th><th>Type</th><th>Description</th></tr>
  <tr><td><code>activityId</code></td><td>String</td><td>Id of the BPMN activity where the violation was detected, e.g. <code>ServiceTask_1</code>.</td></tr>
  <tr><td><code>language</code></td><td>String</td><td>Script language, e.g. <code>javascript</code>, <code>groovy</code>.</td></tr>
  <tr><td><code>sourceType</code></td><td>String</td><td>Script source type (see <code>ScriptSourceType</code>) — e.g. inline vs. external resource.</td></tr>
  <tr><td><code>origin</code></td><td>String</td><td>Script origin (see <code>ScriptOrigin</code>) — e.g. script task, execution listener, I/O mapping.</td></tr>
  <tr><td><code>ruleCode</code></td><td>String</td><td>Rule code that triggered the violation, e.g. <code>SCRIPT_SECURITY_SYSTEM_GETENV</code>.</td></tr>
  <tr><td><code>reason</code></td><td>String</td><td>Human-readable violation reason.</td></tr>
</table>
