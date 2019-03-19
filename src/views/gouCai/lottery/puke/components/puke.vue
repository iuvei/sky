<template>
  <div class="puke">
    <!-- 头部 -->
    <div class="heads">
      <div class="heads_top">
        <div class="qishu">
          <span>第
            <i>{{nextQishu && ((nextQishu * 1 - 1) +'').padStart(4,'0') || ''}}</i>期
          </span>
          <div class="kaijiang_balls">
            <span>{{balls | calcPattern}}</span>
          </div>
        </div>
        <div class="balls">
          <ul v-if="balls.length > 1">
            <li v-for="(item,index) in balls"
                :key="index">
              <span class="card">
                <img :src="require('../../../../../img/puke/card/' + calchs(item) + '_' + calcdx(item) + '.png')"
                     alt="">
              </span>
            </li>
          </ul>
          <ul v-else>
            <li v-for="(item,index) in randomBalls"
                :key="index">
              <span class="card">
                <img :src="require('../../../../../img/puke/card/' + calchs(item) + '_' + calcdx(item) + '.png')"
                     alt="">
              </span>
            </li>
          </ul>
          <!-- <p v-show="balls.length == 0">正在开奖</p> -->
          <span @click="openHistory">
            <i>历史开奖</i>
            <i class="icon"
               :class="{'slidedown' : isOpen}"></i>
          </span>
        </div>
      </div>
      <div class="heads_bottom">
        <!-- 历史开奖 -->
        <yd-accordion>
          <yd-accordion-item ref="accordion"
                             :auto="false">
            <div class="history">
              <ul>
                <li class="title">
                  <span>期号</span>
                  <span>开奖号码</span>
                  <span>形态</span>
                </li>
                <li v-for="(item, index) in kjBalls"
                    v-if="index <= 7"
                    :key="index">
                  <span>{{item.qishu.toString().slice(-4)}}</span>
                  <span v-if="Array.isArray(item.balls)&&item.balls.length"
                        class="kaijiang">
                    <span v-for="(num,dex) in item.balls"
                          :key="dex">
                      <img :src="require('../../../../../img/puke/card/'+ calchs(num) + '_' + calcdx(num) + '.png')"
                           alt="">
                    </span>
                  </span>
                  <span v-else
                        class="kaijiang">{{'正在开奖'}}</span>
                  <span>{{(item.balls) | calcPattern}}</span>
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
            <app-count-down ref="openless"
                            v-model="openless_leftTime"
                            :time="openless"
                            timetype="second"
                            done-text="正在开奖"
                            format="{%h}:{%m}:{%s}"
                            :callback="_openCallback"></app-count-down>
          </div>
          <div class="haoma"
               v-html="renderStr"
               @click="userBalanceClick"></div>
        </div>
      </div>
    </div>
    <!-- 投注部分 -->
    <betting :routeList="routeLists"
             ref='chooseBall'></betting>
    <!-- 购物车 -->
    <shop :quotation="closeIsShow"
          ref='touzhuBtn'
          @clearAll='transmit'></shop>
  </div>
</template>
<script>
import { resetRouteParams } from "~/js/util";
import betting from "../components/betting";
import shop from "../../shop";
import { mapActions, mapState } from "vuex";
import countDownMixin from "../../countDownMixin";

