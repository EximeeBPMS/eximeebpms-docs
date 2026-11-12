---

title: 'Time zones'
description: "The engine uses the default time zone of the JVM for dates in BPMN XML and REST responses; dates in the database are stored in UTC in new databases and in migrated ones."
weight: 255

menu:
  main:
    identifier: "time-zones"
    parent: "user-guide-process-engine"

---

## Process engine

The EximeeBPMS engine uses the default time zone of the JVM when operating with dates:

* When reading datetime values from BPMN XML
* In REST responses
* When calculating timer durations such as `P1D` (a calendar day in the JVM time zone) or `P3D`; `PT72H` is exactly 72 hours and `P1W` exactly 168 hours

## Database

A **new database** stores dates in **UTC**, independent of the time zone of the JVM, of the database server and of its sessions.
The engine selects this automatically: the schema creation records it in `ACT_GE_PROPERTY` (`eximeebpms.database.time.zone`, value `UTC`) and the engine refuses to start on a database whose recorded zone is not UTC.
An **existing database** keeps storing dates in the **default time zone of the JVM**, as in earlier versions, until its dates are migrated. That makes timestamps ambiguous when the clocks go back at the end of daylight saving time
(external task locks and timers could be handed out or fired up to an hour early); the engine logs a warning at every start of such a database.
Timestamp columns use the `TIMESTAMP [WITHOUT TIME ZONE]` data type (the name differs in different database servers; `DATETIME` on MySQL and MariaDB) and hold UTC wall-clock values.
The time zone of the database server is irrelevant for the engine.

Existing installations migrate their data once, with all nodes stopped; the next start then selects UTC without any configuration change. The local-time storage of an existing database is possible only in this version; **from the next version on, UTC storage is mandatory**:
see [Database Time Zone: Migrating Dates to UTC]({{< ref "/update/database-time-zone.md" >}}).

{{< note title="Direct database access" class="info" >}}
In a database that stores UTC (a new or a migrated one), reports and queries that read the date columns directly see UTC values and must convert them to a local time zone themselves.
{{< /note >}}

## EximeeBPMS Web Applications

It is possible to use the EximeeBPMS Web Applications in different timezones. All dates are translated to/from the local timezone when working with the UI.

## Cluster Setup

In case the process engine is running in a [cluster]({{< ref "/introduction/architecture.md#clustering-model" >}}), 
all cluster nodes must run in one and the same time zone. In case cluster nodes exist in different time zones, 
correct behaviour when operating with DateTime values can not be guaranteed.
