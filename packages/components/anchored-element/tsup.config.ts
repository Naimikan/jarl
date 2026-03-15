import { createTsupConfig } from '../../../tsup.base.config';

export default createTsupConfig({
  entry: ['src/index.ts'],
  external: ['react', 'react-dom', '@jarl/styled-system'],
});
