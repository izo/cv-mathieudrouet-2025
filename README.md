# Mathieu Drouet - CV Digital

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-cv.drouet.io-brightgreen)](https://cv.drouet.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![Astro](https://img.shields.io/badge/Astro-5.16+-orange)](https://astro.build/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/4d2e69c4-79a9-4295-a56d-22f488a99b60/deploy-status)](https://app.netlify.com/projects/cvdrouet/deploys)

> **Senior Product Manager** avec 10+ ans d'expérience en transformation digitale et gestion de produits numériques. Spécialisé dans l'architecture produit, l'UX/UI, et le leadership d'équipes techniques.

## Stack technique

- **[Astro](https://astro.build/)** — Framework SSG, Content Collections
- **[TypeScript](https://www.typescriptlang.org/)** — Typage statique
- **[Tailwind CSS](https://tailwindcss.com/)** — Design system utilitaire
- **[Vitest](https://vitest.dev/)** — Tests unitaires et d'intégration
- **[Iconify](https://iconify.design/)** — Icônes multi-sets (Carbon, Tabler, Lucide...)
- **Netlify** — Hébergement, CDN, Forms

## Architecture

Le contenu du CV est géré via un unique fichier Markdown (`src/content/cv/cv.md`) parsé dynamiquement au build. Le résultat est un site statique déployé sur Netlify.

```
src/
├── components/
│   ├── ExperienceCard.astro     # Carte expérience/compétence
│   ├── ContactModal.astro       # Modal contact (Netlify Forms)
│   └── cv/                      # CVCard, CVGrid, CVSection
├── content/
│   ├── cv/cv.md                 # Contenu du CV (source de vérité)
│   └── about/about.md           # Page À propos
├── layouts/BaseLayout.astro     # HTML, meta, CSP, footer
├── pages/                       # index.astro, about.astro
├── config/                      # site.ts, env.ts, images.ts
├── utils/                       # cvParser.ts, iconEngine.ts, debug.ts
└── styles/global.css            # Design system (thèmes Lumon + Atari)
```

## Démarrage rapide

```bash
pnpm install
pnpm run dev        # localhost:4321
pnpm run build      # Build de production
pnpm run preview    # Prévisualiser le build
```

## Tests

```bash
pnpm run test              # Lancer les tests (38 tests)
pnpm run test:watch        # Mode watch
pnpm run test:coverage     # Rapport de couverture (seuil 80%)
pnpm run test:ui           # Interface web Vitest
```

## Contenu

Pour modifier le CV, éditer `src/content/cv/cv.md`. Le format Markdown est documenté dans `docs/03-doc-utilisateur-2026-04-10.md`.

```bash
pnpm run content:check     # Vérifier les changements de contenu
pnpm run content:watch     # Surveiller les changements en continu
```

## Design System

Deux thèmes configurables via le frontmatter de `cv.md` :

- **`lumon`** (défaut) — Palette verte, angles droits
- **`atari`** — Palette bleue/beige, style rétro

Palette Lumon :
```css
--color-accent-green: #7da17e;
--color-dark: #163f38;
--color-neutral: #f7f6f9;
--color-light-blue: #d6e0e2;
```

Typographie : IBM Plex Sans, IBM Plex Mono, Lora (Google Fonts)

## Sécurité

- Content Security Policy (meta tag + Netlify headers)
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Liens externes avec `rel="noopener noreferrer"`

## Performance

- Site 100% statique — near-zero JavaScript
- CSS critique inline (anti-FOUC)
- Service Worker pour cache des assets
- Google Fonts chargées de manière asynchrone

## Documentation

La documentation complète du projet est dans `docs/` :

| Fichier | Contenu |
|---------|---------|
| `01-cahier-des-charges-2026-04-10.md` | Spécifications fonctionnelles et techniques |
| `02-doc-technique-2026-04-10.md` | Architecture, modules, flux de données |
| `03-doc-utilisateur-2026-04-10.md` | Guide d'utilisation et dépannage |
| `04-user-stories-2026-04-10.md` | User stories avec critères d'acceptation |
| `05-glossaire-2026-04-10.md` | Termes métier et techniques |
| `06-architecture-2026-04-10.md` | ADR reconstitués, diagrammes |

---

**Mathieu Drouet** — Senior Product Manager, Lille  
[cv.drouet.io](https://cv.drouet.io) · [LinkedIn](https://www.linkedin.com/in/mathieudrouet/) · [mathieu@drouet.io](mailto:mathieu@drouet.io)
