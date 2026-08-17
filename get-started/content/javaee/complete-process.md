---

title: 'Complete the Process'
weight: 60

menu:
  main:
    name: "Complete the Process"
    parent: "get-started-javaee"
    identifier: "get-started-javaee-complete"
    pre: "Wire up the rejection e-mail service task to complete the process."

---

# Send a Rejection E-Mail

The only remaining placeholder is the "Send Rejection Email" service task on the rejection path. We add a
`rejectOrder` method to `OrderBusinessLogic` that logs a (simulated) rejection e-mail:

```java
private static Logger LOGGER = Logger.getLogger(OrderBusinessLogic.class.getName());

public void rejectOrder(DelegateExecution delegateExecution) {
  OrderEntity order = getOrder((Long) delegateExecution.getVariable("orderId"));
  LOGGER.log(Level.INFO,
    "\n\n\nSending Email:\nDear {0}, your order {1} of a {2} pizza has been rejected.\n\n\n",
    new String[]{order.getCustomer(), String.valueOf(order.getId()), order.getPizza()});
}
```

...and wire it up on the service task:

```xml
<bpmn:serviceTask id="ServiceTask_1w32ybd" name="Send Rejection Email" camunda:expression="${orderBusinessLogic.rejectOrder(execution)}">
```

## Build and Deploy

Rebuild and redeploy the WAR file. The pizza order process is now complete end to end: placing an order
persists it via an EJB service bean, approving or rejecting it is handled by CDI-scoped JSF task forms, and
both paths - preparing the pizza or sending a rejection e-mail - are reachable and fully wired up.

{{< note title="Where to go from here" class="info" >}}
To learn more about the EximeeBPMS CDI integration, see the
[CDI & BPMN](/manual/latest/user-guide/cdi-java-ee-integration/) section of the user guide. For a JavaEE
process application without JSF/CDI/JPA, a minimal `EjbProcessApplication` alone is enough to register a
deployment with the shared process engine.
{{< /note >}}
