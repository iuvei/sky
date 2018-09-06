<template>
  <div class="football-race-info">
    <!-- 头部 -->
    <AppHeader title='比赛详情'> </AppHeader>
    <!-- focus -->
    <div class="fouce">
      <div>{{league}}</div>
      <div>
        <span>{{data.h}}</span>
        vs
        <span>{{data.v}}</span>
      </div>
      <div>{{date}}</div>
    </div>
    <!-- main -->
    <div class="main">
      <div class="main-header">
        <span>进球数</span>
        <span>{{data.h}}</span>
        <span>{{data.v}}</span>
      </div>
      <div class="main-data" v-for="(item,key) in SC" :key="key">
        <span>{{item.name}}</span>
        <span>{{item.SCH}}</span>
        <span>{{item.SCV}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getRaceInfo } from "./utils";

export default {
  name: "footballRaceInfo",
  data() {
    return {
      SC: [],
      data: {},
      league: "",
    };
  },
  computed: {
    ...mapState("football", ["leagueList"]),
    date() {
      return new Date(this.data.begin_time).format("yyyy-MM-dd hh:mm");
    },
  },
  methods: {
    ...mapActions("football", ["getRaceResList"]),
  },
  mounted() {},
  beforeRouteEnter(t, f, n) {
    if (t.params.data) {
      n(vm => {
        vm.data = t.params.data;
        vm.league = t.params.league;
        vm.SC = getRaceInfo(1, t.params.data);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../../css/resources.scss";
.football-race-info {
  .fouce {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: poTorem(150px);
    background: url("/assets/goucai/football_race.jpg") no-repeat;
    background-size: 100% 100%;
    div {
      font-size: poTorem(20px);
      color: #fff;
    }
  }
  .main {
    > div {
      @include between;
      height: poTorem(50px);
      padding: 0 poTorem(50px) 0 poTorem(20px);
      font-size: poTorem(18px);
    }
    &-data {
      border-bottom: poTorem(1px) solid #d2d2d2;
      background-color: #f6f6f6;
    }
  }
}
</style>
