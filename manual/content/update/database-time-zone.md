---

title: "Database Time Zone: Migrating Dates to UTC"
weight: 5

menu:
  main:
    name: "Database Time Zone (UTC)"
    identifier: "update-database-time-zone"
    parent: "migration-guide"
    pre: "Move the dates stored by the engine to UTC so that the daylight-saving-time change cannot break running instances"

---

{{< note title="Enterprise Edition only" class="warning" >}}
This change is delivered in the Enterprise Edition engine. The version that contains it is named in its
[release notes]({{< ref "/release-notes/release-notes-1.4-ee.md" >}}).
{{< /note >}}

The engine stores every date in the database as a UTC wall-clock `TIMESTAMP`, independent of the time zone of the
JVM, of the database server and of the JDBC driver, **in every new installation**. Earlier versions stored dates in the **default time zone of the JVM**,
and an existing database keeps doing so until its dates are migrated. The database columns carry no time zone, so in a time zone with daylight saving time (DST)
the hour that is repeated when the clocks go back (for example 02:00-03:00 in Europe/Warsaw on the last Sunday of October) is stored ambiguously in a database that holds local times.

The storage is selected **automatically** (`AUTO`, the default) from the database itself, so that nothing has to be configured: a **new database** uses UTC from the first date it stores,
an **existing database** keeps its local-time storage until it is migrated, and a **migrated database** uses UTC from its next start, with the same configuration.

{{< note title="An existing installation keeps its local-time storage until you migrate" class="warning" >}}
Updating does not change how an existing database stores dates, so the daylight-saving-time problem below stays in force for it. Migrate the dates with the script for your database, with all nodes stopped,
before the next clock change in your time zone. The engine logs the warning `ENGINE-03120` at every start of such a database.
{{< /note >}}

{{< note title="UTC storage becomes mandatory in the next version" class="warning" >}}
Keeping the local-time storage of an existing database is possible only in this version. From the next version on, UTC storage is **not optional any more**:
an engine that starts on a database without the marker `UTC` (an existing database whose dates were not migrated) **will refuse to start**.
Migrate the dates in this version, at a time of your choosing, so that the update to the next version needs no maintenance window for it.
{{< /note >}}

## What went wrong before

The engine compares stored dates with the current time, for example `LOCK_EXP_TIME_ <= now` when it hands out an external task and
`DUEDATE_ <= now` when it looks for due timer jobs. When the clocks go back, a stored wall-clock value of the first pass through
the hour is compared with the local time of the second pass. Locks then look expired and timers look due too early, up to an hour:

* a **locked external task is handed out again** to another worker, which produces
  `TASK/CLIENT-01008 Exception while completing the external task: External task with id ... does not exist` in the worker logs,
  often in very large numbers;
* a **timer job fires early** (up to an hour);
* the same effect on every other date the engine compares with the clock.

The situation was reproduced on the clock change of 25.10.2026 (CEST to CET). It could only be avoided by running the JVM
in a time zone without DST. With the UTC storage turned on, the stored values do not depend on the time zone at all.

## What changes

How the engine selects the storage (`AUTO`), once, at start, before it reads or writes any date:

| The database at start | Dates are stored | Marker `eximeebpms.database.time.zone` in `ACT_GE_PROPERTY` |
|---|---|---|
| **No engine tables yet** (the schema is created now: by the engine, by Liquibase or by the SQL create scripts) | In **UTC**, from the first date | Written by the schema creation, value `UTC` |
| **Existing schema without a marker**, with or without data | In the time zone of the JVM, **as before**; warning `ENGINE-03120` at every start | none |
| **Marker `UTC`** (a new database, or one migrated with the script) | In **UTC** | `UTC` |
| **Marker with another value** | The engine **refuses to start**, `ENGINE-03114` | other |

Dates in the REST API, the web applications and BPMN date expressions are **unchanged**: they use the time zone of the JVM.

What counts as a new database is the **creation of the schema**, not an absence of data: a schema that exists with empty business tables is an existing database and stays in local time
until it is migrated. `databaseSchemaUpdate=drop-create` always drops and creates the schema, so it is a new one. An ordinary update or patch never writes the marker. The schema creation scripts do: the engine's own creation, the Liquibase changelog (a fresh schema, not an update of an existing one)
and the SQL files `activiti.<database>.create.engine.sql`; the engine does not run its create script on a schema that already has the table `ACT_GE_PROPERTY` but lacks the engine tables, and stops with `ENGINE-03122` instead, because that script writes the marker. Rolling a schema change back does not remove the marker. The migration scripts below convert the dates and write the marker in one transaction.
The only other way the marker is written is an explicit `databaseUtcDatesEnabled=true` on a database that holds no data yet. Data, for this check, means a deployment, an execution, a job (also the cleanup job an engine creates at start), a historic process instance or a task, a historic task instance, an operation log entry or a logged metric: a database that holds only users or authorizations counts as one without data.

The mode is selected **before** the engine binds its date handlers, so it cannot change while the engine runs. If another node creates the schema or migrates the data while a node is starting, that node
stops with `ENGINE-03121` instead of working with a stale decision: stop **all** nodes for a migration and start them together afterwards.

