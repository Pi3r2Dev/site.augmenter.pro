/**
 * CSP des documents du portail client (/clients/<client>/<doc>).
 *
 * Distincte de la CSP globale du site (next.config.ts) qui bloquerait les
 * polices Google (`font-src 'self'`). Ici : styles + polices Google autorisés,
 * script inline uniquement (checklist localStorage du document), aucun réseau,
 * aucun embed, aucun formulaire.
 *
 * Importée par next.config.ts (règle `headers()` sur `/clients/:client/:doc`,
 * indispensable : la règle globale `/(.*)` écraserait sinon l'en-tête posé par
 * le route handler — « dernier match gagnant ») ET par le handler lui-même.
 * Ce module ne doit dépendre de rien : next.config.ts le charge hors bundle.
 */
export const PORTAL_DOC_CSP = [
  "default-src 'none'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  "script-src 'unsafe-inline'",
  "img-src 'self' data:",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join("; ");

/** Motif `headers()` de next.config : deux segments exactement (pas la page login). */
export const PORTAL_DOC_HEADER_SOURCE = "/clients/:client/:doc";
