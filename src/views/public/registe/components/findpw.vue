<template>
  <div class="findpw_main_body">
    <div :class="[{'login_head_pig': isfestival},'login_head']">
      <!-- <router-link to="/member"> -->
      <span class="iconfont icon-fanhui"
            @click="goBack"></span>
      <!-- </router-link> -->
      <span class="title">密码找回</span>
      <span></span>
    </div>
    <div class="findpw_main_content">
      <div class="login_con find_con">
        <yd-cell-group>
          <yd-cell-item v-show="isShow">
            <span slot="left"
                  class="find_account">账号：</span>
            <yd-input slot="right"
                      required
                      v-model="input1"
                      max="20"
                      placeholder="请输入账号"></yd-input>
          </yd-cell-item>
          <yd-cell-item v-show="isShow">
            <span slot="left"
                  class="find_account">验证码：</span>
            <yd-input slot="right"
                      type="text"
                      v-model="input2"
                      placeholder="请输入验证码"></yd-input>
            <span slot="right"
                  class="verify_code">
              <img :src="verifyImg"
                   alt=""
                   class="verify_img"
                   @click="getVerify()">
            </span>
          </yd-cell-item>
          <!-- 第一步 选择验证方式 -->
          <yd-cell-item arrow
                        v-show="item.present"
                        v-for="(item, index) in wayTypeArr"
                        :key="index"
                        @click.native="filtInfo(item, index)">
            <span slot="left"
                  class="find_account">{{item.text}}</span>
          </yd-cell-item>
          <!-- 第二步 填写验证信息 -->
          <yd-cell-item v-show="stepTwoIsShow">
            <span slot="left"
                  class="find_account">{{stepTwoTxt}}</span>
            <yd-input slot="right"
                      v-model="verifyInfo"
                      max="20"
                      :placeholder="'请输入'+stepTwoTxt"></yd-input>
          </yd-cell-item>
          <div class="content"
               v-show="questionVerify">
            <yd-cell-group class="form_ipt">
              <yd-cell-item arrow>
                <span slot="left"
                      class="left">问题一</span>
                <select slot="right"
                        v-model="verifyQuestionOne"
                        class="right">
                  <option :value="index"
                          v-for="(item, index) in questionArr"
                          :key="index"
                          :selected="index===0?'selected':''">{{item}}</option>
                </select>
              </yd-cell-item>
              <yd-cell-item>
                <span slot="left">答案</span>
                <input slot="right"
                       type="text"
                       placeholder="请输入答案"
                       v-model="verifyAnswerOne">
              </yd-cell-item>
              <yd-cell-item arrow>
                <span slot="left"
                      class="left">问题二</span>
                <select slot="right"
                        v-model="verifyQuestionTwo"
                        class="right">
                  <option :value="index"
                          v-for="(item, index) in questionArr"
                          :key="index">{{item}}</option>
                </select>
              </yd-cell-item>
              <yd-cell-item>
                <span slot="left">答案</span>
                <input slot="right"
                       type="text"
                       placeholder="请输入答案"
                       v-model="verifyAnswerTwo">
              </yd-cell-item>
              <yd-cell-item arrow>
                <span slot="left"
                      class="left">问题三</span>
                <select slot="right"
                        v-model="verifyQuestionThree"
                        class="right">
                  <option :value="index"
                          v-for="(item, index) in questionArr"
                          :key="index">{{item}}</option>
                </select>
              </yd-cell-item>
              <yd-cell-item>
                <span slot="left">答案</span>
                <input slot="right"
                       type="text"
                       placeholder="请输入答案"
                       v-model="verifyAnswerThree">
              </yd-cell-item>
            </yd-cell-group>
            <p class="btn">
              <button @click="verifyData">确定</button>
            </p>
          </div>
          <!-- 第三步 填写新密码提交 -->
          <yd-cell-item v-show="stepThreeIsShow">
            <span slot="left"
                  class="find_account">新密码：</span>
            <yd-input slot="right"
                      type="password"
                      v-model="newPW1"
                      max="20"
                      placeholder="请输入新密码"></yd-input>
          </yd-cell-item>
          <yd-cell-item v-show="stepThreeIsShow">
            <span slot="left"
                  class="find_account">确认密码：</span>
            <yd-input slot="right"
                      type="password"
                      v-model="newPW2"
                      max="20"
                      placeholder="请确认新密码"></yd-input>
          </yd-cell-item>
          <yd-cell-item v-show="stepThreeIsShow">
            <span slot="left"
                  class="find_account">验证码：</span>
            <yd-input slot="right"
                      type="text"
                      v-model="input3"
                      placeholder="请输入验证码"></yd-input>
            <span slot="right"
                  class="verify_code">
              <img :src="verifyImg2"
                   alt=""
                   class="verify_img"
                   @click="getVerify()">
            </span>
          </yd-cell-item>
        </yd-cell-group>
      </div>
      <!-- 公用按钮 -->
      <div class="login_btn"
           v-show="btnIsShow">
        <div class="btn">
          <yd-button bgcolor='#F93'
                     style='width:90%'
                     @click.native="submitData">确定</yd-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      vid: "",
      funcName: "找回密码",
      verifyImg: "",
      verifyImg2: "",
      verifyNum: "",
      input1: "",
      input2: "",
      input3: "",
      isparent: false,
      isShow: true,
      btnIsShow: true,
      stepTwoTxt: "密保邮箱",
      stepTwoIsShow: false,
      stepThreeIsShow: false,
      questionVerify: false,
      verifyInfo: "",
      newPW1: "",
      newPW2: "",
      wayType: "",
      passToken: "",
      wayTypeArr: [
        {
          present: false,
          text: "通过密保问题"
        },
        {
          present: false,
          text: "通过密保邮箱"
        },
        {
          present: false,
          text: "通过手机号码"
        },
        {
          present: false,
          text: "通过交易密码"
        }
      ],
      verifyQuestionOne: 0,
      verifyQuestionTwo: 0,
      verifyQuestionThree: 0,
      verifyAnswerOne: "",
      verifyAnswerTwo: "",
      verifyAnswerThree: "",
      questionArr: [
        "点击选择密保问题",
        "您母亲的姓名是？",
        "您父亲的姓名是？",
        "您配偶的姓名是？",
        "您的出生地是？",
        "您高中班主任的名字是？",
        "您初中班主任的名字是？",
        "您小学班主任的名字是？",
        "您的小学校名是？",
        "您的学号（或工号）是？",
        "您父亲的生日是？",
        "您母亲的生日是",
        "您配偶的生日是？"
      ]
    };
  },
  computed: {
    ...mapState(['isfestival'])
  },
  mounted() {
    this.$dialog.loading.open("正在加载中···");
    this.getVerify();
  },
  methods: {
    getVerify() {
      this.$ajax("request", {
        ac: "getVerifyImage"
      }).then(res => {
        if (!this.wayType) {
          this.verifyImg = res.img;
          this.vid = res.vid;
        } else {
          this.verifyImg2 = res.img;
          this.vid = res.vid;
        }
        this.$dialog.loading.close();
      });
    },
    submitData() {
      if (!this.wayType) {
        this.$ajax("request", {
          ac: "FPgetAccountScrectList",
          vcode: this.input2,
          username: this.input1,
          vid: this.vid
        }).then(res => {
          if (res == 0) {
            this.$dialog.alert({
              mes: "你的账号未绑定任何安全设置,无法进行密码找回!"
            });
          } else {
            this.isShow = false;
            this.btnIsShow = false;
            this.isparent = true;
            this.stepTwoIsShow = false;
            if (res.indexOf("1") != -1) this.wayTypeArr[0].present = true;
            // if (res.indexOf("2") != -1) this.wayTypeArr[1].present = true;
            // if (res.indexOf("3") != -1) this.wayTypeArr[2].present = true;
            // if (res.indexOf("4") != -1) this.wayTypeArr[3].present = true;
          }
        });
        this.getVerify();
        this.input2 = "";
      } else {
        if (this.newPW1 != this.newPW2) {
          this.$dialog.alert({ mes: "两次密码不一致" });
        } else {
          this.$ajax("request", {
            ac: "FPchangePassword",
            accessCode: this.passToken,
            username: this.input1,
            pass: this.newPW1,
            vcode: this.input3,
            client: 1
          }).then(() => {
            this.isShow = true;
            this.verifyQuestionOne = 0;
            this.verifyQuestionTwo = 0;
            this.verifyQuestionThree = 0;
            this.verifyAnswerOne = "";
            this.verifyAnswerTwo = "";
            this.verifyAnswerThree = "";
            this.input1 = "";
            this.input2 = "";
            this.btnIsShow = false;
            this.stepTwoIsShow = false;
            this.stepThreeIsShow = false;
            this.questionVerify = false;
            this.$router.push("/login");
            this.$dialog.alert({ mes: "修改成功，请使用新密码登录" });
            this.getVerify();
          });
        }
      }
      // else {
      //   let obj = {
      //     ac:
      //       this.wayType == 1
      //         ? "FPcheckQuestion"
      //         : this.wayType == 2
      //           ? "FPcheckEmail"
      //           : this.wayType == 3 ? "FPcheckPhone" : "FPcheckTkPass",
      //     username: this.input1
      //   };
      //   if (this.wayType == 1) {
      //     obj.question = this.verifyInfo;
      //   } else if (this.wayType == 2) {
      //     obj.email = this.verifyInfo;
      //   } else if (this.wayType == 3) {
      //     obj.phone = this.verifyInfo;
      //   } else if (this.wayType == 4) {
      //     obj.tk_pass = this.verifyInfo;
      //   }
      //   this.$ajax("request", obj).then(res => {
      //     this.wayType = 4;
      //     this.passToken = res;
      //     this.stepTwoIsShow = false;
      //     this.stepThreeIsShow = true;
      //     this.getVerify(this.randomNum());
      //   });
      // }
    },
    goBack() {
      if (this.questionVerify || this.stepThreeIsShow) {
        this.verifyQuestionOne = 0;
        this.verifyQuestionTwo = 0;
        this.verifyQuestionThree = 0;
        this.verifyAnswerOne = "";
        this.verifyAnswerTwo = "";
        this.verifyAnswerThree = "";
        this.input1 = "";
        this.input2 = "";
      }
      if (this.isparent) {
        this.getVerify();
        this.input1 = "";
        this.input2 = "";
      }
      if (this.isShow) {
        this.input1 = "";
        this.input2 = "";
        this.$router.back();
        this.questionVerify = false;
        this.stepThreeIsShow = false;
      } else {
        this.isShow = true;
        this.btnIsShow = true;
        this.stepTwoIsShow = false;
        this.stepThreeIsShow = false;
        this.questionVerify = false;
        this.wayType = "";
        this.wayTypeArr.forEach(item => {
          item.present = false;
        });
      }
    },
    filtInfo(n, i) {
      this.stepTwoIsShow = true;
      this.btnIsShow = false;
      this.wayType = i + 1;
      this.wayTypeArr.forEach(item => {
        item.present = false;
      });

      if (i == 0) {
        this.stepTwoTxt = "密保问题";
        this.questionVerify = true;
        this.stepTwoIsShow = false;
      } else if (i == 1) {
        this.stepTwoTxt = "密保邮箱";
      } else if (i == 2) {
        this.stepTwoTxt = "手机号码";
      } else {
        this.stepTwoTxt = "交易密码";
      }
    },
    verifyData() {
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "FPcheckQuestion",
        username: this.input1,
        question_1: this.verifyQuestionOne,
        question_2: this.verifyQuestionTwo,
        question_3: this.verifyQuestionThree,
        answer_1: this.verifyAnswerOne,
        answer_2: this.verifyAnswerTwo,
        answer_3: this.verifyAnswerThree
      }).then(res => {
        this.passToken = res.accessCode;
        this.questionVerify = false;
        this.stepThreeIsShow = true;
        this.getVerify();
        this.btnIsShow = true;
        // this.funcName = '修改密保问题'
      });
      this.$dialog.loading.close();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.findpw_main_body {
  padding: 0;
  position: relative;
  background-color: #eee;
  .login_head {
    @include between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    height: poTorem(48px);
    width: 100%;
    background: url(../../../../img/phone_header.png) CENTER TOP;
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
  .findpw_main_content {
    height: 100%;
    z-index: 10;
    margin-top: poTorem(48px);
    .login_con {
      display: flex;
      @include center;
      margin-top: poTorem(130px);
      .yd-cell {
        .yd-cell-item {
          height: poTorem(46px);
          border: 1px solid #ddd;
          margin-bottom: poTorem(20px);
          width: poTorem(298px);
          .verify_img {
            width: poTorem(100px);
            height: poTorem(32px);
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
    .find_con {
      margin-top: poTorem(20px);
      width: 100%;
      margin-bottom: poTorem(80px);
      .yd-cell-box {
        width: 100%;
        .yd-cell {
          width: 100%;
          background-color: #fff;
          .yd-cell-item {
            width: 100%;
            margin-bottom: 0;
            border: none;
            border-bottom: 1px solid #f3f3f3;
            .yd-cell-left {
              text-indent: 2rem;
              width: 5.5rem;
            }
            .yd-cell-right {
              input {
                text-indent: 0.5rem;
              }
            }
          }
          &:after {
            border-bottom: none;
          }
        }
      }
      .find_account {
        font-size: poTorem(16px);
      }
    }
    .login_btn {
      .btn_con {
        width: poTorem(414px);
        height: poTorem(24px);
        color: #adadad;
        font-size: poTorem(16px);
        margin-top: poTorem(20px);
        padding: 0 10%;
        @include between;
        font-weight: bolder;
      }
      .btn {
        @include center;
        .yd-btn {
          width: poTorem(262px);
          height: poTorem(38px);
          border-radius: poTorem(5px);
          color: #fff;
          font-size: poTorem(18px);
          font-weight: bolder;
        }
      }
    }
  }
  .content {
    height: poTorem(580px);
    background-color: #eee;
    .yd-cell-item {
      padding-left: 1.25rem;
      span,
      input {
        font-size: 0.9rem;
        text-indent: 0 !important;
      }
      .right,
      input,
      select {
        color: #333;
        font-size: 0.9rem;
      }
    }
    .btn {
      margin-top: poTorem(60px);
      text-align: center;
      button {
        width: poTorem(300px);
        height: poTorem(40px);
        font-size: poTorem(16px);
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


