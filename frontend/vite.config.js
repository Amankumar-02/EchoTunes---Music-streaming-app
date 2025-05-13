import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
        proxy: {
            // "/api": "backend-server.onrender.com",
            "/api": "http://localhost:3000",
        },
    },
  plugins: [react()],
})
