// CV Parser utility to extract structured data from Markdown
export interface CVData {
  name: string;
  education: Education[];
  contact: Contact;
  interests: string[];
  experience: Experience[];
  skills: Skill[];
  educationIcon?: string;
  contactIcon?: string;
  interestsIcon?: string;
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
  icon?: string;
  levelIcon?: string;
}

// Helper to convert Carbon icons in text
function replaceCarbonIcons(text: string): string {
  return text.replace(/carbon:([a-zA-Z0-9-_]+)/g, '<iconify-icon icon="carbon:$1" width="16" height="16" class="inline-block"></iconify-icon>');
}

// Helper to parse CV content from Markdown
export function parseCVContent(content: string, frontmatterData?: any): CVData {
  // Use frontmatter data from Astro Content Collections
  const name = frontmatterData?.name || 'Mathieu Drouet';
  
  // Parse education section and extract icon
  const educationSectionMatch = content.match(/## Education\s*(\*\*carbon:[a-zA-Z0-9-_]+\*\*)?\n\n([\s\S]*?)(?=\n## )/);
  const educationIconMatch = content.match(/## Education\s*\*\*(carbon:[a-zA-Z0-9-_]+)\*\*/);
  const educationIcon = educationIconMatch ? educationIconMatch[1] : undefined;
  
  const education: Education[] = [];
  if (educationSectionMatch) {
    const eduContent = educationSectionMatch[2];
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

  // Parse contact info (French: Coordonnées) and extract icon
  const contactSectionMatch = content.match(/## Coordonnées\s*(\*\*carbon:[a-zA-Z0-9-_]+\*\*)?\n\n([\s\S]*?)(?=\n## )/);
  const contactIconMatch = content.match(/## Coordonnées\s*\*\*(carbon:[a-zA-Z0-9-_]+)\*\*/);
  const contactIcon = contactIconMatch ? contactIconMatch[1] : undefined;
  
  const contactMatch = contactSectionMatch;
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
    const locationMatch = contactMatch[1].match(/Localisation: (.*)/);
    
    if (emailMatch) contact.email = emailMatch[1];
    if (portfolioMatch) {
      contact.portfolio = { text: portfolioMatch[1], url: portfolioMatch[2] };
    }
    if (linkedinMatch) contact.linkedin = linkedinMatch[1];
    if (locationMatch) contact.location = locationMatch[1];
  }

  // Parse interests icon and content
  let interestsIcon: string | undefined = undefined;
  const interests: string[] = [];
  const lines = content.split('\n');
  let inSection = false;
  
  for (const line of lines) {
    // Extract icon from section header
    if (line.includes('Centres d') && line.includes('intérêt') && line.includes('carbon:')) {
      const iconMatch = line.match(/\*\*(carbon:[a-zA-Z0-9-_]+)\*\*/);
      if (iconMatch) {
        interestsIcon = iconMatch[1];
      }
      inSection = true;
      continue;
    }
    
    // Stop at next section
    if (inSection && line.startsWith('## ')) {
      break;
    }
    
    // Extract interest items
    if (inSection && line.trim().startsWith('- ')) {
      interests.push(replaceCarbonIcons(line.replace('- ', '').trim()));
    }
  }

  // Parse experience (French: Expérience)
  const experienceMatch = content.match(/## Expérience\n\n([\s\S]*?)(?=\n## )/);
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
        const achievements = achievementLines.map(line => replaceCarbonIcons(line.replace('- ', '')));
        
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

  // Parse skills (French: Compétences)
  const skillsMatch = content.match(/## Compétences\n\n([\s\S]*?)$/);
  const skills: Skill[] = [];
  if (skillsMatch) {
    const skillBlocks = skillsMatch[1].split(/(?=### )/);
    skillBlocks.forEach(block => {
      const titleMatch = block.match(/### (.*)/);
      const subtitleMatch = block.match(/\*\*(.*?)\*\*/);
      const levelMatch = block.match(/\*\*.*?\*\* \| (.*)/);
      
      // Extract main icon from block (first **carbon:xxx** pattern)
      const iconMatch = block.match(/\*\*(carbon:[a-zA-Z0-9-_]+)\*\*/);
      const icon = iconMatch ? iconMatch[1] : undefined;
      
      // Extract level icon from level line (look for **carbon:xxx** in | line)
      const levelIconMatch = block.match(/\|\s*\*\*(carbon:[a-zA-Z0-9-_]+)\*\*/);
      const levelIcon = levelIconMatch ? levelIconMatch[1] : undefined;
      
      if (titleMatch && subtitleMatch) {
        const title = replaceCarbonIcons(titleMatch[1]);
        const subtitle = replaceCarbonIcons(subtitleMatch[1]);
        
        // Extract level text, removing the carbon icon part
        let level = levelMatch?.[1] || 'Advanced';
        if (levelIcon) {
          level = level.replace(/\*\*carbon:[a-zA-Z0-9-_]+\*\*\s*/, '').trim();
        }
        
        // Extract skill items (avoid icon lines)
        const itemLines = block.split('\n')
          .filter(line => line.startsWith('- ') || (line.trim().startsWith('**carbon:') && !line.includes('|')))
          .filter(line => !line.match(/\*\*carbon:[a-zA-Z0-9-_]+\*\*/))
          .filter(line => line.startsWith('- '));
        const items = itemLines.map(line => replaceCarbonIcons(line.replace('- ', '')));
        
        skills.push({
          title,
          subtitle,
          level,
          current: title === 'Product Management',
          items,
          icon,
          levelIcon
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
    skills,
    educationIcon,
    contactIcon,
    interestsIcon
  };
}