<template>
  <div class="head">
    <div :class="[{'head_con_pig':isfestival},'head_con']">
      <div @click="ifGoback"
           class="go_back">
        <div class="icon"></div>
      </div>
      <div class="title"
           @click="showHead">
        <i>{{gameName}}</i>
        <span v-show="type==1 && officialOption">_{{all_title || title}}</span>
        <!-- <span v-else v-show="type!=1 && officialOption">_{{all_title || pukeTitle}}</span> -->
        <i v-show="type==1 && officialOption"
           class="trangle"></i>
      </div>
      <div class="switch"
           @click="showSelect">
        <i :class="{slidedown:showSelectGame}"></i>
        <span>彩种</span>
      </div>
    </div>
    <select-game @afterSelectGame="afterSelectGame"
                 :gameId="$route.params.lotter_id"
                 :show="showSelectGame"
                 :autoSelect="false"
                 ref="selectGame"></select-game>
    <switchPlay :modal_show="show"
                v-if="['xync'].includes($store.state.betting.js_tag)"
                @showGamePlay="show=false"></switchPlay>
    <headItem :modal_show="show"
              v-if="!['xync'].includes($store.state.betting.js_tag)"
              @showGamePlay="show=false"></headItem>
    <img class="bet_guide"
         src="../../../img/goucai/guide.png"
         alt=""
         v-if="guide"
         @click="closeGuide">
    <yd-popup v-model="tipShow"
              position="center"
              width="80%">
      <div class="tips_rr">
        <p>温馨提示</p>
        <p>您的购物车有投注，切换彩种会清空购物车，确定切换？</p>
        <p>
          <button @click="closePop">取消</button>
          <button @click="switchToOther">切换</button>
        </p>
      </div>
    </yd-popup>
    <yd-popup v-model="tipShow2"
              position="center"
              width="80%">
      <div class="tips_rr">
        <p>温馨提示</p>
        <p>退出彩种会清空购物车，确定退出？</p>
        <p>
          <button @click="tipShow2 = false">取消</button>
          <button @click="outOfBet">退出</button>
        </p>
      </div>
    </yd-popup>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import switchPlay from "~/views/gouCai/components/switchPlay";
