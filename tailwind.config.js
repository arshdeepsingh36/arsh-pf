export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'Geist', 'sans-serif'],
      },
      colors: {
        background: '#f9f8f6',
        text: '#111827',
      },
      animation: {
        'gradient-flow': 'gradient-flow 8s ease infinite',
      },
      keyframes: {
        'gradient-flow': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      }
    },
  },
  plugins: [],
}
