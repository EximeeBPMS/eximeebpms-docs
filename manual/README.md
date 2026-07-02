# Tech Stack table — editing guide

The table on the **Tech Stack** page (`manual/content/introduction/tech-stack.md`) is
generated from a single data file. This guide shows how to add a new release, add a new
dependency row, and format every kind of cell the table understands — no template editing
required for routine updates.

This README is not part of the site content (it lives at the site root, outside
`content/`), so Hugo doesn't render it — it's plain repository documentation for whoever
edits the data.

## File map

| File | Role |
|---|---|
| `data/tech_stack.yaml` | The data. **Edit this for every routine change.** |
| `layouts/shortcodes/tech-stack-table.html` | Renders the table, toolbar and legend from the data above. Edit only to change behavior — e.g. how many versions show by default. |
| `layouts/partials/tech-stack-cell.html` | Renders a single cell. Edit only to support a new kind of cell. |

## Adding a new version

Example: releasing v1.4.0.

### 1. Register the version

Open `tech_stack.yaml` and append it to the `versions` list, after the last OSS entry and
before `ent`:

```yaml
# versions: is ordered — new releases go at the end of the OSS run
versions:
  - id: v1.2.0
    label: v1.2.0
    type: oss
  - id: v1.3.0
    label: v1.3.0
    type: oss
  - id: v1.4.0        # <- new entry
    label: v1.4.0
    type: oss
  - id: ent
    label: Enterprise
    type: enterprise
    badge: current
```

### 2. Add a value under every component it touches

For each component that changed in v1.4.0, add a `v1.4.0` key to its `values` map:

```yaml
  - name: Spring Boot
    values:
      v1.2.0: { value: "4.0.3", change: mj }
      v1.3.0: { value: "TODO" }
      v1.4.0: { value: "4.2.0", change: up }   # <- new entry
      ent: { value: "4.1.0", change: up }
```

Components that didn't change still need the key — repeat the previous value with no
`change`, so the column isn't blank:

```yaml
  - name: Apache Maven (wrapper)
    values:
      v1.3.0: { value: "3.8.8" }
      v1.4.0: { value: "3.8.8" }   # <- new entry, unchanged
      ent: { value: "3.8.8" }
```

### 3. That's it — save the file

The column appears automatically, in order. The default view keeps the two most recent
OSS versions plus Enterprise, so v1.4.0 becomes visible and the oldest currently-shown OSS
version quietly moves behind the **Show older versions** selector. No other file changes
needed.

> **Note:** don't have a real value yet for an unreleased version? Use
> `{ value: "TODO" }` — it renders unhighlighted, as a placeholder, exactly like the
> existing v1.3.0 column does today.

## Adding a component row

Example: tracking a new dependency.

Find the right category in `categories:` and add a new entry to its `components` list,
with one value per existing version:

```yaml
  - name: Persistence Layer
    components:
      - name: Hibernate ORM
        values: { … }
      - name: Testcontainers        # <- new entry
        values:
          v1.0.0: { value: "1.19.7" }
          v1.1.0: { value: "1.19.7" }
          v1.2.0: { value: "1.20.1", change: up }
          v1.3.0: { value: "TODO" }
          ent: { value: "1.20.1" }
```

Optional subtitle under the name — used for things like a runtime qualifier:

```yaml
- name: Apache Tomcat
  sub: "Jakarta · 10.x"
```

## Adding a category

Example: a new group header, like "Messaging".

Add a new block to the top-level `categories` list. Its `name` becomes the dark
group-header row that spans the full table width — nothing else to configure:

```yaml
categories:
  - name: Build & Frontend Tools
    components: [ … ]
  - name: Messaging               # <- new category
    components:
      - name: Apache Kafka
        values: { … }
```

## Cell field reference

Every key a value block understands:

| Field | Type | Effect |
|---|---|---|
| `value` | string | The text shown in the cell. Omit only when using `namespaces` or `subvalues` instead. |
| `change` | `up` · `mj` · `bk` · `dr` | Highlight class — patch/minor, major, breaking, or dropped. Leave unset for no highlight. |
| `badge` | string | Overrides the auto chip text. `mj` defaults to "Major", `dr` to "Dropped" — set this to label anything else, e.g. "Upgrade". |
| `note` | string | A small line under the value. Used for context that isn't a version number. |
| `struck` | string | Renders "was &lt;value&gt;" with a strikethrough — pairs with `change: dr`. |
| `namespaces` | list of `{cls, text}` | Renders one or more colored pills instead of a value. `cls` is `j` (javax, purple) or `k` (jakarta, blue). |
| `subvalues` | list of `{version, tag}` | Stacks two version lines in one cell — for components that ship both a legacy and current line side by side. |

## Change types

What each `change:` value looks like — this is the same legend printed under the live
table:

- **`up`** — patch / minor update
- **`mj`** — major version upgrade
- **`bk`** — breaking change
- **`dr`** — dropped / removed
- **(auto)** — dual namespace, set automatically when `namespaces` or `subvalues` is present

## Special cell patterns

Copy-paste starting points for the less obvious cases.

**Major upgrade with a chip:**
```yaml
ent: { value: "21", change: mj }
```

**Dropped, with what it replaced:**
```yaml
ent: { change: dr, struck: "9.0.113" }
```

**Namespace support pills:**
```yaml
v1.2.0: { namespaces: [ { cls: j, text: javax }, { cls: k, text: jakarta } ] }
```

**Two version lines stacked:**
```yaml
v1.1.0: { subvalues: [
  { version: "5.3.39", tag: javax },
  { version: "6.2.10", tag: jakarta }
] }
```

**Value with a footnote:**
```yaml
v1.2.0: { value: "7.0.5", change: mj, note: "jakarta-only; Spring 5 removed" }
```

## Common pitfalls

- **Missing a version key on an existing component.** If you add `v1.4.0` to `versions`
  but forget it on a component's `values`, that cell just renders blank — it won't error.
  Copy the previous version's value forward when nothing changed.
- **Version IDs must match exactly.** The key under `values` (e.g. `v1.4.0`) must be
  identical to the `id` you gave it in `versions` — including the `v` prefix. A mismatch
  silently drops the cell rather than failing the build.
- **Quote version-like strings.** YAML will try to parse an unquoted `10.1` as a number.
  Always wrap version values in double quotes, as every existing entry does.
- **Reminder:** the Enterprise column (`ent`) is never hidden and always sits last. Only
  `type: oss` versions rotate through the "Show older versions" selector.
