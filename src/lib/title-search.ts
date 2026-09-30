// src/lib/title-search.ts
// Recherche sur les titres — module volontairement sans dépendance vers les
// données (catalog, prompts, capacités) : il est importé par le composant
// client de la 404, et le contenu du site ne doit pas partir dans ce bundle.

/** Minuscules, sans accents, espaces normalisés — pour comparer sans surprise. */
export function normalizeText(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[’']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Projection minimale d'une ressource pour la recherche côté client. */
export interface SearchEntry {
  title: string;
  href: string;
  typeLabel: string;
}

/**
 * Recherche « tous les mots » sur les titres, insensible aux accents et à la
 * casse. Moins de deux caractères utiles → aucun résultat (on n'affiche pas
 * tout le site sur une lettre).
 */
export function searchTitles<T extends { title: string }>(
  entries: T[],
  query: string,
  limit = 8,
): T[] {
  const q = normalizeText(query);
  if (q.length < 2) return [];
  const words = q.split(" ");
  return entries
    .filter((e) => {
      const t = normalizeText(e.title);
      return words.every((w) => t.includes(w));
    })
    .slice(0, limit);
}
