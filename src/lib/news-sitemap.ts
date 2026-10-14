import type { CatalogArticle } from "@/data/resources";

/**
 * Sitemap Google News (ADR 0007), généré à la requête : la fenêtre de 48 h
 * bouge avec l'horloge, un fichier statique la figerait au build.
 *
 * Fenêtre : `datePublished` (AAAA-MM-JJ) est lu à 00:00:00 UTC ; une news est
 * incluse si `published <= now < published + 48 h`. Pas de fuseau
 * Europe/Paris : le serveur tourne en UTC, et une ou deux heures d'écart ne
 * comptent pas pour Google.
 */

const SITE_URL = "https://augmenter.pro";
const PUBLICATION_NAME = "augmenter.PRO";
const WINDOW_MS = 48 * 60 * 60 * 1000;
/** Plafond de Google pour un sitemap news. */
const MAX_URLS = 1000;

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildNewsSitemap(articles: CatalogArticle[], now: Date): string {
  const nowMs = now.getTime();
  const entries = articles
    .filter((a) => a.kind === "news" && a.datePublished)
    .map((a) => ({ article: a, published: new Date(`${a.datePublished}T00:00:00Z`).getTime() }))
    .filter(({ published }) => published <= nowMs && nowMs < published + WINDOW_MS)
    .sort((x, y) => y.published - x.published)
    .slice(0, MAX_URLS);

  const urls = entries.map(
    ({ article }) =>
      `  <url>\n` +
      `    <loc>${SITE_URL}/blog/${article.slug}</loc>\n` +
      `    <news:news>\n` +
      `      <news:publication>\n` +
      `        <news:name>${PUBLICATION_NAME}</news:name>\n` +
      `        <news:language>fr</news:language>\n` +
      `      </news:publication>\n` +
      `      <news:publication_date>${article.datePublished}</news:publication_date>\n` +
      `      <news:title>${escapeXml(article.title)}</news:title>\n` +
      `    </news:news>\n` +
      `  </url>\n`,
  );

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n` +
    urls.join("") +
    `</urlset>\n`
  );
}
