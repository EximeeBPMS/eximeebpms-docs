---

title: "Quarkus Version Compatibility"
weight: 10

menu:
  main:
    name: "Version Compatibility"
    identifier: "user-guide-quarkus-version-compatibility"
    parent: "user-guide-quarkus-integration"

---

Each version of the EximeeBPMS Engine Quarkus Extension is bound to a specific version of EximeeBPMS and Quarkus. 
Only these default combinations are recommended (and supported) by EximeeBPMS.

<table class="table table-striped">
  <tr>
    <th>EximeeBPMS version</th>
    <th>Quarkus version</th>
  </tr>
  <tr>
    <td>1.0.0</td>
    <td>3.20.x</td>
  </tr>
  <tr>
    <td>1.1.0</td>
    <td>3.27.x</td>
  </tr>
  <tr>
    <td>1.2.0</td>
    <td>3.28.x</td>
  </tr>
  <tr>
    <td>1.3.0</td>
    <td>3.28.x</td>
  </tr>
  <tr>
    <td>1.3.1-ee (Enterprise Edition)</td>
    <td>3.36.x</td>
  </tr>
</table>

See the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}}) for the exact patch versions and the full history, including intermediate Enterprise Edition releases.

In case a certain Quarkus version has a bug, you can override the existing Quarkus version by adding the following
inside your `pom.xml`. Note that this new EximeeBPMS/Quarkus version combination should also be supported by EximeeBPMS.

```xml
<dependencyManagement>
  <dependencies>
    ...
    <dependency>
      <groupId>io.quarkus.platform</groupId>
      <artifactId>quarkus-bom</artifactId>
      <version>${quarkus.framework.version}</version><!-- set correct version here -->
      <type>pom</type>
      <scope>import</scope>
    </dependency>
    ...
  </dependencies>
</dependencyManagement>
```
