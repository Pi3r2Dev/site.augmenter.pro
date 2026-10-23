// Audit GSC : sitemaps, inspection (index, résultats enrichis, mobile), requêtes/pages.
import { readFileSync } from "node:fs";
import { createSign } from "node:crypto";

const cred = JSON.parse(readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS ?? (() => { throw new Error("GOOGLE_APPLICATION_CREDENTIALS manquante (clé JSON du compte de service GSC, lecture seule)"); })(), "utf8"));
const b64 = (o) => Buffer.from(typeof o === "string" ? o : JSON.stringify(o)).toString("base64url");
const now = Math.floor(Date.now() / 1000);
const unsigned = b64({ alg: "RS256", typ: "JWT" }) + "." + b64({
  iss: cred.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly",
  aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600,
});
const sig = createSign("RSA-SHA256").update(unsigned).sign(cred.private_key, "base64url");
const tok = await (await fetch("https://oauth2.googleapis.com/token", {
  method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${sig}` }),
})).json();
const H = { authorization: `Bearer ${tok.access_token}`, "content-type": "application/json" };
const SITE = "sc-domain:augmenter.pro";
const enc = encodeURIComponent(SITE);
const d = (x) => x.toISOString().slice(0, 10);

// Sitemaps soumis
const sms = await (await fetch(`https://www.googleapis.com/webmasters/v3/sites/${enc}/sitemaps`, { headers: H })).json();
console.log("== Sitemaps soumis");
for (const s of sms.sitemap || []) console.log(`${s.path} · soumis ${s.lastSubmitted?.slice(0, 10)} · lu ${s.lastDownloaded?.slice(0, 10)} · erreurs ${s.errors} · avertissements ${s.warnings} · ${JSON.stringify(s.contents?.map((c) => `${c.type}:${c.submitted}`))}${s.isPending ? " · EN ATTENTE" : ""}`);

// Pages avec impressions mais hors sitemap (URL parasites : www, params, anciennes)
const sitemap = readFileSync(new URL("../../public/sitemap.xml", import.meta.url), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const inSitemap = new Set(urls.map((u) => u.replace(/\/$/, "")));
const pg = await (await fetch(`https://www.googleapis.com/webmasters/v3/sites/${enc}/searchAnalytics/query`, {
  method: "POST", headers: H, body: JSON.stringify({ startDate: d(new Date(Date.now() - 90 * 864e5)), endDate: d(new Date()), dimensions: ["page"], rowLimit: 1000 }),
})).json();
console.log("\n== Pages avec impressions (90 j) hors sitemap");
for (const r of pg.rows || []) if (!inSitemap.has(r.keys[0].replace(/\/$/, "").replace(/#.*/, ""))) console.log(`${r.impressions} impr · ${r.clicks} clics · ${r.keys[0]}`);
console.log("\n== Top pages (90 j)");
for (const r of (pg.rows || []).slice(0, 15)) console.log(`${r.impressions}\t${r.clicks}\t${r.position.toFixed(1)}\t${r.keys[0].replace("https://augmenter.pro", "")}`);

// Inspection
const out = [];
for (const url of urls) {
  const r = await (await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST", headers: H, body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE, languageCode: "en-US" }),
  })).json();
  const ir = r.inspectionResult || {};
  const ix = ir.indexStatusResult || {};
  const rich = ir.richResultsResult || {};
  const items = (rich.detectedItems || []).map((i) => i.richResultType);
  const richIssues = (rich.detectedItems || []).flatMap((i) => (i.items || []).flatMap((it) => (it.issues || []).map((x) => `${i.richResultType}: ${x.issueMessage} (${x.severity})`)));
  out.push({
    path: url.replace("https://augmenter.pro", "") || "/",
    crawl: ix.lastCrawlTime ? ix.lastCrawlTime.slice(0, 10) : "never",
    verdict: ix.verdict, state: ix.coverageState || r.error?.message,
    gCanon: ix.googleCanonical, uCanon: ix.userCanonical, fetch: ix.pageFetchState, robots: ix.robotsTxtState, indexing: ix.indexingState,
    agent: ix.crawledAs, rich: items, richVerdict: rich.verdict, richIssues,
    mobile: ir.mobileUsabilityResult?.verdict,
  });
}
console.log("\n== Inspection");
for (const o of out.sort((a, b) => a.crawl.localeCompare(b.crawl))) {
  const flags = [];
  if (o.rich.some((t) => /review/i.test(t))) flags.push("AVIS");
  if (o.gCanon && o.gCanon.replace(/\/$/, "") !== ("https://augmenter.pro" + (o.path === "/" ? "" : o.path))) flags.push(`CANON_GOOGLE=${o.gCanon}`);
  if (!o.uCanon && o.crawl !== "never") flags.push("SANS_CANON_DÉCLARÉ");
  if (o.fetch && o.fetch !== "SUCCESSFUL") flags.push(`FETCH=${o.fetch}`);
  if (o.indexing && o.indexing !== "INDEXING_ALLOWED") flags.push(`INDEXING=${o.indexing}`);
  if (o.richVerdict === "FAIL" || o.richIssues.length) flags.push(`RICH: ${o.richIssues.join(" | ")}`);
  console.log(`${o.crawl}\t${o.state}\t${o.path}\t[${o.rich.join(",")}]\t${flags.join(" ")}`);
}
const c = (f) => out.filter(f).length;
console.log(`\nTotal ${out.length} · indexées ${c((o) => /indexed/i.test(o.state) && !/not indexed/i.test(o.state))} · avis encore vus ${c((o) => o.rich.some((t) => /review/i.test(t)))} · sans canonique déclaré ${c((o) => !o.uCanon && o.crawl !== "never")} · canonique Google différent ${c((o) => o.gCanon && o.gCanon.replace(/\/$/, "") !== ("https://augmenter.pro" + (o.path === "/" ? "" : o.path)))} · problèmes résultats enrichis ${c((o) => o.richIssues.length)}`);
