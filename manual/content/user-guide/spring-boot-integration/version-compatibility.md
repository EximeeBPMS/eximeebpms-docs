---

title: "Spring Boot Version Compatibility"
weight: 10

menu:
  main:
    name: "Version Compatibility"
    identifier: "user-guide-spring-boot-version-compatibility"
    parent: "user-guide-spring-boot-integration"

---

Each version of the EximeeBPMS Spring Boot Starter is bound to a specific version of EximeeBPMS and Spring Boot. 
Only these default combinations are recommended (and supported) by EximeeBPMS.
Other combinations must be thoroughly tested before being used in production.

<table class="table table-striped">
  <tr>
    <th>Spring Boot Starter version</th>
    <th>EximeeBPMS version</th>
    <th>Spring Boot version</th>
  </tr>
  <tr>
    <td>1.0.0</td>
    <td>1.0.0</td>
    <td>3.4.x</td>
  </tr>
  <tr>
    <td>1.1.0</td>
    <td>1.1.0</td>
    <td>3.5.x</td>
  </tr>
  <tr>
    <td>1.2.0</td>
    <td>1.2.0</td>
    <td>4.0.x</td>
  </tr>
  <tr>
    <td>1.3.0</td>
    <td>1.3.0</td>
    <td>4.0.x</td>
  </tr>
  <tr>
    <td>1.3.1-ee</td>
    <td>1.3.1-ee (Enterprise Edition)</td>
    <td>4.1.x</td>
  </tr>
</table>

The Spring Boot Starter version always matches the EximeeBPMS version it is released with. See the [Tech Stack matrix]({{< ref "/introduction/tech-stack.md" >}}) for the exact patch versions and the full history, including intermediate Enterprise Edition releases.
