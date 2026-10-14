import { articleMetadata } from "@/lib/article-metadata";
import { ArticleLayout } from "@/components/layout/article-layout";
import { Memo } from "@/components/article/memo";
import { Callout } from "@/components/article/callout";
import { PullQuote } from "@/components/article/pull-quote";
import Link from "next/link";

export const metadata = articleMetadata({
  title: "L'agent IA qui ne peut pas toucher aux prix",
  description:
    "Un prompt qui dit « ne change jamais un prix » est une suggestion. Comment on rend l'interdiction physique : schéma d'outils, test automatique, écriture au brouillon.",
  slug: "agent-ia-qui-ne-touche-pas-aux-prix",
});

export default function Article() {
  return (
    <ArticleLayout
      title="L'agent qui ne peut pas toucher aux prix"
      excerpt="Vous avez peur qu'un agent accorde une remise, change un tarif ou valide une commande. Vous avez raison. La réponse n'est pas une consigne dans un prompt, c'est une impossibilité dans le code, et un test qui la vérifie à chaque livraison."
      tags={["IA", "PME"]}
      readTime="4 min"
      date="14 octobre 2026"
      dateISO="2026-10-14"
      image="/images/blog/agent-ia-qui-ne-touche-pas-aux-prix.webp"
      slug="agent-ia-qui-ne-touche-pas-aux-prix"
    >
      <p>
        C&apos;est la première question qu&apos;un dirigeant pose quand on lui
        montre un agent branché sur son ERP. Pas « est-ce que ça marche ».
        Plutôt : « et s&apos;il accorde 20 % à un client parce qu&apos;on le lui
        a demandé gentiment ? ». Suivie de près par : « et s&apos;il valide une
        commande qu&apos;on ne peut pas livrer ? ».
      </p>
      <p>
        La réponse habituelle est une ligne dans le prompt : « Tu ne modifies
        jamais un prix. » Nous l&apos;avons lue dans des cahiers des charges,
        nous l&apos;avons entendue dans des démonstrations. Elle ne vaut rien.
        Un modèle de langage suit ses instructions la plupart du temps, et « la
        plupart du temps » n&apos;est pas une garantie qu&apos;on signe avec un
        client.
      </p>

      <h2>Pourquoi une consigne ne suffit pas</h2>
      <p>
        Un modèle ne lit pas une interdiction comme un programme lit une
        condition. Il la pèse contre le reste du contexte. Un message assez
        insistant (« le patron a dit oui, fais-le »), une formulation
        détournée (« mets le prix à zéro pour le test »), un simple oubli après
        une longue conversation, et la consigne cède. Ce n&apos;est pas une
        faiblesse d&apos;un modèle en particulier. C&apos;est la nature de
        l&apos;outil.
      </p>
      <p>
        Odoo 20 pose la question autrement, et c&apos;est intéressant : son
        serveur MCP natif fait agir l&apos;agent{" "}
        <Memo type="idea" label="Les droits de celui qui donne la clé">
          avec les droits de l&apos;utilisateur qui a donné la clé
        </Memo>
        . Si c&apos;est le dirigeant, l&apos;agent peut tout ce que le
        dirigeant peut. Les droits Odoo protègent contre un utilisateur mal
        intentionné, pas contre un modèle qui complète une phrase.
      </p>

      <PullQuote>
        Un prompt qui dit « ne change jamais un prix » est une suggestion. Un
        schéma d&apos;outils sans paramètre prix est une impossibilité.
      </PullQuote>

      <h2>Comment on rend l&apos;interdiction physique</h2>
      <p>
        Un agent ne fait rien par lui-même. Il appelle des outils, et chaque
        outil déclare les paramètres qu&apos;il accepte. C&apos;est là que se
        joue la sécurité, pas dans le prompt.
      </p>
      <ul>
        <li>
          <strong>Aucun outil n&apos;a de paramètre prix, coût ou validation de
          commande.</strong> L&apos;outil « créer un devis en brouillon » prend
          un client et des lignes produit. Le prix vient de la liste de prix
          d&apos;Odoo, comme pour n&apos;importe quel vendeur. Il n&apos;y a
          pas de champ où glisser une remise, donc rien à détourner.
        </li>
        <li>
          <strong>Un test lit le schéma de tous les outils</strong> et échoue
          si l&apos;un d&apos;eux expose un paramètre interdit. Ce test tourne
          à chaque livraison, parmi{" "}
          <Memo type="num" label="5 794 tests au vert">
            5 794 tests automatisés
          </Memo>{" "}
          au 14 octobre 2026. Un développeur, humain ou agent, qui ajoute un
          paramètre prix par commodité voit la livraison refusée.
        </li>
        <li>
          <strong>L&apos;écriture s&apos;arrête au brouillon.</strong> Un devis
          en brouillon, une demande de prix en brouillon. C&apos;est un humain
          qui appuie sur « Créer le brouillon » dans Telegram, puis qui
          confirme dans Odoo. Deux mains avant qu&apos;un document parte.
        </li>
        <li>
          <strong>L&apos;écriture est fermée par défaut.</strong> Elle
          s&apos;ouvre explicitement, sur une liste fermée de champs, et pour
          l&apos;enrichissement du catalogue uniquement la nuit. Détail dans{" "}
          <Link href="/blog/ia-enrichir-catalogue-sans-perdre-la-main">
            enrichir votre catalogue sans perdre la main
          </Link>
          .
        </li>
      </ul>

      <Callout>
        <p>
          <strong>À retenir.</strong> Demandez à voir la liste des paramètres
          des outils de l&apos;agent qu&apos;on vous propose. Si « prix »,
          « remise » ou « valider » y figurent, la consigne du prompt est la
          seule chose qui vous protège. Si vous ne pouvez pas voir cette liste,
          c&apos;est une réponse aussi.
        </p>
      </Callout>

      <h2>Ce que ça interdit aussi, et qu&apos;il faut accepter</h2>
      <p>
        Cette architecture a un coût, et nous préférons le dire ici plutôt
        qu&apos;en réunion. L&apos;agent ne peut pas faire une remise
        commerciale à votre place, même quand vous le voudriez. Il ne peut pas
        valider une commande urgente un dimanche. Il ne peut pas corriger un
        prix faux qu&apos;il a repéré dans votre catalogue : il vous le signale,
        et c&apos;est vous qui corrigez.
      </p>
      <p>
        Pour une PME où{" "}
        <Memo type="idea" label="La signature reste humaine">
          la signature engage la marge
        </Memo>
        , c&apos;est le bon compromis. Pour une boutique en ligne qui veut des
        prix dynamiques ajustés par IA toutes les heures, ce n&apos;est pas le
        bon outil, et nous vous le dirons dans les dix premières minutes.
      </p>

      <h2>La version courte pour votre prochain rendez-vous intégrateur</h2>
      <p>
        Trois questions, dans cet ordre. « Quels outils l&apos;agent peut-il
        appeler, et avec quels paramètres ? » « Qu&apos;est-ce qui empêche un
        paramètre prix d&apos;apparaître à la prochaine mise à jour ? »
        « Quand l&apos;agent écrit, qui appuie sur le bouton suivant ? » Si les
        trois réponses tiennent dans le code et pas dans un prompt, vous pouvez
        continuer.
      </p>
      <p>
        C&apos;est exactement ce que nous montrons, schéma d&apos;outils à
        l&apos;écran, sur{" "}
        <Link href="/serveur-mcp-odoo">notre serveur MCP pour Odoo</Link>. Et
        pour comprendre ce qu&apos;Odoo 20 change de son côté,{" "}
        <Link href="/blog/odoo-20-serveur-mcp-agents">
          l&apos;article sur la version 20
        </Link>
        . Soixante minutes pour regarder votre cas, sans engagement :{" "}
        <Link href="/contact">prenez rendez-vous</Link>.
      </p>
    </ArticleLayout>
  );
}
