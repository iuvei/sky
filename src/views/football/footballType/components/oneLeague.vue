<template>
  <div class="handle-render">
    <AppEmpty v-if="!league.league_name && !league.schedule"></AppEmpty>
    <!-- <div class="league-name" v-if="league.league_name">{{league.league_name}}</div> -->
    <!-- 让球大小玩法 -->
    <betting v-if="playType !== 5"
             class="schedule-betting"
             :gameKey="game_index"
             :game="game"
             :leagueName="league.league_name"
             v-for="(game, game_index) in league.schedule"
             :key="game_index + '-' + game.schedule_id"></betting>

    <!-- 冠军玩法 -->
    <champion v-if="playType === 5"
              :schedules="league.schedule"></champion>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import betting from "./footballTypeMultiItem";
import champion from "./footballTypeChampionItem";
import { mapActions, mapState } from "vuex";

export default {
  name: "one-league-render",
  components: {
    betting,
    champion
  },
  props: ["leagueId"],
  data() {
    return {
      league: {}
    };
  },
  computed: {
    ...mapState("football", [
      "playType",
      "render_one_league",
      "timeCount",
      "zhgg_preview",
      "showList"
    ]),
    league_id() {
      return this.leagueId;
    }
    // ...mapState("football", { league_id: "render_one_league", timeCount: 'timeCount', zhgg_preview: 'zhgg_preview' })
  },
  watch: {
    league_id() {
      this.getGameList();
    },
    "timeCount.getData"() {
      if (this.zhgg_preview && !this.showList) {
        this.getGameList();
      }
    }
  },
  mounted() {
    this.getGameList();
  },
  activated() {
    this.getGameList();
  },
  beforeDestroy() {},
  methods: {
    ...mapActions("football", [
      "queryComputed",
      "modifyFootballField",
      "getSportMobileGameList2"
    ]),
    getGameList: debounce(async function() {
      if (!this.leagueId) return;
      const params = {};
      params.league_id = this.league_id;

      const data = (await this.getSportMobileGameList2(params)) || {};
      const league = (data.result && data.result[0]) || {};
      // console.error(league);

      this.league = league;
      this.queryComputed(["reset"]);
    }, 300)
  }
};
</script>

<style lang="scss" scoped>
.handle-render {
  .league-name {
    line-height: 3rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #d2d2d2;
    padding: 0 1rem;
  }
  .schedule-betting {
    margin: 0.7rem;
  }
}
</style>
