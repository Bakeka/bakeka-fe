import { defineConfig } from 'windicss/helpers'
import typography from 'windicss/plugin/typography/'

export default defineConfig({
  darkMode: 'class',
  plugins: [
    typography
  ],
  extract: {
    include: [
      'index.html',
      './**/*.html',
      './**/*.tsx'
    ],
    exclude: [
      'node_modules/**/*',
      '.git/**/*',
    ]
  },
  safelist: 'p-3 p-4 p-5',
  theme: {
    extend: {
      colors: {
        teal: {
          100: '#096',
        },
      },
    },
  },
})