export class PingController {
  ping(): string {
    console.log('[PingController] ping called')
    return 'pong from controller'
  }
}
