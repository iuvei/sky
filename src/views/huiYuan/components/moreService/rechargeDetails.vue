<template>
  <div class="rechargeDetails_main_body">
    <publicHead :title="funcName" :type="2"></publicHead>
    <div class="order_info">
      <!-- <p class="title_word">订单内容</p> -->
      <div class="tag">
        <p>
          <span>订单号：</span>
          <span>{{allData.order}}</span>
        </p>
        <p>
          <span>入款类型：</span>
          <span>{{allData.type}}</span>
        </p>
        <p>
          <span>入款金额：</span>
          <span>{{allData.price}}</span>
        </p>
        <p>
          <span>入款优惠：</span>
          <span>{{allData.price_odd}}</span>
        </p>
        <p v-if="allData.price_first">
          <span>首存优惠：</span>
          <span>{{allData.price_first}}</span>
        </p>
        <p>
          <span>入款状态：</span>
          <span>{{allData.status}}</span>
        </p>
        <p>
          <span>存入时间：</span>
          <span style="color: #e33939;">{{allData.pay_time}}</span>
        </p>
        <p>
          <span>备注：</span>
          <span>{{allData.index_mark?allData.index_mark:'无'}}</span>
        </p>
        <!-- <p>是否关盘</p>
        <p>玩法名称</p> -->
      </div>
      <!-- <div class="content">
        <p>{{allData.order}}</p>
        <p>{{allData.type}}</p>
        <p>{{allData.pay_price}}</p>
        <p>{{allData.price}}</p>
        <p class="special">{{allData.status}}</p>
        <p class="special">{{allData.pay_time}}</p>
        <p>{{allData.index_mark?allData.index_mark:'无'}}</p> -->
        <!-- <p>是</p>
        <p>五星_直选复式</p> -->
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import publicHead from '../moreService/publicHead'
export default {
  components : {
    publicHead
  },
  data() {
    return {
      funcName: '详情',
      allData: '',
      recordTime: ''
    }
  },
  activated(){
    this.allData = this.$route.params
    let timestamp = this.allData.pay_time*1000
    let assignTime = new Date(timestamp),
        y = assignTime.getFullYear(),
        M = assignTime.getMonth() + 1,
        d = assignTime.getDate(),
        h = assignTime.getHours(),
        m = assignTime.getMinutes(),
        s = assignTime.getSeconds(),
        add0 = (m) => {
          return m > 9 ? m : '0' + m
        }
    this.recordTime = y + '-' + add0(M) + '-' + add0(d) + " " + add0(h) + ":" + add0(m) + ":" + add0(s)
  },
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.rechargeDetails_main_body {
  background-color: #fff;
  .order_info {
    // padding: poTorem(20px);
    .title_word {
      padding-left: poTorem(5px);
      border-left: poTorem(5px) solid #ff7c34;
      font-size: poTorem(20px);
      color: #313131;
      height: poTorem(18px);
      line-height: poTorem(18px);
    }
    .tag {
      width: 100%;
      font-size: poTorem(16px);
      color: #535353;
      text-align: left;
      margin-right: poTorem(20px);
      p {
        height: 3rem;
        line-height: 3rem;
        border-bottom: poTorem(1px) solid #eee;
        span {
          display: inline-block;
          float: left;
          &:first-child {
            padding-left: 1.5rem;
            width: 7rem;
          }
          &:last-child {
            font-size: 1rem;
          }
        }
      }
    }
    .content {
      display: inline-block;
      font-size: poTorem(15px);
      color: #313131;
      p {
        border-bottom: poTorem(1px) solid #666;
      }
      
    }
    // .tag, .content {
    //   display: inline-block;
    //   height: poTorem(20px);
    //   line-height: poTorem(32px);
    //   padding-top: poTorem(20px);
    //   .special {
    //     color: #e33939;
    //   }
    // }
    .lottery_number {
      padding: poTorem(20px);
      font-size: poTorem(13px);
      color: #a0a0a0;
      i {
        color: #e33939;
      }
    }
  }
}
</style>


