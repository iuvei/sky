<template>
  <div class="growinginfo_main_body">
    <publicHead :title="funcName" :type="5"></publicHead>
    <div class="box" v-show="tabNum==0">
      <div class="user_info">
        <img :src="head_icon" alt="">
        <div>
          <p class="userInfo">
            <span style="vertical-align:-webkit-baseline-middle">{{username}}</span>
            <!-- <span class="vip_degree">
              <img src="../../../../img/personal_center/degree.png" alt="">
              <i style="vertical-align:-webkit-baseline-middle">VIP{{data.vip}}</i>
            </span> -->
          </p>
          <p class="userInfo">
            <span>等级：<i class="vip_degree" style="font-style: italic;font-weight:600">LV.{{data.prevVip}}</i>&nbsp;&nbsp;成长值：<i class="vip_degree">{{data.exp}}</i></span>
            <!-- <span class="vip_degree">成长值：{{data.exp}}分</span> -->
          </p>
        </div>
        <p class="degree_detail">距离下一级还需要 {{data.nextExp - data.exp}} 成长值，可获得奖励</p>
        <div class="degree_line_box">
          <span>LV.{{data.prevVip}}</span>
          <yd-progressbar type="line" :progress="progress" trail-width="6" stroke-width="6" trail-color="#FFA800" stroke-color="#ccc" class="degree_line"></yd-progressbar>
          <span class="speed">{{parseInt(progress * 100)}}%</span>
          <span>LV.{{data.nextVip}}</span>
        </div>
      </div>
      <div class="growing">
        <p class="tit">成长值分类统计：</p>
        <div class="item" v-for="(i,key) in list.exp_sum" :key="key">
          <span>{{i.title}}：</span>
          <i>{{i.exp}}</i>
        </div>
        <!-- <div class="item">
          <span>充值成长值：</span>
          <i>1000</i>
        </div>
        <div class="item">
          <span>打码成长值：</span>
          <i>1000</i>
        </div>
        <div class="item">
          <span>任务成长值：</span>
          <i>1000</i>
        </div> -->
      </div>
      <div class="list">
        <p class="tit">奖励明细：</p>
        <div class="item" v-for="(i,key) in list.exp_list" :key="key">
          <span>{{i.title}}</span>
          <span>{{i.exp}}成长值</span>
          <span>{{i.date}}</span>
        </div>
        <!-- <div class="item">
          <span>打码</span>
          <span>+250成长值</span>
          <span><i>2018-10-20</i><i>19:24:58</i></span>
        </div>
        <div class="item">
          <span>打码</span>
          <span>+250成长值</span>
          <span><i>2018-10-20</i><i>19:24:58</i></span>
        </div>
        <div class="item">
          <span>打码</span>
          <span>+250成长值</span>
          <span><i>2018-10-20</i><i>19:24:58</i></span>
        </div> -->
      </div>
    </div>
    <div class="box" v-show="tabNum==1">
      <div class="head">
        <p>如何获取成长值：</p>
        <span>充值：平台中，每充值1元可获取1成长值</span>
        <span>打码：平台中，每投注1元可获取1成长值</span>
        <span>任务：完成任务可以获得相应成长值</span>
      </div>
      <div class="grade">
        <p>等级成长值对应</p>
        <div class="degree_title">
          <span>等级</span>
          <span>成长值</span>
          <span>等级礼金</span>
          <span>周俸禄</span>
          <span>月俸禄</span>
        </div>
        <div class="degree_intro" v-for="(item,key) in rule" :key="key">
          <span>LV.{{item.vip}}</span>
          <span>{{item.exp}}</span>
          <span>{{item.level_reward}}</span>
          <span>{{item.week_reward}}</span>
          <span>{{item.month_reward}}</span>
        </div>
      </div>
    </div>
    <div class="foot">
      <div @click="tab(0)" :class="(tabNum==0)?'active':''">
        <i :class="(tabNum==0)?'grade_info1':'grade_info2'"></i>
        <span>明细</span>
      </div>
      <div @click="tab(1)" :class="(tabNum==1)?'active':''">
        <i :class="(tabNum==1)?'grade_1':'grade_2'"></i>
        <span>规则</span>
      </div>
    </div>
  </div>
