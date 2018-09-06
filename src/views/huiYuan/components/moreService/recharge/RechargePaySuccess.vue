<template>
  <div>
    <div class="success">
      <div class="txt">
        <img :src="require('~/img/recharge/success.png')" alt="" class="img">
        <span>充值成功！</span>
      </div>
      <div class="red">{{money}}元</div>
    </div>
    <div class="note">
      &nbsp;&nbsp;&nbsp;&nbsp;您的充值申请已经成功提交审核，如核实您的余额将在3分钟内更新，若届时仍未更新，请联系在线客服
    </div>
    <div class="a_btn">
      <button @click="backstep">返回继续赚钱</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["money"],
  data() {
    return {};
  },
  methods: {
    backstep(item) {
      // this.$emit("backstep");
      this.$router.back()
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
@import "../../../style/field.scss";
.success {
  // @include center;
  border-bottom: 1px dotted #d9d9d9;
  margin-top: poTorem(50px);
  padding-bottom: poTorem(20px);
  div {
    @include center;
    text-align: center;
  }
  .txt {
    line-height: poTorem(40px);
    font-size: poTorem(30px);
    .img {
      width: poTorem(30px);
      height: poTorem(30px);
    }
    span {
      color: #414141;
    }
  }
  .red {
    font-size: poTorem(18px);
    color: #f00;
  }
}
.note {
  line-height: poTorem(28px);
  font-size: poTorem(18px);
  padding: poTorem(20px) poTorem(23px) 0;
  color: #414141;
}
</style>

