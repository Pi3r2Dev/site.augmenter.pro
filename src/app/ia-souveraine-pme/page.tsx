import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Clock,
  Database,
  HardDrive,
  Network,
  Route,
  Shield,
  ShieldCheck,
  X,
} from "lucide-react";
import { CTA } from "@/components/sections/cta";
import { ShaderBackdrop } from "@/components/widgets/shader-backdrop";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "IA souveraine PME : tes données restent chez toi",
  description:
    "Tes équipes collent déjà des contrats dans ChatGPT ? Modèles ouverts hébergés sur une infra qu'on administre, ou chez toi. Ce qui sort, ce qui reste.",
  alternates: { canonical: "https://augmenter.pro/ia-souveraine-pme" },
};

/**
 * Landing « IA souveraine ».
 *
 * Angle assumé : la souveraineté n'est pas un absolu, c'est un **routage**.
 * La page vend une décision (quoi part où), pas du matériel — et refuse
 * explicitement le discours « tout en interne », qui ne tient ni techniquement
 * ni économiquement pour une PME de dix personnes.
 *
 * ⚠️ Ne jamais nommer les modèles exacts qui tournent sur notre flotte, ni
 * employer les termes techniques qui les entourent : un dirigeant qui les
 * cherche tombe sur des pages qui l'inquiètent au lieu de le rassurer.
 * ⚠️ Registre : tutoiement (page commerciale, cf. charte éditoriale §3.3).
 */

const NIVEAUX = [
  {
    niveau: "01",
    titre: "Le compte perso de ton collaborateur",
    realite:
      "Aucun contrôle. Ce qui est collé dans la fenêtre part chez l'éditeur, et peut servir à améliorer le service selon les conditions du compte.",
    verdict: "risque",
  },
  {
    niveau: "02",
    titre: "Un abonnement professionnel avec engagement de non-entraînement",
    realite:
      "Une protection contractuelle, pas technique. Elle vaut ce que vaut le contrat — et elle ne dit rien de l'endroit où la donnée transite.",
    verdict: "partiel",
  },
  {
    niveau: "03",
    titre: "Un modèle d'éditeur hébergé en Europe",
    realite:
      "L'hébergement est européen, l'éditeur ne l'est pas toujours. C'est déjà sérieux pour la majorité des usages, et souvent suffisant.",
    verdict: "partiel",
  },
  {
    niveau: "04",
    titre: "Un modèle ouvert sur une infrastructure administrée",
    realite:
      "Le seul niveau où la donnée ne quitte pas un périmètre que quelqu'un contrôle vraiment. Ni le plus rapide, ni le moins cher — le plus étanche.",
    verdict: "etanche",
  },
];

