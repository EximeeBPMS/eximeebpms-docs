---

title: 'Application Monitoring'
weight: 206

menu:
  main:
    identifier: "user-guide-process-engine-application-monitoring"
    parent: "user-guide-process-engine"

---

{{< note title="Enterprise Edition — upcoming change (BPMS-813)" class="warning" >}}
The co-released modules and container support below are part of the upcoming Enterprise release. Earlier releases use the separate monitor extension and support Spring Boot / Run only. Use matching engine, client and monitoring versions containing BPMS-813; the new coordinates are not a drop-in dependency for older clients.
{{< /note >}}

Application monitoring exposes Micrometer meters for the engine and external-task workers. Its source now lives under `monitoring/` in the engine repository and is released in the same reactor. There is no monitor-to-released-engine-to-monitor release cycle. The existing database-reported engine [Metrics]({{< ref "/user-guide/process-engine/metrics.md" >}}) remain a separate mechanism.

# Modules and migration

All six production artifacts use group `org.eximeebpms.bpm.monitor` and the engine release version:

| Artifact | Purpose |
|---|---|
| `eximeebpms-monitor-common` | Shared catalog, Micrometer helpers and registry factory SPI; no engine or Spring dependency |
| `eximeebpms-monitor-engine` | Engine measurements and the container lifecycle plugin; no Spring dependency |
| `eximeebpms-monitor-client` | Reusable worker measurements; depends on the Java client, not the engine |
| `eximeebpms-monitor-spring-boot` | Auto-configuration for engine/client meters and Actuator authorization |
| `eximeebpms-monitor-prometheus` | Prometheus registry factory and text exposition for containers / plain Java |
| `eximeebpms-monitor-webapp` | Servlet WAR served at `/metrics` by Tomcat and WildFly |

Remove the old `org.eximeebpms.bpm.extension.monitor:eximeebpms-enterprise-bpm-spring-boot-monitor` dependency (or its Community predecessor `eximeebpms-bpm-spring-boot-monitor`). Do not keep old and new implementations on the same classpath: their Java packages intentionally remain compatible and would overlap. The migration includes the changes from monitor PR #15, including ad-hoc turn/model usage meters and explicit `@EnableMonitoring` registration fixes.

For applications using the engine REST starter, the new engine and Boot monitoring modules are included by the starter. Other embedded-engine Boot applications add both modules explicitly:

```xml
<dependency>
  <groupId>org.eximeebpms.bpm.monitor</groupId>
  <artifactId>eximeebpms-monitor-engine</artifactId>
  <version>${eximeebpms.version}</version>
</dependency>
<dependency>
  <groupId>org.eximeebpms.bpm.monitor</groupId>
  <artifactId>eximeebpms-monitor-spring-boot</artifactId>
  <version>${eximeebpms.version}</version>
</dependency>
```

Set `eximeebpms.version` to the same published Enterprise version as the engine. Add the chosen exporter separately. For Prometheus, add `org.eximeebpms.bpm.monitor:eximeebpms-monitor-prometheus` at the same engine version; it includes the registry and the monitoring-specific naming convention. Auto-configuration needs no application-package scan. Existing applications using `@EnableMonitoring` remain supported; do not also install `EngineMonitoringPlugin` in a Boot engine, because it would observe the same events twice.

Worker applications use [Worker Monitoring]({{< ref "/user-guide/ext-client/monitoring.md" >}}). Adding worker monitoring does not pull the engine or its database runtime into the worker.

# HTTP export and authentication

Measurement and HTTP exposure are separate. Run keeps `/actuator/prometheus`; enable its exposure through the existing `management.endpoints.web.exposure.include` configuration. The endpoint requires an authenticated principal with role `metricsreader`, even when other Actuator endpoints are public. Exposing an endpoint does not grant that role.

Run's shipped configuration exposes only the Actuator endpoints `health` and `prometheus`. Run protects only the Prometheus path; do not add other endpoints, or `*`, to the exposure list unless your deployment protects them.

Run always authenticates the Prometheus path against the engine's identity service, whether or not `eximeebpms.bpm.run.auth.enabled` protects the REST API, and with any combination of the `--webapps` and `--rest` components. It accepts HTTP Basic credentials and, on the main server, an existing login to Cockpit, Admin or Tasklist in the same browser session; a separate management server keeps its own sessions and accepts HTTP Basic only. Engine administrators (the engine's `adminUsers` and `adminGroups`, by default group `eximeebpms-admin`) may read metrics; any other user must belong to group `metricsreader`. The stock `demo` account is an administrator, so after logging in to Cockpit you can open `/actuator/prometheus` in the same browser. No additional credential store is created. Run registers this check on both the main and a separate management server. Endpoint path overrides (`management.endpoints.web.base-path`, `management.endpoints.web.path-mapping.prometheus`) are respected.

