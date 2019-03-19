<template>
  <div class="lottery_content">
    <yd-grids-group :rows="3"
                    class="func_part">
      <yd-grids-item v-for="(item, index) in gridsData"
                     :key="index">
        <div @click="goPath(item)"
             class="pieces_content"
             slot="else">
          <i :class="{'flag_mark':userFlag[item.class]}"></i>
          <img :src="item.src"
               alt="">
          <div class="word">
            <p>{{item.text}}</p>
          </div>
        </div>
      </yd-grids-item>
    </yd-grids-group>
  </div>
</template>
<script>
import { mapState } from "vuex";
const basicArr = [
    {
      text: "中奖记录",
      path: "/moreService/prizeRecord",
      src: require("../../../img/personal_center/bingo_record.png")
    },
    {
      text: "投注记录",
      path: "/moreService/betRecords",
      src: require("../../../img/personal_center/bought_record.png")
    },
    {
      text: "账户明细",
      path: "/moreService/accountInfo",
      src: require("../../../img/personal_center/account_details.png")
    },
    {
      text: "代理中心",
      path: "/moreService/agencyCenter",
      src: require("../../../img/personal_center/agency_center.png")
    },
    {
      text: "时时返水",
      path: "/moreService/backwater",
      src: require("../../../img/personal_center/backwater.png")
    },
    {
      text: "福利任务",
      path: "/moreService/welfareTask",
      class: "welfare",
      src: require("../../../img/personal_center/welfare.png")
    },
    {
      text: "个人消息",
      path: "/moreService/personalMessage",
      class: "message",
      src: require("../../../img/personal_center/message.png")
    },
    {
      text: "安全中心",
      path: "/moreService/securityCenter",
      class: "safety",
      src: require("../../../img/personal_center/security_center.png")
    },
    {
      text: "意见反馈",
      path: "/moreService/adviceFeedbacks",
      class: "feedback",
      src: require("../../../img/more_settings/feedback.png")
    },
    {
      text: "更多设置",
      path: "/moreService/moreSetting",
      src: require("../../../img/personal_center/more_settings.png")
    }
  ],
  hasVIP = {
    text: "VIP等级",
    path: { name: "huiyuanxinxi", params: { direct: true } },
    src: require("../../../img/personal_center/VIP_level.png")
  },
  hasCash = {
    text: "现金交易",
    path: "/moreService/cashTransaction",
    src: require("../../../img/personal_center/cash_bills.png")
  },
  hasTodayWin = {
    text: "今日盈亏",
    path: "/moreService/todayProfit",
    src: require("../../../img/personal_center/money_state.png")
  };
export default {
  data() {
    return {};
  },
  activated() {},
  computed: {
    ...mapState(["userFlag", "sysinfo", "userinfo"]),
    gridsData() {
      if (this.sysinfo.cash_status == 1) {
        basicArr.splice(3, 0, hasCash);
      }
      if (this.sysinfo.event_rise == 1) {
        basicArr.splice(3, 0, hasVIP);
      }
      if (this.sysinfo.profit_status == 1) {
        basicArr.splice(3, 0, hasTodayWin);
      }
      return basicArr;
    },
    rebate() {
      return this.$store.state.userinfo.accountInfo.rebate;
    }
  },
  methods: {
    goPath(i) {
      if (
        i.text == "时时返水" &&
        this.$store.state.userinfo.isLogin &&
        this.rebate != 1
      ) {
        this.$dialog.toast({ mes: "该活动暂未开放，敬请期待！" });
        return;
      } else {
        if (i.text === "投注记录") {
          this.$router.push({
            name: "goucaijilu",
            params: {
              fromOutside: true
            }
          });
        } else this.$router.push(i.path);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.lottery_content {
  padding-top: poTorem(20px);
  background-color: #f3f3f3;
  .func_part {
    .pieces_content {
      padding: poTorem(15px) poTorem(20px);
      height: poTorem(100px);
      @include column;
      img {
        width: poTorem(25px);
        height: poTorem(25px);
      }
      .word {
        display: inline-block;
        p {
          line-height: poTorem(27px);
          font-size: poTorem(16px);
          color: #000;
        }
      }
      .flag_mark {
        position: relative;
        right: poTorem(-12px);
        top: poTorem(12px);
        display: inline-block;
        height: poTorem(10px);
        width: poTorem(10px);
        border: poTorem(5px) solid #f00;
        border-radius: poTorem(5px);
      }
    }
  }
}
</style>

