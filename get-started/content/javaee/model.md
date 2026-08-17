---

title: 'Model the Process and Add a Start Form'
weight: 30

menu:
  main:
    name: "Model & Start Form"
    parent: "get-started-javaee"
    identifier: "get-started-javaee-model"
    pre: "Model the pizza order process with the Camunda Modeler and add a JSF start form."

---

# Model the Process

Using the Camunda Modeler, we model `pizza-order.bpmn`: a start event, a service task to persist the order, a
user task to approve it, a gateway, a user task to prepare the pizza, a service task to send a rejection
e-mail, and two end events:

```xml
<bpmn:process id="orderPizza" name="Order Pizza" isExecutable="true">
  <bpmn:startEvent id="StartEvent_1" name="Order received">
    <bpmn:outgoing>SequenceFlow_06atmu2</bpmn:outgoing>
  </bpmn:startEvent>
  <bpmn:sequenceFlow id="SequenceFlow_06atmu2" sourceRef="StartEvent_1" targetRef="ServiceTask_0lrmoed" />
  <bpmn:serviceTask id="ServiceTask_0lrmoed" name="Persist Order" camunda:expression="${true}">
    <bpmn:incoming>SequenceFlow_06atmu2</bpmn:incoming>
    <bpmn:outgoing>SequenceFlow_08ax6yk</bpmn:outgoing>
  </bpmn:serviceTask>
  <!-- ... Approve Order user task, exclusive gateway, Prepare Pizza / Send Rejection Email ... -->
</bpmn:process>
```

We leave the service task expressions as placeholders (`${true}`/`${false}`) for now - we wire up the real
logic in the next steps.

# Add a JSF Start Form

We tell the start event which JSF page renders the start form, using a `camunda:formKey`:

```xml
<bpmn:startEvent id="StartEvent_1" name="Order received" camunda:formKey="app:placeorder.jsf">
```

`placeorder.xhtml` lets the customer pick a pizza and enter their details, and starts a new process instance
through the `eximeebpmsTaskForm` CDI bean (provided by `eximeebpms-engine-cdi-jakarta`):

```xml
<f:metadata>
  <f:event type="preRenderView" listener="#{eximeebpmsTaskForm.startProcessInstanceByKeyForm()}" />
</f:metadata>
...
<h:selectOneMenu id="pizza" value="#{processVariables['pizza']}">
    <f:selectItem itemValue="Margarita" itemLabel="Margarita"/>
    <f:selectItem itemValue="Salami" itemLabel="Salami"/>
    <f:selectItem itemValue="Tonno" itemLabel="Tonno"/>
    <f:selectItem itemValue="Prosciutto" itemLabel="Prosciutto"/>
</h:selectOneMenu>
<h:inputText id="customer" value="#{processVariables['customer']}" required="true" />
<h:inputText id="address" value="#{processVariables['address']}" required="true" />
...
<h:commandButton id="submit_button" value="Order Pizza" action="#{eximeebpmsTaskForm.completeProcessInstanceForm()}" />
```

`processVariables` is a CDI producer, also provided by `eximeebpms-engine-cdi-jakarta`, that exposes the
process variable map of the process instance currently being started.

## Build and Deploy

Rebuild and redeploy the WAR file, then open `placeorder.jsf` in a browser and place an order - a new process
instance is created, though the order is not persisted yet.
