<template>
  <div class="correctQuestion_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <div class="content"
         v-show="isShow">
      <yd-cell-group class="form_ipt">
        <yd-cell-item>
          <span slot="left">问题一</span>
          <select slot="right"
                  v-model="questionOne">
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
                 v-model="answerOne">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">问题二</span>
          <select slot="right"
                  v-model="questionTwo">
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
                 v-model="answerTwo">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">问题三</span>
          <select slot="right"
                  v-model="questionThree">
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
                 v-model="answerThree">
        </yd-cell-item>
      </yd-cell-group>
      <p class="btn">
        <button @click="submitData"
                v-show="show">确定</button>
        <button @click="newSubmitData"
                v-show="!show">立即修改</button>
      </p>
    </div>
    <div class="content"
         v-show="!isShow">
      <yd-cell-group class="form_ipt">
        <yd-cell-item>
          <span slot="left">问题一</span>
          <select slot="right"
                  v-model="verifyQuestionOne">
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
                 v-model="verifyAnswerOne">
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">问题二</span>
          <select slot="right"
                  v-model="verifyQuestionTwo">
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
        <yd-cell-item>
          <span slot="left">问题三</span>
          <select slot="right"
                  v-model="verifyQuestionThree">
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
        <button @click="verifyData">下一步</button>
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
      funcName: "设置密保问题",
      isShow: true,
      show: true,
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
      ],
      questionOne: 0,
      questionTwo: 0,
      questionThree: 0,
      answerOne: "",
      answerTwo: "",
      answerThree: "",
      verifyQuestionOne: 0,
      verifyQuestionTwo: 0,
      verifyQuestionThree: 0,
      verifyAnswerOne: "",
      verifyAnswerTwo: "",
      verifyAnswerThree: "",
      accessCode: ""
    };
  },
  activated() {
    // this.getData()
    this.questionOne = 0;
    this.questionTwo = 0;
    this.questionThree = 0;
    this.answerOne = "";
    this.answerTwo = "";
    this.answerThree = "";
    this.verifyAnswerOne = "";
    this.verifyAnswerTwo = "";
    this.verifyAnswerThree = "";
    this.verifyQuestionOne = this.$store.state.userinfo.accountInfo.question_1;
    this.verifyQuestionTwo = this.$store.state.userinfo.accountInfo.question_2;
    this.verifyQuestionThree = this.$store.state.userinfo.accountInfo.question_3;
    if (this.$store.state.userinfo.accountInfo.question_1 !== "0") {
      this.funcName = "验证密保问题";
      this.isShow = false;
      // this.oldWechat = this.$store.state.userinfo.accountInfo.wechat
    }
  },
  mounted() {
    // this.activated()
    // alert(this.questionOne);
  },
  methods: {
    submitData() {
      const isPass = this.answerOne && this.answerTwo && this.answerThree;
      console.log(this.questionOne);
      if (this.questionOne == 0) {
        this.$dialog.toast({ mes: "请选择密保问题一" });
        return;
      } else if (this.questionTwo == 0) {
        this.$dialog.toast({ mes: "请选择密保问题二" });
        return;
      } else if (this.questionThree == 0) {
        this.$dialog.toast({ mes: "请选择密保问题三" });
        return;
      }
      if (!isPass) {
        this.$dialog.toast({ mes: "请填写正确密保答案" });
        return;
      }
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "addUserHint",
        hint_1: this.questionOne,
        answer_1: this.answerOne,
        hint_2: this.questionTwo,
        answer_2: this.answerTwo,
        hint_3: this.questionThree,
        answer_3: this.answerThree
      }).then(() => {
        this.questionOne = 0;
        this.questionTwo = 0;
        this.questionThree = 0;
        this.answerOne = "";
        this.answerTwo = "";
        this.answerThree = "";
        this.$dialog.alert({ mes: "修改成功" });
        this.$ajax("request", {
          ac: "encodeLogin",
          code: this.$store.state.userinfo.accountInfo.code
        }).then(res => {
          this.$store.commit("GET_USERINFO", {
            accountInfo: res,
            isLogin: true
          });
          this.$router.back();
        });
      });
      this.$dialog.loading.close();
    },
    newSubmitData() {
      if (this.questionOne == 0) {
        this.$dialog.toast({ mes: "请选择密保问题一" });
        return;
      } else if (this.questionTwo == 0) {
        this.$dialog.toast({ mes: "请选择密保问题二" });
        return;
      } else if (this.questionThree == 0) {
        this.$dialog.toast({ mes: "请选择密保问题三" });
        return;
      }
      const isPass = this.answerOne && this.answerTwo && this.answerThree;
      if (!isPass) {
        this.$dialog.toast({ mes: "请填写正确密保答案" });
        return;
      }
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "FPchangeUserHint",
        hint_1: this.questionOne,
        answer_1: this.answerOne,
        hint_2: this.questionTwo,
        answer_2: this.answerTwo,
        hint_3: this.questionThree,
        answer_3: this.answerThree,
        accessCode: this.accessCode
      }).then(() => {
        this.questionOne = 0;
        this.questionTwo = 0;
        this.questionThree = 0;
        this.answerOne = "";
        this.answerTwo = "";
        this.answerThree = "";
        this.$dialog.alert({ mes: "修改成功" });
        this.$ajax("request", {
          ac: "encodeLogin",
          code: this.$store.state.userinfo.accountInfo.code
        }).then(res => {
          this.$store.commit("GET_USERINFO", {
            accountInfo: res,
            isLogin: true
          });
          this.$router.back();
        });
      });
      this.$dialog.loading.close();
    },
    verifyData() {
      if (this.verifyQuestionOne == 0) {
        this.$dialog.toast({ mes: "请选择密保问题一" });
        return;
      } else if (this.verifyQuestionTwo == 0) {
        this.$dialog.toast({ mes: "请选择密保问题二" });
        return;
      } else if (this.verifyQuestionThree == 0) {
        this.$dialog.toast({ mes: "请选择密保问题三" });
        return;
      }
      const isPass =
        this.verifyAnswerOne && this.verifyAnswerTwo && this.verifyAnswerThree;
      if (!isPass) {
        this.$dialog.toast({ mes: "请填写正确密保答案" });
        return;
      }
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "FPcheckQuestion",
        username: this.$store.state.userinfo.accountInfo.username,
        question_1: this.verifyQuestionOne,
        question_2: this.verifyQuestionTwo,
        question_3: this.verifyQuestionThree,
        answer_1: this.verifyAnswerOne,
        answer_2: this.verifyAnswerTwo,
        answer_3: this.verifyAnswerThree
      }).then(res => {
        this.questionOne = 0;
        this.questionTwo = 0;
        this.questionThree = 0;
        this.answerOne = "";
        this.answerTwo = "";
        this.answerThree = "";
        this.accessCode = res.accessCode;
        this.isShow = true;
        this.show = false;
        this.funcName = "修改密保问题";
      });
      this.$dialog.loading.close();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.correctQuestion_main_body {
  .content {
    height: 100%;
    background-color: #eee;
    // padding: poTorem(20px);
    // .form_ipt {
    //   overflow: hidden;
    //   border: poTorem(1px) solid #bfbfbf;
    //   border-radius: poTorem(5px);
    //   height: poTorem(102px);
    // }
    .tips {
      margin: poTorem(26px) 0;
      text-align: center;
      font-size: poTorem(13px);
      color: #7d7d7d;
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


