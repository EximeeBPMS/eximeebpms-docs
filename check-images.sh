#!/usr/bin/env bash
# check-images.sh - image reference integrity for one docs content tree.
#
# Run against a directory holding a version branch's content (manual/,
# get-started/, security/) - i.e. one of hugo.yml's per-version worktrees,
# or a docs/X.Y.Z checkout. Content lives only on the orphan docs/X.Y.Z
# branches, so running this on a bare master checkout finds nothing.
#
#   ./check-images.sh [DIR] [--explain-orphans] [--strict]
#
# Reports three things:
#   1. Dangling references - a shortcode pointing at a file that isn't there.
#      Always an error: the page renders a broken image.
#   2. Orphaned images - a file under an img/ directory that no page
#      references. Reported, not an error by default (--strict makes it one):
#      an orphan is only deletable once the feature it depicts is confirmed
#      absent from the product, which this script cannot determine. See
#      eximeebpms-factory's BACKLOG-0086 for why that matters - a batch of
#      these turned out to be the only surviving pointer to missing pages.
#   3. Orphan classification - which orphans are an editable source sitting
#      beside their published export (keep) versus a superseded
#      duplicate-format leftover (deletable).
#
# usage: check-images.sh [DIR] [--explain-orphans] [--strict]

set -euo pipefail

root=.
explain=0
strict=0
while (($#)); do
  case "$1" in
    --explain-orphans) explain=1; shift ;;
    --strict) strict=1; shift ;;
    -h|--help) sed -n '2,26p' "$0"; exit 0 ;;
    -*) printf 'unknown option: %s\n' "$1" >&2; exit 2 ;;
    *) root="$1"; shift ;;
  esac
done

[[ -d "$root" ]] || { printf 'not a directory: %s\n' "$root" >&2; exit 2; }
root="$(cd "$root" && pwd)"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

fail=0
report() { printf 'FAIL: %s\n' "$1"; fail=1; }

# Sections Hugo actually publishes. manual/develop/ (committed editable
# sources - .odg/.pptx/.svg - plus ReadMe-images/) and manual/javadoc/
# (generated, self-contained, referenced from its own search.html) are
# deliberately excluded: every file in them is unreferenced by design, so
# including them would produce a permanently non-empty orphan list.
content_dirs=()
for d in manual/content get-started/content security/content; do
  [[ -d "$root/$d" ]] && content_dirs+=("$root/$d")
