<template>
  <div class="huiyuan_center">
    <!-- 头部 -->
    <heads></heads>
    <div class="other-block">
      <!-- 背景图片 -->
      <div :class="[{'background_pig': isfestival},'background']">
        <img src="../../img/personal_center/service_center.png"
             alt=""
             class="customer_service"
             @click="openbigwin">
        <div v-show="!isLogin"
             style="width:100%;display: inline-block;">
          <div class="no_login">
            <div class="pull_center">
              <img src="../../img/head_icon.png"
                   alt="">
            </div>
            <div class="Please-log">
              <span @click="$router.push('login')">登录</span>
              <span>|</span>
              <span @click="$router.push('registe')">注册</span>
            </div>
          </div>
        </div>
        <!-- 已登录状态 -->
        <div v-if="isLogin">
          <div :class="[{'username_pig':isfestival},'username']"
               @click="toPersonalInfo">
            <img :src="head_icon"
                 alt="">
            <div>
              <p style="padding-bottom: 0.625rem">
                <span style="vertical-align:-webkit-baseline-middle">{{username}}</span>
              </p>
            </div>
          </div>
          <div :class="[{'user_money_change_pig': isfestival},'user_money_change']">
            <div>
              <p>{{user_price}}</p>
              <p>
                <span>余额</span>
                <img src="../../img/personal_center/refresh.png"
                     alt=""
                     @click="refreshBalance">
              </p>
            </div>
            <div>
              <p>{{last_get_price}}</p>
              <p>最近提款金额</p>

            </div>
            <div>
              <router-link to="/moreService/signIn"
                           class="sign_in">
                <p><img src="../../img/personal_center/sign_in.png"
                       alt=""></p>
                <p>签到</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <!-- 充值&提款 -->
      <theWallet></theWallet>
      <!-- 多元化服务 -->
      <multivariate></multivariate>
      <!-- <moreFunc></moreFunc> -->
    </div>

  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import heads from "./components/heads";
import theWallet from "./components/theWallet";
import multivariate from "./components/multivariate";
import moreFunc from "./components/moreFunc";
export default {
  name: "member",
  data() {
    return {
      show: false
    };
  },
  mounted() {},
  methods: {
    ...mapActions(["flushPrice", "getServiceUrl"]),
    async openbigwin() {
      const url = await this.getServiceUrl();
      window.location.href = url;
    },
    path() {
      this.$router.push("/moreService/downloadApp");
    },
    toPersonalInfo() {
      this.$router.push("/moreService/personalInfo");
    },
    async refreshBalance() {
      const expireTime = new Date().getTime() - localStorage.getItem("refresh");
      if (expireTime > 5000) {
        localStorage.setItem("refresh", new Date().getTime());
        this.$dialog.loading.open("正在刷新");
        const res = await this.flushPrice({ click: 1 });
        if (res) {
          this.$dialog.loading.open("刷新成功");
        }
        setTimeout(() => {
          this.$dialog.loading.close();
        }, 500);
      } else {
        this.$dialog.loading.open("刷新成功");
        setTimeout(() => {
          this.$dialog.loading.close();
        }, 500);
      }
    }
  },
  components: {
    heads,
    theWallet,
    multivariate,
    moreFunc
  },
  computed: {
    ...mapState({
      isLogin: state => state.userinfo.isLogin,
      username: store => store.userinfo.accountInfo.username,
      user_price: store => store.userinfo.accountInfo.price,
      last_get_price: store => store.userinfo.accountInfo.last_get_price,
      sysinfo: store => store.sysinfo
      // head_icon: store => store.userinfo.accountInfo.head_icon,
    }),
    ...mapState(['isfestival']),
    head_icon() {
      const iconUrl = this.$store.state.userinfo.accountInfo.head_icon;
      if (iconUrl !== "") {
        return iconUrl;
      } else {
        const defaultIcon = require("../../img/head_icon.png");
        return defaultIcon;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../css/resources.scss";
// @function poTorem($px) {
//   @return $px / 16px * 1rem;
// }
.huiyuan_center {
  overflow: hidden;
  background-color: #f3f3f3;
  .background {
    background-color: $mainColor;
    position: relative;
    &.background_pig {
      background-color: $festivalColor;
    }
    .customer_service {
      position: absolute;
      top: poTorem(10px);
      right: poTorem(20px);
      height: poTorem(25px);
    }
    div {
      .no_login {
        .pull_center {
          text-align: center;
          padding-top: poTorem(20px);
          img {
            width: poTorem(64px);
            height: poTorem(64px);
          }
        }
      }
      .Please-log {
        width: 100%;
        height: poTorem(50px) !important;
        z-index: 800;
        font-size: poTorem(28px);
        font-weight: 900;
        color: #fff;
        line-height: poTorem(50px);
        span {
          display: inline-block;
          width: 47%;
          &:first-child {
            text-align: right;
            padding-right: 0.5rem;
          }
          &:nth-child(2) {
            width: 1%;
            font-size: 1.5rem;
          }
          &:last-child {
            text-align: left;
            padding-left: 0.5rem;
          }
        }
      }
    }
    .username {
      width: 100%;
      height: poTorem(80px);
      overflow: hidden;
      background-color: $mainColor;
      &.username_pig {
        background-color: #ff6143;
      }
      img {
        border-radius: 50%;
        width: poTorem(58px);
        height: poTorem(58px);
        margin: poTorem(10px) poTorem(20px) 0;
        float: left;
      }
      div {
        padding-top: poTorem(10px);
        width: poTorem(310px);
        line-height: poTorem(20px);
        font-size: poTorem(15px);
        color: #fff;
        font-weight: 700;
        float: left;
        .vip_degree {
          color: #ffea00;
          display: inline-block;
          img {
            width: poTorem(20px);
            height: poTorem(20px);
            margin: 0;
            margin-right: poTorem(5px);
            padding: 0;
            border: none;
          }
        }
      }
    }
    .user_money_change {
      display: flex;
      justify-content: space-around;
      align-content: end;
      padding: poTorem(10px);
      background: #f9752d;
      &.user_money_change_pig {
        background: #f96143;
      }
      div {
        width: 33%;
        .sign_in {
          text-align: center;
          width: 100%;
        }
        p {
          &:first-child {
            font-size: poTorem(15px);
            color: #ffea00;
            img {
              width: poTorem(17.5px);
              height: poTorem(18.5px);
            }
          }
          &:nth-child(2) {
            font-size: poTorem(15px);
            color: #fff;
          }
        }
        &:first-child {
          p {
            span {
              margin-right: poTorem(40px);
            }
            img {
              width: poTorem(21px);
              height: poTorem(23px);
              vertical-align: middle;
            }
          }
        }
        &:nth-child(2) {
          padding-left: poTorem(10px);
          border-left: 1px solid #fff;
          border-right: 1px solid #fff;
        }
      }
    }
  }
  .icon_app {
    p {
      width: poTorem(65px);
      height: poTorem(70px);
      color: $mainColor;
      font-size: poTorem(10px);
      line-height: poTorem(110px);
      text-align: center;
      position: fixed;
      top: poTorem(50px);
      left: poTorem(338px);
      background: url(../../img/personal_center/cellphone.png) no-repeat
          poTorem(22px) poTorem(20px),
        url(../../img/personal_center/drop.png) no-repeat;
      background-size: poTorem(20px) poTorem(21px), poTorem(68px) poTorem(74px);
    }
  }
  .main_menu {
    width: 100%;
    height: poTorem(65px);
    > div {
      width: 25%;
    }
  }
}
</style>

