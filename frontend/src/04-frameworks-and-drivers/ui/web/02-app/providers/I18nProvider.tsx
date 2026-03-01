import '@/shared/i18n/i18n.config'; // Import file cấu hình để i18next được khởi tạo
import React, { Suspense } from 'react';

/**
 * I18nProvider (Frameworks & Drivers Layer)
 * Cung cấp context đa ngôn ngữ cho ứng dụng.
 */
export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  // Suspense được dùng để xử lý lazy-loading các file ngôn ngữ trong tương lai
  return <Suspense fallback="Loading...">{children}</Suspense>;
};