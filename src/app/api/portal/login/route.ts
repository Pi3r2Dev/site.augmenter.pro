import { NextRequest, NextResponse } from "next/server";
import {
  clientIpFromHeaders,
  cookieSecureFlag,
  createRateLimiter,
  getCookieSecret,
  passcodeMatches,
  PORTAL_SESSION_SECONDS,
  signPortalToken,
} from "@/lib/portal/auth";
import { getPortalClient } from "@/lib/portal/registry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = "private, no-store";
const ROBOTS = "noindex, nofollow";

/** 5 essais / 15 min par IP — suffisant pour un code de 8+ caractères. */
const limiter = createRateLimiter({ max: 5, windowMs: 15 * 60_000 });

function seeOther(location: string): NextResponse {
  // Location relative (RFC 7231) : pas de reconstruction d'URL absolue derrière le CDN.
  return new NextResponse(null, {
    status: 303,
    headers: { Location: location, "Cache-Control": NO_STORE, "X-Robots-Tag": ROBOTS },
  });
}

function tooManyAttempts(clientId: string, retryAfter: number): NextResponse {
  const minutes = Math.max(1, Math.ceil(retryAfter / 60));
  const html =
    '<!doctype html><html lang="fr"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<meta name="robots" content="noindex, nofollow"><title>Trop de tentatives</title></head>' +
    '<body style="font-family:system-ui,sans-serif;max-width:32rem;margin:4rem auto;padding:0 1.5rem;line-height:1.5">' +
    '<h1 style="font-size:1.4rem">Trop de tentatives</h1>' +
    `<p>Réessaie dans ${minutes} minute${minutes > 1 ? "s" : ""}.</p>` +
    `<p><a href="/clients/${clientId}">Retour</a></p></body></html>`;
  return new NextResponse(html, {
    status: 429,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": String(retryAfter),
      "Cache-Control": NO_STORE,
      "X-Robots-Tag": ROBOTS,
    },
  });
}

export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  const clientId = String(form?.get("client") ?? "");
  const code = String(form?.get("code") ?? "").trim();

  const client = getPortalClient(clientId);
  if (!client) {
    return new NextResponse("Not found", { status: 404, headers: { "Cache-Control": NO_STORE } });
  }

  const secret = getCookieSecret();
  const expected = process.env[client.passcodeEnv];
  if (!secret || !expected) {
    console.error(
      `[PORTAL] client=${clientId} misconfigured (${!secret ? "PORTAL_COOKIE_SECRET" : client.passcodeEnv})`,
    );
    return seeOther(`/clients/${clientId}?err=config`);
  }

  const ip = clientIpFromHeaders(req.headers);
  if (limiter.isLimited(ip)) {
    console.warn(`[PORTAL] client=${clientId} ko (rate-limited)`);
    return tooManyAttempts(clientId, limiter.retryAfterSeconds(ip));
  }

  if (!passcodeMatches(code, expected)) {
    limiter.fail(ip);
    console.warn(`[PORTAL] client=${clientId} ko`);
    return seeOther(`/clients/${clientId}?err=code`);
  }

  limiter.reset(ip);
  const exp = Math.floor(Date.now() / 1000) + PORTAL_SESSION_SECONDS;
  const res = seeOther(`/clients/${clientId}/${client.defaultDoc}`);
  res.cookies.set(client.cookieName, signPortalToken(clientId, exp, secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: cookieSecureFlag(req.headers),
    path: `/clients/${clientId}`,
    maxAge: PORTAL_SESSION_SECONDS,
  });
  console.log(`[PORTAL] client=${clientId} ok`);
  return res;
}
