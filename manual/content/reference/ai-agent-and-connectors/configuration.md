---
title: 'Connector Worker Configuration'
description: "All worker properties and environment variables: runtime, HTTP, agent defaults, named providers, memory and audit, JDBC, MCP, and the bundle and engine client."
weight: 10
menu:
  main:
    identifier: 'ai-agent-config-reference'
    parent: 'ai-agent-reference'
---

{{< note title="Enterprise Edition only" class="warning" >}}
Deployment properties of Enterprise Connectors. These are worker settings,
not BPMN input parameters. The bundle includes every connector; an embedded
application enables features through its dependencies and Spring beans.
{{< /note >}}

## Binding and environment variables

Use `application.yaml`, a mounted Spring configuration file or environment
variables. For canonical environment names, uppercase the property, replace
dots with underscores and remove hyphens. List indices become underscore-delimited
numbers. For example `eximeebpms.connectors.shutdown-timeout` becomes
`EXIMEEBPMS_CONNECTORS_SHUTDOWNTIMEOUT`; `server.port` becomes `SERVER_PORT`.
Use simple alphanumeric map ids with environment binding; use YAML/bracket
notation for map keys whose punctuation must be preserved.

Named provider credentials can use
`EXIMEEBPMS_CONNECTORS_AIAGENT_PROVIDERS_DEFAULT_APIKEY` for provider `default`.
Connector secret placeholders have a separate lookup contract:
`{{secrets.ORDERS_TOKEN}}` reads `eximeebpms.connectors.secrets.ORDERS_TOKEN`
or exactly `EXIMEEBPMS_CONNECTORS_SECRETS_ORDERS_TOKEN`.

Durations below accept Spring duration syntax in deployment configuration,
for example `30s`/`2m`/`30d`. Element input durations use ISO-8601, such as
`PT30S`. Data sizes accept units such as `1MB`; numeric element size inputs
are bytes. An unset property is not an instruction to pass the text `null`.

## Runtime

Prefix `eximeebpms.connectors`:

| Property | Default | Meaning |
| --- | --- | --- |
| `content-logging` | `false` | DEBUG payload logging on `org.eximeebpms.connectors.runtime.content`; may contain personal data |
| `shutdown-timeout` | `30s` | Drain running tasks with lock extension; allow another 15 seconds for MCP teardown |
| `defaults.enabled` | `true` | Subscribe connectors to their topics |
| `defaults.max-concurrency` | `16` | Concurrent tasks per connector |
| `defaults.lock-duration` | `1m` | Initial lock and repeated extension duration |
| `connector.<id>.enabled` | Inherit defaults | Per-id subscription override |
| `connector.<id>.max-concurrency` | Inherit defaults | Per-id concurrency override |
| `connector.<id>.lock-duration` | Inherit defaults | Per-id lock override |
| `secrets.<NAME>` | None | Named credential value; not ordinary input binding |

Connector ids are `http-json`, `ai-agent`, `ai-task`, `mcp-client` and
`mcp-remote-client`. Disabling one id does not disable a provider shared by
other connectors. Model inputs `retries`/`retryBackoff` override execution retry
defaults: three attempts, ten-second backoff for REST/MCP, thirty seconds for
AI agent/task. Invalid/nonretryable input errors raise an incident immediately.

## HTTP transport

Prefix `eximeebpms.connectors.http` is shared by REST, MCP HTTP and provider
network clients:

| Property | Default | Meaning |
| --- | --- | --- |
| `network-policy.allow[].host` | Empty | Exact host or `*.domain` allowed beyond public destinations |
| `network-policy.allow[].cidr` | Empty | Allowed address/range; choose either host or CIDR in one entry |
| `network-policy.deny[].host` | Empty | Always denied host/pattern, including public destinations |
| `network-policy.deny[].cidr` | Empty | Always denied address/range; deny wins over allow |
| `max-response-size` | `1MB` | REST response limit; an element may lower it, never raise it |
| `ssl-bundle` | JVM trust | Named `spring.ssl.bundle` trust material |
| `proxy.url` | None | HTTP proxy URL |
| `proxy.username`, `proxy.password` | None | Basic proxy credentials |
| `proxy.non-proxy-hosts[]` | Empty | Hosts/patterns reached directly and checked through destination DNS |

Through a proxy, destination DNS is resolved at the proxy. The worker checks
host entries/address literals, but the proxy must enforce the network policy
on resolved destinations. A private-host allow entry is shared across all
these clients; it is not a per-process permission. See the REST guide's
[internal-address instructions]({{< ref "/user-guide/ai-agent/connectors/rest-connector.md" >}}).

## Agent defaults and engine reads

Prefix `eximeebpms.connectors.aiagent`:

| Property | Default | Meaning |
| --- | --- | --- |
| `default-context-window-size` | `20` | Conversation window when absent from model inputs |
| `default-max-model-calls` | `10` | Agent instance model-call bound |
| `default-task-max-model-calls` | `3` | Single-shot task bound, including response corrections |
| `agent-context-warning-size` | `262144` | Warn above this JSON-text state size; includes tool definitions even with JDBC |
| `engine-rest.base-url` | Client URL | API for cancellation/history checks |
| `engine-rest.username`, `engine-rest.password` | Client auth | Optional paired basic-auth override |
| `engine-rest.timeout` | `30s` | Bounds one engine REST response |

