import { articleMetadata } from "@/lib/article-metadata";
import { ArticleLayout } from "@/components/layout/article-layout";
import { Memo } from "@/components/article/memo";
import { Callout } from "@/components/article/callout";
import { KeyTakeaways } from "@/components/article/key-takeaways";
import Link from "next/link";

export const metadata = articleMetadata({
  title: "Odoo 20 et son serveur MCP : ce qui change, ce qui manque",
  description:
    "Odoo 20 livre un serveur MCP et des agents IA. Ce que la version fait vraiment, ce qu'elle ne fait pas encore, et la question à poser avant de brancher.",
  slug: "odoo-20-serveur-mcp-agents",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Odoo 20 a-t-il un serveur MCP natif ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Les notes de version d'Odoo 20 annoncent une connexion à la base par MCP (Model Context Protocol). Sur la pré-version testée en septembre 2026, il s'agit d'un module standard qui expose un point d'accès /mcp, protégé par une clé API à portée MCP ou par OAuth 2.1, avec Claude, ChatGPT et Grok comme clients autorisés par défaut.",
      },
    },
    {
      "@type": "Question",
      name: "Le serveur MCP d'Odoo 20 peut-il écrire dans la base ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sur la pré-version, les outils exposés par défaut sont en lecture seule : modèles, champs, recherche, regroupement. Un administrateur peut exposer une action serveur de son choix, y compris en écriture. L'agent agit alors avec les droits de l'utilisateur qui a donné la clé. Ce point est à vérifier sur la version finale.",
      },
    },
    {
      "@type": "Question",
      name: "Les agents IA d'Odoo 20 sont-ils payants ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Les notes de version indiquent que toutes les fonctions d'IA consomment des crédits achetés via IAP, et qu'Odoo choisit automatiquement le modèle selon la tâche une fois le fournisseur sélectionné. Sur le catalogue officiel, le service Odoo AI se vend 1 € le crédit, en packs de 10 à 1 000 crédits sans remise de volume, avec 20 crédits de départ. Odoo ne publie pas combien de crédits consomme une question.",
      },
    },
  ],
};

