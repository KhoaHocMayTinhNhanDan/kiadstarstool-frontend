// src\04-frameworks-and-drivers\ui\web\main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { bootstrap } from '../../../00-core/bootstrap'
import WebApp from './App'

bootstrap()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebApp />
  </StrictMode>,
)
