# Commande : Audit de sécurité

Tu es un expert en sécurité web. Tu vas réaliser un audit de sécurité complet du site **augmenter.pro** (Next.js 16 + React 19 + Tailwind).

## Contexte projet

**À lire en premier** : [`.claude/templates/shared/project-context.md`](.claude/templates/shared/project-context.md) — stack, patterns (server-default, mailto:, JSON-LD via `dangerouslySetInnerHTML`), structure, conventions.

Spécifique à `/security-audit` :
- **Surface d'attaque réduite** : pas d'auth, pas de DB, pas de route API active, formulaire `mailto:` côté client → focus headers HTTP, supply chain npm, CSP, XSS potentiel via `dangerouslySetInnerHTML` (légitime mais à vérifier)
- **RGPD** : pas de cookies analytiques sans consentement, politique de confidentialité à jour
- **Fichier formulaire à auditer** : `src/app/contact/contact-form.tsx` (client component, `mailto:`)
- **Headers** : configurés dans `next.config.ts` → `async headers()` (déjà en place — vérifier complétude)

## Phase 1 — Analyse des dépendances

1. **Audit npm** : Lance `npm audit` et analyse les résultats
2. **Dépendances obsolètes** : Vérifie les versions des packages critiques dans `package.json`
   - Next.js 16, React 19, framer-motion, lucide-react, @radix-ui/*
3. **Dépendances suspectes** : Vérifie que toutes les dépendances sont légitimes et maintenues
4. **Supply chain** : Lance `npm ls --depth=0` pour vérifier les versions effectivement installées

## Phase 2 — Analyse du code source

### 2.1 Formulaire de contact (surface d'attaque principale)

Le formulaire est dans `src/app/contact/contact-form.tsx` (client component `"use client"`).

**Architecture actuelle** :
- Soumission via `handleSubmit` qui construit un lien `mailto:` avec `encodeURIComponent`
- Pas d'envoi côté serveur — le mail s'ouvre dans le client email de l'utilisateur
- Champs : name (required), email (required, type=email), company (optional), message (required)

**Points à vérifier** :
- [ ] Validation HTML5 côté client (required, type=email) — présente mais suffisante ?
- [ ] Protection XSS dans la construction du mailto: (encodeURIComponent utilisé)
- [ ] Pas de honeypot ou anti-spam (risque faible car pas d'envoi serveur)
- [ ] Pas de validation de longueur côté client (maxlength manquant ?)
- [ ] Le formulaire est-il protégé contre le CSRF ? (non applicable sans route API)

### 2.2 Routes API

Vérifie le dossier `src/app/api/` :
- [ ] Existe-t-il des routes API actives ? (normalement non)
- [ ] Si des routes existent, auditer : validation des entrées, rate limiting, CSRF, headers
- [ ] Si aucune route, confirmer que le formulaire contact est bien client-only (mailto:)

### 2.3 Utilisation de `dangerouslySetInnerHTML`

Le projet utilise `dangerouslySetInnerHTML` pour injecter du JSON-LD dans plusieurs fichiers. C'est **légitime** si et seulement si le contenu est statique/hardcodé.

**Fichiers à auditer** :
- `src/app/layout.tsx` — JSON-LD Organization/LocalBusiness/WebSite
- `src/components/layout/article-layout.tsx` — JSON-LD Article (avec slug dynamique)
- `src/app/prestations/page.tsx` — JSON-LD Service/OfferCatalog
- `src/app/approche/page.tsx` — JSON-LD FAQPage
- `src/components/sections/testimonials.tsx` — JSON-LD AggregateRating/Review

**Pour chaque usage, vérifie** :
- [ ] Le contenu injecté est-il entièrement statique (hardcodé) ou dérivé de données inline ?
- [ ] Aucune entrée utilisateur n'est insérée dans le JSON-LD ?
- [ ] `JSON.stringify()` est utilisé (empêche l'injection de balises `</script>`) ?
- [ ] Le `slug` prop dans article-layout.tsx : est-il passé en dur depuis chaque page ? (oui, vérifié)

### 2.4 Composants client

Lis tous les composants avec `"use client"` et vérifie :
- [ ] Pas de `eval()` ou `Function()` dynamique
- [ ] Pas d'insertion de HTML non sanitisé (hormis JSON-LD légitime)
- [ ] Pas de secrets ou clés API exposés côté client
- [ ] Pas de localStorage/sessionStorage contenant des données sensibles
- [ ] Pas de console.log exposant des données sensibles en prod

**Composants client connus** :
- `src/components/sections/hero.tsx`
- `src/components/sections/services.tsx`
- `src/components/sections/approach.tsx`
- `src/components/sections/pricing.tsx`
- `src/components/sections/ideas.tsx`
- `src/components/sections/testimonials.tsx`
- `src/data/resources.ts` (catalog : listes `/blog` + `/idees` + hub)
- `src/components/sections/cta.tsx`
- `src/components/sections/trust.tsx`
- `src/components/layout/header.tsx`
- `src/app/contact/contact-form.tsx`

### 2.5 Configuration Next.js

Lis et audite `next.config.ts` :
- [ ] `output: "standalone"` — correct pour Hostinger Node.js
- [ ] Headers de sécurité configurés dans la fonction `headers()` ? (probablement absent)
- [ ] Pas de redirections ouvertes
- [ ] Pas d'exposition de variables d'environnement via `env` ou `publicRuntimeConfig`
- [ ] Source maps désactivées en production ? (`productionBrowserSourceMaps: false`)

## Phase 3 — Headers de sécurité HTTP

### 3.1 Headers recommandés

Vérifie si `next.config.ts` contient une section `headers()`. Si absente, c'est un **problème à corriger**.

Headers à configurer :
```typescript
// next.config.ts
async headers() {
  return [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-XSS-Protection", value: "0" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        {
          key: "Content-Security-Policy",
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none'",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
  ];
},
```

**Notes importantes** :
- `'unsafe-inline'` est nécessaire pour Tailwind CSS et les styles inline Next.js
- `'unsafe-eval'` peut être nécessaire pour framer-motion — vérifier si ça bloque
- Le JSON-LD via `dangerouslySetInnerHTML` nécessite `'unsafe-inline'` pour script-src
- CSP doit être testé en dev avant déploiement pour éviter de casser le site

### 3.2 Fichiers sensibles

Vérifie qu'il n'y a pas d'exposition publique de :
- [ ] `.env`, `.env.local`, `.env.production` — ne doivent PAS exister dans le repo git
- [ ] `.git/` — accessible via HTTP ? (normalement bloqué par Hostinger/Next.js)
- [ ] `CLAUDE.md`, `.claude/` — présents dans le repo mais pas servis par le serveur web
- [ ] Source maps — `productionBrowserSourceMaps` doit être `false` (défaut Next.js)
- [ ] `package-lock.json` — servi publiquement ? (normalement non avec standalone)

### 3.3 Fichiers publics

Le dossier `public/` est servi directement. Vérifie :
- [ ] `robots.txt` — ne bloque pas de chemins sensibles par inadvertance
- [ ] `llms.txt` — ne contient pas d'informations sensibles (OK, c'est voulu)
- [ ] `sitemap.xml` — ne référence pas de pages privées
- [ ] SVG par défaut (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) — fichiers résiduels de Create Next App, pas de risque mais à nettoyer

## Phase 4 — OWASP Top 10 (adapté site vitrine)

Pour chaque item OWASP applicable, analyse et note :

| # | Vulnérabilité | Applicabilité | Statut attendu | Détail |
|---|---------------|---------------|----------------|--------|
| A01 | Broken Access Control | FAIBLE — pas d'auth ni de rôles | N/A | Pas de zone protégée |
| A02 | Cryptographic Failures | FAIBLE — pas de stockage de données | À vérifier | HTTPS obligatoire (Hostinger SSL) |
| A03 | Injection | MOYEN — formulaire mailto: | À vérifier | encodeURIComponent sur les inputs |
| A04 | Insecure Design | MOYEN — architecture globale | À vérifier | Pattern server/client, données inline |
| A05 | Security Misconfiguration | HAUT — headers manquants | À corriger | next.config.ts sans headers() |
| A06 | Vulnerable Components | MOYEN — dépendances npm | `npm audit` | Vérifier les CVE connues |
| A07 | Auth Failures | N/A — pas d'auth | N/A | — |
| A08 | Data Integrity Failures | FAIBLE — pas de serialization | À vérifier | JSON-LD via JSON.stringify |
| A09 | Logging & Monitoring | FAIBLE — site vitrine | À vérifier | Pas de logging en place |
| A10 | SSRF | N/A — pas de requêtes serveur | N/A | — |

## Phase 5 — Conformité RGPD (spécifique France)

Puisque le site cible des PME françaises et collecte des coordonnées via le formulaire :

### 5.1 Obligations légales

- [ ] **Mentions légales** (`/mentions-legales`) : page existante, vérifier complétude
  - Identité de l'éditeur (nom, adresse, SIRET)
  - Hébergeur (nom, adresse — Hostinger)
  - Contact (email, téléphone)
- [ ] **Politique de confidentialité** : section dédiée ou page séparée ?
  - Finalité du traitement des données
  - Base légale (intérêt légitime ou consentement)
  - Durée de conservation
  - Droits des personnes (accès, rectification, suppression, portabilité)
  - Contact DPO ou responsable

### 5.2 Formulaire de contact

- [ ] Mention RGPD sous le formulaire (ex: "Vos données sont utilisées uniquement pour répondre à votre demande")
- [ ] Case à cocher consentement ? (recommandé même si base légale = intérêt légitime)
- [ ] Le mailto: ne stocke pas de données côté serveur — **point positif** pour la RGPD
- [ ] Pas de tracking analytics (Google Analytics, etc.) — **point positif** si confirmé
- [ ] Pas de cookies tiers — pas besoin de bannière cookies si aucun cookie n'est déposé

### 5.3 Liens externes

- [ ] WhatsApp (`wa.me`) : ouverture dans un nouvel onglet, `rel="noopener noreferrer"` ✓
- [ ] LinkedIn : `rel="noopener noreferrer"` ✓
- [ ] X/Twitter : `rel="noopener noreferrer"` ✓

## Phase 6 — Rapport

Génère un rapport structuré :

```
## Score de sécurité global : X/100

## Contexte
- Type de site : vitrine (pas d'auth, pas de DB, pas d'API)
- Surface d'attaque : formulaire mailto: client-side, fichiers publics
- Hosting : Hostinger Node.js (standalone)

## Vulnérabilités critiques (à corriger immédiatement)
🔴 ...

## Vulnérabilités moyennes
🟠 ...

## Améliorations recommandées
🟡 ...

## Points conformes
🟢 ...

## OWASP Top 10
| # | Vulnérabilité | Statut | Commentaire |
|---|---------------|--------|-------------|
| A01-A10 | ... | ✅/⚠️/❌ | ... |

## RGPD
| Exigence | Statut | Action requise |
|----------|--------|----------------|
| Mentions légales | ... | ... |
| Politique confidentialité | ... | ... |
| Consentement formulaire | ... | ... |
| Cookies | ... | ... |
| Droits des personnes | ... | ... |

## JSON-LD / dangerouslySetInnerHTML
| Fichier | Contenu injecté | Risque | Statut |
|---------|-----------------|--------|--------|
| layout.tsx | Organization/LocalBusiness/WebSite | Statique | ✅ |
| article-layout.tsx | Article (slug dynamique) | Slug hardcodé par page | ✅ |
| prestations/page.tsx | Service/OfferCatalog | Statique | ✅ |
| approche/page.tsx | FAQPage | Statique | ✅ |
| testimonials.tsx | AggregateRating/Review | Statique | ✅ |

## Plan de remédiation (par priorité)
1. [CRITIQUE] Headers de sécurité dans next.config.ts
2. [MOYEN] ...
3. [FAIBLE] ...
```

### Corrections automatiques

Si l'utilisateur le demande, implémente directement :
- Ajout des headers de sécurité dans `next.config.ts` (CSP, HSTS, X-Frame-Options, etc.)
- Ajout de `maxLength` sur les champs du formulaire contact
- Ajout d'une mention RGPD sous le formulaire
- Suppression des fichiers SVG résiduels de Create Next App dans `public/`
- Désactivation des source maps en production si activées
- Ajout d'une section politique de confidentialité dans les mentions légales
