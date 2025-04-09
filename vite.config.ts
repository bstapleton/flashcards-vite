import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  base: '/flashcards-vite',
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    rollupOptions: {
      external: ['react-router']
    }
  }
})