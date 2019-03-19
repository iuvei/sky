<template>
  <div class="football-league">
    <!-- 头部 -->
    <FootballHeader title='选择联赛'> </FootballHeader>
    <!-- menu -->
    <ul class="menu">
      <li v-for="(item,key) in quickData"
          :key="key"
          :class="{active:key==liKey}"
          @click="clickLi(key)">{{item}}</li>
    </ul>
    <!-- main -->
    <div class="other-block">
      <yd-accordion class="main">
        <yd-accordion-item title="热门联赛"
                           class="group"
                           open>
          <div slot="icon"
               class="hot-icon">
            <img :src="require('~/img/football/hot.png')"
                 alt="">
          </div>
          <FootballLeagueGroup :data='hotLeagueData'
                               @changeCheckbox="changeCheckbox"></FootballLeagueGroup>
        </yd-accordion-item>
      </yd-accordion>
      <yd-accordion class="main">
        <yd-accordion-item title="其它"
                           class="group"
                           open>
          <div slot="icon"
               class="hot-icon">
            <img :src="require('~/img/football/other.png')"
                 alt="">
          </div>
          <FootballLeagueGroup :data='leagueData'
                               @changeCheckbox="changeCheckbox"></FootballLeagueGroup>
        </yd-accordion-item>
      </yd-accordion>
    </div>

    <!-- foot -->
    <footer>
      <yd-button size="large"
                 type="hollow"
                 color="#7d7d7d"
                 @click.native="cancel">取消</yd-button>
      <yd-button size="large"
                 type="primary"
                 color="#fff"
                 bgcolor="#ef4f4f"
                 @click.native="submit">确定</yd-button>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FootballHeader from "../components/FootballHeader";
import FootballLeagueGroup from "./components/FootballLeagueGroup";
// import FootballLeagueItem from "../components/FootballLeagueItem";

export default {
  name: "footballLeague",
  components: { FootballHeader, FootballLeagueGroup },
  data() {
    return {
      quickData: ["全部", "仅热门联赛", "仅其它"],
      liKey: 4,
      showTitleList: false,
      showCategorg: false,
      allData: [],
      hotLeagueData: [],
      leagueData: []
      // knkn: true,
    };
  },
  computed: {
    ...mapState("football", ["leagueList"])
  },
  methods: {
    ...mapActions("football", [
      "getSportLeagueList",
      "setSportLeagueList",
      "modifyFootballField",
      "queryComputed"
    ]),
    cancel() {
      this.$router.go(-1);
    },
    submit() {
      // this.queryComputed(true);
      if (this.leagueList.length === 0) {
        this.$dialog.alert({ mes: "请选择联盟" });
        return;
      }
      this.modifyFootballField({ leagueIds: this.leagueList.join(",") });
      this.bus.$emit("league-filter-click");
      this.$router.go(-1);
    },
    async togetSportLeagueList() {
      this.allData = [];
      this.hotLeagueData = [];
      this.leagueData = [];
      const ret = await this.getSportLeagueList();
      if (!ret) return;
      this.hotLeagueData = ret.filter(v => {
        if (v.is_hot) {
          return true;
        }
        this.leagueData.push(v);
      });
      this.allData = ret;
    },
    clickLi(key) {
      this.liKey = key;
      switch (key) {
        case 0:
          this.setSportLeagueList(this.allData.map(v => v.league_id));
          break;
        case 1:
          this.setSportLeagueList(this.hotLeagueData.map(v => v.league_id));
          break;
        case 2:
          this.setSportLeagueList(
            this.allData
              .filter(item => !this.leagueList.find(r => r === item.league_id))
              .map(v => v.league_id)
          );
          break;

        default:
          break;
      }
    },
    changeCheckbox() {
      this.liKey = 4;
    }
  },
  beforeRouteEnter(t, f, n) {
    n(vm => {
      vm.liKey = 4;
      vm.togetSportLeagueList();
      vm.modifyFootballField({ leagueList: [], leagueIds: "" });
    });
  }
};
</script>

<style lang="scss" scoped>
@import "~css/resources.scss";
.football-league {
  .menu {
    @include between;
    margin: poTorem(18px) poTorem(7px) 0;
    border-radius: poTorem(20px);
    background-color: #ffffff;
    li {
      @include center;
      height: poTorem(36px);
      width: poTorem(130px);
      border-radius: poTorem(20px);
      font-size: poTorem(18px);
      color: #7d7d7d;
    }
    .active {
      color: #fff;
      background-color: $mainColor;
    }
  }
  .main {
    margin: poTorem(18px) poTorem(10px) 0;
    .group {
      margin-bottom: poTorem(12px);
    }
    .hot-icon {
      padding-left: poTorem(10px);
      width: poTorem(40px);
      height: poTorem(18px);
      img {
        width: poTorem(18px);
        height: poTorem(18px);
      }
    }
  }
  footer {
    @include center;
    position: relative;
    bottom: 0;
    width: 100%;
    height: poTorem(48px);
    // display: flex;
    button {
      height: poTorem(48px);
      border-radius: 0;
      font-size: poTorem(18px);
    }
  }
}
</style>

<style lang="scss" >
@import "../../../css/resources.scss";
.football-league {
  .main {
    margin: poTorem(18px) poTorem(7px) 0;
    .group {
      .yd-accordion-head {
        height: poTorem(48px);
        border-bottom: poTorem(1px) solid #d2d2d2;
        span {
          font-size: poTorem(18px);
        }
      }
      .yd-accordion-head::after {
        border-color: #d2d2d2 !important;
      }
    }
  }
}
</style>






