<template>
  <div class="score-popup-content">

    <!-- 主胜比分 -->
    <yd-flexbox class="match-item tcs zs-tcs">
      <p class="play-title">主胜{{getItem('TCS').name}}</p>
      <yd-flexbox-item>
        <yd-flexbox class="bet-wrap">
          <yd-flexbox-item v-for="data in TCS.slice(0,13)"
                           :key='data.k'
                           :class="['is-betting',keys.includes(oneMatch.match_id + '||TCS||' + data.k)?'selected':'']"
                           @click.native="betClick('TCS',data)"
                           :style="{width:['OW','OL'].includes(data.k)? '60%':'20%'}">
            <p>{{getItem(data.k).name || data.k}}</p>
            <p>{{data.p}}</p>
          </yd-flexbox-item>
        </yd-flexbox>
      </yd-flexbox-item>
    </yd-flexbox>

    <!-- 平比分 -->
    <yd-flexbox class="match-item tcs p-tcs">
      <p class="play-title">平{{getItem('TCS').name}}</p>
      <yd-flexbox-item>
        <yd-flexbox class="bet-wrap">
          <yd-flexbox-item v-for="data in TCS.slice(13,18)"
                           :key='data.k'
                           :class="['is-betting',keys.includes(oneMatch.match_id + '||TCS||' + data.k)?'selected':'']"
                           @click.native="betClick('TCS',data)"
                           :style="{width:['OW','OL'].includes(data.k)? '60%':'20%'}">
            <p>{{getItem(data.k).name || data.k}}</p>
            <p>{{data.p}}</p>
          </yd-flexbox-item>
        </yd-flexbox>
      </yd-flexbox-item>
    </yd-flexbox>

    <!-- 客胜比分 -->
    <yd-flexbox class="match-item tcs ks-tcs">
      <p class="play-title">客胜{{getItem('TCS').name}}</p>
      <yd-flexbox-item>
        <yd-flexbox class="bet-wrap">
          <yd-flexbox-item v-for="data in TCS.slice(18,31)"
                           :key='data.k'
                           :class="['is-betting',keys.includes(oneMatch.match_id + '||TCS||' + data.k)?'selected':'']"
                           @click.native="betClick('TCS',data)"
                           :style="{width:['OW','OL'].includes(data.k)? '60%':'20%'}">
            <p>{{getItem(data.k).name || data.k}}</p>
            <p>{{data.p}}</p>
          </yd-flexbox-item>
        </yd-flexbox>
      </yd-flexbox-item>
    </yd-flexbox>

  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "score-popup-content",
  components: {},
  props: ["oneMatch", "is_dg", "updateField", "getItem", "keys"],
  data() {
    return {};
  },
  computed: {
    ...mapState("match", ["selectedKeys", "bet_obj"]),
    bet_data() {
      return this.oneMatch.bet_data || {};
    },
    TCS() {
      const hcwdl =
        (this.bet_data.TCS && this.bet_data.TCS.filter(el => el.p)) || [];
      return hcwdl.slice(0, 31);
    }
  },
  watch: {},
  activated() {},
  methods: {
    // ...mapActions('match', ['updateField']),
    betClick(gameKey, { k, p }) {
      if (!p) return;
      const selectedKey = this.oneMatch.match_id + "||" + gameKey + "||" + k;
      const idx = this.keys.indexOf(selectedKey);
      if (idx === -1) {
        this.keys.push(selectedKey);
        // 保存下注数据
        const bet_obj = Object.assign({}, this.bet_obj);
        bet_obj[selectedKey] = {
          match_id: this.oneMatch.match_id,
          play_method: gameKey,
          k,
          p,
          is_dg: ~~this.is_dg
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
.score-popup-content {
  .play-title {
    width: 1.6rem;
    font-size: 0.9rem;
    color: #ffffff;
    background-color: #6fbdbf;
  }
  .match-item {
    border: 1px solid #dddddd;
    margin-bottom: 0.7rem;
  }
  .match-item:nth-child(even) .play-title {
    background-color: #71b081;
  }

  .tcs {
    &.zs-tcs .play-title,
    &.ks-tcs .play-title {
      height: 9rem;
      padding-top: 1.6rem;
    }
    &.p-tcs .play-title {
      height: 3rem;
      line-height: 0.9rem;
      padding-top: 0.2rem;
    }

    .is-betting {
      height: 3rem;
      padding-top: 0.3rem;
    }
    &.zs-tcs .is-betting:nth-child(-n + 10),
    &.ks-tcs .is-betting:nth-child(-n + 10) {
      border-bottom: 1px solid #dddddd;
    }

    .bet-wrap {
      width: 100%;
      flex-wrap: wrap;
      .yd-flexbox-item {
        flex: auto;
      }
    }
  }

  .is-betting {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      border-right: 1px solid #dddddd;
    }
  }
}
</style>
