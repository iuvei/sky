<template>
  <div class="total-bet">
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

    <yd-flexbox class="bet-content">
      <yd-flexbox-item v-for="data in TG"
                       :key='data.k'
                       @click.native="betClick('TG',data)"
                       :class="['is-betting',keys.includes(oneMatch.match_id + '||TG||' + data.k)?'selected':'']">
        <span>{{data.k}}</span>
        <span style="font-size:.8rem;">{{data.p}}</span>
      </yd-flexbox-item>
    </yd-flexbox>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "total-bet",
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
    TG() {
      const wdl =
        (this.oneMatch.bet_data && this.oneMatch.bet_data.TG) ||
        Array(8).fill({});
      return wdl.slice(0, 8);
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
.total-bet {
  .league {
    font-size: 1.2rem;
    line-height: 2.2rem;
  }
  .vs {
    width: 4rem;
  }
  .bet-content {
    flex-wrap: wrap;
    background-color: #ffffff;
    border-left: 1px solid #dfdbcf;
    border-top: 1px solid #dfdbcf;
  }
  .is-betting {
    flex: auto;
    display: inline-flex;
    justify-content: space-around;
    width: 25%;
    border-right: 1px solid #dfdbcf;
    border-bottom: 1px solid #dfdbcf;
    padding: 0.7rem 0;
  }
}
</style>
