import { defineConfig } from 'vite';
import path from 'path';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        'bds-notification': './src/components/notification/index.ts',
      },
      output: {
        entryFileNames: 'assets/[name].js',
      },
    },
    target: 'es2015',
  },
  resolve: {
    alias: [
      {
        find: 'components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: 'constants',
        replacement: path.resolve(__dirname, 'src/constants'),
      },
      {
        find: 'services',
        replacement: path.resolve(__dirname, 'src/services'),
      },
      {
        find: 'styles',
        replacement: path.resolve(__dirname, 'src/styles'),
      },
      {
        find: 'types',
        replacement: path.resolve(__dirname, 'src/types'),
      },
      {
        find: 'utils',
        replacement: path.resolve(__dirname, 'src/utils'),
      },
    ],
  },
  plugins: [eslint()],
});
