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
        'holy-white': '#f9f8f6',
        'pastel-yellow': '#fffac2',
        'neon-yellow': '#ffff33',
        gold: '#FFD700',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(255,255,0,0.7)' },
          '50%': { boxShadow: '0 0 20px rgba(255,255,0,1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 6px rgba(183, 156, 255, 0.5)' },
          '50%': { boxShadow: '0 0 12px rgba(183, 156, 255, 0.9)' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 4px #ec4899' },
          '50%': { boxShadow: '0 0 20px #ec4899, 0 0 40px #db2777' },
          '100%': { boxShadow: '0 0 4px #ec4899' },
        },
        'divine-expand': {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'halo-expand': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'gradient-flow': {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '0% center' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'glow-fast': 'glow 1.5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.4s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'divine-reveal': 'divine-expand 0.7s ease-out forwards',
        'halo-expand': 'halo-expand 1s ease-out forwards',
        'gradient-flow': 'gradient-flow 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-in-out',
      },
      backgroundImage: {
        heaven: "url('/heaven.png')",
      },
      typography: (theme) => ({
        invert: {
          css: {
            thead: {
              borderBottomColor: theme('colors.white / 10'),
            },
            'thead th': {
              backgroundColor: 'transparent',
              borderColor: theme('colors.white / 10'),
              padding: '0.5rem 1rem',
              textAlign: 'left',
            },
            'tbody td': {
              borderColor: theme('colors.white / 5'),
              padding: '0.5rem 1rem',
              textAlign: 'left',
            },
            table: {
              borderCollapse: 'collapse',
              width: '100%',
            },
            'tr:nth-child(even)': {
              backgroundColor: theme('colors.white / 5'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
