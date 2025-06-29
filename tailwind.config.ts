import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        shrinePurple: '#c3b3f4',

        // Holy palette
        'holy-white': '#f9f8f6',
        'pastel-yellow': '#fffac2',
        'neon-yellow': '#ffff33',

        // Additional gold alias for quick use
        gold: '#FFD700',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(255,255,0,0.7)' },
          '50%': { boxShadow: '0 0 20px rgba(255,255,0,1)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'divine-expand': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'halo-expand': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'glow-fast': 'glow 1.5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'divine-reveal': 'divine-expand 0.7s ease-out forwards',
        'halo-expand': 'halo-expand 1s ease-out forwards',
      },
      backgroundImage: {
        heaven: "url('/heaven.png')",
      },
    },
  },
  plugins: [],
};

export default config;
