<template>
  <yd-tab class="betting-tab"
          v-model="tabIndex"
          :class="{'hide':isHide}"
          :callback="swithTab">
    <yd-tab-panel v-for="(item,index) in items"
                  :key="item"
                  :label="item.label"
                  :prevent-default="false">
      <betting-container :gameItem="gameItem"
                         @hideTop="hideTop"
                         v-if="index === 0"></betting-container>
    </yd-tab-panel>
  </yd-tab>
</template>

<script>
import BettingContainer from "./BettingContainer";
export default {
  name: "bettingTab",

  components: {
    BettingContainer
  },

  props: {
    gameItem: {
      type: Object,
      default: ""
    }
  },

  data() {
    return {
      tabIndex: 0,
      isHide: false,
      items: [
        {
          label: this.gameItem.game_name,
          content: "土地是以它的肥沃和收获而被估价的；才能"
        },
        { label: "切换彩种", content: "" }
      ]
    };
  },

  methods: {
    swithTab(label) {
      if (label === "切换彩种") {
        this.$emit("showGames", true);
        setTimeout(() => {
          this.tabIndex = 0;
        }, 500);
      }
    },
    hideTop() {
      this.isHide = !this.isHide;
    }
  },

  watch: {
    gameItem(val) {
      if (val) this.items[0].label = val.game_name;
    }
  }
};
</script>

<style lang="scss">
.betting-modal {
  .yd-tab-panel {
    height: calc(110vw - 2rem);
    background-color: #fff;
  }
  .yd-popup-content > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .yd-tab-nav-nomal {
    height: 2rem;
  }
  // 背景
  .yd-popup,
  .yd-tab-nav-nomal,
  .yd-tab-nav {
    background: transparent !important;
  }
  // 标签
  .yd-tab-nav li {
    font-size: 16px;
    float: left;
    width: 130px !important;
    height: 2rem;
    line-height: 2rem !important;
    position: relative;
    border-radius: 8px 8px 0 0;
    background: url(~img/chatRoom/change_bet.png) no-repeat top center;
    background-size: 130px 2rem;
    margin-left: -25px;
    &.yd-tab-active {
      background: url(~img/chatRoom/bet_name.png) no-repeat top center;
      background-size: 130px 2rem;
      z-index: 1;
      margin-left: 0;
      &:before {
        display: none;
      }
    }
  }
  .yd-tab-nav-nomal {
    width: 80%;
  }
  .yd-tab-panel-item {
    background: #fff;
  }
}
.chat-room-games .yd-popup {
  background: #fff !important;
}
</style>
