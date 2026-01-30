import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { SUPPORTED_LOCALES, type Locale, i18nStore, type I18nKey } from '@/shared/i18n/i18n.store';

// Định nghĩa kiểu dữ liệu cho Context
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string; // Hàm dịch đơn giản
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  // 1. Khởi tạo locale từ localStorage hoặc mặc định là 'en'
  const [locale, setLocaleState] = useState<Locale>(i18nStore.getLocale());

  // 2. Sync với i18nStore
  useEffect(() => {
    // Subscribe để lắng nghe thay đổi từ store (nếu có nơi khác thay đổi locale)
    const unsubscribe = i18nStore.subscribe(() => {
      setLocaleState(i18nStore.getLocale());
    });
    
    // Set initial html lang
    document.documentElement.lang = i18nStore.getLocale();

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Cập nhật document.lang khi locale thay đổi
  useEffect(() => {
     document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      i18nStore.setLocale(newLocale);
    }
  };

  // 3. Hàm dịch thực tế sử dụng store
  const t = (key: string): string => {
    return i18nStore.t(key as I18nKey);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

// Hook để sử dụng trong các component con
export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within a I18nProvider');
  }
  return context;
};