import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative base so the build works on GitHub Pages (/<repo>/) or any static host root
  base: './',
  plugins: [react(), tailwindcss()],
})
