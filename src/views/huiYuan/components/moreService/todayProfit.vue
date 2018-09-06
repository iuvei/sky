<template>
  <div class="todayProfit_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <div class="todayProfit_main_content">
      <div class="up_content">
        <p>盈亏总额（元）</p>
        <p>
          <span>{{baseData.win_price}}</span>
          <img src="../../../../img/recharge/refresh.png" alt="" @click="getBaseData">
        </p>
        <p>盈亏计算方式：中奖 - 投注 + 活动 + 返点</p>
      </div>
      <div class="center_content">
        <div v-for="(item, index) in allWealth" :key="index">
          <p>{{item.num}}</p>
          <p>{{item.title}}</p>
        </div>
      </div>
      <div class="footer_content">
        <router-link to='/moreService/Nrecharge' class="recharge">
          <img src="../../../../img/personal_center/charge.png" alt="">
          <span>充值</span>
        </router-link>
        <router-link to='/moreService/NgetCash' class="get_cash">
          <img src="../../../../img/personal_center/get_cash.png" alt="">
          <span>提现</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import publicHead from './publicHead'
export default {
  components : {
    publicHead
  },
  data() {
    return {
      funcName: '今日盈亏',
      baseData: {},
      allWealth: [
        {
          num: '',
          title: '投注金额'
        },
        {
          num: '',
          title: '中奖金额'
        },
        {
          num: '',
          title: '活动礼金'
        },
        {
          num: '',
          title: '返点金额'
        },
        {
          num: '',
          title: '充值金额'
        },
        {
          num: '',
          title: '提现金额'
        }
      ]
    }
  },
  mounted() {
    this.getBaseData()
  },
  methods: {
    getBaseData() {
      this.$dialog.loading.open(' ')
      this.$ajax('request', {
        ac: 'todayWin'
      }).then(res => {
        this.baseData = res
        this.allWealth[0].num = this.baseData.tou_price
        this.allWealth[1].num = this.baseData.zhong
        this.allWealth[2].num = this.baseData.huo_price
        this.allWealth[3].num = this.baseData.fan_price
        this.allWealth[4].num = this.baseData.pay_price
        this.allWealth[5].num = this.baseData.ti_price
        this.$dialog.loading.close()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.todayProfit_main_body {
  background-color: #eee;
  .todayProfit_main_content {
    .up_content {
      margin: poTorem(10px) 0;
      background-color: #fff;
      padding: poTorem(20px);
      p {
        &:first-child {
          font-size: poTorem(13px);
          color: #000;
        }
        &:nth-child(2) {
          text-align: center;
          margin-bottom: poTorem(30px);
          span {
            font-size: poTorem(25px);
            color: #e33939;
            margin-right: poTorem(20px);
          }
          img {
            width: poTorem(21px);
          }
        }
        &:last-child {
          font-size: poTorem(13px);
          color: #666;
          text-align: center;
        }
      }
    }
    .center_content {
      background-color: #fff;
      @include between;
      flex-wrap: wrap;
      padding: poTorem(20px) 0;
      div {
        width: poTorem(120px);
        height: poTorem(50px);
        p {
          text-align: center;
          font-size: poTorem(15px);
          &:first-child {
            color: #ff9147;
            margin-bottom: poTorem(10px);
          }
          &:last-child {
            color: #666;
          }
        }
        &:nth-child(2), &:nth-child(5) {
          border-left: poTorem(1px) dashed #ddd;
          border-right: poTorem(1px) dashed #ddd;
        }
        &:nth-child(n+4) {
          margin-top: poTorem(40px);
        }
      }
    }
    .footer_content {
      background-color: #fff;
      @include center;
      position: absolute;
      bottom: 0;
      width: 100%;
      border-top: poTorem(1px) solid #ddd;
      .recharge, .get_cash {
        @include center;
        width: 49%;
        height: poTorem(31px);
        margin: poTorem(20px) 0;
        padding-right: poTorem(20px);
        img {
          width: poTorem(22px);
          margin-right: poTorem(10px);
        }
        span {
          font-size: poTorem(18px);
        }
      }
      .recharge {
        border-right: poTorem(1px) solid #ddd;
        span {
          color: #fb6f10;
        }
      }
      .get_cash {
        span {
          color: #7cba59;
        }
      }
    }
  }
}
</style>

