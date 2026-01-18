// src/04-frameworks-and-drivers/ui/web/App.tsx
import { PingButton } from
  '@/04-frameworks-and-drivers/ui/web/components/atoms/PingButton'

function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Ping Architecture Test</h1>
      <PingButton />
    </div>
  )
}

export default App
