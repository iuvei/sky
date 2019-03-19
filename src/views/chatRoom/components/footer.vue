<template>
  <div class="chat_footer">
    <ul class="bottom_navigation">
      <li v-for="(el, index) in optData"
          :key="index"
          @click="clickHandler(el, index)">
        <img :src="require('../../../img/chatRoom/'+ el.img +'.png')"
             alt="">
      </li>
    </ul>
    <!--投注-->
    <yd-popup v-model="betShow"
              position="bottom"
              height="110vw"
              class="betting-modal">
      <betting-tab :gameItem="gameItem"
                   @showGames="showSelectGames"></betting-tab>
    </yd-popup>
    <!--选择游戏-->
    <yd-popup v-model="showGames"
              position="bottom"
              height="15rem"
              class="chat-room-games">
      <select-games :games="games"
                    @selectGame="afterSelectGame"></select-games>
    </yd-popup>
    <!-- 11.30福利弹窗 -->
    <yd-popup class="welfare_tc"
              v-model="welfare"
              position="bottom"
              height="20%">
      <div class="welfare_box"
           type="warning"
           @click="welfare = false">
        <div class="envelope_box"
             @click="welfareEnvelopes">
          <div class="envelope_img"></div>
          <span class="envelope_icon">领红包</span>
        </div>
        <div class="sign_box"
             @click="jumpSign">
          <div class="sign_img"></div>
          <span class="sign_icon">签到</span>
        </div>
        <div class="activity_box"
             @click="jumpActivity">
          <div class="activity_img"></div>
          <span class="activity_icon">优惠活动</span>
        </div>
      </div>
    </yd-popup>
    <!-- 12.2领红包 -->
    <mt-popup class="welfareBox"
              v-model="jumpLedEnvelope"
              position="center">
      <div class="fl_envelopes">
        <span>福利红包</span>
        <span class="shut_down"
              @click="jumpLedEnvelope = false">
          <img src="~img/chatRoom/shutDown.png"
               alt="">
        </span>
      </div>
      <ul class="details_envelope">
        <li class="details_envelope_li"
            v-for="(el, index) in flhbData"
            :key="index">
          <div class="hb_name">{{el.name}}</div>
          <div class="hb_sr">发送<i>{{el.jl}}</i>元红包</div>
          <div class="hb_icon">
            <div class="hb_icon_can"
                 @click="toReceive">
              <span>领取</span>
            </div>
          </div>
        </li>
      </ul>
    </mt-popup>
  </div>
