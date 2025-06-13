import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts', // or './src/vitest.setup.ts' if that's where your setup file is
        globals: true, // ensures expect/test are available globally
    },
});