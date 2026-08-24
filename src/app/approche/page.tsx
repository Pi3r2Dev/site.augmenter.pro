import type { Metadata } from "next";
import { ApprocheNarrative } from "./narrative";
import { FAQ_ITEMS } from "./narrative/data";

export const metadata: Metadata = {
  title: "Approche, Prestations & Tarifs — Audit IA dès 550 € | PME 78/95",
  description:
    "Méthode 360° en 4 piliers (technique, process, humain, vision) + audits 180° offert et 360° à 550 €. Pas de jargon, plan d'action concret. PME Yvelines & Val d'Oise.",
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  provider: {
    "@type": "LocalBusiness",
    name: "augmenter.PRO",
    url: "https://augmenter.pro",
  },
  serviceType: "Conseil en transformation digitale et IA",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Yvelines (78)" },
    { "@type": "AdministrativeArea", name: "Val d'Oise (95)" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations augmenter.PRO",
    itemListElement: [
      {
        "@type": "Offer",
        name: "Audit 180° Informatique & Organisation",
        description:
          "Échange de 60 min pour identifier vos leviers de croissance numériques. Sans engagement.",
        price: "0",
        priceCurrency: "EUR",
        url: "https://augmenter.pro/contact",
      },
      {
        "@type": "Offer",
        name: "Audit 360° IA Stratégique",
        description:
          "Diagnostic complet de 3h couvrant infrastructure, workflows et équipes. Livrable : plan d'action chiffré et priorisé.",
        price: "550",
        priceCurrency: "EUR",
        url: "https://augmenter.pro/contact",
      },
      {
        "@type": "Offer",
        name: "Développement sur mesure",
        description:
          "Applications, automatisations et intégrations IA conçues pour votre métier.",
      },
      {
        "@type": "Offer",
        name: "Formation & Accompagnement",
        description:
          "Ateliers IA pour dirigeants, formation outils collaboratifs, conduite du changement.",
      },
      {
        "@type": "Offer",
        name: "Conseil Stratégique",
        description:
          "Benchmark concurrentiel, choix technologiques, roadmap transformation digitale.",
      },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function ApprochePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ApprocheNarrative />
    </>
  );
}
