<template>
  <!-- 投注界面 -->
  <div class="betting">

    <sidebar :menuList="playList"
             @changeList="changeList"></sidebar>

    <div class="betting_right">
      <span :class="[{'by_right':[5,7,10].includes(curPlayItem.playid)},'odds']"
            v-show="peilvIsShow">(赔率：{{peilv.length > 0 ? peilv:'-'}})</span>
      <div class="betting_con">
        <div class="con_item"
             v-for="(item,index) in dataSet"
             :key="index">
          <span>{{item.name}}</span>
          <ul :class="{sbth:[5,10].includes(curPlayItem.playid)}">
            <li @click.stop="filter(item, items)"
                v-for="(items, indexs) in item.data"
                :key="indexs"
                style="position:relative"
                :data-val="items.value">
              <div ref="ballOptions"
                   :class="[{small_box:typeNum==0},{big_box: typeNum==1},{max_box: items.name=='三同号通选'}, {choosed:items.checked}]">{{items.name}}</div>
              <div class="peilv_num"
                   v-if="peilvs.length">{{items.peilv}}</div>
              <label for=""><input type="checkbox"
                       v-model="items.checked"></label>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import {
  Calc_Zhushu_Obj,
  getCalcFuncByPlayID,
  getRenderTypeByPlayID
} from "~/js/touzhu/touzhu.k3.calc";
import { RenderTypes } from "~/js/touzhu/commonTypes";
import api from "../../../../../../api/betting";
import oddMixin from "../../oddMixin";
import getFields from "./fields";
import sidebar from "../../../components/sideBar";
const zhushuFunc = new Calc_Zhushu_Obj();
export default {
  name: "k3_betting",
  props: ["routeList"],
  data() {
    return {
      dataSet: [],
      curPlayItem: {},
      playList: Array,
      title: "直选复式",
      show1: false,
      peilv: [],
      player: {},
      playersChl: {},
      peilvs: [],

      zhushu: 0,
      typeNum: 0, // 0:纯数字选球 1:小方块 2:中方块 3:大方块
      odds: []
    };
  },
  components: {
    sidebar
  },
  activated() {
    if (this.$route.params.isHome) {
      this.getData(this.$route.params.js_tag);
    }
    this.clearBalls();
    this.zhushu = 0;
    this.setOdds();
  },
  deactivated() {
    if (this.dataSet && this.dataSet.length) {
      this.dataSet.forEach(item => {
        item.data.forEach(x => (x.checked = false));
      });
    }
  },
  methods: {
    clearBalls() {
      this.zhushu = 0;
      if (this.dataSet && this.dataSet.length) {
        this.dataSet.forEach(item => {
          item.data.forEach(x => (x.checked = false));
        });
      }
    },
    clickCart() {
      if (this.cart.length) {
        this.$router.push("/shopCart");
      } else {
        this.$dialog.toast({ mes: "您的购物车空空如也" });
      }
    },
    async getData(tag) {
      const configs = await api.getGamePlayConfig(tag);
      if (configs && configs != 0) {
        this.playList = configs;
        this.player = configs;
        if (this.isFromBetHistory) this.findItemByWanfa(this.historeyWanfa);
        else this.changeList(configs[0], 0);
      }
    },
    // 号码选择互斥
    mutex(name, curItem) {
      if ([5, 10].includes(curItem.playid)) {
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
          if (curItem.playid == 5 && arr1.length > 2) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          }

          if (curItem.playid == 10 && arr1.length > 1) {
            arr1.filter(x => x.name != curItem.name)[0].checked = false;
          }
        }
        // 如果是第二行点击，则第一行球消失
        if (name == this.dataSet[1].name) {
          arr2.forEach(item => {
            const index = arr1.findIndex(x => x.name === item.name);
            if (index >= 0) arr1[index].checked = !arr1[index].checked;
          });
          // 拖胆最多只能选择5个
          if (arr2.length > 5) {
            if (curItem.checked) {
              if (curItem.name == 1) arr2[1].checked = false;
              else arr2[0].checked = false;
            }
          }
        }
      }
    },
    // 计算注数
    calcZhushu(playid, oneDimValuesArr, twoDimNamesArr) {
      console.log(oneDimValuesArr);
      console.log(twoDimNamesArr);
      const func = getCalcFuncByPlayID(playid);
      if (
        [1, 15, 7, 14].includes(playid)
        // "和值" "三同号" "二同号" "两面玩法"
      ) {
        this.zhushu = zhushuFunc[func](oneDimValuesArr);
      } else {
        this.zhushu = zhushuFunc[func](twoDimNamesArr);
      }
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
      this.calcZhushu(this.curPlayItem.playid, oneDimValuesArr, twoDimNamesArr);

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

      // 快三统一是双面玩法
      this.setBetData({
        type: 0, // 双面玩法,0为官方玩法
        peilv: this.peilv,
        peilvType, // 0 为单赔率,1为多赔率
        formatValueStr:
          peilvType == 0 ? twoDimNamesArr.join(" ") : oneDimValuesArr.join(" "),
        arr: twoDimNamesArr,
        arr2: towDimValuesArr,
        formatShowStr,
        wanfa: this.title, // 玩法
        zhushu: this.zhushu, // 注数
        gameid: this.$route.params.lotter_id,
        playid: this.curPlayItem.playid,
        dataSet: oneDimArr, // 数据源,已选中的一维数组
        dataSource: this.dataSet,
        js_tag: this.$store.state.betting.js_tag,
        filteredData: twoDimArr // 已经选中的项数组 二维数组
      });
    },
    // 选择号码
    filter(item, val2) {
      val2.checked = !val2.checked;
      this.mutex(item.name, val2);
      setTimeout(this.clickHandle);
    },
    changeList(val) {
      // 添加类名
      this.curPlayItem = val;
      // this.title = val.playname

      this.specific(
        val.submenu[0].playlist[0],
        "显示",
        0,
        0,
        val.submenu[0].name
      );
      this.setBetData({});
    },
    specific(val, txt) {
      this.curPlayItem = val;
      // 初始化选球数组
      this.setBetNumber(0);
      // this.santong = false
      this.title = val.wanfa; // 设置玩法的第二层名称，由此判断选球方式
      this.description(
        `<b>范例</b>：${val.play_fanli}<br><br><b>玩法说明</b>：${
          val.play_shuoming
        }`
      );
      this.setBallList(val.playid);
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
    // 初始化数据源
    setDataSet() {
      const columns = this.playersChl;
      const _dataSet = [];
      columns.forEach((item, index) => {
        const _d = [];
        item.option.forEach((x, i) => {
          _d.push({
            name: x,
            checked: false,
            peilv: "-",
            playid: this.curPlayItem.playid,
            value:
              item.values && item.values.length
                ? item.values[i]
                : index * item.option.length + i // 从0开始
          });
        });
        _dataSet.push({
          name: item.name,
          data: _d
        });
      });
      this.dataSet = _dataSet;
    },
    setBallList(playid) {
      const template = getFields(playid);
      if (template) {
        if (template.hasOwnProperty("typeNum")) this.typeNum = template.typeNum;
        this.playersChl = template.template;
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
      "clearCart",
      "setBetData"
    ])
  },
  watch: {
    zhushu(val) {
      this.setBetNumber(val);
    },
    "$route.params"(newVal, oldVal) {
      const flag =
        newVal &&
        newVal.js_tag === "k3" &&
        oldVal &&
        (oldVal.js_tag && oldVal.js_tag === "k3");
      if (flag) {
        this.clearBalls();
        this.setOdds();
        this.setBetNumber(0);
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
      odds: state => state.betting.odds,
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber
    }),
    peilvIsShow() {
      return [5, 7, 10].includes(this.curPlayItem.playid);
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

  .betting_right {
    // max-height: poTorem(517px);
    flex: 1;
    display: block;
    overflow: scroll;
    .select {
      @include center;
      width: poTorem(240px);
      height: poTorem(39px);
      border: poTorem(1px) solid #eaeaea;
      border-radius: poTorem(5px);
      font-size: poTorem(16px);
      color: #434343;
      position: relative;
      margin: 0 auto;
      margin-top: poTorem(15px);
      .icon {
        position: absolute;
        background: url(~img/goucai/sanjiao.png) no-repeat;
        background-size: contain;
        width: poTorem(29px);
        height: poTorem(14px);
        right: 0px;
      }
    }
    .odds {
      color: #535353;
      margin: poTorem(10px) 0 0px 0;
      font-size: poTorem(14px);
      display: block;
      text-align: center;
    }
    .by_right {
      text-align: right;
    }
    .betting_right_bottom {
      position: fixed;
      bottom: poTorem(65px);
      width: 100%;
    }
  }
  .betting_con {
    @include column;
    width: 100%;
    .con_item {
      width: 100%;
      @include column;
      border-bottom: poTorem(1px) solid #dbdbdb;
      padding: 0 poTorem(10px);
      margin-top: poTorem(5px);

      &:last-child {
        border-bottom: none;
      }
      > span {
        align-self: flex-start;
        color: #707070;
        font-size: poTorem(16px);
      }
      ul {
        @include around;
        flex-wrap: wrap;
        padding: poTorem(20px) 0;
        &.sbth {
          justify-content: flex-start;
          padding: poTorem(20px) 0 0 1rem;
        }
        li {
          outline: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          @include column;
          padding: poTorem(5px);
          color: #707070;
          > label {
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            top: 0;
            left: 0;
            input {
              opacity: 0;
              width: 0;
              height: 0;
              border: none;
            }
          }
          .big_box,
          .small_box,
          .max_box {
            width: poTorem(72px);
            height: poTorem(32px);
            border: poTorem(1px) solid #dbdbdb;
            border-radius: poTorem(5px);
            line-height: poTorem(30px);
            text-align: center;
            font-size: poTorem(20px);
            font-weight: 900;
            color: #e33939;
            transition: background-color 0.2s ease;
          }
          div {
            text-align: center;
          }
          .small_box {
            width: poTorem(53px);
            height: poTorem(32px);
          }
          .max_box {
            width: poTorem(120px);
            height: poTorem(36px);
            line-height: poTorem(36px);
          }
          > .choosed {
            background-color: #e33939;
            color: #fff;
            border: none;
          }
          .peilv_num {
            padding-top: 0.5rem;
            font-weight: 900;
            color: #535353;
          }
        }
      }
    }
  }
}
</style>
