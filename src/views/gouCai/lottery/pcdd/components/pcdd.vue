<template>
  <div class="pcdandan">
    <!-- 头部 -->
    <div class="heads">
      <div class="heads_top">
        <div class="qishu">
          <span>第
            <i>{{nextQishu && ((nextQishu * 1 - 1) +'').padStart(4,'0') || ''}}</i>期
          </span>
          <ul>
            <li>{{balls.length ? balls[3] : '-'}}</li>
            <li>{{balls[3] | singleOrDouble}}</li>
            <li>{{balls[3] | bigOrSmall}}</li>
          </ul>
          <div>
            <span>{{balls.length ? inWave(balls[3]) : '-'}}</span>
          </div>
        </div>
        <div class="balls">
          <ul v-if="this.balls.length > 1">
            <li>{{balls[0]}}</li>
            &nbsp;+&nbsp;
            <li>{{balls[1]}}</li>&nbsp;+&nbsp;
            <li>{{balls[2]}}</li>&nbsp;=&nbsp;
            <li class="sum" v-bind:style="{ backgroundColor: getBallColor(Number(balls[3])) }">{{Number(balls[3])}}</li>
          </ul>
          <ul v-else>
            <li>{{randomBalls[0]}}</li>
            &nbsp;+&nbsp;
            <li>{{randomBalls[1]}}</li>&nbsp;+&nbsp;
            <li>{{randomBalls[2]}}</li>&nbsp;=&nbsp;
            <li class="sum" v-bind:style="{ backgroundColor: getBallColor(Number(randomBalls[3])) }">{{Number(randomBalls[3])}}</li>
          </ul>
          <!-- <p v-show="this.balls.length==1">正在开奖</p> -->
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
                  <span>色波</span>
                  <span>大小</span>
                  <span>单双</span>
                </li>
                <li v-for="(item, index) in kjBalls" v-if="index <= 7" :key="index">
                  <span>{{item.qishu.toString().slice(-4)}}</span>
                  <span class="kaijiang">{{item.balls | openRewards}}</span>
                  <span>{{inWave(item.balls[3])}}</span>
                  <span>
                    <div class="shape" :class="{'red':Number(item.balls[3]) > 13,'green':Number(item.balls[3]) <= 13}">{{item.balls[3] | bigOrSmall}}</div>
                  </span>
                  <span>
                    <div class="shape" :class="{'red':Number(item.balls[3]) % 2 != 0,'green':Number(item.balls[3]) % 2 == 0}">{{item.balls[3] | singleOrDouble}}</div>
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
    <betting :routeList="routeLists" ref='chooseBall'></betting>
    <!-- 购物车 -->
    <shop :quotation="closeIsShow" ref='touzhuBtn' @clearAll='transmit'></shop>
  </div>
