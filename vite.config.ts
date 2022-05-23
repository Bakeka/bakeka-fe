import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'
import preact from '@preact/preset-vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    WindiCSS(),
    preact()
  ],
})