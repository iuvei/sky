<template>
  <div class="jcBetRecorddetails_main_body">
    <publicHead title="详情"></publicHead>
    <div class="details_top">
      <div class="icon">
        <img :src="allListXq.icon" alt="">
      </div>
      <div class="info_top">
        <p>{{allListXq.jingcai_id=='2101'?'足球':'篮球'}}
          <span :class="allListXq.status===0?'orange':allListXq.status===1?'green':allListXq.status===2?'red':''">{{(allListXq.win_price || 0).toFixed(2)}}元</span>
        </p>
        <p>普通投注
          <span :class="allListXq.status===0?'orange':allListXq.status===1?'green':allListXq.status===2?'red':''">{{allListXq.status===0?'待开奖':allListXq.status===1?'已中奖':allListXq.status===2?'未中奖':allListXq.status==3?'已撤单':'已结束'}}</span>
        </p>
      </div>
    </div>
    <div class="details_top_info other-block">
      <p class="title_word">订单内容</p>
      <div class="tag">
        <p>订单号</p>
        <p>投注金额</p>
        <p>过关方式</p>
        <p>投注时间</p>
      </div>
      <div class="content">
        <p>{{allListXq.betslip_id}}</p>
        <p>{{(allListXq.price || 0).toFixed(2)}}元</p>
        <p>{{Object.keys(allListXq.play_type ||{}).map(k=>playTypeMap.find(el=>el.key===k).title).sort().join(',')}}</p>
        <p>{{allListXq.bet_time_str}}</p>
      </div>
      <p class="title_word" style="margin:1.25rem 0">我的投注</p>
      <div class="betting">
        <!-- 上部分 -->
        <div class="bet_info" v-for="(item,key) in game_list" :key="key">
          <div class="bet_info_top">
            <span>{{item.match_string}}</span>
            <span>让球:{{item.HC}}</span>
            <span>{{item.is_dan== 0 ? '' :'胆'}}</span>
          </div>
          <div class="bet_info_bottom">
            <span>{{item.home_name}}</span>
            <span>VS</span>
            <span>{{item.visitor_name}}</span>
          </div>

          <!-- 下部分 -->
          <p>投注记录</p>
          <div class="bet_info_betting">
            <!-- group_bet.filter(el=>el.match_id==item.match_id) -->
            <span v-for="(bet,key) in item.bet_info" :key="key" :class="{win:bet.Status==2}">
              {{(getItem(bet.BetContent).name || bet.BetContent) + '('+ bet.Odds+')'}}
            </span>
          </div>

        </div>

        <!-- <div class="view_more" v-show="game_list" @click="getMoreDataXq">
          <p>{{isAllPresent?'已显示全部':'查看更多'}}</p>
        </div> -->
      </div>

    </div>
  </div>
