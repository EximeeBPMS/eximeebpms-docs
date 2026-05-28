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

Requirements: Docker (Hugo runs inside a container — no local Hugo installation needed).

```bash
./build-local.sh
```

The script checks out each version via git worktrees, builds with Hugo, and writes output to `public-local/`.

To build **and** immediately serve the result:

```bash
./serve-local.sh
```

Then open [http://localhost:8080](http://localhost:8080).

### Live-reload dev server (single version)

When working on a specific version, check out its branch and run `dev.sh`:

```bash
git checkout docs/1.3.0
./dev.sh
```

Then open [http://localhost:1313](http://localhost:1313). Hugo will automatically rebuild and refresh the browser on every file change. Press Ctrl+C to stop.

`dev.sh` is committed on each `docs/X.Y.Z` branch. Themes are fetched automatically from `master` at startup — no manual setup needed.

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
{{< javadocref page="org/camunda/bpm/engine/impl/TaskServiceImpl.html" text="Java-API Task Service" >}}
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
