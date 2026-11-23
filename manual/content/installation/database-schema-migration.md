---

title: "Automatic Schema Migration"
weight: 04

menu:
  main:
    name: "Automatic Schema Migration"
    identifier: "installation-guide-database-schema-migration"
    parent: "installation-guide"
    pre: "Let the engine or the schema migration tool bring the database schema to the engine's version."

---

The engine can bring an existing database schema to the version of its library by itself: at engine start with the
`databaseSchemaUpdate` value `auto`, or before a rollout with the schema migration tool `schema-migrate`. Both apply the
same upgrade scripts as the [manual and Liquibase routes]({{< ref "/installation/database-schema.md" >}}), including new
indexes, and both work from version 1.2 of the schema on. An older schema is refused; update it to 1.2 with the upgrade
scripts first.

# How the migration decides what to run

The migration does not trust the schema log `ACT_GE_SCHEMA_LOG` alone: a row there is written at the start of an upgrade
script, and a schema created by the create scripts carries none of the upgrade rows. Instead, it reads the database catalog
and checks the result of every statement of every upgrade script (a table, index or constraint present or absent, a column
type). It then runs only the statements whose result is missing, so a step that stopped halfway, or that an older release
applied in part, is completed. A step whose objects are all present but whose schema log row is missing gets the row.
A table that exists without the columns the script creates is refused: complete or restore it by hand.

Statements run in autocommit, in the order of the scripts. There is no rollback: if a statement fails, the statements
before it stay applied, the migration stops and names the step and the statement number, and the next run completes the
step. **Back up the database before a migration that contains a destructive or a heavy step** (both are listed by `status`
and marked in the preview).

# Values of `databaseSchemaUpdate`

| Value | At engine start |
|---|---|
| `auto` | Applies every missing upgrade step under a lock shared by all nodes, then starts. A database without EximeeBPMS tables gets them as with `true`. |
| `validate` | Refuses the start when a required upgrade step is missing; an index that was only deferred causes a warning. Changes nothing. |
| `false` | Starts and logs a warning (`ENGINE-03152`) that names the missing steps. Changes nothing. |
| `off` | No check, no change. |

See [Database Configuration]({{< ref "/user-guide/process-engine/database/database-configuration.md" >}}) for every value.
In YAML, quote `'off'`: an unquoted `off` is read as `false`.

