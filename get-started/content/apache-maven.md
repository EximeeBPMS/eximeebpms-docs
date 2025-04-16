---

title: 'Apache Maven Coordinates'
weight: 13

menu:
  main:
    name: "Maven Coordinates"
    identifier: "get-started-maven"
    pre: "The most commonly used Apache Maven Coordinates for EximeeBPMS."

---

This page lists the most commonly used Apache Maven Coordinates for EximeeBPMS.

Most EximeeBPMS artifacts are pushed to [maven central](https://central.sonatype.com/).


# EximeeBPMS BOM (Bill of Materials)

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.eximeebpms.bpm</groupId>
      <artifactId>eximeebpms-bom</artifactId>
      <version>1.0.0</version>
      <scope>import</scope>
      <type>pom</type>
    </dependency>
  </dependencies>
</dependencyManagement>
```

{{< note title="Use the BOM!" class="info" >}}
  Please import the EximeeBPMS BOM if you use multiple EximeeBPMS projects. The BOM defines versions for all EximeeBPMS projects. This way it is ensured that no incompatible versions are imported.
{{< /note >}}


# EximeeBPMS Engine

```xml
<dependency>
  <groupId>org.eximeebpms.bpm</groupId>
  <artifactId>eximeebpms-engine</artifactId>
</dependency>
```


# EximeeBPMS Engine Spring Integration

The `eximeebpms-engine` Spring integration for Spring Framework 5:

```xml
<dependency>
  <groupId>org.eximeebpms.bpm</groupId>
  <artifactId>eximeebpms-engine-spring</artifactId>
</dependency>
```

The `eximeebpms-engine` Spring integration for Spring Framework 6:

```xml
<dependency>
  <groupId>org.eximeebpms.bpm</groupId>
  <artifactId>eximeebpms-engine-spring-6</artifactId>
</dependency>
```

# EximeeBPMS Engine CDI Integration

```xml
<dependency>
  <groupId>org.eximeebpms.bpm</groupId>
  <artifactId>eximeebpms-engine-cdi</artifactId>
</dependency>
```

# EximeeBPMS DMN Engine BOM (Bill of Materials)
This BOM allows to use the DMN engine standalone without the BPMN engine and the rest of the EximeeBPMS Platform.

```xml
<dependencyManagement>
  <dependency>
    <groupId>org.eximeebpms.bpm.dmn</groupId>
    <artifactId>eximeebpms-engine-dmn-bom</artifactId>
    <version>1.0</version>
    <type>pom</type>
    <scope>import</scope>
  </dependency>
</dependencyManagement>
```

# EximeeBPMS DMN
This dependency allows to use DMN engine standalone without the BPMN engine and the rest of the EximeeBPMS Platform.
It is not needed when using `eximeebpms-engine` because that already contains the DMN engine.

```xml
<dependency>
  <groupId>org.eximeebpms.bpm.dmn</groupId>
  <artifactId>eximeebpms-engine-dmn</artifactId>
</dependency>
```

# Process Application EJB Client

```xml
<dependency>
  <groupId>org.eximeebpms.bpm.javaee</groupId>
  <artifactId>eximeebpms-ejb-client</artifactId>
</dependency>
```

# EximeeBPMS Artifact Storage

In order to browse the EximeeBPMS artifacts, here are the link you can use.
[eximeebpms.org/download/](https://eximeebpms.org/download/). 


# Other EximeeBPMS Modules:

* [DMN Engine](/manual/latest/user-guide/dmn-engine/embed/#maven-coordinates)
* [EximeeBPMS Spin](/manual/latest/reference/spin)
* [EximeeBPMS Connect](/manual/latest/reference/connect/#maven-coordinates)
* [Templating Engines](/manual/latest/user-guide/process-engine/templating/#install-a-template-engine-for-an-embedded-process-engine)
* [Spring Boot Integration](/manual/latest/user-guide/spring-boot-integration/)
