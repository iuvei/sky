<template>
  <div class="mine">
    <div class="timestemp">
      <div class="timetxt">{{item.time}}</div>
    </div>
    <div :class="['item','user-bet-msg']">
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
        <div :class="{success:item.success,txt:true}">
          <div class="row-1">
            <span class="name">{{item.gamename}}</span>
            <div class="info">
              <img src="../img/msg-item-qishu.png"
                   alt="">
              <span class="qishu">{{item.qishu}}</span><span>期</span>
            </div>
          </div>
          <div class="row-2">【{{item.playname}}/{{item.self}}】</div>
          <div class="row-3">
            <div>合计：<span>{{item.zhushu/item.labels.length}}</span> 注</div>
            <div>投注金额：<span>{{item.zhushu/item.labels.length*item.price}}</span></div>
          </div>
        </div>
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
.user-bet-msg {
  padding-right: 0.8125rem;
  flex-direction: row-reverse;
  .tip {
    justify-content: flex-end;
    padding-right: 0.625rem;
  }
  .txt {
    display: flex !important;
    flex-direction: column;
    width: 17.75rem;
    float: right;
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
    .row-1 {
      display: flex;
      justify-content: space-between;
      .name {
        font-size: 1.125rem;
        color: #4f4f4f;
      }
      .info {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        img {
          width: 1.0625rem;
          height: 1.0625rem;
        }
        .qishu {
          font-size: 0.875rem;
          color: #e33939;
        }
        span:nth-child(2) {
          font-size: 1rem;
          color: #929292;
        }
      }
    }
    .row-2 {
      // display: flex;
      // justify-content: flex-start;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #535353;
      font-size: 1rem;
    }
    .row-3 {
      display: flex;
      font-size: 0.9375rem;
      justify-content: space-between;
      span {
        color: #e33939;
        font-size: 0.875rem;
      }
    }
  }
  .success {
    &::after {
      content: none;
    }
  }
}
</style>