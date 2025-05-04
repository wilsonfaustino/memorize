/// <reference types="vitest/config" />
/// <reference types="@testing-library/react" />
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
    coverage: {
      exclude: [
        'src/__tests__/**',
        'src/test/**',
        '**/*.d.ts',
        '**/@types/**',
        'src/components/icons/**',
        '**/main.tsx',
        'vite.config.ts',
        'dist/**',
      ],
    },
  }
})
