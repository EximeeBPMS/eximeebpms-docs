---

title: "Install the Database Schema"
weight: 03

menu:
  main:
    name: "Database Schema"
    identifier: "installation-guide-database-schema"
    parent: "installation-guide"
    pre: "Install and update the EximeeBPMS database schema used by the Process Engine."

---

This document will guide you through the installation and update of the EximeeBPMS [database schema]({{< ref "/user-guide/process-engine/database/database-schema.md" >}}) used by the process engine.
Regardless of the [architecture of your application setup]({{< ref "/introduction/architecture.md" >}}), the process engine always requires this database schema.
In a production environment, we recommend setting up this schema yourself and reference the prepared database instance in your application configuration.
Consult the installation guide related to your setup to configure the database for a [remote engine]({{< ref "/installation/eximeebpms-bpm-run.md" >}}), [shared engine]({{< ref "/installation/full/_index.md" >}}), or [embedded engine]({{< ref "/installation/spring-boot.md" >}}) accordingly.

This guide will not detail how to set up an instance of your target database or how to create a schema object on it.
Consult the documentation of your target database on how to do that.
EximeeBPMS supports a variety of databases that are documented in the [supported environments]({{< ref "/introduction/supported-environments.md#databases" >}}). 

EximeeBPMS supports the following ways of installing the database schema:

