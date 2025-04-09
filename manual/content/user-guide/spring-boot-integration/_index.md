---

title: "Spring Boot Integration"
weight: 55

menu:
  main:
    identifier: "user-guide-spring-boot-integration"
    parent: "user-guide"

---

The EximeeBPMS Engine can be used in a Spring Boot application by using provided Spring Boot starters.
Spring boot starters allow to enable behavior of your spring-boot application by adding dependencies to the classpath.

These starters will pre-configure the EximeeBPMS process engine, REST API and Web applications, so they can easily be used in a standalone process application.

If you are not familiar with [Spring Boot](http://projects.spring.io/spring-boot/), read the [getting started](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#getting-started) guide.

To enable EximeeBPMS auto configuration, add the following dependency to your ```pom.xml```:

```xml
<dependency>
  <groupId>org.eximeebpms.bpm.springboot</groupId>
  <artifactId>eximeebpms-bpm-spring-boot-starter</artifactId>
  <version>{{< minor-version >}}.0</version>
</dependency>
```

This will add the EximeeBPMS engine v.{{< minor-version >}}.0 to your dependencies.

Other starters that can be used are: 

* [`eximeebpms-bpm-spring-boot-starter-rest`](rest-api)
* [`eximeebpms-bpm-spring-boot-starter-webapp`](webapps)
* [`eximeebpms-bpm-spring-boot-starter-external-task-client`]({{< ref "/user-guide/ext-client/spring-boot-starter.md" >}})

# Using Enterprise Edition

To use EximeeBPMS Spring Boot Starter with EximeeBPMS EE you need to define the EE version of the webapp (`eximeebpms-bpm-spring-boot-starter-webapp-ee` instead of `eximeebpms-bpm-spring-boot-starter-webapp`), see also [Web Applications](webapps/):

```xml
<dependency>
  <groupId>org.eximeebpms.bpm.springboot</groupId>
  <artifactId>eximeebpms-bpm-spring-boot-starter-webapp-ee</artifactId>
  <version>{{< minor-version >}}.0-ee</version>
</dependency>
```

# Requirements

EximeeBPMS Spring Boot Starter requires Java 17.

# Supported deployment scenarios

Following deployment scenario is supported by EximeeBPMS:

* executable JAR with embedded Tomcat and one embedded process engine (plus Webapps when needed)

There are other possible variations that might also work, but are not tested by EximeeBPMS at the moment.
