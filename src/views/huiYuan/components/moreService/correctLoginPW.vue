<template>
  <div class="correctLoginPW_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <div class="content">
      <yd-cell-group class="form_ipt">
        <yd-cell-item>
          <span slot="left">旧的密码</span>
          <input slot="right"
                 type="password"
                 placeholder="请输入旧的登录密码"
                 v-model="oldPW">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">新的密码</span>
          <input slot="right"
                 type="password"
                 placeholder="请输入新的密码"
                 v-model="newPW1">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">确认密码</span>
          <input slot="right"
                 type="password"
                 placeholder="请再次输入您的密码"
                 v-model="newPW2">
        </yd-cell-item>
      </yd-cell-group>
      <p class="tips">如果旧密码输错5次，将冻结您的账号</p>
      <p class="btn">
        <button @click="correctPW">立即修改</button>
      </p>
    </div>
  </div>
</template>
<script>
import publicHead from "../moreService/publicHead";
import { mapActions } from "vuex";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "修改登录密码",
      oldPW: "",
      newPW1: "",
      newPW2: ""
    };
  },
  activated() {
    this.oldPW = "";
    this.newPW1 = "";
    this.newPW2 = "";
  },
  methods: {
    ...mapActions(["afterCorrectPW"]),
    correctPW() {
      if(!/^[0-9a-zA-Z]{6,20}$/.test(this.newPW1)) {
        this.$dialog.alert({ mes: "请输入正确格式密码" })
        return
      }
      if (this.newPW1 !== this.newPW2) {
        this.$dialog.alert({ mes: "两次密码输入不一致" });
      } else {
        this.$ajax("request", {
          ac: "setLoginPassVerify",
          oldpass: this.oldPW,
          newpass: this.newPW1
        }).then(() => {
          // this.$store.commit("GET_USERINFO", {
          //   accountInfo: {},
          //   isLogin: false,
          // });
          this.afterCorrectPW;
          this.$router.replace("/login");
          this.$dialog.alert({ mes: "修改成功，请使用新密码登录" });

          // this.$ajax("request", {
          //   ac: "encodeLogin",
          //   code: this.$store.state.userinfo.accountInfo.code,
          // }).then(res => {
          //   console.log(res);
          //   this.$store.commit("GET_USERINFO", {
          //     accountInfo: res,
          //     isLogin: true,
          //   });
          //   this.$router.back();
          // });
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.correctLoginPW_main_body {
  .content {
    height: 100%;
    background-color: #eee;
    padding: poTorem(20px);
    .form_ipt {
      overflow: hidden;
      border: poTorem(1px) solid #bfbfbf;
      border-radius: poTorem(5px);
      height: poTorem(154px);
    }
    .tips {
      margin: poTorem(26px) 0;
      text-align: center;
      font-size: poTorem(13px);
      color: #7d7d7d;
    }
    .btn {
      text-align: center;
      button {
        width: poTorem(300px);
        height: poTorem(40px);
        font-size: poTorem(16px);
        line-height: poTorem(16px);
        color: #fff;
        background-color: $mainColor;
        border-radius: poTorem(5px);
        outline: none;
        border: none;
      }
    }
  }
}
</style>


