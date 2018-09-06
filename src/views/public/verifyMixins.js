export default {
  data() {
    return {
      verifyArr: []
    }
  },
  methods: {
    /** ****** 随机验证码 *********/
    randomNum(a, b) {
      return Math.floor(Math.random() * (b - a) + a)
    },
    randomVerify() {
      console.log(this.$refs.randomVerifyImg)
      let num = ''
      for (let i = 0; i < 4; i++) {
        num += this.randomNum(0, 10)
      }
      this.verifyArr = num.split('')
      this.$refs.randomVerifyImg.style.backgroundColor = `rgb(${this.randomNum(
        0,
        255
      )},${this.randomNum(0, 255)},${this.randomNum(0, 255)})`
      this.$nextTick(() => {
        for (let i = 0; i < 4; i++) {
          this.$refs.randomVerifyImg.children.item(
            i
          ).style.transform = `rotate(${this.randomNum(-80, 80)}deg)`
          this.$refs.randomVerifyImg.children.item(
            i
          ).style.fontSize = `${this.randomNum(10, 20) / 10}rem`
        }
      })
    }
  }
}
