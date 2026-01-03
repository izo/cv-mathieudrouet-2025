# Spécification Projet — CV Mathieu Drouet

> **Version :** 1.0
> **Date :** 2026-01-03
> **Statut :** Draft pour validation

---

## 1. Contexte et objectifs

### Contexte
Site CV/portfolio personnel pour **Mathieu Drouet**, Chief Product Officer (CPO) avec 10+ ans d'expérience en transformation digitale. Le site est construit avec Astro v5, TypeScript et Tailwind CSS, déployé sur Netlify à l'adresse https://cv.drouet.io.

### Objectifs
| Objectif | Description |
|----------|-------------|
| **Recherche active** | Attirer des opportunités d'emploi, cible prioritaire : **Apple** |
| **Présence professionnelle** | Asseoir une visibilité durable en tant que CPO |
| **Audience internationale** | Recruteurs et entreprises tech mondiales |
| **Call-to-action principal** | Prise de contact via formulaire |

### Positionnement
- **Titre actuel :** Chief Product Officer (CPO) — *à corriger dans le contenu actuel qui mentionne "Senior Product Manager"*
- **Double casquette :** CPO + photographe professionnel (bio à intégrer dans About)
- **Langues :** Français (actuel) + Anglais (à développer)

---

## 2. Problème à résoudre

### État actuel
Le site est **fonctionnel et bien architecturé**, mais présente des lacunes critiques pour atteindre les objectifs :

| Problème | Impact | Priorité |
|----------|--------|----------|
| Contenu uniquement en français | Bloque l'accès aux recruteurs internationaux (Apple) | 🔴 Critique |
| Page About incomplète ("WIP :)") | Manque de profondeur sur le profil | 🔴 Critique |
| Pas de formulaire de contact | Aucune conversion possible | 🔴 Critique |
| PDF non synchronisé | Incohérence entre web et document téléchargé | 🟠 Important |
| Pas d'analytics | Impossible de mesurer l'efficacité | 🟠 Important |
| Titre "Senior PM" au lieu de "CPO" | Positionnement incorrect | 🔴 Critique |

### Ce qui fonctionne bien
- ✅ Architecture technique solide (Astro, TypeScript, 38 tests)
- ✅ Design system cohérent (Lumon)
- ✅ Performance optimisée (31KB CSS, 0KB JS)
- ✅ Sécurité (CSP configurée)
- ✅ SEO de base (sitemap, meta tags)
- ✅ Responsive mobile-first

---

## 3. Utilisateurs et cas d'usage

### Personas

#### Persona 1 : Recruteur tech international
- **Contexte :** Cherche un CPO expérimenté pour une entreprise tech (ex: Apple)
- **Besoin :** Évaluer rapidement les compétences et l'expérience
- **Parcours :** LinkedIn → CV en ligne → Contact ou téléchargement PDF
- **Langue :** Anglais principalement

#### Persona 2 : Recruteur français
- **Contexte :** Entreprise française cherchant un CPO
- **Besoin :** CV détaillé en français avec contexte local
- **Parcours :** Recherche Google → CV → Contact
- **Langue :** Français

#### Persona 3 : Contact professionnel existant
- **Contexte :** Anciens collègues, partenaires, clients
- **Besoin :** Retrouver les coordonnées, voir l'évolution de carrière
- **Parcours :** Lien direct → About → Contact

### Cas d'usage prioritaires

| # | Cas d'usage | Criticité |
|---|-------------|-----------|
| 1 | Consulter le CV en anglais | 🔴 MVP |
| 2 | Consulter le CV en français | 🔴 MVP |
| 3 | Contacter via formulaire | 🔴 MVP |
| 4 | Télécharger le PDF (synchronisé) | 🔴 MVP |
| 5 | Découvrir le profil complet (About) | 🔴 MVP |
| 6 | Partager le CV sur LinkedIn/Twitter | 🟠 Post-MVP |

---

## 4. Portée (in / out)

