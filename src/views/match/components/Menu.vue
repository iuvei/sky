<template>
  <yd-tab v-model="gameType2" @click.native="scrollToShow" horizontal-scroll class="match-menu">
    <yd-tab-panel v-for="(item,key) in gameTypeMap" :key="key" :label="item.title" :tabkey='key' class="item"> </yd-tab-panel>
  </yd-tab>
</template>

<script>
// "-1"=混合投注|0=單關固定|1=勝負平|2=讓球勝負平|3=比分|4=總進球|5=半全場
import { mapState, mapActions } from 'vuex'
export default {
  name: 'match-menu',
  data() {
    return {}
  },
  computed: {
    ...mapState('match', ['gameType', 'gameTypeMap']),
    gameType2: {
      get() {
        return this.gameType * 1 + 1
      },
      set(gameType) {
        this.updateField({ gameType: gameType - 1 })
      }
    }
  },
  methods: {
    ...mapActions('match', ['updateField']),
    scrollToShow(e) {
      if (e.x / window.innerWidth > 0.5) {
        e.srcElement.parentElement.parentElement.scrollLeft +=
          e.x - window.innerWidth / 2
      } else {
        e.srcElement.parentElement.parentElement.scrollLeft -=
          window.innerWidth / 2 - e.x
      }
    }
  }
}
</script>

<style lang="scss">
@import '~css/resources.scss';
.match-menu {
  ul {
    animation: all 0.3s linear;
    border-bottom: 1px solid #ddd;
    align-items: center;
    overflow-x: auto;
    li.yd-tab-nav-item {
      position: relative;
      height: 3rem;
      font-size: 0.9375rem;
      line-height: 3rem;
      white-space: nowrap;
      font-size: poTorem(18px);
      color: #454545;
    }
    li.yd-tab-nav-item.yd-tab-active {
      color: $mainColor;
      border-bottom: 1px solid $mainColor;
    }
  }
  .yd-tab-nav .yd-tab-active:before {
    display: none;
  }
  .yd-tab-nav:after {
    border: none;
  }
  .yd-tab-nav::-webkit-scrollbar {
    display: none;
  }
}
</style>


