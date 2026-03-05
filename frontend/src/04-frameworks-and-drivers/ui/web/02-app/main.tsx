// src/04-frameworks-and-drivers/ui/web/main.tsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { bootstrapApp } from '@/05-bootstrap/bootstrap/bootstrap'
import { App } from './App'
import { DATA_MODE } from '@/shared/config/env'

async function startApp() {
  console.log('🚀 Starting app with:', {
    mode: DATA_MODE,
    env: import.meta.env.MODE,
  })

  // IMPORTANT: wait for bootstrap
  await bootstrapApp()

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

// Start application
startApp()