<template>
  <div class="betRecord_main_body" id="main">
    <!-- 上拉刷新 -->
    <!-- <yd-pullrefresh :callback="pullRefresh" ref="pullRefresh" class="refresh" :show-init-tip="false"> -->
    <!-- 空白页面 -->
    <!-- <AppEmpty v-if="!data"></AppEmpty> -->
    <!-- 滚动加载 -->
    <!-- <yd-infinitescroll :callback="pullScroll" ref="infinitescroll" class="scoll"> -->
    <publicHead :title="accountOptions[choosed]" :type="1" :timeText="chooseTimeText" @chooseTimeShow="changeState" @pullDown="optionsShow" slot='list'></publicHead>
    <div class="account_type" v-show="bgIsShow" slot='list'>
      <div :class="[{options_is_show: optionsIsShow}, defaultClass2]">
        <p v-for="(item, index) in accountOptions" :key="index" @click="chooseType(index)" :class="{active: choosed==index}">{{item}}</p>
      </div>
    </div>
    <!-- <yd-infinitescroll :callback="pullScroll" ref="infinitescroll" class="scoll"> -->
    <!-- 彩票 -->
    <yd-tab class="betRecord" :callback="getData" v-show="this.choosed == 0" slot='list' v-model="cptype">
      <yd-tab-panel v-for="(item,key) in tabType" :label="item.label" :key="key" class="cont"></yd-tab-panel>
      <div class="empty" v-show="this.allData==0">
        <img src="../../../../img/bet_record/noRecords.png" alt="">
        <p>暂无记录</p>
        <router-link to='/betting'>
          <button>立即购买</button>
        </router-link>
      </div>
      <div class="hasContent" @click="toDetails(item)" v-for="(item, index) in allData" :key="index" v-show="this.allData != 0">
        <div class="left">
          <p>{{item.game_name}}</p>
          <p>{{item.tz_time}}</p>
        </div>
        <p class="center">{{item.qishu}}</p>
        <div class="right">
          <div>
            <p>-{{item.price}}</p>
            <!-- 0=待开奖, 1=已中奖 2=未中奖 3=撤单 4=追号 -->
            <p :class="[item.status==0?'wait':item.status==1?'win':item.status==3?'cancel':'default']">
              {{item.status==1?'赢'+item.win+'元':item.status==0?'待开奖':item.status==3?'已撤单':'未中奖'}}</p>
          </div>
          <div>
            <img src="../../../../img/bet_record/arrow.png" alt="">
          </div>
        </div>
      </div>
      <p class="all_present" v-show="this.allData!=0" @click="getMoreData">{{isAllPresent?'已显示全部':'查看更多'}}</p>
    </yd-tab>
    <!-- 体彩 -->
    <yd-tab v-model="tab" :prevent-default="false" :item-click="itemClick" v-show="this.choosed == 1" class="tabs betRecord" slot='list'>
      <yd-tab-panel v-for="(item,key) in items" :label="item.label" :key="key" class="cent">
        <div class="emptys" v-show="!showData">
          <img src="../../../../img/bet_record/noRecords.png" alt="">
          <p>暂无记录</p>
          <div @click='toBuyLottery(sportItem)'>
            <button>立即购买</button>
          </div>
        </div>
        <div v-for="(item,key) in data" :key="key" v-show="showData" class="list">
          <div class="info" @click="itemInfo(item,key)" v-if="item.game_type ===3">
            <p>{{ item.bet_info[0].sport_name + '-' + '综合过关'}}</p>
            <p style="display:inline-block">{{item.bet_info.length}}串1</p>
            <p style="display:inline-block;float:right">已结束：{{item.opened_result}}</p>
            <p>实际盈亏
              <b>{{(item.profit || 0).toFixed(2)}}</b>
            </p>
            <p>下注：
              <span>{{(item.bet_info[0].price || 0).toFixed(2)}}</span> 元
              <b :class="item.status==0?'orange':item.status==1?'green':item.status==2?'red':''">{{item.status==0?'待开奖':item.status==1?'已中奖':item.status==2?'未中奖':item.status==3?'和局':item.status==4?'已撤单':item.status==5?'危险球判定中':'危险球撤单'}}</b>
            </p>
          </div>
          <div class="info" @click="itemInfo(item,key)" v-else>
            <p>{{item.bet_info[0].sport_name + '-' + item.bet_info[0].play_method}}</p>
            <p>{{item.bet_info[0].team}}</p>
            <p>{{item.bet_info[0].bet_content}}
              <span>@{{item.bet_info[0].new_odds}}</span>
            </p>
            <p>实际盈亏
              <b>{{(item.profit || 0).toFixed(2)}}</b>
            </p>
            <p>下注：
              <span>{{(item.bet_info[0].price || 0).toFixed(2)}}</span> 元
              <b :class="item.status==0?'orange':item.status==1?'green':item.status==2?'red':''">{{item.status==0?'待开奖':item.status==1?'已中奖':item.status==2?'未中奖':item.status==3?'和局':item.status==4?'已撤单':'已结束'}}</b>
            </p>
          </div>
        </div>
      </yd-tab-panel>
    </yd-tab>

    <!-- 竟彩 -->
    <JingcaiRecord v-if="this.choosed == 5" :choosedTimeIndex="choosedTimeIndex" :choosedTime="choosedTime"></JingcaiRecord>

    <!-- 电子游戏记录 -->
    <yd-tab v-model="dzyxTagIdx" class="betRecord" :callback="getyx" v-show="this.choosed == 2 || this.choosed == 3 || this.choosed == 4 " slot='list'>
      <yd-tab-panel v-for="(item,key) in tabTypedzyx" :label="item.menu" :key="key" class="cont"></yd-tab-panel>
      <div class="empty" v-show="this.allData==0">
        <img src="../../../../img/bet_record/noRecords.png" alt="">
        <p>暂无记录</p>
        <div @click="toOpen(dzyxItem)">
          <button>立即购买</button>
        </div>
      </div>
      <div v-for="(item,key) in allData" :label="item.label" :key="key" class="cent">
        <div class="list">
          <div class="info">
            <p>{{item.game_name}}</p>
            <p style="display:inline-block;float:right"></p>
            <p>实际盈亏
              <b class='wait' v-if="item.win <0">{{item.win}}元</b>
              <b class='win' v-else>{{item.win}}元</b>
            </p>
            <p>下注：
              <span>{{item.tz_price}}</span>元
              <b class='font_sj'>{{item.tz_time}}</b>
            </p>
            <p class='font_ddh'>订单号:{{item.dingdan}}</p>
          </div>
        </div>
      </div>

      <p class="all_present" v-show="this.allData!=0" @click="getMoreDataYx">{{isAllPresent?'已显示全部':'查看更多'}}</p>
    </yd-tab>
    <!-- <span slot="doneTip" id="doneTip" :style="(choosed===0 && this.allData==0)?'display:none':(choosed===1 && !showData)?'display:none':''">没有数据啦</span> -->
    <!-- </yd-infinitescroll> -->
    <!-- </yd-pullrefresh> -->
    <yd-actionsheet :items="timeOptions" v-model="choosedTime" class="changePeriod"></yd-actionsheet>
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import publicHead from "./publicHead";
import JingcaiRecord from "./betRecord/jingcaiRecord";
import { setTimeout } from "timers";

