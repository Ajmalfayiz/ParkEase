import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // Vercel serves this app at the domain root.  A GitHub Pages base path here
  // makes Vite generate requests such as /parkEase/assets/... which 404.
  base: "/",
  plugins: [react(), tailwindcss()]
})
