<template>
  <div class="lhc">
    <!-- 头部 -->
    <div class="heads">
      <div class="heads_top">
        <div class="qishu">
          <span>第
            <i>{{nextQishu && ((nextQishu * 1 - 1) +'').padStart(4,'0') || ''}}</i>期
          </span>
          <ul>
            <li>{{balls.length ? returnShengXiao(balls[6], nextQs-1) : '-'}}</li>
            <li>{{balls.length ? returnJiaYe(returnShengXiao(balls[6], nextQs-1)) : '-'}}</li>
            <li>{{balls.length ? returnDaXiao(balls[6]) : '-'}}</li>
            <li>{{balls.length ? returnDanShuang(balls[6]) : '-'}}</li>
            <li>{{balls.length ? returnColor(balls[6]) : '-'}}</li>
          </ul>
          <div>
            <!-- <span>{{balls.length > 1 ? returnRules(balls) : '无'}}</span> -->
            <span>{{balls.length > 1 ? `合${returnHeZhi(balls[6])}` : '-'}}</span>
          </div>
        </div>
        <div class="balls">
          <div>
            <div>
              <ul v-if="show_balls.length > 1">
                <li v-for="(item,index) in show_balls"
                    :key="index"
                    v-ball>{{item}}</li>
              </ul>
              <ul v-else>
                <li v-for="(item,index) in randomBalls"
                    :key="index"
                    v-ball>{{item}}</li>
              </ul>
            </div>
            <div>
              <ul v-if="show_balls.length > 1">
                <li v-for="(item,index) in show_balls"
                    :key="index"
                    v-ball>{{item==='+'?' ':returnShengXiao(item, nextQs-1)}}</li>
              </ul>
              <ul v-else>
                <li v-for="(item,index) in randomBalls"
                    :key="index"
                    v-ball>{{item==='+'?' ':returnShengXiao(item, nextQs-1)}}</li>
              </ul>
            </div>
          </div>
          <!-- <p v-show="show_balls.length == 1">正在开奖</p> -->
          <span @click="openHistory">
            <i>历史开奖</i>
            <i class="icon"
               :class="{'slidedown':this.isOpen}"></i>
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
                  <span>家野</span>
                  <span>大小</span>
                  <span>单双</span>
                  <span>色波</span>
                </li>
                <li v-for="(item,index) in kjBalls"
                    :key="index">
                  <span>{{(item.qishu + '').slice(-4)}}</span>

                  <span class="kaijiang"
                        v-if="item.balls.length > 1">
                    <div>
                      <i v-color>{{item.balls[0]}}</i>,
                      <i v-color>{{item.balls[1]}}</i>,
                      <i v-color>{{item.balls[2]}}</i>,
                      <i v-color>{{item.balls[3]}}</i>,
                      <i v-color>{{item.balls[4]}}</i>,
                      <i v-color>{{item.balls[5]}}</i>
                      <i v-color>+</i>
                      <i v-color>{{item.balls[6]}}</i>
                    </div>
                    <div style="letter-spacing:0.222em">
                      <i>{{item.balls?returnShengXiao(item.balls[0], item.qishu):'-'}}</i>
                      <i>{{item.balls?returnShengXiao(item.balls[1], item.qishu):'-'}}</i>
                      <i>{{item.balls?returnShengXiao(item.balls[2], item.qishu):'-'}}</i>
                      <i>{{item.balls?returnShengXiao(item.balls[3], item.qishu):'-'}}</i>
                      <i>{{item.balls?returnShengXiao(item.balls[4], item.qishu):'-'}}</i>
                      <i>{{item.balls?returnShengXiao(item.balls[5], item.qishu):'-'}}</i>&nbsp;
                      <i>{{item.balls?returnShengXiao(item.balls[6], item.qishu):'-'}}</i>
                    </div>
                  </span>
                  <span v-else>
                    正在开奖
                  </span>
                  <!-- <span>{{item.balls?returnShengXiao(item.balls[6]):'-'}}</span> -->
                  <span>{{item.balls?returnJiaYe(returnShengXiao(item.balls[6], item.qishu)):'-'}}</span>
                  <span>{{item.balls?returnDaXiao(item.balls[6]):'-'}}</span>
                  <span>{{item.balls?returnDanShuang(item.balls[6]):'-'}}</span>
                  <span>{{balls.length ? returnColor(item.balls[6]) : '-'}}</span>
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
import { selectBalls } from "~/js/lhc.template";
import countDownMixin from "../../countDownMixin";
const redArr = [
    "01",
    "02",
    "07",
    "08",
    "12",
    "13",
    "18",
    "19",
    "23",
    "24",
    "29",
    "30",
    "34",
    "35",
    "40",
    "45",
    "46"
  ],
  blueArr = [
    "03",
    "04",
    "09",
    "10",
    "14",
    "15",
    "20",
    "25",
    "26",
    "31",
    "36",
    "37",
    "41",
    "42",
    "47",
    "48"
  ],
  greenArr = [
    "05",
    "06",
    "11",
    "16",
    "17",
    "21",
    "22",
    "27",
    "28",
    "32",
    "33",
    "38",
    "39",
    "43",
    "44",
    "49"
  ];
