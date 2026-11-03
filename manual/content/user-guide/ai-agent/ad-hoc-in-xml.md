---
title: 'Editing an Agent in BPMN XML'
weight: 10
menu:
  main:
    identifier: 'ai-agent-xml'
    parent: 'ai-agent-element-templates'
---

{{< note title="Enterprise Edition only" class="warning" >}}
Worker-driven ad-hoc subprocesses require Enterprise engine support. Edit the
structural extensions in the BPMN XML; use templates for connector fields.
{{< /note >}}

## Add the worker-driven scope

Use Camunda Modeler's Camunda 7 mode. Its `camunda:` namespace is accepted by
the engine, as is `eximeebpms:` bound to `http://eximeebpms.org/schema/1.0/bpmn`.
Do not use Zeebe extensions or FEEL expressions in place of JUEL expressions.

The following complete process asks a person one question when the model chooses
`askHuman`. Deploy it with the configured agent worker and provider `default`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
    xmlns:camunda="http://camunda.org/schema/1.0/bpmn"
    id="agentDefinitions" targetNamespace="https://eximeebpms.org/examples">
  <bpmn:process id="humanAgent" isExecutable="true" camunda:historyTimeToLive="P1D">
    <bpmn:startEvent id="start" />
    <bpmn:sequenceFlow id="toAgent" sourceRef="start" targetRef="agent" />
    <bpmn:adHocSubProcess id="agent" name="Resolve request"
        camunda:topic="org.eximeebpms.agenticai:aiagent-job-worker:1">
      <bpmn:extensionElements>
        <camunda:inputOutput>
          <camunda:inputParameter name="provider.ref">default</camunda:inputParameter>
          <camunda:inputParameter name="systemPrompt">Ask a person before approving a refund. Summarize their answer.</camunda:inputParameter>
          <camunda:inputParameter name="userPrompt">${customerMessage}</camunda:inputParameter>
          <camunda:inputParameter name="limits.maxModelCalls">10</camunda:inputParameter>
          <camunda:outputParameter name="answer">${execution.getVariableLocalTyped('agent')}</camunda:outputParameter>
        </camunda:inputOutput>
        <camunda:adHoc outputCollection="toolCallResults">
          <camunda:outputElement>
            <camunda:map>
              <camunda:entry key="id">${toolCall._meta.id}</camunda:entry>
              <camunda:entry key="name">${toolCall._meta.name}</camunda:entry>
              <camunda:entry key="content">${toolCallResult}</camunda:entry>
              <camunda:entry key="source">${execution.getVariableLocal('adHocActivationSource')}</camunda:entry>
            </camunda:map>
          </camunda:outputElement>
        </camunda:adHoc>
      </bpmn:extensionElements>
      <bpmn:userTask id="askHuman" name="Approve refund">
        <bpmn:documentation>Ask a human reviewer for approval.</bpmn:documentation>
        <bpmn:extensionElements>
          <camunda:inputOutput>
            <camunda:inputParameter name="question">${fromAi(toolCall.question, "Question for the reviewer")}</camunda:inputParameter>
            <camunda:outputParameter name="toolCallResult">${humanAnswer}</camunda:outputParameter>
          </camunda:inputOutput>
        </bpmn:extensionElements>
      </bpmn:userTask>
    </bpmn:adHocSubProcess>
    <bpmn:sequenceFlow id="toEnd" sourceRef="agent" targetRef="end" />
    <bpmn:endEvent id="end" />
  </bpmn:process>
</bpmn:definitions>
```

Start with `customerMessage`, then complete the created user task with
`humanAnswer`. A final answer becomes the process variable `answer`. A model
may choose a different sequence or fail to comply; enforce mandatory business
approvals through BPMN/process permissions rather than a prompt alone.

## Check these structural rules

The worker topic belongs on `adHocSubProcess`, not on an ordinary subprocess.
There is no modeled `completionCondition` in worker-driven mode; the worker
decides completion through its result. Keep the outer start/end events outside
the ad-hoc scope. Its tools have no incoming sequence flows.

Retain the full `outputElement` map, including correlation and event `source`.
Each inner flow must produce `toolCallResult` when it ends; map REST results
from `response.body`, MCP results unchanged, and human answers from the task's
submitted variables. A result mapped only to the enclosing process is invisible
to the agent's local result collection.

`fromAi(value, description, type, schema, options)` returns `value` unchanged
at execution time. At deployment it declares tool parameters from input
expressions, including nested maps/lists. The first argument must be one level
under `toolCall`, such as `toolCall.orderId` or `toolCall['orderId']`. Additional
arguments must be string literals or `null`; schema/options are strict JSON in
strings. Repeated declarations of the same name in one element must agree.
Keep JUEL varargs enabled. Script inputs and output parameters are not declarations.

For diagrams, deployment validation and custom worker results, use the
[BPMN ad-hoc reference]({{< ref "/reference/bpmn20/subprocesses/ad-hoc-subprocess.md" >}}).
The [support-agent example]({{< ref "/user-guide/ai-agent/example-support-agent.md" >}})
adds REST and MCP to this shape.