With the `--oauth2` component, a user who logged in through the OAuth2 provider is checked the same way. The [OAuth2 identity provider]({{< ref "/user-guide/spring-boot-integration/spring-security.md#oauth2-identity-provider" >}}) takes that user's groups from the token, so map the provider's groups into it with `eximeebpms.bpm.oauth2.identity-provider.group-name-attribute`: a token group `metricsreader`, or an administrator group such as `eximeebpms-admin`, grants access. A scraper keeps using HTTP Basic with an account of the engine's database identity provider.

The administrator exception exists only in Run, which checks identities itself. Tomcat, WildFly and your own Spring Boot application authorize the metrics endpoint by role `metricsreader` alone: an engine administrator without that role is denied.

In your own Spring Boot application the endpoint uses the principal and roles of the application's existing security mechanism. With Spring Security, the role is the granted authority `ROLE_metricsreader`, for example `User.withUsername("scraper").password(...).roles("metricsreader")`. When the role comes from a JWT or OAuth2 claim, map it with the `ROLE_` prefix (for example `JwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_")`); an authority named just `metricsreader` is not the role and results in 403. An application using a separate management server must configure its security mechanism on that server too.

Container distributions include `metrics.war`. Set `httpEnabled=true` on the engine's monitoring plugin to opt in; it is `false` by default. The WAR exports only engines whose plugin enables HTTP export; when no engine does, `/metrics` answers 404. It uses the container's authenticated principal and `metricsreader` role. The stock descriptor uses BASIC against the existing Tomcat Realm / WildFly application security domain; no users are packaged in the WAR. Deployments with SSO adapt the standard WAR login configuration and role mapping to their existing mechanism. Do not create a second metrics-specific user database. Access is operational and server-wide: the role can read every engine selected for export by this WAR.

Tomcat's WAR context is `/metrics` (including an exact request without the trailing slash). WildFly's `jboss-web.xml` declares the same context root. Route this path through the installation's existing transport and access controls.

## Authenticated scrape examples

For stock Run, enable monitoring (`eximeebpms.monitoring.enabled=true`) and expose the endpoint. The shipped `default.yml` disables monitoring; `production.yml` enables it:

```yaml
eximeebpms:
  monitoring:
    enabled: true
    updateRate: 10000
management:
  endpoints:
    web:
      exposure:
        include: health,prometheus
  endpoint:
    prometheus:
      enabled: true
  prometheus:
    metrics:
      export:
        enabled: true
```

Enable both the endpoint and the Prometheus registry when overriding a Run configuration that disables them; HTTP exposure alone does not enable a disabled endpoint. The group id `metricsreader` matches the database identity provider's default group id pattern, so it can be created in Admin without changing `group-resource-whitelist-pattern`.

For a scraper, use a dedicated account that is not an engine administrator, with HTTP Basic rather than a copied session cookie, which would keep that web application session alive. Through that identity provider's existing administration, assign the existing scraper account to group `metricsreader`. With the engine's database identity provider this is the existing Admin application's group/membership management; with LDAP/another provider, assign the corresponding group there. The monitor does not create the account or group automatically.

```sh
# curl prompts for the account's existing password.
curl --fail --user "$SCRAPER_USER" http://localhost:8080/actuator/prometheus
```

For the stock Tomcat `UserDatabaseRealm`, add `<role rolename="metricsreader"/>` in the existing `conf/tomcat-users.xml` and append `metricsreader` to the existing scraper user's `roles` attribute (for example `roles="scraper,metricsreader"`). Keep its existing managed account and other roles. A fresh distribution defines no users there; add one outside the commented examples, for example `<user username="scraper" password="..." roles="metricsreader"/>`. If the installation already uses a different Realm, map the role in that Realm instead. Enable the plugin's `httpEnabled` and scrape:

```sh
curl --fail --user "$SCRAPER_USER" http://localhost:8080/metrics
```

For the stock WildFly ApplicationRealm, append the role in the existing `standalone/configuration/application-roles.properties` entry, for example:

```properties
existing-scraper=existing-role,metricsreader
```

On a fresh distribution, create the application user with the role instead:

