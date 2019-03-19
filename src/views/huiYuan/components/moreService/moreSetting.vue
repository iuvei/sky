<template>
  <div class="moreSetting_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <yd-cell-group class="moreSetting_main_content">
      <yd-cell-item>
        <img src="../../../../img/more_settings/open_shaking.png"
             alt=""
             slot="left">
        <span slot="left">开启摇一摇震动</span>
        <yd-switch v-model="defaultShake"
                   slot="right"></yd-switch>
      </yd-cell-item>
      <yd-cell-item>
        <img src="../../../../img/more_settings/open_sound.png"
             alt=""
             slot="left">
        <span slot="left">开启触摸音效</span>
        <yd-switch v-model="defaultSound"
                   slot="right"></yd-switch>
      </yd-cell-item>
      <!-- <yd-cell-item>
        <img src="../../../../img/more_settings/message_setting.png" alt="" slot="left">
        <span slot="left">是否开启中奖通知</span>
        <yd-switch v-model="notification" slot="right"></yd-switch>
      </yd-cell-item> -->
      <!-- <yd-cell-item arrow type="link" href="/moreService/adviceFeedback">
        <img src="../../../../img/more_settings/feedback.png" alt="" slot="left">
        <span slot="left">意见反馈</span>
      </yd-cell-item> -->
      <!-- <yd-cell-item arrow type="link" href="/moreService/recommand">
        <img src="../../../../img/more_settings/recommand.png" alt="" slot="left">
        <span slot="left">推荐给好友</span>
      </yd-cell-item> -->
      <yd-cell-item arrow
                    type="link"
                    href="/moreService/aboutUs">
        <img src="../../../../img/more_settings/about_us.png"
             alt=""
             slot="left">
        <span slot="left">关于我们</span>
      </yd-cell-item>
      <p :class="[{'log_out_pig': isfestival},'log_out']"
         v-show="userinfo.isLogin">
        <button @click="touserLogout">退出登录</button>
      </p>
    </yd-cell-group>
  </div>
</template>
<script>
import publicHead from "./publicHead";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "更多设置",
      defaultShake: true,
      defaultSound: false,
      notification: false
    };
  },
  mounted() {
    if (navigator.userAgent.includes("iPhone")) {
      this.$dialog.toast({ mes: "ios中safari暂不支持震动" });
    }
  },
  methods: {
    ...mapActions(["userLogout"]),
    ...mapActions("member", ["switchShake", "switchSound"]),
    async touserLogout() {
      await this.userLogout();
      this.$router.push("/member");
    }
  },
  computed: {
    ...mapState(["userinfo", "isfestival"]),
    ...mapState("member", ["shakingSwitch", "touchSound"])
  },
  watch: {
    defaultShake(val) {
      this.switchShake(val);
      if (val && navigator.userAgent.includes("iPhone")) {
        this.$dialog.toast({ mes: "ios中safari暂不支持震动" });
      }
    },
    defaultSound(val) {
      this.switchSound(val);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.moreSetting_main_body {
  background-color: #fff;
  height: 100%;
  .log_out {
    margin-top: poTorem(60px);
    text-align: center;
    button {
      width: poTorem(300px);
      height: poTorem(40px);
      font-size: poTorem(18px);
      line-height: poTorem(16px);
      color: #fff;
      background-color: $mainColor;
      border-radius: poTorem(5px);
      outline: none;
      border: none;
    }
    &.log_out_pig {
      button {
        background-color: #ff6143;
      }
    }
  }
}
</style>