export default {
  components: {
    publicHead,
    JingcaiRecord
  },
  data() {
    return {
      dzyxTagIdx: 0, // 游戏 tab 索引
      dh_type: "", // 电子 棋牌 捕鱼
      accountOptions: ["彩票", "皇冠体育", "电子", "棋牌", "捕鱼", "竟彩"],
      bgIsShow: false,
      optionsIsShow: false,
      defaultClass2: "type_options",
      choosedTime: false,
      // choosed: 0,
      chooseTimeText: "今天",
      choosedTimeIndex: 0,
      type: 0,
      cptype: 0,
      dzyxtype: 0,
      tab: 0,
      allData: [],
      waitData: [],
      winData: [],
      chaseData: [],
      cancleData: [],
      isAllPresent: false,
      data: [],
      tag: "",
      next_time: "",
      tabswitch: true,
      showData: false,
      lockMark: false,
      isFirst: 1,
      pageID: 0,
      dataCount: 30,
      totalNum: 0,
      tabTypedzyx: [],
      tabType: [
        // 0=全部, 1=追号 2=中奖 3=待开奖 4=撤单 5=未中奖
        { label: "全部", type: 0 },
        { label: "待开奖", type: 3 },
        { label: "已中奖", type: 2 },
        { label: "追号", type: 1 },
        { label: "撤单", type: 4 }
      ],

      items: [
        { label: "全部", type: "-1" },
        { label: "待开奖", type: 0 },
        { label: "已中奖", type: 1 },
        { label: "未中奖", type: 2 },
        { label: "撤单", type: 4 }
      ],
      timeOptions: [
        {
          label: "今天",
          callback: () => {
            this.chooseTimeText = "今天";
            this.choosedTimeIndex = 0;
            this.modifyFootballField({ lasttime: 0 });
            this.pageID = 0;

            this.getAllData();
          }
        },
        {
          label: "昨天",
          callback: () => {
            this.chooseTimeText = "昨天";
            this.choosedTimeIndex = 1;
            this.modifyFootballField({ lasttime: 1 });
            this.pageID = 0;
            this.getAllData();
          }
        },
        {
          label: "本周",
          callback: () => {
            this.chooseTimeText = "本周";
            this.choosedTimeIndex = 2;
            this.modifyFootballField({ lasttime: 2 });
            this.pageID = 0;
            this.getAllData();
          }
        },
        {
          label: "本月",
          callback: () => {
            this.chooseTimeText = "本月";
            this.choosedTimeIndex = 3;
            this.modifyFootballField({ lasttime: 3 });
            this.pageID = 0;
            this.getAllData();
          }
        },
        {
          label: "上月",
          callback: () => {
            this.chooseTimeText = "上月";
            this.choosedTimeIndex = 4;
            this.modifyFootballField({ lasttime: 4 });
            this.pageID = 0;
            this.getAllData();
          }
        }
      ]
    };
  },
  computed: {
    ...mapState(["betRecordsType"]),
    ...mapState("football", ["sportTypeMap", "sport_id", "status", "lasttime"]),
    choosed: {
      get() {
        return this.betRecordsType;
      },
      set(betRecordsType) {
        this.setBetRecordsType(betRecordsType);
      }
    },
    title() {
      return this.sportTypeMap.filter(
        item => item.sport_id === this.sport_id
      )[0].name;
    },
    sportItem() {
      return this.$store.state.sportItem;
    },
    dzyxItem() {
      return this.$store.state.dzyxItem;
    }
  },
  activated() {
    if (this.$route.params.fromOutside) {
      // this.choosed = 0;
      this.chooseTimeText = "今天";
      this.choosedTimeIndex = 0;
      this.modifyFootballField({ lasttime: 0 });
      this.chooseType(this.choosed);
    } else {
      // this.choosed = this.$store.state.betRecordsType
      // this.pageID = 0
      // this.chooseType(this.choosed)
    }
  },
  watch: {},
  methods: {
    ...mapActions("football", ["modifyFootballField", "getUserBetslip"]),
    ...mapActions(["setBetRecordsType"]),
    ...mapMutations("youxi", ["SET_GMGAME_TAG"]),
    // switchs(index, item) {
    //   this.title = item.name
    //   this.modelTitel = false
    //   this.activeTitle = index
    //   this.modifyFootballField({ sport_id: item.sport_id })
    // },
    async pullRefresh() {
      this.pageID = 0;
      this.getAllData();
      this.$refs.pullRefresh.$emit("ydui.pullrefresh.finishLoad");
    },
    async pullScroll() {
      if (this.lockMark) {
        return;
      }
      this.lockMark = true;
      if (this.choosed === 0) {
        this.pageID++;
        this.$ajax("request", {
          ac: "getUserTouzhuLog",
          type: this.type,
          gameid: 0,
          pageid: this.pageID,
          lasttime: this.choosedTimeIndex
        }).then(res => {
          // if (!res) {
          //   this.$refs.infinitescroll.$emit("ydui.infinitescroll.loadedDone");
          //   return;
          // }
          if (res.length != 30) {
            this.isAllPresent = true;
            this.$refs.infinitescroll.$emit("ydui.infinitescroll.loadedDone");
            return;
          }
          this.allData = this.allData.concat(res);
          setTimeout(() => {
            this.lockMark = false;
            this.$refs.infinitescroll.$emit("ydui.infinitescroll.finishLoad");
          }, 1000);
        });
      } else {
        const ret = await this.togetUserBetslip({
          start_time: this.next_time
        });
        if (!ret) {
          this.$refs.infinitescroll.$emit("ydui.infinitescroll.loadedDone");
          return;
        }
        this.data = [...this.data, ...ret.betslip];
        setTimeout(() => {
          this.lockMark = false;
          this.$refs.infinitescroll.$emit("ydui.infinitescroll.finishLoad");
        }, 1000);
      }
    },
    async togetUserBetslip(request) {
      const ret = await this.getUserBetslip(request);
      this.next_time = ret.next_time;
      return ret;
    },
    // 跳转对应体彩
    toBuyLottery(item) {
      if (item.enable == 2) {
        this.$dialog.toast({ mes: "该彩种正在维护中···", timeout: 500 });
      } else {
        if (item.game_name === "足球") {
          this.$store.commit("football/FOOTBALL_SET_SPORT_ID", item.game_id);
        }
        this.$router.push({
          name: item.js_tag,
          params: {
            lotter_id: item.game_id,
            name_tag: item.tag,
            game_name: item.game_name,
            js_tag: item.js_tag,
            speed: item.speed,
            isHome: true,
            play_type: item.play_type
          }
        });
      }
    },
    // 跳转对应游戏
    toOpen(item) {
      this.$router.push({
        name: "youxi",
        params: {
          pt_id: item.pt_id,
          pt_name: item.pt_name
        }
      });
      this.SET_GMGAME_TAG(item.tag);
    },
    // 体彩
    itemClick(key) {
      this.modifyFootballField({ status: this.items[key].type });
      this.tab = key;
      this.togetUserBetslip().then(ret => {
        if (!ret) {
          this.data = [];
          this.showData = false;
          document.getElementById("main").style.backgroundColor = "#fff";
          return;
        }
        document.getElementById("main").style.backgroundColor = "#eee";
        this.showData = true;
        this.data = ret.betslip;
      });
    },
    itemInfo(item, key) {
      this.$router.push({
        name: "footballDetails",
        params: { item, key }
      });
    },
    clickCategory() {
      this.choosedTime = true;
    },
    // 游戏名称菜单
    getNameMenu() {
      this.$ajax("request", {
        ac: "GetEleMenuList"
      }).then(res => {
        if (this.choosed == 2) {
          this.tabTypedzyx = res.filter(el => el.type == 1);
        } else if (this.choosed == 3) {
          this.tabTypedzyx = res.filter(el => el.type == 2);
        } else {
          this.tabTypedzyx = res.filter(el => el.type == 3);
        }
        this.tabTypedzyx = [{ menu: "全部", tag: "" }, ...this.tabTypedzyx];
      });
    },

    // 电子,棋牌,捕鱼数据
    getDatayx() {
      this.allData = [];
      this.pageID = 0; // 切换(全部导航时)初始化
      document.getElementById("main").style.backgroundColor = "#fff";
      const tag =
        (this.tabTypedzyx[this.dzyxTagIdx] &&
          this.tabTypedzyx[this.dzyxTagIdx].tag) ||
        "";
      this.$ajax("request", {
        ac: "GetWebUserTouzhuLog",
        tag,
        pageid: this.pageID,
        lasttime: this.choosedTimeIndex,
        type: this.dh_type
      }).then(res => {
        if (!res.length) {
          document.getElementById("main").style.backgroundColor = "#fff";
          this.$dialog.loading.close();
          return;
        }
        document.getElementById("main").style.backgroundColor = "#eee";
        this.allData = res;
        this.pageID++;
        this.$dialog.loading.close();
      });
    },
    // 查看更多记录
    getMoreDataYx() {
      // this.dataCount += 30
      this.isFirst = 0;
      // this.pageID++
      if (!this.isAllPresent) {
        this.$dialog.loading.open(" ");
        this.isAllPresent = false;
        this.$ajax("request", {
          ac: "GetWebUserTouzhuLog",
          tag: this.tag,
          count: 20,
          pageid: this.pageID,
          lasttime: this.choosedTimeIndex,
          type: this.dh_type
        }).then(res => {
          if (res.length != 20) {
            this.isAllPresent = true;
          }
          if (res === 0) {
            this.$dialog.loading.close();
            return;
          }
          this.allData = this.allData.concat(res);
          if (res == null) {
            return this.pageID;
          }
          this.pageID++;
          this.$dialog.loading.close();
        });
      }
    },
    // 彩票投注记录
    getAllData() {
      if (this.choosed === 5) return false;
      this.$dialog.loading.open(" ");
      this.isAllPresent = false;
      if (this.choosed === 0) {
        this.$ajax("request", {
          ac: "getUserTouzhuLog",
          type: this.type,
          gameid: 0,
          pageid: this.pageID,
          lasttime: this.choosedTimeIndex
        }).then(res => {
          res = res || [];
          if (res.length != 30) {
            this.isAllPresent = true;
          }
          this.allData = res;
          this.$dialog.loading.close();
        });
      } else if (this.choosed === 1) {
        this.togetUserBetslip().then(ret => {
          ret = ret || [];
          this.data = ret.betslip;
          if (!ret) {
            this.data = [];
            this.showData = false;
            document.getElementById("main").style.backgroundColor = "#fff";
            return;
          }
          document.getElementById("main").style.backgroundColor = "#eee";
          this.showData = true;
          this.data = ret.betslip;
        });
      } else if (
        this.choosed === 2 ||
        this.choosed === 3 ||
        this.choosed === 4
      ) {
        // this.tag = this.tabTypedzyx.tag
        // this.tag = this.tabTypedzyx.filter(el => el.tag == this.tag)
        this.getDatayx();
        this.getNameMenu();
      }
    },
    // 彩票导航(全部 ,...)
    getData(l, i) {
      this.type = this.tabType[i].type;
      this.pageID = 0;
      this.getAllData();
    },
    // 游戏导航(全部 ,...)
    getyx(l, i) {
      this.dzyxtype = this.tabTypedzyx[i].type;
      this.tag = this.tabTypedzyx[i].tag;
      this.isAllPresent = false;
      this.getDatayx();
      // this.getNameMenu()
    },
    // 彩票投注记录
    getMoreData() {
      this.dataCount += 30;
      this.isFirst = 0;
      this.pageID++;
      if (!this.isAllPresent) {
        this.$dialog.loading.open(" ");
        this.isAllPresent = false;
        this.$ajax("request", {
          ac: "getUserTouzhuLog",
          type: this.type,
          gameid: 0,
          pageid: this.pageID,
          lasttime: this.choosedTimeIndex
        }).then(res => {
          if (res.length != 30) {
            this.isAllPresent = true;
          }
          if (res === 0) {
            this.$dialog.loading.close();
            return;
          }
          this.allData = this.allData.concat(res);
          this.$dialog.loading.close();
        });
      }
    },
    toDetails(n) {
      this.$router.push({
        name: "goucaixiangqing",
        params: n
      });
    },
    changeState() {
      this.choosedTime = true;
    },
    // 头部玩法(彩票, 电子, 棋牌,捕鱼)
    chooseType(n) {
      // console.error('chooseType_n', n)

      // 电子 棋牌 捕鱼 type 分别为  1 2 3
      if (n >= 2) {
        this.dh_type = n - 1;
        // console.error('this.dh_type', this.dh_type)
      }
      this.setBetRecordsType(n);
      // if (n === 0) {
      //     this.tabswitch = true
      // } else {
      //     this.tabswitch = false
      // }
      // this.choosed = n;

      if (n === 0) {
        // console.error('this.cptype', this.cptype)

        this.cptype = 0;
      } else if (n === 1) {
        this.tab = 0;
      } else if (n > 1 && n < 5) {
        this.dzyxTagIdx = 0;
      }
      this.optionsIsShow = false;
      this.bgIsShow = false;
      this.pageID = 0;
      // console.error('this.pageIDthis.pageID', this.pageID)

      document.getElementById("main").style.backgroundColor = "#fff";
      this.getAllData();
      this.pageID++;
    },
    optionsShow() {
      this.bgIsShow = !this.bgIsShow;
      setTimeout(() => {
        this.optionsIsShow = true;
      }, 0);
    },
    overType(arr) {
      const array = arr.bet_info;
      let n = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i].status != 0) {
          n++;
        }
      }
      return n;
    }
  }
};
</script>
<style lang="scss">
.betRecord_main_body {
  height: inherit;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .refresh,
  & .refresh > div,
  .scoll {
    height: inherit;
  }
  .yd-tab-panel {
    background-color: rgba(0, 0, 0, 0) !important;
  }
}
</style>
<style lang="scss" scoped>
@import "~css/resources.scss";

