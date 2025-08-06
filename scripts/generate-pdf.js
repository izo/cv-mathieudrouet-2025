#!/usr/bin/env node

import { mdToPdf } from 'md-to-pdf';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const projectRoot = join(__dirname, '..');
const cvMarkdownPath = join(projectRoot, 'src/content/cv/cv.md');
const outputDir = join(projectRoot, 'public');
const outputPath = join(outputDir, 'cv.pdf');

// Ensure output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Custom CSS for PDF styling
const pdfStyles = `
<style>
  @page {
    margin: 2cm;
    size: A4;
  }
  
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: none;
  }
  
  h1 {
    color: #2563eb;
    font-size: 2.5em;
    margin-bottom: 0.5em;
    border-bottom: 3px solid #2563eb;
    padding-bottom: 0.3em;
  }
  
  h2 {
    color: #1e40af;
    font-size: 1.8em;
    margin-top: 2em;
    margin-bottom: 1em;
    border-left: 4px solid #2563eb;
    padding-left: 1em;
  }
  
  h3 {
    color: #1e40af;
    font-size: 1.3em;
    margin-top: 1.5em;
    margin-bottom: 0.8em;
  }
  
  h4 {
    color: #374151;
    font-size: 1.1em;
    margin-top: 1.2em;
    margin-bottom: 0.6em;
  }
  
  p {
    margin-bottom: 1em;
  }
  
  ul {
    margin-bottom: 1.5em;
  }
  
  li {
    margin-bottom: 0.5em;
  }
  
  strong {
    color: #1f2937;
  }
  
  /* Remove icon syntax from PDF */
  strong[title*="carbon:"],
  strong[title*="tabler:"],
  strong[title*="lucide:"] {
    font-weight: bold;
  }
  
  /* Clean up markdown artifacts */
  code {
    background: #f3f4f6;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 0.9em;
  }
  
  /* Contact section styling */
  blockquote {
    border-left: 4px solid #2563eb;
    margin: 1.5em 0;
    padding-left: 1em;
    background: #f8fafc;
    padding: 1em;
    border-radius: 5px;
  }
  
  /* Experience and Education sections */
  .experience-item,
  .education-item {
    margin-bottom: 2em;
    page-break-inside: avoid;
  }
  
  /* Skills section */
  .skills-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2em;
    margin-top: 1em;
  }
  
  /* Print optimizations */
  @media print {
    body {
      font-size: 11pt;
    }
    
    h1 {
      font-size: 20pt;
    }
    
    h2 {
      font-size: 16pt;
    }
    
    h3 {
      font-size: 14pt;
    }
  }
</style>
`;

async function generatePDF() {
  try {
    console.log('📄 Génération du PDF du CV...');
    
    // Read the markdown file
    if (!existsSync(cvMarkdownPath)) {
      throw new Error(`Fichier CV non trouvé: ${cvMarkdownPath}`);
    }
    
    let markdownContent = readFileSync(cvMarkdownPath, 'utf-8');
    
    // Clean up the markdown for PDF generation
    markdownContent = cleanMarkdownForPDF(markdownContent);
    
    // Generate PDF
    const pdf = await mdToPdf(
      { content: markdownContent },
      {
        dest: outputPath,
        stylesheet: pdfStyles,
        body_class: 'cv-pdf',
        pdf_options: {
          format: 'A4',
          margin: {
            top: '2cm',
            right: '2cm',
            bottom: '2cm',
            left: '2cm'
          },
          printBackground: true,
          preferCSSPageSize: true
        }
      }
    );
    
    console.log('✅ PDF généré avec succès:', outputPath);
    console.log('📁 Taille du fichier:', (pdf.buffer.length / 1024).toFixed(2), 'KB');
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération du PDF:', error);
    process.exit(1);
  }
}

function cleanMarkdownForPDF(content) {
  // Remove icon syntax like **carbon:email** and keep only the text
  content = content.replace(/\*\*([a-zA-Z0-9:_-]+)\*\*/g, '');
  
  // Clean up multiple spaces and line breaks
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  // Remove frontmatter if present
  content = content.replace(/^---[\s\S]*?---\n/, '');
  
  // Clean up any remaining artifacts
  content = content.trim();
  
  return content;
}

// Run the generator
generatePDF();
