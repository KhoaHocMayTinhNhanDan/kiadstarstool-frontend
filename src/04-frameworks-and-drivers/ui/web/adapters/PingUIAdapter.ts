// src/04-frameworks-and-drivers/ui/web/adapters/PingUIAdapter.ts
import { PingController } from '@/03-interface-adapters/controllers/Ping.controller'

export class PingUIAdapter {
  private controller: PingController

  constructor() {
    this.controller = new PingController()
  }

  ping(): string {
    console.log('[PingUIAdapter] forward ping')
    return this.controller.ping()
  }
}
