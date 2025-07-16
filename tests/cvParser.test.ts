import { describe, it, expect, beforeEach } from 'vitest';
import { parseCVContent, type CVData, type Education, type Experience, type Skill } from '../src/utils/cvParser';

describe('cvParser', () => {
  describe('parseCVContent', () => {
    let mockContent: string;
    let mockFrontmatter: any;

    beforeEach(() => {
      mockFrontmatter = {
        name: 'Mathieu Drouet'
      };

      mockContent = `# Mathieu Drouet

## Education **carbon:education**

### Master's Degree
**2020-2022**
University of Lille

### Bachelor's Degree
**2017-2020**
University of Technology

## Coordonnées **carbon:identification**

- **carbon:email** m@mdr.cool
- **carbon:globe** [cv.drouet.io](https://cv.drouet.io)
- **carbon:logo-linkedin** linkedin.com/in/mathieu-drouet
- **carbon:location** Lille, France

## Centres d'intérêt **carbon:favorite**

- **carbon:game** Jeux vidéo et technologie
- **carbon:music** Musique et concerts
- **carbon:run** Course à pied et fitness

## Expérience

### CH-Studio - GEHealthcare
**Senior Product Manager** | Jan 2023 - Present | [Company Link](https://www.gehealthcare.com)
- Led product strategy for medical imaging solutions
- Increased user engagement by 40%

### Group Actual
**Product Manager** | Jun 2021 - Dec 2022 | [Company Link](https://www.groupactual.com)
- Managed fintech product portfolio
- Delivered 5 major feature releases

## Compétences

### Product Management **carbon:chart-line**
**Strategic Planning** | Expert **carbon:star-filled**
- Product roadmap development
- Stakeholder management
- Market analysis

### Technical Skills **carbon:code**
**Development** | Advanced **carbon:trophy**
- JavaScript and TypeScript
- React and Vue.js
- API design and architecture`;
    });

    it('should parse basic CV data correctly', () => {
      const result = parseCVContent(mockContent, mockFrontmatter);

      expect(result.name).toBe('Mathieu Drouet');
      expect(result.education).toHaveLength(2);
      expect(result.experience).toHaveLength(2);
      expect(result.skills).toHaveLength(2);
      expect(result.interests).toHaveLength(3);
    });

    it('should parse education section with icon', () => {
      const result = parseCVContent(mockContent, mockFrontmatter);

      expect(result.educationIcon).toBe('carbon:education');
      expect(result.education[0]).toEqual({
        title: "Master's Degree",
        period: '2020-2022',
        institution: 'University of Lille'
      });
      expect(result.education[1]).toEqual({
        title: "Bachelor's Degree",
        period: '2017-2020',
        institution: 'University of Technology'
      });
    });

    it('should parse contact section with icon and content', () => {
      const result = parseCVContent(mockContent, mockFrontmatter);

      expect(result.contactIcon).toBe('carbon:identification');
      expect(result.contactContent).toHaveLength(4);
      expect(result.contactContent[0]).toContain('m@mdr.cool');
      expect(result.contactContent[1]).toContain('cv.drouet.io');
      expect(result.contactContent[2]).toContain('linkedin.com/in/mathieu-drouet');
      expect(result.contactContent[3]).toContain('Lille, France');
    });

    it('should parse interests section with icon', () => {
      const result = parseCVContent(mockContent, mockFrontmatter);

      expect(result.interestsIcon).toBe('carbon:favorite');
      expect(result.interests).toHaveLength(3);
      expect(result.interests[0]).toContain('Jeux vidéo et technologie');
      expect(result.interests[1]).toContain('Musique et concerts');
      expect(result.interests[2]).toContain('Course à pied et fitness');
    });

    it('should parse experience section correctly', () => {
      const result = parseCVContent(mockContent, mockFrontmatter);

      expect(result.experience).toHaveLength(2);
      
      const exp1 = result.experience[0];
      expect(exp1.company).toBe('CH-Studio - GEHealthcare');
      expect(exp1.role).toBe('Senior Product Manager');
      expect(exp1.period).toBe('Jan 2023 - Present');
      expect(exp1.companyUrl).toBe('https://www.gehealthcare.com');
      expect(exp1.current).toBe(false); // 2025 check
      expect(exp1.achievements).toHaveLength(2);
      expect(exp1.logo).toBe('/logos/ge-healtcare.png');

      const exp2 = result.experience[1];
      expect(exp2.company).toBe('Group Actual');
      expect(exp2.role).toBe('Product Manager');
      expect(exp2.period).toBe('Jun 2021 - Dec 2022');
      expect(exp2.companyUrl).toBe('https://www.groupactual.com');
      expect(exp2.achievements).toHaveLength(2);
      expect(exp2.logo).toBe('/logos/actual.png');
    });

    it('should parse skills section with icons and levels', () => {
      const result = parseCVContent(mockContent, mockFrontmatter);

      expect(result.skills).toHaveLength(2);
      
      const skill1 = result.skills[0];
      // Note: replaceCarbonIcons converts icons to HTML, so we check for HTML content
      expect(skill1.title).toBeDefined();
      expect(skill1.subtitle).toBeDefined();
      expect(skill1.level).toBe('Expert **carbon:star-filled**');
      expect(skill1.icon).toBe('carbon:chart-line');
      expect(skill1.levelIcon).toBe('carbon:star-filled');
      expect(skill1.current).toBe(true);
      expect(skill1.items).toHaveLength(3);

      const skill2 = result.skills[1];
      expect(skill2.title).toBeDefined();
      expect(skill2.subtitle).toBeDefined();
      expect(skill2.level).toBe('Advanced');
      expect(skill2.icon).toBe('carbon:code');
      expect(skill2.levelIcon).toBe('carbon:trophy');
      expect(skill2.current).toBe(false);
      expect(skill2.items).toHaveLength(3);
    });

    it('should handle content without frontmatter', () => {
      const result = parseCVContent(mockContent);

      expect(result.name).toBe('Mathieu Drouet');
      expect(result.education).toHaveLength(2);
    });

    it('should handle malformed education section', () => {
      const malformedContent = `## Education
### Incomplete Entry
**No institution**`;

      const result = parseCVContent(malformedContent, mockFrontmatter);

      expect(result.education).toHaveLength(0);
    });

    it('should handle empty content sections', () => {
      const emptyContent = `# Mathieu Drouet

## Education

## Expérience

## Compétences`;

      const result = parseCVContent(emptyContent, mockFrontmatter);

      expect(result.education).toHaveLength(0);
      expect(result.experience).toHaveLength(0);
      expect(result.skills).toHaveLength(0);
      expect(result.interests).toHaveLength(0);
    });

    it('should convert carbon icons to HTML elements', () => {
      const result = parseCVContent(mockContent, mockFrontmatter);

      // Check that carbon icons in content are converted to HTML
      expect(result.contactContent[0]).toContain('<span class="inline-block w-4 h-4');
      expect(result.interests[0]).toContain('<span class="inline-block w-4 h-4');
    });

    it('should handle markdown formatting in text', () => {
      const contentWithMarkdown = `## Coordonnées

- **Email**: m@test.com with **bold** and *italic* text
- Link to [website](https://example.com)`;

      const result = parseCVContent(contentWithMarkdown, mockFrontmatter);

      expect(result.contactContent).toHaveLength(2);
      expect(result.contactContent[0]).toContain('<strong>bold</strong>');
      expect(result.contactContent[0]).toContain('<em>italic</em>');
      expect(result.contactContent[1]).toContain('<a href="https://example.com"');
    });

    it('should assign correct company logos', () => {
      const result = parseCVContent(mockContent, mockFrontmatter);

      expect(result.experience[0].logo).toBe('/logos/ge-healtcare.png');
      expect(result.experience[1].logo).toBe('/logos/actual.png');
    });

    it('should handle unknown company logos', () => {
      const contentWithUnknownCompany = `## Expérience

### Unknown Company
**Role** | Period | [Company Link](https://example.com)
- Achievement`;

      const result = parseCVContent(contentWithUnknownCompany, mockFrontmatter);

      expect(result.experience).toHaveLength(1);
      expect(result.experience[0].logo).toBe('/logos/unknowncompany.png');
    });

    it('should detect current positions correctly', () => {
      const contentWith2025 = `## Expérience

### Current Company
**Role** | Jan 2024 - 2025 | [Company Link](https://example.com)
- Achievement`;

      const result = parseCVContent(contentWith2025, mockFrontmatter);

      expect(result.experience).toHaveLength(1);
      expect(result.experience[0].current).toBe(true);
    });

    it('should handle skills without icons gracefully', () => {
      const contentWithoutIcons = `## Compétences

### Skill Category
**Subtitle** | Level
- Skill item 1
- Skill item 2`;

      const result = parseCVContent(contentWithoutIcons, mockFrontmatter);

      expect(result.skills).toHaveLength(1);
      expect(result.skills[0].icon).toBeUndefined();
      expect(result.skills[0].levelIcon).toBeUndefined();
    });

    it('should preserve contact data structure', () => {
      const result = parseCVContent(mockContent, mockFrontmatter);

      expect(result.contact).toEqual({
        email: "m@mdr.cool",
        portfolio: { text: "cv.drouet.io", url: "https://cv.drouet.io" },
        linkedin: "linkedin.com/in/mathieu-drouet",
        location: "Lille, France"
      });
    });
  });

  describe('error handling and edge cases', () => {
    it('should handle completely empty content', () => {
      const result = parseCVContent('');

      expect(result.name).toBe('Mathieu Drouet');
      expect(result.education).toHaveLength(0);
      expect(result.experience).toHaveLength(0);
      expect(result.skills).toHaveLength(0);
      expect(result.interests).toHaveLength(0);
    });

    it('should handle content with only headers', () => {
      const headersOnly = `# Mathieu Drouet
## Education
## Expérience
## Compétences`;

      const result = parseCVContent(headersOnly);

      expect(result.name).toBe('Mathieu Drouet');
      expect(result.education).toHaveLength(0);
      expect(result.experience).toHaveLength(0);
      expect(result.skills).toHaveLength(0);
    });

    it('should handle invalid carbon icon patterns', () => {
      const invalidIcons = `## Coordonnées

- **invalid:icon** Test
- **carbon:** Empty name
- **carbon:123-invalid** Invalid chars`;

      const result = parseCVContent(invalidIcons);

      // Should not crash and should handle gracefully
      expect(result.contactContent).toHaveLength(3);
      expect(result.contactContent[0]).toContain('Test');
      expect(result.contactContent[1]).toContain('Empty name');
      expect(result.contactContent[2]).toContain('Invalid chars');
    });

    it('should handle malformed markdown links', () => {
      const malformedLinks = `## Coordonnées

- [Incomplete link
- [Complete link](https://example.com)
- Malformed [link with spaces] (no-parentheses)`;

      const result = parseCVContent(malformedLinks);

      expect(result.contactContent).toHaveLength(3);
      expect(result.contactContent[0]).toContain('Incomplete link');
      expect(result.contactContent[1]).toContain('<a href="https://example.com"');
      expect(result.contactContent[2]).toContain('link with spaces');
    });
  });
});