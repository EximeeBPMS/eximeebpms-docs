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

* MySQL 8.0 / 8.4
* MariaDB 11.4 / 12.3 (long-term support releases; MariaDB is served by the MySQL dialect)
* Oracle 19c / 23ai
* IBM DB2 11.5 (excluding IBM z/OS for all versions)
* PostgreSQL 14 / 15 / 16 / 17 / 18
* Amazon Aurora PostgreSQL compatible with PostgreSQL 14 / 15 / 16
* Microsoft SQL Server 2017 / 2019 / 2022 / 2025 (see [Configuration Note]({{< ref "/user-guide/process-engine/database/mssql-configuration.md" >}}))
* Microsoft Azure SQL with EximeeBPMS-supported SQL Server compatibility levels 
  (see [Configuration Note]({{< ref "/user-guide/process-engine/database/mssql-configuration.md#azure-sql-compatibility-levels-supported-by-camunda" >}})): 
  * SQL Server on Azure Virtual Machines
  * Azure SQL Managed Instance
  * Azure SQL Database
* H2 2.4 (Community and Enterprise Edition — see the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}})) (not recommended for [Cluster Mode]({{< ref "/introduction/architecture.md#clustering-model" >}}) - see [Deployment Note]({{< ref "/user-guide/process-engine/deployments.md" >}}))

### Vendor support timeline

Every version listed above, with the date its own vendor stops supporting it. These are the
vendors' dates, not EximeeBPMS's: a version reaching its end of life here does not stop working,
but it stops receiving security fixes from the party that builds it, which is usually the reason
to plan a move.

| Version | Vendor end of life | Notes |
|---|---|---|
| MySQL 8.0 | 2026-04-30 | **Deprecated** — already past end of life, planned for removal in a future release. Use 8.4. |
| MySQL 8.4 | 2032-04-30 | LTS. Extended support only from 2029-04-30. |
| MariaDB 11.4 | 2029-05-29 | LTS. |
| MariaDB 12.3 | 2029-06-12 | LTS. Rolling releases such as 13.0 are deliberately not declared — they are superseded within months. |
| Oracle 19c | 2029-12-31 | |
| Oracle 23ai | 2031-12-31 | |
| IBM DB2 11.5 | 2027-04-30 | IBM's current line is 12.1; it is not declared here. |
| PostgreSQL 14 | 2026-11-12 | **Deprecated** — planned for removal in a future release. Use 15 or later. |
| PostgreSQL 15 | 2027-11-11 | |
| PostgreSQL 16 | 2028-11-09 | |
| PostgreSQL 17 | 2029-11-08 | |
| PostgreSQL 18 | 2030-11-14 | |
| Microsoft SQL Server 2017 | 2027-10-12 | Extended support only since 2022-10-11. |
| Microsoft SQL Server 2019 | 2030-01-08 | Extended support only since 2025-02-28. |
| Microsoft SQL Server 2022 | 2033-01-11 | Mainstream support until 2028-01-11. |
| Microsoft SQL Server 2025 | 2036-01-06 | Mainstream support until 2031-01-06. |
| H2 2.4 | — | H2 publishes no lifecycle policy, so no end-of-life date can be stated. |

Amazon Aurora PostgreSQL and Microsoft Azure SQL are managed services and follow their own
provider schedules rather than the PostgreSQL and SQL Server dates above; check the provider's
own lifecycle documentation for the version your instance runs.

## Verified in continuous integration

"Supported" above and "exercised by our automated tests" are not the same list, and this section states the
difference rather than leaving it to be inferred. Everything in the list above is supported; the table below
says which of it the integration suites actually run against, and at which version.

| Database | Version exercised in CI | When |
|---|---|---|
| H2 | 2.4.240 (embedded) | Every weekday night |
| PostgreSQL | `postgres:18` | Every weekday night |
| MySQL | `mysql:8.4` | Weekly |
| MariaDB | `mariadb:12.3` | Weekly |
| Microsoft SQL Server | `mcr.microsoft.com/mssql/server:2025-latest` | Weekly |
| Oracle | — | On request only (not part of the automated matrix) |
| IBM DB2 | — | On request only (not part of the automated matrix) |
| Amazon Aurora PostgreSQL | — | Not exercised in CI |
| Microsoft Azure SQL | — | Not exercised in CI |

The integration suites run every weekday night against **H2 and PostgreSQL**, weekly against **MySQL, MariaDB
and SQL Server**, and weekly across the full set of test suites. Three points worth stating plainly:

- Every image above now sits inside the supported range declared in this page. Earlier releases pinned CI to
  `postgres:13`, below the declared minimum; that discrepancy is resolved.
- Oracle and IBM DB2 are not part of the automated matrix, but a run against either takes one command rather
  than a hand-provisioned server: every database in this page except Aurora and Azure SQL now has a Testcontainers
  coordinate, so `mvn test -f engine/pom.xml -P<database>,testcontainers` starts the container itself. They are
  otherwise supported on the strength of the engine's database abstraction and the vendor JDBC drivers shipped
  with it.
- Independently of the matrix, **every build** starts a real PostgreSQL container and connects the engine to it,
  which is what keeps the Testcontainers wiring from silently rotting. The equivalent check for the other six
  databases pulls roughly 6 GB of images, so it is opt-in rather than per-build.
- Amazon Aurora PostgreSQL and Microsoft Azure SQL are supported on the same basis, with no on-demand path.

Schema creation was additionally verified outside CI by applying the engine's `create` scripts unchanged to
PostgreSQL 17 and 18, MySQL 8.4, MariaDB 11.4, 12.3 and 13.0, SQL Server 2017, 2019, 2022 and 2025, Oracle
Database Free 23 and IBM DB2 11.5.9.0. All produce the full 46-table schema. Oracle and DB2 did not until this
release: the business-event table's definition was rejected outright by Oracle, and its index by DB2 — see the
release notes.

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