done
if ((${#content_dirs[@]} == 0)); then
  printf 'no content directories found under %s - nothing to check\n' "$root"
  printf '(content lives on the docs/X.Y.Z branches, not on master)\n'
  exit 0
fi

# ---------------------------------------------------------------- inventory
# Everything below works in $root-relative paths, so output is readable and
# path arithmetic never has to cope with an absolute prefix.
find "${content_dirs[@]}" -type f \
  \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.gif' \
     -o -iname '*.svg' -o -iname '*.webp' -o -iname '*.bmp' -o -iname '*.ico' \) \
  -print 2>/dev/null | sed "s#^$root/##" | sort -u > "$tmp/images" || true

# --------------------------------------------------------------- references
# Only {{< img src="..." >}} is a real reference. Raw <img> tags in Markdown
# are code samples (Angular ng-src, camForm expressions) and are ignored on
# purpose. Anything matching "img src=" in a shape this parser does not
# understand is reported rather than skipped, so the parser cannot quietly
# stop covering the content.
find "${content_dirs[@]}" -type f -name '*.md' -print0 > "$tmp/pages.z"

xargs -0 -a "$tmp/pages.z" awk -v rootpfx="$root/" '
  function dirname(p) { sub(/\/[^\/]*$/, "", p); return p }
  function basename(p) { sub(/^.*\//, "", p); return p }

  # $root-relative path of the file awk is currently reading.
  function relfile(  f) { f = FILENAME; sub("^" rootpfx, "", f); return f }

  # Hugo resolves a relative src against the page URL, not the file path.
  # A non-index page gets its own URL segment, so foo.md at a/b/foo.md has
  # URL dir a/b/foo/ - one level deeper than the file sits.
  function urldir(f,   b, d) {
    b = basename(f); d = dirname(f)
    if (b == "_index.md" || b == "index.md") return d
    sub(/\.md$/, "", b)
    return d "/" b
  }

  # Collapse . and .. lexically. Hugo has no symlinks here, so this is exact.
  function normalize(p,   parts, n, i, out, m) {
    n = split(p, parts, "/"); m = 0
    for (i = 1; i <= n; i++) {
      if (parts[i] == "" || parts[i] == ".") continue
      if (parts[i] == "..") { if (m > 0) m--; continue }
      out[++m] = parts[i]
    }
    p = ""
    for (i = 1; i <= m; i++) p = p (i > 1 ? "/" : "") out[i]
    return p
  }

  {
    line = $0
    # Every img shortcode occurrence on this line.
    s = line
    while (match(s, /\{\{<[ \t]*img[ \t]+src="[^"]*"/)) {
      occ = substr(s, RSTART, RLENGTH)
      s = substr(s, RSTART + RLENGTH)
      src = occ; sub(/^.*src="/, "", src); sub(/"$/, "", src)
      if (src ~ /^[a-z][a-z0-9+.-]*:/) {           # remote scheme
        printf "SKIP\t%s\t%d\t%s\n", relfile(), FNR, src
        continue
      }
      if (src ~ /^\//) {                            # site-root absolute
        printf "ROOTREL\t%s\t%d\t%s\n", relfile(), FNR, src
        continue
      }
      printf "REF\t%s\t%d\t%s\n", normalize(urldir(relfile()) "/" src), FNR, relfile()
    }
    # A src= in a shape the loop above did not consume.
    if (line ~ /\{\{<[ \t]*img/ && line !~ /\{\{<[ \t]*img[ \t]+src="[^"]*"/)
      printf "UNPARSED\t%s\t%d\t%s\n", relfile(), FNR, line
    # Theme symbol shortcodes render /img/short-codes/<kind>-<type>.png.
    t = line
    while (match(t, /\{\{<[ \t]*(bpmn|cmmn)-symbol[ \t]+type="[^"]*"/)) {
      occ = substr(t, RSTART, RLENGTH)
      t = substr(t, RSTART + RLENGTH)
      kind = occ; sub(/^.*\{\{<[ \t]*/, "", kind); sub(/-symbol.*$/, "", kind)
      ty = occ; sub(/^.*type="/, "", ty); sub(/"$/, "", ty)
      printf "SYMBOL\t%s-%s.png\t%d\t%s\n", kind, ty, FNR, relfile()
    }
  }
' > "$tmp/raw" || true

mv "$tmp/raw" "$tmp/refs.all"

grep -P '^REF\t' "$tmp/refs.all" | cut -f2 | sort -u > "$tmp/refs" || true
grep -P '^SYMBOL\t' "$tmp/refs.all" | cut -f2 | sort -u > "$tmp/symbols" || true

# ------------------------------------------------- parser self-surveillance
if grep -qP '^UNPARSED\t' "$tmp/refs.all"; then
  report 'img shortcode in an unrecognized shape - this parser needs updating'
  grep -P '^UNPARSED\t' "$tmp/refs.all" | cut -f2,3 | sed 's/^/  /'
fi
for kind in ROOTREL SKIP; do
  if grep -qP "^$kind\t" "$tmp/refs.all"; then
    printf 'NOTE: %d img src(s) of kind %s, not resolved against the tree:\n' \
      "$(grep -cP "^$kind\t" "$tmp/refs.all")" "$kind"
    grep -P "^$kind\t" "$tmp/refs.all" | cut -f2,3,4 | sed 's/^/  /'
  fi
done

# ------------------------------------------------------ dangling references
: > "$tmp/dangling"
while IFS= read -r p; do
  [[ -f "$root/$p" ]] || printf '%s\n' "$p" >> "$tmp/dangling"
done < "$tmp/refs"
if [[ -s "$tmp/dangling" ]]; then
  report "$(wc -l < "$tmp/dangling") image reference(s) point at a missing file"
  while IFS= read -r p; do
    printf '  %s\n    referenced from: ' "$p"
    grep -P "^REF\t\Q$p\E\t" "$tmp/refs.all" 2>/dev/null | cut -f4 | sort -u | tr '\n' ' ' \
      || grep -F "	$p	" "$tmp/refs.all" | cut -f4 | sort -u | tr '\n' ' '
    printf '\n'
  done < "$tmp/dangling"
fi

# Theme symbols are shared across every branch on master, so a symbol this
# branch does not use may well be used by another - never orphan-check them.
# A missing one, though, is a broken image on this branch.
symroot="$root/themes/eximee/static/img/short-codes"
if [[ -d "$symroot" ]]; then
  : > "$tmp/dangling-sym"
  while IFS= read -r s; do
    [[ -f "$symroot/$s" ]] || printf '%s\n' "$s" >> "$tmp/dangling-sym"
  done < "$tmp/symbols"
  if [[ -s "$tmp/dangling-sym" ]]; then
    report "$(wc -l < "$tmp/dangling-sym") bpmn/cmmn-symbol reference(s) have no theme asset"
    sed 's#^#  img/short-codes/#' "$tmp/dangling-sym"
  fi
elif [[ -s "$tmp/symbols" ]]; then
  printf 'NOTE: %d bpmn/cmmn-symbol reference(s) not verified - no theme in this tree\n' \
    "$(wc -l < "$tmp/symbols")"
  printf '  (hugo.yml copies themes/ into each version worktree before building)\n'
fi

# ----------------------------------------------------------------- orphans
comm -23 "$tmp/images" "$tmp/refs" > "$tmp/orphans"
orphan_n=$(wc -l < "$tmp/orphans")

# An unreferenced .svg whose same-stem raster IS referenced is the editable
# source beside its export, not a leftover. Deleting those would destroy the
# only source. The reverse - an unreferenced raster superseded by a
# referenced sibling in another format - is a genuine leftover.
# A sibling only supersedes an orphan if it actually exists on disk. A
# referenced-but-missing sibling means the opposite: the orphan is the only
# surviving file, and the reference is what's wrong. Classifying that as
# "deletable" would turn a broken image into an unrecoverable one - it is
# the exact shape of plugins.md's plugin-point-process-instance-details
# reference, which asks for a .jpg that was never added.
: > "$tmp/orphan-source"
: > "$tmp/orphan-superseded"
: > "$tmp/orphan-plain"
: > "$tmp/orphan-rescues"
while IFS= read -r p; do
  stem="${p%.*}"; ext="${p##*.}"
  sibling=$(grep -E "^$(printf '%s' "$stem" | sed 's/[][\.*^$/]/\\&/g')\.[A-Za-z0-9]+$" "$tmp/refs" | head -1 || true)
  if [[ -n "$sibling" && ! -f "$root/$sibling" ]]; then
    printf '%s\t%s\n' "$p" "$sibling" >> "$tmp/orphan-rescues"
  elif [[ -n "$sibling" ]]; then
    if [[ "${ext,,}" == "svg" ]]; then printf '%s\t%s\n' "$p" "$sibling" >> "$tmp/orphan-source"
    else printf '%s\t%s\n' "$p" "$sibling" >> "$tmp/orphan-superseded"; fi
  else
    printf '%s\n' "$p" >> "$tmp/orphan-plain"
  fi
done < "$tmp/orphans"

# ------------------------------------------------------------------ summary
printf '\n'
printf 'images (published sections, excluding develop/ and javadoc/): %s\n' "$(wc -l < "$tmp/images")"
printf 'distinct image references resolved:                           %s\n' "$(wc -l < "$tmp/refs")"
printf 'bpmn/cmmn-symbol references:                                  %s\n' "$(wc -l < "$tmp/symbols")"
printf 'orphaned images:                                              %s\n' "$orphan_n"
printf '  editable source beside a referenced export (KEEP):          %s\n' "$(wc -l < "$tmp/orphan-source")"
printf '  superseded duplicate format (deletable):                    %s\n' "$(wc -l < "$tmp/orphan-superseded")"
printf '  sole surviving file, sibling reference is dangling (KEEP):   %s\n' "$(wc -l < "$tmp/orphan-rescues")"
printf '  unreferenced, no sibling (needs a product-side check):      %s\n' "$(wc -l < "$tmp/orphan-plain")"

if ((orphan_n)); then
  if [[ -s "$tmp/orphan-source" ]]; then
    printf '\n-- orphans: editable source beside a referenced export (KEEP) --\n'
    awk -F'\t' '{printf "  %s\n    export in use: %s\n", $1, $2}' "$tmp/orphan-source"
  fi
  if [[ -s "$tmp/orphan-rescues" ]]; then
    printf '\n-- orphans: sole surviving file, sibling reference dangling (KEEP) --\n'
    awk -F'\t' '{printf "  %s\n    the dangling reference asks for: %s\n    fix the reference, do not delete this file\n", $1, $2}' "$tmp/orphan-rescues"
  fi
  if [[ -s "$tmp/orphan-superseded" ]]; then
    printf '\n-- orphans: superseded duplicate format (deletable) --\n'
    awk -F'\t' '{printf "  %s\n    superseded by: %s\n", $1, $2}' "$tmp/orphan-superseded"
  fi
  if [[ -s "$tmp/orphan-plain" ]]; then
    printf '\n-- orphans: unreferenced, no sibling --\n'
    sed 's/^/  /' "$tmp/orphan-plain"
  fi
  printf '\nAn orphan here is not automatically deletable. Confirm the feature it\n'
  printf 'depicts is absent from the product first (eximeebpms-enterprise), not\n'
  printf 'just absent from the docs - see BACKLOG-0086.\n'
  ((strict)) && report "$orphan_n orphaned image(s) (--strict)"
fi

# -------------------------------------------------------- orphan archaeology
# Opt-in and slow: walks the full pre-fork history on master (5,000+ commits)
# once per orphan - roughly 0.8s each, so ~3.5 minutes for a full branch.
# A triage aid, never part of a CI run.
if ((explain)) && ((orphan_n)); then
  printf '\n-- archaeology (slow; needs this repo'"'"'s master history) --\n'
  if ! git -C "$root" rev-parse --verify --quiet master >/dev/null 2>&1 &&
     ! git -C "$root" rev-parse --verify --quiet origin/master >/dev/null 2>&1; then
    printf 'NOTE: no master ref reachable from %s - skipping archaeology\n' "$root"
  else
    ref=master; git -C "$root" rev-parse --verify --quiet master >/dev/null 2>&1 || ref=origin/master
    while IFS= read -r p; do
      bn="${p##*/}"
      last=$(git -C "$root" log "$ref" --format='%h %ad %s' --date=short \
               -S"$bn" -- '*.md' 2>/dev/null | head -1)
      printf '  %s\n    last referenced by: %s\n' "$p" "${last:-never referenced in $ref history}"
    done < "$tmp/orphans"
  fi
fi

printf '\n'
if ((fail)); then
  printf 'image checks FAILED\n'
  exit 1
fi
printf 'PASS: image checks\n'
