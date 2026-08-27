import { NextRequest, NextResponse } from "next/server";
import { getCookieSecret, verifyPortalToken } from "@/lib/portal/auth";
import { getContentKey, renderPortalDoc } from "@/lib/portal/content";
import { PORTAL_DOC_CSP } from "@/lib/portal/csp";
import { getPortalClient, getPortalDoc } from "@/lib/portal/registry";

/**
 * Sert un document du portail HORS de l'arbre React (pas de layout, pas de
 * GTM, pas de globals.css) : le HTML autonome est renvoyé tel quel, enveloppé.
 * `private, no-store` est impératif : le CDN Hostinger a déjà servi 35 h de
 * HTML périmé (incident 2026-08-14) — un document privé en cache = une fuite.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NO_STORE = "private, no-store";
const ROBOTS = "noindex, nofollow";

function redirectToLogin(clientId: string): NextResponse {
  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: `/clients/${clientId}`,
      "Cache-Control": NO_STORE,
      "X-Robots-Tag": ROBOTS,
    },
  });
}

function plain(status: number, body: string): NextResponse {
  return new NextResponse(body, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": NO_STORE,
      "X-Robots-Tag": ROBOTS,
    },
  });
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ client: string; doc: string }> },
) {
  const { client: clientId, doc: docId } = await ctx.params;
  const client = getPortalClient(clientId);
  if (!client) return plain(404, "Not found");

  const secret = getCookieSecret();
  const token = req.cookies.get(client.cookieName)?.value;
  if (!secret || !verifyPortalToken(token, clientId, secret)) {
    return redirectToLogin(clientId);
  }

  const doc = getPortalDoc(client, docId);
  if (!doc) return plain(404, "Not found");

  const key = getContentKey();
  if (!key) {
    console.error("[PORTAL] misconfigured (PORTAL_CONTENT_KEY)");
    return plain(503, "Document indisponible");
  }

  let html: string;
  try {
    html = await renderPortalDoc(`${clientId}/${docId}`, doc, key);
  } catch (error) {
    console.error(
      `[PORTAL] client=${clientId} doc=${docId} render failed: ${(error as Error).message}`,
    );
    return plain(503, "Document indisponible");
  }

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": NO_STORE,
      "X-Robots-Tag": ROBOTS,
      // Même valeur que la règle next.config (qui a le dernier mot) — cf. src/lib/portal/csp.ts
      "Content-Security-Policy": PORTAL_DOC_CSP,
    },
  });
}
