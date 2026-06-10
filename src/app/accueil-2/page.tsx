import type { Metadata } from "next";
import { HeroAugmente } from "./hero-augmente";

export const metadata: Metadata = {
  title: "Accueil augmenté — démonstration",
  description:
    "Prototype de page d'accueil augmenter.PRO avec hero narratif en quatre chapitres : outils, IA, robotique et équipes.",
  alternates: {
    canonical: "/accueil-2",
  },
  robots: {
    index: false,
    follow: false,
  },
};

const demoPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://augmenter.pro/accueil-2#webpage",
  url: "https://augmenter.pro/accueil-2",
  name: "Accueil augmenté — démonstration",
  description:
    "Page de démonstration interne du hero narratif augmenter.PRO en quatre chapitres.",
  inLanguage: "fr-FR",
  isPartOf: { "@id": "https://augmenter.pro/#website" },
  about: { "@id": "https://augmenter.pro/#organization" },
};

export default function Accueil2Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(demoPageJsonLd) }}
      />
      <HeroAugmente />
    </>
  );
}
