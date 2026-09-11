---

title: 'Extension Attributes'
weight: 60

menu:
  main:
    identifier: "user-guide-dmn-model-api-extension-attributes"
    parent: "user-guide-dmn-model-api"

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



[Custom extensions]({{< ref "/reference/dmn/custom-extensions/_index.md" >}}) are a standardized way to extend the DMN model.
The [EximeeBPMS extension attributes]({{< ref "/reference/dmn/custom-extensions/eximeebpms-attributes.md" >}}) are fully implemented in the DMN model API.

Every DMN `Decision` element can have the attributes `historyTimeToLive` and `versionTag`.
To access the extension attributes, you have to call the `Decision#getEximeeBpmsHistoryTimeToLiveString()` and 
`Decision#getVersionTag()` methods. 

```java
String historyTimeToLive = decision.getEximeeBpmsHistoryTimeToLiveString();
String versionTag = decision.getVersionTag();
```
To set attributes, use `Decision#setEximeeBpmsHistoryTimeToLiveString()` and `Decision#setVersionTag()`
```java
decision.setEximeeBpmsHistoryTimeToLiveString("1000");
decision.setVersionTag("1.0.0");
```

Every `Input` element can have an `inputVariable` attribute.
This attribute specifies the variable name which can be used to access the result of the input expression in an input entry expression.
It can be set and fetched similarly, calling `Input#setEximeeBpmsInputVariable()` and `Input#getEximeeBpmsInputVariable()`:

```java
input.setEximeeBpmsInputVariable("inputVariableName");
String inputVariable = input.getEximeeBpmsInputVariable();
```
