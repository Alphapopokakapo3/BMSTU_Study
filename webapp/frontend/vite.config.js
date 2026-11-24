import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
        proxy: {
            '/api': 'http://153.80.193.217:8000'
        }
    },
    base: '/BMSTU_Study/'
})
