export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: '#00d4ff',
        accent: '#8b5cf6',
        bg: '#05060a'
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui']
      }
    }
  },
  plugins: []
}
