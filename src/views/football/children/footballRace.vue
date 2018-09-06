<template>
  <div class="football-race">
    <!-- 头部 -->
    <AppHeader :title='titleData[raceType]' :clickTitle="clickTitle" :clickCategory='clickCategory'>
      <span slot="right" class="title-right"> </span>
    </AppHeader>
    <AppModel :show="modelTitel" @close="modelTitel=false">
      <div class="shadow" slot>
        <span v-for="(item, index) in titleData" :key="index" :class="{active: index==raceType}" @click="switchs(index,item)">{{item}}</span>
      </div>
    </AppModel>
    <AppModel :show="modelDate" @close="modelDate=false" class="race-date">
      <FootballRaceDate slot @close="modelDate=false" @submit="setDate" :unixStamp='unixStamp'></FootballRaceDate>
    </AppModel>

    <!-- menu -->
    <FootballRaceMenu class="menu" :unixStamp='unixStamp' @date="setDate"></FootballRaceMenu>
    <!-- main -->
    <AppEmpty v-if="!data.length"></AppEmpty>
    <yd-accordion class="main other-block" accordion>
      <yd-accordion-item class="group" open v-for="(item,key) in data" :key="key">
        <div slot="txt" class="title">
          <span class="name">{{item.league_name}}</span>
          <span class="tg">全场</span>
          <span class="htg">上半场</span>
        </div>
        <ul v-for="(v,k) in item.game_result" :key="k">
          <FootballRaceItem :data="v" class="group-v" :league="item.league_name"></FootballRaceItem>
        </ul>
      </yd-accordion-item>
    </yd-accordion>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FootballRaceItem from "./components/FootballRaceItem";
import FootballRaceDate from "./components/FootballRaceDate";
import FootballRaceMenu from "./components/FootballRaceMenu";

export default {
  name: "footballRace",
  components: {
    FootballRaceItem,
    FootballRaceDate,
    FootballRaceMenu,
  },
  data() {
    return {
      modelTitel: false,
      raceType: 0,
      modelDate: false,
      titleData: ["联赛", "冠军"],
      data: [],
      unixStamp: new Date(),
    };
  },
  computed: {
    ...mapState("football", ["leagueList"]),
  },
  methods: {
    ...mapActions("football", ["getRaceResList"]),
    setDate(date) {
      this.unixStamp = date;
      this.togetRaceResList();
    },
    clickTitle() {
      this.modelTitel = true;
    },
    clickCategory() {
      this.modelDate = true;
    },
    switchs(k, v) {
      this.modelTitel = false;
      this.raceType = k;
      this.togetRaceResList();
    },
    async togetRaceResList() {
      let ret = await this.getRaceResList({
        type: this.raceType,
        start_time: this.unixStamp,
      }) || {};
      this.data = ret.result || [];
    },
  },
  mounted() {
    // this.liKey = 4;
    this.togetRaceResList();
  },
};
</script>

<style lang="scss" scoped>
@import "../../../css/resources.scss";
.football-race {
  .title-right {
    background: url("~img/football/date.png");
    width: poTorem(23px);
    height: poTorem(23px);
    background-size: poTorem(23px) poTorem(23px);
  }
  .shadow {
    @include around;
    width: 100%;
    height: poTorem(55px);
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
  .menu {
    height: poTorem(52px);
    background-color: #fff;
  }
  .group {
    .title {
      width: 100%;
      display: flex;
      .name {
        width: poTorem(250px);
      }
      .tg,
      .htg {
        width: poTorem(60px);
        text-align: center;
      }
    }
  }
}
</style>

<style lang="scss" >
@import "../../../css/resources.scss";
.football-race {
  .main {
    // margin: poTorem(18px) poTorem(7px) 0;
    .group {
      .yd-accordion-head {
        height: poTorem(48px);
        border-bottom: poTorem(1px) solid #d2d2d2;
        border-top: poTorem(1px) solid #d2d2d2;
        background-color: #f6f6f6;
        span {
          font-size: poTorem(18px);
        }
      }
      .yd-accordion-head::after {
        border: poTorem(1px) #d2d2d2;
      }
    }
  }
  .shadow {
    span.active {
      border: solid 1px #e33939;
      background: no-repeat right bottom url(~img/football/title-active.png);
      background-size: poTorem(23px) poTorem(23px);
    }
  }
  .race-date .events-wrapper {
    display: none;
  }
}
</style>
