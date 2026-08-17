---

title: 'Bonus: Use a Shared Process Engine'
weight: 40

menu:
  main:
    name: "Bonus: Shared Process Engine"
    parent: "get-started-spring"
    identifier: "get-started-spring-shared-engine"
    pre: "Switch from an embedded process engine to a process engine shared by the container."

---

The previous steps configure a dedicated, embedded process engine per application - useful for getting
started, but not how most production EximeeBPMS installations work. Typically, one shared process engine runs
inside the container (for example the EximeeBPMS Tomcat, WildFly or JBoss distribution, or the Spring Boot
starter), and individual applications register themselves as process applications against it instead of
bootstrapping their own engine.

# Register as a Process Application

To use the shared process engine instead, we simplify `LoanApplicationContext` down to a
`SpringProcessApplication`, and look up the already-running engine and its services via `BpmPlatform`:

```java
@Configuration
public class LoanApplicationContext {

  @Bean
  public ProcessEngineService processEngineService() {
    return BpmPlatform.getProcessEngineService();
  }

  @Bean(destroyMethod = "")
  public ProcessEngine processEngine() {
    return BpmPlatform.getDefaultProcessEngine();
  }

  @Bean
  public SpringProcessApplication processApplication() {
    return new SpringProcessApplication();
  }

  // repositoryService, runtimeService, taskService, historyService, managementService
  // are exposed as before, built from this processEngine bean

  @Bean
  public CalculateInterestService calculateInterestService() {
    return new CalculateInterestService();
  }
}
```

The `DataSource`, transaction manager and embedded engine configuration beans - and the `Starter` bean, since
the process is now deployed and scanned automatically by the container - are no longer needed, and are removed.

# Declare a Process Archive

Deployment is now driven by a `META-INF/processes.xml` process archive descriptor instead of the
`deploymentResources` property:

```xml
<process-application
    xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <process-archive name="loan-approval">
    <process-engine>default</process-engine>
    <properties>
      <property name="isDeleteUponUndeploy">false</property>
      <property name="isScanForProcessDefinitions">true</property>
    </properties>
  </process-archive>

</process-application>
```

## Build and Run

Rebuild and deploy the WAR file into a container that already runs a shared EximeeBPMS process engine - the
application registers itself as a process application and the `loanApproval` process is deployed and scanned
automatically.

{{< note title="Where to go from here" class="info" >}}
To learn more about the EximeeBPMS Spring integration, see the
[Spring Framework Integration](/manual/latest/user-guide/spring-framework-integration/) section of the user guide.
{{< /note >}}
