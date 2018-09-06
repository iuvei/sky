<template>
  <div class="shop">
    <div class="clear" @click="clearAction">
      <i class="icon"></i>
      <span>清空</span>
    </div>
    <!-- <div class="trend" @click="$router.push({name: 'zouShi', params: {lotter_id: gameId, game_name: gameName}})">
      <i class="icon"></i>
      <span>走势</span>
    </div> -->
    <div class="play">
      <i class="icon"></i>
      <span @click="openConfrim">玩法说明</span>
    </div>
    <div :class="[{'active': !isTouzhuEnable},'bet']" @click="buy">
      <i class="icon"></i>
      <span>
        <span>{{quotation ? "下注" : "已封盘"}}</span>
      </span>
    </div>
    <yd-popup v-model="tipShow" position="center" width="60%">
      <div class="tips">
        <p>温馨提示</p>
        <p>您尚未登录！！</p>
        <p>
          <button @click="tipShow = false">再看看</button>
          <button @click="$router.push('/login')">马上登录</button>
        </p>
      </div>
    </yd-popup>
    <!-- 投注界面 -->
    <model-bet :show='modelShow' @close="close"></model-bet>
  </div>
</template>
<script>
import modelBet from "../../modelBet";
import { mapState, mapActions } from "vuex";
export default {
  name:'ladder_shop',
  props: ["quotation"],
  data() {
    return {
      descriptions: "",
      // show: false,
      tipShow: false
    };
  },
  mounted() {
    this.descriptions = "";
  },
  methods: {
    ...mapActions(['modelBetShow']),
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
    close(val) {
      // this.show = false;
      this.modelBetShow(false)
    },
    buy() {
      if (this.isLogin && this.isTouzhuEnable) {
        this.modelBetShow(true)
      } else if (!this.isLogin) {
        this.tipShow = true;
      }
    },
    clearAction() {
      this.$emit("clearAll");
    }
  },
  watch: {
    description: function(val) {
      this.descriptions = val;
    },
    betNumber(val) {},
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
      modelShow: state => state.betting.modelShow
    }),
    isTouzhuEnable(val) {
      return this.quotation && this.betNumber;
    }
  },
  components: {
    modelBet
  },
  activated() {},
  deactivated() {
    // this.show = false;
    this.modelBetShow(false)
    let confirmDom = document.querySelector('.yd-dialog-black-mask .yd-confirm-btn')
    if(confirmDom) {
      confirmDom.click()
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
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
    flex: 1.3;
    height: 70%;
    .icon {
      background: url(~img/goucai/wanfashuoming.png) center no-repeat;
      @include css;
    }
  }
  .trend {
    height: 70%;
    .icon {
      background: url(~img/goucai/zoushi.png) center no-repeat;
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
        color: #ff7c34;
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
