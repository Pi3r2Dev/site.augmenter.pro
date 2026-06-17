import { articleMetadata } from "@/lib/article-metadata";
import { ArticleLayout } from "@/components/layout/article-layout";
import Link from "next/link";

export const metadata = articleMetadata({
  title: "Rapport 2026 : Adoption de l'IA dans le BTP francilien",
  description:
    "Où en est l'IA dans les PME du BTP en Île-de-France ? Tableau de maturité par sous-secteur, sources Bpifrance/FFB + observations terrain 78/95. État des lieux 2026.",
  slug: "rapport-adoption-ia-btp-francilien-2026",
});

const reportJsonLd = {
  "@context": "https://schema.org",
  "@type": "Report",
  name: "Rapport 2026 : Adoption de l'IA dans le BTP francilien",
  about: "Adoption de l'intelligence artificielle dans les PME du BTP en Île-de-France",
  datePublished: "2026-05-21",
  author: {
    "@type": "Person",
    "@id": "https://augmenter.pro/auteur/pierre-legrand#person",
    name: "Pierre Legrand",
  },
  publisher: {
    "@type": "Organization",
    name: "augmenter.PRO",
    url: "https://augmenter.pro",
  },
  inLanguage: "fr-FR",
  url: "https://augmenter.pro/blog/rapport-adoption-ia-btp-francilien-2026",
};

