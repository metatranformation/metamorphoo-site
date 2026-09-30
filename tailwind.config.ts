import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          950: '#04060F',
          900: '#070B1A',
          800: '#0B1026',
          700: '#111938',
          600: '#1A2450',
          500: '#26325F',
        },
        gold: {
          50: '#FFF8E7',
          100: '#FFEFC2',
          200: '#FFE099',
          300: '#FFD166',
          400: '#F5B942',
          500: '#E09B22',
          600: '#B87A12',
        },
        emerald2: {
          300: '#5FE3B3',
          400: '#2ED39B',
          500: '#17B890',
          600: '#0E9473',
        },
        violet2: {
          400: '#9E86FF',
          500: '#7C5CFF',
          600: '#5E3FE0',
        },
        cream: '#F7F3EA',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(245, 185, 66, 0.45)',
        'glow-emerald': '0 0 40px -8px rgba(46, 211, 155, 0.45)',
        card: '0 24px 60px -24px rgba(4, 6, 15, 0.9)',
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(circle at 50% 0%, rgba(245,185,66,0.22), transparent 60%)',
        'grid-fade':
          'linear-gradient(to right, rgba(247,243,234,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,243,234,0.05) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(2deg)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '33%': { transform: 'translateY(-24px) translateX(12px)' },
          '66%': { transform: 'translateY(12px) translateX(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.06)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'rise-fade': {
          '0%': { opacity: '0', transform: 'translateY(26px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'wing-beat': {
          '0%,100%': { transform: 'rotateY(0deg) scaleX(1)' },
          '50%': { transform: 'rotateY(-38deg) scaleX(0.55)' },
        },
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float-slow 14s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        'pulse-glow': 'pulse-glow 5s ease-in-out infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        'rise-fade': 'rise-fade 0.9s cubic-bezier(0.16,1,0.3,1) both',
        'wing-beat': 'wing-beat 1.6s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
