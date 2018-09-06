<template>
  <div class="elevenx5">
    <!-- 头部 -->
    <div class="heads">
      <div class="heads_top">
        <div class="qishu">
          <span>第
            <i>{{nextQishu && ((nextQishu * 1 - 1) +'').padStart(4,'0') || ''}}</i>期
          </span>
          <ul>
            <li>
              {{getSpanning(balls)}}
            </li>
            <li>
              {{repeatArr.length ? repeatArr[0] : "-"}}
            </li>
          </ul>
          <div>
            <span>{{getSumVal(balls)[0]}}</span>
            <span>{{getSumVal(balls)[1]}}</span>
          </div>
        </div>
        <div class="balls">
          <ul v-if="balls.length > 1">
            <li v-for="(item,index) in balls" :key="index">{{item}}</li>
          </ul>
          <ul v-else>
            <li v-for="(item,index) in randomBalls" :key="index">{{item}}</li>
          </ul>
          <span @click="oepnHistory">
            <i>历史开奖</i>
            <i class="icon" :class="{'slidedown':this.isOpen}"></i>
          </span>
        </div>
      </div>
      <div class="heads_bottom">
        <!-- 历史开奖 -->
        <yd-accordion>
          <yd-accordion-item ref="accordion" :auto="false">
            <div class="history">
              <ul>
                <li class="title">
                  <span>期号</span>
                  <span>开奖号码</span>
                  <span>跨度</span>
                  <span>重号个数</span>
                  <span>总和值</span>
                </li>
                <li v-for="(item, index) in kjBalls" v-if="index <= 7" :key="index">
                  <span>{{item.qishu.toString().slice(-4)}}</span>
                  <span class="kaijiang">
                    {{item.balls.length ? item.balls.join(',') : '正在开奖'}}

                  </span>
                  <span>{{getSpanning(item.balls)}}</span>
                  <span>{{repeatArr[index]}}</span>
                  <span>
                    {{getSumVal(item.balls)[0]}} &nbsp; {{getSumVal(item.balls)[1]}}
                  </span>
                </li>
              </ul>
            </div>
          </yd-accordion-item>
        </yd-accordion>
        <!-- 倒计时完成后 -->
        <div class="times">
          <div class="jiezhi">
            第
            <i>{{nextQishu}}</i>期{{closeIsShow?'截止时间':'已封盘'}}:
          </div>
          <div class="haoma">
            <app-count-down ref="openless" v-model="openless_leftTime" :time="openless" timetype="second" done-text="正在开奖" format="{%h}:{%m}:{%s}" :callback="_openCallback"></app-count-down>
          </div>
          <div class="haoma" v-html="renderStr" @click="userBalanceClick"></div>
        </div>
      </div>
    </div>
    <!-- 投注部分 -->
    <betting :routeList="routeLists"></betting>
    <!-- 购物车 -->
    <shop :quotation="closeIsShow" @clearAll='transmit'></shop>
  </div>
