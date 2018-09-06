<template>
  <div class="correctLoginPW_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <div class="content">
      <yd-cell-group class="form_ipt">
        <yd-cell-item v-show="isShow">
          <span slot="left">原QQ</span>
          <input slot="right" type="text" :placeholder="oldQQ" v-model="noldQQ1">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">{{txt}}</span>
          <input slot="right" type="text" placeholder="请输入新QQ号码" v-model="newQQ">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">验证码</span>
          <input slot="right" type="number" placeholder="请输入验证码" v-model="verifyNum">
          <span slot="right" @click="getVerify">
            <img :src="verifyImg" alt="" class="verify_img">
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
    publicHead,
  },
  data() {
    return {
      funcName: "绑定QQ",
      isShow: false,
      oldQQ: "",
      noldQQ1:'',
      newQQ: "",
      verifyImg: "",
      verifyNum: "",
      txt: 'QQ',
      vid: ''
    };
  },
  activated() {
    this.noldQQ = ''
    this.noldQQ1 = ''
    this.newQQ = ''
    this.verifyNum = ''
    this.$dialog.loading.open("正在加载中···");
    if (this.$store.state.userinfo.accountInfo.qq) {
      this.isShow = true;
      this.funcName = '修改QQ'
      this.txt = '新QQ'
      this.oldQQ = this.$store.state.userinfo.accountInfo.qq;
    } else {
      this.isShow = false;
      this.funcName = '绑定QQ'
      this.txt = 'QQ'
    }
    this.getVerify();
  },
  methods: {
    submitData() {
      let isPass = this.isShow ? this.noldQQ1 && this.newQQ : this.newQQ
      if(!isPass) {
        this.$dialog.toast({mes: '请输入qq号码'})
        return
      }
      if(!this.verifyNum) {
        this.$dialog.toast({mes: '请输入验证码'})
        return
      } else if (!/^[0-9]{4}$/.test(this.verifyNum)) {
        this.$dialog.toast({mes: '请输入正确验证码'})
        return
      }
      this.$ajax("request", {
        ac: "updateUserInfo",
        oldqq: this.noldQQ1,
        qq: this.newQQ,
        vcode: this.verifyNum * 1,
        vid: this.vid,
        type: 5,
      }).then(res => {
        this.getVerify()
        this.$dialog.alert({ mes: "提交成功，请等待审核" });

        this.$ajax("request", {
          ac: "encodeLogin",
          code: this.$store.state.userinfo.accountInfo.code,
        }).then(res => {
          console.log(res);
          this.$store.commit("GET_USERINFO", {
            accountInfo: res,
            isLogin: true,
          });
          this.$router.back();
        });
      });
    },
    getVerify(i) {
      this.$ajax("request", {
        ac: "getVerifyImage"
      }).then(res => {
        this.verifyImg = res.img;
        this.vid = res.vid
        this.$dialog.loading.close();
      });
    },
    randomNum() {
      return Math.floor(Math.random() * 10000) + "";
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.correctLoginPW_main_body {
  .content {
    height: poTorem(688px);
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
        background-color: #ff7c34;
        border-radius: poTorem(5px);
        outline: none;
        border: none;
      }
    }
  }
}
</style>


