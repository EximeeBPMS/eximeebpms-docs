---
title: 'Deployment and Operations'
description: "Run the connectors as a container image, an executable JAR or an embedded Spring Boot worker, with engine permissions, concurrency, health, metrics and shutdown."
weight: 50
menu:
  main:
    identifier: 'ai-agent-running-connectors'
    parent: 'ai-agent-and-connectors'
---

{{< note title="Enterprise Edition only" class="warning" >}}
Enterprise Connectors **1.0.0-ee** uses the worker-driven ad-hoc contract of
Enterprise engine **1.4.3-ee**. The worker and engine have independent version
lines. Use a version tag or image digest for production deployments.
{{< /note >}}

## Bundle image

The image is `<registry-host>/eximeebpms/eximeebpms-connectors-bundle`, in the same
private registry as the other Enterprise images (see
[Docker]({{< ref "/installation/docker.md" >}}) for how to obtain access). Choose
a verified version tag or digest. Releases are tagged `<version>-ee` and `latest`.
A mutable `latest` tag is not a compatibility guarantee.

```sh
docker run --rm --env-file worker.env \
  <registry-host>/eximeebpms/eximeebpms-connectors-bundle:1.0.0-ee
```

The command selects connector release `1.0.0-ee`. Keep the environment file
private; include `EXIMEEBPMS_BPM_CLIENT_BASE_URL` and the engine authentication
settings, as well as provider secrets. From a container, `localhost` is that
container, not the engine on another host. Use deployment DNS/networking.

The bundle uses Alpine 3.24, OpenJDK 25, `tini` and `TZ=UTC`. It runs as numeric
UID/GID `1000`. Its port is `8090`; the engine normally uses `8080`. Mount only
the data/configuration the worker needs. The image contains no Node.js or Python
runtime for stdio MCP; install required servers/runtimes in a derived image.

## Executable bundle JAR

Obtain `org.eximeebpms.connectors:eximeebpms-connectors-bundle:1.0.0-ee` from
Enterprise Maven/Nexus using your account's repository access. The deployed
executable is named `eximeebpms-connectors-bundle-1.0.0-ee.jar`. Replace the
version consistently across connector modules. The example commands use a copy renamed to
`eximeebpms-connectors-bundle.jar`; Java 21 or later is required for host execution.
Use the image when its packaged runtime and drivers fit your deployment.

## Embedded Spring Boot worker

Use Maven group `org.eximeebpms.connectors` with a consistent released version:
`eximeebpms-connectors-spring-boot-starter` plus desired connector artifacts
(`eximeebpms-connector-rest`, `eximeebpms-connector-mcp`, `eximeebpms-ai-agent`).
The starter discovers connector beans and their dependencies. The bundle is
already assembled with these; do not add it as a library to another application.
The connector Java baseline is 21; the stock image's JDK is a separate choice.

Add `eximeebpms-ai-agent-jdbc` and a configured persistent data source for JDBC
memory/audit. The starter does not turn on JDBC features merely because the
module is present. Host Flyway/Liquibase and the worker's private relocated
Flyway have independent histories and configuration.

## Engine permissions and worker concurrency

Set `eximeebpms.bpm.client.base-url` and the engine client's basic-auth settings
or an application-supplied request interceptor. Use an account with the external
task permissions needed for its definitions/tasks. The agent's REST reads also
need `READ` on process instances and `READ_HISTORY` on process definitions, as
well as access to relevant runtime variables/history. Late usage reporting for
replaced turns additionally needs `UPDATE_HISTORY` on the process definition
and access to the process tenant. Test under that account;
an administrator smoke test can conceal missing permissions.

The runtime subscribes per connector id, defaulting to `enabled=true`,
`max-concurrency=16`, `lock-duration=1m`. Per-id values under
`eximeebpms.connectors.connector` override `defaults`. Each running call uses a
virtual thread; increasing concurrency still increases provider/API/database
load. Locks extend while work runs. Multiple replicas must have distinct worker
ids; the bundle takes `HOSTNAME` when available.

The bundle long-polls for ten seconds and uses a 20-connection engine HTTP pool.
Long polling avoids waiting for an idle polling backoff between agent turns.
Do not confuse the engine connection with REST/MCP/provider destination policy.

## Health, metrics and logging

The bundle exposes health/info/Prometheus Actuator endpoints. Configure access
at the deployment edge; the bundle does not add authentication for arbitrary
Actuator endpoints. Keep management endpoints on a protected network.

Runtime metrics describe connector executions (`eximeebpms.connectors.tasks` by connector, topic
and outcome, and `eximeebpms.connectors.tasks.active`); model metrics are under
`eximeebpms.connectors.aiagent.model.*`. The engine separately records ad-hoc
turns and model usage. Enable the required meter registry/export path and verify
scraping on the worker as well as on the engine. See
[Observability and Model Usage]({{< ref "/user-guide/ai-agent/observability.md" >}}).

Payload logging is off by default. `content-logging=true` can expose inputs,
results and personal data; it is not the same setting as audit content level.
Do not enable HTTP wire/header logging or vendor SDK debug logs in production
without reviewing their credential exposure.

## Schema administration and shutdown

With JDBC enabled, `schema-update=true` migrates the complete worker schema;
`false` validates it read-only. Use the separately packaged
`eximeebpms-agent-schema-tool` executable JAR, the SQL archive or bundle `schema`
mode for administrator-controlled changes. Follow
[JDBC Storage and Administration]({{< ref "/user-guide/ai-agent/jdbc-storage.md" >}})
for protected credential files, SQL registration, database drivers and failure recovery. Never repair a failed history entry by
deleting it or by letting worker startup guess which statements succeeded.

The worker first drains running tasks for `shutdown-timeout` (30 seconds),
continuing lock extension, then closes MCP resources. Allow at least that timeout
plus 15 seconds before the platform force-kills it. Tasks still running when
lock extension ends may be offered again after expiry; external effects must be
idempotent or reconciled. Persist JDBC data and engine state across restarts.

## Compatibility and dependencies

The engine and connectors have independent version lines. Check
[Connector Dependencies and Compatibility]({{< ref "/reference/ai-agent-and-connectors/dependencies.md" >}})
for the documented worker baseline, SDKs and isolated migration libraries.
The engine's Tech Stack does not describe the connector bundle's dependencies.
