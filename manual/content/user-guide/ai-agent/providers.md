---
title: 'Model Providers'
weight: 10
menu:
  main:
    identifier: 'ai-agent-providers'
    parent: 'ai-agent-worker'
---

{{< note title="Enterprise Edition only" class="warning" >}}
Enterprise Connectors includes direct OpenAI and Anthropic providers. Azure
OpenAI, AWS Bedrock and arbitrary OpenAI-compatible gateways are not delivered
provider types. A custom implementation can use the provider SPI.
{{< /note >}}

## Named providers

Configure providers on the worker and refer to one with the BPMN input
`provider.ref`. This keeps model selection, credentials and transport settings
out of process definitions:

```yaml
eximeebpms:
  connectors:
    aiagent:
      providers:
        default:
          type: openai
          model: ${AI_MODEL}
          api-key: ${AI_API_KEY}
          api: responses
          timeout: 2m
        reviewer:
          type: anthropic
          model: ${REVIEW_MODEL}
          api-key: ${REVIEW_API_KEY}
          max-tokens: 4096
```

```xml
<camunda:inputParameter name="provider.ref">default</camunda:inputParameter>
```

The type and model must be supported by the configured account. The worker does
not download model weights or select an alternative vendor automatically.

## Inline provider settings and secrets

An element may instead supply `provider.type`, `provider.model` and other
provider fields. Use a secret placeholder for `provider.apiKey`:

```xml
<camunda:inputParameter name="provider.type">openai</camunda:inputParameter>
<camunda:inputParameter name="provider.model">${modelName}</camunda:inputParameter>
<camunda:inputParameter name="provider.apiKey">{{secrets.AI_API_KEY}}</camunda:inputParameter>
```

Provide its value through `eximeebpms.connectors.secrets.AI_API_KEY` or
`EXIMEEBPMS_CONNECTORS_SECRETS_AI_API_KEY`. Secret names contain uppercase
letters, digits and underscores. A named provider uses its runtime configuration
as a whole; choose either a reference or an inline definition, rather than
depending on a mix of the two. Credentials are resolved in credential fields,
not by substituting secrets into prompts or tool descriptions.

## Options and limits

| Field | Meaning |
| --- | --- |
| `type`, `model`, `apiKey` | Required provider type, model identifier and credentials |
| `endpoint` | Optional base URL override; normal vendor endpoint otherwise |
| `api` | OpenAI `responses` (default) or `chatCompletions`; not an Anthropic setting |
| `temperature`, `topP` | Sampling controls; omitted values leave the provider/model default |
| `maxTokens` | Answer-token bound; Anthropic defaults to `4096` when omitted |
| `timeout` | Whole model-call duration; default ten minutes, including response reading |
| `options` | Allowed vendor request-body options only, never transport or credentials |

OpenAI Responses allows `reasoning`, `text`, `prompt_cache_key` and
`prompt_cache_retention`. Chat Completions allows `reasoning_effort`,
`response_format`, `prompt_cache_key` and `prompt_cache_retention`. Anthropic
allows `thinking`, `output_config` and `cache_control`. Options still need to be
valid for the selected model; accepting an option name is not a promise that
every model supports it. Unsupported option names are rejected.

OpenAI Responses carries function-call ids and reasoning checkpoint data through
conversation memory. Anthropic carries its thinking/signature blocks. Treat
`agentContext` as worker-managed state; do not reconstruct it from the displayed
answer. JSON Schema output is native only on OpenAI Responses; the worker also
validates final responses and requests corrections within `maxModelCalls`.

## Network and failure behavior

Provider endpoints pass the same network policy, proxy and SSL-bundle settings
as REST destinations. Non-public destinations require an explicit allow entry;
an endpoint override does not bypass that rule. Vendor SDK retries and redirects
are disabled, so external-task retry policy controls attempts. A proxy must also
enforce destination policy at the proxy, where destination DNS is resolved.
An inline `provider.endpoint` must use HTTPS. An HTTP endpoint, such as the
local deterministic fixture, can be selected only in a named runtime provider.

Authentication failures, refusals, invalid inputs and token-limit truncation
require correction. Transient provider/network failures can be retried through
the external task runtime. A retry can generate a second billable model request
when the previous request's outcome is unknown. See
[AI Agent]({{< ref "/user-guide/ai-agent/ai-agent.md" >}}) for instance-level limits.

## Custom providers

Implement `ChatModelProvider` and register it as a Spring bean in an embedded
worker; its type identifies it in provider settings. The implementation must
preserve model-call/tool ids, usage semantics, lifecycle and error contracts.
Use a custom worker image/application containing the implementation. Adding an
SPI bean does not add that provider to the unmodified stock bundle.

## SDK and API compatibility

See [Connector Dependencies and Compatibility]({{< ref "/reference/ai-agent-and-connectors/dependencies.md" >}})
for the SDK versions in the documented worker baseline and planned upgrades.
The supported provider fields and APIs above remain the connector contract,
independently of which additional features a vendor SDK exposes.
