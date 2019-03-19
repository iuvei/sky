<template>
  <div class="welfareTask_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <div class="whole_page">
      <div class="entry_box"
           style="margin-bottom: 0.625rem">
        <router-link class="dispatch_in"
                     to="/moreService/signIn">
          <div class="left_content">
            <img src="../../../../img/welfareTask/sign_in.png"
                 alt="">
            <div class="entry_door">
              <p>每日签到</p>
              <p>开启宝箱</p>
            </div>
          </div>
          <img src="../../../../img/right_jiantou.png"
               alt=""
               class="right_arrow">
        </router-link>
      </div>
      <!-- <div class="entry_box" style="margin-bottom: 0.625rem">
        <router-link class="dispatch_in" to="/moreService/offer">
          <div class="left_content">
            <img src="../../../../img/welfareTask/youhui.png" alt="">
            <div class="entry_door">
              <p>优惠管理</p>
              <p>查看获取的优惠奖励</p>
            </div>
          </div>
          <img src="../../../../img/right_jiantou.png" alt="" class="right_arrow">
        </router-link>
      </div> -->
    </div>
  </div>
</template>
<script>
import publicHead from "../moreService/publicHead";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "福利任务"
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.welfareTask_main_body {
  background-color: #f3f3f3;
  .whole_page {
    width: 100%;
    height: poTorem(688px);
    padding-top: poTorem(10px);
    background-color: #eee;
    .entry_box {
      background-color: #fff;
      height: poTorem(61px);
      padding: 0 poTorem(20px);
      .dispatch_in {
        text-align: center;
        height: poTorem(54px);
        @include between;
        .left_content {
          img {
            width: poTorem(45px);
            vertical-align: bottom;
            margin-right: poTorem(10px);
          }
          .entry_door {
            display: inline-block;
            p {
              height: poTorem(34px);
              line-height: poTorem(34px);
              text-align: left;
              &:first-child {
                height: poTorem(30px);
                font-size: poTorem(16px);
                color: #333333;
              }
              &:last-child {
                height: poTorem(20px);
                line-height: poTorem(20px);
                font-size: poTorem(14px);
                color: #a0a0a0;
              }
            }
          }
        }
        .right_arrow {
          height: poTorem(20px);
        }
      }
    }
  }
}
</style>


