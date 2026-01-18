export interface PingViewModel {
  message: string
}

export class PingPresenter {

  present(rawResult: string): PingViewModel {
    console.log('[PingPresenter] called with rawResult:', rawResult)
    return {
      message: rawResult.toUpperCase(),
    }
  }
}
