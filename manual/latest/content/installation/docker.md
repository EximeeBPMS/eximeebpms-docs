---

title: "Run EximeeBPMS using Docker"
weight: 20

menu:
  main:
    name: "Docker"
    identifier: "installation-guide-docker"
    parent: "installation-guide"
    pre: "Run the Full Distribution using Docker"

---

# Community Edition

The Community Edition docker images can be found on [GitHub](https://github.com/EximeeBPMS/eximeebpms-docker) and [Docker Hub](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

## Start EximeeBPMS Run using Docker

To start [EximeeBPMS Run]({{< ref "/user-guide/eximeebpms-bpm-run.md" >}}) execute the following commands:

```shell
docker pull eximeebpms/eximeebpms-bpm-platform:run-latest
docker run -d --name eximeebpms -p 8080:8080 eximeebpms/eximeebpms-bpm-platform:run-latest
```

## Start EximeeBPMS (Tomcat) using Docker

To start EximeeBPMS, execute the following commands:

```shell
docker pull eximeebpms/eximeebpms-bpm-platform:latest
docker run -d --name eximeebpms -p 8080:8080 eximeebpms/eximeebpms-bpm-platform:latest
```

Please note that by default the Apache Tomcat distribution is used. For a guide on how to use one of the other distributions, see the [tag schema](https://github.com/EximeeBPMS/eximeebpms-docker#supported-tagsreleases).