```sh
bin/add-user.sh -a -u scraper -g metricsreader
```

Without `-p`, the script asks for the password interactively; scripted installations pass it with `-p`.

The supplied WAR uses the existing `other` application security domain, which maps to the distribution's ApplicationDomain/realm. Preserve any existing groups and credentials, enable `httpEnabled`, and scrape the same `/metrics` path. For an installation with another configured security domain, adapt `jboss-web.xml` and its existing role decoder/mapping to that domain.

These stock examples use the distribution's existing BASIC mechanism. An installation already configured for another mechanism replaces the WAR's standard login configuration through its normal deployment configuration. For example, an existing container CLIENT-CERT installation uses `<login-config><auth-method>CLIENT-CERT</auth-method></login-config>` while preserving the servlet mappings and `metricsreader` constraint, and maps certificate principals to that role in its existing realm. SSO integrations likewise supply their existing principal/role mapping; BASIC is not a second credential store layered over them. Apply the installation's usual transport URL and security policy rather than copying localhost/plain-HTTP examples as production routing.

## Troubleshooting the metrics endpoint

| Status | Likely cause |
|---|---|
| 401 | No login or wrong credentials. A browser login counts only on Run's main server, not on a separate management port. After repeated wrong passwords the engine temporarily [throttles login attempts]({{< ref "/user-guide/process-engine/identity-service.md#throttle-login-attempts" >}}) for that account, so correct credentials also fail for a short time. |
| 403 | The user is authenticated but lacks the role. In Run: neither an engine administrator nor in group `metricsreader` (with `--oauth2`: neither group is in the token). In Tomcat/WildFly: the realm user lacks role `metricsreader`; engine administration does not count. In Spring Boot: the authority is not `ROLE_metricsreader`. |
| 404 | Run or Spring Boot: the endpoint is not exposed or not enabled (`management.endpoints.web.exposure.include`, `management.endpoint.prometheus.enabled` or, in newer Spring Boot configuration, `management.endpoint.prometheus.access`, and `management.prometheus.metrics.export.enabled`); Run answers 401 instead until the caller logs in. Tomcat/WildFly: no engine has `httpEnabled=true`; only a user with role `metricsreader` sees the 404, others get 401 or 403. |

# Container configuration and lifecycle

Tomcat configures the plugin under the process engine in `conf/bpm-platform.xml`; WildFly configures it under the engine's subsystem `<plugins>` element in `standalone.xml` or `standalone-full.xml`:

```xml
<plugin>
  <class>org.eximeebpms.bpm.extension.monitor.EngineMonitoringPlugin</class>
  <properties>
    <property name="httpEnabled">true</property>
    <property name="updateRate">10000</property>
    <property name="snapshotEnabled">true</property>
  </properties>
</plugin>
```

| Plugin property | Default | Meaning |
|---|---|---|
| `enabled` | `true` | Enable measurement for this engine |
| `httpEnabled` | `false` | Allow this engine's registry to be exported by the WAR |
| `snapshotEnabled` | `true` | Poll database snapshots |
| `historyEnabled` | `true` | Observe history events for counters; history level still applies |
| `updateRate` | `10000` | Positive delay in milliseconds between completed snapshot refreshes |
| `engineTag` | `true` | Add the engine name to this plugin's meters |
| `shutdownTimeout` | `5000` | Maximum milliseconds to wait for an in-flight snapshot at shutdown |
| `schedulerJndiName` | unset | Optional managed `ScheduledExecutorService` lookup |

The supplied WildFly configuration sets `schedulerJndiName` to `java:jboss/ee/concurrency/scheduler/default`. Preserve that setting to use the managed scheduler. Tomcat uses a plugin-owned daemon scheduler. Each engine needs its own plugin instance. Programmatic integrations can supply a registry and/or scheduler before engine initialization; these remain caller-owned. The plugin scopes its meters locally and removes them at close, without closing the caller's registry, scheduler or unrelated meters. Reserve each engine's monitoring names/tags for that plugin. The WAR requires a plugin-owned registry: `httpEnabled=true` with a caller-supplied registry fails startup, because that registry could also contain host meters or an engine that did not opt into export. Expose a caller registry through the host application's own protected endpoint instead.

At close the plugin cancels refreshes, waits up to `shutdownTimeout`, then detaches export and removes its meters. A JDBC call that ignores interruption can outlive that bound; it can no longer publish to the exported registry. Database/driver query and network timeouts remain the installation's responsibility. Failed startup also cleans up plugin-owned resources.

