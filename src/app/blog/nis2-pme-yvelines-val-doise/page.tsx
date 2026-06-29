import { articleMetadata } from "@/lib/article-metadata";
import { ArticleLayout } from "@/components/layout/article-layout";
import Link from "next/link";

export const metadata = articleMetadata({
  title: "NIS2 PME : Guide + Checklist de Conformité 2026",
  description:
    "NIS2 concerne-t-elle votre PME ? Qui est visé, les 10 mesures obligatoires et la checklist de conformité à cocher. Auto-diagnostic et plan d'action concret.",
  slug: "nis2-pme-yvelines-val-doise",
});

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ma PME de moins de 50 salariés est-elle concernée par NIS2 ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pas directement, sauf exceptions (fournisseur de services numériques, DNS, services de confiance). Mais si vous êtes sous-traitant d'une entité régulée — un donneur d'ordres aéronautique à Vélizy ou un hôpital à Cergy — vous serez soumis aux mêmes exigences via la chaîne d'approvisionnement. Vos clients vous imposeront des clauses cyber dans leurs contrats.",
      },
    },
    {
      "@type": "Question",
      name: "Quand NIS2 entre-t-elle en vigueur en France ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La directive européenne NIS2 est applicable depuis le 18 octobre 2024 dans ses principes. En France, la Loi Résilience qui transpose NIS2 a été adoptée par le Sénat en mars 2025 et en commission à l'Assemblée nationale en septembre 2025. En février 2026, son inscription à l'ordre du jour de l'Assemblée est toujours en attente. Le pré-enregistrement ANSSI est ouvert depuis novembre 2025 sur MonEspaceNIS2.",
      },
    },
    {
      "@type": "Question",
      name: "Combien coûte la mise en conformité NIS2 pour une PME ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un audit de cybersécurité initial coûte entre 2 000 et 10 000 € HT pour une PME standard. La mise en conformité complète (technique + gouvernance) peut atteindre 7 000 à 20 000 €. C'est à comparer au coût moyen d'une cyberattaque : 14 720 à 59 000 €, et 60% des PME victimes ferment dans les 18 mois.",
      },
    },
    {
      "@type": "Question",
      name: "Quelles sont les sanctions NIS2 pour les dirigeants ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les dirigeants peuvent être personnellement sanctionnés jusqu'à 140 000 € d'amende. Pour les entités essentielles, une interdiction temporaire d'exercer des fonctions de direction est possible. L'entreprise risque jusqu'à 10 M€ ou 2% du CA mondial (entités essentielles) ou 7 M€ / 1,4% du CA (entités importantes).",
      },
    },
    {
      "@type": "Question",
      name: "Comment savoir si mon entreprise est une entité essentielle ou importante ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Utilisez le simulateur officiel MonEspaceNIS2 de l'ANSSI (monespacenis2.cyber.gouv.fr/simulateur). En 5 à 10 minutes, vous saurez si votre entreprise est concernée. Les entités essentielles sont les grandes entreprises (> 250 salariés) dans les 11 secteurs hautement critiques. Les entités importantes sont les moyennes entreprises (50-249 salariés) dans les 18 secteurs concernés.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la checklist de conformité NIS2 pour une PME ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "La checklist NIS2 reprend les 10 mesures de l'article 21 : (1) analyse des risques et politique de sécurité écrite, (2) procédure de gestion des incidents avec notification ANSSI en 24h/72h/1 mois, (3) sauvegardes testées et plan de continuité, (4) sécurité de la chaîne d'approvisionnement (clauses cyber fournisseurs), (5) sécurité des acquisitions et développements IT, (6) évaluation régulière de l'efficacité (audits, tests), (7) cyber-hygiène et formation des employés et dirigeants, (8) cryptographie et chiffrement des données sensibles, (9) contrôle d'accès au moindre privilège, (10) authentification multi-facteurs (MFA) sur tous les accès critiques. Commencez par cocher les mesures 1, 2, 3, 7 et 10 : elles couvrent l'essentiel du risque immédiat.",
      },
    },
  ],
};

