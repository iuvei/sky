<template>
  <div class="chatroom-buy"
       :class="{'disable':disable}">
    <span class="more"
          @click="triggerToggle">
      <i class="icon"></i>
      更多
    </span>
    <input type="number"
           placeholder="请输入购买金额"
           v-model="price">
    <button class="btn zh"
            @click="zh">追号</button>
    <button :class="[{'active': able,'submitting':this.submitting},'btn xz']"
            @click.stop.prevent="buy">{{betText}}</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ChatRoom_Buy",

  props: {
    gameItem: {
      type: Object,
      default: {}
    },
    submitting: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      price: "",
      toggle: false,
      description: "",
      able: false,
      disable: false,
      betText: "下注"
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.userinfo.isLogin,
      betNumber: state => state.betting.betNumber,
      isChatRouter: state => state.chat.isChatRouter
      // modelShow: state => state.betting.modelShow // 不知道为啥map不到
    })
  },
  mounted() {},
  created() {
    this.$root.Bus.$on("betMenu", value => {
      this.print(value);
    });
  },
  methods: {
    zh() {},
    triggerToggle() {
      this.toggle = !this.toggle;
      this.bus.$emit("showMore", this.toggle);
      // this.$emit('hideTop')
    },
    buy() {
      if (this.disable || !this.able) return;

      if (!this.$store.state.userinfo.isLogin) {
        this.$dialog.alert({ mes: "请先登录" });
        return;
      }
      if (!this.betNumber) {
        this.$dialog.alert({ mes: "请选择号码球" });
        return;
      }
      if (!/^\d+(\.\d?\d?)?$/.test(this.price)) {
        this.$dialog.alert({ mes: "请输入正确的投注金额" });
        return;
      }
      const price = Number(this.price);
      if ((price > 0 && price < 0.1) || price === 0) {
        this.$dialog.alert({ mes: "最低投注金额为 0.1 元" });
        return;
      }
      if (price > 999999) {
        this.$dialog.alert({ mes: "最大金额不能大于99万" });
        return;
      }

      // 投注
      this.$emit("buy", this.price);
    },

    // 超时处理
    buyTimeoutCallback() {
      // 未激活状态
      // this.$vnode.componentInstance._inactive
      // if (this.$vnode.componentInstance._inactive) {
      //   this.$dialog.alert({ mes: "请求超时，请重新下注" });
      //   this.submitting = true;
      // }
    },

    print(value) {
      this.description = `<b>范例</b>：${
        value.play_fanli
      }<br><br><b>玩法说明</b>：${value.play_shuoming}`;
    },
    openConfrim() {
      this.toggle = false;
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
    touzhu_log() {
      this.$store.state.betRecordsType = 0;
      this.$router.push({
        name: "goucaijilu",
        params: {
          fromOutside: true
        }
      });
    }
  },

  // computed: {
  //   ...mapState({
  //     betNumber: state => state.betting.betNumber
  //   })
  // },

  watch: {
    betNumber(val) {
      this.able = val > 0;
    },

    "$store.state.betting.modelShow"(val) {
      if (this.$route.name === "liaotianshi") this.disable = val;
    },

    submitting(newVal, oldVal) {
      if (!newVal && oldVal) {
        this.price = "";
      }
      this.betText = newVal ? "提交中" : "下注";
    },

    isChatRouter(val) {
      if (!val) {
        this.price = "";
      }
    }
  },
  deactivated() {
    this.toggle = false;
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../css/resources.scss";
@mixin css {
  background-size: contain;
  width: poTorem(25px);
  height: poTorem(30px);
}

$height: calc(100vw * 0.083);
.chatroom-buy {
  span,
  input,
  button {
    font-family: "lucida grande", "lucida sans unicode", lucida, helvetica,
      "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  }
  padding-right: 10px;
  position: relative;
  background: #434343;
  color: #fff;
  width: 100%;
  display: flex;
  height: 12.5vw;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  .more {
    height: $height;
    position: relative;
    line-height: 2.2;
    color: #fff;
    padding: 0 10px;
    &:before {
      content: "";
      width: 20px;
      height: 20px;
      background: url(~/img/goucai/more.png) no-repeat top center;
      background-size: 20px 20px;
    }
    border-right: 2px solid #535353;
    .icon {
      display: inline-block;
      background: url(~img/goucai/more.png) center no-repeat;
      background-size: contain;
      width: 20px;
      height: 20px;
      vertical-align: sub;
    }
  }

  input {
    border-radius: 25px;
    width: 40%;
    height: $height;
    background-color: #fff;
    border: none;
    padding: 0 10px;
  }

  .btn {
    border-radius: 25px;
    color: #fff;
    height: $height;
    border: none;
    padding: 0 1.1rem;

    &.zh {
      background-color: #ff7c34;
    }
    &.xz {
      background-color: #ccc;
      &.active {
        background-color: #e33939;
      }
      &.submitting {
        background-color: #ccc;
      }
    }
  }
  &.disable:after {
    // &:after {
    content: " ";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 6;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>
<style lang="scss">
.chatroom-buy {
  .mint-popup-bottom {
    left: 10%;
  }
}
</style>

