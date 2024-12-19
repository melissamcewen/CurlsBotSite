import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    /* eslint-disable */
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'cupcake',
      'dracula',
      {
        mytheme: {
          "primary": "#65c3c8",    // Keep cupcake's primary
          "secondary": "#ef9fbc",  // Keep cupcake's secondary
          "accent": "#eeaf3a",     // Keep cupcake's accent
          "neutral": "#291334",    // Keep cupcake's neutral
          "base-100": "#362245",   // Dark purple based on neutral
          "base-200": "#2b1b37",   // Darker
          "base-300": "#201429",   // Darkest
          "base-content": "#faf7f5", // Light text (inverted from cupcake)
          "info": "#8be9fd",
          "success": "#50fa7b",
          "warning": "#f1fa8c",
          "error": "#ff5555",
          "--rounded-btn": "1.9rem",
          "--tab-border": "2px",
          "--tab-radius": "0.7rem",
        }
      },
    ],
    darkTheme: 'mytheme',
  },
} satisfies Config;

export default config;
