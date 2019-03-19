<template>
  <div class="agencyStatement_main_body">
    <publicHead :title="accountOptions[0]"
                :type="1"
                :timeText="chooseTimeText"
                @chooseTimeShow="choosedTime=true"
                @pullDown="optionsShow"
                slot='list'></publicHead>
    <!-- <publicHead :title="accountOptions[choosed]" :type="1" :timeText="chooseTimeText" @chooseTimeShow="choosedTime=true" @pullDown="optionsShow" slot='list'></publicHead> -->
    <!-- <div class="account_type" v-show="bgIsShow" slot='list'>
      <div :class="[{options_is_show: optionsIsShow}, defaultClass2]">
        <p v-for="(item, index) in accountOptions" :key="index" @click="chooseType(index)" :class="{active: choosed==index}">{{item}}</p>
      </div>
    </div> -->
    <div class="agencyStatement_main_content">
      <div class="search_ipt">
        <input type="text"
               placeholder="请输入下级账号"
               v-model="account">
        <img src="../../../img/daili/search.png"
             alt=""
             @click="manualSearch">
      </div>
      <yd-tab class="betRecord"
              :callback="getData">
        <yd-tab-panel label="全部"
                      :tabkey="0">
          <div class="empty"
               v-show="allData.length==0">
            <img src="../../../img/bet_record/noRecords.png"
                 alt="">
            <p>暂无记录</p>
          </div>
          <AgencyBettingScroll :allData="allData"
                               :tabkey='0'
                               @loadMore="loadMore"
                               v-if="tabType==0"></AgencyBettingScroll>
        </yd-tab-panel>
        <yd-tab-panel label="待开奖"
                      :tabkey="3">
          <div class="empty"
               v-show="allData.length==0">
            <img src="../../../img/bet_record/noRecords.png"
                 alt="">
            <p>暂无记录</p>
          </div>
          <AgencyBettingScroll :allData="allData"
                               :tabkey='3'
                               @loadMore="loadMore"
                               :selfTxt="'待开奖'"
                               v-if="tabType==3">
          </AgencyBettingScroll>
        </yd-tab-panel>
        <yd-tab-panel label="已中奖"
                      :tabkey="2">
          <div class="empty"
               v-show="allData.length==0">
            <img src="../../../img/bet_record/noRecords.png"
                 alt="">
            <p>暂无记录</p>
          </div>
          <AgencyBettingScroll :allData="allData"
                               :tabkey='2'
                               @loadMore="loadMore"
                               v-if="tabType==2">
          </AgencyBettingScroll>
        </yd-tab-panel>
        <yd-tab-panel label="未中奖"
                      :tabkey="5">
          <div class="empty"
               v-show="allData.length==0">
            <img src="../../../img/bet_record/noRecords.png"
                 alt="">
            <p>暂无记录</p>
          </div>
          <AgencyBettingScroll :allData="allData"
                               :tabkey='5'
                               @loadMore="loadMore"
                               :selfTxt="'未中奖'"
                               v-if="tabType==5">
            <p slot="txt">未中奖</p>
          </AgencyBettingScroll>
        </yd-tab-panel>
        <yd-tab-panel label="撤单"
                      :tabkey="4">
          <div class="empty"
               v-show="allData.length==0">
            <img src="../../../img/bet_record/noRecords.png"
                 alt="">
            <p>暂无记录</p>
          </div>
          <AgencyBettingScroll :allData="allData"
                               :tabkey='4'
                               @loadMore="loadMore"
                               :selfTxt="'撤单'"
                               v-if="tabType==4">
            <p slot="txt">撤单</p>
          </AgencyBettingScroll>
        </yd-tab-panel>
      </yd-tab>
    </div>
    <yd-actionsheet :items="timeOptions"
                    v-model="choosedTime"
                    class="changePeriod"></yd-actionsheet>
  </div>
</template>
<script>
import publicHead from "../../huiYuan/components/moreService/publicHead";

