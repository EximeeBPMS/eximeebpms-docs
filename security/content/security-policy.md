---

title: 'Security Policy'
weight: 30

menu:
  main:
    name: "Security Policy"
    identifier: "security-policy"

---

EximeeBPMS is an open-source BPMN 2.0 process automation platform, forked
from Camunda 7 and maintained by [Consdata](https://www.consdata.com/). It is
used to run business-critical, and in some cases regulated, workloads, so the
security of the software is treated as a top priority.

This page is a summary. The canonical, version-controlled policy — including
supported versions, how to report a vulnerability, our response process,
scope, and legal notice — lives in
[`SECURITY.md`](https://github.com/EximeeBPMS/eximeebpms/blob/main/SECURITY.md)
in the main EximeeBPMS repository. If anything here ever appears to conflict
with `SECURITY.md`, `SECURITY.md` is authoritative.

## Reporting a vulnerability

See [Report a Vulnerability](../report-vulnerability/), or go directly to
[SECURITY.md § Reporting a Vulnerability](https://github.com/EximeeBPMS/eximeebpms/blob/main/SECURITY.md#reporting-a-vulnerability).

## How we handle security fixes

* Reported vulnerabilities are triaged and fixed privately, then disclosed
  via a [GitHub Security Advisory](https://github.com/EximeeBPMS/eximeebpms/security/advisories)
  once a fix has shipped.
* EximeeBPMS has fixed security issues since its 1.0.0 fork from Camunda 7 —
  see the `### Security` entries in the
  [CHANGELOG](https://github.com/EximeeBPMS/eximeebpms/blob/main/CHANGELOG.md).
  Starting with the 1.4.0 release, these entries additionally cite the
  specific CVE identifier(s) addressed.
* See [Security Notices](../notices/) for a running bulletin of
  EximeeBPMS-specific advisories once fixes are published.

## Independent security testing

EximeeBPMS is a fork of Camunda 7. The upstream Camunda 7 codebase it is
built on has a long history of independent third-party penetration testing,
commissioned by Camunda and documented on their
[Trust Center](https://camunda.com/trust-center/). EximeeBPMS inherits that
codebase lineage, but has not, as of this release, commissioned its own
independent EximeeBPMS-specific penetration test; a link to any such report
will be added here once available. In the meantime, EximeeBPMS-specific code
(features not present upstream) goes through peer code review, SonarQube
static analysis on every pull request, and continuous dependency scanning via
Dependabot.
