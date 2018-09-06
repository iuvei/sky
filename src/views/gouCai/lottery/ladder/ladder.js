(function() {
  let lastTime = 0
  const vendors = ['ms', 'moz', 'webkit', 'o']
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame']
    window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] ||
      window[vendors[x] + 'CancelRequestAnimationFrame']
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      const currTime = new Date().getTime()
      const timeToCall = Math.max(0, 16 - (currTime - lastTime))
      const id = window.setTimeout(() => {
        callback(currTime + timeToCall)
      }, timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id)
    }
  }
}())


export default class {
  constructor(el) {
    this.canvas = document.getElementById(el)
    this.ctx = this.canvas.getContext('2d')
    this.routes_default = [
      [20, 30],
      [20, 50],
      [210, 50],
      [210, 70],
      [20, 70],
      [20, 90],
      [210, 90],
      [210, 110],
      [20, 110],
      [20, 130]
    ]
  }

  drawBg(reverse = false, fourRoot = true) {
    this.clear()
    this.start = 1
    this.timer = ''
    this.ball_r = 14
    this.speed = 30
    this.ball_color_default = '#9f9171'
    this.ball_color_active = 'red'
    this.line_width = 10
    this.line_color_default = '#735d4f'
    this.line_color_active = 'red'
    this.top_txt_left = '左'
    this.top_txt_right = '右'
    this.bottom_txt_left = '单'
    this.bottom_txt_right = '双'
    this.txt_color_default = '#ffffff'
    this.txt_gap = 6
    this.font = '18px Microsoft Yahei'
    this.reverse = reverse
    this.fourRoot = fourRoot
    const ctx = this.ctx

    this.routes = this.routes_default
    if (!fourRoot) this.routes = this.routes_default.slice(0, 8)
    const routes = this.routes


    if (this.reverse) {
      this.ctx.save()
      this.setReverse()
      this.ctx.restore()
    }
    this.setFlex()


    // 画背景
    ctx.lineCap = 'round'
    ctx.lineWidth = this.line_width

    routes.map((el, i) => {
      if (i === 0) {
        ctx.moveTo(...el)
        ctx.lineWidth = this.line_width + 1
        ctx.lineTo(el[0], routes[routes.length - 1][1])
        ctx.moveTo(routes[2][0], el[1])
        ctx.lineTo(routes[2][0], routes[routes.length - 1][1])
        ctx.strokeStyle = this.line_color_default
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(...el)
      } else {
        ctx.lineWidth = this.line_width
        ctx.lineTo(...el)
      }
      return ctx
    })
    ctx.strokeStyle = this.line_color_default
    ctx.stroke()
    ctx.closePath()



    // 画球
    this.drawBall_top_left()
    this.drawBall_top_right()
    this.drawBall_bottom_left()
    this.drawBall_bottom_right()

    return this
  }
  move(callback) {
    // console.error([this.fourRoot, this.reverse])
    if (this.reverse) {
      this.drawBall_top_left(null, 'X')
      this.drawBall_top_right(this.ball_color_active)
      this.ctx.save()
      this.setReverse()
      // this.ctx.restore()
    } else {
      this.drawBall_top_right(null, 'X')
      this.drawBall_top_left(this.ball_color_active)
    }


    this.animate(callback)
  }

  setReverse() {
    const w = this.routes[2][0] - this.routes[0][0] + this.ball_r * 3 - 2
    // const canvasWidth = this.canvas.width
    this.ctx.translate(w, 0)
    this.ctx.scale(-1, 1)
  }

  setFlex() {
    const h = this.routes[this.routes.length - 1][1] - this.routes[0][1] + this.ball_r * 4
    const canvasWidth = this.canvas.width
    // this.ctx.save()
    if (!this.fourRoot) {
      this.ctx.translate(0, (160 - h) / 2)
    }
    this.ctx.scale(canvasWidth / 230, canvasWidth / 230)
    // this.ctx.restore()

    // this.ctx.fillStyle = 'red'
    // this.ctx.fillText(canvasWidth / 230, 120, 30)
    // this.ctx.beginPath()
  }

