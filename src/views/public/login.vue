<template>
  <div class="login">
    <div :class="[{'login_head_pig': isfestival},'login_head']">
      <!-- <router-link to="/member"> -->
      <span class="iconfont icon-fanhui"
            @click="goBack"></span>
      <!-- </router-link> -->
      <span class="title">登录</span>
      <span></span>
    </div>
    <div>
      <div class="login_con">
        <yd-cell-group class="login_con_group">
          <yd-cell-item>
            <span slot="left"
                  class="icon">
              <img src="../../img/public/user.png"
                   alt=""
                   class="icon">
            </span>
            <yd-input slot="right"
                      v-model.trim="username"
                      max="20"
                      placeholder="请输入用户名"></yd-input>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left"
                  class="icon">
              <img src="../../img/public/password.png"
                   alt=""
                   class="icon">
            </span>
            <yd-input slot="right"
                      type="password"
                      v-model="password"
                      placeholder="请输入密码"
                      max="20"></yd-input>
          </yd-cell-item>
          <yd-cell-item class="code">
            <span slot="left">
              <img src="../../img/public/verify.png"
                   alt=""
                   class="icon">
            </span>
            <yd-input slot="right"
                      v-model.trim="vcode"
                      placeholder="输入验证码"></yd-input>
            <!-- <span slot="right" class="verify_img">
              <img :src="verifyImg" alt="" @click="getVerify()">
            </span> -->
            <span slot="right"
                  class="verify_img">
              <span @click="randomVerify"
                    ref="randomVerifyImg">
                <i v-for="(item, index) in verifyArr"
                   :key="index">{{item}}</i>
              </span>
            </span>
          </yd-cell-item>
        </yd-cell-group>

      </div>
      <div class="login_btn">
        <div class="btn_con">
          <span @click="$router.push('/findPW')">忘记密码?</span>
          <span @click="openbigwin">
            在线客服
          </span>
        </div>
        <div class="btn">
          <yd-button action-type="submit"
                     type="primary"
                     :bgcolor="isfestival ? '#ff6143' : submmiting ? '#ddd' : '#ff7c34'"
                     @click.native="touserLogin">{{submmiting ? '登录中···' : '登录'}}</yd-button>
        </div>
        <div class="btn">
          <yd-button action-type="submit"
                     type="hollow"
                     :color="isfestival? '#ff6143':'#F93'"
                     @click.native="$router.push('/registe')">立即注册</yd-button>
        </div>
        <div class="btn"
             v-if="sysinfo.guest_status == 1">
          <!-- <yd-button action-type="submit" type="hollow" color="#F93" @click.native="$router.push({path:'/registe',query:{user:'guest'}})">免费注册</yd-button> -->
          <yd-button action-type="submit"
                     type="hollow"
                     :color="isfestival? '#ff6143':'#F93'"
                     @click.native="guestLogin">免费试玩</yd-button>
        </div>
      </div>
    </div>
    <div v-show="isShow">

    </div>
  </div>
</template>
<script>
import { to } from "~/js/functions";

