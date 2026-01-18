import type { PingController } from '@/03-interface-adapters/controllers/Ping.controller'

export type AppContextType = {
  ping?: {
    controller: PingController
  }
}

class AppContextImpl {
  private static instance: AppContextType | null = null

  static set(ctx: AppContextType) {
    this.instance = ctx
  }

  static get(): AppContextType {
    if (!this.instance) {
      throw new Error('[AppContext] Not initialized')
    }
    return this.instance
  }
}

export const AppContext = AppContextImpl
