import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

interface ReactLibConfigOptions {
  entry?: string;
  externalDeps?: string[];
}

interface LibConfigOptions {
  entry?: string;
  externalDeps?: string[];
}

export function createReactLibConfig({
  entry = 'src/index.ts',
  externalDeps = [],
}: ReactLibConfigOptions = {}) {
  return defineConfig({
    plugins: [
      react(),
      libInjectCss(),
      dts({
        include: ['src'],
        exclude: ['src/**/*.{test,spec}.{ts,tsx}'],
      }),
    ],
    build: {
      lib: {
        entry,
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime', ...externalDeps],
      },
    },
  });
}

export function createLibConfig({
  entry = 'src/index.ts',
  externalDeps = [],
}: LibConfigOptions = {}) {
  return defineConfig({
    plugins: [
      dts({
        include: ['src'],
        exclude: ['src/**/*.{test,spec}.{ts,tsx}'],
      }),
    ],
    build: {
      lib: {
        entry,
        formats: ['es', 'cjs'],
        fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      },
      rollupOptions: {
        external: [...externalDeps],
      },
    },
  });
}
