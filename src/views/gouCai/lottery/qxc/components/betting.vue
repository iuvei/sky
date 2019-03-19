<template>
  <div class="betting">
    <sidebar v-if="!isOffical"
             :menuList="shuangmianList"
             @changeList="changeList"></sidebar>
    <double-bet-area :curPlayItem="curPlayItem"
                     :playList="playList"
                     :dataSet="dataSet"
                     v-if="!isOffical"
                     @chooseBall="clickBall"
                     @changePlay="changeGameType"></double-bet-area>
    <bet-area :curPlayItem="curPlayItem"
              :dataSet="dataSet"
              v-if="isOffical"
              @chooseBall="clickBall"></bet-area>
    <modal :player="curMenu"
           @clickMenu="specific"
           :show="showModal"
           @close="closeModal"></modal>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

import { RenderTypes } from "~/js/touzhu/commonTypes";
import api from "../../../../../../api/betting";
import oddMixin from "../../oddMixin";
import randomUtil from "~/js/touzhu/touzhu.random.danshi";
import danshiUtil from "~/js/touzhu/danshi.util";
import betArea from "../../../components/betArea";
import doubleBetArea from "./betArea";
import sidebar from "../../../components/sideBar";
import modal from "./modal";
import { getField } from "./field.js";
import calc from "./calc.js";
import getDwdArr from "~/js/touzhu/util";

