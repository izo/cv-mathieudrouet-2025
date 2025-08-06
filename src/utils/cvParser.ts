// CV Parser utility to extract structured data from Markdown
import { cvDebug } from './debug';
import { getCompanyLogo } from '../config/images';
import { iconEngine } from './iconEngine';

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

// Helper to transform a single icon string (for section headers)
function transformSectionIcon(iconString: string, defaultIconSet: string = 'carbon'): string {
  if (!iconString) return iconString;
  
  try {
    // Configure icon engine with default set
    iconEngine.updateConfig({ defaultSet: defaultIconSet as any });
    
    // Parse the icon
    const parseResult = iconEngine.parseIcon(iconString);
    
    if (parseResult.success && parseResult.icon) {
      cvDebug.icon(parseResult.icon.mapped, true);
      return parseResult.icon.mapped;
    } else {
      // Use fallback
      const fallbackIcon = parseResult.fallback || {
        set: defaultIconSet as any,
        name: 'alert-circle',
        original: iconString,
        mapped: `${defaultIconSet}:alert-circle`
      };
      cvDebug.icon(iconString, false, parseResult.error);
      return fallbackIcon.mapped;
    }
  } catch (error) {
    cvDebug.icon(iconString, false, error);
    return `${defaultIconSet}:alert-circle`; // fallback
  }
}

