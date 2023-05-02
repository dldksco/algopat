import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      "/api":{
        target: 'https://solved.ac',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api/v3/user/show')
      },
      // "/api":{
      //   target: 'http://127.0.0.1:5000',
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/api/, '/api/v1/dinosaurs')
      // }
      
    }
  },
  plugins: [react(), eslint()],

  resolve: {
    alias: {
      "@": "/src",
    },
  },
});