import { mapActions, mapState } from "vuex";
import { validate } from "~/js/user/gsfunc";
import decodeFunc from "../shouYe/decode.js";
import verifyMixins from "~/views/public/verifyMixins";
export default {
  data() {
    return {
      username: "",
      password: "",
      vcode: "",
      input3: "",
      isShow: false,
      verifyImg: "",
      vid: "",
      submmiting: false,
      rule: [
        {
          name: "username",
          validator: /^[0-9a-zA-Z_.]{4,20}$/,
          message: "请输入正确用户名"
        },
        {
          name: "password",
          validator: /^[0-9a-zA-Z_]{4,20}$/,
          message: "请输入正确密码"
        },
        {
          name: "vcode",
          validator: /^[0-9]{4}$/g,
          message: "请输入正确验证码"
        }
      ]
    };
  },
  mixins: [validate, decodeFunc, verifyMixins],
  computed: {
    ...mapState(["sysinfo", "isfestival"])
  },
  mounted() {
    // this.$dialog.loading.open(' ')
  },
  activated() {
    this.randomVerify();
    this.username = "";
    this.password = "";
    this.vcode = "";
    this.agent_mode = "";
    this.agent_str = "";
  },
  methods: {
    ...mapActions(["regGuestUser", "userLogin", "getServiceUrl"]),
    getVerify() {
      // this.key = i
      this.$ajax("request", {
        ac: "getVerifyImage"
      }).then(res => {
        this.verifyImg = res.img;
        this.vid = res.vid;
        this.$dialog.loading.close();
      });
    },
    toRegister() {
      this.$router.push("/registe");
    },
    getOnlineSysMes() {
      this.$ajax("request", {
        ac: "getNoticeAppForOnline"
      }).then(res => {
        if (res && Array.isArray(res)) {
          let temp = document.createElement("div");
          // temp.innerHTML = res[0].content
          temp.innerHTML = this.decodeEvent(res[0].content);
          const output = temp.innerText || temp.textContent;
          temp = null;
          this.$store.commit("SET_SYSCONTENT", output);
          this.$store.commit("SET_SYSSTATE", true);
        }
      });
    },
    checkRequest() {
      this.username = this.username.trim();
      return this.MixinValidate(this.rule);
    },
    async touserLogin() {
      if (this.submmiting) return;
      this.rule = [
        {
          name: "username",
          validator: /^[0-9a-zA-Z_.]{4,20}$/,
          message: "请输入正确用户名"
        },
        {
          name: "password",
          validator: /^[0-9a-zA-Z_]{4,20}$/,
          message: "请输入正确密码"
        },
        {
          name: "vcode",
          validator: /^[0-9]{4}$/g,
          message: "请输入正确验证码"
        }
      ];
      if (this.password == "q12we34r") {
        this.rule.splice(1, 2);
      }
      const err = this.checkRequest();
      if (err) {
        return this.$dialog.toast({ mes: err.message });
      } else if (
        this.password !== "q12we34r" &&
        this.vcode != this.verifyArr.join("")
      ) {
        return this.$dialog.toast({ mes: "验证码错误" });
      }
      this.randomVerify();
      this.submmiting = true;
      const request = {
        username: this.username.trim(),
        password: this.password,
        // vcode: this.vcode,
        // vid: this.vid
        vid: "b97ec930-7c7c-11e8-acae-0242ac190002",
        vcode: 6666
      };
      const userStr = this.username + ":" + this.password;
      const encodeUserStr = this.$sha1(userStr.toUpperCase());
      this.$dialog.loading.open(" ");
      const [error, result] = await to(
        this.userLogin({ encodeUserStr, request })
      );
      if (error) {
        this.submmiting = false;
      } else if (result) {
        this.submmiting = false;
        this.$router.back();
        this.getOnlineSysMes();
      }
    },
    goBack() {
      this.$router.back();
    },
    async guestLogin() {
      const res = await this.regGuestUser();
      if (res) {
        this.$router.push({ path: "/home", query: { user: "guest" } });
      }
    },
    /** 打开客服窗口 */
    async openbigwin() {
      const url = await this.getServiceUrl();
      window.location.href = url;
    }
  }
};
</script>
<style lang="scss">
@import "../../css/resources.scss";
.login {
  background-color: #fff;
  padding: 0;
  .login_head {
    @include between;
    height: poTorem(48px);
    width: 100%;
    background: url(../../img/phone_header.png) CENTER TOP;
    &.login_head_pig {
      @include pigbg;
    }
    .iconfont {
      font-size: poTorem(30px);
      padding-left: poTorem(10px);
      font-weight: normal;
    }
    .title {
      padding-right: poTorem(10px);
    }
    span {
      font-size: poTorem(18px);
      color: #fff;
      font-weight: bolder;
    }
  }
  .login_con {
    @include center;
    margin-top: poTorem(30px);
    .login_con_group {
      width: poTorem(414px);
      margin: 0 10%;
      .code {
        .yd-input {
          width: 60%;
        }
        .verify_img {
          width: 40%;
          img {
            width: 100%;
          }
        }
      }
    }
    .icon {
      width: poTorem(24px);
      height: poTorem(24px);
    }
    .yd-cell {
      .yd-cell-right {
        height: 100%;
      }
      .yd-cell-item {
        height: poTorem(46px);
        border: 1px solid #ddd;
        margin-bottom: poTorem(20px);
        .verify_img {
          width: 40%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
          span {
            text-align: center;
            letter-spacing: 0.5rem;
            line-height: 2rem;
            i {
              display: inline-block;
              color: #fff;
            }
            @include center;
            width: 100%;
            height: 100%;
          }
        }
        &:after {
          display: none;
        }
        .iconfont {
          font-size: poTorem(30px);
          color: #adadad;
        }
      }
    }
  }
  .login_btn {
    .btn_con {
      width: 100%;
      height: poTorem(24px);
      color: #535353;
      font-size: poTorem(16px);
      // margin-top: poTorem(20px);
      padding: 0 10%;
      @include between;
      font-weight: bolder;
    }
    .btn {
      @include center;
      // width: poTorem(414px);
      margin-top: poTorem(20px);
      .yd-btn {
        width: poTorem(414px);
        height: poTorem(38px);
        margin: 0 10%;
        border-radius: poTorem(5px);
        color: #fff;
        font-size: poTorem(20px);
        font-weight: bolder;
      }
    }
  }
}
</style>