export default {
  data() {
    return {
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
    // 求和
    sum(arr) {
      if (typeof arr === "string" && arr.includes("+")) {
        arr = arr.split("+");
      }
      let sum = 0;
      sum =
        arr && arr.length && Number(arr[0]) + Number(arr[1]) + Number(arr[2]);
      // console.log("sum" + sum);
      return isNaN(sum) ? "-" : sum === 0 ? "-" : sum;
    },
    // 跨度
    spanning(arr) {
      if (typeof arr === "string" && arr.includes("+")) {
        arr = arr.split("+");
      }
      if (arr && arr.length) {
        const max = Math.max(...arr),
          min = Math.min(...arr);
        return max - min;
      }
    },
    // 计算形态
    calcPattern(ballsArr) {
      let ballStatus = ""; // 开奖后的状态
      const dxArr = []; // 扑克解析大小数组
      const hsArr = []; // 解析后花色数组
      // 扑克状态:  同花顺->豹子->同花->顺子->对子->单张

      if (Array.isArray(ballsArr) && ballsArr.length == 3) {
        for (let i = 0; i < ballsArr.length; i++) {
          const balls = parseInt(ballsArr[i], 10);
          const dx = parseInt(balls / 4 + 1);
          const color = balls % 4;
          dxArr.push(dx);
          hsArr.push(color);
        }
        dxArr.sort((a, b) => a - b);
        hsArr.sort((a, b) => a - b);
        // 同花顺
        if (
          ((dxArr[0] * 1 == 1 && dxArr[1] * 1 == 12 && dxArr[2] * 1 == 13) ||
            (dxArr[0] + 1 == dxArr[1] && dxArr[1] + 1 == dxArr[2])) &&
          (hsArr[0] == hsArr[1] && hsArr[0] == hsArr[2])
        ) {
          ballStatus = "同花顺";
          return ballStatus;
        } else if (dxArr[0] == dxArr[1] && dxArr[0] == dxArr[2]) {
          // 豹子
          ballStatus = "豹子";
          return ballStatus;
        } else if (hsArr[0] == hsArr[1] && hsArr[0] == hsArr[2]) {
          // 同花
          ballStatus = "同花";
          return ballStatus;
        } else if (
          // QKA顺子或普通顺子
          (dxArr[0] * 1 == 1 && dxArr[1] * 1 == 12 && dxArr[2] * 1 == 13) ||
          (dxArr[0] + 1 == dxArr[1] && dxArr[1] + 1 == dxArr[2])
        ) {
          ballStatus = "顺子";
          return ballStatus;
        } else if (
          dxArr[0] == dxArr[1] ||
          dxArr[1] == dxArr[2] ||
          dxArr[0] == dxArr[2]
        ) {
          // 对子
          ballStatus = "对子";
        } else {
          ballStatus = "单张";
        }

        return ballStatus;
      } else {
        return "-";
      }
    }
  },
  async activated() {
    this.routeLists = this.$route.params;
    resetRouteParams(this, "xypk");
    const name_tag =
      this.$route.params.name_tag || this.$store.state.betting.name_tag;
    if (name_tag) {
      await this.getOpened(name_tag);
      await this.getHistory(name_tag);
    }
    // name_tag &&
    //   () &&
    //   ()
    clearInterval(this.resTimer);
    this.randomBallTimer = setInterval(() => {
      this.ballFromBet();
    }, 500);
  },
  deactivated() {
    // clearInterval(this.$refs.stopless.timer)
    clearInterval(this.$refs.openless.timer);
    clearInterval(this.resTimer);
    clearInterval(this.randomBallTimer);
  },
  watch: {
    "$route.params"(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === "xypk" &&
        (oldVal && oldVal.js_tag == newVal.js_tag)
      ) {
        // clearInterval(this.$refs.stopless.timer)
        clearInterval(this.$refs.openless.timer);
        clearInterval(this.resTimer);

        this.routeLists = newVal;
        this.setBetCurent(newVal);
        resetRouteParams(this, "xypk");
        this.getOpened(newVal.name_tag);
        this.getHistory(newVal.name_tag);
        this.setBetData({});
        this.clearCart();
      }
    }
  },
  methods: {
    // 计算花色
    calchs(ball) {
      const color = ball % 4;
      let hs = "";
      if (color == 0) {
        hs = "spade";
      } else if (color == 1) {
        hs = "heart";
      } else if (color == 2) {
        hs = "plum";
      } else if (color == 3) {
        hs = "block";
      } else {
        hs = "-";
      }
      return hs;
    },
    // 计算牌的数字
    calcdx(ball) {
      const balls = parseInt(ball, 10);
      const dx = parseInt(balls / 4 + 1);
      if (dx == 11) return "J";
      if (dx == 12) return "Q";
      if (dx == 13) return "K";
      if (dx == 1) return "A";
      return dx;
    },
    transmit() {
      const bettingItem = this.$children.find(x =>
        x.$vnode.tag.includes("fc3d_betting")
      );
      bettingItem && bettingItem.clearBalls && bettingItem.clearBalls();
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
      const now = new Date();
      const period = Math.ceil((s * 1000 - now.getTime()) / 1000);
      return period;
    },
    ...mapActions(["setBetCurent", "setQishu", "setBetData", "clearCart"])
  },
  mixins: [countDownMixin]
};
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.puke {
  width: 100%;
  height: calc(100vh - 3rem);
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
            font-size: poTorem(15px);
            padding: poTorem(2px);
            min-width: 1.5rem;
            border: poTorem(1px) solid #ddd;
            background: #fff;
            color: #535353;
            margin-left: poTorem(5px);
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
            padding: poTorem(1px);
          }
        }
      }
      .balls {
        height: poTorem(38px);
        ul {
          margin-bottom: poTorem(10px);
        }
        .card {
          img {
            // width: poTorem(28px);
            height: poTorem(35px);
          }
        }
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
            padding: 0 poTorem(10px);
            width: 100%;
            height: poTorem(35px);
            @include between;
            span {
              @include center;
              font-size: poTorem(14px);
              width: poTorem(90px);
              color: #535353;
              &:nth-child(2) {
                width: poTorem(150px);
              }
            }
            .kaijiang {
              span {
                color: #eb3349;
                width: auto;
              }
              color: #eb3349;
              width: auto;
              span {
                display: inline-block;
                height: 1.8rem;
                width: 1.6rem;
                line-height: 1.8rem;
                img {
                  display: inline-block;
                  height: 1.8rem;
                  // width: 1.4rem;
                }
              }
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
