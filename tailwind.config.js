/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 ESTA LÍNEA ES CLAVE
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81'
        },
        secondary: {
          50:  '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f472b6',
          600: '#ec4899',
          700: '#db2777',
          800: '#be185d',
          900: '#9d174d'
        },
        accent: '#10b981'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui']
      },
      fontSize: {
        xs:   ['0.75rem', { lineHeight: '1rem' }],
        sm:   ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem',    { lineHeight: '1.5rem' }],
        lg:   ['1.125rem',{ lineHeight: '1.75rem' }],
        xl:   ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl':['1.5rem',  { lineHeight: '2rem' }]
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        6: '1.5rem',
        8: '2rem',
        10:'2.5rem'
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        md: '0.375rem',
        lg: '0.75rem'
      }
    }
  },
  plugins: []
}
