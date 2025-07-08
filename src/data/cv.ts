export interface CVData {
  name: string;
  education: Education[];
  contact: Contact;
  interests: string[];
  experience: Experience[];
  skills: Skill[];
}

export interface Education {
  title: string;
  period: string;
  institution: string;
}

export interface Contact {
  email: string;
  portfolio: {
    text: string;
    url: string;
  };
  linkedin: string;
  location: string;
}

export interface Experience {
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  current?: boolean;
  logo?: string;
  achievements: string[];
}

export interface Skill {
  title: string;
  subtitle: string;
  level: string;
  current?: boolean;
  items: string[];
}

export const cvData: CVData = {
  name: "Mathieu Drouet",
  education: [
    {
      title: "Programmation iOS - Swift",
      period: "2022",
      institution: "Simplon.co - Lille"
    },
    {
      title: "Photographie / Histoire de l'art",
      period: "1997 - 1999",
      institution: "Institut Supérieur d'Architecture Saint-Luc"
    }
  ],
  contact: {
    email: "hello@mathieu-drouet.com",
    portfolio: {
      text: "cv.mathieu-drouet.com",
      url: "https://cv.mathieu-drouet.com"
    },
    linkedin: "linkedin.com/in/mathieu-drouet",
    location: "Lille, France"
  },
  interests: [
    "Technologies",
    "Innovation", 
    "Photographie",
    "Architecture",
    "Sport"
  ],
  experience: [
    {
      company: "CH-Studio - GEHealthcare",
      companyUrl: "https://chstudio.fr/project/plateforme-de-gestion-de-donnees-dicom/",
      role: "Senior Product Manager",
      period: "2025",
      current: true,
      logo: "/logos/ge-healtcare.png",
      achievements: [
        "Réalisé un audit stratégique de la plateforme interne Sherlock pour GE HealthCare",
        "Conduit une analyse croisée des usages (logs, sondages, interviews)",
        "Produit une cartographie des parcours utilisateurs et évaluation de la gouvernance",
        "Livré un rapport de recommandations stratégiques pour la roadmap"
      ]
    },
    {
      company: "Group Actual",
      companyUrl: "https://www.groupeactual.eu/",
      role: "Senior Product Manager",
      period: "2023 - 2024",
      logo: "/logos/actual.png",
      achievements: [
        "Développé une solution de gestion des comptes épargne-temps, réduisant le temps administratif de 25%",
        "Conçu une stratégie produit pour moderniser une application legacy DAF",
        "Encadré des équipes Agile pour aligner les objectifs métiers et techniques"
      ]
    },
    {
      company: "Bookr.fm",
      companyUrl: "https://bookr.fm/",
      role: "Senior Product Manager",
      period: "2021 - 2024",
      logo: "/logos/bookr.png",
      achievements: [
        "Conduit le développement d'un outil de gestion de festivals",
        "Supervisé la stratégie produit, le go-to-market et l'UX/UI",
        "Intégration réussie dans les workflows clients"
      ]
    },
    {
      company: "Fluidra",
      companyUrl: "https://www.fluidra.com/",
      role: "Senior Product Manager, IoT",
      period: "2018 - 2021",
      logo: "/logos/fluidra.png",
      achievements: [
        "Développé des applications iOS et Android pour Blue Connect avec Flutter",
        "Supervisé l'UX/UI, augmentant la satisfaction utilisateur de 35%",
        "Géré le lancement du produit aux États-Unis"
      ]
    }
  ],
  skills: [
    {
      title: "Product Management",
      subtitle: "Strategic Leadership",
      level: "Expert",
      current: true,
      items: [
        "Roadmap produit et stratégie go-to-market",
        "OKR et gestion d'équipes Agile",
        "User research et A/B testing"
      ]
    },
    {
      title: "Technologies",
      subtitle: "Full-Stack Development",
      level: "Advanced",
      items: [
        "HTML/CSS, Node.js, JavaScript",
        "Flutter, SwiftUI, React",
        "WordPress, Drupal, CMS"
      ]
    },
    {
      title: "Tools & Platforms",
      subtitle: "Digital Workflow",
      level: "Expert",
      items: [
        "Jira, Confluence, Notion",
        "Figma, Adobe Creative Suite",
        "VS Code, Git, CI/CD"
      ]
    },
    {
      title: "Languages",
      subtitle: "International Communication",
      level: "Fluent",
      items: [
        "Français - Langue maternelle",
        "Anglais - Professionnel",
        "Espagnol - Conversationnel"
      ]
    }
  ]
};