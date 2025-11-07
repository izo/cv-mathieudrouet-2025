/**
 * Site configuration
 * Centralized configuration for the CV website
 */

export const siteConfig = {
  // Site Information
  name: "CV Mathieu Drouet",
  title: "Mathieu Drouet - Senior Product Manager",
  description: "Senior Product Manager à Lille | 10+ ans d'expérience en transformation digitale, stratégie UX et gestion de produits numériques | Contactez-moi",
  url: "https://cv.drouet.io",
  
  // Personal Information
  author: {
    name: "Mathieu Drouet",
    email: "mathieu@drouet.io",
    phone: "+33767144874",
    location: "Lille, France",
    jobTitle: "Senior Product Manager",
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
      "Senior Product Manager",
      "Product Management",
      "CV",
      "Mathieu Drouet",
      "Lille",
      "France",
      "Digital Transformation",
      "UX Strategy",
      "Product Manager Lille",
      "PM Hauts-de-France",
      "Gestion produit numérique",
      "Transformation digitale B2B",
      "Stratégie produit",
      "Agile Product Owner"
    ],
    locale: "fr_FR",
    themeColor: "#0751cf"
  }
} as const;

export type SiteConfig = typeof siteConfig;