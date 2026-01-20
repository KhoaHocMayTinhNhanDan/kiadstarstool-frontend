// src/shared/i18n/use-i18n.ts
import { useSyncExternalStore } from 'react'
import { i18nStore } from './i18n.store'
import type { Locale } from './i18n.store'

export function useI18n() {
  const locale = useSyncExternalStore(
    i18nStore.subscribe,
    i18nStore.getLocale,
  )

  return {
    locale,
    setLocale: i18nStore.setLocale,
    t: i18nStore.t,
  }
}
