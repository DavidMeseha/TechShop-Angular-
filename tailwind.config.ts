import type { Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{html,ts}'],
  screens: {
    sm: '640px',
    md: '1024px',
    lg: '1280px',
    xl: '1920px',
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: '#2929cc',
        'primary-300': '#a5a5ed',
        'primary-100': '#d6d6f7',
        lightGray: '#f1f1f1',
        secondary: '#707070',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;

export default config;
