/**
 * Redirection www → apex sans fuite du port interne Node (Hostinger :3000).
 *
 * `request.nextUrl` et parfois l'en-tête `Host` conservent le port du process
 * (`augmenter.pro:3000`). Un 301 vers cette URL est inutilisable depuis
 * l'internet public et laisse `www.` dans « Explorée, non indexée ».
 */

const WWW_PREFIX = /^www\./i;

/**
 * Indique si l'hôte demandé est un www (port interne ignoré).
 */
export function isWwwHost(hostHeader: string): boolean {
  const hostname = hostHeader.split(":")[0] ?? "";
  return WWW_PREFIX.test(hostname);
}

/**
 * Construit l'URL canonique https apex, sans www ni port.
 *
 * @param requestUrl - URL complète vue par Next (`request.url`)
 * @param hostHeader - valeur brute de l'en-tête `Host`
 */
export function buildApexCanonicalUrl(
  requestUrl: string,
  hostHeader: string,
): URL {
  const hostname = (hostHeader.split(":")[0] ?? "").replace(WWW_PREFIX, "");
  const incoming = new URL(requestUrl);
  return new URL(
    `${incoming.pathname}${incoming.search}${incoming.hash}`,
    `https://${hostname}`,
  );
}
