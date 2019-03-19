Math.easeout = function(A, B, rate, callback) {
  // console.log('cc')
  if (A === B || typeof A != 'number') {
    return
  }
  B = B || 0
  rate = rate || 2

  const step = function() {
    A = A + (B - A) / rate
    if (A < 1 || A.toFixed(2) === B + '') {
      callback(B, true)

      return
    }
    callback(A, false)
    requestAnimationFrame(step)
  }
  step()
}

function vueTouch(el, binding, type) {
  // debugger
  const _this = this
  this.obj = el
  this.binding = binding
  this.touchType = type
  this.vueTouches = { x: 0, y: 0 }
  this.vueMoves = true
  this.vueLeave = true
  this.longTouch = true
  this.vueCallBack =
    typeof binding.value === 'object' ? binding.value.fn : binding.value
  this.index = binding.value.index
  this.limit = binding.value.limit
  this.limitTime = 0
  // debugger
  this.obj.addEventListener(
    'touchstart',
    e => {
      _this.start(e)
    },
    false
  )
  this.obj.addEventListener(
    'touchend',
    e => {
      _this.end(e)
    },
    false
  )
  this.obj.addEventListener(
    'touchmove',
    e => {
      _this.move(e)
      // clearTimeout(this.limitTime)
      // const _e = e
      // // const that = this
      // this.limitTime = setTimeout(() => {
      //   // that.performProcessing();
      //   _this.move(_e)
      // }, 1000)
    },
    false
  )
}
vueTouch.prototype = {
  start(e) {
    // debugger
    this.vueMoves = true
    this.vueLeave = true
    this.longTouch = true
    this.vueTouches = {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY
    }
  },
  end() {
    clearTimeout(this.time)
    this.vueLeave = false
    this.vueMoves = false
  },
  move(e) {
    e.preventDefault()
    e.stopPropagation()

    if (!this.vueMoves) return
    this.vueMoves = true

    const disX = e.changedTouches[0].pageX - this.vueTouches.x
    const disY = e.changedTouches[0].pageY - this.vueTouches.y

    const width = Number((document.body.clientWidth * 0.98).toFixed(2))

    if (Math.abs(disX) > 10 || Math.abs(disY) > 100) {
      if (this.touchType === 'swipe') this.vueCallBack(this.binding.value, e)
      if (Math.abs(disX) > Math.abs(disY)) {
        if (disX > 10) {
          if (this.index === 1) return
          const start = width * this.index,
            $node = e.currentTarget,
            end = width * (this.index - 2)
          Math.easeout(start, end, 4, value => {
            $node.style.transform = `translateX(-${value}px)`
          })
          this.index--
          this.vueCallBack(this.binding.value, e, this.index)
          this.vueMoves = false

          return
        }
        if (disX < -10) {
          if (this.index > this.limit - 1) return
          const c = width * this.index,
            $node = e.currentTarget,
            start = width * (this.index - 1)
          Math.easeout(start, c, 4, value => {
            $node.style.transform = `translateX(-${value}px)`
          })
          this.index++
          this.vueCallBack(this.binding.value, e, this.index)
          this.vueMoves = false
          return
        }
      }
    }
  }
}

export default vueTouch
