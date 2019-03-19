<template>
  <div class="drawingsRecord_main_body">
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
           :class="{active: choosed==index}">{{item}}</p>
      </div>
    </div>
    <div class="content_word">
      <div class="empty"
           v-show="this.rechargeData==0">
        <img src="../../../../img/bet_record/noRecords.png"
             alt="">
        <p>暂无记录</p>
      </div>
      <div class="hasContent"
           @click="toDetails(item)"
           v-show="this.rechargeData!=0"
           v-for="(item, index) in rechargeData"
           :key="index">
        <div class="left">
          <p>出款</p>
          <p>单号：{{ item.order }}</p>
        </div>
        <!-- <p class="center">600209期</p> -->
        <div class="right">
          <div>
            <p>-{{item.shiji_price}}元</p>
            <!-- 0,1审核中 2通过 3，4已取消 -->
            <!-- <p>{{item.status==0 || item.status == 1 ? "审核中" : item.status==3 || item.status == 4 ? "已取消" : "已通过"}}</p> -->
            <p>{{item.status}}</p>
          </div>
          <div>
            <img src="../../../../img/bet_record/arrow.png"
                 alt="">
          </div>
        </div>
      </div>
      <p class="all_present"
         v-show="this.rechargeData!=0"
         @click="getNextData">{{allIsShow?'已显示全部':'查看更多'}}</p>
      <!-- <p class="all_present" v-if="allIsShow" @click="getNextData" v-show="this.rechargeData!=0">点击加载更多</p>
      <p class="all_present" v-else v-show="this.rechargeData!=0">已显示全部</p> -->
      <!-- <p class="all_present" v-show="false">已显示全部</p> -->
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
      funcName: "提款记录",
      chooseTimeText: "今天",
      choosedTime: false,
      accountOptions: ["全部", "审核中", "已通过", "已取消"],
      optionsIsShow: false,
      bgIsShow: false,
      defaultClass2: "type_options",
      choosed: 0,
      pageID: 0,
      rechargeData: [],
      allIsShow: true,
      status: 0,
      lasttime: 0,
      timeOptions: [
        {
          label: "今天",
          callback: () => {
            this.chooseTimeText = "今天";
            this.lasttime = 0;
            this.pageID = 0;
            this.getData();
          }
        },
        {
          label: "昨天",
          callback: () => {
            this.chooseTimeText = "昨天";
            this.lasttime = 1;
            this.pageID = 0;
            this.getData();
          }
        },
        {
          label: "本周",
          callback: () => {
            this.chooseTimeText = "本周";
            this.lasttime = 2;
            this.pageID = 0;
            this.getData();
          }
        },
        {
          label: "本月",
          callback: () => {
            this.chooseTimeText = "本月";
            this.lasttime = 3;
            this.pageID = 0;
            this.getData();
          }
        },
        {
          label: "上月",
          callback: () => {
            this.chooseTimeText = "上月";
            this.lasttime = 4;
            this.pageID = 0;
            this.getData();
          }
        }
      ]
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    getData() {
      this.$ajax("request", {
        ac: "getUserTKLog",
        status: this.status,
        pageid: this.pageID,
        lasttime: this.lasttime
      }).then(res => {
        console.log(res);
        if (res.length == 20) {
          this.allIsShow = false;
        }
        this.rechargeData = res;
        this.$dialog.loading.close();
      });
    },
    chooseType(i, n) {
      console.log(i);
      console.log(n);
      this.allIsShow = true;
      this.pageID = 0;
      this.status = n;
      this.getData();
      this.choosed = n;
      this.optionsIsShow = false;
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
    getNextData() {
      if (this.allIsShow) {
        return;
      }
      this.pageID++;
      this.$ajax("request", {
        ac: "getUserTKLog",
        status: this.status,
        pageid: this.pageID
      }).then(res => {
        console.log(res);
        this.rechargeData = this.rechargeData.concat(res);
        if (res.length < 20) {
          this.allIsShow = false;
        }
        this.$dialog.loading.close();
      });
    },
    toDetails(item) {
      this.$router.push({
        name: "tikuanxiangqing",
        params: item
      });
    },
    refreshData() {
      this.pageID = 0;
      this.allIsShow = true;
      this.getData();
    },
    changeState() {
      this.choosedTime = true;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.drawingsRecord_main_body {
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
    }
    p {
      font-size: poTorem(14px);
      height: poTorem(20px);
      line-height: poTorem(20px);
      color: #bfbfbf;
      font-weight: 700;
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
              color: #e33939;
            }
            &:last-child {
              color: #a0a0a0;
            }
          }
        }
        &:last-child {
          // line-height: poTorem(37px);
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
    width: 100%;
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


