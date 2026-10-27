---

title: 'AI Task'
weight: 305

menu:
  main:
    name: "AI Task"
    identifier: "external-task-client-ai-task"
    parent: "external-task-client"

---

{{< note title="Enterprise Edition only" class="warning" >}}
The AI task is part of **EximeeBPMS Connectors**, a set of ready-made external task workers for the Enterprise Edition, released separately from the engine. It is not released yet.
{{< /note >}}

The AI task sends one prompt to a language model, without tools, from a BPMN service task — for example to classify a customer's message or to extract data from a document's text. It runs as an external task worker next to the engine, in the connectors bundle image or in your own Spring Boot application, so the model call happens outside the engine transaction, with the external task's retries, locks and incidents.

Unlike the AI agent, the task drives no ad-hoc sub-process, offers the model no tools and keeps no conversation: every execution starts from its prompts.

# Configure a Task

The element is an external service task (or send task) with the topic `org.eximeebpms.agenticai:aiagent:1`. The element template **AI Task** (below) sets this up and offers a form for every input. Without a template:

```xml
<bpmn:serviceTask id="classify" name="Classify message"
    camunda:type="external" camunda:topic="org.eximeebpms.agenticai:aiagent:1">
  <bpmn:extensionElements>
    <camunda:inputOutput>
      <camunda:inputParameter name="provider.ref">default</camunda:inputParameter>
      <camunda:inputParameter name="systemPrompt">Classify the customer's message as billing or delivery.</camunda:inputParameter>
      <camunda:inputParameter name="userPrompt">${customerMessage}</camunda:inputParameter>
      <camunda:inputParameter name="response.format">json</camunda:inputParameter>
      <camunda:inputParameter name="response.schema">{"type": "object", "properties": {"category": {"enum": ["billing", "delivery"]}}, "required": ["category"]}</camunda:inputParameter>
      <camunda:outputParameter name="classification">${execution.getVariableLocalTyped('agent')}</camunda:outputParameter>
    </camunda:inputOutput>
  </bpmn:extensionElements>
</bpmn:serviceTask>
```

An input parameter whose name contains dots sets a field of a nested input: `response.format` sets `format` inside `response`. A blank input counts as not set, so an empty template field keeps the default.

## Inputs

<table class="table table-striped">
  <tr><th>Input</th><th>Description</th><th>Default</th></tr>
  <tr><td><code>provider</code></td><td>The model provider: <code>provider.ref</code> names a provider of the worker's configuration (<code>eximeebpms.connectors.aiagent.providers.&lt;name&gt;</code>), the recommended way; or the provider is set on the element with <code>provider.type</code> (<code>openai</code> or <code>anthropic</code>), <code>provider.model</code>, <code>provider.apiKey</code> as a secret placeholder such as <code>{{secrets.OPENAI_API_KEY}}</code>, and optionally <code>provider.endpoint</code> (<code>https</code> only), <code>provider.api</code>, <code>provider.temperature</code>, <code>provider.maxTokens</code>, <code>provider.timeout</code> and <code>provider.options</code>. The same providers as the AI agent's. Required.</td><td></td></tr>
  <tr><td><code>systemPrompt</code></td><td>The instructions, e.g. the categories to choose from. Expressions such as <code>${...}</code> are allowed.</td><td>none</td></tr>
  <tr><td><code>userPrompt</code></td><td>The text to work on, e.g. <code>${customerMessage}</code>. Required.</td><td></td></tr>
  <tr><td><code>response.format</code></td><td><code>text</code> or <code>json</code>.</td><td><code>text</code></td></tr>
  <tr><td><code>response.schema</code></td><td>For <code>json</code>: the JSON Schema the answer must match, as a JSON object.</td><td>none</td></tr>
  <tr><td><code>response.includeAssistantMessage</code></td><td>Adds the model's message to the result as <code>responseMessage</code>.</td><td><code>false</code></td></tr>
  <tr><td><code>limits.maxModelCalls</code></td><td>Model calls one execution may make: the first, and one per correction of an answer that is not the JSON asked for.</td><td><code>3</code></td></tr>
  <tr><td><code>audit.contentLevel</code></td><td><code>metadata</code> keeps the prompts and the answer out of this task's audit even when the worker records content; it cannot raise the worker's level.</td><td>as configured</td></tr>
  <tr><td><code>retries</code></td><td>Executions before an incident.</td><td><code>3</code></td></tr>
  <tr><td><code>retryBackoff</code></td><td>ISO-8601 duration between attempts.</td><td><code>PT30S</code></td></tr>
