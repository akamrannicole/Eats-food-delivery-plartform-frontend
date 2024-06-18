import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5175, // Set your preferred port
    hmr: {
      protocol: 'ws://127.0.0.1:5175/', // Ensure the protocol is set correctly
      host: '127.0.0.1',
      port: 5175, // Ensure this matches the server port
    },
  },
});
