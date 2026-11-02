#!/usr/bin/env python3
"""Normalize legacy Blackfriday markup in disposable documentation build trees.

This also keeps published Enterprise history immutable while its staging successor
contains unreleased features. Fenced and indented code examples are preserved.
"""
import pathlib
import re
import sys

HTML_TABLE_PAGES = {
    "reference/deployment-descriptors/tags/process-archive.md",
    "reference/deployment-descriptors/tags/process-engine.md",
    "reference/bpmn20/custom-extensions/extension-attributes.md",
}


def normalize(source, html_tables=False):
    result = []
    fence = None
    table = False
    pre = False
    for line in source.splitlines(keepends=True):
        original = line
        marker = re.match(r"^\s*(`{3,}|~{3,})", line)
        if marker:
            token = marker[1]
            if fence is None:
                fence = token
            elif token[0] == fence[0] and len(token) >= len(fence):
                fence = None
            result.append(line)
            continue
        if fence:
            result.append(line)
            continue
        if pre and "</pre>" not in line:
            result.append(line)
            continue
        if "</pre>" in line:
            pre = False
        if html_tables and "<table" in line:
            table = True
        if table:
            line = line.lstrip(" \t")
        # Preserve inline code and indented code examples.
        if table or not line.startswith(("    ", "\t")):
            pieces = re.split(r"(`+[^`]*`+)", line)
            for index in range(0, len(pieces), 2):
                pieces[index] = re.sub(r"(\[[^\]\n]+\]) +(?=\((?:https?://|{{<))", r"\1", pieces[index])
                # Goldmark's linkifier requires a public suffix; explicit autolinks
                # preserve the former clickable localhost examples in prose.
                pieces[index] = re.sub(
                    r'(^|[ \t])(https?://localhost(?::[0-9]+)?(?:/[^\s<>"\']*)?)',
                    lambda match: match[1] + "<" + match[2].rstrip(".,;)") + ">"
                    + match[2][len(match[2].rstrip(".,;)")):], pieces[index])
            line = "".join(pieces)
        # Pre-0.169 aliases were site-relative even without the initial slash.
        if re.match(r"^aliases:\s*\[", line):
            line = re.sub(r'([\[,]\s*["\']?)(reference/dmn11/)', r'\1/\2', line)
        line = re.sub(r'^(\s*-\s*["\']?)(reference/dmn11/)', r'\1/\2', line)
        if line != original:
            line = line.rstrip(" \t\r\n") + ("\n" if original.endswith("\n") else "")
        result.append(line)
        if "<pre" in line and "</pre>" not in line:
            pre = True
        if html_tables and "</table>" in line:
            table = False
    return "".join(result)


def prepare(root):
    changed = 0
    for section in ("manual", "get-started", "security"):
        content = root / section / "content"
        if not content.exists():
            continue
        for page in content.rglob("*.md"):
            source = page.read_text()
            updated = normalize(source, page.relative_to(content).as_posix() in HTML_TABLE_PAGES)
            if source != updated:
                page.write_text(updated)
                changed += 1
    print(f"Prepared {changed} legacy Markdown files")


if __name__ == "__main__":
    prepare(pathlib.Path(sys.argv[1]))
