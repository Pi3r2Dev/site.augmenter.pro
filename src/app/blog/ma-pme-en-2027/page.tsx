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
  title: "Guide d'achat IA PME 2027 : ce qu'on branche, ce qu'on coupe",
  description:
    "En 2027, la PME qui s'en sort n'a pas embauché une armée d'agents. Devis express HT, licences déjà payées, ce qu'on refuse. Audit 180° ou atelier dès 450 €.",
  slug: "ma-pme-en-2027",
});

const faqItems = [
  {
    question:
      "Combien coûte le déploiement de l'IA dans une PME française en 2026-2027 ?",
    answer:
      "Selon Pierre Legrand (augmenter.PRO, guide d'achat septembre 2026), un premier chantier utile — une tâche, branché sur les outils déjà là, avec validation humaine — se situe entre environ 2 000 et 10 000 € HT. L'Audit 180° (60 min) n'est pas facturé ; la cartographie 6 mois coûte 550 € HT ; former l'équipe à Claude Cowork commence à 450 € HT la demi-journée. Les pages qui annoncent 15 000 à 50 000 € parlent souvent d'un « projet IA » générique. L'écart, c'est le périmètre : on soustrait les licences fantômes, on n'ajoute pas une stack.",
  },
  {
    question:
      "Faut-il Microsoft 365 Copilot pour toute l'équipe d'une PME ?",
    answer:
      "Non. Copilot Chat est déjà inclus dans les offres Microsoft 365 Business éligibles : c'est un chat ancré sur le web, pas sur vos mails ni vos fichiers. Le complément Copilot Business coûte 18,20 € HT par utilisateur et par mois au catalogue France (promo 15,60 € jusqu'au 30 septembre 2026, première année). Quinze sièges à ce tarif, c'est environ 3 300 € HT par an. On ne les achète que là où le flux mail et réunion est réel — deux ou trois personnes, pas quinze.",
  },
  {
    question: "Un agent IA peut-il répondre aux clients à la place du commercial ?",
    answer:
      "augmenter.PRO refuse de le vendre en premier. On commence par le back-office : ressaisie, recherche sourcée, préparation des réponses. Le téléphone et le lien commercial restent les vôtres. En France, la CNIL juge excessive une surveillance constante des salariés ; un agent qui « décroche tout » pose le même problème de confiance, côté client.",
  },
  {
    question:
      "Faut-il changer d'ERP (Sage, EBP, Odoo) pour faire de l'IA ?",
    answer:
      "Non. Si Sage ou EBP suffisent au quotidien, on pont : export, écarts, assistant par-dessus ce qui marche. On ne migre pas « pour l'IA ». Odoo n'est un chantier que s'il est déjà là et bloqué chez l'intégrateur — cas déjà mesuré : 4 jours de remise d'aplomb plus formation, contre un devis à 3 500 €.",
  },
  {
    question: "Par où commencer si tout passe encore par le gérant ?",
    answer:
      "Par le geste quotidien que personne n'aime, et par la facture éditeur ouverte à moins de 10 % d'usage réel. Souvent le premier livrable est une résiliation partielle — Copilot trop large, apps Odoo allumées pour rien — puis un copilote de triage et de comptes rendus qui produisent des actions. Vous signez encore. Vous ne triez plus.",
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

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Choisir quoi acheter en IA pour une PME en 2027",
  description:
    "Trois questions pour orienter un dirigeant de PME vers une porte d'entrée chiffrée, et vers ce qu'il ne faut pas acheter.",
  totalTime: "PT5M",
  step: [
    {
      "@type": "HowToStep",
      name: "Le geste quotidien",
      text: "Identifier le geste qui revient tous les jours et que personne n'aime : devis, PDF, rapprochement, file mail, relance, commande.",
    },
    {
      "@type": "HowToStep",
      name: "Les licences fantômes",
      text: "Ouvrir les factures éditeurs. Si l'usage réel de la semaine est sous 10 %, résilier ou réduire les sièges avant d'ajouter un outil.",
    },
    {
      "@type": "HowToStep",
      name: "La validation humaine",
      text: "Si ça engage la marge, le juridique ou le client, l'IA prépare et un humain signe. Sinon on peut aller plus vite, avec une revue a posteriori les premières semaines.",
    },
  ],
};

export default function Article() {
  return (
    <ArticleLayout
      title="Ma PME en 2027 : vous n'êtes plus obligé d'être cinq personnes à la fois"
      excerpt="Guide d'achat pour dirigeant. Devis express, comparatif avec les logiciels déjà payés, ce qu'on branche — et ce qu'on refuse encore de vendre."
      tags={["IA", "PME"]}
      readTime="16 min"
      date="18 septembre 2026"
      dateISO="2026-09-18"
      dateModified="2026-09-18"
      image="/images/blog/ma-pme-en-2027.webp"
      slug="ma-pme-en-2027"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      <p>
        En France, en 2025,{" "}
        <Memo type="num" label="18 % des entreprises 10+">
          18&nbsp;% des entreprises de 10 salariés ou plus
        </Memo>{" "}
        déclarent au moins une technologie d&apos;IA —{" "}
        <Memo type="num" label="10 % dans le BTP">
          10&nbsp;% dans la construction
        </Memo>
        . Source :{" "}
        <a
          href="https://www.insee.fr/fr/statistiques/9025878"
          target="_blank"
          rel="noreferrer"
        >
          Insee Première n°&nbsp;2120
        </a>
        , 21 juillet 2026. Le Baromètre{" "}
        <a
          href="https://www.francenum.gouv.fr/guides-et-conseils/strategie-numerique/comprendre-le-numerique/barometre-france-num-2025-le"
          target="_blank"
          rel="noreferrer"
        >
          France Num 2025
        </a>{" "}
        monte à 26&nbsp;% des TPE-PME, mais l&apos;usage utile reste minuscule :{" "}
        6&nbsp;% analysent des documents, 5&nbsp;% automatisent une tâche. Le
        reste, c&apos;est du texte généré. Vous «&nbsp;utilisez l&apos;IA&nbsp;».
        Vous n&apos;avez rien déployé.
      </p>
      <p>
        Mardi, 23&nbsp;h, parking. WhatsApp d&apos;un client mécontent, mail
        d&apos;un écart comptable, devis d&apos;une agence à un autre prix que
        l&apos;agence d&apos;à côté. Personne n&apos;a «&nbsp;un problème
        d&apos;IA&nbsp;». Le gérant d&apos;une PME de 5 à 80 personnes{" "}
        <strong>est déjà cinq postes</strong> : il survole la compta, la file
        mail, les RH, les conflits, parfois les caméras. L&apos;IA utile, c&apos;est
        celle qui l&apos;en sort — pas cinq surveillants de plus.
      </p>
      <PullQuote>
        Copilote 2027, selon augmenter.PRO : une IA dans les outils déjà payés,
        qui prépare ; un humain qui signe l&apos;argent, le juridique et le
        client.
      </PullQuote>
      <p>
        Mise à jour du{" "}
        <time dateTime="2026-09-18">18 septembre 2026</time>. Les fourchettes
        ci-dessous sont un devis express — ordres de grandeur HT, missions
        78/95 ou visio, signées par{" "}
        <Link href="/auteur/pierre-legrand">Pierre Legrand</Link>. Pas un devis
        signé. Le chiffrage précis sort de l&apos;
        <Link href="/contact">Audit 180°</Link>.
      </p>

      <KeyTakeaways title="À retenir en 30 secondes">
        <ul>
          <li>
            La valeur n&apos;est pas dans un nouvel abonnement. Elle est dans{" "}
            <strong>vos règles</strong> (marges, catalogue, PDF, habitudes) et
            dans une validation humaine sur l&apos;argent, le juridique, le
            client.
          </li>
          <li>
            Avant d&apos;acheter de l&apos;IA, on regarde ce qui est{" "}
            <strong>payé et utilisé à 10&nbsp;%</strong>. Souvent l&apos;économie
            est là : on coupe, on ne rajoute pas.
          </li>
          <li>
            Un chantier utile chez nous :{" "}
            <Memo type="num" label="~2 à 10 k€ HT une tâche">
              ~2 à 10&nbsp;k€ HT
            </Memo>
            , une tâche, overlay sur l&apos;existant. Les pages qui vendent
            15–50&nbsp;k€ un «&nbsp;projet IA&nbsp;» n&apos;ont pas ouvert vos
            factures éditeurs.
          </li>
          <li>
            On refuse l&apos;agent qui parle à vos clients. Back-office d&apos;abord.
          </li>
        </ul>
      </KeyTakeaways>

      <BuyingGuideTool />

      <h2>2027, ce n&apos;est pas l&apos;IA qui gère l&apos;entreprise</h2>
      <p>
        C&apos;est une journée où le dirigeant n&apos;ouvre plus 600 lignes pour
        trouver trois erreurs. Où le commercial, client au téléphone, a la{" "}
        <strong>bonne fiche technique citée</strong> en dix secondes. Où un
        devis sort homogène d&apos;une agence à l&apos;autre — et quelqu&apos;un{" "}
        <strong>valide</strong> avant envoi. Où la colère d&apos;un client
        n&apos;atterrit plus en premier sur le gérant, à 23&nbsp;h, dans la
        voiture.
      </p>
      <p>
        Trois organes. Pas cinq agents. C&apos;est l&apos;architecture que nous
        vendons déjà — audit, intégration, co-construction. Le code n&apos;est
        que le support.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold">Organe</th>
              <th className="py-2 pr-4 font-semibold">En français</th>
              <th className="py-2 font-semibold">Ce que ça change</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4 font-medium text-foreground">
                Le coffre-fort métier
              </td>
              <td className="py-2 pr-4">
                Vos devis, PDF, mails, règles de marge — indexés, chez vous ou
                chez nous, <strong>vous choisissez</strong>
              </td>
              <td className="py-2">
                L&apos;IA générique ne connaît pas «&nbsp;chez nous, on fait
                comme ça&nbsp;»
              </td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4 font-medium text-foreground">
                Le droit de signer
              </td>
              <td className="py-2 pr-4">
                L&apos;IA propose. Un humain tranche sur le devis, l&apos;écart
                comptable, le message qui engage
              </td>
              <td className="py-2">
                Vous vendez de la sérénité, pas de la vitesse aveugle
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-4 font-medium text-foreground">
                L&apos;écran déjà ouvert
              </td>
              <td className="py-2 pr-4">
                Extension, mail, Telegram, overlay Odoo —{" "}
                <strong>pas une app de plus</strong>
              </td>
              <td className="py-2">L&apos;adoption se joue à la friction près</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Ce qu&apos;on ne construit pas : un poste qui «&nbsp;regarde toutes les
        caméras&nbsp;», un flicage des badges, une IA qui «&nbsp;incentive&nbsp;»
        l&apos;équipe. En France, c&apos;est toxique — et ce n&apos;est pas
        augmenter.PRO. La{" "}
        <a
          href="https://cnil.fr/fr/la-videosurveillance-videoprotection-au-travail"
          target="_blank"
          rel="noreferrer"
        >
          CNIL
        </a>{" "}
        juge excessive une caméra au-dessus du poste, images en direct sur le
        téléphone du gérant. Les caméras, uniquement en{" "}
        <strong>anomalie</strong> (chantier, dépôt, sécurité). Les RH : un
        aide-mémoire pour le boss, pas un chef d&apos;orchestre.
      </p>

      <h2>D&apos;abord soustraire : les logiciels payés, ouverts à 10&nbsp;%</h2>
      <p>
        Le réflexe 2026, c&apos;est d&apos;ajouter Copilot, un CRM, Make,
        Notion. Le réflexe 2027, c&apos;est d&apos;ouvrir les factures éditeurs
        et de demander : <strong>qui s&apos;en sert, vraiment, cette
        semaine&nbsp;?</strong> Ordres de grandeur, pas une étude de marché.
        Une PME type 12–20 personnes.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold">Vous payez déjà</th>
              <th className="py-2 pr-4 font-semibold">Tarif public (ordre)</th>
              <th className="py-2 pr-4 font-semibold">Le piège 10&nbsp;%</th>
              <th className="py-2 font-semibold">À la place</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/50 align-top">
              <td className="py-2 pr-4 font-medium text-foreground">
                Microsoft 365 Copilot
              </td>
              <td className="py-2 pr-4">
                <a
                  href="https://www.microsoft.com/fr-fr/microsoft-365-copilot/pricing"
                  target="_blank"
                  rel="noreferrer"
                >
                  18,20&nbsp;€ HT / user / mois
                </a>{" "}
                au catalogue ; promo 15,60&nbsp;€ jusqu&apos;au{" "}
                <strong>30 sept. 2026</strong> (1re année)
              </td>
              <td className="py-2 pr-4">
                15 licences, 2 personnes cliquent.{" "}
                <Memo type="num" label="~3 300 € HT / an à vide">
                  ~{COPILOT_GHOST_YEAR_EUR.toLocaleString("fr-FR")}&nbsp;€ HT / an
                </Memo>{" "}
                pour du vide. Copilot Chat est souvent{" "}
                <a
                  href="https://learn.microsoft.com/fr-fr/microsoft-365/copilot/microsoft-365-copilot-licensing"
                  target="_blank"
                  rel="noreferrer"
                >
                  déjà inclus
                </a>
              </td>
              <td className="py-2">
                2–3 licences là où le mail vit. Le métier (devis, PDF, écarts)
                se branche sur Odoo / le catalogue, pas sur Word
              </td>
            </tr>
            <tr className="border-b border-border/50 align-top">
              <td className="py-2 pr-4 font-medium text-foreground">
                Odoo + intégrateur
              </td>
              <td className="py-2 pr-4">
                <a
                  href="https://www.odoo.com/pricing"
                  target="_blank"
                  rel="noreferrer"
                >
                  19,90–29,90&nbsp;€ / user / mois
                </a>{" "}
                (promo 1re année) + devis intégrateur type{" "}
                <strong>3&nbsp;500&nbsp;€</strong>
              </td>
              <td className="py-2 pr-4">
                15 apps allumées, 5 utilisées. Chaque tweak = rappeler le
                prestataire
              </td>
              <td className="py-2">
                Socle 5–7 modules. Paramétrage + formation (cas réel :{" "}
                <strong>4 jours</strong> au lieu de 3&nbsp;500&nbsp;€)
              </td>
            </tr>
            <tr className="border-b border-border/50 align-top">
              <td className="py-2 pr-4 font-medium text-foreground">
                Sage / EBP / Ciel
              </td>
              <td className="py-2 pr-4">
                Sage 50 Comptabilité Simply :{" "}
                <a
                  href="https://www.sage.com/fr-fr/-/media/files/sagedotcom/france/documents/pdf/conditions-generales/2026/guide-produits-et-tarifs_2026_01_15_sans_spc.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  252&nbsp;€ HT / an
                </a>
                , 1 utilisateur. EBP GC Pro : ~50–62&nbsp;€ HT / mois, 1 user
                inclus — pas «&nbsp;par siège&nbsp;» comme Copilot
              </td>
              <td className="py-2 pr-4">
                Module CRM, stock ou «&nbsp;IA&nbsp;» acheté, Excel reste la
                source de vérité
              </td>
              <td className="py-2">
                On ne migre pas pour migrer. On pont : export, écarts, assistant
                par-dessus ce qui marche
              </td>
            </tr>
            <tr className="border-b border-border/50 align-top">
              <td className="py-2 pr-4 font-medium text-foreground">
                ChatGPT Team / Claude × l&apos;équipe
              </td>
              <td className="py-2 pr-4">Dizaines d&apos;€ / user / mois</td>
              <td className="py-2 pr-4">
                Tout le monde a un siège, personne n&apos;a le{" "}
                <strong>contexte entreprise</strong>
              </td>
              <td className="py-2">
                1–3 sièges + un coffre-fort (PDF, devis, règles)
              </td>
            </tr>
            <tr className="align-top">
              <td className="py-2 pr-4 font-medium text-foreground">
                Make / Zapier / Monday
              </td>
              <td className="py-2 pr-4">20–300&nbsp;€ / mois, ou 8–20&nbsp;€ / user</td>
              <td className="py-2 pr-4">
                Scénarios cassés, ou le vrai Kanban c&apos;est le tableau blanc
              </td>
              <td className="py-2">
                Une brique, mesurée. Relance devis{" "}
                <strong>avec arrêt si le client répond</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">{DISCLAIMER}</p>
      <Callout>
        <p>
          <strong>Règle des 10&nbsp;%.</strong> Si l&apos;usage réel de la
          semaine est sous 10&nbsp;%, on ne «&nbsp;forme pas mieux&nbsp;». On{" "}
          <strong>résilie</strong> ou on réduit les sièges, et on met le budget
          sur une seule tâche à volume. C&apos;est souvent plus rentable
          qu&apos;un copilote générique — et c&apos;est de l&apos;agilité, pas
          du low-cost : moins d&apos;outils, plus de geste fini.
        </p>
      </Callout>

      <h2>Devis express : le marché à 15–50&nbsp;k€, une tâche à 2–10&nbsp;k€</h2>
      <p>
        Les pages «&nbsp;coût projet IA PME 2026&nbsp;» que les moteurs
        recopient déjà annoncent{" "}
        <strong>15&nbsp;000 à 50&nbsp;000&nbsp;€ HT</strong> un premier projet.
        Chez augmenter.PRO, le premier chantier utile est plus étroit — et
        c&apos;est voulu. On utilise l&apos;IA pour{" "}
        <strong>accélérer une tâche que vous faites déjà</strong>, dans
        l&apos;écran que l&apos;équipe ouvre déjà. Moins de semaines, moins de
        stack, plus de productivité mesurable. C&apos;est notre force : pas un
        discount, une agilité de périmètre.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold">Poste</th>
              <th className="py-2 pr-4 font-semibold">Ce que le web répond</th>
              <th className="py-2 font-semibold">Ce qu&apos;on livre</th>
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
        Fourchettes <strong>HT</strong>, missions déjà livrées. Cela ne
        s&apos;applique pas si vous n&apos;avez ni catalogue, ni file mail, ni
        ERP : d&apos;abord un process, pas un copilote.
      </p>
      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold">Si c&apos;est ça, chez vous</th>
              <th className="py-2 pr-4 font-semibold">Porte</th>
              <th className="py-2 pr-4 font-semibold">Ordre de grandeur</th>
              <th className="py-2 font-semibold">Vous gardez / vous coupez</th>
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
        Preuves déjà publiques, pas des promesses : devis BTP{" "}
        <Memo type="num" label="2 h → 15 min">
          2&nbsp;h → 15&nbsp;min
        </Memo>
        ; Odoo remis d&apos;aplomb en 4 jours contre 3&nbsp;500&nbsp;€. Un ERP
        de négoce technique en Île-de-France peut afficher des centaines de
        milliers de fiches pour quelques milliers de produits réellement en
        stock :{" "}
        <Memo type="idea" label="Aucun agent ne rattrape des données non tenues">
          aucun agent ne rattrape des données non tenues
        </Memo>
        . Catalogue d&apos;abord, portail ensuite — on refuse l&apos;ordre
        inverse.
      </p>

      <AtelierCallout />

      <h2>Cran 2, après 90 jours — pas un devis d&apos;emblée</h2>
      <p>
        Une fois le premier geste en production, trois sujets deviennent
        discutables. Avant, on les refuse : trop tôt, trop de surface, trop de
        confiance accordée à un outil que personne n&apos;a encore corrigé.
      </p>
      <ul>
        <li>
          <strong>Brancher l&apos;IA sur l&apos;ERP.</strong> Lecture seule
          d&apos;abord, écriture ensuite. En français : l&apos;assistant voit
          stocks, clients, historiques, sous vos droits — pas un second logiciel
          à apprendre.
        </li>
        <li>
          <strong>Dossiers que vous n&apos;envoyez nulle part.</strong> Contrats,
          RH, pièces d&apos;un litige : le modèle tourne chez vous, ou chez nous
          sur nos machines. Vous choisissez.
        </li>
        <li>
          <strong>Portail de réassort pour les clients réguliers.</strong> Ils
          commandent seuls. Condition non négociable : le catalogue est propre.
          Sinon le portail expose le désordre.
        </li>
      </ul>
      <Callout>
        <p>
          <strong>À retenir.</strong> Le cran 2 n&apos;est pas une ligne du
          tableau ci-dessus. C&apos;est la suite, si le cran 1 tient trois mois
          — écarts mesurés, pas une promesse.
        </p>
      </Callout>

      <h2>Ce que 2027 n&apos;est pas</h2>
      <p>
        Pas un abonnement qui subit la baisse des prix de l&apos;IA. Pas cinq
        salariés virtuels qui regardent tout. Pas une app de plus. Pas un devis
        envoyé sans relecture — un devis{" "}
        <strong>engage votre marge</strong>.
      </p>
      <p>
        C&apos;est un gérant qui n&apos;est plus comptable, standardiste, RH et
        punching ball en même temps — et une équipe qui retrouve la pièce, le
        prix, l&apos;écart,{" "}
        <strong>dans l&apos;écran qu&apos;elle a déjà</strong>.
      </p>
      <p>
        Si vous voulez d&apos;abord vous situer sans chiffre — métier × outil
        déjà en place — l&apos;explorateur de la{" "}
        <Link href="/">page d&apos;accueil</Link> montre ce qui est déjà en
        production, ce qui se cadre, ce qu&apos;on refuse d&apos;emblée. Cette
        page-ci est le guide d&apos;achat. Les deux ne se remplacent pas. Le
        hub{" "}
        <Link href="/augmenter-mon-entreprise">Augmenter mon entreprise</Link>{" "}
        range les ressources par douleur.
      </p>

      <h2>Questions fréquentes</h2>
      {faqItems.map((item) => (
        <div key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}

      <h2>Prochain cran</h2>
      <p>
        Soixante minutes. Vos outils, vos process, vos factures éditeurs. On
        vous dit ce qu&apos;on branche, ce qu&apos;on laisse, ce qu&apos;on
        résilie. Ou une demi-journée : l&apos;équipe apprend à pêcher, sur vos
        cas, dès 450&nbsp;€ HT.
      </p>
      <p>
        <Link href="/contact">
          <strong>Audit 180°</strong>
        </Link>{" "}
        — sur rendez-vous, présentiel 78/95 ou visio.{" "}
        <Link href="/atelier-claude-code-dirigeant">
          Atelier Claude Cowork / Code
        </Link>{" "}
        — dès 450&nbsp;€ HT. vite@augmenter.pro · +33 6 79 11 97 74
      </p>
      <p>
        La méthode et les tarifs d&apos;entrée sont aussi sur{" "}
        <Link href="/approche">l&apos;approche</Link>.
      </p>
    </ArticleLayout>
  );
}
