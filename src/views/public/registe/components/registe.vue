<template>
  <div class="registe">
    <div class="registe_head">
      <div @click="$router.back()">
        <span class="iconfont icon-fanhui"></span>
      </div>
      <span>快速注册</span>
      <span></span>
    </div>
    <div class="reg_input">
      <yd-cell-group>
        <yd-cell-item v-show="!sysinfo.bind_param">
          <span slot="left">邀请码</span>
          <yd-input slot="right" v-model="input5" placeholder="请输入邀请码" max="10" min="4"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">用户帐号</span>
          <yd-input slot="right" required v-model.trim="input1" max="20" placeholder="请输入用户名"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">登录密码</span>
          <yd-input slot="right" type="password" v-model="input2" max="20" min="6" placeholder="请输入密码"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">重复密码</span>
          <yd-input slot="right" type="password" v-model="input3" placeholder="再次请输入密码" max="20"></yd-input>
        </yd-cell-item>
        <yd-cell-item class="code">
          <span slot="left">验证码</span>
          <yd-input slot="right" v-model.trim="input4" placeholder="输入验证码"></yd-input>
          <!-- <span slot="right" class="verify_img">
            <img :src="verifyImg" alt="" @click="getVerify(randomNum())">
          </span> -->
          <span slot="right" class="verify_img">
            <span @click="randomVerify" ref="randomVerifyImg">
              <i v-for="(item, index) in verifyArr" :key="index">{{item}}</i>
            </span>
          </span>
        </yd-cell-item>

        <yd-cell-item id="protocol">
          <yd-checkbox slot="left" v-model="checkbox1" color="#fff" class="checkbok">
            注册即表示同意
          </yd-checkbox>
          <router-link to="/agreement" slot="right">
            <span :style="{color:'#009ee7'}">《{{sysinfo.web_title}}服务使用协议》</span>
          </router-link>
        </yd-cell-item>
      </yd-cell-group>
    </div>
    <div class="reg_con">
      <div class="reg_btn">
        <div @click="submitData" :class="{'submmiting' : submmiting}">
          {{submmiting ? '注册中···' : '立即注册'}}
        </div>
      </div>
      <div class="con_one">
        <!-- <router-link to="/"> -->
        <span @click="openbigwin(sysinfo.service_url)">在线客服</span>
        <!-- </router-link> -->
        <div @click="toLogin" class="to_login">
          <span>已有帐号？直接登录</span>
        </div>
      </div>
      <div class="con_two">
        <span>
          1、用户帐号请输入5-20个英文字母或数字或下划线，不能用中文。
        </span>
        <span>
          2、登录密码请输入6-20个英文字母或数字或下划线
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { to } from '~/js/functions'
import { mapActions, mapState } from 'vuex'
import { validate } from '~/js/user/gsfunc'
import verifyMixins from '~/views/public/verifyMixins'
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input4: '',
      input5: '',
      checkbox1: true,
      input3: '',
      verifyImg: '',
      key: '',
      submmiting: false
    }
  },
  computed: {
    ...mapState({
      sysinfo: state => state.sysinfo
    })
  },
  mounted() {
    // this.$dialog.loading.open('正在加载中···')
  },
  activated() {
    // this.getVerify()
    this.randomVerify()
    this.input1 = ''
    this.input2 = ''
    this.input3 = ''
    this.input4 = ''
    this.input5 = ''

    // 获取邀请码
    const vipCode =
      this.$route.params.vip || window.localStorage.getItem('VipCode') || ''
    if (vipCode) {
      this.input5 = vipCode
    }
  },
  methods: {
    toLogin() {
      this.$router.replace('/login')
    },
    ...mapActions(['regGuestUser', 'regUser']),
    /**打开客服窗口 */
    openbigwin(url) {
      window.location.href = url
    },
    getVerify(i) {
      // this.key = i
      this.$ajax('request', {
        ac: 'getVerifyImage'
      }).then(res => {
        this.verifyImg = res.img
        this.key = res.vid
        this.$dialog.loading.close()
      })
    },
    // /******** 随机验证码 *********/
    // randomNum(a, b) {
    //   return Math.floor(Math.random() * (b - a) + a)
    // },
    // randomVerify() {
    //   console.log(this.$refs.randomVerifyImg.children.item(0))
    //   let num = ''
    //   for(let i = 0; i < 4; i++) {
    //     num += this.randomNum(0, 10)
    //   }
    //   this.verifyArr = num.split('')
    //   this.$refs.randomVerifyImg.style.backgroundColor = `rgb(${this.randomNum(0, 255)},${this.randomNum(0, 255)},${this.randomNum(0, 255)})`
    //   this.$nextTick(() => {
    //     for(let i = 0; i < 4; i++) {
    //       this.$refs.randomVerifyImg.children.item(i).style.transform = `rotate(${this.randomNum(-80, 80)}deg)`
    //       this.$refs.randomVerifyImg.children.item(i).style.fontSize = `${this.randomNum(10, 25) / 10}rem`
    //     }
    //   })
    // },
    checkRequest() {
      this.input1 = this.input1.trim()
      let rule = [
        {
          name: 'input1',
          validator: /^[0-9a-zA-Z_]{5,20}$/,
          message: '请输入正确用户名'
        },
        {
          name: 'input2',
          validator: /^[0-9a-zA-Z_]{6,20}$/,
          message: '请输入正确密码'
        },
        {
          name: 'input4',
          validator: /^[0-9]{4}$/,
          message: '请输入正确验证码'
        }
      ]
      if (this.sysinfo.bind_param) {
        rule.shift()
      }
      return this.MixinValidate(rule)
    },
    async submitData() {
      if (this.submmiting) return
      let err = this.checkRequest()
      if (err) {
        return this.$dialog.toast({ mes: err.message })
      } else if (this.input4 != this.verifyArr.join('')) {
        return this.$dialog.toast({ mes: '验证码错误!' })
      } else if (this.input3 !== this.input2) {
        return this.$dialog.toast({ mes: '两次密码不一致！' })
      } else if (!this.checkbox1) {
        return this.$dialog.toast({ mes: '请同意使用协议' })
      }
      this.submmiting = true
      this.$dialog.loading.open(' ')
      let [error, result] = await to(
        this.regUser({
          username: this.input1,
          password: this.input2,
          tg_code: this.input5 || this.sysinfo.bind_param,
          enom: location.host,
          // vcode: this.input4,
          // vid: this.key
          vid: 'b97ec930-7c7c-11e8-acae-0242ac190002',
          vcode: 6666
        })
      )
      if (result) {
        this.submmiting = false
        this.$emit('listenVal', 2)
      } else if (error) {
        this.submmiting = false
        // this.getVerify()
      }
      // this.$ajax("request", {
      //   ac: "regUser",
      //   username: this.input1,
      //   password: this.input2,
      //   tg_code: this.input5,
      //   vcode: this.input4,
      //   vid: this.key,
      // }).then(res => {
      //   this.$store.commit("GET_USERINFO", {
      //     accountInfo: res,
      //     isLogin: true,
      //   });
      //   this.$emit("listenVal", 2);
      // });
      // }
    },
    async guestLogin() {
      let res = await this.regGuestUser()
      if (res) {
        this.$router.push({ path: '/home', query: { user: 'guest' } })
      }
    }
  },
  mixins: [validate, verifyMixins]
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.registe {
  background-color: #fff;
  padding: 0;
  .reg_input {
    margin: poTorem(30px);
    border: 1px solid #f3f3f3;
    span {
      font-size: poTorem(16px);
      color: #000000;
    }
    .code {
      width: 100%;
      .pic_vcode {
        background-size: cover;
        width: 70px;
        height: 32px;
        display: inline-block;
        position: absolute;
        // background-image: url("http://m.0567aa.com//index.php/api/request/ac/getVerify/id/1/r/0.04085656332873011");
      }
      .yd-input {
        width: 60%;
      }
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
    }
  }
  .registe_head {
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
  .reg_con {
    padding: 0 30px;
    .reg_btn {
      div {
        background: #ff7c34;
        width: poTorem(311px);
        text-align: center;
        margin: 0 auto;
        margin-top: poTorem(10px);
        height: poTorem(38px);
        line-height: poTorem(38px);
        border-radius: poTorem(5px);
        color: #fff;
        font-size: poTorem(20px);
        font-weight: bold;
      }
      .submmiting {
        background-color: #ddd;
      }
    }
    .con_one {
      display: flex;
      @include between;
      margin: poTorem(15px) 0;
      span {
        font-size: poTorem(16px);
        font-weight: bold;
        color: #535353;
      }
      .to_login {
        display: inline-block;
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

<style lang="scss">
.registe .reg_input {
  #protocol {
    width: 100%;
    .yd-cell-left {
      width: 30%;
    }
    .yd-cell-right {
      width: 70%;
    }
    /* webkit 浏览器*/
    input::-webkit-input-placeholder {
      // font-style: italic;
      font-weight: 200;
    }
    /* 火狐浏览器 */
    input::-moz-placeholder {
      // font-style: italic;
      font-weight: 200;
    }
    .checkbok {
      input[type="checkbox"]:checked + .yd-checkbox-icon {
        border-color: #ccc;
      }
      span {
        border-color: rgb(204, 204, 204);
        i {
          border-color: #f00;
        }
      }
    }
  }
}
</style>
