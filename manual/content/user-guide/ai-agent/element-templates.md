---
title: 'Modeling and Element Templates'
description: "Model the agent and its tools with element templates, or edit the BPMN XML by hand. Both produce the same contract between the engine and the worker."
weight: 40
menu:
  main:
    identifier: 'ai-agent-element-templates'
    parent: 'ai-agent-and-connectors'
---

{{< note title="Enterprise Edition only" class="warning" >}}
These templates configure Enterprise Connectors in Camunda Modeler's Camunda 7
mode. They describe bindings, not a worker embedded in the modeler.
{{< /note >}}

Choose a modeling path: install an element template for its field guidance,
together with the [EximeeBPMS plugin for Camunda Modeler]({{< ref "/user-guide/ai-agent/modeler-plugin.md" >}}),
or use the [BPMN XML recipe]({{< ref "/user-guide/ai-agent/ad-hoc-in-xml.md" >}})
when editing the model by hand. Both produce the same engine/worker contracts.

## Install the templates

Obtain the JSON templates from `element-templates/src/main/resources/element-templates/`
in the matching Enterprise Connectors source/release artifact. Copy them into
the `.camunda/element-templates/` directory beside the BPMN project, or into
Camunda Modeler's `resources/element-templates` folder for every project, reopen the
model and select the appropriate element template in its properties. Keep the
templates together with the model and record which connector version they target.

A web application embedding `bpmn-js` installs them as the npm package
`@eximeebpms/element-templates`, which each Enterprise Connectors release publishes
with its version number without `-ee` (Connectors `1.1.0-ee`: package `1.1.0`).

| Template | Id suffix under `org.eximeebpms.connectors.` | Use |
| --- | --- | --- |
| REST Connector | `HttpJson` | External REST task with explicit request inputs |
| REST Connector as agent tool | `HttpJson.tool` | REST task intended as an agent tool |
| AI Agent | `AiAgent` | Agent properties and bindings |
| MCP Client | `McpClient` | Configured MCP connection selected by `clientId` |
| MCP Remote Client | `McpRemoteClient` | MCP HTTP connection supplied by the element |
| AI Task | `AiTask` | Single-shot model request without tools |

The task templates set the external-task type/topic and expose input parameters.
The MCP templates also mark the element as a gateway, bind `${toolCall}` to
`operation` and map the result. The AI templates expose provider, prompts,
response and limit fields. Blank optional fields preserve defaults.

## Prepare the agent's subprocess

Apply the **AI Agent** template to an ad-hoc subprocess, not to a regular one: a
topic alone does not turn a subprocess into an agent. With the
[EximeeBPMS plugin]({{< ref "/user-guide/ai-agent/modeler-plugin.md" >}}), applying it
also creates the `eximeebpms:adHoc` result collection the agent expects. Without
the plugin the template cannot create it; add it as the
[ad-hoc XML recipe]({{< ref "/user-guide/ai-agent/ad-hoc-in-xml.md" >}}) shows.
Either way, verify that the exported element is an `adHocSubProcess`, carries the
worker topic, and has the complete `adHoc` result collection.

## Inspect the exported model

Before deployment, inspect the topic, nested input names and output mappings.
For REST tool arguments, `fromAi` expressions declare what the model may choose.
Keep URLs, credentials and maximum permissions operator-controlled unless a
business requirement explicitly needs dynamic selection.

A template is an authoring aid; it neither deploys its worker nor grants engine
permissions. Changing a template does not automatically update already deployed
process definitions. Redeploy and start a new version deliberately, or follow
the engine's process-instance migration/modification procedures where supported.

The version-1 **AI Agent** template exports its result with
`${execution.getVariableLocal('agent')}`. The hand-written examples explicitly
preserve the typed JSON value with `${execution.getVariableLocalTyped('agent')}`;
replace the exported source with that expression when following these recipes.
Both expressions read the local agent scope. The **AI Task** template already
uses the typed form. Check exported XML rather than assuming every template
version has identical output bindings.
