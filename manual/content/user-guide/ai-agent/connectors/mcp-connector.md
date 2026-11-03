---
title: 'MCP Connectors'
aliases: ["/user-guide/ai-agent/mcp-connector/"]
weight: 20
menu:
  main:
    identifier: 'ai-agent-mcp-connectors'
    parent: 'ai-agent-connectors'
---

{{< note title="Enterprise Edition only" class="warning" >}}
The MCP client connectors are external task workers in Enterprise Connectors.
They can call a tool directly or expose a server's tools to an AI agent.
{{< /note >}}

## Choose a connection

| Connector | Topic | Connection ownership |
| --- | --- | --- |
| MCP Client | `org.eximeebpms.agenticai:mcpclient:1` | `clientId` selects worker configuration; supports stdio, streamable HTTP and legacy SSE |
| MCP Remote Client | `org.eximeebpms.agenticai:mcpremoteclient:1` | Element supplies `transport`; supports streamable HTTP or legacy SSE, never stdio |

Prefer streamable HTTP (`type: http`) for a remote server. `sse` targets the older
HTTP-with-SSE transport and names the event-stream URL. For a centrally managed
connection:

```yaml
eximeebpms:
  connectors:
    mcp:
      timeout: 30s
      max-message-size: 4MB
      clients:
        knowledge:
          type: http
          url: https://knowledge.example.org/mcp
          authentication:
            type: bearer
            token: ${KNOWLEDGE_TOKEN}
```

On the element set `clientId=knowledge`. On a remote-client element set
`transport.type=http`, `transport.url` and, if required, `authentication`.
Headers accept a map or JSON object text. Use secret placeholders in supported
credential/header fields rather than literal credentials in BPMN.

## Call a tool directly

Set `operation` to a map or JSON object text:

```json
{
  "method": "tools/call",
  "params": {"name": "lookup", "arguments": {"topic": "returns"}}
}
```

`{"method":"tools/list"}` discovers the available tools instead. The connector
sets `toolCallResult`; map it out to the enclosing scope. A tool result follows
MCP's result structure, including content blocks and an optional `isError`.
Do not treat an MCP tool error as a successful business operation.

Authentication supports `none`, `basic`, `bearer`, `apiKey` and
`oauth2ClientCredentials`. The exact fields are in the
[configuration reference]({{< ref "/reference/ai-agent-and-connectors/configuration.md" >}}).
OAuth token endpoints and redirects remain subject to transport safeguards.

## Expose a server as an agent gateway

The MCP element inside the ad-hoc subprocess has an extension property:

```xml
<camunda:properties>
  <camunda:property name="org.eximeebpms.agenticai.gateway.type" value="mcpClient" />
</camunda:properties>
```

Map `operation` from `${toolCall}` and map the connector's local
`toolCallResult` out. The [MCP element templates]({{< ref "/user-guide/ai-agent/element-templates.md" >}})
set these bindings. The agent discovers the server before its first model call,
then exposes each accepted tool as `MCP_<elementId>___<toolName>`.

Use short, stable ids and server tool names. Model tool names must fit 64 ASCII
letters/digits/underscores/hyphens in total; a gateway element id cannot contain
the separating `___`. Individual server tools with invalid names or unusable
schemas are skipped with a warning. If a nonempty server list yields no usable
tools, or a discovered name collides with another tool, discovery raises an
incident. The gateway is not offered as an extra tool
alongside the discovered tools.

`tools.included` limits discovery/calls to named tools; `tools.excluded` wins
over inclusion. Each accepts a list or comma-separated names; blank means no
filter. Calling an excluded tool returns an error without calling the server.
Filtering helps minimize exposed operations, but it does not replace server-side
authorization. A model must not be able to acquire stronger server permissions.

## Stdio servers

Configure stdio only on the worker:

```yaml
eximeebpms:
  connectors:
    mcp:
      clients:
        knowledge:
          type: stdio
          command: /opt/knowledge/bin/server
          args: [--root, /data/knowledge]
          env:
            KNOWLEDGE_MODE: readonly
```

`command` in a process model is rejected. The subprocess inherits only `HOME`,
`LOGNAME`, `PATH`, `SHELL`, `TERM`, `USER` and explicit `env` entries, rather than
the worker's full environment. Configure every required credential deliberately.
The server runs with the worker's operating-system permissions; restrict its
filesystem and network access. The server's standard error goes to the logger
`org.eximeebpms.connectors.mcp.stderr` at DEBUG level and is discarded unless you
enable that level.

The stock Alpine/JDK bundle has no Node.js or Python runtime. A custom image
must install the server and its runtime using Alpine-compatible packages/musl
builds, and provide any required mounted data. Do not download and execute an
unversioned server on worker startup. Use the remote-server example for the
stock bundle.

## Timeouts, failures and shutdown

`eximeebpms.connectors.mcp.timeout` defaults to 30 seconds; a client/element may
set its own positive duration. The maximum inbound message defaults to 4 MiB.
Connections/TLS/token requests take bounded portions of the configured timeout.
MCP HTTP uses the shared HTTP network policy, proxy and SSL bundle, so allowing
an internal server also admits it to the REST connector. Allow only the intended
host, rather than an entire private network.

A `tools/call` that may already have reached the server is not retried: repeating
it might repeat a side effect. Connection/discovery errors and invalid inputs
have different retryability; inspect the incident and repair its cause before
retrying an uncertain business operation. Worker shutdown first drains tasks,
then closes MCP sessions/processes. Reserve the runtime shutdown timeout plus
15 seconds in a container termination grace period.
