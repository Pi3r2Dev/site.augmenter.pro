import { articleMetadata } from "@/lib/article-metadata";
import { ArticleLayout } from "@/components/layout/article-layout";
import { Memo } from "@/components/article/memo";
import { Callout } from "@/components/article/callout";
import { PullQuote } from "@/components/article/pull-quote";
import { KeyTakeaways } from "@/components/article/key-takeaways";
import { AtelierCallout } from "@/components/sections/atelier-callout";
import Link from "next/link";
import { BuyingGuideTool } from "./buying-guide-tool";
import {
  COPILOT_GHOST_YEAR_EUR,
  DISCLAIMER,
  DOOR_TABLE_ORDER,
  DOORS,
  MARKET_VS_US,
} from "@/data/buying-guide-2027";

export const metadata = articleMetadata({
  title: "Guide d'achat IA PME 2027 : ce qu'on branche, ce qu'on résilie",
  description:
    "Avant d'acheter de l'IA, ouvrez vos factures éditeurs. Ce qu'une PME branche en 2027, ce qu'elle coupe, ce que ça coûte en HT, et ce qu'on refuse de vendre en premier.",
  slug: "ma-pme-en-2027",
});

const faqItems = [
  {
    question: "Combien coûte un premier chantier d'IA dans une PME ?",
    answer:
      "Entre 2 000 et 10 000 € HT quand il porte sur une seule tâche, branchée sur les outils déjà en place, avec un humain qui valide ce qui engage la marge. Ce sont les fourchettes de missions livrées par Pierre Legrand (augmenter.PRO), élargies d'un cran vers le haut. Les pages qui annoncent 15 000 à 50 000 € HT chiffrent un « projet IA » à périmètre ouvert, souvent avec une nouvelle stack à installer. L'écart vient du périmètre, pas d'un rabais.",
  },
  {
    question: "Le premier rendez-vous est-il payant ?",
    answer:
      "Non. L'Audit 180° dure 60 minutes, en visio partout en France ou en présentiel dans les Yvelines et le Val-d'Oise, et n'est pas facturé, sous conditions : une PME ou un indépendant, un sujet précis, l'intention d'agir. La cartographie complète (Audit 360°, une demi-journée, feuille de route sur 6 mois) coûte 550 € HT. Un atelier Claude Cowork pour l'équipe commence à 450 € HT la demi-journée.",
  },
  {
    question: "Faut-il Microsoft 365 Copilot pour toute l'équipe ?",
    answer:
      "Rarement. Copilot Chat, le chat ancré sur le web, est déjà compris dans les abonnements Microsoft 365 Business éligibles. Le complément Copilot Business, celui qui lit vos mails et vos fichiers, coûte 18,20 € HT par utilisateur et par mois au catalogue France (15,60 € la première année jusqu'au 31 décembre 2026). Quinze sièges à ce tarif représentent environ 3 300 € HT par an. On les réserve aux deux ou trois personnes dont la journée se passe réellement dans Outlook et Teams.",
  },
  {
    question: "Un agent IA peut-il répondre aux clients à la place du commercial ?",
    answer:
      "Techniquement, oui. Nous refusons de le livrer en premier. Un client régulier qui appelle veut aussi parler à quelqu'un, et une réponse ratée coûte plus qu'une heure de tri. On commence par le back-office : ressaisie, recherche sourcée, préparation des réponses que le commercial relit et envoie. Le premier niveau automatisé ne vient qu'ensuite, sur les sujets sans enjeu, une fois les écarts mesurés.",
  },
  {
    question: "Faut-il changer d'ERP (Sage, EBP, Odoo) pour faire de l'IA ?",
    answer:
      "Non. Si Sage ou EBP tiennent le quotidien, on relie : export, rapprochement des écarts, assistant par-dessus ce qui fonctionne. On ne migre jamais « pour l'IA ». Odoo ne devient un chantier que s'il est déjà installé et bloqué chez l'intégrateur ; dans un cas publié, la remise à plat a pris quatre jours de travail face à un devis à 3 500 €.",
  },
  {
    question: "Par où commencer quand tout passe encore par le gérant ?",
    answer:
      "Par deux inventaires : le geste quotidien que personne n'aime (devis, PDF, rapprochement, file de mails, relances) et les licences payées mais ouvertes à moins de 10 %. Le premier livrable est souvent une résiliation partielle, puis un assistant de triage et de comptes rendus qui produit des actions. Le gérant signe encore. Il ne trie plus.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Article() {
  return (
    <ArticleLayout
      title="Ma PME en 2027 : vous n'êtes plus obligé d'être cinq personnes à la fois"
      excerpt="Guide d'achat pour dirigeant. Ce qu'une PME branche en 2027, ce qu'elle résilie avant, ce que ça coûte en ordre de grandeur HT, et ce que nous refusons de vendre en premier."
      tags={["IA", "PME"]}
      readTime="14 min"
      date="18 septembre 2026"
      dateISO="2026-09-18"
      dateModified="2026-09-30"
      image="/images/blog/ma-pme-en-2027.webp"
      slug="ma-pme-en-2027"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <p>
        Le mardi soir, vous êtes encore dans la voiture quand le téléphone
        vibre. Un client mécontent sur WhatsApp. Un écart de caisse que la
        comptable a remarqué en fermant. Un devis que l’une de vos agences a
        chiffré à un autre prix que l’autre agence, pour le même chantier.
        Aucun de ces messages ne parle d’intelligence artificielle. Ils
        parlent d’un gérant qui tient cinq postes en même temps, parce que
        dans une PME de 5 à 80 personnes, la comptabilité, la file des mails,
        les ressources humaines, les litiges et parfois la sécurité du dépôt
        finissent toutes sur le même téléphone.
      </p>
      <p>
        Ce qu’on vous propose pour en sortir a un vocabulaire bien rodé : des
        « agents » qui répondraient à vos clients, Copilot sur chaque poste,
        un « projet IA » facturé entre 15 000 et 50 000 € HT. Vous avez
        peut-être déjà signé une partie de tout ça. Et vous êtes toujours dans
        la voiture à 23 h.
      </p>
      <p>
        Les chiffres publics racontent la même histoire, plus froidement. En
        2025,{" "}
        <Memo type="num" label="18 % des entreprises 10+">
          18&nbsp;% des entreprises françaises de 10 salariés ou plus
        </Memo>{" "}
        déclarent utiliser au moins une technologie d’IA, 15&nbsp;% sous 50
        salariés et 10&nbsp;% dans la construction (
        <a
          href="https://www.insee.fr/fr/statistiques/9025878"
          target="_blank"
          rel="noreferrer"
        >
          Insee Première n°&nbsp;2120
        </a>
        , juillet 2026). Le{" "}
        <a
          href="https://www.entreprises.gouv.fr/espace-presse/france-num-presente-la-6e-edition-de-son-barometre-annuel-sur-la-transformation"
          target="_blank"
          rel="noreferrer"
        >
          baromètre France Num 2025
        </a>{" "}
        monte à 26&nbsp;% des TPE-PME, un taux qui a doublé en un an. Dans les
        deux enquêtes, « utiliser l’IA » veut le plus souvent dire qu’un
        abonnement a été souscrit et que quelqu’un rédige ses mails avec.
        Entre cet abonnement et une tâche réellement retirée de l’agenda du
        gérant, il y a tout ce guide.
      </p>
      <p>
        C’est un guide d’achat. Il dit ce qu’une PME a intérêt à brancher en
        2027, ce qu’elle a intérêt à résilier avant, ce que ça coûte en ordre
        de grandeur HT, et ce que nous refusons de vendre en premier. Les
        fourchettes sont celles de missions livrées par{" "}
        <Link href="/auteur/pierre-legrand">Pierre Legrand</Link>, élargies
        d’un cran vers le haut ; un devis signé sort de l’
        <Link href="/contact">Audit 180°</Link>, pas de cette page. Mise à jour
        le <time dateTime="2026-09-30">30 septembre 2026</time>.
      </p>
      <PullQuote>
        Une PME de 2027 n’a pas embauché cinq salariés virtuels. Elle a retiré
        trois tâches de l’agenda du gérant, et gardé la signature.
      </PullQuote>

      <KeyTakeaways title="À retenir en 30 secondes">
        <ul>
          <li>
            La valeur ne vient pas d’un abonnement de plus. Elle vient de{" "}
            <strong>vos règles</strong> (marges, catalogue, habitudes de
            réponse) mises à portée d’un assistant, et d’un humain qui signe
            ce qui engage l’argent, le juridique ou le client.
          </li>
          <li>
            Le premier geste est une <strong>soustraction</strong> : toute
            licence ouverte à moins de 10&nbsp;% se réduit ou se résilie avant
            le moindre achat. Le budget récupéré paie souvent le premier
            chantier.
          </li>
          <li>
            Un chantier utile porte sur <strong>une tâche</strong>, dans
            l’écran déjà ouvert, entre 2 et 10&nbsp;k€ HT. Les « projets IA »
            à 15 ou 50&nbsp;k€ chiffrent autre chose.
          </li>
          <li>
            L’agent qui parle à vos clients, le devis envoyé sans relecture et
            l’analytique posée sur des données non tenues attendent. Le
            back-office passe d’abord.
          </li>
        </ul>
      </KeyTakeaways>

      <BuyingGuideTool />

      <h2>Ce qui change vraiment dans une PME en 2027</h2>
      <p>
        En 2027, l’IA utile à une PME tient en trois pièces : une mémoire
        métier, une règle de signature, et l’écran que l’équipe ouvre déjà.
        Tout le reste (le modèle retenu, l’hébergement, le protocole qui relie
        l’assistant à l’ERP) se règle après, et se change sans casser le
        reste.
      </p>
      <p>
        Concrètement, c’est une journée où vous n’ouvrez plus 600 lignes pour
        trouver trois erreurs, parce que seul l’écart vous est présenté. Où
        le commercial, client au téléphone, obtient la bonne fiche technique
        en dix secondes, avec la page d’où elle vient. Où le devis sort
        homogène d’une agence à l’autre parce qu’il part du même catalogue et
        des mêmes règles de marge, et où quelqu’un le relit avant envoi. Où
        la colère d’un client arrive d’abord sous forme de brouillon de
        réponse, avec l’historique de son dossier, et non en premier sur
        votre téléphone.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold">La pièce</th>
              <th className="py-2 pr-4 font-semibold">Ce que c’est chez vous</th>
              <th className="py-2 font-semibold">Pourquoi elle compte</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/50 align-top">
              <td className="py-2 pr-4 font-medium text-foreground">
                La mémoire métier
              </td>
              <td className="py-2 pr-4">
                Vos devis passés, vos fiches techniques, vos mails types, vos
                règles de marge, indexés une fois. Hébergés chez vous ou sur
                nos machines, c’est vous qui choisissez.
              </td>
              <td className="py-2">
                Un assistant générique ne sait pas que « chez nous, on ne
                descend jamais sous 22&nbsp;% sur la pose ». Le vôtre, si.
              </td>
            </tr>
            <tr className="border-b border-border/50 align-top">
              <td className="py-2 pr-4 font-medium text-foreground">
                La règle de signature
              </td>
              <td className="py-2 pr-4">
                L’assistant prépare. Une personne nommée tranche sur le devis,
                l’écart comptable, le message qui engage.
              </td>
              <td className="py-2">
                Un devis engage votre marge, une réponse engage votre
                relation client. La vitesse sans relecture coûte plus qu’elle
                ne rapporte.
              </td>
            </tr>
            <tr className="align-top">
              <td className="py-2 pr-4 font-medium text-foreground">
                L’écran déjà ouvert
              </td>
              <td className="py-2 pr-4">
                L’assistant vit dans le mail, dans WhatsApp ou Telegram, dans
                une fenêtre à côté de l’ERP. Jamais dans une application de
                plus à apprendre.
              </td>
              <td className="py-2">
                L’adoption se joue à la friction près. Une application
                supplémentaire est ouverte trois semaines, puis oubliée.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Il y a aussi ce que nous ne construisons pas, et que certains vous
        proposeront : un poste qui « regarde toutes les caméras », un suivi
        des badges, une IA qui « motive » l’équipe. La{" "}
        <a
          href="https://www.cnil.fr/fr/la-videosurveillance-videoprotection-au-travail"
          target="_blank"
          rel="noreferrer"
        >
          CNIL
        </a>{" "}
        rappelle que les caméras ne doivent pas filmer les salariés sur leur
        poste de travail, et elle a sanctionné un employeur dont le dispositif,
        consulté en direct sur son téléphone, plaçait un salarié « sous
        surveillance permanente et constante ». Les caméras servent à
        l’anomalie (un dépôt ouvert à 3&nbsp;h du matin), pas au management.
        Les ressources humaines reçoivent un aide-mémoire pour le dirigeant,
        pas un chef d’orchestre.
      </p>

      <h2>Commencez par soustraire : les licences ouvertes à 10&nbsp;%</h2>
      <p>
        Avant d’acheter un outil d’IA, ouvrez les factures des éditeurs que
        vous payez déjà. Dans la plupart des PME de 10 à 20 personnes que nous
        auditons, le premier gain se trouve dans une résiliation, pas dans un
        abonnement de plus. Le réflexe 2026 consistait à ajouter Copilot, un
        CRM, Make ou Notion. Le réflexe 2027 consiste à demander, outil par
        outil : qui s’en est servi, cette semaine ?
      </p>
      <p>L’inventaire tient en une après-midi.</p>
      <ol>
        <li>
          <strong>Exportez les factures éditeurs</strong> des douze derniers
          mois et rangez-les en trois colonnes : facturé au siège (Copilot,
          ChatGPT Team, Odoo, Monday), facturé au forfait (Make, Zapier, un
          logiciel métier), facturé par un prestataire (l’intégrateur, la
          régie).
        </li>
        <li>
          <strong>Comptez les sièges payés et les personnes qui ont ouvert
          l’outil</strong> sur les trente derniers jours. Le centre
          d’administration Microsoft 365 publie ces rapports d’utilisation ;
          Odoo liste les applications installées et les utilisateurs actifs ;
          pour les autres, une question à la cantonade suffit souvent.
        </li>
        <li>
          <strong>Sous 10&nbsp;% d’usage réel, réduisez ou résiliez</strong>{" "}
          avant tout achat. Ne « formez pas mieux » à un outil que personne
          n’a demandé. Le budget récupéré va sur une seule tâche à volume.
        </li>
      </ol>
      <p>
        Les ordres de grandeur ci-dessous valent pour une PME de 12 à 20
        personnes. Ce n’est pas une étude de marché, c’est ce que nous
        retrouvons sur les factures.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold">Vous payez déjà</th>
              <th className="py-2 pr-4 font-semibold">Tarif public</th>
              <th className="py-2 pr-4 font-semibold">Le piège des 10&nbsp;%</th>
              <th className="py-2 font-semibold">À la place</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/50 align-top">
              <td className="py-2 pr-4 font-medium text-foreground">
                Microsoft 365 Copilot
              </td>
              <td className="py-2 pr-4">
                Complément Copilot Business :{" "}
                <a
                  href="https://www.microsoft.com/fr-fr/microsoft-365-copilot/pricing"
                  target="_blank"
                  rel="noreferrer"
                >
                  18,20&nbsp;€ HT par utilisateur et par mois
                </a>{" "}
                au catalogue France, 15,60&nbsp;€ la première année sur
                engagement annuel (offre valable jusqu’au 31 décembre 2026).
              </td>
              <td className="py-2 pr-4">
                Quinze licences, deux personnes qui cliquent. Soit{" "}
                <Memo type="num" label="~3 300 € HT / an à vide">
                  ~{COPILOT_GHOST_YEAR_EUR.toLocaleString("fr-FR")}&nbsp;€ HT
                  par an
                </Memo>{" "}
                pour des sièges vides, alors que Copilot Chat est{" "}
                <a
                  href="https://learn.microsoft.com/fr-fr/microsoft-365/copilot/microsoft-365-copilot-licensing"
                  target="_blank"
                  rel="noreferrer"
                >
                  déjà compris
                </a>{" "}
                dans les abonnements Business éligibles.
              </td>
              <td className="py-2">
                Deux ou trois sièges, pour les personnes dont la journée se
                passe dans Outlook et Teams. Le métier (devis, PDF, écarts) se
                branche sur le catalogue et l’ERP, pas sur Word.
              </td>
            </tr>
            <tr className="border-b border-border/50 align-top">
              <td className="py-2 pr-4 font-medium text-foreground">
                Odoo + intégrateur
              </td>
              <td className="py-2 pr-4">
                À partir de{" "}
                <a
                  href="https://www.odoo.com/fr_FR/pricing-plan"
                  target="_blank"
                  rel="noreferrer"
                >
                  19,90&nbsp;€ HT par utilisateur et par mois
                </a>{" "}
                (plan Standard, engagement annuel), plus le devis de
                l’intégrateur : 3&nbsp;500&nbsp;€ déjà vus pour une remise à
                plat.
              </td>
              <td className="py-2 pr-4">
                Quinze applications installées, cinq utilisées. Chaque réglage
                repasse par le prestataire, à la journée.
              </td>
              <td className="py-2">
                Un socle de cinq à sept modules, paramétré et expliqué à
                l’équipe. Cas publié : quatre jours de travail au lieu du
                devis à 3&nbsp;500&nbsp;€.
              </td>
            </tr>
            <tr className="border-b border-border/50 align-top">
              <td className="py-2 pr-4 font-medium text-foreground">
                Sage, EBP, Ciel
              </td>
              <td className="py-2 pr-4">
                Sage 50 Comptabilité Simply : environ{" "}
                <a
                  href="https://www.sage.com/fr-fr/-/media/files/sagedotcom/france/documents/pdf/conditions-generales/2026/guide-produits-et-tarifs_2026_01_15_sans_spc.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  252&nbsp;€ HT par an
                </a>{" "}
                pour un poste (guide tarifs de janvier 2026). EBP Gestion
                Commerciale Pro : de l’ordre de 50 à 60&nbsp;€ HT par mois, un
                utilisateur compris. Ces outils se facturent au poste, pas au
                siège.
              </td>
              <td className="py-2 pr-4">
                Un module CRM, stock ou « IA » acheté en plus, et Excel qui
                reste la source de vérité.
              </td>
              <td className="py-2">
                On ne migre pas pour migrer. On relie : export, rapprochement
                des écarts, assistant par-dessus ce qui fonctionne.
              </td>
            </tr>
            <tr className="border-b border-border/50 align-top">
              <td className="py-2 pr-4 font-medium text-foreground">
                ChatGPT Team, Claude pour toute l’équipe
              </td>
              <td className="py-2 pr-4">
                Quelques dizaines d’euros par utilisateur et par mois.
              </td>
              <td className="py-2 pr-4">
                Tout le monde a un siège, personne n’a le contexte de
                l’entreprise : ni les marges, ni le catalogue, ni les
                habitudes de réponse.
              </td>
              <td className="py-2">
                Un à trois sièges, et une mémoire métier partagée (devis,
                PDF, règles) que chaque siège consulte.
              </td>
            </tr>
            <tr className="align-top">
              <td className="py-2 pr-4 font-medium text-foreground">
                Make, Zapier, Monday
              </td>
              <td className="py-2 pr-4">
                De 20 à 300&nbsp;€ par mois selon le volume, ou 8 à 20&nbsp;€
                par utilisateur.
              </td>
              <td className="py-2 pr-4">
                Des scénarios cassés que plus personne n’ose toucher. Le vrai
                kanban est resté sur le tableau blanc.
              </td>
              <td className="py-2">
                Une brique, mesurée. Par exemple la relance de devis qui
                s’arrête dès que le client répond.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">{DISCLAIMER}</p>
      <Callout>
        <p>
          <strong>
            <Memo type="idea" label="Règle des 10 %">
              Règle des 10&nbsp;%.
            </Memo>
          </strong>{" "}
          Si moins d’une personne sur dix a ouvert l’outil cette semaine, on
          ne forme pas mieux, on réduit ou on résilie, et le budget va sur une
          seule tâche à volume. Ce n’est pas une politique d’économies, c’est
          une politique d’attention : moins d’outils, plus de gestes finis.
        </p>
      </Callout>

      <h2>Combien ça coûte : 15 à 50&nbsp;k€ sur le marché, 2 à 10&nbsp;k€ pour une tâche</h2>
      <p>
        Un premier chantier d’IA utile dans une PME coûte entre 2 000 et
        10 000&nbsp;€ HT quand il porte sur une seule tâche, branchée sur les
        outils en place, avec un humain qui valide. Les pages qui annoncent
        15 000 à 50 000&nbsp;€ HT ne mentent pas : elles chiffrent un
        « projet IA » à périmètre ouvert, souvent avec une nouvelle stack à
        installer et à faire adopter. L’écart vient du périmètre. Accélérer
        une tâche que l’équipe fait déjà, dans l’écran qu’elle ouvre déjà,
        demande moins de semaines et moins de logiciels qu’en installer une
        nouvelle.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold">Poste</th>
              <th className="py-2 pr-4 font-semibold">Ce que le web répond</th>
              <th className="py-2 font-semibold">Ce que nous livrons</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {MARKET_VS_US.map((row) => (
              <tr key={row.item} className="border-b border-border/50 align-top">
                <td className="py-2 pr-4 font-medium text-foreground">
                  {row.item}
                </td>
                <td className="py-2 pr-4">{row.market}</td>
                <td className="py-2">{row.us}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Trois choses font bouger une fourchette. La propreté des données
        d’abord : un catalogue plein de doublons ou un plan comptable
        approximatif ajoute des jours, parce qu’il faut remettre en ordre
        avant de brancher quoi que ce soit. Le nombre d’écrans à toucher
        ensuite : un assistant qui lit l’ERP coûte moins qu’un assistant qui
        lit l’ERP, le mail et le portail fournisseur. Le niveau de validation
        enfin : plus la règle de signature est stricte, plus il faut de
        temps pour la calibrer, et c’est du temps bien placé. Dans nos
        fourchettes, nous comptons le cadrage, la mise en place, la formation
        de la personne qui valide et le suivi des écarts les premières
        semaines. Les abonnements aux modèles (quelques dizaines d’euros par
        mois) et la reprise d’un catalogue sale restent à part.
      </p>
      <p>
        Onze portes, une par situation. La première colonne est la phrase
        que vous prononceriez ; la dernière dit ce que vous gardez et ce que
        vous n’achetez pas.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold">Si c’est ça, chez vous</th>
              <th className="py-2 pr-4 font-semibold">Porte</th>
              <th className="py-2 pr-4 font-semibold">Ordre de grandeur</th>
              <th className="py-2 font-semibold">Vous gardez (vous n’achetez pas)</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {DOOR_TABLE_ORDER.map((id) => {
              const d = DOORS[id];
              return (
                <tr key={id} className="border-b border-border/50 align-top">
                  <td className="py-2 pr-4 font-medium text-foreground">
                    {d.when}
                  </td>
                  <td className="py-2 pr-4">{d.title}</td>
                  <td className="py-2 pr-4">{d.range}</td>
                  <td className="py-2">
                    {d.keep}{" "}
                    <span className="text-foreground/80">({d.cut})</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">{DISCLAIMER}</p>
      <p>
        Ces fourchettes s’appuient sur des chantiers déjà publiés, pas sur
        des promesses. Un assistant de chiffrage chez une PME du BTP a ramené
        le devis de{" "}
        <Memo type="num" label="2 h → 15 min">
          deux heures à quinze minutes
        </Memo>
        , avec relecture avant envoi. Un Odoo bloqué chez l’intégrateur a été
        remis d’aplomb en quatre jours, face à un devis à 3&nbsp;500&nbsp;€.
        Et chez une PME de négoce technique en Île-de-France, le catalogue
        comptait ses fiches en centaines de milliers pour quelques milliers
        de produits réellement en stock :{" "}
        <Memo type="idea" label="Aucun agent ne rattrape des données non tenues">
          aucun agent ne rattrape des données non tenues
        </Memo>
        . On remet le catalogue en ordre, puis on ouvre le portail. L’ordre
        inverse échoue toujours.
      </p>
      <p>
        Une limite, franche : si vous n’avez ni catalogue, ni file de mails
        structurée, ni logiciel de gestion, ces fourchettes ne s’appliquent
        pas. Il vous faut d’abord un processus écrit, pas un assistant.
      </p>

      <AtelierCallout />

      <h2>La règle de signature : l’IA prépare, quelqu’un chez vous tranche</h2>
      <p>
        <Memo type="idea" label="L'IA prépare, un humain signe">
          Tout ce qui engage la marge, le juridique ou la relation client est
          préparé par l’assistant et signé par une personne nommée
        </Memo>
        . Le reste (tri, recherche, premier jet, compte rendu) peut partir
        seul, avec une relecture a posteriori les premières semaines. Cette
        règle est la seule pièce du dispositif qui ne se négocie pas au
        démarrage, parce qu’elle protège ce que l’IA ne voit pas : un devis
        engage votre marge, une réponse à un client mécontent engage dix ans
        de relation, une écriture comptable engage le bilan.
      </p>
      <p>
        Elle se relâche ensuite, mais sur des écarts mesurés, jamais sur une
        promesse. Après trois mois, vous savez combien de lignes de devis
        l’assistant a proposées et combien ont été corrigées. Si les lignes
        standard (une pose au mètre, une référence catalogue) sortent justes
        à chaque fois, elles peuvent passer en validation automatique, et la
        relecture se concentre sur les lignes inhabituelles. Si le taux de
        correction ne descend pas, le problème n’est pas l’assistant, ce sont
        les règles de marge qui ne sont pas écrites, et c’est une information
        utile en soi.
      </p>
      <Callout>
        <p>
          <strong>À retenir.</strong> La validation humaine n’est pas une
          prudence transitoire qu’on retire dès que « ça marche ». Elle est
          le mécanisme par lequel vous apprenez, chiffres en main, où
          l’assistant est fiable et où il ne l’est pas encore.
        </p>
      </Callout>

      <h2>Après 90 jours : ce qui devient discutable</h2>
      <p>
        Une fois le premier geste en production depuis trois mois, trois
        sujets s’ouvrent. Avant, nous les refusons : trop de surface, trop de
        confiance accordée à un outil que personne n’a encore corrigé.
      </p>
      <ul>
        <li>
          <strong>Brancher l’assistant sur l’ERP.</strong> En lecture seule
          d’abord, en écriture ensuite. L’assistant voit les stocks, les
          clients, l’historique des commandes, sous les droits de la personne
          qui l’interroge (via un serveur MCP, le protocole qui relie un
          assistant à un logiciel métier). Ce n’est pas un second logiciel à
          apprendre, c’est le vôtre qui répond aux questions.
        </li>
        <li>
          <strong>Les dossiers que vous n’envoyez nulle part.</strong>{" "}
          Contrats, pièces d’un litige, éléments de rémunération : le modèle
          tourne chez vous, ou sur nos machines, sans passer par un service
          américain. Vous choisissez.
        </li>
        <li>
          <strong>Le portail de réassort pour les clients réguliers.</strong>{" "}
          Ils commandent seuls, sans ressaisie chez vous. La condition n’est
          pas négociable : le catalogue est propre. Sinon le portail expose le
          désordre à vos clients.
        </li>
      </ul>

      <h2>Ce que nous refusons de vendre en premier</h2>
      <p>
        Quatre chantiers sont techniquement faisables aujourd’hui et
        n’entrent pas dans un premier devis chez nous. Ils reviennent par
        crans, quand le cran précédent a tenu.
      </p>
      <ul>
        <li>
          <strong>L’agent qui parle à vos clients.</strong> Vos clients
          réguliers appellent aussi pour parler à quelqu’un, et une réponse
          ratée coûte plus qu’une heure de tri. On commence par le
          back-office : ressaisie, recherche sourcée, brouillons que le
          commercial relit. Le premier niveau automatisé vient ensuite, sur
          les sujets sans enjeu.
        </li>
        <li>
          <strong>Le devis envoyé sans relecture.</strong> Voir la règle de
          signature ci-dessus. Cran 1, tout est relu ; cran 2, les lignes
          standard passent seules, sur des écarts mesurés.
        </li>
        <li>
          <strong>L’analytique posée sur des données non tenues.</strong> Si
          le plan comptable ou le catalogue est faux, l’assistant ne le
          corrige pas, il industrialise l’erreur. On chiffre d’abord la
          remise en ordre, souvent moins lourde que redouté, puis on branche
          l’analytique dessus.
        </li>
        <li>
          <strong>La migration d’ERP « pour l’IA ».</strong> Un ERP se change
          quand il bloque le métier, pas parce qu’un assistant aurait besoin
          d’une API. Si Sage ou EBP tiennent le quotidien, on relie, on ne
          remplace pas.
        </li>
      </ul>
      <p>
        Si vous voulez d’abord vous situer sans parler budget, l’explorateur
        de la <Link href="/">page d’accueil</Link> croise votre métier et vos
        outils en place, et dit ce qui est déjà en production, ce qui se
        cadre, et ce qui attend. Le hub{" "}
        <Link href="/augmenter-mon-entreprise">Augmenter mon entreprise</Link>{" "}
        range les autres ressources par douleur.
      </p>

      <h2>Questions fréquentes</h2>
      {faqItems.map((item) => (
        <div key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}

      <h2>Par où commencer cette semaine</h2>
      <p>
        Trois choses se font sans nous, et valent d’être faites avant tout
        rendez-vous. Sortez les factures éditeurs et comptez les sièges
        ouverts sur trente jours. Notez le geste que vous, ou quelqu’un de
        l’équipe, refaites chaque jour en soupirant. Décidez qui, chez vous,
        signera ce que l’assistant prépare. Avec ces trois réponses, un
        premier chantier se cadre en une heure.
      </p>
      <p>
        Cette heure, c’est l’<Link href="/contact">Audit 180°</Link> : vos
        outils, vos processus, vos factures. Nous vous disons ce qu’on
        branche, ce qu’on laisse, ce qu’on résilie, et nous vous orientons
        ailleurs si le sujet n’est pas pour nous. Sur rendez-vous, en visio
        partout en France ou en présentiel dans les Yvelines et le
        Val-d’Oise. Si l’équipe doit d’abord apprendre à se servir de
        l’outil elle-même, l’
        <Link href="/atelier-claude-code-dirigeant">
          atelier Claude Cowork
        </Link>{" "}
        commence à 450&nbsp;€ HT la demi-journée, sur vos cas. La méthode
        complète est décrite sur <Link href="/approche">l’approche</Link>.
      </p>
      <p>
        Et si l’inventaire montre que tout est utilisé, que rien ne bloque
        et que personne ne soupire, gardez ce guide sous le coude. Vous
        n’avez pas besoin de nous cette année.
      </p>
    </ArticleLayout>
  );
}
