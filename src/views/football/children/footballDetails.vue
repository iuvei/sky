<template>
  <div class="footballDetails_main_body">
    <FootballHeader title='详情'> </FootballHeader>
    <div class="details">
      <div class="icon">
        <img :src="pageData.icon"
             alt="">
      </div>
      <div class="info">
        <p>{{pageData.sport_key==='FT'?'足球':pageData.sport_key==='BK'?'篮球':pageData.sport_key==='TN'?'网球':pageData.sport_key==='BS'?'网球':'排球'}}
          <span :class="allData.status===0?'orange':allData.status===1?'green':allData.status===2?'red':''">{{(pageData.win_price || 0).toFixed(2)}}元</span>
        </p>
        <p>普通投注
          <span :class="allData.status===0?'orange':allData.status===1?'green':allData.status===2?'red':''">{{allData.status===0?'待开奖':allData.status===1?'已中奖':allData.status===2?'未中奖':allData.status===3?'和局':allData.status===4?'已撤单':allData.status==5?'危险球判定中':'危险球撤单'}}</span>
        </p>
      </div>
    </div>
    <div class="details_info other-block"
         v-if="allData.game_type == 3">
      <p class="title_word">订单内容</p>
      <div class="tag">
        <p>订单号</p>
        <p>投注金额</p>
        <p>过关方式</p>
        <p>投注时间</p>
      </div>
      <div class="content">
        <p>{{allData.betslip_id}}</p>
        <p>{{(pageData.price || 0).toFixed(2)}}元</p>
        <p>{{allData.bet_info.length}}串1</p>
        <p>{{getTime(pageData.bet_time)}}</p>
      </div>
      <p class="title_word"
         style="margin:1.25rem 0">我的投注</p>
      <div class="betting">
        <div class="bet_info"
             v-for="(item,key) in allData.bet_info"
             :key="key">
          <p>{{item.play_method}}</p>
          <span v-show="item.is_corner ===1">角球数</span>
          <p>{{item.team}}</p>
          <p>{{item.bet_content}}
            <span>@{{item.new_odds}}</span>
            <i :class="item.win_status===0?'green':item.win_status===1?'green':item.win_status===2?'red':item.win_status===3?'red':'orange'">{{item.win_status===0?'全赢':item.win_status===1?'赢一半':item.win_status===2?'输一半':item.win_status===3?'全输':item.win_status===4?'和局':'待开奖'}}</i>
          </p>
          <p>{{'开赛时间 '+getTime(item.begin_time)}}</p>
        </div>
      </div>
    </div>
    <div class="details_info other-block"
         v-else>
      <p class="title_word">订单内容</p>
      <div class="tag">
        <p>订单号</p>
        <p>投注金额</p>
        <p>返水金额</p>
        <p>返水比例</p>
        <p>投注赔率</p>
        <p>过关方式</p>
        <p>半场赛果</p>
        <p>全场赛果</p>
        <p>投注时间</p>
      </div>
      <div class="content">
        <p>{{allData.betslip_id}}</p>
        <p>{{(pageData.price || 0).toFixed(2)}}元</p>
        <p>0.000</p>
        <p>0%</p>
        <p>@{{pageData.new_odds}}
          <span class="special">(此赔率为出票时的赔率)</span>
        </p>
        <p>单关</p>
        <p>{{pageData.HTG}}</p>
        <p>{{pageData.TG}}</p>
        <p>{{getTime(pageData.bet_time)}}</p>
      </div>
      <p class="title_word"
         style="margin:1.25rem 0">我的投注</p>
      <div class="betting">
        <div class="bet_info">
          <p>{{pageData.play_method}}</p>
          <span v-show="pageData.is_corner ===1">角球数</span>
          <p>{{pageData.team}}</p>
          <p>{{pageData.bet_content}}
            <span>@{{pageData.new_odds}}</span>
          </p>
          <p>{{'开赛时间 '+getTime(pageData.begin_time)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FootballHeader from "../components/FootballHeader";
export default {
  components: { FootballHeader },
  data() {
    return {
      funcName: "详情",
      allData: {
        bet_info: []
      },
      recordTime: "",
      date: ""
    };
  },
  computed: {
    pageData() {
      return this.allData.bet_info[0] || {};
    }
  },
  activated() {
    this.allData = this.$route.params.item;
    console.log(this.allData);
  },
  methods: {
    getTime(time) {
      const assignTime = new Date(time),
        y = assignTime.getFullYear(),
        M = assignTime.getMonth() + 1,
        d = assignTime.getDate(),
        h = assignTime.getHours(),
        m = assignTime.getMinutes(),
        s = assignTime.getSeconds(),
        add0 = m => m > 9 ? m : "0" + m;
      return (
        y +
        "-" +
        add0(M) +
        "-" +
        add0(d) +
        " " +
        add0(h) +
        ":" +
        add0(m) +
        ":" +
        add0(s)
      );
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.footballDetails_main_body {
  background-color: #fff;
  .details {
    padding: 0.6rem 1rem;
    border-bottom: 1px solid #ddd;
    font-size: 1.2rem;
    .icon {
      display: inline-block;
      margin-right: 1rem;
      float: left;
      img {
        width: poTorem(80px);
        height: poTorem(80px);
      }
    }
    .info {
      height: 5rem;
      p {
        line-height: 2.5rem;
        &:last-child {
          color: #9e9e9e;
        }
      }
      span {
        float: right;
        // color: rgb(34, 160, 43);
      }
    }
  }
  .details_info {
    padding: poTorem(20px);
    .title_word {
      padding-left: poTorem(5px);
      border-left: 0.4rem solid $mainColor;
      font-size: poTorem(20px);
      color: #313131;
    }
    .tag {
      width: 20%;
      font-size: poTorem(15px);
      color: #959595;
      text-align: right;
      margin-right: poTorem(20px);
    }
    .content {
      display: inline-block;
      font-size: poTorem(15px);
      color: #313131;
    }
    .tag,
    .content {
      display: inline-block;
      // height: poTorem(20px);
      line-height: poTorem(32px);
      padding-top: poTorem(20px);
      .special {
        color: #eb6100;
      }
    }
    .lottery_number {
      padding: poTorem(20px);
      font-size: poTorem(13px);
      color: #a0a0a0;
      i {
        color: #e33939;
      }
    }
    .betting {
      background: url("../../../img/football/chupiaokou.png") no-repeat;
      background-size: 100% 100%;
      background-position-y: bottom;
      padding: 0.5rem 0;
      .title {
        width: 100%;
      }
      .foot {
        width: 100%;
        padding: 0 0.28rem;
      }
      // .bet_info:before{
      //   content:'';
      //   display: inline-block;
      //   width: 100%;
      //   height: 100%;
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   background: url('../../../img/football/chupiaokou.png') no-repeat;
      //   background-size: 100%;
      // }
      .bet_info {
        margin: 0 2rem;
        padding: 0.5rem 0;
        position: relative;
        border-bottom: 1px dashed #ccc;
        &:last-child {
          border-bottom: none;
        }
        p {
          font-size: 1rem;
          line-height: 2rem;
          &:first-child {
            display: inline-block;
          }
          span {
            color: #e33939;
          }
          i {
            float: right;
          }
        }
        > span {
          display: inline-block;
          font-size: 0.9rem;
          line-height: 1.5rem;
          background-color: $mainColor;
          color: #fff;
          border-radius: 0.2rem;
          padding: 0 0.5rem;
        }
      }
    }
  }
  .orange {
    color: $mainColor;
  }
  .green {
    color: green;
  }
  .red {
    color: red;
  }
}
</style>


