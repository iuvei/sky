<template>
  <div class="offer_main_body">
    <publicHead :title="funcName"
                :timeText="chooseTimeText"
                @chooseTimeShow="changeState"
                @pullDown="optionsShow"
                :type="1"></publicHead>
    <div class="betRecord">
      <yd-tab class="openAccount_main_content"
              v-model="state"
              :prevent-default="false"
              :item-click="itemClick">
        <yd-tab-panel label="现金">
          <ul class="offer_card">
            <li class="offer_card_list"
                v-for="(item,index) in cashlist"
                :key="index">
              <img v-show="1"
                   src="../../../../../src/img/welfareTask/youhui_orange.png"
                   alt="">
              <!-- <img v-show="0" src="../../../../../src/img/welfareTask/youhui_gray.png" alt=""> -->
              <div class="offer_card_content">
                <div class="content_top">
                  <div class="left">
                    <p class="offer_tit">{{item.title}}</p>
                    <p class="offer_type">现金红包</p>
                    <p class="limit_time"><span>{{dateFormate(item.uptime)}}</span></p>
                  </div>
                  <div class="offer_price"><span>{{item.price}}</span>元</div>
                </div>
                <div class="contetn_bottom">
                  <p class="content_bottom_main"><span class="mount">需打码量：<i>{{item.dama}}</i></span><button v-show="state">{{item.status}}</button></p>
                </div>
              </div>
            </li>
          </ul>
          <app-empty v-show="!cashlist.length"></app-empty>
        </yd-tab-panel>
        <yd-tab-panel label="代金券">
          <ul class="offer_card">
            <li class="offer_card_list"
                v-for="(item,index) in voucherlist"
                :key="index">
              <img v-show="item.btime"
                   src="../../../../../src/img/welfareTask/youhui_orange.png"
                   alt="">
              <img v-show="!item.btime"
                   src="../../../../../src/img/welfareTask/youhui_gray.png"
                   alt="">
              <div class="offer_card_content">
                <div class="content_top">
                  <div class="left">
                    <p class="offer_tit">{{item.title}}</p>
                    <p class="offer_type">代金券</p>
                    <p class="limit_time">有效期至：<span>{{dateFormate(item.etime)}}</span></p>
                  </div>
                  <div class="offer_price"><span>{{item.price}}</span>元</div>
                </div>
                <div class="contetn_bottom">
                  <p class="content_bottom_main"><span class="mount">需打码量：<i>0</i></span><button :class="{'used':item.btime == 0}"
                            v-show="state">{{item.status}}</button></p>
                </div>
              </div>
            </li>
          </ul>
          <app-empty v-show="!voucherlist"></app-empty>
        </yd-tab-panel>
      </yd-tab>
    </div>
    <yd-actionsheet :items="timeOptions"
                    v-model="choosedTime"
                    class="changePeriod"></yd-actionsheet>
  </div>
