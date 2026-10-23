// Carte du maillage interne : pour chaque page du sitemap, les liens <a href="/..."> du contenu
// (hors header, footer et nav fixe), avec l'ancre. Sortie TSV + entrants par page et par cluster.
// Usage : node scripts/seo/link-graph.mjs [base=https://augmenter.pro] > docs/seo-audits/<date>-data/maillage-interne.tsv
import { readFileSync } from "node:fs";

const BASE = process.argv[2] || "https://augmenter.pro";
const sitemap = readFileSync(new URL("../../public/sitemap.xml", import.meta.url), "utf8");
const paths = [...sitemap.matchAll(/<loc>https:\/\/augmenter\.pro([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
const inSitemap = new Set(paths);

const CL = [
  [/odoo|mcp|claude|agent-ia|petit-modele|catalogue|logiciel-construit|cout-agent|ma-pme-en-2027|prompt|ia-souveraine|integration/, "A"],
  [/audit-informatique|cout-audit|nis2|cybersecurite|5-signes/, "B"],
  [/strategie-ia|audit-ia-pme|atelier|dirigeant|bilan-ia|contradicteur|patron-goulot|compte-rendu|veille|emails|vente|commerciale|llm-vente|machine-de-guerre|btp/, "C"],
  [/^\/$|approche|contact|a-propos|auteur|augmenter-mon-entreprise|plan-du-site|blog$|idees|projets/, "D"],
];
const cluster = (p) => (CL.find(([re]) => re.test(p)) || [, "?"])[1];
const decode = (s) => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

// Retire header / footer / nav fixe pour ne garder que les liens éditoriaux.
function contentOnly(html) {
  return html
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "");
}

const edges = [];
for (const p of paths) {
  const r = await fetch(`${BASE}${p === "/" ? "" : p}?bust=${Math.random().toString(36).slice(2)}`, { headers: { "user-agent": "Mozilla/5.0 (compatible; augmenter-link-graph)" } });
  if (r.status !== 200) { console.error(`${p} → ${r.status}`); continue; }
  const html = contentOnly(await r.text());
  const seen = new Set();
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href = (m[1].match(/href="([^"#?]*)/) || [])[1];
    if (!href) continue;
    let to = href.startsWith("https://augmenter.pro") ? href.slice(21) || "/" : href;
    if (!to.startsWith("/") || to.startsWith("//")) continue;
    to = to.replace(/\/$/, "") || "/";
    if (to === p || !inSitemap.has(to)) continue;
    const key = `${to}|${decode(m[2])}`;
    if (seen.has(key)) continue;
    seen.add(key);
    edges.push({ from: p, to, anchor: decode(m[2]).slice(0, 80) });
  }
}

console.log("from\tcluster_from\tto\tcluster_to\tanchor");
for (const e of edges) console.log(`${e.from}\t${cluster(e.from)}\t${e.to}\t${cluster(e.to)}\t${e.anchor}`);

// Résumé sur stderr : entrants par page et flux entre clusters.
const inDeg = new Map(paths.map((p) => [p, { n: 0, from: new Set(), byCl: { A: 0, B: 0, C: 0, D: 0 } }]));
for (const e of edges) { const d = inDeg.get(e.to); d.n++; d.from.add(e.from); d.byCl[cluster(e.from)]++; }
console.error("\n== Liens entrants éditoriaux (hors header/footer/nav), pages du sitemap");
console.error("entrants\tpages_sources\tdepuis A/B/C/D\tcluster\tpage");
for (const [p, d] of [...inDeg].sort((a, b) => b[1].from.size - a[1].from.size)) console.error(`${d.n}\t${d.from.size}\t${d.byCl.A}/${d.byCl.B}/${d.byCl.C}/${d.byCl.D}\t${cluster(p)}\t${p}`);
const flow = {};
for (const e of edges) { const k = `${cluster(e.from)}→${cluster(e.to)}`; flow[k] = (flow[k] || 0) + 1; }
console.error("\n== Flux entre clusters (nombre de liens)");
for (const [k, v] of Object.entries(flow).sort((a, b) => b[1] - a[1])) console.error(`${k}\t${v}`);
console.error(`\n${edges.length} liens éditoriaux · ${[...inDeg].filter(([, d]) => d.from.size === 0).length} pages sans entrant éditorial : ${[...inDeg].filter(([, d]) => d.from.size === 0).map(([p]) => p).join(", ")}`);
