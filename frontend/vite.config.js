import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
        proxy: {
            // "/api": "https://echo-tunes-backend-server.vercel.app",
            "/api": "https://echotunes-backend-server.onrender.com",
        },
    },
  plugins: [react()],
})
