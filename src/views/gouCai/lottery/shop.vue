<template>
  <div class="shop">
    <div class="clear"
         @click="clearAction">
      <i class="icon"></i>
      <span>清空</span>
    </div>
    <div class="trend"
         @click="toDeta">
      <i class="icon"></i>
      <span>投注记录</span>
    </div>
    <div class="play"
         @click="toggle=!toggle">
      <i class="icon"></i>
      <span>更多</span>
    </div>
    <div :class="[{'active': !isTouzhuEnable},'bet']"
         @click="buy">
      <i class="icon"></i>
      <span>
        <span>{{quotation ? "下注" : "已封盘"}}</span>
      </span>
    </div>
    <!-- <yd-popup v-model="tipShow" position="center" width="60%">
      <div class="tips">
        <p>温馨提示</p>
        <p>您尚未登录！！</p>
        <p>
          <button @click="tipShow = false">再看看</button>
          <button @click="$router.push('/login')">马上登录</button>
        </p>
      </div>
    </yd-popup> -->
    <!-- 投注界面 -->
    <model-bet v-if="modelShow"
               :show='modelShow'
               @close="close"
               @clearAll="clearAction"></model-bet>
    <!-- 701 -->
    <mt-popup class="popupBox"
              v-model="toggle"
              position="bottom">
      <div class="the_basic_trend"
           @click="$router.push({name: 'zouShi', params: {lotter_id: gameId, game_name: gameName}})">
        <i class="icon"></i>
        <p class='title_zs'>基本走势</p>
      </div>
      <div class="game_shows">
        <i class="icon"></i>
        <p @click="openConfrim">玩法说明</p>
      </div>
      <div class="lk_paper_figure"
           @click="paper_figure()">
        <i class="icon"></i>
        <p>路纸图</p>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import modelBet from "./modelBet";
