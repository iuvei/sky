<template>
  <div class="drawingsList_main_body">
    <publicHead :title="funcName" :type="2"></publicHead>
    <div class="order_info">
      <p class="title_word">出款内容</p>
      <div class="flex_box">
        <div class="tag">
          <p>订单号：</p>
          <p>出款类型：</p>
          <p>出款金额：</p>
          <p>手续费：</p>
          <p>实际出款：</p>
          <p>出款状态：</p>
          <p>出款时间：</p>
          <p>备注：</p>
          <!-- <p>玩法名称</p> -->
        </div>
        <div class="content">
          <p>{{allData.order}}</p>
          <p>在线取款</p>
          <p>{{allData.price}}</p>
          <p>{{allData.price_fee}}</p>
          <p>{{allData.shiji_price}}</p>
          <p class="special">{{allData.status}}</p>
          <p class="special">{{allData.time}}</p>
          <p>{{allData.index_mark}}</p>
          <!-- <p>五星_直选复式</p> -->
        </div>
      </div>
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
      funcName: '出款明细',
      allData: '',
      recordTime: ''
    }
  },
  activated() {
    this.allData = this.$route.params
    let timestamp = this.allData.time*1000
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
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.drawingsList_main_body {
  background-color: #fff;
  .order_info {
    padding: poTorem(20px);
    .title_word {
      padding-left: poTorem(5px);
      border-left: poTorem(5px) solid #ff7c34;
      font-size: poTorem(20px);
      color: #313131;
      height: poTorem(18px);
      line-height: poTorem(18px);
    }
    .flex_box {
      display: flex;
      justify-content: space-between;
      .tag {
        // width: 20%;
        font-size: poTorem(15px);
        color: #959595;
        text-align: right;
        // margin-right: poTorem(20px);
      }
      .content {
        height: auto;
        display: inline-block;
        font-size: poTorem(15px);
        color: #313131;
      }
      .tag, .content {
        display: inline-block;
        // height: poTorem(20px);
        line-height: poTorem(32px);
        padding-top: poTorem(20px);
        p {
          height: 2rem;
        }
        .special {
          color: #e33939;
        }
      }
    }
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


