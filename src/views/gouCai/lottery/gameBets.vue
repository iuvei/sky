<template>
<div>
  <div class="num">
    <div class="left">
      <span v-show="!betNum.length">请选择号码</span>
      <span class="n" v-for="(item, index) in betNum" :key="index">{{result[item - 1]}}
        <i>@{{odd[item - 1]}}</i>
      </span>
    </div>
    <div class="right">
      <span>预计盈利<span class="m">{{setprofit()}}</span>元</span>
    </div>
  </div>
  <div class="shop">
    <div class="clear" @click="clearAction">
      <i class="icon"></i>
      <span>清空</span>
    </div>
    <div class="play" @click="openConfrim">
      <i class="icon"></i>
      <span>说明</span>
    </div>
    <!-- 
    <div class="play">
      <i class="icon"></i>
      <span @click="openConfrim">玩法说明</span>
    </div> -->
    <div class="money">
      <input type="number" placeholder="请输入购买金额" v-model="money">
    </div>
    <div :class="[{'active': !isTouzhuEnable},'bet']" @click="betting" :style="this.betNum.length?'':'background-color: #ccc'">
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
    <!-- <model-bet :show='show' @close="close"></model-bet> -->
  </div>
</div>
</template>
<script>
import modelBet from "./modelBet";
import { mapState, mapActions } from "vuex";
import api from '../../../../api/betting'
export default {
  props: ['betNum'],
  data() {
    return {
      descriptions: "",
      show: false,
      tipShow: false,
      quotation: true,
      isTouzhuEnable: true,
      money:'',
      data:[],
      odds:'',
      result:['闲一','闲二','闲三','闲四','闲五'],
      toggle: false
    };
  },
  mounted() {
    this.descriptions = "";
  },
  methods: {
    ...mapActions([
      'description',
      'playSwitch',
      'setBetNumber',
      'setBetOdds',
      'setBetUOdds',
      'setBetOdd',
      'setQishu',
      'clearCart',
      'setBetData',
      'updatePrice'
    ]),
    numbers(){
      let num = []
      for (let i = 0; i < this.betNum.length; i++) {
        num.push(this.result[this.betNum[i]-1])
      }
      return num.join()
    },
    betting(){
      if (this.isLogin && this.isTouzhuEnable) {
        if(this.betNum.length == 0){
          this.$dialog.toast({mes: `请选择投注号码`})
          return
        }
        if(this.money <= 0){
          this.$dialog.toast({mes: `请输入投注金额`})
          return
        }
        this.data = []
        for (let i = 0; i < this.betNum.length; i++) {
          this.data.push('1#'+this.money+'#'+(this.betNum[i]-1))
        }
        this.$ajax('request', {
          ac: 'userSubmitTouzhu',
          ver: 'v1.0.0',
          client_type: 1,
          gameid: this.gameId,
          qishu: this.qishu,
          data: JSON.stringify(this.data).replace('/\\/g', ''),
          auto: 1,
          stop: 1,
          multiple: 1,
        }).then(res => {
          this.updatePrice(res.less)
          this.$dialog.toast({
            mes: `投注成功,余额：${res.less}元`
          })
          this.money = ''
          this.$emit('resetBetnum')
        })
      } else if (!this.isLogin) {
        this.$dialog.confirm({
          title: '温馨提示',
          mes: '您未登录，请先登录',
          opts: () => {
            this.$router.push({
              path: '/login',
              query: { redirect: this.$route.fullPath }
            })
          }
        })
      }
    },
    close(val) {
      this.show = false;
    },
    buy() {
      if (this.isLogin && this.isTouzhuEnable) {
        this.show = true;
      } else if (!this.isLogin) {
        this.tipShow = true;
      }
    },
    clearAction() {
      this.money = ''
      this.$emit('resetBetnum')
    },
    setprofit(){
      let profit = 0
      for (let i = 0; i < this.betNum.length; i++) {
        profit += this.money*this.odd[this.betNum[i]-1]
      }
      return Math.floor(profit*100)/100 || 0
    },
    openConfrim() {
      this.$dialog.confirm({
        // title: "", //"玩法说明",
        mes: this.descriptions,
        opts: [
          {
            txt: '确定',
            color: true,
            stay: false
          }
        ]
      })
    },
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
      qishu: state => state.betting.qishu,
      isLogin: state => state.userinfo.isLogin,
      odd: state => state.betting.odd,
    }),
    isTouzhuEnable(val) {
      return this.quotation && this.betNumber;
    }
  },
  components: {
    modelBet
  },
  activated() {
    
  },
  deactivated() {
    this.money = ''
    this.show = false;
    let confirmDom = document.querySelector('.yd-dialog-black-mask .yd-confirm-btn')
    if(confirmDom) {
      confirmDom.click()
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
.num {
  overflow: hidden;
  background-color: #eaeaea;
  padding: poTorem(10px);
  font-size: poTorem(16px);
  .left {
    // width: 65%;
  }
  .right {
    height: auto;
    text-align: right;
    // width: 35%;
  }
  >div {
    display: inline-block;
    // height:poTorem(50px);
    word-wrap: break-word;
    span {
      // font-size: poTorem(16px);
    }
    .n {
      i {
        color: #e33939;
      }
    }
    .m {
      color: #e33939;
    }
  }
  .right {
    float: right;
  }
}

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
      font-size: poTorem(20px);
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
    flex: 1;
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
    background: #e33939;
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
  .money {
    padding: 0 poTorem(10px);
    input {
      border: none;
      background-color: #fff;
      width: poTorem(120px);
      height: poTorem(30px);
      border-radius: poTorem(3px);
      padding: 0 poTorem(5px);
      font-size: poTorem(16px);
    }
  }
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
}
</style>
