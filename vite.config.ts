import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
		outDir: "dist", //输出文件目录
		lib: { //库编译模式配置
      entry: path.resolve(__dirname, 'packages/index.ts'), // 打包入口
      name: 'vue3-verney-ui', // 库名称
      fileName: (format) => `verney-ui.${format}.js`, // 生成js文件名称
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
	},
})
