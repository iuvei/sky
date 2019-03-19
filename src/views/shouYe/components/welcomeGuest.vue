<template>
  <!-- <yd-popup v-model="show" position="center" width="90%" class="guest" v-show="show1"> -->
  <yd-popup v-model="show"
            position="center"
            width="90%"
            class="guest"
            v-show="show">
    <div style="background-color:#fff;">
      <p class="title">
        欢迎免费试玩体验
      </p>
      <p style=""
         class="note">
        <i>试玩账号</i>只提供玩家熟悉游戏，不允许充值和提款,且不享有参加优惠活动的权利，有效时间<i>72小时</i>。
      </p>
      <div class="btn-group">
        <yd-button @click.native="$emit('closeWelcPop')"
                   class="btn">确定</yd-button>
      </div>
    </div>
  </yd-popup>
</template>
<script>
//  游客试玩提示框
export default {
  props: ["show"],
  data() {
    return {
      show1: true
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.guest {
  .title {
    height: poTorem(50px);
    line-height: poTorem(50px);
    font-size: poTorem(20px);
    text-align: center;
    color: #fff;
    background-color: $mainColor;
  }
  .note {
    font-size: 16px;
    line-height: 20px;
    margin: 20px 10px;
    i {
      color: #e33939;
    }
  }
  .btn-group {
    margin-bottom: 20px;
    text-align: center;
  }
  .btn {
    width: 160px;
    height: 30px;
    background-color: $mainColor;
    border-radius: 29px;
    font-size: 1.125rem;
  }
}
</style>

