import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * Authentification du portail client : code d'accès + cookie signé (HMAC-SHA256).
 * Pas de session serveur, pas de base : le cookie porte `v1.<exp>.<hmac>` où
 * hmac = HMAC(secret, "<client>.<exp>"). Tout est vérifiable sans état.
 */

export const PORTAL_SESSION_SECONDS = 60 * 60 * 24 * 30; // 30 jours
const TOKEN_VERSION = "v1";
const MIN_SECRET_LENGTH = 32;

/** Secret de signature, ou null s'il est absent/trop court — jamais de valeur par défaut. */
export function getCookieSecret(
  env: Record<string, string | undefined> = process.env,
): string | null {
  const secret = env.PORTAL_COOKIE_SECRET;
  return secret && secret.length >= MIN_SECRET_LENGTH ? secret : null;
}

function hmacHex(secret: string, payload: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/**
 * Comparaison à temps constant, indépendante des longueurs : on compare les
 * SHA-256 des deux chaînes (timingSafeEqual exige des tailles égales et
 * lèverait sinon — ce qui trahirait la longueur du secret).
 */
export function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a, "utf8").digest();
  const hb = createHash("sha256").update(b, "utf8").digest();
  return timingSafeEqual(ha, hb);
}

export function passcodeMatches(input: string, expected: string | undefined): boolean {
  if (!expected || !input) return false;
  return safeEqual(input, expected);
}

export function signPortalToken(client: string, expSeconds: number, secret: string): string {
  const exp = Math.floor(expSeconds);
  return `${TOKEN_VERSION}.${exp}.${hmacHex(secret, `${client}.${exp}`)}`;
}

export function verifyPortalToken(
  token: string | undefined,
  client: string,
  secret: string,
  nowMs: number = Date.now(),
): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== TOKEN_VERSION) return false;
  const [, expRaw, signature] = parts;
  if (!/^\d{1,12}$/.test(expRaw)) return false;
  const exp = Number(expRaw);
  if (exp * 1000 <= nowMs) return false;
  return safeEqual(signature, hmacHex(secret, `${client}.${exp}`));
}

// ── Rate-limit mémoire (process Node unique sur Hostinger) ──────────────────

export interface RateLimiter {
  isLimited(key: string, nowMs?: number): boolean;
  retryAfterSeconds(key: string, nowMs?: number): number;
  fail(key: string, nowMs?: number): void;
  reset(key: string): void;
}

interface Bucket {
  count: number;
  resetAt: number;
}

export function createRateLimiter({
  max = 5,
  windowMs = 15 * 60_000,
}: { max?: number; windowMs?: number } = {}): RateLimiter {
  const buckets = new Map<string, Bucket>();

  const live = (key: string, now: number): Bucket | null => {
    const bucket = buckets.get(key);
    if (!bucket) return null;
    if (bucket.resetAt <= now) {
      buckets.delete(key);
      return null;
    }
    return bucket;
  };

  const prune = (now: number) => {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(key);
    }
  };

  return {
    isLimited(key, now = Date.now()) {
      return (live(key, now)?.count ?? 0) >= max;
    },
    retryAfterSeconds(key, now = Date.now()) {
      const bucket = live(key, now);
      return bucket ? Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) : 0;
    },
    fail(key, now = Date.now()) {
      const bucket = live(key, now);
      if (bucket) bucket.count += 1;
      else buckets.set(key, { count: 1, resetAt: now + windowMs });
      if (buckets.size > 10_000) prune(now);
    },
    reset(key) {
      buckets.delete(key);
    },
  };
}

// ── Helpers HTTP (Headers standard, sans dépendance Next) ───────────────────

/** IP cliente derrière le CDN Hostinger (premier X-Forwarded-For), sinon "unknown". */
export function clientIpFromHeaders(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}

const LOOPBACK_HOST_RE = /^(localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0)(:\d+)?$/i;

/**
 * `Secure` sur le cookie : oui derrière HTTPS (X-Forwarded-Proto) et en prod —
 * sauf sur un host loopback, pour pouvoir tester `npm run build && npm run start`
 * en http://127.0.0.1 (curl refuse d'envoyer un cookie Secure sur http).
 */
export function cookieSecureFlag(
  headers: Headers,
  isProd: boolean = process.env.NODE_ENV === "production",
): boolean {
  if (headers.get("x-forwarded-proto")?.split(",")[0]?.trim() === "https") return true;
  const host = headers.get("host") ?? "";
  return isProd && !LOOPBACK_HOST_RE.test(host);
}
