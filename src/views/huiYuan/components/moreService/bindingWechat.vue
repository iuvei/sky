<template>
  <div class="correctLoginPW_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <div class="content">
      <yd-cell-group class="form_ipt">
        <yd-cell-item v-show="isShow">
          <span slot="left">原微信</span>
          <input slot="right"
                 type="text"
                 :placeholder="oldWechat"
                 v-model="oldWechat1">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">{{txt}}</span>
          <input slot="right"
                 type="text"
                 placeholder="请输入新微信"
                 v-model="newWechat">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">验证码</span>
          <input slot="right"
                 type="number"
                 placeholder="请输入验证码"
                 v-model="verifyNum">
          <span slot="right"
                @click="getVerify">
            <img :src="verifyImg"
                 alt=""
                 class="verify_img">
          </span>
        </yd-cell-item>
      </yd-cell-group>
      <p class="btn">
        <button @click="submitData">{{isShow?'立即修改':'确定'}}</button>
      </p>
    </div>
  </div>
</template>
<script>
import publicHead from "./publicHead";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "绑定微信",
      isShow: false,
      oldWechat: "",
      oldWechat1: "",
      newWechat: "",
      verifyImg: "",
      verifyNum: "",
      vid: "",
      txt: "微信"
    };
  },
  activated() {
    this.oldWechat = "";
    this.oldWechat1 = "";
    this.newWechat = "";
    this.verifyNum = "";
    this.$dialog.loading.open("正在加载中···");
    if (this.$store.state.userinfo.accountInfo.wechat) {
      this.isShow = true;
      this.txt = "新微信";
      this.funcName = "修改微信";
      this.oldWechat = this.$store.state.userinfo.accountInfo.wechat;
    } else {
      this.isShow = false;
      this.txt = "微信";
      this.funcName = "绑定微信";
    }
    this.getVerify();
  },
  methods: {
    submitData() {
      const isPass = this.isShow
        ? this.oldWechat1 && this.newWechat
        : this.newWechat;
      if (!isPass) {
        this.$dialog.toast({ mes: "请输入微信号" });
        return;
      }
      if (!this.verifyNum) {
        this.$dialog.toast({ mes: "请输入验证码" });
        return;
      } else if (!/^[0-9]{4}$/.test(this.verifyNum)) {
        this.$dialog.toast({ mes: "请输入正确验证码" });
        return;
      }
      this.$ajax("request", {
        ac: "updateUserInfo",
        oldwechat: this.oldWechat1,
        wechat: this.newWechat,
        vcode: this.verifyNum,
        vid: this.vid,
        type: 4
      }).then(() => {
        this.getVerify();
        this.$dialog.alert({ mes: "提交成功，请等待审核" });

        this.$ajax("request", {
          ac: "encodeLogin",
          code: this.$store.state.userinfo.accountInfo.code
        }).then(res => {
          console.log(res);
          this.$store.commit("GET_USERINFO", {
            accountInfo: res,
            isLogin: true
          });
          this.$router.back();
        });
      });
    },
    getVerify() {
      this.$ajax("request", {
        ac: "getVerifyImage"
      }).then(res => {
        this.verifyImg = res.img;
        this.vid = res.vid;
        this.$dialog.loading.close();
      });
    },
    randomNum() {
      return Math.floor(Math.random() * 10000) + "";
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
      height: auto;
      .verify_img {
        width: poTorem(100px);
        height: poTorem(32px);
      }
    }
    .tips {
      margin: poTorem(26px) 0;
      text-align: center;
      font-size: poTorem(13px);
      color: #7d7d7d;
    }
    .btn {
      margin-top: poTorem(60px);
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


