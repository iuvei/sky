<template>
  <div class="lottery">
    <yd-tab active-color="#F93" class="tab index_panel" v-if="flag" :callback="choose">
      <yd-tab-panel label="热门" active tabkey=1>
        <lottery-content :datas="dataList" :indexFlag="1" class="animtes"></lottery-content>
      </yd-tab-panel>
      <!-- <yd-tab-panel label="彩票" tabkey=2>
        <lottery-content :datas="dataHeigh" :indexFlag="2" class="animtes"></lottery-content>
      </yd-tab-panel>
      <yd-tab-panel label="体育彩" tabkey=3>
        <lottery-content :datas="dataSport" :indexFlag="2" class="animtes"></lottery-content>
      </yd-tab-panel>
      <yd-tab-panel label="电子游戏" tabkey=4> -->
      <!-- <lottery-content :datas="dataLow" :indexFlag="2" class="animtes"></lottery-content> -->
      <!-- <div class="prediction">新版本即将上线，敬请期待···</div> -->
      <!-- <lotteryYouxilist></lotteryYouxilist>
      </yd-tab-panel> -->

      <yd-tab-panel :label="item.label" :tabkey='item.addgn' v-for="(item, index) in getMenus" :key="index">
        <lottery-content v-if="item.label==='彩票'" :datas="dataHeigh" :indexFlag="2" class="animtes"></lottery-content>
        <lottery-content v-else-if="item.label==='皇冠体育'" :datas="dataSport" :indexFlag="3" class="animtes"></lottery-content>
        <lotteryYouxilist v-else-if="item.label==='电子'" :dataDzPt="dataDzPt" :indexFlag="4"></lotteryYouxilist>

        <lotteryYouxiQp v-else-if="item.label==='棋牌'" :dataQpPt="dataQpPt" :indexFlag="5"></lotteryYouxiQp>
        <lotteryYouxiBy v-else-if="item.label==='捕鱼'" :dataByPt="dataByPt" :indexFlag="6"></lotteryYouxiBy>
      </yd-tab-panel>
    </yd-tab>
    <!-- 自选排序 -->
    <div class="optional_box">
      <div class="the_divider"></div>
      <img src="~img/youxi/optional.png" alt="" @click="optionalSorting('/zixuanPaixu')">
    </div>
  </div>