### ✅ Dans le scope (MVP)

| Fonctionnalité | Description |
|----------------|-------------|
| **Internationalisation FR/EN** | Deux fichiers Markdown séparés, sélecteur de langue |
| **Formulaire de contact** | Netlify Forms, anti-spam honeypot |
| **Page About complète** | Timeline interactive, bio photographe, photo de profil |
| **Génération PDF automatique** | Synchronisé avec le Markdown à chaque build |
| **Analytics open-source** | Plausible, Umami ou équivalent |
| **Mise à jour titre CPO** | Corriger "Senior PM" → "Chief Product Officer" |
| **SEO international** | Meta tags, Open Graph, hreflang |
| **Nettoyage technique** | Supprimer thème atari inutilisé |

### ❌ Hors scope

| Fonctionnalité | Raison |
|----------------|--------|
| Blog | Non prévu, mainteneur seul |
| Case studies / portfolio projets | Non prioritaire |
| Galerie photos | Partie photo "pas importante" |
| Backend custom | Solutions SaaS/open-source préférées |
| Autres langues (ES, etc.) | FR/EN suffisent pour le MVP |

---

## 5. Architecture et choix techniques

### Stack actuelle (conservée)
```
Frontend:     Astro 5.16.4 + TypeScript 5.7.3
Styling:      Tailwind CSS 4.1.11 (design system Lumon)
Tests:        Vitest 4.0.0 (38 tests, couverture 80%)
Hébergement:  Netlify (statique)
Domaine:      cv.drouet.io
```

### Ajouts pour le MVP

| Besoin | Solution technique | Justification |
|--------|-------------------|---------------|
| **Internationalisation** | Astro i18n natif + fichiers `cv-fr.md` / `cv-en.md` | Simple, pas de dépendance externe |
| **Sélecteur de langue** | Composant Astro avec localStorage pour persistance | UX fluide, pas de rechargement |
| **Formulaire contact** | Netlify Forms + honeypot | Gratuit, natif, sans backend |
| **Génération PDF** | `@playwright/test` ou `puppeteer` headless | Déjà installé (puppeteer), rendu HTML→PDF |
| **Analytics** | Plausible Analytics (self-hosted ou cloud) | Open-source, RGPD-friendly, léger |
| **Timeline About** | Composant Astro custom | Design Lumon conservé |

### Architecture fichiers (cible)

```
src/
├── content/
│   ├── cv/
│   │   ├── cv-fr.md          # CV français (existant, renommé)
│   │   └── cv-en.md          # CV anglais (à créer)
│   └── about/
│       └── about.md          # Bio complète (à compléter)
├── components/
│   ├── LanguageSwitcher.astro  # Nouveau
│   ├── ContactForm.astro       # Nouveau (remplace ContactModal)
│   ├── Timeline.astro          # Nouveau (pour About)
│   └── ... (existants)
├── pages/
│   ├── index.astro           # Redirige vers /fr ou /en
│   ├── fr/
│   │   ├── index.astro       # CV français
│   │   └── about.astro       # About français
│   └── en/
│       ├── index.astro       # CV anglais
│       └── about.astro       # About anglais
└── i18n/
    ├── fr.json               # Traductions UI
    └── en.json               # Traductions UI
```

### Génération PDF — Flux

```
Build (pnpm build)
    │
    ├─► Astro compile HTML
    │
    ├─► Script post-build (scripts/generate-pdf.js)
    │       │
    │       ├─► Lance Puppeteer headless
    │       ├─► Navigue vers localhost preview
    │       ├─► Génère PDF (A4, print CSS)
    │       └─► Sauvegarde public/cv_mathieu_drouet_{lang}.pdf
    │
    └─► Déploiement Netlify
```

---

## 6. UX / Parcours clés

