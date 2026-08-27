import { createDecipheriv, createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";
import type { PortalDoc } from "./registry";

/**
 * Contenu du portail : documents HTML autonomes (convention Artifact : pas
 * d'enveloppe <html>/<head>/<body>, le fichier commence par <title>/<link>/<style>),
 * chiffrés at rest parce que le repo est public.
 *
 * Format produit par scripts/portal-encrypt.mjs :
 *   gzip(html) → AES-256-GCM (iv 12 o, tag 16 o) → base64(iv | tag | ciphertext)
 */

export interface EncryptedDoc {
  version: 1;
  alg: "aes-256-gcm+gzip";
  generatedAt: string;
  /** SHA-256 du HTML en clair — permet de savoir si la copie est à jour sans la déchiffrer. */
  sourceSha256: string;
  /** base64(iv | tag | ciphertext), découpé en lignes. */
  data: string[];
}

const KEY_RE = /^[0-9a-f]{64}$/i;

/** Clé AES-256 (64 hex) ou null — jamais de clé par défaut. */
export function getContentKey(
  env: Record<string, string | undefined> = process.env,
): Buffer | null {
  const key = env.PORTAL_CONTENT_KEY;
  return key && KEY_RE.test(key) ? Buffer.from(key, "hex") : null;
}

export function decryptPortalDoc(doc: EncryptedDoc, key: Buffer): string {
  if (doc.version !== 1 || doc.alg !== "aes-256-gcm+gzip") {
    throw new Error("portal: unsupported document format");
  }
  const buffer = Buffer.from(doc.data.join(""), "base64");
  if (buffer.length < 12 + 16 + 1) throw new Error("portal: ciphertext too short");
  const iv = buffer.subarray(0, 12);
  const tag = buffer.subarray(12, 28);
  const body = buffer.subarray(28);

  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const plain = gunzipSync(Buffer.concat([decipher.update(body), decipher.final()]));

  const sha = createHash("sha256").update(plain).digest("hex");
  if (sha !== doc.sourceSha256) throw new Error("portal: integrity mismatch");
  return plain.toString("utf8");
}

// ── Enveloppe HTML ──────────────────────────────────────────────────────────

/**
 * Éléments de <head> acceptés en tête d'un document Artifact. `<header>` (élément
 * de corps) ne matche pas : les noms sont fermés par `\b` puis un attribut ou `>`.
 */
const HEAD_TOKEN_RE =
  /^\s*(?:<title\b[^>]*>[\s\S]*?<\/title\s*>|<link\b[^>]*>|<meta\b[^>]*>|<style\b[^>]*>[\s\S]*?<\/style\s*>)/i;

const ROBOTS_META = '<meta name="robots" content="noindex, nofollow">';

export function splitArtifactHtml(raw: string): { head: string; body: string } {
  const head: string[] = [];
  let rest = raw;
  for (;;) {
    const match = HEAD_TOKEN_RE.exec(rest);
    if (!match) break;
    head.push(match[0].trim());
    rest = rest.slice(match[0].length);
  }
  return { head: head.join("\n"), body: rest.trim() };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Enveloppe un document Artifact en page HTML complète : doctype, lang, charset,
 * viewport, meta robots noindex, puis les <title>/<link>/<style> extraits, puis
 * le reste dans <body>. Un document déjà enveloppé reçoit seulement le meta robots.
 */
export function wrapArtifactHtml(
  raw: string,
  opts: { title?: string; lang?: string } = {},
): string {
  if (/^\s*(?:<!doctype|<html)\b/i.test(raw)) {
    return raw.replace(/<head\b[^>]*>/i, (open) => `${open}\n${ROBOTS_META}`);
  }
  const { head, body } = splitArtifactHtml(raw);
  const titleTag =
    !/<title\b/i.test(head) && opts.title ? `<title>${escapeHtml(opts.title)}</title>\n` : "";
  return [
    "<!doctype html>",
    `<html lang="${opts.lang ?? "fr"}">`,
    "<head>",
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    ROBOTS_META,
    titleTag + head,
    "</head>",
    "<body>",
    body,
    "</body>",
    "</html>",
    "",
  ].join("\n");
}

// ── Rendu + cache mémoire ───────────────────────────────────────────────────

const rendered = new Map<string, string>();

/** Déchiffre, enveloppe et met en cache (mémoire du process uniquement) un document. */
export async function renderPortalDoc(
  cacheKey: string,
  doc: PortalDoc,
  key: Buffer,
): Promise<string> {
  const hit = rendered.get(cacheKey);
  if (hit) return hit;
  const mod = await doc.load();
  const html = wrapArtifactHtml(decryptPortalDoc(mod.doc, key), { title: doc.title });
  rendered.set(cacheKey, html);
  return html;
}
