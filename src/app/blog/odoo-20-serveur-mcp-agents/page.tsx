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
        text: "Oui. D'après la documentation officielle 20.0, un client compatible MCP (Claude Code, Claude Desktop, Codex…) se connecte à l'adresse /mcp de la base avec une clé API statique à portée MCP, créée dans les préférences d'un utilisateur. Il agit avec les droits de cet utilisateur. L'IA agentique et l'API externe sont réservées au plan Custom.",
      },
    },
    {
      "@type": "Question",
      name: "Le serveur MCP d'Odoo 20 peut-il écrire dans la base ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. La documentation officielle liste 27 outils MCP, dont deux d'écriture dans la base : Create Records et Update Records, qui met à jour tous les enregistrements correspondant à un filtre. Le statut lecture seule de chaque outil n'y est qu'une suggestion, et la page ne dit pas lesquels sont actifs par défaut. L'agent agit avec les droits de l'utilisateur qui a créé la clé.",
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
        20, disponible depuis fin septembre, met l&apos;IA au centre. Un
        serveur MCP pour « connecter Odoo à tout », des agents qui créent et
        modifient des enregistrements, une édition de produit par IA depuis la
        boutique. Votre intégrateur vous en parlera au prochain rendez-vous,
        avec un devis.
      </p>
      <p>
        Nous construisons depuis août 2026 un serveur MCP pour Odoo, testé sur
        un pilote en cours. Nous avons donc lu les notes de version et la
        documentation officielle avec un intérêt très précis : qu&apos;est-ce
        qu&apos;Odoo fait désormais tout seul, et qu&apos;est-ce qu&apos;il
        reste à faire pour confier un agent à une équipe de vente ? Voici la
        réponse, sans enjoliver dans un sens ni dans l&apos;autre.
      </p>

      <h2>Ce qu&apos;Odoo 20 fait vraiment</h2>
      <p>
        Odoo 20 est disponible depuis fin septembre, et sa{" "}
        <a
          href="https://www.odoo.com/documentation/20.0/applications/productivity/ai/mcp_server.html"
          target="_blank"
          rel="noreferrer"
        >
          documentation officielle
        </a>{" "}
        décrit le serveur MCP sans ambiguïté. Un client compatible (Claude
        Code, Claude Desktop, Codex…) se connecte à l&apos;adresse{" "}
        <code>/mcp</code> de votre base avec une clé API statique, créée dans
        les préférences d&apos;un utilisateur avec une portée « MCP » et une
        durée de validité. Le client agit{" "}
        <strong>avec les droits de l&apos;utilisateur qui a créé la clé</strong>
        . Si c&apos;est le compte administrateur, l&apos;agent a les droits de
        l&apos;administrateur.
      </p>
      <p>
        Ce que l&apos;agent peut faire est listé sur la page des{" "}
        <a
          href="https://www.odoo.com/documentation/20.0/applications/productivity/ai/mcp_server/mcp_tools.html"
          target="_blank"
          rel="noreferrer"
        >
          outils MCP disponibles
        </a>{" "}
        :{" "}
        <Memo type="num" label="27 outils MCP natifs">
          27 outils
        </Memo>
        , génériques. Lister les modèles et leurs champs, chercher, regrouper,
        ouvrir une vue, faire une recherche web. Et{" "}
        <Memo type="idea" label="Écriture native : Update Records">
          deux outils d&apos;écriture dans la base
        </Memo>
        : « Create Records » et « Update Records », ce dernier mettant à jour
        tous les enregistrements qui correspondent à un filtre. La page précise
        que le statut « lecture seule » de chaque outil est une{" "}
        <em>suggestion</em>. Elle ne dit pas lesquels sont actifs par défaut.
        La pré-version testée en septembre par{" "}
        <a
          href="https://octurasolutions.com/resources/odoo-20-mcp-server-connect-claude-chatgpt-any-client"
          target="_blank"
          rel="noreferrer"
        >
          Octura
        </a>{" "}
        n&apos;en exposait que cinq, en lecture. Vérifiez sur votre base, pas
        sur un blog.
      </p>
      <p>
        À côté du serveur, les{" "}
        <a
          href="https://www.odoo.com/documentation/20.0/applications/productivity/ai/agents.html"
          target="_blank"
          rel="noreferrer"
        >
          agents IA
        </a>{" "}
        d&apos;Odoo 20 lisent, créent et mettent à jour des enregistrements, se
        déclenchent par des actions automatisées ou planifiées, et s&apos;appuient
        sur vos documents. Le{" "}
        <a
          href="https://www.odoo.com/documentation/20.0/applications/productivity/ai/live-chat.html"
          target="_blank"
          rel="noreferrer"
        >
          chat IA du site
        </a>
        , lui, reste modeste : son seul outil documenté est la création
        d&apos;une piste commerciale, rien sur le prix, le stock ou les devis.
      </p>
      <p>
        Trois détails comptent pour votre budget. D&apos;abord,{" "}
        <Memo type="num" label="Plan Custom requis">
          l&apos;IA agentique et l&apos;API externe sont réservées au plan
          Custom
        </Memo>{" "}
        (44,90 € par utilisateur et par mois en annuel, contre 24,90 € pour le
        Standard, sur la{" "}
        <a
          href="https://www.odoo.com/fr_FR/pricing-plan"
          target="_blank"
          rel="noreferrer"
        >
          page tarifs
        </a>
        ). Ensuite, toutes les fonctions d&apos;IA intégrées consomment des
        crédits, et Odoo choisit le modèle à votre place. Enfin, le prix de ces
        crédits est affiché : sur le{" "}
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
        La documentation annonce aussi une page sur les clés d&apos;API
        d&apos;IA propres, encore en construction au 14 octobre. C&apos;est
        elle qui dira si l&apos;on pourra brancher son propre modèle sur les
        agents d&apos;Odoo. Nous mettrons cet article à jour quand elle sera
        publiée.
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
        génériques, les droits de celui qui a créé la clé, un outil qui
        écrit. Le dirigeant qui branche Claude sur son Odoo avec sa propre
        clé donne à un modèle de langage{" "}
        <strong>la lecture de ses marges, de ses salaires et de sa
        comptabilité</strong>, et, si « Update Records » est actif, le droit
        de modifier en une fois toutes les fiches qui correspondent à un
        filtre, prix compris. Rien dans le
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
          valeur d&apos;avant et s&apos;annule d&apos;une commande. Le cas du
          catalogue, verrou par verrou :{" "}
          <Link href="/blog/ia-enrichir-catalogue-sans-perdre-la-main">
            laisser une IA enrichir votre catalogue sans perdre la main
          </Link>
          .
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
        </Link>{" "}
        sur le plan Custom, le même que celui qu&apos;exige l&apos;IA agentique
        d&apos;Odoo 20. Le tuyau changera peut-être. Ce qui passe dedans, des outils métier,
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
            Restez en <strong>lecture seule</strong> : retirez « Create
            Records » et « Update Records » des outils exposés tant que vous
            n&apos;avez pas recoupé une semaine de réponses avec l&apos;écran
            Odoo.
          </li>
          <li>
            Vérifiez votre <strong>plan</strong> : sans le plan Custom, ni
            l&apos;IA agentique ni l&apos;API externe ne sont ouvertes.
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
