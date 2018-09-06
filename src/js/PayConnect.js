export class PayConnect {
  constructor(config) {
    if (config) {
      this.instance = new WebSocket(config.url)
    }

    if (this.instance) {
      // 打开连接
      const _this = this
      this.instance.onopen = function(evt) {
        console.log('Connection open ...', evt)
        _this.instance.send(
          JSON.stringify({
            data: config.data || config.socket_data,
            price: config.money || config.price
          })
        )
      }
      // 接收消息
      this.instance.onmessage = async function(event) {
        if (config.callback) {
          await config.callback(event)
        }

        _this.instance.close()
      }

      // 关闭连接
      this.instance.onclose = function(event) {
        console.log('Connection closed.', event)
        delete _this.instance
      }
      // 错误处理和重连，错误后处理
      this.instance.onerror = function(event) {
        if (config.errorCallback && config.errorRepeatTime > 0) {
          config.errorCallback(event)
        }
        if (config.errorRepeatTime === 0 && config.afterErrorCallback) {
          config.afterErrorCallback()
        }
      }
    }
  }
}
