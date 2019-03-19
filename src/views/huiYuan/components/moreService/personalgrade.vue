<template>
  <div class="personalgrade_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
    <div class="empty"
         v-show="this.data==0">
      <img src="../../../../img/bet_record/noRecords.png"
           alt="">
      <p>暂无记录</p>
    </div>
    <div class="grade"
         v-show="this.data != 0">
      <div class="item"
           v-for="(i,key) in data"
           :key="key">
        <span>{{i.title}}</span>
        <span>+{{i.price}}彩金</span>
        <span>{{i.date}}</span>
      </div>
      <!-- <div class="item">
        <span>打码</span>
        <span>+250成长值</span>
        <span>2018-10-20 19:24:58</span>
      </div>
      <div class="item">
        <span>打码</span>
        <span>+250成长值</span>
        <span>2018-10-20 19:24:58</span>
      </div> -->
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
      funcName: "等级奖励",
      data: []
    };
  },
  activated() {
    this.getRiseRewardLog();
  },
  methods: {
    // 已领取奖励明细
    getRiseRewardLog() {
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "GetRiseRewardLog"
      }).then(res => {
        console.log("已领取奖励明细");
        console.log(res);
        this.data = res;
        this.$dialog.loading.close();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.personalgrade_main_body {
  background-color: #f5f5f5;
  .empty {
    padding-top: 50%;
    @include column;
    img {
      width: poTorem(93px);
      // height: poTorem(81px);
    }
    p {
      font-size: poTorem(14px);
      height: poTorem(20px);
      line-height: poTorem(20px);
      color: #bfbfbf;
      font-weight: 700;
    }
    button {
      width: poTorem(93px);
      padding: 5px 0 5px 0;
      font-size: 14px;
      text-align: center;
      font-weight: 700;
      border-radius: 5px;
      color: #fff;
      background-color: #f93;
      outline: none;
      border: none;
    }
  }
  .grade {
    background-color: #fff;
    padding-left: poTorem(20px);
    margin-top: poTorem(15px);
  }
  .item {
    padding: poTorem(5px) 0;
    line-height: poTorem(50px);
    font-size: poTorem(16px);
    border-bottom: 1px solid #ccc;
    &:last-child {
      border-bottom: none;
    }
    span {
      display: inline-block;
      width: 32%;
      height: poTorem(50px);
      color: #474747;
      &:nth-child(2) {
        text-align: center;
        color: #fe7c33;
      }
      &:last-child {
        // float: right;
        line-height: poTorem(50px);
        text-align: center;
      }
    }
  }
}
</style>