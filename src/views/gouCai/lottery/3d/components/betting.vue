<template>
  <!-- 投注界面 -->
  <div class="betting">
    <sidebar v-if="isDoublePlay"
             :menuList="shuangmianList"
             @changeList="changeList"></sidebar>
    <betting-con v-if="isDoublePlay"
                 :dataSet="dataSet"
                 :peilvIsRight="peilvIsRight"
                 :showSinglePeilv="getIsShowSinglePeilv"
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
    <!-- 弹窗 -->
    <div class="modle">
      <yd-popup v-if="show1"
                v-model="show1"
                position="center"
                width="90%">
        <div class="modle_title">
          <span>{{modelTitle}}</span>
          <i class="icon"
             @click="show1=!show1"></i>
        </div>
        <div class="time_line_box">
          <yd-timeline class="time_line_wrap">
            <yd-timeline-item v-for="(item,index) in player.submenu"
                              :key="index">
              <span>{{item.name}}</span>
              <ul>
                <li style="width:unset;padding:0 3px"
                    @click="specific(items,'',index,indexs,item)"
                    v-for="(items,indexs) in item.playlist"
                    :key="indexs"
                    :class="{wanfa: indexs==wanfaIndex&&index==parentWanfa}"
                    :title="items.wanfa">{{items.playname}}</li>
              </ul>
            </yd-timeline-item>
          </yd-timeline>
        </div>
      </yd-popup>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { RenderTypes } from "~/js/touzhu/commonTypes";
import { Calc_Zhushu_Obj } from "~/js/touzhu/touzhu.3d.calc";
import {
  getCalcFuncByPlayID,
  getRenderTypeByPlayID
} from "~/js/touzhu/touzhu.3d.util";
import api from "../../../../../../api/betting";
import oddMixin from "../../oddMixin";
import danshiUtil from "~/js/touzhu/danshi.util";
import randomUtil from "~/js/touzhu/touzhu.random.danshi";

import bettingCon from "../../../components/bettingCon";
import sidebar from "../../../components/sideBar";
import betArea from "../../../components/betArea";
import getDwdArr from "~/js/touzhu/util";
import getFields from "./fields";
const zhushuFunc = new Calc_Zhushu_Obj();

