# Plan de hardening — Accueil 2 hero augmenté

> Décision portée par [ADR 0005](../decisions/0005-accueil-2-hero-augmente.md). Lire d'abord.
> Source design : [docs/ClaudeDesign_handoff/design_handoff_hero_augmente/](../ClaudeDesign_handoff/design_handoff_hero_augmente/).

Date : 2026-06-05  
Route de démo : `/accueil-2`  
Statut : démo noindex à durcir avant toute bascule vers `/`

## Objectif

Transformer `/accueil-2` d'une page de démonstration fidèle au handoff en une variante suffisamment robuste pour être évaluée sérieusement : rendu mobile/desktop stable, performance acceptable, cleanup des animations, analytics propres, accessibilité correcte et chemin clair vers une éventuelle future home.

## État actuel

### Déjà fait

- Route isolée [src/app/accueil-2/page.tsx](../../src/app/accueil-2/page.tsx), noindex.
- Layout plein écran [src/app/accueil-2/layout.tsx](../../src/app/accueil-2/layout.tsx) qui masque Header/Footer globaux.
- Hero client [src/app/accueil-2/hero-augmente.tsx](../../src/app/accueil-2/hero-augmente.tsx).
- Scène montée depuis le générateur original `scene-epanoui-or.js`.
- Modules avancés chargés seulement sur desktop à pointeur fin, après le premier rendu.
- Mobile : dessin visible, sans modules interactifs lourds.
- Tracking minimal : `home_demo_view`, `home_chapter_view`, `home_cta_click`.
- `npm run lint -- "src/app/accueil-2"` et `npm run build` passent au moment de la rédaction.

### Dette volontaire

- Scripts vanilla chargés pour effet de bord (`window.EPANOUI_OR`, `window.LIQUID_CLOUDS`, etc.).
- Pas de cleanup/destroy complet des listeners et `requestAnimationFrame` des modules vanilla.
- Gros bloc `SCENE_RUNTIME_CSS` encore dans le TSX.
- Pas de baseline Lighthouse/Web Vitals.
- Pas de validation visuelle systématique par viewport.

## Principes de travail

- Ne pas modifier `/` avant validation.
- Ne pas modifier `/approche`.
- Ne pas introduire de middleware A/B tant que la variante n'est pas prête.
- Ne pas réécrire la géométrie de la scène à l'œil.
- Préserver les textes validés du handoff.
- Optimiser d'abord sans sacrifier la fidélité.
- Mobile doit afficher le dessin, mais rester léger.

## Sous-agents à utiliser

### Audit code/perf

Type recommandé : `code-reviewer` ou `code-explorer`.

Mission :
- Lire [src/app/accueil-2/](../../src/app/accueil-2/) et les scripts du handoff.
- Identifier fuites mémoire, listeners non nettoyés, `requestAnimationFrame` persistants, imports coûteux et risques React/Next.
- Retour attendu : findings classés par sévérité + correctifs précis.

### Audit visuel/mobile

Type recommandé : `browser-use`.

Mission :
- Tester `/accueil-2` sur desktop, mobile portrait, mobile paysage et tablette.
- Capturer les problèmes de cadrage, CTA, texte, overflow, lisibilité des labels SVG.
- Retour attendu : captures ou description par viewport + priorités de correction.

### Audit qualité après refactor

Type recommandé : `code-reviewer`, éventuellement `thermo-nuclear-code-quality-review` après les gros refactors.

Mission :
- Vérifier que le hardening n'a pas transformé la page en spaghetti.
- Contrôler les fichiers trop longs, responsabilités mélangées, duplication, abstractions manquantes.

## Découpage en lots

### Lot 1 — Stabilisation visuelle responsive

**Objectif** : figer une composition lisible sur desktop, tablette et mobile.

Actions :

1. Définir les viewports de référence :
   - mobile compact : 360×740 ;
   - mobile standard : 390×844 ;
   - mobile large : 430×932 ;
   - tablette portrait : 768×1024 ;
   - desktop : 1280×720 ;
   - desktop large : 1440×900.
