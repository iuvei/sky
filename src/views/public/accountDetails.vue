<template>
  <!-- 用于账户明细 -->
  <div class="accountDetails">
    <!-- 头部 -->
    <span class="accountDetails_head">
      <router-link to="/member">
        <span class="iconfont icon-fanhui"></span>
      </router-link>
      <div class="center">
        <div class="border">
          <span class="title">提款记录</span>
        </div>
      </div>
      <span class="shuaxin">
        <span class="icon icon-shuaxin"></span>
      </span>
    </span>

  </div>

</template>
<script>
export default {
  data() {
    return {
      data() {}
    }
  },
  computed: {},
  methods: {}
}
</script>
<style lang="scss" scoped>
@import "../../css/resources.scss";
.accountDetails {
  padding: 0;
  .accountDetails_head {
    @include between;
    height: poTorem(48px);
    width: 100%;
    background: url(../../img/phone_header.png) CENTER TOP;
    .iconfont {
      font-size: poTorem(24px);
      padding-left: poTorem(10px);
      color: #fff;
      font-weight: bolder;
    }

    .center {
      display: flex;

      width: poTorem(200px);
      justify-content: space-around;
      text-align: center;

      .border {
        width: poTorem(126px);
        height: poTorem(34px);
        margin-right: poTorem(-22px);
        border: solid 1px #fff;
        border-radius: poTorem(5px);
        line-height: poTorem(34px);
        justify-content: space-around;
        text-align: center;

        .title {
          color: #fff;
          font-weight: bolder;
          font-size: poTorem(20px);
          justify-content: space-around;
          text-align: center;
        }
      }
    }
    .shuaxin {
      display: flex;

      .icon {
        width: poTorem(50px);
        justify-content: space-around;
        text-align: center;
        font-size: poTorem(40px);
        color: #fff;
        margin-right: poTorem(8px);
      }
    }
  }
}
</style>
