(function(root, factory) {
  if (typeof exports === 'object') {
    // Node, CommonJS之类的
    module.exports = factory()
  } else {
    // 浏览器全局变量(root 即 window)
    root.resLoader = factory(root)
  }
}(this, () => {
  const isFunc = function(f) {
    return typeof f === 'function'
  }
  // 构造器函数
  function resLoader(config) {
    this.option = {
      resourceType: 'image', // 资源类型，默认为图片
      baseUrl: './assets', // 基准url
      resources: [], // 资源路径数组
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
    this.total = this.option.resources.length || 0 // 资源总数
    this.currentIndex = 0 // 当前正在加载的资源索引
    this.errIndex = 0 // 当前错误资源个数
  }

  resLoader.prototype.start = function() {
    this.status = 1
    const _this = this
    const baseUrl = this.option.baseUrl
    for (let i = 0, l = this.option.resources.length; i < l; i++) {
      const r = this.option.resources[i]
      let url = ''
      if (r.indexOf('http://') === 0 || r.indexOf('https://') === 0) {
        url = r
      } else {
        url = baseUrl + r
      }

      const image = new Image()
      image.onload = function() {
        _this.loaded()
      }
      image.onerror = function(err) {
        _this.loaded(err)
      }
      image.src = url
    }
    if (isFunc(this.option.onStart)) {
      this.option.onStart(this.total)
    }
  }

  resLoader.prototype.loaded = function(err) {
    if (err) {
      if (isFunc(this.option.onErr)) {
        this.option.onErr(++this.errIndex)
        this.total--
      }
      return
    } else {
      if (isFunc(this.option.onProgress)) {
        this.option.onProgress(++this.currentIndex, this.total)
      }
      // 加载完毕
      if (this.currentIndex === this.total) {
        if (isFunc(this.option.onComplete)) {
          this.option.onComplete(true)
        }
      }
    }
  }

  // 暴露公共方法
  return resLoader
}))
