<template>
  <div class="betRecordDetails_main_body">
    <publicHead :title="funcName"
                :type="5"></publicHead>
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
          <span v-if="baseData.gameid==51"
                class="number">
            <span v-ds>{{returnz(kjballs.split(' ')[0])}}</span>
            <span v-ds>{{returnsz(kjballs.split(' ')[1])}}</span>
            <span v-ds>{{returny(kjballs.split(' ')[2])}}</span>
          </span>
          <span v-else-if="baseData.gameid==52"
                class="nc">
            <span v-if="kjballs != ''"
                  class="Colorno"
                  v-for="(items,indexs) in kjballs.split(' ')"
                  :key="indexs">
              <img :src="require('../../../../img/xync_background/lucky_ball_'+ items +'.png')"
                   alt="图片">
            </span>
          </span>
          <span v-else-if="baseData.gameid==54"
                class="kaijiang">
            <span v-if="kjballs != ''"
                  v-for="(num,dex) in kjballs.split(' ')"
                  :key="dex">
              <img :src="require('../../../../img/puke/card/'+ calchs(num) + '_' + calcdx(num) + '.png')"
                   alt="">
            </span>
            <!-- <p v-else> -->
            <!-- <img :src="require('../../../../img/puke/seperate/card_bg.png')" alt="">
              <img :src="require('../../../../img/puke/seperate/card_bg.png')" alt="">
              <img :src="require('../../../../img/puke/seperate/card_bg.png')" alt=""> -->
            <!-- 等待开奖 -->
            <!-- </p> -->
          </span>
          <span v-else>{{kjballs}}</span>
        </p>
        <!-- 0未中奖 其他中奖 -->
        <p :class="[{'wait': iswait}, {'win': iswin}, {'cancel': isrevoke}, 'lottery_state']">
          {{iswin ? '已中奖，赢'+baseData.win+'元' : iswait ? '待开奖' : isrevoke ? '已撤单' : '未中奖'}}
        </p>
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
        <!-- <p>是否关盘</p> -->
        <p>玩法名称</p>
      </div>
      <div class="content"
           style="float: right">
        <p>{{baseData.zhudan}}</p>
        <p>{{baseData.price}}</p>
        <p>{{baseData.zhushu}}</p>
        <!-- <p>无</p> -->
        <p>{{baseData.peilv}}</p>
        <p>{{baseData.tz_time}}</p>
        <!-- 0未中奖 其他中奖 -->
        <p :class="[{'wait': iswait}, {'win': iswin}, {'cancel': isrevoke}, 'default']">
          {{iswin ? '已中奖' : iswait ? '待开奖' : isrevoke ? '已撤单' : '未中奖'}}
        </p>
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
import publicHead from "~/views/huiYuan/components/moreService/publicHead";
import api from "../../../../../api/game.js";
import { mapState, mapActions } from "vuex";
const thArr = ["0"],
  thszArr = ["1"];
