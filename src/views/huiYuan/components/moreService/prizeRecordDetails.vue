<template>
  <div class="prizeRecordDetails_main_body">
    <publicHead :title="funcName"
                :type="2"></publicHead>
    <div class="up_content">
      <div class="icon">
        <img :src="baseData.icon"
             alt="">
      </div>
      <div class="lottery_info">
        <p class="lottery_type">
          <span>{{baseData.game_name}}</span>
          <span>第{{baseData.qishu}}期</span>
        </p>
        <p class="lottery_num">
          <span>开奖号码：</span>
          <span>{{kjballs}}</span>
        </p>
        <!-- 0=待开奖, 1=已中奖 2=未中奖 3=撤单 4=追号 -->
        <p :class="[baseData.status==0?'wait':baseData.status==1?'win':baseData.status==3?'cancel':'lottery_state']">
          {{baseData.status==1?'已中奖，赢'+baseData.win+'元':baseData.status==0?'待开奖':baseData.status==3?'已撤单':'未中奖'}}</p>
      </div>
    </div>
    <div class="order_info">
      <p class="title_word">订单内容</p>
      <div class="tag">
        <p>订单号</p>
        <p>投注金额</p>
        <p>投注注数</p>
        <!-- <p>投注返点</p> -->
        <p>投注赔率</p>
        <p>投注时间</p>
        <p>是否中奖</p>
        <p>开奖时间</p>
        <!-- <p>是否关盘</p> -->
        <p>玩法名称</p>
      </div>
      <div class="content">
        <p>{{baseData.zhudan}}</p>
        <p>{{baseData.price}}</p>
        <p>{{baseData.zhushu}}</p>
        <!-- <p>无</p> -->
        <p>{{baseData.peilv}}</p>
        <p>{{baseData.tz_time}}</p>
        <p class="win">已中奖</p>
        <p>{{baseData.js_time}}</p>
        <!-- <p>是</p> -->
        <p>{{baseData.wanfa}}</p>
      </div>
      <p class="title_word"
         style="margin-top: 1.25rem">投注号码</p>
      <p class="lottery_number">{{baseData.xiangqing}}</p>
      <div class="one_more">
        <div @click="toBetting"
             v-show="show">
          <button>再来一注</button>
        </div>
        <button v-show="!show"
                @click="revoke">撤单</button>
      </div>
    </div>
  </div>
</template>
<script>
import publicHead from "./publicHead";
import api from "../../../../../api/game.js";
export default {
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "详情",
      baseData: [],
      show: true
    };
  },
  activated() {
    if (this.$route.params.game_name) {
      this.baseData = this.$route.params;
    }
    console.log(this.baseData);
    if (this.baseData.status === 3) {
      this.show = false;
    }
  },
  computed: {
    kjballs() {
      const arr = this.baseData.kj_balls.split(" ");
      if (arr.length == 4) {
        return `{$arr[0]+$arr[1]+$arr[2]=$arr[3]}`;
      } else {
        return this.baseData.kj_balls;
      }
    }
  },
  methods: {
    revoke() {
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "cancelTouzhu",
        gameid: this.baseData.gameid,
        idlist: this.baseData.guid
      }).then(res => {
        console.log(res);
        this.$dialog.loading.close();
      });
    },
    async toBetting() {
      const gameList = await api.getGameList();
      const thisGame = gameList.find(
        item => item.game_id === this.baseData.gameid
      );
      this.$router.replace({
        name: thisGame.js_tag,
        params: {
          lotter_id: thisGame.game_id,
          name_tag: thisGame.tag,
          game_name: thisGame.game_name,
          js_tag: thisGame.js_tag,
          speed: thisGame.speed
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.prizeRecordDetails_main_body {
  background-color: #fff;
  .up_content {
    overflow: hidden;
    padding: poTorem(20px);
    border-bottom: poTorem(1px) solid #d3d3d3;
    div {
      float: left;
    }
    .icon {
      height: poTorem(80px);
      line-height: poTorem(80px);
      margin-right: poTorem(20px);
      img {
        width: poTorem(57px);
      }
    }
    .lottery_info {
      .lottery_type {
        span {
          &:first-child {
            font-size: poTorem(17px);
            color: #313131;
            margin-right: poTorem(20px);
          }
          &:last-child {
            font-size: poTorem(13px);
            color: #959595;
          }
        }
      }
      .lottery_num {
        span {
          &:first-child {
            font-size: poTorem(13px);
            color: #959595;
          }
          &:last-child {
            font-family: SimHei;
            font-size: poTorem(14px);
            color: #e33939;
          }
        }
      }
      .lottery_state {
        font-size: poTorem(14px);
        color: #a0a0a0;
      }
      .wait {
        font-size: poTorem(14px);
        color: $mainColor;
      }
      .win {
        font-size: poTorem(14px);
        color: #097c25;
      }
      .cancel {
        font-size: poTorem(14px);
        color: #a0a0a0;
      }
    }
  }
  .order_info {
    padding: poTorem(20px);
    .title_word {
      padding-left: poTorem(5px);
      border-left: poTorem(5px) solid $mainColor;
      font-size: poTorem(15px);
      color: #313131;
      height: poTorem(18px);
      line-height: poTorem(18px);
    }
    .tag {
      width: 20%;
      font-size: poTorem(13px);
      color: #959595;
      text-align: right;
      margin-right: poTorem(20px);
    }
    .content {
      display: inline-block;
      font-size: poTorem(12px);
      color: #313131;
      .default {
        color: #a0a0a0;
      }
      .wait {
        color: $mainColor;
      }
      .win {
        color: #097c25;
      }
      .cancel {
        color: #a0a0a0;
      }
    }
    .tag,
    .content {
      display: inline-block;
      height: poTorem(20px);
      line-height: poTorem(20px);
      padding-top: poTorem(20px);
    }
    .lottery_number {
      padding: poTorem(20px);
      font-size: poTorem(13px);
      color: #a0a0a0;
      i {
        color: #e33939;
      }
    }
    .one_more {
      margin-top: poTorem(20px);
      width: 100%;
      text-align: center;
      button {
        width: poTorem(304px);
        background-color: $mainColor;
        font-size: poTorem(15px);
        color: #fff;
        height: poTorem(32px);
        outline: none;
        border: none;
      }
    }
  }
}
</style>


