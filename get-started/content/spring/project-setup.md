---

title: 'Setup a Spring Project'
weight: 10

menu:
  main:
    name: "Project Setup"
    parent: "get-started-spring"
    identifier: "get-started-spring-project-setup"
    pre: "Set up a plain Spring web application as an Apache Maven Project."

---

First, let's set up the project in the IDE of your choice, the following description uses Eclipse.

# Requirements

The project requires Java 17 or later.

# Set Up a Java Project

## Create a new Maven Project

Create a new Maven WAR project, either using Eclipse's *File > New > Maven Project* wizard, or by hand.

## Add EximeeBPMS Platform & Spring Dependencies

We import the `eximeebpms-bom` and the `spring-framework-bom` via dependency management, and declare
dependencies on `eximeebpms-engine`, `eximeebpms-engine-spring-6`, and the Spring modules the embedded process
engine configuration needs:

```xml
<properties>
  <eximeebpms.version>1.3.0</eximeebpms.version>
  <spring.version>7.0.8</spring.version>
  <h2.version>2.3.232</h2.version>
  <slf4j.version>2.0.18</slf4j.version>
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
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-framework-bom</artifactId>
      <version>${spring.version}</version>
      <scope>import</scope>
      <type>pom</type>
    </dependency>
  </dependencies>
</dependencyManagement>

<dependencies>
  <dependency>
    <groupId>org.eximeebpms.bpm</groupId>
    <artifactId>eximeebpms-engine</artifactId>
  </dependency>
  <dependency>
    <groupId>org.eximeebpms.bpm</groupId>
    <artifactId>eximeebpms-engine-spring-6</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-jdbc</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-tx</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-orm</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-web</artifactId>
  </dependency>
  <dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <version>${h2.version}</version>
  </dependency>
  <dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-jdk14</artifactId>
    <version>${slf4j.version}</version>
  </dependency>
</dependencies>
```

## Bootstrap a plain Spring Web Application Context

The `web.xml` bootstraps a plain Spring `AnnotationConfigWebApplicationContext`, pointed at a configuration
class we are about to write:

```xml
<context-param>
  <param-name>contextClass</param-name>
  <param-value>org.springframework.web.context.support.AnnotationConfigWebApplicationContext</param-value>
</context-param>
<context-param>
  <param-name>contextConfigLocation</param-name>
  <param-value>org.eximeebpms.bpm.getstarted.loanapproval.LoanApplicationContext</param-value>
</context-param>

<listener>
  <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
```

That configuration class is still empty at this point:

```java
@Configuration
public class LoanApplicationContext {

}
```

## Build and Run

Build the WAR file with `mvn package` and deploy it to a servlet container of your choice.
