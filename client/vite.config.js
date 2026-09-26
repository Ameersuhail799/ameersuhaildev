import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('gsap') || id.includes('framer-motion') || id.includes('motion') || id.includes('lenis')) {
              return 'animation-vendor'
            }
            if (id.includes('react-icons')) {
              return 'icons-vendor'
            }
            return 'vendor'
          }
        },
      },
    },
  },
})
