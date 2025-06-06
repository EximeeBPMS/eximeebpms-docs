---

title: "Install EximeeBPMS Run"
weight: 05

menu:
  main:
    name: "Remote Engine Distribution"
    identifier: "installation-eximeebpms-bpm-run"
    parent: "installation-guide"
    pre: "Install EximeeBPMS Run, an easy to configure remote engine distribution of EximeeBPMS. No Java knowledge necessary."
---

{{< note title="What is a Remote Engine Distribution?" class="info" >}}
If you need a Remote or Shared Engine Distribution depends on your use-case. Check out the [architecture overview]({{<ref "/introduction/architecture.md" >}}) for more information.
{{< /note >}}

This page describes the steps to execute EximeeBPMS Run.

# Requirements
Please make sure that you have the Java Runtime Environment 17 installed.

You can verify this by using your terminal, shell, or command line:

```sh
java -version
```
If you need to install Java Runtime Environment, you can [find the download from Oracle here](https://www.oracle.com/java/technologies/javase-downloads.html).

# Installation Procedure
1. Download the pre-packed distribution of the [community edition here] (https://eximeebpms.org/download/).
1. Unpack the distro to a directory.
1. Configure the distro as described in the [User Guide]({{< ref "/user-guide/eximeebpms-bpm-run.md" >}}).
1. Start EximeeBPMS Run by executing the start script (start.bat for Windows, start.sh for Linux/Mac).
1. Access the EximeeBPMS webapps (Cockpit, Tasklist, Admin) via http://localhost:8080/eximeebpms/app/.
1. Access the [REST API]({{< ref "/reference/rest/overview/_index.md" >}}) via http://localhost:8080/engine-rest (e.g. http://localhost:8080/engine-rest/engine).
