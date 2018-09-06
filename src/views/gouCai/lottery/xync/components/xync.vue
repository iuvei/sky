<template>
  <div class="xync-content">
    <!-- 头部 -->
    <div class="heads">
      <div class="heads_top">
        <div class="qishu">
          <span>第
            <i>{{nextQishu && ((nextQishu * 1 - 1) +'').padStart(4,'0') || ''}}</i>期
          </span>
          <ul class="kaijiang_balls">
            <li>{{balls | sum}}</li>
            <li>{{balls | total_size}}</li>
            <li>{{balls | singleDouble}}</li>
          </ul>
          <div class="kaijiang_balls">
            <span>{{balls | wei_size}}</span>
            <span>{{balls | dragonTriger}}</span>
          </div>
        </div>
        <div class="balls">
          <ul v-if="balls.length > 1">
            <li v-for="(item,index) in balls" :key="index">
              <img class="ball-icon" :src="ball_icons[item-1]" :alt="item">
            </li>
          </ul>
          <ul v-else>
            <li v-for="(item,index) in randomBalls" :key="index">
              <img class="ball-icon" :src="ball_icons[item-1]" :alt="item">
            </li>
          </ul>
          <!-- <p v-show="this.balls.length == 0">正在开奖</p> -->
          <span @click="openHistory">
            <i>历史开奖</i>
            <i class="icon" :class="{'slidedown' : isOpen}"></i>
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
                  <div>期号</div>
                  <div>开奖号码</div>
                  <div>总和</div>
                </li>
                <li v-for="(item, index) in kjBalls" v-if="index <= 7" :key="index">
                  <div>{{item.qishu.toString().slice(-4)}}</div>
                  <div class="kaijiang">
                    <img class="ball-icon" v-for="ball in item.balls" :key="ball" :src="ball_icons[ball-1]" :alt="ball">
                    <span v-if="!item.balls.length">正在开奖</span>
                  </div>
                  <div>
                    <span>{{item.balls | sum}}</span>
                    <span>{{item.balls | total_size}}</span>
                    <span>{{item.balls | singleDouble}}</span>
                    <span>{{item.balls | wei_size}}</span>
                    <span>{{item.balls | dragonTriger}}</span>
                  </div>
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
import { resetRouteParams } from "~/js/util";
import betting from "./betting";
import shop from "../../shop";
import { mapActions, mapState } from "vuex";
import countDownMixin from "../../countDownMixin";
const ball_icons = Array(20).fill('').map((el,id) => require('img/xync_background/lucky_ball_'+(id+1+'').padStart(2,'0')+'.png'))

