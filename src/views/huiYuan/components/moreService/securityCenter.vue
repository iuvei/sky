<template>
  <div class="securityCenter_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <div class="main_body">
      <span></span>
      <yd-grids-group :rows="3"
                      class="func_part">
        <yd-grids-item v-for="(item, index) in gridsData"
                       :key="index">
          <router-link :to="item.path"
                       class="pieces_content"
                       slot="else">
            <i :class="{'flag-mark':userFlag[item.class]}"></i>
            <img :src="item.src"
                 alt="">
            <div class="word">
              <p>{{item.text1}}</p>
              <!-- <p>{{item.text2}}</p> -->
            </div>
          </router-link>
        </yd-grids-item>
      </yd-grids-group>
      <div class="default_bank">
        <p>默认提现银行卡</p>
        <div :class="[{'bank_card' : hasDefault}, 'bg_wall']"
             @click="$router.push('/moreService/bankcardManage')">
          <img :src="defaultSrc"
               alt="">
          <img class="default_mark"
               src="../../../../img/security_center/default_mark.png"
               alt=""
               v-show="hasDefault">
          <div v-show="elseIsShow"
               class="else_bank">
            <p>{{bankName}}</p>
            <p>储蓄卡</p>
          </div>
          <p>{{cardNum}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import publicHead from "./publicHead";
import { mapState } from "vuex";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "安全中心",
      hasDefault: false,
      defaultSrc: require("../../../../img/security_center/plus.png"),
      gridsData: [
        {
          text1: "设置交易密码",
          text2: "立即修改",
          path: "/moreService/correctDealPW",
          src: require("../../../../img/security_center/correct_deal_pw.png"),
          class: "jymm"
        },
        {
          text1: "修改登录密码",
          text2: "立即修改",
          path: "/moreService/correctLoginPW",
          src: require("../../../../img/security_center/correct_login_pw.png")
        },
        {
          text1: "绑定银行卡",
          text2: "立即绑定",
          text3: "已绑定",
          path: "/moreService/bankcardManage",
          src: require("../../../../img/security_center/binding_bankcard.png"),
          class: "yhk"
        },
        {
          text1: "设置真实姓名",
          text2: "立即修改",
          path: "/moreService/correctRealName",
          src: require("../../../../img/security_center/correct_real_name.png"),
          class: "zsxm"
        },
        {
          text1: "设置密保问题",
          text2: "立即设置",
          text3: "已设置",
          path: "/moreService/correctQuestion",
          src: require("../../../../img/security_center/set_question.png"),
          class: "mbwt"
        },
        {
          text1: "绑定邮箱",
          text2: "立即绑定",
          text3: "已绑定",
          path: "/moreService/bindingEmail",
          src: require("../../../../img/security_center/binding_email.png"),
          class: "yx"
        },
        {
          text1: "绑定手机",
          text2: "立即绑定",
          text3: "已绑定",
          path: "/moreService/bindingCellphone",
          src: require("../../../../img/security_center/binding_cellphone.png"),
          class: "sj"
        },
        {
          text1: "绑定微信",
          text2: "立即绑定",
          text3: "已绑定",
          path: "/moreService/bindingWechat",
          src: require("../../../../img/security_center/binding_wetchat.png"),
          class: "wx"
        },
        {
          text1: "绑定QQ",
          text2: "立即绑定",
          text3: "已绑定",
          path: "/moreService/bindingQQ",
          src: require("../../../../img/security_center/binding_QQ.png"),
          class: "qq"
        }
      ],
      cardNum: 0,
      bankName: "",
      elseIsShow: false
    };
  },
  activated() {
    this.elseIsShow = false;
    // console.log(this.$store.state.userinfo.accountInfo)
    if (this.$store.state.userinfo.accountInfo.tkpass_ok != 0) {
      this.gridsData[0].text1 = "修改交易密码";
    }
    if (this.$store.state.userinfo.accountInfo.real_name !== "") {
      this.gridsData[3].text1 = "修改真实姓名";
    }
    if (this.$store.state.userinfo.accountInfo.question_1 !== "0") {
      this.gridsData[4].text1 = "修改密保问题";
    }
    if (this.$store.state.userinfo.accountInfo.phone !== "") {
      this.gridsData[6].text1 = "修改手机";
    }
    if (this.$store.state.userinfo.accountInfo.qq !== "") {
      this.gridsData[8].text1 = "修改QQ";
    }
    if (this.$store.state.userinfo.accountInfo.email !== "") {
      this.gridsData[5].text1 = "修改邮箱";
    }
    if (this.$store.state.userinfo.accountInfo.wechat !== "") {
      this.gridsData[7].text1 = "修改微信";
    }
    // this.$store.state.userinfo.accountInfo.question_1
    this.getData();
  },
  computed: {
    ...mapState(["userFlag"])
  },
  methods: {
    getData() {
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "getUserBankCard"
      }).then(res => {
        if (res && res.length) {
          res.forEach(item => {
            if (item.is_default == 1) {
              this.defaultSrc = `/assets/recharge/bank_bg/${
                item.bank_type
              }.png`;
              this.hasDefault = true;
              this.cardNum =
                item.card_num.substr(0, 4) +
                " **** **** " +
                item.card_num.substr(-4);
              if (item.bank_type === -1) {
                this.elseIsShow = true;
                this.bankName = item.bank_typename;
              }
            }
          });
        } else {
          this.defaultSrc = require("../../../../img/security_center/plus.png");
          this.hasDefault = false;
          this.cardNum = "";
        }

        this.$dialog.loading.close();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.securityCenter_main_body {
  .main_body {
    height: poTorem(688px);
    background-color: #eee;
    span {
      width: 100%;
      display: inline-block;
      margin-top: poTorem(20px);
    }
    .func_part {
      .pieces_content {
        @include column;
        height: poTorem(100px);
        padding: poTorem(20px) 0;
        position: relative;
        img {
          width: poTorem(25px);
          height: poTorem(25px);
        }
        .word {
          p {
            line-height: poTorem(27px);
            font-size: poTorem(17px);
            color: #414141;
          }
        }
        .flag-mark {
          position: absolute;
          right: poTorem(48px);
          top: poTorem(15px);
          display: inline-block;
          height: poTorem(6px);
          width: poTorem(6px);
          background-color: rgb(224, 27, 57);
          border: poTorem(5px) solid rgb(224, 27, 57);
          border-radius: poTorem(6px);
        }
      }
    }
    .default_bank {
      margin-top: poTorem(20px);
      padding: poTorem(20px);
      background-color: #fff;
      > p {
        font-size: poTorem(15px);
        color: #4d4d4c;
        text-align: center;
        margin-bottom: poTorem(20px);
      }
      .bg_wall {
        position: relative;
        height: poTorem(94px);
        border: poTorem(1px) dashed #707070;
        border-radius: poTorem(10px);
        background-color: #fff;
        margin-bottom: poTorem(49px);
        @include center;
        // background: #fff url(~img/security_center/plus.png) no-repeat center;
        // background-size: poTorem(30px) poTorem(30px);
        > img {
          width: poTorem(30px);
        }
        > p {
          position: absolute;
          right: poTorem(20px);
          top: poTorem(40px);
          font-size: poTorem(18px);
          color: #fff;
        }
      }
      .bank_card {
        position: relative;
        background: transparent
          url("../../../../img/security_center/default_mark.png") no-repeat
          right top;
        background-size: poTorem(30px) poTorem(30px);
        > img {
          &:first-child {
            width: 100%;
            height: 100%;
          }
          &:nth-child(2) {
            position: absolute;
            top: 0;
            right: 0;
            width: poTorem(40px);
            height: poTorem(40px);
          }
        }
        .else_bank {
          background: url("~img/security_center/else_bank.png") no-repeat left
            top;
          background-size: 1.5rem 1.5rem;
          width: 6rem;
          height: 3rem;
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding-left: 2rem;
          p {
            &:first-child {
              font-size: 1rem;
              color: #fff;
            }
            &:last-child {
              color: #ddd;
              font-size: 0.75rem;
            }
          }
        }
      }
    }
  }
}
</style>


