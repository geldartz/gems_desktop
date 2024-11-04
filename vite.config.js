import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  
  base: './',
  plugins: [
    vue(),
  ],
  optimizeDeps: {
    include: ['@vladmandic/human', '@tensorflow/tfjs'], // Ensure these are optimized
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
