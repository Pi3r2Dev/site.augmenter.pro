// Audit technique SEO de la prod augmenter.pro (lecture seule).
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.argv[2] || "https://augmenter.pro";
const REPO = fileURLToPath(new URL("../..", import.meta.url));
const UA = "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const issues = [];
const add = (sev, page, msg) => issues.push({ sev, page, msg });
const bust = () => `bust=${Math.random().toString(36).slice(2)}`;
const withBust = (u) => u + (u.includes("?") ? "&" : "?") + bust();

async function get(url, opts = {}) {
  const t0 = Date.now();
  try {
    const r = await fetch(url, { redirect: "manual", headers: { "user-agent": UA }, ...opts });
    const body = opts.method === "HEAD" ? "" : await r.text();
    return { status: r.status, headers: r.headers, body, ms: Date.now() - t0 };
  } catch (e) { return { status: 0, headers: new Headers(), body: "", ms: Date.now() - t0, err: e.message }; }
}
async function pool(items, n, fn) {
  const out = []; let i = 0;
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k]); } }));
  return out;
}
const attr = (html, re) => (html.match(re) || [])[1];
const decode = (s) => s?.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const visible = (html) => html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ");

// --- 1. Sitemap
const sm = await get(withBust(`${BASE}/sitemap.xml`));
const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const lastmods = [...sm.body.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((m) => m[1]);
console.log(`sitemap: ${sm.status}, ${locs.length} URL`);
if (sm.status !== 200) add("HAUT", "/sitemap.xml", `statut ${sm.status}`);
for (const l of lastmods) if (!/^\d{4}-\d{2}-\d{2}/.test(l) || l > new Date().toISOString().slice(0, 10)) add("MOYEN", "/sitemap.xml", `lastmod invalide ou futur : ${l}`);
for (const l of locs) if (!l.startsWith("https://augmenter.pro")) add("HAUT", "/sitemap.xml", `URL hors domaine canonique : ${l}`);

// --- 2. Pages du sitemap
const titles = new Map(), descs = new Map();
const internalLinks = new Map(); // url -> Set(pages sources)
const images = new Set();
const pages = await pool(locs, 6, async (loc) => {
  const url = BASE + loc.replace("https://augmenter.pro", "");
  const r = await get(withBust(url));
  const p = loc.replace("https://augmenter.pro", "") || "/";
  const h = r.body;
  const res = { p, status: r.status, ms: r.ms };
  if (r.status !== 200) { add("HAUT", p, `statut ${r.status} ${r.headers.get("location") || ""}`); return res; }
  if (r.ms > 2500) add("BAS", p, `réponse lente ${r.ms} ms`);
  const cc = r.headers.get("cache-control") || "";
  if (/s-maxage=(\d+)/.test(cc) && +cc.match(/s-maxage=(\d+)/)[1] > 300) add("HAUT", p, `s-maxage trop long : ${cc}`);
  const xr = r.headers.get("x-robots-tag"); if (xr && /noindex/i.test(xr)) add("HAUT", p, `X-Robots-Tag ${xr}`);
  const robots = attr(h, /<meta name="robots" content="([^"]*)"/);
  if (robots && /noindex/i.test(robots)) add("HAUT", p, `meta robots ${robots} alors que dans le sitemap`);
  if (!/<html[^>]*lang="fr/.test(h)) add("MOYEN", p, "attribut lang fr absent");
  const canon = attr(h, /<link rel="canonical" href="([^"]*)"/);
  if (!canon) add("HAUT", p, "pas de canonique");
  else if (canon.replace(/\/$/, "") !== loc.replace(/\/$/, "")) add("HAUT", p, `canonique ≠ URL du sitemap : ${canon}`);
  const ogUrl = attr(h, /<meta property="og:url" content="([^"]*)"/);
  if (!ogUrl) add("MOYEN", p, "og:url absent");
  else if (ogUrl.replace(/\/$/, "") !== loc.replace(/\/$/, "")) add("MOYEN", p, `og:url pointe ailleurs : ${ogUrl}`);
  const ogImg = attr(h, /<meta property="og:image" content="([^"]*)"/);
  if (!ogImg) add("MOYEN", p, "og:image absente"); else images.add(JSON.stringify([ogImg, p]));
  const title = decode(attr(h, /<title>([^<]*)<\/title>/));
  if (!title) add("HAUT", p, "title absent");
  else { if (title.length > 70) add("BAS", p, `title long (${title.length}) : ${title}`); (titles.get(title) || titles.set(title, []).get(title)).push(p); }
  const desc = decode(attr(h, /<meta name="description" content="([^"]*)"/));
  if (!desc) add("HAUT", p, "meta description absente");
  else { if (desc.length > 160) add("BAS", p, `description longue (${desc.length})`); if (desc.length < 70) add("BAS", p, `description courte (${desc.length})`); (descs.get(desc) || descs.set(desc, []).get(desc)).push(p); }
  const h1 = (h.match(/<h1[\s>]/g) || []).length;
  if (h1 === 0) add("MOYEN", p, "aucun h1"); else if (h1 > 1) add("BAS", p, `${h1} h1`);
  // JSON-LD
  for (const m of h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let j; try { j = JSON.parse(m[1]); } catch (e) { add("HAUT", p, `JSON-LD invalide : ${e.message.slice(0, 60)}`); continue; }
    const s = JSON.stringify(j);
    if (/"@type":"(AggregateRating|Review)"/.test(s) || /"aggregateRating"|"review"\s*:/.test(s)) add("HAUT", p, "balisage d'avis présent dans le JSON-LD");
    if (/"@type":"(Article|NewsArticle|BlogPosting)"/.test(s) && !/"datePublished"/.test(s)) add("MOYEN", p, "Article sans datePublished");
  }
  // mots interdits (texte visible + meta)
  const txt = visible(h) + " " + (title || "") + " " + (desc || "");
  for (const w of ["gratuit", "gratuite", "gratuits", "offert", "offerte", "offerts", "offertes"]) {
    const n = (txt.match(new RegExp(`\\b${w}\\b`, "gi")) || []).length;
    if (n) add("MOYEN", p, `mot interdit « ${w} » ×${n}`);
  }
  // images sans alt
  const noAlt = [...h.matchAll(/<img\b[^>]*>/g)].filter((m) => !/\balt="/.test(m[0])).length;
  if (noAlt) add("BAS", p, `${noAlt} <img> sans attribut alt`);
  // liens internes
  for (const m of h.matchAll(/<a\b[^>]*href="([^"#]*)(#[^"]*)?"/g)) {
    let href = decode(m[1]); if (!href) continue;
    if (href.startsWith("https://augmenter.pro")) href = href.slice("https://augmenter.pro".length) || "/";
    if (/^https?:\/\/www\.augmenter\.pro/.test(href)) add("MOYEN", p, `lien vers www : ${href}`);
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (/^\/(api|_next|clients)\b/.test(href)) continue;
    (internalLinks.get(href) || internalLinks.set(href, new Set()).get(href)).add(p);
  }
  return res;
});
for (const [t, ps] of titles) if (ps.length > 1) add("MOYEN", ps.join(", "), `title dupliqué : ${t}`);
for (const [d, ps] of descs) if (ps.length > 1) add("MOYEN", ps.join(", "), `description dupliquée : ${d.slice(0, 60)}…`);

