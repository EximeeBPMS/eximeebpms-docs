---

title: "Run EximeeBPMS on Kubernetes / OpenShift"
weight: 22

menu:
  main:
    name: "Kubernetes"
    identifier: "installation-guide-kubernetes"
    parent: "installation-guide"
    pre: "Run the Full Distribution on Kubernetes or OpenShift"

---

# Community Edition

Official Kubernetes / OpenShift deployment artifacts are maintained in the [eximeebpms-k8s](https://github.com/EximeeBPMS/eximeebpms-k8s) repository, as both a Helm chart and Kustomize manifests. Both deploy the same [Docker image]({{< ref "/installation/docker.md" >}}) and are equivalent -- pick whichever fits your platform's tooling. The Helm chart is also listed on [ArtifactHub](https://artifacthub.io/packages/helm/eximeebpms-k8s/eximeebpms), where you can browse available versions and values.

## Quick start

Using Helm:

```shell
helm repo add eximeebpms https://eximeebpms.github.io/eximeebpms-k8s
helm repo update
helm install my-release eximeebpms/eximeebpms
```

Using Kustomize:

```shell
kubectl apply -k "https://github.com/EximeeBPMS/eximeebpms-k8s/kustomize/base?ref=main"
```

By default both start a single replica backed by the embedded H2 database (demo/quick-start only) -- H2 does not support clustering.

## Highly available deployment

For a production, multi-replica deployment against an external PostgreSQL database, with a `HorizontalPodAutoscaler`, a `PodDisruptionBudget`, pod anti-affinity, and tuned probes, see:

* Helm: [`values-ha.yaml`](https://github.com/EximeeBPMS/eximeebpms-k8s/blob/main/charts/eximeebpms/values-ha.yaml)
* Kustomize: [`overlays/ha`](https://github.com/EximeeBPMS/eximeebpms-k8s/tree/main/kustomize/overlays/ha)

## OpenShift

The [`overlays/openshift`](https://github.com/EximeeBPMS/eximeebpms-k8s/tree/main/kustomize/overlays/openshift) Kustomize overlay is SCC-compatible (it lets OpenShift assign the container's UID instead of hardcoding one) and adds an OpenShift `Route`:

```shell
kubectl apply -k "https://github.com/EximeeBPMS/eximeebpms-k8s/kustomize/overlays/openshift?ref=main"
```

## Security defaults

Both the chart and the Kustomize base run the container as a non-root user, drop all Linux capabilities,
disallow privilege escalation, run with a read-only root filesystem, and apply the `RuntimeDefault` seccomp
profile by default. See the [eximeebpms-k8s README](https://github.com/EximeeBPMS/eximeebpms-k8s) for the full
list of configurable values.

This satisfies the [Pod Security Standards "Restricted"](https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted)
profile and the container-level checks of the [CIS Kubernetes Benchmark](https://www.cisecurity.org/benchmark/kubernetes)
out of the box, so both deployment methods can be used in namespaces enforcing
`pod-security.kubernetes.io/enforce: restricted`. Rendered manifests are checked with
[kube-score](https://github.com/zegl/kube-score) in CI to guard against regressions.

## Supply chain

- Published images are scanned with [Trivy](https://github.com/aquasecurity/trivy) (the build fails on
  CRITICAL findings) and shipped with a CycloneDX SBOM.
- Images and the Helm chart (published as an OCI artifact to `oci://ghcr.io/eximeebpms/charts/eximeebpms`, in
  addition to the classic chart repo above) are signed keylessly with [cosign](https://github.com/sigstore/cosign)
  using GitHub Actions OIDC -- no long-lived signing key involved:
  ```shell
  cosign verify ghcr.io/eximeebpms/eximeebpms-bpm-platform:run-1.2.0 \
    --certificate-identity-regexp 'https://github.com/EximeeBPMS/eximeebpms-docker/.*' \
    --certificate-oidc-issuer https://token.actions.githubusercontent.com

  cosign verify ghcr.io/eximeebpms/charts/eximeebpms:<version> \
    --certificate-identity-regexp 'https://github.com/EximeeBPMS/eximeebpms-k8s/.*' \
    --certificate-oidc-issuer https://token.actions.githubusercontent.com
  ```

# Enterprise Edition

The same Helm chart and Kustomize manifests documented above also deploy the [Enterprise Edition Docker image]({{< ref "/installation/docker.md" >}}#enterprise-edition) — point `image.repository` at your private registry and supply the pull credentials you received from your EximeeBPMS account team or support as a Kubernetes image pull secret.

Using Helm:

```shell
kubectl create secret docker-registry eximeebpms-enterprise-registry \
  --docker-server=<registry-host-provided-by-support> \
  --docker-username=<username> \
  --docker-password=<password>

helm install my-release eximeebpms/eximeebpms \
  --set image.repository=<registry-host>/eximeebpms/eximeebpms-bpm-platform \
  --set image.tag=run-1.3.1-ee \
  --set image.pullSecrets[0].name=eximeebpms-enterprise-registry
```

Using Kustomize, add an `images:` override for the same repository/tag and an `imagePullSecrets:` entry referencing the same secret in your overlay.

The high-availability, OpenShift, and security-hardening guidance above applies identically to the Enterprise Edition image.
