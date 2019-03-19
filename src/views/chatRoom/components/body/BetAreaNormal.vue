<template>
  <div class="bet-area"
       :class="{'disable-scroll':isDouble}">
    <p v-if="odds && odds.length === 1"
       style="text-align: center">( 赔率：{{odds[0]}})</p>
    <play-split v-if="isDouble"
                :items="dataSet"
                @clickBall="clickBall"></play-split>
    <div class="con_item"
         v-if="!isDanshi && !isDouble"
         v-for="(item, index) in dataSet"
         :key="index">
      <div class="head">
        <span class="arrow">{{setArrowTitle(item)}}</span>
        <bet-actions v-if="!isDanma(item.name) && showActions"
                     :row="item"
                     @doAction="doAction"></bet-actions>
      </div>

      <ul class="balls"
          :class="{'elex5': item.data && item.data.length === 11}">
        <li @click.stop="clickBall(item, ball)"
            v-for="(ball, ball_index) in item.data"
            :key="ball_index"
            :data-val="ball.value"
            :class="{'shift_line' : curPlayItem && curPlayItem.playid == 7 && ball_index == 5}">
          <div class="ball"
               ref="ballOptions"
               :class="[{choosed: ball.checked}]">{{ball.name}}</div>
          <div class="peilv_num"
               v-if="odds.length !== 1">{{ball.peilv}}</div>
        </li>
      </ul>
    </div>
    <!-- 单式 -->
    <div class="con_item"
         v-if="isDanshi">
      <span class="arrow">{{curPlayItem.playname}}</span>
      <div class="danshi">
        <p>{{curPlayItem.play_title}}</p>
        <textarea autofocus
                  cols="30"
                  rows="8"
                  :placeholder="'例如：' + placeholder"
                  v-model="danshiExcl"></textarea>
        <p class="caution">注意：</p>
        <p>每个号码之间请用空格隔开，每一注号码之间请用一个逗号[,]隔开</p>
      </div>
    </div>
  </div>
</template>

<script>
const playConfigMap = new Map([
  ["11x5", { name: "双面盘 牛牛 龙虎斗" }],
  ["pk10", { name: "冠亚和 双面盘 数字盘" }],
  ["ssc", { name: "双面盘 龙虎斗" }],
  ["pcdd", { name: "混合" }],
  [
    "qxc",
    {
      name: "和值组选 定位大小单双"
    }
  ]
]);

import danshiUtil from "~/js/touzhu/danshi.util";
import PlaySplit from "./PlaySplit";
import BetActions from "./BetActions";
import mixin from "./betAreaMixin";

export default {
  name: "chat_room_bet_area_normal",

  mixins: [mixin],

  props: ["curPlayItem", "dataSet", "placeholder", "odds", "instance", "value"],

  components: {
    PlaySplit,
    BetActions
  },

  model: {
    prop: "value",
    event: "input"
  },

  data() {
    return {
      // myPlaceholder: "",
      danshiExcl: this.value,
      peilvs: this.odds,
      peilv: this.odds.length === 1 ? this.odds[0] : "-"
    };
  },

  methods: {
    // 选择球
    clickBall(row, ball) {
      ball.checked = !ball.checked;
      this.linkToFastSelect(row);
      if (this.isDantuo) {
        this.$emit("clickBall", row, ball, this.afterClickBall);
      } else this.$emit("clickBall", row, ball);
    },
    // 选球之后
    afterClickBall(name) {
      if (name === this.dataSet[0].name) {
        this.linkToFastSelect(this.dataSet[1]);
      }
    }
  },

  computed: {
    isDanshi() {
      if (this.$route.name !== "liaotianshi") return false;
      if (!this.curPlayItem) return false;
      if (!this.js_tag || !this.curPlayItem.playid) return false;
      return danshiUtil.isSingleMode(this.js_tag, this.curPlayItem.playid);
    },

    // 判断是否是双面盘
    isDouble() {
      if (!this.curPlayItem) return false;
      const obj = playConfigMap.get(this.js_tag);
      if (obj) return obj.name.includes(this.curPlayItem.playname);

      return false;
    }
  },
  beforeMount() {
    this.setFastSelect(this.dataSet);
  },
  activated() {
    this.setFastSelect(this.dataSet);
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.bet-area {
  height: calc(97.5vw - 6rem);
  // height: 100%;
  background: rgb(243, 243, 243);
  width: 100%;
  padding: 0.85rem;
  flex: 1;
  display: block;
  overflow-y: scroll;
  &.disable-scroll {
    overflow-y: hidden;
  }
  .head {
    @include center;
    justify-content: flex-start;
  }
  .arrow {
    @include center;
    background: url(~img/goucai/morenzhuangtai.png) no-repeat;
    width: 26%;
    height: poTorem(50px);
    background-size: contain;
    background-position: center;
    font-size: poTorem(15px);
    color: #666;
    margin-right: poTorem(10px);
  }
  .balls {
    @include center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 4px 0;
    &.elex5 {
      justify-content: flex-start;
      .ball {
        margin: poTorem(8px) poTorem(10px);
      }
    }
    .ball {
      width: 3rem;
      height: 3rem;
      margin: poTorem(8px) poTorem(13px);
      background: #fff;
      border-radius: 50%;
      border: 1px solid #999;
      color: #e33939;
      font-size: 1.4rem;
      line-height: 3rem;
      text-align: center;
      transition: all 0.2s ease;
      &.choosed {
        background: #e33939;
        border: 1px solid #e33939;
        color: #fff;
      }
    }
    .peilv_num {
      text-align: center;
      padding-top: 0.5rem;
      color: #878787;
    }
  }
  .danshi {
    color: #666;
    font-size: 1rem;
    .caution {
      color: #ff7d32;
    }
    textarea {
      border-radius: 4px;
      border: 1px solid #a0a0a0;
      width: 100%;
      margin: 10px 0;
      padding: poTorem(6px);
    }
  }
}
</style>
