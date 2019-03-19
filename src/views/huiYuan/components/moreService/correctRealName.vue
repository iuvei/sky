<template>
  <div class="correctLoginPW_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <!-- <AppHeader :title="funcName" :type='1' :clickRouter='clickRouter'></AppHeader> -->
    <div class="content">
      <yd-cell-group class="form_ipt">
        <yd-cell-item v-show="isShow">
          <span slot="left">旧姓名</span>
          <input slot="right"
                 type="text"
                 :placeholder="oldName"
                 v-model="oldName1">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">{{txt}}</span>
          <input slot="right"
                 type="text"
                 placeholder="请输入真实的姓名"
                 v-model="newName">
        </yd-cell-item>
      </yd-cell-group>
      <p class="tips"
         v-show="isShow">请填写真实的姓名</p>
      <p class="tips"
         v-show="!isShow">填写真实的姓名与便于提款验证</p>
      <p class="btn">
        <button @click="correctName">{{isShow?'立即修改':'确定'}}</button>
      </p>
    </div>
  </div>
</template>
<script>
import publicHead from "../moreService/publicHead";
import { mapState } from "vuex";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "修改真实姓名",
      oldName: "",
      oldName1: "",
      newName: "",
      isShow: true,
      txt: "姓名"
    };
  },
  computed: {
    ...mapState({
      userinfo: state => state.userinfo
    })
  },
  methods: {
    clickRouter() {
      if (this.$route.params.from === "bind") {
        this.$router.push("/moreService/securityCenter");
      } else {
        this.$router.go(-1);
      }
    },
    correctName() {
      this.$ajax("request", {
        ac: "updateUserInfo",
        oldname: this.oldName1,
        realname: this.newName,
        type: 1
      }).then(() => {
        this.$dialog.alert({ mes: "已经提交过修改真实姓名审核申请!" });

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
    }
  },
  activated() {
    this.oldName = "";
    this.oldName1 = "";
    this.newName = "";
    console.log(this.$route);
    this.$dialog.loading.open(" ");
    if (this.userinfo.accountInfo.real_name) {
      this.isShow = true;
      this.txt = "新的姓名";
      this.oldName = this.userinfo.accountInfo.real_name;
    } else {
      this.isShow = false;
      this.txt = "姓名";
      this.funcName = "设置真实姓名";
    }
    this.$dialog.loading.close();
  },
  mounted() {
    console.log(this.$route);
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


