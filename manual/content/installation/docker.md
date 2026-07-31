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

The Community Edition docker images can be found on [GitHub](https://github.com/EximeeBPMS/eximeebpms-docker) and [GitHub Container Registry](https://github.com/orgs/EximeeBPMS/packages/container/package/eximeebpms-bpm-platform).

## Start EximeeBPMS Run using Docker

To start [EximeeBPMS Run]({{< ref "/user-guide/eximeebpms-bpm-run.md" >}}) execute the following commands:

```shell
docker pull ghcr.io/eximeebpms/eximeebpms-bpm-platform:latest
docker run -d --name eximeebpms -p 8080:8080 ghcr.io/eximeebpms/eximeebpms-bpm-platform:latest
```

Please note that by default the Spring Boot distribution is used. For a guide on how to use one of the other distributions, see the [tag schema](https://github.com/EximeeBPMS/eximeebpms-docker#supported-tagsreleases).

For deploying this image on Kubernetes or OpenShift, see [Run EximeeBPMS on Kubernetes / OpenShift]({{< ref "/installation/kubernetes.md" >}}).

# Enterprise Edition

Enterprise Edition Docker images are not published to a public registry. They are distributed through a private, authenticated container registry as part of an EximeeBPMS Enterprise Edition subscription — see [Licenses — Enterprise Edition]({{< ref "/introduction/licenses.md" >}}#enterprise-edition). Contact your EximeeBPMS account team to obtain registry credentials.

Once you have credentials, log in to the registry and pull/run the image the same way as the Community Edition image above:

```shell
docker login <registry-host-provided-by-support>
docker pull <registry-host>/eximeebpms/eximeebpms-bpm-platform:run-1.3.1-ee
docker run -d --name eximeebpms -p 8080:8080 <registry-host>/eximeebpms/eximeebpms-bpm-platform:run-1.3.1-ee
```

The Enterprise Edition image follows the same `<distro>-<version>` tag scheme as the Community Edition image.

For deploying the Enterprise Edition image on Kubernetes, see [Run EximeeBPMS on Kubernetes / OpenShift — Enterprise Edition]({{< ref "/installation/kubernetes.md" >}}#enterprise-edition).