</template>
<script>
import betting from '../components/betting'
import shop from '../../shop'
import { secondsFormat } from '~/js/touzhu/touzhu.util'
import { resetRouteParams } from '~/js/util'
import { mapActions, mapState } from 'vuex'
import countDownMixin from '../../countDownMixin'
export default {
  name: 'elevenx5head',
  props: ['routes'],
  data() {
    return {
      routeLists: {},
      kjBalls: [],
      balls: [],
      nexts: [],
      timer: Function,
      openTimer: Function,
      closeIsShow: false,
      content: [],
      openTimeContent: [],
      isOpen: false,
      val: '',
      repeatArr: []
    }
  },
  components: {
    betting,
    shop
  },
  computed: {
    ...mapState({
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber
    })
  },
  async activated() {
    this.routeLists = this.routes
    resetRouteParams(this, '11x5')
    let name_tag =
      this.$route.params.name_tag || this.$store.state.betting.name_tag
    if(name_tag) {
      this.getOpened(name_tag)
      this.getHistory(name_tag)
    }
    // name_tag &&
    //   (await this.getOpened(name_tag)) &&
    //   (await this.getHistory(name_tag))
    // name_tag && this.getHistory(name_tag)
    clearInterval(this.resTimer)
    this.randomBallTimer = setInterval(() => {
      this.ballFromBet()
    }, 500)
  },
  deactivated() {
    // clearInterval(this.$refs.stopless.timer);
    clearInterval(this.$refs.openless.timer)
    clearInterval(this.resTimer)
    clearInterval(this.randomBallTimer)
  },
  filters: {
    singleNum(num) {
      return Number(num)
    }
  },
  watch: {
    '$route.params'(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === '11x5' &&
        (oldVal && oldVal.js_tag == newVal.js_tag)
      ) {
        // clearInterval(this.$refs.stopless.timer);
        clearInterval(this.$refs.openless.timer)
        clearInterval(this.resTimer)

        this.routeLists = newVal
        resetRouteParams(this, '11x5')
        this.getOpened(newVal.name_tag)
        this.getHistory(newVal.name_tag)
        this.setBetCurent(newVal)
        this.setBetData({})
        this.clearCart()
      }
    },
    kjBalls(val) {
      if (val.length) {
        this.getBatchRepeatTimes()
      }
    }
  },
  methods: {
    ...mapActions(['setBetCurent', 'setBetData', 'clearCart']),
    renderQishu(qishu) {
      let _val = qishu
      return (_val && (_val * 1 - 1 + '').padStart(4, '0')) || ''
    },
    //总和值
    getSumVal(balls) {
      if (balls && balls.length) {
        let sum = (typeof balls === 'string' ? balls.split('+') : balls)
          .map(x => Number(x))
          .reduce((a, b) => a + b)
        let arr = []
        arr.push(sum > 29 ? '大' : '小')
        arr.push(sum % 2 === 0 ? '双' : '单')
        return arr
      } else {
        return ['-', '-']
      }
    },
    //跨度
    getSpanning(numbers) {
      if (!numbers || !numbers.length) return '-'
      let _arr = typeof numbers === 'string' ? numbers.split(' ') : numbers,
        max = Math.max(..._arr),
        min = Math.min(..._arr)

      return max - min
    },
    //获取重复个数
    getRepeatTimes(item) {
      if (!this.kjBalls[0].balls || !this.kjBalls[0].balls.length) return '-'
      let index = this.kjBalls.findIndex(x => x.qishu === item.qishu) + 1
      if (index === this.kjBalls.length) return '-'
      let prev = this.kjBalls[index] //前一行
      let _balls_cur = item.balls.length //当前行球
          ? item.balls
          : [], //.sort((a, b) => a - b)
        _balls_prev = prev.balls, //.sort((a, b) => a - b), //前一行球
        count = 0
      for (let i = 0; i < _balls_cur.length; i++) {
        if (_balls_prev.includes(_balls_cur[i])) {
          count += 1
        }
      }

      return count.toString()
    },
    // 批量获取重复个数
    getBatchRepeatTimes() {
      let arr = []
      this.kjBalls.forEach(item => {
        arr.push(this.getRepeatTimes(item))
      })
      this.repeatArr = arr
    },
    transmit() {
      // debugger
      this.$children.forEach(x => {
        if (x.$vnode.tag.includes('eleventxfive_betting')) {
          x.clearBalls && x.clearBalls()
        }
      })
      this.bus.$emit('clearBalls')
      // this.$children[3].clearBalls()
    },
    oepnHistory() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.$refs.accordion.openItem()
      } else {
        this.$refs.accordion.closeItem()
      }
    }
  },
  mixins: [countDownMixin]
}
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.elevenx5 {
  width: 100%;
  background: #fff;
  // position: absolute;
  flex: 1;
  display: flex;
  flex-direction: column;
  top: poTorem(48px);
  .heads {
    display: flex;
    flex-direction: column;
    background: #eeeeee;
    border-bottom: poTorem(1px) solid #e1e1e1;
    padding: 0 poTorem(10px);
    position: relative;
    .heads_top {
      @include column;
      width: 100%;
      > div {
        width: 100%;
        @include between;
      }
      .qishu {
        height: poTorem(45px);
        span {
          font-size: poTorem(16px);
          color: #535353;
          i {
            color: #eb3349;
            padding: 0 poTorem(3px);
          }
        }
        div {
          span {
            padding: poTorem(1px) poTorem(8px);
            background: #fff;
            color: #707070;
            border: 1px solid #d3d3d2;
            margin-left: poTorem(6px);
          }
        }
        ul {
          @include between;
          li {
            font-size: poTorem(16px);
            // background: #3cc479;
            // color: #D3D3D2;
            color: #707070;
            border: 1px solid #d3d3d2;
            margin: 0 poTorem(6px);
            padding: poTorem(1px) poTorem(8px);
            background-color: #fff;
          }
        }
      }
      .balls {
        height: poTorem(38px);
        ul {
          @include between;
          li {
            text-align: center;
            font-size: poTorem(16px);
            color: #af2e3e;
            background: url(~img/balls.png);
            width: poTorem(34px);
            height: poTorem(34px);
            background-size: contain;
            margin-right: poTorem(4px);
            line-height: poTorem(29px);
          }
        }
        p {
          color: #eb3349;
          font-size: poTorem(18px);
          text-indent: 2rem;
        }
        span {
          @include between;
          width: poTorem(86px);
          i {
            font-size: 1rem;
            color: #535353;
          }
          .icon {
            background: url(~img/goucai/arrow.png);
            height: poTorem(16px);
            width: poTorem(16px);
            background-size: contain;
            transition: transform 0.3s ease;
          }
          .icon.slidedown {
            transform: rotate(180deg) translateZ(0);
          }
        }
      }
    }
    .heads_bottom {
      @include column;
      position: absolute;
      top: poTorem(83px);
      background: #eeeeee;
      width: 100%;
      z-index: 1;
      left: 0px;
      > div {
        @include between;
        width: 100%;
      }
      // 开奖历史
      .history {
        display: block;
        z-index: 11;
        left: poTorem(-10px);
        width: poTorem(414px);
        > ul {
          @include column;
          > li {
            padding: 0 3%;
            width: 100%;
            height: poTorem(30px);
            @include between;
            span {
              @include center;
              font-size: poTorem(14px);
              min-width: poTorem(60px);
              color: #535353;
              &:nth-child(2) {
                flex: 1;
              }
            }
            // span:nth-child(3) {
            //   width: poTorem(60px);
            // }
            // span:nth-child(4) {
            //   width: poTorem(70px);
            // }
            // span:nth-child(5) {
            //   width: poTorem(60px);
            // }
            .kaijiang {
              color: #eb3349;
            }
            &:nth-child(even) {
              background: #eee;
            }
            > ul {
              @include between;
              width: poTorem(90px);
              li {
                @include between;
                font-size: poTorem(16px);
                color: #eb3349;
                i {
                  margin-right: poTorem(4px);
                }
              }
            }
          }
        }
      }
      .times {
        background-color: #eee;
        font-size: poTorem(14px);
        color: #535353;
        height: poTorem(30px);
        padding: 0 poTorem(10px);
        border-bottom: poTorem(1px) solid #e9e9ea;
        .jiezhi {
          i {
            margin: 0 poTorem(3px);
          }
        }
        .balance {
          span {
            color: #eb3349;
            margin: 0 poTorem(3px);
          }
        }
      }
    }
  }
  #drag {
    border: poTorem(2px) solid #e5e6e7;
    border-radius: 50%;
    width: poTorem(60px);
    height: poTorem(60px);
    background: #fff url(~img/goucai/gouwuche.png) no-repeat;
    background-size: poTorem(30px) poTorem(30px);
    background-position: center;
    position: fixed;
    left: poTorem(10px);
    bottom: poTorem(67px);
    z-index: 11;
    .spots {
      position: absolute;
      @include center;
      width: poTorem(18px);
      height: poTorem(18px);
      background: #e03a3a;
      display: flex;
      border-radius: 50%;
      font-weight: bolder;
      color: #fff;
      right: poTorem(8px);
      top: poTorem(8px);
    }
  }
}

</style>
