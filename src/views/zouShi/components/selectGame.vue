<template>
  <div class="head_model">
    <transition enter-active-class="animated slideInDown"
                leave-active-class="animated slideOutUp">
      <div :class="[{'ios_shadow': isnested}, 'shadow']"
           v-show="self_show">
        <span v-for="(game, index) in games"
              :key="index"
              @click="selectGame(game, $event)"
              :class="{active: game && game.game_id && gameId==game.game_id}">{{game && game.game_name}}</span>
      </div>
    </transition>
    <div class="bg"
         v-show="self_show"
         @click="self_show = !self_show"></div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import api from '../../../../api/game';
export default {
  props: ['show', 'autoSelect', 'id'],
  data() {
    return {
      games: [],
      game: {},
      self_show: this.show
    };
  },
  watch: {
    show(val) {
      this.self_show = val;
    },
    '$route.params'(newVal, oldVal) {
      if (
        newVal.js_tag === oldVal.js_tag &&
        newVal.name_tag !== oldVal.name_tag
      ) {
        this.initData();
        if (!this.games || !this.games.length) {
          this.games = this.getGameList();
        }
      }
    }
  },
  computed: {
    ...mapState({
      store_gameId: state => state.betting.game.game_id,
      isnested: state => state.isnested
    }),
    gameId() {
      return this.$route.params.lotter_id || this.game.game_id;
    }
  },
  methods: {
    ...mapActions(['setGame']),
    async getGameList(gameId) {
      this.games = await api.getLotteries();
      // console.log('______________2', this.games)
      this.game = gameId
        ? this.games.find(item => item.game_id === gameId)
        : this.games[0];
      // this.setGame(this.game);
    },
    selectGame(game, event) {
      if (game && game.game_id && event) {
        console.log(event)
        // this.setGame(game);
        this.game = game;
        this.$emit('afterSelectGame', game);
      }
    },
    async initData() {
      if (!this.games || !this.games.length) {
        await this.getGameList(this.gameId); // api.getGamesFormCache();
        this.selectGame(this.game, true);
      }
    }
  },
  async created() {
    await this.initData();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.head_model {
  position: relative;
  z-index: 20;
  justify-content: space-between;
  .animated {
    animation-duration: 0.25s;
  }
  .bg {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: poTorem(48px);
    left: 0;
    background: #000;
    opacity: 0.5;
    z-index: 100;
  }
  .shadow {
    z-index: 101;
    position: fixed;
    padding: poTorem(15px) poTorem(12px);
    flex-wrap: wrap;
    top: 3rem;
    left: 0;
    width: 100%;
    height: 70%;
    overflow: hidden;
    overflow-y: scroll;
    background: #fff;
    @include start;
    span {
      border: poTorem(1px) solid #d3d3d3;
      height: poTorem(33px);
      line-height: poTorem(33px);
      width: 32%;
      background: #fff;
      @include center;
      font-size: poTorem(16px);
      color: #1e2123;
      display: inline-block;
      text-align: center;
      margin-bottom: 1%;
      margin-left: 1%;
    }
    .active {
      background: url(../../../img/account/choosed.png) no-repeat bottom right;
      background-size: 20%;
      border: poTorem(1px) solid #c91b1b;
      border-radius: poTorem(2px);
    }
  }
  .ios_shadow {
    top: 4rem;
  }
}
</style>
