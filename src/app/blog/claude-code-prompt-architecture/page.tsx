import { articleMetadata } from "@/lib/article-metadata";
import Link from "next/link";
import { ArticleLayout } from "@/components/layout/article-layout";
import { AtelierCallout } from "@/components/sections/atelier-callout";

export const metadata = articleMetadata({
  title: "Claude Code : le prompt, CLAUDE.md et les Skills (guide PME 2026)",
  description:
    "Envoyez ce prompt AVANT tout projet Claude Code. CLAUDE.md, ARCHITECTURE.md, Skills et bonnes pratiques. La différence entre un POC et un vrai produit.",
  slug: "claude-code-prompt-architecture",
});

const faqItems = [
  {
    question: "C'est quoi le fichier CLAUDE.md ?",
    answer:
      "CLAUDE.md est le fichier que Claude Code lit automatiquement à l'ouverture d'un projet. On y place les instructions permanentes : stack technique, conventions de code, commandes utiles, et un renvoi vers ARCHITECTURE.md pour le détail. C'est la mémoire de projet qui survit entre les sessions — sans elle, Claude repart de zéro à chaque ouverture.",
  },
  {
    question: "Les Skills de Claude Code, c'est quoi ?",
    answer:
      "Les Skills sont des compétences réutilisables qu'on définit une fois — un fichier markdown décrivant une tâche récurrente (générer un devis, configurer un module Odoo, auditer un bout de code) — et que Claude Code charge à la demande. Pour un dirigeant de PME, c'est le moyen d'industrialiser les tâches qu'il répète chaque semaine sans réexpliquer le contexte à chaque fois.",
  },
  {
    question: "Faut-il savoir coder pour utiliser Claude Code ?",
    answer:
      "Non pour piloter, oui pour vérifier. Un dirigeant tech-curieux peut cadrer un projet avec un CLAUDE.md et le prompt système de cet article sans écrire une ligne de code. Mais pour valider ce que Claude produit avant la mise en production (sécurité, données clients), un œil technique reste nécessaire — c'est précisément le rôle d'un accompagnement.",
  },
  {
    question: "ARCHITECTURE.md ou CLAUDE.md : lequel utiliser ?",
    answer:
      "Les deux : ils ne jouent pas le même rôle. CLAUDE.md contient les instructions que Claude Code lit en premier (court, opérationnel). ARCHITECTURE.md décrit en détail la structure technique du projet (la source de vérité). CLAUDE.md pointe vers ARCHITECTURE.md, et le prompt système force Claude à le relire avant chaque génération de code.",
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

export default function Article() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ArticleLayout
      title="Utiliser Claude Code sans envoyer d'abord ce prompt est une perte de temps"
      excerpt="Travailler avec des fichiers .md ! Faites la différence entre un projet amateur/POC et la création de quelque chose de valeur !"
      tags={["Claude Code", "Développement", "IA"]}
      readTime="8 min"
      date="9 février 2026"
      dateISO="2026-02-09"
      dateModified="2026-05-26"
      image="/images/blog/claude-code-prompt-architecture.webp"
      slug="claude-code-prompt-architecture"
    >
      {/* ===== TL;DR ===== */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 mb-8">
        <h2 className="mt-0 text-lg font-bold">
          TL;DR &mdash; Ce qu&apos;il faut retenir en 30 secondes
        </h2>
        <ul>
          <li>
            Lancé sans cadrage, Claude Code produit du code qui marche
            &laquo;&nbsp;à peu près&nbsp;&raquo; mais qui n&apos;atteint jamais le niveau
            production : fichiers éparpillés, duplication, sécurité bancale.
          </li>
          <li>
            Le correctif tient en deux artefacts : un fichier{" "}
            <strong>ARCHITECTURE.md</strong> à la racine du projet, et un{" "}
            <strong>prompt système</strong> envoyé en premier message qui force
            Claude à s&apos;y référer avant chaque action.
          </li>
          <li>
            Ce prompt est la différence entre un POC jetable et une base de
            code qu&apos;un humain peut reprendre 6 mois plus tard.
          </li>
          <li>
            Copiez-collez le prompt ci-dessous, ou retrouvez-le dans notre{" "}
            <Link href="/prompts">bibliothèque de prompts IA</Link> avec
            téléchargement <code>.md</code> inclus.
          </li>
        </ul>
      </div>

      {/* ===== INTRO ===== */}
      <p>
        La plupart des projets Claude Code meurent de la même maladie : on
        ouvre une session, on tape <em>&laquo;&nbsp;crée-moi une app
        qui&hellip;&nbsp;&raquo;</em>, et on laisse l&apos;agent improviser.
        Deux heures plus tard, le code &laquo;&nbsp;tourne&nbsp;&raquo;. Et
        deux semaines plus tard, impossible d&apos;y revenir sans tout
        recommencer.
      </p>
      <p>
        Le problème n&apos;est pas Claude Code. Le problème, c&apos;est de
        lancer un agent puissant{" "}
        <strong>sans lui poser le moindre cadre</strong>. Un senior qui
        rejoindrait votre équipe demanderait la même chose avant d&apos;écrire
        une ligne : <em>où vivent les contrôleurs ?</em>,{" "}
        <em>quelles technos ?</em>, <em>comment on teste ?</em>,{" "}
        <em>comment on nomme les fichiers partagés ?</em>. Claude Code mérite
        le même traitement.
      </p>
      <p>
        Cet article explique <strong>pourquoi ce prompt change tout</strong>,{" "}
        <strong>comment l&apos;intégrer à votre workflow</strong>, et vous
        donne le prompt complet à copier-coller. C&apos;est le même que nous
        utilisons chez{" "}
        <Link href="/approche">augmenter.PRO</Link> sur tous les projets
        Claude Code qui partent vers la production.
      </p>

      {/* ===== Encadré dirigeant ===== */}
      <div className="rounded-lg border border-amber-500/25 bg-amber-500/5 p-6 my-8">
        <h2 className="mt-0 text-lg font-bold">
          Pourquoi un dirigeant de PME devrait s&apos;en soucier
        </h2>
        <p className="mb-0">
          Vous n&apos;avez peut-être pas l&apos;intention d&apos;écrire du code
          vous-même. Mais si votre PME confie un projet à un prestataire qui
          utilise Claude Code &mdash; ou si vous testez l&apos;outil en interne
          &mdash; la présence (ou l&apos;absence) de ce cadrage décide si vous
          obtenez un livrable que vous pourrez faire évoluer, ou un{" "}
          <em>POC jetable</em> qui vous enferme chez un prestataire.{" "}
          <strong>
            Selon Pierre Legrand, consultant IA chez augmenter.PRO
          </strong>
          , c&apos;est la première question à poser à quiconque code avec
          l&apos;IA pour votre compte : &laquo;&nbsp;où est le fichier qui
          cadre le projet ?&nbsp;&raquo;.
        </p>
      </div>

      {/* ===== H2 : Problème ===== */}
      <h2>Pourquoi la plupart des projets Claude Code virent au POC jetable</h2>

      <p>
        Lancer Claude Code sans prompt système, c&apos;est lui demander
        d&apos;inventer votre architecture au fil de l&apos;eau. Sur un script
        de 50 lignes ça passe. Sur un vrai projet, trois anti-patterns
        reviennent systématiquement.
      </p>

      <h3>1. L&apos;arborescence Frankenstein</h3>
      <p>
        Sans convention imposée, Claude va placer{" "}
        <code>userController.ts</code> dans <code>/src/</code>,{" "}
        <code>auth.service.ts</code> dans <code>/services/</code>,{" "}
        <code>types.ts</code> à la racine, et un doublon{" "}
        <code>user-types.ts</code> dans <code>/backend/</code>. Deux
        itérations plus tard, la même fonction existe sous deux noms
        différents à deux endroits. Personne ne sait lequel est la source de
        vérité.
      </p>

      <h3>2. La sécurité &laquo;&nbsp;on verra plus tard&nbsp;&raquo;</h3>
      <p>
        Sans consigne explicite, Claude Code écrit du code <em>qui
        fonctionne</em>. Ce qui veut dire : pas de validation d&apos;entrées,
        tokens en clair dans le localStorage, requêtes SQL concaténées, clés
        API commitées. Ces décisions invisibles deviennent des dettes de
        sécurité qu&apos;on découvre en production, au pire moment.
      </p>

      <h3>3. Le trou noir du contexte</h3>
      <p>
        À la troisième session, Claude Code ne se souvient plus des choix
        faits la veille (normal : la mémoire conversationnelle s&apos;arrête
        quand on ferme la session). Il vous propose une nouvelle façon de
        gérer l&apos;authentification alors qu&apos;il en a déjà écrit une.
        Sans document source &mdash; typiquement un{" "}
        <code>ARCHITECTURE.md</code> &mdash; il n&apos;a aucun moyen de se
        recaler. Résultat : chaque session annule partiellement la précédente.
      </p>

      {/* ===== H2 : Ce que le prompt verrouille ===== */}
      <h2>Ce que ce prompt verrouille concrètement</h2>

      <p>
        Le prompt système ci-dessous agit comme un{" "}
        <strong>contrat</strong> entre vous et Claude Code. Il transforme
        l&apos;agent d&apos;assistant improvisé en <em>architecte logiciel
        principal</em> qui respecte 7 règles non-négociables :
      </p>
      <ul>
        <li>
          <strong>Cohérence d&apos;arborescence</strong> : chaque fichier est
          créé dans son répertoire attendu (contrôleurs, composants, types
          partagés).
        </li>
        <li>
          <strong>Séparation frontend / backend / common</strong> imposée,
          même quand il serait plus rapide de tout mélanger.
        </li>
        <li>
          <strong>Lecture obligatoire de ARCHITECTURE.md</strong> avant
          chaque génération de code &mdash; c&apos;est ce qui sauve le
          contexte entre les sessions.
        </li>
        <li>
          <strong>Tests générés en parallèle</strong> du code, pas en
          après-coup.
        </li>
        <li>
          <strong>Sécurité par défaut</strong> : authentification,
          validation, chiffrement et logs cohérents dès la première ligne.
        </li>
        <li>
          <strong>Infrastructure as code</strong> : Dockerfile, CI/CD et
          scripts de déploiement générés selon vos conventions.
        </li>
        <li>
          <strong>Traçabilité des décisions</strong> : chaque dette ou
          optimisation est annotée dans la doc, pas perdue dans un commit
          message.
        </li>
      </ul>
      <p>
        Le gain n&apos;est pas cosmétique. C&apos;est la différence entre une
        base de code qu&apos;un développeur humain peut reprendre (et
        auditer) dans 6 mois, et une accumulation d&apos;artefacts générés
        qu&apos;il faudra jeter.
      </p>

      {/* ===== H2 : Workflow ===== */}
      <h2>Le workflow en 3 étapes</h2>

      <p>
        Le prompt seul ne suffit pas. Il forme un tandem avec un fichier
        projet qui sert de source de vérité. Voici le workflow exact :
      </p>

      <h3>Étape 1 &mdash; Créer le fichier ARCHITECTURE.md</h3>
      <p>
        À la racine de votre projet, créez un fichier{" "}
        <code>ARCHITECTURE.md</code> qui décrit :
      </p>
      <ul>
        <li>
          Les <strong>technologies choisies</strong> (ex. Next.js 16 + FastAPI
          + PostgreSQL).
        </li>
        <li>
          La <strong>structure de répertoires</strong> attendue avec une
          phrase par dossier.
        </li>
        <li>
          Les <strong>conventions de nommage</strong> (camelCase, kebab-case,
          suffixes <code>.service</code>, <code>.controller</code>&hellip;).
        </li>
        <li>
          Les <strong>contraintes non-fonctionnelles</strong> : auth,
          chiffrement, niveau de tests, cible de déploiement.
        </li>
      </ul>
      <p>
        Un squelette minimal tient en 1 page (voir exemple plus bas).
        Claude Code peut même vous aider à le rédiger en partant de vos
        notes.
      </p>
      <p>
        <strong>Point important (convention 2026)</strong> : Claude Code lit
        automatiquement un fichier <code>CLAUDE.md</code> à la racine,
        s&apos;il existe. C&apos;est le point d&apos;entrée natif &mdash;
        placez-y vos instructions permanentes (stack, conventions, commandes)
        et un renvoi explicite vers <code>ARCHITECTURE.md</code> pour le
        détail structurel. En pratique : <code>CLAUDE.md</code> = les règles
        courtes relues à chaque session, <code>ARCHITECTURE.md</code> = la
        source de vérité détaillée. Le prompt système ci-dessous force Claude
        à relire l&apos;architecture avant chaque génération de code.
      </p>

      <h3>Étape 2 &mdash; Ouvrir une session Claude Code fraîche</h3>
      <p>
        Dans le dossier du projet, démarrez une nouvelle session. Ne
        commencez pas par une demande métier (&laquo;&nbsp;ajoute une page
        login&nbsp;&raquo;) : le prompt système doit arriver{" "}
        <strong>avant</strong> toute demande fonctionnelle.
      </p>

      <h3>Étape 3 &mdash; Coller le prompt système en premier message</h3>
      <p>
        Collez le prompt complet ci-dessous comme premier message. Claude
        Code lira automatiquement <code>ARCHITECTURE.md</code> et
        s&apos;alignera sur son contenu pour toute la session. À partir de
        là, vous pouvez enchaîner les demandes métier : chaque génération de
        code sera cadrée.
      </p>

      {/* ===== H2 : Le prompt ===== */}
      <h2>Le prompt complet à copier-coller</h2>

      <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-amber-500/5 p-6 my-8 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="mb-0 text-sm font-semibold text-primary">
            📋 Prompt système &mdash; Claude Code architecte logiciel
          </p>
          <Link
            href="/prompts#claude-code-architecte"
            className="shrink-0 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Copier depuis /prompts →
          </Link>
        </div>

        <div className="rounded-lg bg-background/80 border border-border/40 p-5 text-[0.95rem]">
          <p>
            <strong>
              Vous êtes mon architecte logiciel principal et ingénieur
              full-stack.
            </strong>
          </p>
          <p>
            Vous êtes responsable de la création et de la maintenance
            d&apos;une application de qualité production qui adhère à une
            architecture personnalisée stricte définie dans votre
            ARCHITECTURE.md.
          </p>
          <p>
            Votre objectif est de comprendre en profondeur et de suivre la
            structure, les conventions de nommage et la séparation des
            préoccupations décrites ci-dessous. À tout moment, assurez-vous
            que chaque fichier, fonction et fonctionnalité généré est
            cohérent avec l&apos;architecture et les normes de qualité
            production.
          </p>

          <p>
            <strong>Responsabilités :</strong>
          </p>

          <p>
            <strong>1. Génération de Code &amp; Organisation</strong>
          </p>
          <ul>
            <li>
              Toujours créer et référencer les fichiers dans le bon
              répertoire en fonction de leur fonction (par exemple,
              /backend/src/api/ pour les contrôleurs,
              /frontend/src/components/ pour l&apos;interface utilisateur,
              /common/types/ pour les modèles partagés).
            </li>
            <li>
              Maintenir une séparation stricte entre le frontend, le backend
              et le code partagé.
            </li>
            <li>
              Utiliser les technologies et les méthodes de déploiement
              définies dans l&apos;architecture (React/Next.js pour le
              frontend, Python/FastAPI pour le backend, etc.).
            </li>
          </ul>

          <p>
            <strong>2. Développement Conscient du Contexte</strong>
          </p>
          <ul>
            <li>
              Avant de générer ou de modifier du code, lire et interpréter la
              section pertinente de l&apos;architecture pour assurer
              l&apos;alignement.
            </li>
            <li>
              Déduire les dépendances et les interactions entre les couches
              (par exemple, comment les services frontend consomment les
              points de terminaison backend/api).
            </li>
            <li>
              Lorsque de nouvelles fonctionnalités sont introduites, décrire
              où elles s&apos;intègrent dans l&apos;architecture et pourquoi.
            </li>
          </ul>

          <p>
            <strong>3. Documentation &amp; Scalabilité</strong>
          </p>
          <ul>
            <li>
              Mettre à jour ARCHITECTURE.md chaque fois que des changements
              structurels ou technologiques se produisent.
            </li>
            <li>
              Générer automatiquement les docstrings, les définitions de
              types et les commentaires en suivant le format existant.
            </li>
            <li>
              Suggérer des améliorations, des refactorisations ou des
              abstractions qui améliorent la maintenabilité sans enfreindre
              l&apos;architecture.
            </li>
          </ul>

          <p>
            <strong>4. Tests &amp; Qualité</strong>
          </p>
          <ul>
            <li>
              Générer des fichiers de test correspondants dans /tests/ pour
              chaque module (par exemple, /backend/tests/, /frontend/tests/).
            </li>
            <li>
              Utiliser les frameworks de test appropriés (Jest, Pytest, etc.)
              et les outils de qualité de code (ESLint, Prettier, etc.).
            </li>
            <li>
              Maintenir une couverture de type TypeScript stricte et des
              normes de linting.
            </li>
          </ul>

          <p>
            <strong>5. Sécurité &amp; Fiabilité</strong>
          </p>
          <ul>
            <li>
              Toujours implémenter une authentification sécurisée (JWT,
              OAuth2, etc.) et des pratiques de protection des données (TLS,
              AES-256).
            </li>
            <li>
              Inclure une gestion d&apos;erreurs robuste, une validation des
              entrées et une journalisation cohérentes avec les directives
              de sécurité de l&apos;architecture.
            </li>
          </ul>

          <p>
            <strong>6. Infrastructure &amp; Déploiement</strong>
          </p>
          <ul>
            <li>
              Générer les fichiers d&apos;infrastructure (Dockerfile, YAMLs
              CI/CD) selon les conventions de /scripts/ et /.github/.
            </li>
          </ul>

          <p>
            <strong>7. Intégration de la Feuille de Route</strong>
          </p>
          <p>
            Annoter toute dette potentielle ou optimisation directement dans
            la documentation pour les futurs développeurs.
          </p>
        </div>

        <p className="mt-4 mb-0 text-xs text-muted-foreground">
          💡 Astuce : copiez ce prompt une fois, enregistrez-le dans un{" "}
          <code>.md</code> local et réutilisez-le pour chaque nouveau projet.
          Vous gagnerez 10 minutes à chaque démarrage, et surtout une
          cohérence qui se voit sur 6 mois.
        </p>
      </div>

      <AtelierCallout />

      {/* ===== H2 : Anatomie ===== */}
      <h2>Anatomie du prompt : pourquoi ces 7 axes et pas d&apos;autres</h2>

      <p>
        Chaque axe du prompt correspond à une classe d&apos;erreurs
        fréquentes observées sur des projets générés par IA. Voici le
        pourquoi de chacun.
      </p>

      <h3>Axes 1 &amp; 2 : forcer la discipline d&apos;arborescence</h3>
      <p>
        Les deux premiers axes couvrent le même problème sous deux angles :
        <em>où</em> on place le code, et <em>quand</em> on relit
        l&apos;architecture. Sans ça, Claude Code retombe dans sa pente
        naturelle : tout mettre au plus proche du fichier qu&apos;il vient
        d&apos;éditer. C&apos;est rapide, mais ça casse la cohérence globale.
      </p>

      <h3>Axe 3 : transformer la doc en artefact vivant</h3>
      <p>
        Forcer la mise à jour de <code>ARCHITECTURE.md</code> à chaque
        changement structurel est ce qui rend le workflow pérenne. Ce
        n&apos;est pas une tâche &laquo;&nbsp;en plus&nbsp;&raquo; : c&apos;est
        ce qui permet aux sessions suivantes de se recaler sans que vous
        ayez à tout réexpliquer.
      </p>

      <h3>Axe 4 : les tests en même temps que le code</h3>
      <p>
        Demander les tests <em>après</em> fonctionne rarement : le code
        n&apos;est pas pensé pour être testable. Inscrire la génération de
        tests dans le contrat initial force un design découplé dès le
        départ.
      </p>

      <h3>Axe 5 : la sécurité en règle par défaut</h3>
      <p>
        Sans consigne, Claude Code écrit le chemin le plus court. Préciser
        JWT, OAuth2, TLS et AES-256 n&apos;est pas un luxe : c&apos;est ce
        qui évite les bugs de sécurité silencieux qui ne se détectent
        qu&apos;en production (ou en audit).
      </p>

      <h3>Axes 6 &amp; 7 : l&apos;infra et la dette traçables</h3>
      <p>
        Générer le Dockerfile et les pipelines CI/CD <em>en même temps</em>{" "}
        que le code applicatif évite le syndrome &laquo;&nbsp;ça marche sur
        ma machine&nbsp;&raquo;. Annoter la dette directement dans la doc
        (plutôt qu&apos;en commentaire de commit) garde la trace visible
        pour la prochaine session ou le prochain développeur.
      </p>

      {/* ===== H2 : Exemple ARCHITECTURE.md ===== */}
      <h2>Le compagnon obligatoire : un ARCHITECTURE.md minimal</h2>

      <p>
        Le prompt renvoie constamment vers <code>ARCHITECTURE.md</code>. Sans
        ce fichier, le prompt tourne à vide. Voici un squelette d&apos;une
        page qui suffit pour démarrer :
      </p>

      <div className="rounded-lg border border-border/60 bg-muted/40 p-5 my-6 font-mono text-xs leading-relaxed">
        <p className="mb-2 font-sans text-sm font-semibold text-foreground">
          # ARCHITECTURE.md
        </p>
        <p className="mb-2">
          ## Stack
          <br />- Frontend : Next.js 16 (App Router, React 19, TypeScript strict)
          <br />- Backend : FastAPI (Python 3.12) + PostgreSQL 16
          <br />- Infra : Docker + GitHub Actions + déploiement Hostinger
        </p>
        <p className="mb-2">
          ## Structure
          <br />- /frontend/ &mdash; code Next.js (pages, composants, hooks)
          <br />- /backend/ &mdash; API FastAPI (routes, services, modèles)
          <br />- /common/types/ &mdash; schémas partagés (Zod + Pydantic générés)
          <br />- /tests/ &mdash; miroir de /frontend et /backend
          <br />- /scripts/ &mdash; déploiement, migrations, seed
        </p>
        <p className="mb-2">
          ## Conventions
          <br />- Fichiers : kebab-case (ex. user-profile.tsx)
          <br />- Composants React : PascalCase, un fichier = un composant
          <br />- Services backend : suffixe .service.py, une classe par fichier
        </p>
        <p className="mb-0">
          ## Non-fonctionnel
          <br />- Auth : JWT + refresh token httpOnly
          <br />- Validation entrées : Zod (front) + Pydantic (back)
          <br />- Tests : Vitest (front), Pytest (back), couverture cible 70%
          <br />- Secrets : .env.local (jamais commit), Vault en prod
        </p>
      </div>

      <p>
        C&apos;est volontairement court. L&apos;intérêt de la démarche, c&apos;est
        que <strong>Claude Code l&apos;enrichira au fil du projet</strong>{" "}
        (axe 3 du prompt). Partir avec 100 lignes est contre-productif :
        vous écrivez de la doc qui ne sera jamais lue. Partir avec 20 lignes
        et les laisser grandir avec le code est la bonne approche.
      </p>

      {/* ===== H2 : Avant / Après ===== */}
      <h2>Avant / Après : la différence concrète</h2>

      <p>
        Sur un projet interne récent (webapp de gestion documentaire pour une
        PME BTP des Yvelines), voici l&apos;écart mesuré entre deux
        approches sur la même première journée de développement :
      </p>

      <ul>
        <li>
          <strong>Sans prompt système</strong> : 11 fichiers créés, 3
          emplacements &laquo;&nbsp;logiques&nbsp;&raquo; différents pour
          les types, 0 test, 1 route API sans validation des entrées, mot
          de passe stocké en clair dans une variable de dev. Fonctionnel.
          Reprise impossible.
        </li>
        <li>
          <strong>Avec ARCHITECTURE.md + ce prompt</strong> : même
          périmètre fonctionnel, 14 fichiers (tests inclus), 1 seul
          emplacement pour les types, validation Zod dès la première route,
          README et section &laquo;&nbsp;décisions prises&nbsp;&raquo;
          ajoutées automatiquement à ARCHITECTURE.md.
        </li>
      </ul>

      <p>
        Le surcoût en temps du workflow cadré : 15 minutes pour rédiger le
        squelette de <code>ARCHITECTURE.md</code> au début. Le gain : un
        projet qu&apos;on peut continuer en solo ou passer à un autre
        développeur sans réécrire la moitié.
      </p>

      {/* ===== H2 : Skills & subagents ===== */}
      <h2>Skills &amp; subagents : industrialiser vos tâches récurrentes</h2>

      <p>
        Le prompt système cadre <em>un</em> projet. Mais dès qu&apos;on
        utilise Claude Code régulièrement, on répète les mêmes tâches :
        générer un devis, configurer un module Odoo, auditer un composant,
        rédiger un compte-rendu. C&apos;est exactement ce que les{" "}
        <strong>Skills</strong> de Claude Code permettent
        d&apos;industrialiser.
      </p>

      <h3>Ce qu&apos;est un Skill</h3>
      <p>
        Un Skill est un fichier markdown qui décrit une compétence
        réutilisable : son objectif, ses étapes, ses contraintes. Claude Code
        le charge à la demande quand la tâche se présente, sans que vous ayez
        à réexpliquer le contexte. Concrètement, vous écrivez une fois{" "}
        <em>&laquo;&nbsp;voici comment on génère un devis chez
        nous&nbsp;&raquo;</em>, et l&apos;agent applique cette méthode à
        chaque fois &mdash; avec les mêmes mentions légales, le même format,
        les mêmes règles de remise.
      </p>

      <h3>Subagents : déléguer une sous-tâche</h3>
      <p>
        Les <strong>subagents</strong> vont plus loin : ce sont des
        assistants spécialisés (un pour les tests, un pour la revue de
        sécurité, un pour la doc) que l&apos;agent principal mobilise pour une
        sous-tâche, sans polluer le contexte de la session principale. Pour
        une PME, l&apos;intérêt est concret : un subagent
        &laquo;&nbsp;relecture sécurité&nbsp;&raquo; qui passe
        systématiquement sur le code avant livraison, c&apos;est une couche de
        contrôle qui ne dépend plus de votre seule vigilance.
      </p>
      <p>
        La logique reste la même qu&apos;avec <code>ARCHITECTURE.md</code> :{" "}
        <strong>
          vous écrivez le cadre une fois, l&apos;IA l&apos;applique mille fois
        </strong>
        . C&apos;est le passage du &laquo;&nbsp;bricolage par
        prompt&nbsp;&raquo; à un véritable poste de travail augmenté.
      </p>

      {/* ===== H2 : Pour aller plus loin ===== */}
      <h2>Aller plus loin : la bibliothèque de prompts augmenter.PRO</h2>

      <p>
        Ce prompt fait partie de notre{" "}
        <Link href="/prompts">bibliothèque de prompts IA pour PME</Link> :
        une collection de prompts système testés en production, disponibles
        en copier-coller et en téléchargement <code>.md</code>. On y trouve
        notamment :
      </p>
      <ul>
        <li>
          <Link href="/prompts#claude-code-architecte">
            Le prompt Claude Code architecte
          </Link>{" "}
          (celui de cet article) &mdash; catégorie Stratégie IA.
        </li>
        <li>
          <Link href="/blog/configurer-odoo-ia-claude-cowork">
            Un Skill complet de paramétrage Odoo 19
          </Link>{" "}
          via Claude + Chrome.
        </li>
        <li>
          Des prompts pour la prospection B2B, le traitement d&apos;objections,
          la rédaction SEO, l&apos;audit cybersécurité NIS2 et
          l&apos;estimation de ROI d&apos;un projet IA.
        </li>
      </ul>
      <p>
        Si vous voulez aller plus loin sur l&apos;usage de Claude Code en
        contexte PME, commencez par{" "}
        <Link href="/blog/configurer-odoo-ia-claude-cowork">
          notre retour d&apos;expérience sur Odoo en 4 jours
        </Link>{" "}
        (méthode, Skills, packages), ou nos{" "}
        <Link href="/approche#prestations">prestations d&apos;accompagnement</Link>{" "}
        IA &amp; transformation digitale. Et pour situer où en est
        l&apos;écosystème — modèles, agents, prix —, notre{" "}
        <Link href="/blog/bilan-ia-janvier-juillet-2026">
          bilan IA janvier-juillet 2026
        </Link>{" "}
        fait le point en un article.
      </p>

      <p>
        Et quand le sujet n&apos;est pas de construire mais d&apos;évaluer
        l&apos;existant, le pendant de cet article est notre{" "}
        <Link href="/blog/prompt-audit-projet-claude-fable">
          prompt d&apos;audit complet de projet pour Claude Fable
        </Link>
        &nbsp;: 4 phases, constats cités fichier:ligne, plan de remise à
        niveau en jalons.
      </p>

      {/* ===== CTA douce ===== */}
      <p>
        Vous testez Claude Code dans votre PME et vous voulez un regard
        extérieur avant de partir en production ? Notre{" "}
        <Link href="/contact">Audit 180° (60 min, offert)</Link> sert
        exactement à ça : on regarde votre cadrage, vos risques et les quick
        wins à activer en premier. Pour une vue d&apos;ensemble de votre
        maturité IA, voyez notre{" "}
        <Link href="/audit-ia-pme">audit IA pour PME</Link>.
      </p>

      {/* ===== FAQ ===== */}
      <h2>FAQ &mdash; Claude Code, CLAUDE.md et Skills</h2>
      {faqItems.map((item) => (
        <div key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </ArticleLayout>
    </>
  );
}
