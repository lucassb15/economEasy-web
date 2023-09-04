import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@types': path.resolve(__dirname, 'src/@types'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
    },
  },
  server: {
    fs: {
      // Permite o acesso ao diretório de uploads e qualquer subdiretório
      allow: [
        'C:/Users/Lucas Barbosa/Documents/GitHub/fideleSe-backend/uploads',
        'C:/Users/Lucas Barbosa/Documents/GitHub/fideleSe-web/src',
      ],
    },
  },
})
