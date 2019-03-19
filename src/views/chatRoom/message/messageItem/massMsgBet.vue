<template>
  <div class="mass">
    <div class="timestemp">
      <div class="timetxt">{{item.boardcast.tz_time}}</div>
    </div>
    <div :class="['item','mass-msg']">
      <div class="avatar">
        <div class="icon">
          <img :src="item.head || '/assets/head_icon.png'"
               alt="">
        </div>
        <div class="name">{{item.username}}</div>
      </div>
      <div class="info">
        <div class="tip">
          <div>
            <BaseMsgBadge class="level">LV {{item.vip}}</BaseMsgBadge>
            <!-- <BaseMsgBadge class="rate">胜率 {{this.item.winRate}}%</BaseMsgBadge> -->
          </div>
          <div class="add"
               @click="follow">立即跟单</div>
        </div>
        <div class="txt">
          <div class="row-1">
            <span class="name">{{item.gameName}}</span>
            <div class="info">
              <img src="../img/msg-item-qishu.png"
                   alt="">
              <span class="qishu">{{item.boardcast.qishu}}</span>
              <span>期</span>
            </div>
          </div>
          <div class="row-2">【{{item.boardcast.self.wanfa}}/{{item.boardcast.self.xiangqing}}】</div>
          <div class="row-3">
            <div>合计：<span>{{item.boardcast.self.zhushu}}</span> 注</div>
            <div>投注金额：<span>{{item.boardcast.self.price}}</span> </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  name: "massMsgBet",
  props: ["item", "onbet"],

  methods: {
    follow() {
      if (!this.onbet) {
        this.$dialog.toast({
          mes: "该账号暂无跟单权限 ，有疑问请联系客服"
        });
        return;
      }
      this.$emit("follow", this.item);
    }
  },
  computed: {}
};
</script>
<style lang='scss' scoped>
.mass-msg {
  padding-left: 0.815rem;
  .tip {
    width: 18.75rem;
    justify-content: space-between;
    padding-left: 0.625rem;
    padding-right: 0;
    &:nth-child(1) {
      display: flex;
      align-items: center;
    }
    .level {
      margin-right: 0.3125rem;
    }
    .add {
      height: 1.8125rem;
      width: 3.9375rem;
      background: url("../img/msg-item-add.png") 100% center no-repeat;
      background-size: contain;
      color: #ffffff;
      text-align: center;
      line-height: 1.375rem;
      font-size: 0.75rem;
    }
  }
  .txt {
    display: flex;
    width: 17.75rem;
    flex-direction: column;
    border: 1px solid #b8b7b7;
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
          font-size: 1rem;
          color: #e33939;
        }
        span:nth-child(2) {
          font-size: 1rem;
          color: #929292;
        }
      }
    }
    .row-2 {
      // display:
      // display: flex;
      // justify-content: flex-start;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #535353;
      font-size: 0.9375rem;
    }
    .row-3 {
      display: flex;
      justify-content: space-between;
      span {
        color: #e33939;
        font-size: 0.875rem;
      }
    }
  }
}
</style>