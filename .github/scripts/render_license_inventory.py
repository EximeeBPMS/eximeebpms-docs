#!/usr/bin/env python3
"""Refresh a license-book inventory from an engine aggregate BOM and npm lockfile.

Versions come from these inputs, never from the retained historical notice text.
The frontend BOM can supply license metadata for the exact same package/version.
"""
import argparse
import html
import json
from pathlib import Path

MARKER = "<!-- retained-license-notices -->"


def cell(value):
    return html.escape(str(value)).replace("|", "&#124;").replace("\n", " ")


def licenses(component):
    values = []
    for entry in component.get("licenses", []):
        if entry.get("expression"):
            values.append(entry["expression"])
        elif entry.get("license"):
            item = entry["license"]
            values.append(item.get("id") or item.get("name") or "Not declared")
    return "; ".join(values) or "Not declared in source metadata"


def render(java_bom, npm_lock, npm_bom, revision, existing):
    if MARKER in existing:
        front, notices = existing.split(MARKER, 1)
    else:
        front, notices = existing, None
    # Front matter is delimited by lines consisting of "---" only.
    _, frontmatter, body = ("\n" + front.lstrip("\n")).split("\n---\n", 2)
    if notices is None:
        notices = body
    header = "---\n" + frontmatter + "\n---\n"
    java = sorted({(c.get("group", ""), c["name"], c.get("version", ""), licenses(c))
                   for c in java_bom["components"]
                   if not c.get("group", "").startswith("org.eximeebpms")})
    # CycloneDX npm components carry an @scope in "group"; lockfile names include it.
    fallback = {(f"{c['group']}/{c['name']}" if c.get("group") else c["name"], c.get("version", "")): licenses(c)
                for c in npm_bom.get("components", [])}
    npm = set()
    for location, package in npm_lock["packages"].items():
        if not location or package.get("link"):
            continue
        name = package.get("name") or location.rsplit("node_modules/", 1)[-1]
        version = package.get("version", "")
        license_name = package.get("license") or fallback.get((name, version), "Not declared in source metadata")
        scope = "Build/development" if package.get("dev") else "Runtime"
        if package.get("optional"):
            scope += " (optional)"
        npm.add((name, version, license_name, scope))
    lines = [header, "## Current Enterprise snapshot inventory\n",
             f"Source revision: `{revision}`. This staging inventory describes the upcoming Enterprise snapshot, not a published release.\n",
             "Java versions and declared licenses come from a freshly generated aggregate CycloneDX BOM. "
             "It spans engine modules, distributions and development/test modules; the dependencies present "
             "in a particular distribution are a subset. JavaScript versions come from the same revision's "
             "frontend lockfile, including build dependencies. Multiple versions can be required by different modules.\n",
             "License names below reproduce dependency metadata. Entries without a declaration are marked explicitly. "
             "The [SPDX license list](https://spdx.org/licenses/) provides the corresponding standard license texts. "
             "For the notices accompanying a particular binary, use its distributed LICENSE and NOTICE files.\n",
             f"### Java dependencies ({len(java)})\n",
             "| Group | Artifact | Version | Declared license |", "| --- | --- | --- | --- |"]
    lines += ["| " + " | ".join(map(cell, row)) + " |" for row in java]
    lines += [f"\n### JavaScript dependencies ({len(npm)})\n",
              "| Package | Version | Declared license | Use |", "| --- | --- | --- | --- |"]
    lines += ["| " + " | ".join(map(cell, row)) + " |" for row in sorted(npm)]
    lines += ["\n## Retained license notices\n",
              "The following notices are retained from the earlier license book. Version numbers in this "
              "historical notice text describe its original inputs; the current version inventory is above.\n",
              '<details><summary>Read retained license and copyright notices</summary>\n',
              MARKER + notices.rstrip() + "\n</details>\n"]
    # Avoid accumulating the enclosing details tag when refreshing a generated page.
    if MARKER in existing:
        lines[-1] = MARKER + notices.rstrip().removesuffix("</details>").rstrip() + "\n</details>\n"
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--java-bom", type=Path, required=True)
    parser.add_argument("--npm-lock", type=Path, required=True)
    parser.add_argument("--npm-bom", type=Path, required=True)
    parser.add_argument("--revision", required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    args.output.write_text(render(json.loads(args.java_bom.read_text()),
                                  json.loads(args.npm_lock.read_text()),
                                  json.loads(args.npm_bom.read_text()),
                                  args.revision, args.output.read_text()))


if __name__ == "__main__":
    main()
