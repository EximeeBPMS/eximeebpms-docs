---
title: 'Observability and Model Usage'
weight: 20
menu:
  main:
    identifier: 'ai-agent-observability'
    parent: 'ai-agent-running-connectors'
---

{{< note title="Enterprise Edition only" class="warning" >}}
The engine and connector worker expose separate history, audit and metrics.
The AI Task uses worker audit/model metrics but does not create engine ad-hoc turn history.
{{< /note >}}

## Which record answers which question?

| Question | Record | Scope and limits |
| --- | --- | --- |
| What did the process execute? | Engine runtime/history and ad-hoc turn history | Process lifecycle, activations, cancellations and usage reported to the engine |
| What conversation will the next model call receive? | Conversation memory | Worker-managed context in a variable or selected store; not a billing ledger |
| What happened in one worker attempt? | Worker audit | Attempt outcomes and model-call metadata/content under the configured audit policy |
| Is the worker healthy, and how much model activity is occurring? | Worker Actuator/Micrometer metrics | Aggregated operational counters; not an itemized invoice |
| What was actually billed? | Provider usage/billing records | Reconcile against worker evidence; requests can outlive a turn or fail before usage is returned |

## Audit and metrics

Metadata is the default audit content level. `content` additionally stores bounded prompt, tool and
model content; these can contain personal data. An individual agent may lower the worker's configured
level, never raise it. Invalid `audit.content-level` configuration fails during property binding.
The audit records early turn failures too, including invalid storage/context settings. Late callbacks
for an erased or removed turn do not recreate audit items. Metadata names are bounded in UTF-8 bytes
so they fit database limits, including DB2.

Metrics `eximeebpms.connectors.aiagent.model.calls` and `.tokens` include failed model attempts.
The first 100 distinct model names per worker, shared by the AI agent and the AI task, get individual `model` tag values; subsequent names
use `other` to limit metric cardinality. The audit retains the actual model name. Configure a fixed
model or a named provider when possible. Prometheus values count usage; they do not calculate billing.


## Turn replacement and cost reconciliation

A turn external task can be replaced while an earlier worker attempt is still
running, for example when parallel tools finish close together. The process
can finish correctly while extra model requests from replaced attempts incur cost.
Do not infer the number of paid model requests from completed turns or conversation
messages. `maxModelCalls` bounds calls in persisted agent state, not every physical
request across failed/replaced attempts.

Before interpreting a missing flow as a cancelled tool call, the worker reads the
activity tree and then checks its external task. It requires its own worker id
as the current lock owner. Lock expiry uses the engine’s clock and is not compared
with the worker’s clock. It checks again before every model request, including JSON
corrections. A replaced task or lost lock ends that attempt without another
model request or completion. The bundle configures engine REST automatically;
manual construction without `engineRest` cannot perform these checks.

A request already sent to the model can finish after replacement. The worker
reports that attempt's model calls and known tokens to engine history using
`POST /history/ad-hoc-turn/external-task/{externalTaskId}/model-usage`.
Grant its engine account READ_HISTORY and UPDATE_HISTORY on the process
definition, as well as access to the process tenant. History must be enabled at
`audit` or `full` and still retained. Reports use an attempt id for deduplication;
an uncertain HTTP result or 5xx is retried once after 200 ms without repeating
the model request. Interruption stops that retry and preserves the interrupt flag.
Missing or invisible history (404), including a history level below audit or
already cleaned-up history, is logged at DEBUG. Other failed reports log a WARN
with task, attempt and HTTP status; reconcile missing reports with worker audit. It does not change the REPLACED state or emit a second turn-end event.

Engine history totals now include successfully reported replaced attempts.
Worker audit and model-call metrics also include failed attempts on current
tasks and calls whose history report failed. Provider billing remains the source
for the full monetary cost; neither worker nor engine can reconstruct usage the
provider did not return or a call lost when the worker dies.

The connector task timer's `outcome=rejected` is replaced by `not_found`,
`lock_lost` and `unknown`. Update Prometheus queries and alerts: `not_found` means
confirmed task absence, `lock_lost` means the task exists without this worker's
lock, and `unknown` means a report has no definitive transport result.
The model metrics continue to count all attempts independently of task outcome.

The end-of-attempt audit counts every attempted model call, including failed
calls. Its token total is unknown if any call did not return that token count.
Known counts remain in the individual model-call audit records. An accepted turn
result counts returned model responses; its totals need not match a failed
attempt's audit totals. Engine history likewise keeps a replaced turn's token
total null if any of its attempt reports has an unknown value.

## Operational checks

1. Scrape both engine and worker metrics; verify registry/export configuration
   and access protection described in [Deployment and Operations]({{< ref "/user-guide/ai-agent/running-the-connectors.md" >}}).
   The engine's `eximeebpms.adhoc.*` meters are listed in
   [Application Monitoring]({{< ref "/user-guide/process-engine/application-monitoring.md" >}});
   worker-side monitoring is covered in
   [Worker Monitoring]({{< ref "/user-guide/ext-client/monitoring.md" >}}).
2. Correlate the process instance, ad-hoc instance, external task/turn, worker
   attempt and model-call ids in the records available to your deployment.
3. For a suspected race, compare attempt outcomes and model counters with turn
   states, rather than treating an absent completed result as evidence of cancellation.
4. Apply retention/erasure separately to engine history and
   [worker JDBC data]({{< ref "/user-guide/ai-agent/jdbc-storage.md" >}}).
