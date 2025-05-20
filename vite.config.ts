import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import tailwindcss from '@tailwindcss/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { VueMcp } from 'vite-plugin-vue-mcp'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Icons({
      compiler: 'jsx', // 或 'vue' (取决于你的项目类型)
      autoInstall: true,
      defaultStyle: 'display: inline-block',
      customCollections: {
        // 可选：配置自定义图标集合
        // 'my-icons': FileSystemIconLoader('./src/assets/icons')
      }
    }),
    VueMcp()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
