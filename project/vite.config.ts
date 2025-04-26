import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          animations: ["framer-motion"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    open: true,
    host: true,
  },
  base: "/bread-in-the-burger-cat/", // Configuração correta para o nome do repositório
});
