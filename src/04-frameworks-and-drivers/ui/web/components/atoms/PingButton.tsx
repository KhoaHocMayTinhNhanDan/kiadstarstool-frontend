// src/04-frameworks-and-drivers/ui/web/components/atoms/PingButton.tsx
import { useState } from 'react'
import { PingUIAdapter } from '../../adapters/PingUIAdapter'

const adapter = new PingUIAdapter()

export function PingButton() {
  const [result, setResult] = useState('')

  const handleClick = () => {
    const res = adapter.ping()
    setResult(res)
  }

  return (
    <div style={{ padding: 16 }}>
      <button onClick={handleClick}>Ping</button>
      {result && <p>Result: {result}</p>}
    </div>
  )
}
