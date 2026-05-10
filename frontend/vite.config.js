import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, '.', '');
    return {
        build: {
            outDir: 'dist',
        },
        plugins: [react(), tailwindcss()],
        define: {
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            },
        },
        server: {
            hmr: process.env.DISABLE_HMR !== 'true',
            proxy: {
                '/api/products': {
                    target: 'http://localhost:8000',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api\/products/, '/products'),
                },
                '/api/orders': {
                    target: 'http://localhost:8001',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api\/orders/, '/orders'),
                },
            },
        },
    };
});
