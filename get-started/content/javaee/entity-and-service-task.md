---

title: 'Persist the Order with an EJB Service Task'
weight: 40

menu:
  main:
    name: "EJB Service Task"
    parent: "get-started-javaee"
    identifier: "get-started-javaee-service-task"
    pre: "Add a JPA entity and an EJB service bean that persists the order via a BPMN service task."

---

# Add a JPA Entity

`OrderEntity` is a plain JPA entity representing a pizza order:

```java
@Entity
public class OrderEntity implements Serializable {

  @Id
  @GeneratedValue
  protected Long id;

  @Version
  protected long version;

  protected String customer;
  protected String address;
  protected String pizza;
  protected boolean approved;

  // getters and setters ...
}
```

# Add an EJB Service Bean

`OrderBusinessLogic` is a stateless session bean, exposed as a CDI bean via `@Named` so it can be invoked from
a BPMN expression. `persistOrder` reads the process variables collected by the start form, persists a new
`OrderEntity`, and stores its generated id as a new process variable:

```java
@Stateless
@Named
public class OrderBusinessLogic {

  @PersistenceContext
  private EntityManager entityManager;

  public void persistOrder(DelegateExecution delegateExecution) {
    OrderEntity orderEntity = new OrderEntity();

    Map<String, Object> variables = delegateExecution.getVariables();

    orderEntity.setCustomer((String) variables.get("customer"));
    orderEntity.setAddress((String) variables.get("address"));
    orderEntity.setPizza((String) variables.get("pizza"));

    entityManager.persist(orderEntity);
    entityManager.flush();

    delegateExecution.removeVariables(variables.keySet());
    delegateExecution.setVariable("orderId", orderEntity.getId());
  }

}
```

# Wire Up the Service Task

We replace the placeholder expression on the "Persist Order" service task with a real invocation of the EJB
bean:

```xml
<bpmn:serviceTask id="ServiceTask_0lrmoed" name="Persist Order" camunda:expression="${orderBusinessLogic.persistOrder(execution)}">
```

## Build and Deploy

Rebuild and redeploy the WAR file, then place another order - this time, the order is persisted to the
database via the EJB service bean.
