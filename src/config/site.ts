/**
 * Site configuration
 * Centralized configuration for the CV website
 */

export const siteConfig = {
  // Site Information
  name: "CV Mathieu Drouet",
  title: "Mathieu Drouet - Senior Product Manager",
  description: "CV de Mathieu Drouet, Senior Product Manager avec plus de 10 ans d'expérience en gestion de produits numériques et transformation digitale.",
  url: "https://cv.mathieu-drouet.com",
  
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
      url: "https://linkedin.com/in/mathieu-drouet",
      handle: "linkedin.com/in/mathieu-drouet"
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
      "UX Strategy"
    ],
    locale: "fr_FR",
    themeColor: "#0751cf"
  }
} as const;

export type SiteConfig = typeof siteConfig;