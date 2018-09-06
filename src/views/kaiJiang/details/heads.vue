<template>
    <div class="heads">
        <div class="heads_con">
            <router-link to="/lottery">
                <div class="icon"></div>
            </router-link>
            <div class="title">
                <div class="center_box">
                    {{listType.game_name}}
                </div>
            </div>
            <div class="switch" @click="openOptions">
                <i :class="[{'rotate_pos': isRotate}]"></i>
                <span>彩种</span>
            </div>
        </div>
        <select-game ref="kaijiangOptions" @afterSelectGame="switchKaiJiang" :gameId="$route.params.lotter_id"></select-game>
        <lotteryHistory :listType="listType" ref="lotteryHis" iosKaijiang="true"></lotteryHistory>
        <countdown :listType="listType"></countdown>
    </div>
</template>
<script>
import { user } from "../../../../api/index";
import { mapActions, mapState } from "vuex";
import selectGame from "../../zouShi/components/selectGame";
import lotteryHistory from "./lotteryHistory";
import countdown from "./countdown";
export default {
  data() {
    return {
      listType: [],
      gameId: [],
      routeList: [],
      data: [],
      val: "",
      isRotate: false
    };
  },
  components: {
    lotteryHistory,
    selectGame,
    countdown
  },
  activated() {
    console.log(this.$route.params)
    if(this.$route.params.lotter_id) {
      this.getDataFromRoute()
    }
  },
  // mounted() {
  //   this.getDataFromRoute()
  // },
  methods: {
    getDataFromRoute() {
      this.routeList = this.$route.params;
      this.listType = {
        lotter_id: this.routeList.lotter_id,
        js_tag: this.routeList.js_tag,
        name_tag: this.routeList.name_tag,
        game_name: this.routeList.game_name,
        speed: this.routeList.speed,
        enable: this.routeList.enable
      }
    },
    switchKaiJiang(game) {
      console.log(game);
      this.$refs.lotteryHis.activeIndex = 0;
      if(game) {
        this.listType = {
          lotter_id: game.game_id,
          js_tag: game.js_tag,
          name_tag: game.tag,
          game_name: game.game_name,
          speed: game.speed,
          enable: game.enable
        }
      }
      this.routeList.game_name = game.game_name;
      this.$refs.kaijiangOptions.self_show = false;
    },
    openOptions() {
      this.$refs.kaijiangOptions.self_show = !this.$refs.kaijiangOptions
        .self_show;
      this.isRotate = !this.isRotate;
    },
    greet(val) {
      this.val = val;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.heads {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .heads_con {
    @include between;
    background: url(~img/goucai/goucaibg.png);
    width: 100%;
    height: poTorem(48px);
    position: relative;
    z-index: 1000 !important;
    top: 0;
    a {
      position: relative;
      width: 20%;
      height: poTorem(48px);
    }
    .icon {
      background: url(~img/shouye/back.png) no-repeat;
      width: poTorem(40px);
      height: poTorem(35px);
      position: absolute;
      top: 30%;
      left: 30%;
      background-size: poTorem(20px) poTorem(20px);
    }
    .title {
      width: 60%;
      @include center;
      font-size: poTorem(18px);
      color: #fff;
      font-weight: bolder;
      .center_box {
        text-align: center;
      }
    }
    .switch {
      @include around;
      width: 20%;
      span {
        font-size: poTorem(17px);
        color: #fff;
        font-weight: bolder;
      }
      i {
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
  }
}
</style>
