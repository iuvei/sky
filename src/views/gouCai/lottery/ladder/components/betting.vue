<template>
  <!-- 投注界面 -->
  <div class="ladder-betting">
    <div class="one-game">
      <div class="wanfa-title"
           style="display:none">双面</div>
      <yd-flexbox>
        <yd-flexbox-item>号码</yd-flexbox-item>
        <yd-flexbox-item>赔率</yd-flexbox-item>
        <yd-flexbox-item>号码</yd-flexbox-item>
        <yd-flexbox-item>赔率</yd-flexbox-item>
      </yd-flexbox>

      <yd-flexbox>
        <yd-flexbox-item>
          <yd-badge bgcolor="#dcdcdc"
                    color="#333">左</yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:selected.includes(keys[0])}]"
                         @click.native="selectClick(keys[0])">
          {{peilvs[0]}}
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-badge bgcolor="#dcdcdc"
                    color="#333">右</yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:selected.includes(keys[1])}]"
                         @click.native="selectClick(keys[1])">
          {{peilvs[1]}}
        </yd-flexbox-item>
      </yd-flexbox>

      <yd-flexbox>
        <yd-flexbox-item>
          <yd-badge bgcolor="#626262"
                    color="#FFF">3</yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:selected.includes(keys[2])}]"
                         @click.native="selectClick(keys[2])">
          {{peilvs[2]}}
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-badge bgcolor="#626262"
                    color="#FFF">4</yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:selected.includes(keys[3])}]"
                         @click.native="selectClick(keys[3])">
          {{peilvs[3]}}
        </yd-flexbox-item>
      </yd-flexbox>

      <yd-flexbox>
        <yd-flexbox-item>
          <yd-badge bgcolor="#1AA1E7"
                    color="#FFF">单</yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:selected.includes(keys[4])}]"
                         @click.native="selectClick(keys[4])">
          {{peilvs[4]}}
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-badge bgcolor="#E33B3F"
                    color="#FFF">双</yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:selected.includes(keys[5])}]"
                         @click.native="selectClick(keys[5])">
          {{peilvs[5]}}
        </yd-flexbox-item>
      </yd-flexbox>

    </div>

    <div class="one-game">
      <div class="wanfa-title">终点X梯子</div>
      <yd-flexbox>
        <yd-flexbox-item>号码</yd-flexbox-item>
        <yd-flexbox-item>赔率</yd-flexbox-item>
        <yd-flexbox-item>号码</yd-flexbox-item>
        <yd-flexbox-item>赔率</yd-flexbox-item>
      </yd-flexbox>

      <yd-flexbox>
        <yd-flexbox-item>
          <yd-badge bgcolor="#1AA1E7"
                    color="#FFF">
            单
            <yd-badge bgcolor="#626262"
                      color="#FFF"
                      style="right:-.5rem;top:0;">3</yd-badge>
          </yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:selected.includes(keys[6])}]"
                         @click.native="selectClick(keys[6])">
          {{peilvs[6]}}
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-badge bgcolor="#E33B3F"
                    color="#FFF">
            双
            <yd-badge bgcolor="#626262"
                      color="#FFF"
                      style="left:-.5rem;top:0;">3</yd-badge>
          </yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:selected.includes(keys[7])}]"
                         @click.native="selectClick(keys[7])">
          {{peilvs[7]}}
        </yd-flexbox-item>
      </yd-flexbox>

      <yd-flexbox>
        <yd-flexbox-item>
          <yd-badge bgcolor="#1AA1E7"
                    color="#FFF">
            单
            <yd-badge bgcolor="#626262"
                      color="#FFF"
                      style="left:-.5rem;top:0;">4</yd-badge>
          </yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:selected.includes(keys[8])}]"
                         @click.native="selectClick(keys[8])">
          {{peilvs[8]}}
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-badge bgcolor="#E33B3F"
                    color="#FFF">
            双
            <yd-badge bgcolor="#626262"
                      color="#FFF"
                      style="right:-.5rem;top:0;">4</yd-badge>
          </yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:selected.includes(keys[9])}]"
                         @click.native="selectClick(keys[9])">
          {{peilvs[9]}}
        </yd-flexbox-item>
      </yd-flexbox>
    </div>

    <!-- 购物车 -->
    <div @click="clickCart"
         style="display:flex"
         v-drag>
      <div class="ladder_drag">
        <i class="spots"
           v-show="cartNumber>0">
          {{cartNumber > 99 ? '99+' : cartNumber}}
        </i>
      </div>
    </div>

  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import api from "~/../api/betting";
import oddMixin from "../../oddMixin";
import { resetRouteParams } from "~/js/util";
import { RenderTypes } from "~/js/touzhu/commonTypes";