// --- 3. Liens internes
const sitemapPaths = new Set(locs.map((l) => l.replace("https://augmenter.pro", "") || "/"));
const linkTargets = [...internalLinks.keys()];
await pool(linkTargets, 6, async (href) => {
  const r = await get(withBust(BASE + href), { method: "HEAD" });
  const from = [...internalLinks.get(href)].slice(0, 3).join(", ");
  if (r.status >= 400 || r.status === 0) add("HAUT", from, `lien interne cassé ${href} → ${r.status}`);
  else if (r.status >= 300) add("BAS", from, `lien interne redirigé ${href} → ${r.status} ${r.headers.get("location")}`);
  else if (!href.includes("?") && !sitemapPaths.has(href.replace(/\/$/, "") || "/") && !/\.(xml|txt|pdf|jpg|png|webp)$/.test(href))
    add("INFO", href, `page liée (200) absente du sitemap (depuis ${from})`);
});

// --- 4. Images og
await pool([...images].map((s) => JSON.parse(s)), 6, async ([img, p]) => {
  const r = await get(img, { method: "HEAD" });
  if (r.status !== 200) add("HAUT", p, `og:image ${r.status} : ${img}`);
});

// --- 5. Pages de l'app jamais au sitemap
function walk(dir, acc = []) {
  for (const f of readdirSync(dir)) {
    const fp = join(dir, f);
    if (statSync(fp).isDirectory()) walk(fp, acc); else if (f === "page.tsx") acc.push(fp);
  }
  return acc;
}
const appDir = join(REPO, "src/app");
for (const f of walk(appDir)) {
  const route = "/" + f.slice(appDir.length + 1).replace(/\\/g, "/").replace(/\/?page\.tsx$/, "").split("/").filter((s) => !/^\(.*\)$/.test(s)).join("/");
  const r = route.replace(/\/$/, "") || "/";
  if (/\[|^\/(clients|notes|api)\b/.test(r) || sitemapPaths.has(r)) continue;
  const src = readFileSync(f, "utf8");
  const intended = /LEGAL_ROBOTS|UNLISTED_ROBOTS|noindex|PORTAL_ROBOTS|redirect\(/.test(src);
  if (!intended) add("INFO", r, "route de l'app hors sitemap sans noindex déclaré dans page.tsx");
}

// --- 6. Redirections et fichiers de crawl
const checks = [
  ["http://augmenter.pro/", (r) => r.status >= 300 && r.status < 400 && /^https:\/\/augmenter\.pro\/?/.test(r.headers.get("location") || "")],
  ["https://www.augmenter.pro/", (r) => [301, 308].includes(r.status) && /^https:\/\/augmenter\.pro/.test(r.headers.get("location") || "")],
  ["https://augmenter.pro/blog/", (r) => r.status >= 300 && r.status < 400],
  ["https://augmenter.pro/accueil-2", (r) => [301, 308].includes(r.status)],
  ["https://augmenter.pro/prestations", (r) => [301, 308].includes(r.status)],
  [`https://augmenter.pro/page-inexistante-${bust()}`, (r) => r.status === 404],
  ["https://augmenter.pro/robots.txt", (r) => r.status === 200 && /Sitemap:\s*https:\/\/augmenter\.pro\/sitemap\.xml/.test(r.body)],
  ["https://augmenter.pro/news-sitemap.xml", (r) => r.status === 200 && /<url>/.test(r.body)],
  ["https://augmenter.pro/llms.txt", (r) => r.status === 200],
  ["https://augmenter.pro/clients/reva9", (r) => /noindex/.test(r.headers.get("x-robots-tag") || "") || r.status >= 300],
];
for (const [u, ok] of checks) {
  const r = await get(u);
  console.log(`${ok(r) ? "OK " : "KO "} ${r.status} ${u} ${r.headers.get("location") || ""}`);
  if (!ok(r)) add("HAUT", u, `contrôle échoué (statut ${r.status}, location ${r.headers.get("location") || "-"})`);
}
// llms.txt : liens internes
const llms = (await get(withBust(`${BASE}/llms.txt`))).body + (await get(withBust(`${BASE}/llms-full.txt`))).body;
const llmsLinks = [...new Set([...llms.matchAll(/https:\/\/augmenter\.pro(\/[^\s)\]>"]*)?/g)].map((m) => m[1] || "/"))];
await pool(llmsLinks, 6, async (p) => {
  const r = await get(withBust(BASE + p), { method: "HEAD" });
  if (r.status !== 200) add("MOYEN", "llms.txt", `lien ${p} → ${r.status}`);
});
// robots.txt : sitemap non bloqué et pages du sitemap non disallow
const robots = (await get(withBust(`${BASE}/robots.txt`))).body;
const starGroup = robots.split(/\r?\n\s*\r?\n/).find((g) => /^User-agent:\s*\*/m.test(g)) || "";
const disallows = [...starGroup.matchAll(/^Disallow:\s*(\S+)/gm)].map((m) => m[1]);
for (const p of sitemapPaths) for (const d of disallows) if (p.startsWith(d)) add("HAUT", p, `bloquée par Disallow ${d} (groupe *)`);

// --- Sortie
const order = { HAUT: 0, MOYEN: 1, BAS: 2, INFO: 3 };
issues.sort((a, b) => order[a.sev] - order[b.sev] || a.msg.localeCompare(b.msg));
const times = pages.filter(Boolean).map((x) => x.ms).sort((a, b) => a - b);
console.log(`\nPages: ${pages.length} · liens internes distincts: ${linkTargets.length} · temps médian ${times[times.length >> 1]} ms, max ${times.at(-1)} ms`);
console.log(`Problèmes: ${["HAUT", "MOYEN", "BAS", "INFO"].map((s) => `${s} ${issues.filter((i) => i.sev === s).length}`).join(" · ")}\n`);
for (const i of issues) console.log(`[${i.sev}] ${i.page} — ${i.msg}`);
