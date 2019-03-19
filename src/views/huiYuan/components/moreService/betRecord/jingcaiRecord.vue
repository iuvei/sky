<template>
  <yd-tab :callback="jcClick" class="other-block jcbetRecord" slot='list'>
    <yd-tab-panel v-for="(item,key) in jcitem" :label="item.label" :key="key" class="cent_jctab"></yd-tab-panel>
    <AppEmpty v-show="!datajc.length">
      <div class="buy_now" slot="other" @click='toBuyLottery(sportItem)'>
        <button>立即购买</button>
      </div>
    </AppEmpty>

    <div v-for="(item,key) in datajc" :key="key" v-show="datajc.length" class="list_jcbox">
      <div class="info_jcbox" @click="itemJingCaiInfo(item,key)">
        <div class="jcname">
          <span>{{item.jingcai_id=='2101'?'足球':'篮球'}}</span>
          <span>{{getTime(item.bet_time)}}</span>
        </div>
        <div class="jcplay">
          <span>{{Object.keys(item.play_type ||{}).map(k=>playTypeMap.find(el=>el.key===k).title).sort().join(',')}}</span>
          <span>
            <p>赛事:{{item.open_game_count + '/' + item.game_count}}</p>
            <p>注数:{{item.open_parlay_count + '/' + item.bet_count}}</p>
          </span>
        </div>
        <div class="jcactual">
          <span>实际盈亏</span>
          <span>{{(item.win || 0).toFixed(2)}}</span>
        </div>
        <div class="jcbet">
          <span>下注：
            <i>{{(item.price || 0).toFixed(2)}}</i>元</span>
          <span>
            <b :class="item.status==0?'orange':item.status==1?'green':item.status==2?'red':'red'">{{item.status==0?'待开奖':item.status==1?'开奖中':item.status==2?'已中奖':item.status==3?'已撤单':'未中奖'}}</b>
          </span>
        </div>
      </div>
    </div>

    <p class="all_present" v-show="datajc.length" @click="getMoreData">{{isAllPresent?'已显示全部':'查看更多'}}</p>
  </yd-tab>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import debounce from 'lodash/debounce'
export default {
  name: 'jingcai-record',
  props: ['choosedTimeIndex', 'choosedTime'],
  data() {
    return {
      pageIdx: 0,
      isAllPresent: false,
      jctab: -1,
      jcitem: [
        { label: '全部', type: -1 },
        { label: '待开奖', type: 0 },
        { label: '开奖中', type: 1 },
        { label: '已中奖', type: 2 },
        { label: '撤单', type: 3 },
        { label: '未中奖', type: 5 }
      ],
      datajc: []
    }
  },
  computed: {
    ...mapState('match', ['playTypeMap'])
  },
  watch: {
    choosedTime(choosedTime) {
      if (!choosedTime) {
        this.pageIdx = 0
        this.fetchBetList()
      }
    }
  },
  mounted() {
    this.fetchBetList()
  },
  activated() {
    this.fetchBetList()
  },
  methods: {
    ...mapActions('match', ['updateField', 'getJingcaiUserBetList']),
    fetchBetList: debounce(async function() {
      // if (this.isAllPresent) return
      const req = {
        lasttime: this.choosedTimeIndex,
        status: this.jctab,
        next: this.pageIdx,
        loading: true
      }
      this.datajc = []
      const { bet_record, next } = await this.getJingcaiUserBetList(req)
      this.isAllPresent = !next
      this.datajc = [...this.datajc, ...bet_record]
      // console.error("this.datajc", this.datajc);
    }, 300),
    // 竟彩选项卡
    jcClick(label, idx) {
      const status = this.jcitem[idx].type
      this.updateField({ status })
      this.jctab = status

      this.pageIdx = 0
      this.fetchBetList()
    },
    // 加载更多
    getMoreData() {
      if (this.isAllPresent) {
        return
      }
      this.pageIdx++
      this.fetchBetList()
    },
    // 当前被点击
    itemJingCaiInfo(item, key) {
      this.$router.push({
        name: 'jingcaixiangqing',
        params: { item, key }
      })
    },
    // 转换时间
    getTime(time) {
      const assignTime = new Date(time),
        y = assignTime.getFullYear(),
        M = assignTime.getMonth() + 1,
        d = assignTime.getDate(),
        // h = assignTime.getHours(),
        // m = assignTime.getMinutes(),
        // s = assignTime.getSeconds(),
        add0 = m => (m > 9 ? m : '0' + m)
      return (
        y + '-' + add0(M) + '-' + add0(d)
        //  +
        // " " +
        // add0(h) +
        // ":" +
        // add0(m) +
        // ":" +
        // add0(s)
      )
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~css/resources.scss';
.jcbetRecord {
  display: flex;
  flex-direction: column;
  .cent_jctab {
  }
  .buy_now {
    margin-top: poTorem(10px);
    button {
      width: poTorem(93px);
      padding: poTorem(5px) 0 poTorem(5px) 0;
      font-size: poTorem(14px);
      text-align: center;
      font-weight: 700;
      border-radius: 5px;
      color: #fff;
      background-color: #f93;
      outline: none;
      border: none;
    }
  }
  .list_jcbox {
    padding: 0.6rem 1rem 0;
    background-color: #eee;
  }
  .all_present {
    width: 100%;
    text-align: center;
    padding: poTorem(20px) 0;
    font-size: 1rem;
    color: #a0a0a0;
    font-weight: 400;
    background-color: transparent;
  }
  .info_jcbox {
    background-color: #fff;
    border-radius: 0.3rem;
    padding: 0 1rem;
    font-size: poTorem(15px);
    display: flex;
    flex-direction: column;

    .jcname,
    .jcplay,
    .jcactual,
    .jcbet {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: poTorem(40px);
      span:nth-child(1) {
        width: 70%;
      }
    }
    .jcplay {
      height: poTorem(50px);
    }

    .jcactual {
      border-bottom: 1px solid #d2d2d2;
    }
    .jcbet {
      i {
        color: #e63349;
        padding-right: poTorem(5px);
      }
      .orange {
        color: #ff8540;
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
</style>