</template>
<script>
import dayjs from "dayjs";
// import AppEmpty from "~/components/AppEmpty/AppEmpty";
import publicHead from "../moreService/publicHead";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "优惠管理",
      chooseTimeText: "今天",
      choosedTime: false,
      optionsIsShow: false,
      offer_type: "0",
      lasttime: 1,
      cashlist: [],
      voucherlist: [],
      timeOptions: [
        {
          label: "今天",
          callback: () => {
            this.chooseTimeText = "今天";
            this.lasttime = 1;
            this.pageID = 0;
            this.allIsShow = true;
            this.getcouponlist();
          }
        },
        {
          label: "昨天",
          callback: () => {
            this.chooseTimeText = "昨天";
            this.lasttime = 2;
            this.isFirst = 1;
            this.pageID = 0;
            this.allIsShow = true;
            this.getcouponlist();
          }
        },
        {
          label: "本周",
          callback: () => {
            this.chooseTimeText = "本周";
            this.lasttime = 3;
            this.isFirst = 1;
            this.pageID = 0;
            this.allIsShow = true;
            this.getcouponlist();
          }
        },
        {
          label: "上周",
          callback: () => {
            this.chooseTimeText = "上周";
            this.lasttime = 4;
            this.isFirst = 1;
            this.pageID = 0;
            this.allIsShow = true;
            this.getcouponlist();
          }
        },
        {
          label: "本月",
          callback: () => {
            this.chooseTimeText = "本月";
            this.lasttime = 5;
            this.isFirst = 1;
            this.pageID = 0;
            this.allIsShow = true;
            this.getcouponlist();
          }
        },
        {
          label: "上月",
          callback: () => {
            this.chooseTimeText = "上月";
            this.lasttime = 6;
            this.isFirst = 1;
            this.pageID = 0;
            this.allIsShow = true;
            this.getcouponlist();
          }
        }
      ],
      state: 0
    };
  },
  computed: {},

  mounted() {
    this.getcouponlist();
    console.log(new Date().getHours());
  },
  methods: {
    dateFormate(date) {
      //   let d = new Date(date),
      //        day = d.getDate(),
      //       month = d.getMonth() + 1,
      //       year = d.getFullYear(),
      //       hour = d.getHours(),
      //       min = d.getMinutes();
      //   switch(day){
      //     case day < 10:
      //                   day = '0'+ day;
      //                   break;
      //     case day >= 10:
      //                   day = day;
      //                   break;
      //   }
      //   switch (month){
      //     case month < 10:
      //                   month = '0' + month;
      //                   break;
      //     case month >= 10:
      //                   month = month;
      //                   break;
      //   }
      //   switch (hour){
      //     case hour < 10:
      //                   hour = '0' + hour;
      //                   break;
      //     case hour >= 10:
      //                   hour = hour;
      //                   break;
      //   }
      //   switch (min){
      //     case min < 10:
      //                   min = '0' + min;
      //                   break;
      //     case min >= 10:
      //                   min = min;
      //                   break;
      //   }
      // return year + "-" + month  + "-" + day + " " +  hour + ":" + min;
      return dayjs(date).format("YYYY-MM-DD HH:mm");
    },
    itemClick(key) {
      this.state = key;
      // console.log(this.state);
    },
    changeState() {
      this.choosedTime = true;
    },
    optionsShow() {
      this.bgIsShow = true;
      setTimeout(() => {
        this.optionsIsShow = true;
      }, 0);
    },
    // 获取代金券  接口：活动优惠列表
    getcouponlist() {
      console.log(this.lasttime);
      // this.$dialog.loading.open("正在加载中···");
      this.$ajax("request", {
        ac: "UserOfferAllLiset",
        date: this.lasttime
      }).then(res => {
        console.log(res);
        this.show = true;
        this.cashlist = res.cash;
        this.voucherlist = res.Voucher;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.offer_main_body {
  width: 100%;
  .betRecord {
    .offer_card_list {
      position: relative;
      margin-top: poTorem(15px);
      text-align: center;
      font-family: "SimHei";
      img {
        // position: absolute;
        display: inline-block;
        width: poTorem(380px);
        height: poTorem(150px);
        z-index: 10;
      }
      .offer_card_content {
        width: poTorem(280px);
        height: poTorem(134px);
        position: absolute;
        // background-color: #000;
        z-index: 100;
        top: 0;
        left: poTorem(65px);
      }
      .content_top {
        width: poTorem(320px);
        font-size: poTorem(16px);
        height: poTorem(100px);
        .left {
          display: inline-block;
          width: poTorem(200px);
          .offer_tit {
            text-align: left;
            padding-top: poTorem(10px);
            height: poTorem(55px);
          }
          .offer_type {
            text-align: left;
            color: #e60012;
          }
          .limit_time {
            width: poTorem(250px);
            text-align: left;
            color: #959595;
            font-size: poTorem(14px);
            margin-top: poTorem(10px);
          }
        }
        .offer_price {
          text-align: left;
          float: right;
          text-align: center;
          width: poTorem(80px);
          height: poTorem(70px);
          line-height: poTorem(70px);
          span {
            font-size: poTorem(20px);
          }
        }
      }
      .contetn_bottom {
        .content_bottom_main {
          height: poTorem(40px);
          line-height: poTorem(40px);
          width: poTorem(380px);
          text-align: left;
          margin-left: poTorem(15px);
          margin-top: poTorem(10px);
          .used {
            color: #959595;
            border-color: #959595;
          }
          button {
            outline: none;
            text-decoration: none;
            border: 1px solid $mainColor;
            font-size: poTorem(15px);
            width: poTorem(88px);
            height: poTorem(25px);
            color: $mainColor;
            line-height: poTorem(25px);
            border-radius: poTorem(18px);
          }
          .mount {
            display: inline-block;
            width: 55%;
            font-size: poTorem(15px);
            padding-left: 5px;
            i {
              color: #e60012;
              font-size: poTorem(15px);
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
@import "~css/resources.scss";
.offer_main_body {
  .yd-tab-nav .yd-tab-active {
    color: $mainColor;
  }
  .yd-tab-nav .yd-tab-active:before {
    width: 100%;
    left: 35%;
    background-color: $mainColor;
  }
}
</style>
