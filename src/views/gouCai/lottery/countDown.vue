<template>
  <div class="countdown_comp">
    <span>
      <span v-show="closeIsShow">第{{(issueNum+ '').slice(-4)}}期投注截止时间:</span>
      <AppCountDown ref="stopless" :time="stopless" timetype="second" done-text="封盘" :callback="endCallback">
        <span style="color:red;">{%h}:{%m}:{%s}</span>
      </AppCountDown>
    </span>
    <!-- <span v-show="!closeIsShow">当期已封盘，请等待开奖后下注下期</span> -->
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      issueNum: 20181796,
      countNum: 1521208800,
      content: [],
      closeIsShow: true,
      resTimer: Function,
      stopless: 0
    }
  },
  activated() {
    clearInterval(this.$refs.stopless.timer)
    this.getBasicData()
  },
  deactivated() {
    clearInterval(this.$refs.stopless.timer)
  },
  watch: {
    issueNum(val) {
      this.$emit('activedData', val)
    }
  },
  methods: {
    async getBasicData() {
      let res = await this.getData()
      //  this.closeIsShow = false
      this.issueNum = res[0].next[0].qishu
      this.stopless = res[0].next[0].stopless
      // console.log('我是倒计时')
      // clearInterval(this.$refs.stopless.timer)
      // this.$refs.stopless.run()
    },
    async getData() {
      return this.$ajax('request', {
        ac: 'getCplogList',
        tag: this.$store.state.betting.name_tag
      })
      // then(closeData => {
      //   this.closeIsShow = false
      //   this.issueNum = closeData[0].next[0].qishu
      //   let stopTime = closeData[0].next[0].stopless
      //   if(stopTime > 1) {
      //     this.closeIsShow = true
      //     this.stopless = stopTime
      //   //   clearInterval(this.resTimer)
      //   } else {
      //     this.$dialog.toast({mes: '已进入下一期'})
      //     this.closeIsShow = true
      //     this.$emit('toNextQi')
      //     this.issueNum = closeData[0].next[1].qishu
      //     this.stopless = closeData[0].next[1].stopless
      //     // this.endCallback()
      //   }
      // })
    },
    async endCallback() {
      let res = await this.getData()
      this.$dialog.toast({ mes: '已进入下一期' })
      this.$emit('toNextQi')
      let stopTime = res[0].next[0].stopless
      console.log('stopless', res[0].next[0].stopless)
      if (stopTime > 1) {
        this.issueNum = res[0].next[0].qishu
        this.stopless =
          typeof this.stopless === 'number'
            ? res[0].next[0].stopless.toString()
            : res[0].next[0].stopless
      } else {
        this.issueNum = res[0].next[1].qishu
        this.stopless =
          typeof this.stopless === 'number'
            ? res[0].next[1].stopless.toString()
            : res[0].next[1].stopless
      }
      // console.log('我也是倒计时')
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.countdown_comp {
  @include center;
  width: 100%;
  height: poTorem(38px);
  background: #f2f3f4;
  font-size: poTorem(16px);
  color: #515253;
  i {
    color: #e45557;
  }
}
</style>


