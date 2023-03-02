import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from "path"


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
    // 指定symbolld格式
    symbolId: 'icon-[dir]-[name]'
  })],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    cors: false,
    proxy: {
      '/api': {

        target: 'http://682jub.natappfree.cc/',
        // target: 'http://8.130.168.233:8073/api-prod/',
        // target: 'https://208038ug41.imdo.co',
        // https://208038ug41.imdo.co/login/getTnfo
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/api/, '/')
      }
    }
  }
})
