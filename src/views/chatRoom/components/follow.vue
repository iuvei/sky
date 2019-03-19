<template>
  <yd-popup v-model="show"
            position="center"
            width="88%"
            class="follow">
    <section>
      <div class="header">
        <h2>{{followItem.gameName}}</h2>
        <i class="close"
           @click="close"></i>
        <p class="grey">
          <span>第 <b>{{qishu}}</b> 期</span>&nbsp;&nbsp;&nbsp;
          <span>封盘时间:
            <b>
              <AppCountDown ref="stopless"
                            :time="stopless"
                            timetype="second"
                            :format="format"
                            done-text="已封盘"
                            :callback="endCallback"></AppCountDown>
            </b>
          </span>
        </p>
      </div>
      <div class="body">
        <ul>
          <li>
            投注玩法 <b>{{playObj.wanfa}}</b>
          </li>
          <li>
            投注详情 <b>{{playObj.xiangqing}}</b>
          </li>
          <li>
            投注注数： <b>{{playObj.zhushu}}</b>
          </li>
          <li>
            投注金额： <b>{{playObj.per_price}}</b> 元
          </li>
        </ul>
      </div>
      <div class="footer">
        <div class="row">
          <strong>跟单金额</strong>
          <input type="number"
                 v-model="price">
          <strong>元</strong>
          <button @click.stop.prevent="betFollow"
                  :class="{'disable':stopless===0}">确定跟单</button>
        </div>
        <div class="row">
          <ul class="fast-select-price">
            <li v-for="(item, index) in priceList"
                :key="index"
                :class="{'active':price==item}"
                @click="choosePrice(item)">
              ￥{{item}}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </yd-popup>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";

import encode from "~/js/encode";
import _encodeKey from "../../../../server/encodeKey";
import md5 from "js-md5";
import qs from "qs";
import { randomFormtoken } from "~/js/user/gsfunc";
// import WS from "../message/js/websocket";

