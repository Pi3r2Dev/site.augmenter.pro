import { createCipheriv, createHash, randomBytes } from "node:crypto";
import { gzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import {
  clientIpFromHeaders,
  cookieSecureFlag,
  createRateLimiter,
  getCookieSecret,
  passcodeMatches,
  signPortalToken,
  verifyPortalToken,
} from "./auth";
import {
  decryptPortalDoc,
  getContentKey,
  splitArtifactHtml,
  wrapArtifactHtml,
  type EncryptedDoc,
} from "./content";
import { getPortalClient, getPortalDoc } from "./registry";

const SECRET = "s".repeat(40);
const NOW = 1_800_000_000_000; // ms

/** Miroir de scripts/portal-encrypt.mjs — même format, même algorithme. */
function encrypt(html: string, key: Buffer): EncryptedDoc {
  const plain = Buffer.from(html, "utf8");
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(gzipSync(plain)), cipher.final()]);
  const base64 = Buffer.concat([iv, cipher.getAuthTag(), ciphertext]).toString("base64");
  return {
    version: 1,
    alg: "aes-256-gcm+gzip",
    generatedAt: "2026-08-27T00:00:00.000Z",
    sourceSha256: createHash("sha256").update(plain).digest("hex"),
    data: base64.match(/.{1,100}/g) ?? [],
  };
}

describe("cookie de session signé", () => {
  it("signe puis vérifie un token non expiré", () => {
    const exp = NOW / 1000 + 3600;
    const token = signPortalToken("reva9", exp, SECRET);
    expect(token).toMatch(/^v1\.\d+\.[0-9a-f]{64}$/);
    expect(verifyPortalToken(token, "reva9", SECRET, NOW)).toBe(true);
  });

  it("refuse un token expiré", () => {
    const token = signPortalToken("reva9", NOW / 1000 - 1, SECRET);
    expect(verifyPortalToken(token, "reva9", SECRET, NOW)).toBe(false);
  });

  it("refuse un token altéré, d'un autre client ou d'un autre secret", () => {
    const token = signPortalToken("reva9", NOW / 1000 + 3600, SECRET);
    const [v, exp, sig] = token.split(".");
    expect(verifyPortalToken(`${v}.${exp}.${sig.replace(/^./, sig[0] === "a" ? "b" : "a")}`, "reva9", SECRET, NOW)).toBe(false);
    expect(verifyPortalToken(`${v}.${Number(exp) + 1}.${sig}`, "reva9", SECRET, NOW)).toBe(false);
    expect(verifyPortalToken(token, "autre", SECRET, NOW)).toBe(false);
    expect(verifyPortalToken(token, "reva9", "x".repeat(40), NOW)).toBe(false);
    expect(verifyPortalToken(undefined, "reva9", SECRET, NOW)).toBe(false);
    expect(verifyPortalToken("v0.1.2", "reva9", SECRET, NOW)).toBe(false);
    expect(verifyPortalToken("", "reva9", SECRET, NOW)).toBe(false);
  });

  it("exige un secret de 32+ caractères, jamais de valeur par défaut", () => {
    expect(getCookieSecret({})).toBeNull();
    expect(getCookieSecret({ PORTAL_COOKIE_SECRET: "court" })).toBeNull();
    expect(getCookieSecret({ PORTAL_COOKIE_SECRET: SECRET })).toBe(SECRET);
  });
});

describe("code d'accès", () => {
  it("compare à temps constant, quelles que soient les longueurs", () => {
    expect(passcodeMatches("abc-123", "abc-123")).toBe(true);
    expect(passcodeMatches("abc-124", "abc-123")).toBe(false);
    expect(passcodeMatches("abc", "abc-123")).toBe(false);
    expect(passcodeMatches("", "abc-123")).toBe(false);
    expect(passcodeMatches("abc-123", undefined)).toBe(false);
    expect(passcodeMatches("abc-123", "")).toBe(false);
  });
});

describe("rate-limit mémoire", () => {
  it("bloque au 5e échec, libère après la fenêtre ou un succès", () => {
    const limiter = createRateLimiter({ max: 5, windowMs: 60_000 });
    for (let i = 0; i < 4; i++) limiter.fail("ip", NOW);
    expect(limiter.isLimited("ip", NOW)).toBe(false);
    limiter.fail("ip", NOW);
    expect(limiter.isLimited("ip", NOW)).toBe(true);
    expect(limiter.retryAfterSeconds("ip", NOW + 10_000)).toBe(50);
    expect(limiter.isLimited("autre", NOW)).toBe(false);
    expect(limiter.isLimited("ip", NOW + 60_000)).toBe(false);
    limiter.fail("ip", NOW);
    limiter.reset("ip");
    expect(limiter.isLimited("ip", NOW)).toBe(false);
  });
});

