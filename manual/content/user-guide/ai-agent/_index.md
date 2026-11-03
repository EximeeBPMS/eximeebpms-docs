---
title: 'AI Agent and Connectors'
weight: 58
menu:
  main:
    identifier: 'ai-agent-and-connectors'
    parent: 'user-guide'
---

{{< note title="Enterprise Edition only" class="warning" >}}
The AI agent and connectors run with EximeeBPMS Enterprise. The agent requires
an engine containing worker-driven ad-hoc subprocesses. The engine and connectors
have independent version lines; use compatible releases together.
{{< /note >}}

An AI agent chooses which BPMN activities to run to answer a request. The engine
owns the process, activities, human tasks and transaction boundaries. The agent
worker calls a language model outside the engine and requests the next steps.
The [Connectors catalog]({{< ref "/user-guide/ai-agent/connectors/_index.md" >}})
groups ready-made external task workers for REST, MCP and single-shot AI tasks.

## Choose an execution model

| Need | Use |
| --- | --- |
| Classify or extract data from one prompt, without tools | [AI Task]({{< ref "/user-guide/ai-agent/connectors/ai-task.md" >}}) |
| Let a model choose and combine tools, possibly waiting for a person | [AI agent]({{< ref "/user-guide/ai-agent/ai-agent.md" >}}) on a worker-driven ad-hoc subprocess |
| Call an HTTP API at a prescribed BPMN step | [REST connector]({{< ref "/user-guide/ai-agent/connectors/rest-connector.md" >}}) |
| Call or discover an MCP server's tools | [MCP connectors]({{< ref "/user-guide/ai-agent/connectors/mcp-connector.md" >}}) |
| Let a person or application activate ad-hoc activities without a model | [Engine ad-hoc API]({{< ref "/reference/bpmn20/subprocesses/ad-hoc-subprocess.md" >}}) |

## What happens in a turn

The engine makes the agent's decision turn available as an external task. The
worker reads its local inputs and available activities, restores conversation
memory and calls the configured model. A tool call activates a BPMN inner flow.
That flow may call REST, call MCP, evaluate DMN, invoke a process or wait at a
user task. Once results are available, the agent continues with them. A final
answer completes the subprocess and passes through its output mapping.

A user task can remain open while the worker restarts. The engine still owns
the task; the worker resumes from persisted state when a decision turn becomes
available. External side effects require the same idempotency care as other
external tasks: an HTTP timeout does not prove that a remote operation failed.

## Read by task

| Your task | Start here | Continue with |
| --- | --- | --- |
| Run an agent for the first time | [Getting Started]({{< ref "/user-guide/ai-agent/getting-started.md" >}}) | [Support-agent example]({{< ref "/user-guide/ai-agent/example-support-agent.md" >}}) |
| Design its behavior | [AI Agent]({{< ref "/user-guide/ai-agent/ai-agent.md" >}}) | Providers, BPMN tools, conversation memory, events and cancellation under that page |
| Add an integration activity | [Connectors catalog]({{< ref "/user-guide/ai-agent/connectors/_index.md" >}}) | REST, MCP or the single-shot AI Task |
| Author a BPMN model | [Modeling and Element Templates]({{< ref "/user-guide/ai-agent/element-templates.md" >}}) | [Manual XML recipe]({{< ref "/user-guide/ai-agent/ad-hoc-in-xml.md" >}}) |
| Run and maintain the worker | [Deployment and Operations]({{< ref "/user-guide/ai-agent/running-the-connectors.md" >}}) | JDBC administration and observability under that page |
| Check an exact setting, variable or dependency | [Configuration]({{< ref "/reference/ai-agent-and-connectors/configuration.md" >}}), [Variables]({{< ref "/reference/ai-agent-and-connectors/variables.md" >}}), [Dependencies]({{< ref "/reference/ai-agent-and-connectors/dependencies.md" >}}) | Separate deployment properties from BPMN inputs and connector versions from engine versions |

Conversation memory is the agent's working context. Worker audit, engine history
and provider billing answer different questions; see
[Observability and Model Usage]({{< ref "/user-guide/ai-agent/observability.md" >}})
when reconciling model calls or investigating replaced turns.
