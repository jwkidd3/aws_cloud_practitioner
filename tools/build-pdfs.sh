#!/bin/bash
# Regenerates the deck and lab-manual PDFs next to their sources. Run after editing any lab or the deck (from any directory).
#   tools/build-pdfs.sh              everything (deck takes ~1 min)
#   tools/build-pdfs.sh --no-deck    skip the deck
# Requires: Google Chrome, node 22+, pandoc, pdfunite (poppler), python3.
set -euo pipefail
cd "$(dirname "$0")/.."   # course root
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"; kill $SRV 2>/dev/null || true' EXIT
SKIP_DECK=false; [[ "${1:-}" == "--no-deck" ]] && SKIP_DECK=true

# --- 1. Serve the course root so the deck's CDN assets and hash routing work ---
PORT=8791
python3 -m http.server $PORT --bind 127.0.0.1 --directory "$PWD" >/dev/null 2>&1 & SRV=$!
sleep 1

# --- 2. Deck: Reveal.js print-pdf mode, one page per slide ---
if ! $SKIP_DECK; then
  node tools/print.mjs deck "http://127.0.0.1:$PORT/presentations/aws_cloud_practitioner.html?print-pdf" \
    "$PWD/presentations/aws_cloud_practitioner.pdf"
fi

# --- 3. Print CSS for the Markdown-based lab manual ---
cat > "$TMP/print.css" <<'CSS'
body { font-family: -apple-system, "Helvetica Neue", Arial, sans-serif; font-size: 10.5pt; line-height: 1.4; color: #222; max-width: none; margin: 0; }
h1 { color: #232f3e; border-bottom: 3px solid #ff9900; padding-bottom: 4px; font-size: 20pt; }
h2 { color: #232f3e; font-size: 14pt; margin-top: 1.2em; border-bottom: 1px solid #ddd; }
h3 { color: #146eb4; font-size: 11.5pt; }
code { background: #f1f3f5; padding: 1px 4px; border-radius: 3px; font-size: 9.5pt; }
pre { background: #272822; color: #f8f8f2; padding: 10px 12px; border-radius: 6px; font-size: 9pt; line-height: 1.3; white-space: pre-wrap; word-break: break-word; }
pre code { background: none; color: inherit; padding: 0; font-size: inherit; }
table { border-collapse: collapse; width: 100%; font-size: 9.5pt; margin: 8px 0; page-break-inside: avoid; }
th, td { border: 1px solid #ccc; padding: 4px 7px; text-align: left; vertical-align: top; }
th { background: #232f3e; color: #fff; }
tr:nth-child(even) td { background: #f7f8fa; }
blockquote { border-left: 4px solid #ff9900; background: #fff8e8; margin: 8px 0; padding: 6px 12px; color: #333; }
hr { border: 0; border-top: 1px solid #ddd; margin: 14px 0; }
h2, h3 { page-break-after: avoid; }
.page-break { page-break-before: always; }
CSS

md2html() {  # $1 = source .md, $2 = output .html
  pandoc "$1" -f gfm -t html5 --no-highlight --standalone --css "$TMP/print.css" --metadata title="$(head -1 "$1" | sed 's/^# //')" -o "$2"
  python3 - "$2" <<'PY'
import re,sys
p=sys.argv[1]; t=open(p).read()
t=re.sub(r'<header id="title-block-header">.*?</header>','',t,flags=re.S)   # keep only the body's H1
open(p,'w').write(t)
PY
}
JOBS=()

# --- 4. Student lab manual: cover + all eight labs in one PDF ---
python3 - "$TMP" <<'PY'
import sys,subprocess,glob
T=sys.argv[1]; css=open(f'{T}/print.css').read()
parts=[f'<div class="page-break">{subprocess.run(["pandoc",f,"-f","gfm","-t","html5","--no-highlight"],capture_output=True,text=True).stdout}</div>'
       for f in sorted(glob.glob('lab-exercises/lab0*/README.md'))]
cover='''<div style="text-align:center;padding-top:35vh"><h1 style="border:0;font-size:30pt">AWS Cloud Practitioner</h1>
<p style="font-size:16pt;color:#ff9900;font-weight:600">Student Lab Manual</p><p>Labs 1 – 8 · Region us-east-2 · prefix every resource with your username</p></div>'''
open(f'{T}/manual.html','w').write(f'<!DOCTYPE html><html><head><meta charset="utf-8"><title>Lab Manual</title><style>{css}</style></head><body>{cover}{"".join(parts)}</body></html>')
PY
JOBS+=("$TMP/manual.html=$PWD/lab-exercises/lab_manual.pdf")

node tools/print.mjs pages "${JOBS[@]}"
