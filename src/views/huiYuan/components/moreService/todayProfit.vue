<template>
  <div class="todayProfit_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <div class="todayProfit_main_content other-block">
      <div class="up_content">
        <p>{{(baseData.profit * 1 || 0).toFixed(2)}}</p>
        <!-- <img src="~img/recharge/refresh.png" alt="" @click="getBaseData"> -->
      </div>

      <yd-flexbox class="two_content">
        <yd-flexbox-item>
          <router-link to='/moreService/Nrecharge'
                       class="recharge">
            <p class="price">{{(baseData.pay * 1 || 0).toFixed(2)}}</p>
            <p>今日充值</p>
          </router-link>
        </yd-flexbox-item>
        <yd-flexbox-item>
          <router-link to='/moreService/NgetCash'
                       class="get_cash">
            <p class="price">{{(baseData.tkprice * 1 || 0).toFixed(2)}}</p>
            <p>今日提现</p>
          </router-link>
        </yd-flexbox-item>
      </yd-flexbox>

      <div class="date-wrap">
        <select-date class="menu"
                     :unixStamp='unixStamp'
                     @date="setDate"></select-date>
      </div>

      <div class="center_content">
        <yd-flexbox v-for="(item, index) in allWealth"
                    :key="index">
          <yd-flexbox-item>{{item.title}}</yd-flexbox-item>
          <yd-flexbox-item class="price-color">{{item.num}}</yd-flexbox-item>
        </yd-flexbox>
      </div>

      <div class="desc_content">
        <p>- 投注金额：在当天开奖的投注订单金额</p>
        <p>- 中奖金额：在当天中奖派发的金额</p>
        <p>- 盈亏汇总：中奖金额 + 赠送彩金 + 返水金额 - 投注金额</p>
      </div>

    </div>
  </div>
</template>
<script>
import publicHead from "./publicHead";
import selectDate from "../SelectDate";
export default {
  components: {
    publicHead,
    selectDate
  },
  data() {
    return {
      unixStamp: new Date(),
      funcName: "今日盈亏",
      baseData: {}, // 今日数据
      allWealth: [
        {
          num: "",
          title: "投注金额"
        },
        {
          num: "",
          title: "中奖金额"
        },
        {
          num: "",
          title: "赠送彩金"
        },
        {
          num: "",
          title: "返水金额"
        },
        {
          num: "",
          title: "充值金额"
        },
        {
          num: "",
          title: "提现金额"
        },
        {
          num: "",
          title: "盈亏汇总"
        }
      ]
    };
  },
  watch: {
    unixStamp() {
      this.getBaseData();
    }
  },
  activated() {
    this.unixStamp = new Date();
    this.getBaseData();
  },
  methods: {
    setDate(date) {
      this.unixStamp = date;
    },
    getBaseData() {
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "GetProfitAndLoss",
        lasttime: new Date(this.unixStamp).format("yyMMdd")
      })
        .then((res = {}) => {
          if (
            new Date().format("yyMMdd") ===
            new Date(this.unixStamp).format("yyMMdd")
          ) {
            this.baseData = res;
          }
          this.allWealth[0].num = (res.touzhu * 1 || 0).toFixed(2);
          this.allWealth[1].num = (res.paicai * 1 || 0).toFixed(2);
          this.allWealth[2].num = (res.caijin * 1 || 0).toFixed(2);
          this.allWealth[3].num = (res.fanshui * 1 || 0).toFixed(2);
          this.allWealth[4].num = (res.pay * 1 || 0).toFixed(2);
          this.allWealth[5].num = (res.tkprice * 1 || 0).toFixed(2);
          this.allWealth[6].num = (res.profit * 1 || 0).toFixed(2);

          this.$dialog.loading.close();
        })
        .catch(() => this.$dialog.loading.close());
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.todayProfit_main_body {
  background-color: #eee;
  font-size: 1rem;
  line-height: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  .todayProfit_main_content {
    .up_content {
      background-color: $mainColor;
      font-size: 1.6rem;
      font-weight: 600;
      color: #ffffff;
      height: 8rem;
      line-height: 8rem;
    }
    .two_content {
      background-color: #f06327;
      color: #ffffff;
      position: relative;
      .get_cash::before {
        content: "";
        border-left: 1px solid #ffffff;
        position: absolute;
        left: 50%;
        top: 1rem;
        height: 2rem;
      }
      .price {
        color: #fae80a;
      }
    }
    .date-wrap {
      padding: 0.7rem 0;
      .menu {
        background-color: #ffffff;
      }
    }
    .center_content {
      line-height: 3rem;
      background-color: #fff;
      .price-color {
        color: #df0000;
      }
    }
    .desc_content {
      text-align: left;
      font-size: 0.9rem;
      padding: 1rem 0.7rem;
    }
  }
}
</style>

