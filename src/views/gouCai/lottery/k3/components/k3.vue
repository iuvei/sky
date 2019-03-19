<template>
  <div class="k3">
    <!-- 头部 -->
    <div class="heads">
      <div class="heads_top">
        <div class="qishu">
          <span>第
            <i>{{nextQishu && ((nextQishu * 1 - 1) +'').padStart(4,'0') || ''}}</i>期
          </span>
          <ul>
            <li v-if="balls && balls.length">{{balls | returnDaXiao}}</li>
            <li v-if="balls && balls.length">{{balls | returnDanShuang}}</li>
            <li v-if="!balls.length"> - </li>
            <li v-if="!balls.length"> - </li>
          </ul>
          <div>
            <span>{{balls.length > 1 ? sumNum : '-'}}</span>
          </div>
        </div>
        <div class="balls">
          <ul v-if="this.balls.length > 1">
            <li v-for="(item,index) in balls"
                :key="index">
              <img v-if="item != '0'"
                   :src="require('../../../../../img/saizi_0'+ item +'.png')"
                   alt="">
            </li>
          </ul>
          <ul v-else>
            <li v-for="(item,index) in randomBalls"
                :key="index">
              <img v-if="item != '0'"
                   :src="require('../../../../../img/saizi_0'+ item +'.png')"
                   alt="">
            </li>
          </ul>
          <!-- <p v-show="this.balls.length == 1">正在开奖</p> -->
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
                  <span>和值</span>
                  <span>大小</span>
                  <span>单双</span>
                </li>
                <li v-for="(item, index) in kjBalls"
                    v-if="index <= 7"
                    :key="index">
                  <span>{{item.qishu.toString().slice(-4)}}</span>
                  <span class="kaijiang"
                        v-if="item.balls.length > 1">
                    <img :src="require('../../../../../img/saizi_0'+ item.balls[0] +'.png')"
                         alt="">
                    <img :src="require('../../../../../img/saizi_0'+ item.balls[1] +'.png')"
                         alt="">
                    <img :src="require('../../../../../img/saizi_0'+ item.balls[2] +'.png')"
                         alt="">
                  </span>
                  <!-- <span class="kaijiang" v-else>
                    <img :src="require('../../../../../img/saizi_0'+ randomBalls[0] +'.png')" alt="">
                    <img :src="require('../../../../../img/saizi_0'+ randomBalls[1] +'.png')" alt="">
                    <img :src="require('../../../../../img/saizi_0'+ randomBalls[2] +'.png')" alt="">
                  </span> -->
                  <span v-else>正在开奖</span>
                  <span>{{item.balls | returnHeZhi}}</span>
                  <span v-ks
                        style="color: #555">{{item.balls | returnDaXiao}}</span>
                  <span v-ks
                        style="color: #555">{{item.balls | returnDanShuang}}</span>
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
    <keep-alive>
      <!-- 投注部分 -->
      <betting :routeList="routeLists"
               ref='chooseBall'></betting>

    </keep-alive>
    <keep-alive>
      <!-- 购物车 -->
      <shop :quotation="closeIsShow"
            ref='touzhuBtn'
            @clearAll='transmit'></shop>
    </keep-alive>
  </div>
</template>
<script>
import betting from "../components/betting";
import shop from "../../shop";
import { mapActions, mapState } from "vuex";
import { resetRouteParams } from "~/js/util";
import countDownMixin from "../../countDownMixin";
export default {
  directives: {
    ks: el => {
      if (el.innerHTML == "大" || el.innerHTML == "单") {
        el.style.color = "#fff";
        el.style.background = "#e50014";
      } else if (el.innerHTML == "小" || el.innerHTML == "双") {
        el.style.color = "#fff";
        el.style.background = "#009a44";
      }
    }
  },
  data() {
    return {
      routeLists: {},
      nexts: {},
      balls: [],
      kjBalls: [],
      closeIsShow: false,
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
    resetRouteParams(this, "k3");
    const name_tag =
      this.$route.params.name_tag || this.$store.state.betting.name_tag;
    if (name_tag) {
      this.getOpened(name_tag);
      this.getHistory(name_tag);
    }
    // name_tag &&
    //   (await this.getOpened(name_tag)) &&
    //   (await this.getHistory(name_tag))
    clearInterval(this.resTimer);
    this.randomBallTimer = setInterval(() => {
      this.ballFromBet();
    }, 500);
  },
  deactivated() {
    // clearInterval(this.$refs.stopless.timer);
    clearInterval(this.$refs.openless.timer);
    clearInterval(this.resTimer);
    clearInterval(this.randomBallTimer);
  },
  watch: {
    "$route.params"(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === "k3" &&
        (oldVal && oldVal.js_tag == newVal.js_tag)
      ) {
        // clearInterval(this.$refs.stopless.timer);
        clearInterval(this.$refs.openless.timer);
        clearInterval(this.resTimer);

        this.routeLists = newVal;
        this.setBetCurent(newVal);
        resetRouteParams(this, "k3");
        this.getOpened(newVal.name_tag);
        this.getHistory(newVal.name_tag);
        this.setBetData({});
        this.clearCart();
      }
    }
  },
  filters: {
    returnHeZhi(arr) {
      if (Array.isArray(arr) && arr.length) {
        return arr.reduce((pre, next) => Number(pre) + Number(next));
      } else return "-";
    },
    returnDaXiao(arr) {
      if (Array.isArray(arr) && arr.length) {
        const val = arr.reduce((pre, next) => Number(pre) + Number(next));
        return Number(val) > 10 ? "大" : "小";
      }
      return "-";
    },
    returnDanShuang(arr) {
      if (Array.isArray(arr) && arr.length) {
        const val = arr.reduce((pre, next) => Number(pre) + Number(next));
        return Number(val) % 2 == 0 ? "双" : "单";
      }
      return "-";
    }
  },
  methods: {
    transmit() {
      const bettingItem = this.$children.find(x =>
        x.$vnode.tag.includes("k3_betting")
      );
      bettingItem && bettingItem.clearBalls && bettingItem.clearBalls();
      this.bus.$emit("clearBalls");
    },
    greet(val) {
      this.val = val;
    },
    openHistory() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$refs.accordion.openItem();
      } else {
        this.$refs.accordion.closeItem();
      }
    },
    openTime(s) {
      const now = new Date();
      const period = Math.ceil((s * 1000 - now.getTime()) / 1000);
      return period;
    },
    ...mapActions(["setBetCurent", "setBetData", "clearCart"])
  },
  mixins: [countDownMixin]
};
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.k3 {
  height: calc(100vh - 3rem);
  width: 100%;
  background: #fff;
  flex: 1;
  display: flex;
  flex-direction: column;
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
            width: poTorem(30px);
            padding: poTorem(1px);
            border: poTorem(1px) solid #ddd;
            background: #fff;
            color: #535353;
            margin-right: poTorem(50px);
          }
        }
        ul {
          @include between;
          li {
            width: poTorem(30px);
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
          @include between;
          li {
            text-align: center;
            font-size: poTorem(16px);
            color: #fff;
            width: poTorem(34px);
            height: poTorem(34px);
            line-height: poTorem(34px);
            img {
              width: 100%;
            }
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
            height: poTorem(30px);
            @include between;
            span {
              @include center;
              font-size: poTorem(14px);
              min-width: poTorem(30px);
              color: #535353;
              &:first-child {
                width: poTorem(50px);
              }
              &:nth-child(2) {
                width: poTorem(150px);
              }
            }
            .kaijiang {
              @include around;
              img {
                width: poTorem(25px);
              }
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
