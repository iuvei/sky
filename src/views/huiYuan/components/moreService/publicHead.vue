<template>
  <div class="personal_center_head">
    <div class="public_head">
      <div class="back_btn" @click="goBack">
        <img src="../../../../img/shouye/back.png" alt="">
      </div>
      <div :class="[type==3?'border_center':'', defaultClass]">
        <span v-show="type!=3" :class="{special: hasBorder}" @click="transport">{{title}}</span>
        <span v-for="(item, index) in titleData" :key="index" v-show="type==3" @click="isClick(index)" :class="{active:isActive==index}">{{item}}</span>
      </div>
      <div class="right_menu">
        <!-- type:0为刷新按钮 1为下拉箭头 3为带边框标题 4为签到记录 其他为无内容 -->
        <img src="../../../../img/personal_center/refresh.png" alt="" v-show="type==0" @click="refreshData" style="padding-right:1rem">
        <router-link to="/moreService/signInRecord" v-show="type==4">
          <img src="../../../../img/welfareTask/sign_in_record.png" alt="">
        </router-link>
        <router-link to="/moreService/drawingsRecord" v-show="type==6">
          <span style="font-size:1rem;color:#fff;font-weight:600;">提款记录</span>
        </router-link>
        <p v-show="type==1" @click="choosePeriod">
          {{timeText}}
          <img src="../../../../img/bet_record/today.png" alt="">
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["title", "type", "isShow", "timeText"],
  data() {
    return {
      styleType: 0,
      defaultClass: "center_content",
      titleData: ["个人信息", "等级头衔"],
      isActive: 0,
      hasBorder: false,
    };
  },
  methods: {
    goBack() {
      console.log(this.$router.currentRoute.fullPath);
      if (this.$router.currentRoute.fullPath == "/betting") {
        this.$router.push("/home");
      }  else {
        this.$router.back();
      }
    },
    choosePeriod() {
      this.$emit("chooseTimeShow");
    },
    isClick(i) {
      this.isActive = i;
      this.$emit("changeTab", i);
    },
    transport() {
      this.$emit("pullDown");
    },
    refreshData() {
      this.$emit("executeRefresh");
    },
  },
  created() {
    let titleArr = ["accountInfo", "drawingsRecord", "rechargeRecord","betRecords","agencyDeals","agencyBetting"];
    titleArr.forEach(item => {
      let isExist =
        this.$router.currentRoute.path.indexOf(item) == -1 ? false : true;
      if (isExist) this.hasBorder = true;
    });
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.personal_center_head {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: poTorem(48px);
  .public_head {
    width: 100%;
    height: poTorem(48px);
    // margin-top: poTorem(-48px);
    background: url(../../../../img/phone_header.png);
    @include between;
    .back_btn {
      width: poTorem(100px);
      padding-left: 1rem;
      img {
        height: poTorem(20px);
      }
    }
    .center_content {
      width: poTorem(181px);
      font-size: poTorem(18px);
      color: #fff;
      font-weight: 900;
      text-align: center;
      span {
        display: inline-block;
        line-height: poTorem(30px);
        height: poTorem(30px);
      }
      .special {
        width: poTorem(114px);
        border: 1px solid #fff;
        line-height: poTorem(28px);
        // padding: 0 poTorem(20px);
        border-radius: poTorem(3px);
        background: url(../../../../img/account/triangle.png) no-repeat
          poTorem(94px) poTorem(5px);
        background-size: poTorem(16px) poTorem(16px);
      }
    }
    .border_center {
      height: poTorem(32px);
      line-height: poTorem(30px);
      border: 1px solid #fff;
      border-radius: poTorem(3px);
      span {
        float: left;
        display: inline-block;
        height: 100%;
        width: 50%;
        text-align: center;
      }
      .active {
        background-color: #fff;
        color: #ff7c34;
      }
    }
    .right_menu {
      width: poTorem(100px);
      // width: poTorem(20px);
      // height: poTorem(20px);
      text-align: right;
      img {
        height: poTorem(25px);
      }
      p {
        font-size: 1rem;
        color: #fff;
        font-weight: 700;
        img {
          width: 1rem;
          height: 1rem;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>


