<template>
  <div class="football-index">
    <FootballHeader :clickRouter="clickRouter"
                    :clickCategory='clickCategory'
                    :hiddenTime="true">
      <template slot="title">
        <span v-for="(item, index) in gameTypeMap.slice(0, 3)"
              :key="index"
              :class="{active: index == gameType}"
              @click="switchs(index,item)">
          <i>{{item.label}}</i>
        </span>
      </template>
    </FootballHeader>

    <!-- <FootballHeaderTitle :show='showTitleList' @close="()=>{this.showTitleList=false}"></FootballHeaderTitle> -->
    <FootballHeaderCategory :show='showCategorg'
                            @close="()=>{this.showCategorg=false}"></FootballHeaderCategory>

    <!-- 选盘 -->
    <yd-flexbox class="select-box-hk">
      <yd-flexbox-item style="border-right: 1px solid #d2d2d2;">
        <select v-model="selectPlate">
          <option value="0">香港盘</option>
          <option value="1">欧洲盘</option>
          <!-- <option value="2">马来盘</option>
          <option value="3">印尼盘</option> -->
        </select>
        <img src="/assets/triangle-up.svg"
             alt=""
             style="width:1rem;vertical-align: -.2rem;" />
      </yd-flexbox-item>
      <yd-flexbox-item @click.native="refreshClick">
        <FootballTime class="time-color"></FootballTime>
        <img src="~img/football/refresh.png"
             alt=""
             style="width: 1.5rem;vertical-align: -.4rem;">
        <!-- <i class="yd-icon-refresh"></i> -->
      </yd-flexbox-item>
    </yd-flexbox>

    <FootballMenu v-show="gameType!=0"></FootballMenu>

    <!-- 排序 -->
    <yd-flexbox class="select-box-sort">
      <yd-flexbox-item v-show="isShowDate">
        <select v-model="selectDate">
          <option value="">请选择日期</option>
          <option v-for="el in dates"
                  :key="el"
                  :value="el">{{el}}</option>
        </select>
      </yd-flexbox-item>
      <yd-flexbox-item v-show="isShowOrder">
        <select v-model="selectOrder">
          <option value="0">时间排序</option>
          <option value="1">联盟排序</option>
          <option value="2">热门排序</option>
        </select>
      </yd-flexbox-item>
    </yd-flexbox>

    <section class="view"
             :class="{'up-footer':footer, zhgg_preview: playType === 4 && zhgg_preview}">
      <keep-alive>
        <router-view class="football-child"></router-view>
      </keep-alive>
    </section>

    <FootballFooter></FootballFooter>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import components from "./components/index";
import FootballTime from "./components/FootballTime";
export default {
  name: "football-index",
  components: { ...components, FootballTime },
  data() {
    return {
      showTitleList: false,
      showCategorg: false
    };
  },
  computed: {
    ...mapState("football", [
      "showList",
      "gameType",
      "gameTypeMap",
      "playType",
      "playTypeMap",
      "min_stake",
      "footer",
      "zhgg_preview",
      "sub_route",
      "bet_odds",
      "date",
      "dates",
      "order"
    ]),
    selectPlate: {
      get() {
        return this.bet_odds;
      },
      set(bet_odds) {
        this.modifyFootballField({ bet_odds });
      }
    },
    selectDate: {
      get() {
        return this.date;
      },
      set(date) {
        this.modifyFootballField({ date });
        this.queryComputed(["reset", "getData"]);
      }
    },
    selectOrder: {
      get() {
        return this.order;
      },
      set(order) {
        this.modifyFootballField({ order });
        this.queryComputed(["reset", "getData"]);
      }
    },
    isShowDate() {
      let flag = false;
      if (
        (this.gameType === 1 && this.playType === 4) ||
        (this.gameType === 2 && this.playType !== 5)
      ) {
        flag = true;
      }
      flag = flag && this.showList;
      return flag;
    },
    isShowOrder() {
      let flag = true;
      if (this.playType === 5) {
        flag = false;
      }
      flag = flag && this.showList;
      return flag;
    }
  },
  watch: {
    gameType() {
      this.modifyFootballField({ showList: true, leagueIds: [] })
    },
    playType() {
      this.modifyFootballField({ showList: true, leagueIds: [] })
    },
    $route(to, from) {
      // 初始化底部信息
      const other = ["zhggPreview", "footballAllPlay"];
      if (other.includes(to.name) || other.includes(from.name)) return;
      const obj = {
        money: this.min_stake,
        footer: false,
        is_better: true
      };
      if (
        [
          "/football/multi",
          "/football/waves",
          "/football/htcs",
          "/football/fmatch",
          "/football/total",
          "/football/champion"
        ].includes(to.path)
      ) {
        obj.sub_route = to.path;
      }
      this.modifyFootballField(obj);
    }
  },
  activated() {
    const sportId = this.$route.params.lotter_id;
    if (sportId) this.$store.commit("football/FOOTBALL_SET_SPORT_ID", sportId);

    // 默认今日赛事
    if (!this.$route.fullPath.includes("/football")) {
      const obj = {
        gameType: 1,
        playType: 0
      };
      this.modifyFootballField(obj);
      // this.$router.push("/football/multi");
    }
    this.$router.replace(this.sub_route);
  },
  created() {},
  methods: {
    ...mapActions("football", [
      "modifyFootballField",
      "queryComputed",
      "changeTitle"
    ]),
    switchs(key, item) {
      this.changeTitle({ key, item });
    },
    refreshClick() {
      // this.getBet()
    },
    clickRouter() {
      if (!this.showList) return this.modifyFootballField({ showList: true });
      this.$router.push("/home");
    },
    clickTitle() {
      if (this.showCategorg) return;
      this.showTitleList = true;
    },
    clickCategory() {
      if (this.showTitleList) return;
      this.showCategorg = true;
    }
  },
  beforeRouteEnter(t, f, n) {
    n(vm => {
      // vm.$router.push("/football/multi");
      vm.queryComputed(["reset", "getData"]);
    });
  },
  beforeRouteUpdate(t, f, n) {
    this.queryComputed(["reset"]);
    n();
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.football-index {
  font-size: 1rem;
  .time-color {
    color: $mainColor;
  }
  .view {
    flex: 1;
    display: flex;
    overflow-y: auto;
    background-color: #fff;
    .football-child {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
  .up-footer {
    height: calc(100% - 9.8rem);
  }
  .up-footer.zhgg_preview {
    height: calc(100% - 7rem);
  }
}
</style>

<style lang="scss">
.football-index {
  .select-box-hk {
    height: 3rem;
    background-color: #f5f5f5;
    text-align: center;
    border-bottom: 1px solid #d2d2d2;
    select {
      // width:100%;
      border: none;
    }
  }
  .select-box-sort {
    background-color: #ffffff;
    .yd-flexbox-item {
      padding: 1rem 1rem 0;
    }
    select {
      width: 100%;
      padding: 0.7rem;
      border-radius: 0.3rem;
    }
  }
}
.yd-accordion-head-arrow:after {
  content: "\e641";
  font-family: "iconfont";
  font-size: 1.2rem;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.2rem;
  border: none;
  text-align: center;
  transform: rotate(0deg);
}
.yd-accordion-head-arrow.yd-accordion-rotated:after {
  transform: rotate(-180deg);
}
.yd-list-donetip {
  font-size: 0.8rem;
}
</style>



