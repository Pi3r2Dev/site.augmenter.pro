import { articleMetadata } from "@/lib/article-metadata";
import { ArticleLayout } from "@/components/layout/article-layout";
import { Memo } from "@/components/article/memo";
import { Callout } from "@/components/article/callout";
import { KeyTakeaways } from "@/components/article/key-takeaways";
import Link from "next/link";

export const metadata = articleMetadata({
  title: "Un petit modèle bien outillé bat un gros modèle qui devine",
  description:
    "On vous vend le plus gros modèle du marché. Sur un ERP, c'est l'outil qui fait la justesse, pas la taille. Un modèle local, des outils métier, un index à 31 ms.",
  slug: "petit-modele-bien-outille",
});

export default function Article() {
  return (
    <ArticleLayout
      title="Un petit modèle bien outillé bat un gros modèle qui devine"
      excerpt="On vous vend le plus gros modèle du marché, avec l'abonnement qui va avec. Sur un ERP, la justesse ne vient pas de la taille du modèle. Elle vient de l'outil qui lui répond. Ce que nous avons mesuré en branchant un modèle local sur Odoo."
      tags={["IA", "PME"]}
      readTime="5 min"
      date="14 octobre 2026"
      dateISO="2026-10-14"
      image="/images/blog/petit-modele-bien-outille.webp"
      slug="petit-modele-bien-outille"
    >
      <p>
        Le discours commercial est bien rodé : plus le modèle est gros, plus il
        est intelligent, plus il sera juste sur vos données. Donc prenez le plus
        gros, et l&apos;abonnement entreprise qui va avec. Vos données partent
        chez l&apos;éditeur, mais c&apos;est le prix de la qualité.
      </p>
      <p>
        Nous avons fait l&apos;inverse sur un pilote en cours : un modèle
        ouvert de taille moyenne, qui tourne sur une machine que nous
        administrons, branché sur Odoo. Non par idéologie, mais parce que la
        question « quel stock pour ce produit » n&apos;a rien à voir avec la
        question « rédige-moi un contrat ». Voici ce que nous avons constaté.
      </p>

      <h2>Un gros modèle devine. C&apos;est son métier.</h2>
      <p>
        Posez à un grand modèle d&apos;éditeur une question sur votre ERP sans
        lui donner d&apos;outil, et il répond quand même. Il complète avec un
        chiffre plausible, une référence qui ressemble à la vôtre, un délai
        raisonnable. C&apos;est exactement ce pour quoi il a été entraîné :
        produire la suite la plus probable. Sur un ERP, la suite la plus
        probable est presque toujours fausse, parce que{" "}
        <Memo type="idea" label="L'ERP n'est pas probable, il est exact">
          votre stock n&apos;est pas probable, il est exact
        </Memo>
        .
      </p>
      <p>
        Donnez-lui un serveur MCP générique, celui qu&apos;Odoo 20 livre
        désormais, et il doit comprendre le schéma d&apos;Odoo : quel modèle,
        quel champ, quelle jointure. Un gros modèle y arrive souvent. Mais il
        y arrive en plusieurs appels, en se trompant parfois de champ, et vous
        payez chaque appel en crédits.
      </p>

      <h2>Un petit modèle bien outillé n&apos;a rien à deviner</h2>
      <p>
        Notre choix d&apos;architecture, écrit dans une décision datée, a été
        de construire{" "}
        <Memo type="idea" label="Outils par intention, pas par objet Odoo">
          des outils par intention
        </Memo>
        , pas par objet Odoo. Le modèle n&apos;appelle pas « rechercher dans
        res.partner puis dans sale.order ». Il appelle « le dossier de ce
        client », et l&apos;outil lui rend le dossier : coordonnées, devis en
        cours, dernières factures, machines. Le modèle n&apos;a plus qu&apos;à
        rédiger. Il n&apos;a rien à savoir d&apos;Odoo.
      </p>
      <p>
        Résultat : un modèle ouvert de 27 milliards de paramètres rédige les
        réponses, et un modèle de 9 milliards classe chaque message entrant.
        Les deux tournent sur une machine que nous administrons. Aucune donnée
        du pilote ne transite par un fournisseur américain pour répondre à une
        question de stock. Le détail du routage est sur{" "}
        <Link href="/ia-souveraine-pme">IA souveraine pour PME</Link>.
      </p>
      <p>
        La vitesse vient de la même idée. Les clients et les références sont
        cherchés dans un index local, avec tolérance aux fautes et aux
        pluriels :{" "}
        <Memo type="num" label="31 ms de recherche">
          31 millisecondes mesurées en direct
        </Memo>{" "}
        sur une recherche au pluriel. Les prix et le stock, eux, sont{" "}
        <strong>toujours relus en direct dans Odoo</strong>, jamais depuis une
        copie. L&apos;index sert à trouver, Odoo sert à répondre.
      </p>

      <Callout>
        <p>
          <strong>À retenir.</strong> La justesse d&apos;un agent sur un ERP
          se décide dans l&apos;outil qui lui répond, pas dans la taille du
          modèle. Un petit modèle qui reçoit le bon dossier bat un grand
          modèle qui doit le reconstruire, à tous les coups, et pour une
          fraction du coût.
        </p>
      </Callout>

      <h2>Ce que ça coûte : une carte graphique, pas un compteur</h2>
      <p>
        Le second effet d&apos;un petit modèle bien outillé, c&apos;est
        l&apos;argent. Il tourne sur un ordinateur équipé d&apos;une bonne carte
        graphique, et{" "}
        <Memo type="idea" label="Zéro euro à la question">
          chaque question coûte zéro euro
        </Memo>
        . En face, Odoo 20 facture ses fonctions d&apos;IA 1 € le crédit sans
        publier combien en consomme une question, et les assistants du marché
        se paient de 20 à 25 $ par siège et par mois, qu&apos;on s&apos;en
        serve ou non.
      </p>
      <p>
        Pour commencer, une carte de joueur de 8 Go suffit : notre modèle de 9
        milliards y tourne en permanence et classe chaque message. Pour
        rédiger des réponses justes sur un ERP, on vise 24 Go, le niveau du
        modèle de 27 milliards. Ordre de grandeur :{" "}
        <Memo type="num" label="Machine 24 Go ≈ 2 000 à 2 500 €">
          2 000 à 2 500 € de matériel une fois
        </Memo>
        , administré à distance. Beaucoup de dirigeants ont déjà la machine
        sans le savoir. Le calcul détaillé :{" "}
        <Link href="/blog/cout-agent-ia-odoo">
          crédits, abonnements ou une machine à vous
        </Link>
        .
      </p>
      <p>
        Et si un modèle ouvert ne parle pas assez votre métier, il
        s&apos;entraîne sur ce même matériel. Nous avons outillé un
        fine-tuning (un adaptateur LoRA) sur une carte de 8 Go pour le jury de
        chant de{" "}
        <a href="https://kiaraoke.fr" target="_blank" rel="noreferrer">
          kiaraoke.fr
        </a>
        . On ne commence jamais par là, mais on s&apos;y colle quand les
        erreurs mesurées le justifient.
      </p>

      <h2>Ce que le petit modèle ne fait pas</h2>
      <p>
        Soyons honnêtes, parce que c&apos;est le seul moyen que vous nous
        croyiez sur le reste. Sur un usage ouvert, rédiger une proposition
        commerciale de trois pages, analyser un contrat, raisonner sur une
        situation inédite, les grands modèles d&apos;éditeurs restent devant.
        Nous les utilisons pour ça, et nous les routons vers les tâches où ils
        apportent quelque chose.
      </p>
      <p>
        Le petit modèle a aussi ses limites sur l&apos;ERP : il est moins bon
        pour comprendre une question très mal formulée, et il faut lui donner
        des outils bien découpés. C&apos;est du travail d&apos;architecture, pas
        de prompt. Sur le pilote, deux clients homonymes ont été départagés par
        la ville parce que l&apos;outil renvoyait la ville, pas parce que le
        modèle était malin.
      </p>
      <p>
        Dernier garde-fou, indispensable avec n&apos;importe quelle taille de
        modèle :{" "}
        <Memo type="idea" label="Chiffre vérifié par du code">
          un chiffre que l&apos;agent cite et qu&apos;aucun outil n&apos;a
          rendu est repéré par du code
        </Memo>
        , et la réponse est bloquée. Sur le pilote, chaque chiffre
        d&apos;affaires par vendeur a été recoupé au centime dans Odoo avant
        d&apos;ouvrir l&apos;outil à l&apos;équipe.
      </p>

      <KeyTakeaways title="Les questions à poser avant de signer un abonnement">
        <ul>
          <li>
            Quelles questions mon équipe pose-t-elle dix fois par jour ? Si
            elles tiennent dans « ce client, ce produit, ce devis », un
            petit modèle outillé suffit.
          </li>
          <li>
            L&apos;agent reçoit-il un <strong>dossier</strong> tout fait, ou
            doit-il reconstruire la réponse depuis le schéma de l&apos;ERP ?
          </li>
          <li>
            Combien coûte une question ? Crédit, siège ou zéro : si personne
            ne sait répondre, c&apos;est un compteur.
          </li>
          <li>
            Où tourne le modèle, et qu&apos;est-ce qui transite ? Une question
            de stock n&apos;a pas à sortir de vos murs.
          </li>
          <li>
            Qui vérifie un chiffre avant qu&apos;il parte chez un client ? Si
            la réponse est « le modèle », reposez la question.
          </li>
        </ul>
      </KeyTakeaways>

      <p>
        Cette architecture est celle de{" "}
        <Link href="/serveur-mcp-odoo">notre serveur MCP pour Odoo</Link>. Pour
        voir ce qu&apos;un agent ainsi outillé peut et ne peut pas faire,
        lisez{" "}
        <Link href="/blog/agent-ia-qui-ne-touche-pas-aux-prix">
          l&apos;agent qui ne peut pas toucher aux prix
        </Link>
        . Et si vous voulez qu&apos;on regarde ensemble quelles questions
        valent un outil chez vous, soixante minutes sans engagement :{" "}
        <Link href="/contact">prenez rendez-vous</Link>.
      </p>
    </ArticleLayout>
  );
}
