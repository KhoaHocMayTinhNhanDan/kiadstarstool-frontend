// src/00-core/bootstrap.ts

import { AppContext, type AppContextType } from './app-context'
import { createMockAuthDriver } from '@/04-frameworks-and-drivers/devices/auth/MockAuthDriver'
import { createFirebaseAuthDriver } from '@/04-frameworks-and-drivers/devices/auth/FirebaseAuthDriver'
import { AuthRepository } from '@/03-interface-adapters/gateways/repositories/AuthRepository'
import { UserProfileRepository } from '@/03-interface-adapters/gateways/repositories/UserProfileRepository'
import { type IAuthDriver } from '@/03-interface-adapters/gateways/device-interfaces/auth/IAuthDriver'
import { AuthPresenter } from '@/03-interface-adapters/presenters/auth/Auth.presenter'
import { createLoginInteractor } from '@/02-usecases/auth/login/Login.interactor'
import { createLogoutInteractor } from '@/02-usecases/auth/Logout.interactor'
import { AuthController } from '@/03-interface-adapters/controllers/Auth.controller'
import { CheckPermissionInteractor } from '@/02-usecases/authorization/CheckPermission.interactor'
import { GetUserPermissionsInteractor } from '@/02-usecases/authorization/GetUserPermissions.interactor'
import { GrantUserPermissionInteractor } from '@/02-usecases/authorization/GrantUserPermission.interactor'
import { RevokeUserPermissionInteractor } from '@/02-usecases/authorization/RevokeUserPermission.interactor'
import { AuthorizationController } from '@/03-interface-adapters/controllers/Authorization.controller'

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
    useMockAuth = import.meta.env.VITE_USE_MOCK_AUTH === 'true',
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
  const userRepository = new UserProfileRepository()
  const authPresenter = new AuthPresenter()
  
  const loginInteractor = createLoginInteractor(authRepository, userRepository)
  const logoutInteractor = createLogoutInteractor(authRepository)
  
  const authController = new AuthController(loginInteractor, logoutInteractor)

  // 1.1 Initialize Authorization (New)
  const checkPermissionInteractor = new CheckPermissionInteractor(userRepository)
  const getUserPermissionsInteractor = new GetUserPermissionsInteractor(userRepository)
  const grantUserPermissionInteractor = new GrantUserPermissionInteractor(userRepository)
  const revokeUserPermissionInteractor = new RevokeUserPermissionInteractor(userRepository)

  const authorizationController = new AuthorizationController(
    checkPermissionInteractor,
    getUserPermissionsInteractor,
    grantUserPermissionInteractor,
    revokeUserPermissionInteractor
  )

  // 2. Create Application Context
  const context: AppContextType = {
    config: {
      isMockMode: useMockAuth,
      apiBaseUrl,
      authDriverType: useMockAuth ? 'mock' : 'firebase'
    },
    

    auth: {
      driver: authDriver,
      repository: authRepository,
      presenter: authPresenter,
      loginInteractor,
      logoutInteractor,
      controller: authController
    },

    authorization: {
      controller: authorizationController
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
    })
  }
}

export function bootstrap(): void {
  console.log('[bootstrap] Initializing minimal app (ping only)')


  AppContext.set({
      config: {
      isMockMode: true,
      apiBaseUrl: 'http://localhost:3000/api',
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
    // Lấy config hiện tại nếu có, hoặc dùng default
    let currentApiUrl = 'http://localhost:3000/api';
    try {
      currentApiUrl = AppContext.getConfig().apiBaseUrl;
    } catch (e) {
      // Ignore if context not initialized
    }
    
    console.log(`[bootstrap] Switching auth mode to: ${useMock ? 'Mock' : 'Firebase'}`);
    AppContext.reset();
    bootstrapApp({
      useMockAuth: useMock,
      apiBaseUrl: currentApiUrl,
      enableLogging: true
    });
  } catch (error) {
    console.error('[bootstrap] Failed to toggle auth mode:', error);
  }
}