import { AppContext } from './app-context'

import { PingPresenter } from '@/03-interface-adapters/presenters/Ping.presenter'
import { PingController } from '@/03-interface-adapters/controllers/Ping.controller'

export function bootstrap() {
  console.log('[bootstrap] init (empty)')

  const pingPresenter = new PingPresenter()
  const pingController = new PingController(pingPresenter)

  AppContext.set({
    ping: {
      controller: pingController,
    },
  })

  console.log('[bootstrap] done')
}
