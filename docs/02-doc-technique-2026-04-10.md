---
title: Documentation technique — CV Mathieu Drouet
type: guide
category: rewrite
date: 2026-04-10
status: active
author: strange
tags: [reverse-doc, doc-technique]
source: code-analysis
---

# Documentation technique — CV Mathieu Drouet

> Reconstitué par analyse du code source le 2026-04-10

## 1. Architecture

### Vue d'ensemble

Site statique généré avec Astro (SSG). Le contenu du CV est stocké en Markdown, parsé au build en structures TypeScript, puis injecté dans des composants Astro. Le résultat est un ensemble de fichiers HTML/CSS/JS servis par Netlify.

### Structure du projet

```
cv-mathieudrouet-2025/
├── src/
│   ├── components/
│   │   ├── ExperienceCard.astro      # Carte expérience/compétence
│   │   ├── ContactModal.astro        # Modal contact (Netlify Forms)
│   │   └── cv/
│   │       ├── CVCard.astro          # Carte générique avec icône
│   │       ├── CVGrid.astro          # Grille 3 colonnes responsive
│   │       └── CVSection.astro       # Section avec titre et sous-titre
│   ├── config/
│   │   ├── site.ts                   # Configuration site, SEO, social links
│   │   ├── env.ts                    # Config par environnement (dev/prod/test)
│   │   └── images.ts                 # Mapping logos entreprises
│   ├── content/
│   │   ├── config.ts                 # Schémas Astro Content Collections
│   │   ├── cv/
│   │   │   └── cv.md                 # Contenu du CV (source de vérité)
│   │   └── about/
│   │       └── about.md              # Contenu page À propos
│   ├── layouts/
│   │   └── BaseLayout.astro          # Layout unique : HTML, meta, CSP, footer
│   ├── pages/
│   │   ├── index.astro               # Page CV principale
│   │   └── about.astro               # Page À propos
│   ├── styles/
│   │   └── global.css                # Design system complet (Lumon + Atari)
│   ├── types/
│   │   └── icons.ts                  # Types et mappings du système d'icônes
│   ├── utils/
│   │   ├── cvParser.ts               # Parser Markdown → données structurées
│   │   ├── iconEngine.ts             # Moteur d'icônes avec cache et fallback
│   │   └── debug.ts                  # Logger conditionnel multi-modules
│   └── env.d.ts                      # Déclarations types Astro
├── public/
│   ├── _headers                      # Headers Netlify (cache, sécurité, CSP)
│   ├── sw.js                         # Service Worker
│   ├── robots.txt                    # Robots + sitemap
│   ├── favicon.svg                   # Favicon SVG
│   ├── profile.jpg                   # Photo de profil
│   ├── cv_mathieu_drouet.pdf         # PDF téléchargeable
│   ├── graph-paper.svg               # Motif décoratif
│   └── logos/                        # Logos des entreprises
│       ├── actual.png
│       ├── bookr.png
│       ├── fluidra.png
│       ├── ge-healtcare.png
│       └── heyahereyouart.png
├── scripts/
│   └── watch-content.js              # Détection changements contenu (SHA-256)
├── tests/
│   ├── setup.ts                      # Setup Vitest
│   ├── cvParser.test.ts              # Tests unitaires du parser (20 tests)
│   └── integration.test.ts           # Tests d'intégration build (18 tests)
├── dist/                             # Output de build
├── astro.config.mjs                  # Config Astro + Vite + Sitemap
├── tailwind.config.mjs               # Config Tailwind (legacy v3 format)
├── postcss.config.mjs                # PostCSS avec @tailwindcss/postcss
├── vitest.config.ts                  # Config Vitest avec aliases
├── tsconfig.json                     # Config TS (extends astro/tsconfigs/base)
├── netlify.toml                      # Config déploiement Netlify
├── package.json                      # Dépendances et scripts
└── pnpm-lock.yaml                    # Lockfile pnpm
```

### Patterns architecturaux

