/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Zed Core Colors
        'accent-blue': 'var(--color-accent-blue)',
        'accent-blue-alt': 'var(--color-accent-blue-alt)',
        'neutral': 'var(--color-neutral)',
        
        // Zed Cream Palette
        'cream-50': 'var(--color-cream-50)',
        'cream-100': 'var(--color-cream-100)',
        'cream-200': 'var(--color-cream-200)',
        'cream-300': 'var(--color-cream-300)',
        'cream-400': 'var(--color-cream-400)',
        'cream-500': 'var(--color-cream-500)',
        'cream-600': 'var(--color-cream-600)',
        'cream-700': 'var(--color-cream-700)',
        'cream-800': 'var(--color-cream-800)',
        'cream-900': 'var(--color-cream-900)',
        
        // Zed OffGray Palette
        'offgray-50': 'var(--color-offgray-50)',
        'offgray-100': 'var(--color-offgray-100)',
        'offgray-200': 'var(--color-offgray-200)',
        'offgray-300': 'var(--color-offgray-300)',
        'offgray-400': 'var(--color-offgray-400)',
        'offgray-500': 'var(--color-offgray-500)',
        'offgray-600': 'var(--color-offgray-600)',
        'offgray-700': 'var(--color-offgray-700)',
        'offgray-800': 'var(--color-offgray-800)',
        'offgray-900': 'var(--color-offgray-900)',
        'offgray-950': 'var(--color-offgray-950)',
        'offgray-1000': 'var(--color-offgray-1000)',
        
        // CV-specific mappings (legacy compatibility)
        'cv-bg': 'var(--cv-bg)',
        'cv-paper': 'var(--cv-paper)',
        'cv-content': 'var(--cv-content)',
        'cv-muted': 'var(--cv-muted)',
        'cv-light': 'var(--cv-light)',
        'cv-card': 'var(--cv-card)',
        'cv-accent': 'var(--cv-accent)',
        'cv-section': 'var(--cv-section)',
        'cv-border': 'var(--cv-border)',
        'cv-shadow': 'var(--cv-shadow)',
        'cv-focus': 'var(--cv-focus)'
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'glass': '12px',
        'heavy': '24px',
        'ultra': '48px'
      },
      backgroundImage: {
        // Gradients de surface pour l'effet verre
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'glass-radial': 'radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.15) 0%, transparent 50%)',
        'glass-shine': 'linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.7) 50%, transparent 60%)',
        // Reflets et lumière
        'light-leak': 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)',
        'aurora': 'linear-gradient(45deg, rgba(255, 119, 181, 0.1) 0%, rgba(255, 185, 120, 0.1) 50%, rgba(120, 255, 214, 0.1) 100%)',
        // Square gradient background
        'square-gradient': 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'
      },
      boxShadow: {
        // Zed Shadow System
        '2xs': 'var(--shadow-2xs)',
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        
        // Zed Specific Shadows
        'zed-default': 'var(--sh-default)',
        'zed-alt': 'var(--sh-alt)',
        'zed-alt-opposite': 'var(--sh-alt-opposite)',
        
        // Legacy compatibility
        'glass-sm': 'var(--shadow-sm)',
        'glass': 'var(--shadow-md)',
        'glass-lg': 'var(--shadow-lg)',
        'zed': 'var(--shadow-md)',
        'zed-lg': 'var(--shadow-lg)',
        'zed-hover': 'var(--shadow-sm)'
      },
      fontFamily: {
        // Lumon Font Families
        'agrandir': 'var(--font-agrandir)',
        'writer': 'var(--font-writer)',
        'lora': 'var(--font-lora)',
        'ibm-plex': 'var(--font-ibm-plex)',
        'ibm-plex-mono': 'var(--font-ibm-plex-mono)',
        'mono': 'var(--font-ibm-plex-mono)',
        
        // Legacy compatibility
        'sans': 'var(--font-ibm-plex)',
        'serif': 'var(--font-lora)',
        'cormorant': 'var(--font-lora)',
        'inter': 'var(--font-ibm-plex)'
      },
      fontSize: {
        // Zed Heading Scale
        'h0': ['clamp(2.25rem, 1.5rem + 2.5vw, 3rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'h1': ['clamp(1.85rem, 1.3rem + 2.5vw, 2.15rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['clamp(1.5rem, 1.2rem + 1vw, 1.7rem)', { lineHeight: '1.25', fontWeight: '700' }],
        'h3': ['clamp(1.15rem, 1rem + 0.75vw, 1.35rem)', { lineHeight: '1.3', fontWeight: '700' }],
        'h4': ['clamp(1.125rem, 0.9rem + 0.75vw, 1.15rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'h5': ['clamp(1rem, 0.9rem + 0.5vw, 1.2rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'h6': ['clamp(1rem, 0.9rem + 0.5vw, 1.1rem)', { lineHeight: '1.1', fontWeight: '700' }],
        
        // Zed Body Text
        'body': ['16px', { lineHeight: '1.44', fontWeight: '400' }],
        'caption': ['14px', { lineHeight: '1.44', fontWeight: '400' }],
        'small': ['0.8125rem', { lineHeight: '1.4', fontWeight: '400' }],
        'tiny': ['0.71875rem', { lineHeight: '1.3', fontWeight: '400' }],
        
        // Legacy compatibility
        'hero': ['clamp(2.25rem, 1.5rem + 2.5vw, 3rem)', { lineHeight: '1.2', fontWeight: '700' }],
        'section': ['clamp(1.5rem, 1.2rem + 1vw, 1.7rem)', { lineHeight: '1.25', fontWeight: '700' }],
        'company': ['clamp(1.15rem, 1rem + 0.75vw, 1.35rem)', { lineHeight: '1.3', fontWeight: '700' }],
        'role': ['1.375rem', { lineHeight: '1.3', fontWeight: '400' }],
        'date': ['1.125rem', { lineHeight: '1.3', fontWeight: '400' }]
      },
      spacing: {
        'section': '2rem',   // 32px spacing between sections
        'card': '2rem',      // 32px padding inside cards
        'page': '4rem'       // 64px left margin
      },
      borderRadius: {
        // Zed Radius System
        'xs': 'var(--radius-xs)',
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
        '4xl': 'var(--radius-4xl)',
        
        // Legacy compatibility
        'card': 'var(--radius-lg)'
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '590',
        'bold': '700'
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--cv-content)',
            fontFamily: 'var(--font-ibm-plex)',
            lineHeight: '1.44',
            
            // Zed-compliant links
            a: {
              color: 'var(--cv-accent)',
              textDecoration: 'none',
              transition: 'all var(--default-transition-duration) var(--ease-out)',
              '&:hover': {
                color: 'var(--color-accent-blue-alt)',
                textDecoration: 'underline'
              },
              '&:focus': {
                outline: '2px solid var(--cv-focus)',
                outlineOffset: '2px',
                borderRadius: '2px'
              }
            },
            
            // Lumon heading hierarchy with Lora
            h1: {
              fontFamily: 'var(--font-lora)',
              color: 'var(--cv-accent)',
              fontWeight: '700',
              fontSize: 'clamp(1.85rem, 1.3rem + 2.5vw, 2.15rem)',
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
              marginTop: '0',
              marginBottom: '2rem',
              textAlign: 'center'
            },
            
            h2: {
              fontFamily: 'var(--font-lora)',
              color: 'var(--cv-accent)',
              fontWeight: '700',
              fontSize: 'clamp(1.5rem, 1.2rem + 1vw, 1.7rem)',
              letterSpacing: '-0.005em',
              lineHeight: '1.25',
              marginTop: '3rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid var(--cv-border)',
              paddingBottom: '0.5rem'
            },
            
            h3: {
              fontFamily: 'var(--font-lora)',
              color: 'var(--cv-content)',
              fontWeight: '700',
              fontSize: 'clamp(1.15rem, 1rem + 0.75vw, 1.35rem)',
              letterSpacing: '-0.005em',
              lineHeight: '1.3',
              marginTop: '2rem',
              marginBottom: '1rem'
            },
            
            // Zed body text
            p: {
              fontSize: '16px',
              lineHeight: '1.44',
              marginBottom: '1.5rem',
              color: 'var(--cv-content)'
            },
            
            // Zed lists
            ul: {
              marginBottom: '2rem',
              paddingLeft: '1.5rem',
              'li::marker': {
                color: 'var(--cv-accent)'
              },
              li: {
                marginBottom: '0.5rem',
                fontSize: '16px',
                lineHeight: '1.44',
                color: 'var(--cv-content)'
              }
            },
            
            // Zed emphasis
            strong: {
              color: 'var(--cv-content)',
              fontWeight: '700'
            },
            
            // Code styling
            code: {
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: '0.875rem',
              backgroundColor: 'var(--color-cream-100)',
              padding: '0.125rem 0.25rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--cv-content)'
            },
            
            // Blockquotes
            blockquote: {
              borderLeft: '4px solid var(--cv-accent)',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              color: 'var(--cv-muted)',
              marginLeft: '0',
              marginRight: '0'
            }
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}