export default function Article() {
  return (
    <ArticleLayout
      title="Odoo 20 ouvre la porte aux agents : ce qui change, et ce qu'il manque encore"
      excerpt="Votre ERP parle enfin aux IA. Odoo 20 livre un serveur MCP, des agents qui créent et modifient des enregistrements, et une édition de produit assistée. Reste la question que personne ne pose sur scène : qui empêche l'agent de dire n'importe quoi à votre client ?"
      tags={["IA", "PME"]}
      readTime="5 min"
      date="14 octobre 2026"
      dateISO="2026-10-14"
      image="/images/blog/odoo-20-serveur-mcp-agents.webp"
      slug="odoo-20-serveur-mcp-agents"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <p>
        Si vous êtes sur Odoo, vous avez vu passer l&apos;annonce : la version
        20, présentée à Bruxelles fin septembre, met l&apos;IA au centre. Un
        serveur MCP pour « connecter Odoo à tout », des agents qui créent et
        modifient des enregistrements, une édition de produit par IA depuis la
        boutique. Votre intégrateur vous en parlera au prochain rendez-vous,
        avec un devis.
      </p>
      <p>
        Nous construisons depuis août 2026 un serveur MCP pour Odoo, testé sur
        un pilote en cours. Nous avons donc lu les notes de version et les
        premiers tests de la pré-version avec un intérêt très précis : qu&apos;est-ce
        qu&apos;Odoo fait désormais tout seul, et qu&apos;est-ce qu&apos;il
        reste à faire pour confier un agent à une équipe de vente ? Voici la
        réponse, sans enjoliver dans un sens ni dans l&apos;autre.
      </p>

      <h2>Ce qu&apos;Odoo 20 fait vraiment</h2>
      <p>
        Les notes de version officielles annoncent une connexion à la base de
        données par MCP sous le titre « Connect Odoo to anything ». Sur la{" "}
        <Memo type="idea" label="Pré-version 20.0 testée en sept. 2026">
          pré-version Enterprise testée fin septembre
        </Memo>
        , c&apos;est un module standard qui expose un point d&apos;accès{" "}
        <code>/mcp</code> sur votre base. Deux façons d&apos;y entrer : une clé
        API à portée « MCP » (une clé RPC classique est refusée) ou un flux OAuth
        2.1, avec claude.ai, chatgpt.com et grok.com comme clients autorisés par
        défaut.
      </p>
      <p>
        Les outils exposés sont génériques : lister les modèles, lire les
        champs, chercher, regrouper. Sur la pré-version, ils sont{" "}
        <Memo type="idea" label="Lecture seule par défaut">
          tous en lecture seule
        </Memo>
        . Un administrateur peut cocher « disponible dans MCP » sur une action
        serveur de son choix, y compris en écriture. L&apos;agent agit alors{" "}
        <strong>avec les droits de l&apos;utilisateur qui a donné la clé</strong>
        : règles d&apos;enregistrement, sociétés, droits sur les champs.
      </p>
      <p>
        À côté du serveur, les agents IA d&apos;Odoo 20 créent des
        enregistrements (y compris à partir d&apos;un PDF d&apos;instructions),
        les mettent à jour, se déclenchent par des actions automatisées ou
        planifiées, et demandent une confirmation par bouton quand ils
        atteignent leur limite d&apos;appels d&apos;outils. Deux détails
        comptent pour votre budget :{" "}
        <Memo type="num" label="Crédits IAP obligatoires">
          toutes les fonctions d&apos;IA consomment des crédits IAP
        </Memo>
        , et Odoo choisit le modèle à votre place une fois le fournisseur
        sélectionné.
      </p>
      <p>
        Le prix, lui, est affiché. Sur le{" "}
        <a
          href="https://iap.odoo.com/iap/in-app-services/867"
          target="_blank"
          rel="noreferrer"
        >
          catalogue officiel
        </a>
        , le service Odoo AI se vend{" "}
        <Memo type="num" label="1 € le crédit, sans remise">
          1 € le crédit, en packs de 10 à 1 000, sans remise de volume
        </Memo>
        , avec 20 crédits de départ. Ce qui n&apos;est pas affiché, c&apos;est
        combien de crédits consomme une question : « selon la fonction, la
        complexité de la tâche et la taille de la demande ». Un agent qui
        travaille bien appelle beaucoup d&apos;outils. Plus il est utile, plus
        il décompte.
      </p>
      <p>
        Sources : les{" "}
        <a
          href="https://www.odoo.com/odoo-20-release-notes"
          target="_blank"
          rel="noreferrer"
        >
          notes de version Odoo 20
        </a>{" "}
        et le{" "}
        <a
          href="https://octurasolutions.com/resources/odoo-20-mcp-server-connect-claude-chatgpt-any-client"
          target="_blank"
          rel="noreferrer"
        >
          test de la pré-version par Octura
        </a>{" "}
        (19 septembre 2026). Les noms et menus peuvent bouger avant la version
        générale ; nous mettrons cet article à jour quand la documentation
        développeur sera publiée.
      </p>

      <h2>Ce que ça change pour une PME</h2>
      <p>
        C&apos;est une très bonne nouvelle, et nous le disons sans réserve. Le
        sujet « brancher une IA sur mon ERP » sort des conférences pour
        devenir une case à cocher. Si vos questions tiennent dans « montre-moi
        ce champ », « combien de devis ce mois-ci », le serveur natif suffit,
        et vous n&apos;avez besoin de personne.
      </p>
      <p>
        Mais regardez ce que ces trois faits disent ensemble : des outils
        génériques, les droits de celui qui a donné la clé, des agents qui
        écrivent. Le dirigeant qui branche Claude sur son Odoo avec sa propre
        clé donne à un modèle de langage{" "}
        <strong>la lecture de ses marges, de ses salaires et de sa
        comptabilité</strong>, et, dès qu&apos;il expose une action
        d&apos;écriture, le droit de modifier une fiche. Rien dans le
        protocole n&apos;empêche le modèle de citer un stock qu&apos;il
        n&apos;a pas lu.
      </p>

      <Callout>
        <p>
          <strong>À retenir.</strong> Le serveur MCP d&apos;Odoo 20 est un
          tuyau, et un bon tuyau. Il ne décide pas ce qui passe dedans. La
          question qui compte pour votre équipe n&apos;est pas « l&apos;IA
          peut-elle lire mon ERP ? » mais « qui l&apos;empêche de dire
          n&apos;importe quoi, et de l&apos;écrire ? ».
        </p>
      </Callout>

      <h2>Ce qui manque encore, et que nous avons dû construire</h2>
      <p>
        Sur notre pilote, les cinq manques sont apparus dans cet ordre, et
        chacun a coûté une décision d&apos;architecture écrite.
      </p>
      <ul>
        <li>
          <strong>Des outils qui parlent le métier, pas le schéma.</strong>{" "}
          « Le dossier de ce client », « mon chiffre d&apos;affaires de la
          semaine », « ce produit, son prix, son stock libre ». Avec des outils
          par intention, le modèle n&apos;a pas à connaître Odoo, et{" "}
          <Link href="/blog/petit-modele-bien-outille">
            un petit modèle suffit
          </Link>
          .
        </li>
        <li>
          <strong>Des garde-fous dans le code, pas dans le prompt.</strong>{" "}
          Aucun de nos outils n&apos;a de paramètre prix, coût ou validation de
          commande, et{" "}
          <Memo type="idea" label="Test de schéma : aucun paramètre prix">
            un test compare le schéma des outils à chaque livraison
          </Memo>
          . Détail dans{" "}
          <Link href="/blog/agent-ia-qui-ne-touche-pas-aux-prix">
            l&apos;agent qui ne peut pas toucher aux prix
          </Link>
          .
        </li>
        <li>
          <strong>Un chiffre vérifié avant d&apos;être cité.</strong> Un
          nombre que l&apos;agent cite et qu&apos;aucun outil n&apos;a rendu
          est repéré par du code. La réponse est bloquée, pas envoyée. Sur le
          pilote, chaque chiffre d&apos;affaires par vendeur a été{" "}
          <Memo type="num" label="Recoupé au centime dans Odoo">
            recoupé au centime dans Odoo
          </Memo>{" "}
          avant d&apos;ouvrir l&apos;outil à l&apos;équipe.
        </li>
        <li>
          <strong>L&apos;écriture qui s&apos;arrête au brouillon.</strong>{" "}
          Devis, demande de prix, proposition de type produit : l&apos;agent
          prépare, un humain appuie sur le bouton. Chaque écriture garde la
          valeur d&apos;avant et s&apos;annule d&apos;une commande.
        </li>
        <li>
          <strong>Un coût qui ne grimpe pas avec l&apos;usage.</strong> Nos
          réponses sont rédigées par un modèle ouvert qui tourne sur une
          machine équipée d&apos;une bonne carte graphique, chez le client ou
          chez nous, administrée à distance. Zéro crédit à la question, et
          aucune donnée qui sort pour répondre à une question de stock. Le
          calcul complet :{" "}
          <Link href="/blog/cout-agent-ia-odoo">
            crédits, abonnements ou une machine à vous
          </Link>
          .
        </li>
      </ul>
      <p>
        Une limite honnête : ces garde-fous ont un prix en souplesse. Un
        dirigeant qui veut qu&apos;un agent modifie des prix en masse la nuit
        ne trouvera pas ça chez nous, et c&apos;est voulu. Si c&apos;est votre
        besoin, le serveur natif avec une action d&apos;écriture exposée fera
        l&apos;affaire, à condition de savoir qui relit le lendemain matin.
      </p>

      <h2>La complémentarité, en une phrase</h2>
      <p>
        Le serveur MCP d&apos;Odoo 20 peut devenir, demain, une des façons dont
        nos outils parlent à Odoo. Aujourd&apos;hui ils passent par l&apos;API
        JSON-2 d&apos;Odoo 19, sans une ligne de Python dans votre instance,
        donc{" "}
        <Link href="/blog/odoo-online-ce-que-vous-ne-pouvez-pas-installer">
          compatible Odoo Online
        </Link>
        . Le tuyau changera peut-être. Ce qui passe dedans, des outils métier,
        des garde-fous, un modèle qui tourne chez vous et un humain qui garde la
        main, c&apos;est ça que nous vendons.
      </p>

      <KeyTakeaways title="Avant de brancher Odoo 20 sur une IA">
        <ul>
          <li>
            Créez une clé MCP sur un <strong>utilisateur dédié</strong> aux
            droits réduits, jamais sur le compte administrateur.
          </li>
          <li>
            Restez en <strong>lecture seule</strong> tant que vous n&apos;avez
            pas recoupé une semaine de réponses avec l&apos;écran Odoo.
          </li>
          <li>
            Consommez les <strong>20 crédits de départ</strong> sur une
            semaine réelle avant d&apos;acheter un pack : c&apos;est la seule
            façon de connaître votre consommation. Puis comparez avec une
            machine à vous, qui ne décompte rien à la question.
          </li>
          <li>
            Si l&apos;agent doit parler à vos clients ou préparer des devis,
            regardez{" "}
            <Link href="/serveur-mcp-odoo">
              ce que notre serveur MCP pour Odoo ajoute
            </Link>
            , et ce qu&apos;il refuse.
          </li>
        </ul>
      </KeyTakeaways>

      <p>
        Vous êtes sur Odoo et vous ne savez pas si le serveur natif suffit à
        votre cas ? Soixante minutes pour regarder votre instance et choisir
        trois questions, sans engagement :{" "}
        <Link href="/contact">prenez rendez-vous</Link>.
      </p>
    </ArticleLayout>
  );
}
