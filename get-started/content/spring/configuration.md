---

title: 'Embedded Process Engine Configuration'
weight: 20

menu:
  main:
    name: "Process Engine Configuration"
    parent: "get-started-spring"
    identifier: "get-started-spring-configuration"
    pre: "Configure an embedded process engine directly inside the Spring application context."

---

In this section, we configure an embedded process engine directly inside the Spring application context.

# Declare a DataSource and TransactionManager

We declare an in-memory H2 `DataSource` and a `PlatformTransactionManager`:

```java
@Bean
public DataSource dataSource() {
  DriverManagerDataSource dataSource = new DriverManagerDataSource();
  dataSource.setDriverClassName("org.h2.Driver");
  dataSource.setUrl("jdbc:h2:mem:process-engine;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE");
  dataSource.setUsername("sa");
  dataSource.setPassword("");
  return dataSource;
}

@Bean
public PlatformTransactionManager transactionManager(DataSource dataSource) {
  return new DataSourceTransactionManager(dataSource);
}
```

# Configure the Process Engine

`SpringProcessEngineConfiguration`, from `eximeebpms-engine-spring-6`, is the Spring-aware counterpart of the
plain engine configuration. It knows how to participate in Spring-managed transactions:

```java
@Bean
public SpringProcessEngineConfiguration engineConfiguration(DataSource dataSource, PlatformTransactionManager transactionManager) {
  SpringProcessEngineConfiguration configuration = new SpringProcessEngineConfiguration();

  configuration.setProcessEngineName("engine");
  configuration.setDataSource(dataSource);
  configuration.setTransactionManager(transactionManager);
  configuration.setDatabaseSchemaUpdate("true");
  configuration.setJobExecutorActivate(false);

  return configuration;
}
```

# Build and Expose the Process Engine

We wire up a `ProcessEngineFactoryBean` to build the `ProcessEngine` from that configuration, and expose the
engine's services as individual Spring beans, so they can be `@Autowired` anywhere in the application:

```java
@Bean
public ProcessEngineFactoryBean engineFactory(SpringProcessEngineConfiguration engineConfiguration) {
  ProcessEngineFactoryBean factoryBean = new ProcessEngineFactoryBean();
  factoryBean.setProcessEngineConfiguration(engineConfiguration);
  return factoryBean;
}

@Bean
public ProcessEngine processEngine(ProcessEngineFactoryBean factoryBean) throws Exception {
  return factoryBean.getObject();
}

@Bean
public RepositoryService repositoryService(ProcessEngine processEngine) {
  return processEngine.getRepositoryService();
}

@Bean
public RuntimeService runtimeService(ProcessEngine processEngine) {
  return processEngine.getRuntimeService();
}

@Bean
public TaskService taskService(ProcessEngine processEngine) {
  return processEngine.getTaskService();
}

@Bean
public HistoryService historyService(ProcessEngine processEngine) {
  return processEngine.getHistoryService();
}

@Bean
public ManagementService managementService(ProcessEngine processEngine) {
  return processEngine.getManagementService();
}
```

## Build and Run

Rebuild the WAR file with `mvn package` and redeploy it. The embedded process engine now starts up together
with the web application.
