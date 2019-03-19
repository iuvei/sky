<template>
  <div class="click-common-bet">
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

    <div :class="['is-betting',this.curBets.length? 'selected':'no-bet']"
         @click="popupShowClick(oneMatch)">
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
export default {
  name: "click-common-bet",
  components: {},
  props: ["oneMatch", "getItem", "popupShowClick"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters("match", ["bet_data"]),
    ...mapState("match", ["gameType"]),
    // 当前比赛选中的选项
    curBets() {
      return this.bet_data.filter(el => el.match_id === this.oneMatch.match_id);
    },
    // 处理curBets 按玩法分组
    groupBets() {
      return this.curBets.reduce((f, c) => {
        f[c.play_method] = [...(f[c.play_method] || []), c];
        return f;
      }, {});
    }
    // getBetTxt() {
    //   if (!this.curBets.length) return '请选择投注内容'
    //   return this.curBets.map(el => this.getItem(el.k).name || el.k).join(',')
    // }
  },
  methods: {
    // ...mapActions('match', ['updateField'])
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.click-common-bet {
  .league {
    font-size: 1.2rem;
    line-height: 2.2rem;
  }
  .vs {
    width: 4rem;
  }
  .no-bet {
    background-color: #ffffff;
    color: #867b7b;
  }
  .is-betting {
    width: 100%;
    min-height: 3rem;
    padding: 0.2rem 0.4rem;
    border: 1px solid #b6b5b5;
    word-break: break-all;
    line-height: 1.6rem;
    // white-space: nowrap;
    // text-overflow: ellipsis;
    // overflow: hidden;
    @include center;
    flex-direction: column;
    .select-content {
      width: 100%;
      align-items: flex-start;
      // &:nth-child(n + 2) {
      //   border-top: 1px dashed #ffffff;
      // }
    }
    .play-method {
      width: 6rem;
      text-align: right;
      padding-right: 1rem;
      & ~ .data-k {
        text-align: left;
        // color: #ed0906;
      }
    }
  }
}
</style>
