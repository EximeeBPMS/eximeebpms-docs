# EximeeBPMS Documentation

This repository contains the sources of the [EximeeBPMS](https://eximeebpms.org) documentation, published at [docs.eximeebpms.org](https://docs.eximeebpms.org).

## Repository Structure

Versioned content lives on separate git branches. The `master` branch holds only configuration and shared assets:

```
master
├── themes/          # Hugo theme (shared across all versions)
├── rest/            # REST API docs (static, not versioned)
├── versions.yaml    # list of published versions and which is "latest"
├── .github/         # CI/CD workflows
└── docker-compose.yml

docs/1.0.0           # orphan branch — manual/, get-started/, security/
docs/1.1.0
docs/1.2.0
...
```

## Building Locally

Requirements: Docker, Python 3 and Node.js with `npx` (for Pagefind search).
Hugo runs inside a container; no local Hugo installation is needed.

```bash
./build-local.sh
```

The script builds each published version in a temporary detached worktree and writes
output to `public-local/`, including Pagefind indexes. It prefers `origin/docs/<version>`
over a potentially stale local branch, falling back to `docs/<version>` when no remote
ref exists. Fetch content updates first when needed:

```bash
git fetch origin 'refs/heads/docs/*:refs/remotes/origin/docs/*'
```

To preview only Enterprise staging with the new theme and the prepared agent manual,
run from `BPMS-877-docs-theme`:

```bash
./build-local.sh --version 1.4-ee-next --ref BPMS-877-agent-manual
python3 -m http.server 8080 --directory public-local
```

Open <http://localhost:8080/manual/1.4-ee-next/>. The selected content ref supplies
its theme configuration; the current working tree supplies shared themes and tooling.
`--ref` accepts a branch or commit and requires `--version`. Omitting `--ref` selects
the normal remote/local content ref for that version. Builds replace `public-local/`;
they do not update content branches or publish staging.

To build **and** immediately serve the result:

```bash
./serve-local.sh
```

Then open [http://localhost:8080](http://localhost:8080). The serve wrapper accepts
the same options, for example
`./serve-local.sh --version 1.4-ee-next --ref BPMS-877-agent-manual`.

### Container image

`Dockerfile` builds a self-contained image (Hugo build stage + nginx) for deployment outside GitHub Pages. Unlike the committed `versions.yaml`, the image always regenerates it from whatever `docs/*` branches are present in the build context (`generate-versions.sh`), so `latest` and the version list never drift from the actual branches:

```bash
docker build -t eximeebpms-docs .
docker run --rm -p 8080:80 eximeebpms-docs
```

The build context must include the full `.git` history with all `docs/*` branches fetched locally (`git fetch origin 'refs/heads/docs/*:refs/heads/docs/*'`) — the Dockerfile checks each one out via `git worktree`, same as `build-local.sh`.

### Live-reload dev server (single version)

When working on a specific version, check out its branch and run `dev.sh`:

```bash
git checkout docs/1.3.0
./dev.sh
```

Then open [http://localhost:1313](http://localhost:1313). Hugo will automatically rebuild and refresh the browser on every file change. Press Ctrl+C to stop.

`dev.sh` is committed on each `docs/X.Y.Z` branch. Themes are fetched automatically from `master` at startup — no manual setup needed.

## Publication size and shared JavaDoc

The Pages, local and Docker builders optimize assembled output with
`.github/scripts/optimize_publication.py`. Source branches and their JavaDoc
artifacts are unchanged. Assembled SVGs lose only formatting whitespace between
attributes inside tags; text, attribute values, geometry, comments and metadata
are retained. Only JavaDoc directories whose entire normalized file trees
have matching SHA-256 fingerprints share one canonical copy; differing APIs,
search indexes, legal notices or filenames prevent sharing.

The latest OSS version's directory is preferred as canonical when it belongs
to an identical group. Other JavaDoc HTML URLs become small redirects that
preserve query strings and fragments. Those pages load the canonical JavaDoc's
styles and search indexes. Legacy `element-list`, legal notices and downloadable
`doc-files` remain available; duplicate renderer JavaScript and CSS are omitted.

Identical root copies of `manual/latest` HTML also redirect to `manual/latest`;
versioned manuals, the latest alias, root resources and distinct root pages remain.
Redirects receive no analytics pixel. The final Pages output is checked again
after analytics insertion and must be below 1,000,000,000 bytes. A size failure
stops publication before the generated branch is committed.

For an assembled output directory:

```bash
python3 .github/scripts/optimize_publication.py public-local --latest 1.4.0
python3 .github/scripts/optimize_publication.py public-local --check-only
```

This shares identical artifacts; it does not regenerate or correct stale JavaDoc.
A future distinct API keeps its own tree and may require further size reduction
or a separate API-documentation host.

## Releasing a New Version

1. Create a new docs branch from the previous one:
   ```bash
   git checkout docs/1.2.0
   git checkout -b docs/1.3.0
   ```
2. Update content on the new branch.
3. On `master`, add the new version to `versions.yaml` and update `latest`.

## Contributing

See our [contribution guide](https://github.com/EximeeBPMS/eximeebpms/blob/master/CONTRIBUTING.md) for general guidelines.

**Important:** Do not change the contents of `themes/` directly.

## Documentation page-view analytics

The GitHub Pages workflow instruments the **assembled publication** with a Scarf
pixel after all Hugo, REST override and JavaDoc copies. It covers the public root,
all published manual versions, get-started, security, REST and JavaDoc without
editing generated API bundles or version branches. Redirect pages, HTML fragments
and search indexes are not instrumented. Every complete HTML page links to the
[public analytics disclosure](https://docs.eximeebpms.org/_analytics/).

The first-party helper runs only on `https://docs.eximeebpms.org` (default HTTPS
port). It sends the public pixel ID and origin/path, excludes URL query strings
and fragments, suppresses the HTTP referrer and honors browser DNT/GPC. It adds no
cookies, third-party JavaScript SDK or application runtime telemetry. Local builds
and demo-image assembly do not include this instrumentation. A production output
copy served locally also sends no pixel request.

Scarf may infer country/company information from request metadata; page views are
not people, completed downloads or installations. Browser blockers, caching and
network proxies limit the results. This integration is separate from Maven
Central insights, download gateway routes and the README pixel below.

### Verification and rollback

Run the checks used by the publication workflow:

```bash
python3 -m unittest discover -s .github/scripts -p 'test_*.py'
node --test tests/scarf.test.cjs
```

The instrumenter requires Python 3 and the runtime checks use the workflow's
existing Node.js. For an already assembled publication directory:

```bash
python3 .github/scripts/instrument_scarf.py path/to/publication --enabled true
```

It is repeatable, replaces its own marked block, validates the configured pixel
ID, and fails publication on unsupported full HTML documents instead of silently
claiming coverage. Existing inline scripts and page content are preserved. It
copies the helper and disclosure to `/_analytics/`. Do not point it at source
documentation or an application distribution.

Check that the existing GTM container does **not** emit the same Scarf pixel.
Use one integration, not both. A container change can affect this independently
of the repository. If CSP is added, allow `https://static.scarf.sh` in `img-src`
and the same-origin helper in `script-src`, without widening unrelated directives.
After human publication, verify one eligible page load in browser Network and
then the corresponding Scarf analytics after processing delay; an image response
does not guarantee immediate visibility in reports.

To disable collection, set `SCARF_DOCS_ENABLED` to `'false'` in
`.github/workflows/hugo.yml` and rebuild/publish normally. The instrumenter removes
its marked blocks and helper, and the disclosure reports the disabled state.
Changing source alone does not update previously published HTML. No DNS, pixel
deletion or API token is needed.

## License

<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/3.0/80x15.png"></a> The content on this site is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.

## Writing Docs

### How can I add an image?

Put the image next to the content page that references it and use the `img` shortcode:

```html
{{< img src="architecture-overview.png" title="History Architecture" >}}
```

### How can I reference the Javadocs?

```html
{{< javadocref page="org/eximeebpms/bpm/engine/impl/TaskServiceImpl.html" text="Java-API Task Service" >}}
```

### How can I add a note?

```html
{{< note title="Heads Up!" class="info" >}}
The content of the note.

* full
* markdown is supported
{{< /note >}}
```

Supported classes: `info`, `warning`.

### How can I flag an Enterprise-only feature?

```html
{{< enterprise >}}
The FOO Feature is only available in the Enterprise Edition.
{{< /enterprise >}}
```

### How can I highlight code lines?

```html
{{< code language="xml" line="3-5,13" >}}
...your code...
{{< /code >}}
```

## README view analytics

This public README includes a [Scarf tracking image](https://docs.scarf.sh/web-traffic/)
to estimate interest in this repository. GitHub's image proxy and caching limit
counts and company attribution; these are not unique-reader or installation statistics.

<img alt="" width="1" height="1" referrerpolicy="no-referrer"
     src="https://static.scarf.sh/a.png?x-pxid=b3145a92-ad3c-4f20-bdbf-ae403eb3eb8c&amp;page=https%3A%2F%2Fgithub.com%2FEximeeBPMS%2Feximeebpms-docs" />

## Refreshing the staging dependency inventory

The license-book page separates a current dependency inventory from retained
legacy notices. Refresh versions from the engine source being documented, never
by replacing version strings in historical copyright/license text.

In a clean engine checkout, generate an aggregate BOM using its Maven/Nexus setup:

```bash
./mvnw org.cyclonedx:cyclonedx-maven-plugin:2.9.3:makeAggregateBom \
  -DoutputFormat=json -DoutputName=license-inventory
```

Then run from the shared docs checkout, substituting the engine and staging paths:

```bash
python3 .github/scripts/render_license_inventory.py \
  --java-bom <engine>/target/license-inventory.json \
  --npm-lock <engine>/webapps/frontend/package-lock.json \
  --npm-bom <engine>/sbom/eximeebpms-frontend-bom.json \
  --revision <engine-commit> \
  --output <staging>/manual/content/introduction/third-party-libraries/camunda-bpm-platform-license-book.md
```

JavaScript versions always come from the lockfile. The frontend BOM only fills
missing license metadata for an exact package/version match. Missing declarations
stay explicit; the generated inventory spans build/development modules as well as
runtime dependencies and does not claim every entry is bundled in every binary.
Retained notice text is preserved on regeneration. Reconcile the final inventory
against released artifacts before publishing release documentation.
