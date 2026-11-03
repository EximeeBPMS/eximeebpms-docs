---
title: 'Connectors'
weight: 30
menu:
  main:
    identifier: 'ai-agent-connectors'
    parent: 'ai-agent-and-connectors'
---

{{< note title="Enterprise Edition only" class="warning" >}}
Enterprise Connectors are released separately from the engine. Use compatible
engine and connector versions together.
{{< /note >}}

Connectors are ready-made external task workers that execute a BPMN activity.
Use them in a prescribed process flow or expose their activities as tools of
an [AI agent]({{< ref "/user-guide/ai-agent/ai-agent.md" >}}).
This catalog groups the available connectors and their task configuration.

| Connector | What it does | Task topic |
| --- | --- | --- |
| [REST Connector]({{< ref "rest-connector.md" >}}) | Calls an HTTP API with authentication, request/response mapping and destination controls | `org.eximeebpms:http-json:1` |
| [MCP Client]({{< ref "mcp-connector.md" >}}) | Calls tools on a centrally configured stdio, streamable HTTP or SSE server; can expose its tools to an agent | `org.eximeebpms.agenticai:mcpclient:1` |
| [MCP Remote Client]({{< ref "mcp-connector.md" >}}) | Calls tools on an HTTP/SSE server supplied by the BPMN element | `org.eximeebpms.agenticai:mcpremoteclient:1` |
| [AI Task]({{< ref "ai-task.md" >}}) | Sends a prompt to a model without tools or conversation | `org.eximeebpms.agenticai:aiagent:1` |

The [AI agent worker]({{< ref "/user-guide/ai-agent/ai-agent.md" >}}) orchestrates
an ad-hoc subprocess rather than a single service task. Its native user-task,
DMN and call-activity tools are described in [Tools]({{< ref "/user-guide/ai-agent/tools.md" >}}).

For shared worker installation, engine authentication, retries, health and
operations, see [Running the Connectors]({{< ref "/user-guide/ai-agent/running-the-connectors.md" >}}).
Use [Element Templates]({{< ref "/user-guide/ai-agent/element-templates.md" >}})
to configure activities in the modeler. The [support-agent example]({{< ref "/user-guide/ai-agent/example-support-agent.md" >}})
combines REST, MCP and human approval in one process.
