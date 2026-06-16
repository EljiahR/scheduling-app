import { defineConfig } from 'vite';
import devtools from 'solid-devtools/vite';
import solidPlugin from 'vite-plugin-solid';
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig({
  plugins: [devtools(), solidPlugin(), solidSvg({ defaultAsComponent: true })],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: ["next.ereck.net", "web.ereck.net"],
    watch: {
      usePolling: true
    }
  },
  build: {
    target: 'esnext',
  },
});
