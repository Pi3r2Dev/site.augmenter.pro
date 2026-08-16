import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  buildApexCanonicalUrl,
  isWwwHost,
} from "@/lib/canonical-host";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";

  // www → apex en 301, sans le port interne Node (:3000 sur Hostinger).
  if (isWwwHost(host)) {
    return NextResponse.redirect(
      buildApexCanonicalUrl(request.url, host),
      { status: 301 },
    );
  }

  // Override manuel de variante via ?ab=a|b — outil de prévisualisation interne.
  // `/?ab=b` force la variante B (accueil-2) sur l'URL `/`, `/?ab=a` force la A.
  // Pose le cookie ab_home (sticky preview 30 j) et fonctionne indépendamment du
  // kill switch AB_HOME_ENABLED. Seul un accès manuel ajoute ?ab= : les bots ne
  // le forgent pas. L'accès direct à /accueil-2 est un 301 vers `/`
  // (next.config) ; le rewrite interne ne passe pas par cette redirection.
  if (request.nextUrl.pathname === "/") {
    const forced = request.nextUrl.searchParams.get("ab");
    if (forced === "a" || forced === "b") {
      const response =
        forced === "b"
          ? NextResponse.rewrite(new URL("/accueil-2", request.url))
          : NextResponse.next();
      response.cookies.set("ab_home", forced, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
      });
      return response;
    }
  }

  // A/B test home : `/` reste l'unique URL publique. La variante B est servie
  // par rewrite interne vers /accueil-2 (jamais de redirection visible).
  // Assignation 50/50 persistée 30 jours par cookie ; un visiteur sans cookie
  // (dont les bots) est assigné aléatoirement — pas de cloaking.
  // L'URL publique /accueil-2 redirige en 301 vers `/`.
  // Split OPT-IN : désactivé par défaut depuis le retour de la home bento sur `/`
  // (2026-06). Tout le monde voit `/` ; /accueil-2 reste testable via `?ab=b`.
  // Réactiver un vrai split 50/50 : poser AB_HOME_ENABLED=true (hPanel, sans redeploy).
  if (
    process.env.AB_HOME_ENABLED === "true" &&
    request.nextUrl.pathname === "/"
  ) {
    const cookie = request.cookies.get("ab_home")?.value;
    const assigned = cookie === "a" || cookie === "b";

    // N'assigner que sur une vraie navigation (Sec-Fetch-Dest: document) :
    // les prefetch RSC de `/` (logo, liens) tireraient sinon des variantes
    // indépendantes → soft-nav et reload incohérents. Effet de bord assumé :
    // les agents sans ce header (bots, curl) reçoivent toujours la variante A
    // → contenu de `/` stable pour Googlebot pendant le test.
    const isDocument =
      request.headers.get("sec-fetch-dest") === "document";
    if (!assigned && !isDocument) {
      return NextResponse.next();
    }

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
  // Exclure assets statiques (_next, favicon, images…) — évite de router
  // favicon.ico et co. via le middleware Edge inutilement.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon|apple-icon|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webp)$).*)",
  ],
};
