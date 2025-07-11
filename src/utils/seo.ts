/**
 * SEO utilities
 * Helper functions for generating SEO meta tags and structured data
 */

import { siteConfig } from '../config/site';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noindex?: boolean;
}

/**
 * Generate complete SEO meta tags
 */
export function generateSEOMeta(props: SEOProps) {
  const {
    title = siteConfig.title,
    description = siteConfig.description,
    image = siteConfig.author.image,
    url = siteConfig.url,
    noindex = false
  } = props;

  const fullImageUrl = new URL(image, siteConfig.url).href;

  return {
    title,
    description,
    canonical: url,
    image: fullImageUrl,
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    
    // Open Graph
    og: {
      title,
      description,
      image: fullImageUrl,
      url,
      siteName: siteConfig.name,
      type: 'profile' as const,
      locale: siteConfig.seo.locale
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      image: fullImageUrl
    }
  };
}

/**
 * Generate structured data for person
 */
export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": siteConfig.author.name,
    "jobTitle": siteConfig.author.jobTitle,
    "url": siteConfig.url,
    "email": siteConfig.author.email,
    "telephone": siteConfig.author.phone,
    "image": new URL(siteConfig.author.image, siteConfig.url).href,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lille",
      "addressCountry": "France"
    },
    "sameAs": [
      siteConfig.social.linkedin.url,
      siteConfig.social.github.url,
      siteConfig.social.portfolio.url
    ],
    "knowsAbout": [
      "Product Management",
      "Digital Transformation",
      "UX Strategy", 
      "Data Analysis",
      "Team Leadership"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "CH-Studio - GEHealthcare"
    }
  };
}