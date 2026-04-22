import { defineConfig, type Options } from 'tsup';

export const createTsupConfig = (options: Options = {}) =>
  defineConfig({
    format: ['esm', 'cjs'],
    dts: true,
    minify: true,
    clean: true,
    external: ['react', 'react-dom'],
    splitting: false,
    shims: true,
    ...options,
  });
