<template>
  <yd-tab v-model="allPlayType"
          @click.native="scrollToShow"
          horizontal-scroll
          class="all-game">
    <yd-tab-panel v-for="(item,key) in allPlayTypes"
                  :key="key"
                  :label="item.title"
                  :tabkey='key'
                  class="item"> </yd-tab-panel>
  </yd-tab>
</template>

<script>
// 0:所有盤口, 1:讓球 & 大小盤口, 2:上半場盤口, 3: 比分盤口, 4:主盤口, 5:進球盤口, 6:其他盤口
import { mapState, mapActions } from "vuex";
export default {
  name: "allPlayMenu",
  data() {
    return {};
  },
  computed: {
    ...mapState("football", ["allPlayTypes"]),
    allPlayType: {
      get() {
        return this.$store.state.football.allPlayType;
      },
      set(v) {
        this.modifyFootballField({ allPlayType: v });
      }
    }
  },
  methods: {
    ...mapActions("football", ["modifyFootballField"]),
    scrollToShow(e) {
      if (e.x / window.innerWidth > 0.5) {
        e.srcElement.parentElement.parentElement.scrollLeft +=
          e.x - window.innerWidth / 2;
      } else {
        e.srcElement.parentElement.parentElement.scrollLeft -=
          window.innerWidth / 2 - e.x;
      }
    },
    clickItem(key) {
      this.tabType = key;
    }
  }
};
</script>

<style lang="scss">
@import "~css/resources.scss";
.all-game {
  ul {
    animation: all 0.3s linear;
    border-bottom: 1px solid #ddd;
    align-items: center;
    overflow-x: auto;
    li.yd-tab-nav-item {
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
    width: 100%;
    margin-left: -50%;
    height: 1px;
  }
  .yd-tab-nav:after {
    border: none;
  }
  .yd-tab-nav::-webkit-scrollbar {
    display: none;
  }
}
</style>


