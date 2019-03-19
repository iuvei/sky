<template>
  <div class="chat_room_root">
    <ChatHead></ChatHead>
    <!-- <TagCountDown></TagCountDown> -->
    <Chat :style="chatStyle"></Chat>
    <ChatFooter></ChatFooter>
    <more v-model="showmore"></more>
    <ChatDialog v-model="loading"></ChatDialog>
  </div>
</template>
<script>
import ChatHead from "./header/index";
import Chat from "./message/chat";
import ChatFooter from "./footer/index";
import more from "./components/more";
import ChatDialog from "./dialog/index.vue";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "ChatRoom",
  components: {
    ChatHead,
    Chat,
    ChatFooter,
    more,
    ChatDialog
  },
  computed: {
    ...mapState(["chatRoom"]),
    ...mapState("chat", ["isFocus", "isEmoji"]),
    chatStyle() {
      if (this.isEmoji) {
        return { bottom: "13.375rem" };
      }
      if (this.isFocus) {
        return { bottom: "3.375rem" };
      }
      return {};
    }
  },
  data() {
    return {
      loading: true,
      showmore: false
    };
  },
  methods: {
    ...mapMutations("chat", ["MODIFY_FIELD", "MutationsModifyWsConfig"]),
    ...mapActions("chat", ["actionsConnsvr"]),
    ...mapActions(["isIntoChatRoom"]),
    async authUser(res) {
      if (!res.state) {
        this.$dialog.toast({ mes: res.param });
      }
    },
    showMore() {
      this.showmore = !this.showmore;
    },
    // 创建链接
    async init(vm = this) {
      this.loading = true;
      if (vm.$ws.socket.readyState === 1) {
        vm.$ws.socket.close();
      }
      const url = vm.chatRoom.talk_url || "ws://192.168.100.8:6581";
      // const url = "ws://192.168.100.8:6581";
      vm.$ws.create(
        {
          url: `${url}`
        },
        async key => {
          if (key === "error") {
            this.wsError();
            return;
          }
          const res = await vm.actionsConnsvr();
          vm.$ws.sendMessage(res);
          this.loading = false;
        }
      );
      vm.$ws.oncallback("Login_RESP", vm.dealLoginResp, false);
      vm.$ws.error = vm.wsError;
    },
    // 连接失败
    wsError(string = "连接服务器失败！") {
      this.loading = false;
      if (this.$route.name !== "liaotianshi") {
        return;
      }
      window.vue.$dialog.confirm({
        title: " ",
        mes: `<div style='color:#434343;font-size:1.25rem;'>${string}</div>`,
        opts: [
          {
            txt: "退出聊天室",
            color: "#FF7C34",
            callback: () => {
              this.$router.push("home");
            }
          },
          {
            txt: "重新连接",
            color: "#FF7C34",
            callback: () => {
              this.init();
            }
          }
        ]
      });
    },
    dealLoginResp(res) {
      if (res.status) {
        this.wsError(res.msg);
      }
      this.MutationsModifyWsConfig({ UserToken: res.UserToken });
      this.loading = false;
    }
  },
  created() {
    this.bus.$on("showMore", this.showMore);
    this.bus.$on("chatReset", this.init);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.MODIFY_FIELD({ isChatRouter: true });
      vm.init(vm);
    });
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "shouYe") {
      this.bus.$emit("shouYe", {});
    }
    this.showmore = false;
    this.MODIFY_FIELD({ isChatRouter: false });
    if (this.$ws.socket.readyState === 1) {
      this.$ws.socket.close();
    }
    next();
  },
  destroyed() {
    this.bus.$off("showMore");
    // this.MODIFY_FIELD({ isChatRouter: false });
    // this.$ws.socket.close();
  }
};
</script>
<style lang="scss">
#app.chat-room-router {
  display: block;
  .page_content {
    position: static;
  }
}
</style>
<style lang="scss" scoped>
.chat_room_root {
  position: absolute;
  width: 25.875rem;
  height: 100%;
  // height: 100vh;
}
</style>

