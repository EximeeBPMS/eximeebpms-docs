---
title: 'Agent and Tool Variables'
description: "The variables in the agent scope and the tool flow scope, the result collection contract, and how the final answer and handoff are returned."
weight: 20
menu:
  main:
    identifier: 'ai-agent-variable-reference'
    parent: 'ai-agent-reference'
---

{{< note title="Enterprise Edition only" class="warning" >}}
These variables connect the Enterprise engine's worker-driven ad-hoc contract
to the external agent and tool workers. Keep their scopes explicit.
{{< /note >}}

## Agent scope

| Variable | Producer | Scope and meaning |
| --- | --- | --- |
| `provider`, `systemPrompt`, `userPrompt`, `memory`, `limits`, `events`, `audit`, `response` | Subprocess input mappings | Agent inputs are read locally; an enclosing process variable is not implicitly an input |
| `adHocSubProcessElements` | Engine | Local JSON description of activatable elements, their properties and `fromAi` parameters; established once per instance |
| `adHocTurnCount` | Engine | Local turn sequence; a turn is not necessarily a billable model call |
| `adHocCompletionConditionFulfilled` | Engine | Worker-driven completion state; do not overwrite it |
| `toolCallResults` | Engine output collection | Appended entries from completed tool/event flows; input to subsequent turns |
| `agentContext` | Agent | Worker-managed state: conversation or JDBC reference, tool definitions/checkpoints and run bookkeeping |
| `agent` | Agent | Final answer object, local to this agent scope |

Do not overwrite engine-owned variables in a custom worker's completion.
`agentContext` on the enclosing process does not continue a conversation unless
explicitly mapped into this scope. Pass a previous answer's `context` when
`response.includeAgentContext=true`; do not manufacture or edit internal state.

## Tool flow scope

| Variable | Producer | Meaning |
| --- | --- | --- |
| `toolCall` | Activation/agent | Model arguments with reserved `_meta.id` and `_meta.name`; an empty map for activations without arguments |
| `adHocActivationSource` | Engine | Local activation source, including `WORKER`, `ENTRY`, `API`, `MODIFICATION`; event flows are identified separately |
| `response` | REST connector | HTTP result, including `status`, `headers`, `body`; unrelated to the agent's `response` input in another scope |
| `toolCallResult` | Tool/output mapping | Value contributed by a completed flow; MCP results must stay intact for discovery |

Every activation has its own inner flow. A task result, variable update or
removal in one flow does not modify another flow or an outer variable with the
same name. Reads can still see enclosing variables. This isolation is why a
tool needs an output mapping and why the subprocess needs `outputElement`.

## Result collection contract

The agent's collection entry has the following shape:

```json
{
  "id": "call_order",
  "name": "getOrder",
  "content": {"orderId": "A-1", "status": "delivered"},
  "source": "WORKER"
}
```

`id` and `name` come from `toolCall._meta`, `content` from `toolCallResult`,
and `source` from the flow-local activation source. The
[XML recipe]({{< ref "/user-guide/ai-agent/ad-hoc-in-xml.md" >}}) gives the mapping.
For MCP discovery, `content` contains `toolDefinitions`; for MCP calls, preserve
the MCP content/error structure. Event content must not impersonate a completed
model call.

Completing a task returns before the engine's inner-flow completion job appends
the collection entry. A job executor is required. Cancelled flows append no
entry; cancellation is handled as a separate agent/engine lifecycle event.

## Final answer and handoff

```json
{"responseText":"Refund approved for order A-1."}
```

JSON format uses `responseJson` instead. `includeAssistantMessage` adds
`responseMessage`; `includeAgentContext` adds `context`. Read the local typed
value in an output mapping, for example
`${execution.getVariableLocalTyped('agent')}`, and map it to an intentional
process variable such as `answer`. That preserves JSON serialization and avoids
accidentally reading an enclosing variable named `agent`.

Engine history, business events, worker audit and conversation memory have
separate storage and retention. Erasing JDBC worker data does not erase process
history or variables already exported to the enclosing process.

For attempt outcomes and differences between engine usage, worker metrics and
provider billing, see [Observability and Model Usage]({{< ref "/user-guide/ai-agent/observability.md" >}}).
