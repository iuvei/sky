<template>
  <div class="mix-popup-content">
    <!-- 胜负平 -->
    <yd-flexbox v-if="WDL_show"
                class="match-item wdl">
      <p class="play-title">{{getItem('WDL').name}}</p>
      <yd-flexbox-item v-for="data in WDL"
                       :key='data.k'
                       :class="['is-betting',keys.includes(oneMatch.match_id + '||WDL||' + data.k)?'selected':'']"
                       @click.native="betClick('WDL',data)">
        <p>{{getItem(data.k).name}}</p>
        <p>{{data.p}}</p>
      </yd-flexbox-item>
    </yd-flexbox>

    <!-- 让球 -->
    <yd-flexbox v-if="HCWDL_show"
                class="match-item hcwdl">
      <p class="play-title">{{getItem('HCWDL').name}}</p>
      <yd-flexbox-item align='bottom'
                       class="hc-bet-wrap">
        <yd-flexbox direction="vertical">
          <yd-flexbox-item>
            <yd-flexbox>
              <yd-flexbox-item v-for="data in HCWDL"
                               :key='data.k'
                               :class="['is-betting',keys.includes(oneMatch.match_id + '||HCWDL||' + data.k)?'selected':'']"
                               @click.native="betClick('HCWDL',data)">
                <p>{{getItem(data.k).name}}</p>
                <p>{{data.p}}</p>
              </yd-flexbox-item>
            </yd-flexbox>
          </yd-flexbox-item>
          <p class="hc-tip">让球胜负平（主队
            <span>{{oneMatch.handicap}}</span>）</p>
        </yd-flexbox>
      </yd-flexbox-item>
    </yd-flexbox>

    <!-- 比分 -->
    <yd-flexbox v-if="TCS_show"
                class="match-item tcs">
      <p class="play-title">{{getItem('TCS').name}}</p>
      <yd-flexbox-item>
        <yd-flexbox class="bet-wrap">
          <yd-flexbox-item v-for="data in TCS"
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

    <!-- 总进球 -->
    <yd-flexbox v-if="TG_show"
                class="match-item tg">
      <p class="play-title">{{getItem('TG').name}}</p>
      <yd-flexbox-item>
        <yd-flexbox class="bet-wrap">
          <yd-flexbox-item v-for="data in TG"
                           :key='data.k'
                           :class="['is-betting',keys.includes(oneMatch.match_id + '||TG||' + data.k)?'selected':'']"
                           @click.native="betClick('TG',data)">
            <p>{{getItem(data.k).name || data.k}}</p>
            <p>{{data.p}}</p>
          </yd-flexbox-item>
        </yd-flexbox>
      </yd-flexbox-item>
    </yd-flexbox>

    <!-- 半全场 -->
    <yd-flexbox v-if="HFT_show"
                class="match-item hft">
      <p class="play-title">{{getItem('HFT').name}}</p>
      <yd-flexbox-item>
        <yd-flexbox class="bet-wrap">
          <yd-flexbox-item v-for="data in HFT"
                           :key='data.k'
                           :class="['is-betting',keys.includes(oneMatch.match_id + '||HFT||' + data.k)?'selected':'']"
                           @click.native="betClick('HFT',data)">
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
  name: "mix-popup-content",
  components: {},
  props: ["oneMatch", "is_dg", "updateField", "getItem", "keys"],
  data() {
    return {};
  },
  computed: {
    ...mapState("match", ["selectedKeys", "bet_obj"]),
    WDL_show() {
      return this.WDL.length;
    },
    HCWDL_show() {
      return this.HCWDL.length;
    },
    TCS_show() {
      return this.TCS.length;
    },
    TG_show() {
      return this.TG.length;
    },
    HFT_show() {
      return this.HFT.length;
    },
    bet_data() {
      return this.oneMatch.bet_data || {};
    },
    WDL() {
      const wdl =
        (this.bet_data.WDL && this.bet_data.WDL.filter(el => el.p)) || [];
      return wdl.slice(0, 3);
    },
    HCWDL() {
      const hcwdl =
        (this.bet_data.HCWDL && this.bet_data.HCWDL.filter(el => el.p)) || [];
      return hcwdl.slice(0, 3);
    },
    TCS() {
      const hcwdl =
        (this.bet_data.TCS && this.bet_data.TCS.filter(el => el.p)) || [];
      return hcwdl.slice(0, 31);
    },
    TG() {
      const hcwdl =
        (this.bet_data.TG && this.bet_data.TG.filter(el => el.p)) || [];
      return hcwdl.slice(0, 8);
    },
    HFT() {
      const hcwdl =
        (this.bet_data.HFT && this.bet_data.HFT.filter(el => el.p)) || [];
      return hcwdl.slice(0, 9);
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
.mix-popup-content {
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
  .wdl {
    .play-title {
      height: 4.2rem;
    }
    .is-betting {
      height: 4.2rem;
      padding-top: 0.8rem;
    }
  }
  .hcwdl {
    .play-title {
      height: 5rem;
      padding-top: 1rem;
    }
    .hc-bet-wrap {
      height: 5rem;
    }
    .is-betting {
      height: 3.6rem;
      padding-top: 0.4rem;
      border-bottom: 1px solid #dddddd;
    }
    .hc-tip {
      color: #b6b6b6;
      font-size: 0.8rem;
      height: 1.4rem;
      span {
        color: #c80a16;
      }
    }
  }
  .tcs {
    .play-title {
      height: 21rem;
      padding-top: 9.2rem;
    }
    .is-betting {
      height: 3rem;
      padding-top: 0.3rem;
    }
    .is-betting:nth-child(-n + 28) {
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
  .tg {
    .play-title {
      height: 6rem;
      padding-top: 1rem;
    }
    .is-betting {
      height: 3rem;
      padding-top: 0.3rem;
    }
    .is-betting:nth-child(-n + 4) {
      border-bottom: 1px solid #dddddd;
    }
    .bet-wrap {
      width: 100%;
      flex-wrap: wrap;
      .yd-flexbox-item {
        flex: auto;
        width: 25%;
      }
    }
  }
  .hft {
    .play-title {
      height: 9rem;
      padding-top: 2.6rem;
    }
    .is-betting {
      height: 3rem;
      padding-top: 0.16rem;
    }
    .is-betting:nth-child(-n + 6) {
      border-bottom: 1px solid #dddddd;
    }
    .bet-wrap {
      width: 100%;
      flex-wrap: wrap;
      .yd-flexbox-item {
        flex: auto;
        width: 33.3%;
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
