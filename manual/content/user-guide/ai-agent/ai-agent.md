---
title: 'AI Agent'
weight: 20
menu:
  main:
    identifier: 'ai-agent-worker'
    parent: 'ai-agent-and-connectors'
---

{{< note title="Enterprise Edition only" class="warning" >}}
The agent worker executes decision turns of Enterprise worker-driven ad-hoc
subprocesses. It is shipped separately from the engine in Enterprise Connectors.
{{< /note >}}

## Inputs and local state

The agent reads local variables of its ad-hoc subprocess instance. A variable
named `agentContext` or `provider` on the enclosing process is not implicitly
an input: map it explicitly if this agent should consume it. Names containing
dots, such as `limits.maxModelCalls`, bind nested input fields.

| Model input | Meaning | Default |
| --- | --- | --- |
| `provider` | Named `ref`, or inline provider settings | Required |
| `systemPrompt` | Instructions included with every model call | None |
| `userPrompt` | Message starting or continuing a conversation in a new subprocess instance | Required |
| `memory.storage` | Conversation store | `variable` |
| `memory.contextWindowSize` | Recent conversation window sent to the provider | Worker default, `20` |
| `limits.maxModelCalls` | Maximum model calls for this subprocess instance | Worker default, `10` |
| `events` | Policy for event results while calls run | `waitForToolCallResults` |
| `audit.contentLevel` | Lower the worker audit level for this agent | Worker setting |
| `response.format` | `text` or `json` | `text` |
| `response.schema` | JSON Schema as an object or JSON object text | None |
| `response.includeAssistantMessage` | Add `responseMessage` to `agent` | `false` |
| `response.includeAgentContext` | Add `context` to `agent` for an explicit conversation handoff | `false` |
| `retries`, `retryBackoff` | External-task execution attempts and delay | `3`, `PT30S` |

The engine supplies `adHocSubProcessElements` and `toolCallResults`; the worker
maintains `agentContext`. Do not author their internal state in a model.

## Tool selection and completion

The engine describes activatable activities and their `fromAi` parameters. The
worker builds schemas from them and offers the corresponding tools to the model.
For an MCP gateway it first discovers the server's tools. Requested arguments
are validated before execution. Tool flows are persisted engine executions;
return values leave each flow through the subprocess's configured collection.

With tool calls outstanding, the agent waits for their results rather than
inventing a result or ending the process. A final usable assistant response
sets `agent` and completes the subprocess. The result is an object containing
`responseText` or `responseJson`, optionally `responseMessage` and `context`.
Map the typed local value out:

```xml
<camunda:outputParameter name="answer">${execution.getVariableLocalTyped('agent')}</camunda:outputParameter>
```

For JSON responses the worker validates the result. OpenAI Responses receives
the schema natively; other provider paths receive it in the system prompt.
An empty answer or invalid JSON/schema result triggers a correction within the
model-call limit. This is distinct from retrying a failed external task.

## Events and cancellation

A non-interrupting event can contribute new information while tools run. The
`events` policy controls whether the agent waits for tool results or requests
cancellation. [Events and Cancellation]({{< ref "/user-guide/ai-agent/events-and-cancellation.md" >}})
explains both policies, process modification, MCP discovery and external effects.

## Limits, errors and operations

`maxModelCalls` bounds logical calls recorded in this agent instance's state.
It is not a strict request/spending ceiling: failed attempts and rejected turn
completions can be repeated from an earlier persisted context and incur extra
billable calls. Worker audit/provider records are the cost-reconciliation source.
Exceeding the recorded limit raises an incident; increase it and resolve/retry
deliberately. A timeout,
provider rate limit or provider server failure can consume external-task retries.
Invalid input, rejected credentials, a denied destination, refusal/filtered
content and an unusable response at the limit require correction rather than
blind retries. Keep provider/HTTP timeouts within deployment shutdown budgets.

Incident diagnostics omit prompts and answers. Content logging and content
audit are separate opt-ins that can contain personal data. Read
[Observability and Model Usage]({{< ref "/user-guide/ai-agent/observability.md" >}})
for token usage and worker-side model metrics, and
[JDBC Storage and Administration]({{< ref "/user-guide/ai-agent/jdbc-storage.md" >}})
for retention and erasure. Engine turn
history, business events and usage are distinct from that worker-side audit.
