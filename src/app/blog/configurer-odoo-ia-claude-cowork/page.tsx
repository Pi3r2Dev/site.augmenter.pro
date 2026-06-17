import { articleMetadata } from "@/lib/article-metadata";
import Link from "next/link";
import Image from "next/image";
import { ArticleLayout } from "@/components/layout/article-layout";
import { AtelierCallout } from "@/components/sections/atelier-callout";

export const metadata = articleMetadata({
  title: "Configurer Odoo avec l'IA : 4 Jours au Lieu de 3 500 €",
  description:
    "Comment nous avons reconfiguré tout Odoo d'un client en 4 jours avec Claude Cowork. Studio, SaaS/SH/Open Source, packages et formation incluse.",
  slug: "configurer-odoo-ia-claude-cowork",
});

export default function ConfigurerOdooIAClaude() {
  return (
    <ArticleLayout
      title="Configurer Odoo avec l&apos;IA : 4 jours au lieu de 3 500 &euro;"
      excerpt="Un client reçoit un devis à 3 500 € pour reconfigurer son Odoo. Nous l&apos;avons fait en 4 jours avec Claude Cowork. Voici la méthode complète : SaaS, Studio, packages, et comment rendre votre équipe autonome."
      tags={["Intelligence Artificielle", "Claude Code", "PME"]}
      readTime="12 min"
      date="29 mars 2026"
      dateISO="2026-03-29"
      image="/images/blog/configurer-odoo-ia-claude-cowork.webp"
      slug="configurer-odoo-ia-claude-cowork"
    >
      {/* ===== TLDR ===== */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 mb-8">
        <h2 className="mt-0 text-lg font-bold">TL;DR &mdash; Ce qu&apos;il faut retenir en 30 secondes</h2>
        <ul>
          <li>
            Un prestataire classique avait devis&eacute; <strong>3 500 &euro;</strong> pour
            reconfigurer la base Odoo d&apos;une PME (espaces verts &amp; machines-outils).
          </li>
          <li>
            Nous avons r&eacute;alis&eacute; l&apos;int&eacute;gralit&eacute; du travail en{" "}
            <strong>moins de 4 jours</strong> gr&acirc;ce &agrave; <strong>Claude Cowork</strong>{" "}
            (l&apos;app desktop de Claude) + un Skill personnalis&eacute; qui lit la documentation Odoo en temps r&eacute;el.
          </li>
          <li>
            <strong>Bonus</strong> : le client est d&eacute;sormais <strong>autonome</strong> pour
            les ajustements futurs. Pas de d&eacute;pendance int&eacute;grateur.
          </li>
          <li>
            Cet article vous explique la m&eacute;thode pas &agrave; pas : comprendre les modes Odoo
            (SaaS, SH, Open Source), choisir les bons packages, utiliser Studio, et
            configurer avec l&apos;IA.
          </li>
        </ul>
      </div>

      {/* ===== INTRO ===== */}
      <p>
        Quand un dirigeant de PME re&ccedil;oit un devis &agrave; 3 500 &euro; &mdash; et parfois bien plus &mdash;
        pour &laquo;&nbsp;reconfigurer Odoo&nbsp;&raquo;, il h&eacute;site. Et il a raison de se poser la
        question : <strong>est-ce que le param&eacute;trage d&apos;un ERP doit vraiment co&ucirc;ter aussi cher ?</strong>
      </p>
      <p>
        Dans notre exp&eacute;rience chez{" "}
        <Link href="/approche">augmenter.PRO</Link>, la r&eacute;ponse est non. Pas
        si vous combinez la bonne m&eacute;thode, le bon outil d&apos;IA, et une philosophie simple :
      </p>
      <p className="text-lg font-semibold italic text-primary">
        &laquo;&nbsp;Donne un poisson &agrave; quelqu&apos;un et il mange un jour. Apprends-lui &agrave; p&ecirc;cher
        et il mange tous les jours.&nbsp;&raquo;
      </p>
      <p>
        C&apos;est exactement ce que nous avons fait pour un client dans le secteur des{" "}
        <strong>fournitures d&apos;espaces verts et machines-outils</strong>. Son int&eacute;grateur
        habituel &mdash; une grosse structure avec beaucoup de d&eacute;veloppeurs &mdash; avait devis&eacute;
        3 500 &euro; pour remettre &agrave; plat sa base Odoo. Nous l&apos;avons fait en 4 jours.
        Et surtout, nous avons <strong>form&eacute; l&apos;&eacute;quipe</strong> pour qu&apos;elle n&apos;ait plus
        jamais besoin de payer ce genre de prestation.
      </p>

      {/* ===== H2 : Le constat ===== */}
      <h2>Le constat : pourquoi le param&eacute;trage Odoo co&ucirc;te si cher</h2>

      <h3>Le mod&egrave;le classique : l&apos;int&eacute;grateur &agrave; 600&ndash;1 000 &euro;/jour</h3>
      <p>
        En France, le tarif journalier moyen (TJM) d&apos;un consultant Odoo se situe
        entre <strong>300 &euro; pour un junior et 1 000 &euro; pour un expert</strong>{" "}
        (source : Krafter, La Fabrique du Net, 2026). Un projet d&apos;int&eacute;gration pour
        une PME d&eacute;marre rarement en dessous de 5 000 &euro; et peut atteindre 50 000 &euro;
        pour les configurations complexes.
      </p>
      <p>
        Le probl&egrave;me n&apos;est pas la comp&eacute;tence des int&eacute;grateurs. C&apos;est le <strong>mod&egrave;le
        &eacute;conomique</strong> : grosses structures avec du BFR (besoin en fonds de roulement),
        des points morts &eacute;lev&eacute;s, beaucoup de d&eacute;veloppeurs &agrave; occuper, et peu d&apos;investissement
        dans la formation du client. R&eacute;sultat : <strong>chaque modification future repasse
        par le prestataire</strong>. Le client est captif.
      </p>

      <h3>Notre cas concret : un devis &agrave; 3 500 &euro;, 4 jours de travail r&eacute;el</h3>
      <p>
        Notre client, une PME sp&eacute;cialis&eacute;e dans les fournitures d&apos;espaces verts et
        machines-outils, utilisait <strong>Odoo en mode SaaS</strong>. Sa base de donn&eacute;es
        n&eacute;cessitait une refonte compl&egrave;te : restructuration des fiches produits,
        reconfiguration des r&egrave;gles de tarification, remise &agrave; plat des droits d&apos;acc&egrave;s,
        nettoyage des donn&eacute;es, et param&eacute;trage de nouveaux workflows.
      </p>
      <p>
        Son prestataire habituel &mdash; un int&eacute;grateur Odoo classique, grosse &eacute;quipe,
        pignon sur rue &mdash; avait chiffr&eacute; ce travail &agrave; <strong>3 500 &euro; HT</strong>.
        Nous l&apos;avons r&eacute;alis&eacute; en <strong>moins de 4 jours</strong>, formation de l&apos;&eacute;quipe
        incluse. La diff&eacute;rence ? <strong>Claude Cowork</strong> et une m&eacute;thode que
        tout dirigeant de PME peut reproduire.
      </p>

      {/* ===== H2 : Comprendre Odoo ===== */}
      <h2>Comprendre Odoo avant de le configurer : SaaS, SH et Open Source</h2>
      <p>
        Avant de parler d&apos;IA, il faut comprendre <strong>dans quel &laquo;&nbsp;mode&nbsp;&raquo;
        tourne votre Odoo</strong>. C&apos;est la premi&egrave;re question &agrave; se poser, car elle
        d&eacute;termine ce que vous pouvez faire (et ne pas faire) sans d&eacute;veloppeur.
      </p>

      <h3>Odoo SaaS (Online) : simple mais limit&eacute;</h3>
      <p>
        C&apos;est le mode que notre client utilisait. Odoo h&eacute;berge tout pour vous.
        Pas de serveur &agrave; g&eacute;rer, mises &agrave; jour automatiques, d&eacute;marrage rapide.
      </p>
      <ul>
        <li><strong>Prix</strong> : &agrave; partir de 19,90 &euro;/utilisateur/mois (Standard) ou 29,90 &euro; (Custom, inclut Studio)</li>
        <li><strong>Avantage</strong> : z&eacute;ro maintenance technique</li>
        <li><strong>Limite</strong> : pas de modules custom, pas d&apos;acc&egrave;s au code source</li>
        <li><strong>Id&eacute;al pour</strong> : PME qui veulent utiliser Odoo &laquo;&nbsp;tel quel&nbsp;&raquo; avec les apps standard</li>
      </ul>

      <h3>Odoo.sh : le meilleur compromis pour les PME ambitieuses</h3>
      <p>
        Odoo.sh est la plateforme cloud d&apos;Odoo avec acc&egrave;s au code. Vous
        pouvez installer des modules custom, utiliser Git pour versionner
        vos modifications, et disposer d&apos;environnements de staging pour tester
        avant de mettre en production.
      </p>
      <ul>
        <li><strong>Prix</strong> : &agrave; partir de ~120 &euro;/mois pour l&apos;h&eacute;bergement + licences Enterprise par utilisateur</li>
        <li><strong>Avantage</strong> : flexibilit&eacute; compl&egrave;te, CI/CD int&eacute;gr&eacute;, staging</li>
        <li><strong>Limite</strong> : n&eacute;cessite un minimum de comp&eacute;tences techniques (ou un accompagnement)</li>
        <li><strong>Id&eacute;al pour</strong> : PME avec des besoins m&eacute;tier sp&eacute;cifiques qui d&eacute;passent le standard</li>
      </ul>
      <p>
        <strong>Fait notable</strong> : en f&eacute;vrier 2026, Fabien Pinckaers (CEO d&apos;Odoo)
        a annonc&eacute; l&apos;arriv&eacute;e du <em>vibe coding</em> natif dans Odoo.sh &mdash;
        la possibilit&eacute; de g&eacute;n&eacute;rer des modules en langage naturel directement
        depuis la plateforme.
      </p>

      <h3>Odoo Community (Open Source) : libert&eacute; totale, complexit&eacute; incluse</h3>
      <p>
        La version libre, open source (LGPL-v3). Vous h&eacute;bergez vous-m&ecirc;me,
        vous avez acc&egrave;s &agrave; tout le code, mais vous perdez des modules cl&eacute;s :
        Studio, Helpdesk, Marketing Automation, Qualit&eacute;, Maintenance, et le
        support officiel.
      </p>
      <ul>
        <li><strong>Prix</strong> : 0 &euro; de licence, mais co&ucirc;ts d&apos;h&eacute;bergement et maintenance &agrave; votre charge</li>
        <li><strong>Avantage</strong> : aucun co&ucirc;t de licence, libert&eacute; totale</li>
        <li><strong>Limite</strong> : pas de Studio, pas de support, modules Enterprise absents, mises &agrave; jour manuelles</li>
        <li><strong>Id&eacute;al pour</strong> : &eacute;quipes techniques qui veulent tout ma&icirc;triser</li>
      </ul>

      <h3>Quel mode choisir ? Tableau comparatif</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-4 text-left">Crit&egrave;re</th>
              <th className="py-2 pr-4 text-left">SaaS (Online)</th>
              <th className="py-2 pr-4 text-left">Odoo.sh</th>
              <th className="py-2 text-left">Community</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 pr-4 font-medium">Licence</td>
              <td className="py-2 pr-4">Enterprise</td>
              <td className="py-2 pr-4">Enterprise</td>
              <td className="py-2">LGPL (libre)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-medium">Modules custom</td>
              <td className="py-2 pr-4">Non</td>
              <td className="py-2 pr-4">Oui</td>
              <td className="py-2">Oui</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-medium">Studio</td>
              <td className="py-2 pr-4">Plan Custom uniquement</td>
              <td className="py-2 pr-4">Oui</td>
              <td className="py-2">Non</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-medium">Maintenance</td>
              <td className="py-2 pr-4">Automatique</td>
              <td className="py-2 pr-4">Assist&eacute;e</td>
              <td className="py-2">Manuelle</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-medium">Id&eacute;al pour</td>
              <td className="py-2 pr-4">PME standard</td>
              <td className="py-2 pr-4">PME ambitieuse</td>
              <td className="py-2">&Eacute;quipe tech</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Notre recommandation</strong> : pour la majorit&eacute; des PME que nous
        accompagnons en{" "}
        <Link href="/approche">Yvelines (78) et Val d&apos;Oise (95)</Link>,{" "}
        <strong>Odoo SaaS avec le plan Custom</strong> est le meilleur point de d&eacute;part.
        Vous b&eacute;n&eacute;ficiez de Studio (personnalisation sans code), du support Odoo,
        et z&eacute;ro maintenance serveur. Si vos besoins &eacute;voluent, la migration vers
        Odoo.sh reste possible.
      </p>

      {/* ===== H2 : Studio ===== */}
      <h2>Le mode Studio : personnaliser Odoo sans coder</h2>

      <h3>Ce que Studio peut faire</h3>
      <p>
        Odoo Studio est un outil <strong>no-code</strong> int&eacute;gr&eacute; &agrave; l&apos;&eacute;dition Enterprise
        (plan Custom &agrave; 29,90 &euro;/utilisateur/mois). Il permet de :
      </p>
      <ul>
        <li>Cr&eacute;er des <strong>champs personnalis&eacute;s</strong> (texte, s&eacute;lection, calcul&eacute;, date, relation&hellip;)</li>
        <li>Modifier les <strong>vues</strong> (formulaire, liste, kanban) par glisser-d&eacute;poser</li>
        <li>Ajouter des <strong>automatisations</strong> (actions d&eacute;clench&eacute;es sur cr&eacute;ation, modification, planification)</li>
        <li>Personnaliser les <strong>rapports PDF</strong> (devis, factures, bons de livraison)</li>
        <li>Cr&eacute;er des <strong>tableaux de bord</strong> et des menus personnalis&eacute;s</li>
        <li><strong>Nouveaut&eacute; Odoo v19</strong> : les <strong>champs IA</strong> dans Studio &mdash; des champs qui g&eacute;n&egrave;rent automatiquement du contenu &agrave; partir de prompts personnalis&eacute;s, sans une ligne de code</li>
      </ul>

      <h3>Les limites de Studio (et quand passer au code)</h3>
      <p>
        Studio est puissant pour les modifications simples, mais il a des limites
        qu&apos;il faut conna&icirc;tre <strong>avant</strong> de s&apos;engager :
      </p>
      <ul>
        <li><strong>Logique m&eacute;tier complexe</strong> : conditions imbriqu&eacute;es, API tierces, algorithmes &mdash; Studio ne suffit pas</li>
        <li><strong>Pas de versioning</strong> : aucune int&eacute;gration Git, impossible de revenir en arri&egrave;re proprement</li>
        <li><strong>Difficult&eacute; de debug</strong> : quand une automatisation Studio pose probl&egrave;me, le diagnostic est limit&eacute;</li>
        <li><strong>Risque lors des mises &agrave; jour</strong> : les personnalisations Studio peuvent casser lors d&apos;un changement de version</li>
      </ul>
      <p>
        <strong>Notre avis</strong> : Studio est parfait pour <strong>80 % des besoins d&apos;une PME</strong>
        &mdash; champs personnalis&eacute;s, vues adapt&eacute;es, automatisations simples. Pour les
        20 % restants, il faut du d&eacute;veloppement Python classique ou une migration vers
        Odoo.sh. Et c&apos;est justement l&agrave; que l&apos;IA entre en jeu.
      </p>

      {/* ===== H2 : Packages ===== */}
      <h2>Les packages Odoo : choisir les bons modules</h2>

      <h3>Les modules essentiels pour une PME</h3>
      <p>
        Odoo propose plus de <strong>80 applications officielles</strong> et des milliers
        de modules communautaires. Pour une PME comme notre client (n&eacute;goce et
        distribution), voici le socle que nous recommandons :
      </p>
      <ul>
        <li><strong>CRM</strong> : pipeline commercial, suivi des opportunit&eacute;s, scoring (IA en v18+)</li>
        <li><strong>Ventes</strong> : devis, commandes, grilles tarifaires par client/cat&eacute;gorie</li>
        <li><strong>Achats</strong> : commandes fournisseurs, accords-cadres, r&eacute;approvisionnement</li>
        <li><strong>Inventaire</strong> : gestion des stocks, emplacements, mouvements, code-barres</li>
        <li><strong>Comptabilit&eacute;</strong> : plan comptable fran&ccedil;ais, TVA, FEC, rapprochement bancaire (OCR en v18+)</li>
        <li><strong>Facturation</strong> : factures, avoirs, relances automatiques</li>
      </ul>
      <p>
        Pour notre client sp&eacute;cifiquement, nous avons ajout&eacute; le module <strong>Fabrication</strong>{" "}
        (gestion des nomenclatures machines) et <strong>Projet</strong> (suivi des interventions terrain).
      </p>

      <h3>L&apos;erreur fr&eacute;quente : installer trop de modules</h3>
      <p>
        C&apos;est un pi&egrave;ge classique que nous voyons chez nos clients PME. L&apos;attrait
        du &laquo;&nbsp;tout-en-un&nbsp;&raquo; Odoo pousse &agrave; activer 15 ou 20 modules d&egrave;s le d&eacute;part.
        R&eacute;sultat :
      </p>
      <ul>
        <li>Interface surcharg&eacute;e qui d&eacute;route les &eacute;quipes</li>
        <li>Donn&eacute;es &agrave; renseigner dans des modules que personne n&apos;utilise</li>
        <li>Co&ucirc;ts de licence qui grimpent (chaque app compl&eacute;mentaire peut augmenter le tarif)</li>
        <li>Complexit&eacute; de maintenance inutile</li>
      </ul>
      <p>
        <strong>Notre r&egrave;gle</strong> : d&eacute;marrez avec <strong>5 &agrave; 7 modules maximum</strong>.
        Ma&icirc;trisez-les. Puis ajoutez progressivement. C&apos;est beaucoup plus efficace
        qu&apos;un big bang &agrave; 20 modules o&ugrave; personne ne s&apos;y retrouve.
      </p>

      {/* ===== H2 : Notre méthode ===== */}
      <h2>Notre m&eacute;thode : Claude Cowork + documentation Odoo = gain &times;10</h2>
      <p>
        Voici la m&eacute;thode exacte que nous avons utilis&eacute;e pour reconfigurer
        l&apos;Odoo de notre client en 4 jours. Elle repose sur{" "}
        <strong>Claude Cowork</strong> &mdash; l&apos;application desktop de Claude pour Windows
        (et Mac) &mdash; combin&eacute;e &agrave; un <strong>Skill personnalis&eacute;</strong> et &agrave;
        l&apos;extension <strong>Claude in Chrome</strong> pour contr&ocirc;ler directement
        l&apos;interface Odoo.
      </p>

      <h3>Pr&eacute;requis : activer Claude in Chrome</h3>
      <p>
        C&apos;est la pi&egrave;ce ma&icirc;tresse qui rend tout possible. L&apos;extension{" "}
        <strong>Claude in Chrome</strong> permet &agrave; Claude de <strong>voir votre
        navigateur, cliquer, remplir des champs et naviguer</strong> dans Odoo
        comme un utilisateur humain. Sans elle, Claude ne peut que vous conseiller.
        Avec elle, il <em>ex&eacute;cute</em>.
      </p>
      <p>Pour l&apos;activer :</p>
      <ol>
        <li>Ouvrir Claude Desktop &rarr; <strong>Param&egrave;tres</strong> (ic&ocirc;ne engrenage)</li>
        <li>Aller dans la section <strong>Connecteurs</strong></li>
        <li>Trouver <strong>Claude in Chrome</strong> et <strong>Control Chrome</strong></li>
        <li>Cliquer sur <strong>Configurer</strong> pour les deux</li>
      </ol>
      <Image
        src="/images/blog/claude-in-chrome-connecteur.webp"
        alt="Panneau des connecteurs Claude Desktop montrant Claude in Chrome et Control Chrome activ&eacute;s"
        width={800}
        height={400}
        className="rounded-lg border border-border/50 my-6"
      />
      <p>
        Une fois connect&eacute;, Claude peut naviguer dans Odoo via les URLs directes
        (ex. <code>/odoo/crm</code>, <code>/odoo/settings</code>), lire les pages,
        remplir les formulaires et sauvegarder &mdash; le tout en prenant des screenshots
        apr&egrave;s chaque action pour v&eacute;rifier que le param&eacute;trage est correct.
      </p>

      <h3>&Eacute;tape 1 : Cr&eacute;er un Projet d&eacute;di&eacute; dans Claude Desktop</h3>
      <p>
        Dans Claude Desktop, un <strong>Projet</strong> est un espace de travail persistant
        avec sa propre m&eacute;moire, ses fichiers de contexte et son historique de conversation.
        C&apos;est l&agrave; que tout commence.
      </p>
      <ul>
        <li>Ouvrir Claude Desktop, onglet <strong>Cowork</strong></li>
        <li>Cr&eacute;er un nouveau Projet &laquo;&nbsp;Configuration Odoo [Client]&nbsp;&raquo;</li>
        <li>Ajouter la <strong>documentation Odoo</strong> pertinente comme fichiers de contexte (guides des modules utilis&eacute;s, r&egrave;gles fiscales fran&ccedil;aises, documentation API)</li>
        <li>D&eacute;finir les <strong>instructions projet</strong> : secteur d&apos;activit&eacute;, modules cibl&eacute;s, contraintes m&eacute;tier, terminologie sp&eacute;cifique</li>
      </ul>
      <p>
        Le r&eacute;sultat : Claude conna&icirc;t votre contexte m&eacute;tier <strong>et</strong> la documentation
        Odoo &agrave; jour. Il ne g&eacute;n&egrave;re pas de r&eacute;ponses g&eacute;n&eacute;riques &mdash; il r&eacute;pond <em>pour
        votre cas pr&eacute;cis</em>.
      </p>

      <h3>&Eacute;tape 2 : Installer le Skill de param&eacute;trage Odoo</h3>
      <p>
        Les <strong>Skills</strong> dans Claude Desktop sont des instructions r&eacute;utilisables
        qui personnalisent le comportement de Claude pour des t&acirc;ches sp&eacute;cifiques.
        Nous avons cr&eacute;&eacute; un Skill complet pour le param&eacute;trage d&apos;Odoo 19 que vous pouvez
        t&eacute;l&eacute;charger et utiliser directement.
      </p>
      <Image
        src="/images/blog/odoo-skill-claude-cowork.webp"
        alt="Skill de param&eacute;trage Odoo install&eacute; dans Claude Desktop avec sa description"
        width={800}
        height={100}
        className="rounded-lg border border-border/50 my-6"
      />
      <p>
        <strong>
          <a href="/downloads/skill-odoo-configuration.md" download>
            T&eacute;l&eacute;charger le Skill de configuration Odoo 19 (SKILL.md)
          </a>
        </strong>
      </p>
      <p>Ce Skill couvre :</p>
      <ul>
        <li><strong>CRM &amp; Ventes</strong> : pipeline, &eacute;quipes commerciales, activit&eacute;s, listes de prix, mod&egrave;les de devis, conditions de paiement</li>
        <li><strong>Inventaire &amp; Achats</strong> : entrepôts, emplacements, cat&eacute;gories produits, r&egrave;gles de r&eacute;approvisionnement, fournisseurs, tra&ccedil;abilit&eacute;</li>
        <li><strong>Navigation Odoo 19</strong> : URLs directes pour chaque module, structure des menus, patterns de formulaire</li>
        <li><strong>Automatisation Chrome</strong> : identification des &eacute;l&eacute;ments, gestion des formulaires, gestion des erreurs</li>
      </ul>
      <p>
        <strong>Pour l&apos;installer</strong> : copiez le fichier dans{" "}
        <code>~/.claude/skills/odoo-config/SKILL.md</code> et Claude le d&eacute;tecte
        automatiquement. Ou utilisez <code>/skill-creator</code> dans Cowork
        pour en cr&eacute;er un adapt&eacute; &agrave; votre situation.
      </p>
      <p>
        La philosophie du Skill est cl&eacute; : <strong>toujours demander avant d&apos;agir</strong>{" "}
        pour les d&eacute;cisions m&eacute;tier (combien d&apos;&eacute;tapes dans le pipeline ?
        quelle structure d&apos;entrep&ocirc;t ?), mais <strong>automatiser les actions
        m&eacute;caniques</strong> (navigation, remplissage de formulaires, sauvegarde).
        Puis <strong>v&eacute;rifier avec un screenshot</strong> apr&egrave;s chaque configuration.
      </p>
      <p>
        Pour aller plus loin sur la cr&eacute;ation de Skills et de prompts structur&eacute;s,
        consultez notre article{" "}
        <Link href="/blog/claude-code-prompt-architecture">
          les bonnes pratiques de prompt architecture avec Claude
        </Link>.
      </p>

      <h3>&Eacute;tape 3 : It&eacute;rer en langage naturel sur le param&eacute;trage</h3>
      <p>
        Une fois le Projet, le Skill et Claude in Chrome en place, le travail de
        configuration devient une <strong>conversation</strong> :
      </p>
      <ul>
        <li>
          <em>&laquo;&nbsp;Configure le module Ventes avec 3 &eacute;quipes commerciales :
          espaces verts, machines-outils, pi&egrave;ces d&eacute;tach&eacute;es. Chaque &eacute;quipe a
          ses propres r&egrave;gles de tarification.&nbsp;&raquo;</em>
        </li>
        <li>
          <em>&laquo;&nbsp;Cr&eacute;e une r&egrave;gle d&apos;automatisation : quand un devis d&eacute;passe
          5 000 &euro;, notifier le directeur commercial.&nbsp;&raquo;</em>
        </li>
        <li>
          <em>&laquo;&nbsp;Restructure les cat&eacute;gories de produits : niveau 1 = famille
          (tondeuses, tron&ccedil;onneuses, pi&egrave;ces), niveau 2 = marque, niveau 3 = gamme.&nbsp;&raquo;</em>
        </li>
      </ul>
      <p>
        Claude lit le Skill, conna&icirc;t les URLs directes d&apos;Odoo 19, navigue via Chrome,
        remplit les formulaires et prend un screenshot &agrave; chaque &eacute;tape. Il vous demande
        validation avant toute d&eacute;cision m&eacute;tier, mais ex&eacute;cute seul les actions m&eacute;caniques.
      </p>
      <p>
        La boucle est rapide : <strong>demande &rarr; question m&eacute;tier &rarr; ex&eacute;cution
        Chrome &rarr; screenshot de v&eacute;rification &rarr; ajustement</strong>.
        Ce qui prenait une journ&eacute;e de r&eacute;union + 3 jours de d&eacute;veloppement chez un
        int&eacute;grateur classique se fait en quelques heures.
      </p>

      <h3>Ce que Cowork g&egrave;re bien vs ce qui reste humain</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-4 text-left">L&apos;IA excelle</th>
              <th className="py-2 text-left">L&apos;humain reste indispensable</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 pr-4">Param&eacute;trage standard (champs, vues, menus)</td>
              <td className="py-2">Logique m&eacute;tier sp&eacute;cifique (&laquo;&nbsp;chez nous, on fait comme &ccedil;a&nbsp;&raquo;)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4">Lecture et application de la documentation</td>
              <td className="py-2">Validation des donn&eacute;es existantes (nettoyage, d&eacute;doublonnage)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4">Droits d&apos;acc&egrave;s et groupes utilisateurs</td>
              <td className="py-2">Choix strat&eacute;giques (quels modules activer, dans quel ordre)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4">Automatisations et r&egrave;gles r&eacute;p&eacute;titives</td>
              <td className="py-2">Formation des &eacute;quipes et conduite du changement</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4">G&eacute;n&eacute;ration de rapports et tableaux de bord</td>
              <td className="py-2">Arbitrage entre &laquo;&nbsp;standard Odoo&nbsp;&raquo; et &laquo;&nbsp;custom&nbsp;&raquo;</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        C&apos;est pourquoi nous ne vendons pas &laquo;&nbsp;l&apos;IA qui fait tout&nbsp;&raquo;. Nous combinons
        l&apos;IA pour acc&eacute;l&eacute;rer le travail technique, et l&apos;expertise humaine pour les
        d&eacute;cisions m&eacute;tier. C&apos;est cette combinaison qui permet le gain &times;10.
      </p>

      <AtelierCallout />

      {/* ===== H2 : Résultats ===== */}
      <h2>R&eacute;sultats concrets : avant / apr&egrave;s</h2>

      <h3>Temps gagn&eacute;, co&ucirc;t &eacute;conomis&eacute;</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-4 text-left">Crit&egrave;re</th>
              <th className="py-2 pr-4 text-left">Int&eacute;grateur classique</th>
              <th className="py-2 text-left">augmenter.PRO + Cowork</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2 pr-4 font-medium">Devis</td>
              <td className="py-2 pr-4">3 500 &euro; HT</td>
              <td className="py-2">Significativement inf&eacute;rieur</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-medium">Dur&eacute;e</td>
              <td className="py-2 pr-4">2&ndash;3 semaines (estimation)</td>
              <td className="py-2">4 jours</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-medium">Formation &eacute;quipe</td>
              <td className="py-2 pr-4">Non incluse (option payante)</td>
              <td className="py-2">Incluse dans la prestation</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-medium">Autonomie client</td>
              <td className="py-2 pr-4">Faible (d&eacute;pendance prestataire)</td>
              <td className="py-2">Forte (le client sait modifier lui-m&ecirc;me)</td>
            </tr>
            <tr className="border-b">
              <td className="py-2 pr-4 font-medium">Prochaine modification</td>
              <td className="py-2 pr-4">Rappeler l&apos;int&eacute;grateur (&euro;&euro;&euro;)</td>
              <td className="py-2">Le client le fait seul ou avec Cowork</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Ce que le client en retient</h3>
      <p>
        Au-del&agrave; des chiffres, le changement le plus important est{" "}
        <strong>le transfert de comp&eacute;tences</strong>. Apr&egrave;s notre intervention, l&apos;&eacute;quipe
        du client est capable de :
      </p>
      <ul>
        <li>Ajouter un champ personnalis&eacute; dans Studio sans aide ext&eacute;rieure</li>
        <li>Cr&eacute;er une automatisation simple (notification, changement de statut)</li>
        <li>Modifier une vue formulaire ou une vue liste</li>
        <li>Utiliser Claude Cowork pour les questions complexes en autonomie</li>
      </ul>
      <p>
        <strong>La vraie &eacute;conomie n&apos;est pas sur la premi&egrave;re prestation</strong> &mdash;
        c&apos;est sur toutes celles que le client <strong>n&apos;aura plus besoin de commander</strong>.
      </p>

      {/* ===== H2 : Par où commencer ===== */}
      <h2>Par o&ugrave; commencer si vous voulez essayer</h2>
      <p>
        Vous utilisez Odoo et vous voulez tester cette approche ? Voici une
        checklist actionnable :
      </p>
      <ol>
        <li>
          <strong>Identifiez votre mode Odoo</strong> (SaaS, SH ou Community) &mdash;
          cela d&eacute;termine ce que vous pouvez personnaliser sans code
        </li>
        <li>
          <strong>Installez Claude Desktop</strong> sur Windows ou Mac (plan Pro
          &agrave; 20 $/mois ou Max &agrave; 100 $/mois pour Computer Use)
        </li>
        <li>
          <strong>Cr&eacute;ez un Projet</strong> avec la documentation des modules
          Odoo que vous utilisez (t&eacute;l&eacute;chargeable sur odoo.com/documentation)
        </li>
        <li>
          <strong>Commencez par une t&acirc;che simple</strong> : ajouter un champ
          personnalis&eacute;, modifier une vue, cr&eacute;er une r&egrave;gle d&apos;automatisation
        </li>
        <li>
          <strong>Montez en complexit&eacute;</strong> : restructuration de donn&eacute;es,
          workflows multi-&eacute;tapes, rapports personnalis&eacute;s
        </li>
      </ol>
      <p>
        <strong>Limite importante</strong> : cette approche fonctionne tr&egrave;s bien pour
        le <strong>param&eacute;trage et la configuration</strong> (80 % des besoins). Pour le
        d&eacute;veloppement Python custom (modules sur mesure, int&eacute;grations API complexes),
        vous aurez toujours besoin d&apos;un d&eacute;veloppeur &mdash; mais m&ecirc;me l&agrave;, l&apos;IA acc&eacute;l&egrave;re
        consid&eacute;rablement le travail. Sur Odoo.sh, le vibe coding permet d&eacute;j&agrave; de
        g&eacute;n&eacute;rer des modules entiers en langage naturel.
      </p>
      <p>
        Et si vous voulez un accompagnement pour d&eacute;marrer, c&apos;est exactement ce
        que nous faisons. Notre{" "}
        <Link href="/contact">Audit 180&deg; offert</Link> vous
        permet d&apos;&eacute;valuer en 60 minutes ce que l&apos;IA peut apporter &agrave; votre utilisation
        d&apos;Odoo &mdash; et combien vous pouvez &eacute;conomiser par rapport &agrave; votre prestataire actuel.
        Pour cadrer l&apos;ensemble de votre maturit&eacute; IA, d&eacute;couvrez aussi notre{" "}
        <Link href="/audit-ia-pme">audit IA pour PME</Link>.
      </p>
      <p>
        Pour en savoir plus sur la connexion entre IA et outils m&eacute;tier, consultez
        aussi nos articles sur le{" "}
        <Link href="/blog/serveur-mcp-guide-pratique-pme">
          protocole MCP pour connecter l&apos;IA &agrave; vos outils
        </Link>{" "}
        et l&apos;
        <Link href="/blog/serveur-mcp-integration-crm-erp">
          int&eacute;gration d&apos;agents IA &agrave; votre CRM/ERP
        </Link>.
      </p>
      <p>
        Claude Cowork ne se limite pas au param&eacute;trage d&apos;Odoo. Pour un autre
        cas d&apos;usage concret &mdash; m&ecirc;me logique d&apos;op&eacute;rateur sous
        supervision humaine &mdash; voyez comment nous l&apos;avons transform&eacute; en{" "}
        <Link href="/blog/claude-cowork-community-manager">
          community manager pour g&eacute;rer des r&eacute;seaux sociaux
        </Link>.
      </p>
    </ArticleLayout>
  );
}
