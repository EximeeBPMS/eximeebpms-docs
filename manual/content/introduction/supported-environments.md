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
  Please note that the environments listed in this section depend on the version of EximeeBPMS. Please select the corresponding version of this documentation to see the environment that fits to your version of EximeeBPMS. e.g., [supported environments for version 1.00](http://docs.camunda.org/7.15/guides/user-guide/#introduction-supported-environments)
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

* Apache Tomcat 9.0 / 10.1
* JBoss EAP 7.4 / 8.0
* WildFly Application Server 33.0 / 35.0

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
* H2 2.3 (not recommended for [Cluster Mode]({{< ref "/introduction/architecture.md#clustering-model" >}}) - see [Deployment Note]({{< ref "/user-guide/process-engine/deployments.md" >}}))

## Database Clustering & Replication

Clustered or replicated databases are supported given the following conditions. The communication between EximeeBPMS and the database cluster has to match with the corresponding non-clustered / non-replicated configuration. It is especially important that the configuration of the database cluster guarantees the equivalent behavior of READ-COMMITTED isolation level.


# Web Browser

* Google Chrome latest
* Mozilla Firefox latest
* Microsoft Edge latest


# Java

* Java 11 / 17 / 21 (Compatibility is tested with Eclipse Temurin JDK)


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
