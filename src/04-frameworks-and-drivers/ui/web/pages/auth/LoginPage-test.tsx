// src/04-frameworks-and-drivers/ui/web/pages/auth/LoginPage-test.tsx

import { useState, useEffect } from 'react'
import { AppContext } from '@/00-core/app-context'
import { useI18n } from '@/shared/i18n'
import { SUPPORTED_LOCALES } from '@/shared/i18n/i18n.store'

export function LoginPageTest() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const { t, locale, setLocale } = useI18n()

  // Load current user on mount
  useEffect(() => {
    loadCurrentUser()
  }, [])

  const loadCurrentUser = async () => {
    try {
      const authDriver = AppContext.getAuthDriver()
      const user = await authDriver.getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      console.log('No user logged in')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const authController = AppContext.getAuthController()
      await authController.login({ email, password })
      
      // Reload current user after successful login
      await loadCurrentUser()
      setSuccess(true)
      setEmail('')
      setPassword('')
      
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const authController = AppContext.getAuthController()
      await authController.logout()
      setCurrentUser(null)
      setSuccess(false)
    } catch (err: any) {
      setError(err.message || 'Logout failed')
    }
  }

  const handleQuickTest = (testEmail: string, testPassword: string) => {
    setEmail(testEmail)
    setPassword(testPassword)
  }

  const handleRestoreSession = async () => {
    await loadCurrentUser()
  }

  return (
    <div style={{ 
      maxWidth: 500, 
      margin: '40px auto', 
      padding: 24,
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      backgroundColor: '#fff'
    }}>
      <h2 style={{ marginTop: 0, color: '#333' }}>
        🔐 Login Test Page
      </h2>

      {/* Language Selector */}
      <div style={{ marginBottom: 24 }}>
        <label 
          htmlFor="language-select"
          style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}
        >
          Language:
        </label>
        <select
          id="language-select"
          value={locale}
          onChange={e => setLocale(e.target.value as typeof locale)}
          style={{
            padding: '8px 12px',
            borderRadius: 4,
            border: '1px solid #ccc',
            width: '100%'
          }}
        >
          {SUPPORTED_LOCALES.map(l => (
            <option key={l} value={l}>
              {l === 'vi' ? '🇻🇳 Tiếng Việt' : 
               l === 'en' ? '🇺🇸 English' : 
               l === 'ja' ? '🇯🇵 日本語' : l.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* System Info */}
      <div style={{ 
        marginBottom: 24, 
        padding: 12, 
        backgroundColor: '#f5f5f5',
        borderRadius: 6,
        fontSize: 14
      }}>
        <div><strong>Auth Mode:</strong> {AppContext.isUsingMockAuth() ? 'Mock' : 'Firebase'}</div>
        <div><strong>Status:</strong> {currentUser ? 'Logged In' : 'Logged Out'}</div>
      </div>

      {/* Current User Info */}
      {currentUser && (
        <div style={{ 
          marginBottom: 24, 
          padding: 16, 
          backgroundColor: '#e8f5e9',
          borderRadius: 6,
          borderLeft: '4px solid #4caf50'
        }}>
          <h3 style={{ marginTop: 0, color: '#2e7d32' }}>✅ Logged In</h3>
          <div><strong>Email:</strong> {currentUser.email}</div>
          <div><strong>Roles:</strong> {currentUser.roles?.join(', ')}</div>
          <div><strong>Verified:</strong> {currentUser.emailVerified ? 'Yes' : 'No'}</div>
          <button
            onClick={handleLogout}
            style={{
              marginTop: 12,
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* Login Form */}
      {!currentUser && (
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
              style={{
                padding: '10px 12px',
                borderRadius: 4,
                border: '1px solid #ccc',
                width: '100%',
                fontSize: 16
              }}
              required
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              style={{
                padding: '10px 12px',
                borderRadius: 4,
                border: '1px solid #ccc',
                width: '100%',
                fontSize: 16
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 24px',
              backgroundColor: loading ? '#999' : '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 16,
              fontWeight: 500,
              width: '100%'
            }}
          >
            {loading ? 'Logging in...' : t('auth.login')}
          </button>
        </form>
      )}

      {/* Quick Test Buttons */}
      {!currentUser && (
        <div style={{ marginTop: 24 }}>
          <h4 style={{ marginBottom: 12, color: '#666' }}>Quick Test:</h4>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button
              onClick={() => handleQuickTest('admin@example.com', 'password123')}
              style={{
                padding: '8px 12px',
                backgroundColor: '#9c27b0',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              Admin
            </button>
            <button
              onClick={() => handleQuickTest('teacher@example.com', 'password123')}
              style={{
                padding: '8px 12px',
                backgroundColor: '#009688',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              Teacher
            </button>
            <button
              onClick={() => handleQuickTest('wrong@example.com', 'wrong')}
              style={{
                padding: '8px 12px',
                backgroundColor: '#ff9800',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontSize: 14
              }}
            >
              Wrong Credentials
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ marginTop: 24, display: 'flex', gap: 8 }}>
        <button
          onClick={handleRestoreSession}
          style={{
            padding: '8px 16px',
            backgroundColor: '#673ab7',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            flex: 1
          }}
        >
          Restore Session
        </button>
        <button
          onClick={() => console.log('AppContext:', AppContext.debug())}
          style={{
            padding: '8px 16px',
            backgroundColor: '#607d8b',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            flex: 1
          }}
        >
          Debug Info
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div style={{ 
          marginTop: 16, 
          padding: 12, 
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: 4,
          borderLeft: '4px solid #f44336'
        }}>
          ❌ Error: {error}
        </div>
      )}

      {success && (
        <div style={{ 
          marginTop: 16, 
          padding: 12, 
          backgroundColor: '#e8f5e9',
          color: '#2e7d32',
          borderRadius: 4,
          borderLeft: '4px solid #4caf50'
        }}>
          ✅ Login successful!
        </div>
      )}

      {/* Instructions */}
      <div style={{ 
        marginTop: 32,
        padding: 16,
        backgroundColor: '#e3f2fd',
        borderRadius: 6,
        fontSize: 14,
        color: '#1565c0'
      }}>
        <strong>Testing Instructions:</strong>
        <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
          <li>Use email/password fields for manual testing</li>
          <li>Click "Quick Test" buttons for predefined credentials</li>
          <li>Use "Restore Session" to check current auth state</li>
          <li>Check browser console for detailed logs</li>
          <li>Mode: {AppContext.isUsingMockAuth() ? 'Mock' : 'Firebase'}</li>
        </ul>
      </div>
    </div>
  )
}