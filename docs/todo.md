# Todo — cv-mathieudrouet-2025

> Audit Tony · 2026-04-27 · Stack : Astro 6.1.9 / TS 6 / Tailwind 4 / Netlify
> Audit Agathe (DA) · 2026-04-27

## Backlog

- [ ] [P3] **`.prose-cv` interlignage** — actuellement 1.7, à homogénéiser à 1.6 avec le corps global (page /about uniquement) · _Origine : revue Agathe_ · `src/styles/global.css`

- [ ] [P2] **Auto-héberger Google Fonts** — télécharger IBM Plex Sans/Mono + Lora, servir depuis `/public/fonts/`, retirer les `<link>` Google Fonts et les `preconnect` · Gain : ~200-400ms LCP, privacy, conformité RGPD · `src/layouts/BaseLayout.astro`

## Todo

- [ ] [P1] **Retirer `@tailwindcss/typography` du plugin Tailwind** — package supprimé des deps mais encore déclaré dans `tailwind.config.mjs` (`plugins: [require('@tailwindcss/typography')]`) — build propre va planter · _Origine : revue Agathe_ · `tailwind.config.mjs`

- [ ] [P1] **Unifier `.lumon-container` max-width** — déclaré à `80rem (1280px)` dans le `<style>` inline de `BaseLayout.astro` et à `1200px` dans `global.css` — la cascade crée un comportement non déterministe · _Origine : revue Agathe_ · `src/layouts/BaseLayout.astro` + `src/styles/global.css`

- [ ] [P1] **Vérifier contraste `--cv-muted`** — `#5a7d5c` sur fond `#f7f6f9` — ratio estimé ~4.2:1, en dessous du seuil WCAG AA (4.5:1) · Tester avec WebAIM et ajuster si non conforme · _Origine : revue Agathe_

- [ ] [P1] **Décider unplugin-icons** — installé mais inutilisé · Option A (recommandée) : migrer les `<iconify-icon>` vers des SVG inline générés au build (élimine CDN + connect-src Iconify) · Option B : désinstaller (`pnpm remove unplugin-icons`) · `astro.config.mjs`

- [ ] [P1] **Centraliser le contact (anti-duplication)** — `cvParser.ts:316-320` et `cvParser.ts:533-538` hardcodent email/portfolio/linkedin/location en doublon de `src/config/site.ts` · Faire de `site.ts` la source unique, le parser doit lire depuis ce config plutôt que redéclarer · _Origine : revue Astride · piège auto-tendu_

- [ ] [P2] **Supprimer les fontes fantômes du design system** — `--font-agrandir` et `--font-writer` déclarés dans `global.css` mais non chargées (tokens Next.js orphelins) — fallback silencieux sur `-apple-system` · _Origine : revue Agathe_ · `src/styles/global.css`

- [ ] [P2] **Hardcoded hex `#7da17e` dans `.glass-card:hover`** → remplacer par `var(--cv-accent)` · _Origine : revue Agathe_ · `src/styles/global.css:443`

- [ ] [P2] **`.prose-cv strong` change de famille de fonte** — `font-family: var(--font-lora)` dans un corps IBM Plex Sans crée une rupture typographique non justifiée — supprimer la déclaration · _Origine : revue Agathe_ · `src/styles/global.css`

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
