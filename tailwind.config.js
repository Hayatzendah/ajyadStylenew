/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F4E8C', // Industrial Blue
        accent: '#B51E23', // Power Red
        white: '#FFFFFF', // Neutral White
        black: '#1C1C1C', // Metal Black
        silver: '#BFC5CC', // Steel Silver
        // Legacy colors for compatibility
        navy: '#1F4E8C', // Same as primary
        darkBg: '#1C1C1C', // Metal Black
        darkSurface: '#1C1C1C', // Metal Black
        mutedGray: '#BFC5CC', // Steel Silver
        lightGray: '#BFC5CC', // Steel Silver
      },
      fontFamily: {
        'cairo': ['Cairo', 'sans-serif'],
        'tajawal': ['Tajawal', 'sans-serif'],
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
