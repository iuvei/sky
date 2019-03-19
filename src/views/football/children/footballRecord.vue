<template>
  <div class="footballRecord_main_body">

    <!-- <AppHeader :title='titleData[raceType]' :clickTitle="clickTitle" :clickCategory='clickCategory'>
      <span slot="right" class="title-right"> </span>
    </AppHeader> -->
    <!-- <FootballHeader title='足球'></FootballHeader> -->
    <AppHeader :title="title"
               :clickTitle="()=>{this.modelTitel = true}"
               :clickCategory='clickCategory'>
      <span slot="right"
            class="title-right">{{chooseTimeText}}</span>
    </AppHeader>
    <AppModel :show="modelTitel"
              @close="modelTitel=false">
      <div class="shadow"
           slot>
        <span v-for="(item, index) in sportTypeMap"
              :key="index"
              :class="{active: index==activeTitle}"
              @click="switchs(index,item)">{{item.name}}</span>
      </div>
    </AppModel>

    <!-- <AppMenu :data='items'></AppMenu> -->
    <yd-tab v-model="tab"
            :prevent-default="false"
            :item-click="itemClick">
      <yd-tab-panel v-for="(item,key) in items"
                    :label="item.label"
                    :key="key"
                    class="cent">
        <div class="empty"
             v-show="!showData">
          <img src="../../../img/bet_record/noRecords.png"
               alt="">
          <p>暂无记录</p>
          <router-link to='/betting'>
            <button>立即购买</button>
          </router-link>
        </div>
        <div v-for="(item,key) in data"
             :key="key"
             v-show="showData">
          <div class="info"
               @click="itemInfo(item,key)"
               v-for="(items,key) in item.bet_info"
               :key="key">
            <p>{{items.play_method}}</p>
            <p>{{items.team}}</p>
            <p>{{items.bet_content}}
              <span>@{{items.new_odds}}</span>
            </p>
            <p>实际盈亏
              <b>{{(items.win_price || 0).toFixed(2)}} 元</b>
            </p>
            <p>下注：
              <span>{{(items.price || 0).toFixed(2)}}</span> 元
              <b :class="items.status==0?'orange':items.status==1?'green':items.status==2?'red':''">{{items.status==0?'待开奖':items.status==1?'已中奖':items.status==2?'未中奖':items.status==3?'和局':items.status==4?'已撤单':'已结束'}}</b>
            </p>
          </div>
        </div>
      </yd-tab-panel>
    </yd-tab>
    <yd-actionsheet :items="timeOptions"
                    v-model="choosedTime"></yd-actionsheet>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import FootballHeader from "../components/FootballHeader";
export default {
  components: { FootballHeader },
  data() {
    return {
      title: "足球",
      data: [],
      showData: false,
      modelTitel: false,
      choosedTime: false,
      activeTitle: 0,
      chooseTimeText: "今天",
      next_time: "",
      // titleMap:[
      // ],
      tab: 0,
      items: [
        { label: "全部", type: "" },
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
            this.modifyFootballField({ lasttime: 0 });
            this.togetUserBetslip().then(ret => {
              this.data = ret.betslip;
              if (ret === 0) {
                this.data = [];
                this.showData = false;
                return;
              }
              this.showData = true;
              this.data = ret.betslip;
            });
          }
        },
        {
          label: "昨天",
          callback: () => {
            this.chooseTimeText = "昨天";
            this.modifyFootballField({ lasttime: 1 });
            this.togetUserBetslip().then(ret => {
              if (ret === 0) {
                this.data = [];
                this.showData = false;
                return;
              }
              this.showData = true;
              this.data = ret.betslip;
            });
          }
        },
        {
          label: "本周",
          callback: () => {
            this.chooseTimeText = "本周";
            this.modifyFootballField({ lasttime: 2 });
            this.togetUserBetslip().then(ret => {
              if (ret === 0) {
                this.data = [];
                this.showData = false;
                return;
              }
              this.showData = true;
              this.data = ret.betslip;
            });
          }
        },
        {
          label: "本月",
          callback: () => {
            this.chooseTimeText = "本月";
            this.modifyFootballField({ lasttime: 3 });
            this.togetUserBetslip().then(ret => {
              if (ret === 0) {
                this.data = [];
                this.showData = false;
                return;
              }
              this.showData = true;
              this.data = ret.betslip;
            });
          }
        },
        {
          label: "上月",
          callback: () => {
            this.chooseTimeText = "上月";
            this.modifyFootballField({ lasttime: 4 });
            this.togetUserBetslip().then(ret => {
              if (ret === 0) {
                this.data = [];
                this.showData = false;
                return;
              }
              this.showData = true;
              this.data = ret.betslip;
            });
          }
        }
      ]
    };
  },
  computed: {
    ...mapState("football", ["sportTypeMap", "sport_id", "status", "lasttime"]),
    title() {
      return this.sportTypeMap.filter(
        item => item.sport_id === this.sport_id
      )[0].name;
    }
  },
  mounted() {
    this.togetUserBetslip().then(ret => {
      if (ret === 0) {
        this.data = [];
        this.showData = false;
        return;
      }
      this.showData = true;
      this.data = ret.betslip;
    });
  },
  methods: {
    ...mapActions("football", ["modifyFootballField", "getUserBetslip"]),
    switchs(index, item) {
      this.title = item.name;
      this.modelTitel = false;
      this.activeTitle = index;
      this.modifyFootballField({ sport_id: item.sport_id });
    },
    async togetUserBetslip(request) {
      const ret = await this.getUserBetslip(request);
      this.next_time = ret.next_time;
      return ret;
    },
    itemClick(key) {
      this.modifyFootballField({ status: this.items[key].type });
      this.tab = key;
      this.togetUserBetslip().then(ret => {
        if (ret === 0) {
          this.data = [];
          this.showData = false;
          return;
        }
        this.showData = true;
        this.data = ret.betslip;
      });
    },
    itemInfo(item, key) {
      this.$router.push({
        name: "goucaijilu",
        params: { item, key }
      });
    },
    clickCategory() {
      this.choosedTime = true;
    }
  }
  // beforeRouteEnter(t, f, n) {
  //   n(vm => {});
  // },
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.footballRecord_main_body {
  background-color: #eee;
  // background-color: #fff;
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
  .title-right {
    font-size: 1rem;
    color: #fff;
    line-height: 1.5rem;
    background: url("~img/bet_record/today.png") no-repeat 100% 50%/1.2rem
      1.4rem;
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
    padding: 0 1rem;
    margin-bottom: 1rem;
    .info {
      margin-top: 0.5rem;
      background-color: #fff;
      border-radius: 0.3rem;
      padding: 0.5rem 1rem 0 1rem;
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
      }
    }
  }
}
</style>


<style lang="scss">
@import "../../../css/resources.scss";
.footballRecord_main_body {
  .shadow {
    span.active {
      border: solid 1px #e33939;
      background: no-repeat right bottom url(~img/football/title-active.png);
      background-size: poTorem(23px) poTorem(23px);
    }
  }
}
</style>
