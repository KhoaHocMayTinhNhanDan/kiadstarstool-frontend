// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: { // khi triển khai sẽ xóa phần này
    host: '0.0.0.0', // Cho phép truy cập từ mạng local
    allowedHosts: [
      'noncreeping-pseudoapprehensively-eda.ngrok-free.dev', // Domain ngrok cụ thể của bạn
      '.ngrok-free.dev', // Cho phép tất cả domain ngrok-free
      '.ngrok.io' // Cho phép tất cả domain ngrok
    ]
  }
})