import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
const pathResolve = (dirPath) => path.resolve(process.cwd(), dirPath)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: `${pathResolve('src')}/`
      }
    ]
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://8.130.168.233:8073/api-prod/',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, '/')
      }
    }
  }
})
