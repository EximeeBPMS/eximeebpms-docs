---

title: "Introduction"
weight: 10
layout: "single"

menu:
  main:
    identifier: "user-guide-introduction"

---


Welcome to the EximeeBPMS Manual! EximeeBPMS is a Java-based framework supporting BPMN for workflow and process automation and DMN for Business Decision Management. Also see: [Implemented Standards]({{< ref "/introduction/implemented-standards.md" >}}).

This document contains information about the features provided by EximeeBPMS.

To give you an overview of EximeeBPMS, the following illustration shows the most important components along with some typical user roles.

{{< img src="img/architecture-overview.png" title="EximeeBPMS Components and Roles" >}}

# Editions

EximeeBPMS is distributed in two editions:

* **Community Edition (CE)** — the open-source edition, currently at **1.3.0**. Publicly available under the [Apache License 2.0]({{< ref "/introduction/licenses.md" >}}).
* **Enterprise Edition (EE)** — currently at **1.3.1-ee**. Built on a Community Edition baseline with additional features and an accelerated patch/security-fix cadence. Not publicly available — access is provided only under an [Enterprise Edition subscription]({{< ref "/introduction/licenses.md" >}}#enterprise-edition) arranged with your EximeeBPMS account team.

Unless a page or section explicitly says otherwise, the documentation describes Community Edition behavior; pages that differ between editions call out the Enterprise Edition addition in its own section. See:

* [Release Notes]({{< ref "/release-notes/_index.md" >}}) — separate Community and Enterprise release histories
* [Tech Stack]({{< ref "/introduction/tech-stack.md" >}}) — dependency versions per edition and release
* [Licenses]({{< ref "/introduction/licenses.md" >}}) — licensing terms for both editions

# Process Engine & Infrastructure

* [Process Engine]({{< ref "/user-guide/process-engine/_index.md" >}}) The process engine is a Java library responsible for executing BPMN 2.0 processes and DMN 1.3 decisions. It has a lightweight POJO core and uses a relational database for persistence. ORM mapping is provided by the MyBatis mapping framework.
* [Spring Framework Integration]({{< ref "/user-guide/spring-framework-integration/_index.md" >}})
* [CDI/Java EE Integration]({{< ref "/user-guide/cdi-java-ee-integration/_index.md" >}})
* [Runtime Container Integration]({{< ref "/user-guide/runtime-container-integration/_index.md" >}}) (Integration with application server infrastructure.)

# Modeler

* [Camunda Modeler](https://camunda.com/platform/modeler/): Modeling tool for BPMN 2.0 diagrams as well as DMN 1.3 decision tables.
* [bpmn.io](http://bpmn.io/): Open-source project for the modeling framework and toolkits.

# Web Applications

* [REST API]({{< ref "/reference/rest/_index.md" >}}) The REST API allows you to use the process engine from a remote application or a JavaScript application. (Note: The documentation of the REST API is factored out into own documents.)
* [EximeeBPMS Tasklist]({{< ref "/webapps/tasklist/_index.md" >}}) A web application for human workflow management and user tasks that allows process participants to inspect their workflow tasks and navigate to task forms in order to work on the tasks and provide data input.
* [EximeeBPMS Cockpit]({{< ref "/webapps/cockpit/_index.md" >}}) A web application for process monitoring and operations that allows you to search for process instances, inspect their state and repair broken instances.
* [EximeeBPMS Admin]({{< ref "/webapps/admin/_index.md" >}}) A web application that allows you to manage users, groups and authorizations.
