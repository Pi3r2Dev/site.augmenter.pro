import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Ban,
  Check,
  Clock,
  Coins,
  Cpu,
  CreditCard,
  Database,
  Sparkles,
  FileCheck,
  Lock,
  MessageSquare,
  Search,
  ShieldCheck,
  Wrench,
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
import { pageOpenGraph } from "@/lib/page-metadata";

const TITLE = "Serveur MCP pour Odoo : ce qu'Odoo 20 ne fait pas";
const DESCRIPTION =
  "Odoo 20 facture l'IA en crédits. Notre serveur MCP tourne sur un modèle ouvert chez toi : zéro crédit à la question, aucun prix modifiable.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://augmenter.pro/serveur-mcp-odoo" },
  openGraph: pageOpenGraph({
    title: TITLE,
    description: DESCRIPTION,
    path: "/serveur-mcp-odoo",
  }),
};

/**
 * Landing « Serveur MCP pour Odoo ».
 *
 * Angle assumé : Odoo 20 a rendu le sujet grand public en livrant son propre
 * serveur MCP. On ne dénigre pas (ton sympathique, cf. terrain-iacommerce §6),
 * on marque la différence : un tuyau générique d'un côté, des outils métier,
 * des garde-fous dans le code et un humain qui garde la main de l'autre.
 *
 * ⚠️ Confidentialité (terrain-iacommerce §2) : pas de nom de produit, pas de
 * prix de gamme, pas de chiffre du pilote. « Un pilote en cours », rien de plus.
 * ⚠️ Registre : tutoiement (page commerciale, charte §3.3).
 * ⚠️ Odoo 20 : les détails du MCP natif viennent de la pré-version testée en
 * septembre 2026 — à relire quand la documentation développeur sort.
 */

const ODOO_20_DONNE = [
  {
    odoo: "Un serveur MCP générique : modèles, champs, recherche, regroupement",
    nous: "Des outils par intention : « le dossier de ce client », « mon chiffre d'affaires de la semaine », « ce produit, son prix, son stock libre »",
    pourquoi:
      "Le modèle n'a pas besoin de connaître le schéma d'Odoo. Un petit modèle suffit, parce que l'outil répond juste.",
  },
  {
    odoo: "Les droits de l'utilisateur qui a donné la clé",
    nous: "Des garde-fous dans le code : aucun outil n'a de paramètre prix ou coût, l'écriture s'arrête au brouillon",
    pourquoi:
      "Un agent qui ne peut pas changer un tarif, même si on le lui demande. Un test compare le schéma des outils à chaque livraison.",
  },
  {
    odoo: "Des agents qui créent et modifient des enregistrements",
    nous: "Un chiffre vérifié par du code avant de partir, une écriture tracée et annulable",
    pourquoi:
      "Réponse sourcée, ou pas de réponse. Un nombre qu'aucun outil n'a rendu est repéré avant d'atteindre ton équipe.",
  },
  {
    odoo: "L'édition de produit par IA, prix compris, depuis la boutique",
    nous: "Un enrichissement proposé, validé par un humain, tracé, annulable, sur une liste fermée de champs",
    pourquoi:
      "Ta donnée catalogue reste sous contrôle. Tu sais qui a validé quoi, quand, et tu peux tout annuler d'une commande.",
  },
  {
    odoo: "Des crédits IA à 1 € pièce, chez les fournisseurs de modèles choisis par Odoo, sans dire combien en consomme une question",
    nous: "Un modèle ouvert sur une machine chez toi, ou que nous administrons à distance : zéro crédit à la question",
    pourquoi:
      "Ton coût ne grimpe pas avec l'usage. Et ta comptabilité, tes marges, tes clients ne sortent pas de tes murs pour répondre à une question de stock.",
  },
  {
    odoo: "L'interface d'Odoo et les clients MCP du marché (Claude, ChatGPT)",
    nous: "Les canaux du métier : Telegram pour l'équipe, y compris en vocal, le site pour tes clients, avec identification",
    pourquoi:
      "L'équipe pose sa question là où elle est déjà, au comptoir ou en tournée. Le client aussi.",
  },
];

