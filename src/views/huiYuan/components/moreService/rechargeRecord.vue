<template>
  <div class="accountInfo_main_body">
    <publicHead :title="funcName" :type="1" :timeText="chooseTimeText" @chooseTimeShow="changeState" @pullDown="optionsShow"></publicHead>
    <div class="account_type" v-show="bgIsShow">
      <div :class="[{options_is_show: optionsIsShow}, defaultClass2]">
        <p v-for="(item, index) in accountOptions" :key="index" @click="chooseType(item, index)" :class="{active: choosed==index}">{{item}}</p>
      </div>
    </div>
    <div class="content_word">
      <div class="empty" v-show="this.rechargeData==0">
        <img src="../../../../img/bet_record/noRecords.png" alt="">
        <p>暂无记录</p>
      </div>
      <div v-show="this.rechargeData!=0">
        <div class="hasContent" @click="toDetails(item)" v-for="(item, index) in rechargeData" :key="index">
          <div class="left">
            <p>{{item.type}}</p>
            <p>单号{{item.order}}</p>
          </div>
          <!-- <p class="center">600209期</p> -->
          <div class="right">
            <div>
              <p>+{{item.pay_price}}</p>
              <p>{{item.status}}</p>
            </div>
            <div>
              <img src="../../../../img/bet_record/arrow.png" alt="">
            </div>
          </div>
        </div>
        <p class="all_present" v-if="allIsShow" @click="getNextData">点击加载更多</p>
        <p class="all_present" v-else>已显示全部</p>
      </div>
    </div>
    <yd-actionsheet :items="timeOptions" v-model="choosedTime" class="changePeriod"></yd-actionsheet>
  </div>
</template>
<script>
import publicHead from "../moreService/publicHead";
export default {
  components: {
    publicHead,
  },
  data() {
    return {
      funcName: '充值记录',
      accountOptions: [
        '全部', '正在审核', '充值成功', '充值失败',
      ],
      allIsShow:true,
      optionsIsShow: false,
      bgIsShow: false,
      defaultClass2: "type_options",
      choosed: 0,
      rechargeData: [],
      options: 0,
      status: 0,
      pageID:0,
      chooseTimeText: '今天',
      choosedTime: false,
      choosedTimeIndex: 0,
      timeOptions: [
        {
          label: "今天",
          callback: () => {
            this.chooseTimeText = '今天'
            this.choosedTimeIndex = 0
            this.isFirst = 1
            this.pageID = 0
            this.dataCount = 30
            this.allIsShow = true
            this.getData(this.status, 0)
          }
        },
        {
          label: '昨天',
          callback: () => {
            this.chooseTimeText = '昨天'
            this.choosedTimeIndex = 1
            this.isFirst = 1
            this.pageID = 0
            this.dataCount = 30
            this.allIsShow = true
            this.getData(this.status, 1)
          }
        },
        {
          label: '本周',
          callback: () => {
            this.chooseTimeText = '本周'
            this.choosedTimeIndex = 2
            this.isFirst = 1
            this.pageID = 0
            this.dataCount = 30
            this.allIsShow = true
            this.getData(this.status, 2)
          }
        },
        {
          label: '本月',
          callback: () => {
            this.chooseTimeText = '本月'
            this.choosedTimeIndex = 3
            this.isFirst = 1
            this.pageID = 0
            this.dataCount = 30
            this.allIsShow = true
            this.getData(this.status, 3)
          }
        },
        {
          label: '上月',
          callback: () => {
            this.chooseTimeText = '上月'
            this.choosedTimeIndex = 4
            this.isFirst = 1
            this.pageID = 0
            this.dataCount = 30
            this.allIsShow = true
            this.getData(this.status, 4)
          }
        }
      ]
    }
  },
  activated() {
    this.$dialog.loading.open(' ')
    this.getData(this.status,this.choosedTimeIndex)
  },
  methods: {
    getData(i, n) {
      this.$ajax("request", {
        ac: "getUserCzLog",
        status: i,
        pageid: this.pageID,
        lasttime: n,
      }).then(res => {
        if (res.length != 20) {
          this.allIsShow = false;
        }
        this.rechargeData = res;
        this.$dialog.loading.close();
      });
    },
    chooseType(i, n) {
      this.allIsShow = true
      this.pageID = 0
      this.status = n
      this.getData(this.status,this.choosedTimeIndex)
      this.choosed = n
      this.options = n
      this.optionsIsShow = false
      setTimeout(() => {
        this.bgIsShow = false;
      }, 300);
      this.funcName = i;
    },
    optionsShow() {
      this.bgIsShow = !this.bgIsShow;
      setTimeout(() => {
        this.optionsIsShow = true;
      }, 0);
    },
    toDetails(item) {
      this.$router.push({
        name: "chongzhixiangqing",
        params: item,
      });
    },
    refreshData() {
      this.getData(this.options);
    },
    changeState() {
      this.choosedTime = true;
    },
    getNextData(){
      this.pageID++
      this.$ajax('request', {
        ac: 'getUserCzLog',
        status: this.status,
        pageid: this.pageID,
        lasttime: this.choosedTimeIndex,
      }).then(res => {
        this.rechargeData = this.rechargeData.concat(res);
        if (res.length < 20) {
          this.allIsShow = false;
        }
        this.$dialog.loading.close();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.accountInfo_main_body {
  position: relative;
  height: 100%;
  background-color: #fff;
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
    @include between;
    padding: poTorem(20px);
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
              color: #009944;
              text-align: right;
            }
            &:last-child {
              color: #a0a0a0;
              text-align: right;
            }
          }
        }
        &:last-child {
          line-height: poTorem(37px);
        }
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
    position: fixed;
    top: 3rem;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    .type_options {
      @include between;
      flex-wrap: wrap;
      background-color: #fff;
      height: 0;
      overflow: hidden;
      transition: all 0.3s ease-out;
      p {
        width: poTorem(91px);
        height: poTorem(29px);
        font-size: poTorem(15px);
        line-height: poTorem(27px);
        border: 1px solid #ddd;
        text-align: center;
        border-radius: poTorem(3px);
        margin: poTorem(20px) poTorem(20px) 0;
        &:nth-child(4) {
          margin-bottom: poTorem(20px);
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
      height: poTorem(115px);
    }
  }
}
</style>


