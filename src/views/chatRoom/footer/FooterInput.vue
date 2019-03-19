<template>
  <div class='foot'
       :class="{showEmoji:this.showEmoji,stop:this.close}">
    <div class="bar">
      <div class="emoji-btn"
           @click="emoji">
        <img src="./img/emoji.png"
             alt="">
      </div>
      <div class="input-box">
        <input class="input"
               type="text"
               v-model="txt"
               :placeholder="placholder"
               ref="input"
               @focus="OnFocus"
               @blur="onBlur">
      </div>
      <div class="send"
           @click="send">
        <span :class="{disabled:disabledBtn}">发送</span>
      </div>
    </div>

    <Emoji v-show="showEmoji"
           @txt="addTxt"></Emoji>
  </div>
</template>
<script>
// import WS from "websocket-client-js";
import Emoji from "./components/emoji";
import { mapMutations, mapState } from "vuex";

export default {
  name: "foot",
  components: { Emoji },
  data() {
    return {
      txt: "",
      close: true,
      showEmoji: false,
      position: 0,
      msgStatus: false,
      unSend: false
    };
  },
  computed: {
    ...mapState("chat", ["isEmoji"]),
    ...mapState(["chatRoom"]),
    placholder() {
      return `等级达到LV.${this.chatRoom.talking_vip || 0}以上可以发言`;
    },
    disabledBtn() {
      if (!this.chatRoom.talk_on) {
        return !this.chatRoom.talk_on;
      }
      return this.unSend;
    }
  },
  methods: {
    ...mapMutations("chat", ["MODIFY_FIELD"]),
    emoji() {
      this.position = this.getPosition(this.$refs.input);
      this.MODIFY_FIELD({ isEmoji: !this.isEmoji });
    },
    sendEmoji() {
      this.showEmoji = !this.showEmoji;
      this.$nextTick(() => {
        this.bus.$emit("toBottom");
      });
    },
    getPosition(element = this.$refs.input) {
      let cursorPos = 0;
      if (document.selection) {
        // IE
        const selectRange = document.selection.createRange();
        selectRange.moveStart("character", -element.value.length);
        cursorPos = selectRange.text.length;
      } else if (element.selectionStart || element.selectionStart == "0") {
        cursorPos = element.selectionStart;
      }
      return cursorPos;
    },
    addTxt(txt) {
      this.txt =
        this.txt.slice(0, this.position) + txt + this.txt.slice(this.position);
      this.position += 2;
    },
    addEmojiTxt(txt) {
      console.log(txt);
      this.txt =
        this.txt.slice(0, this.position) + txt + this.txt.slice(this.position);
      this.position += 2;
    },
    async send() {
      if (this.disabledBtn) {
        this.$dialog.toast({
          mes: "该账号暂无发言权限 ，有疑问请联系客服"
        });
        return;
      }
      if (!this.txt) return;
      this.position = 0;
      this.showEmoji = false;
      this.bus.$emit("sendMessage", `${this.txt}`);
      this.txt = "";
      this.unSend = true;
      // this.chatRoom.talk_delay
      setTimeout(() => {
        this.unSend = false;
      }, this.chatRoom.talk_delay * 1000);
    },
    onBlur() {
      setTimeout(() => {
        this.MODIFY_FIELD({ isFocus: false });
      }, 50);
    },
    OnFocus() {
      setTimeout(() => {
        this.MODIFY_FIELD({ isFocus: true, isEmoji: false });
        this.showEmoji = false;
      }, 50);
    }
  },
  mounted() {
    this.bus.$on("getEmojiTxt", this.addEmojiTxt);
    this.$nextTick(() => {});
  },
  watch: {
    // showEmoji(val) {
    //   this.bus.$emit("showEmoji", val);
    // }
    // txt(val) {
    //   if (this.msgStatus && val) {
    //     this.bus.$emit("sendMessage", `<p>${val}</p>`, true);
    //   }
    // }
  }
};
</script>
<style lang='scss' scoped>
.foot {
  // display: flex;
  // position: absolute;
  // bottom: 0;
  width: 100%;
  background-color: #ffffff;
  .bar {
    height: 3.375rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 0.0625rem solid #d2d2d2;
    border-bottom: 0.0625rem solid #d2d2d2;
    background-color: #f6f6f6;
    .emoji-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3.375rem;
      height: 3.375rem;
      img {
        margin: 0 auto;
        width: 1.75rem;
      }
    }
    .input-box {
      flex: 1;
      height: 2.6875rem;
      border: 0.0625rem solid #d2d2d2;
      border-radius: 0.25rem;
      overflow: hidden;

      .input {
        width: 100%;
        border: none;
        line-height: 2.6875rem;
        padding: 0 8px;
        font-size: 1.125rem;
        background-color: #ffffff;
      }
    }

    .send {
      width: 5rem;
      font-size: 1.25rem;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      span {
        width: 4rem;
        height: 2.3125rem;
        line-height: 2.3125rem;
        text-align: center;
        background: rgba(255, 124, 52, 1);
        border-radius: 0.25rem;
        color: #fefefe;
      }
      .disabled {
        background-color: #ccc;
      }
    }
  }
}
.showEmoji {
  height: 3.7rem;
}
.stop {
  // pointer-events: none;
}
</style>