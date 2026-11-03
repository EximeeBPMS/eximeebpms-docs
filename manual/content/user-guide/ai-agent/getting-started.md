---
title: 'Getting Started with an AI Agent'
weight: 10
menu:
  main:
    identifier: 'ai-agent-getting-started'
    parent: 'ai-agent-and-connectors'
---

{{< note title="Enterprise Edition only" class="warning" >}}
Use an Enterprise engine with worker-driven ad-hoc support and a compatible
connectors bundle. The first stable connectors release depends on that engine
release. The runnable source example also supports deterministic local fixtures.
{{< /note >}}

## Prepare the engine and worker

Start the Enterprise engine with REST and the job executor enabled. The worker
must reach `/engine-rest`; tools and providers must be reachable from the worker,
which can run on a different host. A browser reaching an API is not evidence
that the worker can reach it.

Run the connectors bundle or add the connectors Spring Boot starter and desired
connector modules to your application. Follow
[Running the Connectors]({{< ref "/user-guide/ai-agent/running-the-connectors.md" >}})
for authentication, image and shutdown settings. Start with one named provider:

```yaml
eximeebpms:
  bpm:
    client:
      base-url: http://localhost:8080/engine-rest
      basic-auth:
        username: ${ENGINE_WORKER_USER}
        password: ${ENGINE_WORKER_PASSWORD}
  connectors:
    aiagent:
      providers:
        default:
          type: openai
          model: ${AI_MODEL}
          api-key: ${AI_API_KEY}
```

Supply a model supported by your account; prompts and tool schemas must fit its
context and capabilities. No key belongs in the BPMN file. Named provider keys
use Spring configuration placeholders; inline BPMN credentials use the
connector's `{{secrets.NAME}}` syntax instead. See
[Providers]({{< ref "/user-guide/ai-agent/providers.md" >}}).

## Prepare a model

Create the worker-driven ad-hoc subprocess described by the
[complete XML recipe]({{< ref "/user-guide/ai-agent/ad-hoc-in-xml.md" >}}).
Its topic is `org.eximeebpms.agenticai:aiagent-job-worker:1`, and its inputs include
`provider.ref=default`, a system prompt and a user prompt. Activities directly
inside it without an incoming sequence flow become candidate tools. Give each
a stable id, useful documentation and an output mapping for `toolCallResult`.

The subprocess's `adHoc` extension collects results, including call ids and
names, into `toolCallResults`. Its output mapping exposes the final `agent`
answer to the enclosing process. Do not replace this with a completion condition
for an ordinary expression-driven ad-hoc subprocess.

## Deploy, execute and inspect

Deploy the BPMN file through the engine's deployment API or application
deployment. Start the process with its expected variables. For the example:

```json
{
  "variables": {
    "customerMessage": {
      "type": "String",
      "value": "Please check order A-1 and request approval for a refund."
    }
  }
}
```

The [support-agent walkthrough]({{< ref "/user-guide/ai-agent/example-support-agent.md" >}})
gives complete deploy/start/complete commands and expected output. Inspect
incidents if the agent does not proceed. Check the job executor when tools have
finished but their inner flows do not complete. Check the provider, network
allow list and topic subscriptions when an external task waits.

Enable JDBC memory or audit only after configuring a persistent data source
and schema lifecycle. The default memory lives in `agentContext`; the default
audit does not create worker database tables.
