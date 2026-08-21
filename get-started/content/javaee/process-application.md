---

title: 'Configure the Process Application'
weight: 20

menu:
  main:
    name: "Process Application"
    parent: "get-started-javaee"
    identifier: "get-started-javaee-process-application"
    pre: "Declare the process archive, persistence unit, and enable CDI and JSF for the application."

---

WildFly already runs a shared EximeeBPMS process engine via its EximeeBPMS subsystem, so our application does
not configure an engine itself - it only needs to declare itself as a process archive, and enable the Jakarta
EE facilities it uses.

# Declare the Process Archive

`META-INF/processes.xml` declares a process archive that is scanned for process definitions and deployed
against the shared, default process engine:

```xml
<process-application
  xmlns="http://www.camunda.org/schema/1.0/ProcessApplication"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <process-archive name="pizza-order">
    <process-engine>default</process-engine>
    <properties>
      <property name="isDeleteUponUndeploy">true</property>
      <property name="isScanForProcessDefinitions">true</property>
    </properties>
  </process-archive>

</process-application>
```

# Declare a Persistence Unit

`META-INF/persistence.xml` declares a JPA persistence unit backed by the `ProcessEngine` datasource that
WildFly's EximeeBPMS subsystem already provides under the JNDI name `java:jboss/datasources/ProcessEngine`:

```xml
<persistence version="2.0"
  xmlns="http://java.sun.com/xml/ns/persistence" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="
        http://java.sun.com/xml/ns/persistence
        http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd">

  <persistence-unit name="primary">
    <jta-data-source>java:jboss/datasources/ProcessEngine</jta-data-source>
    <properties>
      <property name="hibernate.hbm2ddl.auto" value="create-drop" />
      <property name="hibernate.show_sql" value="true" />
    </properties>
  </persistence-unit>

</persistence>
```

# Enable CDI and JSF

`WEB-INF/beans.xml` is an empty CDI marker file that enables CDI bean discovery for the WAR:

```xml
<!-- intentionally empty -->
```

`WEB-INF/faces-config.xml` enables the Faces Servlet:

```xml
<faces-config version="2.0" xmlns="http://java.sun.com/xml/ns/javaee"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
         http://java.sun.com/xml/ns/javaee/web-facesconfig_2_0.xsd">

</faces-config>
```

## Build and Deploy

Rebuild and redeploy the WAR file.
