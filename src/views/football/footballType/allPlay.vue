<template>
  <div class="all-play">
    <app-header title="所有玩法">
      <template slot="right">
        <i @click="refreshClick"
           class="yd-icon-refresh"></i>
      </template>
    </app-header>
    <!-- <FootballMenu></FootballMenu> -->

    <div class="board">
      <div class="league-name">{{allPlayTeam.league_name}}</div>
      <div v-if="allPlayTeam.team_score.includes('-')"
           class="team-name team-score">
        <span class="team-a team-score">{{allPlayTeam.team_score.split('-')[0]}}</span>
        <span class="team-b team-score">{{allPlayTeam.team_score.split('-')[1]}}</span>
      </div>
      <div class="team-name">
        <span class="team-a">{{allPlayTeam.h}}</span>
        <span class="team-vs">vs</span>
        <span class="team-b">{{allPlayTeam.v}}</span>
      </div>
      <div class="rolling-time">{{moment()}}</div>
    </div>

    <div class="other-block">
      <yd-accordion accordion
                    class="yd-list">
        <AppEmpty v-if="!gameKeys.length"></AppEmpty>
        <yd-accordion-item v-for="(el,key) in games"
                           :key="key">
          <div slot="title"
               v-html="getTitle(key)"></div>
          <betting :gameKey="key"
                   :game="el"></betting>
        </yd-accordion-item>
      </yd-accordion>
    </div>
    <FootballFooter></FootballFooter>
  </div>

</template>
<script>
import dayjs from "dayjs";
import debounce from "lodash/debounce";

import { mapActions, mapState } from "vuex";
import { playPMs, getItem } from "./components/allPlay/allPlay.const.js";
// import FootballMenu from './components/allPlay/allPlayMenu'
import betting from "./components/allPlay/betting";
import FootballFooter from "../components/FootballFooter";
// import games from './components/allPlay/allplay.test.js'

export default {
  name: "footballAllPlay",
  components: {
    // FootballMenu,
    betting,
    FootballFooter
  },
  data() {
    return {
      begin_time: "",
      rolling_time: "",
      games: {}
    };
  },
  computed: {
    ...mapState("football", ["allPlayType", "allPlayTeam"]),
    gameKeys() {
      const data = Object.keys(this.games);
      return data;
    }
  },
  activated() {
    this.getBet();
  },
  deactivated() {},
  watch: {
    allPlayType() {
      this.getBet();
    }
  },
  methods: {
    ...mapActions("football", ["modifyFootballField", "getSportAllBetMethod"]),
    getTitle(key) {
      const item = getItem(playPMs, key);
      let str = item.name;
      if (item.target) {
        str += " - <i class='subTitle-orange'>" + item.target + "</i>";
      }
      return str;
    },
    moment() {
      if (this.rolling_time) return "滚球     " + this.rolling_time;
      if (Number.isNaN(this.begin_time * 1)) return this.begin_time;
      return dayjs(this.begin_time * 1).format("HH:mm");
    },
    refreshClick() {
      this.getBet();
    },
    getBet: debounce(async function() {
      this.games = [];
      // this.games = games // 测试数据
      const data = await this.getSportAllBetMethod();
      this.begin_time = data.begin_time;
      this.rolling_time = data.rolling_time;
      this.games = data.bet_data;
      // console.error('后台数据')
    }, 500)
  }
};
</script>
<style lang="scss">
@import "../../../css/resources.scss";
.all-play {
  // .yd-accordion {
  //   margin-bottom: 4rem;
  // }
  .yd-accordion-head {
    padding: 0.7rem;
    background-color: #f6f6f6;
  }
  .yd-accordion-title {
    color: #000;
    font-size: 1.2rem;
  }
  .subTitle-orange {
    color: $mainColor;
  }
}
</style>

<style lang="scss" scoped>
@import "../../../css/resources.scss";
.all-play {
  .head .head_con .switch i {
    //  background-image:url(~img/football/refresh.png);
    background-image: none;
    font-size: 1.25rem;
    color: #ffffff;
  }
  .board {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 10rem;
    background: url("/assets/goucai/football_race.jpg") no-repeat;
    background-size: 100% 100%;
    font-size: 1rem;
    color: #fff;
    font-weight: 500;
    .league-name {
      font-size: 1.2rem;
    }
    .team-score {
      text-align: center !important;
      color: #eba01e;
    }
    .team-name {
      width: 96%;
      display: inline-flex;
      font-size: 1.15rem;
      line-height: 2rem;
      .team-a {
        flex: 1;
        text-align: right;
      }
      .team-b {
        flex: 1;
        text-align: left;
      }
    }
    .team-vs {
      width: 2rem;
      height: 2rem;
      text-align: center;
      display: inline-block;
      border-radius: 50%;
      background-color: #fff;
      color: $mainColor;
      margin: 0 0.7rem;
    }
    .rolling-time {
      width: 50%;
      height: 2rem;
      line-height: 2rem;
      text-align: center;
      white-space: nowrap;
      background-color: rgba(27, 25, 25, 0.66);
    }
  }
}
</style>
