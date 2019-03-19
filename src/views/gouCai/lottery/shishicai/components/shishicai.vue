<template>
  <div class="shishicai">
    <!-- 头部 -->
    <div class="heads">
      <div class="heads_top">
        <div class="qishu">
          <span>第
            <i>{{nextQishu && ((nextQishu * 1 - 1) +'').padStart(4,'0') || ''}}</i>期
          </span>
          <ul>
            <li>{{balls.length > 1 ? returnState(balls[0]) : '-'}}</li>
            <li>{{balls.length > 1 ? returnState(balls[1]) : '-'}}</li>
            <li>{{balls.length > 1 ? returnState(balls[2]) : '-'}}</li>
            <li>{{balls.length > 1 ? returnState(balls[3]) : '-'}}</li>
            <li>{{balls.length > 1 ? returnState(balls[4]) : '-'}}</li>
          </ul>
          <div>
            <span>{{balls.length > 1 ? returnRules(balls) : '-'}}</span>
            <span v-if="balls.length">和{{sumNum}}</span>
          </div>
        </div>
        <div class="balls">
          <ul v-if="balls.length>1">
            <li v-for="(item,index) in balls"
                :key="index">{{item}}</li>
          </ul>
          <ul v-else>
            <li v-for="(item,index) in randomBalls"
                :key="index">{{item}}</li>
          </ul>
          <span @click="openHistory">
            <i>历史开奖</i>
            <i class="icon"
               :class="{'slidedown':isOpen}"></i>
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
                  <span>万位</span>
                  <span>千位</span>
                  <span>百位</span>
                  <span>十位</span>
                  <span>个位</span>
                  <span>后三</span>
                </li>
                <li v-for="(item, index) in kjBalls"
                    v-if="index <= 7"
                    :key="index">
                  <span>{{(item.qishu + '').slice(-4)}}</span>
                  <span class="kaijiang">{{item.balls ? item.balls.join(',') : '正在开奖'}}</span>
                  <span>{{item.balls.length?returnState(item.balls[0]) : '-'}}</span>
                  <span>{{item.balls.length?returnState(item.balls[1]) : '-'}}</span>
                  <span>{{item.balls.length?returnState(item.balls[2]) : '-'}}</span>
                  <span>{{item.balls.length?returnState(item.balls[3]) : '-'}}</span>
                  <span>{{item.balls.length?returnState(item.balls[4]) : '-'}}</span>
                  <span>{{item.balls.length?returnRules(item.balls) : '-'}}</span>
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
import betting from "../components/betting";
import { resetRouteParams } from "~/js/util";
import shop from "../../shop";
import { mapActions, mapState } from "vuex";
import countDownMixin from "../../countDownMixin";
export default {
  data() {
    return {
      routeLists: {},
      balls: [],
      kjBalls: [],
      nexts: {},
      closeIsShow: true,
      openIsShow: false,
      show2: false,
      isOpen: false,
      val: ""
    };
  },
  components: {
    betting,
    shop
  },
  computed: {
    sumNum() {
      return (
        Number(this.balls[0]) + Number(this.balls[1]) + Number(this.balls[2])
      );
    },
    ...mapState({
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber
    })
  },
  async activated() {
    this.routeLists = this.$route.params;
    resetRouteParams(this, "ssc");
    const name_tag =
      this.$route.params.name_tag || this.$store.state.betting.name_tag;
    if (name_tag) {
      this.getOpened(name_tag);
      this.getHistory(name_tag);
    }
    // name_tag &&
    //   (await this.getOpened(name_tag)) &&
    //   (await this.getHistory(name_tag))
    // 生成随机球开始滚动
    this.randomBallTimer = setInterval(() => {
      this.ballFromBet();
    }, 500);
  },
  deactivated() {
    window.ondevicemotion = null;
    // clearInterval(this.$refs.stopless.timer);
    clearInterval(this.$refs.openless.timer);
    clearInterval(this.resTimer);
    clearInterval(this.randomBallTimer);
  },
  watch: {
    "$route.params"(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === "ssc" &&
        (oldVal && oldVal.js_tag == newVal.js_tag)
      ) {
        this.routeLists = newVal;
        resetRouteParams(this, "ssc");
        this.getHistory(newVal.name_tag);
        this.getOpened(newVal.name_tag);
        this.setBetCurent(newVal);
        this.setBetData({});
        this.clearCart();
      }
    }
  },
  methods: {
    clickCart() {
      if (this.cart.length) {
        this.$router.push("/shopCart");
      } else {
        this.$dialog.toast({ mes: "您的购物车空空如也" });
      }
    },
    transmit() {
      const bettingItem = this.$children.find(x =>
        x.$vnode.tag.includes("ssc_betting")
      );
      bettingItem && bettingItem.clearBalls && bettingItem.clearBalls();
      this.bus.$emit("clearBalls");
    },
    greet(val) {
      this.val = val;
    },
    returnState(val) {
      let a, b;
      val > 4 ? (a = "大") : (a = "小");
      val % 2 == 0 ? (b = "双") : (b = "单");
      return a + b;
    },
    returnRules(val) {
      const arr = val.slice(2);
      const sortArr = arr.sort();
      const newArr = new Set(sortArr);
      if (newArr.size == 3) {
        const abc =
          Number(sortArr[0]) + 1 == sortArr[1] &&
          Number(sortArr[1]) + 1 == sortArr[2];
        const isExist1 =
          sortArr.includes("8") &&
          sortArr.includes("9") &&
          sortArr.includes("0");
        const isExist2 =
          sortArr.includes("1") &&
          sortArr.includes("9") &&
          sortArr.includes("0");
        if (abc || isExist1 || isExist2) {
          return "顺子";
        } else {
          return "组六";
        }
      } else if (newArr.size == 2) {
        return "组三";
      } else if (newArr.size == 1) {
        return "豹子";
      }
    },
    openHistory() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$refs.accordion.openItem();
      } else {
        this.$refs.accordion.closeItem();
      }
    },
    ...mapActions(["setBetCurent", "setBetData", "clearCart"])
  },
  mixins: [countDownMixin]
};
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.shishicai {
  height: calc(100vh - 3rem);
  width: 100%;
  background: #fff;
  // position: absolute;
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
            // padding: poTorem(1px);
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
            padding: 0 poTorem(10px);
            width: 100%;
            height: poTorem(30px);
            @include between;
            span {
              @include center;
              font-size: poTorem(14px);
              min-width: poTorem(40px);
              color: #535353;
              &:nth-child(2) {
                flex: 1;
              }
              &:last-child {
                width: poTorem(60px);
              }
            }
            .kaijiang {
              color: #eb3349;
              width: auto;
            }
            &:nth-child(odd) {
              background: #fff;
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
        font-size: poTorem(14px);
        color: #535353;
        height: poTorem(30px);
        padding: 0 poTorem(10px);
        border-bottom: poTorem(1px) solid #e9e9ea;
        background-color: #eee;
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
      width: poTorem(24px);
      height: poTorem(24px);
      background: #e03a3a;
      display: flex;
      border-radius: 50%;
      font-weight: bolder;
      color: #fff;
      right: 0;
      top: 0;
    }
  }
}
</style>