* Use the database migration tool [Liquibase](https://www.liquibase.org/) with the provided changelog for a semi-automatic installation and update. Liquibase keeps track of database schema changes. This allows you to focus on *when* changes should be applied rather than also on *which* changes are relevant.
* Use the provided SQL scripts with the tools related to your database for a fully manual installation and update. A manual procedure allows you to fully control the SQL statements that are executed on your database instance and to adjust those statements to your needs if necessary.

{{< note title="Isolation level" class="info" >}}
READ COMMITED is the required isolation level for database systems to run EximeeBPMS with. 
You may have to change the default setting on your database when installing EximeeBPMS. 
For more information see the documentation on [isolation levels]({{< ref "/user-guide/process-engine/database/database-configuration.md#isolation-level-configuration" >}}).
{{< /note >}}

# Installation

You can either install your database schema using Liquibase or using the provided SQL scripts manually. You can switch between those mechanisms when updating your EximeeBPMS version at a later stage if desired.
However, this might come with additional preparation work to work reliably. 
The [update](#update) paragraph provides more details on this topic.

## Liquibase installation

EximeeBPMS comes with a maintained changelog file that Liquibase can consume.
This changelog defines which SQL statements to execute on a database.
You can find the changelog and its referenced resources on our [Artifact Repository].
Select the respective version (`$PLATFORM_VERSION`) and download the resources as a `zip` or `tar.gz` file.
Open the `eximeebpms-sql-scripts-$PLATFORM_VERSION/liquibase` folder to find the changelog. 
In case you are using a [pre-packaged distribution], the Liquibase resources already reside in the `sql/liquibase` folder of the distribution.

The `liquibase` folder contains the following resources:

* `eximeebpms-changelog.xml`
* `baseline` directory

Liquibases uses these resources in combination with the scripts in the `upgrade` folder next to the `liquibase` folder to install the schema.

Perform the following steps to install the database schema on your database instance:

1. Setup Liquibase, e.g. by [downloading Liquibase CLI](https://www.liquibase.org/download)
1. Run Liquibase's [update command](https://docs.liquibase.com/commands/community/update.html) referencing the `eximeebpms-changelog.xml`.
You can pass on the connection details to your database instance via parameters as described in the Liquibase documentation or [create a properties file](https://docs.liquibase.com/workflows/liquibase-community/creating-config-properties.html).

Liquibase creates two additional tables to keep track of the changes that have been applied to your database.
The `DATABASECHANGELOG` table keeps track of all applied changes. The `DATABASECHANGELOGLOCK` table prevents conflicts from concurrent updates on your database instance by multiple Liquibase instances. You can read more about it in the [Liquibase guide](https://www.liquibase.org/get-started/how-liquibase-works).

As you create the tables externally via Liquibase, you have to configure the engine to **not** create tables at startup as well.
Set the `databaseSchemaUpdate` property to `false` (or, in case you are using Oracle, to `noop`).
Consult the [manual installation guide]({{< ref "/installation/full/_index.md" >}}) of your distribution for further information on how to achieve that.

{{< note title="Heads Up!" class="info" >}}
Liquibase provides additional commands to preview all changes that will be applied by commands that execute SQL statements on a database. For the `update` command, you can execute the [updateSql](https://docs.liquibase.com/commands/community/updatesql.html) command. This will let you inspect all statements that Liquibase will issue on your database without actually executing them.

Furthermore, if you have defined a specific prefix for the entities of your database, you will have to manually adjust the `create` scripts in the `liquibase/baseline` directory accordingly so that the tables are created with the prefix.
{{< /note >}}

## Manual installation

To install the database schema required for EximeeBPMS, we provide a set of scripts with prepared DDL statements.
Those scripts create all required tables and default indices. You can find the provided SQL scripts on our [Artifact Repository]. 
Select the respective version (`$PLATFORM_VERSION`) and download the scripts as a `zip` or `tar.gz` file.
Open the `eximeebpms-sql-scripts-$PLATFORM_VERSION/create` folder to find all available scripts. 
In case you are using a [pre-packaged distribution], the SQL scripts already reside in the `sql/create` folder of the distribution.

The `create` folder contains the following SQL scripts:

* `$DATABASENAME_engine_$PLATFORM_VERSION.sql`
* `$DATABASENAME_identity_$PLATFORM_VERSION.sql`

There are individual SQL scripts for each supported database (`$DATABASENAME`).
Select the appropriate scripts for your database and run them with your database administration tool (e.g., SqlDeveloper for Oracle).

As you create the tables manually, you have to configure the engine to **not** create tables at startup as well.
Set the `databaseSchemaUpdate` property to `false` (or, in case you are using Oracle, to `noop`).
Consult the [manual installation guide]({{< ref "/installation/full/_index.md" >}}) of your distribution for further information on how to achieve that.

{{< note title="Heads Up!" class="info" >}}
If you have defined a specific prefix for the entities of your database, you will have to manually adjust the `create` scripts accordingly so that the tables are created with the prefix.
{{< /note >}}

# Update

Updating to a newer EximeeBPMS minor version also requires a database schema update. You can reuse all the options available for a [schema installation](#installation) here as well.
If you are switching from one option to another, you might need to perform additional preparation work to update reliably.
The individual sections on the mechanisms will provide details if necessary.

In case you are just updating to a newer patch level of your EximeeBPMS installation, a schema update might not be necessary.

## Liquibase update

This section assumes you are already set up with Liquibase as described in the [installation section](#liquibase-installation).
In case you have not set up Liquibase itself yet and want to update a database that you [manually installed](#manual-installation) and updated until now, please consult the [migration section](#migrate-to-liquibase) first.

EximeeBPMS comes with a maintained changelog file that Liquibase can consume.
This changelog helps Liquibase to keep track of the changes that have been made to your database already.
Based on that changelog and the tracking tables, Liquibase determines which changes it needs to apply when you instruct it to update your schema.

Perform the following steps to update the database schema on your database instance:

1. Select the respective version you want to update to (`$Y`) on our [Artifact Repository] and download the resources as a `zip` or `tar.gz` file.
Open the `eximeebpms-sql-scripts-$Y/liquibase` folder to find the changelog file.
In case you are using a [pre-packaged distribution], the Liquibase resources already reside in the `sql/liquibase` folder of the distribution with version `$Y`.
1. Run Liquibase's [update command](https://docs.liquibase.com/commands/community/update.html) referencing the new `eximeebpms-changelog.xml` of version `$Y`.
Liquibase takes care of determining the necessary changes and applying them to your database according to the new changelog.
You can pass on the connection details to your database instance via parameters as described in the Liquibase documentation or [create a properties file](https://docs.liquibase.com/workflows/liquibase-community/creating-config-properties.html).
1. We highly recommend updating to the latest patch version that is within the bounds of the new minor version you are updating to (`$Y`).

{{< note title="Dry run" class="info" >}}
Liquibase provides additional commands to preview all changes applied by commands that execute SQL statements on a database. For the `update` command, you can execute the [updateSql](https://docs.liquibase.com/commands/community/updatesql.html) command to inspect all statements that Liquibase will issue on your database without actually executing them.
{{< /note >}}

### Migrate to Liquibase

Liquibase provides workflows to update databases that were not set up using Liquibase from the very beginning.
For such a scenario to work, you need to populate a tracking table that represents the current state of your database with regards to the changelog file you want to update against.
In other words, you need to let Liquibase know which parts of the changelog your database already contains.

Perform the following steps to migrate your manual installation to Liquibase:

1. Setup Liquibase, e.g. by [downloading Liquibase CLI](https://www.liquibase.org/download)
1. Identify your current database schema version. You can extract this information from the `ACT_GE_SCHEMA_LOG` table.
Find the row with the highest value in the `ID_` column and use the value of this row's `VERSION_` column.
1. Run Liquibase's [changelogSyncToTag command](https://docs.liquibase.com/commands/community/changelogsynctotag.html) referencing the `eximeebpms-changelog.xml` and using your current database schema version as the tag.
You can pass on the connection details to your database instance via parameters as described in the Liquibase documentation or [create a properties file](https://docs.liquibase.com/workflows/liquibase-community/creating-config-properties.html).

Liquibase uses this information to create the tracking tables and mark all changesets until the tag you defined as executed.
Liquibase determines if there are any changes that it needs to apply to your database for any subsequent `update` commands.
You have migrated your manual installation to Liquibase.

## Manual update

Updating from your current minor version (`$X`) to its follow-up version (`$Y`) requires updating the database schema as well. 
Follow the outlined procedure to perform this update:

1. Check for [available database patch scripts](#patch-level-update") for your database that are within the bounds of your update path.
You can find the scripts on our [Artifact Repository].
Select the respective version you want to update to (`$Y`) and download the scripts as a `zip` or `tar.gz` file.
Open the `eximeebpms-sql-scripts-$Y/upgrade` folder to find all available scripts. 
In case you are using a [pre-packaged distribution], the SQL scripts already reside in the `sql/upgrade` folder of the distribution with version `$Y`.
We highly recommend executing these patches before updating.
Execute those related to your database type (`$DATABASENAME`) in ascending order by version number.
The naming pattern is `$DATABASENAME_engine_$X_patch_*.sql`.

1. Execute the corresponding update scripts named `$DATABASENAME_engine_$X_to_$Y.sql`.
The scripts update the database from one minor version to the next and change the underlying database structure. So make sure to backup your database in case there are any failures during the update process.

1. We highly recommend checking for any existing patch scripts for your database that are within the bounds of the new minor version you are updating to (`$Y`). Execute them in ascending order by version number. The procedure is the same as in step 1, only for the new minor version.

### Liquibase patch level update

EximeeBPMS comes with a maintained changelog file that Liquibase can consume.
This changelog helps Liquibase to keep track of the changes that have been made to your database already.
Based on that changelog and the tracking tables, Liquibase determines which changes it needs to apply when instructing it to update your schema.
Therefore, the procedure for patch-level updates is equivalent to that for [minor version updates](#liquibase-update).

### Manual patch level update

You can find the necessary scripts on our [Artifact Repository].
Select the respective patch version you want to update to (`$Y`) and download the scripts as a `zip` or `tar.gz` file.
Open the `eximeebpms-sql-scripts-$Y/upgrade` folder to find all available patch scripts.
In case you are using a [pre-packaged distribution], the SQL scripts reside in the `sql/upgrade` folder of the distribution you want to update to.

The patch scripts are named `$DATABASENAME_engine_$MINOR_patch_$A_to_$B`, with `$A` being the patch level version to update from, `$B` the patch level to update to, and `$MINOR` the minor version they are on, e.g., `7.16`.
If you do choose to apply a database patch, then you must apply all patch scripts that are within the bounds of your update path. This means if your current patch version is `X.X.1` and you update to `X.X.5` you have to execute all patch scripts first where `$A` &ge; `X.X.1` and `$B` &le; `X.X.5`.

<strong>Note:</strong> Some patches are provided for multiple versions. It is not required to execute them more than once. See the description of the [patch version list](#patch-level-update) for information on duplicate fixes.

[Artifact Repository]: https://artifacts.camunda.com/artifactory/camunda-bpm/org/camunda/bpm/distro/camunda-sql-scripts/
[pre-packaged distribution]: {{< ref "/introduction/downloading-eximeebpms.md#full-distribution" >}}
