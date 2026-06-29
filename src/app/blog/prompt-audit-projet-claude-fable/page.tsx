import { articleMetadata } from "@/lib/article-metadata";
import Link from "next/link";
import { ArticleLayout } from "@/components/layout/article-layout";
import { AtelierCallout } from "@/components/sections/atelier-callout";
import { PromptCard } from "@/components/sections/prompt-card";

export const metadata = articleMetadata({
  title: "Auditer son logiciel métier avec l'IA : le guide PME",
  description:
    "Votre logiciel vieillit en silence. Un audit IA vérifiable, fichier par fichier, pour décider en connaissance de cause et challenger un devis de refonte. Prompt français inclus.",
  slug: "prompt-audit-projet-claude-fable",
});

const faqItems = [
  {
    question: "Qu'est-ce que le prompt d'audit Claude Fable ?",
    answer:
      "C'est un prompt structuré en 4 phases (cartographie, audit, stratégie, plan d'action) à coller comme premier message d'une session Claude Code ouverte sur un projet existant. Il transforme Claude Fable 5 en auditeur technique : chaque constat est cité fichier:ligne avec une sévérité, et le livrable final est un rapport AUDIT.md avec un plan de remise à niveau en jalons.",
  },
  {
    question: "Faut-il absolument Claude Fable 5, ou ça marche avec d'autres modèles ?",
    answer:
      "Le prompt fonctionne avec Claude Opus ou Sonnet, mais Fable 5 (disponibilité générale depuis le 9 juin 2026) tient mieux les très longues sessions d'analyse et la planification multi-étapes — exactement le profil d'un audit de dépôt complet. Sur un petit projet (moins de 10 000 lignes), Sonnet suffit largement.",
  },
  {
    question: "Le prompt peut-il casser mon code ?",
    answer:
      "Non. La contrainte est explicite : analyse uniquement, aucune modification de code. La seule écriture autorisée est le fichier de rapport AUDIT-<date>.md à la racine. C'est une différence volontaire avec un agent lâché sans cadre — et c'est ce qui rend l'exercice sûr même sur un projet en production.",
  },
  {
    question: "Que faire du rapport d'audit une fois généré ?",
    answer:
      "Trois usages concrets : lire le résumé exécutif (note A-F, top 3 risques) pour savoir où vous en êtes ; traiter les victoires rapides et les jalons 0-1 en interne ou avec votre prestataire ; et utiliser le rapport comme base objective pour challenger un devis de refonte — les constats sont cités fichier:ligne, donc vérifiables par n'importe quel développeur.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const promptJsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Prompt d'audit complet de projet pour Claude Fable 5 (version française)",
  description:
    "Prompt en 4 phases transformant Claude Fable 5 en auditeur technique de dépôt de code : cartographie, audit sévérisé fichier:ligne, stratégie d'amélioration, plan de tâches en jalons.",
  url: "https://augmenter.pro/blog/prompt-audit-projet-claude-fable",
  contentUrl: "https://augmenter.pro/downloads/prompt-audit-projet-claude-fable.md",
  encodingFormat: "text/markdown",
  inLanguage: "fr",
  datePublished: "2026-06-10",
  author: {
    "@type": "Person",
    name: "Pierre Legrand",
    url: "https://augmenter.pro/auteur/pierre-legrand",
  },
  publisher: {
    "@type": "Organization",
    "@id": "https://augmenter.pro/#organization",
  },
};

export default function Article() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(promptJsonLd) }}
      />
      <ArticleLayout
        title="Votre code vieillit en silence : le prompt Claude Fable qui audite tout votre projet et rend le plan de remise à niveau"
        excerpt="Le prompt d'audit en 4 phases, traduit et amélioré en français pour Claude Fable 5. Testé sur un vrai projet : 11 constats vérifiables en 3 minutes."
        tags={["IA", "Claude Code", "Développement"]}
        readTime="11 min"
        date="10 juin 2026"
        dateISO="2026-06-10"
        dateModified="2026-06-29"
        image="/images/blog/prompt-audit-projet-claude-fable.webp"
        slug="prompt-audit-projet-claude-fable"
      >
        {/* ===== TL;DR ===== */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 mb-8">
          <h2 className="mt-0 text-lg font-bold">
            TL;DR &mdash; Ce qu&apos;il faut retenir en 30 secondes
          </h2>
          <ul>
            <li>
              Ce prompt transforme <strong>Claude Fable 5</strong> (le modèle
              le plus avancé d&apos;Anthropic, disponible pour tous depuis le
              9 juin 2026) en <strong>auditeur technique</strong> de
              n&apos;importe quel projet logiciel existant.
            </li>
            <li>
              Il travaille en <strong>4 phases</strong> : cartographie du
              dépôt, audit sévérisé (chaque constat cité fichier:ligne),
              stratégie d&apos;amélioration, plan de tâches en jalons.
            </li>
            <li>
              Testé sur notre propre site (124 fichiers, 26&nbsp;312 lignes) :{" "}
              <strong>11 constats vérifiables en environ 3 minutes</strong>{" "}
              pour les deux premières phases &mdash; dont une faille que nous
              ne soupçonnions pas.
            </li>
            <li>
              Version française améliorée à copier-coller ci-dessous, ou en
              téléchargement <code>.md</code> dans notre{" "}
              <Link href="/prompts">bibliothèque de prompts IA</Link>.
            </li>
          </ul>
        </div>

        {/* ===== INTRO : douleur ===== */}
        <p>
          Personne ne vous enverra de notification le jour où votre logiciel
          métier deviendra irrécupérable. La dette technique ne prévient
          pas&nbsp;: elle s&apos;accumule en silence, version après version,
          prestataire après prestataire. Et un matin, la modification
          &laquo;&nbsp;simple&nbsp;&raquo; que vous demandez est facturée
          douze jours parce que &laquo;&nbsp;le code est fragile&nbsp;&raquo;.
        </p>
        <p>
          Le pire n&apos;est pas la dette elle-même. Le pire, c&apos;est que{" "}
          <strong>vous ne savez pas où vous en êtes</strong>. Votre outil
          interne, votre module Odoo personnalisé, votre site, votre
          application&nbsp;: qui vous a déjà remis un état des lieux honnête,
          chiffré, vérifiable&nbsp;? Le prestataire qui maintient le code
          n&apos;a aucun intérêt à documenter ses propres raccourcis. Et un
          audit technique humain se facture entre 5&nbsp;000 et
          20&nbsp;000&nbsp;&euro; selon la taille du projet &mdash; un budget
          que la plupart des PME n&apos;engageront jamais
          &laquo;&nbsp;juste pour savoir&nbsp;&raquo;.
        </p>
        <p>
          Résultat&nbsp;: les décisions se prennent à l&apos;aveugle. On
          refond trop tôt (et on jette du code sain), ou trop tard (et on
          paie la dette au prix fort). Cet article vous donne le troisième
          chemin&nbsp;: <strong>un audit complet, exécuté par Claude Fable
          5, pour le prix d&apos;une session d&apos;IA</strong>. Le prompt
          est intégral, en français, copiable en un clic. La valeur est dans
          la page &mdash; pas derrière un formulaire.
        </p>

        {/* ===== H2 : Fable 5 ===== */}
        <h2>Claude Fable 5 change la donne pour l&apos;audit de code</h2>
        <p>
          Claude Fable 5 est le premier modèle de la famille Claude 5
          d&apos;Anthropic, passé en disponibilité générale le 9 juin 2026
          &mdash; y compris dans{" "}
          <a
            href="https://github.blog/changelog/2026-06-09-claude-fable-5-is-generally-available-for-github-copilot/"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Copilot
          </a>{" "}
          et, surtout, dans Claude Code. Ce qui nous intéresse ici
          n&apos;est pas la fiche marketing, mais deux capacités précises
          pour l&apos;audit&nbsp;:
        </p>
        <ul>
          <li>
            <strong>La tenue des longues sessions d&apos;analyse.</strong>{" "}
            Auditer un dépôt, c&apos;est lire des dizaines de fichiers,
            croiser des indices, garder le fil. Les modèles précédents
            finissaient par &laquo;&nbsp;oublier&nbsp;&raquo; le début de
            l&apos;exploration&nbsp;; Fable 5 est précisément conçu pour la
            planification longue (
            <a
              href="https://www.anthropic.com/news/claude-fable-5-mythos-5"
              target="_blank"
              rel="noopener noreferrer"
            >
              annonce Anthropic
            </a>
            ).
          </li>
          <li>
            <strong>Le travail en sous-agents parallèles.</strong> Dans
            Claude Code, Fable 5 peut déléguer l&apos;exploration à des
            agents secondaires &mdash; la phase de cartographie d&apos;un
            gros projet passe de heures à minutes. Notre version du prompt
            l&apos;y autorise explicitement.
          </li>
        </ul>
        <p>
          Un mot d&apos;honnêteté, parce qu&apos;on lit beaucoup de bêtises
          sur les modèles &laquo;&nbsp;magiques&nbsp;&raquo;&nbsp;: un bon
          prompt d&apos;audit sur Sonnet vaut mieux qu&apos;une consigne
          floue sur Fable 5. La structure du prompt fait 80&nbsp;% du
          travail. Le modèle fait les 20&nbsp;% restants &mdash; mais sur un
          dépôt volumineux, ces 20&nbsp;% sont ceux qui séparent un audit
          superficiel d&apos;un audit dont chaque constat est vérifiable.
        </p>

        {/* ===== H2 : le prompt ===== */}
        <h2>Le prompt d&apos;audit, prêt à l&apos;emploi</h2>
        <p>
          Le prompt complet &mdash; les 4 phases, les règles, le format du
          livrable &mdash; est dans la carte ci-dessous&nbsp;: un clic pour le
          copier, un clic pour télécharger le <code>.md</code>. C&apos;est
          notre traduction française, retravaillée et adaptée à Fable 5 (les
          améliorations sont détaillées plus bas). On le garde en{" "}
          <strong>une seule version de référence</strong> dans la{" "}
          <Link href="/prompts">bibliothèque de prompts IA</Link> &mdash; vous
          le réutiliserez sur chaque projet, chaque trimestre.
        </p>

        <PromptCard slug="audit-projet-claude-fable" />

        {/* ===== H3 : les 4 phases en clair ===== */}
        <h3>Les 4 phases, en clair (et ce qu&apos;elles vous rapportent)</h3>
        <p>
          Pas besoin de lire les 270 lignes du prompt pour comprendre ce
          qu&apos;il produit. Voici ce que chaque phase vous rend &mdash; et
          pourquoi elle compte quand c&apos;est <em>vous</em>, dirigeant, qui
          devez trancher&nbsp;:
        </p>
        <ul>
          <li>
            <strong>Phase 1 &mdash; Cartographie.</strong> Claude lit tout le
            dépôt avant de juger&nbsp;: type de projet, stack, points
            d&apos;entrée, conventions en place. <em>Pour vous</em>&nbsp;: la
            preuve qu&apos;il a compris votre logiciel avant d&apos;émettre le
            moindre avis.
          </li>
          <li>
            <strong>Phase 2 &mdash; Audit sévérisé.</strong> Chaque constat est
            cité fichier:ligne, avec sa conséquence concrète et une sévérité
            (Critique &rarr; Faible), sur 8 dimensions (architecture, sécurité,
            tests, performance, dépendances&hellip;). <em>Pour vous</em>&nbsp;:
            des faits vérifiables, pas des impressions.
          </li>
          <li>
            <strong>Phase 3 &mdash; Stratégie.</strong> Les dizaines de
            constats sont ramenés à 3-5 thèmes, avec un état cible et des
            arbitrages explicites &mdash; y compris ce qu&apos;il recommande de{" "}
            <strong>ne pas</strong> corriger. <em>Pour vous</em>&nbsp;: de quoi
            distinguer l&apos;urgent du cosmétique.
          </li>
          <li>
            <strong>Phase 4 &mdash; Plan de tâches en jalons.</strong> Chaque
            tâche est chiffrée en effort (S/M/L/XL), avec ses risques et ses
            critères d&apos;acceptation, rangée en jalons (filet de sécurité
            &rarr; correctifs critiques &rarr; fort levier &rarr; finitions).{" "}
            <em>Pour vous</em>&nbsp;: un plan d&apos;action séquencé, pas une
            liste de doléances.
          </li>
        </ul>
        <p>
          Le tout atterrit dans un seul fichier{" "}
          <code>AUDIT-&lt;date&gt;.md</code> à la racine du projet &mdash; la
          seule écriture autorisée. <strong>Le prompt ne touche jamais à
          votre code.</strong>
        </p>

        {/* ===== H3 : améliorations ===== */}
        <h3>
          Ce que cette version améliore par rapport aux variantes anglophones
        </h3>
        <p>
          Les variantes qui circulent sur GitHub et dans les newsletters
          tech sont solides sur la structure (les 4 phases viennent de là),
          mais nous avons corrigé cinq points à l&apos;usage&nbsp;:
        </p>
        <ol>
          <li>
            <strong>La sortie en français est forcée.</strong> Sans cette
            consigne, le rapport sort en anglais &mdash; inutilisable pour
            le partager à un associé ou un prestataire francophone.
          </li>
          <li>
            <strong>Le rapport est sauvegardé dans un fichier
            AUDIT-&lt;date&gt;.md.</strong> Les versions originales laissent
            le rapport dans la conversation&nbsp;: fermez la session, tout
            est perdu. Ici, le livrable survit et se versionne dans Git.
          </li>
          <li>
            <strong>Les sous-agents sont explicitement autorisés pour
            l&apos;exploration</strong> &mdash; et explicitement interdits
            pour les conclusions. Fable 5 parallélise la cartographie, mais
            l&apos;analyse reste dans une seule tête.
          </li>
          <li>
            <strong>Le périmètre est délimité d&apos;entrée</strong>{" "}
            (dossiers générés et vendorés exclus, et listés) : sur un projet
            réel, c&apos;est la différence entre auditer votre code et
            auditer node_modules.
          </li>
          <li>
            <strong>L&apos;interdiction de modifier le code est
            réaffirmée</strong> avec son unique exception. C&apos;est ce qui
            rend le prompt sûr à lancer sur un projet en production, même
            pour un non-développeur.
          </li>
        </ol>

        <AtelierCallout />

        {/* ===== H2 : mode d'emploi ===== */}
        <h2>Mode d&apos;emploi : lancer l&apos;audit en 10 minutes, sans être développeur</h2>
        <p>
          Lancer cet audit ne demande pas de savoir coder &mdash; il demande
          de savoir suivre cinq étapes. Si vous avez déjà utilisé un
          terminal une fois dans votre vie, vous savez faire.
        </p>
        <ol>
          <li>
            <strong>Installez Claude Code</strong> (l&apos;outil en ligne de
            commande d&apos;Anthropic) et ouvrez un terminal à la racine du
            projet à auditer &mdash; le dossier qui contient le code source.
            Si le code est chez votre prestataire, demandez-lui un accès en
            lecture au dépôt Git&nbsp;: c&apos;est une demande normale,
            le code vous appartient.
          </li>
          <li>
            <strong>Lancez Claude Code et collez le prompt</strong> intégral
            comme premier message, sans rien ajouter. Ne mélangez pas les
            demandes&nbsp;: l&apos;audit d&apos;abord, les corrections plus
            tard, dans une autre session.
          </li>
          <li>
            <strong>Laissez travailler.</strong> Comptez de 10 minutes
            (petit projet) à une heure (gros dépôt). Claude annonce chaque
            phase&nbsp;; il peut poser une question de cadrage, répondez
            simplement.
          </li>
          <li>
            <strong>Ouvrez le fichier AUDIT-&lt;date&gt;.md</strong> généré à
            la racine. Lisez le résumé exécutif d&apos;abord&nbsp;: la note
            A-F et les 3 risques principaux vous donnent l&apos;essentiel en
            une minute.
          </li>
          <li>
            <strong>Décidez avec le plan, pas avec l&apos;intuition.</strong>{" "}
            Les victoires rapides se traitent tout de suite&nbsp;; les
            jalons 0 et 1 se planifient&nbsp;; le reste s&apos;arbitre. Et
            si un prestataire vous propose une refonte, demandez-lui de
            répondre aux constats fichier:ligne du rapport &mdash; vous
            verrez très vite s&apos;il connaît vraiment votre code.
          </li>
        </ol>

        {/* ===== Encart : 4 questions au prestataire ===== */}
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 my-8">
          <h3 className="mt-0">
            Le rapport en main&nbsp;: 4 questions à poser à votre prestataire
          </h3>
          <p>
            C&apos;est là que l&apos;audit devient un outil de décision, pas un
            exercice technique. Avec le fichier <code>AUDIT.md</code> ouvert
            devant vous, plus aucune réponse vague ne passe&nbsp;:
          </p>
          <ol className="mb-0">
            <li>
              Cette note de santé globale (A à F), vous la contestez&nbsp;? Sur
              quels constats précis&nbsp;?
            </li>
            <li>
              Ce risque est cité fichier:ligne dans le rapport &mdash; il est
              exact&nbsp;? Combien de temps pour le corriger&nbsp;?
            </li>
            <li>
              Votre devis de refonte couvre quels jalons du plan&nbsp;?
              Pourquoi pas seulement les jalons 0 et 1 pour commencer&nbsp;?
            </li>
            <li>
              Qu&apos;est-ce que le rapport classe en «&nbsp;à ne pas
              corriger&nbsp;» &mdash; et que vous proposez quand même&nbsp;?
            </li>
          </ol>
        </div>

        {/* ===== H2 : cas terrain ===== */}
        <h2>Testé sur un vrai projet : les chiffres de notre propre audit</h2>
        <p>
          Plutôt que de vous promettre des merveilles, nous avons retourné
          le prompt contre nous-mêmes. Le 10 juin 2026, nous avons exécuté
          ses deux premières phases (cartographie + audit, en version
          condensée par sous-agent) sur le code de ce site &mdash;
          augmenter.pro, une application Next.js 16 en production. Voici les
          résultats bruts, non retouchés.
        </p>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Indicateur</th>
                <th>Résultat mesuré</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Taille du projet audité</td>
                <td>124 fichiers source, 26&nbsp;312 lignes, 35 routes</td>
              </tr>
              <tr>
                <td>Durée (phases 1-2 condensées)</td>
                <td>&asymp; 3 minutes, une dizaine d&apos;explorations</td>
              </tr>
              <tr>
                <td>Constats relevés</td>
                <td>
                  11 au total &mdash; 0 critique, 1 sévérité élevée, 5
                  moyennes, 5 faibles
                </td>
              </tr>
              <tr>
                <td>Constat le plus sérieux</td>
                <td>
                  Un endpoint API public déclenchant un appel d&apos;IA
                  payant, sans limitation de débit
                </td>
              </tr>
              <tr>
                <td>Constats que nous ignorions</td>
                <td>
                  4 sur 11 &mdash; dont deux sources de sitemap en conflit
                  et 86&nbsp;% de duplication entre deux pages
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Trois leçons de cet exercice, selon Pierre Legrand, consultant IA
          chez augmenter.pro&nbsp;: d&apos;abord, l&apos;audit a trouvé en 3
          minutes une exposition de coût (l&apos;endpoint sans limitation)
          que ni nous ni nos revues de code n&apos;avions repérée. Ensuite,
          chaque constat est cité fichier:ligne &mdash; nous avons pu tout
          vérifier, et tout était exact. Enfin, le rapport liste aussi les
          forces (typage strict, zéro secret en dur, images optimisées), ce
          qui évite le piège classique de l&apos;audit anxiogène qui pousse
          à tout refaire.
        </p>

        {/* ===== H2 : limites ===== */}
        <h2>Les limites : ce que ce prompt ne fera pas pour vous</h2>
        <p>
          Un conseil honnête vaut mieux qu&apos;une promesse. Voici où
          s&apos;arrête l&apos;exercice&nbsp;:
        </p>
        <ul>
          <li>
            <strong>L&apos;audit n&apos;est pas la réparation.</strong> Le
            rapport vous dit quoi faire et dans quel ordre&nbsp;; exécuter
            les jalons reste un travail d&apos;ingénierie &mdash; par votre
            équipe, votre prestataire, ou une session Claude Code dédiée et
            encadrée.
          </li>
          <li>
            <strong>Le contexte métier lui échappe.</strong> Claude voit que
            deux pages sont dupliquées à 86&nbsp;%&nbsp;; il ne sait pas que
            l&apos;une convertit trois fois mieux que l&apos;autre. Les
            arbitrages finaux (section &laquo;&nbsp;Questions
            ouvertes&nbsp;&raquo; du rapport) vous appartiennent.
          </li>
          <li>
            <strong>Un très gros dépôt ne sera pas couvert à
            100&nbsp;%.</strong> Le prompt l&apos;assume&nbsp;: il
            concentre la profondeur sur les 20&nbsp;% du code qui font
            80&nbsp;% du travail, et déclare les zones survolées.
          </li>
          <li>
            <strong>Ce n&apos;est pas un audit de conformité.</strong> Pour
            un enjeu réglementaire (RGPD, NIS2) ou un litige avec un
            prestataire, le rapport est un excellent point de départ, pas un
            document opposable.
          </li>
        </ul>
        <p>
          Et si le sujet n&apos;est pas votre code mais l&apos;usage de
          l&apos;IA dans toute votre entreprise, c&apos;est un autre
          exercice &mdash; celui de notre{" "}
          <Link href="/audit-ia-pme">audit IA pour PME</Link>.
        </p>

        {/* ===== H2 : FAQ ===== */}
        <h2>Questions fréquentes</h2>
        {faqItems.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}

        {/* ===== Conclusion + CTA douce ===== */}
        <h2>Par où commencer</h2>
        <p>
          Copiez le prompt, lancez-le sur votre projet le plus stratégique,
          lisez le résumé exécutif. Trente minutes d&apos;effort pour savoir
          enfin où vous en êtes &mdash; la plupart des dirigeants que nous
          accompagnons ne reviennent pas en arrière. Pour aller plus
          loin&nbsp;: cadrez vos futures sessions avec notre{" "}
          <Link href="/blog/claude-code-prompt-architecture">
            prompt d&apos;architecte Claude Code
          </Link>{" "}
          (le pendant &laquo;&nbsp;construction&nbsp;&raquo; de cet audit),
          explorez la{" "}
          <Link href="/prompts">bibliothèque de prompts IA</Link>, ou venez
          apprendre à piloter tout cela vous-même lors de l&apos;
          <Link href="/atelier-claude-code-dirigeant">
            atelier Claude Code pour dirigeant
          </Link>{" "}
          &mdash; une demi-journée, en présentiel (78/95) ou en visio
          partout en France.
        </p>
      </ArticleLayout>
    </>
  );
}
