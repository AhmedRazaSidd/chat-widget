import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // vite.config.ts
  build: {
    lib: {
      entry: "src/main.tsx",
      name: "ChatWidget",
      fileName: "widget",
      formats: ["umd"],
    },
    outDir: "dist",
  },
});
