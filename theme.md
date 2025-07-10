# Theme System Architecture - Correction Prompt

## Objectif
Corriger et standardiser le système de thème du CV website pour obtenir une architecture cohérente et maintenable.

## Problèmes Critiques Identifiés

### 🔴 URGENT - Priorité 1

#### 1. Duplication de Composants
**Problème** : `ExperienceCard.astro` existe en 2 versions différentes
- `/src/components/ExperienceCard.astro` (58 lignes, layout complexe)
- `/src/components/mdx/ExperienceCard.astro` (50 lignes, structure différente)

**Action** : Consolider en un seul composant dans `/src/components/`

#### 2. Layouts Conflictuels
**Problème** : Architecture de layout incompatible
- `CVLayout.astro` : thème hardcodé `data-theme="zed"`, footer intégré
- `CVLayoutWithFooter.astro` : pas de thème, architecture slot-based

**Action** : Fusionner en un seul layout flexible

#### 3. Thème Hardcodé
**Problème** : `<html data-theme="zed">` empêche le changement de thème
**Action** : Rendre le thème dynamique via le ThemeSwitcher

### 🟡 MOYEN - Priorité 2

#### 4. Système de Style Fragmenté
**Problème** : 4 approches différentes coexistent
- CSS Variables (`cv-*`)
- Classes Glass (`glass-card`)
- Tailwind hardcodé (`bg-white`)
- Approches mixtes

**Action** : Standardiser sur CSS Variables + Tailwind

#### 5. Responsive Design Incohérent
**Problème** : Breakpoints différents selon les composants
- `SidebarContent.astro` : pas de responsive
- `ExperienceCard.astro` : extensive `lg:` prefixes
- `MobileSidebar.astro` : `lg:hidden` correct

**Action** : Système de breakpoints unifié

#### 6. Interfaces TypeScript Incohérentes
**Problème** : Patterns d'export différents
- Composants MDX : `export interface Props`
- Composants normaux : `interface Props`

**Action** : Standardiser tous les exports

### 🟢 MINEUR - Priorité 3

#### 7. Optimisation Performance
- Fonts externes multiples (Font Awesome CDN, Google Fonts)
- CSS bloat (516 lignes avec overrides complexes)
- Animations CSS potentiellement inutilisées

## Plan de Correction

### Phase 1 : Corrections Critiques

```bash
# 1. Consolider ExperienceCard
- Analyser les 2 versions
- Choisir la meilleure architecture
- Migrer tous les usages vers la version unique
- Supprimer la version dupliquée

# 2. Unifier les Layouts
- Fusionner CVLayout et CVLayoutWithFooter
- Rendre le thème dynamique
- Système de slots flexible
- Footer conditionnel

# 3. Fix thème hardcodé
- Modifier CVLayout.astro
- Connecter au ThemeSwitcher
- Tester le changement de thème
```

### Phase 2 : Standardisation

```bash
# 4. Système de style unifié
- Audit de tous les composants
- Migration vers CSS Variables
- Suppression des classes hardcodées
- Documentation des tokens

# 5. Responsive uniforme
- Définir les breakpoints standards
- Migrer tous les composants
- Tester sur mobile/desktop
- Guide responsive

# 6. Interfaces TypeScript
- Export de toutes les interfaces
- Typage strict
- Props communes standardisées
```

### Phase 3 : Optimisation

```bash
# 7. Performance
- Self-host des fonts
- Nettoyage CSS
- Optimisation animations
- Bundle analysis
```

## Architecture Cible

### Structure Recommandée
```
src/
├── design-system/
│   ├── tokens/           # Design tokens
│   ├── themes/           # Theme definitions
│   └── components/       # Design system components
├── components/           # Single source components
├── layouts/             # Unified layout system
└── styles/              # Minimal global styles
```

### Composant Standard
```typescript
// Interface standard
export interface ComponentProps {
  className?: string;
  children?: any;
  theme?: 'zed' | 'liquid-glass';
}

// Pattern composant
---
export interface Props extends ComponentProps {
  title: string;
  // ... props spécifiques
}

const { className, theme, ...props } = Astro.props;
---

<div class={`component-base ${className || ''}`} data-theme={theme}>
  <!-- contenu -->
</div>
```

### Système de Style Unifié
```css
/* Variables CSS pour tous les thèmes */
.component-base {
  background: var(--cv-card);
  color: var(--cv-content);
  border: 1px solid var(--cv-border);
  transition: all 0.3s ease;
}

/* Variantes thématiques */
[data-theme="zed"] .component-base {
  /* Styles spécifiques Zed */
}

[data-theme="liquid-glass"] .component-base {
  /* Styles spécifiques Liquid Glass */
}
```

## Commandes de Vérification

```bash
# Après chaque phase
npm run build          # Vérifier build
npm run astro check    # Vérifier TypeScript
npm run preview        # Tester visuellement

# Tests spécifiques
- Changement de thème fonctionnel
- Responsive sur mobile/desktop
- Performance acceptable
- Accessibilité maintenue
```

## Critères de Succès

- ✅ Un seul composant ExperienceCard
- ✅ Un seul layout flexible
- ✅ Thème dynamique fonctionnel
- ✅ Système de style cohérent
- ✅ Responsive uniforme
- ✅ Interfaces TypeScript exportées
- ✅ Performance optimale
- ✅ Note A+ (95%+) sur l'architecture

## Notes Importantes

- **Conserver** l'excellent système de variables CSS existant
- **Maintenir** l'architecture d'animation performante
- **Préserver** les patterns d'accessibilité en place
- **Tester** après chaque modification majeure
- **Documenter** les changements d'architecture

---

**Résultat attendu** : Architecture de thème cohérente, maintenable et performante pour le CV website.