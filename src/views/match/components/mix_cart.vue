<template>
  <div class="mix-cart-bet"
       @click="popupShowClick(oneMatch)">
    <yd-flexbox class="league">
      <yd-flexbox-item>
        <h5>{{oneMatch.home_short_name}}</h5>
      </yd-flexbox-item>
      <div class="vs">
        <h5> VS </h5>
      </div>
      <yd-flexbox-item>
        <h5>{{oneMatch.visitor_short_name}}</h5>
      </yd-flexbox-item>
    </yd-flexbox>

    <div class="bet-content">
      <p v-if="!this.curBets.length">请选择投注内容</p>
      <yd-flexbox v-for="(bet,k) in groupBets"
                  :key="k"
                  class="select-content">
        <p v-if="[-1,5].includes(~~gameType)"
           class="play-method">{{getItem(k).name}}{{k==='HCWDL'?'('+oneMatch.handicap+')':''}}:</p>
        <yd-flexbox-item class="data-k">
          <span v-for="data in bet"
                :key='data.k'>{{getItem(data.k).name || data.k}} </span>
        </yd-flexbox-item>
      </yd-flexbox>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import ClickMommonBet from "./clickCommonBet";
export default {
  name: "mix-cart-bet",
  components: { ClickMommonBet },
  props: ["oneMatch", "getItem", "popupShowClick"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters("match", ["bet_data"]),
    ...mapState("match", ["gameType"]),
    // 取列表中oneMatch  根据 bet_data渲染当前选项
    curBets() {
      return this.bet_data.filter(el => el.match_id === this.oneMatch.match_id);
    },
    groupBets() {
      return this.curBets.reduce((f, c) => {
        f[c.play_method] = [...(f[c.play_method] || []), c];
        return f;
      }, {});
    }
    // 取明细字段bet_odds  按玩法分组
    // groupBets() {
    //   return this.oneMatch.bet_odds.reduce((f, c) => {
    //     f[c.play_method] = [...(f[c.play_method] || []), c]
    //     return f
    //   }, {})
    // }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.mix-cart-bet {
  .league {
    font-size: 1.2rem;
    line-height: 2.2rem;
  }
  .vs {
    width: 4rem;
  }
  .bet-content {
    padding: 0.7rem;
    background-color: #f7f7f7;
    line-height: 1.6rem;
    min-height: 3rem;
    .select-content {
      align-items: flex-start;
    }
    .play-method {
      width: 6rem;
      text-align: right;
      padding-right: 1rem;
      & ~ .data-k {
        text-align: left;
      }
    }
    .data-k {
      color: #ed0906;
    }
  }
}
</style>
