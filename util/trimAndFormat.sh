#!/bin/bash

INPUT="THIRD-PARTY.txt"
OUTPUT="license-book.html"

mkdir -p "$(dirname "$OUTPUT")"

if [[ ! -f "$INPUT" ]]; then
  echo "Input file does not exist: $INPUT"
  exit 1
fi

echo "# Java Dependencies" > "$OUTPUT"

while IFS= read -r line
do
  [[ -z "$line" ]] && continue

  if echo "$line" | grep -qi "^Lists of"; then
    continue
  fi

  if echo "$line" | grep -qi "eximeebpms"; then
    continue
  fi

  coords=$(echo "$line" | grep -oP '\([^)]+:[^)]+:[^)]+')

  if [[ -z "$coords" ]]; then
    continue
  fi

  artifact=$(echo "$coords" | cut -d: -f2)
  version=$(echo "$coords" | cut -d: -f3)

  clean_line=$(echo "$line" \
    | sed -E 's@https?://[^ )]+@@g' \
    | sed -E 's@\([^)]+:[^)]+:[^)]+[^)]*\)@@g' \
    | sed -E 's/[[:space:]]+/ /g' \
    | sed -E 's/^[[:space:]]+|[[:space:]]+$//g')

  echo "<div><details><summary>${artifact}@${version}</summary><pre>${clean_line}</pre></details></div>" >> "$OUTPUT"

done < "$INPUT"

echo "HTML license book generated: $OUTPUT"
