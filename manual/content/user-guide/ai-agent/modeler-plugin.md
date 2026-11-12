---
title: 'EximeeBPMS Plugin for Camunda Modeler'
description: "Model ad-hoc subprocesses and AI agents in Camunda Modeler without editing XML: properties panel, element template defaults, conversion of older files and checks of what the engine rejects at deployment."
weight: 5
menu:
  main:
    identifier: 'ai-agent-modeler-plugin'
    parent: 'ai-agent-element-templates'
---

{{< note title="Enterprise Edition only" class="warning" >}}
The plugin models features of the Enterprise engine: the ad-hoc subprocess and
the AI agent's worker-driven mode. It works in Camunda Modeler's **Camunda 7**
mode; Camunda 8 diagrams are left alone. Tested with Camunda Modeler 5.53.0.
{{< /note >}}

Without the plugin, Camunda Modeler has no fields for the ad-hoc subprocess's
`adHoc` element, which you then write in the
[XML]({{< ref "/user-guide/ai-agent/ad-hoc-in-xml.md" >}}). With it:

* the properties panel of an ad-hoc subprocess edits how it runs — elements
  activated by the engine, or an external worker such as the AI agent with its
  topic and task priority — its active elements, its output collection and
  output element, and the turn history the worker reads;
* applying the **AI Agent** [element template]({{< ref "/user-guide/ai-agent/element-templates.md" >}})
  also creates the output collection `toolCallResults` and the output element
  the agent expects;
* the *Problems* view reports what the engine would reject at deployment —
  start or end events inside the subprocess, a completion condition beside a
  worker topic, an output collection named as an engine variable, `fromAi`
  declarations that contradict each other and more — and warns of a tool
  without documentation, which the model needs to choose it;
* a file that contains `camunda:adHoc` or `activiti:adHoc` is converted to
  `eximeebpms:adHoc` when it is opened, so that nothing is lost on save.

## Install the plugin

1. Obtain `camunda-modeler-plugin-eximeebpms-<version>.zip`, released with the
   EximeeBPMS Modeler packages, through the channel you receive Enterprise
   artifacts from.
2. Unpack it into the `resources/plugins` folder of Camunda Modeler's
   installation directory, or of its user data directory:
   `%APPDATA%\camunda-modeler\resources\plugins` on Windows,
   `~/Library/Application Support/camunda-modeler/resources/plugins` on macOS,
   `~/.config/camunda-modeler/resources/plugins` on Linux. The folder
   `camunda-modeler-plugin-eximeebpms` must contain `index.js`.
3. Restart Camunda Modeler.

Install the element templates of the AI agent and the connectors as described in
[Modeling and Element Templates]({{< ref "/user-guide/ai-agent/element-templates.md" >}}).

## Model an AI agent

1. Create a BPMN diagram for **Camunda 7**, draw an expanded subprocess and
   change its type to *Ad-hoc sub-process*. Model its tools inside it, without
   incoming sequence flows, each with a documentation that tells the model what
   it does. In the version selector of the status bar, keep the latest
   Camunda 7 version, 7.24: Camunda Modeler picks its own checks by this
   version, and the EximeeBPMS engine ignores it. The *Default Camunda 7
   version* in Camunda Modeler's settings sets it for new diagrams.
2. Select the subprocess, choose *Template* › *Select* and pick **AI Agent**.
   The template sets the worker topic; the plugin adds the output collection and
   its output element. Fill in the provider and the prompts in the template's
   groups.
3. Check the *Implementation*, *Output collection* and *Turn history* groups. An
   external worker decides when the subprocess completes, so the *Completion*
   group is hidden; the plugin removes a completion condition when a topic is set.

{{< img src="../img/modeler-plugin-properties.png" title="An ad-hoc subprocess with the AI Agent template applied: the worker's topic and the output collection the agent expects" >}}

For an ad-hoc subprocess whose elements are activated by the engine or through
the API, keep *Type* at *BPMN* and set the active elements, the output collection
and the completion condition. The
[BPMN reference]({{< ref "/reference/bpmn20/subprocesses/ad-hoc-subprocess.md" >}})
describes each setting.

## Check the model

The *Problems* view lists the deployment errors the engine would report, on the
element the engine would name. Correct them before you deploy.

{{< img src="../img/modeler-plugin-problems.png" title="The Problems view with an output collection named as a variable the engine keeps, and a tool without documentation" >}}

The checks are a preview; the engine's checks at deployment remain the
reference. The script check assumes the engine's script guard in `ENFORCE` mode.

## Open older diagrams

A diagram written with `camunda:adHoc`, as the XML recipe of earlier releases
showed, is converted to `eximeebpms:adHoc` when it is opened, and the
subprocess's panel says so. Camunda Modeler writes the converted form only
after a change — until then *Save* does nothing and *Save As* writes the file as
it was opened — so make an edit and save. The engine reads
both forms; `eximeebpms:adHoc` is the one Camunda Modeler without the plugin
keeps.

The diagrams the plugin saves open in Camunda Modeler without the plugin, which
keeps the `eximeebpms:` elements unchanged but cannot edit them.

## Embed the same support in a web modeler

The plugin is built from `bpmn-js` packages that a web application embedding
`bpmn-js` registers the same way: `@eximeebpms/bpmn-moddle`,
`@eximeebpms/bpmn-js-adhoc`, `@eximeebpms/bpmnlint-plugin-eximeebpms` and the
element templates as `@eximeebpms/element-templates`, from the EximeeBPMS npm
repository. Ask your EximeeBPMS contact for access and for the integration guide.
