import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
 darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Example custom colors
        'vibe-pink': '#ec4899',
        'vibe-purple': '#a78bfa',
        'vibe-blue': '#60a5fa',
      },
      fontFamily: {
        vibe: ['"Poppins"', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};

export default config;