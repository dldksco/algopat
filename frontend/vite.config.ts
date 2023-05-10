import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // "/solved": {
      //   target: "https://solved.ac",
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/solved/, "/api/v3/user/show"),
      // },
    },
  },
  plugins: [react(), eslint()],

  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
