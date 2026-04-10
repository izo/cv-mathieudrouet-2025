---
title: Architecture — CV Mathieu Drouet
type: adr
category: rewrite
date: 2026-04-10
status: active
author: strange
tags: [reverse-doc, architecture]
source: code-analysis
---

# Architecture — CV Mathieu Drouet

> Reconstitué par analyse du code source le 2026-04-10

## 1. Vue d'ensemble

### Diagramme d'architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      BUILD TIME                              │
│                                                              │
│  [cv.md] ──▶ [Content Collections] ──▶ [cvParser.ts]        │
│                                            │                 │
│                                            ▼                 │
│  [iconEngine.ts] ◀── parse icons ── [CVData]                │
│       │                                    │                 │
│       ▼                                    ▼                 │
│  [Iconify API] ◀── fetch SVG ── [ExperienceCard.astro]      │
│                                 [CVCard.astro]               │
│                                            │                 │
│  [BaseLayout.astro] ◀── compose ──────────┘                 │
│       │                                                      │
│       ▼                                                      │
│  [dist/] ── index.html, about/, _astro/, logos/, sw.js       │
└──────────────────────────┬──────────────────────────────────┘
                           │ deploy (Netlify)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      RUNTIME                                 │
│                                                              │
│  [Navigateur] ──HTTP──▶ [Netlify CDN] ──▶ [dist/]           │
│       │                                                      │
│       ├── [Service Worker] ◀── cache ── [assets statiques]  │
│       │                                                      │
│       ├── [iconify-icon] ──▶ [Iconify API] (icônes manquées)│
│       │                                                      │
│       └── [ContactModal] ──POST──▶ [Netlify Forms]          │
└─────────────────────────────────────────────────────────────┘
```

### Principes architecturaux détectés

1. **Content-as-Code** : Le contenu vit dans le repository, versionné avec le code
2. **Zero JavaScript par défaut** : Astro ne ship pas de JS sauf opt-in explicite (ContactModal, debug)
3. **Design Tokens centralisés** : Toute la palette est en CSS variables, les composants ne hardcodent pas de couleurs
4. **Thèmes via data attributes** : Le switch de thème se fait via `data-theme` sur `<html>`, pas par duplication de composants
5. **Build-time data fetching** : Les données (Markdown) et certaines ressources (SVG icônes) sont résolues au build
6. **Progressive Enhancement** : Le site fonctionne sans JS (contenu statique), le JS ajoute le formulaire et le debug
7. **Security by Default** : CSP activée en permanence (`securityConfig.enableCSP = true`), HSTS et headers de sécurité en production

## 2. Décisions d'architecture (ADR reconstitués)

### ADR-001 : Astro comme framework SSG

- **Statut** : Implémenté
- **Contexte** : Besoin d'un site CV performant avec contenu Markdown, sans interactivité côté client
- **Décision** : Utiliser Astro en mode SSG avec Content Collections
- **Conséquences** : Excellent score de performance (near-zero JS), Content Collections offrent du typage au contenu, mais pas de rendu dynamique côté client
- **Alternatives probables** : Next.js (trop lourd pour un site statique), Hugo (pas de TypeScript natif), Eleventy (moins de DX)

### ADR-002 : Contenu CV en Markdown avec parser custom

- **Statut** : Implémenté
- **Contexte** : Besoin de structurer le contenu du CV (sections, icônes, liens) tout en gardant l'édition simple
- **Décision** : Utiliser un fichier Markdown unique avec un parser TypeScript custom (`cvParser.ts`, ~550 lignes)
- **Conséquences** : Source de vérité unique, édition facile, mais le parser est complexe et fragile (dépend du format exact du Markdown)
- **Alternatives probables** : JSON/YAML structuré (plus rigide mais plus robuste), CMS headless (complexité d'infra), fichiers YAML par section

### ADR-003 : Iconify pour le système d'icônes

- **Statut** : Implémenté
- **Contexte** : Besoin d'icônes variées (Carbon, Tabler, etc.) sans embarquer de gros icon packs
- **Décision** : Utiliser Iconify via CDN (runtime) + API REST (build-time SVG fetch) + unplugin-icons (build-time components)
- **Conséquences** : Accès à 200K+ icônes sans impact bundle, mais dépendance au CDN au runtime et à l'API au build
- **Alternatives probables** : SVG inline (plus lourd, mais pas de dépendance réseau), icon fonts (obsolète)

### ADR-004 : Tailwind CSS v4 avec config legacy v3

- **Statut** : Implémenté (hybride)
- **Contexte** : Migration vers Tailwind v4 (PostCSS plugin) tout en conservant la configuration existante
- **Décision** : Utiliser `@tailwindcss/postcss` (v4) mais garder `tailwind.config.mjs` (format v3) + déclarer les tokens dans `global.css` via `@theme`
- **Conséquences** : Duplication partielle des tokens entre config et CSS, mais tout fonctionne
- **Alternatives probables** : Migration complète vers la config CSS-only de Tailwind v4

### ADR-005 : Design system thémable (Lumon/Atari)

- **Statut** : Implémenté
- **Contexte** : Permettre des variations visuelles du CV (corporate vs créatif)
- **Décision** : Deux thèmes définis via CSS variables sous `[data-theme]`, sélectionnables via le frontmatter
- **Conséquences** : Changement de thème sans toucher aux composants, mais le thème Atari est peu exposé (pas de sélecteur UI)
- **Alternatives probables** : Fichiers CSS séparés par thème, classes conditionnelles

### ADR-006 : Netlify pour l'hébergement et les formulaires

- **Statut** : Implémenté
- **Contexte** : Besoin d'hébergement statique avec formulaire de contact sans backend
- **Décision** : Utiliser Netlify (CDN, Forms, Headers, deploy automatique)
- **Conséquences** : Zéro backend à maintenir, formulaire de contact fonctionnel, mais couplage à Netlify (Forms ne marche qu'en production Netlify)
- **Alternatives probables** : Vercel (pas de Forms natif), Cloudflare Pages, GitHub Pages + Formspree

### ADR-007 : Détection de changements contenu par hash SHA-256

- **Statut** : Implémenté
- **Contexte** : Éviter des rebuilds inutiles quand le contenu n'a pas changé
- **Décision** : Script Node.js qui hash le contenu de `cv.md` et compare avec le cache
- **Conséquences** : Builds plus rapides quand le contenu est stable, mais le script s'exécute toujours (overhead minimal)
- **Alternatives probables** : Git diff detection, timestamp seul, aucune détection

## 3. Composants et responsabilités

### Diagramme de composants

```
┌─────────────────────────────────┐
│         BaseLayout.astro        │
│  - HTML structure               │
│  - Meta tags, SEO, CSP          │
│  - Google Fonts, Iconify CDN    │
│  - Footer conditionnel          │
│  - ContactModal                 │
└──────────┬──────────────────────┘
           │ slot
           ▼
