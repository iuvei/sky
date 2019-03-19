import api from '../api/game'

export default class ReqLoader {
  constructor(config) {
    this.option = {
      requests: [],
      onStart: null, // 加载开始回调函数，传入参数total
      onProgress: null, // 正在加载回调函数，传入参数currentIndex, total
      onComplete: null, // 加载完毕回调函数，传入参数total
      onErr: null
    }

    if (config) {
      for (const i in config) {
        this.option[i] = config[i]
      }
    } else {
      alert('参数错误！')
      return
    }

    this.status = 0 // 加载器的状态，0：未启动   1：正在加载   2：加载完毕
    this.total = this.option.requests.length // this.option.resources.length || 0 // 资源总数
    this.currentIndex = 0 // 当前正在加载的资源索引
    this.errIndex = 0 // 当前错误资源个数
  }
  /**
   * 开始加载
   * 依次执行await的异步方法，每次完成后设置进度
   * @memberof ReqLoader
   */
  async start() {
    this.status = 1
    const _this = this
    let games = []
    // const baseUrl = this.option.baseUrl
    for (let i = 0, l = this.option.requests.length; i < l; i++) {
      const maintained = window.vue.$store.state.maintained
      if (maintained.msg === 45000 || maintained.msg === 40020) {
        this.option.onProgress(1, 1)
        this.option.onComplete(true)
      }
      const req = this.option.requests[i]
      let result = null
      if (api[req]) {
        if (req === 'getUnloginOdds') {
          const isProxy = window.vue.$store.state.sysinfo.bind_param
          if (!isProxy) {
            result = []
          } else {
            result = await api[req](games)
          }
        } else {
          result = await api[req]()
        }

        if (req === 'getGameList') {
          games = result
        }

        if (result) {
          _this.loaded()
        }
      }
    }
    if (typeof this.option.onStart === 'function') {
      this.option.onStart(this.total)
    }
  }
  /**
   * 每个任务加载完成后，默认加载成功
   *
   * @param {any} err
   * @memberof ReqLoader
   */
  loaded(err) {
    if (err) {
      if (typeof this.option.onErr === 'function') {
        this.option.onErr(++this.errIndex)
        this.total--
      }
      return
    } else {
      if (typeof this.option.onProgress === 'function') {
        this.option.onProgress(++this.currentIndex, this.total)
      }
      // 加载完毕
      if (this.currentIndex === this.total) {
        if (typeof this.option.onComplete === 'function') {
          this.option.onComplete(true)
        }
      }
    }
  }
}