const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const labels = ["左", "右", "三", "四", "单", "双", "单3", "双3", "单4", "双4"];
export default {
  name: "ladder_betting",
  data() {
    return {
      playid: 1,
      routeList: {},
      keys
    };
  },
  computed: {
    ...mapState({
      // unLoginOdds: state => state.betting.unLoginOdds,
      // odd: state => state.betting.odd,
      js_tag: state => state.betting.js_tag,
      odds: state => state.betting.odds,
      tzSelected: state => state.betting.tzSelected,
      cart: state => state.betting.cart,
      cartNumber: state => state.betting.cartNumber
    }),
    selected: {
      get() {
        return this.tzSelected;
      },
      set(selected) {
        this.updateField({
          tzSelected: selected
        });
      }
    },
    peilvs() {
      let pl = this.odds || [];
      pl = pl.filter(el => el.playid === this.playid)[0] || {};
      pl = pl.peilv || "";
      pl = pl.split("|");

      if (!pl[0]) {
        pl = Array(keys.length).fill("-");
      }
      return pl;
    },
    dataSet() {
      return keys.map(el => ({
        name: labels[el],
        value: el,
        checked: this.tzSelected.includes(el),
        peilv: this.peilvs[el],
        playid: this.playid
      }));
    },
    selectedData() {
      return this.dataSet.filter(el => el.checked);
    },
    selectedData2() {
      const data = this.dataSet.filter(el => el.checked);
      return Object.assign([], data).map(el => ({
        name: el.value < 6 ? "双面" : "终点X梯子",
        data: [el]
      }));
    },
    dataSet2() {
      const data = this.dataSet;
      return Object.assign([], data).map(el => ({
        name: el.value < 6 ? "双面" : "终点X梯子",
        data: [el]
      }));
    }
  },
  mixins: [oddMixin],
  watch: {
    "$route.params"(newVal, oldVal) {
      if (
        newVal &&
        newVal.js_tag === "tzyx" &&
        (oldVal && oldVal.js_tag == newVal.js_tag)
      ) {
        this.routeList = newVal;
        resetRouteParams(this, "tzyx");
      }
    },
    // 下注
    tzSelected(tzSelected) {
      const sm = tzSelected.filter(el => el < 6);
      const zdx = tzSelected.filter(el => el >= 6);
      let formatedStr =
        (sm.length &&
          "双面（" +
            sm.map(x => `<span style="color:red">${labels[x]}</span>`) +
            ")") ||
        "";
      formatedStr +=
        (zdx.length &&
          "终点X梯子（" +
            zdx.map(x => `<span style="color:red">${labels[x]}</span>`) +
            ")") ||
        "";
      this.setBetNumber(tzSelected.length);
      if (this.js_tag === "tzyx") {
        this.setBetData({
          type: 1, // 双面玩法,0为官方玩法
          // peilv: this.peilv,
          peilvType: RenderTypes.SINGLE_ROW_MUTI_PEILV, // 0 为单赔率,1为多赔率
          formatedStr,
          // formatValueStr: this.selected,
          // formatShowStr: this.selected,
          wanfa: this.$store.state.betting.gameName, // 玩法
          arr: this.selectedData,
          arr2: this.selectedData2,
          zhushu: tzSelected.length, // 注数
          gameid: this.$store.state.betting.gameId,
          playid: this.playid,
          dataSet: this.selectedData, // 数据源,已选中的一维数组
          dataSource: this.dataSet2, // 包含name data 全数据
          js_tag: this.js_tag,
          filteredData: this.selectedData2 // 已经选中的项数组 二维数组
        });
      }
    }
  },
  activated() {
    this.routeLists = this.$route.params;
    resetRouteParams(this, "tzyx");
    this.getData();
    this.setOdds();
  },
  deactivated() {},
  methods: {
    ...mapActions([
      "setBetNumber",
      "description",
      "setBetData",
      "updateField",
      "setBetOdd"
    ]),
    clickCart() {
      if (this.cart.length) {
        this.$router.push("/shopCart");
      } else {
        this.$dialog.toast({ mes: "您的购物车空空如也" });
      }
    },
    selectClick(n) {
      const idx = this.selected.indexOf(n);
      if (idx === -1) {
        this.selected.push(n);
      } else {
        this.selected.splice(idx, 1);
      }
    },
    clearBalls() {
      this.zhushu = 0;
      this.setBetNumber(0);
      this.updateField({
        tzSelected: []
      });
      this.setBetData({});
    },
    async getData(tag = this.js_tag || "tzyx") {
      let config = (await api.getGamePlayConfig(tag)) || [];
      config = (config[0] && config[0].submenu) || [];
      config = (config[0] && config[0].playlist) || [];
      config = (config[0] && config[0]) || {};
      // console.error(config);
      this.playid = config.playid;
      this.description(
        `<b>范例</b>：${config.play_fanli}<br><br><b>玩法说明</b>：${
          config.play_shuoming
        }`
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.ladder-betting {
  user-select: none;
  text-align: center;
  font-size: 1rem;
  padding: 0.7rem 0.8rem 3.6rem;
  .ladder_drag {
    position: absolute;
    bottom: 4rem;
    left: 1rem;
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
  .bet-area {
    background-color: #ffffff;
  }
  .one-game {
    margin-bottom: 0.7rem;
    background-color: #f5f5f5;
    border-radius: 0.3rem;
    border: 1px solid #dddddd;
    .wanfa-title {
      color: #313131;
      line-height: 3.1rem;
      font-size: 1.2rem;
      border-bottom: 1px solid #dddddd;
    }
    .yd-flexbox {
      line-height: 3rem;
      height: 3rem;
      &:nth-of-type(n + 3) {
        border-top: 1px solid #dddddd;
        .yd-flexbox-item:nth-child(n + 2) {
          // color: red;
          border-left: 1px solid #dddddd;
        }
      }
      .yd-flexbox-item {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        & > .yd-badge {
          position: relative;
          min-width: 2.5rem;
          min-height: 2.5rem;
          padding: 0;
          font-size: 1rem;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          .yd-badge {
            position: absolute;
            min-width: 1rem;
            min-height: 1rem;
            padding: 0;
            font-size: 0.8rem;
            display: inline-flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .yd-flexbox-item.selected {
        background-color: #e33b3f;
        color: #ffffff;
      }
    }
  }
}
</style>
