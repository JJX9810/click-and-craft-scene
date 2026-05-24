import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootSrc = path.resolve(__dirname, "../src");

// Static IONOS build. Self-contained — does NOT touch the main Lovable/Cloudflare/TanStack-Start setup.
// Reuses route files and components from ../src/ via a tanstack-router shim
// so we keep one source of truth for content.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: path.resolve(__dirname, "../public"),
  resolve: {
    alias: [
      // Shim TanStack Router → react-router-dom + helmet so existing routes compile unchanged.
      { find: /^@tanstack\/react-router$/, replacement: path.resolve(__dirname, "src/tanstack-shim.tsx") },
      { find: /^@tanstack\/react-start$/, replacement: path.resolve(__dirname, "src/tanstack-shim.tsx") },
      // Reuse all components/assets/data from the main project.
      { find: /^@\//, replacement: rootSrc + "/" },
      { find: "@", replacement: rootSrc },
    ],
    dedupe: ["react", "react-dom", "react-router-dom", "@tanstack/react-query"],
  },
  build: {
    sourcemap: false,
  },
  ssr: {
    noExternal: true,
  },
});
