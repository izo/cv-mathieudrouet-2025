# Todo — cv-mathieudrouet-2025

> Audit Tony · 2026-04-27 · Stack : Astro 6.1.9 / TS 6 / Tailwind 4 / Netlify

## Backlog

- [ ] [P2] **Auto-héberger Google Fonts** — télécharger IBM Plex Sans/Mono + Lora, servir depuis `/public/fonts/`, retirer les `<link>` Google Fonts et les `preconnect` · Gain : ~200-400ms LCP, privacy, conformité RGPD · `src/layouts/BaseLayout.astro`

## Todo

- [ ] [P1] **Décider unplugin-icons** — installé mais inutilisé · Option A (recommandée) : migrer les `<iconify-icon>` vers des SVG inline générés au build (élimine CDN + connect-src Iconify) · Option B : désinstaller (`pnpm remove unplugin-icons`) · `astro.config.mjs`

## Done

- [x] [P0] **Fix skip link #navigation mort** — skip link mort supprimé · `src/layouts/BaseLayout.astro`
- [x] [P0] **Fix JSON-LD alumniOf placeholder** — remplacé par Institut Saint-Luc + Simplon.co · `src/layouts/BaseLayout.astro`
- [x] [P1] **Supprimer @tailwindcss/typography** — package supprimé de dependencies
- [x] [P1] **Ajouter `defer` sur le script Iconify CDN** — `src/layouts/BaseLayout.astro`
- [x] [P1] **Synchroniser les CSP** — `_headers` et `BaseLayout.astro` alignés, `frame-ancestors 'none'` ajouté dans `_headers` · `public/_headers`
- [x] [P2] **Supprimer X-XSS-Protection dans `_headers`** — directive dépréciée retirée · `public/_headers`

## In Progress

## Blocked

## Done
