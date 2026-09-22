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

* Apache Tomcat 11.0 (Tomcat 9.0 support removed in Community Edition as of 1.4.0, having been deprecated since 1.3.0; already removed in Enterprise Edition as of 1.2.18-ee — see the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}}))
  * The `eximeebpms-bpm-tomcat` **distribution** ships and is supported on Tomcat 11.0. The **web application archives** (`eximeebpms-webapp-tomcat-jakarta`, `eximeebpms-engine-rest-jakarta`) also deploy and run on a Tomcat **10.1** container you manage yourself — verified against Tomcat 10.1.50 on 2026-09-15; both declare a Servlet 3.0 descriptor and use no Servlet 6.1 feature.
* JBoss EAP 7.4 / 8.0
* WildFly Application Server 41.0 (see the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}}) for the exact patch release)

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

## Verified in continuous integration

"Supported" above and "exercised by our automated tests" are not the same list, and this section states the
difference rather than leaving it to be inferred. Everything in the list above is supported; the table below
says which of it the integration suites actually run against, and at which version.

| Database | Version exercised in CI | When |
|---|---|---|
| H2 | 2.4.240 (embedded) | Every nightly run |
| PostgreSQL | `postgres:13` | Every nightly run |
| MySQL | `mysql:8` | On request only (manual workflow run) |
| Microsoft SQL Server | `mcr.microsoft.com/mssql/server:2019-latest` | On request only (manual workflow run) |
| Oracle | — | Not exercised in CI |
| IBM DB2 | — | Not exercised in CI |
| Amazon Aurora PostgreSQL | — | Not exercised in CI |
| Microsoft Azure SQL | — | Not exercised in CI |

The integration suites run nightly against **H2 and PostgreSQL**; MySQL and SQL Server are part of the same
matrix but are selected explicitly when the workflow is started by hand. Two consequences worth stating plainly:

- The CI PostgreSQL image is the **13** line, below the PostgreSQL 14 minimum declared above. The supported range
  is not lowered by this: it reflects what the engine is built and released against, and the CI pin has simply not
  been raised alongside it.
- Oracle, IBM DB2, Aurora and Azure SQL are supported on the strength of the engine's database abstraction and the
  vendor JDBC drivers shipped with it, not on the strength of an automated suite running against them in this
  project's CI.

Nothing in the supported list changed in this release; no minimum version was raised.

## Database Clustering & Replication

Clustered or replicated databases are supported given the following conditions. The communication between EximeeBPMS and the database cluster has to match with the corresponding non-clustered / non-replicated configuration. It is especially important that the configuration of the database cluster guarantees the equivalent behavior of READ-COMMITTED isolation level.


# Web Browser

* Google Chrome latest
* Mozilla Firefox latest
* Microsoft Edge latest


# Java

* Java 21 and Java 25, in both editions. The Community Edition baseline moved from 17 to 21 in 1.4.0, matching the Enterprise Edition; JDK 25 was added as a supported runtime alongside it (see the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}})). Compatibility is tested with Eclipse Temurin JDK.

{{< note title="Supported runtime vs. build target" class="info" >}}
EximeeBPMS is compiled to **Java 21 bytecode** and runs on both **JDK 21** and **JDK 25** — the supported runtime and the build target are separate. Running on JDK 25 requires no change on your side: a JDK 25 JVM executes Java 21 bytecode.

The published [Docker images]({{< ref "/installation/docker.md" >}}) ship a JDK 25 runtime.
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
