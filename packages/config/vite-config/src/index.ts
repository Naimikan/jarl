import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

interface ReactLibConfigOptions {
  entry?: string;
  externalDeps?: string[];
}

interface LibConfigOptions {
  entry?: string;
  externalDeps?: string[];
  plugins?: Plugin[];
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
        output: {
          banner: '"use client";',
        },
      },
    },
  });
}

export function createLibConfig({
  entry = 'src/index.ts',
  externalDeps = [],
  plugins = [],
}: LibConfigOptions = {}) {
  return defineConfig({
    plugins: [
      dts({
        include: ['src'],
        exclude: ['src/**/*.{test,spec}.{ts,tsx}'],
      }),
      ...plugins,
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