Container exports include an `engine` tag to distinguish named engines. Existing single-engine Boot label sets remain unchanged. Scraping reads the last in-memory snapshot and does not issue new database queries. Script Guard's total gauge is now refreshed on the snapshot cadence as well.

# History Level Requirements

The extension's *counters* are driven by the process engine's history events, so they only fire for event types your configured `eximeebpms.bpm.history-level` actually produces. Most snapshot gauges read runtime state and are unaffected by the history level; finished-instance and ad-hoc database metrics have the requirements stated below.

<table class="table desc-table">
  <tr>
    <th>Meters</th>
    <th>Minimum <code>history-level</code></th>
  </tr>
  <tr>
    <td><code>eximeebpms.process.instances.started</code>, <code>.ended</code></td>
    <td><code>activity</code></td>
  </tr>
  <tr>
    <td><code>eximeebpms.process.instances.finished.total</code></td>
    <td><code>activity</code></td>
  </tr>
  <tr>
    <td><code>eximeebpms.tasks.created</code>, <code>.completed</code>, <code>.deleted</code></td>
    <td><code>activity</code></td>
  </tr>
  <tr>
    <td><code>eximeebpms.external.tasks.started</code>, <code>.ended</code></td>
    <td><code>full</code></td>
  </tr>
  <tr>
    <td><code>eximeebpms.incidents.created</code>, <code>.resolved</code>, <code>.deleted</code></td>
    <td><code>full</code></td>
  </tr>
  <tr>
    <td>All gauges (<code>*.running.total</code>, <code>*.open.total</code>, <code>*.open.age.*</code>, <code>jobs.failed.total</code>, etc.)</td>
    <td>none — read runtime tables directly</td>
  </tr>
  <tr>
    <td><code>eximeebpms.script.violations</code>, <code>.total</code></td>
    <td>none — driven directly by the script-execution engine's own violation callback, not a history event or a runtime-table read</td>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.outbox.pending.estimate</code>, <code>.pending.age.oldest.seconds</code></td>
    <td>none — read the Business Events outbox table directly</td>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.publish</code>, <code>.dispatch.batch.database</code>, <code>.dispatched</code>, <code>.dispatch.last.activity.age.seconds</code></td>
    <td>none — driven directly by the business-event dispatcher's own callback</td>
  </tr>
</table>

{{< note title="" class="warning" >}}
At <code>history-level: activity</code> or <code>audit</code>, incident and external-task lifecycle counters silently stay at zero — the engine simply never produces those history events at those levels, so no error is raised. The Spring Boot starter defaults <code>eximeebpms.bpm.history-level</code> to <code>full</code>, so this only matters if it has been explicitly lowered.
{{< /note >}}

# Metrics

## Process Instances

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.process.instances.started</code></td>
    <td>Counter</td>
    <td>Incremented when a process instance starts.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.process.instances.ended</code></td>
    <td>Counter</td>
    <td>Incremented when a process instance ends.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.process.instances.running.total</code></td>
    <td>Gauge</td>
    <td>Number of currently running process instances, per process definition.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.process.instances.running.suspended.total</code></td>
    <td>Gauge</td>
    <td>Number of currently suspended process instances, per process definition.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.process.instances.finished.total</code></td>
    <td>Gauge</td>
    <td>Number of finished process instances currently eligible for history clean up, per process definition.</td>
  </tr>
</table>

## Incidents

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.incidents.created</code></td>
    <td>Counter</td>
    <td>Incremented when an incident is created.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.incidents.resolved</code></td>
    <td>Counter</td>
    <td>Incremented when an incident is resolved.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.incidents.deleted</code></td>
    <td>Counter</td>
    <td>Incremented when an incident is deleted.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.incidents.open.total</code></td>
    <td>Gauge</td>
    <td>Number of currently open incidents, per process definition.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.incidents.open.age.newest.seconds</code></td>
    <td>Gauge</td>
    <td>Age, in seconds, of the newest currently open incident, per process definition.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.incidents.open.age.oldest.seconds</code></td>
    <td>Gauge</td>
    <td>Age, in seconds, of the oldest currently open incident, per process definition.</td>
  </tr>
</table>

