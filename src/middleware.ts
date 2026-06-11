import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.host = host.slice(4);
    return NextResponse.redirect(url, { status: 301 });
  }

  // A/B test home : `/` reste l'unique URL publique. La variante B est servie
  // par rewrite interne vers /accueil-2 (jamais de redirection visible).
  // Assignation 50/50 persistée 30 jours par cookie ; un visiteur sans cookie
  // (dont les bots) est assigné aléatoirement — pas de cloaking. /accueil-2
  // porte un canonical vers `/`, donc aucune des deux variantes ne crée de
  // duplicate dans l'index.
  if (request.nextUrl.pathname === "/") {
    const cookie = request.cookies.get("ab_home")?.value;
    const assigned = cookie === "a" || cookie === "b";
    const variant = assigned ? cookie : Math.random() < 0.5 ? "a" : "b";

    const response =
      variant === "b"
        ? NextResponse.rewrite(new URL("/accueil-2", request.url))
        : NextResponse.next();

    if (!assigned) {
      response.cookies.set("ab_home", variant, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
      });
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/(.*)",
};
