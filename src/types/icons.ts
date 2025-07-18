/**
 * Types pour le système d'icônes dynamique
 */

export type IconSet = 'carbon' | 'tabler' | 'lucide' | 'heroicons' | 'feather';

export interface IconMapping {
  [iconName: string]: {
    [iconSet in IconSet]?: string;
  };
}

export interface IconConfig {
  defaultSet: IconSet;
  mappings: IconMapping;
  fallbackIcon: string;
}

export interface ParsedIcon {
  set: IconSet;
  name: string;
  original: string;
  mapped: string;
}

export interface IconParseResult {
  success: boolean;
  icon?: ParsedIcon;
  error?: string;
  fallback?: ParsedIcon;
}

// Mapping des icônes communes entre les différents sets
export const ICON_MAPPINGS: IconMapping = {
  // Communication
  'email': {
    'carbon': 'email',
    'tabler': 'mail',
    'lucide': 'mail',
    'heroicons': 'envelope',
    'feather': 'mail'
  },
  'phone': {
    'carbon': 'phone',
    'tabler': 'phone',
    'lucide': 'phone',
    'heroicons': 'phone',
    'feather': 'phone'
  },
  'globe': {
    'carbon': 'earth',
    'tabler': 'world',
    'lucide': 'globe',
    'heroicons': 'globe-alt',
    'feather': 'globe'
  },
  
  // Navigation & Interface
  'location': {
    'carbon': 'location',
    'tabler': 'map-pin',
    'lucide': 'map-pin',
    'heroicons': 'map-pin',
    'feather': 'map-pin'
  },
  'search': {
    'carbon': 'search',
    'tabler': 'search',
    'lucide': 'search',
    'heroicons': 'magnifying-glass',
    'feather': 'search'
  },
  'home': {
    'carbon': 'home',
    'tabler': 'home',
    'lucide': 'home',
    'heroicons': 'home',
    'feather': 'home'
  },
  
  // Education & Travail
  'school': {
    'carbon': 'education',
    'tabler': 'school',
    'lucide': 'graduation-cap',
    'heroicons': 'academic-cap',
    'feather': 'book'
  },
  'briefcase': {
    'carbon': 'portfolio',
    'tabler': 'briefcase',
    'lucide': 'briefcase',
    'heroicons': 'briefcase',
    'feather': 'briefcase'
  },
  'certificate': {
    'carbon': 'certificate',
    'tabler': 'certificate',
    'lucide': 'award',
    'heroicons': 'trophy',
    'feather': 'award'
  },
  
  // Compétences & Niveaux
  'star': {
    'carbon': 'star-filled',
    'tabler': 'star',
    'lucide': 'star',
    'heroicons': 'star',
    'feather': 'star'
  },
  'level': {
    'carbon': 'skill-level',
    'tabler': 'trending-up',
    'lucide': 'trending-up',
    'heroicons': 'chart-bar',
    'feather': 'trending-up'
  },
  'badge': {
    'carbon': 'badge',
    'tabler': 'badge',
    'lucide': 'badge',
    'heroicons': 'shield-check',
    'feather': 'award'
  },
  
  // Personnel & Loisirs
  'heart': {
    'carbon': 'favorite',
    'tabler': 'heart',
    'lucide': 'heart',
    'heroicons': 'heart',
    'feather': 'heart'
  },
  'camera': {
    'carbon': 'camera',
    'tabler': 'camera',
    'lucide': 'camera',
    'heroicons': 'camera',
    'feather': 'camera'
  },
  'music': {
    'carbon': 'music',
    'tabler': 'music',
    'lucide': 'music',
    'heroicons': 'musical-note',
    'feather': 'music'
  },
  
  // Transport & Mobilité
  'airplane': {
    'carbon': 'airplane',
    'tabler': 'plane',
    'lucide': 'plane',
    'heroicons': 'paper-airplane',
    'feather': 'send'
  },
  'car': {
    'carbon': 'car',
    'tabler': 'car',
    'lucide': 'car',
    'heroicons': 'truck',
    'feather': 'truck'
  },
  
  // Identification & Contact
  'identification': {
    'carbon': 'identification',
    'tabler': 'id',
    'lucide': 'id-card',
    'heroicons': 'identification',
    'feather': 'credit-card'
  },
  'user': {
    'carbon': 'user',
    'tabler': 'user',
    'lucide': 'user',
    'heroicons': 'user',
    'feather': 'user'
  }
};

// Configuration par défaut
export const DEFAULT_ICON_CONFIG: IconConfig = {
  defaultSet: 'carbon',
  mappings: ICON_MAPPINGS,
  fallbackIcon: 'question-mark'
};