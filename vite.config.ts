import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/", // 👈 Cố định base root để hoạt động đúng trong Pi Browser
  plugins: [react()],
})
