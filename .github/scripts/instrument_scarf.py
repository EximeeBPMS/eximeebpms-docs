#!/usr/bin/env python3
"""Instrument assembled public HTML, including copied REST and JavaDoc pages."""

import argparse
import shutil
import sys
from html.parser import HTMLParser
from pathlib import Path
from uuid import UUID


PIXEL_ID = "6183e056-d18a-4ab2-80b0-19248968141e"
START = "eximeebpms-scarf:start"
END = "eximeebpms-scarf:end"
SCRIPT_ID = "eximeebpms-scarf-analytics"
ASSET_URL = "/_analytics/scarf.js"


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.source = source
        self.offsets = [0]
        for line in source.split("\n")[:-1]:
            self.offsets.append(self.offsets[-1] + len(line) + 1)
        self.html = False
        self.body = False
        self.doctype = False
        self.redirect = False
        self.body_ends = []
        self.footer_depth = 0
        self.footer_ends = []
        self.privacy_anchor = False
        self.privacy_anchor_end = None
        self.starts = []
        self.ends = []
        self.scripts = 0
        self.feed(source)
        self.close()

    def source_offset(self):
        line, column = self.getpos()
        return self.offsets[line - 1] + column

    def handle_decl(self, declaration):
        if declaration.lower().startswith("doctype html"):
            self.doctype = True

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == "html":
            self.html = True
        elif tag == "body":
            self.body = True
        elif tag == "meta" and (attrs.get("http-equiv") or "").lower() == "refresh":
            self.redirect = True
        elif tag == "script" and attrs.get("id") == SCRIPT_ID:
            self.scripts += 1
        elif tag == "footer":
            self.footer_depth += 1
        elif tag == "a" and self.footer_depth:
            href = (attrs.get("href") or "").rstrip("/")
            self.privacy_anchor = href == "https://eximeebpms.org/document/eximee-bpms-privacy-policy"

    def handle_endtag(self, tag):
        if tag == "body":
            self.body_ends.append(self.source_offset())
        elif tag == "footer" and self.footer_depth:
            self.footer_ends.append(self.source_offset())
            self.footer_depth -= 1
        elif tag == "a" and self.privacy_anchor:
            self.privacy_anchor_end = self.source.index(">", self.source_offset()) + 1
            self.privacy_anchor = False

    def handle_comment(self, data):
        if data.strip() == START:
            self.starts.append(self.source_offset())
        elif data.strip() == END:
            position = self.source_offset()
            self.ends.append(self.source.index("-->", position) + 3)


def strip_integration(source):
    # Most publication files have never been instrumented; parse them only once.
    if not any(marker in source for marker in (START, END, SCRIPT_ID)):
        return source
    document = Document(source)
    if not document.starts and not document.ends:
        if document.scripts:
            raise ValueError("analytics script exists without its managed comment markers")
        return source
    if len(document.starts) != 1 or len(document.ends) != 1:
        raise ValueError("expected one pair of analytics comment markers")
    start, end = document.starts[0], document.ends[0]
    if start >= end:
        raise ValueError("analytics comment markers are out of order")
    return source[:start] + source[end:]


def instrument(source, pixel_id, enabled=True):
    clean = strip_integration(source)
    document = Document(clean)
    if document.scripts:
        raise ValueError("analytics script exists outside its managed block")
    if document.redirect:
        return clean, "redirect"
    if not (document.html or document.body or document.doctype):
        return clean, "fragment"
    if not (document.html and document.body and len(document.body_ends) == 1):
        raise ValueError("unsupported HTML document: expected html, body and one closing body tag")
    if not enabled:
        return clean, "document"
    # Hugo's wrapper is positioned outside normal body flow. Keep its notice in
    # the existing footer paragraph, rather than creating a stray row above it.
    if document.privacy_anchor_end is not None:
        position = document.privacy_anchor_end
        notice = ' <span data-eximeebpms-analytics-notice="true"> · <a href="/_analytics/">Documentation analytics</a></span>'
    else:
        position = document.footer_ends[-1] if document.footer_ends else document.body_ends[0]
        notice = '<p data-eximeebpms-analytics-notice="true"><a href="/_analytics/">Documentation analytics</a></p>'
    block = (
        "<!-- " + START + " -->\n"
        + notice + "\n"
        '<script id="' + SCRIPT_ID + '" defer src="' + ASSET_URL + '" '
        'data-scarf-pixel="' + str(UUID(pixel_id)) + '"></script>\n'
        "<!-- " + END + " -->"
    )
    return clean[:position] + block + clean[position:], "document"


def instrument_site(site, assets, enabled=True, pixel_id=PIXEL_ID):
    site = site.resolve(strict=True)
    if not site.is_dir():
        raise ValueError("site must be an assembled publication directory")
    pixel_id = str(UUID(pixel_id))
    target = site / "_analytics"
    if target.is_symlink():
        raise ValueError("analytics output directory must not be a symlink")
    target.mkdir(exist_ok=True)
    for name in ("index.html", "scarf.js"):
        if (target / name).is_symlink():
            raise ValueError("analytics output files must not be symlinks")
    disclosure = (assets / "disclosure.html").read_text(encoding="utf-8")
    disclosure = disclosure.replace("{{ANALYTICS_STATUS}}", "enabled" if enabled else "disabled")
    (target / "index.html").write_text(disclosure, encoding="utf-8")
    if enabled:
        shutil.copyfile(assets / "scarf.js", target / "scarf.js")
    elif (target / "scarf.js").exists():
        (target / "scarf.js").unlink()

    counts = {"document": 0, "redirect": 0, "fragment": 0, "changed": 0}
    for path in sorted(site.rglob("*")):
        if path.suffix.lower() not in (".html", ".htm"):
            continue
        if path.is_symlink():
            raise ValueError("HTML output must not be a symlink: " + str(path.relative_to(site)))
        if not path.is_file():
            continue
        with path.open(encoding="utf-8", newline="") as file:
            source = file.read()
        try:
            result, kind = instrument(source, pixel_id, enabled)
        except ValueError as error:
            raise ValueError(str(path.relative_to(site)) + ": " + str(error)) from error
        counts[kind] += 1
        if result != source:
            with path.open("w", encoding="utf-8", newline="") as file:
                file.write(result)
            counts["changed"] += 1
    return counts


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("site", type=Path)
    parser.add_argument("--enabled", choices=("true", "false"), default="true")
    parser.add_argument("--pixel-id", default=PIXEL_ID)
    args = parser.parse_args()
    assets = Path(__file__).resolve().parents[2] / "analytics"
    try:
        counts = instrument_site(args.site, assets, args.enabled == "true", args.pixel_id)
    except (ValueError, OSError, UnicodeError) as error:
        print("FAIL: " + str(error), file=sys.stderr)
        return 1
    print("Scarf publication analytics (enabled=" + args.enabled + "): " + str(counts))
    return 0


if __name__ == "__main__":
    sys.exit(main())