export default {
  name: "qxc_betting",
  props: ["routeList"],
  components: {
    sidebar,
    doubleBetArea,
    betArea,
    modal
  },
  data() {
    return {
      curMenu: null,
      playList: Array,
      guanfangList: [],
      shuangmianList: [],
      showModal: false,
      player: {},
      playersChl: {},
      switchs: this.$route.params.play_type ? "双面玩法" : "官方玩法",
      peilv: "",
      peilvs: [],
      zhushu: 0,
      curPlayItem: {},
      dataSet: [],
      playid: 0,
      odds: []
    };
  },
  mounted() {
    this.getData(this.$route.params.js_tag);
  },
  activated() {
    if (this.$route.params.isHome) {
      this.getData(this.$route.params.js_tag);
    }
    this.zhushu = 0;
    this.clearBalls();
    this.setOdds();
  },
  deactivated() {},
  methods: {
    closeModal() {
      this.showModal = !this.showModal;
    },
    async getData(tag) {
      const playConfig = await api.getGamePlayConfig(tag);
      if (!playConfig.length) {
        this.$dialog.toast({ mes: "当前彩种已关闭" });
        return;
      }
      if (playConfig && Array.isArray(playConfig)) {
        this.playList = playConfig;
        this.setPlayConfig(playConfig);
        this.guanfangList = playConfig.filter(x => x.showofficial === 0);
        this.shuangmianList = playConfig.filter(x => x.showofficial === 1);

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
    filter() {},

    changeList(val) {
      // 添加类名
      if (val) {
        this.specific(val.submenu[0].playlist[0], 0, 0);
      }
    },
    specific(val) {
      this.curPlayItem = val;
      // 初始化选球数组
      this.zhushu = 0;
      this.setBetNumber(0);
      this.playersChl = getField(val);
      this.setDataSet();
      this.setBetData({});
      this.odds.length && this.setEachDataPeilv(val.playid);
      this.description(
        `<b>范例</b>：${val.play_fanli}<br><br><b>玩法说明</b>：${
          val.play_shuoming
        }`
      );
    },
    changeGameType(val) {
      this.showModal = !this.showModal;
      this.player = this.playList.find(x => x.name === val);
    },
    clearBalls() {
      this.zhushu = 0;
      this.setBetNumber(0);
      this.$refs.ballOptions &&
        this.$refs.ballOptions.forEach(item => {
          const nodes = item.childNodes;
          for (let i = 0, len = nodes.length; i < len; i++) {
            nodes[i].classList.remove("choosed");
          }
        });
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(x => {
          x.data.forEach(y => (y.checked = false));
        });
      }
    },
    // 初始化数据源
    setDataSet() {
      const columns = this.playersChl;
      const _dataSet = [];
      columns.forEach((item, index) => {
        const _d = [];
        const list = item.options;

        list.forEach((x, i) => {
          let val = !isNaN(x)
            ? x
            : item.options
              ? index * item.options.length + i
              : index + i;
          // console.log(item.options)
          if (item.options.includes("大") && item.options.includes("小")) {
            val = i;
          }
          _d.push({
            name: x,
            checked: false,
            peilv: "-",
            playid: this.curPlayItem.playid,
            value: val // 从0开始
          });
        });
        _dataSet.push({
          name: typeof item === "string" ? item : item.name,
          data: _d
        });
      });
      this.dataSet = _dataSet;
    },
    clickBall() {
      const _this = this;
      setTimeout(() => {
        // _this.filter(row, item)
        _this.clickHandle();
      }, 0);
    },
    calcZhushu(playid, singleRow, mutilRow) {
      // 一定位(类似定位胆)
      if ([1, 2, 3, 4, 8].includes(playid)) {
        mutilRow = getDwdArr(mutilRow).filter(x => x.length);
        this.zhushu = calc(playid, mutilRow);
      } else if ([5, 6].includes(playid)) {
        // 二字现  三字现
        this.zhushu = calc(playid, singleRow);
      } else if ([7].includes(playid)) {
        this.zhushu = calc(playid, singleRow);
      } else if ([9, 10, 11, 12].includes(playid)) {
        this.zhushu = calc(playid, mutilRow);
      }
    },
    // 双面玩法
    clickHandle() {
      const oneDimArr = [],
        twoDimArr = [],
        oneDimValuesArr = [],
        twoDimNamesArr = [],
        towDimValuesArr = [];
      let formatShowStr = "";
      // const yiweiArr = [];
      let peilvType = RenderTypes.MUTI_ROW_SINGLE_PEILV;

      this.dataSet.forEach(item => {
        const filteredData = item.data.filter(x => x.checked);
        filteredData.forEach(y => {
          oneDimArr.push(JSON.parse(JSON.stringify(y)));
          oneDimValuesArr.push(y.value);
        });
        filteredData.length &&
          twoDimArr.push({ name: item.name, data: filteredData });
        // oneDimValuesArr.push(
        //   filteredData.map(x => x.name.toString().replace(/\s/g, '')).join('|')
        // )
        towDimValuesArr.push(
          filteredData.map(x => x.value.toString().replace(/\s/g, "")).join("|")
        );

        const filters = filteredData.map(x =>
          x.name.toString().replace(/\s/g, "")
        );
        twoDimNamesArr.push(filters.join("|"));
      });

      this.calcZhushu(
        this.curPlayItem.playid,
        oneDimValuesArr,
        towDimValuesArr
      );

      // console.log('注数：', this.zhushu)

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

      if ([1, 2, 3, 4, 8].includes(this.curPlayItem.playid)) {
        peilvType = RenderTypes.DWD;
      } else if ([7].includes(this.curPlayItem.playid)) {
        peilvType = RenderTypes.MUTI_ROW_MUTI_PEILV;
      } else if ([9, 10, 11, 12].includes(this.curPlayItem.playid)) {
        peilvType = RenderTypes.MUTI_ROW_SINGLE_PEILV;
      } else {
        peilvType = RenderTypes.SINGLE_ROW_SINGLE_PEILV;
      }

      this.setBetData({
        type: this.switchs === "双面玩法" ? 1 : 0, // 1为双面玩法,0为官方玩法
        peilv: this.peilv,
        peilvType, // 0 为单赔率,1为多赔率
        formatValueStr:
          peilvType == 0 ? twoDimNamesArr.join(" ") : oneDimValuesArr.join(" "),
        arr: twoDimNamesArr,
        arr2: towDimValuesArr,
        formatShowStr,
        dwdValuesArr: [1, 2, 3, 4, 8].includes(this.curPlayItem.playid)
          ? getDwdArr(towDimValuesArr)
          : "", // 定位胆专用取值
        wanfa: this.curPlayItem.wanfa || this.curPlayItem.playname,
        zhushu: this.zhushu, // 注数
        gameid: this.$route.params.lotter_id,
        playid: this.curPlayItem.playid,
        js_tag: this.$store.state.betting.js_tag,
        danshiExcl: "", // 单式专用
        dataSet: oneDimArr, // 数据源,已选中的一维数组
        filteredData: twoDimArr, // 已经选中的项数组 二维数组
        dataSource: this.dataSet
      });
    },
    ...mapActions([
      "description",
      "playSwitch",
      "setBetNumber",
      "setBetOdds",
      "setBetUOdds",
      "setBetOdd",
      "setBetData",
      "clearCart",
      "showOfficial",
      "setPlayConfig"
    ])
  },
  watch: {
    async "$route.params"(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === "qxc" &&
        oldVal &&
        oldVal.js_tag &&
        oldVal.js_tag === "qxc"
      ) {
        const _playItem = this.curPlayItem;
        this.clearBalls();
        this.setOdds();
        this.setBetNumber(0);
        this.clearCart();
        this.setBetData({});
        if (newVal.isHome) {
          this.getData(this.$route.params.js_tag);
          this.findItemByWanfa(_playItem.wanfa);
        }
      }
    },
    showModal(val) {
      val == false;
    },
    switch(val) {
      this.switchs = val;
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
            this.$route.params.js_tag,
            this.curPlayItem.playid
          ) &&
          val > 0
        ) {
          const dataSet = randomUtil.createDataSource(
            this.$route.params.js_tag,
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
    ...mapState({
      switch: state => state.betting.switch
    }),
    isDoublePlay() {
      // if (this.curPlayItem && this.curPlayItem.playid) {
      //   return [128, 129, 131, 41].includes(this.curPlayItem.playid)
      // } else {
      //   return false
      // }
      return false;
    },
    // 判断是否是官方玩法
    isOffical() {
      return this.switchs === "官方玩法";
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
  width: 100%;
}
</style>
<style  lang="scss">
@import "../../../../../css/resources.scss";
.qxc .bet-area .balls .ball {
  margin: 0.5rem poTorem(13px) !important;
}
</style>

