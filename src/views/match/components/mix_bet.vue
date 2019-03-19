<template>
  <div class="mix-bet">
    <div class="shot-name-wrap">
      <div class="hc-tip">让球</div>
      <yd-flexbox class="league-name">
        <yd-flexbox-item>{{oneMatch.home_short_name}}</yd-flexbox-item>
        <span style="color: #6a6a6d;"> VS </span>
        <yd-flexbox-item>{{oneMatch.visitor_short_name}}</yd-flexbox-item>
      </yd-flexbox>
    </div>
    <div class="bet-block">
      <div class="match-hc">
        <p class="line-1">0</p>
        <p class="line-2">{{oneMatch.handicap}}</p>
      </div>
      <div class="is-bet-wrap">
        <div class="is-bet">
          <p class="is-betting is-lock" v-if="!WDL.length">未开售</p>
          <div v-for="data in WDL" :key='data.k' :class="['is-betting',keys.includes(oneMatch.match_id + '||WDL||' + data.k)?'selected':'']" @click="betClick('WDL',data)">
            {{getItem(data.k).name+''+data.p}}
          </div>
        </div>
        <div class="is-bet">
          <p class="is-betting is-lock" v-if="!HCWDL.length">未开售</p>
          <div v-for="data in HCWDL" :key='data.k' :class="['is-betting',keys.includes(oneMatch.match_id + '||HCWDL||' + data.k)?'selected':'']" @click="betClick('HCWDL',data)">
            {{getItem(data.k).name+data.p}}
          </div>
        </div>
      </div>
      <div @click="popupShowClick" :class="['bet-more', oneKeys.length ? 'is-selected':'']">
        {{oneKeys.length ? '已选':'展开'}}
        <p v-html="oneKeys.length ? `<span style='color:#e93e30'>${oneKeys.length}</span>项`:'全部'"></p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'mix-bet',
  components: {},
  props: ['oneMatch', 'is_dg', 'getItem', 'popupShowClick'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters('match', ['matchNum', 'matchDiff']),
    ...mapState('match', ['gameType', 'selectedKeys', 'bet_obj']),
    // 所有选中的投注
    keys: {
      get() {
        return this.selectedKeys
      },
      set(selectedKeys) {
        this.updateField({ selectedKeys })
      }
    },
    // 当前比赛选中的投注
    oneKeys() {
      return this.selectedKeys.filter(el => el.includes(this.oneMatch.match_id))
    },
    WDL() {
      const wdl =
        (this.oneMatch.bet_data &&
          this.oneMatch.bet_data.WDL.filter(el => el.p)) ||
        []
      return wdl.slice(0, 3)
    },
    HCWDL() {
      const hcwdl =
        (this.oneMatch.bet_data &&
          this.oneMatch.bet_data.HCWDL.filter(el => el.p)) ||
        []
      return hcwdl.slice(0, 3)
    }
  },
  methods: {
    ...mapActions('match', ['updateField']),
    betClick(gameKey, { k, p }) {
      if (!p) return
      if (
        this.matchNum === 8 &&
        !this.matchDiff.includes(this.oneMatch.match_id + '')
      ) {
        return this.$dialog.toast({
          mes: '单次投注最多8场比赛'
        })
      }
      const selectedKey = this.oneMatch.match_id + '||' + gameKey + '||' + k
      const idx = this.keys.indexOf(selectedKey)
      if (idx === -1) {
        this.keys.push(selectedKey)
        // 保存下注数据
        const bet_obj = Object.assign({}, this.bet_obj)
        bet_obj[selectedKey] = {
          match_id: this.oneMatch.match_id,
          play_method: gameKey,
          k,
          p,
          is_dg: ~~this.is_dg
        }
        this.updateField({ bet_obj })
      } else {
        this.keys.splice(idx, 1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~css/resources.scss';
.mix-bet {
  .bet-block {
    @include center;
    border: 1px solid #b6b5b5;
    background-color: #ffffff;
    .is-bet-wrap {
      flex: 1;
    }
    .is-bet {
      @include center;
    }
    .is-bet:first-child {
      border-bottom: 1px solid #dfdbcf;
    }
    .match-hc {
      width: 1.2rem;
    }
    .bet-more {
      width: 3rem;
      height: 5.2rem;
      padding-top: 1.1rem;
      &.is-selected {
        background-color: #dadada;
      }
    }
  }
  .line-1 {
    height: 2.6rem;
    line-height: 2.6rem;
    color: #ffffff;
    font-size: 0.7rem;
    background-color: #d5c1b8;
    border-bottom: 1px solid #dfdbcf;
  }
  .line-2 {
    height: 2.6rem;
    line-height: 2.6rem;
    color: #ffffff;
    font-size: 0.7rem;
    background-color: #5c9124;
  }
  .shot-name-wrap {
    @include center;
    .hc-tip {
      width: 1.2rem;
      color: #9b9a9a;
      font-size: 0.7rem;
    }
    .league-name {
      flex: 1;
      line-height: 3rem;
      font-size: 1.2rem;
    }
  }
  .is-betting {
    flex: 1;
    line-height: 2.6rem;
    height: 2.6rem;
    border-right: 1px solid #dfdbcf;
  }
}
</style>