2. Ajuster uniquement l'enveloppe CSS (`sceneWrap`, grille, CTA) sans toucher à la projection.
3. Décider du comportement du CTA flottant sur très petit écran.
4. Vérifier que le dessin reste visible dans tous les chapitres.
5. Documenter les captures de référence dans le résumé de PR ou un dossier de travail si nécessaire.

Critères de done :

- Aucun label critique du SVG ne rend la page illisible.
- Le CTA principal reste accessible.
- Le CTA flottant ne masque pas le sujet principal sur mobile.
- Pas de scroll parasite sur la page plein écran.

### Lot 2 — Extraction CSS runtime

**Objectif** : réduire le JS client et clarifier les responsabilités.

Actions :

1. Sortir `SCENE_RUNTIME_CSS` de [hero-augmente.tsx](../../src/app/accueil-2/hero-augmente.tsx).
2. Le déplacer vers [hero-augmente.module.css](../../src/app/accueil-2/hero-augmente.module.css) ou vers un fichier CSS dédié importé par la page.
3. Garder les sélecteurs sous un namespace type `.heroAugmenteScene`.
4. Vérifier que les styles générés par `scene.css` restent injectés uniquement si nécessaires.
5. Supprimer les styles morts hérités de la première scène React approximative.

Critères de done :

- TSX plus court et centré sur la logique.
- Rendu identique avant/après.
- Lint/build verts.

### Lot 3 — Cleanup des modules vanilla

**Objectif** : éviter les fuites mémoire et préparer une future prod.

Actions :

1. Auditer chaque module :
   - `cloud-lava.js`
   - `verlet-cables.js`
   - `desk-interactive.js`
   - `plants-interactive.js`
2. Identifier :
   - listeners `window` / `document` / `svg` ;
   - boucles `requestAnimationFrame` ;
   - timers ;
   - flags `svg.__...`.
3. Ajouter un contrat :
   - soit `mount(svg) => cleanup`,
   - soit `destroy(svg)`.
4. Adapter `OriginalGeneratedScene` pour appeler le cleanup au unmount.
5. Vérifier navigation entrée/sortie de `/accueil-2` plusieurs fois en dev.

Critères de done :

- Aucun listener global non nettoyé ajouté par la page.
- Aucun rAF actif après unmount.
- La scène continue à fonctionner après retour sur la route.

### Lot 4 — Chargement et performance

**Objectif** : faire de la fidélité sans pénaliser mobile.

Actions :

1. Vérifier que mobile tactile ne charge pas les modules avancés.
2. Vérifier que reduced-motion ne charge pas les modules avancés.
3. Garder le générateur de scène chargé côté client, mais mesurer son coût.
4. Évaluer si une scène statique inline ou pré-générée serait utile pour mobile.
5. Lancer Lighthouse ou équivalent sur `/accueil-2`.
6. Noter LCP, INP, CLS, poids JS, temps de scripting.

Critères de done :

- Mobile : modules avancés absents.
- Desktop : interactions chargées après rendu initial.
- Pas de CLS visible au montage de la scène.
- Mesures consignées dans la PR ou dans ce plan si nécessaire.

### Lot 5 — Analytics propre

**Objectif** : mesurer sans bruit.

Actions :

1. Limiter `home_chapter_view` à une émission par chapitre et par session de page.
2. Conserver `home_demo_view` une seule fois au mount.
3. Conserver `home_cta_click` avec `cta_location`.
4. Décider si les events restent actifs en production ou seulement en preview.
5. Documenter les noms d'events dans l'ADR ou une section analytics dédiée.

Critères de done :

- Pas de spam d'events pendant l'autoplay.
- Paramètre `variant` cohérent partout.
- Les CTA principaux sont trackés.

### Lot 6 — Accessibilité et UX clavier

**Objectif** : éviter une page spectaculaire mais fragile.

Actions :

