---

title: 'Handling a Case with an Ad-hoc Subprocess'
weight: 55

menu:
  main:
    name: "Ad-hoc Subprocess"
    identifier: "user-guide-process-engine-ad-hoc-subprocess"
    parent: "user-guide-process-engine"

---

{{< note title="Enterprise Edition only" class="warning" >}}
The ad-hoc subprocess is executed by EximeeBPMS Enterprise Edition only.
{{< /note >}}

This page walks through one case handled by hand: a case worker decides, step by step, what to do next, and
activates each step through the REST API. The elements and attributes used here are described in the
[ad-hoc subprocess reference]({{< ref "/reference/bpmn20/subprocesses/ad-hoc-subprocess.md" >}}).

# The Process

A complaint arrives. The ad-hoc subprocess *Handle complaint* holds the steps the case worker can choose from:

<div data-bpmn-diagram="../../../reference/bpmn20/subprocesses/bpmn/ad-hoc-subprocess"></div>

| Step | Activatable | |
| --- | --- | --- |
| Look up order | yes | receives `orderId` when activated |
| Ask customer | yes | |
| Check warranty | yes | goes on to *Prepare refund* |
| Prepare refund | no | it has an incoming sequence flow |

Every step completes with a variable `toolCallResult`, which the subprocess collects into the list `results`
(`outputCollection="results"`, `outputElement` = `${toolCallResult}`). The case is done once a refund has been
prepared: `completionCondition` = `${results.contains('refund prepared')}`. *Inform customer* then sees every
result.

Nothing is activated on entry: the subprocess has no `activeElementsCollection`.

# Walking Through the Case

The calls below use the REST API of an engine at `http://localhost:8080/engine-rest`.

**1. Start the case and find the subprocess instance.** Elements are activated in one instance of the
subprocess, addressed by its activity instance id:

```
POST /process-definition/key/complaintHandling/start
GET  /process-instance/{processInstanceId}/activity-instances
```

The activity instance tree has one child, `handleComplaint`, with no children of its own: the subprocess waits.
Its `id` (e.g. `handleComplaint:01a1...`) is the `activityInstanceId` of the activation calls below.

**2. Look up the order.**

```
POST /process-instance/{processInstanceId}/ad-hoc-sub-process/{activityInstanceId}/activation
```

```json
{
  "elements": [
    { "elementId": "lookupOrder", "variables": { "orderId": { "value": "o-1", "type": "String" } } }
  ],
  "annotation": "Start with the order"
}
```

A user task *Look up order* is created, in an inner flow of its own, with the local variable `orderId`. The case
worker completes it:

```
POST /task/{taskId}/complete
{ "variables": { "toolCallResult": { "value": "order o-1 delivered on 2026-09-30", "type": "String" } } }
```

The engine completes the inner flow in a job: it appends `toolCallResult` to `results` and checks the completion
condition — not fulfilled yet. The job executor runs this job shortly after the task completion.

**3. Ask the customer and check the warranty, in parallel.** One request activates both:

```json
{ "elements": [ { "elementId": "askCustomer" }, { "elementId": "checkWarranty" } ] }
```

The case worker completes *Ask customer* with `receipt received` and *Check warranty* with `warranty valid`. The
warranty's inner flow goes on to *Prepare refund*; it has not completed, so only the customer's answer reaches the
output collection:

```
results: ["order o-1 delivered on 2026-09-30", "receipt received"]
```

**4. Prepare the refund.** Completing *Prepare refund* with `refund prepared` completes the warranty's inner flow.
Its result is appended, the completion condition is fulfilled, and the subprocess completes. `results` becomes a
variable of the process, and *Inform customer* is created:

```
GET /process-instance/{processInstanceId}/variables/results
["order o-1 delivered on 2026-09-30", "receipt received", "refund prepared"]
```

# What the Engine Keeps Apart

* **Variables of a step stay in its inner flow.** If *Look up order* had completed with another variable, e.g.
  `carrier`, *Ask customer* and the process would not see it. Only the output collection leaves the subprocess.
* **The completion condition reads the output collection.** It is evaluated on the subprocess, so it cannot see
  `toolCallResult` or any other variable of an inner flow — which is why the example puts each step's result into
  `results` and tests that list.
* **Who activated what.** Each inner flow has the local variable `adHocActivationSource` = `API`, kept in history
  with its activity instance. Every activation request of an authenticated user is recorded in the user operation
  log:

  ```
  GET /history/user-operation?processInstanceId={processInstanceId}&operationType=ActivateAdHocSubProcessElements&property=elementIds
  ```

  ```
  demo activated [lookupOrder] (Start with the order)
  demo activated [askCustomer, checkWarranty]
  ```

# The Same in Java

```java
ProcessInstance complaint = runtimeService.startProcessInstanceByKey("complaintHandling", "complaint-42");
String handleComplaint = runtimeService.getActivityInstance(complaint.getId())
    .getActivityInstances("handleComplaint")[0].getId();

runtimeService.createAdHocSubProcessActivation(complaint.getId(), handleComplaint)
    .activateElement("lookupOrder", Variables.putValue("orderId", "o-1"))
    .setAnnotation("Start with the order")
    .execute();

runtimeService.createAdHocSubProcessActivation(complaint.getId(), handleComplaint)
    .activateElement("askCustomer")
    .activateElement("checkWarranty")
    .execute();
```

# Changing Course

* To drop what is running and do something else, add `"cancelRemainingInstances": true` to the request: the
  running inner flows are cancelled — they add nothing to `results` — before the new elements start.
* An element id that is not activatable, e.g. `prepareRefund`, rejects the whole request with status 400; nothing is
  activated or cancelled.
* To repair a running inner flow, e.g. to repeat *Prepare refund* inside the warranty's inner flow, use
  [process instance modification]({{< ref "/user-guide/process-engine/process-instance-modification.md#ad-hoc-subprocess" >}})
  with that inner flow as ancestor.
