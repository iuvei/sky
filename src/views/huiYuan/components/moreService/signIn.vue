<template>
  <div class="signIn_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <div class="sign_in_title">
      <p>{{day}}</p>
      <p>累计签到
        <i>{{dayNum}}</i>
        天
      </p>
      <p @click="signIn">{{isSignInToday ? '已签到' : '未签到'}}</p>
    </div>
    <vue-event-calendar :events="demoEvents"></vue-event-calendar>
    <div class="sing_in_prize">
      <p class="title">累计签到奖励
        <router-link class="link"
                     to="/moreService/signInRecord">查看领取记录
          <b></b>
        </router-link>
      </p>
      <div class="record_rows"
           @click="gettingInfo()">
        <div>
          <img src="../../../../img/welfareTask/treasure_box.png"
               alt="">
          <div class="content">
            <p>还需签到
              <span>{{surplusDate}}</span> 天可以领取</p>
            <p :style="receive=='点击领取'?'color:#E73A42':''">{{receive}}</p>
          </div>
        </div>
        <img src="../../../../img/bet_record/arrow.png"
             alt="">
      </div>
    </div>
    <div class="bottom">
      <h5>提示：</h5>
      <p>1、累计或连续签到到达相应的天数都可获得奖励！</p>
      <p>2、领取宝箱即可随机获得代金券或现金奖励。</p>
    </div>
    <!-- <yd-popup v-model="show" position="center" width="60%" class="pop_win">
      <p>累计签到{{needDay}}天可以领取</p>
      <p><i>{{prizeMoney}}</i> 元彩金</p>
      <p>还需{{leftDay>0?leftDay:0}}天</p>
      <p>
        <button @click="show=false">确定</button>
      </p>
    </yd-popup> -->
    <div v-show="show"
         class="pop_win">
      <div class="bg"></div>
      <div class="cont">
        <img src="../../../../img/welfareTask/treasure_boxs.png"
             alt="">
        <p>获得
          <i>{{prizeMoney}}</i> 元彩金</p>
        <b @click="close"></b>
      </div>
    </div>
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
      funcName: "每日签到",
      today: "2018-1-15",
      day: "2018年5月",
      dayNum: 0,
      show: false,
      needDay: 7,
      prizeMoney: 10,
      leftDay: 5,
      date: "",
      surplusDate: 0,
      receive: "未达到领取资格",
      isSignInToday: false,
      demoEvents: [],
      signInState: [
        {
          day: "7",
          state: "2",
          status: 0,
          src1: require("../../../../img/welfareTask/treasure_box1.png"),
          src2: require("../../../../img/welfareTask/treasure_box1_c.png"),
          src3: require("../../../../img/welfareTask/treasure_box1_o.png")
        },
        {
          day: "14",
          state: "2",
          status: 0,
          src1: require("../../../../img/welfareTask/treasure_box2.png"),
          src2: require("../../../../img/welfareTask/treasure_box2_c.png"),
          src3: require("../../../../img/welfareTask/treasure_box2_o.png")
        },
        {
          day: "21",
          state: "2",
          status: 0,
          src1: require("../../../../img/welfareTask/treasure_box3.png"),
          src2: require("../../../../img/welfareTask/treasure_box3_c.png"),
          src3: require("../../../../img/welfareTask/treasure_box3_o.png")
        },
        {
          day: "28",
          state: "2",
          status: 0,
          src1: require("../../../../img/welfareTask/treasure_box4.png"),
          src2: require("../../../../img/welfareTask/treasure_box4_c.png"),
          src3: require("../../../../img/welfareTask/treasure_box4_o.png")
        }
      ]
    };
  },
  mounted() {
    const today = new Date();
    const y = today.getFullYear();
    const m =
      today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1;
    const d = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    this.today = y + "-" + m + "-" + d;
    this.day = y + "年" + m + "月";
    this.getBaseData();
  },
  methods: {
    getBaseData() {
      this.$dialog.loading.open("正在加载中···");
      this.$ajax("request", {
        ac: "getUserSignedLog"
      }).then(res => {
        // box_info:"点击领取"
        // is_box:'1'
        // log:"2018-05-01"

        this.surplusDate = res.box_info.replace(/[^0-9]/gi, "");
        if (this.surplusDate == "") {
          this.surplusDate = 0;
          this.receive = "点击领取";
        } else {
          this.receive = "未达到领取资格";
        }
        if (res.log === "") {
          this.dayNum = 0;
        } else {
          const signInDate = res.log.split("+");
          signInDate.forEach(item => {
            if (item === this.today) {
              this.isSignInToday = true;
            }
            this.demoEvents.push({
              date: item.split("-").join("/"),
              title: ""
            });
          });
          this.dayNum = signInDate.length;
        }
        this.$dialog.loading.close();
      });
    },
    gettingInfo() {
      this.$dialog.loading.open("正在加载中···");
      this.$ajax("request", {
        ac: "UserSignAward"
      }).then(res => {
        // price:'12'
        // price_type: "现金红包"

        console.log(res);
        this.show = true;
        this.prizeMoney = res.price;
      });
      // this.show = true
      this.getBaseData();
    },
    signIn() {
      if (this.isSignInToday) {
        this.$dialog.alert({ mes: "您今天已经签到过了！" });
      } else {
        this.$dialog.loading.open("正在加载中···");
        this.$ajax("request", {
          ac: "gameUserSigned",
          client_type: 1
        }).then(() => {
          this.getBaseData();
          this.$dialog.loading.close();
        });
      }
    },
    refreshData() {
      this.getBaseData();
    },
    close() {
      this.show = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.signIn_main_body {
  .sign_in_title {
    background-color: #fff;
    height: poTorem(40px);
    @include around;
    border-bottom: poTorem(1px) solid #bbb;
    p {
      font-size: poTorem(13px);
      color: #434343;
      line-height: poTorem(27px);
      width: poTorem(100px);
      i {
        color: #009944;
      }
      &:last-child {
        width: poTorem(70px);
        background-color: $mainColor;
        border-radius: poTorem(3px);
        color: #fff;
        text-align: center;
      }
    }
  }
  .sing_in_prize {
    padding: 0 poTorem(20px);
    background-color: #fff;
    margin-top: 0.5rem;
    .title {
      font-size: poTorem(15px);
      color: #535353;
      line-height: poTorem(40px);
      border-bottom: poTorem(1px) solid #bbb;
      .link {
        float: right;
        color: rgb(0, 160, 233);
        position: relative;
        padding-right: 1rem;
        b {
          display: inline-block;
          width: poTorem(12px);
          height: poTorem(12px);
          background: url("../../../../img/welfareTask/right_blue.png");
          background-size: 100%;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
  .bottom {
    margin-top: 0.5rem;
    padding: 0.5rem 1.25rem;
    background-color: #fff;
    h5 {
      color: $mainColor;
      font-size: 1rem;
      line-height: 2rem;
    }
    p {
      font-size: 0.9rem;
      line-height: 1.5rem;
      margin-bottom: 0.5rem;
    }
  }
  .record_rows {
    @include between;
    height: poTorem(62.5px);
    // border-bottom: poTorem(1px) solid #eee;
    img {
      width: poTorem(15px);
      margin-right: poTorem(10px);
    }
    div {
      img {
        width: poTorem(45px);
        vertical-align: bottom;
      }
      .content {
        display: inline-block;
        p {
          &:first-child {
            font-size: poTorem(16px);
            color: #434343;
            span {
              color: rgb(183, 0, 0);
            }
          }
          &:last-child {
            font-size: poTorem(14px);
            color: #bbb;
          }
        }
      }
    }
  }
  .pop_win {
    .bg {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 100;
    }
    .cont {
      width: 70%;
      height: 18rem;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
      background: url("../../../../img/welfareTask/bgImg.png") no-repeat;
      background-size: 100%;
      padding-top: 7rem;
      img {
        width: 40%;
        margin: 0 auto;
        display: block;
      }
      p {
        line-height: poTorem(30px);
        text-align: center;
        font-size: poTorem(20px);
        color: #1b1b1b;
        margin-top: 0.5rem;
        i {
          color: #e33939;
          font-size: poTorem(30px);
        }
        &:first-child {
          margin-top: poTorem(20px);
        }
        &:nth-child(3) {
          color: #646464;
          margin-top: poTorem(20px);
        }
        button {
          width: poTorem(133px);
          height: poTorem(33px);
          border-radius: poTorem(5px);
          outline: none;
          margin-bottom: poTorem(20px);
          color: #e33939;
          border: poTorem(1px) solid #d2d2d2;
        }
      }
      b {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        position: absolute;
        left: 50%;
        bottom: -3rem;
        transform: translateX(-50%);
        background: url("../../../../img/welfareTask/close.png") no-repeat;
        background-size: 100%;
        z-index: 100;
      }
    }
  }
}
</style>


