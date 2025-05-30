---

title: "Process Engine Configuration"
weight: 20

menu:
  main:
    name: "Configuration"
    identifier: "user-guide-spring-boot-configuration"
    parent: "user-guide-spring-boot-integration"

---

The auto starter uses the  `org.eximeebpms.bpm.engine.impl.cfg.ProcessEnginePlugin` mechanism to configure the engine.

The configuration is divided into _sections_. These _sections_ are represented by the marker interfaces:

* `org.eximeebpms.bpm.spring.boot.starter.configuration.EximeeBPMSProcessEngineConfiguration`
* `org.eximeebpms.bpm.spring.boot.starter.configuration.EximeeBPMSDatasourceConfiguration`
* `org.eximeebpms.bpm.spring.boot.starter.configuration.EximeeBPMSHistoryConfiguration`
* `org.eximeebpms.bpm.spring.boot.starter.configuration.EximeeBPMSHistoryLevelAutoHandlingConfiguration`
* `org.eximeebpms.bpm.spring.boot.starter.configuration.EximeeBPMSJobConfiguration`
* `org.eximeebpms.bpm.spring.boot.starter.configuration.EximeeBPMSDeploymentConfiguration`
* `org.eximeebpms.bpm.spring.boot.starter.configuration.EximeeBPMSAuthorizationConfiguration`
* `org.eximeebpms.bpm.spring.boot.starter.configuration.EximeeBPMSFailedJobConfiguration`
* `org.eximeebpms.bpm.spring.boot.starter.configuration.EximeeBPMSMetricsConfiguration`

## Default Configurations

The following default and best practice configurations are provided by the starter and can be customized or overridden.

### `DefaultProcessEngineConfiguration`

Sets the process engine name and automatically adds all `ProcessEnginePlugin` beans to the configuration.

### `DefaultDatasourceConfiguration`

Configures the EximeeBPMS data source and enables [transaction integration]({{< ref "/user-guide/spring-framework-integration/transactions.md" >}}). By default, the primary `DataSource` and `PlatformTransactionManager` beans are wired with the process engine configuration.

If you want to [configure more than one datasource](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto-two-datasources)
and don't want to use the `@Primary` one for the process engine, then you can create a separate
data source with name `eximeebpmsBpmDataSource` that will be automatically wired with EximeeBPMS instead.

```java
@Bean
@Primary
@ConfigurationProperties(prefix="datasource.primary")
public DataSource primaryDataSource() {
  return DataSourceBuilder.create().build();
}

@Bean(name="eximeebpmsBpmDataSource")
@ConfigurationProperties(prefix="datasource.secondary")
public DataSource secondaryDataSource() {
  return DataSourceBuilder.create().build();
}
```

If you don't want to use the `@Primary` transaction manager, it is possible to create a separate
transaction manager with the name `eximeebpmsBpmTransactionManager` that will be wired with the data
source used for EximeeBPMS (either `@Primary` or `eximeebpmsBpmDataSource`):

```java
@Bean
@Primary
public PlatformTransactionManager primaryTransactionManager() {
  return new JpaTransactionManager();
}

@Bean(name="eximeebpmsBpmTransactionManager")
public PlatformTransactionManager eximeebpmsTransactionManager(@Qualifier("eximeebpmsBpmDataSource") DataSource dataSource) {
  return new DataSourceTransactionManager(dataSource);
}
```

{{< note title="" class="warning" >}}
  The wired data source and transaction manager beans must match, i.e. make sure that the transaction manager actually manages the EximeeBPMS data source. If that is not the case, the process engine will use auto-commit mode for the data source connection, potentially leading to inconsistencies in the database.
{{< /note >}}

### `DefaultHistoryConfiguration`

Applies the history configuration to the process engine. If not configured, the history level [FULL]({{< ref "/user-guide/process-engine/history/history-configuration.md#choose-a-history-level" >}}) is used.
If you want to use a custom `HistoryEventHandler`, you just have to provide a bean implementing the interface.

```java
@Bean
public HistoryEventHandler customHistoryEventHandler() {
  return new CustomHistoryEventHanlder();
}
```

### `DefaultHistoryLevelAutoHandlingConfiguration`
As eximeebpms version >= 7.4 supports `history-level auto`, this configuration adds support for versions <= 7.3.

To have more control over the handling, you can provide your own

- `org.eximeebpms.bpm.spring.boot.starter.jdbc.HistoryLevelDeterminator` with name `historyLevelDeterminator`

IMPORTANT: The default configuration is applied after all other default configurations using the ordering mechanism.

### `DefaultJobConfiguration`

Applies the job execution properties to the process engine.

To have more control over the execution itself, you can provide your own

- `org.eximeebpms.bpm.engine.impl.jobexecutor.JobExecutor`
- `org.springframework.core.task.TaskExecutor` named `eximeebpmsTaskExecutor`

beans.

