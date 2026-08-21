---

title: 'Spring Bean Service Task'
weight: 30

menu:
  main:
    name: "Spring Bean Service Task"
    parent: "get-started-spring"
    identifier: "get-started-spring-service-task"
    pre: "Model a process with a service task that invokes a Spring-managed bean."

---

Now that a process engine is available, we model a small loan approval process with a service task that
invokes a Spring bean.

# Model the Process

Using the Camunda Modeler, we model `loanApproval.bpmn`: a start event, a service task that invokes a Spring
bean via a `camunda:delegateExpression`, and an end event:

```xml
<bpmn2:serviceTask id="ServiceTask_1" name="Calculate&#10;Interest" camunda:delegateExpression="${calculateInterestService}">
```

# Implement the Service Task

`CalculateInterestService` is a plain `JavaDelegate`:

```java
public class CalculateInterestService implements JavaDelegate {

  public void execute(DelegateExecution delegate) {
    System.out.println("Spring Bean invoked");
  }

}
```

# Register the Beans and Deploy the Process

We register `CalculateInterestService` as a Spring bean, add a `Starter` bean that starts a `loanApproval`
process instance as soon as the Spring context has fully initialized, and tell the process engine
configuration to deploy every BPMN file found on the classpath:

```java
@Bean
public SpringProcessEngineConfiguration engineConfiguration(
    DataSource dataSource,
    PlatformTransactionManager transactionManager,
    @Value("classpath*:*.bpmn") Resource[] deploymentResources) {
  SpringProcessEngineConfiguration configuration = new SpringProcessEngineConfiguration();

  configuration.setProcessEngineName("engine");
  configuration.setDataSource(dataSource);
  configuration.setTransactionManager(transactionManager);
  configuration.setDatabaseSchemaUpdate("true");
  configuration.setJobExecutorActivate(false);
  configuration.setDeploymentResources(deploymentResources);

  return configuration;
}

@Bean
public Starter starter() {
  return new Starter();
}

@Bean
public CalculateInterestService calculateInterestService() {
  return new CalculateInterestService();
}
```

`Starter` starts the process as soon as the application context is ready:

```java
public class Starter implements InitializingBean {

  @Autowired
  private RuntimeService runtimeService;

  public void afterPropertiesSet() throws Exception {
    runtimeService.startProcessInstanceByKey("loanApproval");
  }

}
```

## Build and Run

Rebuild and redeploy the WAR file. Deploying the application now automatically starts a `loanApproval` process
instance, which invokes the Spring-managed `CalculateInterestService` bean - check the container log for
`Spring Bean invoked`.