┌─────────────────────────────────┐
│    Pages (index.astro, about)   │
│  - Orchestration des composants │
│  - Appel au parser/collections  │
└──────┬──────┬───────────────────┘
       │      │
       ▼      ▼
┌──────────┐  ┌──────────────────┐
│ CVGrid   │  │   CVSection      │
│ (3 cols) │  │ (titre+sous-titre│
└────┬─────┘  └────┬─────────────┘
     │             │
     ▼             ▼
┌──────────┐  ┌──────────────────┐
│ CVCard   │  │ ExperienceCard   │
│ (icône+  │  │ (logo+rôle+      │
│  titre+  │  │  période+items)  │
│  contenu)│  │                  │
└──────────┘  └──────────────────┘

┌─────────────────────────────────┐
│         Utilitaires             │
│                                 │
│  cvParser.ts ◀── iconEngine.ts  │
│       │              │          │
│       ▼              ▼          │
│  debug.ts      types/icons.ts   │
│                                 │
│  config/site.ts                 │
│  config/env.ts                  │
│  config/images.ts               │
└─────────────────────────────────┘
```

## 4. Flux de données critiques

### Flux 1 : Du Markdown au HTML

1. `astro build` démarre
2. `scripts/watch-content.js check` vérifie les changements (hash SHA-256)
3. `src/pages/index.astro` appelle `getEntry('cv', 'cv')` — Astro lit `cv.md`, extrait frontmatter
4. `parseCVContent(body, data)` parse le Markdown ligne par ligne
5. Pour chaque icône trouvée, `iconEngine.parseIcon()` résout le set et le nom
6. `replaceFlexibleIcons()` convertit les patterns `**carbon:xxx**` en HTML `<iconify-icon>`
7. Les données structurées (`CVData`) sont passées aux composants Astro
8. `ExperienceCard.astro` et `CVCard.astro` fetchent les SVG depuis Iconify API (build-time)
9. `BaseLayout.astro` wrappe le tout avec head, meta, footer
10. Astro génère `dist/index.html`

### Flux 2 : Theming

1. `cv.md` frontmatter définit `theme: "lumon"` (ou `"atari"`)
2. `index.astro` passe `theme` à `BaseLayout`
3. `BaseLayout` place `data-theme={theme}` sur `<html>`
4. Les CSS variables changent selon le sélecteur `[data-theme]`
5. Tous les composants utilisent les CSS variables — le rendu change automatiquement

## 5. Points de couplage

| Couplage | Composants | Risque |
|----------|------------|--------|
| **cvParser ↔ cv.md format** | `cvParser.ts` dépend d'un format Markdown très spécifique | Haut — un changement de format casse le parsing |
| **ExperienceCard ↔ Iconify API** | Fetch réseau pendant le build SSG | Moyen — timeout = build échoué |
| **ContactModal ↔ Netlify** | Formulaire POST vers `/` avec convention Netlify Forms | Moyen — ne fonctionne que sur Netlify |
| **CSS tokens ↔ 2 fichiers** | Tokens déclarés dans `global.css` ET `tailwind.config.mjs` | Bas — risque de divergence |
| **"current" detection ↔ année** | `period.includes('2025')` hardcodé | Bas — deviendra faux en 2026 |

## 6. Scalabilité et évolution

### Points forts

- **Ajout d'expériences/compétences** : Simple édition de `cv.md`
- **Nouveau thème** : Ajouter un bloc `[data-theme="nouveau"]` dans `global.css`
- **Nouveau icon set** : Ajouter dans le type `IconSet` + mappings
- **Nouvelles pages** : Créer un fichier dans `src/pages/` + une collection si nécessaire
- **i18n** : Possible via les Content Collections multi-locales d'Astro

### Points de friction

- **Parser custom** : Le `cvParser.ts` (550 lignes) est le goulot d'étranglement — tout changement de format Markdown nécessite une adaptation du parser
- **Pas de CMS** : L'édition du contenu nécessite un commit Git
- **PDF statique** : Le fichier PDF doit être régénéré manuellement après chaque mise à jour du CV
- **Pas de backend** : Impossible d'ajouter des fonctionnalités dynamiques (analytics custom, A/B testing) sans service tiers
- **Dépendance CDN** : Les icônes runtime dépendent d'Iconify CDN — une panne affecte l'affichage
