# TODO - Génération PDF du CV

Guide complet pour implémenter la génération PDF du CV avec un style proche de la version web.

## 🎯 Solutions recommandées

### 1. Puppeteer (Recommandé)

Générer le PDF directement depuis la version web existante.

#### Installation
```bash
npm install puppeteer
```

#### Script de génération
```javascript
// scripts/generate-pdf.js
const puppeteer = require('puppeteer');

async function generatePDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Charger la page locale ou déployée
  await page.goto('http://localhost:4321', { 
    waitUntil: 'networkidle0' 
  });
  
  // Attendre que les icônes Iconify se chargent
  await page.waitForTimeout(2000);
  
  // Attendre que toutes les icônes soient chargées
  await page.evaluate(() => {
    return new Promise((resolve) => {
      const checkIcons = () => {
        const icons = document.querySelectorAll('[data-icon]');
        if (icons.length === 0 || Array.from(icons).every(icon => icon.innerHTML.includes('svg'))) {
          resolve();
        } else {
          setTimeout(checkIcons, 100);
        }
      };
      checkIcons();
    });
  });
  
  const pdf = await page.pdf({
    path: 'public/cv-mathieu-drouet.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      right: '15mm',
      bottom: '20mm',
      left: '15mm'
    }
  });
  
  await browser.close();
  console.log('PDF généré : public/cv-mathieu-drouet.pdf');
}

generatePDF().catch(console.error);
```

### 2. CSS Print Media Queries

Ajouter des styles spécifiques pour l'impression dans `src/styles/print.css` :

```css
/* src/styles/print.css */
@media print {
  /* Forcer les couleurs */
  * {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  body {
    background: white !important;
    color: var(--cv-content) !important;
    font-size: 10pt;
    line-height: 1.3;
  }
  
  /* Optimiser les cartes pour l'impression */
  .glass-card {
    background: white !important;
    border: 1px solid #ddd !important;
    box-shadow: none !important;
    page-break-inside: avoid;
    margin-bottom: 0.5rem !important;
    padding: 1rem !important;
  }
  
  .glass-card:hover {
    background-image: none !important;
    box-shadow: none !important;
  }
  
  /* Footer */
  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #ddd;
    padding-top: 0.5rem;
  }
  
  /* Optimiser pour A4 */
  .lumon-container {
    max-width: none;
    padding: 0;
    margin: 0;
  }
  
  /* Pagination intelligente */
  .cv-section {
    page-break-inside: avoid;
  }
  
  /* Grid responsive pour print */
  .lumon-section {
    display: block !important;
  }
  
  .glass-card {
    width: 100% !important;
    float: none !important;
    margin: 0 0 1rem 0 !important;
  }
  
  /* Optimiser la taille des polices */
  h1, .h1 { 
    font-size: 18pt !important;
    margin-bottom: 0.5rem !important;
  }
  h2, .h2 { 
    font-size: 14pt !important;
    margin-bottom: 0.3rem !important;
  }
  h3, .h3 { 
    font-size: 12pt !important;
    margin-bottom: 0.3rem !important;
  }
  p, li { 
    font-size: 9pt !important;
    margin-bottom: 0.2rem !important;
  }
  
  /* Icônes */
  svg {
    width: 12pt !important;
    height: 12pt !important;
  }
  
  /* Masquer les éléments non essentiels */
  .no-print {
    display: none !important;
  }
  
  /* Liens */
  a {
    color: var(--cv-content) !important;
    text-decoration: none !important;
  }
  
  a[href^="http"]:after {
    content: " (" attr(href) ")";
    font-size: 8pt;
    color: #666;
  }
}

/* Styles spécifiques pour les éléments du CV */
@media print {
  /* En-tête */
  header {
    text-align: center;
    margin-bottom: 1rem;
    border-bottom: 2px solid var(--cv-accent);
    padding-bottom: 0.5rem;
  }
  
  /* Expérience - une par page si nécessaire */
  .experience-card {
    page-break-inside: avoid;
    page-break-after: auto;
  }
  
  /* Compétences en colonnes */
  .skills-grid {
    column-count: 2;
    column-gap: 1rem;
    column-fill: balance;
  }
  
  .skills-grid .glass-card {
    break-inside: avoid;
    margin-bottom: 0.5rem;
  }
}
```

### 3. Script NPM automatisé

Ajouter dans `package.json` :

