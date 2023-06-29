import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from "vite-plugin-env-compatible";
import svgr from "vite-plugin-svgr";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "REACT_APP_",

  plugins: [react(), envCompatible, svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
