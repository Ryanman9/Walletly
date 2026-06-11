import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      recharts: fileURLToPath(new URL('./src/lib/recharts-lite.jsx', import.meta.url)),
    },
  },
})