Without a separate engine REST URL, the agent uses the external-task client's
URL, basic authentication and request interceptors. A separately configured
origin does not receive the original client's credentials/interceptors
implicitly. Supply credentials deliberately and test its permissions.

## Named providers

Prefix `eximeebpms.connectors.aiagent.providers.<name>`:

| Property | Default | Meaning |
| --- | --- | --- |
| `type` | Required | `openai`, `anthropic`, or registered custom provider type |
| `model` | Required | Provider model name |
| `api-key` | Required for built-ins | Runtime credential; keep outside BPMN |
| `api` | `responses` | OpenAI API family; alternative `chatCompletions` |
| `endpoint` | Vendor endpoint | Runtime API base URL override |
| `temperature`, `top-p` | Model default | Sampling controls |
| `max-tokens` | Provider default | Anthropic defaults to `4096` |
| `timeout` | `10m` | Whole model-call timeout |
| `options` | Empty map | Provider-specific allowed native options |

Read [Providers]({{< ref "/user-guide/ai-agent/providers.md" >}}) for the option
allow lists, inline-provider restrictions and secret boundaries. Unknown or
incomplete named provider settings are warned about at startup; an agent that
references an unusable provider raises an incident.

## Memory, audit and JDBC

Prefix `eximeebpms.connectors.aiagent`:

| Property | Default | Meaning |
| --- | --- | --- |
| `memory.jdbc.enabled` | `false` | Enable store `jdbc` |
| `memory.jdbc.retention` | `30d` | Retain conversation after its process instance ends |
| `audit.enabled` | `false` | Persist worker turn/model audit |
| `audit.content-level` | `metadata` | `content` also records bounded prompts/results; agent can lower the level |
| `audit.max-content-size` | `4000` | Characters per recorded content item |
| `audit.retention` | `90d` | Worker audit retention |
| `jdbc.schema-update` | `true` | Migrate at startup; `false` validates read-only |
| `jdbc.table-prefix` | `EXB_AGENT_` | A letter followed by letters, digits or underscores, at most 18 characters; normalized uppercase |
| `jdbc.allow-in-memory-database` | `false` | Explicitly permit restart-volatile database storage |
| `jdbc.erased-mark-retention` | Unset | Optional maximum age of erasure marks; running processes may write again after expiry |
| `jdbc.cleanup.enabled` | `true` | Periodic retention/obsolete-version cleanup |
| `jdbc.cleanup.interval` | `1h` | Cleanup interval |

Configure `spring.datasource.url`, `username`, `password` and the required
driver for persistent storage. No explicit data source and disabled JDBC
features produce no embedded pool in the bundle. Schema tool command settings
use `EXIMEEBPMS_SCHEMA_*`, not the worker's property prefix.

Agent erasure is disabled by default. Set
`management.endpoint.aiagentdata.access` explicitly and expose `aiagentdata`
only behind authentication. Global Actuator access defaults do not enable it.
The endpoint erases worker records/marks for selected process instances, not
engine history; see [JDBC Storage and Administration]({{< ref "/user-guide/ai-agent/jdbc-storage.md" >}}).

## MCP

Prefix `eximeebpms.connectors.mcp`:

| Property | Default | Meaning |
| --- | --- | --- |
| `max-message-size` | `4MB` | Maximum inbound server message |
| `timeout` | `30s` | Default positive request timeout |
| `clients.<id>.type` | Required | `stdio`, `http` or `sse` |
| `clients.<id>.command` | None | Stdio program, allowed only in runtime configuration |
| `clients.<id>.args[]` | Empty | Program arguments |
| `clients.<id>.env` | Empty | Extra subprocess environment; restricted inheritance |
| `clients.<id>.url` | None | Remote MCP endpoint or SSE stream URL |
| `clients.<id>.headers` | Empty | Remote HTTP headers |
| `clients.<id>.timeout` | MCP default | Positive per-client override |
| `clients.<id>.authentication.type` | `none` | `none`, `basic`, `bearer`, `apiKey`, `oauth2ClientCredentials` |
| `clients.<id>.authentication.username`, `.password` | None | Basic credentials |
| `clients.<id>.authentication.token` | None | Bearer token |
| `clients.<id>.authentication.name`, `.value` | None | API-key header name/value |
| `clients.<id>.authentication.oauth-token-endpoint` | None | OAuth token endpoint |
| `clients.<id>.authentication.client-id`, `.client-secret` | None | OAuth client credentials |
| `clients.<id>.authentication.scopes`, `.audience` | None | Optional OAuth fields |

Model inputs `clientId`, `operation`, `tools.included`/`tools.excluded` and
remote `transport.*` are described under
[MCP Connectors]({{< ref "/user-guide/ai-agent/connectors/mcp-connector.md" >}}).
An element cannot configure a stdio command or override the worker's maximum
message size. Authentication and transport setup still obey shared destination
restrictions.

## Bundle and engine client

`server.port` defaults to `8090`. The bundle exposes `health`, `info` and
`prometheus`, with health probes enabled. Configure management access separately.
The engine connection uses the engine external-task starter's
`eximeebpms.bpm.client.*`, including base URL, worker id and basic authentication.
The bundle defaults to `http://localhost:8080/engine-rest`, `HOSTNAME` or
`eximeebpms-connectors` as worker id, and `async-response-timeout=10000` milliseconds.
Use deployment-appropriate URLs and credentials instead of relying on localhost.
