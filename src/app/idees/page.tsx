import type { Metadata } from "next";
import { IdeesView } from "./idees-view";

export const metadata: Metadata = {
  title: "Idées IA pour PME : 15 cas d'usage qui facturent en 2026",
  description:
    "15 idées IA chiffrées par secteur — immobilier, courtage, BTP, notariat, commerce, outils PME. Avantages ET points d'attention, sources, ROI mesurable.",
  alternates: {
    canonical: "https://augmenter.pro/idees",
  },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://augmenter.pro/idees#collection",
  url: "https://augmenter.pro/idees",
  name: "Idées IA pour PME : 15 cas d'usage qui facturent en 2026",
  description:
    "Catalogue de 15 cas d'usage IA générateurs de revenus ou d'économies mesurables, classés par secteur (immobilier, courtage, BTP, notariat, commerce, outils PME).",
  inLanguage: "fr-FR",
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://augmenter.pro/#website",
  },
  about: [
    { "@type": "Thing", name: "Intelligence artificielle" },
    { "@type": "Thing", name: "Automatisation PME" },
    { "@type": "Thing", name: "Transformation digitale" },
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Dirigeant de PME française",
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 15,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Voicebot qui décroche tous vos appels (immobilier)",
        description:
          "Agent vocal IA 24/7 qui qualifie acheteur/vendeur, pousse la fiche au CRM et déclenche la relance.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Annonces immo SEO en 30 secondes",
        description:
          "Génération automatique d'annonces portails + SEO Google + posts sociaux à partir des caractéristiques du bien.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Pré-scoring dossier emprunteur en 30 secondes (courtage)",
        description:
          "Analyse documentaire (bulletins, avis d'imposition, relevés), calcul capacité/endettement, GO/NO-GO instantané.",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Pipeline courtier + relances bancaires auto",
        description:
          "CRM courtier IA avec relances mail/SMS conditionnelles et génération de courriers banque.",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Devis chantier depuis 5 photos (BTP rénovation)",
        description:
          "Devis structuré (postes, métrés, MaPrimeRénov, CEE) généré à partir de photos + description vocale.",
        url: "https://augmenter.pro/blog/machine-de-guerre-commerciale",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Extraction d'actes notariés + ébauche de clauses",
        description:
          "IA souveraine lit avant-contrats, contrats de réservation, offres de prêt et crée dossier + clauses standard.",
      },
      {
        "@type": "ListItem",
        position: 7,
        name: "Agent WhatsApp réservation + gestion avis Google",
        description:
          "Bot WhatsApp pour RDV hors heures d'ouverture + analyse et réponse aux avis Google.",
      },
      {
        "@type": "ListItem",
        position: 8,
        name: "Reconfigurer Odoo en 4 jours avec Claude Cowork",
        description:
          "Configuration Studio + packages Odoo en 4 jours plutôt que 3 500 € de prestation intégrateur. Équipe ressort autonome.",
        url: "https://augmenter.pro/blog/configurer-odoo-ia-claude-cowork",
      },
      {
        "@type": "ListItem",
        position: 9,
        name: "Veille concurrentielle automatisée",
        description:
          "Surveillance auto de 5-10 concurrents locaux : prix, recrutements, posts sociaux. Alertes ciblées et synthèse hebdo.",
        url: "https://augmenter.pro/blog/veille-concurrentielle-ia-pme",
      },
      {
        "@type": "ListItem",
        position: 10,
        name: "Bot Telegram de gestion (IA + RAG + email)",
        description:
          "Assistant Telegram branché sur vos données (RAG docs/CRM/compta) et votre mail : relances, résumés et requêtes depuis le téléphone.",
        url: "https://augmenter.pro/blog/agent-ia-dirigeant-pme",
      },
      {
        "@type": "ListItem",
        position: 11,
        name: "Standard vocal IA avec votre voix de marque",
        description:
          "Standard téléphonique IA 24/7 avec voix clonée sur la vôtre : renseigne, qualifie, prend les RDV et transfère les appels chauds.",
      },
      {
        "@type": "ListItem",
        position: 12,
        name: "Vision intelligente de chantier (OmniVision)",
        description:
          "Modèle de vision sur caméras : détection EPI manquants et zones à risque, suivi d'avancement, comptage matériel, alerte temps réel.",
      },
      {
        "@type": "ListItem",
        position: 13,
        name: "Base de connaissance IA interne (anti patron-goulot)",
        description:
          "Assistant entraîné sur vos procédures et historique : l'équipe se sert seule, le savoir sort de la tête du dirigeant.",
        url: "https://augmenter.pro/blog/patron-goulot-paradoxe-ia-dirigeant-pme",
      },
      {
        "@type": "ListItem",
        position: 14,
        name: "Copilote cybersécurité PME",
        description:
          "Surveillance des signaux faibles, explication du risque en français et réponse guidée — sans SOC à cinq chiffres. Aide NIS2.",
        url: "https://augmenter.pro/blog/cybersecurite-pme-guide-pratique",
      },
      {
        "@type": "ListItem",
        position: 15,
        name: "Pré-compta : lecture des factures fournisseurs (OCR + IA)",
        description:
          "Lecture des factures fournisseurs, extraction montants/TVA/échéances, poussée en compta et détection des anomalies.",
      },
    ],
  },
};

export default function IdeesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <IdeesView />
    </>
  );
}
