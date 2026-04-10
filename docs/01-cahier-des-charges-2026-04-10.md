---
title: Cahier des charges — CV Mathieu Drouet
type: spec
category: rewrite
date: 2026-04-10
status: active
author: strange
tags: [reverse-doc, cahier-des-charges]
source: code-analysis
---

# Cahier des charges — CV Mathieu Drouet

> Reconstitué par analyse du code source le 2026-04-10

## 1. Contexte et objectifs

### Contexte

Site web personnel de CV/portfolio pour Mathieu Drouet, Senior Product Manager basé à Lille, France. Le site sert de vitrine professionnelle digitale, démontrant à la fois le parcours professionnel et les compétences techniques de son auteur.

### Objectifs

1. **Présentation professionnelle** : Afficher de manière élégante le parcours professionnel, les compétences, la formation et les centres d'intérêt
2. **SEO et visibilité** : Maximiser la visibilité sur les moteurs de recherche pour les requêtes liées au product management à Lille
3. **Démonstration technique** : Montrer la maîtrise de technologies web modernes (Astro, TypeScript, Tailwind CSS)
4. **Performance** : Atteindre des scores Lighthouse excellents avec un footprint JavaScript minimal
5. **Contact** : Permettre aux visiteurs de contacter directement via un formulaire intégré

## 2. Périmètre fonctionnel

### Fonctionnalités implémentées

| # | Fonctionnalité | Fichiers source |
|---|----------------|----------------|
| F1 | Page CV principale avec sections : Education, Coordonnées, Centres d'intérêt, Expériences, Compétences | `src/pages/index.astro` |
| F2 | Page "À propos" avec contenu Markdown | `src/pages/about.astro` |
| F3 | Parsing dynamique de contenu CV depuis Markdown | `src/utils/cvParser.ts` |
| F4 | Système d'icônes dynamique multi-sets (carbon, tabler, lucide, heroicons, feather) | `src/utils/iconEngine.ts`, `src/types/icons.ts` |
| F5 | Design System thémable (Lumon + Atari) | `src/styles/global.css` |
| F6 | Formulaire de contact via Netlify Forms | `src/components/ContactModal.astro` |
| F7 | SEO complet : meta tags, Open Graph, Twitter Cards, JSON-LD | `src/layouts/BaseLayout.astro` |
| F8 | Content Security Policy (CSP) configurable | `src/layouts/BaseLayout.astro`, `src/config/env.ts` |
| F9 | Service Worker pour cache statique | `public/sw.js` |
| F10 | Détection de changements de contenu avec cache SHA-256 | `scripts/watch-content.js` |
| F11 | Sitemap XML automatique | `astro.config.mjs` (plugin @astrojs/sitemap) |
| F12 | Styles d'impression PDF dédiés | `src/styles/global.css` (section @media print) |
| F13 | Support accessibilité : skip links, focus indicators, prefers-reduced-motion, prefers-contrast | `src/layouts/BaseLayout.astro`, `src/styles/global.css` |
| F14 | Logos d'entreprises avec fallback initiales/icônes | `src/components/ExperienceCard.astro`, `src/config/images.ts` |
| F15 | Headers de cache Netlify (immutable pour assets statiques) | `public/_headers` |
| F16 | Debug mode conditionnel en développement | `src/utils/debug.ts` |
| F17 | PDF du CV téléchargeable | `public/cv_mathieu_drouet.pdf` |

### Fonctionnalités partiellement implémentées

| # | Fonctionnalité | État | Détail |
|---|----------------|------|--------|
| P1 | Page "À propos" | Contenu minimal | La section "En dehors du travail" est marquée "WIP :)" (`src/content/about/about.md:26`) |
| P2 | Thème Atari | CSS défini, non exposé | Le thème est entièrement défini dans `global.css` mais n'est sélectionnable que via le frontmatter `theme: "atari"` du CV |

### Fonctionnalités absentes mais prévues

Aucune fonctionnalité prévue non implémentée n'a été détectée dans le code.

## 3. Architecture technique

### Stack

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Framework | Astro | ^5.16.4 |
| Langage | TypeScript | ^6.0.0 |
| CSS | Tailwind CSS | ^4.1.11 |
| Tests | Vitest | ^4.0.0 |
| Coverage | @vitest/coverage-v8 | ^4.0.0 |
| Icônes | Iconify CDN + unplugin-icons | 2.1.0 / ^23.0.0 |
| Typographie | @tailwindcss/typography | ^0.5.10 |
| Sitemap | @astrojs/sitemap | ^3.6.0 |
| DOM (tests) | jsdom | ^29.0.0 |
| Package manager | pnpm | — |
| Hébergement | Netlify | — |
| Node.js | 22 | (netlify.toml) |

### Schéma d'architecture

