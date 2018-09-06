<template>
  <div class="heads" ref="heads">
    <div :class="[{'ios_phone_header': isnested}, 'phone_header']" v-if="!isnested">
      <div class="pull_left">
      </div>
      <div :class="[{'ios_pull_title': isnested}, 'pull_title']">
        <span>基本走势</span>
      </div>
      <div :class="[{'ios_pull_right': isnested}, 'pull_right']" @click="show = !show">
        <i :class="{'rotate_pos': show}"></i>
        <span>彩种</span>
      </div>
    </div>
    <select-game @afterSelectGame="afterSelectGame" :id="gameId" :autoSelect="true" :show="show"></select-game>
    <lotteryHistory :listType="listType" ref="zoushiLottery" :iosKaijiang="iosKaijiang"></lotteryHistory>
  </div>

</template>
<script>
import selectGame from "./selectGame";
import { mapState, mapActions } from "vuex";
import lotteryHistory from "../../kaiJiang/details/lotteryHistory";
import {
  trendDataToView,
  getTrendDigitByName,
  findDigitsByName
} from "../../../js/trendUtil.js";
export default {
  props: ["iosKaijiang", 'lotId'],
  components: {
    selectGame,
    lotteryHistory
  },
  data() {
    return {
      show: false,
      isDetective: false,
      games: [],
      game: {},
      listType: []
    };
  },
  computed: {
    ...mapState({
      gameName: state => state.trend.gameName,
      gameId: state => state.trend.gameId,
      digits: state => state.trend.digits,
      trendData: state => state.trend.trendData,
      speed: state => state.trend.speed,
      isnested: state => state.isnested
    })
  },
  watch: {
    digits(val) {
      let headClassList = this.$refs.heads.classList;
      val.length > 5
        ? headClassList.add("double")
        : headClassList.remove("double");
    },
    show(val) {
      // if (val === true) {
      //   document.querySelector(".bg").style.height =
      //     document.querySelector(".echart_con").clientHeight +
      //     document.querySelector(".zoushi .phone_header").clientHeight +
      //     "px";
      // }
    }
  },
  // activated() {
  //   if (this.isnested) {
  //     //     let webReadyInitSend = window.WebViewInvoke.bind('initSend')
  //     //     let iosData = await webReadyInitSend()
  //     //     this.$dialog.alert({mes : iosData})
  //     //     this.isDetective = iosData === 0 ? true : false
  //     window.document.addEventListener("message", e => {
  //       let iosData = JSON.parse(e.data);
  //       // this.$dialog.alert({mes: iosData})
  //       if (iosData.game_id) {
  //         let basicData = {
  //           game_id: iosData.game_id,
  //           game_name: iosData.game_name,
  //           js_tag: iosData.js_tag,
  //           tag: iosData.tag,
  //           speed: iosData.speed
  //         };
  //         this.afterSelectGame(basicData);
  //       }
  //     });
  //   }
  // },
  methods: {
    ...mapActions([
      "setGameTrend",
      "setGameDigits",
      "setTrendData",
      "setGameNumbers",
      "setTrendval"
    ]),
    afterSelectGame(game) {
      console.log(game);
      // this.$refs.zoushiLottery.activeIndex = 1;
      this.listType = {
        lotter_id: game.game_id,
        js_tag: game.js_tag,
        name_tag: game.tag,
        game_name: game.game_name,
        speed: game.speed,
        enable: game.enable
      };
      this.setGameTrend(game);
      let digits = findDigitsByName(game.game_name);
      this.setGameDigits(digits);
      this.setGameNumbers(getTrendDigitByName(game.game_name));
      this.setTrendval(0);
      this.show = false;
    },
    getGameNumbersByName(gameName) {
      return getTrendDigitByName(gameName);
    }
  },
  deactivated() {
    this.show = false;
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.heads{
  display:flex;
  flex-direction: column;
  flex: 1;
  height: 0;
  height: calc(100% - 3rem);
  width: 100%;
}
.heads.double {
  // margin-bottom: poTorem(88px);
}
.phone_header {
  @include center;
  height: poTorem(48px);
  background: url(../../../img/phone_header.png) CENTER TOP;
  position: relative;
  z-index: 21;
  .pull_title,
  .pull_left,
  .pull_right {
    width: 33.3%;
    @include center;
    font-size: poTorem(18px);
    color: #fff;
    font-weight: bolder;
  }
  .pull_left {
    @include start;
    img {
      width: poTorem(20px);
      height: poTorem(20px);
    }
  }
  .pull_right {
    font-size: poTorem(16px);
    i {
      margin-right: poTorem(5px);
      display: inline-block;
      background: url(~img/goucai/switch.png);
      width: poTorem(18px);
      height: poTorem(18px);
      background-size: poTorem(18px) poTorem(18px);
      transition: all 0.3s ease;
    }
    .rotate_pos {
      transform: rotate(180deg);
    }
  }
  .pull_title {
    @include center;
  }
  .ios_pull_title {
    font-size: poTorem(20px);
  }
  .ios_pull_right {
    font-size: poTorem(19px);
  }
}
.ios_phone_header {
  height: poTorem(70px);
  padding-top: poTorem(20px);
}
.popup {
  .pop_head {
    width: 100%;
    height: poTorem(38px);
    line-height: poTorem(38px);
    box-sizing: border-box;
    position: relative;
    color: #666;
    font-size: poTorem(20px);
    font-weight: bolder;
    text-align: center;
  }
  ul {
    width: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    padding: poTorem(8px);
    max-height: poTorem(358px);
    @include start;
    flex-wrap: wrap;
    li {
      background: #fff;
      width: 30%;
      height: poTorem(34px);
      line-height: poTorem(34px);
      overflow: hidden;
      white-space: nowrap;
      text-align: center;
      float: left;
      margin: 1.5%;
      color: #6f6f6f;
      text-overflow: ellipsis;
      font-size: poTorem(14px);
    }
    li.active {
      background: url(../../../img/account/choosed.png) no-repeat bottom right;
      background-size: 20%;
      border: 1px solid #c91b1b;
      border-radius: 2px;
    }
  }
}
</style>
