import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { SUPPORTED_LOCALES } from '@/shared/constants/i18n.constants';

// Import trực tiếp các file bản dịch từ shared/i18n/locales
import { en } from './locales/en';
import { vi } from './locales/vi';
import { ja } from './locales/ja';
import { zh } from './locales/zh';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
  ja: { translation: ja },
  zh: { translation: zh },
};

i18n
  .use(LanguageDetector) // Tự động phát hiện ngôn ngữ & lưu vào localStorage
  .use(initReactI18next) // Kết nối i18next với React
  .init({
    resources,
    lng: 'vi', // <--- THÊM DÒNG NÀY: Ép buộc sử dụng tiếng Việt
    supportedLngs: SUPPORTED_LOCALES,
    fallbackLng: 'vi', // <--- SỬA DÒNG NÀY: Fallback về tiếng Việt thay vì tiếng Anh
    debug: import.meta.env.DEV, // Bật debug mode ở môi trường dev
    interpolation: {
      escapeValue: false, // React đã tự chống XSS
    },
  });

export default i18n;