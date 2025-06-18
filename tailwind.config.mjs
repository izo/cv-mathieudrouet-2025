/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'cv-bg': '#FFFFFF',
        'cv-paper': '#FFFFFF',
        'cv-content': '#000000',
        'cv-muted': 'rgba(0, 0, 0, 0.6)',
        'cv-light': 'rgba(0, 0, 0, 0.8)',
        'cv-card': '#F3F3F3',
        'cv-accent': '#0086F7',
        'cv-section': 'rgba(0, 0, 0, 0.04)'
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
            color: '#000000',
            a: {
              color: '#000000',
              textDecoration: 'none',
              '&:hover': {
                color: '#4B5563'
              }
            },
            h1: {
              color: '#000000',
              fontWeight: '700',
              fontSize: '2rem',
              marginBottom: '2rem'
            },
            h2: {
              color: '#000000',
              fontWeight: '700',
              fontSize: '1.5rem',
              marginTop: '3rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid #E5E7EB',
              paddingBottom: '0.5rem'
            },
            h3: {
              color: '#000000',
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
                color: '#000000'
              },
              li: {
                marginBottom: '0.5rem'
              }
            },
            strong: {
              color: '#000000',
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