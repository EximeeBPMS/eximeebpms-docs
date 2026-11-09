---
title: 'AI Agent and Connectors Reference'
description: "Reference for the connector worker: configuration properties, the variables the agent and its tools read and write, and dependencies and compatibility."
weight: 65
menu:
  main:
    identifier: 'ai-agent-reference'
    parent: 'references'
---

{{< note title="Enterprise Edition only" class="warning" >}}
Configuration and variable contracts of Enterprise Connectors. Start with the
[user guide]({{< ref "/user-guide/ai-agent/_index.md" >}}) for deployment and modeling.
{{< /note >}}

Worker configuration is independent of BPMN input parameters. The properties
reference lists deployment defaults; individual connector pages list element
inputs. The variable reference describes how scopes and result mappings connect
the worker and engine.

| Reference | Use it for |
| --- | --- |
| [Configuration]({{< ref "configuration.md" >}}) | Worker properties, defaults and environment-variable binding |
| [Variables]({{< ref "variables.md" >}}) | Scope, ownership, tool results and final outputs |
| [Dependencies and Compatibility]({{< ref "dependencies.md" >}}) | Worker/engine version lines, SDKs and private migration libraries |
