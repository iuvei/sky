<template>
  <div class="loader" v-show="!complete">
    <!-- <yd-progressbar :progress="progress3" trail-width="6" trail-color="#F60">
      <span>资源加载中</span>
      <yd-countup :endnum="progress3 * 100" :duration="1" suffix="%"></yd-countup>
      <span v-show="countdown > 0">倒计时结束跳转：{{countdown}}</span>
    </yd-progressbar> -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      progress3: 0,
      onerr: 0,
      complete: false,
      countdown: 0
    }
  },
  mounted() {
    /**
     * 十秒内没加载完开始倒计时，然后直接跳转
     */
    setTimeout(() => {
      if (this.progress3 < 1) {
        let i = 10
        let times = setInterval(() => {
          i--
          this.countdown = i
          if (i == 0) {
            let child = document.getElementById('loading')
            child && child.parentNode.removeChild(child)
            this.$router.push({ path: '/home', query: { stage: true } })
            this.complete = true
            clearInterval(times)
          }
        }, 1000)
      }
    }, 5000)
  },
  watch: {
    loader: {
      /** 判断进度条并赋值 */
      handler: function(val, oldVal) {
        this.progress3 = val.percent
        this.onerr = val.errText
        this.progress3 == 1 &&
          setTimeout(() => {
            this.complete = true
            let child = document.getElementById('loading')
            child && child.parentNode.removeChild(child)
            this.$nextTick(() => {
              if (this.maintained.msg === 45000) {
                this.$router.replace('/maintained')
              } else if (this.$route.params.vip) {
                this.$router.push({
                  name: 'zhuce',
                  params: {
                    vip: this.$route.params.vip
                  }
                })
              } else {
                this.$router.push('/home')
              }
            })
            if (this.sysContent != 0) {
              this.$store.commit('SET_SYSSTATE', true)
            }
          }, 1000)
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['loader', 'sysContent', 'maintained'])
  }
}
</script>
<style lang="scss" scoped>
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: poTorem(414px);
  height: 100%;
  z-index: 1111;
  background: #fff;
  overflow: hidden;
}
</style>
