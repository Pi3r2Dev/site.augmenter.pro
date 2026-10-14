import { ARTICLES } from "@/data/resources";
import { buildNewsSitemap } from "@/lib/news-sitemap";
import { NEWS_SITEMAP_ENABLED } from "@/lib/seo-policy";

/**
 * Sitemap Google News (ADR 0007). Un route handler n'est pas mis en cache par
 * défaut : la fenêtre de 48 h se recalcule à chaque requête. Ne pas exporter
 * `dynamic = "force-static"` ni `revalidate` — une route prérendue figerait la
 * fenêtre à la date du build. Le `s-maxage=300` aligne le CDN sur le HTML.
 */
export function GET(): Response {
  if (!NEWS_SITEMAP_ENABLED) {
    return new Response(null, { status: 404 });
  }
  return new Response(buildNewsSitemap(ARTICLES, new Date()), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=300",
    },
  });
}
