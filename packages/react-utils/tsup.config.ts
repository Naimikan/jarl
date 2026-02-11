import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  minify: true,
  clean: true,
  external: ['react'],
  splitting: true,
  treeshake: true,
  shims: true,
});