export default {
  directives: {
    color: el => {
      if (redArr.includes(el.innerHTML)) {
        el.style.color = "#eb3349";
      } else if (blueArr.includes(el.innerHTML)) {
        el.style.color = "#00a0eb";
      } else if (greenArr.includes(el.innerHTML)) {
        el.style.color = "#30b16c";
      }
    },
    ball: el => {
      if (redArr.includes(el.innerHTML)) {
        el.style.backgroundColor = "#eb3349";
      } else if (blueArr.includes(el.innerHTML)) {
        el.style.backgroundColor = "#00a0eb";
      } else if (greenArr.includes(el.innerHTML)) {
        el.style.backgroundColor = "#30b16c";
      } else {
        el.style.color = "#535353";
      }
    }
  },
  data() {
    return {
      routeLists: {},
      balls: [],
      show_balls: [],
      kjBalls: [],
      nexts: {},
      closeIsShow: true,
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
    resetRouteParams(this, "lhc");
    const name_tag =
      this.$route.params.name_tag || this.$store.state.betting.name_tag;
    if (name_tag) {
      this.getOpened(name_tag);
      this.getHistory(name_tag);
    }
    // name_tag &&
    //   (await this.getOpened(name_tag)) &&
    //   (await this.getHistory(name_tag))
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
        newVal.js_tag === "lhc" &&
        (oldVal && oldVal.js_tag == newVal.js_tag)
      ) {
        this.routeLists = newVal;
        this.setBetCurent(newVal);
        resetRouteParams(this, "lhc");
        this.getHistory(newVal.name_tag);
        this.getOpened(newVal.name_tag);
        this.setBetData({});
        this.clearCart();
      }
    },
    balls: "setBalls"
  },
  methods: {
    setBalls(val) {
      if (val.length === 7) {
        this.show_balls = [...val];
        this.show_balls.splice(6, 0, "+");
      } else {
        this.show_balls = [];
      }
    },
    transmit() {
      const bettingItem = this.$children.find(x =>
        x.$vnode.tag.includes("lhc_betting")
      );
      bettingItem && bettingItem.clearBalls && bettingItem.clearBalls();
      this.bus.$emit("clearBalls");
    },
    greet(val) {
      this.val = val;
    },
    returnHeZhi(val) {
      if (!val) {
        return "-";
      }
      const a = val.split("");
      let b;
      (a[0] * 1 + a[1] * 1) % 2 == 0 ? (b = "双") : (b = "单");
      return b;
    },
    returnDaXiao(val) {
      if (!val) {
        return "-";
      }
      let a;
      val > 24 ? (a = "大") : (a = "小");
      return a;
    },
    returnDanShuang(val) {
      if (!val) {
        return "-";
      }
      let b;
      val % 2 == 0 ? (b = "双") : (b = "单");
      return b;
    },
    returnColor(val) {
      if (redArr.includes(val)) {
        return "红";
      } else if (blueArr.includes(val)) {
        return "蓝";
      } else if (greenArr.includes(val)) {
        return "绿";
      } else {
        return "-";
      }
    },
    returnShengXiao(val, qishu) {
      let yearid = this.$route.params.yearid;
      if (yearid == 0) {
        yearid = qishu > 2019014 ? yearid : 11;
      } else {
        yearid = qishu > 2019014 ? yearid : yearid - 1;
      }
      const shengxiao = selectBalls(yearid).shengxiao;
      for (const i in shengxiao) {
        if (shengxiao[i].balls.includes(val)) {
          return shengxiao[i].name;
        }
      }
      return "-";
    },
    returnJiaYe(val) {
      const a = ["羊", "马", "牛", "猪", "狗", "鸡"],
        b = ["猴", "蛇", "龙", "兔", "虎", "鼠"];
      if (a.includes(val)) {
        return "家";
      } else if (b.includes(val)) {
        return "野";
      } else {
        return "-";
      }
    },
    returnRules(val) {
      const arr = val.slice(0, 3);
      const sortArr = arr.sort();
      const newArr = new Set(sortArr);
      if (newArr.size == 3) {
        const abc =
          Number(sortArr[0]) + 1 == sortArr[1] &&
          Number(sortArr[1] + 1 == sortArr[2]);
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
    ...mapActions(["setBetCurent", "setQishu", "setBetData", "clearCart"])
  },
  mixins: [countDownMixin]
};
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.lhc {
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
        height: poTorem(70px);
        ul {
          @include between;
          li {
            text-align: center;
            font-size: poTorem(16px);
            color: #fff;
            width: poTorem(30px);
            height: poTorem(30px);
            line-height: poTorem(30px);
            border-radius: 50%;
            margin-right: 3px;
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
      top: poTorem(116px);
      background: #eeeeee;
      width: 100%;
      z-index: 1;
      left: 0px;
      > div {
        // @include between;
        width: 100%;
        // div{
        //   width: 100%;
        // }
      }
      // 开奖历史
      .history {
        display: block;
        z-index: 11;
        left: poTorem(-10px);
        // width: poTorem(414px);
        > ul {
          @include column;
          > li {
            padding: 0 poTorem(10px);
            width: 100%;
            > div {
              width: 100%;
              @include between;
            }
            .qishu {
              height: poTorem(45px);
              span {
                font-size: poTorem(14px);
                color: #535353;
                i {
                  color: #eb3349;
                  padding: 0 poTorem(3px);
                }
              }
              div {
                span {
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
                  width: poTorem(30px);
                  text-align: center;
                  font-size: poTorem(14px);
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
                  border-radius: 50%;
                }
              }
              p {
                color: #eb3349;
                font-size: poTorem(18px);
                text-indent: 2rem;
              }
              span {
                @include between;
                width: poTorem(80px);
                i {
                  font-size: poTorem(14px);
                  color: #535353;
                }
                .icon {
                  background: url(~img/goucai/arrow.png);
                  height: poTorem(16px);
                  width: poTorem(16px);
                  background-size: contain;
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
              // @include between;
              width: 100%;
            }
          }
        }
      }
      // 开奖历史
      .history {
        display: block;
        z-index: 11;
        left: poTorem(-10px);
        max-height: poTorem(300px);
        overflow: auto;
        // width: poTorem(414px);
        > ul {
          @include column;
          > li {
            padding: 0.3rem poTorem(10px);
            width: 100%;
            min-height: poTorem(30px);
            @include between;
            span {
              @include center;
              flex-direction: column;
              font-size: poTorem(14px);
              min-width: poTorem(30px);
              color: #535353;
              &:first-child {
                width: poTorem(50px);
              }
              &:nth-child(2) {
                width: poTorem(180px);
              }
            }
            .kaijiang {
              // color: #eb3349;
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
        background-color: #eee;
        font-size: poTorem(14px);
        color: #535353;
        height: poTorem(30px);
        padding: 2px poTorem(10px);
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