const GARDE_FOUS = [
  {
    icon: Ban,
    titre: "Aucun paramètre prix, coût ou validation de commande",
    texte:
      "Ce n'est pas une consigne dans un prompt, c'est le schéma des outils. Un test automatique le compare à chaque version : si un paramètre prix apparaît, la livraison est refusée.",
  },
  {
    icon: FileCheck,
    titre: "L'écriture s'arrête au brouillon",
    texte:
      "Devis, demande de prix, proposition de type produit : l'agent prépare, un humain appuie sur « Créer le brouillon ». Rien ne part chez un client sans une main sur le bouton.",
  },
  {
    icon: ShieldCheck,
    titre: "Chaque chiffre cité est vérifié",
    texte:
      "Un montant, un stock, une date que l'agent n'a pas obtenus d'un outil sont repérés par du code avant d'atteindre ton équipe. Le modèle ne peut pas inventer un chiffre d'affaires.",
  },
  {
    icon: Lock,
    titre: "Un conteneur par client, jamais de mutualisation",
    texte:
      "Tes données ne partagent ni une base ni un processus avec celles d'une autre entreprise. Le modèle peut tourner chez toi si c'est ce que tu veux.",
  },
];

const CE_QUI_TOURNE = [
  {
    icon: MessageSquare,
    titre: "Un bot Telegram pour l'équipe",
    texte:
      "Question écrite ou dictée (le vocal est transcrit en local), boutons de choix, photo du produit, devis en brouillon. Au comptoir, en tournée, sans ouvrir Odoo.",
  },
  {
    icon: Search,
    titre: "Un index local pour retrouver vite",
    texte:
      "Clients et références retrouvés en 31 ms mesurés, même avec une faute ou un pluriel. Prix et stock sont toujours relus en direct dans Odoo, jamais depuis une copie.",
  },
  {
    icon: Database,
    titre: "Un assistant client sur ton site",
    texte:
      "Il identifie le client par un code avant de parler de ses commandes. Il ne voit que les outils de son dossier, rien du reste de la base.",
  },
  {
    icon: Wrench,
    titre: "Compatible Odoo Online",
    texte:
      "Pas une ligne de Python dans ton Odoo. Le serveur parle à l'API JSON-2 d'Odoo 19, de l'extérieur. Ça marche sur l'offre en ligne où aucun module custom n'est installable.",
  },
];