{{< note title="" class="info" >}}
The three counters above require <code>history-level: full</code> — see [History Level Requirements](#history-level-requirements). The gauges are unaffected.
{{< /note >}}

## Tasks

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.tasks.created</code></td>
    <td>Counter</td>
    <td>Incremented when a task is created.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.tasks.completed</code></td>
    <td>Counter</td>
    <td>Incremented when a task is completed.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.tasks.deleted</code></td>
    <td>Counter</td>
    <td>Incremented when a task is deleted (any non-completion removal, e.g. process instance cancellation).</td>
  </tr>
  <tr>
    <td><code>eximeebpms.tasks.open.total</code></td>
    <td>Gauge</td>
    <td>Number of currently open tasks.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.tasks.open.age.newest.seconds</code></td>
    <td>Gauge</td>
    <td>Age, in seconds, of the newest currently open task.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.tasks.open.age.oldest.seconds</code></td>
    <td>Gauge</td>
    <td>Age, in seconds, of the oldest currently open task.</td>
  </tr>
</table>

## External Tasks

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.external.tasks.started</code></td>
    <td>Counter</td>
    <td>Incremented when an external task is created.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.external.tasks.ended</code></td>
    <td>Counter</td>
    <td>Incremented when an external task completes successfully or is deleted.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.external.tasks.open.total</code></td>
    <td>Gauge</td>
    <td>Number of currently open external tasks.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.external.tasks.open.error.total</code></td>
    <td>Gauge</td>
    <td>Number of currently open external tasks that have a recorded error from a failed execution attempt.</td>
  </tr>
</table>

## Jobs

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.jobs.failed.total</code></td>
    <td>Gauge</td>
    <td>Number of currently failing jobs (jobs with a recorded exception), per process definition. This is a live snapshot, not a lifetime counter.</td>
  </tr>
</table>

## Business Events Outbox

{{< note title="Not yet in a released extension version" class="warning" >}}
These gauges are included in the upcoming co-released Enterprise monitoring modules. Earlier engines require a compatible standalone monitor release and the `BusinessEventService#getOutboxBacklog()` API; do not assume an older pinned extension contains them.
{{< /note >}}

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.outbox.pending.estimate</code></td>
    <td>Gauge</td>
    <td>Upper bound on the business events written to the outbox but not yet delivered to the configured publisher: the width of the outbox id range from the oldest undelivered event to the newest event. Not a count — see below.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.outbox.pending.age.oldest.seconds</code></td>
    <td>Gauge</td>
    <td>How long the oldest undelivered business event has been waiting. It stays close to the dispatch interval while delivery works. It grows steadily when the dispatcher is held on an event, because the receiver is unreachable or keeps rejecting it — see <a href="{{< ref "/user-guide/process-engine/business-events.md#when-publishing-fails" >}}">When Publishing Fails</a>.</td>
  </tr>
</table>

Both gauges are registered only while [Business Events]({{< ref "/user-guide/process-engine/business-events.md" >}}) are enabled, and carry no tags.

Both gauges are read from the two ends of the outbox's id index — the oldest undelivered id, the newest id, and the creation date of the oldest — and never by counting rows. The cost of a snapshot therefore does not grow with the backlog, which is also why the extension reports no exact count: counting would scan every pending event on every snapshot, on every node, just when the database is already behind. Measured on PostgreSQL with 5 million pending events, the count took about 220 ms with its index fully in memory, and the backlog read about 0.1 ms. On PostgreSQL, finding the oldest undelivered id also steps over the index entries of events delivered since the table was last vacuumed. That part of the read follows the dispatcher's progress since the last vacuum, not the backlog: 3 ms with 250,000 such entries in the same measurement. Autovacuum keeps it small.

`pending.estimate` is exact only while outbox ids have no gaps, and in practice they do. Every transaction that wrote business events and then rolled back, such as an optimistic-locking retry, consumes ids without leaving rows. Oracle and IBM DB2 identities discard up to 20 cached ids on restart, and SQL Server up to 1,000. On Oracle RAC, each instance hands out ids from its own cache, so ids are not in creation order across instances. Read the gauge as a trend: steady while delivery keeps up, growing when it falls behind. For an alert threshold, prefer `pending.age.oldest.seconds`, which has no such bias.

Both values come from `BusinessEventService#getOutboxBacklog()`, which any deployment can call, including Tomcat and WildFly. An exact count is available on demand from `createBusinessEventOutboxQuery().unprocessed().count()`, at a cost that grows with the backlog.

## Business Events Dispatcher

{{< note title="Not yet in a released extension version" class="warning" >}}
These meters are included in the upcoming co-released Enterprise monitoring modules. Earlier engines require a compatible standalone monitor release and the `BusinessEventDispatchListener` API; do not assume an older pinned extension contains them.
{{< /note >}}

The dispatcher reports every publish attempt and every batch, so these meters keep moving during a long drain rather than only when a cycle ends. Every pass of the dispatcher reads at least one batch, so each pass leaves a sample, even when there is nothing to publish.

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.publish</code></td>
    <td>Timer</td>
    <td>Time spent in the publisher per business event, tagged <code>result</code> (<code>success</code>, <code>failure</code>). A slow or unreachable receiver shows here: with the REST publisher, a timeout appears as a <code>failure</code> sample of about the request timeout.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.dispatch.batch.database</code></td>
    <td>Timer</td>
    <td>Time a batch spends outside the publisher — reading it, marking it delivered and committing — tagged <code>outcome</code>: <code>dispatched</code>, <code>empty</code>, <code>failed</code>, <code>lock-contended</code> (another node holds the rows), <code>error</code> (the batch was rolled back and will be published again), <code>interrupted</code>.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.dispatched</code></td>
    <td>Counter</td>
    <td>Business events published and marked delivered on this node.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.business.events.dispatch.last.activity.age.seconds</code></td>
    <td>Gauge</td>
    <td>Seconds since this node's dispatcher last completed a batch. A batch that was rolled back (<code>error</code>) does not count. It stays below the dispatch interval plus one batch while the dispatcher runs; alert when it grows.</td>
  </tr>
</table>

These meters are registered only while Business Events are enabled. Percentile histograms are off by default; enable one per meter with Spring Boot's `management.metrics.distribution.percentiles-histogram.<meter-name>=true`.

## Script Guard

<table class="table desc-table">
  <tr>
    <th>Meter</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.script.violations</code></td>
    <td>Counter</td>
    <td>Incremented on every Script Guard rule violation, tagged with the offending script's context (see <a href="#tags">Tags</a>).</td>
  </tr>
  <tr>
    <td><code>eximeebpms.script.violations.total</code></td>
    <td>Gauge</td>
    <td>Latest total from the configured Script Guard store, refreshed on the snapshot cadence and independent of tag values. Its lifetime follows that store and its retention; it is not a process-local counter.</td>
  </tr>
</table>

{{< note title="" class="info" >}}
See [Script Guard]({{< ref "/user-guide/process-engine/script-guard.md" >}}) for what a rule violation is and how the underlying policy is configured.
{{< /note >}}

## Ad-hoc subprocesses

| Meter | Type | Meaning |
|---|---|---|
| `eximeebpms.adhoc.turns.decisions.total` | Gauge | Sum of database-reported decision turns (`COMPLETED` or `BPMN_ERROR`) plus this node's unreported count |
| `eximeebpms.adhoc.turns.tasks.replaced.total` | Gauge | Sum of turn tasks replaced by another turn |
| `eximeebpms.adhoc.activations.total` | Gauge | Sum of inner flows started by activations of any source |
| `eximeebpms.adhoc.model.calls` | Counter | Worker-reported model calls on completed turns |
| `eximeebpms.adhoc.model.tokens.input` | Counter | Worker-reported input tokens on completed turns |
| `eximeebpms.adhoc.model.tokens.output` | Counter | Worker-reported output tokens on completed turns |

The first three gauges exist only if the engine counts these database metrics (`metricsEnabled` and the ad-hoc meters registered). They work at every history level. They include persisted counts from all nodes plus the local unreported count; another node's count appears after its database reporting interval (15 minutes by default). Deleting database metrics can lower the gauge. These are gauges, despite `.total` in their names: do not apply counter-reset assumptions to them.

The last three counters require history level `audit` or `full`, count only `COMPLETED` turns, and ignore usage fields the worker did not report. Tags are `tenant.id`, `process.definition.id`, `process.definition.key`, `activity.id` (the ad-hoc subprocess). Boot additionally requires history eventing; the container uses its direct history handler. They reset with the node, like the existing event counters.

# Prometheus names and units

The tables above use Micrometer names. The table below gives the default
Prometheus names with the co-released Prometheus adapter. It delegates the
installation's naming convention except for the Script Guard total gauge.
Prometheus reserves suffixes such as `_total` and `_created`: normalization can
remove them from an input name before adding the counter suffix. For example,
`eximeebpms.incidents.created` exports as `eximeebpms_incidents_total`; a gauge
whose Micrometer name ends in `.total` usually exports without that suffix.

The Script Guard gauge keeps Micrometer ID `eximeebpms.script.violations.total`
but exports as `eximeebpms_script_violations_current`. Its event counter exports
as `eximeebpms_script_violations_total`. This separates their metric families;
without the adapter they collide and one registration can be rejected. Update
any dashboard/query referring to the old exported gauge name. Include
`org.eximeebpms.bpm.monitor:eximeebpms-monitor-prometheus` when exporting engine
monitoring through Prometheus; it supplies this convention as well as the registry.
The REST starter and container distributions already include it. Other exporters
retain the original Micrometer IDs.

| Micrometer name | Prometheus sample name(s) | Unit |
|---|---|---|
| `eximeebpms.process.instances.started` | `eximeebpms_process_instances_started_total` | count |
| `eximeebpms.process.instances.ended` | `eximeebpms_process_instances_ended_total` | count |
| `eximeebpms.process.instances.running.total` | `eximeebpms_process_instances_running` | count |
| `eximeebpms.process.instances.running.suspended.total` | `eximeebpms_process_instances_running_suspended` | count |
| `eximeebpms.incidents.created` | `eximeebpms_incidents_total` | count |
| `eximeebpms.incidents.deleted` | `eximeebpms_incidents_deleted_total` | count |
| `eximeebpms.incidents.resolved` | `eximeebpms_incidents_resolved_total` | count |
| `eximeebpms.incidents.open.total` | `eximeebpms_incidents_open` | count |
| `eximeebpms.incidents.open.age.newest.seconds` | `eximeebpms_incidents_open_age_newest_seconds` | seconds |
| `eximeebpms.incidents.open.age.oldest.seconds` | `eximeebpms_incidents_open_age_oldest_seconds` | seconds |
| `eximeebpms.tasks.created` | `eximeebpms_tasks_total` | count |
| `eximeebpms.tasks.completed` | `eximeebpms_tasks_completed_total` | count |
| `eximeebpms.tasks.deleted` | `eximeebpms_tasks_deleted_total` | count |
| `eximeebpms.tasks.open.total` | `eximeebpms_tasks_open` | count |
| `eximeebpms.tasks.open.age.newest.seconds` | `eximeebpms_tasks_open_age_newest_seconds` | seconds |
| `eximeebpms.tasks.open.age.oldest.seconds` | `eximeebpms_tasks_open_age_oldest_seconds` | seconds |
| `eximeebpms.external.tasks.started` | `eximeebpms_external_tasks_started_total` | count |
| `eximeebpms.external.tasks.ended` | `eximeebpms_external_tasks_ended_total` | count |
| `eximeebpms.external.tasks.open.total` | `eximeebpms_external_tasks_open` | count |
| `eximeebpms.external.tasks.open.error.total` | `eximeebpms_external_tasks_open_error` | count |
| `eximeebpms.jobs.failed.total` | `eximeebpms_jobs_failed` | count |
| `eximeebpms.process.instances.finished.total` | `eximeebpms_process_instances_finished` | count |
| `eximeebpms.script.violations` | `eximeebpms_script_violations_total` | count |
| `eximeebpms.script.violations.total` | `eximeebpms_script_violations_current` | count |
| `eximeebpms.business.events.outbox.pending.estimate` | `eximeebpms_business_events_outbox_pending_estimate` | count |
| `eximeebpms.business.events.outbox.pending.age.oldest.seconds` | `eximeebpms_business_events_outbox_pending_age_oldest_seconds` | seconds |
| `eximeebpms.business.events.publish` | `eximeebpms_business_events_publish_seconds_count`, `eximeebpms_business_events_publish_seconds_sum`, `eximeebpms_business_events_publish_seconds_max` | count = attempts/batches; sum/max = seconds |
| `eximeebpms.business.events.dispatch.batch.database` | `eximeebpms_business_events_dispatch_batch_database_seconds_count`, `eximeebpms_business_events_dispatch_batch_database_seconds_sum`, `eximeebpms_business_events_dispatch_batch_database_seconds_max` | count = attempts/batches; sum/max = seconds |
| `eximeebpms.business.events.dispatched` | `eximeebpms_business_events_dispatched_total` | count |
| `eximeebpms.business.events.dispatch.last.activity.age.seconds` | `eximeebpms_business_events_dispatch_last_activity_age_seconds` | seconds |
| `eximeebpms.adhoc.turns.decisions.total` | `eximeebpms_adhoc_turns_decisions` | count |
| `eximeebpms.adhoc.turns.tasks.replaced.total` | `eximeebpms_adhoc_turns_tasks_replaced` | count |
| `eximeebpms.adhoc.activations.total` | `eximeebpms_adhoc_activations` | count |
| `eximeebpms.adhoc.model.calls` | `eximeebpms_adhoc_model_calls_total` | calls |
| `eximeebpms.adhoc.model.tokens.input` | `eximeebpms_adhoc_model_tokens_input_total` | tokens |
| `eximeebpms.adhoc.model.tokens.output` | `eximeebpms_adhoc_model_tokens_output_total` | tokens |

Timers export a cumulative attempt/batch count and cumulative elapsed seconds;
`_max` is a rolling time-window maximum, not a lifetime maximum. Histogram
buckets appear only when explicitly configured. Snapshot age values are seconds;
other snapshot gauges are counts or the estimate stated in their description.
Counters are process-local unless their table says otherwise. Tag keys replace
dots with underscores (`process.definition.key` → `process_definition_key`);
values keep their original meaning. A custom installation naming convention
may add its own prefix, which the adapter preserves.

# Tags

Meters are tagged as follows:

- Process instance meters (counters `started`/`ended`):
    - `process.definition.id`
    - `process.definition.key`
- Process instance gauges (`running`, `suspended`, `finished`):
    - `tenant.id`
    - `process.definition.id`
    - `process.definition.key`
- Incident meters:
    - `tenant.id`
    - `process.definition.id`
    - `process.definition.key`
    - `activity.id`
    - `failed.activity.id`
    - `incident.type`
- User task meters (related to a process instance):
    - `tenant.id`
    - `process.definition.id`
    - `process.definition.key`
    - `task.definition.key`
- User task gauges (related to a case instance):
    - `tenant.id`
    - `case.definition.id`
    - `task.definition.key`
- User task meters (stand-alone, not related to a process or case instance):
    - `tenant.id`
    - `task.name`
- External task meters:
    - `tenant.id`
    - `process.definition.id`
    - `process.definition.key`
    - `activity.id`
    - `topic.name`
- Failed job gauge:
    - `tenant.id`
    - `process.definition.id`
    - `process.definition.key`
- Script Guard violation counter (`eximeebpms.script.violations`, not the `.total` gauge, which carries no tags):
    - `process.definition.key`
    - `activity.id`
    - `language`
    - `origin`
    - `rule.code`

# Configuration

The extension provides the following Spring Boot properties. `enabled` controls all automatically configured engine listeners, periodic state measurements and worker monitoring, including the explicit `@EnableMonitoring` path. It leaves the engine, the host Micrometer registry and the separately secured Prometheus endpoint intact. Restart the application after changing these startup settings.

When migrating from the separate monitor, replace `eximeebpms.monitoring.snapshot.enabled` with `eximeebpms.monitoring.enabled` and move `snapshot.updateRate` to `eximeebpms.monitoring.updateRate`. The old keys are no longer consumed. The new switch has broader scope: `false` disables event-driven and worker meters as well as polling. Explicitly supplied application observers/meters remain application-owned.

<table class="table desc-table">
  <tr>
    <th>Property</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>eximeebpms.monitoring.enabled</code></td>
    <td><code>true</code></td>
    <td>Enable all automatic EximeeBPMS engine and worker measurements. Run explicitly sets this to false in default.yml and true in production.yml.</td>
  </tr>
  <tr>
    <td><code>eximeebpms.monitoring.updateRate</code></td>
    <td><code>10000</code></td>
    <td>Delay, in milliseconds, between completed periodic state refreshes; event counters update when their events occur.</td>
  </tr>
</table>

# Cluster Considerations

Enable monitoring on every instance whose local event counters are required. Each enabled engine instance also refreshes the database-state gauges. These gauges describe the same shared database, so select one instance's series or aggregate equivalent series without summing them (for example, use `max` while preserving the process-definition labels). Counter rates from different instances can be summed because they count local events. Do not disable the global switch on other nodes merely to reduce polling: this would also remove their event counters.

# Reporting Limitations

The extension's counters do not look up EximeeBPMS's history database, which keeps it lightweight and scalable. When an instance restarts or crashes, its counters reset to zero — so counter values in the monitoring system may not be exact. This is acceptable for application monitoring but not for reporting use cases that require exact figures. For exact reporting, use the history database directly or a history event handler — see [History Configuration]({{< ref "/user-guide/process-engine/history/history-configuration.md" >}}).
