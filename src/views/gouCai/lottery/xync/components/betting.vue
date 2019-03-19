<template>
  <!-- 投注界面 -->
  <div class="betting">
    <div class="bet-area">
      <div class="con_item"
           v-for="(item,index) in curStructure"
           :key="index">
        <!-- 快捷操作-->
        <div class="head">
          <span class="arrow">{{item.name}}</span>
        </div>
        <ul class="balls">
          <li @click.stop="clickBall(index, ball)"
              v-for="(ball, ball_index) in item.data"
              :key="ball_index"
              class="shift_line">
            <div class="ball"
                 ref="ballOptions"
                 :class="[{choosed: isChecked(index, ball.value)}]">{{ball.name}}</div>
            <div class="peilv-num">{{getItemPl(ball.value)}}</div>
          </li>
        </ul>
      </div>

      <div @click="clickCart"
           class="shop_icon"
           v-drag>
        <div class="_drag">
          <i class="spots"
             v-show="cartNumber>0">
            {{cartNumber > 99 ? '99+' : cartNumber}}
          </i>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import api from "../../../../../../api/betting";
import oddMixin from "../../oddMixin";
import { resetRouteParams } from "~/js/util";
import { RenderTypes } from "~/js/touzhu/commonTypes";

// 双面盘 下注标签名
const labels_1 = [
  "总和大",
  "总和小",
  "总和单",
  "总和双",
  "总和尾大",
  "总和尾小",
  "龙",
  "虎"
];
const labels_2 = ["大", "小", "单", "双", "尾大", "尾小", "合数单", "合数双"];
// 第1-8球 下注标签名
const labels_3 = [
  "1 号",
  "2 号",
  "3 号",
  "4 号",
  "5 号",
  "6 号",
  "7 号",
  "8 号",
  "9 号",
  "10 号",
  "11 号",
  "12 号",
  "13 号",
  "14 号",
  "15 号",
  "16 号",
  "17 号",
  "18 号",
  "19 号",
  "20 号",
  "大",
  "小",
  "单",
  "双",
  "尾大",
  "尾小",
  "合数单",
  "合数双",
  "东",
  "南",
  "西",
  "北",
  "中",
  "发",
  "白"
];

// 下注主体结构
const mainStructure = {
  1: [
    {
      name: "总和",
      data: [{ name: "总和大", checked: false, value: 0 }]
    },
    {
      name: "第一球",
      data: []
    },
    {
      name: "第二球",
      data: []
    },
    {
      name: "第三球",
      data: []
    },
    {
      name: "第四球",
      data: []
    },
    {
      name: "第五球",
      data: []
    },
    {
      name: "第六球",
      data: []
    },
    {
      name: "第七球",
      data: []
    },
    {
      name: "第八球",
      data: []
    }
  ],
  2: [
    {
      name: "第一球",
      data: []
    }
  ],
  3: [
    {
      name: "第二球",
      data: []
    }
  ],
  4: [
    {
      name: "第三球",
      data: []
    }
  ],
  5: [
    {
      name: "第四球",
      data: []
    }
  ],
  6: [
    {
      name: "第五球",
      data: []
    }
  ],
  7: [
    {
      name: "第六球",
      data: []
    }
  ],
  8: [
    {
      name: "第七球",
      data: []
    }
  ],
  9: [
    {
      name: "第八球",
      data: []
    }
  ]
};

function initBetTxt() {
  Object.keys(mainStructure).forEach(pid => {
    mainStructure[pid].forEach(page => {
      let data = page.name === "总和" ? labels_1 : labels_2;
      if (pid !== "1") {
        data = labels_3;
      }
      let uid = 0;
      page.data = data.map(option => ({
        name: option,
        checked: false,
        value: uid++
      }));
    });
  });
}
initBetTxt();
// console.error(mainStructure);

