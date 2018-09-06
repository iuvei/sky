<template>
  <div class="demo">
    <div class="demo_head">
      <router-link to="/home">
        <span class="iconfont icon-fanhui"></span>
      </router-link>
      <span>免费试玩</span>
      <span></span>
    </div>
    <div class="demo_input">
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">用户帐号</span>
          <yd-input disabled slot="right" required v-model="input1" max="20" :placeholder="input1"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">登录密码</span>
          <yd-input slot="right" type="password" v-model="input2" placeholder="请输入密码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">重复密码</span>
          <yd-input slot="right" type="password" v-model="input3" placeholder="再次请输入密码"></yd-input>
        </yd-cell-item>
        <yd-cell-item class="code">
          <span slot="left">验证码</span>
          <yd-input slot="right" v-model="input4" demoex="^\d{5,12}$" placeholder="输入验证码"></yd-input>
          <span slot="right">
            <img :src="verifyImg" alt="" @click="getVerify(randomNum())">
          </span>
        </yd-cell-item>
        <yd-cell-item class="protocol">
          <yd-checkbox slot="left" v-model="checkbox1" shape="circle">
            注册及表示同意
          </yd-checkbox>
          <router-link to="/agreement" slot="left">
            <span :style="{color:'#Ff3333'}">《好彩服务使用协议》</span>
          </router-link>
        </yd-cell-item>
      </yd-cell-group>
    </div>
    <div class="demo_con">
      <div class="demo_btn">
        <div @click="submitData">
          注册试玩
        </div>
      </div>
      <div class="con_two">
        <span>
          1、每个IP每天仅允许有3个试玩账号；
        </span>
        <span>
          2、每个试玩账号从注册开始， 有效时间为72个小时， 超过时间系统自动回收；
        </span>
        <span>
          3、试玩账号仅供玩家熟悉游戏， 不允许充值和提款；
        </span>
        <span>
          4、试玩账号不享有参加优惠活动的权利；
        </span>
        <span>
          5、试玩账号的赔率仅供参考，可能与正式账号赔率不相符；
        </span>
        <span>
          6、其他未说明事项以本公司解释为准。
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { demo_get } from "../../../../../api/user";
export default {
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      checkbox1: true,
      username: "",
      verifyImg: "",
    };
  },
  mounted() {
    this.getData();
    this.getVerify(this.randomNum());
  },
  methods: {
    getData() {
      this.$dialog.loading.open("正在加载中···");
      this.$ajax("request", {
        ac: "regGuestUser",
        client_type: 1,
        edition: "v1.0.0", //后台规定的版本号，后面需要做成可配置的
      }).then(res => {
        // console.log(res);
        this.input1 = res.username;
        // this.username = res;
        this.$dialog.loading.close();
      });
    },
    getVerify(i) {
      this.$ajax("request", {
        ac: "getVerifyImage"
      }).then(res => {
        this.verifyImg = res.img;
        this.key = res.vid;
        this.$dialog.loading.close();
      });
    },
    randomNum() {
      return Math.floor(Math.random() * 10000) + "";
    },
    submitData() {
      if (this.input2 != this.input3) {
        this.$dialog.alert({ mes: "两次密码不一致" });
      } else {
        this.$ajax("request", {
          ac: "guestReg",
          username: this.input1,
          password: this.input2,
          client_type: 1,
          vcode: this.input4,
          vid: 2,
        }).then(res => {
          this.$router.push("/home");
          this.$store.commit("GET_USERINFO", {
            accountInfo: res,
            isLogin: true,
          });
          this.$dialog.alert({ mes: "注册试玩账号成功" });
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.demo {
  padding: 0;
  .demo_input {
    margin: poTorem(30px);
    border: 1px solid #f3f3f3;
    span {
      font-size: poTorem(12px);
      color: #000000;
    }
    .code {
      position: relative;
      .pic_vcode {
        width: 70px;
        height: 32px;
        display: inline-block;
        position: absolute;
        background-size: cover;
        // background-image: url("http://m.0567aa.com//index.php/api/request/ac/getVerify/id/1/r/0.04085656332873011");
      }
    }
  }
  .demo_head {
    @include between;
    height: poTorem(48px);
    width: 100%;
    background: url(../../../../img/phone_header.png) CENTER TOP;
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
      padding-right: poTorem(30px);
    }
  }
  .demo_con {
    padding: 0 30px;
    .demo_btn {
      div {
        background: #f93;
        width: poTorem(311px);
        text-align: center;
        margin: 0 auto;
        margin-top: poTorem(10px);
        height: poTorem(36px);
        line-height: poTorem(36px);
        border-radius: poTorem(5px);
        color: #fff;
        font-size: poTorem(16px);
        font-weight: bold;
      }
    }
    .con_one {
      display: flex;
      @include between;
      margin: poTorem(15px) 0;
      span {
        font-size: poTorem(16px);
        font-weight: bold;
        color: #adadad;
      }
    }
    .con_two {
      display: flex;
      flex-direction: column;
      span {
        font-size: 14px;
        color: #ff3333;
        line-height: 32px;
        font-weight: 500;
      }
    }
  }
}
</style>
