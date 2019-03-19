<template>
  <div class="football-total">
    <!-- 上拉刷新 -->
    <yd-pullrefresh :callback="pullRefresh"
                    ref="pullRefresh"
                    class="refresh"
                    :show-init-tip="false">
      <!-- 空白页面 -->
      <AppEmpty v-if="!data"></AppEmpty>
      <!-- 滚动加载 -->
      <yd-infinitescroll :callback="pullScroll"
                         ref="infinitescroll"
                         class="scoll">
        <!-- 折叠板块 -->
        <yd-accordion class="main"
                      v-if="data"
                      :accordion='true'
                      slot="list">
          <yd-accordion-item :title="item.league_name"
                             class="group"
                             v-for="item in data"
                             :key="item.league_id">
            <!-- <div slot="txt" class="title">
              <span class="name">{{item.league_name}}</span>
            </div> -->
            <ul>
              <!-- 复用板块 -->
              <li v-for="v in item.schedule"
                  :key="v.history_id">
                <FootballTypeTotalItem :data="v"
                                       class="group-v"
                                       :league="item.league_name"
                                       @clickCell="clickCell"
                                       :item="{ active}"></FootballTypeTotalItem>
              </li>
            </ul>
          </yd-accordion-item>
        </yd-accordion>
      </yd-infinitescroll>
    </yd-pullrefresh>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import FootballTypeTotalItem from "./components/FootballTypeTotalItem";
export default {
  name: "FootballTypeFmatch",
  components: { FootballTypeTotalItem },
  data() {
    return {
      data: 0,
      active: "",
      next_time: "",
      lockMark: false
    };
  },
  computed: {
    ...mapState("football", ["timeCount", "sport_id"])
  },
  methods: {
    ...mapActions("football", [
      "getSportMobileGameList",
      "modifyFootballField",
      "queryComputed"
    ]),
    async pullRefresh() {
      const ret = await this.togetSportMobileGameList();
      this.data = ret.result;
      this.queryComputed(["reset"]);
      this.$refs.pullRefresh.$emit("ydui.pullrefresh.finishLoad");
    },
    async pullScroll() {
      if (this.lockMark) return;
      this.lockMark = true;
      const ret = await this.togetSportMobileGameList({
        start_time: this.next_time
      });
      if (!ret) {
        this.$refs.infinitescroll.$emit("ydui.infinitescroll.loadedDone");
        return;
      }
      this.data = [...this.data, ...ret.result];
      this.lockMark = false;
      this.$refs.infinitescroll.$emit("ydui.infinitescroll.finishLoad");
      // console.log(this.data);
    },

    clickCell(item) {
      const request = {
        sport_id: this.sport_id,
        history_id: item.history_id,
        schedule_id: item.schedule_id,
        k: item.k,
        p: item.p,
        play_method: item.play_method,
        team: "",
        team_score: item.team_score
      };
      this.active = item.history_id;
      this.modifyFootballField({
        footer: true,
        bet_pl: item.p,
        bet_txt: item.k_txt,
        bet_data: [request]
      });
    },
    //
    async togetSportMobileGameList(request) {
      const ret = await this.getSportMobileGameList(request);
      this.next_time = ret.next_time;
      return ret;
    }
  },
  watch: {
    "timeCount.getData"() {
      this.$refs.infinitescroll.$emit("ydui.infinitescroll.reInit");
      this.togetSportMobileGameList().then(ret => {
        this.data = ret.result;
        this.queryComputed(["reset"]);
      });
    }
  },
  mounted() {
    this.togetSportMobileGameList().then(ret => {
      this.data = ret.result;
    });
  }
};
</script>

<style lang="scss" >
@import "../../../css/resources.scss";
.football-total {
  .main {
    .group {
      .yd-accordion-head {
        height: poTorem(46px);
        padding-left: poTorem(18px);
        border-bottom: poTorem(1px) solid #d2d2d2;
        background-color: #f6f6f6;
        span {
          font-size: poTorem(18px);
        }
      }
      ul {
        padding-bottom: poTorem(20px);
      }
      .yd-accordion-head::after {
        border: poTorem(1px) #d2d2d2;
      }
      .yd-accordion-content {
        &::after {
          border: none;
        }
      }
    }
  }
  .yd-pullrefresh-dragtip {
    top: 0;
    height: poTorem(100px);
    font-size: poTorem(20px);
  }
  .yd-list-donetip {
    height: poTorem(60px);
    font-size: poTorem(20px);
  }
}
</style>