  drawBall_top_left(ballColor, txt) {
    const ball_x_1 = this.routes[0][0]
    const ball_y_1 = this.routes[0][1]
    const ctx = this.ctx
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = ballColor || this.ball_color_default
    ctx.arc(ball_x_1, ball_y_1 - this.ball_r, this.ball_r, 0, 2 * Math.PI)
    ctx.fill()

    ctx.fillStyle = this.txt_color_default
    ctx.textAlign = 'center'
    ctx.font = this.font
    ctx.fillText(txt || this.top_txt_left, ball_x_1, ball_y_1 - this.ball_r + this.txt_gap)
    ctx.closePath()
    ctx.restore()
  }
  drawBall_top_right(ballColor, txt) {
    const ball_x_1 = this.routes[0][0]
    const ball_x_2 = ball_x_1 + this.routes[2][0] - this.routes[0][0]
    const ball_y_1 = this.routes[0][1]
    const ctx = this.ctx
    ctx.beginPath()
    ctx.fillStyle = ballColor || this.ball_color_default
    ctx.arc(ball_x_2, ball_y_1 - this.ball_r, this.ball_r, 0, 2 * Math.PI)
    ctx.fill()

    ctx.fillStyle = this.txt_color_default
    ctx.textAlign = 'center'
    ctx.font = this.font
    ctx.fillText(txt || this.top_txt_right, ball_x_2, ball_y_1 - this.ball_r + this.txt_gap)
    ctx.closePath()
  }
  drawBall_bottom_left(ballColor) {
    const ball_x_1 = this.routes[0][0]
    const ball_y_1 = this.routes[0][1]
    const ball_y_2 = ball_y_1 + this.routes[this.routes.length - 1][1] - this.routes[0][1]
    const ctx = this.ctx
    ctx.beginPath()
    ctx.fillStyle = ballColor || this.ball_color_default
    ctx.arc(ball_x_1, ball_y_2 + this.ball_r, this.ball_r, 0, 2 * Math.PI)
    ctx.fill()

    ctx.fillStyle = this.txt_color_default
    ctx.textAlign = 'center'
    ctx.font = this.font
    ctx.fillText(this.bottom_txt_left, ball_x_1, ball_y_2 + this.ball_r + this.txt_gap)
    ctx.closePath()
  }
  drawBall_bottom_right(ballColor) {
    const ball_x_1 = this.routes[0][0]
    const ball_x_2 = ball_x_1 + this.routes[2][0] - this.routes[0][0]
    const ball_y_1 = this.routes[0][1]
    const ball_y_2 = ball_y_1 + this.routes[this.routes.length - 1][1] - this.routes[0][1]
    const ctx = this.ctx
    ctx.beginPath()
    ctx.fillStyle = ballColor || this.ball_color_default
    ctx.arc(ball_x_2, ball_y_2 + this.ball_r, this.ball_r, 0, 2 * Math.PI)
    ctx.fill()

    ctx.fillStyle = this.txt_color_default
    ctx.textAlign = 'center'
    ctx.font = this.font
    ctx.fillText(this.bottom_txt_right, ball_x_2, ball_y_2 + this.ball_r + this.txt_gap)
    ctx.closePath()
  }
  animate(callback) {
    const points = this.calcWaypoints()
    const start = this.start
    const ctx = this.ctx
    if (start < points.length - 1) {
      this.timer = window.requestAnimationFrame(() => this.animate(callback))
    } else {
      if (this.reverse) {
        this.ctx.restore()
      }
      ctx.beginPath()
      if (this.fourRoot && this.reverse || (!this.fourRoot && !this.reverse)) this.drawBall_bottom_right(this.ball_color_active)
      else this.drawBall_bottom_left(this.ball_color_active)
      this.ctx.closePath()
      if (callback)callback()
      return this
    }

    ctx.beginPath()
    ctx.moveTo(points[start - 1][0], points[start - 1][1])
    ctx.lineTo(points[start][0], points[start][1])
    ctx.strokeStyle = this.line_color_active
    ctx.stroke()
    this.start++
  }


  calcWaypoints() {
    const routes = this.routes
    const waypoints = []
    const speed = this.speed
    for (let i = 1; i < routes.length; i++) {
      const pt0 = routes[i - 1]
      const pt1 = routes[i]
      const dx = pt1[0] - pt0[0]
      const dy = pt1[1] - pt0[1]
      for (let j = 0; j <= speed; j++) {
        const x = pt0[0] + dx * j / speed
        const y = pt0[1] + dy * j / speed
        waypoints.push([x, y])
      }
    }
    return waypoints
  }

  clear() {
    window.cancelAnimationFrame(this.timer)
    this.canvas.height = this.canvas.height
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

}