</table>

Secret placeholders are resolved only in `provider.apiKey`. In the prompts a placeholder stays text: it is never replaced by a secret and sent to the model.

## Result

The task completes with the local variable `agent`:

```json
{ "responseJson": { "category": "delivery" } }
```

With `response.format = text` it holds `responseText` instead, the model's answer as text; with `response.includeAssistantMessage` also `responseMessage`.

Map it out with `${execution.getVariableLocalTyped('agent')}`, as the element template does. The result is stored as JSON this way, readable by clients in any language; a plain `${agent}` would be stored as a serialized Java object. The expression reads only the task's own `agent`: `${agent}` or `getVariableTyped` would also find a variable `agent` of the process, e.g. the result of another AI task mapped out under the default name.

To map a single field, check first that the task has set `agent`:

```xml
<camunda:outputParameter name="category">${execution.hasVariableLocal('agent') ? agent.responseJson.category : null}</camunda:outputParameter>
```

This gives `null` when there is no answer, and also when the answer has no such field, e.g. with `response.format = text`.

{{< note title="Output parameters also run when the task is cancelled" class="warning" >}}
Unless the engine sets `skipOutputMappingOnCanceledActivities`, it evaluates the output parameters of a task it cancels — an interrupting boundary event or event sub-process, a terminate end event, process instance modification or deletion — even before the worker has answered. The task has no `agent` then, so a plain `${agent.responseJson.category}` fails with "Cannot resolve identifier 'agent'" and so does the cancellation: deleting the process instance, for example, succeeds only with "skip IO mappings". If the process holds a variable `agent` of its own, the expression silently copies that one. `${execution.getVariableLocalTyped('agent')}` and the variant above give `null`.
{{< /note >}}

## JSON Answers

With `response.format = json` the answer must be JSON only; a JSON object inside a Markdown code block is accepted too, but nothing may follow the JSON — an explanation after it, or a second JSON value, counts as an answer that is not JSON. With `response.schema` it must also match the schema. The schema is passed to the OpenAI Responses API natively; for the other providers it is added to the system prompt.

An answer that is not JSON, or does not match the schema, is sent back to the model with the problem, and the model answers again within the same execution. When `limits.maxModelCalls` is reached without a usable answer, the task raises an incident. Raise the limit and retry the incident to continue.

## Errors and Retries

* A rate limit, a server error of the provider, a timeout or a connection failure fails the task. It is retried with `retries` and `retryBackoff`, then raises an incident.
* Invalid inputs, rejected credentials, a refusal or filtered content, an answer cut off at the provider's token limit (raise `provider.maxTokens`), prompts too long for the model, a denied destination and the `maxModelCalls` limit raise an incident at once, without retries.

Incident messages never contain the prompts or the answer.

## Audit and Metrics

The task uses the AI agent's audit and model metrics: with the audit enabled, every execution is recorded like a turn of an agent, with its model calls and token counts; an answered task ends with the status `COMPLETED`. See [AI Agent Memory and Audit]({{< ref "/user-guide/ext-client/ai-agent-memory-and-audit.md" >}}). The task's token usage is not reported to the engine's history, which records it only for the turns of an AI agent.

# Element Template

The artifact `org.eximeebpms.connectors:eximeebpms-connectors-element-templates` contains the template **AI Task** (`org.eximeebpms.connectors.AiTask`) for Camunda Modeler in Camunda 7 mode, in its `element-templates/` folder. Copy it into the Modeler's element templates directory. It applies to service and send tasks, offers a form for every input, and maps the result to a process variable of your choice (default `agent`).

The Camunda 7 template format has no conditional fields: all provider fields are shown; with a provider reference leave the others empty.

# Worker Configuration

The task runs wherever the AI agent runs and shares its configuration under `eximeebpms.connectors.aiagent`:

```yaml
eximeebpms:
  connectors:
    aiagent:
      providers:
        default:
          type: openai             # or anthropic
          model: <model name>
          # api-key: keep it out of this file, set EXIMEEBPMS_CONNECTORS_AIAGENT_PROVIDERS_DEFAULT_APIKEY
      default-task-max-model-calls: 3
```

`default-task-max-model-calls` is the limit for tasks that set no `limits.maxModelCalls`. The element template fills in 3; clear the field to use the worker's default. Provider endpoints are reached as the REST connector's destinations are: through its network policy, proxy and trust settings (see [REST Connector]({{< ref "/user-guide/ext-client/rest-connector.md" >}})), so a model server on an internal address needs an allow entry.
