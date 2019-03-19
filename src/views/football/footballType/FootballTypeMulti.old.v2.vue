<template>
  <yd-layout class="multi-play">
    <yd-pullrefresh :callback="refreshData"
                    :show-init-tip="false"
                    ref="pullrefresh_ref"
                    class="refresh">
      <yd-infinitescroll :callback="loadMore"
                         ref="loadMore_ref">

        <yd-accordion accordion
                      class="yd-list"
                      slot="list">

          <AppEmpty v-if="!gameList.length"></AppEmpty>
          <yd-accordion-item v-for="(league, league_index) in gameList"
                             :key="league_index"
                             :title="league.league_name">

            <betting :gameKey="game_index"
                     :game="game"
                     v-for="(game, game_index) in league.schedule"
                     :key="game_index + '-' + game.schedule_id"></betting>

          </yd-accordion-item>

        </yd-accordion>

        <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
  </yd-layout>
</template>

<script>
import debounce from "lodash/debounce";
import betting from "./components/footballTypeMultiItem";
import { mapActions, mapState } from "vuex";

export default {
  name: "footballTypeMulti",
  components: {
    betting
  },
  data() {
    return {
      pullRefresh: true, // 标识符： 刷新  加载下一页
      next_time: "", // 时间分页
      league_id_current: "", // 联赛id多个以逗号隔开
      gameList: [] // 列表大对象
    };
  },
  computed: {
    ...mapState("football", [
      "footer",
      "gameType",
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
      this.pullRefresh = true;
      this.modifyFootballField({ footer: false, multiSelected: [] });
      this.gameList = [];
      this.league_id_current = "";
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
    // 当前的联盟
    gameList(gameList) {
      const data = gameList.map(e => e.league_id);
      this.league_id_current = data.join(",");
    },
    "timeCount.getData"() {
      if (this.zhgg_preview) {
        this.pullRefresh = true;
        this.getGameList();
      }
    }
  },
  methods: {
    ...mapActions("football", [
      "modifyFootballField",
      "queryComputed",
      "getSportMobileGameList"
    ]),
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
      const data = (await this.getSportMobileGameList(params)) || {};
      this.next_time = data.next_time;
      let gameList = data.result || [];
      // console.error(gameList);
      if (this.pullRefresh) {
        this.$refs.pullrefresh_ref &&
          this.$refs.pullrefresh_ref.$emit("ydui.pullrefresh.finishLoad");
        this.$refs.loadMore_ref &&
          this.$refs.loadMore_ref.$emit("ydui.infinitescroll.reInit");
      } else {
        this.$refs.loadMore_ref.$emit("ydui.infinitescroll.finishLoad");
        if (!gameList.length) {
          this.$refs.loadMore_ref.$emit("ydui.infinitescroll.loadedDone");
        }
        gameList = [...this.gameList, ...gameList];
      }

      this.gameList = gameList;
      this.queryComputed(["reset"]);
    }, 500)
  }
};
</script>

<style lang="scss">
.multi-play {
  background-color: #fff;
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
  .yd-accordion-head {
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    background-color: #f6f6f6;
    .yd-accordion-title {
      color: #000000;
      font-size: 1.2rem;
    }
  }
  .one-game {
    border: 1px solid #d2d2d2;
    border-radius: 0.3rem;
    margin: 1rem 0.5rem 0;
    text-align: center;
    &:last-child {
      margin: 1rem 0.5rem;
    }
    .one-game-header {
      color: #313131;
      padding: 0.3rem 0;
      background-color: #f6f6f6;
      .one-game-header-title {
        font-size: 1rem;
      }
      .one-game-header-time {
        font-size: 0.8rem;
      }
    }
    .one-table {
      font-size: 1rem;
      border-top: 1px solid #d2d2d2;
      & > .yd-flexbox-item:before,
      .one-table-left:before {
        content: "";
        position: absolute;
        z-index: 0;
        top: 0;
        right: 0;
        height: 100%;
        border-right: 1px solid #d9d9d9;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
      }
      .one-table-left {
        position: relative;
        width: 5rem;
        height: 3rem;
        line-height: 3rem;
      }
      .one-table-right {
        position: relative;
        width: 5rem;
        height: 3rem;
        line-height: 3rem;
        & .border-bottom-no {
          position: absolute;
          left: -1px;
          right: 0;
          border-bottom: 4px solid #fff;
        }
        & .border-bottom-no.more-game-open {
          background-color: #ffffff;
          line-height: 1.5rem;
          bottom: -2.8rem;
        }
      }
      .select-btn {
        position: relative;
        width: 100%;
        height: 3rem;
        line-height: 1.5rem;
        font-size: 0.9rem;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
      }
      .select-btn.selected {
        color: #e33939;
        border-color: #e33939;
        border-top: 1px solid #e33939;
        border-bottom: 1px solid #e33939;
        left: -1px;
      }
      .pv {
        width: 0.6rem;
        position: absolute;
        right: 0.2rem;
        top: 1.2rem;
      }
    }
  }
}
</style>
