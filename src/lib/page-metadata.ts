import type { Metadata } from "next";
import { UNLISTED_ROBOTS } from "./seo-policy";

/**
 * Bloc `openGraph` des pages classiques (hors articles — cf. `articleMetadata`).
 *
 * Pourquoi ce helper : Next merge la metadata en **shallow** (doc Next 16,
 * `generate-metadata.md` §Merging — « metadata with nested fields such as
 * openGraph […] defined in an earlier segment are overwritten by the last
 * segment to define them »). Dès qu'une page déclare `openGraph`, son objet
 * **remplace** entièrement celui du root layout : elle perd `siteName`,
 * `locale` **et `images`** — carte de partage sans nom de site, sans langue
 * et sans visuel. Passer par ce helper rend l'oubli impossible.
 */

export const SITE_URL = "https://augmenter.pro";
export const SITE_NAME = "augmenter.PRO";

/** Image Open Graph du site (JPEG = compat max plugins + crawlers). */
export const OG_IMAGE_PATH = "/images/general/og-augmenter-pro.jpg";
export const OG_IMAGE_ALT =
  "augmenter.PRO — Diorama isométrique ordinateur & robots PME, consultant IA Claude Code, Odoo, audit IT 78/95";

/**
 * `secureUrl` ne reçoit PAS le `metadataBase` de Next (contrairement à `url`) :
 * on le force en absolu pour les crawlers stricts.
 */
export const OG_IMAGE = {
  url: OG_IMAGE_PATH,
  secureUrl: `${SITE_URL}${OG_IMAGE_PATH}`,
  width: 1200,
  height: 630,
  alt: OG_IMAGE_ALT,
  type: "image/jpeg",
} as const;

type OpenGraph = NonNullable<Metadata["openGraph"]>;

export function pageOpenGraph(opts: {
  /** Titre de la carte de partage (peut différer du `<title>` SEO). */
  title: string;
  description: string;
  /** Chemin absolu depuis la racine, ex. `/contact`. */
  path: string;
  /** `website` par défaut ; `profile` pour une page auteur. */
  type?: "website" | "profile";
  /** Visuel dédié à la page — à défaut, l'image OG du site. */
  images?: OpenGraph["images"];
}): OpenGraph {
  const { title, description, path, type = "website", images } = opts;

  return {
    type,
    locale: "fr_FR",
    siteName: SITE_NAME,
    url: `${SITE_URL}${path}`,
    title,
    description,
    images: images ?? [OG_IMAGE],
  };
}

/**
 * Metadata d'une page unlisted (`/notes/<slug>`, etc.) : noindex/nofollow,
 * canonical + Open Graph + Twitter Card via `pageOpenGraph` (carte de partage
 * quand on colle l'URL dans un mail ou un formulaire), titre `absolute` pour
 * ne pas hériter du template `%s | augmenter.PRO`.
 */
export function unlistedPageMetadata(opts: {
  title: string;
  description: string;
  /** Chemin absolu depuis la racine, ex. `/notes/arlequin`. */
  path: string;
}): Metadata {
  const { title, description, path } = opts;
  return {
    title: { absolute: title },
    description,
    robots: UNLISTED_ROBOTS,
    alternates: { canonical: path },
    openGraph: pageOpenGraph({ title, description, path }),
    twitter: {
      card: "summary_large_image",
      creator: "@Pi3r2Dev",
      title,
      description,
      images: [OG_IMAGE_PATH],
    },
  };
}
