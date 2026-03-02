import { vi } from './locales/vi';
import { en } from './locales/en';
import { ja } from './locales/ja';
import { zh } from './locales/zh';

export const resources = {
  vi,
  en,
  ja,
  zh
} as const;

export type LanguageCode = keyof typeof resources;
export const DEFAULT_LANGUAGE: LanguageCode = 'vi';

// Cấu hình hiển thị cho từng ngôn ngữ
export const SUPPORTED_LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
] as const;