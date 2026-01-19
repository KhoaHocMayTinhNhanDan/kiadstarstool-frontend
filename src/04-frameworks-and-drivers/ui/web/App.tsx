// src/04-frameworks-and-drivers/ui/web/App.tsx

import { LoginPageTest } from './pages/auth/LoginPage-test'
import { AppContext } from '@/00-core/app-context'

function App() {
  const appInfo = AppContext.debug()

  return (
    <div style={{ 
      padding: 24, 
      maxWidth: 1200, 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <header style={{ 
        marginBottom: 32, 
        paddingBottom: 24,
        borderBottom: '1px solid #eaeaea'
      }}>
        <h1 style={{ margin: 0, color: '#333' }}>
          🏗️ Clean Architecture - Authentication Test
        </h1>
        <p style={{ margin: '8px 0 0 0', color: '#666' }}>
          Testing Login Flow with {appInfo.mode === 'mock' ? 'Mock' : 'Firebase'} Driver
        </p>
        
        {/* System status */}
        <div style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: appInfo.mode === 'mock' ? '#fff3cd' : '#d4edda',
          borderRadius: 6,
          display: 'inline-block',
          fontSize: 14
        }}>
          <strong>Mode:</strong> {appInfo.mode === 'mock' ? '🔧 Mock' : '🚀 Firebase'}
          <span style={{ marginLeft: 16 }}>
            <strong>Features:</strong> {appInfo.features.join(', ')}
          </span>
        </div>
      </header>

      <main>
        <LoginPageTest />
        
        {/* Toggle Mode Button */}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <button
            onClick={() => {
              const currentMode = AppContext.isUsingMockAuth()
              const newMode = !currentMode
              
              if (newMode) {
                if (window.confirm('Switch to Mock Mode? Page will reload.')) {
                  localStorage.setItem('preferredAuthMode', 'mock')
                  window.location.reload()
                }
              } else {
                if (window.confirm('Switch to Firebase Mode? Ensure Firebase is configured. Page will reload.')) {
                  localStorage.setItem('preferredAuthMode', 'firebase')
                  window.location.reload()
                }
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
      </main>

      <footer style={{ 
        marginTop: 48, 
        paddingTop: 24,
        borderTop: '1px solid #eaeaea',
        color: '#6c757d',
        fontSize: 14,
        textAlign: 'center'
      }}>
        <p>
          <strong>Clean Architecture Demo</strong> • Mode: {appInfo.mode}
          • {new Date().getFullYear()}
        </p>
        <p style={{ fontSize: 12, opacity: 0.7 }}>
          This demo uses {appInfo.mode === 'mock' ? 'MockAuthDriver' : 'FirebaseAuthDriver'} for testing.
        </p>
      </footer>
    </div>
  )
}

export default App