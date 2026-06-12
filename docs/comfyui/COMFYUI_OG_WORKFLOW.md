# Workflows ComfyUI — OG image augmenter.pro (Flux 2 Klein 9B)

Deux passes optimisées pour générer l'image Open Graph `1200×630` avec typo française lisible.

## Fichiers

| Fichier | Rôle |
|---------|------|
| [`flux2-klein9b-og-pass1-scene.json`](flux2-klein9b-og-pass1-scene.json) | Scène diorama sans texte (panneau droit vide) |
| [`flux2-klein9b-og-pass2-texte.json`](flux2-klein9b-og-pass2-texte.json) | Inpaint typo FR sur le panneau droit uniquement |

## Différences vs workflow NSFW d'origine

| Avant (ton JSON) | Après (OG) |
|------------------|------------|
| LoRA NSFW active | LoRA retirée |
| DPRandomGenerator + wildcards | Prompt fixe Klein (prose) |
| 832×1216 portrait | **1216×640** landscape OG |
| 30 steps | **22** (p1) / **18** (p2) |
| Prompt 400+ mots + tags 8K | **~110 mots** prose |
| `no text` en fin de prompt | Passe 2 dédiée au texte |
| Seed randomize | Seed **fixe** (reproductible) |

## Ressources requises

### Modèles (déjà dans ton setup)

```
ComfyUI/models/unet/          flux-2-klein-9b-Q4_K_M.gguf
ComfyUI/models/clip/          qwen_3_8b_fp4mixed.safetensors (type flux2)
ComfyUI/models/vae/           flux2-vae.safetensors
```

### Custom nodes

| Node | Rôle | Installation |
|------|------|--------------|
| **ComfyUI-GGUF** | `UnetLoaderGGUF` | Déjà présent |
| **ComfyUI-MultiGPU** | `*MultiGPU` loaders + choix `cuda:0` / `cuda:1` | ComfyUI Manager → chercher `ComfyUI-MultiGPU` |

```bash
# Manuel si besoin
cd ComfyUI/custom_nodes
git clone https://github.com/pollockjj/ComfyUI-MultiGPU
# Redémarrer ComfyUI
```

### À télécharger seulement si manquant

