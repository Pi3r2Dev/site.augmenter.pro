import type { Metadata } from "next";
import { HeroAugmente } from "./hero-augmente";
import { HomeAbTracker } from "@/components/analytics/home-ab-tracker";

// Variante B de l'A/B test home : servie sur `/` par rewrite middleware
// (`?ab=b` ou cookie ab_home=b). L'accès direct à `/accueil-2` est un 301
// vers `/` (next.config). Canonical vers `/` pour le cas rewrite : le HTML
// servi sur l'URL `/` ne doit jamais déclarer une autre URL canonique.
// PAS de title/description ici : la variante hérite des metadata du root
// layout pour que le title indexable de `/` reste stable.
export const metadata: Metadata = {
  alternates: {
    canonical: "https://augmenter.pro/",
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://augmenter.pro/accueil-2#webpage",
  url: "https://augmenter.pro/",
  name: "Votre PME, augmentée par vos équipes",
  description:
    "Page d'accueil augmenter.PRO avec hero narratif en quatre chapitres : outils, IA, robotique et équipes.",
  inLanguage: "fr-FR",
  isPartOf: { "@id": "https://augmenter.pro/#website" },
  about: { "@id": "https://augmenter.pro/#organization" },
};

export default function Accueil2Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <HomeAbTracker variant="accueil_2" totalChapters={4} />
      <HeroAugmente />
    </>
  );
}
