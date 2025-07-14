// CV Parser utility to extract structured data from Markdown
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

// Helper to parse CV content from Markdown
export function parseCVContent(content: string, frontmatterData?: any): CVData {
  // Use frontmatter data from Astro Content Collections
  const name = frontmatterData?.name || 'Mathieu Drouet';
  
  // Parse education section
  const educationMatches = content.match(/## Education\n\n([\s\S]*?)(?=\n## )/);
  const education: Education[] = [];
  if (educationMatches) {
    const eduContent = educationMatches[1];
    const eduBlocks = eduContent.split(/(?=### )/);
    eduBlocks.forEach(block => {
      const titleMatch = block.match(/### (.*)/);
      const periodMatch = block.match(/\*\*(.*?)\*\*/);
      const institutionMatch = block.match(/\*\*.*?\*\*\n(.*)/);
      
      if (titleMatch && periodMatch && institutionMatch) {
        education.push({
          title: titleMatch[1],
          period: periodMatch[1],
          institution: institutionMatch[1]
        });
      }
    });
  }

  // Parse contact info
  const contactMatch = content.match(/## Contact Info\n\n([\s\S]*?)(?=\n## )/);
  const contact: Contact = {
    email: "m@mdr.cool",
    portfolio: { text: "cv.drouet.io", url: "https://cv.drouet.io" },
    linkedin: "linkedin.com/in/mathieu-drouet",
    location: "Lille, France"
  };
  
  if (contactMatch) {
    const emailMatch = contactMatch[1].match(/Email: (.*)/);
    const portfolioMatch = contactMatch[1].match(/Portfolio: \[(.*?)\]\((.*?)\)/);
    const linkedinMatch = contactMatch[1].match(/LinkedIn: (.*)/);
    const locationMatch = contactMatch[1].match(/Location: (.*)/);
    
    if (emailMatch) contact.email = emailMatch[1];
    if (portfolioMatch) {
      contact.portfolio = { text: portfolioMatch[1], url: portfolioMatch[2] };
    }
    if (linkedinMatch) contact.linkedin = linkedinMatch[1];
    if (locationMatch) contact.location = locationMatch[1];
  }

  // Parse interests
  const interestsMatch = content.match(/## Interests\n\n([\s\S]*?)(?=\n## )/);
  const interests: string[] = [];
  if (interestsMatch) {
    const interestLines = interestsMatch[1].split('\n').filter(line => line.startsWith('- '));
    interests.push(...interestLines.map(line => line.replace('- ', '')));
  }

  // Parse experience
  const experienceMatch = content.match(/## Experience\n\n([\s\S]*?)(?=\n## )/);
  const experience: Experience[] = [];
  if (experienceMatch) {
    const expBlocks = experienceMatch[1].split(/(?=### )/);
    expBlocks.forEach(block => {
      const companyMatch = block.match(/### (.*)/);
      const roleMatch = block.match(/\*\*(.*?)\*\* \| (.*?) \|/);
      const urlMatch = block.match(/\[Company Link\]\((.*?)\)/);
      
      if (companyMatch && roleMatch) {
        const company = companyMatch[1];
        const role = roleMatch[1];
        const period = roleMatch[2];
        const companyUrl = urlMatch?.[1];
        
        // Extract achievements
        const achievementLines = block.split('\n').filter(line => line.startsWith('- '));
        const achievements = achievementLines.map(line => line.replace('- ', ''));
        
        // Map company names to logo filenames
        const logoMap: { [key: string]: string } = {
          'CH-Studio - GEHealthcare': 'ge-healtcare.png',
          'Group Actual': 'actual.png',
          'Bookr.fm': 'bookr.png',
          'Fluidra': 'fluidra.png'
        };
        
        experience.push({
          company,
          companyUrl,
          role,
          period,
          current: period.includes('2025'),
          logo: `/logos/${logoMap[company] || `${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.png`}`,
          achievements
        });
      }
    });
  }

  // Parse skills
  const skillsMatch = content.match(/## Skills\n\n([\s\S]*?)$/);
  const skills: Skill[] = [];
  if (skillsMatch) {
    const skillBlocks = skillsMatch[1].split(/(?=### )/);
    skillBlocks.forEach(block => {
      const titleMatch = block.match(/### (.*)/);
      const subtitleMatch = block.match(/\*\*(.*?)\*\*/);
      const levelMatch = block.match(/\*\*.*?\*\* \| (.*)/);
      
      if (titleMatch && subtitleMatch) {
        const title = titleMatch[1];
        const subtitle = subtitleMatch[1];
        const level = levelMatch?.[1] || 'Advanced';
        
        // Extract skill items
        const itemLines = block.split('\n').filter(line => line.startsWith('- '));
        const items = itemLines.map(line => line.replace('- ', ''));
        
        skills.push({
          title,
          subtitle,
          level,
          current: title === 'Product Management',
          items
        });
      }
    });
  }

  return {
    name,
    education,
    contact,
    interests,
    experience,
    skills
  };
}