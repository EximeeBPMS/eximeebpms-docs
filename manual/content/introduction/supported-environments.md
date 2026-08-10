---

title: 'Supported Environments'
weight: 40

menu:
  main:
    identifier: "user-guide-introduction-supported-environments"
    parent: "user-guide-introduction"

---


Run EximeeBPMS in every Java-runnable environment. EximeeBPMS is supported with our QA infrastructure in the following environments.

{{< note title="Supported Environments" class="info" >}}
  Please note that the environments listed in this section depend on the version of EximeeBPMS. Please select the corresponding version of this documentation to see the environment that fits to your version of EximeeBPMS.
{{< /note >}}


# Container/Application Server for Runtime Components

## Application-Embedded Process Engine

* All Java application servers
* EximeeBPMS Spring Boot Starter: Embedded Tomcat
  * [Supported versions]({{< ref "/user-guide/spring-boot-integration/version-compatibility.md" >}})
  * [Deployment scenarios]({{< ref "/user-guide/spring-boot-integration/_index.md#supported-deployment-scenarios" >}})
* EximeeBPMS Engine Quarkus Extension
  * [Supported versions]({{< ref "/user-guide/quarkus-integration/version-compatibility.md" >}})
  * [Deployment scenarios]({{< ref "/user-guide/quarkus-integration/_index.md#supported-deployment-scenarios" >}})

## Container-Managed Process Engine and EximeeBPMS Cockpit, Tasklist, Admin

* Apache Tomcat 10.1 (Tomcat 9.0 support removed in Community Edition as of 1.4.0, having been deprecated since 1.3.0; already removed in Enterprise Edition as of 1.2.18-ee — see the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}}))
* JBoss EAP 7.4 / 8.0
* WildFly Application Server 40.0 (Community and Enterprise Edition — see the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}}))

# Databases

## Supported Database Products

* MySQL  8.0
* Oracle 19c / 23ai
* IBM DB2 11.5 (excluding IBM z/OS for all versions)
* PostgreSQL 14 / 15 / 16 / 17
* Amazon Aurora PostgreSQL compatible with PostgreSQL 14 / 15 / 16
* Microsoft SQL Server 2017 / 2019 / 2022 (see [Configuration Note]({{< ref "/user-guide/process-engine/database/mssql-configuration.md" >}}))
* Microsoft Azure SQL with EximeeBPMS-supported SQL Server compatibility levels 
  (see [Configuration Note]({{< ref "/user-guide/process-engine/database/mssql-configuration.md#azure-sql-compatibility-levels-supported-by-camunda" >}})): 
  * SQL Server on Azure Virtual Machines
  * Azure SQL Managed Instance
  * Azure SQL Database
* H2 2.4 (Community and Enterprise Edition — see the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}})) (not recommended for [Cluster Mode]({{< ref "/introduction/architecture.md#clustering-model" >}}) - see [Deployment Note]({{< ref "/user-guide/process-engine/deployments.md" >}}))

## Database Clustering & Replication

Clustered or replicated databases are supported given the following conditions. The communication between EximeeBPMS and the database cluster has to match with the corresponding non-clustered / non-replicated configuration. It is especially important that the configuration of the database cluster guarantees the equivalent behavior of READ-COMMITTED isolation level.


# Web Browser

* Google Chrome latest
* Mozilla Firefox latest
* Microsoft Edge latest


# Java

* Java 11 / 17 (Community Edition) / 21 (Enterprise Edition — see the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}})) (Compatibility is tested with Eclipse Temurin JDK)

{{< note title="" class="info" >}}
As of Enterprise Edition 1.3.1-ee, the CI test matrix additionally verifies compatibility with **JDK 25**. This is compatibility testing ahead of a possible future baseline bump, not yet an officially supported target under the policy below — see the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}}).
{{< /note >}}


# Camunda Modeler

[Supported environments](https://docs.camunda.io/docs/reference/supported-environments/#camunda-modeler) for Camunda Modeler have moved to [docs.camunda.io](https://docs.camunda.io/).

## Adding Environments

Whenever a new version of one of the following environments is released, we target support of that new version with the next minor release of EximeeBPMS. A new released environment has to be available three months before the next EximeeBPMS minor release to be considered.

* Java Language (LTS)
* Spring Boot
* Wildfly Application Server
* Oracle Database (LTS)
* PostgreSQL

The exact release in which we support a new environment depends on factors such as the release date of the environment and the required implementation effort.

Version support for other environments is decided case by case, much of which is based on the demand in our user base.

## Removing Environments

Whenever a new version of one of the following environments is supported, we usually discontinue support of the oldest version with the same release:

* Wildfly Application Server

Note that we may decide to deviate from this policy on a case-by-case basis.
