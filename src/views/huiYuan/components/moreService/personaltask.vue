<template>
  <div class="personaltask_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <div class="task">
      <div class="item"
           v-for="(i,key) in data"
           :key="key"
           @click="tofulfil(i.tag,i.status)">
        <i></i>
        <p>{{i.title}}</p>
        <p>+{{i.addexp}} 成长值</p>
        <span :style="(i.status==1)?'background-color: #22AD38':'background-color: #ccc'">{{i.status==1?'已完成':'未完成'}}</span>
      </div>
      <!-- <div class="item">
        <i></i>
        <p>设置交易密码</p>
        <p>+20 成长值</p>
        <span :style="is_tk?'background-color: #22AD38':'background-color: #ccc'">{{is_tk?'已完成':'未完成'}}</span>
      </div>
      <div class="item">
        <i></i>
        <p>绑定银行卡</p>
        <p>+20 成长值</p>
        <span :style="is_bank?'background-color: #22AD38':'background-color: #ccc'">{{is_bank?'已完成':'未完成'}}</span>
      </div>
      <div class="item">
        <i></i>
        <p>设置真实姓名</p>
        <p>+20 成长值</p>
        <span :style="is_name?'background-color: #22AD38':'background-color: #ccc'">{{is_name?'已完成':'未完成'}}</span>
      </div>
      <div class="item">
        <i></i>
        <p>设置密保问题</p>
        <p>+20 成长值</p>
        <span :style="is_question?'background-color: #22AD38':'background-color: #ccc'">{{is_question?'已完成':'未完成'}}</span>
      </div>
      <div class="item">
        <i></i>
        <p>绑定手机</p>
        <p>+20 成长值</p>
        <span :style="is_phone?'background-color: #22AD38':'background-color: #ccc'">{{is_phone?'已完成':'未完成'}}</span>
      </div>
      <div class="item">
        <i></i>
        <p>绑定微信</p>
        <p>+20 成长值</p>
        <span :style="is_wechat?'background-color: #22AD38':'background-color: #ccc'">{{is_wechat?'已完成':'未完成'}}</span>
      </div>
      <div class="item">
        <i></i>
        <p>绑定QQ</p>
        <p>+20 成长值</p>
        <span :style="is_qq?'background-color: #22AD38':'background-color: #ccc'">{{is_qq?'已完成':'未完成'}}</span>
      </div>
      <div class="item">
        <i></i>
        <p>绑定邮箱</p>
        <p>+20 成长值</p>
        <span :style="is_email?'background-color: #22AD38':'background-color: #ccc'">{{is_email?'已完成':'未完成'}}</span>
      </div> -->
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
  computed: {
    ...mapState({
      userinfo: state => state.userinfo.accountInfo
    })
    // is_tk() {
    //   return this.userinfo.tkpass_ok;
    // },
    // is_name() {
    //   return !!this.userinfo.real_name;
    // },
    // is_phone() {
    //   return !!this.userinfo.phone;
    // },
    // is_wechat() {
    //   return !!this.userinfo.wechat;
    // },
    // is_qq() {
    //   return !!this.userinfo.qq;
    // },
    // is_email() {
    //   return !!this.userinfo.email;
    // },
    // is_question() {
    //   return this.userinfo.question_1 !== "0";
    // },
    // is_bank() {
    //   return this.userinfo.bank_typename != "";
    // },
  },
  data() {
    return {
      funcName: "任务礼包",
      data: []
    };
  },
  activated() {
    this.getData();
  },
  methods: {
    // 用户晋级活动数据
    getData() {
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "GetUserEventRiseInfo"
      }).then(res => {
        console.log(res);
        this.data = res.task_list;
        this.$dialog.loading.close();
      });
    },
    tofulfil(tag, i) {
      if (i == 1) {
        return;
      }
      if (tag == "sign") {
        this.$router.push("/moreService/signIn");
      } else if (tag == "realname") {
        this.$router.push("/moreService/correctRealName");
      } else if (tag == "wechat") {
        this.$router.push("/moreService/bindingWechat");
      } else if (tag == "qq") {
        this.$router.push("/moreService/bindingQQ");
      } else if (tag == "email") {
        this.$router.push("/moreService/bindingEmail");
      } else if (tag == "question") {
        this.$router.push("/moreService/correctQuestion");
      } else if (tag == "bank") {
        this.$router.push("/moreService/bankcardManage");
      } else if (tag == "phone") {
        this.$router.push("/moreService/bindingCellphone");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.personaltask_main_body {
  background-color: #f5f5f5;
  .task {
    padding-left: poTorem(20px);
    background-color: #fff;
    margin-top: poTorem(15px);
    font-size: poTorem(16px);
    .one_tag {
      padding: 0;
      padding-right: poTorem(20px);
    }
    .item {
      color: #5b5b5c;
      border-bottom: 1px solid #ccc;
      position: relative;
      padding: poTorem(5px) 0;
      padding-left: poTorem(35px);
      &:last-child {
        border-bottom: none;
      }
      i {
        display: inline-block;
        width: poTorem(25px);
        height: poTorem(25px);
        background: url("../../../../img/grade_gift.png") no-repeat;
        background-size: 100%;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
      span {
        display: inline-block;
        width: poTorem(70px);
        height: poTorem(25px);
        line-height: poTorem(25px);
        color: #fff;
        text-align: center;
        position: absolute;
        top: 50%;
        right: poTorem(20px);
        transform: translateY(-50%);
        border-radius: poTorem(5px);
      }
      p {
        line-height: poTorem(25px);
        &:nth-child(3) {
          color: #959595;
        }
      }
    }
  }
}
</style>