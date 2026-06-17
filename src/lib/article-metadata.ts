import type { Metadata } from "next";

/**
 * Construit le `Metadata` complet d'un article de blog.
 *
 * Pourquoi : sans bloc `openGraph` propre, chaque article héritait du
 * `openGraph` générique du root layout (titre, description et image du site).
 * Résultat : un partage WhatsApp/Facebook/LinkedIn affichait la carte du site,
 * jamais celle de l'article. Ce helper centralise og:title / og:description /
 * og:image (+ twitter + canonical) pour qu'ils restent synchrones avec le
 * title/description SEO — une seule source de vérité par article.
 *
 * og:image pointe vers le JPEG dédié `/images/blog/og/<slug>.jpg`
 * (1200×630, JPEG = compat max crawlers — cf. convention du root layout).
 */
export function articleMetadata(opts: {
  title: string;
  description: string;
  slug: string;
}): Metadata {
  const { title, description, slug } = opts;
  const url = `https://augmenter.pro/blog/${slug}`;
  const ogImage = `/images/blog/og/${slug}.jpg`;
  // secureUrl ne reçoit PAS le metadataBase de Next (contrairement à `url`) :
  // on le force en absolu pour les crawlers stricts.
  const ogImageAbs = `https://augmenter.pro${ogImage}`;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      siteName: "augmenter.PRO",
      url,
      title,
      description,
      authors: ["https://augmenter.pro/auteur/pierre-legrand"],
      images: [
        {
          url: ogImage,
          secureUrl: ogImageAbs,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@Pi3r2Dev",
      title,
      description,
      images: [ogImage],
    },
  };
}