import api from "../../../../api/betting";
export default {
  name: "chatroom_follow",
  props: {
    showFollow: {
      type: Boolean,
      default: false
    },
    followItem: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      show: this.showFollow,
      priceList: [50, 100, 200, 500, 800, 1000, 2000, 3000],
      price: "",
      stopless: 0,
      submitting: false,
      qishu: this.followItem.boardcast.qishu
    };
  },

  methods: {
    ...mapActions(["updatePrice"]),
    ...mapActions("chat", ["follow"]),
    close() {
      this.show = false;
    },

    choosePrice(item) {
      this.price = item;
    },

    // 显示倒计时
    async showNextStop() {
      const game =
        this.games &&
        this.games.find(x => x.game_id === this.followItem.boardcast.gameid);
      if (game && game.tag) {
        const data = await api.getNextStop(game.tag);
        if (Array.isArray(data) && data.length) {
          const nextList = data[0].next;
          const obj = nextList.find(
            x => x.qishu === this.followItem.boardcast.qishu
          );
          if (obj && obj.stopless) {
            this.stopless = obj.stopless;
          } else {
            const item = nextList[0].stopless === 0 ? nextList[1] : nextList[0];
            this.stopless = item.stopless;
            this.qishu = item.qishu;
          }
          // this.stopless = obj ? obj.stopless || 0 : nextList[0].stopless;
        }
      }
    },

    async endCallback() {
      // this.stopless = 0;
      await this.showNextStop();
    },

    getSubmitData() {
      const data = [
        `${this.playObj.playid}#${this.price}#${this.playObj.balls
          .split(" ")
          .join("+")}`
      ];
      return JSON.stringify(data);
    },

    assemblyBetData() {
      return {
        ac: "userSubmitTouzhu",
        ver: "v1.0.0",
        client_type: 1,
        token: this.userinfo.token,
        sessionkey: this.userinfo.session_key,
        uid: this.userinfo.uid,
        gameid: this.followItem.boardcast.gameid,
        qishu: this.qishu,
        data: this.getSubmitData(),
        auto: this.followItem.boardcast.auto,
        stop: this.followItem.boardcast.stop,
        multiple: this.followItem.boardcast.multiple,
        form_unique_token: randomFormtoken(),
        is_dj: 2, // 跟单投注这里要设置2
        voucher: 0
      };
    },

    async betFollow() {
      let confirm = true;
      if (!this.stopless) return;
      const price = Number(this.price);
      if (!this.$store.state.userinfo.isLogin) {
        this.$dialog.alert({ mes: "请先登录" });
        return;
      }
      if (!price) {
        this.$dialog.alert({ mes: "请输入正确的投注金额" });
        return;
      }
      if (!/^\d+(\.\d?\d?)?$/.test(price)) {
        this.$dialog.alert({ mes: "请输入正确的投注金额" });
        return;
      }
      if ((price > 0 && price < 1) || price === 0) {
        this.$dialog.alert({ mes: "最低投注金额为 1 元" });
        return;
      }
      if (price > 999999) {
        this.$dialog.alert({ mes: "最大金额不能大于99万" });
        return;
      }
      if (this.qishu !== this.followItem.boardcast.qishu) {
        confirm = false;
        // const _confirm = ()=> confirm = true
        this.$dialog.confirm({
          title: "",
          mes: "当前投注期数与跟单期数不一致，是否确定投注？",
          opts: async() => {
            await this.bet();
          }
        });
      }
      if (!confirm) return;
      if (this.submitting) return;
      await this.bet();
    },

    async bet() {
      const price = Number(this.price);
      this.submitting = true;
      const betData = this.assemblyBetData(price);
      const params = qs.stringify(betData);
      const encodeData = `DEX${encode(params, _encodeKey)}${md5(
        decodeURIComponent(params) + "&encode=" + _encodeKey
      )}`.toUpperCase();

      const sendData = await this.follow(encodeData);
      this.$ws.sendMessage(sendData);
      const showInfo = Object.assign(betData, {
        code: sendData.code,
        labels: [this.playObj.xiangqing],
        playname: this.playObj.wanfa,
        gamename: this.followItem.gameName,
        zhushu: this.playObj.zhushu,
        price
      });

      this.bus.$emit("sendBetInfo", {
        info: showInfo,
        key: 0
      });
    },

    buyCallback(res) {
      this.bus.$emit("sendBetInfo", { key: res.data ? 1 : 2, info: res });
      this.submitting = false;
      const isOk = res && res.data && !res.error,
        isSameUesr = res.UserToken === this.userToken;
      if (isOk && isSameUesr) {
        const { take, less } = res.data;
        if (take) {
          this.close();
          this.updatePrice(less);
          this.$dialog.toast({
            mes: `跟单成功,余额：${less}元`
          });
        } else {
          this.$dialog.toast({
            mes: `${res.param}`
          });
        }
      }
      if (res.error || !res.data) {
        this.$dialog.toast({
          mes: res.msg || res.param
        });
      }
    }
  },

  computed: {
    ...mapGetters({
      games: "games"
    }),
    ...mapState({
      userToken: state => state.chat.wsGlobalConfig.UserToken,
      userinfo: state => state.userinfo.accountInfo
    }),

    format() {
      return this.stopless >= 3600 ? "{%h}:{%m}:{%s}" : "{%m}:{%s}";
    },

    playObj() {
      return this.followItem.boardcast.self;
    }
  },

  async mounted() {
    await this.showNextStop();
    this.$ws.oncallback("TOUZHU_GDRESP", this.buyCallback);
  },

  watch: {
    showFollow(val) {
      this.show = val;
    },
    async show(val) {
      this.$emit("toggleShowFollow", val);

      if (!val) {
        this.price = "";
        // 隐藏时删除引用
        const $refs = this.$vnode.componentInstance.$refs;
        if (typeof $refs === "object" && "stopless" in $refs) {
          delete $refs.stopless;
          // console.log("$refs.stopless", $refs.stopless);
        }
      } else {
        await this.showNextStop();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.grey {
  color: #7d7d7d;
  font-size: 1rem;
}
section {
  padding: 10px;
}
.header {
  position: relative;
  border-bottom: 1px dashed #d6d6d6;
  h2 {
    font-size: 1.2rem;
  }
  h2,
  p {
    text-align: center;
    line-height: 2;
  }
  .close {
    width: 1rem;
    height: 1rem;
    background: url(../../../img/chatRoom/close.png) no-repeat top center;
    background-size: 1rem 1rem;
    display: inline-block;
    position: absolute;
    right: 3px;
    top: 1rem / 16px * 11px;
  }
}
.body {
  padding: 10px;
  li {
    font-size: 1rem;
    color: #7d7d7d;
    line-height: 2.2;
  }
}
.footer {
  padding: 0 10px;
  height: auto !important;
  background: #fff !important;
  flex-wrap: wrap;
  .row {
    justify-content: space-around;
    display: flex;
    align-items: center;
    width: 100%;
    color: #7d7d7d;
    font-size: 1rem;
    strong {
      padding: 0 6px 0 0;
    }
    input {
      width: 6rem;
      text-align: center;
      height: 1.8rem;
      border: 1px solid #d6d6d6;
      border-radius: 3px;
      margin-right: 6px;
      color: #e33939;
      font-size: 1.2rem;
    }
    button {
      background: #e33939;
      color: #fff;
      border: none;
      padding: 6px 10px;
      &.disable {
        background: #d6d6d6;
      }
    }
    .fast-select-price {
      margin: 1rem 0 0 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        border-radius: 3px;
        border: 1px solid #d6d6d6;
        color: #767675;
        height: 2rem;
        width: 4.2rem;
        margin-bottom: 10px;
        line-height: 2rem;
        text-align: center;
        line-height: 2rem;
        &.active {
          background: #e33939;
          color: #fff;
        }
      }
    }
  }
}
b {
  color: #e33939;
}
</style>
<style lang="scss">
.follow .yd-popup-center.yd-popup-show {
  border-radius: 5px !important;
}
</style>
