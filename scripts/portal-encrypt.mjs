#!/usr/bin/env node
/**
 * Chiffre un document HTML pour le portail client (/clients/<client>/<doc>).
 *
 *   node scripts/portal-encrypt.mjs <source.html> <dest.ts>
 *
 * Clé : PORTAL_CONTENT_KEY (env), sinon lue dans .env.local — 64 hex
 * (`openssl rand -hex 32`). La MÊME clé doit être déclarée côté Hostinger,
 * sinon le document répond 503.
 *
 * Format : gzip(html) → AES-256-GCM (iv 12 o, tag 16 o) → base64(iv|tag|ct)
 * → module TS `{ doc }` importé par src/lib/portal/registry.ts. Le repo étant
 * public, seul ce module chiffré est versionné — jamais le HTML en clair
 * (cf. .gitignore : src/content/portal/ ** / *.html).
 */
import { createCipheriv, createHash, randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, relative } from "node:path";
import { gzipSync } from "node:zlib";

const KEY_RE = /^[0-9a-f]{64}$/i;

function loadKey() {
  let key = process.env.PORTAL_CONTENT_KEY;
  if (!key && existsSync(".env.local")) {
    const match = readFileSync(".env.local", "utf8").match(/^PORTAL_CONTENT_KEY=(.*)$/m);
    if (match) key = match[1].trim().replace(/^["']|["']$/g, "");
  }
  if (!key || !KEY_RE.test(key)) {
    console.error(
      "PORTAL_CONTENT_KEY manquante ou invalide (64 hex attendus). Générer : openssl rand -hex 32",
    );
    process.exit(1);
  }
  return Buffer.from(key, "hex");
}

const [source, dest] = process.argv.slice(2);
if (!source || !dest) {
  console.error("Usage : node scripts/portal-encrypt.mjs <source.html> <dest.ts>");
  process.exit(1);
}
if (!dest.endsWith(".ts")) {
  console.error("La destination doit être un module .ts (importé par le registre).");
  process.exit(1);
}

const plain = readFileSync(source);
const key = loadKey();
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const ciphertext = Buffer.concat([cipher.update(gzipSync(plain, { level: 9 })), cipher.final()]);
const tag = cipher.getAuthTag();
const base64 = Buffer.concat([iv, tag, ciphertext]).toString("base64");
const lines = base64.match(/.{1,100}/g) ?? [];
const sha256 = createHash("sha256").update(plain).digest("hex");
const destRel = relative(process.cwd(), dest).split("\\").join("/");

const output = `// Généré par scripts/portal-encrypt.mjs — NE PAS ÉDITER À LA MAIN.
// Le HTML source vit dans le repo de mission (cf. CLAUDE.md § Routing, /clients) ;
// toute correction se fait là-bas, puis : node scripts/portal-encrypt.mjs <source> ${destRel}
// sha256 du HTML en clair : ${sha256}
import type { EncryptedDoc } from "@/lib/portal/content";

export const doc: EncryptedDoc = {
  version: 1,
  alg: "aes-256-gcm+gzip",
  generatedAt: "${new Date().toISOString()}",
  sourceSha256: "${sha256}",
  data: [
${lines.map((line) => `    "${line}",`).join("\n")}
  ],
};
`;

mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, output);
console.log(
  `✔ ${destRel} — ${plain.length} o en clair → ${ciphertext.length} o chiffrés (sha256 ${sha256.slice(0, 12)}…)`,
);