</template>
<script>
import { resetRouteParams } from '~/js/util'
import betting from '../components/betting'
import shop from '../../shop'
import { mapActions, mapState } from 'vuex'
import { BallToColorpcdd } from '~/js/pcddcolor'
import countDownMixin from '../../countDownMixin'
export default {
  data() {
    return {
      routeLists: {},
      nexts: Object,
      balls: [],
      kjBalls: [],
      closeIsShow: true,
      isOpen: false,
      val: '',
      redWave: [3, 6, 9, 12, 15, 18, 21, 24],
      greenWave: [1, 4, 7, 10, 16, 19, 22, 25],
      buleWave: [2, 5, 8, 11, 17, 20, 23, 26]
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
  filters: {
    // 大小
    bigOrSmall(num) {
      if (!isNaN(num)) {
        return Number(num) > 13 ? '大' : '小'
      } else {
        return '-'
      }
    },
    // 单双
    singleOrDouble(num) {
      if (!isNaN(num)) {
        return Number(num) % 2 == 0 ? '双' : '单'
      } else {
        return '-'
      }
    },
    openRewards(arr) {
      if (arr && arr.length === 4) {
        return `${arr[0]} + ${arr[1]} + ${arr[2]} = ${Number(arr[3])}`
      } else {
        // let arr1 = this.randomBalls
        // return `${arr1[0]} + ${arr1[1]} + ${arr1[2]} = ${Number(arr1[3])}`;
        return '正在开奖'
      }
    }
  },
  async activated() {
    this.routeLists = this.$route.params
    resetRouteParams(this, 'pcdd')
    let name_tag =
      this.$route.params.name_tag || this.$store.state.betting.name_tag
    if(name_tag) {
      this.getOpened(name_tag)
      this.getHistory(name_tag)
    }
    // name_tag &&
    //   (await this.getOpened(name_tag)) &&
    //   (await this.getHistory(name_tag))
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
  watch: {
    '$route.params'(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === 'pcdd' &&
        (oldVal && oldVal.js_tag == newVal.js_tag)
      ) {
        // clearInterval(this.$refs.stopless.timer);
        clearInterval(this.$refs.openless.timer)
        clearInterval(this.resTimer)

        this.routeLists = newVal
        this.setBetCurent(newVal)
        resetRouteParams(this, 'pcdd')
        this.getOpened(newVal.name_tag)
        this.getHistory(newVal.name_tag)
        this.setBetData({})
        this.clearCart()
      }
    }
  },
  methods: {
    getBallColor(num) {
      return BallToColorpcdd(num)
    },
    // 色波
    inWave(num) {
      if (!isNaN(num)) {
        let _num = Number(num)
        if (this.redWave.includes(_num)) {
          return '红'
        } else if (this.buleWave.includes(_num)) {
          return '蓝'
        } else if (this.greenWave.includes(_num)) {
          return '绿'
        } else {
          return '无'
        }
      }
    },
    transmit() {
      const bettingItem = this.$children.find(x =>
        x.$vnode.tag.includes('pcdd_betting')
      )
      bettingItem && bettingItem.clearBalls && bettingItem.clearBalls()
      this.bus.$emit('clearBalls')
    },
    openHistory() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.$refs.accordion.openItem()
      } else {
        this.$refs.accordion.closeItem()
      }
    },
    ...mapActions(['setBetCurent', 'setBetData', 'clearCart'])
  },
  mixins: [countDownMixin]
}
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.pcdandan {
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  flex: 1;
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
            min-width: 2rem;
            text-align: center;
            padding: poTorem(1px);
            border: poTorem(1px) solid #ddd;
            background: #fff;
            color: #535353;
            padding: 0.1rem 0.4rem;
          }
        }
        ul {
          @include between;
          li {
            min-width: 2rem;
            text-align: center;
            font-size: poTorem(16px);
            background: #fff;
            border: poTorem(1px) solid #ddd;
            color: #535353;
            margin: 0 poTorem(3px);
            padding: 0.1rem 0.4rem;
          }
        }
      }
      .balls {
        height: poTorem(38px);
        ul {
          @include between;
          font-size: poTorem(20px);
          li {
            text-align: center;
            font-size: poTorem(18px);
            color: #fff;
            //background: url(~img/balls.png);
            width: poTorem(32px);
            height: poTorem(32px);
            border-radius: 50%;
            background: #a9a9a9;
            background-size: contain;
            line-height: poTorem(32px);
          }
          li.sum {
            background: #eb3349;
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
            padding: 0 poTorem(10px);
            width: 100%;
            height: poTorem(40px);
            @include between;
            span {
              @include center;
              font-size: poTorem(14px);
              width: poTorem(90px);
              color: #535353;
              &:nth-child(2) {
                width: poTorem(150px);
              }

              .shape {
                width: 2rem;
                height: 2rem;
                display: block;
                line-height: 2rem;

                border-radius: 4px;
                color: #fff;
                text-align: center;
              }
              .red {
                background: red;
              }
              .green {
                background: green;
              }
            }
            .kaijiang {
              color: #eb3349;
              width: auto;
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
}
</style>
