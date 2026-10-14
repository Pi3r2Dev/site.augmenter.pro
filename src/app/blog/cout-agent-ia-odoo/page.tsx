import { articleMetadata } from "@/lib/article-metadata";
import { ArticleLayout } from "@/components/layout/article-layout";
import { Memo } from "@/components/article/memo";
import { Callout } from "@/components/article/callout";
import { PullQuote } from "@/components/article/pull-quote";
import { KeyTakeaways } from "@/components/article/key-takeaways";
import Link from "next/link";

export const metadata = articleMetadata({
  title: "Agent IA sur Odoo : crédits, abonnements ou une machine ?",
  description:
    "Odoo 20 facture l'IA 1 € le crédit, les abonnements se paient par siège. Un modèle ouvert sur une machine administrée à distance coûte zéro à la question.",
  slug: "cout-agent-ia-odoo",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coûtent les crédits IA d'Odoo 20 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sur le catalogue officiel des services Odoo (IAP), le service Odoo AI se vend 1 € le crédit, en packs de 10 à 1 000 crédits, sans remise de volume, avec 20 crédits de départ. Odoo ne publie pas combien de crédits consomme une question : la consommation varie selon la fonction, la complexité de la tâche et la taille de la demande.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle carte graphique faut-il pour faire tourner un agent IA sur Odoo en local ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Une carte de 8 Go fait tourner un petit modèle (4 à 9 milliards de paramètres) pour classer, transcrire ou résumer. Pour qu'un agent réponde juste sur les données d'un ERP, nous visons une carte de 24 Go, qui tient un modèle de 27 milliards de paramètres quantifié : sur nos essais, le modèle de 9 milliards inventait des chiffres là où le 27 milliards n'en inventait pas. Une carte de 16 Go ne tient pas le 27 milliards.",
      },
    },
    {
      "@type": "Question",
      name: "Faut-il fine-tuner un modèle pour l'utiliser sur Odoo ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rarement en premier. Un modèle ouvert qui reçoit des outils métier précis répond juste sans entraînement. Le fine-tuning (par exemple un adaptateur LoRA entraîné sur une carte grand public) sert quand le modèle doit adopter un vocabulaire, un ton ou un format très particulier, et se décide sur des erreurs mesurées.",
      },
    },
  ],
};

