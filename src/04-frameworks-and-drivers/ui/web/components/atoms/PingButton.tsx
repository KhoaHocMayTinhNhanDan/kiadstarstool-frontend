// src/04-frameworks-and-drivers/ui/web/components/atoms/PingButton.tsx

import { useState } from 'react'
import { AppContext } from '@/00-core/app-context'
import type { PingViewModel } from '@/03-interface-adapters/presenters/Ping.presenter'
import { useI18n } from '@/shared/i18n'
import { SUPPORTED_LOCALES } from '@/shared/i18n/i18n.store'

export function PingButton() {
  const [result, setResult] = useState<PingViewModel | null>(null)

  const { t, locale, setLocale } = useI18n()

  const handleClick = () => {
    const { ping } = AppContext.get()
    if (!ping) return

    const vm = ping.controller.ping()
    setResult(vm)
  }

  return (
    <div style={{ padding: 16 }}>
      {/* Language Select */}
      <div style={{ marginBottom: 12 }}>
        <label style={{ marginRight: 8 }}>
          Language:
        </label>

        <select
          value={locale}
          onChange={e => setLocale(e.target.value as typeof locale)}
        >
          {SUPPORTED_LOCALES.map(l => (
            <option key={l} value={l}>
              {l.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Action */}
      <button onClick={handleClick}>
        {t('auth.login')}
      </button>

      {/* Result */}
      {result && (
        <p style={{ marginTop: 8 }}>
          {t('app.title')}: {result.message}
        </p>
      )}
    </div>
  )
}
