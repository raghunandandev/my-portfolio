/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0a0a0a', // Deep background
          100: '#1a1a1a',     // Lighter card bg
          200: '#2a2a2a',
        },
        neon: {
          blue: '#00f3ff',    // Cyan neon
          purple: '#bc13fe',  // Purple neon
          green: '#0aff9d',   // Success neon
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Clean modern font
        mono: ['Fira Code', 'monospace'], // For code snippets
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}


// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