- **Static Site Generation (SSG)** : Tout le contenu est pré-rendu au build
- **Content-as-Code** : Le CV est un fichier Markdown versionné avec le code
- **Component-based UI** : Composants Astro avec props typées
- **Design Tokens via CSS Variables** : Thème configurable via `data-theme`
- **Singleton Pattern** : `iconEngine` et `debug` sont des instances singleton
- **Strategy Pattern** : Le thème (Lumon/Atari) change les CSS variables sans modifier les composants

## 2. Stack technique

| Composant | Technologie | Version | Rôle |
|-----------|-------------|---------|------|
| Framework SSG | Astro | ^5.16.4 | Génération statique, Content Collections |
| Langage | TypeScript | ^6.0.0 | Typage statique |
| CSS Framework | Tailwind CSS | ^4.1.11 | Utility-first CSS |
| PostCSS Plugin | @tailwindcss/postcss | ^4.1.0 | Intégration Tailwind v4 |
| Typography | @tailwindcss/typography | ^0.5.10 | Prose styles |
| Icônes (build) | unplugin-icons | ^23.0.0 | Import icônes comme composants |
| Icônes (runtime) | Iconify CDN | 2.1.0 | Web component `<iconify-icon>` |
| Icônes (data) | @iconify-json/carbon | ^1.2.10 | Dataset Carbon icons |
| Sitemap | @astrojs/sitemap | ^3.6.0 | Génération sitemap XML |
| Tests | Vitest | ^4.0.0 | Test runner |
| Coverage | @vitest/coverage-v8 | ^4.0.0 | Rapports de couverture |
| Test UI | @vitest/ui | ^4.0.0 | Interface web Vitest |
| DOM (tests) | jsdom | ^29.0.0 | Simulation navigateur |
| Hébergement | Netlify | — | CDN, Forms, Headers |
| Runtime | Node.js | 22 | Build environment |

## 3. Modules et composants

### cvParser.ts

- **Responsabilité** : Convertir le contenu Markdown du CV en données TypeScript structurées
- **Fichier** : `src/utils/cvParser.ts`
- **Dépendances internes** : `debug.ts`, `images.ts`, `iconEngine.ts`
- **API exposée** : `parseCVContent(content: string, frontmatterData?: any): CVData`
- **Logique clé** : Parsing ligne par ligne du Markdown, extraction de sections (Education, Coordonnées, Intérêts, Expériences, Compétences), transformation des patterns d'icônes en HTML Iconify, conversion markdown (bold, italic, links)

### iconEngine.ts

- **Responsabilité** : Parser, mapper et rendre les icônes entre différents icon sets
- **Fichier** : `src/utils/iconEngine.ts`
- **Dépendances internes** : `types/icons.ts`
- **API exposée** : Classe `IconEngine` avec `parseIcon()`, `renderIcon()`, `updateConfig()` ; instance singleton `iconEngine`
- **Logique clé** : Cache Map pour les résultats de parsing, support format `**set:name**` et `**icon:name**`, fallback vers `alert-circle`, mapping entre sets via `ICON_MAPPINGS`

### debug.ts

- **Responsabilité** : Logging conditionnel multi-modules pour le développement
- **Fichier** : `src/utils/debug.ts`
- **Dépendances internes** : `config/env.ts`
- **API exposée** : Instance `debug` (logger générique), `cvDebug` (helpers parser), `buildDebug` (helpers build) ; accès global `window.__cvDebug` en dev
- **Modules de log** : PARSER, ICONS, RENDER, BUILD, CONTENT, MEMORY, PROFILER

### BaseLayout.astro

- **Responsabilité** : Structure HTML complète : `<head>` (meta, fonts, CSP, JSON-LD), `<body>` (skip links, main, footer conditionnel, contact modal)
- **Fichier** : `src/layouts/BaseLayout.astro`
- **Props** : `title`, `description`, `showFooter?`, `image?`, `url?`, `enableDebugMode?`, `theme?`
- **Logique clé** : CSP dynamique via `securityConfig.enableCSP`, JSON-LD Person schema, Google Fonts async, Iconify CDN script

### ExperienceCard.astro

