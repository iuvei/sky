<template>
  <!-- 用于中奖记录 -->
  <div class="theWinning">
    <!-- 头部 -->
    <span class="theWinning_head">
      <router-link to="/member">
        <span class="iconfont icon-fanhui"></span>
      </router-link>
      <span class="title">中奖记录</span>
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
    };
  },
  computed: {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "../../css/resources.scss";
.theWinning {
  padding: 0;
  .theWinning_head {
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
    .title {
      margin-right: poTorem(-22px);
      color: #fff;
      font-weight: bolder;
      font-size: poTorem(19px);
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