</template>
<script>
import BettingTab from "./foot/BettingTab";
import SelectGames from "./foot/SelectGames";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  name: "chatroom_footer",
  data() {
    return {
      welfare: false,
      jumpLedEnvelope: false,
      flhbData: [
        { name: "系统管理员1", jl: "800" },
        { name: "系统管理员2", jl: "8001" },
        { name: "系统管理员3", jl: "8002" },
        { name: "test0000001", jl: "80030" },
        { name: "系统管理员4", jl: "800300" },
        { name: "系统管理员4", jl: "8003" },
        { name: "系统管理员4", jl: "8003" },
        { name: "系统管理员4", jl: "8003" },
        { name: "系统管理员4", jl: "8003" },
        { name: "系统管理员4", jl: "8003" },
        { name: "系统管理员4", jl: "8003" },
        { name: "系统管理员4", jl: "8003" },
        { name: "系统管理员4", jl: "8003" },
        { name: "系统管理员4", jl: "8003" },
        { name: "系统管理员4", jl: "8003" },
        { name: "系统管理员4", jl: "8003" },
        { name: "系统管理员4", jl: "8003" },
        { name: "系统管理员4", jl: "8003" },
        { name: "系统管理员4", jl: "8003" }
      ],
      optData: [
        {
          img: "bet"
        },
        {
          img: "plan",
          path: "/plan"
        },
        {
          img: "fuli"
        },
        {
          img: "recharge",
          path: "/moreService/Nrecharge"
        },
        {
          img: "getCash",
          path: "/moreService/NgetCash"
        }
      ],
      betShow: false,
      showGames: false
    };
  },
  components: {
    BettingTab,
    SelectGames
  },
  computed: {
    ...mapState(["chatRoom"]),
    ...mapState("chat", ["isChatRouter"]),
    ...mapGetters({
      games: "games"
    }),
    gameItem() {
      const game = this.$store.state.betting.game;
      if (Object.keys(game).length) return this.$store.state.betting.game;
      this.setGame(this.games[0]);
      return this.games[0];
    }
  },
  methods: {
    ...mapActions(["setGame"]),
    afterSelectGame() {
      this.showGames = false;
      this.betShow = true;
    },

    clickHandler(n, i) {
      if (n.hasOwnProperty("path")) {
        this.$router.push(n.path);
      } else {
        switch (i) {
          case 0:
            if (!this.chatRoom.touzhu_on) {
              this.$dialog.toast({
                mes: "该账号暂无投注权限 ，有疑问请联系客服"
              });
              return;
            }
            this.betShow = true;
            break;
          case 2:
            this.welfare = true;
            break;
        }
      }
    },
    welfareEnvelopes() {
      return this.$dialog.toast({ mes: "领红包暂未开放，敬请期待" });
      // this.jumpLedEnvelope = !this.jumpLedEnvelope;
    },
    toReceive() {
      console.error("跳转领红包");
    },
    jumpSign() {
      this.$router.push("/moreService/signIn");
    },
    jumpActivity() {
      this.$router.push("/promotion");
    },
    // 显示选择游戏
    showSelectGames() {
      this.betShow = false;
      this.showGames = true;
    }
  },
  watch: {
    isChatRouter(val) {
      if (!val) {
        this.betShow = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.chat_footer {
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .bottom_navigation {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 3rem;
      height: 3.2rem;
    }
  }
  .welfare_tc {
    .welfare_box {
      width: 100%;
      height: 8.75rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #434343;
      font-size: 1.1rem;
      font-weight: 500;
      .envelope_box {
        text-align: center;
        .envelope_img {
          width: 4rem;
          height: 4rem;
          display: table;
          background: url(~img/chatRoom/ledEnvelope.png);
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
      .sign_box {
        text-align: center;
        .sign_img {
          width: 4rem;
          height: 4rem;
          display: table;
          background: url(~img/chatRoom/signimg.png);
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
      .activity_box {
        text-align: center;
        .activity_img {
          width: 4rem;
          height: 4rem;
          margin-left: 0.2rem;
          display: table;
          background: url(~img/chatRoom/yhActivity.png);
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
    }
  }
  .welfareBox {
    width: 88%;
    height: 31.8rem;
    background: #fff;
    border-radius: 2%;
    overflow: hidden;
    .fl_envelopes {
      width: 100%;
      height: 4rem;
      color: #fff;
      font-size: 1.3rem;
      font-weight: 600;
      background: #e33939;
      display: flex;
      justify-content: center;
      align-items: center;
      .shut_down {
        position: relative;
        img {
          width: 1.4rem;
          height: 1.4rem;
          position: absolute;
          margin-left: 5.5rem;
          margin-top: -0.7rem;
        }
      }
    }
    .details_envelope {
      width: 100%;
      height: 100%;
      overflow: scroll;
      .details_envelope_li {
        width: 96%;
        height: 4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1rem;
        margin-left: 0.36rem;
        border-bottom: #434343 1px dashed;
        div {
          height: 2.3rem;
          line-height: 2.3rem;
        }
        .hb_name {
          width: 33%;
          color: #ff7c32;
        }
        .hb_sr {
          width: 46%;
          color: #818181;
          i {
            padding: 0 0.2rem;
          }
        }
        .hb_icon {
          width: 21%;
          color: #fff;
          .hb_icon_can {
            text-align: center;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            background: #e33939;
          }
        }
      }
    }
  }
  .bet_main {
    .flag {
      height: poTorem(32px);
      position: absolute;
      top: -2rem;
      p {
        line-height: 2rem;
        font-size: 1rem;
        text-align: center;
        display: inline-block;
        height: 2rem;
        width: poTorem(128px);
        &:first-child {
          background: transparent url(../../../img/chatRoom/bet_name.png) center
            no-repeat;
          background-size: 100% 100%;
        }
        &:nth-child(2) {
          background: transparent url(../../../img/chatRoom/change_bet.png)
            center no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.betting-modal {
  .yd-popup-content {
    overflow: hidden;
  }
  // 内容
  .yd-popup-content > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  // 背景
  .yd-popup,
  .yd-tab-nav-nomal,
  .yd-tab-nav {
    background: transparent !important;
  }
  .yd-tab-nav {
    flex: none;
    float: left;
    display: block;
    // margi100px !importantn-left: 18px;
  }
}
</style>
