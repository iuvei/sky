<template>
  <!-- 投注界面 -->
  <div class="betting">
    <sidebar v-if="isDoublePlay"
             :menuList="shuangmianList"
             @changeList="changeList"></sidebar>

    <betting-con v-if="isDoublePlay"
                 :dataSet="dataSet"
                 :peilvIsRight="peilvIsRight"
                 :showSinglePeilv="showSinglePeilv"
                 :curPlayItem="curPlayItem"
                 :peilv="peilv"
                 :peilvs="peilvs"
                 :isDanshi="isDanshi"
                 @filter="filter">
    </betting-con>
    <bet-area :curPlayItem="curPlayItem"
              :dataSet="dataSet"
              v-if="switchs=='官方玩法'"
              :placeholder="myPlaceholder"
              v-model="danshiExcl"
              @chooseBall="filter"></bet-area>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

import { RenderTypes } from "~/js/touzhu/commonTypes";
import {
  Calc_Zhushu_Obj,
  getRenderTypeByPlayID,
  getCalcFuncByPlayID
} from "~/js/touzhu/touzhu.pk10.calc";
import api from "../../../../../../api/betting";
import oddMixin from "../../oddMixin";
import danshiUtil from "~/js/touzhu/danshi.util";
import randomUtil from "~/js/touzhu/touzhu.random.danshi";
import betArea from "../../../components/betArea";
import sidebar from "../../../components/sideBar";
import bettingCon from "../../../components/bettingCon";
import getDwdArr from "~/js/touzhu/util";
import getFields from "./fields";
const zhushuFunc = new Calc_Zhushu_Obj();
export default {
  name: "pk10_betting",
  props: ["routeList"],
  components: {
    sidebar,
    bettingCon,
    betArea
  },
  data() {
    return {
      danshiExcl: "",
      playList: Array,
      guanfangList: [],
      shuangmianList: [],
      title: "直选复式",
      modelTitle: "",
      show1: false,
      player: {},
      playersChl: {},

      switchs: this.$route.params.play_type ? "双面玩法" : "官方玩法",
      peilv: "",
      peilvs: [],
      // wanfaIndex: 0,
      curPlayItem: {},
      wanfa: {},
      dataSet: [],
      zhushu: 0,
      odds: [],
      myPlaceholder: ""
    };
  },
  async activated() {
    if (this.$route.params.isHome) {
      this.switchs =
        this.$route.params.play_type === 0 ? "官方玩法" : "双面玩法";
      await this.getData(this.$route.params.js_tag);
    }
    this.zhushu = 0;
    this.clearBalls();
    this.setOdds();
    this.danshiExcl = "";
  },
  deactivated() {
    this.resetData();
  },
  methods: {
    danshiZhushuCacl(val) {
      const danshiExcl = val.split(" ").join("|");
      switch (this.curPlayItem.playid) {
        case 3:
          this.zhushu = zhushuFunc.calc_q2_zxds(danshiExcl.split(","));
          break;
        case 5:
          this.zhushu = zhushuFunc.calc_q3_zxds(danshiExcl.split(","));
          break;
      }
    },
    clickCart() {
      if (this.cart.length) {
        this.$router.push("/shopCart");
      } else {
        this.$dialog.toast({ mes: "您的购物车空空如也" });
      }
    },
    resetData() {
      this.zhushu = 0;
      this.setBetNumber(0);
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(item => {
          item.data.forEach(x => (x.checked = false));
        });
      }
    },
    clearBalls() {
      this.resetData();
    },
    async getData(tag) {
      const playConfig = await api.getGamePlayConfig(tag);
      if (playConfig && Array.isArray(playConfig)) {
        // 默认 menuid =4 为定位胆
        // let idx = playConfig.findIndex(item => item.menuid === 4)
        // if (idx) playConfig.unshift(playConfig.splice(idx, 1)[0])
        this.playList = playConfig;
        this.setPlayConfig(playConfig);
        this.guanfangList = playConfig.filter(x => x.showofficial === 0);
        this.shuangmianList = playConfig.filter(x => x.showofficial === 1);

        // 从彩种获取默认玩法 ，0为官方 1为双面
        const defaultPlay = this.$route.params.play_type;
        this.player =
          defaultPlay === 0 ? this.guanfangList : this.shuangmianList;
        // this.playSwitch(defaultPlay ? '双面玩法' : '官方玩法')
        if (!this.$route.params.hasOwnProperty("wanfa")) {
          this.player && this.changeList(this.player[0]);
        } else {
          this.findItemByWanfa(this.$route.params.wanfa);
        }
      }
    },
    // 计算注数
    calcZhushu(playid, oneDimValuesArr, twoDimNamesArr, towDimValuesArr) {
      const func = getCalcFuncByPlayID(playid);
      if ([1, 7].includes(playid)) {
        // playName.includes("前一") || playName.includes("冠亚和")) {
        this.zhushu = zhushuFunc[func](oneDimValuesArr);
      } else if ([2, 4].includes(playid)) {
        // (playName.includes("前二") || playName.includes("前三")) {
        this.zhushu = zhushuFunc[func](twoDimNamesArr);
      } else if (
        [6, 14, 15].includes(playid)
        // playName.includes("定位胆") ||
        // playName.includes("数字盘") ||
        // playName.includes("双面盘")
      ) {
        towDimValuesArr = getDwdArr(towDimValuesArr).filter(x => x.length);
        this.zhushu = zhushuFunc[func](towDimValuesArr);
      }
    },
    clickHandle() {
      console.log("clickHandle");
      // 单行多赔率
      const oneDimArr = [],
        twoDimArr = [],
        oneDimValuesArr = [],
        twoDimNamesArr = [],
        towDimValuesArr = [];
      let formatShowStr = "";
      const peilvType = getRenderTypeByPlayID(this.curPlayItem.playid);
      this.dataSet.forEach(item => {
        const filteredData = item.data.filter(x => x.checked);
        oneDimArr.push(...filteredData);
        if (filteredData.length) {
          const obj = Object.assign({}, item);
          obj.data = filteredData;
          twoDimArr.push(obj);
        }
        const filters = filteredData.map(x =>
          x.name.toString().replace(/\s/g, "")
        );
        const values = filteredData.map(x =>
          x.value.toString().replace(/\s/g, "")
        );
        oneDimValuesArr.push(...filters);
        twoDimNamesArr.push(filters.join("|"));
        towDimValuesArr.push(values.join("|"));
      });
      this.calcZhushu(
        this.curPlayItem.playid,
        oneDimValuesArr,
        twoDimNamesArr,
        towDimValuesArr
      );
      if (peilvType === RenderTypes.MUTI_ROW_SINGLE_PEILV) {
        twoDimNamesArr.forEach((x, i) => {
          if (x.length) {
            formatShowStr += `${
              this.dataSet[i].name
            }(<span style="color:red">${x}</span>) `;
          }
        });
        formatShowStr = formatShowStr.trim();
      }

      this.setBetData({
        type: this.switchs == "双面玩法" ? 1 : 0,
        peilv: this.peilv,
        peilvType, // 0 为单赔率,1为多赔率
        formatValueStr:
          peilvType == 0 ? twoDimNamesArr.join(" ") : oneDimValuesArr.join(" "),
        arr: twoDimNamesArr,
        arr2: towDimValuesArr,
        formatShowStr,
        // 定位胆专用取值
        dwdValuesArr:
          peilvType == RenderTypes.DWD ? getDwdArr(towDimValuesArr) : [],
        wanfa: this.title, // 玩法
        zhushu: this.zhushu, // 注数
        gameid: this.$route.params.lotter_id,
        playid: this.curPlayItem.playid,
        dataSource: this.dataSet,
        danshiExcl: this.danshiExcl, // 单式专用
        js_tag: this.$store.state.betting.js_tag,
        dataSet: oneDimArr, // 数据源,已选中的一维数组
        filteredData: twoDimArr // 已经选中的项数组 二维数组
      });
    },
    // 选择号码
    filter() {
      setTimeout(this.clickHandle);
    },
    changeList(val) {
      // 添加类名

      this.modelTitle = val.name;
      val &&
        val.submenu[0] &&
        val.submenu[0].playlist.length &&
        this.specific(val.submenu[0].playlist[0], "显示", 0, 0);
      this.resetData();
      this.wanfa = val;
    },
    specific(val) {
      this.show1 = false;
      switch (val.playid) {
        case 3:
          this.myPlaceholder = "1 2";
          break;
        case 5:
          this.myPlaceholder = "1 2 3";
          break;
      }
      this.danshiExcl = "";
      this.resetData();
      this.curPlayItem = val;
      // this.parentWanfa = p
      // this.wanfaIndex = i
      this.description(
        `<b>范例</b>：${val.play_fanli}<br><br><b>玩法说明</b>：${
          val.play_shuoming
        }`
      );
      this.playersChl = val.content.split("+");
      this.title = val.playname;
      this.setBallList(val.playid);
      // txt != '显示' && (this.show1 = !this.show1)
      this.setBetNumber(0);

      this.setDataSet();
      this.odds.length && this.setEachDataPeilv(val.playid);
    },
    setBallList(playid) {
      this.playersChl = getFields(playid, this.playersChl);
    },
    changeGameType(val) {
      this.show1 = !this.show1;
      this.player = this.playList.filter(item => item.name == val)[0] || {};
      // this.playList.map((item, index) => {
      //   item.name == val && (this.player = item)
      // })
    },
    // 初始化数据源
    setDataSet() {
      this.dataSet = this.playersChl.map((item, index) => ({
        name: item.name,
        data: item.options.map((x, i) => ({
          name: x,
          checked: false,
          peilv: "-",
          playid: this.curPlayItem.playid,
          value:
            item.values && item.values.length
              ? item.values[i]
              : index * item.options.length + i // 从0开始
        }))
      }));
    },
    ...mapActions([
      "description",
      "playSwitch",
      "setBetNumber",
      "setBetOdd",
      "setBetOdds",
      "setBetUOdds",
      "setPlayConfig",
      "setBetData",
      "clearCart",
      "showOfficial"
    ])
  },
  watch: {
    danshiExcl(val) {
      this.zhushu = 0;
      this.danshiZhushuCacl(val);
    },
    switch(val) {
      this.switchs = val;
      if (this.isFromBetHistory) return;
      if (this.isDoublePlay) {
        this.shuangmianList.length &&
          this.changeList(this.shuangmianList[0], 0);
      } else {
        this.guanfangList.length && this.changeList(this.guanfangList[0], 0);
      }
    },
    zhushu: {
      handler(val) {
        this.setBetNumber(val);
        if (
          danshiUtil.isSingleMode(
            this.routeList.js_tag,
            this.curPlayItem.playid
          ) &&
          val > 0
        ) {
          const dataSet = randomUtil.createDataSource(
            this.routeList.js_tag,
            this.curPlayItem.playid
          );
          this.dataSet = dataSet;
          this.clickHandle();
        }
      },
      deep: true
    },
    async "$route.params"(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === "pk10" &&
        oldVal &&
        (oldVal.js_tag && oldVal.js_tag === "pk10")
      ) {
        const _playItem = this.curPlayItem;
        this.clearBalls();
        this.setOdds();
        this.setBetNumber(0);
        this.clearCart();
        this.setBetData({});
        if (newVal.isHome) {
          await this.getData(this.$route.params.js_tag);
          this.findItemByWanfa(_playItem.wanfa);
        }
      }
    }
  },
  computed: {
    ...mapState({
      switch: state => state.betting.switch,
      betNumber: state => state.betting.betNumber,
      cartNumber: state => state.betting.cartNumber,
      cart: state => state.betting.cart
    }),
    isDoublePlay() {
      return this.switchs === "双面玩法";
    },
    isOfficalPlay() {
      return this.switchs === "官方玩法";
    },
    peilvIsRight() {
      return [6, 14, 15].includes(this.curPlayItem.playid);
    },
    showSinglePeilv() {
      return ![7].includes(this.curPlayItem.playid);
    },
    isDanshi() {
      return danshiUtil.isSingleMode(this.js_tag, this.curPlayItem.playid);
    }
  },
  mixins: [oddMixin]
};
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.betting {
  @include between;
  align-items: stretch;
  flex: 1;
  margin-top: poTorem(30px);
  overflow: scroll;
}
</style>
