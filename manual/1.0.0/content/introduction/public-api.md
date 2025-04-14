---

title: 'Public API'
weight: 80

menu:
  main:
    identifier: "user-guide-introduction-public-api"
    parent: "user-guide-introduction"

---


Camunda provides a public API. This section covers the definition of the public API and backwards compatibility for version updates.


# Definition of Public API

The Camunda public API is limited to the following items:

Java API: 

All non-implementation Java packages (package name does not contain `impl`) of the following modules.

* `eximeebpms-engine`
* `eximeebpms-engine-spring`
* `eximeebpms-engine-cdi`
* `eximeebpms-engine-dmn`
* `eximeebpms-bpmn-model`
* `eximeebpms-cmmn-model`
* `eximeebpms-dmn-model`
* `eximeebpms-spin-core`
* `eximeebpms-connect-core`
* `eximeebpms-commons-typed-values`

HTTP API (REST API):

* `eximeebpms-engine-rest`: HTTP interface (set of HTTP requests accepted by the REST API as documented in [REST API reference]({{< ref "/reference/rest/_index.md" >}}). Java classes are not part of the public API.


# Backwards Compatibility for Public API

The EximeeBPMS versioning scheme follows the MAJOR.MINOR.PATCH pattern put forward by [Semantic Versioning](http://semver.org/). EximeeBPMS will maintain public API backwards compatibility for MINOR version updates. Example: Update from version `1.1.x` to `1.2.x` will not break the public API.
