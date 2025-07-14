#!/usr/bin/env node
/**
 * Content Change Detection Script
 * Watches for changes in CV content during build and updates cache
 */

import { watch, statSync } from 'fs';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { createHash } from 'crypto';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const contentPath = join(projectRoot, 'src/content/cv/cv.md');
const cacheFile = join(projectRoot, '.content-cache.json');

// Load or create cache
function loadCache() {
  if (existsSync(cacheFile)) {
    try {
      return JSON.parse(readFileSync(cacheFile, 'utf8'));
    } catch (error) {
      console.warn('Failed to load content cache:', error.message);
    }
  }
  return { lastHash: null, lastModified: null };
}

// Save cache
function saveCache(cache) {
  try {
    writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.warn('Failed to save content cache:', error.message);
  }
}

// Generate content hash
function getContentHash(content) {
  return createHash('sha256').update(content).digest('hex');
}

// Check for changes
function checkContentChanges() {
  if (!existsSync(contentPath)) {
    console.warn('CV content file not found:', contentPath);
    return false;
  }

  const cache = loadCache();
  const content = readFileSync(contentPath, 'utf8');
  const currentHash = getContentHash(content);
  const stats = statSync(contentPath);
  const currentModified = stats.mtime.toISOString();

  const hasChanged = cache.lastHash !== currentHash || cache.lastModified !== currentModified;
  
  if (hasChanged) {
    console.log('📝 CV content changes detected');
    console.log(`   Hash: ${cache.lastHash} → ${currentHash}`);
    console.log(`   Modified: ${cache.lastModified} → ${currentModified}`);
    
    saveCache({
      lastHash: currentHash,
      lastModified: currentModified
    });
    
    return true;
  }

  return false;
}

// Watch mode
function watchContent() {
  console.log('👀 Watching CV content for changes...');
  
  // Initial check
  checkContentChanges();
  
  // Watch for file changes
  watch(contentPath, (eventType, filename) => {
    if (eventType === 'change') {
      setTimeout(() => {
        if (checkContentChanges()) {
          console.log('🔄 Content updated - build will pick up changes');
        }
      }, 100); // Debounce
    }
  });
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'check':
    const changed = checkContentChanges();
    if (changed) {
      console.log('✅ Content cache updated');
    } else {
      console.log('✅ No content changes detected');
    }
    process.exit(0); // Always exit successfully for build
    break;
    
  case 'watch':
    watchContent();
    break;
    
  default:
    console.log('Usage:');
    console.log('  node scripts/watch-content.js check   # Check for changes once');
    console.log('  node scripts/watch-content.js watch   # Watch for changes continuously');
    process.exit(1);
}