```
[Navigateur] ──HTTP──▶ [Netlify CDN]
                           │
                           ▼
                    [Site statique (dist/)]
                           │
                    ┌──────┼──────┐
                    ▼      ▼      ▼
              [index.html] [about/] [assets/]
                    │
                    ▼
             [Service Worker]
                    │
                    ▼
              [Cache local]

[Build time]
     │
     ▼
[Astro SSG] ──parse──▶ [cvParser.ts] ──lit──▶ [cv.md]
     │                      │
     │                      ▼
     │               [iconEngine.ts]
     │                      │
     │                      ▼
     ▼               [Iconify API] (build-time fetch SVG)
[dist/] ──deploy──▶ [Netlify]
```

### Modèle de données

Source de vérité unique : `src/content/cv/cv.md` (Markdown avec frontmatter YAML)

Structures TypeScript parsées (`src/utils/cvParser.ts`) :

- **CVData** : Objet racine contenant toutes les sections
- **Education** : `{ title, period, institution }`
- **Contact** : `{ email, portfolio, linkedin, location }`
- **Experience** : `{ company, companyUrl?, role, period, current?, logo?, icon?, achievements[] }`
- **Skill** : `{ title, subtitle, level, current?, items[], icon?, levelIcon? }`

## 4. Contraintes techniques

- **Génération statique** : Pas de rendu côté serveur, tout est pré-rendu au build
- **Pas de base de données** : Contenu géré via fichiers Markdown
- **Dépendances CDN au build** : Les icônes SVG sont fetchées depuis l'API Iconify au moment du build (dans `ExperienceCard.astro` et `CVCard.astro`)
- **`unsafe-inline` requis** : La CSP nécessite `unsafe-inline` pour les scripts/styles inline d'Astro
- **pnpm obligatoire** : Le projet utilise pnpm comme package manager (lockfile, overrides)

## 5. Contraintes non-fonctionnelles

### Performance
- Bundle CSS cible : ~31KB
- JavaScript minimal (uniquement ContactModal + debug conditionnel)
- Compression HTML activée (`compressHTML: true`)
- Prefetch viewport-based

### Sécurité
- CSP headers via meta tag ET Netlify headers
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- Liens externes avec `rel="noopener noreferrer"`
- Honeypot anti-spam sur le formulaire de contact

### Accessibilité
- Skip links (contenu principal + navigation)
- Indicateurs de focus visibles
- Support `prefers-reduced-motion`
- Support `prefers-contrast: high`
- Zones tactiles minimum 44px
- Attributs ARIA sur les sections et icônes
- Langue `lang="fr"` et direction `dir="ltr"`

### SEO
- JSON-LD Person schema
- Open Graph + Twitter Cards
- Sitemap XML auto-générée
- Canonical URL
- Meta description, keywords, author
- robots.txt avec sitemap

## 6. Environnements

| Environnement | URL | Configuration |
|---------------|-----|---------------|
| **Development** | `http://localhost:4321` | DEBUG=true, LOGGING_LEVEL=debug, pas de cache |
| **Production** | `https://cv.drouet.io` | DEBUG=false, LOGGING_LEVEL=error, CSP+HSTS activés |
| **Test** | `http://localhost:3000` | LOGGING_LEVEL=warn, pas d'analytics |

Source : `src/config/env.ts`

## 7. Dépendances externes

| Service | Usage | Criticité |
|---------|-------|-----------|
| **Netlify** | Hébergement, CDN, Forms | Critique |
| **Google Fonts** | IBM Plex Sans/Mono, Lora | Haute (fallback système) |
| **Iconify CDN** | Script iconify-icon 2.1.0 | Haute (icônes UI) |
| **Iconify API** | Fetch SVG au build + runtime | Haute |
| **GitHub** | Code source, Renovate bot | Moyenne |

## 8. Risques identifiés

| # | Risque | Sévérité | Détail |
|---|--------|----------|--------|
| R1 | Dépendance Iconify CDN | Moyenne | Les icônes du site dépendent d'un CDN tiers au runtime ; en cas de panne, les icônes disparaissent |
| R2 | Fetch API au build-time | Moyenne | `ExperienceCard.astro` et `CVCard.astro` font des `fetch()` vers l'API Iconify pendant le build SSG — un timeout ralentit/bloque le build |
| R3 | Documentation décalée | Basse | README mentionne un système d'audit inexistant, des outils (ESLint, Prettier) non configurés |
| R4 | Contact hardcodé | Basse | Les coordonnées de contact sont en dur dans `cvParser.ts:316-320` comme fallback, en plus du contenu Markdown |
| R5 | Overrides sécurité pnpm | Basse | Deux overrides de sécurité (`mdast-util-to-hast`, `yaml`) — à surveiller pour mise à jour |
| R6 | Service Worker agressif | Basse | Le SW exclut CSS/JS du cache mais pourrait servir du HTML obsolète si le cache n'est pas invalidé |
