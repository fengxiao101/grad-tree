import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Production asset names reveal no program, component, or image names.
        // This is only a casual-copying deterrent; anything delivered to a
        // browser remains inspectable.
        entryFileNames: 'assets/[hash].js',
        chunkFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash][extname]',
        manualChunks(id) {
          const program = id.match(
            /\/src\/data\/(?:majors|minors|cotermPrograms)\/([^/]+)\.ts$/,
          );
          if (program && program[1] !== 'index') {
            return `program-${program[1]}`;
          }
        },
      },
    },
  },
  server: {
    port: parseInt(process.env.PORT ?? '5173'),
    strictPort: false,
  },
});
