<template>
  <div class="demo">
    <div class="demo_head">
      <router-link to="/home">
        <span class="iconfont icon-fanhui"></span>
      </router-link>
      <span>注册</span>
      <span></span>
    </div>
    <div class="info">
      <div class="success">
        <img src="../../../../img/public/success.png" alt="success">
      </div>
      <div class="note">
        恭喜您，已成功注册账号，请牢记您的账号和密码，以便登录操作
      </div>
      <div class="btn">
        <yd-button action-type="submit" type="primary" bgcolor="#F93" @click.native="$router.push('/home')">立即登录</yd-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.demo {
  .demo_head {
    @include between;
    height: poTorem(48px);
    width: 100%;
    background: url(../../../../img/phone_header.png) CENTER TOP;
    .iconfont {
      font-size: poTorem(30px);
      padding-left: poTorem(10px);
      font-weight: normal;
    }
    .title {
      padding-right: poTorem(10px);
    }
    span {
      font-size: poTorem(18px);
      color: #fff;
      font-weight: bolder;
      padding-right: poTorem(30px);
    }
  }
  .info {
    .success {
      @include center;
      margin-top: poTorem(60px);
    }
    .note {
      // width: poTorem(540px);
      height: poTorem(40px);
      padding: 0 poTorem(40px);
      margin-top: poTorem(20px);
      font-size: poTorem(18px);
      line-height: poTorem(20px);
      color: #959595;
      text-align: center;
    }
  }
  .btn {
    @include center;
    margin-top: poTorem(20px);
    .yd-btn {
      width: poTorem(262px);
      height: poTorem(38px);
      border-radius: poTorem(5px);
      color: #fff;
      font-size: poTorem(18px);
      font-weight: bolder;
    }
  }
}
</style>