export default function Article() {
  return (
    <ArticleLayout
      title="Agent IA sur Odoo : crédits, abonnements ou une machine à vous ? Le vrai coût"
      excerpt="Odoo 20 facture chaque fonction d'IA en crédits à 1 € pièce, sans dire combien en consomme une question. Les assistants du marché se paient par siège, chaque mois, qu'on s'en serve ou non. Il existe une troisième voie, que beaucoup de dirigeants ont déjà commencée sans le savoir : un modèle ouvert sur une machine à eux."
      tags={["IA", "PME"]}
      readTime="6 min"
      date="14 octobre 2026"
      dateISO="2026-10-14"
      image="/images/blog/cout-agent-ia-odoo.webp"
      slug="cout-agent-ia-odoo"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <p>
        Quand on parle d&apos;agent IA sur un ERP, la conversation porte
        presque toujours sur ce qu&apos;il sait faire. Rarement sur ce
        qu&apos;il coûte à l&apos;usage, mois après mois, une fois que toute
        l&apos;équipe s&apos;en sert. C&apos;est pourtant là que les budgets
        dérapent : pas à l&apos;installation, mais au compteur.
      </p>
      <p>
        Trois façons de payer coexistent en 2026. Les crédits, que facture
        désormais Odoo. Les abonnements par siège, que facturent les assistants
        du marché. Et une machine à vous, qui fait tourner un modèle ouvert et
        ne facture rien à la question. Voici ce que chacune coûte vraiment,
        chiffres sourcés, et pourquoi la troisième est souvent la plus sous-estimée.
      </p>

      <h2>Odoo 20 : 1 € le crédit, et un compteur que personne ne publie</h2>
      <p>
        Avec Odoo 20, plus de clé API à saisir : toutes les fonctions d&apos;IA
        passent par le service d&apos;Odoo et se paient en crédits achetés à
        part. Sur le{" "}
        <a
          href="https://iap.odoo.com/iap/in-app-services/867"
          target="_blank"
          rel="noreferrer"
        >
          catalogue officiel des services Odoo
        </a>
        , le service Odoo AI se vend{" "}
        <Memo type="num" label="Odoo AI : 1 € le crédit">
          1 € le crédit
        </Memo>
        , en packs de 10 à 1 000 crédits, sans remise de volume, avec 20
        crédits de départ.
      </p>
      <p>
        Ce que la page ne dit pas, c&apos;est combien de crédits consomme une
        question. Elle indique seulement que{" "}
        <Memo type="idea" label="Consommation non publiée">
          la consommation varie selon la fonction, la complexité de la tâche et
          la taille de la demande
        </Memo>
        . Autrement dit, vous ne pouvez pas budgéter avant d&apos;avoir mesuré.
        Et un agent qui travaille bien, c&apos;est un agent qui appelle beaucoup
        d&apos;outils : plus il est utile, plus il décompte.
      </p>
      <p>
        Et ces crédits s&apos;ajoutent à l&apos;abonnement : l&apos;IA agentique
        n&apos;est ouverte que sur le{" "}
        <a
          href="https://www.odoo.com/fr_FR/pricing-plan"
          target="_blank"
          rel="noreferrer"
        >
          plan Custom
        </a>
        , à 44,90 € par utilisateur et par mois en annuel contre 24,90 € pour
        le Standard. Soyons justes : une connexion externe par API, comme la
        nôtre, demande le même plan. Ce surcoût ne départage donc pas les deux
        voies, mais il faut l&apos;avoir en tête avant de comparer.
      </p>

      <h2>Les abonnements par siège : on paie la présence, pas l&apos;usage</h2>
      <p>
        Les assistants du marché se vendent par utilisateur et par mois. Claude
        Team coûte{" "}
        <a href="https://claude.com/pricing" target="_blank" rel="noreferrer">
          20 $ par siège et par mois en annuel, 25 $ en mensuel
        </a>
        . ChatGPT Business se place dans le même ordre de grandeur. Microsoft
        365 Copilot pour les PME a été annoncé à{" "}
        <a
          href="https://www.lemondeinformatique.fr/actualites/lire-microsoft-baisse-le-prix-de-m365%C2%A0copilot%C2%A0pour-les-pme-98552.html"
          target="_blank"
          rel="noreferrer"
        >
          21 $ HT par utilisateur et par mois
        </a>
        , en plus de la licence Microsoft 365.
      </p>
      <p>
        Pour une équipe de dix, cela fait{" "}
        <Memo type="num" label="10 sièges ≈ 2 400 à 3 000 $ / an">
          2 400 à 3 000 $ par an
        </Memo>
        , chaque année, que les dix s&apos;en servent ou que trois seulement
        ouvrent la fenêtre. Et aucun de ces abonnements ne lit votre Odoo tel
        quel : il faut encore le brancher, et décider ce qui sort de chez vous.
      </p>
      <p>
        C&apos;est d&apos;ailleurs ce que fait le serveur MCP natif d&apos;Odoo
        20 : il laisse Claude, ChatGPT ou Codex lire votre base avec une clé
        API. Ce chemin-là ne décompte pas de crédits Odoo, mais il passe par
        l&apos;abonnement du client IA, donc par siège, et vos données sortent
        vers son éditeur pour être lues.
      </p>

      <h2>Une machine à vous : zéro à la question</h2>
      <p>
        La troisième voie est la moins visible, parce que personne n&apos;a
        intérêt à vous la vendre. Un modèle ouvert, installé sur un ordinateur
        équipé d&apos;une bonne carte graphique, répond à autant de questions
        que la machine en absorbe, pour{" "}
        <Memo type="idea" label="Zéro euro à la question">
          zéro euro à la question
        </Memo>
        . Pas de crédit, pas de siège, pas de compteur. Et vos données ne
        quittent pas la machine. Zéro à la marge, pas au total : la machine,
        l&apos;électricité et son administration restent à payer, et c&apos;est
        tout le calcul qui suit.
      </p>
      <p>
        Ce qu&apos;il faut comme carte, d&apos;après ce qui tourne chez nous :
      </p>
      <ul>
        <li>
          <strong>8 Go, une carte de joueur courante.</strong> Un petit modèle
          (4 à 9 milliards de paramètres) qui classe, transcrit, résume. Notre
          modèle de 9 milliards tourne en permanence sur une carte de ce
          type. C&apos;est assez pour commencer, pas pour répondre sur des
          chiffres d&apos;ERP.
        </li>
        <li>
          <strong>24 Go, le niveau qui ne ment pas sur un ERP.</strong> Un
          modèle de 27 milliards quantifié, plus la transcription vocale et la
          lecture d&apos;images. Sur nos essais d&apos;octobre, à questions
          égales,{" "}
          <Memo type="idea" label="Le 9B inventait, le 27B non">
            le modèle de 9 milliards inventait des chiffres et le 27 milliards
            n&apos;en inventait pas
          </Memo>
          . Une carte de 16 Go ne le tient pas.
        </li>
      </ul>
      <p>
        L&apos;ordre de grandeur matériel pour une machine 24 Go, avec une
        carte d&apos;occasion :{" "}
        <Memo type="num" label="Machine 24 Go ≈ 2 000 à 2 500 €">
          2 000 à 2 500 € une fois
        </Memo>
        , plus l&apos;électricité. Comparé aux abonnements d&apos;une équipe de
        dix, c&apos;est amorti en moins d&apos;un an. À l&apos;inverse, louer
        une carte équivalente dans le cloud, allumée jour et nuit, coûte de
        l&apos;ordre de 550 € par mois : à ne faire que pour un traitement
        ponctuel, allumée pour le lot et éteinte après.
      </p>

      <PullQuote>
        Une machine à vous n&apos;est pas moins chère dans l&apos;absolu. Elle
        remplace un compteur par une administration. Et l&apos;administration,
        ça se délègue.
      </PullQuote>

      <h2>Vous avez peut-être déjà commencé</h2>
      <p>
        C&apos;est ce que nous constatons le plus souvent chez les dirigeants
        tech-curieux : la machine existe déjà. Un PC de joueur, un modèle
        téléchargé un dimanche, un essai qui a bluffé puis qui est resté dans
        un coin. Le réflexe était bon. Ce qui manque en général, ce n&apos;est
        pas la puissance, ce sont quatre choses :
      </p>
      <ul>
        <li>
          des <strong>outils qui branchent le modèle sur Odoo</strong>, pour
          qu&apos;il lise le dossier d&apos;un client au lieu de deviner (voir{" "}
          <Link href="/blog/petit-modele-bien-outille">
            un petit modèle bien outillé
          </Link>
          ) ;
        </li>
        <li>
          des <strong>garde-fous dans le code</strong>, pour qu&apos;il ne
          touche jamais à un prix (voir{" "}
          <Link href="/blog/agent-ia-qui-ne-touche-pas-aux-prix">
            l&apos;agent qui ne peut pas toucher aux prix
          </Link>
          ) ;
        </li>
        <li>
          une <strong>administration à distance</strong> : mises à jour,
          supervision, redémarrage, sauvegardes, sans que personne chez vous
          n&apos;ait à s&apos;en occuper ;
        </li>
        <li>
          savoir <strong>quand monter en puissance</strong> : passer de 8 à 24
          Go, ajouter la voix, router une tâche lourde vers un modèle plus
          grand le temps d&apos;un lot.
        </li>
      </ul>
      <p>
        C&apos;est exactement notre rôle : reprendre votre machine ou en
        installer une, l&apos;administrer à distance, et la faire monter en
        puissance quand l&apos;usage le demande, à un coût qui reste celui
        d&apos;une machine et non d&apos;un compteur.
      </p>

      <h2>Et quand le modèle ne parle pas votre métier : le fine-tuning</h2>
      <p>
        Le plus souvent, de bons outils suffisent et l&apos;entraînement est
        inutile. Mais quand un modèle doit adopter un vocabulaire, un ton ou un
        format très particulier, on l&apos;entraîne, et ça se fait aussi sur du
        matériel courant. Sur{" "}
        <a href="https://kiaraoke.fr" target="_blank" rel="noreferrer">
          kiaraoke.fr
        </a>
        , un jury de chant à trois personnalités, nous avons outillé{" "}
        <Memo type="idea" label="Fine-tuning sur une carte de 8 Go">
          l&apos;entraînement d&apos;un petit modèle sur une carte de 8 Go
        </Memo>{" "}
        (un adaptateur LoRA). Sur notre chaîne de courtes vidéos animées, des
        adaptateurs du même type tiennent les personnages d&apos;un épisode à
        l&apos;autre. Nous ne le vendons pas en premier. Nous nous y collons
        quand les erreurs mesurées le justifient.
      </p>

      <Callout>
        <p>
          <strong>À retenir.</strong> Les crédits facturent chaque question,
          les abonnements chaque siège. Une machine à vous ne facture rien à
          l&apos;usage, garde vos données chez vous, et se fait administrer à
          distance. Le coût se déplace du compteur vers l&apos;administration :
          c&apos;est un bon échange dès que l&apos;équipe s&apos;en sert tous
          les jours.
        </p>
      </Callout>

      <h2>Quand ce n&apos;est pas le bon calcul</h2>
      <p>
        Si trois personnes posent dix questions par mois, les 20 crédits de
        départ d&apos;Odoo ou un seul abonnement suffisent, et une machine
        serait de l&apos;ingénierie inutile. Si vous avez surtout besoin de
        rédiger des propositions longues ou de raisonner sur des situations
        inédites, les grands modèles d&apos;éditeurs restent devant : on les
        garde pour ça, et on route le reste. Le détail de cet arbitrage, côté
        hébergement, est dans{" "}
        <Link href="/blog/serveur-mcp-heberge-pme">
          coder, louer ou héberger soi-même
        </Link>
        .
      </p>

      <KeyTakeaways title="Pour chiffrer votre cas en une heure">
        <ul>
          <li>
            Comptez les <strong>sièges</strong> que vous payez déjà en IA, et
            combien sont vraiment ouverts chaque semaine.
          </li>
          <li>
            Sur Odoo 20, consommez les <strong>20 crédits de départ</strong>{" "}
            sur une semaine réelle avant d&apos;acheter un pack : c&apos;est la
            seule façon de connaître votre consommation.
          </li>
          <li>
            Regardez la <strong>carte graphique</strong> que vous avez peut-être
            déjà : 8 Go pour commencer, 24 Go pour répondre juste sur
            l&apos;ERP.
          </li>
          <li>
            Décidez qui l&apos;<strong>administre</strong>. Si personne chez
            vous, c&apos;est notre métier, à distance.
          </li>
        </ul>
      </KeyTakeaways>

      <p>
        Ce calcul est au cœur de{" "}
        <Link href="/serveur-mcp-odoo">notre serveur MCP pour Odoo</Link>, qui
        tourne sur un modèle ouvert chez vous ou sur une machine que nous
        administrons. Pour savoir ce que change Odoo 20 au-delà du prix :{" "}
        <Link href="/blog/odoo-20-serveur-mcp-agents">
          Odoo 20 ouvre la porte aux agents
        </Link>
        . Et pour faire le calcul ensemble sur vos sièges, vos crédits et votre
        machine, soixante minutes sans engagement :{" "}
        <Link href="/contact">prenez rendez-vous</Link>.
      </p>
    </ArticleLayout>
  );
}
