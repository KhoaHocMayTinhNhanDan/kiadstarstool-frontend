// src/00-core/app-context.ts

import type { PingController } from '@/03-interface-adapters/controllers/Ping.controller'
import type { AuthController } from '@/03-interface-adapters/controllers/Auth.controller'
import type { AuthRepository } from '@/03-interface-adapters/gateways/repositories/AuthRepository'
import type { AuthPresenter } from '@/03-interface-adapters/presenters/auth/Auth.presenter'
import type { LoginInteractor } from '@/02-usecases/usecases/authentication/Login.interactor'
import type { LogoutInteractor } from '@/02-usecases/usecases/authentication/Logout.interactor'
import type { IAuthDriver } from '@/03-interface-adapters/gateways/device-interfaces/auth/IAuthDriver'

export type AppContextType = {
  // Ping feature
  ping?: {
    controller: PingController
    presenter?: any // Thêm nếu có PingPresenter
  }
  
  // Authentication feature
  auth?: {
    driver: IAuthDriver
    repository: AuthRepository
    presenter: AuthPresenter
    loginInteractor: LoginInteractor
    logoutInteractor?: LogoutInteractor
    controller: AuthController
  }
  
  // Configuration
  config?: {
    isMockMode: boolean
    apiBaseUrl: string
    authDriverType: 'mock' | 'firebase'
  }
}

class AppContextImpl {
  private static instance: AppContextType | null = null

  /* =====================
   *  CORE METHODS
   * ===================== */

  static set(ctx: AppContextType) {
    this.instance = ctx
    console.log('[AppContext] Context initialized', {
      mode: ctx.config?.authDriverType || 'unknown',
      hasAuth: !!ctx.auth,
      hasPing: !!ctx.ping
    })
  }

  static get(): AppContextType {
    if (!this.instance) {
      throw new Error('[AppContext] Not initialized. Call bootstrap() or bootstrapApp() first.')
    }
    return this.instance
  }

  /* =====================
   *  FEATURE GETTERS
   * ===================== */

  static getAuth() {
    const ctx = this.get()
    if (!ctx.auth) {
      throw new Error('[AppContext] Auth feature not configured.')
    }
    return ctx.auth
  }

  static getPing() {
    const ctx = this.get()
    if (!ctx.ping) {
      throw new Error('[AppContext] Ping feature not configured')
    }
    return ctx.ping
  }

  static getConfig() {
    const ctx = this.get()
    if (!ctx.config) {
      throw new Error('[AppContext] Config not initialized')
    }
    return ctx.config
  }

  /* =====================
   *  CONVENIENCE GETTERS
   * ===================== */

  static getAuthDriver(): IAuthDriver {
    return this.getAuth().driver
  }

  static getAuthController(): AuthController {
    return this.getAuth().controller
  }

  static getLoginInteractor(): LoginInteractor {
    return this.getAuth().loginInteractor
  }

  static getAuthRepository(): AuthRepository {
    return this.getAuth().repository
  }

  static getAuthPresenter(): AuthPresenter {
    return this.getAuth().presenter
  }

  static getPingController(): PingController {
    return this.getPing().controller
  }

  /* =====================
   *  STATE CHECKERS
   * ===================== */

  static isMockMode(): boolean {
    return this.getConfig().isMockMode
  }

  static isUsingMockAuth(): boolean {
    return this.getConfig().authDriverType === 'mock'
  }

  /* =====================
   *  RESET (FOR TESTING)
   * ===================== */

  static reset(): void {
    const driver = this.instance?.auth?.driver
    if (driver && typeof (driver as any).reset === 'function') {
      // Reset mock driver state
      ;(driver as any).reset()
    }
    
    this.instance = null
    console.log('[AppContext] Context reset')
  }

  /* =====================
   *  DEBUG METHODS
   * ===================== */

  static debug(): {
    mode: string
    features: string[]
    config: Record<string, any>
    auth?: {
      hasDriver: boolean
      hasController: boolean
    }
  } {
    const ctx = this.instance
    if (!ctx) {
      return { 
        mode: 'not-initialized', 
        features: [], 
        config: {} 
      }
    }

    return {
      mode: ctx.config?.isMockMode ? 'mock' : 'production',
      features: [
        ...(ctx.ping ? ['ping'] : []),
        ...(ctx.auth ? ['auth'] : [])
      ],
      config: ctx.config || {},
      auth: ctx.auth ? {
        hasDriver: !!ctx.auth.driver,
        hasController: !!ctx.auth.controller
      } : undefined
    }
  }
}

export const AppContext = AppContextImpl