```json
{
  "scripts": {
    "pdf": "node scripts/generate-pdf.js",
    "pdf:dev": "npm run dev & sleep 5 && node scripts/generate-pdf.js && pkill -f 'astro dev'",
    "pdf:build": "npm run build && npm run preview & sleep 3 && node scripts/generate-pdf.js && pkill -f 'astro preview'"
  }
}
```

### 4. Solution avec Playwright (Alternative)

Plus moderne que Puppeteer :

#### Installation
```bash
npm install @playwright/test
```

#### Script
```javascript
// scripts/generate-pdf-playwright.js
const { chromium } = require('@playwright/test');

async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Attendre que la page soit complètement chargée
  await page.goto('http://localhost:4321');
  await page.waitForLoadState('networkidle');
  
  // Attendre les icônes Iconify
  await page.waitForFunction(() => {
    const icons = document.querySelectorAll('div[set\\:html]');
    return Array.from(icons).every(icon => icon.innerHTML.includes('svg'));
  }, { timeout: 10000 });
  
  await page.pdf({
    path: 'public/cv-mathieu-drouet.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      right: '15mm', 
      bottom: '20mm',
      left: '15mm'
    }
  });
  
  await browser.close();
  console.log('PDF généré avec Playwright : public/cv-mathieu-drouet.pdf');
}

generatePDF().catch(console.error);
```

## 🔧 Optimisations spécifiques

### Gestion des icônes Iconify

```javascript
// Fonction pour attendre le chargement complet des icônes
async function waitForIconify(page) {
  await page.evaluate(() => {
    return new Promise((resolve) => {
      const checkIcons = () => {
        // Vérifier toutes les divs avec set:html qui contiennent des icônes
        const iconContainers = document.querySelectorAll('div[set\\:html]');
        const allLoaded = Array.from(iconContainers).every(container => {
          return container.innerHTML.includes('<svg');
        });
        
        if (allLoaded || iconContainers.length === 0) {
          resolve();
        } else {
          setTimeout(checkIcons, 100);
        }
      };
      checkIcons();
    });
  });
}
```

### Import des styles print

Ajouter dans `src/layouts/CVLayout.astro` :

```astro
---
import '../styles/global.css';
import '../styles/print.css'; // Ajouter cette ligne
// ... reste du code
---
```

## 📋 Plan d'implémentation

### Phase 1 : Configuration de base
- [ ] Installer Puppeteer : `npm install puppeteer`
- [ ] Créer le dossier `scripts/`
- [ ] Créer `scripts/generate-pdf.js`
- [ ] Ajouter les scripts NPM dans `package.json`

### Phase 2 : Styles print
- [ ] Créer `src/styles/print.css`
- [ ] Importer les styles print dans `CVLayout.astro`
- [ ] Tester l'aperçu print dans le navigateur (`Ctrl+P`)

### Phase 3 : Script de génération
- [ ] Implémenter la génération PDF avec Puppeteer
- [ ] Ajouter la gestion des icônes Iconify
- [ ] Optimiser les marges et la mise en page A4

### Phase 4 : Optimisations
- [ ] Tester différentes tailles de police
- [ ] Ajuster la pagination pour éviter les coupures
- [ ] Optimiser la gestion des liens et URLs
- [ ] Ajouter la génération automatique lors du build

### Phase 5 : Automatisation
- [ ] Intégrer dans le workflow de déploiement
- [ ] Générer automatiquement le PDF lors des changements
- [ ] Ajouter le lien de téléchargement sur le site

## 🎯 Résultat attendu

- **PDF haute qualité** avec toutes les icônes Carbon
- **Mise en page A4** professionnelle
- **Cohérence visuelle** avec la version web
- **Génération automatisée** via script NPM
- **Optimisation print** avec styles dédiés

## 💡 Notes supplémentaires

### Alternatives à considérer
- **jsPDF** : Pour plus de contrôle sur la mise en page
- **React-PDF** : Si migration vers React
- **WeasyPrint** : Solution Python pour des besoins avancés

### Bonnes pratiques
- Toujours tester le PDF sur différents devices
- Vérifier que toutes les icônes sont présentes
- S'assurer que les liens restent fonctionnels
- Optimiser pour l'impression couleur ET noir & blanc

### Commandes utiles
```bash
# Générer le PDF en développement
npm run pdf:dev

# Générer le PDF après build
npm run pdf:build

# Test d'impression dans le navigateur
# Aller sur localhost:4321 et faire Ctrl+P
```