export default {
  name: "xync_betting",
  props: ["routeList"],
  components: {},
  data() {
    return {
      // mainStructure, // 下注结构
    };
  },
  computed: {
    ...mapState({
      ncSelected: state => state.betting.ncSelected,
      curPlayItem: state => state.betting.curPlayItem || {},
      odds: state => state.betting.odds,
      js_tag: state => state.betting.js_tag,
      // switch: state => state.betting.switch,
      // zhushu: state => state.betting.betNumber,
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber
    }),
    playId() {
      const playId = this.curPlayItem.playid;
      return (mainStructure[playId] && playId) || 1;
    },
    peilvs() {
      let peilvs = this.odds || [];
      peilvs = peilvs.filter(el => el.playid === this.playId)[0];
      peilvs = (peilvs && peilvs.peilv) || "-";
      if (peilvs.includes("|")) peilvs = peilvs.split("|");
      return peilvs;
    },
    curStructure() {
      return mainStructure[this.playId];
    },
    curSelected() {
      return (
        this.ncSelected[this.playId] ||
        new Array(this.curStructure.length).fill("")
      );
    }
  },
  watch: {
    async "$route.params"(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === "xync" &&
        oldVal &&
        oldVal.js_tag === "xync"
      ) {
        resetRouteParams(this, "xync");
        this.setOdds();
        if (newVal.isHome) {
          await this.getData();
        }
      }
    },
    curPlayItem(curPlayItem) {
      if (!curPlayItem || !curPlayItem.playid) return;
      this.clearBalls();
    },
    // 下注
    curSelected(curSelected) {
      // console.error(curSelected);
      const zhushu = curSelected.reduce(
        (pre, el) => pre + (!el ? 0 : el.split("|").length),
        0
      );
      const dwd_idx = curSelected.reduce(
        (pre, el, idx) => pre + (!el ? 0 : 2 ** idx),
        0
      );
      const _curStructure = JSON.parse(JSON.stringify(this.curStructure));
      const filteredData = _curStructure.filter((item, idx) => {
        if (curSelected[idx]) {
          const rowValue = curSelected[idx].split("|");
          return (item.data = item.data.filter(
            el =>
              rowValue.findIndex(rv => {
                if (rv == el.value) {
                  return (el.peilv = this.getItemPl(el.value));
                }
              }) !== -1
          ));
        }
      });
      // console.error(zhushu, dwd_idx, filteredData);
      this.setBetNumber(zhushu);
      const _betData = {
        type: 1, // 双面玩法,0为官方玩法
        peilv: this.peilvs,
        peilvType:
          RenderTypes[this.playId === 1 ? "DWD" : "SINGLE_ROW_MUTI_PEILV"], // 0 为单赔率,1为多赔率
        // formatedStr,
        // formatValueStr: this.selected,
        // formatShowStr: this.selected,
        wanfa: this.$store.state.betting.gameName, // 玩法
        arr: curSelected,
        arr2: curSelected,
        zhushu, // 注数
        gameid: this.$store.state.betting.gameId,
        playid: this.playId,
        dataSet: filteredData, // 数据源,已选中的一维数组
        dataSource: this.curStructure, // 包含name data 全数据
        js_tag: this.js_tag,
        filteredData // 已经选中的项数组 二维数组
        // dwdValuesArr
      };
      if (this.playId === 1) {
        const dwdValuesArr = [dwd_idx + "", ...this.curSelected];
        _betData.dwdValuesArr = dwdValuesArr;
        _betData.singlePl = true;
      } else {
        const formatedStr = filteredData
          .map(
            item =>
              item.name +
              "（" +
              item.data.map(el => `<span style="color:red">${el.name}</span>`) +
              ") "
          )
          .join(" ");
        _betData.formatedStr = formatedStr;
        _betData.dataSet = (filteredData[0] && [...filteredData[0].data]) || [];
      }
      if (this.js_tag === "xync") this.setBetData(_betData);
    }
  },
  mixins: [oddMixin],
  mounted() {
    this.getData();
  },
  activated() {
    if (this.$route.params.isHome) {
      this.getData();
    }
    resetRouteParams(this, "xync");
    this.setOdds();
    // this.clearBalls();
  },
  deactivated() {},
  methods: {
    ...mapActions([
      "setBetNumber",
      "setPlayConfig",
      "setBetData",
      "setBetOdd",
      "setBetOdds",
      "setBetUOdds"
      // "showOfficial",
      // 'description',
      // 'playSwitch',
      // 'setQishu',
      // 'clearCart'
    ]),
    getItemPl(ball) {
      return Array.isArray(this.peilvs) ? this.peilvs[ball] : this.peilvs;
    },
    isChecked(idx, value) {
      let checked =
        (this.curSelected[idx] && this.curSelected[idx].split("|")) || [];
      checked = checked.findIndex(el => el == value) !== -1;
      return checked;
    },
    // 选择球
    clickBall(idx, ball) {
      const _curSelected = JSON.parse(JSON.stringify(this.curSelected));
      let rowValue = (_curSelected[idx] && _curSelected[idx].split("|")) || [];
      const isExist = rowValue.findIndex(el => el == ball.value);
      if (isExist === -1) {
        rowValue.push(ball.value + "");
      } else {
        rowValue.splice(isExist, 1);
      }
      rowValue = rowValue
        .filter(el => el)
        .sort()
        .join("|");
      // console.error(rowValue);
      _curSelected[idx] = rowValue;
      this.updateField({ ncSelected: { [this.playId]: _curSelected } });
    },
    clickCart() {
      if (this.cart.length) {
        this.$router.push("/shopCart");
      } else {
        this.$dialog.toast({ mes: "您的购物车空空如也" });
      }
    },
    clearBalls() {
      initBetTxt();
      this.setOdds();
      this.setBetNumber(0);
      this.setBetData({});
      this.updateField({
        ncSelected: { [this.playId]: Array(this.curStructure.length).fill("") }
      });
    },
    async getData(js_tag = this.js_tag || "xync") {
      const playConfig = (await api.getGamePlayConfig(js_tag)) || [];
      // console.error(playConfig);
      this.setPlayConfig(playConfig);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.betting {
  @include between;
  flex: 1;
  align-items: stretch;
  margin-top: poTorem(30px);
  overflow: scroll;
  .bet-area {
    background: rgb(243, 243, 243);
    width: 100%;
    padding: 1rem 1rem 2.5rem;
    flex: 1;
    display: block;
    overflow-y: scroll;
    .head {
      @include center;
      justify-content: flex-start;
    }
    .arrow {
      @include center;
      background: url(~img/goucai/morenzhuangtai.png) no-repeat;
      min-width: 30%;
      padding: 0.7rem;
      background-size: contain;
      background-position: center;
      font-size: poTorem(16px);
      // color: #e13939;
      color: #666;
      // margin-right: poTorem(20px);
      margin-right: poTorem(10px);
    }
    .con_item {
      margin-bottom: 1rem;
    }
    .balls {
      @include center;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0.3rem 0.5rem;
      > li {
        position: relative;
        width: 25%;
      }
      .peilv-num {
        padding: 0.3rem 0 0.5rem;
        font-weight: 900;
        color: #535353;
        text-align: center;
      }
      .ball {
        width: 94%;
        margin-left: 3%;
        background: #fff;
        border-radius: 0.3rem;
        border: 1px solid #999;
        color: #e33939;
        font-size: poTorem(20px);
        line-height: poTorem(42px);
        text-align: center;
        transition: all 0.2s ease;
        &.choosed {
          background: #e33939;
          border: 1px solid #e33939;
          color: #fff;
        }
      }
      input {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
  .shop_icon {
    display: flex;
    position: fixed;
    bottom: 3.5625rem;
    left: 1.3rem;
    ._drag {
      position: relative;
      box-shadow: #555 0 0 poTorem(10px);
      border-radius: 50%;
      width: poTorem(60px);
      height: poTorem(60px);
      background: #fff url(~img/goucai/gouwuche.png) no-repeat;
      background-size: poTorem(30px) poTorem(30px);
      background-position: center;
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

  // 弹窗
  .modle {
    .modle_title {
      @include center;
      width: 100%;
      color: #535353;
      height: poTorem(50px);
      border-bottom: (1px) dashed #dbdbdb;
      font-size: poTorem(20px);
      position: relative;
    }
    .icon {
      position: absolute;
      right: poTorem(10px);
      background: url(~img/goucai/close.png) no-repeat;
      background-size: contain;
      width: poTorem(18px);
      height: poTorem(18px);
    }
    .time_line_box {
      .time_line_wrap {
        .wanfa {
          color: #eb384d;
          border-color: #eb384d;
        }
      }
    }
  }
}
</style>
