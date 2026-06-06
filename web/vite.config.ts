import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [devtools(), solidPlugin()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: ["next.ereck.net", "web.ereck.net"]
  },
  build: {
    target: 'esnext',
  },
});
