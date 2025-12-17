import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';

// Function to copy .htaccess file after build
const copyHtaccess = () => ({
  name: 'copy-htaccess',
  closeBundle: () => {
    try {
      copyFileSync('.htaccess', 'dist/.htaccess');
      console.log('.htaccess file copied to dist folder');
    } catch (err) {
      console.warn('Could not copy .htaccess file:', err.message);
    }
  }
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), copyHtaccess()],
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
    // Build configuration for SPA deployment
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ui: ['@supabase/supabase-js', 'gsap']
          }
        }
      }
    },
    // Ensure proper base path for SPA deployment
    base: '/',
    // Optimize for production
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js']
    },
    server: {
      proxy: {
        '/functions': {
          target: env.VITE_SUPABASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    }
  };
});