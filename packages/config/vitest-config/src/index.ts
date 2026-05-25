import react from '@vitejs/plugin-react';
import { defineConfig, mergeConfig } from 'vitest/config';

export const baseConfig = defineConfig({
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['src/**/*.{test,spec}.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.{test,spec}.ts', 'src/**/index.ts'],
    },
  },
});

export const reactConfig = mergeConfig(
  baseConfig,
  defineConfig({
    plugins: [react()],
    test: {
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      coverage: {
        include: ['src/**/*.{ts,tsx}'],
        exclude: ['src/**/*.{test,spec}.{ts,tsx}', 'src/**/index.ts'],
      },
    },
  }),
);
