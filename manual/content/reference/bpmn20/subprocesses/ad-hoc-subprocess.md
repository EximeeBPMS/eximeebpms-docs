---

title: 'Ad-hoc Subprocess'
weight: 50

menu:
  main:
    identifier: "bpmn-subprocess-ad-hoc"
    parent: "bpmn-subprocess"
    pre: "Subprocess whose activities start on demand."

---

{{< note title="Enterprise Edition only" class="warning" >}}
The ad-hoc subprocess is executed by EximeeBPMS Enterprise Edition. The Community Edition skips it at deployment
with the warning "Ignoring unsupported activity type".
{{< /note >}}

An ad-hoc subprocess holds activities that are not connected to a start: none of them runs because a sequence flow
reaches it. Each one starts when it is **activated** — on entry, by an expression, or later through the
[activation API](#activating-elements), e.g. by a case worker who decides what to do next. The subprocess completes
when its completion condition is fulfilled, or when nothing runs any more.

An ad-hoc subprocess is visualized as an embedded subprocess with a tilde marker.

<div data-bpmn-diagram="../bpmn/ad-hoc-subprocess"></div>

In this example a case worker handles a complaint. *Look up order*, *Ask customer* and *Check warranty* can be
activated in any order, also several at a time; *Prepare refund* follows *Check warranty*. Once a refund has been
prepared, the subprocess completes. The case is walked through step by step in
[Handling a Case with an Ad-hoc Subprocess]({{< ref "/user-guide/process-engine/ad-hoc-subprocess.md" >}}).

```xml
<adHocSubProcess id="handleComplaint" name="Handle complaint">
  <extensionElements>
    <eximeebpms:adHoc outputCollection="results">
      <eximeebpms:outputElement>${toolCallResult}</eximeebpms:outputElement>
    </eximeebpms:adHoc>
  </extensionElements>

  <userTask id="lookupOrder" name="Look up order" />
  <userTask id="askCustomer" name="Ask customer" />
  <userTask id="checkWarranty" name="Check warranty" />
  <sequenceFlow id="toPrepareRefund" sourceRef="checkWarranty" targetRef="prepareRefund" />
  <userTask id="prepareRefund" name="Prepare refund" />

  <completionCondition xsi:type="tFormalExpression">${results.contains('refund prepared')}</completionCondition>
</adHocSubProcess>
```

# Configuration

| Attribute or element | Meaning |
| --- | --- |
| `completionCondition` (BPMN) | Expression evaluated each time an inner flow completes. `true` completes the subprocess. Optional. |
| `cancelRemainingInstances` (BPMN attribute) | Whether the inner flows still running are cancelled when the completion condition is fulfilled. Default `true`; with `false` the subprocess completes when the last of them has ended. |
| `ordering` (BPMN attribute) | Only `Parallel`, the default. `Sequential` is rejected at deployment. |
| `eximeebpms:adHoc` › `activeElementsCollection` | Expression that returns the ids of the elements to activate on entry, e.g. `${initialSteps}`. Optional. |
| `eximeebpms:adHoc` › `outputCollection` | Name of a list variable, local to the subprocess, that collects one entry per completed inner flow. Optional. |
| `eximeebpms:adHoc` › `outputElement` | The entry an inner flow adds to the output collection: an expression, or a `map`, `list` or `script`, as in an [input parameter]({{< ref "/user-guide/process-engine/variables.md#input-output-variable-mapping" >}}). Requires `outputCollection`. |

Write the `adHoc` extension element, its `outputElement` and the values inside it in the EximeeBPMS namespace,
declared as `xmlns:eximeebpms="http://eximeebpms.org/schema/1.0/bpmn"`. All other extensions, such as
`camunda:inputOutput`, stay in the `camunda:` namespace. The engine also reads `camunda:adHoc`, but Camunda Modeler
drops it when it saves the diagram (see [Modeling in Camunda Modeler](#modeling-in-camunda-modeler)).

# Activatable elements

The elements an ad-hoc subprocess can activate are the elements directly inside it without an incoming sequence
flow — except boundary events, compensation handlers, event subprocesses, link catch events and the events after an
event-based gateway. An element reached by a sequence flow from an activated one runs as usual, as part of the same
inner flow. A multi-instance element is activated as a whole, with all its instances.

The following models are rejected at deployment, with an error naming the element:

* a start or an end event directly inside the ad-hoc subprocess (inside its event subprocesses they are fine),
* multi-instance on the ad-hoc subprocess itself — use a multi-instance call activity calling a process that contains
  it,
* `ordering="Sequential"`,
* an element that can be reached by sequence flows from two activatable elements,
* a parallel gateway without incoming sequence flows,
* `outputElement` without `outputCollection`,
* `asyncBefore` on a non-interrupting event subprocess of the ad-hoc subprocess (use `asyncAfter` on its start event,
  or `asyncBefore` on its first element, instead).

# Inner flows

Each activation runs as an **inner flow**: the activated element and everything that follows it along its sequence
flows. An element activated twice runs as two inner flows.

Variables follow one rule: **nothing set inside an inner flow leaves it by itself.**

* A variable set in an inner flow — on task completion, by an output mapping, from a script — is stored in that inner
  flow. The later elements of the flow see it; other inner flows, the ad-hoc subprocess and the process do not. If
  a variable of that name exists outside, the inner flow gets its own, and the outer one keeps its value.
* Removing a variable in an inner flow removes nothing outside it.
* Reading is not restricted: an inner flow sees the variables of the subprocess and of the process.
* The variables given with an activation are local variables of its inner flow. Every inner flow has a variable
  `toolCall`, an empty map unless the activation brings one, so that an expression such as `${toolCall.orderId}` does
  not fail.
* Each inner flow records how it was activated in the local variable `adHocActivationSource`: `ENTRY`, `WORKER`, `API` or
  `MODIFICATION`. History keeps it with the inner flow's activity instance.

Data leaves an inner flow only through the output collection.

In the activity instance tree, in Cockpit and in history, each inner flow appears as an instance of
`<adHocSubprocessId>#innerInstance` (activity type `adHocInnerInstance`) between the subprocess and its elements.
It is not part of the model.

# Completion

When the last element of an inner flow has ended, the engine completes the inner flow **in a job**: it evaluates
`outputElement` in the inner flow, appends the result to the output collection, ends the inner flow and then checks
the completion condition. The call that completed the last element — e.g. completing a user task — returns before
that. A failing `outputElement` or completion condition is retried and ends in an incident on the ad-hoc subprocess.

{{< note title="Inner flows complete in jobs" class="warning" >}}
Without a running job executor, inner flows never complete. In a test, execute the jobs, e.g. with
`managementService.executeJob(...)`.
{{< /note >}}

The subprocess then:

* with no `completionCondition`, completes when no inner flow runs any more;
* with a condition that returns `false`, waits — also when nothing runs, for further activations;
* with a condition that returns `true`, completes; inner flows still running are cancelled first, or, with
  `cancelRemainingInstances="false"`, the subprocess completes when the last of them has ended.

{{< note title="The completion condition does not see the variables of inner flows" class="warning" >}}
The completion condition is evaluated on the ad-hoc subprocess, not in the inner flow that just completed. Because
of the rule above, it sees the output collection and the variables of the subprocess and the process — not the
variables set inside inner flows. A condition such as `${approved}`, with `approved` set by a user task inside the
subprocess, never becomes `true`, and the subprocess waits.

Put what the condition needs into the output collection instead: the entry of an inner flow is appended before the
condition is evaluated. In the example above, `outputElement` collects `toolCallResult`, and the condition reads the
collection: `${results.contains('refund prepared')}`.
{{< /note >}}

When the subprocess completes, the output collection is set as a variable of the enclosing scope, and the
subprocess's output mappings run — they too see the output collection, not the variables of inner flows. An inner
flow that is cancelled adds nothing to the output collection and does not trigger the completion check.

# Activating elements

## On entry

`activeElementsCollection` is evaluated when the subprocess is entered; each element id in the resulting collection
is activated. No expression, `null` or an empty collection activates nothing. A value that is not a collection of
element ids, or an id that is not activatable, activates nothing and raises an incident of type `adHocActivation`
on the subprocess. Resolving the incident evaluates the expression again.

## Through the API

```java
runtimeService.createAdHocSubProcessActivation(processInstanceId, adHocActivityInstanceId)
    .activateElement("lookupOrder", Variables.putValue("orderId", "o-1"))
    .activateElement("askCustomer")
    .cancelRemainingInstances()            // optional
    .setAnnotation("Start with the order") // optional
    .execute();
```

The subprocess instance is addressed by its activity instance id, from `runtimeService.getActivityInstance(...)`,
since one ad-hoc subprocess can have several instances at a time. Every element id is checked first: if one is not
an activatable element of this subprocess, nothing is activated. `cancelRemainingInstances()` cancels the inner
flows running when the request is applied, then activates the elements. An interrupting event subprocess running in
the subprocess rejects the request.

Over REST, `POST /process-instance/{id}/ad-hoc-sub-process/{activityInstanceId}/activation`, where `id` is the
process instance id and `activityInstanceId` the activity instance id of the ad-hoc subprocess instance:

```json
{
  "elements": [
    { "elementId": "lookupOrder", "variables": { "orderId": { "value": "o-1", "type": "String" } } },
    { "elementId": "askCustomer" }
  ],
  "cancelRemainingInstances": false,
  "annotation": "Start with the order"
}
```

| Field | Meaning |
| --- | --- |
| `elements` | The elements to activate, in this order: `elementId`, and optionally `variables`, a JSON object of [variable values]({{< ref "/reference/rest/overview/variables.md" >}}) as in every other request of the REST API. |
| `cancelRemainingInstances` | Optional, default `false`: cancels the inner flows running when the request is applied, before the elements are activated. |
| `annotation` | Optional text recorded with the user operation log entries of the request. |

The response is `204` on success; `400` when an element is not activatable — nothing is activated — or when an
interrupting event subprocess runs in the subprocess; `403` without permission; `404` when the process instance has
no ad-hoc subprocess instance with that id. The endpoint is in the
[Enterprise Edition REST API reference]({{< ref "/reference/rest/specification.md" >}}), marked *Enterprise Edition*;
the Community Edition reference does not list it.

An activation needs the permission of process instance modification: `UPDATE` on the process instance or
`UPDATE_INSTANCE` on its process definition. It is recorded in the user operation log as
`ActivateAdHocSubProcessElements`, with the annotation, if one is given.

# Event Subprocesses

An ad-hoc subprocess can contain [event subprocesses]({{< ref "/reference/bpmn20/subprocesses/event-subprocess.md" >}}).

* A **non-interrupting** event subprocess runs as an *event flow*: an inner flow without an activation. Its variables
  stay in it, like those of an inner flow. The variables carried by the message or signal that starts it become
  local variables of the event flow, so two messages arriving one after another do not overwrite each other. Its
  `toolCall` is an empty map, unless the event brings one. When it completes, its `outputElement` is appended to the
  output collection, and the completion condition is checked.
* An **interrupting** event subprocess cancels every inner flow and event flow, and the ad-hoc subprocess completes
  when it completes. Use it, e.g., to stop a case on a message, or to handle a BPMN error thrown inside an inner flow.
* A compensation throw event in an event subprocess compensates the elements that completed in inner flows — also
  in inner flows that still run, or that were cancelled: by an interrupting event subprocess, a fulfilled completion
  condition, `cancelRemainingInstances` of an activation, or process instance modification.

# Process Instance Modification

[Process instance modification]({{< ref "/user-guide/process-engine/process-instance-modification.md#ad-hoc-subprocess" >}})
follows rules of its own inside an ad-hoc subprocess: a start without ancestor, or with the subprocess instance as
ancestor, is an activation; a start within a running inner flow names that flow as ancestor; cancelling the last
element of an inner flow ends that inner flow only.

# Modeling in Camunda Modeler

Model ad-hoc subprocesses in Camunda Modeler in **Camunda 7** mode, which writes the `camunda:` extensions the engine
reads. Draw an expanded subprocess and change its type to *Ad-hoc sub-process*; configure its activities in the
properties panel as usual. The `adHoc` extension element — `activeElementsCollection`, `outputCollection`,
`outputElement` — is not in the properties panel: write it in the XML tab, as well as the `completionCondition` if
your Modeler version does not offer it.

Write it as `eximeebpms:adHoc`, with `outputElement` and the values inside it in the same namespace, and declare the
namespace on the `definitions` element:

```xml
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
                  xmlns:camunda="http://camunda.org/schema/1.0/bpmn"
                  xmlns:eximeebpms="http://eximeebpms.org/schema/1.0/bpmn" ...>
  ...
  <bpmn:adHocSubProcess id="handleComplaint" name="Handle complaint">
    <bpmn:extensionElements>
      <eximeebpms:adHoc outputCollection="results">
        <eximeebpms:outputElement>
          <eximeebpms:map>
            <eximeebpms:entry key="step">${toolCall._meta.name}</eximeebpms:entry>
            <eximeebpms:entry key="result">${toolCallResult}</eximeebpms:entry>
          </eximeebpms:map>
        </eximeebpms:outputElement>
      </eximeebpms:adHoc>
    </bpmn:extensionElements>
    ...
  </bpmn:adHocSubProcess>
</bpmn:definitions>
```

Camunda Modeler keeps this element as it is. Do not write `camunda:adHoc`: Camunda Modeler does not know it,
reports it as unparsable content when it opens the diagram and leaves it out when it saves — also after an edit in
the XML tab, as soon as you switch back to the diagram and save. A diagram that already contains `camunda:adHoc`
loses it on its next save in the Modeler; rename the element and its children to the `eximeebpms:` prefix in the XML
tab first.

Camunda 8 mode cannot be used: it writes `zeebe:` extensions and FEEL expressions, which the engine does not read
or evaluate. A Camunda 8 diagram with a service task fails to deploy, and its ad-hoc settings would be ignored.

{{< note title="" class="info" >}}
<ul>
  <li>A process instance in which an ad-hoc subprocess is active cannot be
    <a href="{{< ref "/user-guide/process-engine/process-instance-migration.md" >}}">migrated</a>: the migration is
    rejected, since the ad-hoc subprocess and its inner flows are not supported activity types for migration, and a
    migration plan does not map them.</li>
</ul>
{{< /note >}}

# Worker-Driven Execution

An ad-hoc subprocess with `camunda:topic` runs in worker-driven mode. The engine
creates an external task for each decision turn, on the subprocess's scope.
The [AI agent]({{< ref "/user-guide/ai-agent/_index.md" >}}) is a ready-made worker
for that contract; custom workers can use the external-task API directly.
Without a topic, the expression/API-driven behavior described above applies.

A worker-driven subprocess must not have a modeled `completionCondition`.
The worker decides when to finish. Ending the last tool flow creates another
turn instead of implicitly completing the subprocess. A worker result can
activate elements, cancel running flows or decide completion. Completion with
new activations in the same result is rejected.

## Decision tasks and concurrency

The initial turn appears on entry; subsequent turns follow completed tool/event
flows, after their output is appended. At most one turn task is open for a
subprocess instance. A newer turn replaces an older open task even if a worker
locked it; completing that replaced task returns not found and changes nothing.
Workers must handle this like other concurrent external-task outcomes.

A turn task with exhausted retries keeps its incident instead of being replaced.
Resolve the cause and set retries to resume against the updated result collection.
The job executor must be running for flow completion and cancellation decisions.
Stopping the worker does not discard the engine's human tasks or pending work.

## Custom worker completion

A turn requires an ad-hoc result, rather than an ordinary external-task completion.
For `POST /external-task/<task-id>/complete`:

```json
{
  "workerId": "my-worker",
  "result": {
    "type": "adHocSubProcess",
    "activateElements": [
      {"elementId": "lookupOrder", "variables": {"orderId": {"type": "String", "value": "A-1"}}}
    ],
    "isCompletionConditionFulfilled": false,
    "isCancelRemainingInstances": false,
    "modelUsage": {"modelCalls": 1, "inputTokens": 120, "outputTokens": 30}
  }
}
```

The Java client has `AdHocSubProcessResult` with corresponding builder methods.
Activation variables use the ordinary typed REST variable format. The engine
rejects unknown result fields, non-boolean flags, invalid element ids and attempts
to overwrite reserved local variables. It also rejects an ad-hoc result on a
normal tool task. Validate all ids before constructing a result.

The two flags default to false. Completion with cancellation stops remaining
flows; completion without cancellation lets them finish before leaving the
subprocess. Cancellation can also be requested without completion. A result that
neither activates nor completes leaves the scope waiting until another event,
flow completion or activation supplies work; it does not poll the worker forever.

A BPMN error reported by the turn worker propagates from the subprocess activity
to its boundary/outer handlers. Its internal event subprocesses handle errors
from tools instead. An unhandled error from the turn task is rejected without
removing the task, so the worker must report/resolve a failure.

## Tool parameter declarations

`adHocSubProcessElements` describes activatable elements in document order, with
`elementId`, `elementName`, `documentation`, extension `properties` and `parameters`.
Each parameter has `name`, `description`, `type`, `schema` and `options`.
`fromAi(value, description, type, schema, options)` declares a parameter in an
activatable element's input mapping and returns its first argument unchanged at
runtime. Only the first argument is required:

```xml
<camunda:inputParameter name="quantity">${fromAi(toolCall.quantity, 'Number of items', 'integer', '{"minimum":1}', null)}</camunda:inputParameter>
```

Its first argument must read exactly `toolCall.<name>` or `toolCall['<name>']`,
not a deeper path. Other arguments are string literals or `null`; schema/options
are strict JSON text. The engine extracts declarations from JUEL input
expressions, including nested map keys/values and lists. It does not extract them
from scripts, output mappings or non-activatable elements. Conflicting declarations
for the same name in one element fail deployment; identical declarations are shared.
Keep JUEL varargs enabled. The agent validates argument schemas before activation.

See [BPMN tools]({{< ref "/user-guide/ai-agent/tools.md" >}}) for native user task,
DMN and call-activity examples, and the
[complete XML recipe]({{< ref "/user-guide/ai-agent/ad-hoc-in-xml.md" >}}) for result mappings.

## Turn history, events and model usage

At history levels `audit` and `full`, ended turns are available through
`HistoryService.createHistoricAdHocTurnQuery()` or these Enterprise REST endpoints:

```
GET/POST /history/ad-hoc-turn
GET/POST /history/ad-hoc-turn/count
GET/POST /history/ad-hoc-turn/model-usage
GET /history/ad-hoc-turn/<id>
GET /history/ad-hoc-turn/<id>/elements
GET /history/ad-hoc-turn/<id>/content
POST /history/ad-hoc-turn/external-task/<external-task-id>/model-usage
```

Filter by process/root-process instance, subprocess activity instance, definition,
worker, tenant or state. Turn states are `COMPLETED`, `REPLACED`, `BPMN_ERROR` and
`DELETED`. A decision waiting at an incident has not ended and has no final turn
record. Per-turn elements identify activated or cancelled inner flows.

Reads follow engine history/tenant authorization. Content/elements require
`READ_HISTORY` on the process definition; content additionally requires
`READ_HISTORY_VARIABLE` when specific-variable authorization is enforced.
Content is absent by default (`metadata`). Engine configuration
`adHocTurnHistoryContent=content` enables bounded worker completion/error content;
`adHocTurnHistoryContentLimit` defaults to 4000 characters. A subprocess can set
`turnHistoryContent` on its `adHoc` extension. Content truncated at the limit is
plain text, not valid JSON; clients should accept both JSON and text. This setting
does not suppress ordinary process-variable history.

Optional `modelUsage` reports nonnegative 64-bit `modelCalls`, `inputTokens` and
`outputTokens`; omitted values mean unknown, while zero is a reported zero.
The engine stores usage submitted with an accepted completion. In engine
**1.4.3-ee**, a worker can also report usage for a `REPLACED` turn once per worker
attempt through the POST operation above, keyed by an attempt id. This requires
`READ_HISTORY` and `UPDATE_HISTORY` on the process definition and access to its
tenant. History must still exist; the report neither changes `REPLACED` nor emits
another turn-end event.

Aggregation includes successfully reported replaced-turn usage and reports
`completedTurnsWithoutUsageCount` for completed turns without usage. An unknown
token count in an attempt keeps that turn's token total unknown. Failed model
requests, missing reports and a worker crash can still leave costs out of engine
totals. Use [worker audit and provider records]({{< ref "/user-guide/ai-agent/observability.md" >}})
for reconciliation; token counts are not monetary prices.

When enabled, business events include `ad-hoc-turn:end` and
`ad-hoc-activation:create`. Database meters include `ad-hoc-turn-decisions`,
`ad-hoc-turn-tasks-replaced` and `ad-hoc-activations`. Worker-side metrics/audit
have separate settings and retention. Apply the engine release's schema migration
for the turn-history tables before running that engine against an existing database;
worker JDBC schema management does not upgrade the engine schema.

## Cancellation in Worker-Driven Mode

When process instance modification cancels an inner flow in a worker-driven ad-hoc subprocess,
the engine schedules a decision job on the ad-hoc scope. It creates the next turn or replaces an
outdated turn, even when the cancelled flow was the only waiting tool. A worker can then report
that call as cancelled without waiting for another tool to complete.

Cancellation still appends no `outputElement` and does not evaluate the modelled `completionCondition`.
Cancellation by the worker's own decision or interruption of the whole ad-hoc subprocess creates no
additional turn. A pending cancellation job is removed with the subprocess if it ends first.
