<template>
  <div class="all-play">
    <app-header title="所有玩法">
      <template slot="right">
        <i @click="refreshClick" class="yd-icon-refresh"></i>
      </template>
    </app-header>
    <FootballMenu></FootballMenu>

    <div class="other-block">
      <AppEmpty v-if="!gameKeys.length"></AppEmpty>
      <betting :gameKey="key" :game="el" v-for="(el,key) in games" :key="key"></betting>
    </div>
    <FootballFooter></FootballFooter>
  </div>

</template>
<script>
import debounce from 'lodash/debounce'
import get from 'lodash/get'
import { mapActions, mapState, mapGetters } from 'vuex'
import FootballMenu from './components/allPlay/allPlayMenu'
import betting from './components/allPlay/betting'
import FootballFooter from '../components/FootballFooter'
// import games from './components/allPlay/allplay.test.js'

export default {
  name: 'footballAllPlay',
  components: { FootballMenu, betting, FootballFooter },
  data() {
    return {
      games: {}
    }
  },
  computed: {
    ...mapState('football', ['allPlayType', 'allPlayTeam']),
    gameKeys() {
      let data = Object.keys(this.games)
      return data
    }
  },
  activated() {
    this.getBet()
  },
  deactivated() {},
  watch: {
    allPlayType() {
      this.getBet()
    }
  },
  methods: {
    ...mapActions('football', ['modifyFootballField', 'getSportAllBetMethod']),
    refreshClick() {
      this.getBet()
    },
    getBet: debounce(async function() {
      this.games = [] //games // 测试数据
      let data = await this.getSportAllBetMethod()
      this.games = data.bet_data
      // console.error('后台数据')
    }, 500)
  }
}
</script>
<style lang="scss" scoped>
.all-play {
  .head .head_con .switch i {
    //  background-image:url(~img/football/refresh.png);
    background-image: none;
    font-size: 1.25rem;
    color: #ffffff;
  }
}
</style>
