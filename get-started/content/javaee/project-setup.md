---

title: 'Setup a Jakarta EE Project'
weight: 10

menu:
  main:
    name: "Project Setup"
    parent: "get-started-javaee"
    identifier: "get-started-javaee-project-setup"
    pre: "Set up a Jakarta EE process application as an Apache Maven Project."

---

First, let's set up the project in the IDE of your choice, the following description uses Eclipse.

# Requirements

The project requires Java 17 or later, and a Jakarta EE 10-compliant application server. This tutorial deploys
to [WildFly](https://www.wildfly.org/) 40.

# Set Up a Java Project

## Create a new Maven Project

Create a new Maven WAR project, either using Eclipse's *File > New > Maven Project* wizard, or by hand.

## Add EximeeBPMS Platform & Jakarta EE Dependencies

We import the `eximeebpms-bom` via dependency management, and declare a `provided` dependency on
`eximeebpms-engine` (the application server already provides the process engine via its EximeeBPMS
subsystem), a dependency on `eximeebpms-engine-cdi-jakarta` for the CDI integration, a dependency on
`eximeebpms-ejb-client-jakarta` (which provides a default `EjbProcessApplication`), and a `provided` dependency
on the Jakarta EE 10 Web Profile specification API:

```xml
<properties>
  <eximeebpms.version>1.3.0</eximeebpms.version>
  <maven.compiler.release>17</maven.compiler.release>
</properties>

<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.eximeebpms.bpm</groupId>
      <artifactId>eximeebpms-bom</artifactId>
      <version>${eximeebpms.version}</version>
      <scope>import</scope>
      <type>pom</type>
    </dependency>
  </dependencies>
</dependencyManagement>

<dependencies>

  <!-- eximeebpms engine dependency -->
  <dependency>
    <groupId>org.eximeebpms.bpm</groupId>
    <artifactId>eximeebpms-engine</artifactId>
    <scope>provided</scope>
  </dependency>

  <!-- eximeebpms cdi beans -->
  <dependency>
    <groupId>org.eximeebpms.bpm</groupId>
    <artifactId>eximeebpms-engine-cdi-jakarta</artifactId>
  </dependency>

  <!-- provides a default EjbProcessApplication -->
  <dependency>
    <groupId>org.eximeebpms.bpm.javaee</groupId>
    <artifactId>eximeebpms-ejb-client-jakarta</artifactId>
  </dependency>

  <!-- Jakarta EE 10 Web Profile Specification -->
  <dependency>
    <groupId>jakarta.platform</groupId>
    <artifactId>jakarta.jakartaee-web-api</artifactId>
    <version>10.0.0</version>
    <type>pom</type>
    <scope>provided</scope>
  </dependency>
</dependencies>
```

## Build and Deploy

Build the WAR file with `mvn package` and deploy it to WildFly. At this point, the application does not yet
declare any process, so it just installs cleanly.