// Helper to convert flexible icons and markdown formatting in text
function replaceFlexibleIcons(text: string, defaultIconSet: string = 'carbon'): string {
  if (!text || typeof text !== 'string') {
    console.warn('Invalid text input to replaceFlexibleIcons:', text);
    return '';
  }

  try {
    // Configure icon engine with default set
    iconEngine.updateConfig({ defaultSet: defaultIconSet as any });
    
    // First, extract and replace all icons with placeholders
    const iconMatches: { placeholder: string; replacement: string }[] = [];
    let iconIndex = 0;
    
    // Helper function to create Iconify icon using the engine
    const createIconifyIcon = (iconName: string, iconSet?: string) => {
      try {
        // If iconSet is provided, use explicit format, otherwise use generic format
        const iconString = iconSet ? `${iconSet}:${iconName}` : `icon:${iconName}`;
        const parseResult = iconEngine.parseIcon(iconString);
        
        if (parseResult.success && parseResult.icon) {
          cvDebug.icon(parseResult.icon.mapped, true);
          return iconEngine.renderIcon(parseResult.icon);
        } else {
          // Use fallback - create a simple fallback icon
          const fallbackIcon = parseResult.fallback || {
            set: (iconSet || defaultIconSet) as any,
            name: 'alert-circle',
            original: iconString,
            mapped: `${iconSet || defaultIconSet}:alert-circle`
          };
          cvDebug.icon(iconString, false, parseResult.error);
          return iconEngine.renderIcon(fallbackIcon);
        }
      } catch (error) {
        cvDebug.icon(iconName, false, error);
        return `<span class="inline-block w-4 h-4 text-cv-muted" title="Error loading icon">❌</span>`;
      }
    };
    
    // Handle explicit icon sets: **carbon:icon**, **tabler:icon**, etc.
    text = text.replace(/\*\*(carbon|tabler|lucide|heroicons):[a-zA-Z0-9-_]*\*\*/g, (match) => {
      try {
        const iconName = match.replace(/\*\*/g, '');
        const [iconSet, name] = iconName.split(':');
        const placeholder = `__ICON_${iconIndex++}__`;
        iconMatches.push({
          placeholder,
          replacement: createIconifyIcon(name, iconSet)
        });
        return placeholder;
      } catch (error) {
        console.error('Error processing explicit icon set:', match, error);
        return match;
      }
    });
    
    // Handle generic icon pattern: **icon:name** (uses defaultIconSet)
    text = text.replace(/\*\*icon:[a-zA-Z0-9-_]*\*\*/g, (match) => {
      try {
        const iconName = match.replace(/\*\*icon:/, '').replace(/\*\*/, '');
        const placeholder = `__ICON_${iconIndex++}__`;
        iconMatches.push({
          placeholder,
          replacement: createIconifyIcon(iconName, defaultIconSet)
        });
        return placeholder;
      } catch (error) {
        console.error('Error processing generic icon pattern:', match, error);
        return match;
      }
    });
    
    // Handle standalone patterns (not preceded by ** or >)
    text = text.replace(/(?<!\*\*|\>)(carbon|tabler|lucide|heroicons):[a-zA-Z0-9-_]*(?!\*\*)/g, (match) => {
      try {
        const [iconSet, name] = match.split(':');
        const placeholder = `__ICON_${iconIndex++}__`;
        iconMatches.push({
          placeholder,
          replacement: createIconifyIcon(name, iconSet)
        });
        return placeholder;
      } catch (error) {
        console.error('Error processing standalone icon:', match, error);
        return match;
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
    const defaultIconSet = frontmatterData?.iconSet || 'carbon';
    cvDebug.section('name', { name, defaultIconSet });
  
  // Parse education section and extract icon (line-by-line approach)
  const educationIconMatch = content.match(/## \*\*([a-zA-Z0-9:_-]+)\*\*\s*Education/);
  const educationIcon = educationIconMatch ? transformSectionIcon(educationIconMatch[1], defaultIconSet) : undefined;
  
  const education: Education[] = [];
  const lines = content.split('\n');
  let inEducationSection = false;
  let currentEducation: Partial<Education> = {};
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Start of education section (handle both formats: with and without icons)
    if (line.startsWith('## Education') || (line.startsWith('## **') && line.includes('** Education'))) {
      inEducationSection = true;
      continue;
    }
    
    // End of education section (next ## section)
    if (inEducationSection && line.startsWith('## ') && !line.startsWith('### ')) {
      // Push any pending education entry
      if (currentEducation.title && currentEducation.period && currentEducation.institution) {
        education.push(currentEducation as Education);
      }
      break;
    }
    
    if (inEducationSection) {
      // Education entry title
      if (line.startsWith('### ')) {
        // Push previous entry if complete
        if (currentEducation.title && currentEducation.period && currentEducation.institution) {
          education.push(currentEducation as Education);
        }
        currentEducation = {
          title: line.replace('### ', '').trim()
        };
      }
      // Education entry in single line format: - **YYYY - YYYY** - Institution - (Location)
      else if (line.startsWith('- **') && line.includes('**')) {
        const match = line.match(/^- \*\*(.+?)\*\* - (.+?) - \((.+?)\)$/);
        if (match && currentEducation.title) {
          const [, period, institution, location] = match;
          currentEducation.period = period.trim();
          currentEducation.institution = `${institution.trim()} (${location.trim()})`;
        }
      }
      // Legacy format: Period (bold text)
      else if (line.match(/^\*\*.*\*\*$/)) {
        currentEducation.period = line.replace(/\*\*/g, '').trim();
      }
      // Legacy format: Institution (next non-empty line after period)
      else if (line.trim() && !line.startsWith('**') && currentEducation.period && !currentEducation.institution) {
        currentEducation.institution = line.trim();
      }
    }
  }
  
  // Push final entry if complete
  if (currentEducation.title && currentEducation.period && currentEducation.institution) {
    education.push(currentEducation as Education);
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
    // Extract icon from section header (flexible icon support)
    if (line.startsWith('## ') && line.includes('Coordonnées')) {
      const iconMatch = line.match(/## \*\*([a-zA-Z0-9:_-]+)\*\*\s*Coordonnées/);
      if (iconMatch) {
        contactIcon = transformSectionIcon(iconMatch[1], defaultIconSet);
      }
      inContactSection = true;
      continue;
    }
    
    // Stop at next section
    if (inContactSection && line.startsWith('## ')) {
      break;
    }
    
    // Extract contact items (updated for new icon format)
    if (inContactSection && line.trim().startsWith('**carbon:')) {
      contactContent.push(replaceFlexibleIcons(line.trim(), defaultIconSet));
    }
  }

  // Parse interests icon and content
  let interestsIcon: string | undefined = undefined;
  const interests: string[] = [];
  const interestLines = content.split('\n');
  let inInterestsSection = false;
  
  for (const line of interestLines) {
    // Extract icon from section header (flexible icon support)
    if (line.includes('Centres d') && line.includes('intérêt')) {
      const iconMatch = line.match(/## \*\*([a-zA-Z0-9:_-]+)\*\*\s*Centres d'intérêt/);
      if (iconMatch) {
        interestsIcon = transformSectionIcon(iconMatch[1], defaultIconSet);
      }
      inInterestsSection = true;
      continue;
    }
    
    // Stop at next section
    if (inInterestsSection && line.startsWith('## ')) {
      break;
    }
    
    // Extract interest items (updated for new icon format)
    if (inInterestsSection && line.trim().startsWith('**carbon:')) {
      interests.push(replaceFlexibleIcons(line.trim(), defaultIconSet));
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
      
      // Extract employer icon (on separate line after company name)
      const employerIconMatch = block.match(/\*\*([a-zA-Z0-9:_-]+)\*\*\s*$/m);
      const employerIcon = employerIconMatch ? transformSectionIcon(employerIconMatch[1], defaultIconSet) : undefined;
      
      if (companyMatch && roleMatch) {
        const company = companyMatch[1];
        const role = roleMatch[1];
        const period = roleMatch[2];
        const companyUrl = urlMatch?.[1];
        
        // Extract achievements
        const achievementLines = block.split('\n').filter(line => line.startsWith('- '));
        const achievements = achievementLines.map(line => replaceFlexibleIcons(line.replace('- ', ''), defaultIconSet));
        
        experience.push({
          company,
          companyUrl,
          role,
          period,
          current: period.includes('2025'),
          logo: getCompanyLogo(company),
          icon: employerIcon, // Add employer icon
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
      // Step 1: Extract title and main icon from title line
      const titleMatch = block.match(/### (.*)/);
      const titleLine = titleMatch?.[1] || '';
      const titleIconMatch = titleLine.match(/\*\*([a-zA-Z0-9:_-]+)\*\*/);
      const icon = titleIconMatch ? transformSectionIcon(titleIconMatch[1], defaultIconSet) : undefined;
      
      // Step 2: Extract subtitle and level from the line after title
      const lines = block.split('\n').filter(line => line.trim());
      let subtitleMatch: RegExpMatchArray | null = null;
      let levelLine = '';
      let levelIcon: string | undefined = undefined;
      
      // Find the subtitle/level line (format: **subtitle** | **icon** level)
      for (const line of lines) {
        if (line.includes('|') && line.includes('**')) {
          const parts = line.split('|');
          if (parts.length === 2) {
            // Extract subtitle from first part
            const subtitlePart = parts[0].trim();
            const subtitleRegex = /\*\*([^*]+?)\*\*/;
            subtitleMatch = subtitlePart.match(subtitleRegex);
            
            // Extract level and icon from second part
            levelLine = parts[1].trim();
            const levelIconMatch = levelLine.match(/\*\*([a-zA-Z0-9:_-]+)\*\*/);
            levelIcon = levelIconMatch ? transformSectionIcon(levelIconMatch[1], defaultIconSet) : undefined;
            break;
          }
        }
      }
      
      // Step 4: Validate and clean extracted data
      if (titleMatch && subtitleMatch) {
        // Clean title (remove icon)
        const cleanTitle = titleLine.replace(/\s*\*\*[a-zA-Z0-9:_-]+\*\*\s*/, '').trim();
        const title = replaceFlexibleIcons(cleanTitle, defaultIconSet);
        
        // Clean subtitle
        const subtitle = replaceFlexibleIcons(subtitleMatch[1], defaultIconSet);
        
        // Clean level (remove icon if present)
        const cleanLevel = levelIcon ? levelLine.replace(/\*\*[a-zA-Z0-9:_-]+\*\*\s*/, '').trim() : levelLine;
        const level = replaceFlexibleIcons(cleanLevel, defaultIconSet);
        
        // Determine if current (based on clean title)
        const isCurrent = cleanTitle.startsWith('Product Management');
        
        // Step 5: Extract skill items (clean approach)
        const itemLines = block.split('\n')
          .filter(line => line.trim().startsWith('- '))
          .filter(line => !line.match(/^\s*-\s*\*\*[a-zA-Z0-9:_-]+\*\*\s*$/)); // Exclude pure icon lines
        const items = itemLines.map(line => {
          const cleanLine = line.replace(/^\s*-\s*/, '').trim();
          return replaceFlexibleIcons(cleanLine, defaultIconSet);
        });
        
        // Step 6: Validate before adding
        if (title && subtitle && items.length > 0) {
          skills.push({
            title,
            subtitle,
            level: level || 'Advanced',
            current: isCurrent,
            items,
            icon,
            levelIcon
          });
          
          // Debug logging for validation
          cvDebug.section(`skill-${cleanTitle}`, {
            title: cleanTitle,
            subtitle: subtitleMatch[1],
            icon: icon || 'none',
            levelIcon: levelIcon || 'none',
            itemCount: items.length
          });
        }
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