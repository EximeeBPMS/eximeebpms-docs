---

title: 'Implemented Standards'
weight: 20

menu:
  main:
    identifier: "user-guide-introduction-standards"
    parent: "user-guide-introduction"

---

EximeeBPMS implements two different standards in the Business Process Management scope: BPMN 2.0 and DMN 1.3.
These standards are defined by the [Object Management Group][OMG] with active collaboration of EximeeBPMS.

EximeeBPMS provides open source implementations of execution and [modeling tools][modelers].

# BPMN

Business Process Model and Notation (BPMN) is a standard for Workflow and Process Automation.
EximeeBPMS supports the 2.0 version of BPMN.

* Getting started implementing BPMN Processes: [Quick Start (Java / JS)]
* Getting to Know BPMN as a Modeling Language: [BPMN Modeling Tutorial]
* Modeling BPMN: [BPMN Modeling Reference]
* Tool for modeling BPMN: [BPMN Modeler][modelers]
* Implementing BPMN Processes: [BPMN Implementation Reference]
* Executing BPMN: [Process Engine]

# DMN

Decision Model and Notation (DMN) is a standard for Business Decision Management.
EximeeBPMS supports the 1.1 version of DMN.

* Getting started implementing DMN decision tables: [DMN Getting Started]
* Getting to Know DMN: [DMN Modeling Tutorial]
* Tool for editing DMN: [DMN Editor][modelers]
* Implementing DMN Decisions: [DMN Implementation Reference]
* Executing DMN: [DMN Engine]


[OMG]: http://www.omg.org/
[modelers]: https://camunda.com/platform/modeler/
[BPMN Modeling Tutorial]: https://camunda.com/bpmn/
[BPMN Modeling Reference]: https://camunda.com/bpmn/reference/
[Quick Start (Java / JS)]: /get-started/quick-start/
[BPMN Implementation Reference]: {{< ref "/reference/bpmn20/_index.md" >}}
[DMN Getting Started]: /get-started/dmn11/
[DMN Implementation Reference]: {{< ref "/reference/dmn/_index.md" >}}
[DMN Modeling Tutorial]: https://camunda.com/dmn/
[Process Engine]: {{< ref "/user-guide/process-engine/_index.md" >}}
[DMN Engine]: {{< ref "/user-guide/dmn-engine/_index.md" >}}
