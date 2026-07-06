---

title: 'Limitations'
weight: 100

menu:
  main:
    identifier: "user-guide-cmmn-model-api-limitations"
    parent: "user-guide-cmmn-model-api"

---

{{< note title="CMMN is deprecated" class="warning" >}}
CMMN support is deprecated as of EximeeBPMS 1.3.0 and will be removed in 1.4.0. See [CMMN Deprecation & Removal]({{< ref "/update/cmmn-removal.md" >}}) for detection queries and upgrade guidance.
{{< /note >}}


The CMMN model API is able to read CMMN 1.1 as well as CMMN 1.0 models. Its primary use case is to work with models of the latest version, such that there are limitations when editing CMMN models of prior versions.

* `ModelElementType#getTypeNamespace()` returns CMMN 1.1 namespace for elements which are present in CMMN 1.0 and CMMN 1.1
* `CMMN#createEmptyModel()` always creates a CMMN 1.1 model. CMMN 1.0 models cannot be created anymore.
* It is not possible to change and save an existing CMMN 1.0 model.
* CMMN 1.0 attributes and elements that have been removed in CMMN 1.1 cannot be added to a CMMN 1.1 model. Their accessor methods are marked `@Deprecated`. For a list of affected elements confer the [guide on migrating CMMN models between specification versions]({{< ref "/reference/cmmn11/migration/10-to-11.md" >}}).