IMPORTANT: The job executor is not enabled in the configuration.
This is done after the spring context successfully loaded (see `org.eximeebpms.bpm.spring.boot.starter.runlistener`).

### `DefaultDeploymentConfiguration`

If auto deployment is enabled (this is the case by default), all processes found in the classpath are deployed.
The resource pattern can be changed using properties (see [properties](#eximeebpms-engine-properties)).

### `DefaultAuthorizationConfiguration`

Applies the authorization configuration to the process engine. If not configured, the `eximeebpms` default values are used (see [properties](#eximeebpms-engine-properties)).

## Overriding the Default Configuration

Provide a bean implementing one of the marker interfaces. For example to customize the datasource configuration:

```java
@Configuration
public class MyEximeeBPMSConfiguration {

	@Bean
	public static EximeeBPMSDatasourceConfiguration eximeebpmsDatasourceConfiguration() {
		return new MyEximeeBPMSDatasourceConfiguration();
	}

}
```

## Adding Additional Configurations

You just have to provide one or more beans implementing the `org.eximeebpms.bpm.engine.impl.cfg.ProcessEnginePlugin` interface
(or extend from `org.eximeebpms.bpm.spring.boot.starter.configuration.impl.AbstractEximeeBPMSConfiguration`).
The configurations are applied ordered using the spring ordering mechanism (`@Order` annotation and `Ordered` interface).
So if you want your configuration to be applied before the default configurations, add a `@Order(Ordering.DEFAULT_ORDER - 1)` annotation to your class.
If you want your configuration to be applied after the default configurations, add a `@Order(Ordering.DEFAULT_ORDER + 1)` annotation to your class.

```java
@Configuration
public class MyEximeeBPMSConfiguration {

	@Bean
	@Order(Ordering.DEFAULT_ORDER + 1)
	public static ProcessEnginePlugin myCustomConfiguration() {
		return new MyCustomConfiguration();
	}

}
```

Or, if you have component scan enabled:

```java
@Component
@Order(Ordering.DEFAULT_ORDER + 1)
public class MyCustomConfiguration implements ProcessEnginePlugin {

	@Override
	public void preInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
		//...
	}

	...

}
```

or

```java

@Component
@Order(Ordering.DEFAULT_ORDER + 1)
public class MyCustomConfiguration extends AbstractEximeeBPMSConfiguration {

	@Override
	public void preInit(SpringProcessEngineConfiguration springProcessEngineConfiguration) {
		//...
	}

	...

}
```

## EximeeBPMS Engine Properties
In addition to the bean-based way of overriding process engine configuration properties, it is also possible
to set those properties via an <code>application.yaml</code> configuration file. Instructions on how to use it
can be found in the <a href="https://docs.eximeebpms.org/get-started/spring-boot/configuration/">Spring Boot Starter Guide</a>.

The available properties are as follows:

<table class="table desc-table">
<tr>
<th>Prefix</th>
 <th>Property name</th>
 <th>Description</th>
  <th>Default value</th>
  </tr>
<tr><td colspan="4"><b>General</b></td></tr>

<tr><td rowspan="15"><code>eximeebpms.bpm</code></td>
<td><code>.enabled</code></td>
<td>Switch to disable the EximeeBPMS auto-configuration. Use to exclude EximeeBPMS in integration tests.</td>
<td><code>true</code></td>
</tr>

<tr>
<td><code>.process-engine-name</code></td>
<td>Name of the process engine</td>
<td>EximeeBPMS default value</td>
</tr>

<tr>
<td><code>.generate-unique-process-engine-name</code></td>
<td>Generate a unique name for the process engine (format: 'processEngine' + 10 random alphanumeric characters)</td>
<td>false</td>
</tr>

<tr>
<td><code>.generate-unique-process-application-name</code></td>
<td>Generate a unique Process Application name for every Process Application deployment (format: 'processApplication' + 10 random alphanumeric characters)</td>
<td>false</td>
</tr>

<tr>
<td><code>.default-serialization-format</code></td>
<td>Default serialization format</td>
<td>EximeeBPMS default value</td>
</tr>

<tr>
<td><code>.history-level</code></td>
<td>EximeeBPMS history level</td>
<td>FULL</td>
</tr>

<tr>
<td><code>.history-level-default</code></td>
<td>EximeeBPMS history level to use when <code>history-level</code> is <code>auto</code>, but the level can not determined automatically</td>
<td>FULL</td>
</tr>

<tr>
<td><code>.auto-deployment-enabled</code></td>
<td>If processes should be auto deployed. This is disabled when using the SpringBootProcessApplication</td>
<td><code>true</code></td>
</tr>

<tr>
<td><code>.default-number-of-retries</code></td>
<td>Specifies how many times a job will be executed before an incident is raised</td>
<td><code>3</code></td>
</tr>

<tr>
<td><code>.job-executor-acquire-by-priority</code></td>
<td>If set to true, the job executor will acquire the jobs with the highest priorities</td>
<td><code>false</code></td>
</tr>

<tr>
<td><a name="license-file"></a><code>.license-file</code></td>
<td>Provides a URL to your EximeeBPMS license file and is automatically inserted into the DB when the application starts (but only if no valid license key is found in the DB).</br></br>
<b>Note:</b> This property is only available when using the <a href="{{<ref "/user-guide/spring-boot-integration/webapps.md#enterprise-webapps" >}}">eximeebpms-bpm-spring-boot-starter-webapp-ee</a>
</td>
<td>By default, the license key will be loaded:
 <ol>
  <li>from the URL provided via the this property (if present)</li>
  <li>from the file with the name <code>eximeebpms-license.txt</code> from the classpath (if present)</li>
  <li>from path <i>${user.home}/.eximeebpms/license.txt</i> (if present)</li>
 </ol>
 The license must be exactly in the format as we sent it to you including the header and footer line. Bear in mind
 that for some licenses there is a minimum version requirement</a>.
</td>
</tr>

<tr>
<td><code>.id-generator</code></td>
<td>Configure idGenerator. Allowed values: <code>simple</code>, <code>strong</code>, <code>prefixed</code>. <code>prefixed</code> id generator is like <code>strong</code>, but uses a Spring application name (<code>${spring.application.name}</code>) as the prefix for each id.</td>
<td><code>strong</code></td>
</tr>

<tr>
<td><code>.version</code></td>
<td>Version of the process engine</td>
<td>Read only value, e.g., 7.4.0</td>
</tr>

<tr>
<td><code>.formatted-version</code></td>
<td>Formatted version of the process engine</td>
<td>Read only value, e.g., (v7.4.0)</td>
</tr>

<tr>
<td><code>.deployment-resource-pattern</code></td>
<td>Location for auto deployment</td>
<td><code>classpath*:**/*.bpmn, classpath*:**/*.bpmn20.xml, classpath*:**/*.dmn, classpath*:**/*.dmn11.xml, classpath*:**/*.cmmn, classpath*:**/*.cmmn10.xml, classpath*:**/*.cmmn11.xml</code></td>
</tr>

<tr><td colspan="4"><b>Job Execution</b></td></tr>

<tr>
<td rowspan="14"><code>eximeebpms.bpm.job-execution</code></td>
<td><code>.enabled</code></td>
<td>If set to <code>false</code>, no JobExecutor bean is created at all. Maybe used for testing.</td>
<td><code>true</code></td>
</tr>

<tr>
<td><code>.deployment-aware</code></td>
<td>If job executor is deployment aware</td>
<td><code>false</code></td>
</tr>
<tr>
<td><code>.core-pool-size</code></td>
<td>Set to value > 1 to activate parallel job execution.</td>
<td><code>3</code></td>
</tr>
<tr>
<td><code>.keep-alive-seconds</code></td>
<td>Specifies the time, in milliseconds, for which threads are kept alive when there are no more tasks present. When the time expires, threads are terminated so that the core pool size is reached.</td>
<td><code>0</code></td>
</tr>
<tr>
<td><code>.lock-time-in-millis</code></td>
<td>Specifies the time in milliseconds an acquired job is locked for execution. During that time, no other job executor can acquire the job.</td>
<td><code>300000</code></td>
</tr>
<tr>
<td><code>.max-jobs-per-acquisition</code></td>
<td>Sets the maximal number of jobs to be acquired at once.</td>
<td><code>3</code></td>
</tr>
<tr>
<td><code>.max-pool-size</code></td>
<td>Maximum number of parallel threads executing jobs.</td>
<td><code>10</code></td>
</tr>
<tr>
<td><code>.queue-capacity</code></td>
<td>Sets the size of the queue which is used for holding tasks to be executed.</td>
<td><code>3</code></td>
</tr>
<tr>
<td><code>.wait-time-in-millis</code></td>
<td>Specifies the wait time of the job acquisition thread in milliseconds in case there are less jobs available for execution than requested during acquisition. If this is repeatedly the case, the wait time is increased exponentially by the factor <code>waitIncreaseFactor</code>. The wait time is capped by <code>maxWait</code>.</td>
<td><code>5000</code></td>
</tr>
<tr>
<td><code>.max-wait</code></td>
<td>Specifies the maximum wait time of the job acquisition thread in milliseconds in case there are less jobs available for execution than requested during acquisition.</td>
<td><code>60000</code></td>
</tr>
<tr>
<td><code>.backoff-time-in-millis</code></td>
<td>Specifies the wait time of the job acquisition thread in milliseconds in case jobs were acquired but could not be locked. This condition indicates that there are other job acquisition threads acquiring jobs in parallel. If this is repeatedly the case, the backoff time is increased exponentially by the factor <code>waitIncreaseFactor</code>. The time is capped by <code>maxBackoff</code>. With every increase in backoff time, the number of jobs acquired increases by <code>waitIncreaseFactor</code> as well.</td>
<td><code>0</code></td>
</tr>
<tr>
<td><code>.max-backoff</code></td>
<td>Specifies the maximum wait time of the job acquisition thread in milliseconds in case jobs were acquired but could not be locked.</td>
<td><code>0</code></td>
</tr>
<tr>
<td><code>.backoff-decrease-threshold</code></td>
<td>Specifies the number of successful job acquisition cycles without a job locking failure before the backoff time is decreased again. In that case, the backoff time is reduced by <code>waitIncreaseFactor</code>.</td>
<td><code>100</code></td>
</tr>
<tr>
<td><code>.wait-increase-factor</code></td>
<td>Specifies the factor by which wait and backoff time are increased in case their activation conditions are repeatedly met.</td>
<td><code>2</code></td>
</tr>

<tr><td colspan="4"><b>Datasource</b></td></tr>

<tr>
<td rowspan="5"><code>eximeebpms.bpm.database</code></td>
<td><code>.schema-update</code></td>
<td>If automatic schema update should be applied, use one of [true, false, create, create-drop, drop-create]</td>
<td><code>true</code></td>
</tr>

<tr>
<td><code>.type</code></td>
<td>Type of the underlying database. Possible values: <code>h2</code>, mysql, oracle, postgres, mssql, db2.</td>
<td>Will be automatically determined from datasource</td>
</tr>

<tr>
<td><code>.table-prefix</code></td>
<td>Prefix of the eximeebpms database tables. Attention: The table prefix will <b>not</b> be applied if you  are using <code>schema-update</code>!</td>
<td><i>EximeeBPMS default value</i></td>
</tr>

<tr>
<td><code>.schema-name</code></td>
<td>The dataBase schema name</td>
<td><i>EximeeBPMS default value</i></td>
</tr>

<tr>
<td><code>.jdbc-batch-processing</code></td>
<td>Controls if the engine executes the jdbc statements as Batch or not.
It has to be disabled for some databases.
See the <a href="{{<ref "/user-guide/process-engine/database/database-configuration.md#jdbc-batch-processing" >}}">user guide</a> for further details.</td>
<td><i>EximeeBPMS default value: true</i></td>
</tr>

<tr><td colspan="4"><b>Eventing</b></td></tr>
<tr>
<td rowspan="4"><code>eximeebpms.bpm.eventing</code></td>
<td><code>.execution</code></td>
<td>Enables eventing of delegate execution events.
See the <a href="{{<ref "/user-guide/spring-boot-integration/the-spring-event-bridge.md" >}}">user guide</a> for further details.</td>
<td><code>true</code></td>
</tr>

<tr>
<td><code>.history</code></td>
<td>Enables eventing of history events.
See the <a href="{{<ref "/user-guide/spring-boot-integration/the-spring-event-bridge.md" >}}">user guide</a> for further details.</td>
<td><code>true</code></td>
</tr>

<tr>
<td><code>.task</code></td>
<td>Enables eventing of task events.
See the <a href="{{<ref "/user-guide/spring-boot-integration/the-spring-event-bridge.md" >}}">user guide</a> for further details.</td>
<td><code>true</code></td>
</tr>

<tr>
<td><code>.skippable</code></td>
<td>Controls if listeners are registered as built-in (<code>false</code>) or are skippable (<code>true</code>).
See the <a href="{{<ref "/user-guide/spring-boot-integration/the-spring-event-bridge.md" >}}">user guide</a> for further details.</td>
<td><code>true</code></td>
</tr>


<tr><td colspan="4"><b>Management</b></td></tr>
<tr>
<td><code>eximeebpms.bpm.management</code></td>
<td><code>.health.eximeebpms.enabled</code></td>
<td>Enables default eximeebpms health indicators</td>
<td><code>true</code></td>
</tr>

<tr><td colspan="4"><b>Metrics</b></td></tr>
<tr>
<td rowspan="2"><code>eximeebpms.bpm.metrics</code></td>
<td><code>.enabled</code></td>
<td>Enables metrics reporting</td>
<td><i>EximeeBPMS default value</i></td>
</tr>

<tr>
<td><code>.db-reporter-activate</code></td>
<td>Enables db metrics reporting</td>
<td><i>EximeeBPMS default value</i></td>
</tr>

<tr><td colspan="4"><b>Webapp</b></td></tr>
<tr>
<td rowspan="3"><code>eximeebpms.bpm.webapp</code></td>
<td><code>.enabled</code></td>
<td>Switch to disable the EximeeBPMS Webapp auto-configuration.</td>
<td><code>true</code></td>
</tr>

<tr>
<td><code>.index-redirect-enabled</code></td>
<td>Registers a redirect from <code>/</code> to eximeebpms's bundled <code>index.html</code>.
<br/>
If this property is set to <code>false</code>, the
<a href="https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-developing-web-applications.html#boot-features-spring-mvc-welcome-page">default</a>
Spring Boot behaviour is taken into account.</td>
<td><code>true</code></td>
</tr>

<tr>
<td><code>.application-path</code></td>
<td>Changes the application path of the webapp.
<br/>
When setting to <code>/</code>, the legacy behavior of EximeeBPMS Spring Boot Starter <= 3.4.x is restored.
</td>
<td><code>/eximeebpms</code></td>
</tr>

<tr id="csrf">
  <td rowspan="10"><code>eximeebpms.bpm.webapp.csrf</code></td>
</tr>
<tr>
<td><code>.target-origin</code></td>
<td>Sets the application expected deployment domain. See the <a href="{{<ref "/webapps/shared-options/csrf-prevention.md" >}}">user guide</a> for details.</td>
<td><i>Not set</i></td>
</tr>
<tr>
<td><code>.deny-status</code></td>
<td>Sets the HTTP response status code used for a denied request. See the <a href="{{<ref "/webapps/shared-options/csrf-prevention.md" >}}">user guide</a> for details.</td>
<td><code>403</code></td>
</tr>
<tr>
<td><code>.random-class</code></td>
<td>Sets the name of the class used to generate tokens. See the <a href="{{<ref "/webapps/shared-options/csrf-prevention.md" >}}">user guide</a> for details.</td>
<td><code>java.security.SecureRandom</code></td>
</tr>
<tr>
<td><code>.entry-points</code></td>
<td>Sets additional URLs that will not be tested for the presence of a valid token. See the <a href="{{<ref "/webapps/shared-options/csrf-prevention.md" >}}">user guide</a> for details.</td>
<td><i>Not set</i></td>
</tr>
<tr>
  <td><code>.enable-secure-cookie</code></td>
  <td>
    If set to <code>true</code>, the cookie flag <a href="{{< ref "/webapps/shared-options/cookie-security.md#secure" >}}">Secure</a> is enabled.
  </td>
  <td><code>false</code></td>
</tr>
<tr>
  <td><code>.enable-same-site-cookie</code></td>
  <td>
    If set to <code>false</code>, the cookie flag <a href="{{< ref "/webapps/shared-options/cookie-security.md#samesite" >}}">SameSite</a> is disabled. The default value of the <code>SameSite</code> cookie is <code>LAX</code> and it can be changed via <code>same-site-cookie-option</code> configuration property.
  </td>
  <td><code>true</code></td>
</tr>
<tr>
  <td><code>.same-site-cookie-option</code></td>
  <td>
    Can be configured either to <code>STRICT</code> or <code>LAX</code>.<br><br>
    <strong>Note:</strong>
    <ul>
      <li>Is ignored when <code>enable-same-site-cookie</code> is set to <code>false</code></li>
      <li>Cannot be set in conjunction with <code>same-site-cookie-value</code></li>
    </ul>
  </td>
  <td><i>Not set</i></td>
</tr>
<tr>
  <td><code>.same-site-cookie-value</code></td>
  <td>
    A custom value for the cookie property.<br><br>
    <strong>Note:</strong>
    <ul>
      <li>Is ignored when <code>enable-same-site-cookie</code> is set to <code>false</code></li>
      <li>Cannot be set in conjunction with <code>same-site-cookie-option</code></li>
    </ul>
  </td>
  <td><i>Not set</i></td>
</tr>
<tr>
  <td><code>.cookie-name</code></td>
  <td>
      A custom value to change the cookie name.<br>
      <strong>Note:</strong> Please make sure to additionally change the cookie name for each webapp
      (e. g. <a href="{{< ref "/webapps/cockpit/extend/configuration.md#change-csrf-cookie-name" >}}">Cockpit
      </a>) separately.
  </td>
  <td><code>XSRF-TOKEN</code></td>
</tr>

<tr id="session-cookie">
  <td rowspan="6"><code>eximeebpms.bpm.webapp.session-cookie</code></td>
</tr>
<tr>
  <td><code>.enable-secure-cookie</code></td>
  <td>
    If set to <code>true</code>, the cookie flag <a href="{{< ref "/webapps/shared-options/cookie-security.md#secure" >}}">Secure</a> is enabled for the
      <a href="{{< ref "/webapps/shared-options/cookie-security.md" >}}">Session Cookie</a>.<br><br>
    <strong>Note:</strong> If the <code>Secure</code> flag is set in the cookie by any other means already, this property will not remove it by setting it to <code>false</code>.
  </td>
  <td><code>false</code></td>
</tr>
<tr>
  <td><code>.enable-same-site-cookie</code></td>
  <td>
    If set to <code>false</code>, the cookie flag <a href="{{< ref "/webapps/shared-options/cookie-security.md#samesite" >}}">SameSite</a> is disabled. The default value of the <code>SameSite</code> cookie is <code>LAX</code> and it can be changed via <code>same-site-cookie-option</code> configuration property.<br><br>
    <strong>Note:</strong> If the <code>SameSite</code> flag is set in the cookie by any other means already, this property will not adjust or remove it.
  </td>
  <td><code>true</code></td>
</tr>
<tr>
  <td><code>.same-site-cookie-option</code></td>
  <td>
    Can be configured either to <code>STRICT</code> or <code>LAX</code>.<br><br>
    <strong>Note:</strong>
    <ul>
      <li>Is ignored when <code>enable-same-site-cookie</code> is set to <code>false</code></li>
      <li>Cannot be set in conjunction with <code>same-site-cookie-value</code></li>
      <li>Will not change the value of the <code>SameSite</code> flag if it is set already by any other means</li>
    </ul>
  </td>
  <td><i>Not set</i></td>
</tr>
<tr>
  <td><code>.same-site-cookie-value</code></td>
  <td>
    A custom value for the cookie property.<br><br>
    <strong>Note:</strong>
    <ul>
      <li>Is ignored when <code>enable-same-site-cookie</code> is set to <code>false</code></li>
      <li>Cannot be set in conjunction with <code>same-site-cookie-option</code></li>
      <li>Will not change the value of the <code>SameSite</code> flag if it is set already by any other means</li>
    </ul>
  </td>
  <td><i>Not set</i></td>
</tr>
<tr>
  <td><code>.cookie-name</code></td>
  <td>
      A custom value to configure the name of the session cookie to adjust.
  </td>
  <td><code>JSESSIONID</code></td>
</tr>

<tr id="header-security">
  <td rowspan="12"><code>eximeebpms.bpm.webapp.header-security</code></td>
</tr>
<tr>
  <td><code>.xss-protection-disabled</code></td>
  <td>
    The header can be entirely disabled if set to <code>true</code>. <br>
    Allowed set of values is <code>true</code> and <code>false</code>.
  </td>
  <td><code>false</code></td>
</tr>
<tr>
  <td><code>.xss-protection-option</code></td>
  <td>
    The allowed set of values:
    <ul>
      <li><code>BLOCK</code>: If the browser detects a cross-site scripting attack, the page is blocked completely</li>
      <li><code>SANITIZE</code>: If the browser detects a cross-site scripting attack, the page is sanitized from suspicious parts (value <code>0</code>)</li>
    </ul>
    <strong>Note:</strong>
    <ul>
      <li>Is ignored when <code>.xss-protection-disabled</code> is set to <code>true</code></li>
      <li>Cannot be set in conjunction with <code>.xss-protection-value</code></li>
    </ul>
  </td>
  <td><code>BLOCK</code></td>
</tr>
<tr>
  <td><code>.xss-protection-value</code></td>
  <td>
    A custom value for the header can be specified.<br><br>
    <strong>Note:</strong>
    <ul>
      <li>Is ignored when <code>.xss-protection-disabled</code> is set to <code>true</code></li>
      <li>Cannot be set in conjunction with <code>.xss-protection-option</code></li>
    </ul>
  </td>
  <td><code>1; mode=block</code></td>
</tr>
<tr>
  <td><code>.content-security-policy-disabled</code></td>
  <td>
    The header can be entirely disabled if set to <code>true</code>. <br>
    Allowed set of values is <code>true</code> and <code>false</code>.
  </td>
  <td><code>false</code></td>
</tr>
<tr>
  <td><code>.content-security-policy-value</code></td>
  <td>
    A custom value for the header can be specified.<br><br>
    <strong>Note:</strong> Property is ignored when <code>.content-security-policy-disabled</code> is set to <code>true</code>
  </td>
  <td><code>base-uri 'self'</code></td>
</tr>
<tr>
  <td><code>.content-type-options-disabled</code></td>
  <td>
    The header can be entirely disabled if set to <code>true</code>. <br>
    Allowed set of values is <code>true</code> and <code>false</code>.
  </td>
  <td><code>false</code></td>
</tr>
<tr>
  <td><code>.content-type-options-value</code></td>
  <td>
    A custom value for the header can be specified.<br><br>
    <strong>Note:</strong> Property is ignored when <code>.content-security-policy-disabled</code> is set to <code>true</code>
  </td>
  <td><code>nosniff</code></td>
</tr>
<tr>
  <td><code>.hsts-disabled</code></td>
  <td>
      Set to <code>false</code> to enable the header. The header is disabled by default.<br>
      Allowed set of values is <code>true</code> and <code>false</code>.
  </td>
  <td><code>true</code></td>
</tr>
<tr>
  <td><code>.hsts-max-age</code></td>
  <td>
      Amount of seconds, the browser should remember to access the webapp via HTTPS.<br><br>
      <strong>Note:</strong>
      <ul>
        <li>Corresponds by default to one year</li>
        <li>Is ignored when <code>hstsDisabled</code> is <code>true</code></li>
        <li>Cannot be set in conjunction with <code>hstsValue</code></li>
        <li>Allows a maximum value of 2<sup>31</sup>-1</li>
      </ul>
  </td>
  <td><code>31536000</code></td>
</tr>
<tr>
  <td><code>.hsts-include-subdomains-disabled</code></td>
  <td>
      HSTS is additionally to the domain of the webapp enabled for all its subdomains.<br><br>
      <strong>Note:</strong>
      <ul>
        <li>Is ignored when <code>hstsDisabled</code> is <code>true</code></li>
        <li>Cannot be set in conjunction with <code>hstsValue</code></li>
      </ul>
  </td>
  <td><code>true</code></td>
</tr>
<tr>
  <td><code>.hsts-value</code></td>
  <td>
      A custom value for the header can be specified.<br><br>
      <strong>Note:</strong>
      <ul>
        <li>Is ignored when <code>hstsDisabled</code> is <code>true</code></li>
        <li>Cannot be set in conjunction with <code>hstsMaxAge</code> or
        <code>hstsIncludeSubdomainsDisabled</code></li>
      </ul>
  </td>
  <td><code>max-age=31536000</code></td>
</tr>

<tr id="auth-cache">
  <td rowspan="3"><code>eximeebpms.bpm.webapp.auth.cache</code></td>
</tr>
<tr>
  <td><code>.ttl-enabled</code></td>
  <td>
    The <a href="{{< ref "/webapps/shared-options/authentication.md#time-to-live" >}}">authentication cache time to live</a> can be entirely disabled if set to <code>false</code>. I. e., authentication information is cached for the lifetime of the HTTP session.<br>
    Allowed set of values is <code>true</code> and <code>false</code>.
  </td>
  <td><code>true</code></td>
</tr>
<tr>
  <td><code>.time-to-live</code></td>
  <td>
    A number of milliseconds, while the web apps reuse the cache for an HTTP session before they recreate it and query for the authentication information again from the database.<br><br>
    The allowed set of values:
    <ul>
      <li>a time duration in milliseconds between <code>1</code> and <code>2<sup>63</sup>-1</code></li>
      <li><code>0</code> which effectively leads to querying for the authentication information on each REST API request</li>
    </ul>
    <strong>Note:</strong> Ignored when <code>.enabled</code> is set to <code>false</code></li>
  </td>
  <td><code>300,000</code></td>
</tr>

<tr><td colspan="4"><b>Authorization</b></td></tr>
<tr>
<td rowspan="4"><code>eximeebpms.bpm.authorization</code></td>
<td><code>.enabled</code></td>
<td>Enables authorization</td>
<td><i>EximeeBPMS default value</i></td>
</tr>

<tr>
<td><code>.enabled-for-custom-code</code></td>
<td>Enables authorization for custom code</td>
<td><i>EximeeBPMS default value</i></td>
</tr>

<tr>
<td><code>.authorization-check-revokes</code></td>
<td>Configures authorization check revokes</td>
<td><i>EximeeBPMS default value</i></td>
</tr>

<tr>
<td><code>.tenant-check-enabled</code></td>
<td>Performs tenant checks to ensure that an authenticated user can only access data that belongs to one of his tenants.</td>
<td><code>true</code></td>
</tr>

<tr><td colspan="4"><b>Admin User</b></td></tr>
<tr>
<td rowspan="3"><code>eximeebpms.bpm.admin-user</code></td>
<td><code>.id</code></td>
<td>The username (e.g., 'admin')</td>
<td>-</td>
</tr>

<tr>
<td><code>.password</code></td>
<td>The initial password</td>
<td>=<code>id</code></td>
</tr>

<tr>
<td><code>.firstName</code>, <code>.lastName</code>, <code>.email</code></td>
<td>Additional (optional) user attributes</td>
<td>Defaults to value of 'id'</td>
</tr>

<tr><td colspan="4"><b>Filter</b></td></tr>
<tr>
<td><code>eximeebpms.bpm.filter</code></td>
<td><code>.create</code></td>
<td>Name of a "show all" filter. If set, a new filter is created on start that displays all tasks. Useful for testing on h2 db.</td>
<td>-</td>
</tr>

<tr>
  <td colspan="4">
    <b>OAuth2</b>
  </td>
</tr>
<tr>
  <td rowspan="3"><code>eximeebpms.bpm.oauth2.identity-provider</code></td>
  <td><code>.enabled</code></td>
  <td>Enables the OAuth2 identity provider.</td>
  <td><code>true</code></td>
</tr>
<tr>
  <td><code>.group-name-attribute</code></td>
  <td>Enables and configures the OAuth2 Granted Authorities Mapper.</td>
  <td>-</td>
</tr>
<tr>
  <td><code>.group-name-delimiter</code></td>
  <td>
    Configures the delimiter used in the OAuth2 Granted Authorities Mapper.
    It's only used if the configured <code>group-name-attribute</code> contains <code>String</code> value.
  </td>
  <td><code>,</code> (comma)</td>
</tr>
<tr>
  <td rowspan="2"><code>eximeebpms.bpm.oauth2.sso-logout</code></td>
  <td><code>.enabled</code></td>
  <td>Activates the client initiated OIDC logout feature.</td>
  <td><code>false</code></td>
</tr>
<tr>
  <td><code>.post-logout-redirect-uri</code></td>
  <td>Configures the URI the user is redirected after SSO logout from the provider.</td>
  <td><code>{baseUrl}</code></td>
</tr>

</table>


### Generic Properties

The method of configuration described above does not cover all process engine properties available. To override any process engine configuration
property that is not exposed (i.e. listed above) you can use generic-properties.

```yaml
eximeebpms:
  bpm:
    generic-properties:
      properties:
        ...
```

{{< note title="Note:" class="info" >}}
  Overriding an already exposed property using the <code>generic-properties</code>
  keyword does not effect the process engine configuration. All exposed properties
  can only be overridden with their exposed identifier.
{{< /note >}}

### Examples
Override configuration using exposed properties:

```yaml
eximeebpms.bpm:
  admin-user:
    id: kermit
    password: superSecret
    firstName: Kermit
  filter:
    create: All tasks
```
Override configuration using generic properties:

```yaml
eximeebpms:
  bpm:
    generic-properties:
      properties:
        enable-password-policy: true
```

## Session Cookie

You can configure the **Session Cookie** for the Spring Boot application via the `application.yaml` configuration file.

EximeeBPMS Spring Boot Starter versions <= 2.3 (Spring Boot version 1.x)

```yaml
server:
  session:
    cookie:
      secure: true
      http-only: true # Not possible for versions before 1.5.14
```

EximeeBPMS Spring Boot Starter versions >= 3.0 (Spring Boot version 2.x)

```yaml
server:
  servlet:
    session:
      cookie:
        secure: true
        http-only: true # Not possible for versions before 2.0.3
```

Further details of the session cookie like the `SameSite` flag can be configured via
[eximeebpms.bpm.webapp.session-cookie]({{< ref "/user-guide/spring-boot-integration/configuration.md#session-cookie" >}}) in the `application.yaml`.

# Configuring Spin DataFormats

The EximeeBPMS Spring Boot Starter auto-configures the Spin Jackson Json DataFormat when the
`eximeebpms-spin-dataformat-json-jackson` dependency is detected on the classpath. To include a
`DataFormatConfigurator` for the desired Jackson Java 8 module, the appropriate dependency needs
to be included on the classpath as well. Note that `eximeebpms-engine-plugin-spin`
needs to be included as a dependency as well for the auto-configurators to work.

Auto-configuration is currently supported for the following [Jackson Java 8 modules](https://github.com/FasterXML/jackson-modules-java8):

1. Parameter names (`jackson-module-parameter-names`)
2. Java 8 Date/time (`jackson-datatype-jdk8`)
3. Java 8 Datatypes (`jackson-datatype-jsr310`)

{{< note title="Heads Up!" class="warning" >}}
The Spin Jackson Json DataFormat auto-configuration is disabled when using
`eximeebpms-spin-dataformat-all` as a dependency. The `eximeebpms-spin-dataformat-all` artifact shades the
Jackson libraries, which breaks compatibility with the regular Jackson modules. If usage of
`eximeebpms-spin-dataformat-all` is necessary, please use the standard method for
[Spin Custom DataFormat configuration]({{< ref "/reference/spin/extending-spin.md#custom-dataformats" >}}).
{{< /note >}}

For example, to provide support for Java 8 Date/time types in Spin, the following dependencies, with their
appropriate version tags, will need to be added in the Spring Boot Application's
`pom.xml` file:

 ```xml
<dependencies>
    <dependency>
      <groupId>org.eximeebpms.bpm</groupId>
      <artifactId>eximeebpms-engine-plugin-spin</artifactId>
    </dependency>
    <dependency>
      <groupId>org.eximeebpms.spin</groupId>
      <artifactId>eximeebpms-spin-dataformat-json-jackson</artifactId>
    </dependency>
    <dependency>
      <groupId>com.fasterxml.jackson.datatype</groupId>
      <artifactId>jackson-datatype-jdk8</artifactId>
    </dependency>
</dependencies>
```

Spring Boot also provides some nice configuration properties, to further
configure the Jackson `ObjectMapper`. They can be found [here](https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/#howto-customize-the-jackson-objectmapper).

To provide additional configurations, the following actions need to be performed:

1. Provide a custom implementation of `org.eximeebpms.spin.spi.DataFormatConfigurator`;
1. Add the appropriate key-value pair of the fully qualified classnames of the interface and the
   implementation to the `META-INF/spring.factories` file;
1. Ensure that the artifact containing the configurator is reachable from Spin’s classloader.
