import { articleMetadata } from "@/lib/article-metadata";
import { ArticleLayout } from "@/components/layout/article-layout";
import { Memo } from "@/components/article/memo";
import { Callout } from "@/components/article/callout";
import { KeyTakeaways } from "@/components/article/key-takeaways";
import Link from "next/link";

export const metadata = articleMetadata({
  title: "Odoo Online : ce que vous ne pourrez jamais y installer",
  description:
    "Vous payez un abonnement Odoo Online et votre intégrateur dit « impossible ». Il a raison sur un point, tort sur quatre. Les contournements qui marchent vraiment.",
  slug: "odoo-online-ce-que-vous-ne-pouvez-pas-installer",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Peut-on installer un module personnalisé sur Odoo Online ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non, pas un module contenant du code Python. Odoo Online (l'offre SaaS) n'accepte que les modules du catalogue officiel. Restent quatre voies : Odoo Studio, les actions serveur dans leur bac à sable, les modules « data-only » (vues XML, JavaScript, SCSS) importés en ZIP, et tout ce qui tourne à l'extérieur en parlant à Odoo par son API, un serveur MCP par exemple. Studio et l'API externe sont réservés au plan Custom (44,90 € par utilisateur et par mois en annuel, contre 24,90 € en Standard) : sur le Standard, la première étape est un changement de plan, pas une migration.",
      },
    },
    {
      "@type": "Question",
      name: "Un serveur MCP fonctionne-t-il avec Odoo Online ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, à condition qu'il tourne à l'extérieur d'Odoo, parle à l'instance par son API (JSON-2 sur Odoo 19) et que l'abonnement soit sur le plan Custom, le seul qui ouvre l'API externe. Il n'y a rien à installer dans Odoo. Odoo 20 ajoute par ailleurs son propre serveur MCP natif.",
      },
    },
  ],
};

