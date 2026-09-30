import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';
import fs from 'fs';

function syncRootIndex(): Plugin {
  return {
    name: 'sync-root-index',
    closeBundle() {
      const distIndex = path.resolve(__dirname, 'dist/index.html');
      if (fs.existsSync(distIndex)) {
        const content = fs.readFileSync(distIndex, 'utf-8');
        const parentIndex = path.resolve(__dirname, '../index.html');
        try {
          fs.writeFileSync(parentIndex, content);
        } catch (e) {
          // Parent dir sync optional
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), viteSingleFile(), syncRootIndex()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
