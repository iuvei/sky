<template>
  <yd-layout class="multi-play">

    <AppEmpty v-if="!gameList.length && showList"></AppEmpty>

    <yd-flexbox v-if="showList"
                v-for="(league, league_index) in gameList"
                :key="league_index"
                @click.native="gotoPlay(league)"
                class="game-item">
      <yd-flexbox-item class="league-name">{{league.league_name}}</yd-flexbox-item>
      <div class="schedule-num">{{league.game_cnt}}</div>
    </yd-flexbox>

    <yd-navbar v-if="!showList"
               slot="navbar"
               :title="cur_league_name"
               class="one-league-name"
               style="height:3rem">
      <div slot="right"
           @click="modifyFootballField({showList:true})">
        <img src="~img/football/more-game.png"
             alt=""
             style="width: .8rem;transform: rotateZ(180deg);">
      </div>
    </yd-navbar>
    <oneLeague v-if="!showList"
               :leagueId="league_id"></oneLeague>

  </yd-layout>
</template>

<script>
import debounce from "lodash/debounce";
import oneLeague from "./components/oneLeague";
import betting from "./components/footballTypeMultiItem";
import { mapActions, mapState } from "vuex";

export default {
  name: "footballTypeMulti",
  components: {
    oneLeague,
    betting
  },
  data() {
    return {
      league_id: "",
      cur_league_name: "",
      pullRefresh: true, // 标识符： 刷新  加载下一页
      next_time: "", // 时间分页
      league_id_current: "", // 联赛id多个以逗号隔开
      gameList: [] // 列表大对象
    };
  },
  computed: {
    ...mapState("football", [
      "render_one_league",
      "showList",
      "footer",
      "gameType",
      "playType",
      "timeCount",
      "zhgg_preview",
      "bet_data",
      "multiSelected"
    ])
  },
  mounted() {
    this.getGameList();
  },
  activated() {
    this.getGameList();
  },
  beforeDestroy() {},
  watch: {
    gameType() {
      // 清除下注
      // this.pullRefresh = true;
      this.modifyFootballField({ footer: false, multiSelected: [] });
      this.gameList = [];
      this.league_id_current = "";
      this.getGameList();
    },
    playType() {
      this.modifyFootballField({ footer: false, multiSelected: [] });
      this.gameList = [];
      this.getGameList();
    },
    // selectedKey  bet_data  保持一致
    bet_data(bet_data) {
      if (bet_data.length === 0) {
        this.modifyFootballField({
          footer: false,
          multiSelected: []
        });
        return;
      }
      const multiSelected = JSON.parse(JSON.stringify(this.multiSelected));
      if (bet_data.length !== multiSelected.length) {
        multiSelected.map((el, index) => {
          const flag = bet_data.some(
            item => el.includes(item.schedule_id) || el.is_all_method
          );
          if (!flag) {
            multiSelected.splice(index, 1);
          }
        });

        // console.error("multiSelected:",multiSelected)
        this.modifyFootballField({ multiSelected });
      }
    },

    "timeCount.getData"() {
      if (this.zhgg_preview && this.showList) {
        this.pullRefresh = true;
        this.getGameList();
      }
    }
  },
  methods: {
    ...mapActions("football", [
      "modifyFootballField",
      "queryComputed",
      "getSportMobileGameList",
      "getSportLeagueList2"
    ]),
    gotoPlay({ league_id, league_name }) {
      this.league_id = league_id;
      this.cur_league_name = league_name;
      this.modifyFootballField({
        render_one_league: league_id,
        showList: false
      });
    },
    refreshData() {
      this.pullRefresh = true;
      this.getGameList();
    },
    loadMore() {
      this.pullRefresh = false;
      this.getGameList();
    },
    getGameList: debounce(async function() {
      const params = {};
      if (this.pullRefresh) {
        params.league_id = this.league_id_current;
        params.start_time = "";
      } else {
        params.league_id = "";
        params.start_time = this.next_time;
      }

      // t: u d e  赔率:  涨  跌  平
      // 1X2 : 独赢    HC:让球  GL：大小   TGOE：单双
      // 对应半场，前面+H
      const data = (await this.getSportLeagueList2(params)) || {};
      // this.next_time = data.next_time;
      const gameList = data.result || [];
      // console.error(gameList);

      this.gameList = gameList;
      this.queryComputed(["reset"]);
    }, 300)
  }
};
</script>

<style lang="scss">
@import "~css/resources.scss";
.multi-play {
  background-color: #fff;
  .game-item {
    border-radius: 0.3rem;
    background-color: #f5f2f0;
    color: #453c35;
    margin: 0.7rem;
    padding-left: 0.7rem;
    line-height: 3rem;
  }
  .league-name {
    height: 3rem;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    /* autoprefixer: off */
    // -webkit-box-orient: vertical;
    /* autoprefixer: on */
  }
  .one-league-name {
    line-height: 3rem;
    background-color: #f5f5f5;
    // border-bottom: 1px solid #d2d2d2;
    padding: 0 1rem;
    background-color: #f5f5f5 !important;
    .yd-navbar-center-box {
      flex: 1;
      text-align: left;
      height: 3rem !important;
      margin-left: 0 !important;
      line-height: 3rem;
    }
    .yd-navbar-center {
      justify-content: flex-start;
    }
    .yd-navbar-center-title {
      font-size: 1rem !important;
      color: #000 !important;
    }
  }
  .schedule-num {
    width: 4rem;
    color: #453c35;
    background: rgba(233, 228, 226, 0.4);
    text-align: center;
    font-weight: 600;
  }
  .yd-list-loading svg {
    width: 2rem;
    height: 2rem;
  }
  .yd-badge {
    font-size: 1rem;
  }
  .yd-accordion {
    margin-bottom: 4rem;
  }
  .one-row-font {
    line-height: 3rem;
  }
  .one-color-green {
    color: #22ac38;
  }
  .bage-default {
    background-color: #ffffff;
    color: #000000;
  }
  .bage-active {
    background-color: $mainColor;
    color: #fff;
  }
}
</style>
