import type { Metadata } from "next";
import { ARTICLES } from "@/data/resources";
import { AugmenterView } from "./augmenter-view";

const SITE = "https://augmenter.pro";
const PATH = "/augmenter-mon-entreprise";

export const metadata: Metadata = {
  title: "Augmenter mon entreprise : par où commencer",
  description:
    "Dis-nous ton secteur et ce qui te coûte le plus : on te sort nos articles, idées chiffrées et prompts en TL;DR. Pour décider et agir, pas pour scroller.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Augmenter mon entreprise : par où commencer | augmenter.PRO",
    description:
      "Tu te méfies des promesses creuses et tu manques de temps ? Dis-nous où tu en es — on te sort les bonnes ressources IA, le verdict en une phrase.",
    url: `${SITE}${PATH}`,
    type: "website",
  },
};

// CollectionPage + ItemList : carte structurée des ressources, citable par les
// LLMs et signal de maillage interne fort (toutes les destinations en un endroit).
const itemListElement = [
  ...ARTICLES.map((a, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE}/blog/${a.slug}`,
    name: a.title,
  })),
  {
    "@type": "ListItem",
    position: ARTICLES.length + 1,
    url: `${SITE}/idees`,
    name: "Idées PRO — cas d'usage IA chiffrés par secteur",
  },
  {
    "@type": "ListItem",
    position: ARTICLES.length + 2,
    url: `${SITE}/prompts`,
    name: "Bibliothèque de prompts IA pour dirigeants de PME",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${SITE}${PATH}#webpage`,
  url: `${SITE}${PATH}`,
  name: "Augmenter mon entreprise",
  description:
    "Un point d'entrée unique pour les dirigeants de PME : choisissez votre secteur, votre douleur du moment et votre objectif, et accédez aux ressources augmenter.PRO (articles, idées chiffrées, prompts) qui y répondent, résumées en TL;DR.",
  inLanguage: "fr-FR",
  isPartOf: { "@id": `${SITE}/#website` },
  about: { "@type": "Thing", name: "Transformation IA et digitale des PME" },
  publisher: { "@id": `${SITE}/#organization` },
  mainEntity: {
    "@type": "ItemList",
    name: "Ressources augmenter.PRO filtrées par secteur et douleur du dirigeant",
    numberOfItems: itemListElement.length,
    itemListElement,
  },
};

export default function AugmenterMonEntreprisePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AugmenterView />
    </>
  );
}
