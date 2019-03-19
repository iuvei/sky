<template>
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
              v-if="isOfficalPlay"
              :placeholder="myPlaceholder"
              v-model="danshiExcl"
              @chooseBall="filter"></bet-area>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { Calc_Zhushu_Obj } from "~/js/touzhu/touzhu.11x5.calc";
import { RenderTypes } from "~/js/touzhu/commonTypes";
import api from "../../../../../../api/betting";
import {
  getCalcFuncByPlayID,
  getRenderTypeByPlayID
} from "~/js/touzhu/touzhu.11x5.util";
import oddMixin from "../../oddMixin";
import danshiUtil from "~/js/touzhu/danshi.util";
import randomUtil from "~/js/touzhu/touzhu.random.danshi";
const zhushuFunc = new Calc_Zhushu_Obj();
import bettingCon from "../../../components/bettingCon";
import sidebar from "../../../components/sideBar";
import betArea from "../../../components/betArea";
import getFields from "./fields";
import danshiUtils from "./danshi.util";
import getDwdArr from "~/js/touzhu/util";
export default {
  name: "eleventxfive_betting",
  props: ["routeList"],
  components: {
    sidebar,
    bettingCon,
    betArea
  },
  data() {
    return {
      playList: Array,
      guanfangList: [],
      shuangmianList: [],
      danshiArr: danshiUtils.danshiArr,
      title: "直选复式",
      modelTitle: "",
      show1: false,
      heights: "",
      player: {},
      playersChl: [],
      switchs: this.$route.params.play_type ? "双面玩法" : "官方玩法", // '官方玩法',
      peilv: "",
      peilvs: [],
      parentWanfa: 0,
      wanfaIndex: 0,
      curPlayItem: {},
      wanfa: {},
      dataSet: [],
      zhushu: 0,
      odds: [],
      danshiExcl: "",
      myPlaceholder: ""
    };
  },
  activated() {
    if (this.$route.params.isHome) {
      this.getData(this.$route.params.js_tag);
    }

    this.clearBalls();
    this.zhushu = 0;
    this.setOdds();
    this.danshiExcl = "";
  },
  deactivated() {
    if (this.dataSet && this.dataSet.length) {
      this.dataSet.forEach(item => {
        item.data.forEach(x => (x.checked = false));
      });
    }
  },
  methods: {
    danshiZhushuCacl(val) {
      const danshiExcl = val.split(" ").join("|");
      switch (this.curPlayItem.playid) {
        case 2:
        case 7:
        case 12:
          this.zhushu = zhushuFunc.calc_3m_q3zhxds(danshiExcl.split(","));
          break;
        case 4:
        case 9:
        case 14:
          this.zhushu = zhushuFunc.calc_3m_q3zuxds(danshiExcl.split(","));
          break;
        case 17:
        case 22:
          this.zhushu = zhushuFunc.calc_2m_q2zhxds(danshiExcl.split(","));
          break;
        case 19:
        case 24:
          this.zhushu = zhushuFunc.calc_2m_q2zuxds(danshiExcl.split(","));
          break;
        case 38:
          this.zhushu = zhushuFunc.calc_rxds_rx1z1(danshiExcl.split(","));
          break;
        case 39:
          this.zhushu = zhushuFunc.calc_rxds_rx2z2(danshiExcl.split(","));
          break;
        case 40:
          this.zhushu = zhushuFunc.calc_rxds_rx3z3(danshiExcl.split(","));
          break;
        case 41:
          this.zhushu = zhushuFunc.calc_rxds_rx4z4(danshiExcl.split(","));
          break;
        case 42:
          this.zhushu = zhushuFunc.calc_rxds_rx5z5(danshiExcl.split(","));
          break;
        case 43:
          this.zhushu = zhushuFunc.calc_rxds_rx6z5(danshiExcl.split(","));
          break;
        case 44:
          this.zhushu = zhushuFunc.calc_rxds_rx7z5(danshiExcl.split(","));
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
    clearBalls() {
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(item => {
          item.data.forEach(x => (x.checked = false));
        });
      }
      this.zhushu = 0;
      this.setBetNumber(0);
    },
    // 号码选择互斥
    mutex(name, curItem) {
      if (name.indexOf("胆码") != -1 || name.indexOf("拖码") != -1) {
        // 互斥的号码一般为胆拖，两行
        const arr1 = this.dataSet[0].data.filter(x => x.checked),
          arr2 = this.dataSet[1].data.filter(x => x.checked);

        // 如果是第一行点击，则第二行球消失
        if (name == this.dataSet[0].name) {
          arr1.forEach(item => {
            const index = arr2.findIndex(x => x.name === item.name);
            if (index >= 0) arr2[index].checked = !arr2[index].checked;
          });
          // 胆码最多只能选择三个或者两个
          if (curItem.playid == 51 && arr1.length > 7) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          } else if (curItem.playid == 50 && arr1.length > 6) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          } else if (curItem.playid == 49 && arr1.length > 5) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          } else if (curItem.playid == 48 && arr1.length > 4) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          } else if (curItem.playid == 47 && arr1.length > 3) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          } else if (curItem.playid == 46 && arr1.length > 2) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          } else if (curItem.playid == 45 && arr1.length > 1) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          }
        }
        // 如果是第二行点击，则第一行球消失
        if (name == this.dataSet[1].name) {
          arr2.forEach(item => {
            const index = arr1.findIndex(x => x.name === item.name);
            if (index >= 0) arr1[index].checked = !arr1[index].checked;
          });
        }
      }
    },
    // 计算注数
    calcZhushu(playid, oneDimValuesArr, towDimValuesArr) {
      const func = getCalcFuncByPlayID(playid);
      if ([3, 8, 13, 18, 23].includes(playid)) {
        this.zhushu = zhushuFunc[func](oneDimValuesArr);
      } else if ([1, 6, 11, 16, 21].includes(playid)) {
        this.zhushu = zhushuFunc[func](towDimValuesArr);
      } else if (
        [5, 10, 15, 20, 25, 45, 46, 47, 48, 49, 50, 51].includes(playid)
      ) {
        this.zhushu = zhushuFunc[func](towDimValuesArr);
      } else if ([26, 27, 28].includes(playid)) {
        this.zhushu = zhushuFunc[func](oneDimValuesArr);
      } else if ([29].includes(playid)) {
        towDimValuesArr = getDwdArr(towDimValuesArr).filter(x => x.length);
        this.zhushu = zhushuFunc[func](towDimValuesArr);
      } else {
        this.zhushu = zhushuFunc[func](oneDimValuesArr);
      }
    },
    clickHandle() {
      // debugger;
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

      if (
        !danshiUtil.isSingleMode(this.routeList.js_tag, this.curPlayItem.playid)
      ) {
        this.calcZhushu(
          this.curPlayItem.playid,
          oneDimValuesArr,
          towDimValuesArr
        );
      }

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
        type: this.switchs == "双面玩法" ? 1 : 0, // 双面玩法,0为官方玩法
        peilv: this.peilv,
        peilvType, // 0 为单赔率,1为多赔率
        formatValueStr:
          peilvType == 0 ? twoDimNamesArr.join(" ") : oneDimValuesArr.join(" "),
        arr: twoDimNamesArr,
        arr2: towDimValuesArr,
        formatShowStr,
        wanfa: this.title, // 玩法
        zhushu: this.zhushu, // 注数
        // 定位胆专用取值
        dwdValuesArr:
          peilvType === RenderTypes.DWD ? getDwdArr(towDimValuesArr) : [],
        gameid: this.routeList.lotter_id,
        playid: this.curPlayItem.playid,
        dataSource: this.dataSet,
        js_tag: this.$store.state.betting.js_tag,
        danshiExcl: this.danshiExcl,
        dataSet: oneDimArr, // 数据源,已选中的一维数组
        filteredData: twoDimArr // 已经选中的项数组 二维数组
      });
    },
    resetData() {
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(x => x.data.forEach(y => (y.checked = false)));
      }
    },
    async getData(tag) {
      console.log(tag);
      const config = await api.getGamePlayConfig(tag);
      console.log(config);
      if (config && config != 0) {
        // 默认 menuid =4 为定位胆
        // let idx = config.findIndex(item => item.menuid === 4)
        // if (idx) config.unshift(config.splice(idx, 1)[0])
        this.playList = config;
        this.setPlayConfig(config);
        this.guanfangList = config.filter(x => x.showofficial === 0);
        this.shuangmianList = config.filter(x => x.showofficial === 1);

        // 从彩种获取默认玩法 ，0为官方 1为双面
        const defaultPlay = this.$route.params.play_type;
        this.player =
          defaultPlay === 0 ? this.guanfangList : this.shuangmianList;
        this.playSwitch(defaultPlay ? "双面玩法" : "官方玩法");
        if (!this.$route.params.hasOwnProperty("wanfa")) {
          this.player && this.changeList(this.player[0]);
        } else {
          this.findItemByWanfa(this.$route.params.wanfa);
        }
      }
    },
    // 选择号码
    filter(item, val2) {
      if (item && val2 && !item.hasOwnProperty("actions")) {
        // val2.checked = !val2.checked;
        this.mutex(item.name, val2);
      }
      // this.clickHandle();
      setTimeout(this.clickHandle, 0);
    },
    changeList(val) {
      this.modelTitle = val.name;
      val &&
        val.submenu[0] &&
        val.submenu[0].playlist.length &&
        this.specific(val.submenu[0].playlist[0], "显示", 0, 0);
      this.resetData();
      this.wanfa = val;
    },
    specific(val, txt, p, i) {
      this.myPlaceholder = danshiUtils.getPlaceHolder(val.playid);
      this.danshiExcl = "";
      this.resetData();
      this.curPlayItem = val;
      this.parentWanfa = p;
      this.wanfaIndex = i;
      this.description(
        `<b>范例</b>：${val.play_fanli}<br><br><b>玩法说明</b>：${
          val.play_shuoming
        }`
      );
      this.playersChl = val.content.split("+");
      this.title = val.playname;
      txt != "显示" && (this.show1 = !this.show1);
      this.setBallList(val);
      this.setBetNumber(0);
      this.setDataSet();
      this.odds.length && this.setEachDataPeilv(val.playid);
    },
    changeGameType(val) {
      this.show1 = !this.show1;
      this.playList.map(item => {
        item.name == val && (this.player = item);
      });
    },
    // 初始化数据源
    setDataSet() {
      const columns = this.playersChl;
      const _dataSet = [];
      columns.forEach((item, index) => {
        const _d = [];
        item.options.forEach((x, i) => {
          _d.push({
            name: x,
            checked: false,
            peilv: "-",
            playid: this.curPlayItem.playid,
            value:
              item.values && item.values.length
                ? item.values[i]
                : index * item.options.length + i // 从0开始
          });
        });
        _dataSet.push({
          name: item.name,
          data: _d
        });
      });
      this.dataSet = _dataSet;
    },
    setBallList(val) {
      this.playersChl = getFields(val.playid, this.playersChl);
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
    show1(val) {
      val == false && (this.heights = "0px");
    },
    switch(val) {
      this.switchs = val;
      if (this.isFromBetHistory) return;
      if (this.shuangmianList.length || this.guanfangList.length) {
        if (this.switchs == "双面玩法") {
          this.changeList(this.shuangmianList[0], 0);
        } else {
          this.changeList(this.guanfangList[0], 0);
        }
      }
    },
    zhushu(val) {
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
    async "$route.params"(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === "11x5" &&
        oldVal &&
        (oldVal.js_tag && oldVal.js_tag === "11x5")
      ) {
        this.setOdds();
        this.setBetNumber(0);
        this.clearBalls();
        this.clearCart();
        this.setBetData({});
        if (newVal.isHome) {
          this.getData(this.$route.params.js_tag);
        }
      }
    }
  },
  computed: {
    ...mapState({
      switch: state => state.betting.switch,
      betNumber: state => state.betting.betNumber,
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber
    }),
    isDoublePlay() {
      return this.switchs === "双面玩法";
    },
    isOfficalPlay() {
      return this.switchs === "官方玩法";
    },
    isDanshi() {
      return this.danshiArr.includes(this.curPlayItem.playid);
    },
    peilvIsRight() {
      return [29, 46, 32].includes(this.curPlayItem.playid);
    },
    showSinglePeilv() {
      return ![56, 57].includes(this.curPlayItem.playid);
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
