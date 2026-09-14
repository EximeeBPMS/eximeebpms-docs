---

title: 'Extension Elements'
weight: 60

menu:
  main:
    identifier: "user-guide-bpmn-model-api-extension-elements"
    parent: "user-guide-bpmn-model-api"

---

{{< note title="Renamed in 1.4.0" class="warning" >}}
These methods were named `camunda…` before 1.4.0 (for example
`camundaAsyncBefore()`, `getCamundaFormKey()`, `setCamundaClass()`). The old
names still exist and still work throughout 1.4.x, but they are deprecated
and **will be removed in 1.5.0** — migrate with a mechanical rename,
`camundaX` → `eximeeBpmsX` and `getCamundaX` → `getEximeeBpmsX`.

Nothing changes in the XML: the extension namespace URI and the attribute
names in your `.bpmn` and `.dmn` files are untouched.
{{< /note >}}



[Custom extension elements]({{< ref "/reference/bpmn20/custom-extensions/_index.md" >}}) are a standardized way to extend the BPMN model.
The [EximeeBPMS extension elements]({{< ref "/reference/bpmn20/custom-extensions/extension-elements.md" >}}) are fully implemented in the BPMN model API, but unknown extension elements can also easily be accessed and added.

Every BPMN `BaseElement` can have a child element of the type `extensionElements`.
This element can contain all sorts of extension elements. To access the
extension elements you have to call the `getExtensionElements()` method and, 
if no such child element exists, you must create one first.

```java
StartEvent startEvent = modelInstance.newInstance(StartEvent.class);
ExtensionElements extensionElements = startEvent.getExtensionElements();
if (extensionElements == null) {
  extensionElements = modelInstance.newInstance(ExtensionElements.class);
  startEvent.setExtensionElements(extensionElements);
}
Collection<ModelElementInstance> elements = extensionElements.getElements();
```

After that you can add or remove extension elements to the collection.

```java
EximeeBpmsFormData formData = modelInstance.newInstance(EximeeBpmsFormData.class);
extensionElements.getElements().add(formData);
extensionElements.getElements().remove(formData);
```

You can also access a query-like interface to filter the extension elements.

```java
extensionElements.getElementsQuery().count();
extensionElements.getElementsQuery().list();
extensionElements.getElementsQuery().singleResult();
extensionElements.getElementsQuery().filterByType(EximeeBpmsFormData.class).singleResult();
```

Additionally, there are some shortcuts to add new extension elements. You can use
the `namespaceUri` and the `elementName` to add your own extension elements. Or
you can use the `class` of a known extension element type, e.g., the eximeebpms
extension elements. The extension element is added to the BPMN element and returned
so that you can set attributes or add child elements.

```java
ModelElementInstance element = extensionElements.addExtensionElement("http://example.com/bpmn", "myExtensionElement");
EximeeBpmsExecutionListener listener = extensionElements.addExtensionElement(EximeeBpmsExecutionListener.class);
```

Another helper method exists for the fluent builder API which allows you to add prior defined extension elements.

```java
EximeeBpmsExecutionListener executionListener = modelInstance.newInstance(EximeeBpmsExecutionListener.class);
executionListener.setEximeeBpmsClass("org.eximeebpms.bpm.MyJavaDelegate");
startEvent.builder()
  .addExtensionElement(executionListener);
```