export default {
  name: "fc3d_betting",
  props: ["routeList"],
  components: {
    sidebar,
    bettingCon,
    betArea
  },
  data() {
    return {
      dataSet: [],
      playList: Array,
      guanfangList: [],
      shuangmianList: [],
      title: "直选复式",
      modelTitle: "",
      show1: false,
      heights: "",
      player: {},
      playersChl: {},
      // switchs: this.$route.params.play_type ? '双面玩法' : '官方玩法',
      peilv: "",
      peilvs: [],
      parentWanfa: 0,
      wanfaIndex: 0,
      curPlayItem: {},
      wanfa: {},
      danshiExcl: "",
      odds: [],
      zhushu: 0,
      myPlaceholder: ""
    };
  },
  activated() {
    if (this.$route.params.isHome) {
      this.getData(this.$route.params.js_tag);
    }
    this.setOdds();
    this.clearBalls();
    this.zhushu = 0;
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
    danshiZhushuCalc(val) {
      const danshiExcl = val.split(" ").join("|");
      switch (this.curPlayItem.playid) {
        case 2:
          this.zhushu = zhushuFunc.calc_3x_zhxds(danshiExcl.split(","));
          break;
      }
    },
    clearBalls() {
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(x => x.data.forEach(y => (y.checked = false)));
      }
      this.zhushu = 0;
      this.setBetNumber(0);
    },
    async getData(tag) {
      const playConfig = await api.getGamePlayConfig(tag);
      if (playConfig && Array.isArray(playConfig)) {
        this.playList = playConfig;
        this.setPlayConfig(playConfig);
        this.guanfangList = playConfig.filter(x => x.showofficial === 0);
        this.shuangmianList = playConfig.filter(x => x.showofficial === 1);

        // 从彩种获取默认玩法 ，0为官方 1为双面
        let defaultPlay = this.$route.params.play_type;
        if (defaultPlay === undefined) {
          defaultPlay = this.switchs === "官方玩法" ? 0 : 1;
        }
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
    // 计算注数
    calcZhushu(playid, oneDimValuesArr, twoDimNamesArr, towDimValuesArr) {
      const func = getCalcFuncByPlayID(playid); // getCalcFuncByName(playName),
      let param = oneDimValuesArr;
      if (playid === 12) {
        param = towDimValuesArr; // 定位胆
      } else if (
        playid === 1 || // "三星直选复式"
        playid === 8 || // 前二直选复式
        playid === 9 // 后二直选复式
      ) {
        param = twoDimNamesArr;
      }
      this.zhushu = zhushuFunc[func](param);
    },
    clickHandle() {
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
          twoDimNamesArr,
          towDimValuesArr
        );
      }

      // this.setBetNumber(oneDimArr.length);

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
        js_tag: this.$store.state.betting.js_tag,
        playid: this.curPlayItem.playid,
        dataSource: this.dataSet,
        danshiExcl: this.danshiExcl,
        dataSet: oneDimArr, // 数据源,已选中的一维数组
        filteredData: twoDimArr // 已经选中的项数组 二维数组
      });
    },
    // 选择号码
    filter() {
      setTimeout(this.clickHandle);
    },
    changeList(val) {
      if (val) this.modelTitle = val.name;
      val &&
        val.submenu[0] &&
        val.submenu[0].playlist.length &&
        this.specific(val.submenu[0].playlist[0], "显示", 0, 0);

      this.wanfa = val;
    },
    specific(val, txt, p, i) {
      switch (val.playid) {
        case 2:
          this.myPlaceholder = "1 2 3";
          break;
      }
      this.danshiExcl = "";
      this.curPlayItem = val;
      // console.error(this.curPlayItem)
      this.parentWanfa = p;
      this.wanfaIndex = i;
      this.description(
        `<b>范例</b>：${val.play_fanli}<br><br><b>玩法说明</b>：${
          val.play_shuoming
        }`
      );
      this.playersChl = val.content.split("+");
      this.title = val.playname;
      this.setBetNumber(0);
      txt != "显示" && (this.show1 = !this.show1);
      this.setBallList(val.playid);
      this.setDataSet();
      this.odds.length && this.setEachDataPeilv(this.curPlayItem.playid);
    },
    setBallList(playid) {
      this.playersChl = getFields(playid, this.playersChl);
    },
    changeGameType(val) {
      if (!val) val = this.modelTitle;
      this.show1 = !this.show1;
      this.playList.map(item => {
        item.name == val && (this.player = item);
      });
    },
    // 初始化数据源
    setDataSet() {
      const columns = this.playersChl,
        _dataSet = [],
        arr = [26, 27];
      const bool = arr.includes(this.curPlayItem.playid);
      columns.forEach(item => {
        const _d = [];
        item.options &&
          item.options.forEach(x => {
            _d.push({
              name: x.name || x,
              checked: false,
              peilv: "-",
              playid: this.curPlayItem.playid,
              value: bool ? x.value : x
              // item.values && item.values.length
              //   ? item.values[i]
              //   : index * item.options.length + i //从0开始
            });
          });

        // if (item.data) {
        //   item.data.forEach(el => (el.checked = false));
        //   _d = item.data;
        // }

        _dataSet.push({
          name: item.name,
          data: _d
        });
        // _dataSet.push(Object.assign({},item));
      });
      this.dataSet = _dataSet;
    },
    ...mapActions([
      "description",
      "playSwitch",
      "setBetNumber",
      "setBetOdd",
      "setBetOdds",
      "setBetUOdds",
      "setPlayConfig",
      "clearCart",
      "setBetData",
      "showOfficial"
    ])
  },
  watch: {
    danshiExcl(val) {
      this.zhushu = 0;
      this.danshiZhushuCalc(val);
    },
    async "$route.params"(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === "3d" &&
        oldVal &&
        (oldVal.js_tag && oldVal.js_tag === "3d")
      ) {
        // const _playItem = this.curPlayItem;
        this.setOdds();
        this.clearBalls();
        this.setBetNumber(0);
        this.setBetData(0);
        this.clearCart();
        if (newVal.isHome) {
          await this.getData(this.$route.params.js_tag);
        }
      }
    },
    show1(val) {
      val == false && (this.heights = "0px");
    },
    switch() {
      // this.switchs = val
      if (this.isFromBetHistory) return;
      if (this.switchs == "双面玩法") {
        this.changeList(this.shuangmianList[0], 0);
      } else {
        this.changeList(this.guanfangList[0], 0);
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
    }
  },
  computed: {
    text() {
      return this.$route.params;
    },
    ...mapState({
      switch: state => state.betting.switch,
      // zhushu: state => state.betting.betNumber,
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber
    }),
    switchs() {
      return this.switch;
    },
    getIsShowSinglePeilv() {
      if (this.peilvs.length) return false;
      const playids = [3, 6, 7, 26, 27];
      return !playids.includes(this.curPlayItem.playid);
    },
    peilvIsRight() {
      return this.title === "定位胆";
    },
    isDoublePlay() {
      return this.switchs === "双面玩法";
    },
    isOfficalPlay() {
      return this.switchs === "官方玩法";
    },
    isDanshi() {
      return this.curPlayItem.playid === 2;
    }
  },
  mixins: [oddMixin]
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