const ETAPES = [
  {
    num: "01",
    titre: "Voir ce qui sort déjà",
    detail:
      "Avant de parler d'hébergement : qui utilise quoi, avec quels documents. La réponse surprend presque toujours le dirigeant.",
  },
  {
    num: "02",
    titre: "Trier tes documents par sensibilité",
    detail:
      "Une plaquette commerciale et un protocole transactionnel ne demandent pas le même traitement. Trois niveaux suffisent.",
  },
  {
    num: "03",
    titre: "Router, pas tout interdire",
    detail:
      "L'ordinaire chez l'éditeur, le sensible sur une infra administrée. C'est la décision qui fait 90 % du résultat, et elle ne coûte pas un serveur.",
  },
  {
    num: "04",
    titre: "Internaliser si le volume le justifie",
    detail:
      "Seulement là, et seulement si les chiffres le disent. On te dira quand ce n'est pas le cas.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Un modèle ouvert est-il moins bon que ChatGPT ou Claude ?",
    answer:
      "Sur un usage général et ouvert, les grands modèles d'éditeurs restent devant — c'est honnête de le dire. Mais la question posée est rarement la bonne. Sur une tâche cadrée et branchée sur tes vraies données (retrouver une clause, chiffrer depuis ton catalogue, rapprocher deux documents), un modèle ouvert correctement outillé fait le travail. Un grand modèle mal branché sur tes données perdra contre un modèle modeste bien branché, à tous les coups.",
  },
  {
    question: "Est-ce que je dois acheter des serveurs ?",
    answer:
      "Non, dans la grande majorité des cas. Deux options existent : le modèle tourne sur une infrastructure que nous administrons et que tu utilises comme un service, ou il est installé chez toi si tu veux tout garder en interne. L'infogérance rend les deux tenables aujourd'hui. Acheter du matériel n'a de sens qu'à partir d'un certain volume, et nous te dirons quand tu n'y es pas.",
  },
  {
    question: "Mes données servent-elles à entraîner un modèle ?",
    answer:
      "Sur une infrastructure que nous administrons avec des modèles ouverts : non, il n'y a aucun mécanisme d'entraînement sur tes contenus. Sur un modèle d'éditeur, cela dépend de ton contrat et de l'offre souscrite — et c'est précisément la question que nous posons avant de brancher quoi que ce soit, plutôt qu'après.",
  },
  {
    question: "L'AI Act européen m'oblige-t-il à quelque chose ?",
    answer:
      "Selon l'usage, oui : information des personnes, traçabilité des décisions, documentation des systèmes considérés à risque. La plupart des usages de PME (rédaction, recherche documentaire, chiffrage assisté) relèvent d'obligations légères, mais elles ne sont pas nulles — et le RGPD, lui, s'applique déjà pleinement aux données que tu envoies. Nous t'indiquons ce qui te concerne pendant le diagnostic.",
  },
  {
    question: "Combien de temps avant de voir un résultat ?",
    answer:
      "La cartographie de ce qui sort déjà de ton entreprise se fait en un rendez-vous. Le routage — quoi part où — se décide dans la foulée. Le déploiement d'un modèle sur une infrastructure administrée se compte en jours, pas en trimestres. C'est le tri de tes documents, côté métier, qui prend le plus de temps.",
  },
  {
    question: "Le premier rendez-vous est-il payant ?",
    answer:
      "Non. Les 60 minutes ne sont pas facturées, à trois conditions : tu diriges une PME ou tu es indépendant, tu as un sujet précis, et tu comptes faire quelque chose de la réponse. Si ton sujet sort de ce qu'on sait faire, on te le dit dans les dix premières minutes.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "IA souveraine pour PME",
  description:
    "Mise en place d'assistants IA sur des modèles ouverts hébergés sur une infrastructure administrée, ou installés chez le client. Cartographie des données qui sortent de l'entreprise, classement par sensibilité, routage entre modèle ouvert et modèle éditeur, conformité RGPD et AI Act.",
  provider: {
    "@type": "Organization",
    "@id": "https://augmenter.pro/#organization",
  },
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "AdministrativeArea", name: "Yvelines (78)" },
    { "@type": "AdministrativeArea", name: "Val d'Oise (95)" },
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "PME et indépendants",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Audit 180° — cartographie des données qui sortent",
      price: "0",
      priceCurrency: "EUR",
      eligibleCustomerType: "http://purl.org/goodrelations/v1#Business",
      description:
        "Échange de 60 minutes pour identifier ce qui sort déjà de ton entreprise et décider du routage. Non facturé pour les PME et indépendants ayant un projet identifié, sur rendez-vous.",
      url: "https://augmenter.pro/contact",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function IaSouverainePmePage() {
  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative isolate overflow-hidden py-24">
        <ShaderBackdrop mood="dawn" opacity={0.6} className="-z-10" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              IA souveraine pour PME
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              L&apos;IA, <span className="gradient-text">sans envoyer tes
              données</span> n&apos;importe où
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Pendant que tu te demandes si tu vas t&apos;y mettre, quelqu&apos;un
              dans ton équipe a déjà collé un contrat client dans une fenêtre de
              chat. La vraie question n&apos;est plus{" "}
              <strong>« est-ce qu&apos;on utilise l&apos;IA ? »</strong> mais{" "}
              <strong>« qu&apos;est-ce qui sort, et vers où ? »</strong>
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Diagnostic 180° — 60 min
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/integration-mcp">Brancher l&apos;IA sur mes outils</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <Clock className="mb-0.5 inline h-3.5 w-3.5" /> Visio partout en
              France · présentiel 78 &amp; 95 — sur rendez-vous, sans engagement
            </p>
          </div>
        </div>
      </section>

      {/* La douleur, frontale */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ce qui sort déjà de ton entreprise, sans que personne l&apos;ait
              décidé
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Ça ne commence jamais par une décision. Ça commence par une
              commerciale pressée qui demande à une IA de reformuler une
              proposition — avec les prix dedans. Par un chef d&apos;atelier qui
              lui fait résumer un procès-verbal de chantier. Par toi, un
              dimanche soir, qui lui fais relire un courrier d&apos;avocat.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Aucune de ces personnes n&apos;a de mauvaise intention. Elles font
              leur travail plus vite. Le problème n&apos;est pas la malveillance
              d&apos;un éditeur : c&apos;est que{" "}
              <strong className="text-foreground">
                personne chez toi ne sait ce qui est parti
              </strong>
              , ni où, ni sous quelles conditions.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: Database,
                  titre: "Tes prix d'achat",
                  texte:
                    "Dans un devis reformulé, la marge est lisible entre les lignes.",
                },
                {
                  icon: Network,
                  titre: "Tes fichiers clients",
                  texte:
                    "Un export « juste pour trier » et la base est sortie du périmètre.",
                },
                {
                  icon: Shield,
                  titre: "Tes dossiers sensibles",
                  texte:
                    "Contentieux, dossiers de personnel, protocoles : le pire moment pour improviser.",
                },
              ].map((item) => (
                <Card key={item.titre} className="h-full">
                  <CardContent className="p-6">
                    <item.icon className="h-5 w-5 text-primary" />
                    <h3 className="mt-3 text-base font-semibold">
                      {item.titre}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.texte}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Démystification : quatre niveaux */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              « Souverain » veut dire quatre choses différentes
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Le mot est devenu un argument de vente. Voici les quatre niveaux
              réels, du plus exposé au plus étanche — et pourquoi le dernier
              n&apos;est pas toujours celui qu&apos;il te faut.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-4">
            {NIVEAUX.map((n) => (
              <div
                key={n.niveau}
                className="flex flex-col gap-4 rounded-2xl border border-border p-6 sm:flex-row sm:items-start"
              >
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-2xl font-bold text-muted-foreground/50">
                    {n.niveau}
                  </span>
                  {n.verdict === "risque" && (
                    <X className="h-5 w-5 shrink-0 text-destructive" />
                  )}
                  {n.verdict === "partiel" && (
                    <AlertTriangle className="h-5 w-5 shrink-0 text-[oklch(0.828_0.189_84.429)]" />
                  )}
                  {n.verdict === "etanche" && (
                    <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {n.titre}
                  </h3>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">
                    {n.realite}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-3xl text-center text-lg leading-relaxed">
            <strong>
              La souveraineté n&apos;est pas un absolu, c&apos;est un routage.
            </strong>{" "}
            Vouloir tout passer au niveau 4 coûte cher et ralentit tout le monde.
            Laisser tout au niveau 1 finit par coûter beaucoup plus.
          </p>
        </div>
      </section>

      {/* Les deux régimes */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Deux régimes, et c&apos;est toi qui choisis
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Dans les deux cas, la question est posée avant la première ligne de
              code, pas après.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <Card className="h-full border-primary/30">
              <CardContent className="p-8">
                <HardDrive className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  Modèle ouvert, chez nous ou chez toi
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Hébergé sur une infrastructure que nous administrons et que tu
                  utilises comme un service, ou installé dans tes murs si tu veux
                  tout garder en interne.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    "Aucun entraînement sur tes contenus",
                    "La donnée ne quitte pas le périmètre administré",
                    "Coût prévisible, sans facturation à l'usage",
                    "Le bon choix pour les dossiers que tu n'enverrais à personne",
                  ].map((li) => (
                    <li key={li} className="flex items-start gap-2 text-sm">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        strokeWidth={3}
                      />
                      {li}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardContent className="p-8">
                <Route className="h-6 w-6 text-muted-foreground" />
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                  Modèle d&apos;éditeur, quand c&apos;est le bon outil
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Quand tu veux la puissance d&apos;un grand modèle, on le
                  branche — et on te dit ce qui transite, ce qui est conservé, et
                  ce qui n&apos;entraîne aucun modèle.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    "La meilleure qualité brute sur les tâches ouvertes",
                    "Conditions contractuelles lues et expliquées, pas survolées",
                    "Réservé aux contenus que tu acceptes de voir sortir",
                    "Basculable : ce qui est branché ici peut passer là-bas",
                  ].map((li) => (
                    <li key={li} className="flex items-start gap-2 text-sm">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground"
                        strokeWidth={3}
                      />
                      {li}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Preuve : notre propre flotte */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              On ne t&apos;explique pas la souveraineté en théorie
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Notre propre travail tourne sur des modèles ouverts, sur des
              machines que nous administrons : conversation et lecture
              d&apos;images, recherche sémantique dans nos documents,
              transcription de réunions, génération d&apos;images. Un routeur
              décide, requête par requête, ce qui reste chez nous et ce qui part
              chez un éditeur — parce que dans certains cas, l&apos;éditeur reste
              le bon outil.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Ce n&apos;est pas une démonstration montée pour cette page :
              c&apos;est l&apos;infrastructure sur laquelle nous travaillons tous
              les jours, avec les pannes, les arbitrages de mémoire et les
              limites que ça implique.{" "}
              <strong className="text-foreground">
                C&apos;est aussi pour ça qu&apos;on peut te dire quand ça ne vaut
                pas le coup.
              </strong>
            </p>

            <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6">
              <h3 className="text-base font-semibold">
                Ce qu&apos;on ne te racontera pas
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Qu'un modèle ouvert égale un grand modèle d'éditeur sur tous les usages. C'est faux.",
                  "Qu'il suffit d'acheter une carte graphique. La machine n'est jamais le poste le plus coûteux : c'est l'exploitation.",
                  "Que tout doit être internalisé. Pour la majorité des PME, un bon routage suffit et coûte dix fois moins.",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-2.5 text-sm leading-relaxed">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-destructive" strokeWidth={3} />
                    {li}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Par où commencer */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Par crans, jamais d&apos;un coup
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Aucune de ces étapes ne demande d&apos;acheter quoi que ce soit
              avant la troisième.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e) => (
              <Card key={e.num} className="h-full">
                <CardContent className="p-6">
                  <span className="gradient-text text-2xl font-extrabold leading-none">
                    {e.num}
                  </span>
                  <h3 className="mt-3 text-base font-semibold">{e.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {e.detail}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Questions de dirigeants
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={item.question} value={`item-${i}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CTA />
    </div>
  );
}
