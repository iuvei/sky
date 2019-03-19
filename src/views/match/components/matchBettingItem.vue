<template>
  <!-- 投注界面 -->
  <div class="match-bet-index">
    <!-- dg_data:{{this.oneMatch.dg_data}} -->
    <div class="is-dg" v-if='is_dg'>单场</div>
    <div class="match-item">
      <div class="match-info">
        <p>{{oneMatch.league_short_name}}</p>
        <p>{{oneMatch.weekday}}</p>
        <p>{{oneMatch.game_time}}</p>
      </div>

      <component :is="curBet" :oneMatch="oneMatch" :is_dg='is_dg' :getItem="getItem" :updateField="updateField" :popupShowClick='popupShowClick' class="match-bet"></component>

    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { getItem } from './allPlay.const.js'
import Mix_bet from './mix_bet'
import Win_bet from './win_bet'
import Hcwin_bet from './hcwin_bet'
import Total_bet from './total_bet'
import ClickCommonBet from './clickCommonBet'

export default {
  name: 'match-main-bet-content',
  props: ['oneMatch'],
  components: {
    Mix_bet,
    Win_bet,
    Hcwin_bet,
    Total_bet,
    ClickCommonBet
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('match', ['curBet', 'curRenderKey', 'matchNum', 'matchDiff']),
    ...mapState('match', ['gameType']),
    is_dg() {
      // 混合过关
      if (this.gameType == -1) {
        return false
      }
      // 单关固定
      if (this.gameType == 5) {
        return true
      }

      return this.oneMatch.dg_data.includes(this.curRenderKey[0])
    }
  },
  activated() {},
  deactivated() {},
  methods: {
    ...mapActions('match', ['updateField']),
    getItem,
    popupShowClick() {
      if (
        this.matchNum === 8 &&
        !this.matchDiff.includes(this.oneMatch.match_id + '')
      ) {
        return this.$dialog.toast({
          mes: '单次投注最多8场比赛'
        })
      }
      this.updateField({ matchShow: true, oneMatch: this.oneMatch })
    }
  }
}
</script>

<style lang="scss">
@import '~css/resources.scss';
.match-bet-index {
  user-select: none;
  text-align: left;
  font-size: 1rem;
  padding: 1rem 0.5rem;
  text-align: center;
  background-color: #eef0ed;
  border-bottom: 1px solid #d4d4d4;
  position: relative;
  .is-dg {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #ef0404;
    color: #ffffff;
    border-radius: 0 1rem 1rem 0;
    padding: 0.1rem 0.4rem 0.1rem 0.2rem;
    font-size: 0.7rem;
  }
  .match-item {
    @include center;
    .match-info {
      width: 5rem;
      color: #7c7c7e;
    }
    .match-bet {
      flex: 1;
      color: #070101;
    }
  }
}
</style>
