---
title: 'Example: Support Agent'
description: "A complete example: a support agent that looks up an order over REST and a returns policy on an MCP server, with a human task. You can run it locally."
weight: 60
menu:
  main:
    identifier: 'ai-agent-support-example'
    parent: 'ai-agent-and-connectors'
---

{{< note title="Enterprise Edition only" class="warning" >}}
This example needs an Enterprise engine with worker-driven ad-hoc support and
compatible Enterprise Connectors. Local deterministic fixtures make development repeatable
without sending requests to a paid model provider.
{{< /note >}}

## What the example does

The process receives a request concerning order A-1. The model chooses
`getOrder`, which calls REST, then `MCP_knowledge___lookup`, which reads a returns
policy from a remote MCP server. It requests `askHuman` and waits at a real user
task. Only after that task completes does the agent return the human decision.
The example makes no real refund. Mandatory approvals for a real financial
operation must be enforced by process structure and permissions, not a prompt.

## Obtain the files

The source is in the Enterprise Connectors repository under
`examples/support-agent/`. The public manual also supplies the runnable files:

- [BPMN process](../../../examples/support-agent/support-agent.bpmn)
- [Worker configuration](../../../examples/support-agent/application.yaml)
- [REST, remote MCP and deterministic model fixtures](../../../examples/support-agent/fixtures.py)
- [Complete commands and troubleshooting](../../../examples/support-agent/README.md)

Save them in one local directory. Use Python 3 for fixtures, Java 21 or later for
the executable bundle, and an engine with REST, history and the job executor
enabled. Its worker account needs external-task and relevant process/variable/
history read permissions; the human task uses candidate group `support`.

## Start fixtures and worker

```sh
python3 fixtures.py
```

The fixture binds to loopback and prints `http://localhost:8095`. It serves
`/orders`, a streamable-HTTP MCP endpoint at `/mcp`, the scripted model API at
`/v1/responses`, and diagnostic call counts at `/stats`. It sends no external
requests and requires no account key.

From that directory run a compatible executable bundle, replacing the JAR path:

```sh
java -jar /path/to/eximeebpms-connectors-bundle.jar \
  --spring.config.additional-location=file:./
```

The configuration references named provider `default` and MCP client `knowledge`.
It allows `localhost` on every port, including the engine REST API; run this
example only against a development engine. Destination checking stays enabled. Protect engine credentials through private Spring/curl
configuration when the engine requires authentication. See the downloaded
README for the exact account and deployment setup.

## Deploy and start

```sh
curl --fail-with-body -F deployment-name=support-agent-example \
  -F 'data=@support-agent.bpmn;type=application/xml' \
  http://localhost:8080/engine-rest/deployment/create

curl --fail-with-body -H 'Content-Type: application/json' \
  -d '{"variables":{"customerMessage":{"type":"String","value":"Request a refund for order A-1."},"fixtureUrl":{"type":"String","value":"http://localhost:8095"}}}' \
  http://localhost:8080/engine-rest/process-definition/key/supportAgentExample/start
```

Keep the process instance id from the start response. Query
`GET /task?processInstanceId=<process-id>` on the engine REST API. The task named
`Approve refund`, with `taskDefinitionKey=askHuman`, remains open until a person
answers. Review its question, then complete it through Tasklist or:

```sh
curl --fail-with-body -H 'Content-Type: application/json' \
  -d '{"variables":{"humanAnswer":{"type":"String","value":"approved"}}}' \
  'http://localhost:8080/engine-rest/task/<task-id>/complete'
```

Use the actual returned task id. A task form is not created merely by mapping
the `question` input; supply a form for the user experience you need.

## Verify the result

Wait for `GET /history/process-instance/<process-id>` to report `COMPLETED`.
Read `answer` through
`GET /history/variable-instance?processInstanceId=<process-id>&variableName=answer&deserializeValues=false`.
Its JSON value should contain:

```json
{"responseText":"Refund approved for order A-1."}
```

A fresh fixture process serving one instance reports `orders=1`, `mcpCalls=1`
and `modelCalls=4`. The four model calls select REST, select MCP, ask the person
and produce the final answer. The fixture's token values are synthetic. A
rejection returns `Refund was not approved.`; the fixture does not infer approval
from the presence of an arbitrary answer.

## Switch to a real provider and clean up

In a private additional configuration, replace the fixture provider with a
supported built-in type, an account-supported model and a deployment secret.
Remove the fixture endpoint so requests use the vendor API. Restart the worker
and start a new instance; a real model may vary the call order or answer wording.
Verify actual REST/MCP activity, the open human task and an answer reflecting
that review. A real-provider run can incur provider charges; the local fixture run does not.

Stop the worker gracefully and then the fixtures. Remove only demo instances,
history and deployments using their saved ids and authorized engine APIs.
Never delete a shared database/schema to clean up an example.