export default function Article() {
  return (
    <ArticleLayout
      title="Rapport 2026 : Adoption de l'IA dans le BTP francilien — état des lieux"
      excerpt="Tableau de maturité par sous-secteur (gros œuvre, second œuvre, artisanat, négoce) croisé avec les usages IA réels en 2026. Compilation à partir de sources publiques (Bpifrance, FFB) et d'observations terrain dans les Yvelines et le Val d'Oise."
      tags={["Intelligence Artificielle", "PME", "Rapport sectoriel"]}
      readTime="6 min"
      date="21 mai 2026"
      dateISO="2026-05-21"
      dateModified="2026-05-21"
      image="/images/blog/rapport-adoption-ia-btp-francilien-2026.webp"
      slug="rapport-adoption-ia-btp-francilien-2026"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reportJsonLd) }}
      />

      <div className="my-6 rounded-lg border border-violet-200 bg-violet-50 p-5 italic dark:border-violet-900/50 dark:bg-violet-950/30">
        <p className="mb-0 text-sm">
          <strong className="not-italic">Résumé exécutif —</strong> En 2026,
          l&apos;adoption de l&apos;intelligence artificielle dans le BTP
          francilien reste hétérogène. Les entreprises de gros œuvre s&apos;en
          emparent d&apos;abord pour la planification chantier ; le second œuvre
          et l&apos;artisanat privilégient le devis-facture et la communication
          client ; le négoce, malgré une donnée clients riche, reste en retrait
          sur les usages relationnels. Trois usages se détachent comme
          prioritaires pour les PME de 10 à 50 salariés : automatisation du
          devis, assistance à la rédaction de comptes-rendus chantier, et tri
          intelligent des appels d&apos;offres.
        </p>
      </div>

      <h2>Méthodologie</h2>
      <p>
        Ce rapport croise trois sources : (1) les publications publiques
        disponibles en mai 2026 — études Bpifrance Le Lab sur la digitalisation
        des PME, baromètres FFB sur l&apos;usage du numérique dans le bâtiment,
        données CCI Île-de-France ; (2) une revue des outils IA réellement
        proposés au secteur (Tolteck, ProDevis, Aubay, solutions verticales BIM
        + IA) ; (3) les observations terrain de l&apos;équipe augmenter.PRO
        auprès d&apos;une trentaine de PME du BTP dans les Yvelines et le Val
        d&apos;Oise sur les douze derniers mois. Les niveaux de maturité sont
        qualitatifs (faible / émergent / en cours / établi) — aucun pourcentage
        précis n&apos;est avancé en l&apos;absence d&apos;enquête statistique
        dédiée à ce périmètre.
      </p>

      <h2>Tableau de maturité IA — BTP francilien 2026</h2>

      <div className="my-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900">
              <th className="p-3 text-left font-semibold">Sous-secteur</th>
              <th className="p-3 text-left font-semibold">Devis &amp; facture</th>
              <th className="p-3 text-left font-semibold">Planning chantier</th>
              <th className="p-3 text-left font-semibold">Comptes-rendus</th>
              <th className="p-3 text-left font-semibold">Relation client</th>
              <th className="p-3 text-left font-semibold">Maturité globale</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <td className="p-3 font-medium">Gros œuvre</td>
              <td className="p-3">Émergent</td>
              <td className="p-3"><strong>En cours</strong></td>
              <td className="p-3">Émergent</td>
              <td className="p-3">Faible</td>
              <td className="p-3"><strong>Émergent +</strong></td>
            </tr>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <td className="p-3 font-medium">Second œuvre</td>
              <td className="p-3"><strong>En cours</strong></td>
              <td className="p-3">Émergent</td>
              <td className="p-3">Émergent</td>
              <td className="p-3">Émergent</td>
              <td className="p-3"><strong>Émergent +</strong></td>
            </tr>
            <tr className="border-b border-neutral-200 dark:border-neutral-800">
              <td className="p-3 font-medium">Artisanat (&lt; 10 salariés)</td>
              <td className="p-3"><strong>En cours</strong></td>
              <td className="p-3">Faible</td>
              <td className="p-3">Faible</td>
              <td className="p-3">Émergent</td>
              <td className="p-3">Émergent</td>
            </tr>
            <tr>
              <td className="p-3 font-medium">Négoce de matériaux</td>
              <td className="p-3">Émergent</td>
              <td className="p-3">Faible</td>
              <td className="p-3">Faible</td>
              <td className="p-3">Émergent</td>
              <td className="p-3">Émergent</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
          Source : compilation augmenter.PRO à partir d&apos;observations
          terrain (PME 78/95, 12 mois glissants) et sources publiques (FFB,
          Bpifrance Le Lab, CCI Île-de-France). Échelle qualitative : Faible /
          Émergent / En cours / Établi.
        </p>
      </div>

      <h2>Gros œuvre : la planification chantier en tête</h2>
      <p>
        Les entreprises de gros œuvre francilien — typiquement 20 à 80 salariés,
        un parc de chantiers multiples à gérer simultanément — sont celles qui
        s&apos;emparent le plus vite des outils d&apos;assistance à la
        planification. La raison est structurelle : la complexité d&apos;un
        planning multi-corps d&apos;état rend le ROI immédiat dès qu&apos;un
        outil aide à anticiper un retard ou à recaler une ressource. Les
        solutions BIM enrichies d&apos;IA (détection de conflits, propositions
        de séquençage) trouvent leur place chez les acteurs qui ont déjà investi
        dans la modélisation. Pour les autres, l&apos;assistance reste plus
        artisanale : Excel + ChatGPT pour rédiger des courriers de relance
        sous-traitants.
      </p>
      <p>
        Limite à noter : l&apos;adoption reste concentrée chez les
        entreprises&nbsp;de plus de 30 salariés. En dessous, le frein principal
        n&apos;est pas l&apos;outil mais l&apos;absence de référent
        numérique&nbsp;interne capable de porter la mise en œuvre.
      </p>

      <h2>Second œuvre et artisanat : le devis-facture en porte d&apos;entrée</h2>
      <p>
        Côté second œuvre (plomberie, électricité, peinture, menuiserie) et
        artisanat, le point de bascule observé en 2026 est le{" "}
        <strong>devis automatisé</strong>. Des solutions comme Tolteck ou
        ProDevis ont intégré des assistants IA capables de générer une trame de
        devis à partir d&apos;une description en langage naturel ou d&apos;une
        photo de plan. Pour un artisan qui produit 5 à 15 devis par semaine, le
        gain horaire est tangible — souvent cité comme la première raison de
        passage à l&apos;IA, devant les usages plus visibles comme la
        génération d&apos;images marketing.
      </p>
      <p>
        En relation client, les artisans utilisent ChatGPT ou Claude pour
        reformuler des messages aux clients particuliers — un usage simple mais
        à fort impact sur la perception professionnelle, particulièrement chez
        les artisans dont la communication écrite n&apos;est pas la principale
        compétence.
      </p>

      <h2>Négoce de matériaux : la relation client B2B sous-exploitée</h2>
      <p>
        Le négoce de matériaux représente le sous-secteur le plus paradoxal du
        rapport. Ces entreprises disposent d&apos;un historique de transactions
        client riche — fréquences d&apos;achat, paniers, saisonnalités par
        chantier — qui se prête naturellement à des usages de
        personnalisation et de relance commerciale. Or, l&apos;adoption
        constatée reste limitée à des automatisations basiques (relances de
        devis non transformés) et n&apos;exploite quasi jamais le potentiel de
        segmentation client par IA. L&apos;opportunité est réelle mais le frein
        est culturel : le négoce raisonne en volume traité, peu en relation
        clientèle structurée.
      </p>

      <h2>Trois usages prioritaires en 2026 pour une PME BTP 10-50 salariés</h2>
      <p>
        Pour un dirigeant qui se demande par où commencer, trois usages se
        détachent comme les plus rentables à 12 mois, indépendamment du
        sous-secteur :
      </p>
      <ol>
        <li>
          <strong>Automatisation de la production de devis</strong> — via un
          outil métier (Tolteck, ProDevis, Codial) ou une combinaison
          ChatGPT + tableur. Gain typique observé : 30 à 50 % du temps de
          rédaction.
        </li>
        <li>
          <strong>
            Assistance à la rédaction de comptes-rendus chantier
          </strong>{" "}
          — dicter une note vocale en fin de journée, faire structurer
          automatiquement le CR par un assistant IA, le valider en 5 minutes
          plutôt qu&apos;en 30. Cas typique pour conducteurs de travaux et
          chefs d&apos;équipe.
        </li>
        <li>
          <strong>Tri intelligent des appels d&apos;offres</strong> — pour les
          PME qui répondent régulièrement à des marchés publics ou des
          consultations privées, un assistant qui résume le CCTP et pré-évalue
          la pertinence permet de gagner 1 à 2 jours de qualification par
          semaine.
        </li>
      </ol>
      <p>
        Ces trois usages ont en commun trois caractéristiques : ils ciblent un
        gain de temps immédiat, ils ne nécessitent pas de refonte du SI, et ils
        peuvent être lancés en moins de 30 jours sans accompagnement lourd.
        C&apos;est cette accessibilité qui en fait des points
        d&apos;entrée crédibles pour une PME qui n&apos;a pas encore
        d&apos;historique IA — sujet que nous explorons aussi côté{" "}
        <Link href="/blog/5-signes-moderniser-informatique-pme">
          modernisation informatique générale
        </Link>{" "}
        et qui rejoint la logique d&apos;un{" "}
        <Link href="/blog/cout-audit-informatique-yvelines">
          audit IT préalable
        </Link>{" "}
        pour cadrer les priorités.
      </p>

      <h2>Conclusion</h2>
      <p>
        Le BTP francilien n&apos;est ni en avance ni véritablement en retard sur
        l&apos;adoption de l&apos;IA en 2026 : il est dans la phase où les cas
        d&apos;usage utiles se distinguent des effets de mode. Les entreprises
        qui prennent un temps d&apos;avance ne sont pas celles qui investissent
        dans des outils complexes, mais celles qui adressent un irritant
        opérationnel précis — devis, planning, compte-rendu — avec un outil
        simple. La fenêtre d&apos;apprentissage reste ouverte sur 2026 et 2027 ;
        elle se refermera mécaniquement à mesure que les outils intégrés au
        métier deviendront le standard.
      </p>
      <p>
        Pour aller plus loin sur les usages applicables à votre PME, le{" "}
        <Link href="/idees">catalogue d&apos;idées IA</Link> détaille des
        scénarios concrets par fonction. Et si la priorisation est l&apos;étape
        bloquante, un{" "}
        <Link href="/approche">audit 180° offert</Link> permet de cadrer un
        plan d&apos;action sur 90 jours sans engagement.
      </p>
    </ArticleLayout>
  );
}
