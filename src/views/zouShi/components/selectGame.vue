<template>
  <div class="head_model">
    <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
      <div :class="[{'ios_shadow': isnested}, 'shadow']" v-show="self_show">
        <span v-for="(game, index) in games" :key="index" @click="selectGame(game)" :class="{active: game && game.game_id && [gameId, lotter_id].includes(game.game_id)}">{{game && game.game_name}}</span>
      </div>
    </transition>
    <div class="bg" v-show="self_show" @click="self_show = !self_show"></div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import api from "../../../../api/game";
// import { games } from "../../../../api/store.util";
export default {
  props: ["show", "autoSelect", "id"],
  data() {
    return {
      games: [],
      game: {},
      lotter_id: 0,
      gameId: -1,
      self_show: this.show
    };
  },
  watch: {
    show(val) {
      this.self_show = val;
    },
    "$route.params"() {
      this.initData()
      if(this.$route.params.lotter_id) {
        this.gameId = this.$route.params.lotter_id * 1
        this.lotter_id = this.$route.params.lotter_id * 1;
      } else {
        this.gameId = this.lotter_id = this.id
      }
      if (!this.games || !this.games.length) {
        this.games = this.getGameList(); //api.getGamesFormCache();
      }
    }
  },
  computed: {
    ...mapState({
      isnested: state => state.isnested
    })
  },
  methods: {
    async getGameList(gameId) {
      this.games = await api.getLotteries();
      this.game = gameId
        ? this.games.find(item => item.game_id == gameId)
        : this.games[0];
    },
    selectGame(game) {
      if (game && game.game_id) {
        this.gameId = game.game_id;
        this.lotter_id = game.game_id;
        this.$emit("afterSelectGame", game);
      }
    },
    async initData() {
      if(this.$route.params.lotter_id) {
        this.lotter_id = this.$route.params.lotter_id * 1;
      }
      if (!this.games || !this.games.length) {
        this.games = this.getGameList(); //api.getGamesFormCache();
      }

      if (this.lotter_id !== this.gameId) {
        this.gameId = this.$route.params.lotter_id;
        if (this.games.length) {
          if (this.lotter_id) {
            this.game = this.games.find(item => item.game_id == this.lotter_id);
          } else if (this.autoSelect) {
            this.game = this.games[0];
          }
          if (this.game) {
            this.selectGame(this.game);
          }
        } else {
          let flow = isNaN(this.lotter_id)
            ? await this.getGameList()
            : await this.getGameList(this.lotter_id);
          this.selectGame(this.game);
        }
      }
    }
  },
  mounted () {
      this.initData()
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
