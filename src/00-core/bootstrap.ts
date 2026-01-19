// src/00-core/bootstrap.ts

import { AppContext, type AppContextType } from './app-context'
import { createMockAuthDriver } from '@/04-frameworks-and-drivers/devices/auth/MockAuthDriver'
import { createFirebaseAuthDriver } from '@/04-frameworks-and-drivers/devices/auth/FirebaseAuthDriver'
import { AuthRepository } from '@/03-interface-adapters/gateways/repositories/AuthRepository'
import { AuthPresenter } from '@/03-interface-adapters/presenters/auth/Auth.presenter'
import { createLoginInteractor } from '@/02-usecases/usecases/authentication/Login.interactor'
import { createLogoutInteractor } from '@/02-usecases/usecases/authentication/Logout.interactor'
import { AuthController } from '@/03-interface-adapters/controllers/Auth.controller'
import { PingPresenter } from '@/03-interface-adapters/presenters/Ping.presenter'
import { PingController } from '@/03-interface-adapters/controllers/Ping.controller'
import type { IAuthDriver } from '@/03-interface-adapters/gateways/device-interfaces/auth/IAuthDriver'

export interface BootstrapOptions {
  useMockAuth?: boolean
  apiBaseUrl?: string
  enableLogging?: boolean
}

/**
 * Bootstrap với authentication đầy đủ
 */
export function bootstrapApp(options: BootstrapOptions = {}): void {
  const {
    useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === 'true' || true,
    apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    enableLogging = true
  } = options

  console.log('[bootstrap] Initializing application...', { useMockAuth })

  // 1. Initialize Authentication Driver
  let authDriver: IAuthDriver;
  
  if (useMockAuth) {
    authDriver = createMockAuthDriver();
    console.log('[bootstrap] Using MockAuthDriver');
  } else {
    try {
      authDriver = createFirebaseAuthDriver();
      console.log('[bootstrap] Using FirebaseAuthDriver');
    } catch (error) {
      console.error('[bootstrap] Failed to initialize FirebaseAuthDriver, falling back to MockAuthDriver', error);
      authDriver = createMockAuthDriver();
      console.log('[bootstrap] Fallback to MockAuthDriver');
    }
  }
  
  const authRepository = new AuthRepository(authDriver)
  const authPresenter = new AuthPresenter()
  
  const loginInteractor = createLoginInteractor(authRepository, authPresenter)
  const logoutInteractor = createLogoutInteractor(authRepository, authPresenter)
  
  const authController = new AuthController(loginInteractor, logoutInteractor)

  // 2. Initialize Ping (demo feature)
  const pingPresenter = new PingPresenter()
  const pingController = new PingController(pingPresenter)

  // 3. Create Application Context
  const context: AppContextType = {
    config: {
      isMockMode: useMockAuth,
      apiBaseUrl,
      authDriverType: useMockAuth ? 'mock' : 'firebase'
    },
    
    ping: {
      controller: pingController,
      presenter: pingPresenter
    },
    
    auth: {
      driver: authDriver,
      repository: authRepository,
      presenter: authPresenter,
      loginInteractor,
      logoutInteractor,
      controller: authController
    }
  }

  // 4. Set Global Context
  AppContext.set(context)

  if (enableLogging) {
    const modeInfo = useMockAuth 
      ? { mode: 'Mock Mode', users: (authDriver as any).getMockUsers?.()?.map((u: any) => u.email) || [] }
      : { mode: 'Firebase Mode', firebaseReady: true };
    
    console.log('[bootstrap] Application initialized successfully', {
      ...modeInfo,
      apiBaseUrl,
      hasAuth: !!context.auth,
      hasPing: !!context.ping
    })
  }
}

/**
 * Bootstrap đơn giản (chỉ ping - tương thích với code cũ)
 */
export function bootstrap(): void {
  console.log('[bootstrap] Initializing minimal app (ping only)')

  const pingPresenter = new PingPresenter()
  const pingController = new PingController(pingPresenter)

  AppContext.set({
    ping: {
      controller: pingController,
      presenter: pingPresenter
    },
    config: {
      isMockMode: true,
      apiBaseUrl: '',
      authDriverType: 'mock'
    }
  })

  console.log('[bootstrap] Minimal app ready')
}

/**
 * Bootstrap với tùy chọn
 */
export function bootstrapWithConfig(config: {
  withAuth?: boolean
  withMock?: boolean
} = {}): void {
  const { withAuth = true, withMock = true } = config

  if (withAuth) {
    bootstrapApp({ useMockAuth: withMock })
  } else {
    bootstrap()
  }
}

// Helper để check nếu app đã được bootstrap
export function isAppBootstrapped(): boolean {
  try {
    AppContext.get()
    return true
  } catch {
    return false
  }
}

/**
 * Toggle auth mode at runtime (for testing)
 */
export function toggleAuthMode(useMock: boolean): void {
  try {
    const currentConfig = AppContext.getConfig();
    
    if (currentConfig.isMockMode !== useMock) {
      console.log(`[bootstrap] Switching auth mode: ${useMock ? 'Mock' : 'Firebase'}`);
      
      // Reset and re-bootstrap
      AppContext.reset();
      
      bootstrapApp({
        useMockAuth: useMock,
        apiBaseUrl: currentConfig.apiBaseUrl,
        enableLogging: true
      });
    }
  } catch (error) {
    console.error('[bootstrap] Failed to toggle auth mode:', error);
  }
}