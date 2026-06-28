export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#06090F', 900: '#0B1020', 800: '#111829', 700: '#1A2438' },
        amber: { 400: '#F5A623', 300: '#F7BC5A', 200: '#FADA90' },
        slate: { 400: '#8B95A8', 300: '#B2BAC8', 200: '#D4D9E2' },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    }
  },
  plugins: []
}
