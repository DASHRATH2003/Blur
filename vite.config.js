import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@heroicons/react']
  },
  publicDir: 'public',
  assetsInclude: ['**/*.mp4'],
  server: {
    watch: {
      usePolling: true
    }
  }
})
