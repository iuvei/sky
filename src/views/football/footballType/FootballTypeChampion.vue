<template>
  <div class="footballTypeChampion_main_body">
    <!-- <div v-show="show"  class="empty">
      <img src="../../../img/bet_record/noRecords.png" alt="">
      <p>暂无数据</p>
    </div> -->
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
        <!-- <div class="lab" @click="toDetails(item)" style="background-color:rgb(242,244,245);" v-for="(item,index,key) in data" :key="key" slot='list'>
          {{item.league_name}}<span class="lent">{{item.schedule.length}}</span>
        </div> -->
        <yd-accordion accordion
                      v-show="!show"
                      slot='list'>
          <yd-accordion-item :title="(item.league_name)"
                             style="background-color:rgb(242,244,245);"
                             v-for="(item,index,key) in data"
                             :key="key">
            <!-- <div slot="txt" class="lent">{{item.schedule.length}}</div> -->
            <div style="padding: 1rem 0.8rem;background-color:#fff"
                 v-for="(items,indexs,key) in item.schedule"
                 :key="key">
              <div>
                <div class="cent">
                  <p class="title">{{items.h}}</p>
                  <yd-grids-group :rows="2">
                    <yd-grids-item v-for="(i,indexss,key) in items.bet_data.CHP"
                                   :key="key"
                                   @click.native="select($event,items)"
                                   :class="['items', (index + '' + indexs + '' +indexss),{selected: footer&&selectedKey === index + '' + indexs + '' + indexss }]">
                      <span slot="text">{{i.k}}</span>
                      <b slot="text">{{i.p}}</b>
                    </yd-grids-item>
                  </yd-grids-group>
                </div>
              </div>
            </div>
          </yd-accordion-item>
        </yd-accordion>
        <span slot="doneTip">没有数据啦~~</span>
      </yd-infinitescroll>
    </yd-pullrefresh>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "footballTypeMulti",
  data() {
    return {
      checkbox: true,
      isActive: true,
      data: [],
      next_time: "",
      selected: "",
      num: 0,
      league_id: "",
      selectedKey: "",
      realPath: "",
      show: false,
      lockMark: false,
      bet_data: {}
    };
  },
  mounted() {
    this.modifyFootballField({ footer: false });
    this.bus.$on(
      "countDown-click",
      this.togetSportMobileGameList().then(ret => {
        this.data = ret.result;
        console.log(this.data);
      })
    );
    this.bus.$on(
      "order-click",
      this.newgetSportMobileGameList().then(ret => {
        this.data = ret.result;
      })
    );
    // 用户选中的联盟
    this.bus.$on("league-filter-click", this.leagueFilterClick);

    this.togetSportMobileGameList().then(ret => {
      this.data = ret.result;
    });
  },
  computed: {
    ...mapState("football", ["footer", "sport_id", "money"])
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
  methods: {
    ...mapActions("football", [
      "modifyFootballField",
      "getSportMobileGameList",
      "queryComputed"
    ]), // 修改单属性 获取体育赛事列表 请求数据表示
    leagueFilterClick() {
      this.togetSportMobileGameList().then(ret => {
        this.data = ret.result;
      });
    },
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
    },
    async togetSportMobileGameList(request) {
      const ret = await this.getSportMobileGameList(request);
      this.next_time = ret.next_time;
      return ret;
    },
    async newgetSportMobileGameList(request, n) {
      const ret = await this.getSportMobileGameList(request);
      this.next_time = ret.next_time;
      this.order = n;
      return ret;
    },
    select(e, item) {
      const obj = e.target.closest(".items");
      if (e.target.closest(".items").className.indexOf("selected") === -1) {
        // 选中
        this.selectedKey = e.target
          .closest(".items")
          .className.replace(/[^0-9]/gi, "");
        this.bet_data.history_id = item.history_id;
        this.bet_data.schedule_id = item.schedule_id;
        this.bet_data.k = obj.children[0].children[0].innerText;
        this.bet_data.p = obj.children[0].children[1].innerText;
        this.bet_data.play_method = "CHP";
        (this.bet_data.price = this.money),
        (this.bet_data.sport_id = this.sport_id),
        (this.bet_data.team = ""),
        (this.bet_data.team_score = item.team_score),
        this.modifyFootballField({
          min_stake: item.min_stake,
          max_stake: item.max_stak,
          footer: true,
          bet_txt: this.bet_data.k,
          bet_pl: this.bet_data.p,
          bet_data: [this.bet_data]
        });
      } else {
        // 取消
        this.selectedKey = "";
        this.modifyFootballField({ footer: false });
      }
    },
    toDetails(item) {
      this.$router.push({
        name: "footballDetaList",
        params: item
      });
    }
  }
};
</script>
<style lang="scss">
.footballTypeChampion_main_body {
  height: 100%;
  background-color: #fff;
  .lab {
    height: 2.8rem;
    line-height: 2.8rem;
    border-radius: 0.2rem;
    margin-top: 0.5rem;
    border: 1px solid #d9d9d9;
    padding: 0 0.5rem;
    position: relative;
    overflow: hidden;
    .lent {
      display: inline-block;
      width: 2.8rem;
      height: 2.8rem;
      line-height: 2.8rem;
      text-align: center;
      position: absolute;
      right: 0;
      background-color: #dbdbdb;
    }
  }
  .cent {
    border: 1px solid rgb(234, 234, 234);
    .title {
      display: block;
      text-align: center;
      line-height: 2rem;
      font-size: 0.9rem;
    }
    .selected {
      border: 1px solid rgb(217, 46, 54) !important;
      div span,
      div b {
        color: rgb(217, 46, 54);
      }
    }
    .items {
      height: 2.5rem;
      padding: 0;
      line-height: 2.5rem;
      font-size: 1rem;
      border-top: 1px solid rgb(234, 234, 234);
      span {
        float: left;
      }
      b {
        float: right;
        font-weight: 400;
      }
    }
    .items:before,
    .items:after {
      border-bottom: none !important;
    }
    .active {
      border: 1px solid rgb(213, 0, 0);
      span {
        color: rgb(213, 0, 0);
      }
      b {
        color: rgb(213, 0, 0);
      }
    }
  }
  .foot {
    background-color: rgb(228, 229, 230);
    width: 100%;
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 0.9rem;
    font-size: 1rem;
    position: fixed;
    bottom: 3rem;
    left: 0;
    p {
      float: left;
      span {
        color: red;
      }
    }
    .check {
      float: right;
    }
  }
  .empty {
    padding-top: 50%;
    img {
      display: block;
      width: poTorem(93px);
      margin: 0 auto;
    }
    p {
      font-size: poTorem(14px);
      height: poTorem(20px);
      line-height: poTorem(20px);
      text-align: center;
      color: #bfbfbf;
      font-weight: 700;
    }
  }
  .yd-pullrefresh-dragtip {
    top: 0 !important;
    height: poTorem(100px);
    font-size: poTorem(20px);
  }
  .yd-list-donetip {
    height: poTorem(60px);
    font-size: poTorem(20px);
  }
  .yd-accordion-head {
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    .yd-accordion-title {
      font-size: 1.2rem;
      color: #000;
    }
  }
}
</style>

