---
title: Guide utilisateur — CV Mathieu Drouet
type: guide
category: rewrite
date: 2026-04-10
status: active
author: strange
tags: [reverse-doc, doc-utilisateur]
source: code-analysis
---

# Guide utilisateur — CV Mathieu Drouet

> Reconstitué par analyse du code source le 2026-04-10

## 1. Présentation

Ce projet est un site web de CV digital pour Mathieu Drouet, Senior Product Manager. Il transforme un fichier Markdown en un site web élégant, performant et accessible, déployé sur Netlify.

**Public cible** : Le propriétaire du site (Mathieu Drouet) pour la gestion du contenu, et les visiteurs (recruteurs, partenaires, collègues) pour la consultation.

## 2. Installation / Prise en main

### Prérequis

- **Node.js** 22+ (spécifié dans `netlify.toml`)
- **pnpm** (package manager utilisé — lockfile `pnpm-lock.yaml`)
- **Git** (versioning)

### Installation

```bash
# Cloner le repository
git clone <url-du-repo>
cd cv-mathieudrouet-2025

# Installer les dépendances
pnpm install
```

### Premier lancement

```bash
# Démarrer le serveur de développement
pnpm run dev
# → Ouvre http://localhost:4321
```

## 3. Fonctionnalités

### 3.1 — Page CV (/)

La page principale affiche le CV structuré en sections :

- **Header** : Nom + titre professionnel
- **Grille d'information** (3 colonnes sur desktop) :
  - Education (diplômes, périodes, institutions)
  - Coordonnées (email, portfolio, LinkedIn, localisation, mobilité)
  - Centres d'intérêt (avec icônes)
- **Expériences** : Cartes avec logo, rôle, période, lien entreprise, réalisations
- **Compétences** : Cartes avec icône, sous-titre, niveau, items

### 3.2 — Page À propos (/about)

Page de présentation personnelle avec contenu Markdown rendu automatiquement.

### 3.3 — Formulaire de contact

Accessible via l'icône email dans le footer. Modale avec champs :
- Nom complet (requis)
- Email (requis)
- Sujet (requis)
- Message (requis)

Soumission via Netlify Forms avec protection honeypot anti-spam.

### 3.4 — Téléchargement PDF

Le CV est disponible en téléchargement PDF via l'icône PDF dans le footer.

### 3.5 — Thèmes visuels

Deux thèmes sont disponibles via le frontmatter du CV :
- **Lumon** (défaut) : Palette verte, angles droits, style corporate épuré
- **Atari** : Palette bleue/beige, coins légèrement arrondis, style rétro

## 4. Édition du contenu

### Modifier le CV

Éditer le fichier `src/content/cv/cv.md`. Le contenu suit un format Markdown spécifique :

#### Structure du fichier

```markdown
---
name: "Mathieu Drouet"
title: "Senior Product Manager"
description: "Description SEO"
iconSet: "carbon"
theme: "lumon"
---

# Nom

## **carbon:icon** Section Title

### Sous-section
Contenu...
```

#### Format des icônes

| Pattern | Usage | Exemple |
|---------|-------|---------|
| `**carbon:email**` | Icône inline | `**carbon:email** Contact` |
| `## **carbon:icon** Titre` | Icône de section | `## **carbon:education** Education` |
| `### Titre **carbon:icon**` | Icône après titre (compétences) | `### AI **carbon:cognitive**` |

Sets d'icônes supportés : `carbon`, `tabler`, `lucide`, `heroicons`, `feather`

#### Format des expériences

```markdown
### Nom de l'entreprise
**carbon:location-heart-filled** Lieu – Année
**Titre du poste** | Période | [Company Link](https://url.com)

- Réalisation 1
- Réalisation 2
```

#### Format des compétences

```markdown
### Catégorie **carbon:icon**
**Sous-titre** | **carbon:badge** Niveau

- Compétence 1
- Compétence 2
```

#### Format de l'éducation

