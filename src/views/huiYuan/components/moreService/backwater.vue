<template>
  <div class="backwater_main_body">
    <publicHead :title="funcName"
                :type="0"
                @executeRefresh="getRebate"></publicHead>
    <div class="top">
      <div class="time">返水总额（元）<span>{{rebate.btime + '至' + rebate.etime}}</span></div>
      <div class="money">{{rebate.price}}<span @click="getRebatePrice"><i></i> 领取</span></div>
      <div class="count">计算方式：返率×投注额=返水额</div>
    </div>
    <div class="report">
      <div class="tit">
        <span>我的报表</span>
        <span @click="toDetails()">查看明细＞</span>
      </div>
      <div class="degree_title">
        <span>类型</span>
        <span>返率</span>
        <span>投注额（元）</span>
        <span>返水额</span>
      </div>
      <div class="degree_intro"
           v-for="(item,key) in rebate.rebate_table"
           :key="key">
        <span>{{item[0]}}</span>
        <span>{{item[1]+'%'}}</span>
        <span>{{item[2]}}</span>
        <span>{{item[3]}}</span>
      </div>
    </div>
    <div class="level">
      <div class="tit">
        <span>返水层级表</span>
      </div>
      <div class="degree_title">
        <span v-for="(item,key) in rebate.rebate_head"
              :key="key"
              :style="key==0?'width:16%':'width:'+(100/rebate.rebate_head.length)+'%'">{{item}}</span>
      </div>
      <div class="degree_intro"
           v-for="(item,key) in rebate.rebate_config"
           :key="key">
        <span v-for="(i,key) in item"
              :key="key"
              :style="key==0?'width:16%':'width:'+(100/item.length)+'%'">{{key==0?i*1>=100000000?parseInt(i*1/100000000)+'亿+':i*1>=10000?parseInt(i*1/10000)+'万+':i*1+'元+':i+'%'}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import publicHead from "../moreService/publicHead";
import dayjs from "dayjs";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "时时返水",
      rebate: []
    };
  },
  activated() {
    this.getRebate();
  },
  methods: {
    ...mapActions(["flushPrice"]),
    moment(t) {
      return dayjs(t).format("MM-DD HH:mm");
    },
    getRebate() {
      this.$ajax("request", {
        ac: "GetUserRebate"
      }).then(res => {
        console.log(res);
        this.rebate = res;
        this.$dialog.loading.close();
      });
    },
    getRebatePrice() {
      if (this.rebate.price > 0) {
        this.$ajax("request", {
          ac: "GetRebatePrice"
        }).then(res => {
          console.log(res);
          this.$dialog.toast({ mes: `成功领取返水金额${res}元` });
          this.rebate.price = 0;
          this.getRebate();
          this.flushPrice();
        });
      } else {
        this.$dialog.toast({ mes: `您暂时没有返水可领取,请稍后重试!` });
        return;
      }
    },
    toDetails() {
      this.$router.push({
        name: "zhanghumingxi",
        params: { type: 10 }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.backwater_main_body {
  background-color: #f3f3f3;
  .top {
    background-color: #fff;
    font-size: poTorem(14px);
    line-height: poTorem(50px);
    text-align: center;
    .time {
      span {
        color: #666;
        margin-left: poTorem(10px);
      }
    }
    .money {
      font-size: poTorem(22px);
      line-height: poTorem(35px);
      color: #e53a33;
      position: relative;
      span {
        position: absolute;
        top: 50%;
        left: 65%;
        transform: translateY(-50%);
        color: #fff;
        background-color: #e53a33;
        border-radius: poTorem(5px);
        font-size: poTorem(16px);
        padding: 0 poTorem(10px);
        display: flex;
        justify-content: space-around;
        align-items: center;
        i {
          display: inline-block;
          width: poTorem(24px);
          height: poTorem(20px);
          background: url("~img/personal_center/receive.png") no-repeat;
          background-size: 100% 100%;
          margin-right: poTorem(5px);
        }
      }
    }
    .count {
      color: #666;
    }
  }
  .report {
    .tit {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 poTorem(10px);
      font-size: poTorem(16px);
      background-color: #fff;
      line-height: poTorem(40px);
      margin-top: poTorem(10px);
      span {
        color: #666;
        &:nth-child(2) {
          color: #209ae2;
        }
      }
    }
    .degree_title {
      @include around;
      font-size: poTorem(16px);
      span {
        color: #525252;
        text-align: center;
        line-height: poTorem(35px);
        &:nth-child(1) {
          width: 30%;
        }
        &:nth-child(2) {
          width: 20%;
        }
        &:nth-child(3) {
          width: 30%;
        }
        &:nth-child(4) {
          width: 20%;
        }
      }
    }
    .degree_intro {
      @include around;
      font-size: poTorem(16px);
      color: #626367;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      span {
        text-align: center;
        line-height: poTorem(45px);
        color: #525252;
        &:nth-child(1) {
          color: #000;
          width: 30%;
        }
        &:nth-child(2) {
          width: 20%;
        }
        &:nth-child(3) {
          width: 30%;
        }
        &:nth-child(4) {
          width: 20%;
          color: #e53a33;
        }
      }
    }
  }
  .level {
    .tit {
      padding: 0 poTorem(10px);
      font-size: poTorem(16px);
      background-color: #fff;
      line-height: poTorem(40px);
      margin-top: poTorem(10px);
      span {
        color: #666;
      }
    }
    .degree_title {
      @include around;
      font-size: poTorem(14px);
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      span {
        color: #525252;
        text-align: center;
        border-right: 1px solid #ccc;
        padding: 0 poTorem(5px);
        // line-height: poTorem(44px);
        height: poTorem(44px);
        display: flex;
        justify-content: center;
        align-items: center;
        &:last-child {
          border-right: none;
        }
      }
    }
    .degree_intro {
      @include around;
      font-size: poTorem(14px);
      color: #626367;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      span {
        text-align: center;
        line-height: poTorem(30px);
        color: #000;
        border-right: 1px solid #ccc;
        &:last-child {
          border-right: none;
        }
      }
    }
  }
}
</style>


