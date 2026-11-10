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

The engine can store every date in the database as a UTC wall-clock `TIMESTAMP`, independent of the time zone of the
JVM, of the database server and of the JDBC driver. Earlier versions stored dates in the **default time zone of the JVM**.
**In this version the UTC storage is off by default** (`databaseUtcDatesEnabled`): updating changes nothing about how dates are stored,
and the problem described below stays in force until you migrate the existing dates and turn the setting on.
The database columns carry no time zone, so in a time zone with daylight saving time (DST) the hour that is repeated when the
clocks go back (for example 02:00-03:00 in Europe/Warsaw on the last Sunday of October) is stored ambiguously.

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

| | Default (`databaseUtcDatesEnabled` off) | `databaseUtcDatesEnabled` on |
|---|---|---|
| Dates in the database | Local time of the JVM, as before | UTC |
| Time zone record in the database | none is written, the record is only read | `ACT_GE_PROPERTY` row `eximeebpms.database.time.zone`, checked at every start |
| Start on a database written by an earlier version | Starts as before | **Refuses to start** until the data is migrated (or its zone declared) |
| Start on a database that already records a zone | **Refuses to start** if the zone is not the zone of the JVM, `ENGINE-03116` | Starts if the record equals the configured zone |
| Setting `databaseTimeZone` | ignored | zone of the stored dates, default `UTC` |
| REST API, webapps, BPMN date expressions | JVM time zone | **unchanged**, JVM time zone |