export default function Article() {
  return (
    <ArticleLayout
      title="NIS2 et PME : Guide Pratique et Checklist de Conformité 2026"
      excerpt="La directive NIS2 multiplie par 30 le nombre de PME soumises à des obligations de cybersécurité en France. Votre entreprise est-elle concernée — directement ou via vos donneurs d'ordres ? Auto-diagnostic, 10 mesures obligatoires et checklist de conformité à cocher."
      tags={["Cybersécurité", "PME", "Audit 360°"]}
      readTime="11 min"
      date="13 février 2026"
      dateISO="2026-02-13"
      dateModified="2026-06-27"
      image="/images/blog/nis2-pme-yvelines-val-doise.webp"
      slug="nis2-pme-yvelines-val-doise"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <p>
        <strong>77% des cyberattaques en France ciblent les TPE-PME</strong>{" "}
        (Cybermalveillance.gouv.fr, 2025). Et 60% des PME victimes ferment dans
        les 18 mois. Face à ce constat, l&apos;Union européenne a adopté la{" "}
        <strong>directive NIS2</strong> — qui multiplie par 30 le nombre
        d&apos;organisations soumises à des obligations de cybersécurité en
        France : de 300 entités sous NIS1 à <strong>plus de 15 000</strong>.
      </p>
      <p>
        Si vous dirigez une PME en <strong>Yvelines (78)</strong> ou en{" "}
        <strong>Val d&apos;Oise (95)</strong>, ce guide vous concerne. Pas
        parce que le mot-clé a du volume — mais parce que vos donneurs
        d&apos;ordres (Stellantis à Poissy, Dassault à Vélizy, les hôpitaux du
        95) vont vous imposer ces exigences bien avant que la loi
        française ne soit promulguée. Si vous reconnaissez certains des{" "}
        <Link href="/blog/5-signes-moderniser-informatique-pme">
          5 signes qu&apos;il est temps de moderniser votre informatique
        </Link>
        , NIS2 rend cette modernisation encore plus urgente.
      </p>

      <h2>Ce que NIS2 change pour les PME en 2026</h2>

      <h3>De 300 à 15 000+ entités : un changement d&apos;échelle radical</h3>
      <p>
        La directive NIS1 (2016) ne concernait que les grands opérateurs
        d&apos;infrastructures critiques — environ 300 entités en France.{" "}
        <strong>NIS2 élargit le périmètre à 18 secteurs</strong> et abaisse les
        seuils : toute entreprise de plus de 50 salariés ou réalisant plus de
        10 M€ de CA dans un secteur concerné devient une{" "}
        <strong>entité régulée</strong>. Et même en dessous de ces seuils,
        l&apos;obligation peut être indirecte — j&apos;y reviens plus bas, car
        c&apos;est l&apos;angle le plus sous-estimé.
      </p>

      <h3>La Loi Résilience : où en est la France ? (point février 2026)</h3>
      <p>
        Soyons transparents : <strong>la France est en retard</strong>.
        L&apos;échéance européenne de transposition était le 17 octobre 2024.
        Le projet de loi (Loi Résilience) a été adopté par le Sénat en mars 2025
        et en commission à l&apos;Assemblée nationale en septembre 2025 — à
        l&apos;unanimité. Mais en février 2026, l&apos;inscription à
        l&apos;ordre du jour de l&apos;Assemblée est toujours en attente. Le
        ministère de l&apos;Intérieur est soupçonné de freiner le processus.
      </p>
      <p>
        <strong>Ce retard ne doit pas vous rassurer.</strong> La directive
        européenne est applicable dans ses principes depuis octobre 2024.
        Le pré-enregistrement ANSSI est ouvert depuis novembre 2025. Et
        surtout : les grands donneurs d&apos;ordres imposent <em>déjà</em> des
        exigences NIS2 à leurs sous-traitants. Si vous attendez la
        promulgation de la loi pour agir, vous serez en retard.
      </p>

      <h2>Votre PME est-elle concernée ? Auto-diagnostic</h2>

      <h3>Les critères de taille</h3>
      <p>
        NIS2 distingue deux catégories d&apos;entités régulées :
      </p>
      <ul>
        <li>
          <strong>Entités essentielles</strong> : grandes entreprises (&gt; 250
          salariés, &gt; 50 M€ de CA) dans les 11 secteurs hautement critiques
          (énergie, transports, santé, infrastructures numériques, etc.)
        </li>
        <li>
          <strong>Entités importantes</strong> : moyennes entreprises (50 à 249
          salariés, 10 à 50 M€ de CA) dans les 18 secteurs concernés
        </li>
      </ul>
      <p>
        <strong>Outil officiel</strong> : le{" "}
        <a
          href="https://monespacenis2.cyber.gouv.fr/simulateur"
          target="_blank"
          rel="noopener noreferrer"
        >
          simulateur MonEspaceNIS2 de l&apos;ANSSI
        </a>{" "}
        vous permet de vérifier votre éligibilité en 5 à 10 minutes.
      </p>

      <h3>Les 18 secteurs concernés</h3>
      <p>
        <strong>11 secteurs hautement critiques</strong> (entités essentielles) :
        énergie, transports, secteur bancaire, marchés financiers, santé, eaux
        potables, eaux usées, infrastructures numériques, gestion des services
        TIC (B2B), administrations publiques, espace.
      </p>
      <p>
        <strong>7 secteurs critiques</strong> (entités importantes) : services
        postaux, gestion des déchets, produits chimiques,{" "}
        <strong>industrie manufacturière</strong>, agroalimentaire, fournisseurs
        numériques, recherche.
      </p>

      <h3>
        L&apos;obligation indirecte : sous-traitants et chaîne
        d&apos;approvisionnement
      </h3>
      <p>
        <strong>
          C&apos;est l&apos;angle le plus important et le plus sous-estimé par
          les PME.
        </strong>{" "}
        Même si votre entreprise compte moins de 50 salariés, vous pouvez être
        impacté par trois mécanismes :
      </p>
      <ul>
        <li>
          <strong>Exigences contractuelles descendantes</strong> : les entités
          régulées doivent sécuriser leur chaîne d&apos;approvisionnement. Elles
          imposeront des clauses de cybersécurité dans leurs contrats avec vous.
        </li>
        <li>
          <strong>Audits de conformité</strong> : vos clients régulés devront
          évaluer régulièrement la conformité de leurs fournisseurs. Un
          sous-traitant non conforme risque de <em>perdre ses contrats</em>.
        </li>
        <li>
          <strong>Cible privilégiée</strong> : la directive NIS2 elle-même
          mentionne que &quot;les PME sont de plus en plus la cible
          d&apos;attaques de la chaîne d&apos;approvisionnement en raison de
          leurs mesures moins rigoureuses&quot;.
        </li>
      </ul>

      <h3>
        Cas terrain : un sous-traitant aéronautique des Yvelines face à NIS2
      </h3>
      <p>
        Prenons l&apos;exemple d&apos;une PME de 35 salariés à Vélizy-Villacoublay,
        sous-traitant de rang 2 pour Dassault Aviation. Sous les seuils NIS2
        directs ? Oui. Concernée quand même ? <strong>Absolument</strong>.
        Dassault, en tant qu&apos;entité essentielle (défense + industrie
        manufacturière), devra sécuriser l&apos;ensemble de sa chaîne de
        sous-traitance. Notre sous-traitant recevra des exigences contractuelles :
        politique de sécurité formalisée, plan de continuité d&apos;activité,
        sauvegardes testées, authentification multi-facteurs. Sans ça, le
        contrat ne sera pas renouvelé.
      </p>
      <p>
        C&apos;est exactement ce type de situation que nous rencontrons dans
        nos{" "}
        <Link href="/audit-informatique-yvelines">
          audits informatiques en Yvelines
        </Link>{" "}
        — des PME qui découvrent l&apos;obligation au moment où leur donneur
        d&apos;ordres leur envoie un questionnaire de conformité cyber.
      </p>

      <h2>
        Les 10 mesures de cybersécurité obligatoires (expliquées pour
        dirigeants, pas pour DSI)
      </h2>

      <p>
        L&apos;article 21 de NIS2 impose 10 mesures minimales. Voici ce
        qu&apos;elles signifient <strong>concrètement</strong> pour une PME de
        50 à 200 salariés — en langage dirigeant :
      </p>

      <h3>1. Analyse des risques et politique de sécurité</h3>
      <p>
        <strong>Ce que ça veut dire</strong> : cartographier vos systèmes
        informatiques, identifier ce qui pourrait tomber en panne ou être
        attaqué, et formaliser une politique de sécurité écrite.{" "}
        <strong>Mon conseil</strong> : commencez par un simple inventaire de vos
        actifs critiques — serveurs, logiciels métier, données clients. 80% des
        PME que nous auditons n&apos;ont pas cette cartographie.
      </p>

      <h3>2. Gestion des incidents (24h / 72h / 1 mois)</h3>
      <p>
        <strong>Le point qui fait le plus peur aux dirigeants</strong> : en cas
        d&apos;incident significatif, vous devrez notifier l&apos;ANSSI en{" "}
        <strong>24 heures</strong> (alerte initiale), fournir un rapport
        intermédiaire en <strong>72 heures</strong>, et un rapport final
        complet en <strong>1 mois</strong>. Cela suppose d&apos;avoir des
        outils de détection et un plan de réponse prêts <em>avant</em>{" "}
        l&apos;incident.
      </p>

      <h3>3. Continuité d&apos;activité et sauvegardes</h3>
      <p>
        Sauvegardes régulières <strong>testées</strong>, plan de reprise
        après sinistre (PRA), gestion de crise. Attention : avoir une
        sauvegarde ne suffit pas — il faut l&apos;avoir testée. En cas de
        ransomware, combien de temps votre activité à Poissy ou Cergy
        serait-elle paralysée ?
      </p>

      <h3>4. Sécurité de la chaîne d&apos;approvisionnement</h3>
      <p>
        Évaluer la sécurité de <strong>vos propres fournisseurs</strong>,
        inclure des clauses cyber dans vos contrats, auditer vos prestataires
        IT. C&apos;est l&apos;effet cascade : vous devez aussi sécuriser votre
        aval, pas seulement satisfaire votre amont.
      </p>

      <h3>5 à 10. Les six autres mesures en résumé</h3>
      <ul>
        <li>
          <strong>Sécurité des acquisitions IT</strong> : sécuriser vos achats
          logiciels, mises à jour, correctifs
        </li>
        <li>
          <strong>Évaluation de l&apos;efficacité</strong> : audits réguliers,
          tests d&apos;intrusion, exercices de simulation
        </li>
        <li>
          <strong>Cyber-hygiène et formation</strong> : sensibilisation des
          employés, formation <em>obligatoire</em> des dirigeants
        </li>
        <li>
          <strong>Cryptographie</strong> : chiffrement des données sensibles au
          repos et en transit
        </li>
        <li>
          <strong>Contrôle d&apos;accès</strong> : principe du moindre
          privilège, revue des droits, gestion des identités
        </li>
        <li>
          <strong>Authentification multi-facteurs (MFA)</strong> : sur tous les
          accès critiques, VPN, messagerie
        </li>
      </ul>

      <h2>Checklist NIS2 PME : les 10 mesures à cocher</h2>
      <p>
        <strong>
          Voici la checklist de conformité NIS2 condensée en 10 points, prête à
          imprimer et à cocher.
        </strong>{" "}
        Elle reprend les exigences de l&apos;article 21 traduites en actions
        concrètes pour une PME. Notre conseil de terrain : commencez par les
        lignes marquées <strong>« Priorité »</strong> — les mesures 1, 2, 3, 7 et
        10 couvrent l&apos;essentiel du risque immédiat pour un investissement
        limité. Le reste se déploie ensuite, par paliers.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="py-2 pr-4 font-semibold text-foreground">#</th>
              <th className="py-2 pr-4 font-semibold text-foreground">Mesure</th>
              <th className="py-2 pr-4 font-semibold text-foreground">
                Ce que vous devez pouvoir montrer
              </th>
              <th className="py-2 font-semibold text-foreground">Priorité</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4">1</td>
              <td className="py-2 pr-4">Analyse des risques &amp; politique</td>
              <td className="py-2 pr-4">
                Cartographie des actifs critiques + politique de sécurité écrite
              </td>
              <td className="py-2">🔴 Priorité</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4">2</td>
              <td className="py-2 pr-4">Gestion des incidents</td>
              <td className="py-2 pr-4">
                Procédure de notification ANSSI (24h / 72h / 1 mois) prête avant
                l&apos;incident
              </td>
              <td className="py-2">🔴 Priorité</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4">3</td>
              <td className="py-2 pr-4">Continuité &amp; sauvegardes</td>
              <td className="py-2 pr-4">
                Sauvegardes <strong>testées</strong> + plan de reprise (PRA)
                documenté
              </td>
              <td className="py-2">🔴 Priorité</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4">4</td>
              <td className="py-2 pr-4">Chaîne d&apos;approvisionnement</td>
              <td className="py-2 pr-4">
                Clauses cyber dans les contrats fournisseurs + évaluation de
                leur sécurité
              </td>
              <td className="py-2">🟠 Ensuite</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4">5</td>
              <td className="py-2 pr-4">Sécurité des acquisitions IT</td>
              <td className="py-2 pr-4">
                Gestion des achats logiciels, mises à jour et correctifs
              </td>
              <td className="py-2">🟠 Ensuite</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4">6</td>
              <td className="py-2 pr-4">Évaluation de l&apos;efficacité</td>
              <td className="py-2 pr-4">
                Audits réguliers, tests d&apos;intrusion, exercices de crise
              </td>
              <td className="py-2">🟠 Ensuite</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4">7</td>
              <td className="py-2 pr-4">Cyber-hygiène &amp; formation</td>
              <td className="py-2 pr-4">
                Sensibilisation des employés + formation{" "}
                <strong>obligatoire des dirigeants</strong>
              </td>
              <td className="py-2">🔴 Priorité</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4">8</td>
              <td className="py-2 pr-4">Cryptographie</td>
              <td className="py-2 pr-4">
                Chiffrement des données sensibles au repos et en transit
              </td>
              <td className="py-2">🟠 Ensuite</td>
            </tr>
            <tr className="border-b border-border/50">
              <td className="py-2 pr-4">9</td>
              <td className="py-2 pr-4">Contrôle d&apos;accès</td>
              <td className="py-2 pr-4">
                Principe du moindre privilège + revue régulière des droits
              </td>
              <td className="py-2">🟠 Ensuite</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">10</td>
              <td className="py-2 pr-4">Authentification multi-facteurs</td>
              <td className="py-2 pr-4">
                MFA activée sur messagerie, VPN, accès distants et comptes admin
              </td>
              <td className="py-2">🔴 Priorité</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Cette checklist couvre le <em>quoi</em>. Pour le <em>comment</em> — les
        gestes techniques concrets derrière les mesures 3, 7 et 10 — notre{" "}
        <Link href="/blog/cybersecurite-pme-guide-pratique">
          guide pratique de la cybersécurité PME
        </Link>{" "}
        détaille le plan d&apos;action étape par étape. Et si vous voulez savoir
        où vous en êtes vraiment, un{" "}
        <Link href="/audit-informatique-yvelines">
          audit informatique &amp; cybersécurité
        </Link>{" "}
        passe chacun de ces 10 points au crible.
      </p>

      <h2>Sanctions : votre entreprise ET vous personnellement</h2>

      <h3>Amendes administratives</h3>
      <p>
        Les sanctions sont alignées sur le RGPD en termes de sévérité :
      </p>
      <ul>
        <li>
          <strong>Entités essentielles</strong> : jusqu&apos;à{" "}
          <strong>10 M€</strong> ou <strong>2% du CA mondial</strong> (le plus
          élevé)
        </li>
        <li>
          <strong>Entités importantes</strong> : jusqu&apos;à{" "}
          <strong>7 M€</strong> ou <strong>1,4% du CA mondial</strong>
        </li>
      </ul>

      <h3>Responsabilité personnelle du dirigeant</h3>
      <p>
        <strong>C&apos;est la vraie nouveauté de NIS2.</strong> L&apos;article
        20 stipule que les organes de direction doivent approuver les mesures de
        cybersécurité, superviser leur mise en œuvre, et suivre une formation.
        En cas de négligence : amende personnelle jusqu&apos;à{" "}
        <strong>140 000 €</strong>, et pour les entités essentielles,{" "}
        <strong>interdiction temporaire d&apos;exercer</strong>. La
        cybersécurité n&apos;est plus &quot;un truc de la DSI&quot;.
      </p>

      <h3>Le vrai calcul : ne rien faire vs se conformer</h3>
      <p>
        Le coût moyen d&apos;une cyberattaque pour une PME se situe entre{" "}
        <strong>14 720 € et 59 000 €</strong> — et peut grimper à 466 000 €
        selon la gravité (Sekost, CriseHelp). Un{" "}
        <Link href="/approche#prestations">audit de cybersécurité complet</Link> coûte
        entre 2 000 et 10 000 € HT. L&apos;investissement dans la conformité
        est un <em>assurance</em>, pas un coût.
      </p>

      <h2>
        PME des Yvelines et du Val d&apos;Oise : pourquoi vous êtes en
        première ligne
      </h2>

      <h3>
        Yvelines (78) : aéronautique, défense, automobile — et leurs
        sous-traitants
      </h3>
      <p>
        Le département des Yvelines est le <strong>2e pôle de recherche
        privée en Île-de-France</strong> avec 23 000 employés en R&amp;D.
        Stellantis (Poissy), Dassault Aviation (Vélizy), Thales, Safran,
        Renault (Guyancourt), Bouygues — autant d&apos;entités essentielles
        ou importantes au sens de NIS2 qui vont imposer des exigences cyber à
        leurs chaînes de sous-traitance. Si vous êtes sous-traitant industriel
        dans le 78, préparez-vous dès maintenant.
      </p>

      <h3>
        Val d&apos;Oise (95) : chimie, industrie, logistique Roissy
      </h3>
      <p>
        Le Val d&apos;Oise compte plus de 41 000 établissements actifs et
        concentre des secteurs directement visés par NIS2 :
        chimie/plasturgie, industrie manufacturière, et surtout le{" "}
        <strong>hub logistique de Roissy-CDG</strong> — transport aérien,
        fret, messagerie, autant de secteurs hautement critiques au sens de la
        directive. Un{" "}
        <Link href="/audit-informatique-val-doise">
          diagnostic informatique en Val d&apos;Oise
        </Link>{" "}
        est la première étape pour évaluer votre exposition.
      </p>

      <h3>BTP et services : l&apos;impact indirect par les donneurs d&apos;ordres</h3>
      <p>
        Le BTP est le secteur le plus représenté dans les deux départements
        (2 875 entreprises d&apos;installation électrique dans le 95 seul).
        Le BTP n&apos;est pas directement dans les 18 secteurs NIS2. Mais un
        sous-traitant BTP de 30 salariés à Versailles qui travaille pour
        Bouygues Construction (entité essentielle) devra démontrer sa
        conformité cyber pour <strong>conserver ses marchés</strong>. Même
        logique pour les prestataires IT intervenant dans les hôpitaux ou
        collectivités du 78/95.
      </p>

      <h2>Se mettre en conformité : plan d&apos;action en 5 étapes</h2>

      <h3>Étape 1 — Vérifier son éligibilité sur MonEspaceNIS2</h3>
      <p>
        Rendez-vous sur le{" "}
        <a
          href="https://monespacenis2.cyber.gouv.fr/simulateur"
          target="_blank"
          rel="noopener noreferrer"
        >
          simulateur ANSSI
        </a>
        . En 5 à 10 minutes, vous saurez si vous êtes directement concerné.
        Si non, évaluez votre exposition indirecte : combien de vos clients
        sont eux-mêmes des entités régulées ?
      </p>

      <h3>Étape 2 — Réaliser un audit de cybersécurité</h3>
      <p>
        Un <strong>audit 360°</strong> couvre l&apos;ensemble des 10 mesures
        NIS2 : cartographie des actifs, analyse des risques, test des
        sauvegardes, évaluation des accès, revue des contrats fournisseurs.
        C&apos;est le point de départ indispensable — on ne peut pas sécuriser
        ce qu&apos;on ne connaît pas. Nous proposons un{" "}
        <Link href="/contact">
          diagnostic initial de 60 minutes
        </Link>{" "}
        pour évaluer votre niveau de maturité.
      </p>

      <h3>Étape 3 — Déployer les 10 mesures par priorité</h3>
      <p>
        Toutes les mesures ne se valent pas en termes d&apos;urgence.{" "}
        <strong>Commencez par</strong> : (1) sauvegardes testées + PRA,
        (2) MFA sur les accès critiques, (3) politique de gestion des
        incidents. Ces trois actions couvrent 80% du risque immédiat pour un
        investissement limité.
      </p>

      <h3>Étape 4 — Former les équipes et les dirigeants</h3>
      <p>
        NIS2 impose explicitement la formation des dirigeants en
        cybersécurité. Mais la sensibilisation des employés est tout aussi
        critique : le phishing représente <strong>60% des attaques</strong>{" "}
        (CESIN). Un email de formation mensuel ne suffit pas — il faut des
        exercices pratiques (simulations de phishing, gestion de crise). Pour
        l&apos;essentiel à couvrir sans DSI ni gros budget, voir notre{" "}
        <Link href="/blog/cybersecurite-pme-guide-pratique">
          guide pratique de cybersécurité PME
        </Link>{" "}
        : 93 % des attaques passent par une erreur humaine évitable.
      </p>

      <h3>Étape 5 — Documenter, maintenir, améliorer</h3>
      <p>
        La conformité NIS2 n&apos;est pas un projet ponctuel. C&apos;est un
        processus continu : audits réguliers, mise à jour des politiques,
        tests d&apos;intrusion périodiques. Si vous construisez en parallèle
        une{" "}
        <Link href="/strategie-ia-pme">
          stratégie IA conforme et sécurisée
        </Link>
        , vous alignerez modernisation et conformité — deux investissements qui
        se renforcent mutuellement.
      </p>

      <h2>Ressources et aides disponibles en Île-de-France</h2>

      <ul>
        <li>
          <strong>ANSSI — MonEspaceNIS2</strong> :{" "}
          <a
            href="https://monespacenis2.cyber.gouv.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            simulateur d&apos;éligibilité et pré-enregistrement
          </a>
        </li>
        <li>
          <strong>MesServicesCyber</strong> :{" "}
          <a
            href="https://messervices.cyber.gouv.fr/nis2"
            target="_blank"
            rel="noopener noreferrer"
          >
            portail de notification d&apos;incidents
          </a>
        </li>
        <li>
          <strong>Cybermalveillance.gouv.fr</strong> : assistance et ressources
          sans frais pour TPE-PME
        </li>
        <li>
          <strong>CCI Yvelines (78)</strong> et{" "}
          <strong>CCI Val d&apos;Oise (95)</strong> : diagnostics cybersécurité
          avec conseillers spécialisés
        </li>
        <li>
          <strong>Urgence Cyber Île-de-France</strong> : plateforme
          d&apos;assistance régionale en cas d&apos;incident
        </li>
      </ul>
      <p>
        <strong>Limite à mentionner</strong> : les chèques diagnostic et
        investissement Cyber de la Région Île-de-France étaient dotés
        jusqu&apos;à 5 000 € et 10 000 € respectivement, mais ont été clôturés
        en février 2025. Vérifiez auprès de la Région si de nouveaux
        dispositifs ont été ouverts depuis.
      </p>

      <h2>FAQ — NIS2 et PME</h2>

      <h3>
        Ma PME de moins de 50 salariés est-elle concernée par NIS2 ?
      </h3>
      <p>
        Pas directement, sauf exceptions (fournisseur de services numériques,
        DNS, services de confiance). Mais si vous êtes sous-traitant
        d&apos;une entité régulée — un donneur d&apos;ordres aéronautique à
        Vélizy ou un hôpital à Cergy — vous serez soumis aux mêmes exigences
        via la <strong>chaîne d&apos;approvisionnement</strong>. Vos clients
        vous imposeront des clauses cyber dans leurs contrats.
      </p>

      <h3>Quand NIS2 entre-t-elle en vigueur en France ?</h3>
      <p>
        La directive européenne est applicable depuis le 18 octobre 2024. La
        Loi Résilience française est en cours d&apos;adoption (adoptée au
        Sénat mars 2025, en commission Assemblée septembre 2025). En février
        2026, l&apos;inscription à l&apos;ordre du jour est toujours en
        attente. Mais n&apos;attendez pas : le pré-enregistrement ANSSI est
        ouvert et les donneurs d&apos;ordres imposent déjà les exigences à
        leurs sous-traitants.
      </p>

      <h3>Combien coûte la mise en conformité NIS2 pour une PME ?</h3>
      <p>
        Audit initial : 2 000 à 10 000 € HT. Mise en conformité complète :
        7 000 à 20 000 €. À comparer avec le coût moyen d&apos;une
        cyberattaque (14 720 à 59 000 €) et le taux de faillite post-attaque
        (60% dans les 18 mois). L&apos;investissement est une assurance.
      </p>

      <h3>Quelles sont les sanctions NIS2 pour les dirigeants ?</h3>
      <p>
        Amende personnelle jusqu&apos;à 140 000 €. Pour les entités
        essentielles : interdiction temporaire d&apos;exercer.
        L&apos;entreprise risque jusqu&apos;à 10 M€ ou 2% du CA mondial.
      </p>

      <h3>
        Comment savoir si mon entreprise est une entité essentielle ou
        importante ?
      </h3>
      <p>
        Utilisez le{" "}
        <a
          href="https://monespacenis2.cyber.gouv.fr/simulateur"
          target="_blank"
          rel="noopener noreferrer"
        >
          simulateur MonEspaceNIS2
        </a>{" "}
        de l&apos;ANSSI. En 5 à 10 minutes, vous aurez votre réponse.
      </p>
    </ArticleLayout>
  );
}
