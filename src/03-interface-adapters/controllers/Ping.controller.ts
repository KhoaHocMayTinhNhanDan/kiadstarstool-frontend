import type { PingPresenter } from '../presenters/Ping.presenter'
import type { PingViewModel } from '../presenters/Ping.presenter'

export class PingController {
  private presenter: PingPresenter

  constructor(presenter: PingPresenter) {
    this.presenter = presenter
  }

  ping(): PingViewModel {
    console.log('[PingController] ping called')
    console.log('[PingController] sending to usecase layer...')
    const usecaseResult = '[mock-usecase] pong'
    console.log('[PingController] received from usecase layer:', usecaseResult)
    console.log('[PingController] sending to presenter')
    return this.presenter.present(usecaseResult)
  }
}
