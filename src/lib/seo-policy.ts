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
