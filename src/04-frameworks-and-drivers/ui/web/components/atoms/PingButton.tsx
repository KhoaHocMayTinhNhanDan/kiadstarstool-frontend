import { useState } from 'react'
import { AppContext } from '@/00-core/app-context'
import type { PingViewModel } from '@/03-interface-adapters/presenters/Ping.presenter'

export function PingButton() {
  const [result, setResult] = useState<PingViewModel | null>(null)

  const handleClick = () => {
    const { ping } = AppContext.get()
    if (!ping) return

    const vm = ping.controller.ping()
    setResult(vm)
  }

  return (
    <div style={{ padding: 16 }}>
      <button onClick={handleClick}>Ping</button>
      {result && <p>Result: {result.message}</p>}
    </div>
  )
}
