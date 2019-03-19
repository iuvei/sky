<template>
  <div class="mine">
    <div class="timestemp">
      <div class="timetxt">{{item.time}}</div>
    </div>
    <div :class="['item','user-msg']">
      <div class="avatar">
        <div class="icon">
          <img :src="item.head"
               alt="">
        </div>
        <div class="name">{{getUserName(item)}}</div>
      </div>
      <div class="info">
        <div class="tip">
          <BaseMsgBadge class="level">LV {{item.vip}}</BaseMsgBadge>
        </div>
        <div :class="{success:item.success,txt:true}">{{item.msg}}</div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: "userMsg",
  props: ["item"],
  methods: {
    getMsgInfo(item) {
      if (item.status === 0) {
        return "get-0";
      } else if (this.readMsgByServer.includes(item.chat_token)) {
        return "get-2";
      } else if (item.status === 1) {
        return "get-1";
      }
      return "";
    },
    getUserName(item) {
      return item.name || item.UserName;
    }
  }
};
</script>
<style lang='scss' scoped>
.user-msg {
  padding-right: 0.8125rem;
  flex-direction: row-reverse;
  .tip {
    justify-content: flex-end;
    padding-right: 0.625rem;
  }
  .txt {
    float: right;
    word-break: break-all;
    text-align: justify;
    border: 0.0625rem solid #69b6db;
    margin: 0.375rem 0.625rem 0.625rem;
    padding-right: 1.875rem;
    background-color: #7ecef4;
    color: #434343;
    &::before {
      background-color: #7ecef4;
      border-right: 0.0625rem solid #69b6db;
      border-top: 0.0625rem solid #69b6db;
      right: -0.29rem;
    }
    &::after {
      content: " ";
      display: block;
      position: absolute;
      height: 1rem;
      width: 1rem;
      top: 0.9375rem;
      left: -1.5rem;
      background: url("../img/msg-read-fail.png") no-repeat center center;
      background-size: 1rem 1rem;
    }
  }
  .success {
    &::after {
      content: none;
    }
  }
}
</style>