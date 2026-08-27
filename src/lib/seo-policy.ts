/**
 * Politique d'indexation du site vitrine.
 *
 * Les pages légales restent crawlables (follow) pour transmettre le PageRank
 * depuis le footer, mais hors index Google — elles n'ont pas d'intention
 * de recherche et diluent le crawl.
 */
export const LEGAL_ROBOTS = { index: false, follow: true } as const;

/** Chemins légaux : noindex, follow, absents du sitemap. */
export const NOINDEX_FOLLOW_PATHS = [
  "/mentions-legales",
  "/cgv",
  "/politique-confidentialite",
] as const;

export type NoindexFollowPath = (typeof NOINDEX_FOLLOW_PATHS)[number];

/**
 * Google News n'accepte pas un site de conseil PME comme publication News.
 * Le news-sitemap a été retiré (0 URL News indexée, crawl pollué).
 */
export const NEWS_SITEMAP_ENABLED = false;

/**
 * Portail client (/clients/<client>/<doc>) : documents remis à un client
 * derrière un code d'accès. Jamais indexés, jamais suivis, hors sitemap,
 * hors llms.txt, sans aucun lien entrant depuis le site.
 */
export const PORTAL_ROBOTS = { index: false, follow: false } as const;

/** Préfixe d'URL du portail — utilisé par les tests d'hygiène SEO. */
export const PORTAL_PATH_PREFIX = "/clients";