| Ressource | Source |
|-----------|--------|
| ComfyUI ≥ 0.3.18 | [github.com/comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI) — nodes `SplitSigmas`, `SetLatentNoiseMask` |
| Workflow officiel Image Edit (fallback) | [docs.comfy.org/tutorials/flux/flux-2-klein](https://docs.comfy.org/tutorials/flux/flux-2-klein) → section **9B Image Edit** |

---

## Multi-GPU — Qwen et Flux sur deux cartes

Les workflows utilisent les nodes **ComfyUI-MultiGPU** avec un dropdown `device` par composant.

### Répartition par défaut (2× NVIDIA)

| Composant | Node | GPU | Rôle |
|-----------|------|-----|------|
| **Flux UNet** (GGUF) | `UnetLoaderGGUFMultiGPU` | `cuda:0` | Diffusion / sampling (compute principal) |
| **Qwen3 8B** (CLIP) | `CLIPLoaderMultiGPU` | `cuda:1` | Encode texte uniquement (~8 Go VRAM) |
| **VAE** | `VAELoaderMultiGPU` | `cuda:0` | Encode/decode latent (avec UNet) |

### Pourquoi cette répartition ?

- Klein **décharge Qwen avant la diffusion** → l'encodeur peut vivre sur GPU1 pendant que GPU0 garde la VRAM pour les steps.
- Qwen3 8B fp4mixed est le plus gros consommateur hors UNet — le isoler évite les OOM sur la carte de compute.
- Le VAE est léger (~300 Mo) → le garder sur `cuda:0` évite les transferts cross-GPU à chaque `VAEDecode`.

### Changer l'assignation

Dans chaque loader MultiGPU, modifier le widget **`device`** :

```
Exemples :
  cuda:0  → GPU principal (souvent la 3090/4090)
  cuda:1  → GPU secondaire
  cpu     → fallback si une seule carte (plus lent)
```

Si ta carte **la plus grosse** est `cuda:1` dans `nvidia-smi`, inverse :

- UNet → `cuda:1`
- VAE → `cuda:1`
- Qwen → `cuda:0`

### Vérifier que ça marche

```bash
# Terminal 1 : surveiller VRAM
nvidia-smi -l 1

# Terminal 2 : Queue Prompt dans ComfyUI
```

**Attendu pendant un run :**

1. **Pic GPU1** au `CLIPTextEncode` (Qwen charge + encode)
2. **Pic GPU0** pendant `SamplerCustomAdvanced` (Flux diffuse)
3. Les deux modèles restent en mémoire — pas de swap CPU entre passes 1 et 2

### Si un node `*MultiGPU` est introuvable

→ `ComfyUI-MultiGPU` non installé ou ComfyUI pas redémarré.

Fallback temporaire : remplacer par les loaders standards (`UnetLoaderGGUF`, `CLIPLoader`, `VAELoader`) — tout ira sur `cuda:0` par défaut.

### Option avancée — DisTorch2 (3+ devices ou VRAM serrée)

Si une carte seule ne suffit pas, remplacer les loaders par les variantes **DisTorch2** :

- `UnetLoaderGGUFDisTorch2MultiGPU` — slider `virtual_vram_gb` pour offload partiel UNet vers CPU/GPU2
- `CLIPLoaderDisTorch2MultiGPU` — idem pour Qwen

Doc : [github.com/pollockjj/ComfyUI-MultiGPU](https://github.com/pollockjj/ComfyUI-MultiGPU) section DisTorch 2.0.

## Procédure

### Passe 1 — Scène

1. Importer `flux2-klein9b-og-pass1-scene.json` dans ComfyUI
2. Queue Prompt → générer 3–5 variantes (changer le seed entre chaque)
3. Choisir la meilleure composition (panneau droit bien vide)
4. **Noter le seed** de la variante retenue

### Passe 2 — Typo française

1. Copier l'image retenue dans `ComfyUI/input/`
2. Importer `flux2-klein9b-og-pass2-texte.json`
3. `LoadImage` → sélectionner `og_pass1_scene_00001.png`
4. **MaskEditor** : clic droit sur l'aperçu → peindre en blanc la zone droite (~45 %)
5. Coller le **même seed** que passe 1 dans `RandomNoise`
6. Queue Prompt → vérifier l'orthographe

### Post-production

1. Resize/crop → **1200×630** exact (ratio OG)
2. Export **WebP < 300 Ko**
3. Placer dans `public/images/general/og-augmenter-pro.webp`
4. Purger cache : [X Card Validator](https://cards-dev.twitter.com/validator), [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

**Image de référence déployée (2026-06-12)** : variante Gemini/Flux gagnante → `og-augmenter-pro.webp` (76 Ko, 1200×630).

---

## Tailles par plateforme (recherche web 2026)

Taille **universelle recommandée** : **1200 × 630 px** (ratio **1.91:1**).

| Plateforme | Taille recommandée | Ratio | Poids max | Notes |
|------------|-------------------|-------|-----------|-------|
| **Facebook / LinkedIn / Slack / Discord** | 1200 × 630 | 1.91:1 | 5–8 Mo | Standard `og:image` |
| **WhatsApp** | 1200 × 630 | 1.91:1 | **~300 Ko soft cap** | Au-delà : preview parfois ignorée ; viser **< 300 Ko** |
| **X / Twitter** (`summary_large_image`) | 1200 × 628–630 | 1.91:1 | 5 Mo | Spec stricte 1200×**628** ; 1200×630 accepté (crop léger haut/bas). Min **300×157** |
| **iMessage** | 1200 × 630 | 1.91:1 | — | Crop carré possible sur lock screen → zone sûre centrale 66 % |
| **Telegram** | 1200 × 630 | 1.91:1 | 5 Mo | Preview généreuse via `og:image` |

### Zone sûre (toutes plateformes)

Garder logo + texte critiques dans le **centre 66 %** de l'image — WhatsApp et iMessage recadrent parfois en carré.

### Notre fichier actuel

| Propriété | Valeur | Verdict |
|-----------|--------|---------|
| Dimensions | 1200 × 630 | OK universel |
| Poids | ~76 Ko WebP | OK WhatsApp (< 300 Ko) |
| Format | WebP | OK X, Facebook, LinkedIn |
| Meta | `og:image` + `twitter:image` dans `layout.tsx` | OK |

## Réglages fins

### Passe 1 (scène)

| Paramètre | Valeur | Si problème |
|-----------|--------|-------------|
| CFG | 1.2 | Scène trop libre → 1.5 |
| Steps | 22 | VRAM serrée → 20 |
| Seed | fixe | Varier pour explorer |

### Passe 2 (texte)

| Paramètre | Valeur | Si problème |
|-----------|--------|-------------|
| CFG | 4.0 | Texte ignoré → 4.5 ; artefacts → 3.5 |
| SplitSigmas step | 10/18 | Typo floue → **8** ; scène bouge → **12** |
| Masque | droite 45 % | Typo déborde → élargir masque |

## Fallback typo (si Klein rate l'orthographe)

La passe 1 laisse le panneau droit vide exprès. Si 3 passes 2 échouent :

1. Exporter la passe 1
2. Overlay Figma/Canva (Inter Bold, violet `#6B4FBB`, amber `#E8A838`)
3. Texte exact :

```
augmenter.PRO
Référence Claude Code & Odoo PME
Consultant IA · Automatisation · Audit IT
Visio France · Présentiel 78/95
[Sans engagement]
```

## Intégration site

Le metadata OG est déjà configuré dans `src/app/layout.tsx` :

```ts
url: "/images/general/og-augmenter-pro.webp"
```

Il suffit d'ajouter le fichier — actuellement **404 en prod**.