```markdown
### Titre du diplôme
Institution, Ville – Années
```

### Modifier la page À propos

Éditer `src/content/about/about.md`. Le contenu est du Markdown standard rendu avec les styles prose du design system.

### Ajouter un logo d'entreprise

1. Placer l'image PNG dans `public/logos/`
2. Ajouter le mapping dans `src/config/images.ts` :

```typescript
export const companyLogoMap: Record<string, string> = {
  'Nom Exact Entreprise': 'nom-fichier.png',
};
```

Le nom doit correspondre exactement au `### Nom` dans le Markdown.

## 5. Build et déploiement

### Build local

```bash
# Build de production
pnpm run build

# Prévisualiser le build
pnpm run preview
```

### Déploiement

Le site se déploie automatiquement sur Netlify lors d'un push sur la branche `main`.

### Tests

```bash
pnpm run test              # Lancer les tests
pnpm run test:watch        # Mode watch
pnpm run test:coverage     # Rapport de couverture
```

## 6. Configuration

### Modifier les informations personnelles

Éditer `src/config/site.ts` pour changer :
- Nom, email, téléphone, localisation
- Liens sociaux (LinkedIn, GitHub, portfolio)
- Mots-clés SEO
- Couleur du thème

### Modifier les couleurs du design

Les CSS variables sont dans `src/styles/global.css` sous `:root, [data-theme="lumon"]`.

Couleurs principales :
- `--color-accent-green: #7da17e` — accent vert
- `--color-dark: #163f38` — texte sombre
- `--color-neutral: #f7f6f9` — fond

## 7. Dépannage

### Erreurs courantes

| Erreur | Cause | Solution |
|--------|-------|----------|
| `CV content not found` | Le fichier `src/content/cv/cv.md` n'existe pas ou est mal nommé | Vérifier que le fichier existe et que le frontmatter est valide |
| Icônes manquantes | L'API Iconify est injoignable ou l'icône n'existe pas | Vérifier la connexion internet ; vérifier le nom de l'icône sur [icon-sets.iconify.design](https://icon-sets.iconify.design) |
| Build timeout | Les fetch vers l'API Iconify dans ExperienceCard/CVCard bloquent | Vérifier la connexion ; les icônes sont fetchées au build |
| Formulaire ne s'envoie pas | Le site n'est pas déployé sur Netlify (Forms nécessite Netlify) | Le formulaire de contact ne fonctionne qu'en production sur Netlify |
| Styles cassés | Conflit Tailwind v3 config / v4 PostCSS | S'assurer que `postcss.config.mjs` utilise `@tailwindcss/postcss` |

### Vérification du contenu

```bash
# Vérifier les changements de contenu
pnpm run content:check

# Surveiller les changements en continu
pnpm run content:watch
```

## 8. FAQ

**Q : Comment changer le thème visuel ?**
R : Modifier `theme: "lumon"` par `theme: "atari"` dans le frontmatter de `src/content/cv/cv.md`.

**Q : Comment ajouter une nouvelle expérience ?**
R : Ajouter un bloc `### Entreprise` dans la section `## Expériences` de `cv.md`, en suivant le format existant. Ne pas oublier le format `**Rôle** | Période | [Company Link](url)`.

**Q : Comment ajouter un nouveau set d'icônes ?**
R : Ajouter le set dans le type `IconSet` (`src/types/icons.ts`), mettre à jour les mappings dans `ICON_MAPPINGS`, et ajouter le set dans `isValidIconSet()` de `iconEngine.ts`.

**Q : Le PDF est-il généré automatiquement ?**
R : Non. Le fichier `public/cv_mathieu_drouet.pdf` est statique et doit être mis à jour manuellement.

**Q : Comment fonctionne la détection "poste actuel" ?**
R : Le parser vérifie si la période contient "2025" (`cvParser.ts:408`). Cette valeur devra être mise à jour chaque année ou remplacée par une logique dynamique.
