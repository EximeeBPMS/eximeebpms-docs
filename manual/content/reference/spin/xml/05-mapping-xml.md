---

title: 'Mapping XML'
weight: 50

menu:
  main:
    identifier: "spin-ref-xml-mapping"
    parent: "spin-ref-xml"

---

Spin can deserialize XML to Java objects and serialize the annotated Java objects to XML by integrating mapping features into its fluent API. JAXB annotations can be added to the involved Java classes to configure the (de-)serialization process but are not required.


# Mapping between Representations:

Assume we have a class `Customer` defined as follows:

```java
@XmlRootElement(name="customer", namespace="http://camunda.org/test")
public class Customer {

  private String name;

  @XmlElement(namespace="http://camunda.org/test")
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
```

## Mapping XML to Java:

We can map the following XML object

 ```xml
<?xml version="1.0" encoding="UTF-8"?>
<customer xmlns="http://camunda.org/example">
  <name>Kermit</name>
</customer>
 ```

 to an instance of `Customer` in the following way:

```java
import static org.eximeebpms.spin.Spin.XML;

String xmlInput = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><customer xmlns=\"http://camunda.org/example\"><name>Kermit</name></customer>";

Customer customer = XML(xmlInput).mapTo(Customer.class);
```

{{< note title="Type validation" class="info" >}}
  The target type passed to `mapTo` is, by default, **not** checked against the process engine's deserialization type whitelist — that whitelist (`deserializationTypeValidationEnabled`) guards only `ObjectValue` process-variable deserialization. `mapTo` is validated only when the engine additionally sets `spinMapToTypeValidationEnabled` (see [JSON/XML serialized objects using Spin]({{< ref "/user-guide/security.md#jsonxml-serialized-objects-using-spin" >}})). Where a type name passed to `mapTo(String)` could originate from data you do not control, prefer a fixed, trusted type.
{{< /note >}}

## Mapping Java to XML:

We can map the `customer` back to XML as follows:

```java
import static org.eximeebpms.spin.Spin.XML;

String xml = XML(customer).toString();
```
