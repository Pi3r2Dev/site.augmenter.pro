// Requêtes des pages commerciales, avant/après la chute, et cannibalisation.
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
const URL_Q = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent("sc-domain:augmenter.pro")}/searchAnalytics/query`;
const q = async (body) => (await (await fetch(URL_Q, { method: "POST", headers: H, body: JSON.stringify({ rowLimit: 5000, ...body }) })).json()).rows || [];
const P = ["/audit-informatique-yvelines", "/audit-ia-pme", "/audit-informatique-val-doise", "/strategie-ia-pme", "/approche", "/contact", "/integration-mcp", "/serveur-mcp-odoo", "/atelier-claude-code-dirigeant", "/ia-souveraine-pme"];
const periods = [["AVANT chute (2026-03-01 → 2026-07-10)", "2026-03-01", "2026-07-10"], ["APRÈS (2026-07-24 → 2026-10-22)", "2026-07-24", "2026-10-22"]];

for (const [label, s, e] of periods) {
  console.log(`\n######## ${label}`);
  for (const p of P) {
    const rows = await q({ startDate: s, endDate: e, dimensions: ["query"], dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "equals", expression: "https://augmenter.pro" + p }] }] });
    const tot = rows.reduce((a, r) => ({ i: a.i + r.impressions, c: a.c + r.clicks }), { i: 0, c: 0 });
    console.log(`\n== ${p} · ${rows.length} requêtes · ${tot.i} impr · ${tot.c} clics`);
    for (const r of rows.sort((a, b) => b.impressions - a.impressions).slice(0, 12)) console.log(`  ${r.impressions}\t${r.clicks}\t${r.position.toFixed(1)}\t${r.keys[0]}`);
  }
}

// Requêtes commerciales du site (toutes pages) + pages qui se les partagent
console.log("\n######## Requêtes commerciales (16 mois) : quelles pages Google montre");
const rows = await q({ startDate: "2025-06-23", endDate: "2026-10-22", dimensions: ["query", "page"],
  dimensionFilterGroups: [{ filters: [{ dimension: "query", operator: "includingRegex", expression: "(audit|prix|tarif|co[uû]t|devis|consultant|informatique|cyber|infog[ée]r|prestataire|yvelines|val d.?oise|78|95|accompagnement|formation|conseil)" }] }] });
const byQ = new Map();
for (const r of rows) { const [qq, pg] = r.keys; (byQ.get(qq) || byQ.set(qq, []).get(qq)).push({ pg: pg.replace("https://augmenter.pro", ""), i: r.impressions, c: r.clicks, pos: r.position }); }
const list = [...byQ].map(([qq, v]) => ({ qq, v, i: v.reduce((a, x) => a + x.i, 0) })).sort((a, b) => b.i - a.i).slice(0, 40);
for (const { qq, v, i } of list) console.log(`${i}\t${qq}\t${v.sort((a, b) => b.i - a.i).map((x) => `${x.pg}(${x.i}·p${x.pos.toFixed(0)})`).join("  ")}`);
