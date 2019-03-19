<template>
  <div class="accountInfo_main_body">
    <publicHead :title="funcName"
                :type="1"
                :timeText="chooseTimeText"
                @chooseTimeShow="changeState"
                @pullDown="optionsShow"></publicHead>
    <div class="account_type"
         v-show="bgIsShow">
      <div :class="[{options_is_show: optionsIsShow}, defaultClass2]">
        <p v-for="(item, index) in accountOptions"
           :key="index"
           @click="chooseType(item, index)"
           :class="{active: choosed==index}">{{item.text}}</p>
      </div>
    </div>
    <div class="content_word">
      <div class="empty"
           v-show="this.allData ==0">
        <img src="../../../../img/bet_record/noRecords.png"
             alt="">
        <p>暂无记录</p>
      </div>
      <div class="hasContent"
           @click="toDetails(item)"
           v-show="this.allData!=0"
           v-for="(item, index) in allData"
           :key="index">
        <div class="left">
          <p>{{item.trad_type}}</p>
          <p>单号：{{item.dingdan}}</p>
        </div>
        <!-- <p class="center">{{item.dingdan}}</p> -->
        <div class="right">
          <div>
            <p :class="item.price>0?'green':'red'">{{item.price}}元</p>
            <p>{{item.pay_time}}</p>
          </div>
          <!-- <div>
            <img src="../../../../img/bet_record/arrow.png" alt="">
          </div> -->
        </div>
      </div>
      <p class="all_present"
         v-show="this.allData!=0"
         @click="getMoreData">{{isAllPresent?'已显示全部':'查看更多'}}</p>
    </div>
    <yd-actionsheet :items="timeOptions"
                    v-model="choosedTime"
                    class="changePeriod"></yd-actionsheet>
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
      funcName: "账户明细",
      accountOptions: [
        { text: "全部", type: 0 },
        { text: "公司入款", type: 1 },
        { text: "线上入款", type: 2 },
        { text: "人工入款", type: 3 },
        { text: "活动优惠", type: 4 },
        { text: "投注退款", type: 5 },
        { text: "提款退还", type: 6 },
        { text: "代理返点", type: 7 },
        { text: "中奖派送", type: 9 },
        { text: "返水记录", type: 10 },
        { text: "退款记录", type: 50 },
        { text: "投注记录", type: 51 },
        { text: "现金交易", type: 52 }
      ],
      allData: [],
      isAllPresent: false,
      optionsIsShow: false,
      bgIsShow: false,
      defaultClass2: "type_options",
      choosed: 0,
      choosedType: 0,
      type: 0,
      lasttime: 0,
      pageID: 0,
      chooseTimeText: "今天",
      choosedTime: false,
      choosedTimeIndex: 0,
      timeOptions: [
        {
          label: "今天",
          callback: () => {
            this.chooseTimeText = "今天";
            this.lasttime = 0;
            this.pageID = 0;
            this.isAllPresent = false;
            this.allIsShow = true;
            this.getData();
          }
        },
        {
          label: "昨天",
          callback: () => {
            this.chooseTimeText = "昨天";
            this.lasttime = 1;
            this.pageID = 0;
            this.isAllPresent = false;
            this.allIsShow = true;
            this.getData();
          }
        },
        {
          label: "本周",
          callback: () => {
            this.chooseTimeText = "本周";
            this.lasttime = 2;
            this.pageID = 0;
            this.isAllPresent = false;
            this.allIsShow = true;
            this.getData();
          }
        },
        {
          label: "本月",
          callback: () => {
            this.chooseTimeText = "本月";
            this.lasttime = 3;
            this.pageID = 0;
            this.isAllPresent = false;
            this.allIsShow = true;
            this.getData();
          }
        },
        {
          label: "上月",
          callback: () => {
            this.chooseTimeText = "上月";
            this.lasttime = 4;
            this.pageID = 0;
            this.isAllPresent = false;
            this.allIsShow = true;
            this.getData();
          }
        }
      ]
    };
  },
  activated() {
    this.isAllPresent = false;
    this.allIsShow = true;
    this.pageID = 0;
    this.type = this.$route.params.type || 0;
    if (this.$route.params.type) {
      this.funcName = "返水记录";
    } else {
      this.funcName = "账户明细";
    }
    this.getData();
  },
  methods: {
    getData() {
      this.$ajax("request", {
        ac: "GetUserTradLog",
        type: this.type,
        pageid: this.pageID,
        lasttime: this.lasttime
      }).then(res => {
        if (res.length != 30) {
          this.isAllPresent = true;
        }
        if (res.length == 0) {
          this.allIsShow = false;
        }
        this.allData = res;
        this.$dialog.loading.close();
      });
    },
    chooseType(i, n) {
      this.type = i.type;
      this.getData();
      this.choosed = n;
      this.choosedType = i.type;
      this.optionsIsShow = false;
      setTimeout(() => {
        this.bgIsShow = false;
      }, 300);
      this.funcName = i.text;
    },
    optionsShow() {
      this.bgIsShow = !this.bgIsShow;
      setTimeout(() => {
        this.optionsIsShow = true;
      }, 0);
    },
    toDetails() {
      // this.$router.push({
      //   name: 'chongzhixiangqing',
      //   params: item
      // })
    },
    refresh() {
      this.getData(this.choosedType);
    },
    changeState() {
      this.choosedTime = true;
    },
    getMoreData() {
      this.pageID++;
      if (!this.isAllPresent) {
        this.$ajax("request", {
          ac: "GetUserTradLog",
          type: this.type,
          pageid: this.pageID,
          lasttime: this.lasttime
        }).then(res => {
          if (res.length != 30) {
            this.isAllPresent = true;
          }
          if (res.length == 0) {
            this.allIsShow = false;
          }
          this.allData = [...this.allData, ...res];
          this.$dialog.loading.close();
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.accountInfo_main_body {
  height: 100%;
  position: relative;
  background: #fff;
  .content_word {
    background-color: #fff;
    padding-bottom: 3rem;
  }
  .empty {
    padding-top: 50%;
    @include column;
    img {
      width: poTorem(93px);
      // height: poTorem(81px);
    }
    p {
      font-size: poTorem(14px);
      height: poTorem(20px);
      line-height: poTorem(20px);
      color: #bfbfbf;
      font-weight: 700;
    }
    button {
      width: poTorem(93px);
      padding: 5px 0 5px 0;
      font-size: 14px;
      text-align: center;
      font-weight: 700;
      border-radius: 5px;
      color: #fff;
      background-color: #f93;
      outline: none;
      border: none;
    }
  }
  .hasContent {
    @include around;
    padding: poTorem(20px) 0;
    border-bottom: poTorem(1px) solid #eee;
    .left {
      p {
        &:first-child {
          font-size: poTorem(14px);
          color: #313131;
        }
        &:last-child {
          font-size: poTorem(12px);
          color: #a0a0a0;
        }
      }
    }
    .center {
      font-size: poTorem(12px);
      color: #313131;
    }
    .right {
      div {
        float: left;
        height: poTorem(37px);
        &:first-child {
          font-size: poTorem(13px);
          p {
            &:first-child {
              text-align: right;
            }
            &:last-child {
              color: #a0a0a0;
            }
          }
          .red {
            color: #e33939;
          }
          .green {
            color: rgb(18, 139, 53);
          }
        }
        // &:last-child {
        // line-height: poTorem(37px);
        // }
        img {
          width: poTorem(16px);
        }
      }
    }
  }
  .all_present {
    width: 100%;
    text-align: center;
    margin-top: poTorem(20px);
    font-size: 1rem;
    color: #a0a0a0;
    font-weight: 400;
  }
  .account_type {
    width: 100%;
    position: fixed;
    top: 3rem;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    .type_options {
      @include around;
      flex-wrap: wrap;
      background-color: #fff;
      height: 0;
      overflow: hidden;
      transition: all 0.3s ease-out;
      justify-content: space-between;
      padding: 0 poTorem(10px);
      p {
        width: poTorem(91px);
        height: poTorem(29px);
        font-size: poTorem(15px);
        line-height: poTorem(27px);
        border: 1px solid #ddd;
        text-align: center;
        border-radius: poTorem(3px);
        margin-top: poTorem(20px);
        &:nth-child(n + 13) {
          margin-bottom: poTorem(20px);
        }
        &:last-child {
        }
      }
      .active {
        background: url(../../../../img/account/choosed.png) no-repeat
          poTorem(70px) poTorem(8px);
        background-size: poTorem(20px) poTorem(20px);
        border-color: #e33939;
      }
    }
    .options_is_show {
      height: poTorem(220px);
    }
  }
}
</style>


