<template>
  <div class="prizeRecord_main_body">
    <publicHead :title="funcName" :type="1" :timeText="chooseTimeText" @chooseTimeShow="changeState"></publicHead>
    <div class="empty" v-show="this.allData==0">
      <img src="../../../../img/bet_record/noRecords.png" alt="">
      <p>暂无记录</p>
      <router-link to='/betting'>
        <button>立即购买</button>
      </router-link>
    </div>
    <div class="hasContent" @click="toDetails(item)" v-for="(item, index) in allData" :key="index" v-show="this.allData!=0">
      <div class="left">
        <p>{{item.game_name}}</p>
        <p>{{item.tz_time}}</p>
      </div>
      <p class="center">{{item.qishu}}</p>
      <div class="right">
        <div>
          <p>{{item.is_win}}</p>
          <!-- 0=待开奖, 1=已中奖 2=未中奖 3=撤单 4=追号 -->
          <p class="win">
          {{'赢'+item.win+'元'}}</p>
        </div>
        <div>
          <img src="../../../../img/bet_record/arrow.png" alt="">
        </div>
      </div>
    </div>
    <p class="all_present" v-show="this.allData!=0" @click="getMoreData">{{isAllPresent?'已显示全部':'查看更多'}}</p>
    <yd-actionsheet :items="timeOptions" v-model="choosedTime" class="changePeriod"></yd-actionsheet>
  </div>
</template>
<script>
import publicHead from '../moreService/publicHead'
export default {
  components : {
    publicHead
  },
  data() {
    return {
      funcName: '中奖记录',
      allData: [],
      choosedTime: false,
      isAllPresent: false,
      chooseTimeText: '今天',
      choosedTimeIndex: 0,
      pageID: 0,
      timeOptions:[
        {
          label: '今天',
          callback: () => {
            this.chooseTimeText = '今天'
            this.choosedTimeIndex = 0
            this.pageID = 0
            this.getData()
          }
        },
        {
          label: '昨天',
          callback: () => {
            this.chooseTimeText = '昨天'
            this.choosedTimeIndex = 1
            this.pageID = 0
            this.getData()
          }
        },
        {
          label: '本周',
          callback: () => {
            this.chooseTimeText = '本周'
            this.choosedTimeIndex = 2
            this.pageID = 0
            this.getData()
          }
        },
        {
          label: '本月',
          callback: () => {
            this.chooseTimeText = '本月'
            this.choosedTimeIndex = 3
            this.pageID = 0
            this.getData()
          }
        },
        {
          label: '上月',
          callback: () => {
            this.chooseTimeText = '上月'
            this.choosedTimeIndex = 4
            this.pageID = 0
            this.getData()
          }
        }
      ]
    }
  },
  activated() {
    this.getData()
  },
  methods: {
    getData(){
      this.$ajax('request', {
        ac: 'getUserTouzhuLog',
        type: 2,
        pageid: this.pageID,
        lasttime: this.choosedTimeIndex,
        gameid: 0
      }).then(res => {
        console.log(res)
        if(res.length != 30) {this.isAllPresent = true}
        this.allData = res
      })
    },
    toDetails(n) {
      this.$router.push({
        name: 'zhongjiangxiangqing',
        params: n
      })
    },
    refresh() {
      this.getData()
    },
    changeState() {
      this.choosedTime = true
    },
    getMoreData() {
      this.pageID ++
      if(!this.isAllPresent) {
        this.$ajax('request', {
        ac: 'getUserTouzhuLog',
        type: 2,
        pageid: this.pageID,
        lasttime: this.choosedTimeIndex,
        gameid: 0
      }).then(res => {
        if(res.length != 30) {this.isAllPresent = true}
        if(res === 0) { this.allData = this.allData.concat(res); return }
        this.allData = this.allData.concat(res)
      })
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.prizeRecord_main_body {
  background-color: #fff;
  height: 100%;
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
      border:none;
    }
  }
  .hasContent {
    @include around;
    padding: poTorem(20px) 0;
    border-bottom: poTorem(1px) solid #eee;
    .left {
      p {
        &:first-child {
          font-size: poTorem(14px);
          color: #313131;
        }
        &:last-child {
          font-size: poTorem(12px);
          color: #a0a0a0;
        }
      }
    }
    .center {
      font-size: poTorem(12px);
      color: #313131;
    }
    .right {
      div {
        float: left;
        height: poTorem(37px);
        &:first-child {
          font-size: poTorem(13px);
          p {
            &:first-child {
              color: #e33939;
            }
            // &:last-child {
            //   color: #a0a0a0;
            // }
          }
        }
        &:last-child {
          line-height: poTorem(37px);
        }
        img {
          width: poTorem(16px);
        }
        .win {
          color: #097c25;
        }
      }
    }
  }
  .all_present {
    width: 100%;
    text-align: center;
    margin-top: poTorem(20px);
    font-size: 1rem;
    color: #a0a0a0;
    font-weight: 400;
    padding-bottom: 3rem;
  }
}
</style>


