// Portefeuille : chaque page du sitemap, 16 mois GSC, taguée par cluster de positionnement.
import { readFileSync } from "node:fs";
import { createSign } from "node:crypto";
const cred = JSON.parse(readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS ?? (() => { throw new Error("GOOGLE_APPLICATION_CREDENTIALS manquante (clé JSON du compte de service GSC, lecture seule)"); })(), "utf8"));
const b64 = (o) => Buffer.from(typeof o === "string" ? o : JSON.stringify(o)).toString("base64url");
const now = Math.floor(Date.now() / 1000);
const unsigned = b64({ alg: "RS256", typ: "JWT" }) + "." + b64({ iss: cred.client_email, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 });
const sig = createSign("RSA-SHA256").update(unsigned).sign(cred.private_key, "base64url");
const tok = await (await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${unsigned}.${sig}` }) })).json();
const H = { authorization: `Bearer ${tok.access_token}`, "content-type": "application/json" };
const Q = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent("sc-domain:augmenter.pro")}/searchAnalytics/query`;
const q = async (b) => (await (await fetch(Q, { method: "POST", headers: H, body: JSON.stringify({ rowLimit: 5000, ...b }) })).json()).rows || [];

const CL = [
  [/odoo|mcp|claude|agent-ia|petit-modele|catalogue|logiciel-construit|cout-agent|ma-pme-en-2027|prompt|ia-souveraine|integration/, "A · intégration IA / Odoo / dev"],
  [/audit-informatique|cout-audit|nis2|cybersecurite|5-signes/, "B · local / audit IT / cyber"],
  [/strategie-ia|audit-ia-pme|atelier|dirigeant|bilan-ia|contradicteur|patron-goulot|compte-rendu|veille|emails|vente|commerciale|llm-vente|machine-de-guerre|btp/, "C · IA dirigeant / usages génériques"],
  [/^\/$|approche|contact|a-propos|auteur|augmenter-mon-entreprise|plan-du-site|blog$|idees|projets/, "D · structure / marque"],
];
const tag = (p) => (CL.find(([re]) => re.test(p)) || [, "? · non classé"])[1];
const sitemap = readFileSync(new URL("../../public/sitemap.xml", import.meta.url), "utf8");
const paths = [...sitemap.matchAll(/<loc>https:\/\/augmenter\.pro([^<]*)<\/loc>/g)].map((m) => m[1] || "/");

const per = async (s, e) => { const m = new Map(); for (const r of await q({ startDate: s, endDate: e, dimensions: ["page"] })) m.set(r.keys[0].replace("https://augmenter.pro", "") || "/", r); return m; };
const all = await per("2025-06-23", "2026-10-22"), avant = await per("2026-03-01", "2026-07-10"), apres = await per("2026-07-24", "2026-10-22");
const rows = paths.map((p) => { const a = all.get(p) || {}, b = avant.get(p) || {}, c = apres.get(p) || {}; return { p, cl: tag(p), i: a.impressions || 0, c: a.clicks || 0, pos: a.position, iB: b.impressions || 0, cB: b.clicks || 0, iA: c.impressions || 0, cA: c.clicks || 0 }; });
console.log("cluster\timpr16m\tclics16m\tpos\timprAvant\tclicsAvant\timprAprès\tclicsAprès\tpage");
for (const r of rows.sort((a, b) => a.cl.localeCompare(b.cl) || b.c - a.c || b.i - a.i)) console.log(`${r.cl}\t${r.i}\t${r.c}\t${r.pos?.toFixed(0) ?? "-"}\t${r.iB}\t${r.cB}\t${r.iA}\t${r.cA}\t${r.p}`);
console.log("\n== Totaux par cluster");
const agg = {};
for (const r of rows) { const a = (agg[r.cl] ||= { n: 0, i: 0, c: 0, iB: 0, cB: 0, iA: 0, cA: 0 }); a.n++; for (const k of ["i", "c", "iB", "cB", "iA", "cA"]) a[k] += r[k]; }
for (const [k, a] of Object.entries(agg).sort()) console.log(`${k}: ${a.n} pages · 16 m : ${a.i} impr / ${a.c} clics · avant chute : ${a.iB}/${a.cB} · après : ${a.iA}/${a.cA}`);
// Top requêtes cluster A (toutes pages) 16 mois
console.log("\n== Top 25 requêtes 16 mois sur les pages du cluster A");
const qr = await q({ startDate: "2025-06-23", endDate: "2026-10-22", dimensions: ["query", "page"] });
const aq = new Map();
for (const r of qr) { const p = r.keys[1].replace("https://augmenter.pro", "") || "/"; if (!tag(p).startsWith("A")) continue; const x = aq.get(r.keys[0]) || { i: 0, c: 0, pos: 0 }; x.i += r.impressions; x.c += r.clicks; x.pos = r.position; aq.set(r.keys[0], x); }
for (const [k, x] of [...aq].sort((a, b) => b[1].c - a[1].c || b[1].i - a[1].i).slice(0, 25)) console.log(`${x.i}\t${x.c}\t${x.pos.toFixed(0)}\t${k}`);
