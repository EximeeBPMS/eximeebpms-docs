---

title: "Update and Migration"
weight: 70

menu:
  main:
    name: "Update & Migration"
    identifier: "migration-guide"

---

These documents provide instructions for updating an EximeeBPMS installation, or a Java project built on it, to a new version.

If you are moving from 1.3.0 to 1.4.0, start with
[**Update from 1.3.0 to 1.4.0**]({{< ref "/update/1.3-to-1.4.md" >}}) — it covers CMMN, the javax namespace, containers and the database changes, and links out to the detail for each.

If you run the Enterprise Edition in a time zone with daylight saving time, also read
[**Database Time Zone: Migrating Dates to UTC**]({{< ref "/update/database-time-zone.md" >}}): new databases store all dates in UTC (selected automatically), and an existing database keeps its local-time storage until its data is migrated with the script for its database. **From the next version on, UTC storage is mandatory**: migrate before updating to it.

Depending on which update you want to perform, choose one of the following guides:
