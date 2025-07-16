import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  build: {
    outDir: 'build',
    rollupOptions: {
      input: {
        script: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/script.js'),
        style: resolve(fileURLToPath(new URL('.', import.meta.url)), 'src/style.css'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  css: {
    devSourcemap: true,
  },
  experimental: {
    skipSsrTransform: true,
  },
});