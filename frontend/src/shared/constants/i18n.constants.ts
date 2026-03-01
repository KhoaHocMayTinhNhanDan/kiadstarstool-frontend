export const LANGUAGE_LABELS: Record<string, string> = {
  vi: '🇻🇳 Tiếng Việt',
  en: '🇺🇸 English',
  ja: '🇯🇵 日本語',
  zh: '🇨🇳 中文',
};

export const SUPPORTED_LOCALES = ['en', 'vi', 'ja', 'zh'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];