// PDF printing over the Chrome DevTools protocol (Node 22+, no dependencies).
//
//   node tools/print.mjs deck  <deck-url?print-pdf> <out.pdf>     Reveal.js deck, one page per slide
//   node tools/print.mjs pages <url-or-file>=<out.pdf> ...         ordinary HTML pages on US Letter
//
// Why not `chrome --print-to-pdf`? It prints before Reveal finishes its print layout, and it
// stalls on multi-page jobs on this machine. Over CDP we wait for the page to be ready and
// print with a timeout. The deck is printed one slide per job (single pages print in <1 s;
// jobs with several slide-sized pages crawl and hang) and merged with pdfunite.
import { spawn, execFileSync } from 'node:child_process';
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const [mode, ...args] = process.argv.slice(2);
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const port = 9222 + Math.floor(Math.random() * 500);
const work = mkdtempSync(join(tmpdir(), 'print-'));
const chrome = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run', '--hide-scrollbars',
  `--user-data-dir=${join(work, 'profile')}`, '--window-size=1600,1200', `--remote-debugging-port=${port}`, 'about:blank'], { stdio: 'ignore' });
const cleanup = () => { try { chrome.kill(); } catch {} try { rmSync(work, { recursive: true, force: true }); } catch {} };
process.on('exit', cleanup);
const fail = msg => { console.error(msg); cleanup(); process.exit(1); };
const sleep = ms => new Promise(r => setTimeout(r, ms));

let targets;
for (let i = 0; i < 50; i++) {
  try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.some(t => t.type === 'page')) break; } catch {}
  await sleep(200);
}
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => ws.onopen = r);
let id = 0; const pending = new Map();
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async expr => (await send('Runtime.evaluate', { expression: expr, returnByValue: true })).result?.result?.value;
const printToPDF = async params => {
  const r = await Promise.race([send('Page.printToPDF', { printBackground: true, ...params }),
                                sleep(30000).then(() => ({ error: { message: 'timeout' } }))]);
  return r.result ? Buffer.from(r.result.data, 'base64') : null;
};
const waitFor = async (expr, tries = 100) => { for (let i = 0; i < tries; i++) { if (await evaluate(expr)) return true; await sleep(200); } return false; };
await send('Page.enable'); await send('Runtime.enable');

if (mode === 'deck') {
  const [url, out] = args;
  await send('Page.navigate', { url });
  if (!await waitFor(`(() => { const p = document.querySelectorAll('.pdf-page').length;
        return typeof Reveal !== 'undefined' && Reveal.isReady() && p > 0 && p === Reveal.getTotalSlides(); })()`)) fail('deck never reached print layout');
  await evaluate('window.fitSlides && window.fitSlides(); true');   // final auto-fit pass with everything loaded
  await sleep(500);
  const total = await evaluate("document.querySelectorAll('.pdf-page').length");
  const [w, h] = await evaluate("(() => { const p = document.querySelector('.pdf-page'); return [p.offsetWidth / 96, p.offsetHeight / 96]; })()");
  const parts = [];
  for (let i = 0; i < total; i++) {
    await evaluate(`document.querySelectorAll('.pdf-page').forEach((p, j) => p.style.display = j === ${i} ? '' : 'none'); true`);
    await sleep(100);
    const buf = await printToPDF({ paperWidth: w, paperHeight: h, marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0, pageRanges: '1' });
    if (!buf) fail(`printToPDF failed on slide ${i + 1}`);
    const f = join(work, `slide${String(i).padStart(3, '0')}.pdf`); writeFileSync(f, buf); parts.push(f);
  }
  execFileSync('pdfunite', [...parts, out]);
  console.log(`wrote ${out} (${total} slides)`);
} else if (mode === 'pages') {
  for (const spec of args) {
    const eq = spec.lastIndexOf('='); const src = spec.slice(0, eq), out = spec.slice(eq + 1);
    const url = /^https?:/.test(src) ? src : 'file://' + resolve(src);
    await send('Page.navigate', { url });
    await waitFor("document.readyState === 'complete'");
    await evaluate("document.fonts ? document.fonts.ready.then(() => true) : true");
    await sleep(300);
    const buf = await printToPDF({ paperWidth: 8.5, paperHeight: 11, marginTop: 0.7, marginBottom: 0.7, marginLeft: 0.75, marginRight: 0.75, preferCSSPageSize: false });
    if (!buf) fail(`printToPDF failed for ${src}`);
    writeFileSync(out, buf);
    console.log(`wrote ${out}`);
  }
} else fail('usage: print.mjs deck <url> <out.pdf> | pages <src>=<out.pdf> ...');
ws.close(); cleanup(); process.exit(0);
