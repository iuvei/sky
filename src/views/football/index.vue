<template>
  <div class="football">
    <FootballHeader :clickRouter="clickRouter" :clickTitle="clickTitle" :clickCategory='clickCategory' :title="gameTypeMap[gameType].label"></FootballHeader>
    <FootballHeaderTitle :show='showTitleList' @close="()=>{this.showTitleList=false}"></FootballHeaderTitle>
    <FootballHeaderCategory :show='showCategorg' @close="()=>{this.showCategorg=false}"></FootballHeaderCategory>
    <FootballMenu></FootballMenu>
    <section class="view" :class="{'up-footer':footer, zhgg_preview: gameType===3 && zhgg_preview}">
      <router-view class="football-child"></router-view>
    </section>

    <FootballFooter></FootballFooter>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import components from "./components/index";
export default {
  name: "football",
  components: { ...components },
  data() {
    return {
      headerData: {},
      showTitleList: false,
      showCategorg: false,
      picking: false
    };
  },
  computed: {
    ...mapState("football", [
      "gameType",
      "gameTypeMap",
      'playType',
      'playTypeMap',
      "footer",
      "zhgg_preview",
      'sub_route'
    ])
  },
  watch: {
    $route(to, from) {
      // 初始化底部信息
      let other = ["zhggPreview", 'footballAllPlay'];
      if (other.includes(to.name) || other.includes(from.name)) return;
      let obj = {
        money: 2,
        footer: false,
        is_better: true
      };
      if(["/football/multi", '/football/waves','/football/htcs','/football/fmatch','/football/total','/football/champion'].includes(to.path)) {
        obj.sub_route = to.path;
      }
      this.modifyFootballField(obj);
    }
  },
  activated() {
    let sportId = this.$route.params.lotter_id;
    if (sportId) this.$store.commit("football/FOOTBALL_SET_SPORT_ID", sportId);
    
    // 默认今日赛事
    if (!this.$route.fullPath.includes('/football')) {
      let obj = {
        gameType: 1,
        playType: 0
      };
      this.modifyFootballField(obj);
      // this.$router.push("/football/multi");
    }
    this.$router.replace(this.sub_route);

  },
  created() {},
  methods: {
    ...mapActions("football", ["modifyFootballField", "queryComputed"]),
    clickRouter() {
      this.$router.replace("/home");
    },
    clickTitle() {
      if (this.showCategorg) return;
      this.showTitleList = true;
    },
    clickCategory() {
      if (this.showTitleList) return;
      this.showCategorg = true;
    }
  },
  beforeRouteEnter(t, f, n) {
    n(vm => {
      // vm.$router.push("/football/multi");
      vm.queryComputed(["reset", "getData"]);
    });
  },
  beforeRouteUpdate(t, f, n) {
    this.queryComputed(["reset"]);
    n();
  }
};
</script>
<style lang="scss" scoped>
@import "../../css/resources.scss";
.football {
  .view {
    flex: 1;
    display: flex;
    overflow-y: auto;
    background-color: #fff;
    .football-child {
      flex: 1;
      display: flex;
      flex-direction: column;
      font-size: 1rem;
    }
  }
  .up-footer {
    height: calc(100% - 9.8rem);
  }
  .up-footer.zhgg_preview {
    height: calc(100% - 7rem);
  }
}
</style>

<style lang="scss">
.yd-accordion-head-arrow:after {
  content: "\e641";
  font-family: "iconfont";
  font-size: 1.2rem;
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.2rem;
  border: none;
  text-align: center;
  transform: rotate(0deg);
}
.yd-accordion-head-arrow.yd-accordion-rotated:after {
  transform: rotate(-180deg);
}
.yd-list-donetip {
  font-size: 0.8rem;
}
</style>



