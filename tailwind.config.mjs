/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'cv-bg': '#F5F5F7',
        'cv-paper': 'rgba(255, 255, 255, 0.7)',
        'cv-content': '#1D1D1F',
        'cv-muted': 'rgba(29, 29, 31, 0.6)',
        'cv-light': 'rgba(29, 29, 31, 0.8)',
        'cv-card': 'rgba(255, 255, 255, 0.5)',
        'cv-accent': '#0071E3',
        'cv-section': 'rgba(255, 255, 255, 0.3)',
        'cv-glass': 'rgba(255, 255, 255, 0.25)',
        'cv-glass-border': 'rgba(255, 255, 255, 0.18)'
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
        'aurora': 'linear-gradient(45deg, rgba(255, 119, 181, 0.1) 0%, rgba(255, 185, 120, 0.1) 50%, rgba(120, 255, 214, 0.1) 100%)'
      },
      boxShadow: {
        // Ombres multicouches pour la profondeur
        'glass-sm': '0 2px 8px rgba(0, 0, 0, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 2px 0 0 rgba(255, 255, 255, 0.2)',
        'glass-lg': '0 20px 70px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 2px 0 0 rgba(255, 255, 255, 0.2)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
        'glass-border': 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        'cormorant': ['Cormorant', 'serif']
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1', fontWeight: '600' }],      // ~56px for main title
        'section': ['2rem', { lineHeight: '1.1', fontWeight: '600' }],   // 32px for section titles  
        'company': ['1.375rem', { lineHeight: '1.3', fontWeight: '600' }], // 22px for company names
        'role': ['1.375rem', { lineHeight: '1.3', fontWeight: '400' }],    // 22px for roles
        'date': ['1.125rem', { lineHeight: '1.3', fontWeight: '400' }],    // 18px for dates
        'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],        // 16px for body text
        '4xl': '2.5rem',
        '3xl': '2rem',
        '2xl': '1.5rem'
      },
      spacing: {
        'section': '2rem',   // 32px spacing between sections
        'card': '2rem',      // 32px padding inside cards
        'page': '4rem'       // 64px left margin
      },
      borderRadius: {
        'card': '2rem'       // 32px border radius
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
            color: '#1D1D1F',
            a: {
              color: '#0071E3',
              textDecoration: 'none',
              '&:hover': {
                color: '#0077ED',
                textDecoration: 'underline'
              }
            },
            h1: {
              color: '#1D1D1F',
              fontWeight: '700',
              fontSize: '2rem',
              marginBottom: '2rem'
            },
            h2: {
              color: '#1D1D1F',
              fontWeight: '700',
              fontSize: '1.5rem',
              marginTop: '3rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
              paddingBottom: '0.5rem'
            },
            h3: {
              color: '#1D1D1F',
              fontWeight: '700',
              fontSize: '1.25rem',
              marginTop: '2rem',
              marginBottom: '1rem'
            },
            p: {
              marginBottom: '1.5rem',
              textAlign: 'justify'
            },
            ul: {
              marginBottom: '2rem',
              'li::marker': {
                color: '#1D1D1F'
              },
              li: {
                marginBottom: '0.5rem'
              }
            },
            strong: {
              color: '#1D1D1F',
              fontWeight: '700'
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