describe("helpers HTTP", () => {
  it("lit l'IP derrière le CDN", () => {
    expect(clientIpFromHeaders(new Headers({ "x-forwarded-for": "1.2.3.4, 10.0.0.1" }))).toBe("1.2.3.4");
    expect(clientIpFromHeaders(new Headers({ "x-real-ip": "5.6.7.8" }))).toBe("5.6.7.8");
    expect(clientIpFromHeaders(new Headers())).toBe("unknown");
  });

  it("pose Secure en prod sauf sur loopback, et toujours derrière HTTPS", () => {
    expect(cookieSecureFlag(new Headers({ host: "augmenter.pro" }), true)).toBe(true);
    expect(cookieSecureFlag(new Headers({ host: "127.0.0.1:3000" }), true)).toBe(false);
    expect(cookieSecureFlag(new Headers({ host: "localhost:3000" }), true)).toBe(false);
    expect(cookieSecureFlag(new Headers({ host: "localhost:3000" }), false)).toBe(false);
    expect(
      cookieSecureFlag(new Headers({ host: "127.0.0.1:3000", "x-forwarded-proto": "https" }), false),
    ).toBe(true);
  });
});

describe("registre", () => {
  it("résout reva9 et son document par défaut", () => {
    const client = getPortalClient("reva9");
    expect(client?.passcodeEnv).toBe("PORTAL_REVA9_PASSCODE");
    expect(client?.cookieName).toBe("portal_reva9");
    expect(client && getPortalDoc(client, client.defaultDoc)).not.toBeNull();
  });

  it("rejette les identifiants inconnus, malformés ou hérités du prototype", () => {
    expect(getPortalClient("inconnu")).toBeNull();
    expect(getPortalClient("REVA9")).toBeNull();
    expect(getPortalClient("../reva9")).toBeNull();
    expect(getPortalClient("constructor")).toBeNull();
    expect(getPortalClient("")).toBeNull();
    const client = getPortalClient("reva9")!;
    expect(getPortalDoc(client, "toString")).toBeNull();
    expect(getPortalDoc(client, "autre-doc")).toBeNull();
  });
});

describe("enveloppe d'un document Artifact", () => {
  const raw = [
    "<title>Reva 9 × Odoo — Point d'étape</title>",
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    "<style>",
    "  header.hero { color: red; }",
    "</style>",
    "",
    '<div class="wrap">',
    '<header class="hero"><h1>Titre</h1></header>',
    "<script>localStorage.getItem('k');</script>",
    "</div>",
  ].join("\n");

  it("sépare les éléments de <head> du corps sans confondre <header>", () => {
    const { head, body } = splitArtifactHtml(raw);
    expect(head).toContain("<title>");
    expect(head).toContain("<link ");
    expect(head).toContain("</style>");
    expect(head).not.toContain("<header");
    expect(body.startsWith('<div class="wrap">')).toBe(true);
    expect(body).toContain("<header");
    expect(body).not.toContain("<title>");
  });

  it("produit une page complète, noindex, avec le <title> dans <head>", () => {
    const html = wrapArtifactHtml(raw);
    expect(html.startsWith("<!doctype html>\n<html lang=\"fr\">")).toBe(true);
    const head = html.slice(0, html.indexOf("<body>"));
    const body = html.slice(html.indexOf("<body>"));
    expect(head).toContain('<meta charset="utf-8">');
    expect(head).toContain('<meta name="robots" content="noindex, nofollow">');
    expect(head).toContain("<title>Reva 9 × Odoo — Point d'étape</title>");
    expect(head).toContain("</style>");
    expect(body).not.toContain("<title>");
    expect(body).toContain('<header class="hero">');
    expect(html).not.toContain("googletagmanager");
  });

  it("ajoute un titre de secours seulement s'il manque", () => {
    expect(wrapArtifactHtml("<p>x</p>", { title: "A & B" })).toContain("<title>A &amp; B</title>");
    expect(wrapArtifactHtml(raw, { title: "Secours" })).not.toContain("Secours");
  });

  it("n'enveloppe pas deux fois un document déjà complet", () => {
    const full = "<!doctype html><html><head><title>t</title></head><body>b</body></html>";
    const html = wrapArtifactHtml(full);
    expect(html.match(/<html/g)).toHaveLength(1);
    expect(html).toContain('<head>\n<meta name="robots" content="noindex, nofollow">');
  });
});

describe("déchiffrement du contenu", () => {
  const key = randomBytes(32);
  const html = "<title>Doc</title>\n<style>body{}</style>\n<p>Contenu confidentiel é</p>";

  it("retrouve le HTML d'origine", () => {
    expect(decryptPortalDoc(encrypt(html, key), key)).toBe(html);
  });

  it("échoue avec une autre clé ou un contenu altéré", () => {
    const doc = encrypt(html, key);
    expect(() => decryptPortalDoc(doc, randomBytes(32))).toThrow();
    const tampered = { ...doc, data: [...doc.data] };
    const last = tampered.data[tampered.data.length - 1];
    tampered.data[tampered.data.length - 1] =
      last.slice(0, -4) + (last.endsWith("AAAA") ? "BBBB" : "AAAA");
    expect(() => decryptPortalDoc(tampered, key)).toThrow();
    expect(() => decryptPortalDoc({ ...doc, sourceSha256: "0".repeat(64) }, key)).toThrow(
      /integrity/,
    );
  });

  it("n'accepte qu'une clé de 64 hex, jamais de clé par défaut", () => {
    expect(getContentKey({})).toBeNull();
    expect(getContentKey({ PORTAL_CONTENT_KEY: "abc" })).toBeNull();
    expect(getContentKey({ PORTAL_CONTENT_KEY: key.toString("hex") })?.equals(key)).toBe(true);
  });
});
