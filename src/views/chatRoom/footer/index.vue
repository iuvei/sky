<template>
  <div class='bottom'>
    <FooterInput></FooterInput>
    <!-- <ChatBottom v-show="!isFocus"></ChatBottom> -->
    <Emoji v-show="isEmoji"
           @txt="addTxt"></Emoji>
    <ChatBottom v-show="isShowChatBoottom"></ChatBottom>

  </div>
</template>
<script>
import FooterInput from "./FooterInput";
import ChatBottom from "../components/footer";
import Emoji from "./components/emoji";
import { mapState } from "vuex";
export default {
  name: "ChatFooter",
  data() {
    return {
      show: true
    };
  },
  computed: {
    ...mapState("chat", ["isFocus", "isEmoji"]),
    isShowChatBoottom() {
      if (this.isEmoji) return true;
      return !this.isFocus;
    },
    isShowEmoji() {
      if (this.isFocus) return false;
      return this.isEmoji;
    }
  },
  components: {
    FooterInput,
    ChatBottom,
    Emoji
  },
  methods: {
    addTxt(txt) {
      this.bus.$emit("getEmojiTxt", txt);
    }
  }
};
</script>
<style lang='scss' scoped>
.bottom {
  position: absolute;
  bottom: 0;
  width: 25.875rem;
}
</style>