import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://apoliak7777.github.io/Hosting_Website/, so assets need
  // that prefix. Set to '/' when deploying to the root of a domain.
  base: '/Hosting_Website/',
  plugins: [react()],
})
