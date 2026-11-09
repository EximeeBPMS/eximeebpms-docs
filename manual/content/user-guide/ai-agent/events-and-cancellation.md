---
title: 'Events and Cancellation'
weight: 40
menu:
  main:
    identifier: 'ai-agent-events'
    parent: 'ai-agent-worker'
---

{{< note title="Enterprise Edition only" class="warning" >}}
These policies apply to the AI agent on a worker-driven ad-hoc subprocess.
{{< /note >}}

## Event policies

A non-interrupting event subprocess can contribute an event result. Preserve
the `source` field in `outputElement`, as in the XML recipe, to distinguish it
from a model call result. With `waitForToolCallResults`, event content is added
after outstanding tool calls finish. With `interruptToolCalls`, unfinished
calls are represented as cancelled tool replies before the next model call.
Their BPMN flows are cancelled when the engine accepts the worker's result;
they may still run while the model request is in progress. Event flow content
is then included; an empty event still informs
the model that an event occurred.

An event during MCP discovery waits for that discovery. Cancelling discovery
raises an incident rather than silently offering an incomplete tool set.
Calls cancelled through process modification can be detected through the
engine REST API. The worker account must be able to read their executions;
an authorization failure is not evidence that a call was cancelled.

Cancellation of a BPMN flow cannot reverse a request already accepted by an
external service. Use idempotency keys and a compensation/reconciliation design
for tools that change external state. The engine does not evaluate output
mappings of cancelled ad-hoc inner activities; keep mappings safe for any
other cancellation context in which they are evaluated.


## Process instance modification

When process instance modification cancels a tool flow, the engine schedules a
new worker turn, including for a single waiting user task. Cancellation appends
no tool result and does not evaluate the modelled completion condition; the
worker detects which call was cancelled through the engine REST API.

## Provider and engine connectivity

An alternative OpenAI-compatible endpoint must also accept event conversations with a user message
following tool results. OpenAI/Anthropic implementations do not imply compatibility with every other
provider's message-ordering rules; verify that endpoint before enabling event flows.

The agent's optional `engine-rest.base-url` override inherits client credentials/interceptors only
for the same origin. For a different scheme, host or port, configure credentials explicitly. A password
without a username fails configuration. This prevents a URL override from forwarding engine credentials
to a different service.
