<template>
  <div class="ladder-history">
    <!-- 头部 -->
    <div class="heads">
      <div class="heads_top">
        <div class="qishu">
          <span>第
            <i>{{nextQishu && ((nextQishu * 1 - 1) +'').padStart(4,'0') || ''}}</i>期
          </span>
          <ul>
            <li> {{balls.length && (balls[0] === '0' ? '左' : '右') || '开' }} </li>
            <li> {{balls.length && (balls[1] === '0' ? '3' : '4') || '奖'}} </li>
            <li> {{balls.length && (balls[2] === '0' ? '单' : '双') || '中'}} </li>
          </ul>
          <div class="balls">
            <!-- <p v-show="this.balls.length == 1">正在开奖</p> -->
            <div @click="openHistory">
              <i>历史开奖</i>
              <i class="icon"
                 :class="{'slidedown' : isOpen}"></i>
            </div>
          </div>
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
                </li>
                <li v-for="(item, index) in kjBalls"
                    v-if="index <= 7"
                    :key="index">
                  <span>{{item.qishu.toString().slice(-4)}}</span>
                  <span class="kaijiang"
                        v-if="item.balls.length > 1">
                    <i class="ball-left">{{item.balls[0] === '0' ? '左' : '右'}}</i>
                    <i class="ball-3">{{item.balls[1] === '0' ? '3' : '4'}}</i>
                    <i :class="item.balls[2] === '0' ? 'ball-odd' : 'ball-even'">{{item.balls[2] === '0' ? '单' : '双'}}</i>
                  </span>
                  <span v-else>正在开奖</span>
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

  </div>
</template>

<script>
import { mapActions } from "vuex";
import { resetRouteParams } from "~/js/util";
import countDownMixin from "../../countDownMixin";
export default {
  name: "ladder_history",
  data() {
    return {
      nexts: {},
      balls: [],
      kjBalls: [],
      closeIsShow: false,
      isOpen: false
    };
  },
  components: {},
  computed: {
    // ...mapState({
    //   cart: state => state.betting.cart,
    //   cartNumber: state => state.betting.cartNumber
    // })
  },
  async activated() {
    this.routeLists = this.$route.params;
    resetRouteParams(this, "tzyx");
    const name_tag =
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
        newVal.js_tag === "tzyx" &&
        (oldVal && oldVal.js_tag == newVal.js_tag)
      ) {
        clearInterval(this.$refs.openless.timer);
        clearInterval(this.resTimer);

        this.routeLists = newVal;
        this.setBetCurent(newVal);
        resetRouteParams(this, "tzyx");
        this.getOpened(newVal.name_tag);
        this.getHistory(newVal.name_tag);
        this.setBetData({});
        this.clearCart();
      }
    },
    balls(balls) {
      if (balls.length) {
        this.$emit("ladder", balls, this.openless_leftTime);
      }
    }
  },
  methods: {
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
@import "~css/resources.scss";
.ladder-history {
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
    padding: 0 poTorem(10px) poTorem(24px);
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
            width: 2rem;
            text-align: center;
            font-size: poTorem(16px);
            background: #fff;
            border: poTorem(1px) solid #ddd;
            color: #535353;
            margin: 0 poTorem(3px);
            line-height: 1.5rem;
            height: 1.5rem;
          }
        }
      }
      .balls {
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
        > div {
          i {
            font-size: 1rem;
            color: #535353;
          }
          .icon {
            display: inline-block;
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
      top: poTorem(45px);
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
          > li:nth-child(even) {
            background: #eeeeee;
          }
          > li {
            padding: 0 poTorem(10px);
            width: 100%;
            line-height: 2.5rem;
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
            .kaijiang {
              i {
                width: 1.6rem;
                height: 1.6rem;
                margin-right: 0.625rem;
                // border: 1px solid #dddddd;
                border-radius: 50%;
                text-align: center;
                line-height: 1.6rem;
                color: #ffffff;
              }
              .ball-left {
                color: #676363;
                background: #dcdcdc;
              }
              .ball-3 {
                background: #626262;
              }
              .ball-odd {
                background: #1aa1e7;
              }
              .ball-even {
                background: #e33b3f;
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
        .haoma {
          // @include between;
          span {
            display: inline-block;
            width: 5.4rem;
            height: poTorem(25px);
            // background: url(~img/goucai/timestamp.png) no-repeat;
            // background-size: 5.4rem poTorem(25px);
            // color: #fff;
            line-height: poTorem(25px);
            text-align: center;
            letter-spacing: poTorem(2px);
            // text-indent: poTorem(3px);
          }
          i {
            margin: 0 poTorem(2px);
          }
        }
      }
    }
  }
}
</style>
<style>
.ladder-history .yd-accordion-head {
  display: none;
}
</style>
