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
 * Sitemap news dynamique (/news-sitemap.xml), décidé par l'ADR 0007
 * (docs/decisions/0007-google-news-discover.md) : seuls les articles
 * `kind: "news"` publiés depuis moins de 48 h y figurent, calculés à chaque
 * requête. L'ancien fichier statique (retiré le 2026-08-16) ne revient pas.
 * `false` = la route répond 404 (interrupteur de retrait sans redéploiement de code).
 */
export const NEWS_SITEMAP_ENABLED = true;

/**
 * Pages hors index ET hors graphe de liens : noindex, nofollow, absentes du
 * sitemap, de llms.txt et de toute nav. Couvre le portail client (code d'accès)
 * et les notes unlisted (lisibles par URL, jamais maillées depuis le site).
 */
export const UNLISTED_ROBOTS = { index: false, follow: false } as const;

/**
 * Portail client (/clients/<client>/<doc>) : documents remis à un client
 * derrière un code d'accès. Jamais indexés, jamais suivis, hors sitemap,
 * hors llms.txt, sans aucun lien entrant depuis le site.
 */
export const PORTAL_ROBOTS = UNLISTED_ROBOTS;

/** Préfixe d'URL du portail — utilisé par les tests d'hygiène SEO. */
export const PORTAL_PATH_PREFIX = "/clients";

/**
 * Notes unlisted (/notes/<slug>) : pages librement lisibles par URL
 * (candidature, document de travail), jamais indexées, jamais maillées.
 */
export const NOTES_PATH_PREFIX = "/notes";
