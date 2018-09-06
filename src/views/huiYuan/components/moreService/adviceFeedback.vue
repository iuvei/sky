<template>
  <div class="adviceFeedback_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <div class="adviceFeedback_main_content">
      <div class="feedback_type">
        <p v-for="(item, index) in options" :key="index" @click="chooseOption(index)">
          <span :class="[isChoosed==index?'active':'', 'radio']"></span>
          <span>{{item}}</span>
        </p>
      </div>
      <div class="word_ipt">
        <textarea type="textarea" placeholder="点击输入反馈内容" v-model="content"></textarea>
      </div>
      <yd-cell-item class="num">
            <span slot="left">联系方式：</span>
            <yd-input slot="right" v-model="phoneNumber" regex="mobile" placeholder="请留下您的联系方式"></yd-input>
        </yd-cell-item>
      <!-- <div>
        <input type="text" placeholder="请留下您的联系方式" v-model="phoneNumber">
      </div> -->
      <p class="submit">
        <button @click="submitData">确认提交</button>
      </p>
    </div>
  </div>
</template>
<script>
import publicHead from './publicHead'
export default {
  components : {
    publicHead
  },
  data() {
    return {
      funcName: '我要反馈',
      options: ['建议', '投诉', '错误报告'],
      isChoosed: 0,
      type: 1,
      content: '',
      phoneNumber: ''
    }
  },
  methods: {
    chooseOption(i) {
      this.isChoosed = i
      this.type = i+1
    },
    submitData() {
      this.$ajax('request', {
        ac: 'getFeedback',
        content: this.content,
        type: this.type,
        title: this.type==1?"建议":this.type==2?"投诉":"错误报告",
        contact: this.phoneNumber
      }).then(res => {
        this.$dialog.alert({mes: '提交成功，感谢您的宝贵意见'})
        this.content = ''
        this.$router.back()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.adviceFeedback_main_body {
  background-color: #eee;
  .adviceFeedback_main_content {
    height: poTorem(688px);
    background-color: #eee;
    .feedback_type {
      @include around;
      padding: poTorem(20px);
      p {
        .radio {
          display: inline-block;
          width: poTorem(20px);
          height: poTorem(20px);
          border: poTorem(1px) solid #a0a0a0;
          background-color: #fff;
        }
        .active {
          background: #fff url(~img/more_settings/tick.png) no-repeat;
          background-size: contain;
        }
        span {
          font-size: poTorem(17px);
          color: #313131;
          line-height: poTorem(20px);
          vertical-align: top;
        }
      }
    }
    .word_ipt {
      padding: 0 poTorem(20px);
      text-align: center;
      textarea {
        width: poTorem(374px);
        height: poTorem(156px);
        background-color: #fff;
        font-size: poTorem(16px);
        color: #656565;
        text-indent: 1rem;
        border: none;
        line-height: poTorem(30px);
      }
    }
    .submit {
      margin-top: poTorem(60px);
      text-align: center;
      button {
        width: poTorem(300px);
        height: poTorem(40px);
        font-size: poTorem(18px);
        line-height: poTorem(16px);
        color: #fff;
        background-color: #ff7c34;
        border-radius: poTorem(5px);
        outline: none;
        border: none;
      }
    }
  }
}
</style>


