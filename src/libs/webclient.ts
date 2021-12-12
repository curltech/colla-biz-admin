/**
 * webclient代表httpclient或者websocketclient
 */
import {websocketPool, httpClientPool} from 'libcolla'

export class WebClient {
  private _websocketClient: any
  private _httpClient: any
  private address: string

  constructor(address: string) {
    if (address) {
      if (address.startsWith('wss') || address.startsWith('ws')) {
        if (address === 'wss' || address === 'ws') {
          this._websocketClient = websocketPool.websocket
        } else {
          this._websocketClient = websocketPool.get(address)
        }
      } else {
        httpClientPool.setHttpClient(address)
        this._httpClient = httpClientPool.httpClient
      }
      this.address = address
    } else {
      this._httpClient = httpClientPool.httpClient
    }
  }

  send(url: string, data: any) {
    if (this._websocketClient) {
      let message = {url: url, data: data}
      return this._websocketClient.send(JSON.stringify(message))
    } else if (this._httpClient) {
      return this._httpClient.send(url, data)
    }
  }
}

export let webClient = new WebClient("wss")