export default function Article() {
  return (
    <ArticleLayout
      title="Odoo Online : ce que vous ne pourrez jamais y installer (et les quatre contournements qui marchent)"
      excerpt="Vous payez un abonnement Odoo Online, vous demandez une petite fonction, et votre intégrateur répond « impossible sur le SaaS ». Il a raison sur un point précis, et tort sur quatre autres. Ce que nous avons appris en cinq mois sur une instance Online, dont un module refusé par la plateforme."
      tags={["IA", "PME"]}
      readTime="5 min"
      date="14 octobre 2026"
      dateISO="2026-10-14"
      image="/images/blog/odoo-online-ce-que-vous-ne-pouvez-pas-installer.webp"
      slug="odoo-online-ce-que-vous-ne-pouvez-pas-installer"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <p>
        C&apos;est une scène que nous avons vécue de l&apos;intérieur. Un
        dirigeant demande une chose raisonnable : afficher le franco de port du
        fournisseur avant de valider une commande d&apos;achat. Petit
        développement, pense-t-il. Réponse de l&apos;intégrateur : « Vous êtes
        sur Odoo Online, on ne peut pas installer de module. Il faudrait migrer
        sur Odoo.sh. » Devis de migration joint.
      </p>
      <p>
        La phrase est vraie. La conclusion ne l&apos;est pas. Nous avons passé
        cinq mois sur l&apos;instance Online d&apos;une PME de négoce technique
        en Île-de-France, et nous avons appris, parfois en payant, ce qui passe
        et ce qui ne passe pas. Voici la carte.
      </p>

      <h2>Ce qui est vraiment impossible</h2>
      <p>
        <Memo type="idea" label="Aucun Python custom sur Odoo Online">
          Aucun module contenant du code Python ne s&apos;installe sur Odoo
          Online
        </Memo>
        . Pas un petit, pas un « juste pour ce calcul ». La plateforme
        n&apos;accepte que les modules du catalogue officiel. Nous avons
        soumis un module de calcul de frais de livraison ; il a été refusé,
        comme prévu. C&apos;est la règle du SaaS, et elle ne se négocie pas.
      </p>
      <p>
        Ce que ça interdit concrètement : une logique métier qui s&apos;exécute
        dans Odoo au moment d&apos;une action (recalculer un prix à la
        validation, bloquer une commande sous condition complexe, parler à un
        service externe depuis le serveur Odoo). Tout ce qui demande du Python
        côté serveur.
      </p>

      <h2>Avant tout : regardez votre plan</h2>
      <p>
        C&apos;est la vérification que personne ne fait, et elle change tout.
        Odoo Online se vend en deux plans payants. Sur la{" "}
        <a
          href="https://www.odoo.com/fr_FR/pricing-plan"
          target="_blank"
          rel="noreferrer"
        >
          page tarifs
        </a>
        , le Standard coûte 24,90 € par utilisateur et par mois en annuel, le
        Custom 44,90 €. Et{" "}
        <Memo type="idea" label="Studio et API : plan Custom">
          Studio, l&apos;API externe et l&apos;IA agentique ne sont ouverts
          que sur le Custom
        </Memo>
        . Si votre intégrateur dit « impossible » et que vous êtes sur le
        Standard, la réponse n&apos;est peut-être pas une migration vers Odoo.sh,
        mais un changement de plan, bien moins coûteux. Les voies n°1 et n°4
        ci-dessous en dépendent.
      </p>

      <h2>Les quatre contournements qui marchent</h2>
      <ul>
        <li>
          <strong>1. Odoo Studio.</strong> Champs, vues, automatisations
          simples, rapports. Inclus dans le plan Custom, sans code, et
          suffisant pour une bonne part des demandes « impossibles ». Sa
          limite : tout ce qui est calculé doit rester simple, et un champ
          calculé non stocké ne se filtre pas dans les vues. Nous l&apos;avons
          appris en cassant un filtre.
        </li>
        <li>
          <strong>2. Les actions serveur, dans leur bac à sable.</strong> Un
          Python restreint, exécuté par Odoo, déclenché à la main ou par une
          automatisation. Pas de bibliothèque externe, pas d&apos;appel
          réseau, mais de quoi recalculer, copier, alerter. Le board
          d&apos;achat qui affiche le franco avant de commander a été construit
          comme ça, en{" "}
          <Memo type="num" label="~8 h 30 pour le board d'achat">
            environ 8 h 30 cumulées
          </Memo>
          , conception et décision d&apos;architecture comprises.
        </li>
        <li>
          <strong>3. Les modules « data-only ».</strong> Un ZIP qui contient
          des vues XML, du JavaScript et du style, sans Python, s&apos;importe
          sur Online. Nous avons livré ainsi un module qui patche un composant
          d&apos;interface natif pour afficher une information de stock en
          ligne. Piège vécu : un ZIP créé sous Windows avec l&apos;outil
          standard met des barres obliques inversées dans les chemins et
          l&apos;import échoue. Créez le ZIP en Python ou sur Linux.
        </li>
        <li>
          <strong>4. Tout ce qui tourne à l&apos;extérieur.</strong> Un
          programme hors d&apos;Odoo qui lui parle par son API peut lire,
          créer, modifier, tout ce qu&apos;un utilisateur peut faire. Un
          serveur MCP, un script de nuit, un bot Telegram. Sur Odoo 19,
          c&apos;est l&apos;API JSON-2 ;{" "}
          <Memo type="idea" label="Rien à installer dans Odoo">
            rien à installer dans Odoo
          </Memo>
          . C&apos;est la voie par laquelle{" "}
          <Link href="/serveur-mcp-odoo">notre serveur MCP pour Odoo</Link>{" "}
          fonctionne sur Online, avec le plan Custom.
        </li>
      </ul>

      <Callout>
        <p>
          <strong>À retenir.</strong> « Impossible sur Odoo Online » veut
          dire « impossible <em>dans</em> Odoo ». Presque tout reste possible{" "}
          <em>autour</em> d&apos;Odoo, par Studio, par une action serveur ou
          par un programme externe. Avant de signer une migration, demandez
          laquelle des quatre voies a été essayée.
        </p>
      </Callout>

      <p>
        La voie n°4 a un second avantage, qui n&apos;a rien de technique : le
        coût. Avec Odoo 20, les fonctions d&apos;IA intégrées se paient en
        crédits, 1 € pièce, sans que la consommation par question soit
        publiée. Un programme externe choisit son modèle. Le nôtre tourne sur
        un modèle ouvert, sur une machine équipée d&apos;une bonne carte
        graphique administrée à distance, et{" "}
        <Link href="/blog/cout-agent-ia-odoo">
          ne décompte rien à la question
        </Link>
        .
      </p>

      <h2>Quand la migration vers Odoo.sh se justifie quand même</h2>
      <p>
        Nous ne vendons pas de migration, nous pouvons donc le dire sans
        intérêt : il y a des cas où elle est la bonne réponse. Une logique
        métier lourde qui doit s&apos;exécuter au cœur de chaque transaction.
        Un connecteur transporteur maison, parce qu&apos;Odoo n&apos;a aucun
        connecteur natif pour Colissimo, Chronopost, DPD ou GLS, et qu&apos;un
        agrégateur ne convient pas à tout le monde. Une intégration qui doit
        appeler un service externe depuis le serveur Odoo, de façon synchrone.
      </p>
      <p>
        Dans ces cas-là, oui, Odoo.sh ou un serveur dédié. Mais ce sont des
        cas identifiables en une heure de discussion, pas une fatalité
        attachée à l&apos;abonnement. Sur cinq mois, nous n&apos;avons eu
        qu&apos;un seul vrai « impossible », le module de livraison, et il a
        trouvé une autre forme.
      </p>

      <KeyTakeaways title="Avant d'accepter un devis de migration">
        <ul>
          <li>
            Vérifiez votre <strong>plan</strong> : Standard ou Custom. Sur le
            Standard, ni Studio ni l&apos;API externe.
          </li>
          <li>
            Demandez si la fonction a été tentée avec <strong>Studio</strong>{" "}
            et avec une <strong>action serveur</strong>. Deux réponses « non »
            sont un signal.
          </li>
          <li>
            Si c&apos;est une question de lecture ou de préparation (devis,
            dossier client, stock), un <strong>programme externe</strong>{" "}
            par l&apos;API fait le travail sans toucher à Odoo.
          </li>
          <li>
            Exigez un <strong>rollback</strong> pour chaque chantier : la
            suppression des éléments Studio doit ramener l&apos;instance à son
            état d&apos;avant, sans rien de natif modifié.
          </li>
          <li>
            Gardez la migration pour la logique transactionnelle lourde et
            les connecteurs synchrones. Pas pour un affichage de franco.
          </li>
        </ul>
      </KeyTakeaways>

      <p>
        Pour la suite logique, ce qu&apos;Odoo 20 change à cette carte avec son
        serveur MCP natif :{" "}
        <Link href="/blog/odoo-20-serveur-mcp-agents">
          Odoo 20 ouvre la porte aux agents
        </Link>
        . Pour la voie n°4 en détail, piloter Odoo de l&apos;extérieur depuis
        Claude Code (RPC, navigateur, pièges) :{" "}
        <Link href="/blog/claude-code-odoo-workflow">
          le workflow technique Claude Code + Odoo
        </Link>
        . Et pour la méthode de départ sur un Odoo existant,{" "}
        <Link href="/blog/configurer-odoo-ia-claude-cowork">
          configurer Odoo avec l&apos;IA
        </Link>
        . Vous avez un « impossible » en attente sur votre Online ? Soixante
        minutes pour le regarder, sans engagement :{" "}
        <Link href="/contact">prenez rendez-vous</Link>.
      </p>
    </ArticleLayout>
  );
}