The dates are written by the type handlers of the engine's `SqlSessionFactory`. An engine to which an application passes its own `SqlSessionFactory`
(`setSqlSessionFactory`), or that shares one with other engines (`isUseSharedSqlSessionFactory`), refuses to start (`ENGINE-03118`) when the handlers of that factory do not match the selected storage.
For a database that stores UTC (a new or a migrated one) such a factory must map the dates with the engine's fixed-zone handlers: call `org.eximeebpms.bpm.engine.impl.db.FixedTimeZoneDateTypeHandler.registerWith(configuration)` on its MyBatis `Configuration` **before** the mappers are parsed.
Engines that share one factory need the same storage, so one legacy and one UTC database cannot be served by one shared factory.

An explicit setting overrides `AUTO` (see [Override the automatic selection](#override-the-automatic-selection)). It is meant for exceptions, for example forcing the local-time storage of a database
that should not be switched yet, and it is still subject to the checks above: **`true`** on a database that holds data and has no marker is refused (`ENGINE-03112`), and **`false`** on a database whose marker is not the zone of the JVM is refused, because the engine would shift all dates: with `ENGINE-03116` when the database holds data, and with `ENGINE-03123` when it holds none yet, which is the case of a **new** database, because its creation marked it `UTC` (leave the setting unset there).

## Choose how to upgrade

**Update only.** Apply the schema patch like any other patch (step 5 of [Before you start](#before-you-start); on MySQL and MariaDB it rebuilds six history tables, so plan the window). An existing database stays in local time
and the daylight-saving-time defect stays in force for it. Use this until you are ready to migrate, and at least migrate before the next clock change in your time zone.

**Migrate (recommended).** Stop all nodes, apply the schema patch, convert the dates with the script for your database and start the nodes again. **No configuration change is needed**:
the script writes the marker, and the next start selects UTC. This removes the problem completely.

**New installation.** Create the schema with the engine, Liquibase or the SQL create script. The database is marked `UTC` and uses UTC from the first start; there is nothing to migrate.

The migration is **not a rolling change**: nodes that started before it and nodes that start after it must not work on the same database, because they store dates differently. It needs a maintenance window.
An H2 database has no migration script: re-create a throw-away one; a database that has to be kept needs the migration done by hand
(the dates are wall-clock values in the time zone of the JVM that wrote them), and a `UTC` marker written, before it is switched.

## Override the automatic selection

Normally you configure **nothing**. The following settings force a mode and are meant for exceptions; they do not convert any dates. Apply them to every engine node
while all nodes are stopped, then restart them together. Keep your existing datasource, transaction and other engine settings. The examples force UTC (`true`); `false` forces the
local-time storage. Leave the setting unset to return to `AUTO`.

### Tomcat

In `$CATALINA_BASE/conf/bpm-platform.xml`, add the property to the existing
`<process-engine>` → `<properties>` element of each engine:

```xml
<properties>
  <!-- Keep the other existing engine properties here. -->
  <property name="databaseUtcDatesEnabled">true</property>
</properties>
```

### WildFly

In `$WILDFLY_HOME/standalone/configuration/standalone.xml` (or the relevant profile in `domain.xml`),
find the subsystem `urn:org.eximeebpms.bpm.jboss:1.1`. Add the property to each existing
`<process-engines>` → `<process-engine>` → `<properties>` element:

```xml
<properties>
  <!-- Keep the other existing engine properties here. -->
  <property name="databaseUtcDatesEnabled">true</property>
</properties>
```

These are process engine properties, not datasource or job acquisition properties.

### Spring Boot and EximeeBPMS Run

For a Spring Boot application, add this to `application.yml`:

```yaml
eximeebpms:
  bpm:
    database:
      utc-dates-enabled: true
```

With `application.properties`, the equivalent configuration is
`eximeebpms.bpm.database.utc-dates-enabled=true`.

**Run** uses these same Spring Boot properties. Edit `configuration/default.yml`, or
`configuration/production.yml` when starting with `--production`. Run already has a top-level
`eximeebpms.bpm:` section: add `database` inside it instead of adding a second section with the same key:

```yaml
eximeebpms.bpm:
  # Keep admin-user, run and the other existing settings here.
  database:
    utc-dates-enabled: true
```

Use the `database` properties, rather than `generic-properties`. Keep the existing `spring.datasource` configuration.

### Embedded engine

With programmatic configuration, set the property before `buildProcessEngine()`.
Here `dataSource` is the datasource already configured by your application:

```java
import org.eximeebpms.bpm.engine.ProcessEngine;
import org.eximeebpms.bpm.engine.impl.cfg.StandaloneProcessEngineConfiguration;

StandaloneProcessEngineConfiguration configuration = new StandaloneProcessEngineConfiguration();
configuration.setDataSource(dataSource);
configuration.setDatabaseUtcDatesEnabled(true);
ProcessEngine processEngine = configuration.buildProcessEngine();
```

For an embedded Spring engine, add a JavaBean property to your existing
`org.eximeebpms.bpm.engine.spring.SpringProcessEngineConfiguration` bean:

```xml
<property name="databaseUtcDatesEnabled" value="true" />
```

The same bean property applies to `StandaloneProcessEngineConfiguration` in `eximeebpms.cfg.xml`.
Keep the application's existing transaction integration; the standalone example above is for an engine
that manages its own transactions.

## Before you start

1. Find out which time zone the engine JVM used so far (`-Duser.timezone`, the `TZ` of the container, the OS zone). This value is the **source zone** of the migration. If your nodes ran in different zones, see [Cluster setup]({{< ref "/user-guide/process-engine/time-zones.md#cluster-setup" >}}) first: the data cannot be migrated consistently.
2. Take a database backup that you have restored from at least once. The migration changes data in place and cannot be reversed by a script.
3. Stop **all** engine nodes, and Cockpit and every worker that uses the engine, so that nothing writes to the engine tables during the migration.
4. Check for tools that read the engine tables directly (reports, BI, your own SQL). They will see UTC from now on; see [After the migration](#after-the-migration).
5. Apply the **schema patch** of the new version to the database (`<database>_engine_1.4_patch_1.4.3_to_1.4.4_2.sql` of the SQL scripts distribution, or the Liquibase change set `1.4.3-to-1.4.4_2`). On MySQL and MariaDB it turns six history columns of type `TIMESTAMP`
   (`ACT_HI_IDENTITYLINK`, `ACT_HI_OP_LOG`, `ACT_HI_INCIDENT` (two), `ACT_HI_EXT_TASK_LOG`, `ACT_HI_ADHOC_TURN`) into `DATETIME`, because a `TIMESTAMP` column is read and written in the session time zone and would reject the UTC hour that does not exist locally
   at the start of daylight saving time. Run it with the session time zone of the server default, as the engine did, so that the stored values are kept; the MySQL migration script refuses to run while such a column remains. The patch rebuilds those six tables, so measure its duration on the rehearsal copy and size the window for it. On the other databases the patch only records the version.
6. Plan the resources. The migration rewrites every date column of every row in **one transaction**: on PostgreSQL the tables roughly double in size until `VACUUM`, Oracle needs undo space, SQL Server and Db2 need transaction log
   (a full log on Db2 ends the run with `SQL0964C` and rolls it back). Run history cleanup first, size the log, and take the duration from the rehearsal.
7. Rehearse on a copy of the production data. Compare the number of rows and a few `DUEDATE_`, `LOCK_EXP_TIME_` and history timestamps before and after. The scripts report how many columns they converted (MySQL: `columns_converted`).
8. Do not force `databaseUtcDatesEnabled=true` on a database before its migration: the engine refuses to start (`ENGINE-03112`). Once the database is marked `UTC`, do not force the setting to `false` either: the engine refuses to start (`ENGINE-03116`, or `ENGINE-03123` when the database holds no data yet) rather than read the UTC dates as local ones.

## Run the migration

Every script converts **all timestamp columns of all `ACT_*` tables**, and sets the record `eximeebpms.database.time.zone` to `UTC` **in the same transaction**.
All scripts refuse to run a second time (the record is already `UTC`) and refuse to run if the record names a different zone than the source zone you give.
Pick the script for your database, set the source zone as described in its header and run it once.

{{< note title="The repeated hour" class="warning" >}}
Values written between 02:00 and 03:00 on the day the clocks go back cannot be converted unambiguously, because the same local time occurred twice.
PostgreSQL, Oracle and Db2 read such a value as standard time (winter), MySQL, MariaDB and SQL Server read it as the first occurrence (summer time).
Running jobs and locks from that hour no longer matter at migration time, but **history rows from that one hour per year can be off by one hour**. There is no way to recover the original value.
{{< /note >}}

### PostgreSQL

Tested with PostgreSQL 16. Run with `psql -v ON_ERROR_STOP=1 -f migrate_postgres.sql <database>`. The source zone is the `bpms.source_zone` line at the top.

```sql
-- EximeeBPMS: migrate all dates of the process engine database to UTC (PostgreSQL).
-- Run with the engine STOPPED, after a backup, exactly ONCE.
-- Set the zone the engine JVM used until now (the JVM time zone).

BEGIN;
SET LOCAL bpms.source_zone = 'Europe/Warsaw';   -- <== adjust the zone the engine JVM used

DO $$
DECLARE
  src text := current_setting('bpms.source_zone');
  recorded text;
  r record;
BEGIN
  PERFORM 1 FROM pg_timezone_names WHERE name = src;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Unknown time zone %', src;
  END IF;

  SELECT value_ INTO recorded FROM act_ge_property WHERE name_ = 'eximeebpms.database.time.zone';
  IF recorded = 'UTC' THEN
    RAISE EXCEPTION 'The database is already recorded as UTC; refusing to migrate it a second time';
  END IF;
  IF recorded IS NOT NULL AND recorded <> src THEN
    RAISE EXCEPTION 'The database records time zone %, but source zone % was given', recorded, src;
  END IF;

  FOR r IN
    SELECT table_name, column_name
    FROM information_schema.columns
    WHERE table_schema = current_schema()
      AND table_name LIKE 'act\_%'
      AND data_type = 'timestamp without time zone'
  LOOP
    EXECUTE format(
      'UPDATE %I SET %I = (%I AT TIME ZONE %L) AT TIME ZONE ''UTC'' WHERE %I IS NOT NULL',
      r.table_name, r.column_name, r.column_name, src, r.column_name);
  END LOOP;

  IF recorded IS NULL THEN
    INSERT INTO act_ge_property (name_, value_, rev_) VALUES ('eximeebpms.database.time.zone', 'UTC', 1);
  ELSE
    UPDATE act_ge_property SET value_ = 'UTC', rev_ = rev_ + 1 WHERE name_ = 'eximeebpms.database.time.zone';
  END IF;
END $$;

COMMIT;
```

### MySQL and MariaDB

Tested with MySQL 8.4 and MariaDB 11.4. Needs the server time zone tables (`mysql_tzinfo_to_sql`; the official Docker images have them). The script checks this and refuses to run without them.
Run it connected to the engine database, for example `mysql -u root -p <database> < migrate_mysql.sql`. The source zone is the `@source_zone` line at the top.

`CONVERT_TZ` has a version-dependent supported range. Outside it a server can leave a value unchanged instead of reporting an error. This script therefore supports source dates from `1970-01-02 00:00:00` (inclusive) to `2038-01-01 00:00:00` (exclusive), a conservative range shared by the supported MySQL/MariaDB versions.
Before updating any dates, it checks every date column and lists all columns containing values outside that range, with row counts. If any exist, it stops without changing the dates or writing the UTC marker.

Such dates can be legitimate, for example a timer due in 2040, or history `REMOVAL_TIME_` calculated from a long time to live. Inspect those rows and prepare a migration using a date-time library that supports their full range and the source zone's rules. Rehearse it on a restored copy and verify the converted values before marking the database as UTC. Do not shorten deadlines, delete business data or change removal times just to make this script pass. Changing a definition's time to live alone does not recalculate removal times already stored in history.

```sql
-- EximeeBPMS: migrate all dates of the process engine database to UTC (MySQL / MariaDB).
-- Run with the engine STOPPED, after a backup, exactly ONCE, connected to the engine database.
-- Requires the MySQL time zone tables (mysql_tzinfo_to_sql); the script checks this.
-- 1. Adjust the zone the engine JVM used until now:
SET @source_zone = 'Europe/Warsaw';

DROP PROCEDURE IF EXISTS bpms_migrate_dates_to_utc;
DELIMITER $$
CREATE PROCEDURE bpms_migrate_dates_to_utc(IN src VARCHAR(64))
BEGIN
  DECLARE done INT DEFAULT 0;
  DECLARE t VARCHAR(128);
  DECLARE c VARCHAR(128);
  DECLARE recorded VARCHAR(64);
  DECLARE n INT DEFAULT 0;
  DECLARE cur CURSOR FOR
    SELECT table_name, column_name FROM information_schema.columns
    WHERE table_schema = DATABASE() AND UPPER(table_name) LIKE 'ACT\_%' AND data_type = 'datetime';
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;
  END;

  IF CONVERT_TZ('2026-01-01 12:00:00', src, 'UTC') IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unknown time zone, or the MySQL time zone tables are not loaded';
  END IF;

  -- a TIMESTAMP column is read in the session time zone and is not converted by this script: the schema patch turns it into DATETIME
  IF EXISTS (SELECT 1 FROM information_schema.columns
             WHERE table_schema = DATABASE() AND UPPER(table_name) LIKE 'ACT\_%' AND data_type = 'timestamp') THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Columns of type TIMESTAMP remain: apply the schema patch of the new version (it turns them into DATETIME) first';
  END IF;

  SELECT value_ INTO recorded FROM ACT_GE_PROPERTY WHERE name_ = 'eximeebpms.database.time.zone';
  IF recorded = 'UTC' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The database is already recorded as UTC; refusing to migrate it a second time';
  END IF;
  IF recorded IS NOT NULL AND recorded <> src THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The database records a different time zone than the given source zone';
  END IF;

  -- pass 1: CONVERT_TZ does not convert reliably before 1970 and after 2037 (MariaDB leaves such a value unchanged, MySQL
  -- ignores summer time after 2037), so list every column that holds a value outside 1970-2037 and stop before anything is changed
  -- (the SELECT ... INTO above raises NOT FOUND when no record exists yet; do not let it end the loops)
  SET done = 0;
  DROP TEMPORARY TABLE IF EXISTS bpms_out_of_range;
  CREATE TEMPORARY TABLE bpms_out_of_range (table_name VARCHAR(128), column_name VARCHAR(128), row_count BIGINT);
  OPEN cur;
  loop_check: LOOP
    FETCH cur INTO t, c;
    IF done = 1 THEN
      LEAVE loop_check;
    END IF;
    SET @stmt = CONCAT('INSERT INTO bpms_out_of_range SELECT ''', t, ''', ''', c, ''', COUNT(*) FROM `', t, '` WHERE `', c,
                       '` < ''1970-01-02 00:00:00'' OR `', c, '` >= ''2038-01-01 00:00:00'' HAVING COUNT(*) > 0');
    PREPARE s FROM @stmt;
    EXECUTE s;
    DEALLOCATE PREPARE s;
  END LOOP;
  CLOSE cur;
  IF EXISTS (SELECT 1 FROM bpms_out_of_range) THEN
    SELECT table_name, column_name, row_count AS rows_outside_1970_2037 FROM bpms_out_of_range ORDER BY table_name, column_name;
    DROP TEMPORARY TABLE bpms_out_of_range;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dates before 1970 or from 2038 on: see the list above and the migration guide';
  END IF;
  DROP TEMPORARY TABLE bpms_out_of_range;

  -- pass 2: convert
  SET done = 0;
  START TRANSACTION;
  OPEN cur;
  loop_columns: LOOP
    FETCH cur INTO t, c;
    IF done = 1 THEN
      LEAVE loop_columns;
    END IF;
    SET @stmt = CONCAT('UPDATE `', t, '` SET `', c, '` = CONVERT_TZ(`', c, '`, ?, ''UTC'') ',
                       'WHERE `', c, '` IS NOT NULL');
    SET @zone = src;
    PREPARE s FROM @stmt;
    EXECUTE s USING @zone;
    DEALLOCATE PREPARE s;
    SET n = n + 1;
  END LOOP;
  CLOSE cur;

  IF recorded IS NULL THEN
    INSERT INTO ACT_GE_PROPERTY (name_, value_, rev_) VALUES ('eximeebpms.database.time.zone', 'UTC', 1);
  ELSE
    UPDATE ACT_GE_PROPERTY SET value_ = 'UTC', rev_ = rev_ + 1 WHERE name_ = 'eximeebpms.database.time.zone';
  END IF;
  COMMIT;
  SELECT n AS columns_converted;
END$$
DELIMITER ;

-- 2. Run it:
CALL bpms_migrate_dates_to_utc(@source_zone);
DROP PROCEDURE bpms_migrate_dates_to_utc;
```

### Oracle

Tested with Oracle Database 23 Free. Run as the owner of the engine schema, which needs the `CREATE PROCEDURE` privilege for the two temporary helper functions
(they are dropped at the end; if the script stops early they remain and are replaced by the next run). Run with `sqlplus <user>/<password>@<service> @migrate_oracle.sql`.
The source zone is the `DEFINE source_zone` line at the top.

```sql
-- EximeeBPMS: migrate all dates of the process engine database to UTC (Oracle).
-- Run with the engine STOPPED, after a backup, exactly ONCE, as the engine schema owner
-- (needs the CREATE PROCEDURE privilege for the temporary helper function).
-- 1. Adjust the zone the engine JVM used until now:
DEFINE source_zone = 'Europe/Warsaw'

WHENEVER SQLERROR EXIT FAILURE ROLLBACK

-- Oracle raises ORA-01883 for the repeated hour of a clock change; this resolves it to standard time.
CREATE OR REPLACE FUNCTION bpms_utc_wall_clock(tstz IN TIMESTAMP WITH TIME ZONE) RETURN TIMESTAMP IS
BEGIN
  RETURN TO_TIMESTAMP(TO_CHAR(SYS_EXTRACT_UTC(tstz), 'YYYY-MM-DD HH24:MI:SS.FF6'), 'YYYY-MM-DD HH24:MI:SS.FF6');
END;
/

CREATE OR REPLACE FUNCTION bpms_to_utc(ts IN TIMESTAMP, zone IN VARCHAR2) RETURN TIMESTAMP IS
BEGIN
  RETURN bpms_utc_wall_clock(FROM_TZ(ts, zone));
EXCEPTION
  WHEN OTHERS THEN
    -- ambiguous (ORA-01883) or non-existent (ORA-01878) local time: evaluate one hour later and go back
    RETURN bpms_utc_wall_clock(FROM_TZ(ts + INTERVAL '1' HOUR, zone)) - INTERVAL '1' HOUR;
END;
/

DECLARE
  src      VARCHAR2(64) := '&source_zone';
  recorded VARCHAR2(64);
  probe    TIMESTAMP;
BEGIN
  -- an unknown zone raises ORA-01882 here
  probe := bpms_to_utc(TIMESTAMP '2026-01-01 12:00:00', src);

  BEGIN
    SELECT value_ INTO recorded FROM act_ge_property WHERE name_ = 'eximeebpms.database.time.zone';
  EXCEPTION WHEN NO_DATA_FOUND THEN
    recorded := NULL;
  END;
  IF recorded = 'UTC' THEN
    RAISE_APPLICATION_ERROR(-20001, 'The database is already recorded as UTC; refusing to migrate it a second time');
  END IF;
  IF recorded IS NOT NULL AND recorded <> src THEN
    RAISE_APPLICATION_ERROR(-20002, 'The database records time zone ' || recorded || ', but source zone ' || src || ' was given');
  END IF;

  FOR r IN (
    SELECT c.table_name, c.column_name
    FROM user_tab_columns c JOIN user_tables t ON t.table_name = c.table_name
    WHERE c.table_name LIKE 'ACT\_%' ESCAPE '\' AND c.data_type LIKE 'TIMESTAMP%'
  ) LOOP
    EXECUTE IMMEDIATE 'UPDATE "' || r.table_name || '" SET "' || r.column_name || '" = bpms_to_utc("' || r.column_name
      || '", :z) WHERE "' || r.column_name || '" IS NOT NULL' USING src;
  END LOOP;

  IF recorded IS NULL THEN
    INSERT INTO act_ge_property (name_, value_, rev_) VALUES ('eximeebpms.database.time.zone', 'UTC', 1);
  ELSE
    UPDATE act_ge_property SET value_ = 'UTC', rev_ = rev_ + 1 WHERE name_ = 'eximeebpms.database.time.zone';
  END IF;
  COMMIT;
EXCEPTION WHEN OTHERS THEN
  ROLLBACK;
  RAISE;
END;
/

DROP FUNCTION bpms_to_utc;
DROP FUNCTION bpms_utc_wall_clock;
```

### Microsoft SQL Server

Tested with SQL Server 2025. The source zone is a **Windows** time zone name from `sys.time_zone_info`, for example `Central European Standard Time`, and the script also takes the IANA name of the same zone (`Europe/Warsaw`), the form in which the engine records a zone, so that a record written for that zone is recognized.
Run it connected to the engine database, for example `sqlcmd -S <server> -d <database> -U <user> -i migrate_mssql.sql`.

```sql
-- EximeeBPMS: migrate all dates of the process engine database to UTC (Microsoft SQL Server 2016+).
-- Run with the engine STOPPED, after a backup, exactly ONCE, connected to the engine database
-- (sqlcmd -d <database> -i migrate_mssql.sql). Only tables in the default schema of the connected user are changed.
-- 1. Adjust the Windows time zone name the engine JVM used until now
--    (list: SELECT name FROM sys.time_zone_info), e.g. 'Central European Standard Time' for Europe/Warsaw:
DECLARE @source_zone NVARCHAR(100) = N'Central European Standard Time';
--    and the IANA name of the same zone (a record of that zone, written by hand, is recognized by it), e.g. 'Europe/Warsaw':
DECLARE @source_zone_iana NVARCHAR(64) = N'Europe/Warsaw';

SET XACT_ABORT ON;
BEGIN TRANSACTION;

IF NOT EXISTS (SELECT 1 FROM sys.time_zone_info WHERE name = @source_zone)
  THROW 50001, 'Unknown source time zone; see sys.time_zone_info', 1;

DECLARE @recorded NVARCHAR(64) = (SELECT VALUE_ FROM ACT_GE_PROPERTY WHERE NAME_ = 'eximeebpms.database.time.zone');
IF @recorded = N'UTC'
  THROW 50002, 'The database is already recorded as UTC; refusing to migrate it a second time', 1;
IF @recorded IS NOT NULL AND @recorded <> @source_zone_iana
  THROW 50003, 'The database records a different time zone than the given source zone', 1;

-- SQL Server resolves the repeated hour of the clock change to its FIRST occurrence (summer time);
-- a non-existent local time (spring gap) is read as standard time
DECLARE @sql NVARCHAR(MAX) = N'';
SELECT @sql = @sql + N'UPDATE ' + QUOTENAME(s.name) + N'.' + QUOTENAME(t.name)
    + N' SET ' + QUOTENAME(c.name) + N' = CAST((' + QUOTENAME(c.name) + N' AT TIME ZONE @z) AT TIME ZONE ''UTC'' AS datetime2('
    + CAST(c.scale AS NVARCHAR(2)) + N')) WHERE ' + QUOTENAME(c.name) + N' IS NOT NULL;' + CHAR(10)
FROM sys.columns c
JOIN sys.tables t ON t.object_id = c.object_id
JOIN sys.schemas s ON s.schema_id = t.schema_id
JOIN sys.types ty ON ty.user_type_id = c.user_type_id
WHERE ty.name = 'datetime2' AND t.name LIKE 'ACT[_]%' AND s.name = SCHEMA_NAME();
EXEC sp_executesql @sql, N'@z NVARCHAR(100)', @z = @source_zone;

IF @recorded IS NULL
  INSERT INTO ACT_GE_PROPERTY (NAME_, VALUE_, REV_) VALUES ('eximeebpms.database.time.zone', 'UTC', 1);
ELSE
  UPDATE ACT_GE_PROPERTY SET VALUE_ = 'UTC', REV_ = REV_ + 1 WHERE NAME_ = 'eximeebpms.database.time.zone';

COMMIT TRANSACTION;
```

### IBM Db2

Tested with Db2 11.5. Db2 has no time zone database, so the daylight-saving-time rules are part of the script. It implements the **European Union rules** (clock change on the last Sunday
of March and October at 01:00 UTC), which cover Poland and all other EU countries. The function was compared with the Java time zone rules for every half hour from 2024 to 2030 without a difference.
For a region with other rules adjust the function `BPMS_TO_UTC`. Set the zone name and its standard (winter) offset in minutes in the block at the end.
Run as the owner of the engine schema with `db2 connect to <database>` and then `db2 +c -s -td@ -vf migrate_db2.sql`. `+c` and `-s` are required: nothing is committed unless the whole script succeeds.

```sql
-- EximeeBPMS: migrate all dates of the process engine database to UTC (IBM Db2 LUW 11.5).
-- Run with the engine STOPPED, after a backup, exactly ONCE, as the engine schema owner,
-- connected to the engine database:
--   db2 connect to <database>
--   db2 +c -s -td@ -vf migrate_db2.sql
-- +c keeps autocommit off and -s stops at the first error: nothing is committed unless the whole script succeeds
-- (on an error, run 'db2 rollback' or just disconnect).
--
-- Db2 has no time zone database, so the daylight-saving-time rules are written into the function below.
-- It implements the European Union rules (clock change on the last Sunday of March and October at 01:00 UTC),
-- which cover Poland and the other EU countries. For another region adjust BPMS_TO_UTC.
-- The repeated hour of the clock change is resolved to standard time.
--
-- 1. Adjust the two values in the migration block at the end of this file:
--      V_ZONE          the time zone name the engine used (the JVM zone), e.g. Europe/Warsaw
--      V_STD_OFFSET    its standard (winter) offset from UTC in minutes, e.g. 60 for Europe/Warsaw

CREATE OR REPLACE FUNCTION BPMS_LAST_SUNDAY(Y INTEGER, M INTEGER)
  RETURNS DATE
  LANGUAGE SQL DETERMINISTIC NO EXTERNAL ACTION
  RETURN (DATE(TRIM(CHAR(Y)) || '-' || RIGHT('0' || TRIM(CHAR(M)), 2) || '-01') + 1 MONTH - 1 DAY)
         - (DAYOFWEEK(DATE(TRIM(CHAR(Y)) || '-' || RIGHT('0' || TRIM(CHAR(M)), 2) || '-01') + 1 MONTH - 1 DAY) - 1) DAYS
@

CREATE OR REPLACE FUNCTION BPMS_TO_UTC(TS TIMESTAMP, STD_OFFSET_MIN INTEGER)
  RETURNS TIMESTAMP
  LANGUAGE SQL DETERMINISTIC NO EXTERNAL ACTION
  RETURN CASE
    WHEN TS >= TIMESTAMP(BPMS_LAST_SUNDAY(YEAR(TS), 3), '01:00:00') + (STD_OFFSET_MIN + 60) MINUTES
     AND TS <  TIMESTAMP(BPMS_LAST_SUNDAY(YEAR(TS), 10), '01:00:00') + STD_OFFSET_MIN MINUTES
    THEN TS - (STD_OFFSET_MIN + 60) MINUTES
    ELSE TS - STD_OFFSET_MIN MINUTES
  END
@

BEGIN
  DECLARE V_ZONE VARCHAR(64) DEFAULT 'Europe/Warsaw';   -- <== adjust
  DECLARE V_STD_OFFSET INTEGER DEFAULT 60;               -- <== adjust (minutes)
  DECLARE V_RECORDED VARCHAR(64);
  DECLARE V_SQL VARCHAR(1000);

  SELECT VALUE_ INTO V_RECORDED FROM ACT_GE_PROPERTY WHERE NAME_ = 'eximeebpms.database.time.zone';
  IF V_RECORDED = 'UTC' THEN
    SIGNAL SQLSTATE '75001' SET MESSAGE_TEXT = 'The database is already recorded as UTC; refusing to migrate it a second time';
  END IF;
  IF V_RECORDED IS NOT NULL AND V_RECORDED <> V_ZONE THEN
    SIGNAL SQLSTATE '75002' SET MESSAGE_TEXT = 'The database records a different time zone than the given source zone';
  END IF;

  FOR R AS
    SELECT TABNAME, COLNAME FROM SYSCAT.COLUMNS
    WHERE TABSCHEMA = CURRENT SCHEMA AND TABNAME LIKE 'ACT\_%' ESCAPE '\' AND TYPENAME = 'TIMESTAMP'
      AND TABNAME IN (SELECT TABNAME FROM SYSCAT.TABLES WHERE TABSCHEMA = CURRENT SCHEMA AND TYPE = 'T')
  DO
    SET V_SQL = 'UPDATE "' || R.TABNAME || '" SET "' || R.COLNAME || '" = BPMS_TO_UTC("' || R.COLNAME || '", '
                || TRIM(CHAR(V_STD_OFFSET)) || ') WHERE "' || R.COLNAME || '" IS NOT NULL';
    EXECUTE IMMEDIATE V_SQL;
  END FOR;

  IF V_RECORDED IS NULL THEN
    INSERT INTO ACT_GE_PROPERTY (NAME_, VALUE_, REV_) VALUES ('eximeebpms.database.time.zone', 'UTC', 1);
  ELSE
    UPDATE ACT_GE_PROPERTY SET VALUE_ = 'UTC', REV_ = REV_ + 1 WHERE NAME_ = 'eximeebpms.database.time.zone';
  END IF;
END
@

COMMIT
@

DROP FUNCTION BPMS_TO_UTC
@
DROP FUNCTION BPMS_LAST_SUNDAY
@
```

## Verify

1. The record exists: `SELECT VALUE_ FROM ACT_GE_PROPERTY WHERE NAME_ = 'eximeebpms.database.time.zone'` returns `UTC`.
2. A few known dates have the expected value. For Europe/Warsaw a summer date is two hours earlier than before, a winter date one hour earlier.
3. The engine starts without the warning `ENGINE-03120` and without the errors `ENGINE-03112`, `ENGINE-03114`, `ENGINE-03116`, `ENGINE-03121` or `ENGINE-03123`.
4. A timer you know is due shows the correct due date in Cockpit (Cockpit shows dates in your local zone).

## Roll back

Liquibase rollback of the schema change set `1.4.3-to-1.4.4_2` removes its schema-log entry but keeps the MySQL/MariaDB `DATETIME` columns. Older engines can use those columns; converting them back to `TIMESTAMP` can reject dates in a daylight-saving gap. This schema rollback does not undo the UTC data conversion described below.

The scripts do not store the old values. Rolling back means restoring the backup and starting the previous version, or the new version on the restored data, which is again an existing database in local time.
A database that has been migrated cannot be run in local time: restore the backup instead. Do not delete or edit the marker by hand: the engine uses it to protect the data.

## After the migration

* **Direct SQL, reports and BI** that read `ACT_*` date columns get UTC once the UTC storage is on. Convert in the query, for example in PostgreSQL `START_TIME_ AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Warsaw'`.
* **Database time zone and session time zone** no longer matter to the engine once the UTC storage is on. Values are written and read by the JDBC driver with an explicit UTC calendar, verified with the PostgreSQL, MySQL (also with `connectionTimeZone`), MariaDB, Oracle, SQL Server and Db2 drivers.
* **Durations in timers** are still calculated in the time zone of the JVM: `P1D`, `P3D`, `P1M` are calendar units that keep the time of day, so across a clock change they are 23 or 25 hours long in a DST zone; `PT72H` is exactly 72 hours; `P1W` is always exactly 168 hours. Prefer `PT24H` style durations when you need an exact length, and specify date literals in timers with an explicit offset or `Z`.
* **Reports grouped by calendar day, month or quarter** (task reports by month, Admin metrics by day or month, history time-to-live counted in days) now group by the UTC calendar, not by the zone of the JVM.
* **`ACT_GE_SCHEMA_LOG`** rows written by upgrade scripts (`CURRENT_TIMESTAMP`) are in the time of the database session; they are informational, and the migration converts the existing ones with the rest.
* **Cluster:** all nodes should still use the same JVM time zone, see [Time zones]({{< ref "/user-guide/process-engine/time-zones.md" >}}).
* **Table prefix:** the scripts assume tables named `ACT_*` without a prefix. With a table prefix adjust the `act\_%`/`ACT\_%` filter and the name of the property table.

## Error messages

| Code | Meaning | What to do |
|---|---|---|
| `ENGINE-03112` | `databaseUtcDatesEnabled` is forced to `true`, the database has data but no marker | Migrate the data with the script (then leave the setting unset), or remove the override |
| `ENGINE-03114` | The marker records a zone other than `UTC` | The dates are in that zone: run the migration script with that zone as the source zone, or restore a backup |
| `ENGINE-03116` | `databaseUtcDatesEnabled` is forced to `false`, but the database holds data and its marker is not the zone of the JVM: the engine did not start | Remove the override (a new database is marked `UTC` by its creation too), or run the JVM in the recorded zone (`-Duser.timezone`), or restore the data from before the migration |
| `ENGINE-03123` | `databaseUtcDatesEnabled` is forced to `false` on a database that is marked `UTC` and holds no data yet, typically a new one: the engine did not start | Remove the override: a new database always stores UTC |
| `ENGINE-03118` | The `SqlSessionFactory` of the engine (supplied with `setSqlSessionFactory`, or shared with `isUseSharedSqlSessionFactory`) has date handlers that do not match the selected storage | Let the engine build the factory, or register the fixed-zone handlers in your own (see above), or give all engines that share a factory the same storage |
| `ENGINE-03119` | The engine could not read the marker to select the storage (an error other than a missing table) | Check the database connection and the permissions to read the engine tables |
| `ENGINE-03120` | Warning: an existing schema without a marker stays in local time | Migrate the dates before the next clock change in your time zone |
| `ENGINE-03122` | The table `ACT_GE_PROPERTY` exists, but the engine tables are missing (an incomplete schema): the engine did not run its create script | If another node is creating the schema at this moment, wait until it has started and restart this node, without dropping anything; otherwise complete or restore the schema, or drop it and let the engine create it |
| `ENGINE-03121` | The marker changed while the engine was selecting the storage (another node created the schema or migrated), or the table prefix and `databaseSchema` point to different schemas | Stop all nodes and start them again; check that the table prefix and `databaseSchema` name the same schema |

`ENGINE-03113` is an information message logged when the engine records `UTC` in a database. After every error in this table the engine did not start.
