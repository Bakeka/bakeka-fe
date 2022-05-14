import { defineConfig } from 'windicss/helpers'
import formsPlugin from 'windicss/plugin/forms'
import typography from 'windicss/plugin/typography'
import colors from 'windicss/colors'

export default defineConfig({
  darkMode: 'class',
  extract: {
    include: ['./**/*.html'],
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
  plugins: [
    formsPlugin,
    typography
  ],
})