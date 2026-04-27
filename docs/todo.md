# Todo — cv-mathieudrouet-2025

> Audit Tony · 2026-04-27 · Stack : Astro 6.1.9 / TS 6 / Tailwind 4 / Netlify

## Backlog

- [ ] [P2] **Auto-héberger Google Fonts** — télécharger IBM Plex Sans/Mono + Lora, servir depuis `/public/fonts/`, retirer les `<link>` Google Fonts et les `preconnect` · Gain : ~200-400ms LCP, privacy, conformité RGPD · `src/layouts/BaseLayout.astro`

## Todo

- [ ] [P1] **Décider unplugin-icons** — installé mais inutilisé · Option A (recommandée) : migrer les `<iconify-icon>` vers des SVG inline générés au build (élimine CDN + connect-src Iconify) · Option B : désinstaller (`pnpm remove unplugin-icons`) · `astro.config.mjs`

- [ ] [P1] **Centraliser le contact (anti-duplication)** — `cvParser.ts:316-320` et `cvParser.ts:533-538` hardcodent email/portfolio/linkedin/location en doublon de `src/config/site.ts` · Faire de `site.ts` la source unique, le parser doit lire depuis ce config plutôt que redéclarer · _Origine : revue Astride · piège auto-tendu_

- [ ] [P2] **Logger les exclusions silencieuses du parser CV** — `cvParser.ts:385` (`if (!companyMatch) return;`) et logique `roleMatch` (ligne 393-413) ignorent silencieusement les blocs mal formatés · Ajouter `console.warn('[cvParser] Bloc expérience ignoré : format non reconnu', { line: lines[0] })` minimum, idem pour skills · Gain : visibilité immédiate quand un changement de format casse le rendu · _Origine : revue Astride_

## In Progress

## Blocked

## Done

- [x] [P0] **Fix skip link #navigation mort** — skip link mort supprimé · `src/layouts/BaseLayout.astro`
- [x] [P0] **Fix JSON-LD alumniOf placeholder** — remplacé par Institut Saint-Luc + Simplon.co · `src/layouts/BaseLayout.astro`
- [x] [P1] **Supprimer @tailwindcss/typography** — package supprimé de dependencies
- [x] [P1] **Ajouter `defer` sur le script Iconify CDN** — `src/layouts/BaseLayout.astro`
- [x] [P1] **Synchroniser les CSP** — `_headers` et `BaseLayout.astro` alignés, `frame-ancestors 'none'` ajouté dans `_headers` · `public/_headers`
- [x] [P2] **Supprimer X-XSS-Protection dans `_headers`** — directive dépréciée retirée · `public/_headers`