- **Responsabilité** : Affichage d'une expérience professionnelle ou d'une compétence
- **Fichier** : `src/components/ExperienceCard.astro`
- **Props** : `company`, `companyUrl?`, `role`, `period`, `current?`, `logo?`, `icon?`, `levelIcon?`
- **Logique clé** : Fetch SVG depuis Iconify API au build-time pour les icônes, fallback vers initiales, grille responsive avec colonne logo + colonne contenu

### ContactModal.astro

- **Responsabilité** : Modale de formulaire de contact
- **Fichier** : `src/components/ContactModal.astro`
- **Logique clé** : Formulaire Netlify Forms avec honeypot anti-spam, soumission AJAX, états loading/success, fermeture via Escape/backdrop/bouton, auto-close après succès (3s)

### watch-content.js

- **Responsabilité** : Détecter les changements dans `src/content/cv/cv.md`
- **Fichier** : `scripts/watch-content.js`
- **API CLI** : `check` (vérification ponctuelle) | `watch` (surveillance continue)
- **Logique clé** : Hash SHA-256 du contenu + timestamp de modification, cache dans `.content-cache.json`

## 4. Flux de données

### Flux 1 : Build et rendu du CV

```
[cv.md] ──Astro Content Collections──▶ [getEntry('cv', 'cv')]
                                              │
                                              ▼
                                    [parseCVContent(body, data)]
                                              │
                                    ┌─────────┼─────────┐
                                    ▼         ▼         ▼
                            [education]  [experience] [skills]
                                    │         │         │
                                    ▼         ▼         ▼
                              [CVCard]  [ExperienceCard] [ExperienceCard]
                                    │         │         │
                                    └─────────┼─────────┘
                                              ▼
                                    [BaseLayout.astro]
                                              │
                                              ▼
                                         [dist/index.html]
```

### Flux 2 : Système d'icônes

```
[Markdown: **carbon:email**]
         │
         ▼
[replaceFlexibleIcons()] ──parse──▶ [iconEngine.parseIcon()]
                                         │
                                    ┌────┤ cache hit? ──▶ [return cached]
                                    │    │
                                    │    ▼ cache miss
                                    │ [split set:name]
                                    │    │
                                    │    ▼
                                    │ [mapIconName()]
                                    │    │
                                    │    ▼
                                    │ [ParsedIcon {set, name, mapped}]
                                    │    │
                                    │    ▼
                                    └──▶ [iconEngine.renderIcon()]
                                              │
                                              ▼
                                    [<iconify-icon icon="carbon:email" .../>]
```

### Flux 3 : Soumission formulaire contact

```
[Utilisateur remplit formulaire]
         │
         ▼
[submit event] ──preventDefault──▶ [FormData → URLSearchParams]
                                         │
                                         ▼
                                   [fetch('/', POST, form-urlencoded)]
                                         │
                                         ▼
                                   [Netlify Forms backend]
                                         │
                                    ┌────┤
                                    │    ▼ success
                                    │ [Affiche message succès]
                                    │ [Auto-close 3s]
                                    │
                                    ▼ error
                              [alert() erreur]
```

## 5. API

### Pas d'API REST

Ce projet est un site statique sans API backend. Les seules interactions réseau sont :

- **Iconify API** (build-time + runtime) : `https://api.iconify.design/{icon}.svg`
- **Netlify Forms** (runtime) : `POST /` avec `Content-Type: application/x-www-form-urlencoded`

### Astro Content Collections (build-time)

| Collection | Type | Schéma |
|-----------|------|--------|
| `cv` | content | `{ name: string, title?: string, description?: string, iconSet?: enum, theme?: enum }` |
| `about` | content | `{ title?: string, description?: string }` |

## 6. Configuration

### Variables d'environnement

Le projet n'utilise pas de `.env`. La configuration est déterminée par `NODE_ENV` dans `src/config/env.ts` :

| Variable | Dev | Prod | Test |
|----------|-----|------|------|
| DEBUG | true | false | false |
| LOGGING_LEVEL | debug | error | warn |
| ENABLE_ANALYTICS | false | true | false |
| CONTENT_CACHE_TTL | 0 | 3600000 | 0 |
| BUILD_OPTIMIZATION | false | true | false |
| API_BASE_URL | localhost:4321 | cv.mathieu-drouet.com | localhost:3000 |

