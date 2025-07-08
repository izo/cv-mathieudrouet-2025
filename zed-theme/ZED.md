# ZED.md - Guide de Style Graphique

Ce document fournit toutes les informations nécessaires pour permettre à un designer de reprendre le design du site Zed.dev pour d'autres parties du site.

## 📚 Table des Matières

1. [Vue d'ensemble du système](#vue-densemble-du-système)
2. [Typographie](#typographie)
3. [Couleurs et thèmes](#couleurs-et-thèmes)
4. [Logos et iconographie](#logos-et-iconographie)
5. [Composants UI](#composants-ui)
6. [Layouts et grilles](#layouts-et-grilles)
7. [Animations et effets](#animations-et-effets)
8. [Assets visuels](#assets-visuels)
9. [Bonnes pratiques](#bonnes-pratiques)

## 🎨 Vue d'ensemble du système

### Framework technique
- **Framework CSS**: Tailwind CSS v4.0.0-beta.5
- **Architecture**: Next.js avec export statique
- **Variables CSS**: Système de design tokens complet
- **Responsive**: Mobile-first avec breakpoints standards

### Philosophie de design
- Design moderne et épuré
- Priorité à la lisibilité et l'ergonomie
- Support des thèmes clair/sombre
- Performance et optimisation

## ✍️ Typographie

### Polices principales

#### 1. Agrandir (Police principale)
```css
font-family: "__agrandir_24f3dc", "__agrandir_Fallback_24f3dc"
```
**Graisses disponibles :**
- Light (200) - Normal et Italic
- Regular (400) - Normal et Italic  
- Bold (700) - Normal et Italic

**Usage :** Titres, textes de mise en valeur, interface utilisateur

#### 2. Writer (Police secondaire)
```css
font-family: "__writer_1deb74", "__writer_Fallback_1deb74"
```
**Graisses disponibles :**
- Regular (400) - Normal et Italic
- Bold (700) - Normal et Italic

**Usage :** Textes de contenu, descriptions

#### 3. Lora (Police serif)
```css
font-family: "__lora_1fc044", "__lora_Fallback_1fc044"
```
**Graisses disponibles :**
- Variable (400-700)

**Usage :** Blog, articles, contenu éditorial

### Hiérarchie typographique

#### Classes de titres personnalisées

```css
/* Super titre */
.h0 {
  font-size: clamp(2.25rem, 1.5rem + 2.5vw, 3rem);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* Titre principal */
.h1 {
  font-size: clamp(1.85rem, 1.3rem + 2.5vw, 2.15rem);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

/* Titre section */
.h2 {
  font-size: clamp(1.5rem, 1.2rem + 1vw, 1.7rem);
  letter-spacing: -0.005em;
  line-height: 1.25;
}

/* Titre sous-section */
.h3 {
  font-size: clamp(1.15rem, 1rem + 0.75vw, 1.35rem);
  letter-spacing: -0.005em;
  line-height: 1.3;
}

/* Titre de groupe */
.h4 {
  font-size: clamp(1.125rem, 0.9rem + 0.75vw, 1.15rem);
  letter-spacing: -0.005em;
  line-height: 1.2;
}

/* Petit titre */
.h5 {
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.2rem);
  letter-spacing: -0.005em;
  line-height: 1.1;
}

/* Très petit titre */
.h6 {
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.1rem);
  letter-spacing: -0.005em;
  line-height: 1.1;
}

/* Sous-titre / étiquette */
.subheader {
  font-family: var(--font-mono);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  font-size: 0.6875rem;
}
```

#### Tailles de texte standard

```css
--text-body: 16px;
--text-body--line-height: 144%;
--text-caption: 14px;
--text-caption--line-height: 144%;
```

## 🎨 Couleurs et thèmes

### Palette de couleurs personnalisées

#### Couleurs de marque

```css
/* Couleur principale */
--color-accent-blue: #0751cf;

/* Couleur neutre */
--color-neutral: #f6f4ef;
```

#### Palette Cream (tons chauds)

```css
--color-cream-50: #f5f4ef;   /* Très clair */
--color-cream-100: #e8e6d9;  /* Clair */
--color-cream-200: #d9d5bf;  /* Moyen clair */
--color-cream-300: #cfcaaf;  /* Moyen */
--color-cream-400: #bab38c;  /* Moyen foncé */
--color-cream-500: #aba273;  /* Base */
--color-cream-600: #998f5c;  /* Foncé */
--color-cream-700: #80774d;  /* Plus foncé */
--color-cream-800: #665f3d;  /* Très foncé */
--color-cream-900: #4c472e;  /* Extrêmement foncé */
```

#### Palette OffGray (tons gris)

```css
--color-offgray-50: #f1f2f4;    /* Très clair */
--color-offgray-100: #dddfe4;   /* Clair */
--color-offgray-200: #c6cad2;   /* Moyen clair */
--color-offgray-300: #b8bdc7;   /* Moyen */
--color-offgray-400: #98a0ae;   /* Moyen foncé */
--color-offgray-500: #818b9c;   /* Base */
--color-offgray-600: #6c7689;   /* Foncé */
--color-offgray-700: #5a6372;   /* Plus foncé */
--color-offgray-800: #4c5461;   /* Très foncé */
--color-offgray-900: #363b45;   /* Extrêmement foncé */
--color-offgray-950: #22252b;   /* Ultra foncé */
--color-offgray-1000: #0b0c0e;  /* Noir presque pur */
```

### Système de thèmes

#### Thème clair (html.light)

```css
html.light {
  --sh-default: 6px 6px 0 #074dcf0f, -6px -6px 0 #074dcf0f;
  --sh-alt: 6px 6px 0 #074dcf0f;
  --sh-alt-opposite: -6px -6px 0 #074dcf0f;
  --nav-bg-color: #f7f7f2f5;
}
```

#### Thème sombre (html.dark)

```css
html.dark {
  --sh-default: 5px 5px 0 #3d7df51a, -5px -5px 0 #3a7df826;
  --sh-alt: 5px 5px 0 #3d7df514;
  --sh-alt-opposite: -5px -5px 0 #3d7df514;
  --nav-bg-color: #15171bf2;
}
```

#### Couleur de corps de texte

```css
body, html {
  color: var(--color-offgray-800);
  text-rendering: geometricPrecision !important;
  -webkit-font-smoothing: antialiased !important;
}
```

#### Sélection de texte

```css
::selection {
  color: #201e13;
  background-color: #eceadf;
}
```

## 🏷️ Logos et iconographie

### Logo principal

**Fichier :** `logo_blue_no_gradient_padded.svg`
**Couleur :** #084CCF (bleu Zed)
**Format :** SVG vectoriel (1524x1524)
**Usage :** Logo principal dans l'interface

### Icônes d'applications

- **stable-app-logo.png** - Logo version stable
- **preview-app-logo.png** - Logo version preview

### Principe de design du logo

Le logo Zed utilise un design géométrique avec :
- Formes rectangulaires imbriquées
- Couleur bleue distinctive (#084CCF)
- Style minimaliste et moderne
- Excellente lisibilité à toutes tailles

## 🧩 Composants UI

### Système de grille

#### Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

#### Conteneurs

```css
--container-3xs: 16rem;  /* 256px */
--container-2xs: 18rem;  /* 288px */
--container-xs: 20rem;   /* 320px */
--container-sm: 24rem;   /* 384px */
--container-md: 28rem;   /* 448px */
--container-lg: 32rem;   /* 512px */
--container-xl: 36rem;   /* 576px */
--container-2xl: 42rem;  /* 672px */
--container-3xl: 48rem;  /* 768px */
--container-4xl: 56rem;  /* 896px */
--container-5xl: 64rem;  /* 1024px */
--container-6xl: 72rem;  /* 1152px */
--container-7xl: 80rem;  /* 1280px */
```

#### Grille Tailwind

Le système utilise les classes grid standards de Tailwind :
- `col-span-1` à `col-span-5`
- `col-span-full`
- `row-span-2`

### Espacements

```css
--spacing: 0.25rem;  /* Base : 4px */
```

### Rayons de bordure

```css
--radius-xs: 0.125rem;   /* 2px */
--radius-sm: 0.25rem;    /* 4px */
--radius-md: 0.375rem;   /* 6px */
--radius-lg: 0.5rem;     /* 8px */
--radius-xl: 0.75rem;    /* 12px */
--radius-2xl: 1rem;      /* 16px */
--radius-3xl: 1.5rem;    /* 24px */
--radius-4xl: 2rem;      /* 32px */
```

### Ombres

#### Ombres standard

```css
--shadow-2xs: 0 1px #0000000d;
--shadow-xs: 0 1px 2px 0 #0000000d;
--shadow-sm: 0 1px 3px 0 #0000001a, 0 1px 2px -1px #0000001a;
--shadow-md: 0 4px 6px -1px #0000001a, 0 2px 4px -2px #0000001a;
--shadow-lg: 0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a;
--shadow-xl: 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a;
--shadow-2xl: 0 25px 50px -12px #00000040;
```

#### Ombres intérieures

```css
--inset-shadow-2xs: inset 0 1px #0000000d;
--inset-shadow-xs: inset 0 1px 1px #0000000d;
--inset-shadow-sm: inset 0 2px 4px #0000000d;
```

## 🎭 Animations et effets

### Transitions par défaut

```css
--default-transition-duration: 0.15s;
--default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
```

### Courbes d'animation

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### Animations personnalisées

```css
--animate-blink: blink 1s step-end infinite;
--animate-spin-slow: spin 32s linear infinite;
--animate-spin-much-slower: spin 64s linear infinite;
--animate-marquee: marquee 55s linear infinite;
--animate-marquee-reverse: marquee-reverse 55s linear infinite;
--animate-marquee-vertical: marquee-vertical 35s linear infinite;

/* Animations de dialogue */
--animate-dialogOverlayShow: dialogOverlayShow 0.15s cubic-bezier(0.16, 1, 0.3, 1);
--animate-dialogContentShow: dialogContentShow 0.15s cubic-bezier(0.16, 1, 0.3, 1);

/* Animations de mise à l'échelle */
--animate-scaleIn: scaleIn 0.1s ease;
--animate-scaleOut: scaleOut 0.1s ease;
--animate-fadeIn: fadeIn 0.1s ease;
--animate-fadeOut: fadeOut 0.1s ease;
```

### Effet de flou

```css
--blur-xs: 4px;
--blur-sm: 8px;
--blur-md: 12px;
--blur-lg: 16px;
--blur-xl: 24px;
--blur-2xl: 40px;
--blur-3xl: 64px;
```

## 🖼️ Assets visuels

### Structure des images

Le site organise ses assets dans `/img/` avec les dossiers suivants :

#### Fonctionnalités principales
- `/agentic/` - Images pour les fonctionnalités IA
- `/assistant/` - Screenshots de l'assistant
- `/collaboration/` - Images de collaboration
- `/debugger/` - Visuels du débogueur
- `/edit-prediction/` - Prédiction d'édition
- `/features/` - Screenshots des fonctionnalités
- `/git/` - Interface Git
- `/remote-development/` - Développement distant

#### Blog et contenu
- `/post/` - Images d'articles de blog (organisées par article)
- `/2024-recap/` - Récapitulatif 2024

#### Formats d'images
- **WebP** pour les images optimisées web
- **PNG** pour les screenshots et interfaces
- **JPG** pour les photos
- **SVG** pour les icônes et logos

### Ratios d'aspect

```css
--aspect-video: 16/9;
--aspect-ratio-lottie: 1.78;
--aspect-ratio-feature-video: 1664/1080;
```

### Texture de bruit

Le site utilise une texture `noise.png` pour ajouter de la subtilité visuelle.

## ✅ Bonnes pratiques

### Utilisation des couleurs

1. **Couleur primaire** : Utilisez `--color-accent-blue` (#0751cf) pour les éléments interactifs
2. **Couleurs neutres** : Privilégiez la palette `offgray` pour les textes et interfaces
3. **Couleurs chaudes** : Utilisez la palette `cream` pour les fonds et éléments décoratifs
4. **Contraste** : Respectez les ratios de contraste WCAG pour l'accessibilité

### Typographie

1. **Hiérarchie** : Utilisez les classes `.h0` à `.h6` pour une hiérarchie cohérente
2. **Espacement** : Respectez les `letter-spacing` négatifs pour les gros titres
3. **Lisibilité** : Maintenez des `line-height` appropriés selon la taille
4. **Police principale** : Agrandir pour l'interface, Writer pour le contenu, Lora pour l'éditorial

### Layouts

1. **Responsive** : Utilisez `clamp()` pour des tailles fluides
2. **Grille** : Privilégiez CSS Grid avec les classes Tailwind
3. **Espacements** : Utilisez le système de spacing basé sur `0.25rem`
4. **Conteneurs** : Respectez les largeurs max définies

### Animations

1. **Performance** : Animez uniquement `transform` et `opacity`
2. **Durée** : Utilisez `0.15s` par défaut
3. **Courbes** : Privilégiez `ease-out` pour l'entrée, `ease-in` pour la sortie
4. **Réduction mouvement** : Respectez `prefers-reduced-motion`

### Accessibilité

1. **Couleurs** : Ne pas utiliser la couleur seule pour transmettre l'information
2. **Focus** : Maintenir des styles de focus visibles
3. **Alt text** : Descriptions alternatives pour toutes les images
4. **Sémantique** : Utiliser les balises HTML appropriées

---

*Ce guide doit être consulté pour maintenir la cohérence visuelle du site Zed.dev lors de l'ajout de nouvelles sections ou fonctionnalités.*