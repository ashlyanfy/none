import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,PNG,JPG}'],
      }
    })
  ],
})
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // 15 МБ
    globPatterns: ['**/*.{js,css,html,png,jpg,PNG,JPG}'],
  }
})