.betRecord {
  flex: 1;
  height: inherit;
  display: flex;
  flex-direction: column;
  .yd-tab-box,
  .yd-tab-nav-nomal {
    width: 100%;
  }
  .cont {
    // padding-bottom: 3rem;
  }
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
  .hasContent {
    @include around;
    padding: poTorem(20px);
    border-bottom: poTorem(1px) solid #eee;
    .left {
      width: 33%;
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
      @include center;
      width: 33%;
      font-size: poTorem(12px);
      color: #313131;
    }
    .right {
      width: 33%;
      @include end;
      div {
        float: left;
        height: poTorem(37px);
        &:first-child {
          font-size: poTorem(13px);
          p {
            &:first-child {
              color: #e33939;
              text-align: center;
            }
          }
          .default {
            color: #a0a0a0;
            height: poTorem(37px);
            line-height: poTorem(37px);
          }
          .wait {
            color: $mainColor;
            height: poTorem(37px);
            line-height: poTorem(37px);
          }
          .win {
            color: #097c25;
            height: poTorem(37px);
            line-height: poTorem(37px);
          }
          .cancel {
            color: #a0a0a0;
            height: poTorem(37px);
            line-height: poTorem(37px);
          }
        }
        &:last-child {
          // line-height: poTorem(37px);
          position: relative;
        }
        img {
          width: poTorem(16px);
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
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
}
.account_type {
  position: fixed;
  top: 3rem;
  width: 100%;
  height: 100%;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.3);
  .type_options {
    //  @include between;
    @include around;
    flex-wrap: wrap;
    background-color: #fff;
    height: 6rem !important;
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
      &:nth-child(1) {
        // margin-left: poTorem(100px);
      }
      &:nth-child(2) {
        // margin-right: poTorem(100px);
      }
    }
    .active {
      background: url(../../../../img/account/choosed.png) no-repeat
        poTorem(70px) poTorem(8px);
      background-size: poTorem(20px) poTorem(20px);
      border-color: #e33939;
    }
  }
  .options_is_show {
    height: poTorem(115px);
  }
}
.emptys {
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
.title-right {
  font-size: 1rem;
  color: #fff;
  line-height: 1.5rem;
  background: url("~img/bet_record/today.png") no-repeat 100% 50%/1.2rem 1.4rem;
  width: 3.75rem;
  height: 1.5rem;
  // background-size: poTorem(23px) poTorem(23px);
}
.shadow {
  @include around;
  flex-wrap: wrap;
  width: 100%;
  height: poTorem(120px);
  padding-top: poTorem(17px);
  padding-left: poTorem(10px);
  background: #fff;
  span {
    @include center;
    height: poTorem(35px);
    width: poTorem(110px);
    margin: 0 poTorem(6px) poTorem(17px);
    border-radius: poTorem(5px);
    font-size: poTorem(17px);
    color: #1e2123;
    font-weight: bold;
    border: 1px solid #d2d3d5;
  }
}
.cent {
  // padding: 0 1rem;
  // margin-bottom: 1rem;
  .list {
    padding: 0.5rem 1rem 0;
    background-color: #eee;
    &:last-child {
      padding-bottom: 0.5rem;
    }
  }
  .info {
    background-color: #fff;
    border-radius: 0.3rem;
    padding: 0.5rem 1rem 0 1rem;
    margin-bottom: 0.5rem;
    &:last-child {
      margin-bottom: 0rem;
    }
    .font_ddh {
      color: #a0a0a0;
    }
    p {
      font-size: 1rem;
      line-height: 2rem;
      &:last-child {
        border-top: 1px solid #d2d2d2;
        line-height: 3rem;
      }
      span {
        color: #e33939;
      }
      b {
        float: right;
        font-weight: 400;
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
      .wait {
        color: #e33939;
      }
      .win {
        color: #097c25;
      }
      .font_sj {
        color: #a0a0a0;
      }
    }
  }
}
</style>


