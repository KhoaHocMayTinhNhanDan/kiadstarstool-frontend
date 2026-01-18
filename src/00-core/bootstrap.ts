// src/00-core/bootstrap.ts

import { AppContext } from './app-context'

export function bootstrap() {
  console.log('[bootstrap] init (empty)')

  AppContext.set({})

  console.log('[bootstrap] done')
}
