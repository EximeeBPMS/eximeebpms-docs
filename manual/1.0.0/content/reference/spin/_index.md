---

title: 'EximeeBPMS Spin Dataformat Reference'
weight: 60

menu:
  main:
    name: "Spin Dataformats"
    identifier: "spin-ref"
    parent: "references"

---

EximeeBPMS Spin is a library for simple XML and JSON processing on the JVM (Java
Virtual Machine), targeting Java and JVM-based scripting languages such as
Groovy, JRuby, Jython, JavaScript and Java Expression Language. It provides a
comprehensible fluent API for working with different data formats through
lightweight wrapper objects.

Spin can be used in any Java-based application by adding the following maven
dependency to your `pom.xml` file:

{{< note title="EximeeBPMS BOM" >}}
  If you use Spin in combination with the EximeeBPMS process engine,
  please consult the [process engine user guide on Spin integration](/manual/data-formats/configuring-spin-integration/)
  on how to properly integrate Spin with the engine.
  Please import the <a class="alert-link" href="/get-started/apache-maven/">
  EximeeBPMS BOM</a> to ensure that you use the EximeeBPMS Spin version matching your process engine
  version.
{{< /note >}}

```xml
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.eximeebpms.spin</groupId>
      <artifactId>eximeebpms-spin-bom</artifactId>
      <scope>import</scope>
      <type>pom</type>
      <version>${version.eximeebpms}</version>
    </dependency>
  </dependencies>
</dependencyManagement>
```

```xml
<dependencies>
  <dependency>
    <groupId>org.eximeebpms.spin</groupId>
    <artifactId>eximeebpms-spin-core</artifactId>
  </dependency>

  <dependency>
    <groupId>org.eximeebpms.spin</groupId>
    <artifactId>eximeebpms-spin-dataformat-all</artifactId>
  </dependency>
</dependencies>
```

EximeeBPMS Spin is published to [maven central](http://search.maven.org/#search%7Cga%7C1%7Ceximeebpms-spin).
