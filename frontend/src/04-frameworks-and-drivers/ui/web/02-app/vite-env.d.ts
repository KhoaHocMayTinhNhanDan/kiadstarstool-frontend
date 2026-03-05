// src/04-frameworks-and-drivers/ui/web/02-app/vite-env.d.ts
/// <reference types="vite/client" />

// Định nghĩa kiểu cho các biến môi trường trong .env
interface ImportMetaEnv {
  readonly VITE_DATA_MODE: 'mock' | 'firebase';
  readonly VITE_API_URL?: string;
  readonly VITE_PRE_AUTHENTICATE_AS: 'admin' | 'manager' | 'teacher' | 'staff' | 'none';
  // ...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}