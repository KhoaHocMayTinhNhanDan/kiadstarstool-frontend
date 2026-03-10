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
    proxy: {
      // Proxy các request bắt đầu bằng /api tới server backend
      '/api': {
        target: 'http://localhost:3000', // Server Vercel dev
        changeOrigin: true, // Cần thiết cho các virtual hosted sites
        secure: false,
      },
    },
    host: '0.0.0.0', // Cho phép truy cập từ mạng local
    allowedHosts: [
      'noncreeping-pseudoapprehensively-eda.ngrok-free.dev', // Domain ngrok cụ thể của bạn
      '.ngrok-free.dev', // Cho phép tất cả domain ngrok-free
      '.ngrok.io' // Cho phép tất cả domain ngrok
    ]
  }
})