import { mapActions, mapState } from "vuex";
import Component from "./block/index";
// console.log(Component);
export default {
  components: {
    publicHead,
    ...Component
  },
  computed: {
    ...mapState("member", ["st_timeData"])
  },
  data() {
    return {
      funcName: "投注明细",
      chooseTimeText: "今天",
      choosedTimeIndex: 0,
      lasttime: 0,
      allData: [],
      pageOffset: 40,
      pageid: 0,
      choosedTime: false,
      tabType: 0,
      typeItem: [
        { label: "全部", type: 0 },
        { label: "待开奖", type: 3 },
        { label: "已中奖", type: 2 },
        { label: "未中奖", type: 5 },
        { label: "撤单", type: 4 }
      ],
      baseData: "",
      account: "",
      userID: "",
      timeOptions: [],
      // accountOptions: ['全部', '彩票', '体育'],
      accountOptions: ["投注明细"],
      choosed: 0,
      bgIsShow: false,
      optionsIsShow: false,
      defaultClass2: "type_options"
    };
  },
  mounted() {
    this.initTimeData();
    this.getBaseData();
  },
  methods: {
    ...mapActions("agent", ["getDailiTouzhuLog"]),
    initTimeData() {
      // this.tabType = sessionStorage.getItem("agencyBetIndex") || 0;
      this.timeOptions = Array.from(this.st_timeData).map(v => ({
        val: v[0],
        label: v[1],
        callback: item => {
          this.chooseTimeText = item.label;
          this.lasttime = item.val;
          this.getBaseData();
        }
      }));
    },
    async getBaseData() {
      this.$dialog.loading.open("正在加载中···");
      this.pageid = 0;
      const res = await this.getDailiTouzhuLog({
        gameid: 0,
        username: this.account,
        type: this.tabType,
        // lasttime: this.lasttime,
        lasttime: this.lasttime,
        pageid: 0
      });
      if (res) {
        this.allData = res;
      } else {
        this.allData = [];
      }
      this.$dialog.loading.close();
    },
    async loadMore(fn) {
      // this.$dialog.loading.open("正在加载中···");
      this.pageid++;
      const res = await this.getDailiTouzhuLog({
        gameid: 0,
        username: this.account,
        type: this.tabType,
        lasttime: this.lasttime,
        // lasttime: 4,
        pageid: this.pageid
      });
      if (res) {
        this.allData = [...this.allData, ...res];
      }
      fn(res.length == this.pageOffset);
    },
    manualSearch() {
      // this.lasttime
      this.getBaseData();
    },
    getData(l, i) {
      // localStorage.setItem("agencyBetIndex", i);
      this.tabType = this.typeItem[i].type;
      sessionStorage.setItem("agencyBetIndex", i);
      this.getBaseData();
    },
    chooseType(n) {
      this.choosed = n;
      this.optionsIsShow = false;
      this.bgIsShow = false;
      this.getBaseData();
    },
    optionsShow() {
      this.bgIsShow = !this.bgIsShow;
      setTimeout(() => {
        this.optionsIsShow = true;
      }, 0);
    }
    // toDetails() {
    //   this.$router.push("/moreService/betRecordDetails");
    // },
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.agencyStatement_main_body {
  .agencyStatement_main_content {
    height: poTorem(688px);
    .search_ipt {
      position: relative;
      width: 100%;
      // height: poTorem(34px);
      padding: poTorem(10px);
      background: #f3f3f3;
      line-height: poTorem(34px);
      input {
        border: none;
        outline: none;
        width: 100%;
        font-size: poTorem(17px);
        text-align: center;
        line-height: poTorem(34px);
        background-color: #fff;
        display: inline-block;
        border-radius: poTorem(5px);
      }
      img {
        width: poTorem(20px);
        height: poTorem(20px);
        position: absolute;
        top: poTorem(18px);
        right: poTorem(18px);
      }
    }
    .betRecord {
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
                  color: #e33939;
                }
              }
              .no_win_word {
                color: #a0a0a0;
              }
              .win_word {
                color: #097c25;
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
        background-color: transparent;
      }
    }
  }
  .account_type {
    position: fixed;
    top: 3rem;
    width: 100%;
    height: 100%;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.3);
    .type_options {
      @include between;
      flex-wrap: wrap;
      background-color: #fff;
      height: 3rem !important;
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
        // margin: 0 poTorem(20px) 0 poTorem(40px);
        &:first-child {
          margin-left: poTorem(50px);
        }
        &:last-child {
          margin-right: poTorem(50px);
        }
      }
      .active {
        background: url(../../../img/account/choosed.png) no-repeat
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


