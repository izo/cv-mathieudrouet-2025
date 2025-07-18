// CV Parser utility to extract structured data from Markdown
import { cvDebug } from './debug';
import { getCompanyLogo } from '../config/images';

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
  if (!text || typeof text !== 'string') {
    console.warn('Invalid text input to replaceCarbonIcons:', text);
    return '';
  }

  try {
    // First, extract and replace all carbon icons with placeholders
    const iconMatches: { placeholder: string; replacement: string }[] = [];
    let iconIndex = 0;
    
    // Helper function to create SVG icon for unplugin-icons
    const createSVGIcon = (iconName: string) => {
      try {
        const name = iconName.replace('carbon:', '');
        
        // Validate icon name
        if (!name || !/^[a-zA-Z0-9-_]+$/.test(name)) {
          cvDebug.icon(iconName, false, 'Invalid icon name format');
          return `<span class="inline-block w-4 h-4 text-cv-muted" title="Invalid icon: ${iconName}">⚠️</span>`;
        }
        
        // For now, use a simple span that will be styled
        cvDebug.icon(iconName, true);
        return `<span class="inline-block w-4 h-4 text-cv-accent mr-2" data-icon="${name}" style="background: currentColor; mask: url('data:image/svg+xml;charset=utf-8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 32 32&quot;><rect width=&quot;32&quot; height=&quot;32&quot; fill=&quot;currentColor&quot;/></svg>'); -webkit-mask: url('data:image/svg+xml;charset=utf-8,<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 32 32&quot;><rect width=&quot;32&quot; height=&quot;32&quot; fill=&quot;currentColor&quot;/></svg>')"></span>`;
      } catch (error) {
        cvDebug.icon(iconName, false, error);
        return `<span class="inline-block w-4 h-4 text-cv-muted" title="Error loading icon">❌</span>`;
      }
    };
    
    // Handle **carbon:icon** pattern
    text = text.replace(/\*\*(carbon:[a-zA-Z0-9-_]*)\*\*/g, (match, iconName) => {
      try {
        const placeholder = `__ICON_${iconIndex++}__`;
        iconMatches.push({
          placeholder,
          replacement: createSVGIcon(iconName)
        });
        return placeholder;
      } catch (error) {
        console.error('Error processing carbon icon pattern:', match, error);
        return match; // Return original text if processing fails
      }
    });
    
    // Handle standalone carbon:icon pattern (not preceded by ** or >)
    text = text.replace(/(?<!\*\*|\>)(carbon:[a-zA-Z0-9-_]*)(?!\*\*)/g, (match, iconName) => {
      try {
        const placeholder = `__ICON_${iconIndex++}__`;
        iconMatches.push({
          placeholder,
          replacement: createSVGIcon(iconName)
        });
        return placeholder;
      } catch (error) {
        console.error('Error processing standalone carbon icon:', match, error);
        return match; // Return original text if processing fails
      }
    });
    
    // Convert markdown formatting with error handling
    try {
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
    } catch (error) {
      console.warn('Error processing bold markdown:', error);
    }
    
    try {
      text = text.replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic
    } catch (error) {
      console.warn('Error processing italic markdown:', error);
    }
    
    // Convert markdown links with validation
    try {
      text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
        // Basic URL validation
        if (!url || url.trim() === '') {
          return linkText; // Return just the text if URL is invalid
        }
        return `<a href="${url}" class="text-cv-accent hover:underline" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
      });
    } catch (error) {
      console.warn('Error processing markdown links:', error);
    }
    
    // Replace icon placeholders with actual icons
    iconMatches.forEach(({ placeholder, replacement }) => {
      try {
        text = text.replace(placeholder, replacement);
      } catch (error) {
        console.error('Error replacing icon placeholder:', placeholder, error);
      }
    });
    
    return text;
  } catch (error) {
    console.error('Critical error in replaceCarbonIcons:', error);
    return text || ''; // Return original text or empty string as fallback
  }
}

// Helper to parse CV content from Markdown
export function parseCVContent(content: string, frontmatterData?: any): CVData {
  if (!content || typeof content !== 'string') {
    console.warn('Invalid content provided to parseCVContent:', typeof content);
    content = '';
  }

  try {
    const parseProfiler = cvDebug.profile('full-parse');
    
    // Use frontmatter data from Astro Content Collections
    const name = frontmatterData?.name || 'Mathieu Drouet';
    cvDebug.section('name', { name });
  
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
    if (line.startsWith('## ') && line.includes('Coordonnées')) {
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
  const experienceMatch = content.match(/## Expérience\n\n([\s\S]*?)(?=\n## |$)/);
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
        
        experience.push({
          company,
          companyUrl,
          role,
          period,
          current: period.includes('2025'),
          logo: getCompanyLogo(company),
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
      const levelIconMatch = block.match(/\|[^\n]*\*\*(carbon:[a-zA-Z0-9-_]+)\*\*/);
      const levelIcon = levelIconMatch ? levelIconMatch[1] : undefined;
      
      if (titleMatch && subtitleMatch) {
        const rawTitle = titleMatch[1];
        const title = replaceCarbonIcons(rawTitle);
        const subtitle = replaceCarbonIcons(subtitleMatch[1]);
        
        const levelRaw = levelMatch?.[1] || 'Advanced';
        const isCurrent = rawTitle.startsWith('Product Management');
        const level = isCurrent
          ? levelRaw
          : levelRaw.replace(/\*\*carbon:[a-zA-Z0-9-_]+\*\*\s*/, '').trim();
        
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
          current: isCurrent,
          items,
          icon,
          levelIcon
        });
      }
    });
  }

    const result = {
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
    
    cvDebug.section('final-result', {
      educationCount: education.length,
      experienceCount: experience.length,
      skillsCount: skills.length,
      interestsCount: interests.length,
      contactContentCount: contactContent.length
    });
    
    parseProfiler();
    return result;
  } catch (error) {
    cvDebug.error('Critical error in parseCVContent', error);
    
    // Return safe default data structure
    return {
      name: frontmatterData?.name || 'Mathieu Drouet',
      education: [],
      contact: {
        email: "m@mdr.cool",
        portfolio: { text: "cv.drouet.io", url: "https://cv.drouet.io" },
        linkedin: "linkedin.com/in/mathieu-drouet",
        location: "Lille, France"
      },
      contactContent: [],
      interests: [],
      experience: [],
      skills: [],
      educationIcon: undefined,
      contactIcon: undefined,
      interestsIcon: undefined
    };
  }
}