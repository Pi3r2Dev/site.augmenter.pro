import { articleMetadata } from "@/lib/article-metadata";
import Link from "next/link";
import { ArticleLayout } from "@/components/layout/article-layout";
import { AtelierCallout } from "@/components/sections/atelier-callout";
import { Memo } from "@/components/article/memo";
import { Callout } from "@/components/article/callout";
import { PullQuote } from "@/components/article/pull-quote";
import { KeyTakeaways } from "@/components/article/key-takeaways";

export const metadata = articleMetadata({
  title: "Claude Code + Odoo : le workflow technique (RPC, MCP) 2026",
  description:
    "Brancher Claude Code sur Odoo Online sans module Python : RPC call_kw, Playwright, CLAUDE.md, serveur MCP et garde-fous. Code réel d'une mission, pièges inclus.",
  slug: "claude-code-odoo-workflow",
});

const CODE_BLOCK =
  "my-6 overflow-x-auto rounded-lg border border-border/60 bg-muted/40 p-5 font-mono text-xs leading-relaxed";

export default function ClaudeCodeOdooWorkflow() {
  return (
    <ArticleLayout
      title="Claude Code et Odoo : le workflow technique pour piloter votre ERP sans module Python"
      excerpt="Votre Odoo est en SaaS, votre intégrateur dit « impossible », et chaque micro-modification prend trois semaines. Voici, code à l&apos;appui, comment Claude Code lit, modifie et vérifie un Odoo Online depuis le terminal : RPC, Playwright, CLAUDE.md, puis serveur MCP avec garde-fous."
      tags={["IA", "Claude Code", "PME"]}
      readTime="11 min"
      date="14 octobre 2026"
      dateISO="2026-10-14"
      image="/images/blog/claude-code-odoo-workflow.webp"
      slug="claude-code-odoo-workflow"
    >
      <p>
        Vous avez payé un abonnement Odoo Online. Vous avez demandé une colonne
        de plus dans une liste, un champ qui affiche le stock entrant, une vue
        qui trie autrement. Et vous avez entendu la phrase qui coûte le plus
        cher dans la vie d&apos;un ERP : « ce n&apos;est pas possible sur votre
        version ». Cet article montre, code à l&apos;appui, ce qui est
        réellement possible depuis Claude Code, ce qui ne l&apos;est pas, et
        à quel moment il faut arrêter de cliquer pour passer à un serveur MCP.
      </p>

      <h2>Votre Odoo est en SaaS, et chaque modification passe par quelqu&apos;un d&apos;autre</h2>
      <p>
        Le problème n&apos;est pas Odoo, c&apos;est la file d&apos;attente
        devant Odoo. Sur une instance Online, votre prestataire a raison sur un
        point : <strong>aucun module Python personnalisé ne s&apos;installe</strong>.
        La plateforme le refuse, sans négociation. À partir de là, deux lectures
        s&apos;affrontent. La première, celle de l&apos;intégrateur pressé :
        « donc rien n&apos;est possible, il faut migrer sur Odoo.sh ». La
        seconde, celle que nous avons éprouvée pendant plusieurs mois chez une
        PME de négoce technique en Île-de-France :{" "}
        <Memo type="idea" label="4 portes restent ouvertes">
          quatre portes restent ouvertes, et elles couvrent l&apos;essentiel
          de ce qu&apos;un dirigeant demande
        </Memo>
        .
      </p>
      <p>
        Ce qui vous coûte, ce ne sont pas les gros chantiers. Ce sont les
        dizaines de retouches de quinze minutes qui deviennent chacune un
        ticket, un devis, une attente. Dans notre expérience, c&apos;est là
        que se joue la dépendance : pas sur l&apos;installation, sur la vie
        d&apos;après. Le workflow qui suit a été conçu pour cette vie
        d&apos;après.
      </p>

      <h2>Ce qu&apos;Odoo Online autorise vraiment : quatre portes, pas zéro</h2>
      <p>
        Odoo Online interdit le code Python dans des modèles, mais autorise
        quatre mécanismes qui suffisent à la plupart des personnalisations
        d&apos;une PME. Voici la grille que nous appliquons avant de dire
        « impossible » ; le détail de chaque contournement, et le cas où la
        migration vers Odoo.sh se justifie quand même, est dans{" "}
        <Link href="/blog/odoo-online-ce-que-vous-ne-pouvez-pas-installer">
          Odoo Online : ce que vous ne pourrez jamais y installer
        </Link>
        .
      </p>
      <table>
        <thead>
          <tr>
            <th>Porte</th>
            <th>Ce qu&apos;elle permet</th>
            <th>Sa limite</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Studio</strong>
            </td>
            <td>Champs, vues, automatisations, par l&apos;interface</td>
            <td>Clics uniquement, difficile à tracer et à annuler en lot</td>
          </tr>
          <tr>
            <td>
              <strong>Actions serveur</strong>
            </td>
            <td>Du Python inline, exécuté dans un bac à sable</td>
            <td>Pas de nouveau modèle, pas d&apos;import de bibliothèque</td>
          </tr>
          <tr>
            <td>
              <strong>Modules « data-only »</strong>
            </td>
            <td>JS, XML, SCSS importés en ZIP : patcher un widget, ajouter du style</td>
            <td>Aucun fichier Python dans <code>models/</code></td>
          </tr>
          <tr>
            <td>
              <strong>RPC</strong>
            </td>
            <td>
              Lire et écrire tout ce que l&apos;interface sait faire, depuis un
              script
            </td>
            <td>Agit avec les droits de l&apos;utilisateur connecté, donc à encadrer</td>
          </tr>
        </tbody>
      </table>
      <Callout>
        <p>
          <strong>À retenir.</strong> Un champ « related », une colonne dans
          une liste, un widget retouché, une automatisation : tout cela passe
          sur Odoo Online sans une ligne de Python côté serveur. Ce qui ne
          passe pas : un calcul métier lourd dans un nouveau modèle. Là, il
          faut Odoo.sh ou une édition Community.
        </p>
      </Callout>

      <h2>Le workflow en cinq étapes : Claude Code au clavier, Odoo dans le navigateur</h2>
      <p>
        Le principe tient en une phrase : Claude Code pilote un navigateur déjà
        connecté à Odoo, et parle au serveur par le même canal que
        l&apos;interface. Il n&apos;y a pas de clé d&apos;API à créer, pas de
        module à installer, et tout ce que vous voyez à l&apos;écran, Claude le
        voit aussi.
      </p>

      <h3>1. Un CLAUDE.md qui dit à Claude où il met les pieds</h3>
      <p>
        Avant la première commande, un fichier de contexte à la racine du
        projet. Il tient en vingt lignes et évite les trois erreurs qui
        reviennent : se tromper de version, croire qu&apos;un module Python
        s&apos;installera, et modifier sans prévoir le retour arrière. Si vous
        n&apos;avez jamais écrit ce fichier, notre{" "}
        <Link href="/blog/claude-code-prompt-architecture">
          guide du CLAUDE.md et des Skills
        </Link>{" "}
        pose la structure complète.
      </p>
      <pre className={CODE_BLOCK}>
        <code>{`# CLAUDE.md — projet Odoo <client>

## Instance
- Odoo 19.0, édition Online (SaaS) : AUCUN module Python custom
- URL : https://<instance>.odoo.com — session ouverte dans Playwright
- Mode debug : ajouter ?debug=1 à l'URL

## Ce qui est autorisé
- Studio, actions serveur (sandbox), modules data-only (JS/XML/SCSS), RPC call_kw

## Règles
- Toute écriture est précédée d'une lecture (fields_get, search_read)
- Chaque chantier livre un rollback() : ids créés, valeurs d'avant
- Données manquantes : on fait remplir l'équipe, on ne reconstruit pas
- Jamais de modification de prix, de coût ou de stock par script`}</code>
      </pre>

      <h3>2. Lire avant d&apos;écrire : l&apos;introspection par RPC</h3>
      <p>
        Toutes les opérations passent par le point d&apos;accès{" "}
        <code>/web/dataset/call_kw</code>, appelé en <code>fetch()</code> depuis
        la page Odoo ouverte. Première commande, toujours : lister les champs
        du modèle visé, avec leur type et leur caractère stocké ou calculé. Ce
        détail décide de la suite, on y revient dans les pièges.
      </p>
      <pre className={CODE_BLOCK}>
        <code>{`// Exécuté par Claude Code via browser_evaluate (Playwright MCP)
() => fetch('/web/dataset/call_kw', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0', method: 'call', id: 1,
    params: {
      model: 'sale.order.line',
      method: 'fields_get',
      args: [],
      kwargs: { attributes: ['string', 'type', 'store', 'related'] },
    },
  }),
}).then(r => r.json()).then(d => JSON.stringify(d.result, null, 2))`}</code>
      </pre>

      <h3>3. Créer un champ « related » sans Studio</h3>
      <p>
        Le cas le plus demandé par un dirigeant : voir une information qui
        existe déjà ailleurs dans Odoo, mais pas dans l&apos;écran où il
        travaille. Un champ related fait exactement cela, et sa création par
        RPC produit le même enregistrement que Studio, en traçable.
      </p>
      <pre className={CODE_BLOCK}>
        <code>{`params: {
  model: 'ir.model.fields',
  method: 'create',
  args: [{
    model_id: 793,                       // id de sale.order.line (lu via ir.model)
    name: 'x_incoming_qty',
    field_description: 'Stock entrant',
    ttype: 'float',
    related: 'product_id.incoming_qty',
    readonly: true,
    store: false,
  }],
  kwargs: {},
}
// La réponse est l'id du champ créé : on le note pour le rollback.`}</code>
      </pre>

      <h3>4. Poser le champ dans la vue</h3>
      <p>
        Un champ créé n&apos;est visible nulle part tant qu&apos;une vue ne le
        porte pas. On lit l&apos;architecture XML de la vue cible avec{" "}
        <code>ir.ui.view / read</code>, Claude insère la colonne au bon
        endroit, puis on réécrit l&apos;architecture avec{" "}
        <code>ir.ui.view / write</code>. L&apos;ancienne version est conservée
        dans le projet : c&apos;est elle qu&apos;on remettra en cas de retour
        arrière.
      </p>

      <h3>5. Vérifier, puis livrer le rollback avec le chantier</h3>
      <p>
        La vérification ne se fait pas à l&apos;œil : Claude relit le champ et
        la vue par RPC, ouvre l&apos;écran dans le navigateur et compare. Puis
        il écrit la fonction de retour arrière avant même de clôturer le
        ticket. C&apos;est la règle qui a le plus rassuré le dirigeant chez qui
        nous avons travaillé :{" "}
        <Memo type="idea" label="Rollback livré avec chaque chantier">
          rien de natif n&apos;est modifié, et chaque ajout sait se supprimer
          proprement
        </Memo>
        . La version prête à l&apos;emploi de ces règles est dans notre{" "}
        <Memo type="link" label="Skill Odoo à télécharger">
          <a href="/downloads/skill-odoo-configuration.md">
            skill Odoo pour Claude
          </a>
        </Memo>
        , à déposer dans votre projet.
      </p>

      <AtelierCallout />

      <h2>Les pièges qu&apos;on a payés pour vous</h2>
      <p>
        Chacun de ces pièges nous a coûté entre une heure et une
        demi-journée. Ils ne figurent dans aucune documentation officielle sous
        cette forme.
      </p>
      <ul>
        <li>
          <strong>Un champ calculé non stocké ne se filtre pas.</strong> Il se
          lit dans un <code>search_read</code>, il s&apos;affiche dans une
          liste, il colore une ligne. Mais il casse tout filtre de recherche
          ou domaine qui l&apos;utilise. Vérifier <code>store</code> dans{" "}
          <code>fields_get</code> avant de promettre un filtre.
        </li>
        <li>
          <strong>Un ZIP créé sous Windows ne s&apos;importe pas.</strong>{" "}
          <code>Compress-Archive</code> écrit des antislashs dans les chemins,
          Odoo attend des barres obliques. Créer l&apos;archive en Python avec
          des chemins normalisés, ou l&apos;import échoue sans message utile.
        </li>
        <li>
          <strong>« Force init » à la mise à jour efface des données.</strong>{" "}
          À cocher à la première installation d&apos;un module data-only,
          jamais à une mise à jour : les enregistrements marqués{" "}
          <code>noupdate</code> seraient réinitialisés.
        </li>
        <li>
          <strong>Odoo 19 a changé le Kanban.</strong> Le gabarit{" "}
          <code>kanban-box</code> a disparu ; un widget qui l&apos;utilise
          encore ne rend rien. Il faut <code>&lt;t t-name=&quot;card&quot;&gt;</code>.
        </li>
        <li>
          <strong>Claude ne peut pas téléverser un fichier.</strong> Sur Odoo
          Online, Playwright n&apos;ouvre pas le sélecteur de fichiers et
          l&apos;injection par script est bloquée par le composant OWL.
          L&apos;import du ZIP reste un geste humain, et c&apos;est très bien
          ainsi.
        </li>
      </ul>

      <h2>Serveur MCP : quand Claude ne doit plus cliquer, mais appeler des outils</h2>
      <p>
        Le workflow précédent sert à <em>configurer</em> Odoo. Il ne sert pas à
        faire travailler un agent au quotidien avec vos données : un agent qui
        répond à l&apos;équipe au comptoir n&apos;a pas à piloter un
        navigateur, il appelle des outils. C&apos;est le rôle d&apos;un{" "}
        <Link href="/blog/serveur-mcp-integration-crm-erp">serveur MCP</Link>, et
        le sujet vient de changer d&apos;échelle.
      </p>
      <h3>Ce qu&apos;Odoo 20 apporte tout seul</h3>
      <p>
        Odoo 20, présenté fin septembre 2026, embarque un{" "}
        <Memo type="idea" label="Odoo 20 : MCP natif">
          serveur MCP natif
        </Memo>{" "}
        : un module <code>ai_mcp</code>, un point d&apos;accès <code>/mcp</code>{" "}
        sur votre base, une clé d&apos;API à portée « MCP » ou OAuth 2.1, et
        des outils qui agissent avec les droits de l&apos;utilisateur ayant
        fourni la clé. Dans la pré-version documentée par des tiers, ces outils
        sont génériques et en lecture : modèles, champs, recherche,
        regroupement. Source :{" "}
        <a
          href="https://www.odoo.com/odoo-20-release-notes"
          target="_blank"
          rel="noopener noreferrer"
        >
          notes de version d&apos;Odoo 20
        </a>
        . Ce que cela change pour une PME, et ce qui manque encore, est traité
        à part dans{" "}
        <Link href="/blog/odoo-20-serveur-mcp-agents">
          Odoo 20 et son serveur MCP : ce qui change, ce qui manque
        </Link>
        .
      </p>
      <p>
        Un détail de budget à garder en tête : avec Odoo 20, les fonctions
        d&apos;IA intégrées se paient en crédits, 1 € pièce sur le catalogue
        officiel, sans que la consommation par question soit publiée. Un
        serveur MCP externe choisit son modèle. Un modèle ouvert sur une
        machine équipée d&apos;une bonne carte graphique, administrée à
        distance, répond pour zéro euro à la question :{" "}
        <Link href="/blog/cout-agent-ia-odoo">
          crédits, abonnements ou une machine à vous
        </Link>
        .
      </p>
      <h3>Ce qu&apos;un serveur MCP métier ajoute par-dessus</h3>
      <p>
        Un serveur MCP générique donne au modèle le schéma d&apos;Odoo et le
        laisse se débrouiller. C&apos;est puissant, et c&apos;est précisément
        ce que nous refusons de donner à un agent qui parle à vos clients.
        Depuis août 2026 nous construisons, pour un pilote, un serveur MCP
        écrit en Python avec le SDK officiel, qui parle à Odoo 19 par son API
        JSON-2 sans une ligne de Python dans Odoo, donc compatible Online.
        Trois choix le distinguent d&apos;un tuyau générique.
      </p>
      <ul>
        <li>
          <strong>Des outils par intention, pas par objet.</strong> « La fiche
          de ce produit » rend en un appel le stock libre, la prochaine
          réception datée, le prix de ce client et les modèles proches. Une
          question du comptoir coûte un appel, pas cinq, et
          l&apos;assemblage des données vit dans du code testé, pas dans le
          raisonnement du modèle.
        </li>
        <li>
          <strong>Des garde-fous dans le code, pas dans le prompt.</strong>{" "}
          <Memo type="num" label="0 paramètre prix sur les outils">
            Aucun outil n&apos;a de paramètre prix, coût ou validation de
            commande
          </Memo>
          , et un test automatisé compare le schéma de tous les outils pour
          s&apos;en assurer à chaque build. L&apos;écriture s&apos;arrête au
          brouillon de devis : c&apos;est un humain qui appuie sur le bouton.
          Pourquoi une consigne dans le prompt ne suffit pas :{" "}
          <Link href="/blog/agent-ia-qui-ne-touche-pas-aux-prix">
            l&apos;agent IA qui ne peut pas toucher aux prix
          </Link>
          .
        </li>
        <li>
          <strong>Un vérificateur de chiffres.</strong> Le modèle reçoit
          37,73 € de l&apos;outil et peut écrire 35 € au client. Un nombre
          cité dans la réponse qu&apos;aucun outil n&apos;a rendu est repéré
          par du code, d&apos;abord en observation, puis en blocage.
        </li>
      </ul>
      <PullQuote>
        Un agent qui ne peut pas changer un prix, même si on le lui demande
        gentiment.
      </PullQuote>
      <p>
        Le tout tient grâce à une discipline chiffrée :{" "}
        <Memo type="num" label="5 794 tests au vert">
          5 794 tests automatisés au vert
        </Memo>{" "}
        au 14 octobre 2026, onze décisions d&apos;architecture écrites avec
        leurs options rejetées, et chaque capacité vérifiée en direct puis
        recoupée dans Odoo au centime. Le serveur MCP natif d&apos;Odoo 20
        pourra devenir, demain, une des façons dont ces outils parlent à Odoo.
        La valeur n&apos;est pas le tuyau, c&apos;est ce qui passe dedans. Ce
        que ce serveur ajoute à Odoo 20, point par point :{" "}
        <Link href="/serveur-mcp-odoo">notre page serveur MCP pour Odoo</Link>.
        Pour choisir entre coder, louer ou héberger, la{" "}
        <Link href="/integration-mcp">page intégration MCP</Link> détaille les
        trois chemins.
      </p>

      <h2>Quand ce workflow n&apos;est pas le bon</h2>
      <p>
        Trois situations où nous déconseillons ce qui précède, parce que nous
        l&apos;avons vu échouer ou coûter plus qu&apos;il ne rapporte.
      </p>
      <ul>
        <li>
          <strong>Vous êtes sur Odoo.sh ou en Community.</strong> Un module
          Python classique, versionné dans Git, est la bonne voie. Le détour par
          RPC et les modules data-only est une réponse à la contrainte Online,
          pas une doctrine.
        </li>
        <li>
          <strong>Personne dans l&apos;équipe ne sait lire un JSON.</strong> Le
          workflow suppose quelqu&apos;un, vous ou un collaborateur, capable de
          relire ce que Claude a fait. Sans ce regard, Studio reste préférable :
          moins puissant, mais lisible par tous.
        </li>
        <li>
          <strong>Vos données ne sont pas tenues.</strong> Des emplacements de
          stock vides, des produits sans coût d&apos;achat, des contacts mal
          typés : aucun agent ne rattrape cela, il l&apos;amplifie. Le
          nettoyage vient d&apos;abord ; notre{" "}
          <Link href="/blog/configurer-odoo-ia-claude-cowork">
            retour sur la reconfiguration d&apos;un Odoo en quatre jours
          </Link>{" "}
          montre par où commencer.
        </li>
      </ul>

      <KeyTakeaways title="Par où commencer, cette semaine">
        <ul>
          <li>
            Écrire le <code>CLAUDE.md</code> du projet Odoo : version, édition,
            interdits, règle de rollback. Vingt lignes, une heure.
          </li>
          <li>
            Première session en lecture seule : <code>fields_get</code> sur le
            modèle que votre équipe utilise le plus. Repérer les champs calculés
            non stockés avant toute promesse.
          </li>
          <li>
            Un premier chantier d&apos;une demi-journée : un champ related et sa
            colonne, avec son rollback. Pas plus.
          </li>
          <li>
            Pour un agent qui parle à l&apos;équipe ou aux clients : exiger des
            outils sans paramètre prix et une écriture bornée au brouillon,
            avant de discuter du modèle.
          </li>
        </ul>
      </KeyTakeaways>

      <h2>FAQ — Claude Code et Odoo</h2>
      <h3>Comment connecter Claude à Odoo sans développeur ?</h3>
      <p>
        Pour configurer : Claude Code pilote votre navigateur connecté à Odoo
        et passe par le point d&apos;accès RPC que l&apos;interface utilise
        déjà, sans clé ni module. Pour faire travailler un agent au quotidien :
        un serveur MCP, natif dans Odoo 20 ou construit sur mesure avec des
        garde-fous.
      </p>
      <h3>Claude Code fonctionne-t-il avec Odoo.sh ?</h3>
      <p>
        Oui, et mieux encore : sur Odoo.sh un module Python classique
        s&apos;installe, donc Claude Code travaille dans un dépôt Git comme
        sur n&apos;importe quel projet. Le workflow RPC décrit ici reste utile
        pour l&apos;introspection et les vérifications.
      </p>
      <h3>Faut-il attendre le serveur MCP natif d&apos;Odoo 20 ?</h3>
      <p>
        Non pour configurer, le workflow RPC suffit aujourd&apos;hui. Oui pour
        un agent de lecture simple, si votre migration vers Odoo 20 est
        proche. Dans les deux cas, un outil générique en écriture ne doit
        jamais être exposé à un agent qui parle à des clients.
      </p>
      <h3>Peut-on laisser Claude modifier des prix dans Odoo ?</h3>
      <p>
        Techniquement oui, par RPC. Dans notre pratique, jamais par script ni
        par agent : le prix, le coût et le stock restent des gestes humains,
        et nos outils MCP n&apos;ont pas de paramètre pour les toucher. Un
        garde-fou dans le prompt ne suffit pas, il faut qu&apos;il soit dans le
        code.
      </p>

      <p>
        Si vous voulez voir ce workflow tourner sur votre propre instance, le
        premier rendez-vous n&apos;est pas facturé et se fait en visio partout
        en France :{" "}
        <Link href="/contact">réservez un Audit 180°</Link>, ou commencez par la{" "}
        <Link href="/prompts">bibliothèque de prompts</Link> si vous préférez
        avancer seul d&apos;abord.
      </p>
    </ArticleLayout>
  );
}
