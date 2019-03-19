<template>
  <div class="cashTransaction_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <div class="step_one"
         v-show="stepOne">
      <input type="text"
             placeholder="请输入对方账户"
             v-model="userName">
      <p class="intro">钱将实时转入对方账户，无法退款</p>
      <p class="next_step">
        <button @click="toTwo">下一步</button>
      </p>
    </div>
    <div class="step_two"
         v-show="stepTwo">
      <div class="account_info">
        <img :src="headSrc"
             alt="">
        <p>{{realName}}</p>
        <p>{{userName}}</p>
      </div>
      <div class="transfer_info">
        <p>转账金额</p>
        <p>
          <span>¥</span>
          <input type="text"
                 v-model="price">
        </p>
        <p>
          <input type="text"
                 placeholder="请输入对方真实姓名"
                 v-model="name">
        </p>
        <p>
          <input type="password"
                 placeholder="请输入交易密码"
                 v-model="tk_pass">
        </p>
        <p style="background-color:transparent;line-height:2rem;">交易密码输错5次，将冻结您的账号</p>
        <p class="next_step">
          <button @click="toThree">确认转账</button>
        </p>
      </div>
    </div>
    <div class="step_three"
         v-show="stepThree">
      <img src="../../../../img/personal_center/success.png"
           alt="">
      <p class="success_word">转账成功</p>
      <div class="transfer_info">
        <p>转入账号：{{userName}}</p>
        <p>转账金额： <i>{{price}}</i>元 </p>
        <p>转账时间：{{time}}</p>
      </div>
      <p class="next_step">
        <button @click="backToOne">返回并继续转账</button>
      </p>
    </div>
  </div>
</template>
<script>
import publicHead from "./publicHead";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "现金交易",
      stepOne: true,
      stepTwo: false,
      stepThree: false,
      userName: "",
      headSrc: "",
      realName: "",
      tk_pass: "",
      name: "",
      price: "",
      time: "",
      default_head: require("../../../../img/head_icon.png")
    };
  },
  activated() {
    this.userName = "";
    this.stepThree = false;
    this.stepOne = true;
    this.name = "";
    this.tk_pass = "";
    this.price = "";
  },
  methods: {
    toTwo() {
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "TradGetUserInfo",
        username: this.userName
      }).then(res => {
        console.log(res);
        if (res == 0) {
          this.$dialog.alert({ mes: "请输入正确的用户账号" });
        } else {
          this.realName = res.real_name;
          this.headSrc = res.head_icon ? res.head_icon : this.default_head;
          this.stepOne = false;
          this.stepTwo = true;
        }
        this.$dialog.loading.close();
      });
    },
    toThree() {
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "sendMoneyToChild",
        username: this.userName,
        realname: this.name,
        tk_pass: this.tk_pass,
        price: this.price
      }).then(res => {
        console.log(res);
        if (res == 0) {
          this.$dialog.alert({ mes: "请输入正确的用户账号" });
        } else {
          this.time = res.time;
          this.stepTwo = false;
          this.stepThree = true;
        }
        this.$dialog.loading.close();
      });
    },
    backToOne() {
      this.userName = "";
      this.stepThree = false;
      this.stepOne = true;
      this.name = "";
      this.tk_pass = "";
      this.price = "";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.cashTransaction_main_body {
  .step_one {
    width: 100%;
    height: poTorem(688px);
    background-color: #eee;
    position: absolute;
    top: poTorem(48px);
    input {
      background-color: #fff;
      width: 100%;
      height: poTorem(54px);
      font-size: poTorem(17px);
      line-height: poTorem(54px);
      color: #707070;
      margin-top: poTorem(20px);
      text-indent: 1rem;
    }
    .intro {
      font-size: poTorem(15px);
      color: #aaa;
      padding-left: poTorem(20px);
      line-height: poTorem(48px);
    }
    .next_step {
      margin-top: poTorem(60px);
      text-align: center;
      button {
        width: poTorem(300px);
        height: poTorem(40px);
        font-size: poTorem(18px);
        line-height: poTorem(16px);
        color: #fff;
        background-color: $mainColor;
        border-radius: poTorem(5px);
        outline: none;
        border: none;
      }
    }
  }
  .step_two {
    height: poTorem(688px);
    background-color: #eee;
    .account_info {
      padding: poTorem(20px);
      text-align: center;
      img {
        width: poTorem(60px);
        height: poTorem(60px);
      }
      p {
        &:nth-child(2) {
          font-size: poTorem(18px);
          color: #535353;
        }
        &:last-child {
          font-size: poTorem(15px);
          color: #959595;
        }
      }
    }
    .transfer_info {
      p {
        padding-left: poTorem(20px);
        background-color: #fff;
        color: #707070;
        &:first-child {
          font-size: poTorem(14px);
          line-height: poTorem(28px);
          border-bottom: poTorem(1px) solid #eee;
        }
        &:nth-child(2) {
          font-size: poTorem(25px);
          padding: poTorem(10px) poTorem(40px);
          margin-bottom: poTorem(20px);
          input {
            border: none;
          }
        }
        &:nth-child(3),
        &:nth-child(4) {
          font-size: poTorem(17px);
          line-height: poTorem(60px);
          input {
            border: none;
          }
        }
        &:nth-child(3) {
          border-bottom: poTorem(1px) solid #eee;
        }
      }
      .next_step {
        margin-top: poTorem(60px);
        text-align: center;
        background-color: transparent;
        button {
          width: poTorem(300px);
          height: poTorem(40px);
          font-size: poTorem(18px);
          line-height: poTorem(16px);
          color: #fff;
          background-color: $mainColor;
          border-radius: poTorem(5px);
          outline: none;
          border: none;
        }
      }
    }
  }
  .step_three {
    @include column;
    padding-top: poTorem(60px);
    img {
      width: poTorem(67px);
    }
    .success_word {
      font-size: poTorem(18px);
      color: #626262;
      line-height: poTorem(40px);
    }
    .transfer_info {
      width: poTorem(300px);
      height: poTorem(150px);
      text-align: center;
      background-color: #fff;
      p {
        font-size: poTorem(15px);
        color: #626262;
        line-height: poTorem(50px);
        i {
          color: #f13131;
        }
      }
    }
    .next_step {
      margin-top: poTorem(60px);
      text-align: center;
      button {
        width: poTorem(300px);
        height: poTorem(40px);
        font-size: poTorem(18px);
        line-height: poTorem(16px);
        color: #fff;
        background-color: $mainColor;
        border-radius: poTorem(5px);
        outline: none;
        border: none;
      }
    }
  }
}
</style>


