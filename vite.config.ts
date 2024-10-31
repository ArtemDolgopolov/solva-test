import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  }
});