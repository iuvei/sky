<template>
  <div class="mass">
    <div class="timestemp">
      <div class="timetxt">{{item.time}}</div>
    </div>
    <div :class="['item','mass-msg']">
      <div class="avatar">
        <div class="icon">
          <img :src="item.talker_head || '/assets/head_icon.png'"
               alt="">
        </div>
        <div class="name">{{item.talker_name}}</div>
      </div>
      <div class="info">
        <div class="tip">
          <BaseMsgBadge class="level">LV {{item.talker_vip}}</BaseMsgBadge>
          <!-- <BaseMsgBadge class="rate">胜率 {{item.winRate}}%</BaseMsgBadge> -->
        </div>
        <div class="txt">{{item.msg}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "kfMsg",
  props: ["item"]
};
</script>
<style lang='scss' scoped>
.mass-msg {
  padding-left: 0.815rem;
  .tip {
    // justify-content: flex-end;
    padding-left: 0.625rem;
    .level {
      margin-right: 0.3125rem;
    }
  }
  .txt {
    border: 1px solid #b8b7b7;
    word-break: break-all;
    text-align: justify;
    margin: 0.375rem 0.625rem 0.625rem;
    padding-right: 1.875rem;
    background-color: #ffffff;
    color: #434343;
    &::before {
      background-color: #ffffff;
      border-left: 0.0625rem solid #b8b7b7;
      border-bottom: 0.0625rem solid #b8b7b7;
      left: -0.33rem;
    }
  }
}
</style>