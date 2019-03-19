<template>
  <div class="zoushi">
    <heads :lotId="gameId"
           :iosKaijiang="isShow"></heads>
    <div class="trend_bottom">
      <span>{{gameName}}</span>
      <div @click="toBetting">去投一注</div>
    </div>
  </div>
</template>
<script>
import heads from './components/heads';
import api from '../../../api/game.js';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'zouShi',
  data() {
    return {
      isShow: true
    }
  },
  components: {
    heads
  },
  computed: {
    ...mapState({
      gameName: state => state.trend.gameName,
      gameId: state => state.trend.gameId,
      jsTag: state => state.trend.js_tag,
      nameTag: state => state.trend.name_tag,
      speed: state => state.trend.speed,
      isnested: state => state.isnested
    })
  },
  methods: {
    ...mapActions(['setBetCurent']),
    async toBetting() {
      const gameList = await api.getGameList()
      const thisGame = gameList.find(item => item.game_id === this.gameId)
      this.$router.push({
        name: thisGame.js_tag,
        params: {
          lotter_id: thisGame.game_id,
          name_tag: thisGame.tag,
          game_name: thisGame.game_name,
          js_tag: thisGame.js_tag,
          speed: thisGame.speed,
          isHome: true,
          play_type: thisGame.play_type,
          yearid: thisGame.yearid || 0
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../css/resources.scss";
.zoushi {
  background: #fff;
  .trend_bottom {
    position: absolute;
    bottom: 0;
    background: #fff;
    z-index: 109;
    width: 100%;
    padding: poTorem(8px) 0 poTorem(8px) 0;
    height: poTorem(48px);
    font-size: poTorem(15px);
    text-indent: 1em;
    box-sizing: border-box;
    border-top: 1px solid #ddd;
    @include between;
    div {
      display: inline-block;
      width: poTorem(100px);
      text-indent: 0;
      text-align: center;
      border-radius: 3px;
      color: #fff;
      background: $mainColor;
      height: poTorem(30px);
      line-height: poTorem(30px);
      margin-right: 1em;
      font-weight: 600;
    }
  }
  .ios_trend_bottom {
    bottom: 0;
  }
}
</style>
