import type { Metadata } from "next";
import { HeroAugmente } from "./hero-augmente";
import { HomeAbTracker } from "@/components/analytics/home-ab-tracker";

// Variante B de l'A/B test home : servie sur `/` par rewrite middleware
// (cookie ab_home=b). Le canonical pointe vers `/` — pattern Google officiel
// pour les variantes d'A/B test : aucune URL dupliquée dans l'index, et un
// accès direct à /accueil-2 canonicalise vers la home.
export const metadata: Metadata = {
  title: "Votre PME, Augmentée par vos Équipes | augmenter.PRO",
  description:
    "Moins d'administratif, plus de clients. Conseil IA, intégration Claude et Odoo pour PME — audit 60 min offert, sans engagement, partout en France.",
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
