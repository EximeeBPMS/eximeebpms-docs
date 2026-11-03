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

In the current baseline, `eximeebpms.connectors.tasks` uses `outcome=rejected`
for rejected task reports; that outcome alone does not prove whether the task
was replaced, its lock was lost, or a completion response was lost. Model-call
metrics and per-attempt audit are needed alongside engine turn history. A missing
token counter is unknown usage, not zero.

{{< note title="Turn-accounting update in development" class="info" >}}
The upcoming engine/worker update checks that a fetched turn is still current
before each model request, including correction requests. Obsolete attempts are
intended to end without completing the old task or publishing changed conversation
state. A request already in flight cannot be undone by that check.

The update also adds idempotent late-usage reporting for replaced turns and
separate runtime outcomes for a missing task, lost lock and unknown report outcome
(`not_found`, `lock_lost`, `unknown`). These are pending changes, not guarantees of
the current baseline. Verify the final compatible engine/worker release and
adjust dashboards that currently aggregate `rejected` before deployment.
{{< /note >}}

Returned usage can be reconciled only if it reaches a durable record. A worker
crash or provider failure before counters are returned can still leave billable
usage absent from both engine history and worker records. Use provider-side
quotas and billing to bound and reconcile spending.

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
