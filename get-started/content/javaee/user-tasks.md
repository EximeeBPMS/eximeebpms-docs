---

title: 'Approve and Prepare the Order'
weight: 50

menu:
  main:
    name: "User Task Forms"
    parent: "get-started-javaee"
    identifier: "get-started-javaee-user-tasks"
    pre: "Add JSF user task forms to approve an order and prepare the pizza, with a CDI-scoped controller."

---

# Add an Approve Order Form

We give the "Approve Order" user task a JSF form key:

```xml
<bpmn:userTask id="UserTask_0b3v36h" name="Approve Order" camunda:formKey="app:approveorder.jsf">
```

`ApproveOrderController` is a `@ConversationScoped` CDI bean that loads the persisted order via
`OrderBusinessLogic`, and, on submit, merges the (possibly edited) order and completes the task in one
transaction:

```java
@Named
@ConversationScoped
public class ApproveOrderController implements Serializable {

  @Inject
  private BusinessProcess businessProcess;

  @PersistenceContext
  private EntityManager entityManager;

  @Inject
  private OrderBusinessLogic orderBusinessLogic;

  private OrderEntity orderEntity;

  public OrderEntity getOrderEntity() {
    if (orderEntity == null) {
      orderEntity = orderBusinessLogic.getOrder((Long) businessProcess.getVariable("orderId"));
    }
    return orderEntity;
  }

  public void submitForm() throws IOException {
    orderBusinessLogic.mergeOrderAndCompleteTask(orderEntity);
  }
}
```

`OrderBusinessLogic` gains the corresponding `getOrder` and `mergeOrderAndCompleteTask` methods, the latter
completing the task through the injected `TaskForm` CDI bean:

```java
@Inject
private TaskForm taskForm;

public OrderEntity getOrder(Long orderId) {
  return entityManager.find(OrderEntity.class, orderId);
}

public void mergeOrderAndCompleteTask(OrderEntity orderEntity) {
  entityManager.merge(orderEntity);
  try {
    taskForm.completeTask();
  } catch (IOException e) {
    throw new RuntimeException("Cannot complete task", e);
  }
}
```

`approveorder.xhtml` renders the order and lets the approver check a box to approve or reject it:

```xml
<f:metadata>
  <f:event type="preRenderView" listener="#{eximeebpmsTaskForm.startTaskForm()}" />
</f:metadata>
...
<p>Customer: #{approveOrderController.orderEntity.customer}</p>
<p>Address: #{approveOrderController.orderEntity.address}</p>
<p>Pizza: #{approveOrderController.orderEntity.pizza}</p>
<h:selectBooleanCheckbox value="#{approveOrderController.orderEntity.approved}"/>
<h:commandButton id="submit_button" value="Approve Order" action="#{approveOrderController.submitForm()}" />
```

# Branch on the Approval

The gateway's outgoing sequence flows now check the persisted `approved` flag:

```xml
<bpmn:sequenceFlow id="SequenceFlow_10r7cva" name="Yes" sourceRef="ExclusiveGateway_07926wc" targetRef="UserTask_19diw18">
  <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${orderBusinessLogic.getOrder(orderId).approved}</bpmn:conditionExpression>
</bpmn:sequenceFlow>
<bpmn:sequenceFlow id="SequenceFlow_0md4bjf" name="No" sourceRef="ExclusiveGateway_07926wc" targetRef="ServiceTask_1w32ybd">
  <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">${not orderBusinessLogic.getOrder(orderId).approved}</bpmn:conditionExpression>
</bpmn:sequenceFlow>
```

# Add a Prepare Pizza Form

We give the "Prepare Pizza" user task a form key too:

```xml
<bpmn:userTask id="UserTask_19diw18" name="Prepare Pizza" camunda:formKey="app:preparepizza.jsf">
```

`preparepizza.xhtml` is a minimal form that just completes the task:

```xml
<f:metadata>
  <f:event type="preRenderView" listener="#{eximeebpmsTaskForm.startTaskForm()}" />
</f:metadata>
...
<h:commandButton id="submit_button" value="Done" action="#{eximeebpmsTaskForm.completeTask()}" />
```

## Build and Deploy

Rebuild and redeploy the WAR file. Place an order, then approve or reject it from the tasklist - approving
routes the process to the "Prepare Pizza" task.