</template>
<script>
import publicHead from '../../publicHead'
import { mapActions, mapState } from 'vuex'
import { getItem } from '~/views/match/components/allPlay.const.js'
export default {
  components: { publicHead },
  data() {
    return {
      allListXq: {}, // 详情内容
      game_list: [], // 赛事列表
      jcTzListXq: [], // 串关详情
      pageIndex: 0,
      isAllPresent: false
    }
  },
  computed: {
    ...mapState('match', ['playTypeMap']),
    // 整合 jcTzListXq => bet_content
    bet_content() {
      return this.jcTzListXq.reduce((f, c) => {
        return [...f, ...c.bet_content]
      }, [])
    },
    // 整合后去重
    group_bet() {
      const group_bet = this.bet_content.reduce((f, c) => {
        const { match_id, play_method, k } = c
        if (match_id) {
          f[match_id + '-' + play_method + '-' + k] = c
        }
        return f
      }, {})
      return Object.values(group_bet)
    }
  },
  activated() {
    this.allListXq = this.$route.params.item
    this.fetchTwo()
  },
  mounted() {},
  methods: {
    ...mapActions('match', [
      'getJingcaiUserBetDetail',
      'getJingcaiUserBetParlayDetail'
    ]),
    // 转换用
    getItem,
    async fetchTwo() {
      const req = {
        bet_record_id: this.allListXq.bet_record_id || ''
      }
      // const rst = {
      //   bet_record_id: this.allListXq.bet_record_id || "",
      //   next: this.pageIndex
      // };
      const bet_recordlist = await this.getJingcaiUserBetDetail(req)
      // const parlayList =  await this.getJingcaiUserBetParlayDetail(rst)

      this.game_list = bet_recordlist.game_list || []
      // this.jcTzListXq = parlayList.detail || [];
      // this.isAllPresent = !parlayList.next;
    },
    async fetchBetContent() {
      const rst = {
        bet_record_id: this.allListXq.bet_record_id || '',
        next: this.pageIndex
      }
      const parlayList = await this.getJingcaiUserBetParlayDetail(rst)
      const data = parlayList.detail || []
      this.isAllPresent = !parlayList.next
      this.jcTzListXq = [...this.jcTzListXq, ...data]
    },
    // 加载更多
    getMoreDataXq() {
      if (this.isAllPresent) {
        return
      }
      this.pageIndex++
      this.fetchBetContent()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~css/resources.scss';
.jcBetRecorddetails_main_body {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .details_top {
    min-height: poTorem(104px);
    padding: 0.6rem 1rem;
    border-bottom: poTorem(1px) dashed #d4d4d4;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 26%;
      img {
        width: poTorem(80px);
        height: poTorem(80px);
        // background: #00eb1f;
      }
    }
    .info_top {
      width: 74%;
      display: flex;
      flex-direction: column;
      p {
        display: flex;
        justify-content: space-between;
        line-height: 2.8rem;
        &:last-child {
          color: #9e9e9e;
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
    }
  }
  .details_top_info {
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
      line-height: poTorem(32px);
      padding-top: poTorem(20px);
    }
    .betting {
      background: url('~img/football/chupiaokou.png') no-repeat;
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

      .bet_info {
        margin: 0 2rem;
        padding: 0.5rem 0;
        position: relative;
        border-bottom: poTorem(1px) dashed #ccc;

        &:last-child {
          border-bottom: none;
        }
        .bet_info_top {
          font-size: poTorem(15px);
          color: #979797;

          display: flex;
          justify-content: space-between;
          span {
            flex: 1;
            height: poTorem(30px);
            // border: 1px dashed rgb(224, 20, 20);
          }
          span:nth-child(2) {
            text-align: center;
          }
          span:nth-child(3) {
            display: flex;
            justify-content: flex-end;
            font-weight: 600;
            color: #000000;
          }
        }
        .bet_info_bottom {
          font-size: poTorem(18px);
          display: flex;
          justify-content: space-around;
          span {
            text-align: center;
            font-weight: 600;
            height: poTorem(32px);
          }
          span:nth-child(1) {
            width: 44%;
          }
          span:nth-child(2) {
            flex: 1;
          }
          span:nth-child(3) {
            width: 44%;
          }
        }
        p {
          height: poTorem(25px);
          font-size: poTorem(14px);
          color: #959595;
        }
        .bet_info_betting {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          // justify-content: space-between;
          justify-content: flex-start;
          text-align: center;
          width: 100%;
          span {
            padding: 0 0.4rem;
            margin-left: 1%;
            margin-bottom: 5px;
            font-size: poTorem(14px);
            color: #959595;
            line-height: poTorem(25px);
            border-radius: poTorem(10px);
            border: poTorem(1px) solid #959595;
          }
          .win {
            background-color: #415684;
            border-color: #415684;
            color: #ffffff;
          }
        }
      }
      .view_more {
        width: 100%;
        padding: poTorem(10px) 0 poTorem(20px) 0;
        margin-bottom: poTorem(8px);
        display: flex;
        justify-content: center;
        p {
          width: 90%;
          text-align: center;
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 400;
          background: #313131;
        }
      }
    }
  }
}
</style>


