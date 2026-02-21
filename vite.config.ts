import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
devOptions: {
  enabled: false
}
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['assets/icons/icon-192.webp', 'assets/icons/icon-512.webp'],
      manifest: {
        name: 'Моя Ферма',
        short_name: 'Ферма',
        start_url: '/',
        display: 'standalone',
        background_color: '#1a1a2e',
        theme_color: '#6b4e2e',
        icons: [
          {
            src: '/assets/icons/icon-192.webp',
            sizes: '192x192',
            type: 'image/webp',
          },
          {
            src: '/assets/icons/icon-512.webp',
            sizes: '512x512',
            type: 'image/webp',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
        navigateFallback: '/index.html',
        globPatterns: [
          '**/*.{js,css,html,png,jpg,svg,ico,webmanifest,woff2}',
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-styles',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ],
})
