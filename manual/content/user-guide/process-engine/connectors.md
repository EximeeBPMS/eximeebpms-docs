---

title: 'Connectors'
weight: 100

menu:
  main:
    identifier: "user-guide-process-engine-connectors"
    parent: "user-guide-process-engine"

---


With the dependency [eximeebpms-connect](https://github.com/camunda/camunda-bpm-platform/tree/master/connect), the process engine supports simple
connectors. Currently the following connector implementations exist:

<table class="table">
  <tr>
    <th>Connector</th>
    <th>ID</th>
  </tr>
  <tr>
    <td>REST HTTP</td>
    <td>http-connector</td>
  </tr>
  <tr>
    <td>SOAP HTTP</td>
    <td>soap-http-connector</td>
  </tr>
</table>

It is also possible to implement your own custom connector in eximeebpms. For more information about extending connectors please visit the [Connector reference]({{< ref "/reference/connect/extending-connect.md" >}}). 


# Configure EximeeBPMS Connect

As EximeeBPMS Connect is available only partially when using the process engine (check the list below). With a pre-built distribution, EximeeBPMS Connect is already preconfigured.

The following `connect` artifacts exist:

* `eximeebpms-connect-core`: a jar that contains only the core Connect classes. The artifact already is available as dependency to the process engine. In addition to `eximeebpms-connect-core`, single connector implementations like `eximeebpms-connect-http-client` and `eximeebpms-connect-soap-http-client` exist. These dependencies should be used when the default connectors have to be reconfigured or when custom connector implementations are used.
* `eximeebpms-connect-connectors-all`: a single jar without dependencies that contains the HTTP and SOAP connectors.
* `eximeebpms-engine-plugin-connect`: a process engine plugin to add Connect to EximeeBPMS.


# Maven Coordinates

{{< note title="" class="info" >}}
  Please import the [EximeeBPMS BOM](/eximeebpms-docs/get-started/apache-maven/) to ensure correct versions for every EximeeBPMS project.
{{< /note >}}


## eximeebpms-connect-core

`eximeebpms-connect-core` contains the core classes of Connect. Additionally, the HTTP and SOAP connectors can be added with the dependencies `eximeebpms-connect-http-client` and `eximeebpms-connect-soap-http-client`. These artifacts will transitively pull in their dependencies, like Apache HTTP client. For integration with the engine, the artifact `eximeebpms-engine-plugin-connect` is needed. Given that the BOM is imported, the Maven coordinates are as follows:

```xml
<dependency>
  <groupId>org.eximeebpms.connect</groupId>
  <artifactId>eximeebpms-connect-core</artifactId>
</dependency>
```

```xml
<dependency>
  <groupId>org.eximeebpms.connect</groupId>
  <artifactId>eximeebpms-connect-http-client</artifactId>
</dependency>
```

```xml
<dependency>
  <groupId>org.eximeebpms.connect</groupId>
  <artifactId>eximeebpms-connect-soap-http-client</artifactId>
</dependency>
```

```xml
<dependency>
  <groupId>org.eximeebpms.bpm</groupId>
  <artifactId>eximeebpms-engine-plugin-connect</artifactId>
</dependency>
```


## eximeebpms-connect-connectors-all

This artifact contains the HTTP and SOAP connectors as well as their dependencies. To avoid conflicts with other versions of these dependencies, the dependencies are relocated to different packages. `eximeebpms-connect-connectors-all` has the following Maven coordinates:

```xml
<dependency>
  <groupId>org.eximeebpms.connect</groupId>
  <artifactId>eximeebpms-connect-connectors-all</artifactId>
</dependency>
```


## Configure the Process Engine Plugin

`eximeebpms-engine-plugin-connect` contains a class called `org.eximeebpms.connect.plugin.impl.ConnectProcessEnginePlugin` that can be registered with a process engine using the [plugin mechanism]({{< ref "/user-guide/process-engine/process-engine-plugins.md" >}}). For example, a `bpm-platform.xml` file with the plugin enabled would look as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform xmlns="http://eximeebpms.org/schema/1.0/BpmPlatform"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://eximeebpms.org/schema/1.0/BpmPlatform http://eximeebpms.org/schema/1.0/BpmPlatform ">
  ...
  <process-engine name="default">
    ...
    <plugins>
      <plugin>
        <class>org.eximeebpms.connect.plugin.impl.ConnectProcessEnginePlugin</class>
      </plugin>
    </plugins>
    ...
  </process-engine>
</bpm-platform>
```

{{< note title="" class="info" >}}
  When using a pre-built distribution of EximeeBPMS, the plugin is already pre-configured.
{{< /note >}}


# Use Connectors

To use a connector, you have to add the EximeeBPMS extension element [connector]({{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#camunda-connector" >}}). The connector is configured by a unique [connectorId]({{< ref "/reference/bpmn20/custom-extensions/extension-elements.md#camunda-connectorid" >}}), which specifies the used connector implementation. The ids of the currently supported connectors can be found at the beginning of this section. Additionally, an [input/output mapping]({{< ref "/user-guide/process-engine/variables.md#input-output-variable-mapping" >}}) is used to configure the connector. The required input parameters and the available output parameters depend on the connector implementation. Additional input parameters can also be provided to be used within the connector.

As an example, a shortened configuration of the EximeeBPMS SOAP connector implementation is shown. A complete [example](https://github.com/camunda/camunda-bpm-examples/tree/master/servicetask/soap-service) can be found in the [EximeeBPMS examples repository](https://github.com/camunda/camunda-bpm-examples) on GitHub.

```xml
<serviceTask id="soapRequest" name="Simple SOAP Request">
  <extensionElements>
    <eximeebpms:connector>
      <eximeebpms:connectorId>soap-http-connector</eximeebpms:connectorId>
      <eximeebpms:inputOutput>
        <eximeebpms:inputParameter name="url">
          http://example.com/webservice
        </eximeebpms:inputParameter>
        <eximeebpms:inputParameter name="payload">
          <![CDATA[
            <soap:Envelope ...>
              ... // the request envelope
            </soap:Envelope>
          ]]>
        </eximeebpms:inputParameter>
        <eximeebpms:outputParameter name="result">
          <![CDATA[
            ... // process response body
          ]]>
        </eximeebpms:outputParameter>
      </eximeebpms:inputOutput>
    </eximeebpms:connector>
  </extensionElements>
</serviceTask>
```

A full [example](https://github.com/camunda/camunda-bpm-examples/tree/master/servicetask/rest-service) of the REST connector can also be found in the [EximeeBPMS examples repository](https://github.com/camunda/camunda-bpm-examples) on GitHub.
