import { articleMetadata } from "@/lib/article-metadata";
import { ArticleLayout } from "@/components/layout/article-layout";
import { Memo } from "@/components/article/memo";
import { Callout } from "@/components/article/callout";
import { PullQuote } from "@/components/article/pull-quote";
import Link from "next/link";

export const metadata = articleMetadata({
  title: "Laisser une IA enrichir votre catalogue sans perdre la main",
  description:
    "Des fiches produit réécrites que personne n'a relues : le piège de l'enrichissement par IA. Les six verrous qu'on pose avant qu'un mot entre dans Odoo.",
  slug: "ia-enrichir-catalogue-sans-perdre-la-main",
});

export default function Article() {
  return (
    <ArticleLayout
      title="Laisser une IA enrichir votre catalogue, sans perdre la main"
      excerpt="Odoo 20 propose d'éditer vos produits par IA depuis la boutique, prix compris. Tentant, quand 1 300 fiches attendent. Mais une description réécrite que personne n'a relue est une dette, pas un gain. Les six verrous que nous posons avant qu'un mot entre dans l'ERP."
      tags={["IA", "PME"]}
      readTime="5 min"
      date="14 octobre 2026"
      dateISO="2026-10-14"
      image="/images/blog/ia-enrichir-catalogue-sans-perdre-la-main.webp"
      slug="ia-enrichir-catalogue-sans-perdre-la-main"
    >
      <p>
        Votre catalogue a des trous. Des produits sans type, des descriptions
        vides ou copiées d&apos;un fournisseur, des familles qui n&apos;existent
        que dans la tête du responsable d&apos;atelier. Vous le savez depuis
        des années, et personne n&apos;a jamais eu les trois semaines pour s&apos;y
        mettre.
      </p>
      <p>
        Alors quand Odoo 20 annonce qu&apos;un assistant peut, depuis la
        boutique, changer le nom, le prix ou la description d&apos;un produit,
        vous écoutez. Et quand un prestataire propose de « passer tout le
        catalogue à l&apos;IA en un week-end », vous êtes tenté. Nous aussi,
        nous l&apos;avons été. Voici pourquoi nous avons fait beaucoup plus
        lentement, et ce que ça a donné sur un pilote en cours.
      </p>

      <h2>Le piège : une fiche réécrite que personne n&apos;a relue</h2>
      <p>
        Un modèle de langage qui enrichit une fiche produit fait deux choses à
        la fois : il complète ce qui manque, et il invente ce qu&apos;il ne
        sait pas. Un « filtre à air » devient « filtre à air haute
        performance », puis « filtre à air pour moteur quatre temps » sans que
        rien dans la fiche d&apos;origine ne le dise. Sur une référence
        technique, c&apos;est un retour client. Sur mille, c&apos;est un
        catalogue dont plus personne ne sait ce qui est vrai.
      </p>
      <p>
        Sur la mission qui a précédé ce produit, nous avions déjà enrichi plus
        d&apos;un millier de fiches avec un modèle. Le garde-fou qui a tout
        changé tenait en une règle :{" "}
        <Memo type="idea" label="Un mot perdu = fiche rejetée">
          si le nom généré perd un mot technique du nom d&apos;origine, il est
          rejeté
        </Memo>{" "}
        et l&apos;original conservé. Le modèle peut compléter, il ne peut pas
        effacer.
      </p>

      <PullQuote>
        Rien ne s&apos;écrit dans l&apos;ERP tant qu&apos;un humain n&apos;a
        pas validé. Pas « en général ». Jamais.
      </PullQuote>

      <h2>Les six verrous, dans l&apos;ordre où un mot traverse</h2>
      <p>
        Le cas que nous avons construit est modeste : le modèle propose un{" "}
        <strong>type</strong> pour chaque produit (« filtre à air »,
        « courroie », « bougie »). C&apos;est le champ le plus utile pour le
        filtrage en boutique, et le moins risqué. Voici ce qui se passe entre
        la proposition et la fiche.
      </p>
      <ul>
        <li>
          <strong>1. Le code refuse une proposition dont les mots ne figurent
          pas dans la fiche d&apos;origine.</strong> Le modèle ne peut pas
          inventer un type. S&apos;il propose « courroie » pour une fiche qui
          ne contient pas ce mot, la proposition est écartée avant d&apos;être
          vue.
        </li>
        <li>
          <strong>2. Les propositions arrivent dans Odoo dans des champs de
          transit</strong>, visibles dans une liste éditable. Le responsable
          accepte ou refuse, un par un ou en lot. La fiche elle-même n&apos;a
          pas bougé.
        </li>
        <li>
          <strong>3. Une seule fonction peut écrire dans Odoo</strong>, sur une{" "}
          <Memo type="idea" label="Liste fermée de champs">
            liste fermée de champs
          </Memo>
          , jamais le prix, le coût, la catégorie ni le stock. Un test lit tout
          le code pour s&apos;assurer qu&apos;aucune autre écriture
          n&apos;existe.
        </li>
        <li>
          <strong>4. Chaque écriture garde la valeur d&apos;avant</strong>, qui
          a validé, quand, avec quel modèle. Une note est posée sur la fiche, y
          compris pour un refus et son motif. Dans deux ans, vous saurez
          pourquoi ce produit s&apos;appelle comme ça.
        </li>
        <li>
          <strong>5. Un lot entier s&apos;annule d&apos;une commande.</strong>{" "}
          Et un champ qu&apos;un humain a modifié entre-temps n&apos;est pas
          écrasé par l&apos;annulation.
        </li>
        <li>
          <strong>6. L&apos;écriture est fermée par défaut</strong>, et
          ouverte seulement la nuit, sur créneau. Le reste du temps, la
          fonction d&apos;écriture n&apos;a pas le droit de tourner.
        </li>
      </ul>

      <Callout>
        <p>
          <strong>À retenir.</strong> Le bon critère pour un enrichissement
          par IA n&apos;est pas « combien de fiches en une nuit ». C&apos;est
          « combien de temps pour tout annuler si c&apos;est faux ». Si la
          réponse n&apos;est pas « une commande », ne lancez pas.
        </p>
      </Callout>

      <h2>Ce que ça donne, en chiffres honnêtes</h2>
      <p>
        Premier lot sur le pilote :{" "}
        <Memo type="num" label="22 produits, ~20 types justes">
          22 produits d&apos;une même famille
        </Memo>
        , en attente de validation humaine au 14 octobre 2026. Après une
        itération sur la qualité des propositions, environ 20 types justes sur
        22 à la relecture. Les deux restants sont des cas que le responsable
        tranchera lui-même, et c&apos;est le but : le modèle propose, le
        métier décide.
      </p>
      <p>
        Vingt-deux, pas mille. Volontairement. Le taux de refus du premier lot
        dit ce que valent les propositions ; lancer mille fiches avant de le
        connaître, c&apos;est signer un chèque en blanc. Le rythme montera une
        fois le taux connu, pas avant.
      </p>

      <h2>Quand il ne faut pas enrichir par IA</h2>
      <p>
        Si vos fiches d&apos;origine sont vides, le verrou n°1 refusera tout, et
        il aura raison : un modèle ne peut pas déduire un type d&apos;une
        référence de six chiffres. Dans ce cas, le travail commence par les
        données, à la main ou par import fournisseur, et l&apos;IA vient après.
        Sur la mission qui a précédé, le principe du client était clair :
        données manquantes, on fait remplir l&apos;équipe, on ne reconstruit
        pas.
      </p>
      <p>
        Et si le champ à enrichir est le prix, la réponse est non, par
        construction. Pourquoi, et comment on s&apos;en assure :{" "}
        <Link href="/blog/agent-ia-qui-ne-touche-pas-aux-prix">
          l&apos;agent qui ne peut pas toucher aux prix
        </Link>
        .
      </p>
      <p>
        Cet enrichissement est l&apos;une des capacités de{" "}
        <Link href="/serveur-mcp-odoo">notre serveur MCP pour Odoo</Link>. Si
        votre catalogue attend depuis des années, soixante minutes pour
        regarder l&apos;état de vos fiches et décider par quelle famille
        commencer, sans engagement :{" "}
        <Link href="/contact">prenez rendez-vous</Link>.
      </p>
    </ArticleLayout>
  );
}
