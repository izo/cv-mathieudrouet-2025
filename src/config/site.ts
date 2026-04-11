/**
 * Site configuration
 * Centralized configuration for the CV website
 */

export const siteConfig = {
  // Site Information
  name: "CV Mathieu Drouet",
  title: "Mathieu Drouet — Head of Product | AI-Augmented Delivery",
  description: "Head of Product avec 10+ ans d'expérience en produits numériques B2B complexes. Discovery terrain, modernisation de systèmes legacy, intégration IA. Fondateur de regrets.app.",
  url: "https://cv.drouet.io",

  // Personal Information
  author: {
    name: "Mathieu Drouet",
    email: "m@mdr.cool",
    phone: "+33767144874",
    location: "Lille, France",
    jobTitle: "Head of Product | AI-Augmented Delivery",
    image: "/profile.jpg"
  },
  
  // Social Links
  social: {
    linkedin: {
      url: "https://www.linkedin.com/in/mathieudrouet/",
      handle: "linkedin.com/in/mathieudrouet"
    },
    github: {
      url: "https://github.com/izo",
      handle: "github.com/izo"
    },
    portfolio: {
      url: "https://mathieu-drouet.com",
      text: "mathieu-drouet.com"
    }
  },
  
  // SEO Configuration
  seo: {
    keywords: [
      "Head of Product",
      "Product Manager",
      "AI Product",
      "Mathieu Drouet",
      "Lille",
      "France",
      "AI-Augmented Delivery",
      "Claude Code",
      "Product Management B2B",
      "Discovery terrain",
      "Transformation digitale",
      "IoT Product Manager",
      "Stratégie produit",
      "regrets.app"
    ],
    locale: "fr_FR",
    themeColor: "#163f38"
  }
} as const;

export type SiteConfig = typeof siteConfig;