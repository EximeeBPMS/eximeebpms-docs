#!/usr/bin/env python3
"""Resolve symbol shortcodes using each site's configured theme (no build needed)."""
import pathlib
import re
import sys


def check(root):
    failed = False
    for section in ("manual", "get-started", "security"):
        site = root / section
        if not (site / "content").is_dir():
            continue
        references = set()
        for page in (site / "content").rglob("*.md"):
            references.update(re.findall(r'{{<\s*(bpmn|cmmn)-symbol\s+type="([^"]*)"', page.read_text()))
        if not references:
            continue
        match = re.search(r'^theme:\s*["\']?([\w-]+)["\']?\s*(?:#.*)?$', (site / "config.yaml").read_text(), re.M)
        if not match:
            print(f"FAIL: {section}/config.yaml must select one named theme")
            failed = True
            continue
        theme = match[1]
        if not (root / "themes").exists():
            print(f"NOTE: {section} symbols not verified: attach themes/{theme} first")
            continue
        for kind, symbol in sorted(references):
            asset = root / "themes" / theme / "static/img/short-codes" / f"{kind}-{symbol}.png"
            if not asset.is_file():
                print(f"FAIL: {section} symbol missing from selected theme: {asset}")
                failed = True
    return int(failed)


if __name__ == "__main__":
    sys.exit(check(pathlib.Path(sys.argv[1])))
