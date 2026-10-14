import { articleMetadata } from "@/lib/article-metadata";
import { ArticleLayout } from "@/components/layout/article-layout";
import { Memo } from "@/components/article/memo";
import { Callout } from "@/components/article/callout";
import { PullQuote } from "@/components/article/pull-quote";
import { AtelierCallout } from "@/components/sections/atelier-callout";
import Link from "next/link";

export const metadata = articleMetadata({
  title: "Construire un logiciel avec des agents : 10 semaines, 436 tâches",
  description:
    "« L'IA code n'importe quoi. » Dix semaines, 436 tâches, 5 794 tests : comment on fait livrer des agents sans y laisser la qualité. Ce qui a marché, ce qu'un humain garde.",
  slug: "logiciel-construit-par-agents-dix-semaines",
});

export default function Article() {
  return (
    <ArticleLayout
      title="Construire un logiciel avec des agents : dix semaines, 436 tâches, 5 794 tests"
      excerpt="« L'IA code n'importe quoi. » C'est vrai quand on la laisse faire. Depuis août 2026, nous construisons un serveur MCP pour Odoo avec une boucle d'agents : 436 tâches livrées en dix semaines, 320 par des agents, 116 par un humain. Ce qui a marché, ce qui a cassé, et ce que l'humain garde."
      tags={["IA", "PME"]}
      readTime="5 min"
      date="14 octobre 2026"
      dateISO="2026-10-14"
      image="/images/blog/logiciel-construit-par-agents-dix-semaines.webp"
      slug="logiciel-construit-par-agents-dix-semaines"
    >
      <p>
        Vous avez probablement une opinion sur le code écrit par l&apos;IA.
        Soit un développeur de votre entourage vous a dit que c&apos;était du
        bricolage, soit un prestataire vous a promis une application en une
        semaine. Les deux ont raison, selon la façon dont on s&apos;y prend.
      </p>
      <p>
        Depuis le 5 août 2026, nous construisons un serveur MCP pour Odoo, un
        bot Telegram et un assistant client, avec une boucle d&apos;agents qui
        travaille des tâches une par une. Au 14 octobre, le journal dit{" "}
        <Memo type="num" label="436 tâches en 10 semaines">
          436 tâches livrées
        </Memo>
        , 320 par des agents et 116 par un humain, et{" "}
        <Memo type="num" label="5 794 tests au vert">
          5 794 tests automatisés au vert
        </Memo>
        . Voici ce qui tient cet édifice debout, pour que vous sachiez quoi
        exiger du prochain qui vous promet une application en une semaine.
      </p>

      <h2>Une tâche à la fois, un juge à chaque tâche</h2>
      <p>
        La boucle est simple : un fichier de backlog, une tâche en tête, un
        agent qui démarre avec un contexte neuf, lit les règles du projet, fait
        la tâche, écrit ses tests, et un second passage qui juge le résultat
        avant qu&apos;il entre dans le code. Si le juge refuse, la tâche
        revient. Pas de conversation de trois heures qui dérive : chaque run
        repart de zéro, avec les règles écrites.
      </p>
      <p>
        Ce qui fait la différence, ce n&apos;est pas l&apos;agent, ce sont{" "}
        <Memo type="idea" label="Les règles écrites avant le code">
          les règles écrites avant le code
        </Memo>
        . Un fichier d&apos;instructions qui dit ce qu&apos;on ne fait jamais
        (aucun paramètre prix, écriture au brouillon, un conteneur par
        client), et des fichiers de garde-fous que l&apos;agent n&apos;a pas
        le droit de modifier. Quand un agent a voulu « simplifier » un test de
        sécurité pour le faire passer, c&apos;est ce verrou qui l&apos;a
        arrêté, pas sa bonne volonté.
      </p>

      <PullQuote>
        Un agent ne livre pas mieux qu&apos;un humain. Il livre exactement
        aussi bien que les règles qu&apos;on a écrites avant lui.
      </PullQuote>

      <h2>Ce que les 116 tâches humaines contiennent</h2>
      <p>
        Le chiffre qui compte n&apos;est pas 320, c&apos;est 116. Ce sont les
        tâches qu&apos;aucun agent n&apos;a faites, et qu&apos;il ne fallait
        pas lui confier.
      </p>
      <ul>
        <li>
          <strong>Les vérifications en direct.</strong> Chaque capacité a été
          testée dans Telegram, sur le pilote en cours, et recoupée dans Odoo.
          Un chiffre d&apos;affaires par vendeur exact au centime. Deux clients
          homonymes départagés par la ville. Un redéploiement qui attend la
          fin de la question en cours au lieu de couper l&apos;utilisateur.
          Aucun test automatique ne remplace ça.
        </li>
        <li>
          <strong>Les décisions.</strong>{" "}
          <Memo type="num" label="11 décisions d'architecture écrites">
            Onze décisions d&apos;architecture
          </Memo>
          , chacune avec ses options rejetées et ses risques assumés. Des
          outils par intention plutôt que par objet Odoo. Un vérificateur de
          chiffres. Un index local. Un agent peut proposer, il ne tranche pas
          ce qui engage le produit pour deux ans.
        </li>
        <li>
          <strong>Les réglages de qualité.</strong> Quand le premier lot
          d&apos;enrichissement du catalogue a donné des types approximatifs,
          c&apos;est une relecture humaine qui a dit lesquels, et une itération
          qui a monté la justesse à environ 20 sur 22. L&apos;agent ne sait pas
          qu&apos;il s&apos;est trompé tant que personne ne le lui dit.
        </li>
      </ul>

      <Callout>
        <p>
          <strong>À retenir.</strong> Le bon ratio n&apos;est pas « 100 %
          agents ». Sur dix semaines, un quart des tâches sont restées
          humaines, et ce sont celles qui décident, vérifient et corrigent.
          Un prestataire qui vous promet zéro intervention humaine vous
          promet zéro vérification.
        </p>
      </Callout>

      <h2>Ce qui a cassé, et ce qu&apos;on en a tiré</h2>
      <p>
        Trois choses, pour être utile plutôt que flatteur. Des tests qui
        passaient au vert parce qu&apos;ils ne testaient rien de réel : on a
        ajouté une règle qui échoue quand un test ne trouve pas assez de cibles.
        Un agent qui a modifié un fichier de configuration qu&apos;il
        n&apos;aurait pas dû toucher : la liste des fichiers protégés a été
        étendue. Et des tâches trop larges qui revenaient trois fois : la règle
        est devenue « une tâche tient dans un run, sinon on la découpe avant ».
      </p>
      <p>
        Ce que ça coûte en argent n&apos;est pas un chiffre public, mais
        l&apos;ordre de grandeur se dit : une tâche livrée par un agent coûte
        quelques dollars de calcul, et le vrai coût est le temps humain des
        116. C&apos;est beaucoup moins qu&apos;une équipe, et beaucoup plus que
        zéro.
      </p>
      <p>
        Distinction qui compte pour votre budget : ce coût est celui de la{" "}
        <em>construction</em>. Une fois livré, le logiciel ne tourne pas sur
        les grands modèles qui l&apos;ont écrit. Il tourne sur un modèle
        ouvert, sur une machine équipée d&apos;une bonne carte graphique,
        administrée à distance, et chaque question de votre équipe coûte zéro.
        Pas de crédit, pas de siège.{" "}
        <Link href="/blog/cout-agent-ia-odoo">Le calcul détaillé</Link>.
      </p>

      <AtelierCallout />

      <h2>Ce que vous pouvez exiger, même sans comprendre le code</h2>
      <p>
        Quatre questions à poser à qui vous propose un logiciel « fait avec
        l&apos;IA ». Combien de tests, et tournent-ils à chaque livraison ?
        Où sont écrites les règles que l&apos;agent n&apos;a pas le droit de
        casser ? Qui a vérifié en direct, sur de vraies données, et comment ?
        Et quelles décisions ont été écrites avec les options rejetées ? Si les
        réponses sont des chiffres et des fichiers, continuez. Si ce sont des
        adjectifs, non.
      </p>
      <p>
        Le logiciel dont il est question ici est{" "}
        <Link href="/serveur-mcp-odoo">notre serveur MCP pour Odoo</Link>. Ce
        que les garde-fous interdisent à l&apos;agent, et pourquoi :{" "}
        <Link href="/blog/agent-ia-qui-ne-touche-pas-aux-prix">
          l&apos;agent qui ne peut pas toucher aux prix
        </Link>
        . Et pour prendre la main vous-même sur ces outils, en une
        demi-journée sur votre propre projet :{" "}
        <Link href="/atelier-claude-code-dirigeant">
          l&apos;atelier Claude Code pour dirigeant
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
