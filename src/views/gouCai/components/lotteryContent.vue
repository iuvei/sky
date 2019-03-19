<template>
  <div class="shouye_lottery_content">
    <ul>
      <li v-for="(item,index) in datas" :key="index" @click="toBuyLottery(item, index)">
        <div class="list_box" v-if="item.type==1 || item.type==2 || item.type==5">
          <div class="icon">
            <img :class="{'active': index == val, 'lottery_disable': item.enable==2 || (item.type==3 && item.enable==1)}" :src="item.icon" alt="">
            <img class="delete_betting" src="../../../img/new.png" alt="" v-if="item.hot==2">
            <img class="delete_betting" src="../../../img/hot.png" alt="" v-if="item.hot==1">
          </div>
          <div :class="[{'add_betting': item.game_name == '添加彩种'}, 'contents']">{{item.game_name}}</div>
          <div class="text" v-if="item.game_id != 'add'">{{item.tip}}</div>
        </div>
        <div class="list_box" v-if="item.type==3 || item.type==4">
          <div class="icon">
            <img :class="{'active': index == val, 'lottery_disable': item.enable==2}" :src="item.icon" alt="">
            <img v-if="item.type==4" :src="require('~/img/youxi/'+item.tag+'.png')" class="tb-logo" alt="">
            <img class="delete_betting" src="../../../img/new.png" alt="" v-if="item.hot==2">
            <img class="delete_betting" src="../../../img/hot.png" alt="" v-if="item.hot==1">
          </div>
          <div class="contents">{{item.game_name}}</div>
        </div>
      </li>
      <li v-if="indexFlag == 1" @click="$router.push('./betting')">
        <div class="list_box">
          <div class="icon">
            <img class="iconfont" src="../../../img/shouye/more_lottery.png">
          </div>
          <span class="contents">更多</span>
          <span class="text">更多彩种分类</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import daojishi from "../../plugin/daojishi";
import openTryData from "../../youXi/youximixin.js";
export default {
  name: "LotteryContent",
  props: ["indexFlag", "datas"],
  data() {
    return {
      data: [],
      flag: "",
      timer: Function,
      val: -1,
      throwAway: -1,
      loadedCount: 0
    };
  },
  mounted() {
    this.flag = this.indexFlag;
    this.data = this.datas;
  },
  mixins: [openTryData],
  components: {
    daojishi
  },
  watch: {
    indexFlag(val) {
      this.flag = val;
    },
    datas(val) {
      this.data = val;
    }
  },
  computed: {
    ...mapState({
      sysinfo: state => state.sysinfo
    })
  },
  methods: {
    ...mapMutations("youxi", ["SET_GMGAME_TAG"]),
    ...mapActions(["setPlayItem"]),
    imgOnload(item) {
      item.imgLoaded = true;
      this.loadedCount++;
      if (this.loadedCount === this.data.length) {
        this.data = [...this.data];
      }
    },
    //  热门里面彩票,游戏点击
    toBuyLottery(item) {
      // console.error("item&1", item, i);
      if (item.enable == 2) {
        this.$dialog.toast({ mes: "该彩种正在维护中···", timeout: 500 });
      } else {
        if (item.game_name === "足球") {
          this.$store.commit("football/FOOTBALL_SET_SPORT_ID", item.game_id);
        }
        // 游戏平台
        if (item.type == 3) {
          if (item.enable == 2) {
            this.$dialog.toast({ mes: "该平台正在维护中···", timeout: 600 });
            return;
          }
          this.$router.push({
            name: "youxi",
            params: {
              pt_id: item.game_id,
              pt_name: item.game_name,
              sub_name: item.game_name,
              suffix: ""
              // type: item.type
            }
          });
          this.SET_GMGAME_TAG(item.tag);
          return false;
        }
        // 游戏
        if (item.type == 4 && item.id_tag_key != "") {
          if (item.enable == 2) {
            this.$dialog.toast({ mes: "该游戏正在维护中···", timeout: 600 });
            return;
          } else {
            this.toOpenTry({
              gameid: item.id_tag_key,
              tag: item.tag,
              shibie: 1
            });
          }
        }
        this.$router.push({
          name: item.js_tag,
          params: {
            lotter_id: item.game_id,
            name_tag: item.tag,
            game_name: item.game_name,
            js_tag: item.js_tag,
            speed: item.speed,
            isHome: true,
            play_type: item.play_type,
            yearid: item.yearid || 0
          }
        });
      }
    },
    classFun(val) {
      val == "11x5" && (val = "eleven");
      val == "3d" && (val = "sand");
      return val;
    },
    startInterval(e, i) {
      if (this.indexFlag == 1 && i != 1) {
        clearTimeout(this.timer); // 防止重复注册事件
        this.timer = setTimeout(() => {
          this.val = i;
        }, 1000);
      }
    },
    callback() {
      clearTimeout(this.timer);
    },
    toBetting(item) {
      this.$router.push({
        name: item.js_tag,
        params: {
          lotter_id: item.game_id,
          name_tag: item.tag,
          game_name: item.game_name,
          js_tag: item.js_tag
        }
      });
    },
    deleteBetting(e, i) {
      e.preventDefault && e.preventDefault();
      this.throwAway = i;
      const _this = this;
      setTimeout(() => {
        _this.throwAway = -1;
        _this.data.splice(i, 1);
        if (!i) {
          const a = _this.data[1];
          _this.data[1] = _this.data[0];
          _this.data[0] = a;
        }
        _this.val = -1;
      }, 1000);
    },
    stopDefault(e) {
      e.preventDefault && e.preventDefault();
    }
  },
  activated() {
    this.setPlayItem(null);
  }
};
</script>
<style lang="scss" scoped>
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
.img-placeholder {
  width: 3.625rem;
  height: 3.625rem;
  position: relative;
  margin: 0;
  padding: 0;
  background: #eee;
  border-radius: 50%;
}
.shouye_lottery_content {
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    > li {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 33.3%;
      height: poTorem(140px);
      border-top: poTorem(1px) solid #f3f3f3;
      border-bottom: poTorem(1px) solid #f3f3f3;
      font-size: poTorem(16px);
      color: #333;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
      .list_box {
        // border: poTorem(1px) solid red;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding-top: poTorem(8px);
        .text {
          font-size: poTorem(12px);
          color: #959595;
          height: poTorem(18px);
        }
        a {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .contents {
          font-size: poTorem(16px);
          height: poTorem(32px);
          line-height: poTorem(32px);
        }
        .add_betting {
          padding-top: 1rem;
        }
        .icon {
          width: poTorem(58px);
          height: poTorem(58px);
          position: relative;
          // border: 1px solid red;
          img {
            width: 100%;
            // border-radius: 50%;
          }
          .delete_betting {
            width: poTorem(24px);
            // height: poTorem(20px);
            position: absolute;
            top: -0.2rem;
            right: -0.9rem;
            // background-color: #fff;
          }
          .active {
            box-shadow: #333 poTorem(2px) poTorem(2px) poTorem(10px);
          }
          .lottery_disable {
            -webkit-filter: grayscale(100%);
            -moz-filter: grayscale(100%);
            -ms-filter: grayscale(100%);
            -o-filter: grayscale(100%);
            filter: grayscale(100%);
            filter: gray;
          }
        }
        .tb-logo {
          position: absolute;
          bottom: 0;
          right: 0;
        }
        .iconfont {
          width: poTorem(50px);
        }
      }
    }
  }
}
</style>
