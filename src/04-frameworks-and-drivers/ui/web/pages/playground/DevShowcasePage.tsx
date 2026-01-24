// src/04-frameworks-and-drivers/ui/web/pages/dev/DevShowcasePage.tsx
import { useState } from 'react'
// import { AvatarTest } from '../../components/atoms/Avatar/Avatar-test'
// import { BadgeTest } from '../../components/atoms/Badge/Badge-test'
// import { ButtonTest } from '../../components/atoms/Button/Button-test'
// import { CheckboxTest } from '../../components/atoms/Checkbox/Checkbox-test'
// import { ChipTest } from '../../components/atoms/Chip/Chip-test'
// import { IconTest } from '../../components/atoms/Icon/Icon-test'
// import { InputTest } from '../../components/atoms/Input/Input-test'
// import { LoadingSpinnerTest } from '../../components/atoms/Loading-spinner/Loading-spinner-test'
// import { LogoTest } from '../../components/atoms/Logo/Logo-test'
// import { ProgressTest } from '../../components/atoms/Progress/Progress-test'
// import { SwitchTest } from '../../components/atoms/Switch/Switch-test'
// import { TextareaTest } from '../../components/atoms/Textarea/Textarea-test'
import { LoginPageTest } from '../auth/LoginPage-test'
import { AppContext } from '@/00-core/app-context'

const components = [
  // { id: 'avatar', label: 'Avatar Component', component: <AvatarTest /> },
  // { id: 'badge', label: 'Badge Component', component: <BadgeTest /> },
  // { id: 'button', label: 'Button Component', component: <ButtonTest /> },
  // { id: 'checkbox', label: 'Checkbox Component', component: <CheckboxTest /> },
  // { id: 'chip', label: 'Chip Component', component: <ChipTest /> },
  // { id: 'icon', label: 'Icon Component', component: <IconTest /> },
  // { id: 'input', label: 'Input Component', component: <InputTest /> },
  // { id: 'loading-spinner', label: 'Loading Spinner', component: <LoadingSpinnerTest /> },
  // { id: 'logo', label: 'Logo Component', component: <LogoTest /> }, 
  // { id: 'progress', label: 'Progress Component', component: <ProgressTest /> },
  // { id: 'switch', label: 'Switch Component', component: <SwitchTest /> },
  // { id: 'textarea', label: 'Textarea Component', component: <TextareaTest /> },
  { id: 'login', label: 'Login Page', component: <LoginPageTest /> },
]

export function DevShowcasePage() {
  const [selectedComponent, setSelectedComponent] = useState('login')
  const appInfo = AppContext.debug()

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header style={{ marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #eaeaea' }}>
        <h1 style={{ margin: 0, color: '#333' }}>🏗️ Clean Architecture - Component Tests</h1>
        <p style={{ margin: '8px 0 0 0', color: '#666' }}>Testing UI Components with {appInfo.mode === 'mock' ? 'Mock' : 'Firebase'} Driver</p>
        
        <div style={{ marginTop: 16, padding: 12, backgroundColor: appInfo.mode === 'mock' ? '#fff3cd' : '#d4edda', borderRadius: 6, display: 'inline-block', fontSize: 14 }}>
          <strong>Mode:</strong> {appInfo.mode === 'mock' ? '🔧 Mock' : '🚀 Firebase'}
          <span style={{ marginLeft: 16 }}><strong>Features:</strong> {appInfo.features.join(', ')}</span>
        </div>
      </header>

      {/* Component Selector */}
      <div style={{ marginBottom: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {components.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setSelectedComponent(id)}
            style={{
              padding: '8px 16px',
              backgroundColor: selectedComponent === id ? '#007bff' : '#f8f9fa',
              color: selectedComponent === id ? 'white' : '#333',
              border: '1px solid #dee2e6',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <main style={{ minHeight: 400 }}>
        {components.find(c => c.id === selectedComponent)?.component}
      </main>

      {/* Toggle Mode Button */}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <button
          onClick={() => {
            const currentMode = AppContext.isUsingMockAuth()
            const newMode = !currentMode
            
            if (window.confirm(`Switch to ${newMode ? 'Mock' : 'Firebase'} Mode? Page will reload.`)) {
              localStorage.setItem('preferredAuthMode', newMode ? 'mock' : 'firebase')
              window.location.reload()
            }
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: AppContext.isUsingMockAuth() ? '#ffc107' : '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 500
          }}
        >
          {AppContext.isUsingMockAuth() ? '🔧 Switch to Firebase' : '🚀 Switch to Mock'}
        </button>
      </div>

      <footer style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #eaeaea', color: '#6c757d', fontSize: 14, textAlign: 'center' }}>
        <p><strong>Clean Architecture Demo</strong> • Mode: {appInfo.mode} • {new Date().getFullYear()}</p>
        <p style={{ fontSize: 12, opacity: 0.7 }}>Currently viewing: {components.find(c => c.id === selectedComponent)?.label}</p>
      </footer>
    </div>
  )
}