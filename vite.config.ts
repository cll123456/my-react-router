import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  base:  './',//打包路径
  // 别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')//设置别名
    }
  },
  // 全局css 
  css: {
    preprocessorOptions: { 
      scss: {
      // 全局的scss ，跨域放多个，例如：主题的变量，和一些混合等
        // additionalData: `@import "./src/style/var/layout.scss";`,
      }
    }
  },
  // 代理服务
  server: {
    port: 3005,//启动端口
    proxy: {
      // 第一个代理
      '/api/mobile':{ // 匹配到啥来进行方向代理
        target: 'https://github.com/cll123456/vue3-ts-mobile', // 代理的目标
        rewrite: (path) => path.replace(/^\/api/, '') // 如果不需要api 直接把路径上的api 替换成空，这个
      }
    },
  }
})
