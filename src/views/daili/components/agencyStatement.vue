<template>
  <div class="agencyStatement_main_body">
    <publicHead :title="accountOptions[0]" :type="1" :timeText="chooseTimeText" @chooseTimeShow="changeState" @pullDown="optionsShow" slot='list'></publicHead>
    <!-- <publicHead :title="accountOptions[choosed]" :type="1" :timeText="chooseTimeText" @chooseTimeShow="changeState" @pullDown="optionsShow" slot='list'></publicHead>
    <div class="account_type" v-show="bgIsShow" slot='list'>
      <div :class="[{options_is_show: optionsIsShow}, defaultClass2]">
        <p v-for="(item, index) in accountOptions" :key="index" @click="chooseType(index)" :class="{active: choosed==index}">{{item}}</p>
      </div>
    </div> -->
    <div class="agencyStatement_main_content">
      <div class="search_ipt">
        <input type="text" :placeholder="searchTxt" v-model="account">
        <img src="../../../img/daili/search.png" alt="" @click="manualSearch">
      </div>
      <div class="grids_box">
        <div class="grids_pieces">
          <p>{{baseData.tz_price}}</p>
          <p>投注总额</p>
        </div>

        <div class="grids_pieces">
          <p>{{baseData.cp_tz_price}}</p>
          <p>彩票投注金额</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.ty_tz_price}}</p>
          <p>体育投注金额</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.dz_tz_price}}</p>
          <p>电子投注金额</p>
        </div>

        <div class="grids_pieces">
          <p>{{baseData.win_price}}</p>
          <p>中奖金额</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.event_price}}</p>
          <p>活动礼金</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.team_fandian}}</p>
          <p>团队返点</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.team_win}}</p>
          <p>团队盈利</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.tz_count}}</p>
          <p>投注人数</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.reg_count}}</p>
          <p>注册人数</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.xiaji_count}}</p>
          <p>下级人数</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.team_price}}</p>
          <p>团队余额</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.first_pay_count}}</p>
          <p>首充人数</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.pay_count}}</p>
          <p>充值人数</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.pay_price}}</p>
          <p>充值金额</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.get_price}}</p>
          <p>提现金额</p>
        </div>
        <div class="grids_pieces">
          <p>{{baseData.daili_fandian}}</p>
          <p>代理返点</p>
        </div>
      </div>
    </div>
    <yd-actionsheet :items="timeOptions" v-model="choosedTime" class="changePeriod"></yd-actionsheet>
  </div>
</template>
<script>
import publicHead from '../../huiYuan/components/moreService/publicHead'

import { mapActions, mapState } from 'vuex'
export default {
  components: {
    publicHead
  },
  computed: {
    ...mapState('member', ['st_timeData'])
  },
  data() {
    return {
      funcName: '代理报表',
      chooseTimeText: '今天',
      choosedTimeIndex: 0,
      choosedTime: false,
      type: 0,
      baseData: '',
      account: '',
      userID: '',
      timeOptions: [],
      // accountOptions: ["全部","彩票", "体育"],
      accountOptions: ['代理报表'],
      choosed: 0,
      bgIsShow: false,
      optionsIsShow: false,
      defaultClass2: 'type_options',
      searchTxt: '请输入下级账号'
    }
  },
  mounted() {
    if (this.$route.params.username) {
      this.account = this.$route.params.username
      this.userID = this.$route.params.userID
    }
    this.getBaseData()
    this.initTimeData()
  },
  methods: {
    ...mapActions('agent', ['getDailiStaticData']),
    changeState() {
      this.choosedTime = true
    },
    getBaseData() {
      // 0为今天，1为昨天，2为本周，3为本月，4为上月
      this.$dialog.loading.open('正在加载中···')
      this.getDailiStaticData({
        search: this.account,
        user_id: this.userID,
        lasttime: this.type
      }).then(res => {
        this.baseData = res
        this.$dialog.loading.close()
      })
    },
    manualSearch() {
      this.getBaseData(this.type)
    },
    initTimeData() {
      this.timeOptions = Array.from(this.st_timeData).map(v => ({
        val: v[0],
        label: v[1],
        callback: item => {
          this.chooseTimeText = item.label
          this.type = item.val
          this.getBaseData()
        }
      }))
    },
    chooseType(n) {
      if (n == 2) {
        this.searchTxt = '账号查询'
      } else {
        this.searchTxt = '请输入下级账号'
      }
      this.choosed = n
      this.optionsIsShow = false
      this.bgIsShow = false
      this.getBaseData()
    },
    optionsShow() {
      this.bgIsShow = !this.bgIsShow
      setTimeout(() => {
        this.optionsIsShow = true
      }, 0)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../css/resources.scss';
.agencyStatement_main_body {
  height: 100%;
  width: 100%;
  background-color: #fff;
  .agencyStatement_main_content {
    .search_ipt {
      position: relative;
      width: 100%;
      // height: poTorem(34px);
      padding: poTorem(10px);
      background: #f3f3f3;
      line-height: poTorem(34px);
      input {
        border: none;
        outline: none;
        width: 100%;
        font-size: poTorem(17px);
        text-align: center;
        line-height: poTorem(34px);
        background-color: #fff;
        display: inline-block;
        border-radius: poTorem(5px);
      }
      img {
        width: poTorem(20px);
        height: poTorem(20px);
        position: absolute;
        top: poTorem(18px);
        right: poTorem(18px);
      }
    }
    .grids_box {
      width: 100%;
      @include start;
      flex-wrap: wrap;
      padding-top: poTorem(20px);
      .grids_pieces {
        width: 33%;
        margin-bottom: poTorem(30px);
        p {
          font-size: poTorem(15px);
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:first-child {
            color: $mainColor;
            line-height: poTorem(40px);
          }
          &:last-child {
            color: #666;
          }
        }
        &:nth-child(3n + 2),
        &:nth-child(2) {
          border-left: poTorem(1px) dashed #d3d3d3;
          border-right: poTorem(1px) dashed #d3d3d3;
        }
      }
    }
  }
  .account_type {
    position: fixed;
    top: 3rem;
    width: 100%;
    height: 100%;
    z-index: 20;
    background-color: rgba(0, 0, 0, 0.3);
    .type_options {
      @include between;
      flex-wrap: wrap;
      background-color: #fff;
      height: 3rem !important;
      overflow: hidden;
      transition: all 0.3s ease-out;
      p {
        width: poTorem(91px);
        height: poTorem(29px);
        font-size: poTorem(15px);
        line-height: poTorem(27px);
        border: 1px solid #ddd;
        text-align: center;
        border-radius: poTorem(3px);
        // margin: 0 poTorem(20px) 0 poTorem(40px);
        &:first-child {
          margin-left: poTorem(50px);
        }
        &:last-child {
          margin-right: poTorem(50px);
        }
      }
      .active {
        background: url(../../../img/account/choosed.png) no-repeat
          poTorem(70px) poTorem(8px);
        background-size: poTorem(20px) poTorem(20px);
        border-color: #e33939;
      }
    }
    .options_is_show {
      height: poTorem(115px);
    }
  }
}
</style>


