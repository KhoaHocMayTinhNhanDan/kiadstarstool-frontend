import { createContext, useContext } from 'react';
import { type LanguageCode } from './i18n.config';

interface I18nContextType {
  language: LanguageCode;
  changeLanguage: (lang: LanguageCode) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

export const I18nContext = createContext<I18nContextType | null>(null);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};