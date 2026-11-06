/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1F4E8C', // Industrial Blue
          50: '#EEF4FB',
          100: '#D9E6F6',
          200: '#B5CDEC',
          300: '#86AADC',
          400: '#5784C7',
          500: '#366AB0',
          600: '#1F4E8C',
          700: '#193F72',
          800: '#143258',
          900: '#0F2640',
          950: '#0A1628',
        },
        accent: {
          DEFAULT: '#B51E23', // Power Red
          50: '#FDF2F2',
          100: '#FBE1E2',
          200: '#F6BFC1',
          300: '#EE8E92',
          400: '#E15B61',
          500: '#CE343A',
          600: '#B51E23',
          700: '#951A1E',
          800: '#7B191D',
          900: '#67191C',
          950: '#380A0C',
        },
        steel: {
          50: '#F5F7FA',
          100: '#EBEEF3',
          200: '#D9DEE6',
          300: '#BFC5CC',
          400: '#98A2B0',
          500: '#6F7B8C',
          600: '#556070',
          700: '#414A58',
          800: '#2A313C',
          900: '#171C25',
          950: '#0B1220',
        },
        white: '#FFFFFF', // Neutral White
        black: '#1C1C1C', // Metal Black
        silver: '#BFC5CC', // Steel Silver
        // Legacy colors for compatibility
        navy: '#1F4E8C', // Same as primary
        darkBg: '#0B1220', // Deep steel
        darkSurface: '#171C25', // Deep steel surface
        mutedGray: '#BFC5CC', // Steel Silver
        lightGray: '#BFC5CC', // Steel Silver
      },
      fontFamily: {
        'cairo': ['Cairo', 'Plus Jakarta Sans', 'sans-serif'],
        'tajawal': ['Tajawal', 'Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 1px 2px rgba(11,18,32,.04), 0 8px 24px -8px rgba(11,18,32,.10)',
        'lift': '0 2px 4px rgba(11,18,32,.05), 0 20px 40px -12px rgba(11,18,32,.22)',
        'glow-primary': '0 10px 40px -8px rgba(31,78,140,.55)',
        'glow-accent': '0 10px 40px -8px rgba(181,30,35,.55)',
        'inner-light': 'inset 0 1px 0 rgba(255,255,255,.25)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(.22,1,.36,1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(181,30,35,.45)' },
          '50%': { boxShadow: '0 0 0 14px rgba(181,30,35,0)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-40px) scale(1.1)' },
          '66%': { transform: 'translate(-30px,30px) scale(.95)' },
        },
      },
      animation: {
        'fade-up': 'fade-up .9s cubic-bezier(.22,1,.36,1) both',
        'fade-in': 'fade-in .9s ease-out both',
        'scale-in': 'scale-in .7s cubic-bezier(.22,1,.36,1) both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'pulse-glow': 'pulse-glow 2.4s ease-out infinite',
        kenburns: 'kenburns 14s ease-out both',
        blob: 'blob 14s ease-in-out infinite',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
}