const ETAPES = [
  {
    num: "01",
    titre: "Regarder ton Odoo tel qu'il est",
    detail:
      "Quels modules, quelle version, quelle offre (Online, .sh, sur serveur). Et surtout l'état des données : un agent ne rattrape pas 7 000 emplacements vides.",
  },
  {
    num: "02",
    titre: "Choisir trois questions",
    detail:
      "Celles que ton équipe pose dix fois par jour : ce client, ce produit, ce devis. Pas « l'IA dans l'ERP ». Trois outils, une semaine d'usage réel.",
  },
  {
    num: "03",
    titre: "Brancher en lecture, dans Telegram",
    detail:
      "L'équipe interroge Odoo depuis son téléphone. On recoupe chaque réponse dans Odoo pendant une semaine. Si un chiffre est faux, on le voit là, pas chez un client.",
  },
  {
    num: "04",
    titre: "Ouvrir l'écriture, au brouillon",
    detail:
      "Devis en brouillon, propositions catalogue validées en lot. Toujours un humain sur le bouton. Et un rollback à chaque chantier.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Odoo 20 a un serveur MCP. J'ai encore besoin de vous ?",
    answer:
      "Pour brancher Claude ou ChatGPT sur ton Odoo et poser des questions, non : la pré-version d'Odoo 20 expose un point d'accès MCP avec une clé API ou OAuth, et ça marche. Ce que ce serveur ne fait pas : des outils qui parlent ton métier (un dossier client, un chiffre d'affaires de la semaine), des garde-fous dans le code (aucun paramètre prix), un chiffre vérifié avant d'être cité, un modèle qui tourne chez toi, et Telegram pour l'équipe. Si tes questions tiennent dans « montre-moi ce champ », le serveur natif suffit. Si l'agent doit répondre à ton équipe ou à tes clients sans dire de bêtise, c'est là qu'on intervient.",
  },
  {
    question: "Est-ce que ça marche sur Odoo Online (l'offre SaaS) ?",
    answer:
      "Oui, et c'est fait pour. Odoo Online n'accepte aucun module Python custom. Notre serveur MCP tourne à l'extérieur et parle à Odoo par son API JSON-2, sans rien installer dedans. Odoo 19 et, d'après la pré-version, Odoo 20. Sur Odoo.sh ou sur serveur, ça marche aussi, avec plus de latitude.",
  },
  {
    question: "L'agent peut-il modifier un prix, valider une commande, envoyer un devis ?",
    answer:
      "Non, par construction. Aucun outil n'a de paramètre prix, coût ou validation de commande, et un test automatique compare le schéma des outils à chaque livraison. L'écriture s'arrête au brouillon : un devis en brouillon, une demande de prix en brouillon, une proposition de type produit en attente. C'est un humain qui appuie sur le bouton suivant.",
  },
  {
    question: "Mes données partent-elles chez un fournisseur de modèles ?",
    answer:
      "Pas forcément. Les réponses sont rédigées par un modèle ouvert qui peut tourner sur une infrastructure que nous administrons, ou chez toi. Un modèle plus petit classe chaque message. Aucun des deux n'a besoin d'un fournisseur américain. Si tu préfères un modèle d'éditeur pour certaines tâches, on le route, on ne le subit pas. Détail sur la page IA souveraine.",
  },
  {
    question: "Et si le modèle se trompe ?",
    answer:
      "Il se trompera, parfois. La question est ce qui se passe ensuite. Un chiffre qu'aucun outil n'a rendu est repéré par du code : la réponse est bloquée, pas envoyée. Une écriture garde la valeur d'avant, qui a validé, quand, avec quel modèle, et un lot entier s'annule d'une commande. Sur le pilote en cours, chaque capacité est recoupée au centime dans Odoo avant d'être ouverte à l'équipe.",
  },
  {
    question: "Pourquoi pas simplement les crédits IA d'Odoo 20 ?",
    answer:
      "Parce que c'est un compteur dont tu ne connais pas la vitesse. Le service Odoo AI se vend 1 € le crédit, en packs de 10 à 1 000, sans remise de volume, et Odoo ne publie pas combien de crédits consomme une question : ça dépend de la fonction et de la taille de la demande. Un agent utile appelle beaucoup d'outils, donc décompte beaucoup. Un modèle ouvert sur une machine à toi répond à autant de questions que la machine en absorbe, pour zéro euro à la question. Si ton équipe pose dix questions par mois, les crédits suffisent. Si elle s'en sert tous les jours, fais le calcul.",
  },
  {
    question: "Combien ça coûte et combien de temps ?",
    answer:
      "Un premier rendez-vous de 60 minutes n'est pas facturé : on regarde ton Odoo, l'état de tes données, la machine que tu as peut-être déjà, et on choisit trois questions. Côté matériel, une machine avec une carte graphique de 24 Go, le niveau qui répond juste sur un ERP, coûte de l'ordre de 2 000 à 2 500 € une fois ; une carte de 8 Go suffit pour commencer. Ensuite, zéro euro à la question. Le branchement en lecture sur Telegram se compte en jours, l'écriture au brouillon vient après une semaine de recoupement. Le devis sort du rendez-vous, parce que le prix dépend d'une chose qu'on ne connaît pas encore : l'état de tes données.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://augmenter.pro/serveur-mcp-odoo#service",
  name: "Serveur MCP pour Odoo",
  serviceType: "Intégration IA / serveur MCP pour ERP Odoo",
  description:
    "Serveur MCP métier pour Odoo (Online, .sh ou sur serveur), compatible Odoo 19 et Odoo 20 : outils par intention (dossier client, produit, devis, chiffre d'affaires), garde-fous dans le code (aucun paramètre prix, écriture limitée au brouillon), chiffres vérifiés par du code, modèle ouvert sur une machine chez le client administrée à distance (aucun crédit ni abonnement par siège à l'usage) ou hébergé en France, fine-tuning si nécessaire, bot Telegram pour l'équipe et assistant client identifié sur le site.",
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
    audienceType: "PME utilisatrices d'Odoo",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Audit 180° — ton Odoo, tes données, trois questions",
      price: "0",
      priceCurrency: "EUR",
      eligibleCustomerType: "http://purl.org/goodrelations/v1#Business",
      description:
        "Échange de 60 minutes pour regarder l'Odoo en place, l'état des données et choisir les trois premiers outils. Non facturé pour les PME ayant un projet identifié, sur rendez-vous.",
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

// Coût à l'usage — chiffres relevés le 2026-10-14 (sources affichées sous les
// cartes). Le matériel est un ordre de grandeur marché (carte 24 Go
// d'occasion), jamais un prix de gamme (terrain-iacommerce §2, 🟠).
const COUTS = [
  {
    icon: Coins,
    titre: "Crédits IA d'Odoo 20",
    prix: "1 € le crédit",
    texte:
      "Packs de 10 à 1 000, sans remise de volume. Combien de crédits par question ? Odoo ne le publie pas : ça dépend de la tâche et de la taille de la demande. Plus l'agent travaille, plus il décompte.",
    nous: false,
  },
  {
    icon: CreditCard,
    titre: "Abonnements par siège",
    prix: "20 à 25 $ / siège / mois",
    texte:
      "Claude Team, ChatGPT Business, ou Copilot à 21 $ HT plus la licence Microsoft 365. Dix personnes, 2 400 à 3 000 $ par an, qu'elles s'en servent ou non. Et rien n'est branché sur ton Odoo.",
    nous: false,
  },
  {
    icon: Cpu,
    titre: "Une machine chez toi",
    prix: "0 € à la question",
    texte:
      "Un modèle ouvert sur un ordinateur avec une bonne carte graphique, administré à distance. De l'ordre de 2 000 à 2 500 € de matériel une fois pour 24 Go, puis plus de compteur. Et tes données restent chez toi.",
    nous: true,
  },
];

const ARTICLES_ESSAIM = [
  {
    href: "/blog/cout-agent-ia-odoo",
    titre: "Agent IA sur Odoo : crédits, abonnements ou une machine à vous ?",
    duree: "6 min",
  },
  {
    href: "/blog/odoo-20-serveur-mcp-agents",
    titre: "Odoo 20 ouvre la porte aux agents : ce qui change, ce qu'il manque",
    duree: "5 min",
  },
  {
    href: "/blog/agent-ia-qui-ne-touche-pas-aux-prix",
    titre: "L'agent qui ne peut pas toucher aux prix",
    duree: "4 min",
  },
  {
    href: "/blog/petit-modele-bien-outille",
    titre: "Un petit modèle bien outillé bat un gros modèle qui devine",
    duree: "5 min",
  },
  {
    href: "/blog/ia-enrichir-catalogue-sans-perdre-la-main",
    titre: "Laisser une IA enrichir votre catalogue sans perdre la main",
    duree: "5 min",
  },
  {
    href: "/blog/odoo-online-ce-que-vous-ne-pouvez-pas-installer",
    titre: "Odoo Online : ce que vous ne pourrez jamais y installer",
    duree: "5 min",
  },
  {
    href: "/blog/logiciel-construit-par-agents-dix-semaines",
    titre: "Construire un logiciel avec des agents : dix semaines, 436 tâches",
    duree: "5 min",
  },
  {
    href: "/blog/claude-code-odoo-workflow",
    titre:
      "Claude Code et Odoo : le workflow technique pour piloter votre ERP sans module Python",
    duree: "11 min",
  },
];

export default function ServeurMcpOdooPage() {
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
              Serveur MCP pour Odoo · Odoo 19 &amp; 20 · Odoo Online compris
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Odoo 20 a son serveur MCP.{" "}
              <span className="gradient-text">
                Qui empêche l&apos;agent de dire n&apos;importe quoi ?
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Ton ERP parle enfin aux IA. Reste la question que personne ne pose
              sur scène : qui empêche l&apos;agent de citer un stock faux, de
              changer un prix, d&apos;envoyer un devis sans relecture ? Notre
              serveur MCP pour Odoo répond à ça. Des outils qui parlent ton
              métier, des garde-fous dans le code, un humain sur le bouton.
              Et pas de compteur : le modèle tourne sur une machine chez toi,{" "}
              <strong className="text-foreground">
                zéro crédit à la question
              </strong>
              .
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/contact">
                  Regarder mon Odoo — 60 min
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/blog/odoo-20-serveur-mcp-agents">
                  Ce qu&apos;Odoo 20 change, en 5 min
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <Clock className="mb-0.5 inline h-3.5 w-3.5" /> Visio partout en
              France · présentiel 78 &amp; 95 — sur rendez-vous, sans
              engagement
            </p>
          </div>
        </div>
      </section>

      {/* La douleur, frontale */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ce qui se passe quand on branche une IA sur un ERP sans
              garde-fous
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Le premier jour, c&apos;est magique. Ton commercial demande « le
              stock du filtre X » et la réponse tombe. Le troisième jour,
              l&apos;agent répond « 12 en stock » pour un produit qu&apos;il
              n&apos;a pas trouvé, parce que 12 est un nombre plausible. Le
              commercial promet au client. Le produit n&apos;existe pas sous ce
              nom.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Un modèle de langage ne ment pas, il complète. Branché sur un
              serveur générique avec tous les droits de celui qui a donné la
              clé, il complète <strong className="text-foreground">avec tes
              prix, tes marges et tes clients</strong>. Et personne ne sait
              après coup ce qu&apos;il a lu, ce qu&apos;il a inventé, ni ce
              qu&apos;il a écrit.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: X,
                  titre: "Le chiffre plausible",
                  texte:
                    "Un stock, un montant, une date que l'agent n'a pas lus mais qui « vont bien ». Le plus dangereux, parce qu'invisible.",
                },
                {
                  icon: X,
                  titre: "L'écriture sans trace",
                  texte:
                    "Un prix modifié, une description réécrite, et aucun moyen de savoir qui, quand, ni de revenir en arrière.",
                },
                {
                  icon: X,
                  titre: "Les droits de l'admin",
                  texte:
                    "La clé donnée par le dirigeant donne tout : marges, salaires, comptabilité. L'agent a les droits de celui qui l'a branché.",
                },
              ].map((item) => (
                <Card key={item.titre} className="h-full">
                  <CardContent className="p-6">
                    <item.icon className="h-5 w-5 text-destructive" />
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

      {/* Odoo 20 donne / nous ajoutons */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ce qu&apos;Odoo 20 fait tout seul, et ce qu&apos;on ajoute
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Odoo 20 est une bonne nouvelle : le sujet devient évident pour
              tout dirigeant. Voici, ligne par ligne, ce que le serveur natif
              donne et ce qui manque encore pour le confier à ton équipe.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="py-3 pr-4 font-semibold text-foreground">
                    Odoo 20 donne
                  </th>
                  <th className="py-3 pr-4 font-semibold text-primary">
                    Notre serveur MCP ajoute
                  </th>
                  <th className="py-3 font-semibold text-foreground">
                    Pourquoi ça compte pour toi
                  </th>
                </tr>
              </thead>
              <tbody className="align-top text-muted-foreground">
                {ODOO_20_DONNE.map((row) => (
                  <tr key={row.odoo} className="border-b border-border/50">
                    <td className="py-4 pr-4">{row.odoo}</td>
                    <td className="py-4 pr-4 font-medium text-foreground">
                      {row.nous}
                    </td>
                    <td className="py-4">{row.pourquoi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-sm text-muted-foreground">
            Le serveur MCP d&apos;Odoo 20 peut devenir, demain, une des façons
            dont nos outils parlent à Odoo. Notre valeur n&apos;est pas le
            tuyau, c&apos;est ce qui passe dedans. Détails de la version 20 et
            sources dans{" "}
            <Link
              href="/blog/odoo-20-serveur-mcp-agents"
              className="text-primary underline underline-offset-4"
            >
              l&apos;article dédié
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Coût à l'usage */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ce que ça coûte à l&apos;usage :{" "}
              <span className="gradient-text">le levier dont personne ne parle</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Un agent utile pose beaucoup de questions à ton ERP. Trois
              façons de les payer, et une seule qui ne grimpe pas avec
              l&apos;usage.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {COUTS.map((c) => (
              <Card
                key={c.titre}
                className={
                  c.nous ? "h-full border-2 border-primary" : "h-full"
                }
              >
                <CardContent className="flex h-full flex-col p-6">
                  <c.icon
                    className={
                      c.nous
                        ? "h-5 w-5 text-primary"
                        : "h-5 w-5 text-muted-foreground"
                    }
                  />
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {c.titre}
                  </p>
                  <p
                    className={
                      c.nous
                        ? "mt-1 text-2xl font-bold text-primary"
                        : "mt-1 text-2xl font-bold"
                    }
                  >
                    {c.prix}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {c.texte}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-5xl text-xs text-muted-foreground">
            Sources :{" "}
            <a
              href="https://iap.odoo.com/iap/in-app-services/867"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              catalogue officiel Odoo AI
            </a>
            ,{" "}
            <a
              href="https://claude.com/pricing"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              tarifs Claude Team
            </a>
            ,{" "}
            <a
              href="https://www.lemondeinformatique.fr/actualites/lire-microsoft-baisse-le-prix-de-m365%C2%A0copilot%C2%A0pour-les-pme-98552.html"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-2"
            >
              Copilot pour PME (Le Monde Informatique)
            </a>
            . Relevés le 14 octobre 2026.
          </p>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-primary/20 bg-background p-6">
              <Cpu className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-lg font-semibold">
                Une bonne carte graphique suffit pour commencer
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Tu as peut-être déjà la machine : un PC de joueur, un modèle
                téléchargé un dimanche pour voir. Une carte de 8 Go suffit pour
                classer, transcrire, résumer. Pour qu&apos;un agent réponde
                juste sur ton ERP, on vise 24 Go : sur nos essais, le modèle de
                9 milliards de paramètres inventait des chiffres, celui de 27
                milliards non.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">
                  On l&apos;administre à distance
                </strong>{" "}
                : mises à jour, supervision, sauvegardes. Tu n&apos;as personne
                à former pour ça. Et on monte en puissance quand l&apos;usage
                le demande, au coût d&apos;une machine, pas d&apos;un compteur.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-background p-6">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="mt-3 text-lg font-semibold">
                Et s&apos;il faut entraîner le modèle, on s&apos;y colle
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Le plus souvent, de bons outils suffisent et l&apos;entraînement
                est inutile. Quand un modèle doit parler un vocabulaire ou un
                ton très particulier, on l&apos;entraîne sur du matériel
                courant. On l&apos;a outillé pour le jury de chant de{" "}
                <a
                  href="https://kiaraoke.fr"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  kiaraoke.fr
                </a>
                , sur une carte de 8 Go, et pour tenir les personnages de notre
                chaîne de vidéos animées d&apos;un épisode à l&apos;autre.
              </p>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
            Le calcul complet, avec les tailles de carte et les cas où ce
            n&apos;est pas rentable :{" "}
            <Link
              href="/blog/cout-agent-ia-odoo"
              className="text-primary underline underline-offset-4"
            >
              crédits, abonnements ou une machine à toi
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Garde-fous */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Quatre garde-fous qui ne sont pas des promesses
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Un prompt qui dit « ne change jamais un prix » est une
              suggestion. Un schéma d&apos;outils sans paramètre prix, vérifié
              par un test, est une impossibilité.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {GARDE_FOUS.map((g) => (
              <Card key={g.titre} className="h-full border-primary/20">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <g.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{g.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {g.texte}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-5xl rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-muted-foreground">
            <strong className="text-foreground">La rigueur, en chiffres.</strong>{" "}
            Au 14 octobre 2026 : 5 794 tests automatisés au vert, 11 décisions
            d&apos;architecture écrites avec leurs options rejetées, et chaque
            capacité recoupée dans Odoo sur un pilote en cours avant
            d&apos;être ouverte à l&apos;équipe. Comment on construit ça :{" "}
            <Link
              href="/blog/logiciel-construit-par-agents-dix-semaines"
              className="text-primary underline underline-offset-4"
            >
              dix semaines, 436 tâches
            </Link>
            .
          </div>
        </div>
      </section>

      {/* Ce qui tourne */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ce qui tourne aujourd&apos;hui, pas sur une roadmap
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
            {CE_QUI_TOURNE.map((c) => (
              <Card key={c.titre} className="h-full">
                <CardContent className="p-6">
                  <c.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-3 text-lg font-semibold">{c.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.texte}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qu'on refuse */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ce qu&apos;on refuse de brancher en premier
          </h2>
          <ul className="mt-8 space-y-4">
            {[
              {
                titre: "Un agent qui parle à tes clients sans identification",
                texte:
                  "Notre assistant client demande un code avant d'ouvrir un dossier. Sans ça, n'importe qui lit les commandes de n'importe qui.",
              },
              {
                titre: "L'écriture directe dans Odoo",
                texte:
                  "Elle est fermée par défaut. Elle s'ouvre au brouillon, la nuit, sur une liste fermée de champs, avec un rollback. Jamais « l'agent modifie la fiche ».",
              },
              {
                titre: "Un agent sur des données non tenues",
                texte:
                  "Sur la mission qui a précédé ce produit, on a trouvé 7 346 emplacements de stock créés pour zéro article rangé dedans. Aucun agent ne rattrape ça. On commence par les données.",
              },
            ].map((item) => (
              <li
                key={item.titre}
                className="flex gap-4 rounded-2xl border border-border p-5"
              >
                <X className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div>
                  <p className="font-semibold">{item.titre}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.texte}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Étapes */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Comment on s&apos;y prend
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Quatre étapes, en lecture d&apos;abord. L&apos;écriture vient
              quand les chiffres ont été recoupés.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e) => (
              <div key={e.num}>
                <span className="font-mono text-2xl font-bold text-muted-foreground/50">
                  {e.num}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{e.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {e.detail}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Check className="h-4 w-4 text-primary" /> Odoo Online, Odoo.sh ou
            sur serveur
            <Check className="ml-4 h-4 w-4 text-primary" /> Odoo 19 aujourd&apos;hui,
            Odoo 20 dès sa sortie
            <Check className="ml-4 h-4 w-4 text-primary" /> Rollback livré à
            chaque chantier
          </div>
        </div>
      </section>

      {/* Essaim */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Huit lectures avant de décider
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              De quatre à onze minutes. Ce qu&apos;on a appris en construisant ce
              serveur, sans enjoliver.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES_ESSAIM.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-background p-5 transition-colors hover:border-primary/50"
              >
                <p className="font-semibold leading-snug group-hover:text-primary">
                  {a.titre}
                </p>
                <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {a.duree} de lecture
                  <ArrowRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Les questions qu&apos;on nous pose avant de brancher
          </h2>
          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={item.question} value={`q${i + 1}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    {item.answer}
                    {i === 3 && (
                      <>
                        {" "}
                        <Link
                          href="/ia-souveraine-pme"
                          className="text-primary underline underline-offset-4"
                        >
                          IA souveraine pour PME
                        </Link>
                        .
                      </>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Pour brancher l&apos;IA sur un CRM, des mails ou des documents hors
            Odoo :{" "}
            <Link
              href="/integration-mcp"
              className="text-primary underline underline-offset-4"
            >
              intégration MCP pour PME
            </Link>
            .
          </p>
        </div>
      </section>

      <CTA />
    </div>
  );
}
