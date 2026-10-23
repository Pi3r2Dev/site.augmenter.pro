// Reprise du crawl : courbe quotidienne + inspection des URL du sitemap.
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
const d = (x) => x.toISOString().slice(0, 10);

// 1. Courbe quotidienne sur 60 jours
const perf = await (await fetch(
  `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
  { method: "POST", headers: H, body: JSON.stringify({
    startDate: d(new Date(Date.now() - 60 * 864e5)), endDate: d(new Date()), dimensions: ["date"], dataState: "all",
  }) })).json();
console.log("date\timpr\tclics\tpos");
for (const r of perf.rows || []) console.log(`${r.keys[0]}\t${r.impressions}\t${r.clicks}\t${r.position.toFixed(1)}`);

// 2. Inspection des URL du sitemap
const sitemap = readFileSync(new URL("../../public/sitemap.xml", import.meta.url), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const out = [];
for (const url of urls) {
  const r = await (await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST", headers: H, body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE, languageCode: "fr-FR" }),
  })).json();
  const ix = r.inspectionResult?.indexStatusResult || {};
  const rich = (r.inspectionResult?.richResultsResult?.detectedItems || []).map((i) => i.richResultType);
  out.push({
    path: url.replace("https://augmenter.pro", "") || "/",
    crawl: ix.lastCrawlTime ? ix.lastCrawlTime.slice(0, 10) : "jamais",
    state: ix.coverageState || r.error?.message || "?",
    avis: rich.some((t) => /review/i.test(t)) ? "AVIS" : "",
  });
}
out.sort((a, b) => b.crawl.localeCompare(a.crawl));
console.log("\ncrawl\tavis\tétat\tpath");
for (const o of out) console.log(`${o.crawl}\t${o.avis}\t${o.state}\t${o.path}`);
const since = (day) => out.filter((o) => o.crawl !== "jamais" && o.crawl >= day).length;
console.log(`\nTotal ${out.length} · crawlées depuis 2026-10-17 : ${since("2026-10-17")} · depuis 2026-10-14 : ${since("2026-10-14")} · avis encore vus : ${out.filter((o) => o.avis).length} · jamais crawlées : ${out.filter((o) => o.crawl === "jamais").length}`);