1. Vérifier Tab order.
2. Vérifier navigation par flèches.
3. Vérifier bouton `B` au clavier.
4. Vérifier reduced-motion.
5. Vérifier labels accessibles du SVG et des boutons de chapitre.
6. Évaluer si la capture de la molette doit être désactivée sur certains profils.

Critères de done :

- Page utilisable sans souris.
- Pas de piège clavier.
- Reduced-motion rend une version calme.

### Lot 7 — Port TypeScript progressif

**Objectif** : sortir progressivement du legacy sans perdre la fidélité.

Actions :

1. Créer un dossier `src/app/accueil-2/scene/`.
2. Porter `scene-epanoui-or.js` en module TS pur exportant `{ defs, inner, viewBox, css }`.
3. Porter ensuite un module à la fois :
   - plantes ;
   - desk ;
   - clouds ;
   - câbles Verlet.
4. Ajouter des types pour les APIs de montage.
5. Retirer les `@ts-expect-error` au fil des ports.

Critères de done :

- Aucun changement visuel non voulu.
- Chaque module porté garde ou améliore son cleanup.
- Le code devient testable et typé.

### Lot 8 — Préparation d'une éventuelle bascule vers `/`

**Objectif** : préparer la décision sans l'anticiper.

Actions :

1. Décider si `/accueil-2` devient `/` ou si le composant est intégré ailleurs.
2. Mettre à jour JSON-LD uniquement au moment de la bascule.
3. Mettre à jour `sitemap.xml`, `news-sitemap.xml` si pertinent, `llms.txt`.
4. Revoir la relation avec `/approche`.
5. Prévoir monitoring Search Console après mise en prod.

Critères de done :

- Décision formalisée.
- SEO non dégradé par une démo noindex devenue indexable trop tôt.

## Ordre recommandé

1. Lot 1 — Stabilisation visuelle responsive.
2. Lot 2 — Extraction CSS runtime.
3. Lot 3 — Cleanup des modules vanilla.
4. Lot 4 — Chargement et performance.
5. Lot 5 — Analytics propre.
6. Lot 6 — Accessibilité.
7. Lot 7 — Port TS progressif.
8. Lot 8 — Préparation bascule.

## Validation systématique

Commandes :

```bash
npm run lint -- "src/app/accueil-2"
npm run build
```

Contrôles manuels :

- `/accueil-2` desktop.
- `/accueil-2` mobile portrait.
- `/accueil-2` mobile paysage.
- `prefers-reduced-motion`.
- Profil tactile : vérifier que `window.LIQUID_CLOUDS` n'est pas chargé.
- Profil desktop : vérifier que les interactions se montent après idle.

## Risques et mitigations

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Perte de fidélité en port TS | Moyenne | Élevé | Porter module par module, comparaison visuelle à chaque étape |
| Fuites mémoire des scripts vanilla | Élevée | Moyen | Lot cleanup avant toute prod |
| Mobile trop lourd | Moyenne | Élevé | Scène statique mobile, modules avancés desktop only |
| Page trop différente de `/approche` ou trop concurrente | Moyenne | Moyen | Garder `/accueil-2` noindex et utiliser la démo pour arbitrer |
| Events analytics trop bruyants | Moyenne | Faible | Dédupliquer les chapter views |

## Questions ouvertes

- Le CTA flottant reste-t-il sur mobile ou devient-il un CTA inline ?
- Le bouton “Tapez B” est-il pertinent sur mobile, ou faut-il un libellé alternatif ?
- Le dessin mobile doit-il montrer la scène complète ou un crop volontaire par chapitre ?
- Veut-on une version mobile avec autoplay désactivé ?
- À quel niveau de Lighthouse mobile considère-t-on la variante acceptable ?

## Mémo pour les prochaines sessions

- Ne pas recréer la scène à la main : utiliser ou porter la projection originale.
- Ne pas indexer `/accueil-2` tant que la bascule n'est pas décidée.
- Ne pas ajouter de middleware A/B avant validation visuelle et perf.
- Documenter chaque changement qui affecte `/`, `sitemap.xml`, `llms.txt` ou les JSON-LD.