</template>
<script>
import decodeFunc from '../../../shouYe/decode.js'
import publicHead from './publicHead';
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components : {
    publicHead
  },
  computed: {
    ...mapState({
      userInfo: state => state.userinfo,
      username: state => state.userinfo.accountInfo.username,
      // head_icon: store => store.userinfo.accountInfo.head_icon,
      tkpass() {
        return this.$store.state.userinfo.accountInfo.tkpass_ok;
      },
      bank() {
        return this.$store.state.userinfo.accountInfo.bank_typename != "";
      },
    }),
    head_icon() {
      let iconUrl = this.$store.state.userinfo.accountInfo.head_icon
      if(iconUrl !== '') {
        return iconUrl
      } else {
        let defaultIcon = require("../../../../img/head_icon.png")
        return defaultIcon
      }
    }
  },
  data() {
    return {
      funcName: '成长明细',
      data:[],
      progress: 0,
      img: require("../../../../img/bet_record/arrow.png"),
      headImg: "",
      tabNum: 0,
      list:[],
      rule:[]
    }
  },
  activated() {
    this.getData()
    this.getUserExpTradLog()
    this.getRiseViewInfoNew()
  },
  mixins: [decodeFunc],
  methods: {
    getData (){
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "GetUserEventRiseInfo",
      }).then(res => {
        this.data = res
        this.progress = (res.exp/res.nextExp).toFixed(2)
        this.$dialog.loading.close();
      });
    },
    // 晋级活动积分明细
    getUserExpTradLog (){
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "GetUserExpTradLog",
      }).then(res => {
        console.log('晋级活动积分明细')
        console.log(res)
        this.list = res
        this.$dialog.loading.close();
      });
    },
    // 晋级活动规则
    getRiseViewInfoNew (){
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "GetRiseViewInfoNew",
      }).then(res => {
        console.log('晋级活动规则')
        console.log(res)
        this.rule = res
        // var temp = document.createElement("div");
        // temp.innerHTML = this.decodeEvent(res)
        // var output = temp.innerText || temp.textContent;
        // temp = null;
        // // this.params = output;
        // this.rule = output
        // this.$dialog.loading.close();
      });
    },
    tab(n) {
      this.funcName = (n==0)?'成长明细':'规则',
      this.tabNum = n
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.growinginfo_main_body{
  background-color: #F5F5F5;
  .user_info {
    background: url(../../../../img/grade_bg.png) no-repeat;
    background-size: cover;
    height: poTorem(178px);
    // width: poTorem(414px);
    overflow: hidden;
    margin-bottom: poTorem(15px);
    img {
      border-radius: 50%;
      width: poTorem(58px);
      height: poTorem(58px);
      // border: 2px solid #fff;
      margin: poTorem(18px) poTorem(20px) 0;
      float: left;
    }
    div {
      padding: poTorem(20px) 0;
      // width: poTorem(310px);
      // vertical-align: middle;
      // display: inline-block;
      line-height: poTorem(20px);
      font-size: poTorem(15px);
      color: #fff;
      font-weight: 700;
      // float: left;
      .userInfo {
        line-height: 1.5rem;
      }
      .vip_degree {
        color: #ffea00;
        display: inline-block;
        img {
          width: poTorem(20px);
          height: poTorem(23px);
          margin: 0;
          margin-right: poTorem(5px);
          padding: 0;
          border: none;
        }
      }
    }
    .degree_detail {
      font-size: poTorem(15px);
      color: #fff;
      // text-align: center;
      padding-left: poTorem(30px);
    }
    .degree_line_box {
      position: relative;
      @include around;
      width: 100%;
      padding: 0 poTorem(20px);
      .degree_line {
        display: inline-block;
        width: 70%;
        border-radius: poTorem(10px);
      }
      .speed {
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 0.8rem;
      }
    }
  }
  .growing {
    padding-left: poTorem(20px);
    background-color: #fff;
    padding-top: poTorem(15px);
    margin-bottom: poTorem(15px);
    .tit{
      color: #7a7a7a;
      font-size: poTorem(16px);
    }
    .item {
      line-height: poTorem(50px);
      font-size: poTorem(16px);
      border-bottom: 1px solid #ccc;
      &:last-child{
        border-bottom: none;
      }
      span {
        color: #474747;
      }
      i {
        color: #E4403F;
      }
    }
  }
  .list {
    padding-left: poTorem(20px);
    background-color: #fff;
    padding-top: poTorem(15px);
    .tit{
      color: #7a7a7a;
      font-size: poTorem(16px);
    }
    .item {
      line-height: poTorem(50px);
      font-size: poTorem(16px);
      border-bottom: 1px solid #ccc;
      &:last-child{
        border-bottom: none;
      }
      span {
        display: inline-block;
        width: 32%;
        color: #474747;
        &:nth-child(2){
          text-align: center;
          color: #FE7C33;
        }
        &:last-child{
          float: right;
          line-height: poTorem(25px);
          text-align: center;
        }
      }
    }
  }
  .head{
    padding: poTorem(10px) poTorem(20px);
    margin-top: poTorem(15px);
    margin-bottom: poTorem(15px);
    background-color: #fff;
    p {
      color: #7a7a7a;
      font-size: poTorem(18px);
      line-height: poTorem(40px);
    }
    span {
      color: #525252;
      display: block;
      font-size: poTorem(18px);
      line-height: poTorem(30px);
    }
  }
  .grade {
    // padding-left: poTorem(20px);
    // padding-top: poTorem(15px);
    // margin-bottom: poTorem(15px);
    p {
      padding-left: poTorem(20px);
      color: #7a7a7a;
      font-size: poTorem(18px);
      background-color: #fff;
      line-height: poTorem(40px);
    }
    .degree_title {
      @include around;
      font-size: poTorem(18px);
      span {
        width: 18%;
        color: #525252;
        text-align: center;
        line-height: poTorem(40px);
        &:nth-child(2){
          width: 28%;
        }
      }
    }
    .degree_intro {
      @include around;
      font-size: poTorem(18px);
      color: #626367;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      &:last-child{
        border-bottom: none;
      }
      span {
        width: 18%;
        text-align: center;
        line-height: poTorem(45px);
        color: #525252;
        &:nth-child(2){
          width: 28%;
        }
      }
    }
  }
  .box {
    margin-bottom: poTorem(75px);
  }
  .foot {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 10;
    padding: poTorem(10px) 0;
    background-color: rgb(238, 238, 238);
    div {
      width: 50%;
      display: inline-block;
      float: left;
      &:nth-child(1){
        border-right: 1px solid #ccc;
      }
      i {
        display: block;
        width: poTorem(30px);
        height: poTorem(30px);
        margin: 0 auto;
      }
      .grade_info1 {
        background: url('../../../../img/grade_info1.png') no-repeat;
        background-size: 100%;
      }
      .grade_info2 {
        background: url('../../../../img/grade_info2.png') no-repeat;
        background-size: 100%;
      }
      .grade_1 {
        background: url('../../../../img/grade_1.png') no-repeat;
        background-size: 100%;
      }
      .grade_2 {
        background: url('../../../../img/grade_2.png') no-repeat;
        background-size: 100%;
      }
      span {
        display: block;
        text-align: center;
        line-height: poTorem(20px);
        font-size: poTorem(16px);
        padding-top: poTorem(5px);
      }
    }
    .active {
      span {
        color: #E4393A;
      }
    }
  }
}
</style>