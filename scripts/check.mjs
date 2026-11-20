// Validează sintaxa JS și structura întrebărilor din src/index.html
import { readFileSync } from "node:fs";
import vm from "node:vm";

const html = readFileSync(new URL("../src/index.html", import.meta.url), "utf8");
const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
if (!script) fail("Nu am găsit blocul <script>.");

try { new vm.Script(script); } catch (e) { fail("Eroare de sintaxă JS: " + e.message); }

const block = script.match(/const Q=(\[[\s\S]*?\n\]);/)?.[1];
if (!block) fail("Nu am găsit lista de întrebări (const Q=[...]).");
const Q = vm.runInNewContext(block);

const errors = [];
Q.forEach((q, i) => {
  const id = `#${i + 1}`;
  if (q.length !== 5) return errors.push(`${id}: trebuie 5 câmpuri, are ${q.length}`);
  const [ch, text, opts, ok, exp] = q;
  if (!ch || !text || !exp) errors.push(`${id}: capitol/întrebare/explicație lipsă`);
  if (!Array.isArray(opts) || opts.length < 2) errors.push(`${id}: variante insuficiente`);
  else if (new Set(opts).size !== opts.length) errors.push(`${id}: variante duplicate`);
  if (!Number.isInteger(ok) || ok < 0 || ok >= (opts?.length ?? 0)) errors.push(`${id}: index corect invalid`);
});
if (new Set(Q.map(q => q[1])).size !== Q.length) errors.push("Există întrebări duplicate.");

if (errors.length) fail(errors.join("\n"));
console.log(`OK: ${Q.length} întrebări, ${new Set(Q.map(q => q[0])).size} capitole.`);

function fail(msg) { console.error("EROARE:\n" + msg); process.exit(1); }
