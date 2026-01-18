// src/00-core/app-context.ts

export type AppContextType = {
  // sau này sẽ thêm:
  // authController?: AuthController
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
