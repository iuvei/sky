<template>
  <div class="agencyDeals_main_body">
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
    <div class="agencyDeals_main_content">
      <div class="search_ipt">
        <input type="text"
               placeholder="账号查询"
               v-model="account">
        <img src="../../../img/daili/search.png"
             alt=""
             @click="controllerRequest()">
      </div>
      <div class="betRecord">
        <div class="empty"
             v-show="allData.length==0">
          <img src="../../../img/bet_record/noRecords.png"
               alt="">
          <p>暂无记录</p>
        </div>
        <div v-if="pageIndex===0&&allData.length>0">
          <div class="hasContent"
               @click="toDetails(item)"
               v-for="(item, index) in allData"
               :key="index">
            <div class="left">
              <div>
                <p>{{item.username}}</p>
                <p>{{ item.pay_time }}</p>
              </div>
            </div>
            <div class="right">
              <div>
                <p>{{item.price}}元</p>
                <p>{{item.trad_type}}</p>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
        <p class="else_word"
           v-show="allData!=0"
           @click="togetChildTradLog">{{hasPage?'查看更多':'已显示全部数据'}}</p>
      </div>
    </div>
    <yd-actionsheet :items="timeOptions"
                    v-model="choosedTime"
                    class="changePeriod"></yd-actionsheet>
  </div>
