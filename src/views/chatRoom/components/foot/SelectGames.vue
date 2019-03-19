<template>
  <yd-slider class="chat-room-select-game">

    <yd-slider-item v-for="(page,idx) in allGames"
                    :key="idx">
      <div v-for="(item,index) in page"
           :key="index"
           @click.stop.prevent="gameClick(item)"
           class="game-container">
        <img :src="item.icon || ''"
             alt=""
             class="icon"
             border="0">
        {{item.game_name}}
      </div>
    </yd-slider-item>
  </yd-slider>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "chat_roome_select_games",

  props: {
    games: {
      type: Array,
      default: []
    }
  },

  methods: {
    ...mapActions(["setGame"]),
    gameClick(item) {
      this.setGame(item);
      this.$emit("selectGame", item);
    }
  },

  computed: {
    allGames() {
      const arr = [];
      const games = this.games;
      if (Array.isArray(games) && games.length) {
        const len = games.length;
        const pageCount = len % 8 === 0 ? len / 8 : parseInt(len / 8) + 1;
        for (let i = 0; i < pageCount; i++) {
          const c = i * 8;
          arr[i] = [];
          for (let j = 0; j < 8; j++) {
            if (games[c + j]) arr[i].push(games[c + j]);
            else arr[i].push({ game_name: "", icon: "" });
          }
        }
      }
      return arr;
    }
  }
};
</script>

<style lang="scss" scoped>
.chat-room-select-game {
  .yd-slider-item {
    height: 14rem;
  }
  .game-container {
    display: flex;
    flex-direction: column;
    width: 25%;
    height: 6rem;
    float: left;
    text-align: center;
    align-items: center;

    .icon {
      width: 3.625rem;
      height: 3.625rem;
      margin: 10px 0 8px 0;
    }
    img[src=""] {
      opacity: 0;
    }
  }
}
</style>
<style>
.chat-room-select-game .yd-slider-pagination-item-active {
  background-color: #ff0101 !important;
}
</style>