### Fichiers de configuration

| Fichier | Rôle |
|---------|------|
| `astro.config.mjs` | Config Astro : site URL, integrations, build, vite plugins |
| `tailwind.config.mjs` | Tokens design (couleurs, fonts, spacing), prose styles |
| `postcss.config.mjs` | Plugin @tailwindcss/postcss |
| `tsconfig.json` | Extends `astro/tsconfigs/base` |
| `vitest.config.ts` | Environment node, aliases, coverage thresholds (80%) |
| `netlify.toml` | Build command, publish dir, Node 22 |
| `renovate.json` | Auto-updates dépendances (groupé, automerge minor) |
| `pnpm-workspace.yaml` | Workspace racine (packages: ['.']) |

## 7. Build et déploiement

### Commandes

| Commande | Description |
|----------|-------------|
| `pnpm install` | Installation des dépendances |
| `pnpm run dev` | Serveur de développement (localhost:4321) |
| `pnpm run build` | Check contenu + build Astro (→ dist/) |
| `pnpm run preview` | Prévisualisation du build |
| `pnpm run test` | Tests Vitest |
| `pnpm run test:watch` | Tests en mode watch |
| `pnpm run test:ui` | Interface web Vitest |
| `pnpm run test:coverage` | Rapport de couverture |
| `pnpm run content:check` | Vérification changements contenu |
| `pnpm run content:watch` | Surveillance continue du contenu |

### CI/CD

**Netlify** : Le build est déclenché automatiquement sur push vers la branche main.

- **Commande de build** : `pnpm run build`
- **Répertoire de publication** : `dist`
- **Node.js** : 22

**Renovate** : Mises à jour automatiques des dépendances via bot GitHub.

## 8. Tests

### Couverture

| Module | Tests unitaires | Tests intégration |
|--------|----------------|-------------------|
| cvParser.ts | 20 tests | 1 test (parsing réel cv.md) |
| Build output | — | 17 tests (fichiers, contenu, meta) |

### Configuration

- **Framework** : Vitest avec environment `node`
- **Setup** : `tests/setup.ts`
- **Seuils de couverture** : 80% (branches, functions, lines, statements)
- **Exclusions** : Pages Astro, layouts, fichiers `.d.ts`
- **Aliases** : `@/`, `@/components`, `@/utils`, `@/config`

### Types de tests

- **Unitaires** (`tests/cvParser.test.ts`) : Parsing de sections CV, gestion d'erreurs, edge cases (null, undefined, contenu vide, sections malformées)
- **Intégration** (`tests/integration.test.ts`) : Vérification du build output (HTML, CSS, assets, meta tags, CSP, sitemap, accessibilité)

## 9. Dettes techniques et points d'attention

| # | Sujet | Détail | Fichier |
|---|-------|--------|---------|
| D1 | Contact hardcodé | Les coordonnées de fallback sont en dur dans le parser | `cvParser.ts:316-320` |
| D2 | Fetch API au build | Les composants font des fetch réseau pendant le SSG | `ExperienceCard.astro:23-28`, `CVCard.astro:12-17` |
| D3 | tailwind.config.mjs legacy | Ce fichier utilise le format Tailwind v3 alors que le projet utilise Tailwind v4 via PostCSS | `tailwind.config.mjs` |
| D4 | Duplication CSS tokens | Les tokens sont définis à la fois dans `global.css` (@theme + :root) et dans `tailwind.config.mjs` | — |
| D5 | Détection "current" naïve | `exp.current` est `true` si la période contient "2025" — deviendra faux en 2026 | `cvParser.ts:408` |
| D6 | Documentation README décalée | Mentionne audit system, ESLint, Prettier inexistants | `README.md` |
| D7 | `unsafe-inline` CSP | Requis pour Astro `is:inline` mais affaiblit la protection XSS | `BaseLayout.astro:146` |
| D8 | Typo icône dupliquée | `carbon:carbon:edge-device` dans cv.md (double préfixe) | `cv.md:112` |
| D9 | API_BASE_URL prod incorrect | Points vers `cv.mathieu-drouet.com` mais le site est `cv.drouet.io` | `env.ts:52` |
