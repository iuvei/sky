<template>
  <mt-popup class="popupBox box-top"
            v-model="show"
            position="bottom">
    <div class="touzhu_log"
         @click="goBetRecord">
      <i class="icon"></i>
      <p>投注记录</p>
    </div>
    <div class="the_basic_trend"
         v-if="gameItem"
         @click="goTrend">
      <i class="icon"></i>
      <p class='title_zs'>基本走势</p>
    </div>
    <div class="game_shows">
      <i class="icon"></i>
      <p @click="openConfrim">玩法说明</p>
    </div>
  </mt-popup>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "chatroom_more",

  // props: {
  //   toggle: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      show: this.value,
      description: ""
    };
  },

  created() {
    this.$root.Bus.$on("betMenu", item => {
      this.buildDes(item);
    });
  },

  methods: {
    goBetRecord() {
      this.$store.state.betRecordsType = 0;
      this.$router.push({
        name: "goucaijilu",
        params: {
          fromOutside: true
        }
      });
    },

    goTrend() {
      this.$router.push({
        name: "zouShi",
        params: {
          lotter_id: this.gameItem.game_id,
          game_name: this.gameItem.game_name
        }
      });
    },

    openConfrim() {
      // this.toggle = false;
      this.show = false;
      this.$dialog.confirm({
        // title: "", //"玩法说明",
        mes: this.description,
        opts: [
          {
            txt: "确定",
            color: true,
            stay: false
          }
        ]
      });
    },

    buildDes(playItem) {
      this.description = `<b>范例</b>：${
        playItem.play_fanli
      }<br><br><b>玩法说明</b>：${playItem.play_shuoming}`;
    }
  },

  computed: {
    ...mapState({
      gameItem: state => state.betting.game
    })
  },

  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../css/resources.scss";
@mixin _icon {
  background-size: contain;
  width: poTorem(25px);
  height: poTorem(30px);
}
.popupBox {
  width: poTorem(150px);
  height: poTorem(140px);
  background: url("~img/goucai/beijing1.png") center no-repeat;
  background-size: contain;
  margin-bottom: poTorem(48px);
  left: 5rem;
  font-size: poTorem(18px);
  display: flex;
  flex-direction: column;
  align-items: center;
  .the_basic_trend,
  .game_shows,
  .touzhu_log {
    width: 90%;
    height: poTorem(44px);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #111112d9;
    i {
      margin-right: poTorem(10px);
    }
  }
  .the_basic_trend,
  .touzhu_log {
    border-bottom: poTorem(1px) solid #e1d9d9;
  }
  .the_basic_trend {
    .icon {
      background: url(~img/goucai/jibenzoushi.png) center no-repeat;
      @include _icon;
    }
  }
  .game_shows {
    .icon {
      background: url(~img/goucai/wanfa_shuoming.png) center no-repeat;
      @include _icon;
    }
  }
  .touzhu_log {
    .icon {
      background: url(~img/chatRoom/bet_record.png) center no-repeat;
      @include _icon;
    }
  }
}
</style>
