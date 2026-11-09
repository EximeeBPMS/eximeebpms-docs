#!/usr/bin/env python3
"""Normalize legacy Blackfriday markup in disposable documentation build trees.

This also keeps published Enterprise history immutable while its staging successor
contains unreleased features. Fenced and indented code examples are preserved.
"""
import pathlib
import re
import sys

# A Markdown link whose label ends one line and whose target starts the next one:
# Blackfriday joined them, Goldmark renders both halves as text.
SPLIT_LINK_LABEL = re.compile(r"\[[^\]\n]+\][ \t]*\r?\n$")
SPLIT_LINK_TARGET = re.compile(r"^[ \t]*\((?:https?://|{{<)")


def normalize(source, html_tables=None):
    """Normalize one page; HTML table indentation is handled on any page with an HTML table."""
    if html_tables is None:
        html_tables = "<table" in source
    result = []
    fence = None
    table = False
    pre = False
    lines = source.splitlines(keepends=True)
    index = 0
    while index < len(lines):
        line = lines[index]
        index += 1
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
        # A table tag quoted in inline code is prose, not the start of an HTML table.
        if html_tables and "<table" in re.sub(r"`+[^`]*`+", "", line):
            table = True
        if table:
            line = line.lstrip(" \t")
        # Preserve inline code and indented code examples.
        if table or not line.startswith(("    ", "\t")):
            while index < len(lines) and SPLIT_LINK_LABEL.search(line) and SPLIT_LINK_TARGET.match(lines[index]):
                line = line.rstrip(" \t\r\n") + lines[index].lstrip(" \t")
                index += 1
            pieces = re.split(r"(`+[^`]*`+)", line)
            for piece in range(0, len(pieces), 2):
                pieces[piece] = re.sub(r"(\[[^\]\n]+\]) +(?=\((?:https?://|{{<))", r"\1", pieces[piece])
                # Goldmark's linkifier requires a public suffix; explicit autolinks
                # preserve the former clickable localhost examples in prose.
                pieces[piece] = re.sub(
                    r'(^|[ \t])(https?://localhost(?::[0-9]+)?(?:/[^\s<>"\']*)?)',
                    lambda match: match[1] + "<" + match[2].rstrip(".,;)") + ">"
                    + match[2][len(match[2].rstrip(".,;)")):], pieces[piece])
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
            updated = normalize(source)
            if source != updated:
                page.write_text(updated)
                changed += 1
    print(f"Prepared {changed} legacy Markdown files")


if __name__ == "__main__":
    prepare(pathlib.Path(sys.argv[1]))
