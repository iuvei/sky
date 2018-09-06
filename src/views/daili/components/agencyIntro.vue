<template>
  <div class="agencyIntro_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <div class="agencyIntro_main_content">
      <div class="head_img">
        <img src="../../../img/daili/agency_intro_bg.jpg" alt="">
      </div>
      <div class="intro_word" v-html="agentIntro">
      <!-- <div class="intro_word">
        <h5>当您能看到这个页面，说明您的账号即是玩家账号也是代理账号，既可以自己投注，也可以发展下级玩家，赚取返点佣金</h5>
        <p class="title">如何赚取返点？</p>
        <p>可获得的返点，等于自身返点与下级返点的差值，如自身返点5，下级返点3，你将能获得下级投注金额2%的返点 ，如下级投注100元，你将会获得2元。点击下级开户，可查看自身返点，也可为下级设置返点。</p>
        <p class="title">如何为下级开户</p>
        <p>点击下级开户，先为您的下级设置返点，设置成功后会生成一条邀请码 ，将邀请码 发送给您的下级注册，注册后他就是您的下级 ，点击下级会员管理，就能查看他注册的账号;如果您为下级设置的是代理类型的账号，那么您的下级就能继续发展下级 ，如果设置的是玩家类型，那么您的下级只能投注，不能再发展下级，也看不到代理中心</p>
        <p class="title">温馨提示</p>
        <p>1.返点不同赔率也不同，点击返点赔率表，可查看返点赔率；</p>
        <p>2.返点越低，赔率就越低，建议为下级设置的返点不要过低；</p>
        <p>3.可在代理报表、投注明细、交易明细查看代理的发展情况；</p>
        <p>4.建议开设的下级也是代理类型，无论发展了几级，您都能获得返点。</p> -->
      </div>
    </div>
  </div>
</template>
<script>
import publicHead from '../../huiYuan/components/moreService/publicHead'
import { mapActions } from 'vuex';
// import { decode } from 'punycode';
import decodeFunc from '../../shouYe/decode.js'
// import { constants } from 'http2';
export default {
  components : {
    publicHead
  },
  data() {
    return {
      funcName: '代理介绍',
      agentIntro:""
    }
  },
  mixins: [decodeFunc],
  activated(){
    this.getAgencyIntro();
  },
  methods:{
    ...mapActions("agent", ["getAgentInfo"]),
    async getAgencyIntro(){
      this.$dialog.loading.open(' ')
      let res = await this.getAgentInfo();
      console.log(res)
      this.$dialog.loading.close()
      // this.agentInto = res;
      this.funcName = res.title;
      var temp = document.createElement("div");
        // temp.innerHTML = res.content;
        temp.innerHTML = this.decodeEvent(res.content)
        var output = temp.innerText || temp.textContent;
        temp = null;
      this.agentIntro = output;
      console.log(this.agentInto);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.agencyIntro_main_body {
  .agencyIntro_main_content {
    .head_img {
      text-indent: 0;
      img {
        height: poTorem(130px);
        width: 100%;
      }
    }
    .intro_word {
      font-size: poTorem(13px);
      text-indent: 2rem;
      color: #626262;
      padding: poTorem(20px);
      line-height: poTorem(24px);
      .title {
        text-align: center;
        color: #ff7c34;
        font-size: poTorem(17px);
        text-indent: 0;
        line-height: poTorem(50px);
      }
    }
  }
}
</style>