export default {
  directives: {
    ds: el => {
      if (el.innerHTML == "单") {
        el.style.color = "#fff";
        el.style.background = "#019fe9";
      } else if (el.innerHTML == "双") {
        el.style.color = "#fff";
        el.style.background = "#e43838";
      } else if (el.innerHTML == "左" || el.innerHTML == "右") {
        el.style.background = "#dcdcdc";
      } else if (el.innerHTML == "3" || el.innerHTML == "4") {
        el.style.color = "#fff";
        el.style.background = "#626262";
      }
    }
  },
  components: {
    publicHead
  },
  data() {
    return {
      funcName: "详情",
      baseData: []
    };
  },
  mounted() {
    if (this.$route.params && Object.keys(this.$route.params).length) {
      this.setBetDetailParams(this.$route.params);
      this.baseData = this.$route.params;
    } else this.baseData = this.$store.state.betting.betDetailParams;
    // console.log(this.baseData)
  },
  computed: {
    iswait() {
      return this.baseData.status == 0 || this.baseData.status == 1;
    },
    iswin() {
      return (
        (this.baseData.status == 2 || this.baseData.status == 3) &&
        this.baseData.win > 0
      );
    },
    isrevoke() {
      return this.baseData, status == 4;
    },
    // 试玩账号不能撤单
    ...mapState({
      isDemoAccount: state => state.userinfo.accountInfo.test === 2
    }),
    kjballs() {
      if (this.baseData.kj_balls) {
        const arr = this.baseData.kj_balls.split(" ");
        if (arr.length == 4 && this.baseData.gameid != 56) {
          return `${arr[0]}+${arr[1]}+${arr[2]}=${arr[3]}`;
        } else {
          return this.baseData.kj_balls;
        }
      } else {
        return "";
      }
    },
    show() {
      return this.baseData.status != 0;
    }
  },
  methods: {
    ...mapActions(["setBetDetailParams"]),
    // 计算花色
    calchs(ball) {
      const color = ball % 4;
      let hs = "";
      if (color == 0) {
        hs = "spade";
      } else if (color == 1) {
        hs = "heart";
      } else if (color == 2) {
        hs = "plum";
      } else if (color == 3) {
        hs = "block";
      } else {
        hs = "-";
      }
      return hs;
    },
    // 计算数字
    calcdx(ball) {
      const balls = parseInt(ball, 10);
      const dx = parseInt(balls / 4 + 1);
      if (dx == 11) return "J";
      if (dx == 12) return "Q";
      if (dx == 13) return "K";
      if (dx == 1) return "A";
      return dx;
    },
    returnz(val) {
      if (thArr.includes(val)) {
        return "左";
      } else if (thszArr.includes(val)) {
        return "右";
      }
    },
    returnsz(val) {
      if (thArr.includes(val)) {
        return "3";
      } else if (thszArr.includes(val)) {
        return "4";
      }
    },
    returny(val) {
      if (thArr.includes(val)) {
        return "单";
      } else if (thszArr.includes(val)) {
        return "双";
      }
    },
    revoke() {
      if (this.isDemoAccount) {
        return this.$dialog.confirm({
          title: "温馨提示",
          mes: "您的账号是试玩账号，不能撤单！",
          opts: [
            {
              txt: "确定",
              color: true,
              stay: false
            }
          ]
        });
      }
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "cancelTouzhu",
        gameid: this.baseData.gameid,
        idlist: this.baseData.guid
      }).then(() => {
        this.show = true;
        this.baseData.status = 3;
        this.$dialog.loading.close();
      });
    },
    async toBetting() {
      const gameList = await api.getGameList();
      const thisGame = gameList.find(
        item => item.game_id === this.baseData.gameid
      );
      // this.$router.replace({
      this.$router.push({
        name: thisGame.js_tag,
        params: {
          lotter_id: thisGame.game_id,
          name_tag: thisGame.tag,
          game_name: thisGame.game_name,
          js_tag: thisGame.js_tag,
          speed: thisGame.speed,
          play_type: thisGame.play_type,
          isHome: true,
          wanfa: this.$route.params.wanfa || ""
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.betRecordDetails_main_body {
  background-color: #fff;
  .up_content {
    overflow: hidden;
    padding: poTorem(20px) poTorem(20px) poTorem(10px) poTorem(20px);
    border-bottom: poTorem(1px) solid #d3d3d3;
    div {
      float: left;
    }
    .icon {
      height: poTorem(80px);
      line-height: poTorem(80px);
      margin-right: poTorem(20px);
      img {
        width: poTorem(67px);
      }
    }
    .lottery_info {
      white-space: nowrap;
      width: 70%;
      p {
        margin-bottom: poTorem(2px);
      }
      .lottery_type {
        span {
          &:first-child {
            font-size: poTorem(20px);
            color: #313131;
            margin-right: poTorem(20px);
          }
          &:last-child {
            font-size: poTorem(16px);
            color: #959595;
          }
        }
      }
      .lottery_num {
        > span {
          &:first-child {
            font-size: poTorem(16px);
            color: #959595;
          }
          &:last-child {
            font-family: SimHei;
            font-size: poTorem(16px);
            color: #e33939;
          }
        }
        .nc {
          @include around;
          display: inline-block;
          .Colorno {
            img {
              margin-top: 0.25rem;
              width: 1.6rem;
              height: 1.6rem;
            }
          }
        }
        .kaijiang {
          p {
            color: #eb3349;
            width: auto;
            img {
              display: inline-block;
              width: poTorem(25px);
              margin-left: poTorem(10px);
            }
          }
          color: #eb3349;
          width: auto;
          span {
            display: inline-block;
            height: 1.8rem;
            width: 1.6rem;
            line-height: 1.8rem;
            img {
              display: inline-block;
              height: 1.8rem;
              // width: 1.4rem;
            }
          }
        }
        .number {
          width: 46%;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.6rem;
            height: 1.6rem;
            margin-left: poTorem(10px);
            border: poTorem(1px) solid rgb(221, 221, 221);
            border-radius: 50%;
            text-align: center;
            line-height: 1.6rem;
          }
        }
      }
      .lottery_state {
        font-size: poTorem(14px);
        color: #a0a0a0;
      }
      .wait {
        font-size: poTorem(16px);
        color: $mainColor;
      }
      .win {
        font-size: poTorem(16px);
        color: #097c25;
      }
      .cancel {
        font-size: poTorem(16px);
        color: #a0a0a0;
      }
    }
  }
  .order_info {
    padding: poTorem(20px);
    .title_word {
      padding-left: poTorem(5px);
      border-left: poTorem(5px) solid $mainColor;
      font-size: poTorem(16px);
      color: #313131;
      height: poTorem(18px);
      line-height: poTorem(18px);
    }
    .tag {
      width: 20%;
      font-size: poTorem(15px);
      color: #959595;
      text-align: right;
      margin-right: poTorem(20px);
      p {
        margin-bottom: poTorem(4px);
      }
    }
    .content {
      font-size: poTorem(15px);
      display: inline-block;
      font-size: poTorem(15px);
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
      p {
        margin-bottom: poTorem(4px);
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
      font-size: poTorem(15px);
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
        font-size: poTorem(16px);
        color: #fff;
        height: poTorem(40px);
        outline: none;
        border: none;
        font-weight: bold;
      }
    }
  }
}
</style>


