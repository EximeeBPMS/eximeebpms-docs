# Support agent: REST, remote MCP and a human task

The same BPMN model runs against deterministic local fixtures or a real model
provider. It reads order A-1 through REST, consults an MCP returns-policy tool,
waits for an actual user task and returns the human-approved result. It performs
no real refund. A prompt is not an authorization boundary for a real refund API.

The example is Enterprise-only. It requires Enterprise engine `1.4.3-ee` or
later, which runs worker-driven ad-hoc sub-processes, and connectors release
`1.0.0-ee`.

## Prerequisites

- Enterprise engine with REST, job executor and history enabled. For local
  fixtures use `http://localhost:8080/engine-rest`; `full` history makes audit and
  result inspection easiest. Do not use a production engine for this fixture.
- The connectors bundle `1.0.0-ee`, as the executable JAR
  `eximeebpms-connectors-bundle.jar` (Java 21+) or as the container image (see
  the manual page "Running the Connectors"). The commands below use
  `/path/to/eximeebpms-connectors-bundle.jar`.
- Python 3 and curl. The fixtures need only Python's standard library, bind to
  loopback and make no external requests. No provider account/key is needed.
- An engine deployment/start account and a human-task account. For an
  authenticated engine, supply credentials using protected curl configuration
  (`curl --config /secure/demo-curl.conf ...`) and worker Spring configuration.
  Never put passwords into a command or the BPMN file.

The worker needs external-task permissions plus runtime-variable/process reads
and process-definition history reads. The human reviewer needs access to the
`support` candidate group/task; the deployer needs deployment/start permissions.

## Run the local deterministic example

From this directory, start fixtures:

```sh
python3 fixtures.py
```

It prints `http://localhost:8095`. `/orders` serves order data, `/mcp` is a
remote streamable-HTTP MCP endpoint, `/v1/responses` is the deterministic model
fixture, and `/stats` counts calls. These are development fixtures, without
authentication. Keep them on loopback.

In a second terminal start the worker, passing this example's configuration
in addition to the bundle defaults (note the trailing slash):

```sh
java -jar /path/to/eximeebpms-connectors-bundle.jar \
  --spring.config.additional-location=file:./
```

`application.yaml` allows `localhost` beyond public destinations, on every port:
any model deployed to this worker can reach any loopback service, including the
engine REST API. Run this only against a development engine and worker. To point
the worker at another engine, `export ENGINE_REST_URL=...` before starting it.
The model fixture uses a named runtime provider because inline provider endpoints
must be HTTPS. Do not reuse this endpoint/key for a real provider. For a container
deployment, move fixtures to a dedicated host/network and change URLs and the
allow list explicitly; localhost inside the worker container is not this host.

Deploy and start:

```sh
curl --fail-with-body -F deployment-name=support-agent-example \
  -F 'data=@support-agent.bpmn;type=application/xml' \
  http://localhost:8080/engine-rest/deployment/create

curl --fail-with-body -H 'Content-Type: application/json' \
  -d '{"variables":{"customerMessage":{"type":"String","value":"Request a refund for order A-1."},"fixtureUrl":{"type":"String","value":"http://localhost:8095"}}}' \
  http://localhost:8080/engine-rest/process-definition/key/supportAgentExample/start
```

Save the returned process instance id as `<process-id>`. After the REST/MCP
steps, query its task:

```sh
curl --fail-with-body 'http://localhost:8080/engine-rest/task?processInstanceId=<process-id>'
```

The task has `taskDefinitionKey=askHuman`, name `Approve refund`. The process
remains active until a person answers. Inspect the task's variables/form and
approve deliberately through Tasklist or the API, using its returned `<task-id>`:

```sh
curl --fail-with-body -H 'Content-Type: application/json' \
  -d '{"variables":{"humanAnswer":{"type":"String","value":"approved"}}}' \
  'http://localhost:8080/engine-rest/task/<task-id>/complete'
```

The engine job executor appends the result and schedules the next decision.
Poll history until its state is `COMPLETED`, then inspect the answer and fixtures:

```sh
curl --fail-with-body 'http://localhost:8080/engine-rest/history/process-instance/<process-id>'
curl --fail-with-body 'http://localhost:8080/engine-rest/history/variable-instance?processInstanceId=<process-id>&variableName=answer&deserializeValues=false'
curl --fail-with-body http://localhost:8095/stats
```

Expected `answer` JSON: `{"responseText":"Refund approved for order A-1."}`.
With a fresh fixture process and exactly one run, expect `orders=1`, `mcpCalls=1`,
`modelCalls=4`: order call, policy call, approval call and final answer. Human
rejection produces `Refund was not approved.` instead. Counters accumulate if
you start more instances. Fixture token usage is synthetic and not a billing estimate.

Inspect the engine REST API at `/incident?processInstanceId=<process-id>` if it stalls. A completed tool
with no next turn suggests a job-executor/inner-flow incident. A waiting external
task suggests worker topic/credentials/connectivity. Provider errors, wrong MCP
mapping and denied destinations also produce incidents; changing retries does
not repair their causes.

## Real-provider demo

Keep the REST/MCP fixtures and BPMN. In a protected additional Spring config,
replace `aiagent.providers.default` with the chosen built-in type, a model
supported by the account and credentials sourced from the deployment secret
store. Remove the fixture `endpoint` so the worker uses the vendor endpoint;
set a suitable timeout and model-call limit. Do not commit that file.

Restart the worker, start a new instance and inspect actual model tool calls.
A real provider can choose a different sequence or final phrasing; demonstrate
that REST and MCP ran, an actual user task waited and the final answer reflects
the reviewer's decision. Do not use fixture call-count assertions as proof of
real-model behavior. Note the engine and connectors versions, the model and
provider and the human outcome, and keep history and audit evidence free of
personal data. This demo is a deliberate opt-in, with real provider cost.

## Cleanup

Stop the worker with SIGTERM/Ctrl+C, allowing its drain timeout plus MCP cleanup,
then stop fixtures with Ctrl+C. End/remove only the process instances and
deployments created for this demo, using engine APIs and the saved ids. Do not
delete shared engine storage or a shared JDBC schema. Erasing worker JDBC data,
if enabled, is separate from deleting engine history.