</template>
<script>
import lotteryContent from "./lotteryContent";
import lotteryYouxilist from "../../youXi/components/lotteryYouxilist";
import lotteryYouxiQp from "../../youXi/components/lotteryYouxiQp";
import lotteryYouxiBy from "../../youXi/components/lotteryYouxiBy";
import { mapGetters, mapActions } from "vuex";
import api from "../../../../api/game";
// import debounce from "lodash/debounce";
export default {
  data() {
    return {
      data: [],
      dataHeigh: [],
      dataList: [],
      dataSport: [],
      dataLow: [],
      flag: false,
      timer: Function,
      dataDzPt: [],
      dataQpPt: [],
      dataByPt: []
    };
  },
  computed: {
    ...mapGetters("zixuanPaixu", ["getMenus"])
  },
  components: {
    lotteryContent,
    lotteryYouxilist,
    lotteryYouxiQp,
    lotteryYouxiBy
  },
  created() {
    this.getData();
    this.getHotGameList_get();
    this.getGameList_get();
  },
  mounted() {},
  methods: {
    ...mapActions("youxi", ["GetIndexWebgame"]),
    // 12-16
    optionalSorting(path) {
      if (
        typeof path === "string" &&
        (path.includes("https://") || path.includes("http://"))
      ) {
        window.location.href = path;
        return;
      }
      this.$router.push(path);
    },
    goGame() {
      this.$router.push({
        name: "pk10niuniu",
        params: {
          // lotter_id: item.game_id,
          // name_tag: item.tag,
          // game_name: item.game_name,
          // js_tag: item.js_tag,
          // speed: item.speed
        }
      });
    },
    goFootball() {
      this.$router.push({ name: "footballMulti" });
    },
    // 游戏平台
    // getGameList_get: debounce(async function() {
    async getGameList_get() {
      // this.$ajax("request", {
      //   ac: "GetIndexWebgame"
      // }).then(resPt => {
      //   if (!Array.isArray(resPt) || resPt.length < 1) {
      //     return;
      //   }
      //   resPt.map((item, index) => {
      //     if (item.type == 3) {
      //       this.dataByPt.push(item); // 捕鱼
      //     } else {
      //       if ((item.class_type & (1 << (1 - 1))) > 0) {
      //         this.dataDzPt.push(item); // 电子
      //       }
      //       if ((item.class_type & (1 << (2 - 1))) > 0) {
      //         this.dataQpPt.push(item); // 棋牌
      //       }
      //     }
      //     // if (item.type == 1) {
      //     //   this.dataDzPt.push(item); // 电子
      //     // } else if (item.type == 2) {
      //     //   this.dataQpPt.push(item); // 棋牌
      //     // } else {
      //     //   this.dataByPt.push(item); // 捕鱼
      //     // }
      //   });
      // });
      const resPt = await this.GetIndexWebgame();
      resPt.length &&
        resPt.map(item => {
          if (item.type == 3) {
            this.dataByPt.push(item); // 捕鱼
          } else {
            if ((item.class_type & (1 << (1 - 1))) > 0) {
              this.dataDzPt.push(item); // 电子
            }
            if ((item.class_type & (1 << (2 - 1))) > 0) {
              this.dataQpPt.push(item); // 棋牌
            }
          }
        });
    },
    // }, 500),
    // 热门
    getHotGameList_get() {
      this.$ajax("request", {
        ac: "getHotGameList"
      }).then(response => {
        this.dataList = response;
      });
    },
    /** 获得数据 */
    async getData() {
      const games = await api.getGameList();
      if (games && games.length) {
        this.data = games;
        /** 过滤数据 */
        // const checkArr = ["15", "16", "14"];
        // this.dataList = games.slice(0, 17);
        games.map(item => {
          if (!item.icon) {
            Object.assign(item, {
              icon: require("../../../img/youxi/mglogo.png")
            });
          }
          // 区分彩票和体彩
          // if (item.hot) {
          //   this.dataList.push(item);
          // }
          if (item.type == 1) {
            this.dataHeigh.push(item); // 全部彩票彩种-44个
          } else if (item.type == 2 || item.type == 5) {
            this.dataSport.push(item); // 体育彩票-5个
          }
        });
        this.$store.state.sportItem = this.dataSport[0];
        this.flag = true;
      }
    },
    /** 更新倒计时 */
    daojishi() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.$ajax("request", {
          ac: "getKjCpLog",
          tag: "all",
          pcount: 10,
          ncount: 5,
          pageid: 0
        }).then(res => {
          this.data = res;
          this.daojishi();
        });
      }, 180000);
    },
    choose(lable, tabkey) {
      this.indexFlag = tabkey;
    }
  }
};
</script>
<style lang="scss" scoped>
@function poTorem($px) {
  @return $px / 16px * 1rem;
}

.lottery {
  position: relative;
  .prediction {
    text-align: center;
    padding: poTorem(150px) 0;
    font-size: poTorem(24px);
    font-weight: 500;
    color: #ccc;
    font-style: italic;
  }
  .optional_box {
    position: absolute;
    width: poTorem(41px);
    height: poTorem(42px);
    top: poTorem(1px);
    right: 0.1%;
    z-index: 100;
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    img {
      width: poTorem(18px);
      height: poTorem(18px);
      margin-left: poTorem(8px);
    }
    .the_divider {
      width: poTorem(5px);
      height: poTorem(42px);
      background: url(~img/youxi/theDivider.png);
      background-size: cover;
    }
  }
}
</style>
<style lang="scss">
.index_panel {
  .yd-tab-box {
    padding-right: 2.5625rem;
    .yd-tab-nav-item {
      &:last-child {
        flex-grow: 1.25;
      }
    }
  }
}
</style>
