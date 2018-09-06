<template>
  <div class="pkten">
    <!-- 头部 -->
    <div class="heads">
      <div class="heads_top">
        <div class="qishu">
          <span>第
            <i>{{nextQishu && (nextQishu * 1 - 1) || ''}}</i>期
          </span>
          <ul>
            <li v-for="(item, index) in gyh(balls)" :key="index">{{item}}</li>
          </ul>
          <ul>
            <li v-for="(item, index) in lhdxt" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="balls">
          <ul v-if="balls.length > 1">
            <li v-for="(item,index) in balls" :key="index" :style="{'backgroundColor': getColor(item)}">{{item}}</li>
          </ul>
          <ul v-else>
            <li v-for="(item,index) in randomBalls" :key="index" :style="{'backgroundColor': getColor(item)}">{{item}}</li>
          </ul>
          <span @click="openHistory">
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
                  <span>冠亚军和</span>
                </li>
                <li v-for="(item, index) in kjBalls" v-if="index <= 7" :key="index">
                  <span>{{item.qishu.toString().slice(-4)}}</span>
                  <span class="kaijiang">{{item.balls ? item.balls.join(',') : '正在开奖'}}</span>
                  <span>
                    {{gyh(item.balls).join(' &nbsp;')}}
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
import { pk10bjys } from '~/js/pk10color'
import { secondsFormat } from '~/js/touzhu/touzhu.util'
import { resetRouteParams } from '~/js/util'
import { mapActions, mapState } from 'vuex'
import countDownMixin from '../../countDownMixin'
export default {
  props: ['routes'],
  data() {
    return {
      routeLists: {},
      data: Object,
      kjBalls: [],
      balls: [],
      closeIsShow: false,
      content: [],
      openTimeContent: [],
      show2: false,
      isOpen: false,
      val: '',
      nexts: []
    }
  },
  components: {
    betting,
    shop
  },
  created() {
    this.routeLists = this.routes
  },
  async activated() {
    this.routeLists = this.routes
    clearInterval(this.resTimer)
    let name_tag =
      this.$route.params.name_tag || this.$store.state.betting.name_tag
      if(name_tag) {
      this.getOpened(name_tag)
      this.getHistory(name_tag)
    }
    // name_tag &&
    //   (await this.getOpened(name_tag)) &&
    //   (await this.getHistory(name_tag))
    resetRouteParams(this, 'pk10')
    this.randomBallTimer = setInterval(() => {
      this.ballFromBet()
    }, 500)
  },
  deactivated() {
    clearInterval(this.$refs.openless.timer)
    clearInterval(this.resTimer)
    clearInterval(this.randomBallTimer)
  },
  filters: {
    singleNum(num) {
      return parseInt(num)
    }
  },
  computed: {
    lhdxt() {
      // 龙虎斗形态
      if (!this.balls.length) {
        return ['-', '-', '-', '-', '-']
      } else {
        let _balls = this.balls.map(item => Number(item)),
          arr = []
        arr.push(this.getLhd(_balls[0], _balls[9]))
        arr.push(this.getLhd(_balls[1], _balls[8]))
        arr.push(this.getLhd(_balls[2], _balls[7]))
        arr.push(this.getLhd(_balls[3], _balls[6]))
        arr.push(this.getLhd(_balls[4], _balls[5]))
        return arr
      }
    },
    ...mapState({
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber
    })
  },
  watch: {
    '$route.params'(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === 'pk10' &&
        (oldVal && oldVal.js_tag == newVal.js_tag)
      ) {
        clearInterval(this.$refs.openless.timer)
        clearInterval(this.resTimer)

        this.routeLists = newVal
        resetRouteParams(this, 'pk10')
        this.getOpened(newVal.name_tag)
        this.getHistory(newVal.name_tag)
        this.setBetCurent(newVal)
        this.setBetData({})
        this.clearCart()
      }
    }
  },
  methods: {
    ...mapActions(['setBetCurent',, 'setBetData', 'clearCart']),
    getLhd(num1, num2) {
      return num1 > num2 ? '龙' : '虎'
    },
    gyh(balls) {
      if (!balls || !balls.length) return ['-', '-', '-']
      // 冠亚和形态
      let arr = [],
        _balls = balls
      if (typeof _balls === 'string') {
        _balls = balls.split('+')
      }
      let sum = parseInt(_balls[0]) + parseInt(_balls[1])
      arr.push(sum)
      let shape = '小'
      if (sum > 2 && sum < 9) {
        shape = '小'
      } else if (sum > 8 && sum < 14) {
        shape = '中'
      } else {
        shape = '大'
      }
      arr.push(shape)
      arr.push(sum === 11 ? '和' : sum % 2 == 0 ? '双' : '单')
      return arr
    },
    transmit() {
      const bettingItem = this.$children.find(x =>
        x.$vnode.tag.includes('pk10_betting')
      )
      bettingItem && bettingItem.clearBalls && bettingItem.clearBalls()
      this.bus.$emit('clearBalls')
    },
    getColor(val) {
      return pk10bjys(val)
    },
    greet(val) {
      this.val = val
    },
    openHistory() {
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
.pkten {
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
            display: inline-block;
            text-align: center;
            width: poTorem(28px);
            height: poTorem(24px);
            color: #535353;
            background: #fff;
            border: 1px solid #d2d3d5;
            margin-left: poTorem(5px);
          }
        }
        ul {
          @include between;
          li {
            font-size: poTorem(16px);
            color: #535353;
            background: #fff;
            border: 1px solid #d2d3d5;
            margin: 0 poTorem(3px);
            width: poTorem(28px);
            height: poTorem(24px);
            text-align: center;
            line-height: poTorem(24px);
            border-radius: 2px;
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
            color: #fff;
            // background: url(~img/balls.png);
            width: poTorem(24px);
            height: poTorem(28px);
            background-size: contain;
            margin-right: poTorem(4px);
            line-height: poTorem(29px);
            border-radius: 2px;
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
            color: #535353;
            font-size: 1rem;
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
      border-bottom: 1px solid #d1d1d1;
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
              min-width: poTorem(50px);
              color: #535353;
              &:nth-child(2) {
                flex: 1;
              }
            }
            .kaijiang {
              color: #eb3349;
              width: auto;
            }
            &:nth-child(odd) {
              background: #fff;
            }
            &:nth-child(even) {
              background-color: #eee;
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
}
</style>