### Parcours 1 : Recruteur international
```
1. Arrivée (LinkedIn, recherche Google)
   └─► Détection langue navigateur → Redirection /en ou /fr

2. Page CV (/en)
   ├─► Scan rapide : nom, titre CPO, expériences clés
   ├─► Sélecteur langue visible (header) si besoin FR
   └─► CTA : "Contact me" (visible, sticky ou footer)

3. Contact
   ├─► Clic CTA → Formulaire modal ou page dédiée
   ├─► Champs : Nom, Email, Message, Entreprise (optionnel)
   ├─► Soumission → Confirmation + email envoyé
   └─► Fallback : lien mailto si JS désactivé

4. Téléchargement PDF (optionnel)
   └─► Bouton "Download CV" → PDF généré automatiquement
```

### Parcours 2 : Découverte profil complet
```
1. Page CV
   └─► Lien "About" ou "En savoir plus"

2. Page About
   ├─► Photo de profil (profile.jpg)
   ├─► Bio courte (accroche)
   ├─► Timeline interactive
   │   ├─► Carrière Product (principale)
   │   └─► Parcours photo (secondaire, condensé)
   └─► CTA contact en fin de page
```

### États importants

| État | Comportement |
|------|--------------|
| **Langue non détectée** | Défaut : anglais (audience internationale prioritaire) |
| **Formulaire soumis** | Message de confirmation + reset formulaire |
| **Formulaire erreur** | Message d'erreur inline, champs conservés |
| **PDF en génération** | Loader si génération à la demande (ou pré-généré au build) |
| **Offline** | Service worker sert la version cachée |

---

## 7. Données et modèles

### Modèle CV (Markdown frontmatter)

```yaml
# cv-en.md / cv-fr.md
---
name: "Mathieu Drouet"
title: "Chief Product Officer"  # Corrigé de "Senior Product Manager"
description: "CPO with 10+ years in digital transformation"
lang: "en"  # ou "fr"
iconSet: "carbon"
theme: "lumon"
lastUpdated: "2026-01-03"
---
```

### Modèle About (Markdown)

```yaml
# about.md
---
name: "Mathieu Drouet"
headline: "Chief Product Officer & Photographer"
profileImage: "/profile.jpg"
lang: "en"
---

## Bio courte
[Accroche 2-3 phrases]

## Parcours
[Timeline data en Markdown structuré]

## Photographie
[Bio photographe condensée]
```

### Traductions UI (JSON)

```json
// i18n/en.json
{
  "nav.cv": "CV",
  "nav.about": "About",
  "nav.contact": "Contact",
  "contact.title": "Get in touch",
  "contact.name": "Your name",
  "contact.email": "Your email",
  "contact.message": "Your message",
  "contact.submit": "Send message",
  "contact.success": "Message sent! I'll get back to you soon.",
  "download.pdf": "Download CV (PDF)",
  "language.switch": "Français"
}
```

---

## 8. Sécurité, performance, observabilité

### Sécurité

| Mesure | Statut | Action |
|--------|--------|--------|
| CSP (Content Security Policy) | ✅ En place | Maintenir |
| Headers sécurité (X-Frame, X-Content-Type) | ⚠️ Partiel | Aligner netlify.toml avec BaseLayout |
| Formulaire anti-spam | ❌ À faire | Honeypot Netlify Forms |
| HTTPS | ✅ Netlify automatique | — |
| Pas de secrets exposés | ✅ Vérifié | — |

### Performance

| Métrique | Cible | Actuel |
|----------|-------|--------|
| LCP (Largest Contentful Paint) | < 2.5s | ✅ OK |
| FID (First Input Delay) | < 100ms | ✅ OK |
| CLS (Cumulative Layout Shift) | < 0.1 | ✅ OK |
| CSS Bundle | < 50KB | ✅ 31KB |
| JavaScript | 0KB | ✅ 0KB |
| PDF taille | < 500KB | ⚠️ 889KB (à optimiser) |

### Observabilité

