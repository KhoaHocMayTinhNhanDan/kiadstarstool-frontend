// src/shared/i18n/i18n.store.ts
import { en } from './en'
import { vi } from './vi'
import { ja } from './ja'
import { zh } from './zh'

/* ---------------------------------- */
/* Locale config */
/* ---------------------------------- */

export const SUPPORTED_LOCALES = ['en', 'vi', 'ja', 'zh'] as const
export type Locale = typeof SUPPORTED_LOCALES[number]

/* ---------------------------------- */
/* Dictionary */
/* ---------------------------------- */

const dictionary = {
  en,
  vi,
  ja,
  zh,
}

export type I18nKey = keyof typeof en

/* ---------------------------------- */
/* Store */
/* ---------------------------------- */

let locale: Locale =
  (localStorage.getItem('locale') as Locale) ?? 'vi'

const listeners = new Set<() => void>()

export const i18nStore = {
  getLocale() {
    return locale
  },

  setLocale(l: Locale) {
    if (l === locale) return
    locale = l
    localStorage.setItem('locale', l)
    listeners.forEach(fn => fn())
  },


  // i18n.store.ts
  // src/shared/i18n/i18n.store.ts
  t(key: I18nKey): string {
    const currentLangDict = dictionary[locale];

    // 1. Locale hiện tại
    if (currentLangDict && key in currentLangDict) {
      return currentLangDict[key];
    }

    // 2. Fallback sang EN
    if (dictionary.en && key in dictionary.en) {
      return dictionary.en[key];
    }

    // 3. Không tìm thấy → TRẢ VỀ KEY
    return key;
  },


  subscribe(fn: () => void) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}
