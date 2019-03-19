// const CryptoJS = require('crypto-js')
const AES = require('crypto-js/aes')
// const AES = require('crypto-js/enc')
const ENC = require('crypto-js/enc-utf8')
const Base64 = require('crypto-js/enc-base64')
class WebSocketImpt {
  constructor() {
    this.url = 'ws://123.207.167.163:9010/ajaxchattest'
    this.socket = {}
    this.success
    this.error
    this.close
    this.acSet = {}
    this.secret
    this.isEncode = false
    // heartCheck
    this.timeout = 60000
    this.timeoutObj = null
    this.serverTimeoutObj = null
  }
  create(obj, cb) {
    this.socket = new WebSocket(obj.url)
    console.log(this.socket)
    this.socket.onopen = () => {
      console.log('WebSocket 建立连接成功!')
      setTimeout(() => {
        if (!this.isEncode) {
          cb && cb()
        }
      }, 800)
    }
    this.socket.onmessage = event => {
      const isBlob =
        event &&
        event.data &&
        Object.prototype.toString.call(event.data).includes('Blob')

      // if (!this.isEncode && !isBlob) {
      //   this.handleAc(JSON.parse(event.data))
      //   return
      // }

      if (isBlob) {
        const reader = new FileReader()
        this.isEncode = true
        reader.addEventListener('loadend', () => {
          // reader.result 包含转化为类型数组的blob
          // console.log(res, reader.readAsText(blob, 'utf-8'));
          console.log(typeof reader.result) // JSON
          const secret = JSON.parse(reader.result)
          console.log(secret)
          this.secret = secret
          cb && cb()
        })
        reader.readAsText(event.data, 'utf-8')
      } else {
        this.handleOnMessage(event)
      }
    }
    this.socket.onerror = () => {
      console.log('error')
      this.error && this.error()
    }
    this.socket.onclose = () => {
      console.log('close')
      this.close && this.close()
    }
    setTimeout(() => {
      if (this.socket.readyState !== 1) {
        cb && cb('error')
      }
    }, 3000)
  }
  handleOnMessage(event) {
    if (!this.secret) {
      setTimeout(() => {
        this.handleOnMessage(event)
      }, 100)
      return
    }
    const data = AES.decrypt(event.data, ENC.parse(this.secret.Key), {
      iv: ENC.parse(this.secret.IV)
    }).toString(ENC)
    const obj = JSON.parse(data)
    console.log('onmessage', obj)
    this.handleAc(obj)
  }
  oncallback(ac, cb, keep = true) {
    this.acSet[ac] = [keep, cb]
  }
  off(ac) {
    delete this.acSet[ac]
  }
  handleAc(data) {
    const item = this.acSet[data.action]
    if (item) {
      item[1](data)
      !item[0] && delete this.acSet[data.ac]
    }
  }
  sendMessage(data) {
    console.log('send', data)
    if (this.isEncode) {
      const encode = AES.encrypt(
        JSON.stringify(data),
        ENC.parse(this.secret.Key),
        { iv: ENC.parse(this.secret.IV) }
      )
      const encodeData = Base64.stringify(encode.ciphertext)

      this.socket.send(encodeData)
    } else {
      this.socket.send(JSON.stringify(data))
    }
  }
}
export default new WebSocketImpt()
