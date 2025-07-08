# Zed Theme Package

Ce dossier contient tous les éléments nécessaires pour appliquer le style graphique de Zed.dev à d'autres projets.

## 📁 Structure

```
zed-theme/
├── ZED.md                    # Guide complet du style graphique
├── README.md                 # Ce fichier
└── assets/
    ├── logo_blue_no_gradient_padded.svg  # Logo principal
    ├── stable-app-logo.png              # Logo version stable
    ├── preview-app-logo.png             # Logo version preview
    ├── noise.png                        # Texture de bruit
    ├── d30de15fc435a504.css             # Polices CSS
    ├── f377b4ee2d56802f.css             # Styles principaux CSS
    └── fonts/
        ├── 0ad30d1b4531f9e9-s.p.woff2   # Agrandir Light
        ├── b1846daa82471f57-s.p.woff2   # Agrandir Light Italic
        ├── 64b7d03ab5ef000d-s.p.woff2   # Agrandir Regular
        ├── eea37e7ecdfe969d-s.p.woff2   # Agrandir Regular Italic
        ├── a59897eca4c0e06d-s.p.woff2   # Agrandir Bold
        ├── 3a30c733247faf0b-s.p.woff2   # Agrandir Bold Italic
        ├── 179d7f9da167b110-s.p.woff2   # Writer Regular
        ├── 1041824d5f477f6b-s.p.woff2   # Writer Regular Italic
        ├── af04a9c2068a2eb2-s.p.woff2   # Writer Bold
        ├── a08768ff0b9f433b-s.p.woff2   # Writer Bold Italic
        └── 0fb30d387ad01f2e-s.p.woff2   # Lora Variable
```

## 🚀 Utilisation

### 1. Documentation complète
Consultez `ZED.md` pour :
- Guide typographique complet
- Palette de couleurs et thèmes
- Composants UI et layouts
- Bonnes pratiques de design

### 2. Assets graphiques
- Logos vectoriels et raster disponibles
- Texture de bruit pour effets subtils
- Polices web optimisées (WOFF2)

### 3. CSS et styles
- Fichiers CSS minifiés contenant tous les styles
- Variables CSS pour les couleurs et espacements
- Classes utilitaires Tailwind

## 📋 Intégration rapide

### Import des polices
```css
/* Intégrer les polices dans votre CSS */
@font-face {
  font-family: 'Agrandir';
  src: url('./assets/fonts/64b7d03ab5ef000d-s.p.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}
```

### Variables de couleurs
```css
:root {
  --color-accent-blue: #0751cf;
  --color-neutral: #f6f4ef;
  --color-offgray-800: #4c5461;
}
```

### Classes de titres
```css
.h1 {
  font-size: clamp(1.85rem, 1.3rem + 2.5vw, 2.15rem);
  letter-spacing: -0.02em;
  line-height: 1.2;
}
```

## 🎨 Éléments clés du design

- **Polices** : Agrandir (interface), Writer (contenu), Lora (éditorial)
- **Couleur principale** : #0751cf (bleu Zed)
- **Palettes** : Cream (tons chauds), OffGray (tons neutres)
- **Style** : Moderne, épuré, responsive
- **Framework** : Tailwind CSS v4.0.0-beta.5

## 📞 Support

Pour toute question sur l'utilisation de ce thème, référez-vous au guide complet dans `ZED.md`.