`auto` suits development, test and small installations. For production, migrate before the rollout with the tool and run the
nodes with `validate` (see [Production rollout](#production-rollout)).

# Settings

Indexes on tables created in the same step use plain DDL because the tables are empty. Partial indexes use the script form. Unique indexes are never deferred: on existing tables they require online support, except when index mode is explicitly `off`.

| Engine property | Spring Boot and Run (`eximeebpms.bpm.database.`) | Default | Meaning |
|---|---|---|---|
| `schemaUpdateAllowDestructiveSteps` | `schema-update-allow-destructive-steps` | `false` | Allows a step that removes a feature with its data. The only such step is the removal of the CMMN tables in the update to 1.4; it is also refused while active case instances exist. |
| `schemaUpdateOnlineIndexes` | `schema-update-online-indexes` | `deferred` | `deferred`: new indexes are built online where the database and its edition allow it, otherwise left pending for a maintenance window while the other steps run. `preferred`: online where possible, otherwise plainly. `required`: online or refused. `off`: plainly. |
| `schemaUpdateStatementLockTimeoutSeconds` | `schema-update-statement-lock-timeout-seconds` | `30` | How long one statement waits for its table lock before it fails; a failed non-unique online index is deferred only in `deferred` mode. In `preferred` or `required` mode the migration fails. |
| `schemaUpdateLockTimeoutSeconds` | `schema-update-lock-timeout-seconds` | `600` | How long a node waits for the migration lock of a node that stopped responding before its start is refused. |
| `schemaUpdateIgnoreLiquibase` | `schema-update-ignore-liquibase` | `false` | Allows migrating a database whose schema is managed with the EximeeBPMS Liquibase changelog (see [Liquibase](#liquibase)). |

On a shared engine (Tomcat `bpm-platform.xml`, WildFly `standalone.xml`), set them as engine `<property>` elements; in
Quarkus, as generic configuration properties.

# The lock and `unlock`

One node migrates at a time. The lock is a row named `schema.migration.lock` in `ACT_GE_PROPERTY` that its holder renews
every 10 seconds. Other nodes wait while it is renewed. A lock that has not been renewed for 60 seconds belongs to a node
that stopped: the others wait for it up to `schemaUpdateLockTimeoutSeconds`, then refuse to start, naming the holder. It is
never taken over. Once you have checked that the holder has stopped, release it with `schema-migrate unlock` and start again.

The migration needs **two free connections** of the data source (one for the statements, one for the lock); with fewer,
the start is refused with a message naming the minimum.

# The schema migration tool

`schema-migrate` runs the migration without starting a server.

| Distribution | Command |
|---|---|
| Run | `schema-migrate.sh` / `schema-migrate.bat`, next to `start.sh`; reads `configuration/default.yml` (or `production.yml` with `--production`) and the JDBC driver from `configuration/userlib`. `start.sh --schema-migrate` migrates first and starts Run only if the migration succeeds. |
| Tomcat | `schema-migrate.sh` / `schema-migrate.bat` in the distribution's root, with the JDBC drivers of Tomcat's `lib`. |
| WildFly | `schema-migrate.sh` / `schema-migrate.bat` in the distribution's root; pass the JDBC driver with `--driver`, as WildFly keeps drivers in modules. |
| Docker image | `<image> schema-migrate <command>` with the image's `DB_*` and `WAIT_FOR` variables (see the image's documentation). |

Commands:

* `migrate` applies the missing steps. On an empty database it creates the schema with the create scripts of every
  component and records every step; run it only once at a time on an empty database. `migrate --indexes-only` builds only
  the pending indexes of existing tables, for a maintenance window.
* `preview [--output <file>]` writes the SQL a migration would run, without running it and without taking the lock (to
  standard output by default), for a DBA's review.
* `status` lists the steps that are pending, partly applied, conflicting or not recorded.
* `unlock` releases the migration lock; only after its holder has stopped.

The Tomcat, WildFly and stand-alone tool read a properties file given with `--config <file>`:

```properties
jdbc.url=jdbc:postgresql://db.example.com:5432/eximeebpms
jdbc.username=eximeebpms
jdbc.password=secret
# optional: jdbc.driver, database.type, database.table-prefix
database.schema-update-allow-destructive-steps=false
database.schema-update-online-indexes=deferred
```

Each key can be set or overridden by an environment variable: `EXIMEEBPMS_` followed by the key in upper case with `.` and
`-` replaced by `_`, e.g. `EXIMEEBPMS_JDBC_PASSWORD`. Unknown keys are refused. **Put the password in `jdbc.password`, never
in the JDBC URL**: a driver's error message can quote the URL. Java options for the tool go in `SCHEMA_MIGRATION_JAVA_OPTS`.
The Tomcat and WildFly scripts do not use the server's `JAVA_OPTS`; the Run scripts (`schema-migrate.sh`, `start.sh
--schema-migrate`) use `JAVA_OPTS` too, so system properties set there (a data source, a truststore) apply to the migration as
to the start.

Exit codes:

| Code | Meaning |
|---|---|
| `0` | Done, or nothing to do. |
| `1` | A step failed, or a database error. |
| `2` | The migration lock was not released in time. |
| `3` | A destructive step without its setting. |
| `4` | A configuration error. |
| `5` | An unrecognised schema, or a step that cannot be completed. |

# Production rollout

1. Back up the database if the release contains a destructive or a heavy step (`schema-migrate status` or `preview`).
2. Run `schema-migrate migrate` before the rollout, for example as a Kubernetes Job or a pre-upgrade hook, with an account
   that may change the schema. Review its `preview` first if your DBA wants to.
3. Run the nodes with `databaseSchemaUpdate` `validate` and an account that need not change the schema. A node then refuses
   to start on a schema the migration has not completed.

If the nodes run with `auto` instead, give them a start-up probe long enough for the migration (Kubernetes `startupProbe`):
the first node migrates while the others wait for its lock.

A rolling update stays possible: the upgrade steps add tables, columns and indexes that older nodes ignore. The removal of the
CMMN tables in the update to 1.4 is the exception and needs its own setting.

# Heavy steps

Some steps rewrite large tables and block writes to them while they run; the migration logs a warning with the table and its
row count before it runs one, and `status` and the preview mark them. They are the conversion of six history date columns on
MySQL and MariaDB (`1.4.3_to_1.4.4_2`) and the removal of the CMMN columns in the update to 1.4 on MySQL, MariaDB, Oracle and
Db2. On Db2, the tables whose columns are removed must be reorganized: the migration runs `REORG TABLE` through
`SYSPROC.ADMIN_CMD` (also shown in the preview). For large installations, run releases with heavy steps with the tool in a
maintenance window.

# Database account rights

The migration reads the catalog of the engine schema. An account that cannot see all of it is refused, because a missing
object could not be told from a hidden one; the message names the right:

* SQL Server: `VIEW DEFINITION` on the schema.
* Oracle, when another user owns the tables: access to the owner's tables, so that its entries in the `ALL_*` views are
  visible.
* Db2: `EXECUTE` on `SYSPROC.ADMIN_GET_TAB_INFO` (or SQLADM/DBADM). The migration itself also needs `EXECUTE` on
  `SYSPROC.ADMIN_CMD` and REORG authority on the engine tables (CONTROL, or SQLADM/DBADM).

Applying the steps needs the right to change the schema; `validate`, `false`, `status` and `preview` only read.

# Table prefix

The upgrade scripts name the tables without a prefix. The migration supports no prefix, or a prefix that is the connection's
current schema (`MYSCHEMA.`). Any other prefix is refused by `auto`, `validate` and the tool; use the manual route. With
`false`, the check is skipped with one info line. If the engine finds existing tables outside the connection's current schema while the migration sees none there, `auto` refuses startup (`ENGINE-03165`). Set the connection's current schema to the schema holding the engine tables before using automatic migration.

# Liquibase

A database with EximeeBPMS change sets in `DATABASECHANGELOG` is refused, so that Liquibase and the migration do not apply
the same scripts twice. To stay with Liquibase, run the nodes with `validate` or `false` and keep applying the changelog. To
switch to the automatic migration, set `schema-update-ignore-liquibase` to `true`; Liquibase's tables stay but are no longer
consulted. If you return to Liquibase later, run its `changelogSync` first, so that it records the change sets the migration
applied.

Oracle migration accounts also need `SELECT` on `SYS.V_$PARAMETER` to capture and restore the session's original `DDL_LOCK_TIMEOUT`. This is needed for migration, not for read-only `validate`/`status`. The session setting is restored on success and failure before returning the connection to its pool.

# Recovery after a failed step

Stop the migration process and inspect `status`, the failed step and statement number, and its SQL preview when available. If a conflicting object prevents preview generation, inspect the shipped dialect script in `org/eximeebpms/bpm/engine/db/upgrade/` instead. A failed step can leave earlier statements committed. Back up the database before changing partially migrated objects. Do not unlock a lease until its previous holder has stopped; after that, use `schema-migrate unlock` if needed.

* **1400 / 1500 (script security, outbox and CMMN):** compare the existing tables and columns with the preview or the corresponding shipped dialect upgrade script. Already completed changes are retained; rerun `migrate` to execute only the missing changes. CMMN removal requires the explicit destructive opt-in and no active case instances. Export required CMMN history before permitting it; migration does not preserve that history.
* **Index steps (1501, 1502, 1504 and indexes in mixed steps):** inspect the named index and its table. A PostgreSQL `INVALID` index is detected and rebuilt by the next online migration. With `deferred`, a failed non-unique online build can remain pending; use `migrate --indexes-only` in a maintenance window. For another mode, resolve the lock or database error and rerun.
* **1503 (ad-hoc history):** missing tables and indexes can be completed by rerunning. A table whose columns contradict the script is refused. Compare it with the shipped `<db>_engine_1.4_patch_1.4.2_to_1.4.3.sql` upgrade script and restore or repair the contradictory object under DBA control before rerunning; do not drop a populated history table merely to bypass the check.
* **1505 (history timestamp conversion):** on MySQL/MariaDB, earlier conversions may already be committed. Resolve the reported data, space or lock problem, then rerun; columns already converted are retained. The conversion can rewrite large tables, so complete it in the maintenance window.
* **Db2 REORG pending:** the preview identifies the required reorganizations. `migrate` performs them under its lease before continuing, and reports a failure if the account lacks the required authority. Grant the documented table/administrative authority or have the DBA execute the previewed REORG, then rerun. An interrupted REORG must be resolved using Db2's reported utility state before retrying.

Finish with `status` and start nodes with `validate`. Deferred secondary indexes may still produce warnings; schedule their completion separately. There is no automatic down-migration. If the intended state cannot be recovered safely, restore the pre-migration backup using a coordinated procedure with all writers stopped.
