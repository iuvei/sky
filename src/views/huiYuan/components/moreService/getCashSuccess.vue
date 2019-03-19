<template>
  <div>
    <AppHeader title='提款'></AppHeader>
    <div class="main">
      <div class="one">
        您的申请已经提交成功，正在审核中！提款金额{{$route.params.price}}元
      </div>
      <div class="line"></div>
      <div class="two">
        提款到账后，我们将在24小时之内充值到您的账号上，若届时仍没有到账，请联系在线客服。
      </div>
    </div>
    <div class="a_btn">
      <button @click="go">完成</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    go() {
      this.$router.replace("/member");
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";

.main {
  padding-top: poTorem(10px);
  .one {
    height: poTorem(50px);
    padding-left: poTorem(80px);
    padding-right: poTorem(20px);
    font-size: poTorem(16px);
    background: url("~img/recharge/choosed_state.png") no-repeat 8px center;
    background-size: poTorem(50px) poTorem(50px);
  }
  .line {
    height: poTorem(100px);
    margin-left: poTorem(32px);
    border-left: poTorem(2px) solid #23ab38;
  }
  .two {
    height: poTorem(50px);
    padding-left: poTorem(80px);
    padding-right: poTorem(20px);
    font-size: poTorem(16px);
    background: url("~img/recharge/ic_recharge_money.png") no-repeat 8px center;
    background-size: poTorem(50px) poTorem(50px);
  }
}
.a_btn {
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
</style>

