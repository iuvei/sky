<template>
  <yd-flexbox class="hcwin-bet">
    <yd-flexbox-item @click.native="betClick('HCWDL',hdata)"
                     :class="['is-betting',keys.includes(oneMatch.match_id + '||HCWDL||' + hdata.k)?'selected':'']">
      <h5>{{oneMatch.home_short_name}}
        <span :style="{color:oneMatch.handicap<0?'#4ec544':'#c71a11'}">{{oneMatch.handicap>0?'+'+oneMatch.handicap:oneMatch.handicap}}</span>
      </h5>
      <p>{{getItem(hdata.k).name+hdata.p}}</p>
    </yd-flexbox-item>

    <div @click="betClick('HCWDL',xdata)"
         :class="['vs is-betting',keys.includes(oneMatch.match_id + '||HCWDL||' + xdata.k)?'selected':'']">
      <h5> VS </h5>
      <p>{{getItem(xdata.k).name+xdata.p}}</p>
    </div>

    <yd-flexbox-item @click.native="betClick('HCWDL',vdata)"
                     :class="['is-betting',keys.includes(oneMatch.match_id + '||HCWDL||' + vdata.k)?'selected':'']">
      <h5>{{oneMatch.visitor_short_name}}</h5>
      <p>{{getItem(vdata.k).name+vdata.p}}</p>
    </yd-flexbox-item>
  </yd-flexbox>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "hcwin-bet",
  components: {},
  props: ["oneMatch", "is_dg", "getItem", "updateField"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters("match", ["matchDiff", "matchNum"]),
    ...mapState("match", ["selectedKeys", "bet_obj"]),
    // 所有选中的投注
    keys: {
      get() {
        return this.selectedKeys;
      },
      set(selectedKeys) {
        this.updateField({ selectedKeys });
      }
    },
    WDL() {
      const wdl =
        (this.oneMatch.bet_data.HCWDL &&
          this.oneMatch.bet_data.HCWDL.filter(el => el.p)) ||
        [];
      return wdl.slice(0, 3);
    },
    hdata() {
      return this.WDL.find(el => el.k === "W") || { p: "" };
    },
    xdata() {
      return this.WDL.find(el => el.k === "D") || { p: "" };
    },
    vdata() {
      return this.WDL.find(el => el.k === "L") || { p: "" };
    }
  },
  methods: {
    // 购物车中获取 is_dg
    cart_is_dg(play_method) {
      if (this.is_dg === undefined) {
        return Object.values(this.bet_obj).find(
          el =>
            el.match_id === this.oneMatch.match_id &&
            el.play_method === play_method
        ).is_dg;
      }
      return this.is_dg;
    },
    betClick(play_method, { k, p }) {
      if (!p) return;
      if (
        this.matchNum === 8 &&
        !this.matchDiff.includes(this.oneMatch.match_id + "")
      ) {
        return this.$dialog.toast({
          mes: "单次投注最多8场比赛"
        });
      }
      const selectedKey =
        this.oneMatch.match_id + "||" + play_method + "||" + k;
      const idx = this.keys.indexOf(selectedKey);
      if (idx === -1) {
        this.keys.push(selectedKey);
        // 保存下注数据
        const bet_obj = Object.assign({}, this.bet_obj);
        bet_obj[selectedKey] = {
          match_id: this.oneMatch.match_id,
          play_method,
          k,
          p,
          is_dg: ~~this.cart_is_dg(play_method)
        };
        this.updateField({ bet_obj });
      } else {
        this.keys.splice(idx, 1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.hcwin-bet {
  background-color: #ffffff;
  border: 1px solid #b6b5b5;
  line-height: 1.6rem;
  .vs {
    width: 4rem;
  }
  .is-betting {
    // height: 3rem;
    padding: 0.7rem 0;
    &:nth-child(-n + 2) {
      border-right: 1px solid #dfdbcf;
    }
    &.selected span {
      color: #ffffff !important;
    }
  }
}
</style>
