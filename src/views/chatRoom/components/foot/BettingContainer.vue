<template>
  <div class="chatroom-betting-container">
    <betting-header @toggleSubmenu="toggle"
                    :gameItem="gameItem"></betting-header>
    <transition name="fade"
                mode="out-in">
      <sub-menu v-show="showSubMenu"
                :gameItem="gameItem"></sub-menu>
    </transition>
    <component :is="betAreaName"
               :curPlayItem="playItem"
               :dataSet="dataSet"
               :odds="playOdds"
               :placeholder="placeholder"
               :instance="instance"
               v-model="danshiExcl"
               @clickBall="clickBall"
               v-show="!showSubMenu"></component>
    <buy :gameItem="gameItem"
         :submitting="submitting"
         @buy="buy"></buy>
  </div>
</template>

<script>
import BettingHeader from "./BettingHeader";
import SubMenu from "./SubMenu";
import Buy from "./Buy";
import BetAreaK3 from "../body/BetAreaK3";
import BetAreaNormal from "../body/BetAreaNormal";
import BetAreaPuke from "../body/BetAreaPuke";
import BetAreaLhc from "../body/betAreaLhc";
import BetAreaLadder from "../body/BetAreaLadder";
import BetAreaLuckyFarm from "../body/BetAreaLuckyFarm";
import { mapState, mapActions } from "vuex";
import mixin from "../body/mixin";
import api from "../../../../../api/betting";
import danshiUtil from "~/js/touzhu/danshi.util";

export default {
  name: "chatroom_betting_container",

  components: {
    SubMenu,
    Buy,
    BettingHeader,
    BetAreaK3,
    BetAreaNormal,
    BetAreaPuke,
    BetAreaLhc,
    BetAreaLadder,
    BetAreaLuckyFarm
  },

  mixins: [mixin],

  data() {
    return {
      showSubMenu: false,
      dataSet: [],
      odds: [],
      submitting: false,
      game: this.gameItem,
      danshiExcl: "",
      betAreaName: "",
      betMenu: {},
      placeholder: ""
    };
  },

  props: {
    gameItem: {
      type: Object,
      default: {}
    }
  },

  computed: {
    ...mapState({
      playItem: state => state.betting.curPlayItem,
      userinfo: state => state.userinfo.accountInfo,
      qishu: state => state.betting.qishu
    }),
    playOdds() {
      if (this.$route.name !== "liaotianshi") return [];
      if (
        this.odds &&
        this.odds.length &&
        this.playItem &&
        this.playItem.playid
      ) {
        const oddsObj = this.odds.find(x => x.playid === this.playItem.playid);

        if (
          this.gameItem.js_tag === "ssc" &&
          [21, 103, 89, 96, 7, 16, 30, 112].includes(this.playItem.playid)
        ) {
          return [
            oddsObj.peilv
              .split("|")
              .map(x => this.processZero(x))
              .join("|")
          ];
        }

        return (oddsObj || { peilv: "" }).peilv
          .split("|")
          .map(x => this.processZero(x));
      }
      return [];
    }
  },

  methods: {
    ...mapActions(["modelBetShow"]),
    print(value) {
      this.betMenu = value;
    },
    toggle() {
      this.showSubMenu = !this.showSubMenu;
    },

    openHistory(val) {
      if (val && this.showSubMenu) this.showSubMenu = false;
    },

    clickBall(row, ball, callback) {
      if (!["pk10", "pkniuniu"].includes(this.gameItem.js_tag)) {
        this.mutex(row.name, ball, callback);
      }
      this.clickBallHandle(row, ball);
    },

    async getGameOdds(gameid) {
      if (!this.$store.state.userinfo.isLogin) return;
      if (!this.playItem) return;
      this.$dialog.loading.open("");
      this.dataSet = [];
      const odds = await api.getLogondGameOdds(gameid);
      this.odds = odds;
      this.dataSet = this.getDataSet(this.playItem.playid);
      this.$dialog.loading.close();
    },

    getPlaceHolder(playid) {
      if (this.$route.name === "liaotianshi") {
        if (
          this.instance &&
          this.instance.getPlaceHolder &&
          danshiUtil.isSingleMode(this.gameItem.js_tag, playid)
        ) {
          return this.instance.getPlaceHolder(playid);
        }
      }
      return "";
    }
  },

  watch: {
    async playItem(val, oldVal) {
      if (!val) return;
      if (this.hideSub) this.showSubMenu = false;
      this.dataSet = this.getDataSet(val.playid);
      this.placeholder = this.getPlaceHolder(val.playid);
      if (!oldVal) await this.getGameOdds(this.gameItem.game_id);
      this.clearDataSet();
    },
    subMenus() {
      this.showSubMenu = false;
    },
    async gameItem(val, oldVal) {
      this.betAreaName = this.getBetArea();
      // await this.getGameOdds(val.game_id);
      if (val && oldVal && val.gameid !== oldVal.game_id) {
        await this.getGameOdds(val.game_id);
      }
      this.showSubMenu = false;
      // this.clearDataSet();
    },
    showSubMenu(val) {
      this.modelBetShow(val);
    },
    async "$store.state.userinfo.isLogin"(val) {
      if (!val) return;
      await this.getGameOdds(this.gameItem.game_id);
      this.showSubMenu = false;
      this.clearDataSet();
    }
  },

  async mounted() {
    if (this.gameItem) {
      await this.getGameOdds(this.gameItem.game_id);

      this.betAreaName = this.getBetArea();
    }
  },

  created() {
    const _this = this;
    this.bus.$on("hideSubmenu", () => (_this.showSubMenu = false));
    this.$root.Bus.$on("betMenu", value => {
      this.print(value);
    });
  },

  destroyed() {
    this.bus.$off("hideSubmenu");
  }
};
</script>
<style lang="scss" scoped>
.chatroom-betting-container {
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
<style lang="scss">
.chatroom-betting-container {
  .submenus {
    li {
      font-size: 16px;
    }
  }
}
</style>
