// src/04-frameworks-and-drivers/ui/web/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { bootstrapApp } from '../../../00-core/bootstrap'
import WebApp from './App'

// Determine which mode to use
function getAuthMode(): boolean {
  // 1. Check localStorage for user preference
  const storedMode = localStorage.getItem('preferredAuthMode')
  if (storedMode === 'mock' || storedMode === 'firebase') {
    return storedMode === 'mock'
  }
  
  // 2. Check environment variable
  const envMode = import.meta.env.VITE_USE_MOCK_AUTH
  if (envMode === 'true' || envMode === 'false') {
    return envMode === 'true'
  }
  
  // 3. Default to mock in development, firebase in production
  return import.meta.env.DEV
}

// Bootstrap với mode đã chọn
const useMockAuth = getAuthMode()
console.log('🚀 Starting app with:', {
  mode: useMockAuth ? 'Mock' : 'Firebase',
  env: import.meta.env.MODE,
  storedPreference: localStorage.getItem('preferredAuthMode')
})

bootstrapApp({
  useMockAuth,
  enableLogging: true
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebApp />
  </StrictMode>,
)