| Besoin | Solution | Coût |
|--------|----------|------|
| Analytics visiteurs | Plausible (cloud ou self-hosted) | Gratuit (self) ou ~9€/mois |
| Monitoring uptime | Netlify Analytics ou UptimeRobot | Gratuit |
| Erreurs formulaire | Logs Netlify Forms | Inclus |

---

## 9. Risques, hypothèses, inconnues

### Risques identifiés

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| **Traduction EN de mauvaise qualité** | Moyenne | Élevé | Relecture humaine obligatoire |
| **Iconify API down** | Faible | Moyen | Acceptable (décision validée) |
| **PDF lourd ralentit le build** | Moyenne | Faible | Génération async, cache |
| **Formulaire spam** | Moyenne | Faible | Honeypot + rate limiting Netlify |
| **Analytics bloqués par adblockers** | Élevée | Faible | Plausible résiste mieux, accepter perte partielle |

### Hypothèses

| Hypothèse | À valider |
|-----------|-----------|
| Le contenu anglais sera une traduction directe du français | Oui, à confirmer lors de la traduction |
| Un seul PDF par langue suffit | Oui |
| La bio photographe peut être condensée pour About | Oui (partie photo "pas importante") |
| Netlify Forms gratuit suffit (100 soumissions/mois) | À surveiller si trafic élevé |

### Inconnues

| Question | Impact | Résolution |
|----------|--------|------------|
| Quelle solution analytics exacte ? | Faible | Tester Plausible vs Umami |
| Format exact de la timeline About ? | Moyen | Maquette ou prototype rapide |
| Faut-il des meta OG différents FR/EN ? | Faible | Oui, recommandé pour le SEO |

---

## 10. Roadmap proposée

### Phase 1 : Fondations (MVP critique)
```
┌─────────────────────────────────────────────────────────────┐
│  1. Corriger titre "CPO" dans le contenu                    │
│  2. Mettre en place l'architecture i18n (routes /fr, /en)   │
│  3. Créer la traduction anglaise du CV                      │
│  4. Implémenter le sélecteur de langue                      │
│  5. Créer le formulaire de contact (Netlify Forms)          │
└─────────────────────────────────────────────────────────────┘
```

### Phase 2 : Contenu complet
```
┌─────────────────────────────────────────────────────────────┐
│  6. Compléter la page About (bio, timeline, photo)          │
│  7. Traduire About en anglais                               │
│  8. Implémenter la génération PDF automatique               │
│  9. Optimiser le SEO (hreflang, OG tags par langue)         │
└─────────────────────────────────────────────────────────────┘
```

