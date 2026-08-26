import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PromptLibrary } from "./prompt-library";
import { prompts, categories } from "@/data/prompts";

export const metadata: Metadata = {
  title: "Prompts ChatGPT & Claude pour PME — Prêts à l'Emploi",
  description: `${prompts.length} prompts ChatGPT et Claude testés en PME : commercial, marketing, ERP Odoo, cybersécurité. Copie, colle et adapte à ton entreprise en 2 minutes.`,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Prompts ChatGPT & Claude pour PME",
  description:
    "Bibliothèque de prompts ChatGPT, Claude et Gemini prêts à l’emploi pour dirigeants de PME. Commercial, productivité, marketing, ERP Odoo, stratégie IA et cybersécurité.",
  url: "https://augmenter.pro/prompts",
  inLanguage: "fr-FR",
  publisher: {
    "@type": "Organization",
    name: "augmenter.PRO",
    url: "https://augmenter.pro",
  },
  author: {
    "@type": "Person",
    name: "Pierre Legrand",
    url: "https://pierrelegrand.fr",
  },
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: prompts.length,
    itemListElement: prompts.map((prompt, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: prompt.title,
        description: prompt.description,
        genre:
          categories.find((c) => c.id === prompt.category)?.label ??
          prompt.category,
        inLanguage: "fr-FR",
        author: {
          "@type": "Person",
          name: "Pierre Legrand",
        },
      },
    })),
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Comment utiliser ces prompts dans ChatGPT, Claude ou Gemini ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Copiez le prompt, remplacez les champs entre [crochets] par les informations de votre entreprise, puis collez-le dans ChatGPT, Claude ou Gemini. Les prompts sont indépendants du modèle : la structure (rôle, contexte, tâche, format de sortie) fait le travail, quel que soit l'outil.",
      },
    },
    {
      "@type": "Question",
      name: "Pourquoi un prompt structuré change-t-il la réponse ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Parce qu'un modèle d'IA ne devine pas votre contexte : sans rôle d'expert, sans données d'entrée et sans format de sortie imposé, il produit une réponse générique. Chaque prompt de cette bibliothèque embarque ces quatre éléments (structure R-C-F-T : Rôle, Contexte, Format, Tâche), plus les questions de relance qu'un consultant poserait.",
      },
    },
    {
      "@type": "Question",
      name: "Quel prompt choisir selon votre situation ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Six catégories couvrent les fonctions clés d'une PME : Commercial & Vente (prospection, objections), Productivité (réunions, rapports), Marketing (contenu, réseaux sociaux), ERP & Outils Métier (Odoo, CRM), Stratégie IA (audit, ROI) et Cybersécurité (NIS2, incidents). Commencez par la douleur la plus coûteuse en temps ou en marge.",
      },
    },
  ],
};

export default function PromptsPage() {
  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PromptLibrary />

      {/* Éditorial — server-rendered pour donner du contenu indexable à la page */}
      <section className="border-t border-border/40 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Comment utiliser ces prompts dans ChatGPT, Claude ou Gemini ?
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Copiez le prompt, remplacez les champs entre [crochets] par les
            informations de votre entreprise, puis collez-le dans ChatGPT,
            Claude ou Gemini : la structure fait le reste. Chaque prompt est
            indépendant du modèle — le même texte fonctionne dans les trois
            outils, y compris dans leurs versions sans abonnement. Comptez 2 minutes
            d&apos;adaptation, montre en main :
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-muted-foreground">
            <li>
              <strong className="text-foreground">Copiez</strong> le prompt avec
              le bouton dédié (ou téléchargez le fichier .md pour le garder dans
              vos outils).
            </li>
            <li>
              <strong className="text-foreground">Personnalisez</strong> les
              champs entre [crochets] : votre secteur, vos chiffres, votre
              contexte. Plus c&apos;est précis, meilleure est la réponse.
            </li>
            <li>
              <strong className="text-foreground">Itérez</strong> : la première
              réponse est un brouillon de travail. Répondez aux questions que
              l&apos;IA vous pose, corrigez, précisez.
            </li>
          </ol>

          <h2 className="mt-12 text-2xl font-bold tracking-tight sm:text-3xl">
            Pourquoi un prompt structuré change-t-il la réponse ?
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Parce qu&apos;un modèle d&apos;IA ne devine pas votre contexte :
            sans rôle d&apos;expert, sans données d&apos;entrée et sans format
            de sortie imposé, il produit une réponse générique — celle que
            reçoivent tous vos concurrents. Si vos essais avec ChatGPT ont
            accouché de textes creux bons à jeter, ce n&apos;est pas la faute du
            modèle : c&apos;est le prompt.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Chaque prompt de cette bibliothèque embarque les quatre éléments qui
            font la différence — un rôle d&apos;expert, votre contexte métier,
            une tâche précise et un format de sortie exploitable (la structure
            dite R-C-F-T) — plus les questions de relance qu&apos;un consultant
            poserait avant de vous répondre. C&apos;est la même logique que nous
            détaillons dans{" "}
            <Link
              href="/blog/claude-code-prompt-architecture"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              l&apos;architecture d&apos;un prompt Claude Code
            </Link>{" "}
            et dans{" "}
            <Link
              href="/blog/ia-contradicteur-prompts-dirigeant-pme"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              les prompts contradicteur pour dirigeant
            </Link>
            .
          </p>

          <h2 className="mt-12 text-2xl font-bold tracking-tight sm:text-3xl">
            Quel prompt choisir selon votre situation ?
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Les {prompts.length} prompts couvrent six fonctions clés d&apos;une
            PME : {categories.map((c) => c.label).join(", ")}. Commencez par la
            douleur qui vous coûte le plus cher en temps ou en marge — une
            relance commerciale qui traîne, un compte rendu de réunion jamais
            rédigé, un processus Odoo à automatiser. Pour auditer un projet
            avant d&apos;y engager du budget, le{" "}
            <Link
              href="/blog/prompt-audit-projet-claude-fable"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              prompt d&apos;audit de projet
            </Link>{" "}
            est le meilleur point d&apos;entrée. Et si vous préférez partir de
            votre situation plutôt que d&apos;un catalogue, le{" "}
            <Link
              href="/augmenter-mon-entreprise"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              hub Augmenter mon entreprise
            </Link>{" "}
            filtre toutes nos ressources par secteur, douleur et objectif.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Ces prompts ne sortent pas d&apos;un blog américain traduit : ce
            sont ceux que Pierre Legrand utilise en mission chez des PME
            françaises, ajustés au fil des retours terrain. Ils sont
            téléchargeables librement, sans inscription ni carte bancaire.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Besoin d&apos;un{" "}
              <span className="gradient-text">prompt sur mesure</span> ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ces prompts sont un point de départ. Pour des solutions IA
              adaptées à vos processus métier, parlons-en.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Discutons de votre projet
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/approche#prestations">Voir nos prestations</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
