---

title: 'Time zones'
description: "The engine uses the default time zone of the JVM for dates in BPMN XML and REST responses; dates in the database are stored in UTC."
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

By default dates are stored in the database in the **default time zone of the JVM**, as in earlier versions. That makes timestamps ambiguous when the clocks go back at the end of daylight saving time
(external task locks and timers could be handed out or fired up to an hour early).

With `databaseUtcDatesEnabled` turned on, dates are stored in **UTC**, independent of the time zone of the JVM, of the database server and of its sessions.
The engine records this in `ACT_GE_PROPERTY` (`eximeebpms.database.time.zone`) and refuses to start on a database whose recorded zone differs from its configuration.
Timestamp columns use the `TIMESTAMP [WITHOUT TIME ZONE]` data type (the name differs in different database servers; `DATETIME` on MySQL and MariaDB) and hold UTC wall-clock values.
The time zone of the database server is irrelevant for the engine.

Existing installations must migrate their data once before turning it on:
see [Database Time Zone: Migrating Dates to UTC]({{< ref "/update/database-time-zone.md" >}}).

{{< note title="Direct database access" class="info" >}}
Once `databaseUtcDatesEnabled` is on, reports and queries that read the date columns directly see UTC values and must convert them to a local time zone themselves.
{{< /note >}}

## EximeeBPMS Web Applications

It is possible to use the EximeeBPMS Web Applications in different timezones. All dates are translated to/from the local timezone when working with the UI.

## Cluster Setup

In case the process engine is running in a [cluster]({{< ref "/introduction/architecture.md#clustering-model" >}}), 
all cluster nodes must run in one and the same time zone. In case cluster nodes exist in different time zones, 
correct behaviour when operating with DateTime values can not be guaranteed.
