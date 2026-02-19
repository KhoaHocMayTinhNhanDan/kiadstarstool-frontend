// src/04-frameworks-and-drivers/ui/web/02-app/vite-env.d.ts
/// <reference types="vite/client" />

// Định nghĩa kiểu cho các biến môi trường trong .env
interface ImportMetaEnv {
  readonly VITE_USE_MOCK_AUTH: string;
  readonly VITE_API_URL?: string;
  // Thêm các biến khác nếu có...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}