import { mapState, mapActions } from "vuex";
// import bottomMixin from './bottomMixin'
export default {
  props: ["quotation"],
  // mixins: [bottomMixin],
  data() {
    return {
      toggle: false, // 521
      descriptions: "",
      show: false,
      tipShow: false
    };
  },
  mounted() {
    this.descriptions = "";
  },
  methods: {
    ...mapActions(["modelBetShow"]),
    directBet() {
      // console.log(this.dataSource[0].data.filter(item => item.price))
      this.toCart();
    },
    paper_figure() {
      this.$dialog.toast({ mes: "暂未开放，敬请期待" });
      return;
      // if (
      //   this.gameName === "分分六合彩" ||
      //   this.gameName === "三分六合彩" ||
      //   this.gameName === "香港⑥合彩"
      // ) {
      //   this.$dialog.toast({ mes: "该彩种没有这个功能" });
      // } else {
      //   this.$router.push({
      //     name: "paper",
      //     params: {
      //       lotter_id: this.gameId,
      //       game_name: this.gameName
      //     }
      //   });
      // }
    },
    openConfrim() {
      this.$dialog.confirm({
        // title: "", //"玩法说明",
        mes: this.descriptions,
        opts: [
          {
            txt: "确定",
            color: true,
            stay: false
          }
        ]
      });
    },
    close() {
      // this.show = false;
      this.modelBetShow(false);
    },
    buy() {
      if (this.isLogin && this.isTouzhuEnable) {
        if (this.ifZiXuan) {
          this.directBet();
        } else {
          this.modelBetShow(true);
        }
      } else if (!this.isLogin) {
        // this.tipShow = true
        // 换弹窗
        this.$dialog.confirm({
          title: "温馨提示",
          mes: "您未登录，请先登录",
          opts: () => {
            this.$router.push({
              path: "/login",
              query: { redirect: this.$route.fullPath }
            });
          }
        });
      }
    },
    clearAction() {
      this.$emit("clearAll");
    },
    toDeta() {
      this.$store.state.betRecordsType = 0;
      // this.$router.push('/moreService/betRecords')
      this.$router.push({
        name: "goucaijilu",
        params: {
          fromOutside: true
        }
      });
    }
  },
  watch: {
    description(val) {
      this.descriptions = val;
    },
    betNumber() {},
    isLogin(val) {
      if (val) this.tipShow = false;
    }
  },
  computed: {
    ...mapState({
      description: state => state.betting.description,
      betNumber: state => state.betting.betNumber, // 注数
      gameName: state => state.betting.gameName,
      gameId: state => state.betting.gameId,
      isLogin: state => state.userinfo.isLogin,
      modelShow: state => state.betting.modelShow,
      switch: state => state.betting.switch,
      dataSource: state => state.betting.betData.dataSource
    }),
    isTouzhuEnable() {
      return this.quotation && this.betNumber;
    },
    ifZiXuan() {
      if (this.switch == "自选下注") {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    modelBet
  },
  activated() {},
  deactivated() {
    this.toggle = false;
    this.modelBetShow(false);
    const confirmDom = document.querySelector(
      ".yd-dialog-black-mask .yd-confirm-btn"
    );
    if (confirmDom) {
      confirmDom.click();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
@mixin css {
  background-size: contain;
  width: poTorem(25px);
  height: poTorem(30px);
}
// .show-enter-active {
//   transition: all .3s;
// }
// .show-leave-active {
//   transition: all .3s reverse;
// }
// .show-enter, .show-leave-to {
//   transform: translateY(-100%);
//   opacity: 0;
// }

.shop {
  .popupBox {
    width: poTorem(150px);
    height: poTorem(140px);
    background: url("~img/goucai/beijing.png") center no-repeat;
    background-size: contain;
    margin-bottom: poTorem(60px);
    margin-left: poTorem(45px);
    font-size: poTorem(18px);
    display: flex;
    flex-direction: column;
    align-items: center;
    .the_basic_trend,
    .game_shows,
    .lk_paper_figure {
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
    .game_shows,
    .the_basic_trend {
      border-bottom: poTorem(1px) solid #e1d9d9;
    }
    .the_basic_trend {
      .icon {
        background: url(~img/goucai/jibenzoushi.png) center no-repeat;
        @include css;
      }
    }
    .game_shows {
      .icon {
        background: url(~img/goucai/wanfa_shuoming.png) center no-repeat;
        @include css;
      }
    }
    .lk_paper_figure {
      margin-right: poTorem(20px);
      .icon {
        background: url(~img/goucai/luzhi_tu.png) center no-repeat;
        @include css;
      }
    }
  }
  width: 100%;
  height: poTorem(57px);
  background: #434343;
  @include between;
  // position: fixed;
  bottom: 0;
  z-index: 12;
  .clear,
  .trend,
  .play,
  .bet {
    flex: 1;
    @include center;
    color: #fff;
    font-size: poTorem(16px);
    height: 100%;
    // border-right: 1px solid #515253;
    &:last-child {
      border-right: none;
    }
    .icon {
      margin-right: poTorem(10px);
    }
    > span {
      font-weight: bold;
    }
  }
  .clear {
    height: 70%;
    .icon {
      background: url(~img/goucai/qingkong.png) center no-repeat;
      @include css;
    }
  }
  .play {
    height: 70%;
    .icon {
      background: url(~img/goucai/more.png) center no-repeat;
      @include css;
    }
  }
  .trend {
    flex: 1.3;
    height: 70%;
    .icon {
      // background: url(~img/goucai/zoushi.png) center no-repeat;
      background: url(~img/goucai/bet_record.png) center no-repeat;
      @include css;
    }
  }
  .clear,
  .trend {
    border-right: poTorem(1px) solid #fff;
  }
  .bet {
    background: red;
  }
  .active {
    background-color: #ccc;
  }
  .tips {
    padding-top: poTorem(10px);
    background-color: #fff;
    p {
      font-size: poTorem(16px);
      text-align: center;
      &:first-child {
        padding-left: poTorem(20px);
        color: $mainColor;
        text-align: left;
      }
      &:nth-child(2) {
        padding: poTorem(20px);
        font-size: poTorem(18px);
        color: #535353;
        border-bottom: poTorem(1px) solid #eee;
      }
      &:last-child {
        @include around;
        button {
          line-height: poTorem(50px);
          width: 50%;
          outline: none;
          border: none;
          color: #535353;
          &:last-child {
            color: #e33939;
            border-left: poTorem(1px) solid #eee;
          }
        }
      }
    }
  }
}
</style>
