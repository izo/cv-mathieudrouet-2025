---
title: User Stories — CV Mathieu Drouet
type: spec
category: rewrite
date: 2026-04-10
status: active
author: strange
tags: [reverse-doc, user-stories]
source: code-analysis
---

# User Stories — CV Mathieu Drouet

> Reconstitués par analyse du code source le 2026-04-10

## Légende

- **Implémenté** : code présent et fonctionnel
- **Partiel** : code présent mais incomplet
- **Déduit** : logique métier suggère cette story

## Epic 1 : Consultation du CV

### US-001 : Consulter le parcours professionnel

**En tant que** visiteur (recruteur, partenaire)
**Je veux** voir les expériences professionnelles de Mathieu Drouet
**Afin de** évaluer son profil pour une opportunité

**Critères d'acceptation** :
- [x] Les expériences sont affichées avec entreprise, rôle, période, réalisations
- [x] Les entreprises ont un logo ou des initiales en fallback
- [x] Les liens vers les entreprises ouvrent dans un nouvel onglet
- [x] Les postes actuels sont visuellement identifiés
- [x] Le contenu est responsive (mobile, tablette, desktop)

**Statut** : Implémenté
**Fichiers** : `src/pages/index.astro:64-82`, `src/components/ExperienceCard.astro`

### US-002 : Consulter les compétences

**En tant que** visiteur
**Je veux** voir les compétences organisées par catégorie
**Afin de** évaluer l'adéquation technique et managériale

**Critères d'acceptation** :
- [x] Les compétences sont groupées par catégorie (PM, UX, IA, Dev, Outils, Langues)
- [x] Chaque catégorie a un niveau d'expertise (Expert, Avancé)
- [x] Les icônes illustrent visuellement les catégories
- [x] Les items détaillent les compétences spécifiques

**Statut** : Implémenté
**Fichiers** : `src/pages/index.astro:84-103`, `src/utils/cvParser.ts:417-502`

### US-003 : Consulter l'éducation et les informations personnelles

**En tant que** visiteur
**Je veux** voir la formation, les coordonnées et les centres d'intérêt
**Afin de** avoir une vue complète du profil

**Critères d'acceptation** :
- [x] L'éducation affiche diplôme, institution, période
- [x] Les coordonnées sont cliquables (email, LinkedIn, portfolio)
- [x] Les centres d'intérêt sont listés avec icônes
- [x] Les 3 sections sont en grille sur desktop, empilées sur mobile

**Statut** : Implémenté
**Fichiers** : `src/pages/index.astro:28-62`, `src/components/cv/CVCard.astro`, `src/components/cv/CVGrid.astro`

### US-004 : Découvrir le profil via la page À propos

**En tant que** visiteur
**Je veux** lire une présentation personnelle détaillée
**Afin de** mieux comprendre la personnalité et les valeurs professionnelles

**Critères d'acceptation** :
- [x] La page affiche le contenu Markdown rendu
- [x] Un lien permet de revenir au CV
- [ ] La section "En dehors du travail" est complète

**Statut** : Partiel (section "En dehors du travail" marquée WIP)
**Fichiers** : `src/pages/about.astro`, `src/content/about/about.md:26`

## Epic 2 : Contact et interaction

### US-005 : Contacter via formulaire

**En tant que** visiteur
**Je veux** envoyer un message directement depuis le site
**Afin de** prendre contact professionnellement

**Critères d'acceptation** :
- [x] La modale s'ouvre depuis l'icône email du footer
- [x] Les champs nom, email, sujet, message sont requis
- [x] Le formulaire affiche un état de chargement pendant l'envoi
- [x] Un message de succès s'affiche après envoi
- [x] La modale se ferme automatiquement après 3 secondes
- [x] La modale se ferme via Escape, backdrop click, ou bouton
- [x] Protection anti-spam via honeypot

**Statut** : Implémenté
**Fichiers** : `src/components/ContactModal.astro`

### US-006 : Télécharger le CV en PDF

**En tant que** visiteur
**Je veux** télécharger une version PDF du CV
**Afin de** conserver ou partager le profil hors ligne

**Critères d'acceptation** :
- [x] L'icône PDF dans le footer déclenche le téléchargement
- [x] Le fichier est nommé `CV-Mathieu-Drouet.pdf`

**Statut** : Implémenté
**Fichiers** : `src/layouts/BaseLayout.astro:178-183`, `public/cv_mathieu_drouet.pdf`

### US-007 : Accéder aux profils sociaux

**En tant que** visiteur
**Je veux** accéder aux profils LinkedIn, GitHub et portfolio
**Afin de** approfondir ma connaissance du profil

**Critères d'acceptation** :
- [x] Les liens sont dans le footer avec icônes
- [x] Ils ouvrent dans un nouvel onglet
- [x] Attributs `rel="noopener noreferrer"` pour la sécurité
- [x] Labels ARIA pour l'accessibilité

**Statut** : Implémenté
**Fichiers** : `src/layouts/BaseLayout.astro:185-193`

## Epic 3 : SEO et visibilité

### US-008 : Être bien référencé sur les moteurs de recherche

**En tant que** propriétaire du site
**Je veux** que mon CV soit bien indexé par Google
**Afin de** être trouvé par les recruteurs recherchant un PM à Lille

