




<template>
  <div class="code-container" ref="codeContainer">
    <canvas id="myCanvas" ref="canvas_vcode" width="70px" height="40px" style="float: right;" @click="createCode"></canvas>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'vcode',
  mounted() {
    this.$nextTick(() => {
      this.createCode()
    })
  },
  methods: {
    ...mapActions(['setVcode']),
    randomNum(a, b) {
      return Math.floor(Math.random() * (b - a) + a)
    },
    writeText(ctx, num, index) {
      // 文字大小
      ctx.font = `${this.randomNum(10, 24) / 10}rem arial`
      // console.log(this.randomNum(10, 24) / 10)
      // 旋转
      ctx.save()
      ctx.rotate(this.randomNum(1, 30) * Math.PI / 180)
      // console.log(this.randomNum(1, 80))
      ctx.strokeStyle = '#ffffff'
      ctx.fillStyle = '#ffffff'
      // ctx.strokeText(num, 5, 0)
      // ctx.fillText(num, index * 15 + 2, 30)
      ctx.fillText(num, index === 0 ? 6 : index * 15, 30)
      // ctx.fillText(
      //   num,
      //   index === 0 ? 6 : index * 15,
      //   index === 0 ? 20 : this.randomNum(7, 16)
      // )
      // console.log(index === 0 ? 6 : index * 15, this.randomNum(7, 16))
      ctx.restore()
    },
    createCode() {
      let code = ''
      const codeLength = 4 //验证码的长度，可变
      const canvas = document.getElementById('myCanvas') //获取画布
      const selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9) //所有候选组成验证码的字符

      for (let i = 0; i < codeLength; i++) {
        const charIndex = Math.floor(Math.random() * 10)
        code += selectChar[charIndex]
      }
      console.log('vcode', code)
      this.setVcode(code)

      let bgColor = `rgb(${this.randomNum(0, 255)}, ${this.randomNum(
        0,
        255
      )}, ${this.randomNum(0, 255)})`
      if (canvas) {
        const container = this.$refs['codeContainer'],
          w = container.clientWidth,
          h = container.clientHeight
        var ctx = canvas.getContext('2d')
        ctx.fillStyle = bgColor

        // ctx.fillRect(0, 0, 70, 40)
        console.log(w, h)
        ctx.fillRect(0, 0, w, h)
        code.split('').map((x, i) => this.writeText(ctx, x, i))
        // this.writeText(ctx, code[0], 0)
        // this.writeText(ctx, code[1], 1)
        // this.writeText(ctx, code[2], 2)
        // this.writeText(ctx, code[3], 3)
        //ctx.font = '20px arial'
        // 创建渐变
        // var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0)
        // gradient.addColorStop('0', 'magenta')
        // gradient.addColorStop('0.5', 'blue')
        // gradient.addColorStop('1.0', 'red')
        // 用渐变填色
        // ctx.strokeStyle = gradient
        //ctx.strokeText(code, 5, 20) //画布上添加验证码
      }
    }
  }
}
</script>
<style scoped>
.code-container {
  width: 100%;
  height: 100%;
}
</style>
