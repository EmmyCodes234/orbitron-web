import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [react()],
      define: {
        'import.meta.env.VITE_CHATBASE_API_KEY': JSON.stringify(env.VITE_CHATBASE_API_KEY),
        'import.meta.env.VITE_CHATBASE_CHATBOT_ID': JSON.stringify(env.VITE_CHATBASE_CHATBOT_ID),
        'import.meta.env.VITE_ELEVENLABS_API_KEY': JSON.stringify(env.VITE_ELEVENLABS_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      // Netlify deployment optimization
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
          external: ['node:child_process', 'node:stream', 'crypto'], // Externalize Node.js modules for browser compatibility
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
              ui: ['@supabase/supabase-js', 'gsap'],
              audio: ['@elevenlabs/elevenlabs-js']
            }
          }
        }
      },
      // Ensure proper base path for Netlify
      base: '/',
      // Optimize for production
      optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js', '@elevenlabs/elevenlabs-js'],
        exclude: ['@rollup/rollup-linux-x64-gnu']
      }
    };
});