### Phase 3 : Observabilité et polish
```
┌─────────────────────────────────────────────────────────────┐
│  10. Intégrer analytics (Plausible)                         │
│  11. Aligner headers Netlify avec CSP                       │
│  12. Supprimer thème atari inutilisé                        │
│  13. Tests E2E pour les nouveaux parcours                   │
│  14. Optimiser taille PDF                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## TODO (priorisée)

### 🔴 Maintenant (bloquants, indispensables)

| # | Tâche | Fichier(s) concerné(s) | Critère de done |
|---|-------|------------------------|-----------------|
| 1 | **Corriger le titre en "Chief Product Officer"** | `src/content/cv/cv.md`, `src/config/site.ts` | Titre "CPO" visible partout |
| 2 | **Créer l'architecture i18n** | `src/pages/fr/`, `src/pages/en/`, `src/i18n/` | Routes /fr et /en fonctionnelles |
| 3 | **Renommer cv.md → cv-fr.md** | `src/content/cv/` | Build passe sans erreur |
| 4 | **Créer cv-en.md (traduction)** | `src/content/cv/cv-en.md` | CV anglais complet et relu |
| 5 | **Créer LanguageSwitcher.astro** | `src/components/` | Sélecteur visible, persistance localStorage |
| 6 | **Implémenter ContactForm avec Netlify Forms** | `src/components/ContactForm.astro` | Formulaire fonctionnel, honeypot actif |
| 7 | **Compléter page About** | `src/content/about/about.md`, `src/pages/*/about.astro` | Bio visible, photo intégrée |
| 8 | **Créer composant Timeline** | `src/components/Timeline.astro` | Timeline interactive sur About |

### 🟠 Court terme

| # | Tâche | Fichier(s) concerné(s) | Critère de done |
|---|-------|------------------------|-----------------|
| 9 | **Implémenter génération PDF auto** | `scripts/generate-pdf.js`, `package.json` | PDF généré à chaque build |
| 10 | **Créer PDF anglais** | `public/cv_mathieu_drouet_en.pdf` | PDF EN téléchargeable |
| 11 | **Ajouter meta OG par langue** | `src/layouts/BaseLayout.astro` | OG tags dynamiques FR/EN |
| 12 | **Ajouter balises hreflang** | `src/layouts/BaseLayout.astro` | SEO multilingue correct |
| 13 | **Traduire About en anglais** | `src/content/about/about-en.md` | Page About EN complète |

### 🟡 Moyen terme

| # | Tâche | Fichier(s) concerné(s) | Critère de done |
|---|-------|------------------------|-----------------|
| 14 | **Intégrer Plausible Analytics** | `src/layouts/BaseLayout.astro`, `netlify.toml` | Dashboard analytics fonctionnel |
| 15 | **Aligner headers Netlify avec CSP** | `netlify.toml`, `public/_headers` | Headers cohérents |
| 16 | **Supprimer thème atari** | `tailwind.config.mjs` | Code simplifié |
| 17 | **Ajouter tests E2E i18n** | `tests/i18n.test.ts` | Couverture des nouveaux parcours |
| 18 | **Optimiser taille PDF** | `scripts/generate-pdf.js` | PDF < 500KB |

### 🟢 Nice-to-have

| # | Tâche | Fichier(s) concerné(s) | Critère de done |
|---|-------|------------------------|-----------------|
| 19 | **Détection automatique langue navigateur** | `src/pages/index.astro` | Redirect intelligent |
| 20 | **Animation timeline (scroll)** | `src/components/Timeline.astro` | Animations subtiles |
| 21 | **Structured data JSON-LD enrichi** | `src/layouts/BaseLayout.astro` | Rich snippets Google |
| 22 | **Mode impression optimisé** | `src/styles/global.css` | @media print propre |
| 23 | **Monitoring uptime** | Service externe | Alertes en cas de down |

---

## Annexes

### A. Bio photographe (source pour About)

> Mathieu Drouet is a French photographer based between Lille and Valencia. While his choice of subjects is often the fruit of his encounters and travels, he shapes his projects with precision, balancing the tenuous thread between instinct and reflection. Memory, history, and transmission - particularly with regard to family - are the guiding themes of his work.
>
> After taking up photography in 1989 with his grandfather's camera, he developed his practice through years of work in photo labs, concert photography, and collaborations with festivals like Dour Festival. In 2015, he moved to Valencia, Spain, bringing new life to his work.
>
> He has taught at ESJ, University of Lille III, and collaborated with Arte, Telerama, Radio France.

*(Version condensée recommandée pour About — la version complète est disponible dans le brief)*

### B. Ressources techniques

- [Astro i18n Guide](https://docs.astro.build/en/guides/internationalization/)
- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)
- [Plausible Analytics](https://plausible.io/docs)
- [Puppeteer PDF Generation](https://pptr.dev/guides/pdf-generation)

### C. Checklist pré-déploiement MVP

- [ ] CV français relu et à jour
- [ ] CV anglais relu par un natif ou bilingue
- [ ] Formulaire testé (soumission réelle)
- [ ] PDF téléchargeable et lisible
- [ ] SEO vérifié (Lighthouse, meta tags)
- [ ] Mobile testé (iOS Safari, Android Chrome)
- [ ] Performance validée (Core Web Vitals)
- [ ] Analytics opérationnel

---

*Document généré le 2026-01-03 — À valider avant implémentation*