</template>
<script>
import publicHead from "../../huiYuan/components/moreService/publicHead";
import { mapActions, mapState } from "vuex";
// import { getDate, getMonday, getMonth } from "../../../js/agencyDate";
export default {
  components: {
    publicHead
  },
  computed: {
    ...mapState("member", ["st_timeData"])
  },
  data() {
    return {
      funcName: "交易明细",
      chooseTimeText: "今天",
      lastTime: 0,
      pageIndex: 0,
      pageid: 0,
      pageOffset: 40,
      hasPage: true,
      account: "",
      allData: [],
      choosedTime: false,
      userID: "",
      timeOptions: [],
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
        { text: "提款记录", type: 50 },
        { text: "投注记录", type: 51 },
        { text: "现金交易", type: 52 }
      ],
      bgIsShow: false,
      optionsIsShow: false,
      defaultClass2: "type_options",
      choosed: 0,
      choosedType: 0,
      type: 0
    };
  },
  mounted() {
    // this.getBaseData(this.type, "getChildTradLog");
    // console.log("object");
    this.initTimeData();
    this.togetChildTradLog();
    // this.togetNextPayPriceList();
    // this.togetNextGetPriceList();
  },
  methods: {
    ...mapActions("agent", [
      "getChildTradLog",
      "getNextPayPriceList",
      "getNextGetPriceList"
    ]),
    dealData(res) {
      // 有返回数据
      if (res) {
        // 不是第一次访问
        if (this.pageid) {
          this.allData = [...this.allData, ...res];
        } else {
          this.allData = res;
        }
        // 长度等于默认长度
        if (res.length === this.pageOffset) {
          this.pageid++;
        } else {
          this.hasPage = false;
        }
      } else {
        // 区分 第一次返回为空 和loading时返回为空
        if (this.pageid) {
          this.hasPage = false;
        } else {
          this.allData = [];
        }
      }
    },
    async togetChildTradLog() {
      if (!this.hasPage) return;
      const res = await this.getChildTradLog({
        username: this.account,
        pageid: this.pageid,
        lasttime: this.lastTime,
        tradtype: this.type
      });
      this.dealData(res);
      // console.log(123);
      this.$dialog.loading.close();
    },
    async togetNextGetPriceList() {
      if (!this.hasPage) return;
      const res = await this.getNextGetPriceList({
        username: this.account,
        pageid: this.pageid,
        lasttime: this.lastTime,
        tradtype: this.type
      });
      this.dealData(res);
      // if (res) this.allData = res;
      this.$dialog.loading.close();
    },
    async togetNextPayPriceList() {
      if (!this.hasPage) return;
      const res = await this.getNextPayPriceList({
        username: this.account,
        pageid: this.pageid,
        lasttime: this.lastTime,
        tradtype: this.type
      });
      this.dealData(res);
      // if (res) this.allData = res;
      this.$dialog.loading.close();
    },
    changeState() {
      this.choosedTime = true;
    },
    getData(l, i) {
      this.pageIndex = i;
      this.controllerRequest();
    },
    controllerRequest(n = this.lastTime) {
      this.pageid = 0;
      this.hasPage = true;
      this.$dialog.loading.open("正在加载中···");
      switch (this.pageIndex) {
        case 0:
          this.togetChildTradLog(n);
          break;
        case 1:
          this.togetNextGetPriceList(n);
          break;
        case 2:
          this.togetNextPayPriceList(n);
          break;
        default:
          break;
      }
    },
    initTimeData() {
      this.timeOptions = Array.from(this.st_timeData).map(v => ({
        val: v[0],
        label: v[1],
        callback: item => {
          this.chooseTimeText = item.label;
          this.lastTime = item.val;
          this.controllerRequest();
        }
      }));
    },
    toDetailsData(item) {
      switch (this.pageIndex) {
        case 0:
          return {
            title: "所有详情",
            data: [
              { label: "订单号：", value: item.order },
              { label: "出款类型：", value: item.trad_type },
              { label: "出款金额：", value: item.price },
              { label: "手续费：", value: item.price_take },
              { label: "实际出款：", value: item.shiji_price },
              { label: "出款状态：", value: item.status, class: "red" },
              { label: "出款时间：", value: item.time, class: "red" }
            ]
          };

        case 1:
          return {
            title: "出款详情",
            data: [
              { label: "订单号：", value: item.order },
              { label: "出款类型：", value: item.trad_type },
              { label: "出款金额：", value: item.price },
              { label: "手续费：", value: item.price_take },
              { label: "实际出款：", value: item.shiji_price },
              { label: "出款状态：", value: item.status, class: "red" },
              { label: "出款时间：", value: item.time, class: "red" }
            ]
          };

        case 2:
          item.price_end = item.price + item.price_first + item.price_odd;
          return {
            title: "入款详情",
            data: [
              { label: "订单号:", value: item.order },
              { label: "入款类型:", value: item.trad_type },
              { label: "存款金额:", value: item.price },
              { label: "最终存入:", value: item.price_end.toFixed(2) },
              { label: "存入状态:", value: item.status_str, class: "red" },
              { label: "存入时间:", value: item.time, class: "red" },
              { label: "备注:", value: item.index_mark }
            ]
          };

        default:
          break;
      }
    },
    toDetails() {
      return;
      // this.$router.push("/moreService/betRecordDetails");
      // console.log(item);
      // this.$router.push({
      //   name: "agentListDetail",
      //   params: this.toDetailsData(item)
      // });
    },
    chooseType(i, n) {
      this.type = i.type;
      this.controllerRequest();
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.agencyDeals_main_body {
  height: 100%;
  background-color: #fff;
  .agencyDeals_main_content {
    // height: poTorem(688px);
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
        @include between;
        padding: poTorem(20px) 0;
        border-bottom: poTorem(1px) solid #eee;
        .left {
          width: 40%;
          @include column;
          > div {
            width: 80%;
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
        }
        .center {
          font-size: poTorem(12px);
          color: #313131;
        }
        .right {
          width: 40%;
          @include column;
          > div {
            width: 80%;
            // float: left;
            // height: poTorem(37px);
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
      .else_word {
        font-size: poTorem(15px);
        color: #626262;
        text-align: center;
        background-color: #fff;
        line-height: poTorem(45px);
      }
    }
  }
  .account_type {
    position: fixed;
    top: 3rem;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10;
    .type_options {
      @include around;
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
        margin-top: poTorem(20px);
        &:nth-child(n + 9) {
          margin-bottom: poTorem(20px);
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
      height: poTorem(167px);
    }
  }
}
</style>


