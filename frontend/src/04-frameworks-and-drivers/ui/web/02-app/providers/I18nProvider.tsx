import { useState, type ReactNode } from 'react';
import { I18nContext } from '@/shared/i18n/useI18n';
import { resources, DEFAULT_LANGUAGE, type LanguageCode } from '@/shared/i18n/i18n.config';

const STORAGE_KEY = 'app_language';

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved && saved in resources) ? (saved as LanguageCode) : DEFAULT_LANGUAGE;
  });

  const changeLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const dict = resources[language];
    // Tìm text theo key (vd: "common.loading")
    let text = key.split('.').reduce((acc: any, part) => acc && acc[part], dict);
    
    // Fallback về ngôn ngữ mặc định nếu không tìm thấy
    if (!text) {
      const defaultDict = resources[DEFAULT_LANGUAGE];
      text = key.split('.').reduce((acc: any, part) => acc && acc[part], defaultDict);
    }

    if (typeof text !== 'string') return key;

    // Thay thế tham số: "Xin chào {name}" -> "Xin chào Nam"
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(new RegExp(`{{${k}}}`, 'g'), String(v));
      });
    }

    return text;
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};