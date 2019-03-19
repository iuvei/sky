<template>
  <div :class="[{'header_pig': isfestival},'header']">
    <div class="back"
         @click="goBack"> <img src="../../../img/shouye/back.png"
           alt=""></div>
    <div class="name">聊天室</div>
    <div class="switch"
         @click="switchP">
      <i :class="[{'rotate_pos': isRotate}]"></i>
      <span>房间</span>
    </div>
    <chatRoomNumber :show="showRoomNumber"
                    :txt="{title:'切换房间',cancel:'取消'}"
                    :isShowOldNumber='false'
                    @submit="submit"
                    @closeWelcPop="showRoomNumber=false"></chatRoomNumber>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapState } from "vuex";
import chatRoomNumber from "~/components/dialog/chatRoomNumber";
export default {
  name: "wheader",
  components: {
    chatRoomNumber
  },
  data() {
    return {
      room: "",
      showRoomNumber: false,
      isRotate: false
    };
  },
  computed: {
    ...mapState(["isfestival"])
  },
  methods: {
    ...mapMutations(["MODIFY_CHAT_FIELD"]),
    ...mapActions(["isIntoChatRoom"]),
    goBack() {
      this.$router.push("/");
      // window.history.back();
    },
    switchP() {
      this.showRoomNumber = true;
      this.isRotate = !this.isRotate;
    },
    submit({ type, number }) {
      console.log("object", type, number);
      switch (type) {
        case 0:
          this.MODIFY_CHAT_FIELD({ isHall: false });
          break;
        case 1:
          this.showRoomNumber = false;
          return;
        // this.MODIFY_CHAT_FIELD({ isHall: true });
        case 2:
          if (/^[0-9]{6,13}$/.test(number)) {
            this.room = number;
            this.MODIFY_CHAT_FIELD({ isHall: false });
          } else {
            this.$dialog.toast({ mes: "请输入6-13位的数字" });
            return;
          }
          // this.$emit("submit", this.number);
          break;
      }
      this.toChatRoom();
    },
    async toChatRoom() {
      const res = await this.isIntoChatRoom(this.room);
      if (res.state) {
        this.showRoomNumber = false;
        this.MODIFY_CHAT_FIELD({ room: this.room });
        this.bus.$emit("chatReset");
      } else {
        this.$dialog.toast({ mes: res.param });
      }
    }
  }
};
</script>
<style lang='scss' scoped>
@import "../../../css/resources.scss";
.header {
  display: flex;
  // position: fixed;
  // display:
  height: 3rem;
  background: url("../../../img/phone_header.png");
  &.header_pig {
    @include pigbg;
  }
  > div {
    text-align: center;
  }
  .back {
    height: 3rem;
    width: 3.125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 1.5rem;
    }
  }
  .close {
    width: 1rem;
  }
  .name {
    padding-left: 1.875rem;
    font-size: 1.4375rem;
    flex: 1;
    line-height: 3rem;
    color: #fff;
  }
  .switch {
    display: flex;
    align-items: center;
    height: 3rem;
    width: 80px;
    span {
      font-size: 20px;
      color: #fff;
      font-weight: bolder;
    }
    i {
      display: inline-block;
      margin-right: 0.5rem;
      background: url(~img/goucai/switch.png);
      width: 20px;
      height: 20px;
      background-size: 20px 20px;
      transition: all 0.3s ease;
    }
    .rotate_pos {
      transform: rotate(180deg);
    }
  }
}
</style>