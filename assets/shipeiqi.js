(function(doc, win) {
  let shakeTimer = null
  const gameTags = ['pcdd', 'pk10', '3d', 'k3', '11x5', 'lhc', 'ssc']
  const docEl = doc.documentElement, // 根元素html
    // 判断窗口有没有orientationchange这个方法，有就赋值给一个变量，没有就返回resize方法。

    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      const clientWidth = docEl.clientWidth

      if (!clientWidth) return

      // 把document的fontSize大小设置成跟窗口成一定比例的大小，从而实现响应式效果。
      let fz = 16 * (clientWidth / 414)
      if (fz > 16) fz = 16
      docEl.style.fontSize = fz + 'px'
    }

  // alert(docEl)

  if (!doc.addEventListener) return

  win.addEventListener(resizeEvt, recalc, false) // addEventListener事件方法接受三个参数：第一个是事件名称比如点击事件onclick，第二个是要执行的函数，第三个是布尔值

  doc.addEventListener('DOMContentLoaded', recalc, false) // 绑定浏览器缩放与加载时间
  const speed = 20
  let x, y, z, lastX, lastY, lastZ

  function doShake() {
    clearTimeout(shakeTimer)
    shakeTimer = setTimeout(() => {
      if (
        window.vue &&
        window.vue.$route &&
        gameTags.includes(window.vue.$route.name)
      ) {
        // 简单的摇一摇触发代码
        // console.log(window.vue.$store.state.member.shakingSwitch)
        if (
          typeof navigator.vibrate === 'function' &&
          window.vue.$store.state.member.shakingSwitch
        ) {
          navigator.vibrate(500)
        } // 震动
        window.vue.bus.$emit('shake')
      }
    }, 300)
  }

  function deviceMotionHandler(eventData) {
    const acceleration = eventData.accelerationIncludingGravity
    x = acceleration.x
    y = acceleration.y
    z = acceleration.z
    if (
      Math.abs(x - lastX) > speed ||
      Math.abs(y - lastY) > speed ||
      Math.abs(z - lastZ) > speed
    ) {
      // if (
      //   window.vue &&
      //   window.vue.$route &&
      //   gameTags.includes(window.vue.$route.name)
      // ) {
      //   console.log('cccccccc')
      //   // 简单的摇一摇触发代码
      //   navigator.vibrate(500) // 震动
      //   window.vue.bus.$emit('shake')
      // }
      doShake()
    }
    lastX = x
    lastY = y
    lastZ = z
  }
  // 添加防抖
  // function deviceMotion(eventData) {
  //   // clearTimeout(shakeTimer)
  //   console.log('eventData')
  //   console.log(eventData)
  //   // shakeTimer = null
  //   // shakeTimer = setTimeout(() => {
  //   //   // if (shakeTimer) clearInterval(shakeTimer)
  //   //   console.log('eventData')
  //   //   console.log(eventData)
  //   //   deviceMotionHandler(eventData)
  //   // }, 800)
  // }
  if (win.DeviceMotionEvent) {
    win.addEventListener('devicemotion', deviceMotionHandler, false)
  } else {
    console.log('您的设备不支持摇一摇')
  }
  // console.log(navigator)
  const vibrateSupport = 'vibrate' in navigator
  if (vibrateSupport) {
    // 兼容不同的浏览器
    navigator.vibrate =
      navigator.vibrate ||
      navigator.webkitVibrate ||
      navigator.mozVibrate ||
      navigator.msVibrate
  } else {
    console.log('您的设备不支持震动')
  }
}(document, window))