With the setting **off** the engine stores dates as before and writes no record. The only case in which it then refuses to start is a database that already records a zone: at start it
reads the record `eximeebpms.database.time.zone`, and if the recorded zone is not the zone of the JVM (the database was migrated, or the setting was turned on, and then turned off again), it
**refuses to start** with `ENGINE-03116`, because it would read the stored dates in the wrong zone and shift all of them. A recorded zone that is the zone of the JVM does no harm and does not stop the start,
so running the JVM in the recorded zone (for example `-Duser.timezone=UTC` for a database recorded as `UTC`) is a way out besides turning the setting on or restoring a backup.
If `databaseTimeZone` is set while the setting is off, the engine logs the warning `ENGINE-03117` and ignores it.
The other differences to earlier versions are the schema patch (see [Before you start](#before-you-start)) and the UTC time of the first row of `ACT_GE_SCHEMA_LOG` in a newly created database.

With the setting **on** the engine records the time zone of the stored dates in the property `eximeebpms.database.time.zone` and checks it at every start:

| Situation | Behavior |
|---|---|
| New database, `databaseTimeZone` not set | Starts, records `UTC` |
| Record equals the effective zone | Starts |
| Record differs from the configured zone (`databaseTimeZone`, or `UTC`) | **Refuses to start**, `ENGINE-03114` |
| Database with data, no record, `databaseTimeZone` not set | **Refuses to start**, `ENGINE-03112` |
| Database with data, no record, `databaseTimeZone` set to the zone used so far | Starts, records that zone, logs warning `ENGINE-03115` at every start |

Refusing to start is deliberate: starting on data written in local time as if it were UTC would silently move every date by one or two hours.

The engine treats a database as used when it holds a deployment, an execution, a job (also the cleanup job an engine creates at start), a historic process instance or a task.
A database that holds only other data, for example users or metrics, counts as new and is recorded as `UTC`. The check runs after the schema has been created or updated (`databaseSchemaUpdate`),
so a refused start can already have created missing tables. If several nodes start for the first time at once on a database that has no record yet, one of them can fail with a duplicate key error
on databases that read with `REPEATABLE READ` (MySQL default); restart it.

## Choose how to upgrade

**Update only.** Apply the schema patch like any other patch (step 5 of [Before you start](#before-you-start); on MySQL and MariaDB it rebuilds six history tables, so plan the window). Dates stay in the time zone of the JVM and the daylight-saving-time defect stays in force.
Use it until you are ready to migrate, and at least migrate before the next clock change in your time zone.

**Path A, migrate and turn the UTC storage on (recommended).** Stop the engine, apply the schema patch, convert the dates with the script for your database,
turn `databaseUtcDatesEnabled` on and start. This removes the problem completely.

**Path B, turn the UTC storage on before migrating.** Turn `databaseUtcDatesEnabled` on and set `databaseTimeZone` to the zone your JVM used so far.
The engine continues to work on the existing data and records that zone. **The daylight-saving-time defect remains in force until you migrate**, which is why
the engine logs a warning at every start. Later, migrate with the script and remove `databaseTimeZone`.

Turning the setting on is **not a rolling change**: nodes with and without it must not work on the same database at the same time, because they store dates differently.
The migration needs a maintenance window (an H2 database has no migration script: re-create a throw-away one, or use path B for one you keep).

## Turn the UTC storage on

The following examples are for a **new database or an existing database already migrated to UTC** (path A).
Keep your existing datasource, transaction and other engine settings. Apply the settings to every engine node
while all nodes are stopped, then restart them together. Setting the configuration does not convert existing dates.

For path B, also set `databaseTimeZone` to the time zone used to write the existing data, for example `Europe/Warsaw`.
This is a transitional setting: **the DST defect remains until the data is migrated to UTC**.
After migration remove that setting (or set it to `UTC`). Never use an abbreviation such as `CET`.

### Tomcat

In `$CATALINA_BASE/conf/bpm-platform.xml`, add the property to the existing
`<process-engine>` → `<properties>` element of each engine:

```xml
<properties>
  <!-- Keep the other existing engine properties here. -->
  <property name="databaseUtcDatesEnabled">true</property>
</properties>
```

For path B, add this property to the same element before starting on the existing local-time data:

```xml
<property name="databaseTimeZone">Europe/Warsaw</property>
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

For path B, add `<property name="databaseTimeZone">Europe/Warsaw</property>` to that same element.
These are process engine properties, not datasource or job acquisition properties.

### Spring Boot and EximeeBPMS Run

For a Spring Boot application, add this to `application.yml`:

```yaml
eximeebpms:
  bpm:
    database:
      utc-dates-enabled: true
```

For path B, the database section is:

```yaml
eximeebpms:
  bpm:
    database:
      utc-dates-enabled: true
      time-zone: Europe/Warsaw
```

With `application.properties`, the equivalent UTC configuration is
`eximeebpms.bpm.database.utc-dates-enabled=true`; for path B also set
`eximeebpms.bpm.database.time-zone=Europe/Warsaw`.

**Run** uses these same Spring Boot properties. Edit `configuration/default.yml`, or
`configuration/production.yml` when starting with `--production`. Run already has a top-level
`eximeebpms.bpm:` section: add `database` inside it instead of adding a second section with the same key:

```yaml
eximeebpms.bpm:
  # Keep admin-user, run and the other existing settings here.
  database:
    utc-dates-enabled: true
    # Path B only; remove after migrating the dates to UTC:
    # time-zone: Europe/Warsaw
```

Use the `database` properties, rather than `generic-properties`. Keep the existing `spring.datasource` configuration.

### Embedded engine

With programmatic configuration, set the properties before `buildProcessEngine()`.
Here `dataSource` is the datasource already configured by your application:

```java
import org.eximeebpms.bpm.engine.ProcessEngine;
import org.eximeebpms.bpm.engine.impl.cfg.StandaloneProcessEngineConfiguration;

StandaloneProcessEngineConfiguration configuration = new StandaloneProcessEngineConfiguration();
configuration.setDataSource(dataSource);
configuration.setDatabaseUtcDatesEnabled(true);
// Path B only; remove after migrating the dates to UTC:
// configuration.setDatabaseTimeZone("Europe/Warsaw");
ProcessEngine processEngine = configuration.buildProcessEngine();
```

For an embedded Spring engine, add JavaBean properties to your existing
`org.eximeebpms.bpm.engine.spring.SpringProcessEngineConfiguration` bean:

```xml
<property name="databaseUtcDatesEnabled" value="true" />
<!-- Path B only; remove after migrating the dates to UTC: -->
<!-- <property name="databaseTimeZone" value="Europe/Warsaw" /> -->
```

The same bean properties apply to `StandaloneProcessEngineConfiguration` in `eximeebpms.cfg.xml`.
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
8. Do not turn `databaseUtcDatesEnabled` on before the migration (path A). Once the database records a zone, do not turn the setting off again: the engine refuses to start (`ENGINE-03116`) rather than read the UTC dates as local ones.

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
-- Set the zone the engine JVM used until now (the value of 'databaseTimeZone', or the JVM time zone).

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

  -- the SELECT ... INTO above raises NOT FOUND when no record exists yet; do not let it end the loop
  SET done = 0;
  START TRANSACTION;
  OPEN cur;
  loop_columns: LOOP
    FETCH cur INTO t, c;
    IF done = 1 THEN
      LEAVE loop_columns;
    END IF;
    SET @stmt = CONCAT('UPDATE `', t, '` SET `', c, '` = CONVERT_TZ(`', c, '`, ?, ''UTC'') WHERE `', c, '` IS NOT NULL');
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

Tested with SQL Server 2025. The source zone is a **Windows** time zone name from `sys.time_zone_info`, for example `Central European Standard Time`, and the script also takes the IANA name of the same zone (`Europe/Warsaw`), the form the engine records, so that a database already started with `databaseTimeZone` (path B) is accepted.
Run it connected to the engine database, for example `sqlcmd -S <server> -d <database> -U <user> -i migrate_mssql.sql`.

```sql
-- EximeeBPMS: migrate all dates of the process engine database to UTC (Microsoft SQL Server 2016+).
-- Run with the engine STOPPED, after a backup, exactly ONCE, connected to the engine database
-- (sqlcmd -d <database> -i migrate_mssql.sql). Only tables in the default schema of the connected user are changed.
-- 1. Adjust the Windows time zone name the engine JVM used until now
--    (list: SELECT name FROM sys.time_zone_info), e.g. 'Central European Standard Time' for Europe/Warsaw:
DECLARE @source_zone NVARCHAR(100) = N'Central European Standard Time';
--    and the IANA name of the same zone, as the engine records it (the `databaseTimeZone` value), e.g. 'Europe/Warsaw':
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
--      V_ZONE          the time zone name the engine used (the value of 'databaseTimeZone', or the JVM zone), e.g. Europe/Warsaw
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
3. The engine starts with `databaseUtcDatesEnabled` on, without `databaseTimeZone` (or with `UTC`) and without the errors `ENGINE-03112` or `ENGINE-03114` and without the warning `ENGINE-03115`.
4. A timer you know is due shows the correct due date in Cockpit (Cockpit shows dates in your local zone).

## Roll back

Liquibase rollback of the schema change set `1.4.3-to-1.4.4_2` removes its schema-log entry but keeps the MySQL/MariaDB `DATETIME` columns. Older engines can use those columns; converting them back to `TIMESTAMP` can reject dates in a daylight-saving gap. This schema rollback does not undo the UTC data conversion described below.

The scripts do not store the old values. Rolling back means restoring the backup and starting the previous version, or the new version with `databaseUtcDatesEnabled` off (the default) on the restored data, or on with `databaseTimeZone` set to the old zone (path B).
A database that has been migrated cannot be run with the setting off: restore the backup instead. Do not delete or edit the record by hand: the engine uses it to protect the data.

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
| `ENGINE-03112` | `databaseUtcDatesEnabled` is on, the database has data but no record of its time zone | Migrate with the script, or declare the zone with `databaseTimeZone` (path B), or turn the setting off |
| `ENGINE-03114` | The configured zone differs from the recorded one | Set `databaseTimeZone` to the recorded zone, or migrate |
| `ENGINE-03115` | Warning: dates are not stored in UTC | Migrate to UTC and remove `databaseTimeZone` |
| `ENGINE-03116` | `databaseUtcDatesEnabled` is off, but the database records a time zone that is not the zone of the JVM: the engine did not start | Turn `databaseUtcDatesEnabled` on (and set `databaseTimeZone` to the recorded zone unless it is `UTC`), or run the JVM in the recorded zone (`-Duser.timezone`), or restore the data from before the migration |
| `ENGINE-03117` | Warning: `databaseTimeZone` is set but `databaseUtcDatesEnabled` is off, so it is ignored | Turn `databaseUtcDatesEnabled` on, or remove `databaseTimeZone` |
| `ENGINE-03118` | Engines that share one `SqlSessionFactory` (`isUseSharedSqlSessionFactory`) have different `databaseUtcDatesEnabled` | Give all of them the same value |

`ENGINE-03113` is an information message logged when a new database is recorded. After `ENGINE-03112` and `ENGINE-03114` the engine did not start; on a database that has not been migrated and records no zone you can also turn `databaseUtcDatesEnabled` off to run as before.