export default {
  name:'xync-content',
  data() {
    return {
      ball_icons,
      routeLists: {}, // 路由参数
      nexts: Object, // 下次开奖信息
      balls: [], // 当前开奖号码
      kjBalls: [],
      closeIsShow: false, // 封盘状态
      isOpen: false // 历史开奖显示状态
    };
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
    // 总和
    sum(arr) {
      if (typeof arr === "string" && arr.includes("+")) {
        arr = arr.split("+");
      }
      let s = arr && arr.reduce && arr.reduce((x, y) => x * 1 + y * 1, 0);
      if (isNaN(s) || s === 0) return "-";
      return s;
    },
    // 总和大小
    total_size(arr) {
      if (typeof arr === "string" && arr.includes("+")) {
        arr = arr.split("+");
      }
      let s = arr && arr.reduce && arr.reduce((x, y) => x * 1 + y * 1, 0);
      if (isNaN(s) || s === 0) return "-";
      return s > 84 ? "大" : "小";
    },
    // 总和单双
    singleDouble(arr) {
      if (typeof arr === "string" && arr.includes("+")) {
        arr = arr.split("+");
      }
      let s = arr && arr.reduce && arr.reduce((x, y) => x * 1 + y * 1, 0);
      if (isNaN(s) || s === 0) return "-";
      return s % 2 === 0 ? "双" : "单";
    },
    // 总和尾大小
    wei_size(arr) {
      if (typeof arr === "string" && arr.includes("+")) {
        arr = arr.split("+");
      }
      let s = arr && arr.reduce && arr.reduce((x, y) => x * 1 + y * 1, 0);
      if (isNaN(s) || s === 0) return "-";
      s += "";
      return s[s.length - 1] > 4 ? "尾大" : "尾小";
    },
    // 龙虎
    dragonTriger(arr) {
      if (typeof arr === "string" && arr.includes("+")) {
        arr = arr.split("+");
      }
      if (!arr[0] || !arr[7]) return "-";
      return arr[0] - arr[7] > 0 ? "龙" : "虎";
    }
  },
  async activated() {
    this.routeLists = this.$route.params;
    resetRouteParams(this, "xync");
    let name_tag =
      this.$route.params.name_tag || this.$store.state.betting.name_tag;
    if (name_tag) {
      await this.getOpened(name_tag);
      await this.getHistory(name_tag);
    }
    clearInterval(this.resTimer);
    this.randomBallTimer = setInterval(() => {
      this.ballFromBet();
    }, 500);
  },
  deactivated() {
    clearInterval(this.$refs.openless.timer);
    clearInterval(this.resTimer);
    clearInterval(this.randomBallTimer);
  },
  watch: {
    "$route.params"(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === "xync" &&
        (oldVal && oldVal.js_tag == newVal.js_tag)
      ) {
        clearInterval(this.$refs.openless.timer);
        clearInterval(this.resTimer);

        this.routeLists = newVal;
        this.setBetCurent(newVal);
        resetRouteParams(this, "xync");
        this.getOpened(newVal.name_tag);
        this.getHistory(newVal.name_tag);
        this.setBetData({});
        this.clearCart();
      }
    }
  },
  methods: {
    transmit() {
      this.bus.$emit("clearBalls");
      // const bettingItem = this.$children.find(x =>
      //   x.$vnode.tag.includes("xync_betting")
      // );
      // bettingItem && bettingItem.clearBalls && bettingItem.clearBalls();
    },
    openHistory() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$refs.accordion.openItem();
      } else {
        this.$refs.accordion.closeItem();
      }
    },
    formatOpenTime(s) {
      let now = new Date();
      let period = Math.ceil((s * 1000 - now.getTime()) / 1000);
      return period;
    },
    ...mapActions(["setBetCurent", "setQishu", "setBetData", "clearCart"])
  },
  mixins: [countDownMixin]
};
</script>

<style lang="scss" scoped>
@import "~css/resources.scss";
.xync-content {
  width: 100%;
  background: #fff;
  // position: absolute;
  flex: 1;
  display: flex;
  flex-direction: column;
  top: poTorem(48px);
  .ball-icon {
    width: 2rem;
  }
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
            width: 3rem;
            line-height: 1.8rem;
            border: poTorem(1px) solid #ddd;
            background: #fff;
            color: #535353;
            margin-left: poTorem(5px);
          }
        }
        ul {
          @include between;
          li {
            width: 3rem;
            line-height: 1.8rem;
            text-align: center;
            font-size: poTorem(16px);
            background: #fff;
            border: poTorem(1px) solid #ddd;
            color: #535353;
            margin: 0 poTorem(3px);
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
            // background: url(~img/balls.png);
            // width: poTorem(34px);
            // height: poTorem(34px);
            // background-size: contain;
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
            transform: rotate(-180deg) translateZ(0);
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
            padding: 0 0.3rem;
            width: 100%;
            min-height: poTorem(30px);
            @include between;
            div {
              .ball-icon {
                width: 1.5rem;
              }
              @include center;
              font-size: poTorem(14px);
              min-width: poTorem(40px);
              color: #535353;
              &:nth-child(2) {
                flex: 1.5;
              }
              &:nth-child(3) {
                flex: 1;
                span {
                  padding: 0 0.2rem;
                }
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
