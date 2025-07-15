// CV Parser utility to extract structured data from Markdown
export interface CVData {
  name: string;
  education: Education[];
  contact: Contact;
  contactContent?: string[];
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

// Helper to convert Carbon icons and markdown formatting in text
function replaceCarbonIcons(text: string): string {
  // First, extract and replace all carbon icons with placeholders
  const iconMatches: { placeholder: string; replacement: string }[] = [];
  let iconIndex = 0;
  
  // Helper function to create SVG icon for unplugin-icons
  const createSVGIcon = (iconName: string) => {
    const name = iconName.replace('carbon:', '');
    // For now, use a simple span that will be styled
    return `<span class="inline-block w-4 h-4 text-cv-accent mr-2" data-icon="${name}" style="background: currentColor; mask: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 32 32\\"><rect width=\\"32\\" height=\\"32\\" fill=\\"currentColor\\"/></svg>'); -webkit-mask: url('data:image/svg+xml;charset=utf-8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" viewBox=\\"0 0 32 32\\"><rect width=\\"32\\" height=\\"32\\" fill=\\"currentColor\\"/></svg>')"></span>`;
  };
  
  // Handle **carbon:icon** pattern
  text = text.replace(/\*\*(carbon:[a-zA-Z0-9-_]+)\*\*/g, (match, iconName) => {
    const placeholder = `__ICON_${iconIndex++}__`;
    iconMatches.push({
      placeholder,
      replacement: createSVGIcon(iconName)
    });
    return placeholder;
  });
  
  // Handle standalone carbon:icon pattern (not preceded by ** or >)
  text = text.replace(/(?<!\*\*|\>)(carbon:[a-zA-Z0-9-_]+)(?!\*\*)/g, (match, iconName) => {
    const placeholder = `__ICON_${iconIndex++}__`;
    iconMatches.push({
      placeholder,
      replacement: createSVGIcon(iconName)
    });
    return placeholder;
  });
  
  // Convert markdown formatting
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic
  
  // Convert markdown links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-cv-accent hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Replace icon placeholders with actual icons
  iconMatches.forEach(({ placeholder, replacement }) => {
    text = text.replace(placeholder, replacement);
  });
  
  return text;
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

  // Parse contact info (French: Coordonnées) - simple line-by-line approach
  let contactIcon: string | undefined = undefined;
  let contactContent: string[] = [];
  const contact: Contact = {
    email: "m@mdr.cool",
    portfolio: { text: "cv.drouet.io", url: "https://cv.drouet.io" },
    linkedin: "linkedin.com/in/mathieu-drouet",
    location: "Lille, France"
  };
  
  const contactLines = content.split('\n');
  let inContactSection = false;
  
  for (const line of contactLines) {
    // Extract icon from section header
    if (line.includes('Coordonnées') && line.includes('carbon:')) {
      const iconMatch = line.match(/\*\*(carbon:[a-zA-Z0-9-_]+)\*\*/);
      if (iconMatch) {
        contactIcon = iconMatch[1];
      }
      inContactSection = true;
      continue;
    }
    
    // Stop at next section
    if (inContactSection && line.startsWith('## ')) {
      break;
    }
    
    // Extract contact items
    if (inContactSection && line.trim().startsWith('- ')) {
      contactContent.push(replaceCarbonIcons(line.replace('- ', '').trim()));
    }
  }

  // Parse interests icon and content
  let interestsIcon: string | undefined = undefined;
  const interests: string[] = [];
  const interestLines = content.split('\n');
  let inInterestsSection = false;
  
  for (const line of interestLines) {
    // Extract icon from section header
    if (line.includes('Centres d') && line.includes('intérêt') && line.includes('carbon:')) {
      const iconMatch = line.match(/\*\*(carbon:[a-zA-Z0-9-_]+)\*\*/);
      if (iconMatch) {
        interestsIcon = iconMatch[1];
      }
      inInterestsSection = true;
      continue;
    }
    
    // Stop at next section
    if (inInterestsSection && line.startsWith('## ')) {
      break;
    }
    
    // Extract interest items
    if (inInterestsSection && line.trim().startsWith('- ')) {
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
    contactContent,
    interests,
    experience,
    skills,
    educationIcon,
    contactIcon,
    interestsIcon
  };
}