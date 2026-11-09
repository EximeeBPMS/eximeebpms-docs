---
title: 'BPMN Activities as Tools'
weight: 20
menu:
  main:
    identifier: 'ai-agent-tools'
    parent: 'ai-agent-worker'
---

{{< note title="Enterprise Edition only" class="warning" >}}
The agent exposes activatable elements of an Enterprise ad-hoc subprocess as
model tools. Native BPMN tools run in the engine and need no separate connector.
{{< /note >}}

## Define a tool contract

An activatable activity has no incoming sequence flow and sits directly inside
the ad-hoc subprocess. Its id becomes the tool name; use 1–64 ASCII letters,
digits, `_` or `-`. Its BPMN documentation supplies the description, falling
back to its name. Describe effects and required permissions, not only a label.

Declare model-supplied values through `fromAi` in input parameters:

```xml
<camunda:inputParameter name="orderId">${fromAi(toolCall.orderId, "Order number")}</camunda:inputParameter>
```

The engine extracts this declaration for the model schema. See the
[ad-hoc reference]({{< ref "/reference/bpmn20/subprocesses/ad-hoc-subprocess.md" >}})
for supported `fromAi` types, schema/options forms and deployment validation.
Parameters are required by default; `options` JSON with `"required":false`
marks an optional argument. A missing type defaults to `string`; a supplied
JSON object schema is extended with the declared type/description. Keep
operator-selected URLs, credentials and safety limits outside model arguments.

The model's arguments and reserved `_meta.id`/`_meta.name` arrive in the flow's
`toolCall`. Set `toolCallResult` when the flow ends. The
[XML recipe]({{< ref "/user-guide/ai-agent/ad-hoc-in-xml.md" >}}) collects it with
call correlation. Variables set inside a tool flow remain local to that flow;
setting a process-wide variable with the same name is not a result mapping.

## User task: ask a person

```xml
<bpmn:userTask id="askHuman" name="Approve refund">
  <bpmn:documentation>Ask a person to approve a proposed refund.</bpmn:documentation>
  <bpmn:extensionElements>
    <camunda:inputOutput>
      <camunda:inputParameter name="question">${fromAi(toolCall.question, "Approval question")}</camunda:inputParameter>
      <camunda:outputParameter name="toolCallResult">${humanAnswer}</camunda:outputParameter>
    </camunda:inputOutput>
  </bpmn:extensionElements>
</bpmn:userTask>
```

Complete this task through Tasklist, a task form or the task REST API with
`humanAnswer`. The agent waits without holding an engine transaction open.
Configure assignee/candidate groups and authorization just as for any user task.
An input named `question` does not create a form automatically. Expose it through
your chosen form, and never let a model decide that its own request is approved.

## Business rule task: evaluate DMN

```xml
<bpmn:businessRuleTask id="eligibility" name="Check refund eligibility"
    camunda:decisionRef="refundEligibility" camunda:mapDecisionResult="singleEntry"
    camunda:resultVariable="eligibilityResult">
  <bpmn:documentation>Evaluate the deployed refund eligibility decision.</bpmn:documentation>
  <bpmn:extensionElements>
    <camunda:inputOutput>
      <camunda:inputParameter name="orderId">${fromAi(toolCall.orderId, "Order number")}</camunda:inputParameter>
      <camunda:outputParameter name="toolCallResult">${eligibilityResult}</camunda:outputParameter>
    </camunda:inputOutput>
  </bpmn:extensionElements>
</bpmn:businessRuleTask>
```

Deploy a decision with key `refundEligibility` and inputs matching the mapped
variables. Choose `mapDecisionResult` according to that decision's result shape;
`singleEntry` is appropriate only for one rule result with one output. The model
chooses when to ask, while the decision defines the policy.

## Call activity: invoke a process

```xml
<bpmn:callActivity id="prepareRefund" name="Prepare refund" calledElement="refundProcess">
  <bpmn:documentation>Run the deployed refund process and return its outcome.</bpmn:documentation>
  <bpmn:extensionElements>
    <camunda:inputOutput>
      <camunda:inputParameter name="orderId">${fromAi(toolCall.orderId, "Order number")}</camunda:inputParameter>
    </camunda:inputOutput>
    <camunda:in source="orderId" target="orderId" />
    <camunda:out source="refundOutcome" target="toolCallResult" />
  </bpmn:extensionElements>
</bpmn:callActivity>
```

Deploy `refundProcess`; it must set `refundOutcome` before ending. Map only
the required inputs and outputs instead of copying every variable. The called
process may itself contain approvals, service work or compensation.

REST and MCP tools follow the same correlation and result rules. Read their
pages for transport-specific retry and authorization behavior.
