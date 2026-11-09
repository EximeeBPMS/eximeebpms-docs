---
title: 'Conversation Memory'
weight: 30
menu:
  main:
    identifier: 'external-task-client-ai-agent-memory-audit'
    parent: 'ai-agent-worker'
---

{{< note title="Enterprise Edition only" class="warning" >}}
The AI agent worker is part of EximeeBPMS Enterprise Connectors, released separately from the engine.
It requires an engine with worker-driven ad-hoc subprocesses.
{{< /note >}}

The agent runs outside the engine. It receives decision turns from an ad-hoc subprocess, calls a model,
and activates the BPMN tools the model requests. A tool can wait for a person in Tasklist. The model's
conversation and audit are worker data; the engine separately records process execution and turn history.

## Default memory and conversation handoff

The default `variable` store keeps conversation messages in `agentContext`,
local to the ad-hoc subprocess. `memory.contextWindowSize` controls the recent
conversation sent to the model (worker default 20); it does not impose a retention
policy on engine history. Tool definitions and provider checkpoint data are worker
state too. Do not edit `agentContext` to trim storage or copy only its visible text.

To continue a conversation in a later agent instance, request
`response.includeAgentContext=true`, then map that answer's `context` explicitly
into the next instance's local `agentContext` input. An enclosing variable of the
same name is not implicitly consumed. Independent instances without that handoff
start independent conversations, even with identical prompts.

A custom `ConversationStore` Spring bean can supply another storage type in an
embedded worker. The unmodified bundle includes variable and opt-in JDBC stores;
adding a type name in BPMN alone does not install an implementation.

## Choose a storage backend

| Backend | Choose it when | What is kept in the engine |
| --- | --- | --- |
| `variable` | The conversation fits your process-variable and history policy | Conversation state in `agentContext` |
| `jdbc` | Conversation bodies need separate worker storage, retention or erasure | A conversation id and version; bodies stay in the worker database |
| Custom `ConversationStore` | An embedded deployment supplies another store implementation | The reference defined by that implementation |

[JDBC storage and administration]({{< ref "/user-guide/ai-agent/jdbc-storage.md" >}})
covers enabling storage, schema migration, retention and erasure. For audit
content and cost reconciliation, see [Observability and Model Usage]({{< ref "/user-guide/ai-agent/observability.md" >}}).
Conversation memory, worker audit and engine history are separate records;
changing one storage/retention policy does not change the others.