import headItem from "~/views/gouCai/components/headItem";
import selectGame from "../../zouShi/components/selectGame";
export default {
  props: ["type"],
  components: {
    selectGame,
    headItem,
    switchPlay
  },
  data() {
    return {
      tipShow: false,
      tipShow2: false,
      show: false,
      showSelectGame: false,
      active1: false,
      guide1: false,
      guide2: false,
      guide: false,
      active2: "官方玩法",
      titleArr: ["双面玩法", "官方玩法"],
      lotter_id: this.$route.params.lotter_id,
      selectGameData: {},
      all_title: ""
    };
  },
  methods: {
    ...mapActions([
      "playSwitch",
      "setBetCurent",
      "setBetOdds",
      "setBetOdd",
      "clearCart"
    ]),
    showSelect() {
      if (!this.modelShow) {
        if (this.tipShow || this.tipShow2) {
          this.tipShow = this.tipShow2 = false;
          return;
        }
        this.showSelectGame = !this.showSelectGame;
        // 如果是弹出彩种选择，取消掉其他的弹框
        if (this.showSelectGame) {
          this.show = false;
        }
      }
    },
    closeGuide() {
      this.guide = false;
      localStorage.setItem("betGuide", true);
    },
    showHead() {
      if (this.tipShow || this.tipShow2) {
        this.tipShow = this.tipShow2 = false;
        return;
      }
      if (!this.modelShow) {
        this.type == 1 && this.officialOption ? (this.show = !this.show) : "";
        if (this.show) {
          this.showSelectGame = false;
        }
      }
    },
    switchs(val) {
      this.active2 = val;
      this.show = false;
      this.playSwitch(val);
    },
    closePop() {
      this.tipShow = false;
      this.showSelectGame = false;
      this.$refs.selectGame.gameId = this.gameId;
      this.$refs.selectGame.lotter_id = this.gameId;
    },
    ifGoback() {
      if (this.tipShow || this.tipShow2) {
        this.tipShow = this.tipShow2 = false;
        return;
      }
      if (this.cart.length) {
        this.tipShow2 = true;
      } else {
        this.$router.back();
      }
    },
    outOfBet() {
      this.tipShow2 = false;
      this.clearCart();
      this.$router.push("/home");
    },
    switchToOther() {
      const game = this.selectGameData;
      const gameid = this.$store.state.betting.gameId,
        name_tag = this.$store.state.betting.name_tag;
      if (gameid != game.game_id || name_tag != game.tag) {
        this.setBetCurent({
          lotter_id: game.game_id,
          name_tag: game.tag,
          game_name: game.game_name,
          js_tag: game.js_tag,
          speed: game.speed,
          play_type: game.play_type,
          yearid: game.yearid
        });
        this.$router.replace({
          name: game.js_tag,
          params: {
            lotter_id: game.game_id,
            name_tag: game.tag,
            game_name: game.game_name,
            js_tag: game.js_tag,
            speed: game.speed,
            play_type: game.play_type,
            yearid: game.yearid,
            isHome: true
          }
        });
      }
      this.tipShow = false;
      this.showSelectGame = false;
    },
    afterSelectGame(games) {
      this.selectGameData = games;
      // console.log(games)
      if (this.cart.length && games.game_id != this.gameId) {
        this.tipShow = true;
      } else {
        this.switchToOther();
      }
    },
    changeNameTag(newVal, oldVal) {
      // 如果切换了彩种，清空购物车
      if (oldVal.length && newVal.length && oldVal != newVal) {
        this.clearCart();
      }
    }
  },
  computed: {
    ...mapState({
      js_tag: state => state.betting.js_tag,
      title: state => state.betting.switch,
      pukeTitle: state => state.betting.pukeswitch,
      gameId: state => state.betting.gameId,
      gameName: state => state.betting.gameName,
      cart: state => state.betting.cart,
      modelShow: state => state.betting.modelShow,
      officialOption: state => state.betting.officialOption,
      play_type: state => state.betting.play_type
    }),
    ...mapState(['isfestival']),
    playItems() {
      const configs = this.$store.state.betting.playConfigs;
      if (configs && Array.isArray(configs)) {
        return configs[0];
      }
      return [];
    },
    // 双面还是官方
    curIndex() {
      return this.play_type ? 0 : 1;
    }
  },
  activated() {
    if (this.$route.params.lotter_id && this.$route.params.game_name) {
      this.setBetCurent({
        lotter_id: this.$route.params.lotter_id,
        name_tag: this.$route.params.name_tag,
        js_tag: this.$route.params.js_tag,
        game_name: this.$route.params.game_name,
        speed: this.$route.params.speed,
        play_type: this.$route.params.play_type
      });
    }
    this.$nextTick(() => {
      if (this.play_type) {
        this.active2 = "双面玩法";
      }
    });
    this.bus.$on("changeTitle", title => {
      if (title) this.all_title = title;
      else this.all_title = "";
      // console.log(this.all_title)
    });
  },
  deactivated() {
    this.showSelectGame = false;
    this.bus.$off("changeTitle");
    this.show = false;
  },
  mounted() {
    const guideIsShow = JSON.parse(localStorage.getItem("betGuide"));
    if (!guideIsShow) {
      this.guide = true;
    }
  },
  watch: {
    "$store.state.betting.name_tag": "changeNameTag"
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.head {
  width: 100%;
  position: relative;
  height: poTorem(48px);
  .bet_guide {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2000;
    height: 100%;
    width: 100%;
  }
  .head_con {
    @include between;
    user-select: none;
    background: url(~img/goucai/goucaibg.png);
    width: 100%;
    height: poTorem(48px);
    position: relative;
    top: 0;
    z-index: 1999;
    &.head_con_pig {
      @include pigbg;
    }
    .go_back {
      position: relative;
      width: 20%;
      height: poTorem(48px);
    }
    .icon {
      background: url(~img/shouye/back.png) no-repeat;
      width: poTorem(60px);
      height: poTorem(20px);
      position: absolute;
      top: 30%;
      left: 30%;
      background-size: poTorem(20px) poTorem(20px);
    }
    .title {
      text-align: center;
      font-size: poTorem(16px);
      color: #fff;
      font-weight: bolder;
      @include center;
      align-items: baseline;
      i {
        font-size: poTorem(16px);
      }
      span {
        font-size: poTorem(14px);
        display: block;
        max-width: poTorem(100px);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .trangle {
        width: 0px;
        height: 0px;
        border-bottom: solid poTorem(6px) #ffffff;
        border-right: solid poTorem(6px) #ffffff;
        border-top: solid poTorem(6px) $mainColor;
        border-left: solid poTorem(6px) $mainColor;
        margin-left: poTorem(5px);
      }
    }
    .switch {
      @include around;
      width: 20%;
      span {
        font-size: poTorem(16px);
        color: #fff;
        font-weight: bolder;
      }
      i {
        display: inline-block;
        background: url(~img/goucai/switch.png);
        width: poTorem(23px);
        height: poTorem(23px);
        background-size: cover;
        transition: transform 0.3s ease;
      }
      i.slidedown {
        transform: rotate(180deg) translateZ(0);
      }
    }
  }
  .head_model {
    .animated {
      animation-duration: 0.25s;
    }
    .bg {
      width: 100%;
      height: poTorem(736px);
      position: absolute;
      top: poTorem(48px);
      left: 0;
      background: #000;
      opacity: 0.5;
      z-index: 20;
    }
    .shadow {
      position: absolute;
      left: 0;
      width: 100%;
      height: poTorem(60px);
      background: #fff;
      z-index: 21;
      @include center;
      span {
        height: poTorem(35px);
        width: 30%;
        background: #fff;
        @include center;
        margin: 0 poTorem(20px);
        border-radius: poTorem(5px);
        font-size: poTorem(18px);
        color: #1e2123;
        font-weight: bold;
        border: 1px solid #d2d3d5;
      }
      .actives {
        background: #e13a39;
        color: #fff;
      }
    }
  }
}
.tips_rr {
  padding-top: 0.5rem;
  border-radius: 0.25rem;
  p {
    text-align: center;
    line-height: 2rem;
    &:first-child {
      font-size: 1.5rem;
      color: #e33939;
    }
    &:nth-child(2) {
      line-height: 2rem;
      font-size: 1rem;
      color: #535353;
    }
    &:nth-child(3) {
      width: 100%;
      border-top: poTorem(1px) solid #ddd;
      button {
        outline: none;
        border: none;
        height: 3rem;
        width: 49%;
        line-height: 2rem;
        font-size: 1rem;
        // border-radius: 0.25rem;
        color: #535353;
        &:first-child {
          border-right: poTorem(1px) solid #ddd;
        }
      }
    }
  }
}
</style>
