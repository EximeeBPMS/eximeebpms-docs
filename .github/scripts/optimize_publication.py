#!/usr/bin/env python3
"""Share identical JavaDoc trees in assembled output, preserving document URLs."""

import argparse
import hashlib
import html
import json
import re
from pathlib import Path
from urllib.parse import quote


PAGES_LIMIT = 1_000_000_000
REDIRECT_MARKER = "<!-- eximeebpms-redirect -->"
SVG_TAG = re.compile(r'<!--.*?-->|<!\[CDATA\[.*?\]\]>|<(?:(?:"[^"]*")|(?:\x27[^\x27]*\x27)|[^\x27">])*>', re.S)


def files(directory):
    return sorted(path for path in directory.rglob("*") if path.is_file())


def fingerprint(directory):
    digest = hashlib.sha256()
    for path in files(directory):
        digest.update(path.relative_to(directory).as_posix().encode() + b"\0")
        content = hashlib.sha256()
        with path.open("rb") as stream:
            for chunk in iter(lambda: stream.read(1024 * 1024), b""):
                content.update(chunk)
        digest.update(content.digest())
    return digest.digest()


def redirect(target):
    url = quote(target, safe="/")
    escaped = html.escape(url, quote=True)
    return (
        '<!doctype html>' + REDIRECT_MARKER + '<meta charset="utf-8">'
        f'<meta http-equiv="refresh" content="0;url={escaped}">'
        '<script>location.replace(document.querySelector("meta[http-equiv]").content.slice(6)'
        '+location.search+location.hash)</script>'
    )


def compact_svg(source):
    """Remove formatting whitespace inside tags only, never SVG text or values."""
    def compact(match):
        tag = match[0]
        if tag.startswith(("<!", "<?")):
            return tag
        parts = re.split(r'("[^"]*"|\x27[^\x27]*\x27)', tag)
        for index in range(0, len(parts), 2):
            parts[index] = re.sub(r"[ \t\r\n]+", " ", parts[index])
        return "".join(parts)
    return SVG_TAG.sub(compact, source)


def publication_size(root):
    return sum(path.stat().st_size for path in files(root))


def compact_svgs(root):
    compacted = {}
    for path in root.rglob("*.svg"):
        original = path.read_bytes()
        identity = hashlib.sha256(original).digest()
        if identity not in compacted:
            try:
                compacted[identity] = compact_svg(original.decode("utf-8")).encode("utf-8")
            except UnicodeDecodeError:
                compacted[identity] = original
        result = compacted[identity]
        if result != original:
            path.write_bytes(result)


def optimize(root, latest):
    if root.is_symlink():
        raise ValueError("publication root is a symlink")
    if not re.fullmatch(r"\d+\.\d+(?:\.\d+)?(?:-ee(?:-next)?)?", latest):
        raise ValueError("invalid latest manual version")
    root = root.resolve()
    # Output must be a real assembled tree, not links into a source checkout.
    if any(path.is_symlink() for path in root.rglob("*")):
        raise ValueError("publication contains a symlink")
    if not (root / "manual" / latest / "index.html").is_file():
        raise ValueError(f"missing latest OSS manual: {latest}")
    before = publication_size(root)
    # Only tag-attribute formatting changes; text, geometry and metadata remain.
    # Normalize before fingerprinting so repeated runs cannot create new groups.
    compact_svgs(root)
    directories = sorted(path for path in (root / "manual").glob("*/reference/javadoc") if path.is_dir())
    if (root / "reference/javadoc").is_dir():
        directories.append(root / "reference/javadoc")
    groups = {}
    for directory in directories:
        index = directory / "index.html"
        if not index.is_file() or REDIRECT_MARKER in index.read_text(encoding="utf-8"):
            continue
        groups.setdefault(fingerprint(directory), []).append(directory)
    preferred = root / "manual" / latest / "reference/javadoc"
    redirects = 0
    for group in groups.values():
        canonical = preferred if preferred in group else group[0]
        for duplicate in group:
            if duplicate == canonical:
                continue
            for path in files(duplicate):
                relative = path.relative_to(duplicate)
                if path.suffix == ".html":
                    target = "/" + (canonical / relative).relative_to(root).as_posix()
                    path.write_text(redirect(target), encoding="utf-8")
                    redirects += 1
                elif path.suffix in (".js", ".css") and not {"doc-files", "legal"}.intersection(relative.parts):
                    # Legacy HTML now opens the canonical tree, which owns its renderer
                    # and search indexes. Keep legal notices, element-list and downloads.
                    path.unlink()
    latest_root = root / "manual/latest"
    if latest_root.is_dir():
        for source in latest_root.rglob("*.html"):
            relative = source.relative_to(latest_root)
            if relative.parts[0] in ("manual", "get-started", "security", "rest", "_analytics"):
                continue
            if relative.parts[:2] == ("reference", "javadoc"):
                continue
            destination = root / relative
            if destination.is_file() and destination.read_bytes() == source.read_bytes():
                target = "/manual/latest/" + relative.as_posix()
                if relative.name == "index.html":
                    target = target[:-len("index.html")]
                destination.write_text(redirect(target), encoding="utf-8")
                redirects += 1
    return {"before": before, "after": publication_size(root), "redirects": redirects}


def check_size(root, maximum):
    size = publication_size(root)
    if size >= maximum:
        raise ValueError(f"publication is {size:,} bytes; must be below {maximum:,} bytes")
    return size


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("publication", type=Path)
    parser.add_argument("--latest")
    parser.add_argument("--check-only", action="store_true")
    parser.add_argument("--max-bytes", type=int, default=PAGES_LIMIT)
    args = parser.parse_args()
    if not args.publication.is_dir():
        parser.error("publication directory does not exist")
    if not args.check_only and not args.latest:
        parser.error("--latest is required when optimizing")
    try:
        if not args.check_only:
            print(json.dumps(optimize(args.publication, args.latest)))
        print(f"PASS: publication size {check_size(args.publication, args.max_bytes):,} bytes")
    except ValueError as error:
        parser.exit(1, f"ERROR: {error}\n")


if __name__ == "__main__":
    main()
