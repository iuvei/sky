<template>
  <div class="betting">
    <div class="times">
      <div class="type">
        <div @click="openSelect">
          <span>{{betMenu.wanfa}}</span>
          <!-- <span>双面盘</span>-<span>号码一</span> -->
          <i class="icon"
             :class="{'slidedown' : select}"></i>
        </div>
        <div class="haoma"
             v-html="renderStr"
             @click="userBalanceClick"></div>
      </div>
      <div class="bottom">
        <div class="jiezhi">
          第
          <i>{{(nextQs + '').slice(-4)}}</i>期{{closeIsShow?'截止时间':'已封盘'}}:
          <app-count-down ref="openless"
                          v-model="openless_leftTime"
                          :time="openless"
                          timetype="second"
                          done-text="正在开奖"
                          format="{%h}:{%m}:{%s}"
                          :callback="callback"></app-count-down>
        </div>
        <span>
          <i @click="openHistory">历史开奖
            <i class="icon"
               :class="{'slidedown' : isOpen}"></i>
          </i>
          <!-- <i
            class="icon"
            :class="{'slidedown' : isOpen}"
          ></i> -->
        </span>
      </div>
    </div>
    <!-- 历史开奖 -->
    <yd-accordion style="z-index:1">
      <yd-accordion-item ref="accordion"
                         :auto="false">
        <div class="history k3"
             v-if="gameItem.js_tag=='k3'">
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
                    v-if="item.balls.length === 3">
                <img :src="require('../../../../img/saizi_0'+ item.balls[0] +'.png')"
                     alt="">
                <img :src="require('../../../../img/saizi_0'+ item.balls[1] +'.png')"
                     alt="">
                <img :src="require('../../../../img/saizi_0'+ item.balls[2] +'.png')"
                     alt="">
              </span>
              <span v-else>正在开奖</span>
              <span>{{item.balls | returnHeZhi}}</span>
              <span v-ks
                    style="color: #555">{{item.balls | returnDaXiao}}</span>
              <span v-ks
                    style="color: #555">{{item.balls | returnDanShuang}}</span>
            </li>
          </ul>
        </div>
        <div class="history ssc"
             v-if="gameItem.js_tag=='ssc'">
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
              <span class="kaijiang">{{(item && item.balls) ? item.balls.join(',') : '正在开奖'}}</span>
              <span>{{item.balls.length?returnState(item.balls[0]) : '-'}}</span>
              <span>{{item.balls.length?returnState(item.balls[1]) : '-'}}</span>
              <span>{{item.balls.length?returnState(item.balls[2]) : '-'}}</span>
              <span>{{item.balls.length?returnState(item.balls[3]) : '-'}}</span>
              <span>{{item.balls.length?returnState(item.balls[4]) : '-'}}</span>
              <span>{{item.balls.length?returnRules(item.balls) : '-'}}</span>
            </li>
          </ul>
        </div>
        <div class="history pk10"
             v-if="gameItem.js_tag=='pk10'">
          <ul>
            <li class="title">
              <span>期号</span>
              <span>开奖号码</span>
              <span>冠亚军和</span>
            </li>
            <li v-for="(item, index) in kjBalls"
                v-if="index <= 7"
                :key="index">
              <span>{{item.qishu.toString().slice(-4)}}</span>
              <span class="kaijiang">{{item.balls ? item.balls.join(',') : '正在开奖'}}</span>
              <span>
                {{gyh(item.balls).join(' &nbsp;')}}
              </span>
            </li>
          </ul>
        </div>
        <div class="history pkniuniu"
             v-if="gameItem.js_tag=='pkniuniu'">
          <ul>
            <li class="title">
              <span>期号</span>
              <span>开奖号码</span>
              <span>庄</span>
              <span>闲一</span>
              <span>闲二</span>
              <span>闲三</span>
              <span>闲四</span>
              <span>闲五</span>
            </li>
            <li v-for="(item,key) in kjBalls"
                :key="key">
              <span>{{item.qishu.toString().slice(-4)}}</span>
              <span class="kaijiang">{{item.balls.length ==10 ? item.balls.join(',') : '正在开奖'}}</span>
              <span>{{item.balls.length ? niuniu(item.balls,0) : '-'}}</span>
              <span>{{item.balls.length ? niuniu(item.balls,1) : '-'}}</span>
              <span>{{item.balls.length ? niuniu(item.balls,2) : '-'}}</span>
              <span>{{item.balls.length ? niuniu(item.balls,3) : '-'}}</span>
              <span>{{item.balls.length ? niuniu(item.balls,4) : '-'}}</span>
              <span>{{item.balls.length ? niuniu(item.balls,5) : '-'}}</span>
            </li>
          </ul>
        </div>
        <div class="history xypk"
             v-if="gameItem.js_tag=='xypk'">
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
                  <img :src="require('~/img/puke/card/'+ calchs(num) + '_' + calcdx(num) + '.png')"
                       alt="">
                </span>
              </span>
              <span v-else
                    class="kaijiang">{{'正在开奖'}}</span>
              <span>{{(item.balls) | calcPattern}}</span>
            </li>
          </ul>
        </div>
        <div class="history tzyx"
             v-if="gameItem.js_tag=='tzyx'">
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
        <div class="history lhc"
             v-if="gameItem.js_tag=='lhc'">
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
                  <i>{{item.balls?returnShengXiao(item.balls[0]):'-'}}</i>
                  <i>{{item.balls?returnShengXiao(item.balls[1]):'-'}}</i>
                  <i>{{item.balls?returnShengXiao(item.balls[2]):'-'}}</i>
                  <i>{{item.balls?returnShengXiao(item.balls[3]):'-'}}</i>
                  <i>{{item.balls?returnShengXiao(item.balls[4]):'-'}}</i>
                  <i>{{item.balls?returnShengXiao(item.balls[5]):'-'}}</i>&nbsp;
                  <i>{{item.balls?returnShengXiao(item.balls[6]):'-'}}</i>
                </div>
              </span>
              <span v-else>
                正在开奖
              </span>
              <span>{{item.balls?returnJiaYe(returnShengXiao(item.balls[6])):'-'}}</span>
              <span>{{item.balls?returnDaXiao(item.balls[6]):'-'}}</span>
              <span>{{item.balls?returnDanShuang(item.balls[6]):'-'}}</span>
              <span>{{balls.length ? returnColor(item.balls[6]) : '-'}}</span>
            </li>
          </ul>
        </div>
        <div class="history d"
             v-if="gameItem.js_tag=='3d'">
          <ul>
            <li class="title">
              <span>期号</span>
              <span>开奖号码</span>
              <span>和值</span>
              <span>跨度</span>
              <span>百位</span>
              <span>十位</span>
              <span>个位</span>
            </li>
            <li v-for="(item, index) in kjBalls"
                v-if="index <= 7"
                :key="index">
              <span>{{item.qishu.toString().slice(-4)}}</span>
              <span class="kaijiang">{{item.balls.length ? item.balls.join(',') : '正在开奖'}}</span>
              <span>{{item.balls | sum}}</span>
              <span>{{item.balls | spanning}}</span>
              <span>{{item.balls[0] | pattern}}</span>
              <span>{{item.balls[1] | pattern}}</span>
              <span>{{item.balls[2] | pattern}}</span>
            </li>
          </ul>
        </div>
        <div class="history xync"
             v-if="gameItem.js_tag=='xync'">
          <ul>
            <li class="title">
              <div>期号</div>
              <div>开奖号码</div>
              <div>总和</div>
            </li>
            <li v-for="(item, index) in kjBalls"
                v-if="index <= 7"
                :key="index">
              <div>{{item.qishu.toString().slice(-4)}}</div>
              <div class="kaijiang">
                <img class="ball-icon"
                     v-for="ball in item.balls"
                     :key="ball"
                     :src="ball_icons[ball-1]"
                     :alt="ball">
                <span v-if="!item.balls.length">正在开奖</span>
              </div>
              <div>
                <span>{{item.balls | sums}}</span>
                <span>{{item.balls | total_size}}</span>
                <span>{{item.balls | singleDouble}}</span>
                <span>{{item.balls | wei_size}}</span>
                <span>{{item.balls | dragonTriger}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="history x5"
             v-if="gameItem.js_tag=='11x5'">
          <ul>
            <li class="title">
              <span>期号</span>
              <span>开奖号码</span>
              <span>跨度</span>
              <span>重号个数</span>
              <span>总和值</span>
            </li>
            <li v-for="(item, index) in kjBalls"
                v-if="index <= 7"
                :key="index">
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
        <div class="history pcdd"
             v-if="gameItem.js_tag=='pcdd'">
          <ul>
            <li class="title">
              <span>期号</span>
              <span>开奖号码</span>
              <span>色波</span>
              <span>大小</span>
              <span>单双</span>
            </li>
            <li v-for="(item, index) in kjBalls"
                v-if="index <= 7"
                :key="index">
              <span>{{item.qishu.toString().slice(-4)}}</span>
              <span class="kaijiang">{{item.balls | openRewards}}</span>
              <span>{{inWave(item.balls[3])}}</span>
              <span>
                <div class="shape"
                     :class="{'red':Number(item.balls[3]) > 13,'green':Number(item.balls[3]) <= 13}">{{item.balls[3] | bigOrSmall}}</div>
              </span>
              <span>
                <div class="shape"
                     :class="{'red':Number(item.balls[3]) % 2 != 0,'green':Number(item.balls[3]) % 2 == 0}">{{item.balls[3] | singleOrDouble}}</div>
              </span>
            </li>
          </ul>
        </div>
        <div class="history qxc"
             v-if="gameItem.js_tag=='qxc'">
          <ul>
            <li class="title">
              <span>期号</span>
              <span>开奖号码</span>
              <span>千位</span>
              <span>百位</span>
              <span>十位</span>
              <span>个位</span>
              <span></span>
              <span>总和</span>
              <span></span>
            </li>
            <li v-for="(item, index) in kjBalls"
                :key="index">
              <span>{{(item.qishu + '').slice(-4)}}</span>
              <span class="kaijiang">{{item.balls ? item.balls.join(',') : '正在开奖'}}</span>
              <span>{{item.balls.length? returnState(item.balls[0]) : '-'}}</span>
              <span>{{item.balls.length? returnState(item.balls[1]) : '-'}}</span>
              <span>{{item.balls.length? returnState(item.balls[2]) : '-'}}</span>
              <span>{{item.balls.length? returnState(item.balls[3]) : '-'}}</span>
              <span>{{item.balls.length? getSum(item.balls) : '-'}}</span>
              <span>{{item.balls.length? state_big_small(getSum(item.balls)) : '-'}}</span>
              <span>{{item.balls.length? state_single_double(getSum(item.balls)) : '-'}}</span>
            </li>
          </ul>
        </div>
      </yd-accordion-item>
    </yd-accordion>
  </div>
</template>
<script>
import countDownMixin from "../../../gouCai/lottery/countDownMixin";
import { selectBalls } from "~/js/lhc.template";
import { mapActions } from "vuex";
const ball_icons = Array(20)
  .fill("")
  .map((el, id) =>
    require("img/xync_background/lucky_ball_" +
      (id + 1 + "").padStart(2, "0") +
      ".png")
  );
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
  name: "chatroom_betting_header",
  directives: {
    ks: el => {
      if (el.innerHTML == "大" || el.innerHTML == "单") {
        el.style.color = "#fff";
        el.style.background = "#e50014";
      } else if (el.innerHTML == "小" || el.innerHTML == "双") {
        el.style.color = "#fff";
        el.style.background = "#009a44";
      }
    },
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
  mixins: [countDownMixin],
  // props: ['gameItem'],
  props: {
    gameItem: {
      type: Object,
      default: {}
    }
  },
  components: {},
  data() {
    return {
      ball_icons,
      bet: true,
      isOpen: false,
      select: false,
      closeIsShow: true,
      kjBalls: [],
      routeLists: {},
      nexts: {},
      repeatArr: [],
      niu: [
        "无牛",
        "牛一",
        "牛二",
        "牛三",
        "牛四",
        "牛五",
        "牛六",
        "牛七",
        "牛八",
        "牛九",
        "牛牛"
      ],
      redWave: [3, 6, 9, 12, 15, 18, 21, 24],
      greenWave: [1, 4, 7, 10, 16, 19, 22, 25],
      buleWave: [2, 5, 8, 11, 17, 20, 23, 26],
      betMenu: {}
    };
  },
  computed: {},
  activated() {
    // clearInterval(this.resTimer);
    // console.error("betting header activated");
    this.getOpened(this.gameItem.tag);
    this.getHistorys(this.gameItem.tag);
  },
  deactivated() {
    clearInterval(this.$refs.openless.timer);
    // clearInterval(this.resTimer);
  },
  mounted() {},
  filters: {
    // 总和
    sums(arr) {
      if (typeof arr === "string" && arr.includes("+")) {
        arr = arr.split("+");
      }
      const s = arr && arr.reduce && arr.reduce((x, y) => x * 1 + y * 1, 0);
      if (isNaN(s) || s === 0) return "-";
      return s;
    },
    // 总和大小
    total_size(arr) {
      if (typeof arr === "string" && arr.includes("+")) {
        arr = arr.split("+");
      }
      const s = arr && arr.reduce && arr.reduce((x, y) => x * 1 + y * 1, 0);
      if (isNaN(s) || s === 0) return "-";
      return s > 84 ? "大" : "小";
    },
    // 总和单双
    singleDouble(arr) {
      if (typeof arr === "string" && arr.includes("+")) {
        arr = arr.split("+");
      }
      const s = arr && arr.reduce && arr.reduce((x, y) => x * 1 + y * 1, 0);
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
    },
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
    },
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
    // 形态
    pattern(num) {
      if (!isNaN(num)) {
        return `${Number(num) < 6 ? "小" : "大"} ${
          Number(num) % 2 == 0 ? "双" : "单"
        }`;
      } else {
        return "-";
      }
    },
    // 大小
    bigOrSmall(num) {
      if (!isNaN(num)) {
        return Number(num) > 13 ? "大" : "小";
      } else {
        return "-";
      }
    },
    // 单双
    singleOrDouble(num) {
      if (!isNaN(num)) {
        return Number(num) % 2 == 0 ? "双" : "单";
      } else {
        return "-";
      }
    },
    openRewards(arr) {
      if (arr && arr.length === 4) {
        return `${arr[0]} + ${arr[1]} + ${arr[2]} = ${Number(arr[3])}`;
      } else {
        // let arr1 = this.randomBalls
        // return `${arr1[0]} + ${arr1[1]} + ${arr1[2]} = ${Number(arr1[3])}`;
        return "正在开奖";
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
          (dxArr[0] * 1 == 1 && dxArr[1] * 1 == 12 && dxArr[2] * 1 == 13) ||
          (dxArr[0] + 1 == dxArr[1] && dxArr[1] + 1 == dxArr[2])
        ) {
          // QKA顺子或普通顺子
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
  created() {
    this.$root.Bus.$on("betMenu", value => {
      this.print(value);
    });
    this.bus.$on("hideSubmenu", () => (this.select = false));
  },
  destroyed() {
    this.bus.$off("hideSubmenu");
  },
  methods: {
    ...mapActions(["setBetCurent", "setBetData", "clearCart"]),
    print(value) {
      this.betMenu = value;
    },
    openHistory() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.$refs.accordion.openItem();
      } else {
        this.$refs.accordion.closeItem();
      }
      this.$emit("openHistory", this.isOpen);
    },
    openSelect() {
      this.select = !this.select;
      this.$emit("toggleSubmenu");
    },
    openTime(s) {
      const now = new Date();
      const period = Math.ceil((s * 1000 - now.getTime()) / 1000);
      return period;
    },
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
    callback() {
      this.getOpened(this.gameItem.tag);
      this.getHistorys(this.gameItem.tag);
    },
    // 总和值
    getSumVal(balls) {
      if (balls && balls.length) {
        const sum = (typeof balls === "string" ? balls.split("+") : balls)
          .map(x => Number(x))
          .reduce((a, b) => a + b);
        const arr = [];
        arr.push(sum > 29 ? "大" : "小");
        arr.push(sum % 2 === 0 ? "双" : "单");
        return arr;
      } else {
        return ["-", "-"];
      }
    },
    // 跨度
    getSpanning(numbers) {
      if (!numbers || !numbers.length) return "-";
      const _arr = typeof numbers === "string" ? numbers.split(" ") : numbers,
        max = Math.max(..._arr),
        min = Math.min(..._arr);

      return max - min;
    },
    // 获取重复个数
    getRepeatTimes(item) {
      if (!this.kjBalls[0].balls || !this.kjBalls[0].balls.length) return "-";
      const index = this.kjBalls.findIndex(x => x.qishu === item.qishu) + 1;
      if (index === this.kjBalls.length) return "-";
      const prev = this.kjBalls[index]; // 前一行
      const _balls_cur = item.balls.length // 当前行球
          ? item.balls
          : [], // .sort((a, b) => a - b)
        _balls_prev = prev.balls; // .sort((a, b) => a - b), //前一行球
      let count = 0;
      for (let i = 0; i < _balls_cur.length; i++) {
        if (_balls_prev.includes(_balls_cur[i])) {
          count += 1;
        }
      }

      return count.toString();
    },
    // 批量获取重复个数
    getBatchRepeatTimes() {
      const arr = [];
      this.kjBalls.forEach(item => {
        arr.push(this.getRepeatTimes(item));
      });
      this.repeatArr = arr;
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
    returnShengXiao(val) {
      const shengxiao = selectBalls(10).shengxiao;
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
    inWave(num) {
      if (!isNaN(num)) {
        const _num = Number(num);
        if (this.redWave.includes(_num)) {
          return "红";
        } else if (this.buleWave.includes(_num)) {
          return "蓝";
        } else if (this.greenWave.includes(_num)) {
          return "绿";
        } else {
          return "无";
        }
      }
    },
    gyh(balls) {
      if (!balls || !balls.length) return ["-", "-", "-"];
      // 冠亚和形态
      const arr = [];
      let _balls = balls;
      if (typeof _balls === "string") {
        _balls = balls.split("+");
      }
      const sum = parseInt(_balls[0]) + parseInt(_balls[1]);
      arr.push(sum);
      let shape = "小";
      if (sum > 2 && sum < 9) {
        shape = "小";
      } else if (sum > 8 && sum < 14) {
        shape = "中";
      } else {
        shape = "大";
      }
      arr.push(shape);
      arr.push(sum === 11 ? "和" : sum % 2 == 0 ? "双" : "单");
      return arr;
    },
    niuniu(data, n) {
      const _data = data.slice(n, n + 5);
      return this.niu[this.result(_data)];
    },
    // 牛牛算法
    result(arr) {
      const _arr = arr;
      for (let i = 0; i < _arr.length - 2; i++) {
        for (let j = i + 1; j < _arr.length - 1; j++) {
          for (let k = j + 1; k < _arr.length; k++) {
            if ((_arr[i] + _arr[j] + _arr[k]) % 10 == 0) {
              _arr.splice(k, 1);
              _arr.splice(j, 1);
              _arr.splice(i, 1);
              for (let n = 0; n < _arr.length; n++) {
                if ((_arr[0] + _arr[1]) % 10 == 0) {
                  return 10;
                } else {
                  return (_arr[0] + _arr[1]) % 10;
                }
              }
            }
          }
        }
      }
      // console.log('没牛')
      return 0;
    },
    // 计算花色
    calchs(ball) {
      // const balls = parseInt(ball, 10);
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
    returnState(val) {
      let a, b;
      val > 4 ? (a = "大") : (a = "小");
      val % 2 == 0 ? (b = "双") : (b = "单");
      return a + b;
    },
    getSum(val) {
      if (val.length) {
        return val[0] * 1 + val[1] * 1 + val[2] * 1 + val[3] * 1;
      }
      return 0;
    },
    state_big_small(val) {
      if (val) return val > 17 ? "大" : "小";
      return "";
    },
    state_single_double(val) {
      if (val) return val % 2 === 0 ? "双" : "单";
      return "";
    },
    // returnState(val) {
    //   let a, b;
    //   val > 4 ? (a = "大") : (a = "小");
    //   val % 2 == 0 ? (b = "双") : (b = "单");
    //   return a + b;
    // },
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
    countDown() {}
  },
  watch: {
    gameItem(newVal, oldVal) {
      if (oldVal && oldVal.tag != newVal.tag) {
        clearInterval(this.$refs.openless.timer);
        this.gameItem = newVal;
        this.getOpened(this.gameItem.tag);
        this.getHistorys(this.gameItem.tag);
        this.select = false;
      }
    },
    kjBalls(val) {
      if (val.length) {
        this.getBatchRepeatTimes();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.betting {
  height: 4rem;
  .times {
    background-color: #e8e8e8;
    font-size: 1rem;
    line-height: 2rem;
    color: #535353;
    padding: 0 poTorem(10px);
    border-bottom: poTorem(1px) solid #e9e9ea;
    .type {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        transform: translateY(20%);
        display: inline-block;
        background: url(~img/chatRoom/sele.png) no-repeat;
        background-size: 100% 100%;
        height: poTorem(18px);
        width: poTorem(18px);
        background-size: contain;
        transition: transform 0.3s ease;
      }
      .icon.slidedown {
        transform: rotate(-180deg) translateZ(0) translateY(-20%);
      }
      .money {
        i {
          color: #e33939;
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .jiezhi {
        font-size: 1rem;
        i {
          margin: 0 poTorem(3px);
        }
        span {
          color: #e33939;
        }
      }
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
        color: #e33939;
        font-size: poTorem(18px);
        text-indent: 2rem;
      }
      > span {
        @include end;
        width: poTorem(86px);
        flex: 1;
        text-align: right;
        i {
          font-size: 1rem;
          color: #535353;
          // width: 100%;
          margin-left: 1rem;
        }
        .icon {
          display: inline-block;
          background: url(~img/goucai/arrow.png);
          height: poTorem(16px);
          width: poTorem(16px);
          background-size: contain;
          transition: transform 0.3s ease;
          margin-left: poTorem(5px);
          vertical-align: middle;
        }
        .icon.slidedown {
          transform: rotate(-180deg) translateZ(0);
        }
      }
    }
  }
  // 开奖历史
  .history.k3 {
    display: block;
    z-index: 11;
    left: poTorem(-10px);
    width: poTorem(414px);
    max-height: poTorem(300px);
    overflow: auto;
    > ul {
      @include column;
      > li {
        padding: 0 poTorem(10px);
        width: 100%;
        height: poTorem(29px);
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
            color: #e33939;
            i {
              margin-right: poTorem(4px);
            }
          }
        }
      }
    }
  }
  .history.ssc {
    display: block;
    z-index: 11;
    left: poTorem(-10px);
    width: poTorem(414px);
    max-height: poTorem(300px);
    overflow: auto;
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
  .history.pk10 {
    display: block;
    z-index: 11;
    left: poTorem(-10px);
    width: poTorem(414px);
    max-height: poTorem(300px);
    overflow: auto;
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
  .history.pkniuniu {
    display: block;
    z-index: 11;
    max-height: poTorem(300px);
    overflow: auto;
    ul {
      display: flex;
      flex-direction: column;
      align-items: start;
      justify-content: space-between;
      overflow: scroll;
      li {
        padding: 0 2%;
        // width: 100%;
        height: 1.875rem;
        font-size: 0.9rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:nth-child(even) {
          background-color: #eee;
        }
        .kaijiang {
          color: #eb3349;
          width: poTorem(140px);
          text-align: center;
        }
        span {
          width: poTorem(50px);
          padding: 0 poTorem(5px);
          text-align: center;
          &:nth-child(2) {
            width: poTorem(150px);
          }
        }
      }
    }
  }
  .history.xypk {
    display: block;
    z-index: 11;
    left: poTorem(-10px);
    width: poTorem(414px);
    max-height: poTorem(300px);
    overflow: auto;
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
  .history.tzyx {
    position: relative;
    z-index: 11;
    max-height: poTorem(300px);
    overflow: auto;
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
  .history.lhc {
    display: block;
    z-index: 11;
    left: poTorem(-10px);
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
          width: 100%;
        }
      }
    }
  }
  .history.lhc {
    display: block;
    z-index: 11;
    left: poTorem(-10px);
    max-height: poTorem(300px);
    overflow: auto;
    // width: poTorem(414px);
    > ul {
      @include column;
      > li {
        padding: 0.3rem;
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
            width: poTorem(45px);
          }
          &:nth-child(2) {
            width: poTorem(190px);
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
  .history.d {
    display: block;
    z-index: 11;
    left: poTorem(-10px);
    width: poTorem(414px);
    max-height: poTorem(300px);
    overflow: auto;
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
          width: poTorem(90px);
          color: #535353;
          &:nth-child(2) {
            width: poTorem(150px);
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
  .history.xync {
    display: block;
    z-index: 11;
    left: poTorem(-10px);
    width: poTorem(414px);
    max-height: poTorem(300px);
    overflow: auto;
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
  .history.x5 {
    display: block;
    z-index: 11;
    left: poTorem(-10px);
    width: poTorem(414px);
    max-height: poTorem(300px);
    overflow: auto;
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
  .history.pcdd {
    display: block;
    z-index: 11;
    left: poTorem(-10px);
    width: poTorem(414px);
    max-height: poTorem(300px);
    overflow: auto;
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
  .history.qxc {
    display: block;
    z-index: 11;
    left: poTorem(-10px);
    width: poTorem(414px);
    max-height: poTorem(300px);
    overflow: auto;
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
          // &:last-child {
          //   width: poTorem(60px);
          // }
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
}
</style>
<style lang="scss">
.betting {
  .yd-popup-content {
    overflow: inherit;
    background-color: #f3f3f3;
  }
  .yd-accordion-content:after {
    height: 0;
  }
  .type {
    > .haoma {
      span {
        color: #e33939;
      }
    }
  }
  .yd-accordion-head {
    display: none;
  }
  .yd-accordion {
    position: absolute;
    width: 100%;
  }
}
</style>


