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


  t(p0: string, p1: string, key: I18nKey): string {
    return (
      dictionary[locale]?.[key] ??
      dictionary.en?.[key] ??
      '[i18n] Missing translation'
    )
  },

  subscribe(fn: () => void) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
}
