<template>
  <app-action-sheet v-model="show"
                    class="sheet">
    <yd-tab>
      <yd-tab-panel label="选项三">土地是以它的肥沃和收获而被估价的；才能也是土地，不过它生产的不是粮食，而是真理。如果只能滋生瞑想和幻想的话，即使再大的才能也只是砂地或盐池，那上面连小草也长不出来的。</yd-tab-panel>
      <yd-tab-panel label="切换彩种">我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。</yd-tab-panel>
    </yd-tab>
    <buy></buy>
  </app-action-sheet>
</template>

<script>
import AppActionSheet from "../AppActionSheet/AppActionSheet";
import Buy from "../../views/gouCai/components/ChatRoom/Buy";

export default {
  name: "AppBettingModal",

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      // gameName:
      // show: this.value
    };
  },

  computed: {
    // ...mapState("games"),
    // ...mapState({
    //   games: state => state.games
    // }),
    // ...mapState(["games"]),
    games() {
      return this.$store.state.games;
    },
    game() {
      return (this.games && this.games[0]) || this.$store.state.betting.game;
    },
    show() {
      return this.value;
    }
  },

  // watch: {
  //   value(val) {
  //     this.show = val;
  //   }
  // },

  // computed: {
  //   show() {
  //     return this.value;
  //   }
  // },

  components: {
    AppActionSheet,
    Buy
  }
};
</script>

<style lang="scss" scoped>
.sheet {
  display: flex;
  flex-direction: inherit;
  height: 100vw !important;
}
</style>