**Critères d'acceptation** :
- [x] Meta description et keywords pertinents
- [x] Open Graph et Twitter Cards configurés
- [x] JSON-LD Person schema
- [x] Sitemap XML auto-générée
- [x] Canonical URL
- [x] robots.txt avec lien sitemap
- [x] Langue `lang="fr"` déclarée

**Statut** : Implémenté
**Fichiers** : `src/layouts/BaseLayout.astro:42-99`, `src/config/site.ts`

## Epic 4 : Performance et accessibilité

### US-009 : Charger rapidement sur tous les appareils

**En tant que** visiteur mobile
**Je veux** que le site charge rapidement même en 3G/4G
**Afin de** consulter le CV sans frustration

**Critères d'acceptation** :
- [x] CSS inline critique pour éviter le FOUC
- [x] Google Fonts chargées de manière asynchrone
- [x] Service Worker pour cache des assets statiques
- [x] HTML compressé
- [x] Images lazy-loaded avec dimensions explicites
- [x] Prefetch viewport-based

**Statut** : Implémenté
**Fichiers** : `src/layouts/BaseLayout.astro:102-131`, `public/sw.js`, `astro.config.mjs`

### US-010 : Naviguer de manière accessible

**En tant que** utilisateur avec handicap
**Je veux** naviguer au clavier et avec un lecteur d'écran
**Afin de** accéder au contenu du CV

**Critères d'acceptation** :
- [x] Skip links vers le contenu principal et la navigation
- [x] Focus visible sur tous les éléments interactifs
- [x] Support `prefers-reduced-motion`
- [x] Support `prefers-contrast: high`
- [x] Zones tactiles minimum 44px
- [x] Attributs ARIA sur les sections
- [x] Structure sémantique HTML (main, section, header, footer, nav)

**Statut** : Implémenté
**Fichiers** : `src/layouts/BaseLayout.astro:153-154`, `src/styles/global.css:221-246`

### US-011 : Imprimer le CV proprement

**En tant que** visiteur
**Je veux** imprimer le site avec une mise en page adaptée
**Afin de** avoir une version papier professionnelle

**Critères d'acceptation** :
- [x] Styles d'impression dédiés (@media print)
- [x] Suppression des éléments interactifs (footer, boutons, icônes)
- [x] Mise en page A4 avec marges appropriées
- [x] Couleurs d'impression forcées
- [x] Pas de coupure de page au milieu des blocs

**Statut** : Implémenté
**Fichiers** : `src/styles/global.css:717-899`

## Epic 5 : Gestion du contenu

### US-012 : Mettre à jour le CV facilement

**En tant que** propriétaire du site
**Je veux** modifier le contenu du CV via un simple fichier Markdown
**Afin de** maintenir mon CV à jour sans toucher au code

**Critères d'acceptation** :
- [x] Le contenu est dans un seul fichier `src/content/cv/cv.md`
- [x] Le format Markdown est documenté et structuré
- [x] Les icônes sont configurables via le frontmatter `iconSet`
- [x] Le thème est configurable via le frontmatter `theme`
- [x] La détection de changements évite les rebuilds inutiles

**Statut** : Implémenté
**Fichiers** : `src/content/cv/cv.md`, `scripts/watch-content.js`

## Epic 6 : Sécurité

### US-013 : Protéger le site contre les attaques web

**En tant que** propriétaire du site
**Je veux** que le site soit sécurisé contre les attaques courantes
**Afin de** protéger les visiteurs et ma réputation

**Critères d'acceptation** :
- [x] Content Security Policy configurée (meta tag + Netlify headers)
- [x] X-Frame-Options: DENY
- [x] X-Content-Type-Options: nosniff
- [x] Referrer-Policy: strict-origin-when-cross-origin
- [x] Permissions-Policy restrictive (caméra, micro, géoloc désactivés)
- [x] Liens externes avec `rel="noopener noreferrer"`

**Statut** : Implémenté
**Fichiers** : `src/layouts/BaseLayout.astro:146`, `public/_headers:36-46`

## Matrice de couverture

| User Story | Code | Tests | Doc | Statut |
|-----------|------|-------|-----|--------|
| US-001 Expériences | ✅ | ✅ | ✅ | Implémenté |
| US-002 Compétences | ✅ | ✅ | ✅ | Implémenté |
| US-003 Education/Infos | ✅ | ✅ | ✅ | Implémenté |
| US-004 À propos | ✅ | ✅ | ❌ | Partiel |
| US-005 Formulaire contact | ✅ | ❌ | ❌ | Implémenté |
| US-006 PDF | ✅ | ❌ | ❌ | Implémenté |
| US-007 Profils sociaux | ✅ | ❌ | ✅ | Implémenté |
| US-008 SEO | ✅ | ✅ | ✅ | Implémenté |
| US-009 Performance | ✅ | ❌ | ✅ | Implémenté |
| US-010 Accessibilité | ✅ | ✅ | ❌ | Implémenté |
| US-011 Impression | ✅ | ❌ | ❌ | Implémenté |
| US-012 Gestion contenu | ✅ | ✅ | ✅ | Implémenté |
| US-013 Sécurité | ✅ | ✅ | ✅ | Implémenté |
