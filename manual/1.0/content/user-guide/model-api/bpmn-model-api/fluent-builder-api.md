---

title: 'Fluent Builder API'
weight: 40

menu:
  main:
    identifier: "user-guide-bpmn-model-api-fluent"
    parent: "user-guide-bpmn-model-api"

---

To create simple BPMN processes we provide a fluent builder API. With this API you can easily create basic
processes in a few lines of code. In the [generate process fluent api](https://github.com/eximeebpms/eximeebpms-bpm-examples/tree/master/bpmn-model-api/generate-process-fluent-api) quickstart we
demonstrate how to create a rather complex process with 5 tasks and 2 gateways within less than 50 lines of code.

The fluent builder API is not nearly complete but provides you with the following basic elements:

* process
* start event
* exclusive gateway
* parallel gateway
* script task
* service task
* user task
* signal event definition
* end event
* subprocess


# Create a Process With the Fluent Builder API

To create an empty model instance with a new process the method `Bpmn.createProcess()` is used. After this,
you can add as many tasks and gateways as you like. At the end you must call `done()` to return the generated
model instance. For example, a simple process with one user task can be created like this:

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
  .startEvent()
  .userTask()
  .endEvent()
  .done();
```

To add a new element you have to call a function which is named like the
element to add. Additionally you can set attributes of the last created
element.

For example, let's set the name of the process and mark it as executable and also give the user task a name.

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
    .name("Example process")
    .executable()
  .startEvent()
  .userTask()
    .name("Some work to do")
  .endEvent()
  .done();
```

As you can see, a sequential process is really simple and straightforward to model, but often you want
branches and a parallel execution path, which is also possible with the fluent builder API. Just add
a parallel or exclusive gateway and model the first path till an end event or another gateway. After that,
call the `moveToLastGateway()` method and you return to the last gateway and can model the next path.

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
  .startEvent()
  .userTask()
  .parallelGateway()
    .scriptTask()
    .endEvent()
  .moveToLastGateway()
    .serviceTask()
    .endEvent()
  .done();
```

This example models a process with a user task after the start event followed by a parallel gateway
with two parallel outgoing execution paths, each with a task and an end event.

Normally you want to add conditions on outgoing flows of an exclusive gateway which is also simple with
the fluent builder API. Just use the method `condition()` and give it a label and an expression.

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
  .startEvent()
  .userTask()
  .exclusiveGateway()
  .name("What to do next?")
    .condition("Call an agent", "#{action = 'call'}")
    .scriptTask()
    .endEvent()
  .moveToLastGateway()
    .condition("Create a task", "#{action = 'task'}")
    .serviceTask()
    .endEvent()
  .done();
```

If you want to use the `moveToLastGateway()` method but have multiple incoming
sequence flows at your current position, you have to use the generic
`moveToNode` method with the id of the gateway. This could for example happen
if you add a join gateway to your process. For this purpose and for loops, we
added the `connectTo(elementId)` method.

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
  .startEvent()
  .userTask()
  .parallelGateway("fork")
    .serviceTask()
    .parallelGateway("join")
  .moveToNode("fork")
    .userTask()
    .connectTo("join")
  .moveToNode("fork")
    .scriptTask()
    .connectTo("join")
  .endEvent()
  .done()
```

This example creates a process with three parallel execution paths which all
join in the second gateway. Notice that the first call of `moveToNode` is not
necessary, because at this point the joining gateway only has one incoming sequence
flow, but was used for consistency.

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
  .startEvent()
  .userTask()
  .id("question")
  .exclusiveGateway()
  .name("Everything fine?")
    .condition("yes", "#{fine}")
    .serviceTask()
    .userTask()
    .endEvent()
  .moveToLastGateway()
    .condition("no", "#{!fine}")
    .userTask()
    .connectTo("question")
  .done()
```

This example creates a parallel gateway with a feedback loop in the second execution path.

To create an embedded subprocess with the fluent builder API, you can directly add it to your
process building or you can detach it and create flow elements of the subprocess later on.

```java
// Directly define the subprocess
BpmnModelInstance modelInstance = Bpmn.createProcess()
  .startEvent()
  .subProcess()
    .eximeebpmsAsync()
    .embeddedSubProcess()
      .startEvent()
      .userTask()
      .endEvent()
    .subProcessDone()
  .serviceTask()
  .endEvent()
  .done();

// Detach the subprocess building
modelInstance = Bpmn.createProcess()
  .startEvent()
  .subProcess("subProcess")
  .serviceTask()
  .endEvent()
  .done();

SubProcess subProcess = (SubProcess) modelInstance.getModelElementById("subProcess");
subProcess.builder()
  .eximeebpmsAsync()
  .embeddedSubProcess()
    .startEvent()
    .userTask()
    .endEvent();
```

The example below shows how to create a throwing signal event definition and define the payload that this signal will contain. By using the `eximeebpmsIn` methods, it is possible to define which process variables will be included in the signal payload, define an expression that will be resolved in the signal-catching process instances, or declare that all of the process variables in the signal-throwing process instance should be passed. It is also possible to define a business key that will be assigned to the signal-catching process instances.

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
  .startEvent()
  .intermediateThrowEvent("throw")
    .signalEventDefinition("signal")
      .eximeebpmsInSourceTarget("source", "target1")
      .eximeebpmsInSourceExpressionTarget("${'sourceExpression'}", "target2")
      .eximeebpmsInAllVariables("all", true)
      .eximeebpmsInBusinessKey("aBusinessKey")
      .throwEventDefinitionDone()
  .endEvent()
  .done();
```

# Extend a Process With the Fluent Builder API

With the fluent builder API you can not only create processes, you can also extend existing processes.

For example, imagine a process containing a parallel gateway with the id `gateway`. You now want to
add another execution path to it for a new service task which has to be executed every time.

```java
BpmnModelInstance modelInstance = Bpmn.readModelFromFile(new File("PATH/TO/MODEL.bpmn"));
ParallelGateway gateway = (ParallelGateway) modelInstance.getModelElementById("gateway");

gateway.builder()
  .serviceTask()
    .name("New task")
  .endEvent();
```

Another use case is to insert new tasks between existing elements. Imagine a process
containing a user task with the id `task1` which is followed by a service task. And now
you want to add a script task and a user task between these two.

```java
BpmnModelInstance modelInstance = Bpmn.readModelFromFile(new File("PATH/TO/MODEL.bpmn"));
UserTask userTask = (UserTask) modelInstance.getModelElementById("task1");
SequenceFlow outgoingSequenceFlow = userTask.getOutgoing().iterator().next();
FlowNode serviceTask = outgoingSequenceFlow.getTarget();
userTask.getOutgoing().remove(outgoingSequenceFlow);

userTask.builder()
  .scriptTask()
  .userTask()
  .connectTo(serviceTask.getId());
```

# Common Model Patterns

## Controlling Transaction Boundaries

The transaction boundaries of a process created with the fluent builder API can be controlled using the `eximeebpmsAsyncBefore()` and `eximeebpmsAsyncAfter()` methods offered for various process constructs.

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
  .startEvent()
  .serviceTask("servicetask")
    .eximeebpmsAsyncBefore()
  .userTask("task")
    .eximeebpmsAsyncAfter()
  .done();
```

The service task in the example above will have a transaction boundary before its execution and the user task will have a transaction boundary after its completion.

If an activity has [multi-instance characteristics][multi-instance], the  `eximeebpmsAsyncBefore()` and `eximeebpmsAsyncAfter()` methods apply to the multi-instance body as a whole. The transaction boundaries of the individual occurrences (instances) of the multi-instance can be controlled with similar methods, called from **within** the multi-instance builder.

```java
BpmnModelInstance modelInstance = Bpmn.createProcess()
  .startEvent()
  .serviceTask("servicetask")
    .eximeebpmsAsyncBefore() // multi-instance body
    .multiInstance()
      .eximeebpmsAsyncBefore() // every instance
      .parallel()
    .multiInstanceDone()
  .endEvent()
  .done();
```


# Generation of Diagram Interchange

To render the process, BPMN diagram elements are necessary. The fluent builder generates
BPMN Shapes and BPMN Edges and places them automatically for flow nodes and sequence flows.

```java
final BpmnModelInstance myProcess = Bpmn.createExecutableProcess("process-payments")
      .startEvent()
      .serviceTask()
          .name("Process Payment")
      .endEvent()
      .done();

System.out.println(Bpmn.convertToString(myProcess));
```

This example creates a BPMN containing both semantic elements (e.g., service task etc.) and diagram elements:

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<definitions xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:eximeebpms="http://eximeebpms.org/schema/1.0/bpmn" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="definitions_dfb1f18e-6034-448e-abae-0eb2f41469da" targetNamespace="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL">

  <!-- Generated BPMN Semantic Elements -->
  <process id="process-payments" isExecutable="true">
    <startEvent id="startEvent_2b0abd37-75a9-47dd-9838-63f1390d7515">
      <outgoing>sequenceFlow_b1eec5b5-889d-4e75-854d-59768fbdc8a2</outgoing>
    </startEvent>
    <serviceTask id="serviceTask_f4c2413f-5b26-49e8-b71c-2603e469ce09" name="Process Payment">
      <incoming>sequenceFlow_b1eec5b5-889d-4e75-854d-59768fbdc8a2</incoming>
      <outgoing>sequenceFlow_5839394a-c0c2-4a5b-aa81-9412f169cc35</outgoing>
    </serviceTask>
    <sequenceFlow id="sequenceFlow_b1eec5b5-889d-4e75-854d-59768fbdc8a2" sourceRef="startEvent_2b0abd37-75a9-47dd-9838-63f1390d7515" targetRef="serviceTask_f4c2413f-5b26-49e8-b71c-2603e469ce09"/>
    <endEvent id="endEvent_8087f927-a53b-4126-95fc-c057736f3b73">
      <incoming>sequenceFlow_5839394a-c0c2-4a5b-aa81-9412f169cc35</incoming>
    </endEvent>
    <sequenceFlow id="sequenceFlow_5839394a-c0c2-4a5b-aa81-9412f169cc35" sourceRef="serviceTask_f4c2413f-5b26-49e8-b71c-2603e469ce09" targetRef="endEvent_8087f927-a53b-4126-95fc-c057736f3b73"/>
  </process>

  <!-- Generated Diagram Elements -->
  <bpmndi:BPMNDiagram id="BPMNDiagram_5b66dfb7-097b-4610-9681-43abb3ff97da">
    <bpmndi:BPMNPlane bpmnElement="process-payments" id="BPMNPlane_ad88b4cf-9d7a-4b86-8386-f8db23ff388d">
      <bpmndi:BPMNShape bpmnElement="startEvent_2b0abd37-75a9-47dd-9838-63f1390d7515" id="BPMNShape_d6c4e3c5-150c-43f7-adf8-1d388f466a69">
        <dc:Bounds height="36.0" width="36.0" x="100.0" y="100.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape bpmnElement="serviceTask_f4c2413f-5b26-49e8-b71c-2603e469ce09" id="BPMNShape_51006773-13df-4327-a4cf-a5952c39e86a">
        <dc:Bounds height="80.0" width="100.0" x="186.0" y="78.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sequenceFlow_b1eec5b5-889d-4e75-854d-59768fbdc8a2" id="BPMNEdge_fb360594-8863-4d5d-b515-49e02a88d55d">
        <di:waypoint x="136.0" y="118.0"/>
        <di:waypoint x="186.0" y="118.0"/>
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape bpmnElement="endEvent_8087f927-a53b-4126-95fc-c057736f3b73" id="BPMNShape_23930820-5507-45a0-8630-b5e45ee8dd4d">
        <dc:Bounds height="36.0" width="36.0" x="336.0" y="100.0"/>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge bpmnElement="sequenceFlow_5839394a-c0c2-4a5b-aa81-9412f169cc35" id="BPMNEdge_07ed502e-069f-42a0-bd1b-fed0d68efbda">
        <di:waypoint x="286.0" y="118.0"/>
        <di:waypoint x="336.0" y="118.0"/>
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</definitions>
```
The default behavior is that each newly added flow element will be placed next to the previous flow element.

When flow elements are added to an embedded subprocess, then the subprocess is resized when the subprocess border is reached. Therefore,
it is recommended to first add all new elements to the subprocess and to then create the following elements. Otherwise it could lead to
overlapping elements in the diagram.

Branches of gateways are placed one below the other. Auto layout is not provided, therefore the elements of different branches may overlap.

[multi-instance]: ../../../../reference/bpmn20/tasks/task-markers/#multiple-instance
