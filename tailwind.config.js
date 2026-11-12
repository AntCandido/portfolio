/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', 'sans-serif'],
    },
    extend: {
      colors: {
        ic: {
          orange: '#f97316',
          'orange-light': '#fb923c',
          'orange-dark': '#ea580c',
          'orange-glow': '#ff7a00',
          dark: '#08090d',
          'dark-card': '#0f1118',
          'dark-elevated': '#151822',
        },
      },
      backgroundImage: {
        'hero-image': "url('/images/hero-bg.png')",
        'grid-pattern':
          'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
      },
      fontFamily: {
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
      boxShadow: {
        button: '0px 0px 48px 4px rgba(249, 115, 22, 0.45)',
        'button-hover': '0px 0px 60px 8px rgba(251, 146, 60, 0.65)',
        photo: '0 24px 80px -20px rgba(0, 0, 0, 0.85)',
        'glow-orange': '0 0 25px -5px rgba(249, 115, 22, 0.35)',
        'glow-lg': '0 0 50px -10px rgba(234, 88, 12, 0.35)',
        'card-hover':
          '0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 25px -5px rgba(249, 115, 22, 0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        float: 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
