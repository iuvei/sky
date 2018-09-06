<template>
  <div class="correctLoginPW_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <!-- <AppHeader :title="funcName" :type='1' :clickRouter='clickRouter'></AppHeader> -->
    <div class="content">
      <yd-cell-group class="form_ipt">
        <yd-cell-item v-show="isShow">
          <span slot="left">旧密码</span>
          <autofocusInput slot="left" ref="old"></autofocusInput>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">{{txt}}</span>
          <autofocusInput slot="left" ref="new1"></autofocusInput>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">确认密码</span>
          <autofocusInput slot="left" ref="new2"></autofocusInput>
        </yd-cell-item>
      </yd-cell-group>
      <p class="tips" v-show="isShow">如果旧密码输错5次，将冻结您的账号</p>
      <p class="tips" v-show="!isShow"></p>
      <p class="btn">
        <button @click="correctPW">{{isShow?'立即修改':'确定'}}</button>
      </p>
    </div>
  </div>
</template>
<script>
import publicHead from "./publicHead";
import autofocusInput from "./autofocusInput";
import { mapState } from "vuex";
export default {
  components: {
    publicHead,
    autofocusInput,
    
  },
  data() {
    return {
      funcName: "修改交易密码",
      tkpassok: 0,
      isShow: true,
      txt: '密码'
    };
  },
  activated() {
    this.$refs.old.first = ''
    this.$refs.old.second = ''
    this.$refs.old.third = ''
    this.$refs.old.forth = ''
    this.$refs.new1.first = ''
    this.$refs.new1.second = ''
    this.$refs.new1.third = ''
    this.$refs.new1.forth = ''
    this.$refs.new2.first = ''
    this.$refs.new2.second = ''
    this.$refs.new2.third = ''
    this.$refs.new2.forth = ''
    this.$dialog.loading.open("正在加载中···");
    if (this.userinfo.accountInfo.tkpass_ok != 0) {
      this.isShow = true;
      this.txt = '新密码'
      this.tkpassok = this.userinfo.accountInfo.tkpass_ok;
    } else {
      this.isShow = false;
      this.txt = '密码'
      this.funcName = "设置交易密码";
    }
    this.$dialog.loading.close();
  },
  methods: {
    clickRouter() {
      if (this.$route.params.from === "bind") {
        this.$router.push("/moreService/securityCenter");
      } else {
        this.$router.go(-1);
      }
    },
    correctPW() {
      let old =
          this.$refs.old.first +
          this.$refs.old.second +
          this.$refs.old.third +
          this.$refs.old.forth,
        new1 =
          this.$refs.new1.first +
          this.$refs.new1.second +
          this.$refs.new1.third +
          this.$refs.new1.forth,
        new2 =
          this.$refs.new2.first +
          this.$refs.new2.second +
          this.$refs.new2.third +
          this.$refs.new2.forth;

      if (new1 !== new2) {
        this.$dialog.alert({ mes: "两次密码输入不一致" });
      } else {
        this.$ajax("request", {
          ac: "setTradPassVerify",
          oldpass: old,
          newpass: new1,
          tkpassok: this.tkpassok,
        }).then(res => {
          if (res == 0) this.$dialog.alert({ mes: "修改成功" });

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
      }
    },
  },
  computed: {
    ...mapState({
      userinfo: state => state.userinfo,
    }),
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
      // height: poTorem(154px);
    }
    .tips {
      margin: poTorem(26px) 0;
      font-size: poTorem(13px);
      color: #7d7d7d;
      text-align: center;
    }
    .btn {
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


