---

title: 'Version Compatibility'
weight: 300

menu:
  main:
    name: "Version Compatibility"
    identifier: "external-task-client-compatibility-matrix"
    parent: "external-task-client"

---

Each version of EximeeBPMS is bound to a specific version of the **External Task Clients**.

## Java Client

The [Java External Task Client](https://github.com/EximeeBPMS/eximeebpms/tree/master/clients/java) always shares the same version number as the EximeeBPMS release it ships with:

<table class="table table-striped">
  <tr>
    <th>EximeeBPMS version</th>
    <th>Java client version</th>
  </tr>
  <tr>
    <td>1.0.0</td>
    <td>1.0.0</td>
  </tr>
  <tr>
    <td>1.1.0</td>
    <td>1.1.0</td>
  </tr>
  <tr>
    <td>1.2.0</td>
    <td>1.2.0</td>
  </tr>
  <tr>
    <td>1.3.0</td>
    <td>1.3.0</td>
  </tr>
  <tr>
    <td>1.3.1-ee (Enterprise Edition)</td>
    <td>1.3.1-ee</td>
  </tr>
</table>

Only these default combinations are recommended (and supported) by EximeeBPMS. Nevertheless, the Java External Task Client can be combined with newer patch versions of the EximeeBPMS Workflow Engine.

## JavaScript Client

There is no EximeeBPMS-maintained JavaScript/NodeJS External Task Client. The [`camunda-external-task-client-js`](https://github.com/camunda/camunda-external-task-client-js) project maintained by Camunda is compatible with EximeeBPMS's REST API to the extent it targets Camunda 7's REST API, but it is not released or version-pinned alongside EximeeBPMS — consult that project's own documentation for its compatibility guidance.
