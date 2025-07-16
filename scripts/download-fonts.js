#!/usr/bin/env node

import { createWriteStream, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fontsDir = join(__dirname, '..', 'public', 'fonts');

// Ensure fonts directory exists
if (!existsSync(fontsDir)) {
  mkdirSync(fontsDir, { recursive: true });
}

// Font URLs from Google Fonts
const fonts = [
  // IBM Plex Sans
  {
    url: 'https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIxsdO_v.woff2',
    filename: 'ibm-plex-sans-v19-latin-regular.woff2'
  },
  {
    url: 'https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjXr8AIxsdO_v.woff2',
    filename: 'ibm-plex-sans-v19-latin-500.woff2'
  },
  {
    url: 'https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjZ7bAIxsdO_v.woff2',
    filename: 'ibm-plex-sans-v19-latin-600.woff2'
  },
  {
    url: 'https://fonts.gstatic.com/s/ibmplexsans/v19/zYX9KVElMYYaJe8bpLHnCwDKjWr7AIxsdO_v.woff2',
    filename: 'ibm-plex-sans-v19-latin-700.woff2'
  },
  
  // IBM Plex Mono
  {
    url: 'https://fonts.gstatic.com/s/ibmplexmono/v19/-F6pfjptAgt5VM-kVkqdyU8n3kwq0n1hsQ.woff2',
    filename: 'ibm-plex-mono-v19-latin-regular.woff2'
  },
  {
    url: 'https://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1ioStndnuCs.woff2',
    filename: 'ibm-plex-mono-v19-latin-500.woff2'
  },
  {
    url: 'https://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1iAUtndnuCs.woff2',
    filename: 'ibm-plex-mono-v19-latin-600.woff2'
  },
  {
    url: 'https://fonts.gstatic.com/s/ibmplexmono/v19/-F6sfjptAgt5VM-kVkqdyU8n1i4Qtndnucs.woff2',
    filename: 'ibm-plex-mono-v19-latin-700.woff2'
  },
  
  // Lora
  {
    url: 'https://fonts.gstatic.com/s/lora/v32/0QIvMX1D_JOuMwr7Ig.woff2',
    filename: 'lora-v32-latin-regular.woff2'
  },
  {
    url: 'https://fonts.gstatic.com/s/lora/v32/0QIgMX1D_JOuO_SzrhQb.woff2',
    filename: 'lora-v32-latin-500.woff2'
  },
  {
    url: 'https://fonts.gstatic.com/s/lora/v32/0QIgMX1D_JOuOwmbrhQb.woff2',
    filename: 'lora-v32-latin-600.woff2'
  },
  {
    url: 'https://fonts.gstatic.com/s/lora/v32/0QIgMX1D_JOuO82brhQb.woff2',
    filename: 'lora-v32-latin-700.woff2'
  }
];

async function downloadFont(font) {
  const filePath = join(fontsDir, font.filename);
  
  // Skip if already exists
  if (existsSync(filePath)) {
    console.log(`✓ ${font.filename} already exists`);
    return;
  }
  
  console.log(`⬇️  Downloading ${font.filename}...`);
  
  return new Promise((resolve, reject) => {
    const file = createWriteStream(filePath);
    
    https.get(font.url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${font.filename}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded ${font.filename}`);
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      reject(err);
    });
  });
}

async function downloadAllFonts() {
  console.log('🔽 Starting font download...');
  
  try {
    for (const font of fonts) {
      await downloadFont(font);
    }
    console.log('✅ All fonts downloaded successfully!');
  } catch (error) {
    console.error('❌ Error downloading fonts:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  downloadAllFonts();
}