<template>
  <!-- 投注界面 -->
  <div class="betting">
    <bet-area :curPlayItem="curPlayItem"
              :dataSet="dataSet"
              @chooseBall="clickBall"
              :peilvIsShow="peilvIsShow"
              :modelTitle="modelTitle"
              :peilv="peilv"
              :typeNum="typeNum"
              :peilvs="peilvs"
              :isSupportGridLayout="isSupportGridLayout"
              :pl="pl"></bet-area>
  </div>
</template>
<script>
import sortBy from "lodash/sortby";
import { mapActions, mapState } from "vuex";

import { selectBalls } from "~/js/lhc.template";
import * as calcFuncs from "~/js/touzhu/touzhu.lhc";

import { bettingMixin } from "./bettingMixin";
import oddMixin from "../../oddMixin";
import api from "../../../../../../api/betting";

import betArea from "../../../components/betArea";
export default {
  name: "lhc_betting",
  props: ["routeList"],
  components: {
    betArea
  },
  data() {
    return {
      isSupportGridLayout: false,
      playList: Array,
      optionsList: [],
      title: "直选复式",
      modelTitle: "",
      show1: false,
      heights: "",
      pl: "",
      peilv: [],
      peilvs: [],
      dataSet: [],
      curPlayItem: {},
      player: {},
      playersChl: {},
      ballsList: [],
      switchs: "官方玩法",
      bettingArr: [], // 传给公共方法的数组，可作为特殊玩法共用数组
      buyBall: [], // 拼接管道符之后的所有球号数组
      tebanbanbo: [
        "红大单",
        "红小单",
        "红大双",
        "红小双",
        "蓝大单",
        "蓝小单",
        "蓝大双",
        "蓝小双",
        "绿大单",
        "绿小单",
        "绿大双",
        "绿小双"
      ], // 特半半波
      tebanbo: [
        "红大",
        "红小",
        "红单",
        "红双",
        "蓝大",
        "蓝小",
        "蓝单",
        "蓝双",
        "绿大",
        "绿小",
        "绿单",
        "绿双"
      ], // 特半波
      temasebo: [], // 特码色波
      temashuangmian: [
        "特大",
        "特双",
        "特小单",
        "特地肖",
        "特小",
        "特大单",
        "特小双",
        "特前肖",
        "特大尾",
        "特大双",
        "特合单",
        "特后肖",
        "特小尾",
        "特合大",
        "特合双",
        "特家肖",
        "特单",
        "特合小",
        "特天肖",
        "特野肖"
      ], // 特码双面
      temaweishu: [
        "0头",
        "1头",
        "2头",
        "3头",
        "4头",
        "1尾",
        "2尾",
        "3尾",
        "4尾",
        "5尾",
        "6尾",
        "7尾",
        "8尾",
        "9尾",
        "0尾"
      ], //  特码尾数
      shengxiao: [], // 共用生肖
      wuxing: [], // 五行
      weishu: [
        { name: "0尾", balls: ["10", "20", "30", "40"], value: 0 },
        { name: "1尾", balls: ["01", "11", "21", "31", "41"], value: 1 },
        { name: "2尾", balls: ["02", "12", "22", "32", "42"], value: 2 },
        { name: "3尾", balls: ["03", "13", "23", "33", "43"], value: 3 },
        { name: "4尾", balls: ["04", "14", "24", "34", "44"], value: 4 },
        { name: "5尾", balls: ["05", "15", "25", "36", "45"], value: 5 },
        { name: "6尾", balls: ["06", "16", "26", "36", "46"], value: 6 },
        { name: "7尾", balls: ["07", "17", "27", "37", "47"], value: 7 },
        { name: "8尾", balls: ["08", "18", "28", "38", "48"], value: 8 },
        { name: "9尾", balls: ["09", "19", "29", "39", "49"], value: 9 }
      ], // 单纯尾数
      zongxiao: ["2肖", "3肖", "4肖", "5肖", "6肖", "7肖", "总肖单", "总肖双"], // 总肖
      secondWanfa: "",

      parentWanfa: 0,
      wanfaIndex: 0,
      zhushu: 0,
      odds: [],
      typeNum: 0, // 0:纯数字选球 1:小方块 2:中方块 3:大方块
      allPeilv: []
    };
  },
  directives: {
    setChoosed: {
      update(el, { value }) {
        if (value && el.classList && !el.classList.contains("choosed")) {
          el.classList.add("choosed");
        }
      }
    }
  },
  mounted() {
    this.isSupportGridLayout = CSS.supports("display", "grid");
    this.getData(this.$route.params.js_tag);
  },
  activated() {
    if (this.$route.params.isHome) {
      this.getData(this.$route.params.js_tag);
    }
    this.zhushu = 0;
    this.optionsList = selectBalls(this.$route.params.yearid);
    this.clearBalls();
    this.setOdds();
  },
  deactivated() {
    if (this.dataSet.length) {
      this.dataSet.forEach(item => {
        item.data.forEach(x => (x.checked = false));
      });
    }
  },
  methods: {
    clickBall(val1, val2) {
      const _this = this;
      setTimeout(() => {
        _this.setSelectLimit(val2);
        // _this.filter(val1, val2, i)
        _this.clickHandle();
      });
    },
    clickCart() {
      if (this.cart.length) {
        this.$router.push("/shopCart");
      } else {
        this.$dialog.toast({ mes: "您的购物车空空如也" });
      }
    },
    async getData(tag) {
      const playConfig = await api.getGamePlayConfig(tag);
      if (playConfig && Array.isArray(playConfig)) {
        this.playList = playConfig;
        this.setPlayConfig(playConfig);
        // 六合彩只有官方玩法
        this.player = playConfig;
        this.playSwitch("官方玩法");
        if (this.isFromBetHistory) {
          this.findItemByWanfa(this.historeyWanfa);
        } else {
          this.changeList(this.player[0]);
        }
      }
    },
    // 选择号码
    filter() {
      this.bettingArr.splice(0);
      this.dataSet.forEach(item => {
        item.data.forEach(n => {
          if (n.checked) {
            this.bettingArr.push(n.value);
          }
        });
      });
      switch (this.playid) {
        case 21:
          this.zhushu = this.bettingArr.length > 5 ? 1 : 0;
          break;
        case 22:
        case 26:
        case 32:
        case 33:
        case 34:
          this.zhushu = calcFuncs.getTwoBalls(this.bettingArr).length;
          break;
        case 23:
        case 27:
        case 30:
        case 31:
          this.zhushu = calcFuncs.getThreeBalls(this.bettingArr).length;
          break;
        case 24:
        case 28:
        case 35:
          this.zhushu = calcFuncs.getFourBalls(this.bettingArr).length;
          break;
        case 25:
        case 29:
          this.zhushu = calcFuncs.getFiveBalls(this.bettingArr).length;
          break;
        case 8:
          this.zhushu = this.bettingArr.length >= 2 ? 1 : 0;
          break;
        default:
          this.zhushu = this.bettingArr.length;
          break;
      }
      this.specialProcess();
      this.bettingArr = this.bettingArr.map(x => {
        if (x.toString().includes("|")) {
          x = x
            .split("|")
            .map(x => Number(x))
            .sort((a, b) => a - b)
            .join("|");
        }
        return x;
      });

      if (this.playersChl.length == 1 || this.playersChl == "") {
        this.bettingArr = this.bettingArr.sort((a, b) => a - b);
      }
    },
    specialProcess() {
      if (
        [8, 21].includes(this.playid) &&
        this.peilv.length &&
        typeof this.peilv === "string"
      ) {
        const bl = this.bettingArr.length;
        let _len = [];
        if (this.playid == 8) {
          _len = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        } else if (this.playid == 21) {
          _len = [6, 7, 8, 9, 10, 11];
        }

        if (_len.includes(bl)) {
          const index = _len.findIndex(x => x == bl);
          this.pl = this.peilv.split("|")[index];
        } else {
          this.pl = "";
        }
      }
    },
    changeList(val) {
      // 初始化选球
      this.$nextTick(() => {
        if (this.$refs.ballOptions) {
          this.$refs.ballOptions.forEach(item => {
            item.classList.remove("choosed");
          });
        }
      });
      // 添加类名

      this.modelTitle = val.name;
      this.specific(val.submenu[0].playlist[0], "显示", 0, 0, val.submenu[0]);
    },
    specific(val, txt, p, i, submenu) {
      this.curPlayItem = val;
      // 初始化选球数组
      this.bettingArr = [];
      this.zhushu = 0;
      this.setBetNumber(0);

      this.secondWanfa = submenu.menuid; // 设置玩法的第二层名称，由此判断选球方式
      this.playid = val.playid;
      this.parentWanfa = p;
      this.wanfaIndex = i;
      this.description(
        `<b>范例</b>：${val.play_fanli}<br><br><b>玩法说明</b>：${
          val.play_shuoming
        }`
      );
      this.playersChl = [submenu.name];
      this.title = val.playname;
      const arrlist = [
        1,
        36,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        21,
        30,
        31,
        32,
        33,
        34,
        35
      ];
      if (arrlist.includes(val.playid)) {
        this.typeNum = 2;
        const arr = [],
          a = this.optionsList.balls;
        for (const key in a) {
          arr.push(a[key]);
        }
        this.ballsList = arr;
      } else {
        if (val.playid == 4) {
          this.typeNum = 1;
          this.ballsList = this.tebanbo;
        } else if (val.playid == 6) {
          this.typeNum = 1;
          this.ballsList = this.tebanbanbo;
        } else if (val.playid == 3) {
          this.typeNum = 0;
          const arr = [],
            a = this.optionsList.color;
          for (const key in a) {
            arr.push(a[key]);
          }
          this.ballsList = arr;
        } else if (val.playid == 2) {
          this.typeNum = 1;
          this.ballsList = this.temashuangmian;
        } else if (val.playid == 5) {
          this.typeNum = 1;
          this.ballsList = this.temaweishu;
        } else if (val.playid == 18 || (val.playid > 25 && val.playid < 30)) {
          this.typeNum = 3;
          this.ballsList = this.weishu;
        } else if (val.playid == 19) {
          this.typeNum = 1;
          this.ballsList = ["红波", "蓝波", "绿波", "和局"];
        } else if (val.playid == 20) {
          this.typeNum = 1;
          this.ballsList = this.zongxiao;
        } else if (val.playid == 9) {
          this.typeNum = 4;
          const arr = [],
            a = this.optionsList.wuxing;
          for (const key in a) {
            arr.push(a[key]);
          }
          arr.forEach(
            x =>
              (x.balls = x.balls.map(y =>
                y < 10 ? "0" + Number(y) : y.toString()
              ))
          );

          this.ballsList = sortBy(arr, item => item.idx);
        } else {
          this.typeNum = 3;
          const arr = [];
          const a = this.optionsList.shengxiao;
          for (const key in a) {
            arr.push(a[key]);
          }
          console.log(arr);
          this.ballsList = arr;
        }
      }
      this.$nextTick(() => {
        // dom更新后初始化选球
        this.$refs.ballOptions &&
          this.$refs.ballOptions.forEach(item => {
            item.classList.remove("choosed");
          });
      });
      txt != "显示" && (this.show1 = !this.show1);

      this.setDataSet();
      this.odds.length && this.setEachDataPeilv(val.playid);
    },
    changeGameType(val) {
      this.show1 = !this.show1;
      this.playList.map(item => {
        item.name == val && (this.player = item);
      });
    },
    clearBalls() {
      this.pl = "";
      this.bettingArr = [];
      this.zhushu = 0;
      this.setBetNumber(0);
      this.$refs.ballOptions &&
        this.$refs.ballOptions.forEach(item => {
          item.classList.remove("choosed");
        });
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(x => x.data.forEach(y => (y.checked = false)));
      }
    },
    // 判断不同玩法的限制个数
    setSelectLimit(curItem) {
      const arr = this.dataSet[0].data.filter(x => x.checked);
      if (this.playid == 8 || this.playid == 21) {
        if (arr.length > 11) {
          arr.filter(x => x.name != curItem.name)[0].checked = false;
        }
      } else if (this.playid >= 30 && this.playid <= 35) {
        if (arr.length > 10) {
          arr.filter(x => x.name != curItem.name)[0].checked = false;
        }
      } else if (this.playid > 21 && this.playid < 30) {
        if (arr.length > 6) {
          arr.filter(x => x.name != curItem.name)[0].checked = false;
        }
      }
    },
    ...mapActions([
      "description",
      "playSwitch",
      "setBetNumber",
      "setBetOdds",
      "setBetUOdds",
      "setBetOdd",
      "setQishu",
      "setBetData",
      "clearCart",
      "setPlayConfig"
    ])
  },
  watch: {
    async "$route.params"(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === "lhc" &&
        oldVal &&
        (oldVal.js_tag && oldVal.js_tag === "lhc")
      ) {
        // const _playItem = this.curPlayItem;
        this.setOdds();
        this.clearBalls();
        this.setBetNumber(0);
        this.clearCart();
        this.setBetData({});
        if (newVal.isHome) {
          console.log(111);
          await this.getData(this.$route.params.js_tag);
          // this.findItemByWanfa(_playItem.wanfa);
        }
      }
    },
    zhushu: {
      handler(val) {
        this.setBetNumber(val);
      },
      deep: true
    },
    curPlayItem() {
      this.pl = "";
    }
  },
  computed: {
    ...mapState({
      odds: state => state.betting.odds,
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber
    }),
    peilvIsShow() {
      if ([21, 8, 30, 33].includes(this.curPlayItem.playid)) {
        return true;
      }
      return this.peilv && this.peilv.length && !this.peilv.includes("|");
    }
  },
  mixins: [bettingMixin, oddMixin]
};
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.betting {
  @include between;
  flex: 1;
  align-items: stretch;
  margin-top: poTorem(30px);
  overflow: scroll;
}
</style>
