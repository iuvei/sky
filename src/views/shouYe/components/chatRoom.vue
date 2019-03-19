<template>
  <div>
    <div @click="dialog">
      <img :src="sysinfo.talking_pic||img"
           alt=""
           @error="onerror">
    </div>
    <chatRoomNumber :show="showRoomNumber"
                    :txt="{title:'是否进入私人聊天室',cancel:'直接进入大厅'}"
                    :isShowOldNumber='chatRoom.room'
                    @submit="submit"
                    @closeWelcPop="showRoomNumber=false"></chatRoomNumber>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import chatRoomNumber from "~/components/dialog/chatRoomNumber";
export default {
  name: "shouYeChat",
  components: { chatRoomNumber },
  data() {
    return {
      room: "",
      showRoomNumber: false,
      isShowOldNumber: false,
      img: require("../../../img/public/banner.png")
    };
  },
  computed: {
    ...mapState(["sysinfo", "chatRoom"])
    // isShowOldNumber() {
    //   return this.ch
    // }
  },
  methods: {
    ...mapMutations(["MODIFY_CHAT_FIELD"]),
    ...mapActions(["isIntoChatRoom"]),
    onerror(event) {
      event.target.src = this.img;
    },
    dialog() {
      this.showRoomNumber = true;
    },
    submit({ type, number }) {
      //  /^[0-9]{6,13}$/

      switch (type) {
        case 0:
          this.MODIFY_CHAT_FIELD({ isHall: false });
          break;
        case 1:
          this.MODIFY_CHAT_FIELD({ isHall: true });
          break;
        case 2:
          if (/^[0-9]{6,13}$/.test(number)) {
            this.MODIFY_CHAT_FIELD({ isHall: false });
            this.room = number;
            console.log("object");
          } else {
            this.$dialog.toast({ mes: "请输入6-13位的数字" });
            return;
          }
          break;
      }
      this.toChatRoom();
      // this.$router.push("chatroom");
    },
    async toChatRoom() {
      const res = await this.isIntoChatRoom(this.room);
      if (res.state) {
        this.$router.push("chatroom");
        this.$nextTick(() => {
          this.showRoomNumber = false;
          this.MODIFY_CHAT_FIELD({ room: this.room });
        });
      } else {
        this.$dialog.toast({ mes: res.param });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
div {
  padding: 0 0.3rem;
  img {
    width: 100%;
    height: 4rem;
    border-radius: 0.25rem;
  }
}
</style>

