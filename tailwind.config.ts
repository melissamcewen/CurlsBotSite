import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-up': {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-30px)',
            opacity: '0',
          },
        },
        'slide-in-bottom': {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        'slide-up-exit': {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-30px)',
            opacity: '0',
          },
        },
        'slide-in-enter': {
          '0%': {
            transform: 'translateY(20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        }
      },
      animation: {
        'slide-up': 'slide-up 0.4s ease-out forwards',
        'slide-in-bottom': 'slide-in-bottom 0.4s ease-out forwards',
        'slide-up-exit': 'slide-up-exit 0.4s ease-out forwards',
        'slide-in-enter': 'slide-in-enter 0.4s ease-out forwards'
      },
    },
  },
  plugins: [
    /* eslint-disable */
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'cupcake',
      {
        curlsbotdark: {
          primary: '#65c3c8', // Keep cupcake's primary
          secondary: '#ef9fbc', // Keep cupcake's secondary
          accent: '#eeaf3a', // Keep cupcake's accent
          neutral: '#291334', // Keep cupcake's neutral
          'base-100': '#362245', // Dark purple based on neutral
          'base-200': '#2b1b37', // Darker
          'base-300': '#201429', // Darkest
          'base-content': '#faf7f5', // Light text (inverted from cupcake)
          info: '#00b5fb',
          success: '#00a96e',
          warning: '#ffbf00',
          error: '#ff6368',
          '--rounded-btn': '1.9rem',
          '--tab-border': '2px',
          '--tab-radius': '0.7rem',
        },
      },
    ],
    darkTheme: 'curlsbotdark',
  },
} satisfies Config;

export default config;
