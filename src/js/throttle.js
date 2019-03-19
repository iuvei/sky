class Throttle {
  constructor() {
    this.previous = new Date(0).getTime() // 记录上一次运行的时间
    this.key = null // 按钮标识
  }
  timeOut(fn, delay, key = 'key') {
    if (key !== this.key) {
      this.previous = new Date(0).getTime()
      this.key = key
    }
    const now = new Date().getTime()
    if (this.previous + delay * 1000 < now) {
      this.previous = now
      fn()
    } else {
      // console.log(new Date(this.previous + delay * 1000), new Date(now));
      // console.log("padding");
    }
  }
  promise(delay, key = 'key') {
    if (key !== this.key) {
      this.previous = new Date(0).getTime()
      this.key = key
    }
    return new Promise(resolve => {
      const now = new Date().getTime()
      if (this.previous + delay * 1000 < now) {
        this.previous = now
        resolve()
      }
    })
  }
}

export default Throttle
