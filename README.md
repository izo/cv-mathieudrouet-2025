# 👋 Mathieu Drouet - CV Digital

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-cv.drouet.io-brightgreen)](https://cv.drouet.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)](https://www.typescriptlang.org/)
[![Astro](https://img.shields.io/badge/Astro-5.11.1-orange)](https://astro.build/)
[![Performance](https://img.shields.io/badge/Performance-A+-brightgreen)](https://cv.drouet.io)
[![Accessibility](https://img.shields.io/badge/Accessibility-95%25-green)](https://cv.drouet.io)

> **Senior Product Manager** avec 10+ ans d'expérience en transformation digitale et gestion de produits numériques. Spécialisé dans l'architecture produit, l'UX/UI, et le leadership d'équipes techniques.

[![Netlify Status](https://api.netlify.com/api/v1/badges/4d2e69c4-79a9-4295-a56d-22f488a99b60/deploy-status)](https://app.netlify.com/projects/cvdrouet/deploys)

## 🚀 À Propos

Ce repository contient le code source de mon CV digital, développé avec des technologies modernes pour démontrer mes compétences techniques et ma vision du développement web performant.

### 💼 Profil Professionnel

- **Senior Product Manager** chez GE HealthCare
- **10+ années d'expérience** en transformation digitale
- **Expert en architecture produit** et stratégie UX/UI
- **Leader d'équipes techniques** multidisciplinaires
- **Spécialiste en performance web** et optimisation

### 🎯 Domaines d'Expertise

```
🔧 Product Management    🎨 UX/UI Design        📊 Data Analytics
🚀 Digital Transformation 🏗️ System Architecture  👥 Team Leadership
⚡ Performance Optimization 🔍 User Research      📈 Growth Strategy
```

## 🛠️ Stack Technique

### Core Technologies
- **[Astro 5.11.1](https://astro.build/)** - Framework moderne pour sites statiques ultra-performants
- **[TypeScript](https://www.typescriptlang.org/)** - Développement type-safe et maintenable
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first avec design system personnalisé
- **[Vitest](https://vitest.dev/)** - Testing framework rapide et moderne

### Architecture & Performance
- **Design System Lumon** - Système de design cohérent avec palette verte
- **Content Security Policy** - Sécurité renforcée avec CSP headers
- **Service Worker** - Mise en cache intelligente pour performances optimales
- **Responsive Design** - Mobile-first avec breakpoints optimisés
- **Iconify Integration** - Système d'icônes moderne avec CDN optimisé

### Performance Metrics
```
📊 Bundle Size:    31KB CSS + 0KB JS
⚡ Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
🎯 Lighthouse:     95+/100 (Performance, Accessibility, SEO)
📱 Mobile-First:   Responsive design optimisé
```

## 🏗️ Architecture Technique

### Structure du Projet
```
src/
├── components/          # Composants réutilisables
│   ├── ExperienceCard.astro    # Affichage expérience pro
│   ├── cv/                     # Composants spécifiques CV
│   └── audit/                  # Système d'audit intégré
├── content/            # Gestion de contenu
│   └── cv/            # Contenu CV en Markdown
├── layouts/           # Layouts de pages
│   └── BaseLayout.astro       # Layout principal avec CSP
├── config/            # Configuration
│   ├── site.ts               # Configuration du site
│   └── env.ts                # Variables d'environnement
├── utils/             # Utilitaires
│   ├── cvParser.ts           # Parser Markdown dynamique
│   └── auditSystem.ts        # Système d'audit automatisé
└── styles/            # Styles globaux
    └── global.css            # Design system Lumon
```

### Fonctionnalités Avancées
- **Parser Markdown Dynamique** - Conversion automatique du contenu CV
- **Système d'Audit Intégré** - Monitoring qualité, sécurité, performance
- **Détection de Changements** - Rebuild intelligent basé sur les modifications
- **Optimisation d'Images** - Lazy loading et préchargement stratégique
- **PWA Ready** - Service Worker pour performance offline

## 🚀 Démarrage Rapide

```bash
# Installation des dépendances
pnpm install

# Serveur de développement
pnpm run dev

# Build de production
pnpm run build

# Tests
pnpm run test

# Audit qualité
pnpm run audit
```

## 📊 Système d'Audit Intégré

Le projet inclut un système d'audit automatisé évaluant :

- **Qualité de Code** - Architecture, maintenabilité, conventions
- **Sécurité** - CSP, headers, vulnérabilités
- **Performance** - Bundle size, Core Web Vitals, optimisations
- **Accessibilité** - WCAG compliance, navigation clavier
- **SEO** - Meta tags, structure sémantique

```bash
# Lancer un audit complet
pnpm run audit

# Audit en mode watch
pnpm run audit:watch

# Exporter le rapport
pnpm run audit:export
```

## 🎨 Design System Lumon

### Palette de Couleurs
```css
/* Lumon Green Palette */
--color-accent-green: #7da17e;     /* Accent principal */
--color-green-300: #98b6b0;       /* Accent secondaire */
--color-neutral: #f7f6f9;         /* Fond neutre */
--color-dark: #163f38;            /* Texte sombre */
--color-light-blue: #d6e0e2;      /* Bleu clair */
```

### Typographie
- **IBM Plex Sans** - Police principale (400, 500, 600, 700)
- **IBM Plex Mono** - Police monospace pour code
- **Lora** - Police serif pour titres élégants

### Composants
- **Glass Morphism** - Effets de transparence et flou
- **Mobile-First** - Design responsive optimisé
- **Accessibility** - WCAG 2.1 AA compliant
- **Performance** - CSS optimisé, 0 JavaScript

## 🔒 Sécurité & Performance

### Content Security Policy
```
script-src 'self' 'unsafe-inline' https://code.iconify.design
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com
connect-src 'self' https://api.iconify.design https://api.simplesvg.com
```

### Optimisations
- **Chargement Asynchrone** - Google Fonts avec fallback
- **Mise en Cache Intelligente** - Service Worker optimisé
- **Compression** - Assets minifiés et compressés
- **Lazy Loading** - Images et ressources à la demande

## 📱 Responsive Design

### Breakpoints
```scss
// Mobile First
sm: 640px   // Tablette
md: 768px   // Tablette large
lg: 1024px  // Desktop
xl: 1280px  // Desktop large
```

### Fonctionnalités Mobile
- **Navigation Optimisée** - Interface tactile intuitive
- **Cartes Responsives** - Layouts adaptés aux écrans
- **Performance Mobile** - Optimisé pour 3G/4G
- **Touch-Friendly** - Zones tactiles >= 44px

## 🎯 Pourquoi Ce Choix Technique ?

### Démonstration de Compétences
En tant que **Product Manager technique**, ce projet illustre :

- **Vision Produit** - Architecture scalable et maintenable
- **Excellence Technique** - Stack moderne et performant
- **User Experience** - Design responsive et accessible
- **Performance** - Optimisations poussées (31KB total)
- **Qualité** - Tests, audit, monitoring intégré
- **Leadership** - Bonnes pratiques et documentation

### Philosophie de Développement
```
Performance > Fonctionnalités
Accessibilité > Esthétique
Maintenabilité > Complexité
Sécurité > Commodité
```

## 📈 Métriques de Qualité

| Metric | Score | Status |
|--------|-------|--------|
| **Performance** | 95+ | ✅ Excellent |
| **Accessibility** | 95% | ✅ Excellent |
| **SEO** | 100 | ✅ Parfait |
| **Bundle Size** | 31KB | ✅ Optimal |
| **Core Web Vitals** | All Green | ✅ Excellent |
| **TypeScript** | 100% | ✅ Type-safe |

## 🤝 Contact Professionnel

**Mathieu Drouet**  
Senior Product Manager | Digital Transformation Expert

- 🌐 **Site Web**: [cv.drouet.io](https://cv.drouet.io)
- 💼 **LinkedIn**: [linkedin.com/in/mathieu-drouet](https://linkedin.com/in/mathieu-drouet)
- 📧 **Email**: [mathieu@drouet.io](mailto:mathieu@drouet.io)
- 📱 **Téléphone**: +33 7 67 14 48 74
- 📍 **Localisation**: Lille, France

---

## 🔧 Développement & Contribution

### Commandes Utiles
```bash
# Développement
pnpm run dev              # Serveur de développement
pnpm run build:watch      # Build avec watch des contenus

# Tests & Qualité
pnpm run test:watch       # Tests en mode watch
pnpm run test:ui          # Interface de test
pnpm run test:coverage    # Rapport de couverture

# Audit & Monitoring
pnpm run audit            # Audit complet
pnpm run audit:watch      # Audit en continu
pnpm run audit:export     # Export rapport markdown
```

### Standards de Code
- **TypeScript Strict** - Type safety maximale
- **ESLint + Prettier** - Formatting et linting
- **Conventional Commits** - Messages de commit structurés
- **Tests** - Coverage minimum 80%

---

<div align="center">

**🚀 Développé avec passion et expertise technique**

*Ce CV digital démontre mon approche du Product Management : allier excellence technique, performance, et expérience utilisateur exceptionnelle.*

**⭐ Star ce repo si vous appréciez l'approche technique !**

</div>