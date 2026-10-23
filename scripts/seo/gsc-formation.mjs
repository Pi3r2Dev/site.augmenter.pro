// Requêtes formation / cowork / mcp / agent sur 16 mois : quelles pages Google montre.
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
const rows = (await (await fetch(Q, { method: "POST", headers: H, body: JSON.stringify({ rowLimit: 5000, startDate: "2025-06-23", endDate: "2026-10-22", dimensions: ["query", "page"], dimensionFilterGroups: [{ filters: [{ dimension: "query", operator: "includingRegex", expression: "(formation|atelier|cowork|cours|apprendre|workshop|cpf|mcp|agent|n8n|automatis)" }] }] }) })).json()).rows || [];
const byQ = new Map();
for (const r of rows) { const [qq, pg] = r.keys; (byQ.get(qq) || byQ.set(qq, []).get(qq)).push({ pg: pg.replace("https://augmenter.pro", "") || "/", i: r.impressions, c: r.clicks, pos: r.position }); }
const list = [...byQ].map(([qq, v]) => ({ qq, v, i: v.reduce((a, x) => a + x.i, 0), c: v.reduce((a, x) => a + x.c, 0) })).sort((a, b) => b.i - a.i);
const tot = list.reduce((a, x) => ({ i: a.i + x.i, c: a.c + x.c }), { i: 0, c: 0 });
console.log(`${list.length} requêtes · ${tot.i} impressions · ${tot.c} clics\n`);
for (const { qq, v, i, c } of list.slice(0, 45)) console.log(`${i}\t${c}\t${qq}\t${v.sort((a, b) => b.i - a.i).slice(0, 3).map((x) => `${x.pg}(${x.i}·p${x.pos.toFixed(0)})`).join("  ")}`);
