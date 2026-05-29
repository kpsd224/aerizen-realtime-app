import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT for Electron packaged app:
// use relative asset paths so file://.../dist/index.html can load JS/CSS correctly.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
