/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'cv-bg': 'rgb(143, 135, 113)',
        'cv-paper': '#F2EFE6',
        'cv-content': '#FCFBF8'
      },
      fontFamily: {
        'cormorant': ['Cormorant', 'serif']
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