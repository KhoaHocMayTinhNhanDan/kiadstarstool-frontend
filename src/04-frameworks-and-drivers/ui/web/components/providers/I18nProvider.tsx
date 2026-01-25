import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { SUPPORTED_LOCALES, type Locale } from '@/shared/i18n/i18n.store';

// Định nghĩa kiểu dữ liệu cho Context
interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string; // Hàm dịch đơn giản
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  // 1. Khởi tạo locale từ localStorage hoặc mặc định là 'en'
  const [locale, setLocaleState] = useState<Locale>(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (SUPPORTED_LOCALES.includes(savedLocale)) {
      return savedLocale;
    }
    return 'en'; // Mặc định
  });

  // 2. Side effect: Lưu vào localStorage khi locale thay đổi
  useEffect(() => {
    localStorage.setItem('locale', locale);
    // Có thể thêm logic set html lang attribute ở đây
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    if (SUPPORTED_LOCALES.includes(newLocale)) {
      setLocaleState(newLocale);
    }
  };

  // 3. Hàm dịch giả lập (Sau này bạn sẽ nối với file JSON ngôn ngữ thực tế)
  const t = (key: string): string => {
    // Logic tạm thời: Trả về key để test
    // Ví dụ thực tế: return translations[locale][key] || key;
    return key; 
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