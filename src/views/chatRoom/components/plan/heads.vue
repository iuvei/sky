<template>
  <div class="headsplan">
    <div class="headsplan_con">
      <router-link to="/chatRoom">
        <div class="iconchat"></div>
      </router-link>
      <div class="title"
           @click="switchLottery">
        <div class="center_box">
          {{this.listType.game_name}}
        </div>
        <div class="trangle"></div>
      </div>
      <div class="switch"
           @click="switchP">
        <i :class="[{'rotate_pos': isRotate}]"></i>
        <span>计划</span>
      </div>
    </div>
    <!-- 切换计划 -->
    <mt-popup class="switch_tc"
              v-model="switchPlans"
              popup-transition="popup-fade"
              position="top">
      <ul class="switch_list">
        <li class="switch_list_li"
            v-for="(item, index) in listData"
            :key="index"
            @click="switchThePlay(item)">
          <div class="cz_name"
               :class="{ active: activePlan === item }">{{item.name}}</div>
        </li>
      </ul>
    </mt-popup>
    <PlanDetails :activePlan="activePlan"
                 :gameId="listType.lotter_id"></PlanDetails>
    <!-- 彩种列表 -->
    <selectGameList ref="lotteryOptions"
                    @afterSelectGame="switchCzList"
                    :show="show"></selectGameList>
  </div>
</template>
<script>
import PlanDetails from "./components/PlanDetails";
import { mapState } from "vuex";
import selectGameList from "../../../zouShi/components/selectGame";
export default {
  data() {
    return {
      show: false, // 头部切换彩种开关
      listType: [], //
      listData: [],
      activePlan: {}, // 切换计划小列表
      data: [],
      isRotate: false, // 计划图标
      switchPlans: false, // 计划小弹窗
      sscList: [
        { name: "万位大小", type: "0" },
        { name: "万位单双", type: "1" },
        { name: "和值大小", type: "3" },
        { name: "和值单双 ", type: "2" }
      ],
      qxcList: [
        { name: "和值大小", type: "0" },
        { name: "和值单双", type: "1" }
      ],
      xyncList: [
        { name: "和值大小", type: "0" },
        { name: "和值单双", type: "1" }
      ],
      pk10List: [
        { name: "冠亚军和大小", type: "0" },
        { name: "冠亚军和单双", type: "1" },
        { name: "冠军大小", type: "2" },
        { name: "冠军单双", type: "3" }
      ],
      pcddList: [
        { name: "特码大小", type: "0" },
        { name: "特码单双", type: "1" }
      ],
      ksList: [
        { name: "和值大小", type: "0" },
        { name: "和值单双", type: "1" }
      ],
      xyxwList: [
        { name: "和值大小", type: "0" },
        { name: "和值单双", type: "1" }
      ],
      sdList: [{ name: "和值大小", type: "0" }, { name: "和值单双", type: "1" }]
    };
  },
  components: {
    PlanDetails,
    selectGameList
  },
  activated() {},
  mounted() {},
  computed: {
    ...mapState({
      gameName: state => state.trend.gameName
      // gameId: state => state.trend.gameId
    })
  },
  watch: {
    listType() {
      this.getLists();
    }
  },
  methods: {
    // 计划列表
    getLists() {
      const listObj = {
          xync: this.xyncList,
          qxc: this.qxcList,
          ssc: this.sscList,
          "3d": this.sdList,
          "11x5": this.xyxwList,
          pk10: this.pk10List,
          pcdd: this.pcddList,
          k3: this.ksList
        },
        listData = listObj[this.listType.js_tag];
      this.listData = listData || [];
      this.activePlan = this.listData[0] || {};
    },
    // 切换计划小列表 name
    switchThePlay(item) {
      this.activePlan = item;
      this.switchPlans = !this.switchPlans;
    },
    // 列表被点击的彩种
    switchCzList(game) {
      if (game) {
        this.listType = {
          lotter_id: game.game_id,
          js_tag: game.js_tag,
          name_tag: game.tag,
          game_name: game.game_name
        };
      }
      this.listType.game_name = game.game_name;
      this.show = false;
    },
    // 彩种列表开关
    switchLottery() {
      this.show = !this.show;
    },
    // 点击头部切换计划
    switchP() {
      this.switchPlans = !this.switchPlans;
      this.isRotate = !this.isRotate;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.headsplan {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .headsplan_con {
    @include between;
    background: url(~img/goucai/goucaibg.png);
    width: 100%;
    height: poTorem(48px);
    // position: relative;
    position: fixed;
    z-index: 3000 !important;
    top: 0;
    a {
      position: relative;
      width: 20%;
      height: poTorem(48px);
    }
    .iconchat {
      background: url(~img/shouye/back.png) no-repeat;
      width: poTorem(40px);
      height: poTorem(35px);
      position: absolute;
      top: 30%;
      left: 30%;
      background-size: poTorem(20px) poTorem(20px);
    }
    .title {
      width: 37%;
      height: poTorem(33px);
      @include center;
      border-radius: 5px;
      border: poTorem(1px) solid #fff;
      font-size: poTorem(18px);
      color: #fff;
      font-weight: bolder;
      .center_box {
        text-align: center;
      }
      .trangle {
        width: 0px;
        height: 0px;
        border-bottom: solid poTorem(8px) $mainColor;
        border-right: solid poTorem(8px) $mainColor;
        border-top: solid poTorem(8px) #ffffff;
        border-left: solid poTorem(8px) $mainColor;
        margin-left: poTorem(12px);
        margin-top: poTorem(10px);
      }
    }
    .switch {
      @include center;
      width: 20%;
      span {
        font-size: poTorem(17px);
        color: #fff;
        font-weight: bolder;
      }
      i {
        display: inline-block;
        margin-right: 0.5rem;
        background: url(~img/goucai/switch.png);
        width: poTorem(18px);
        height: poTorem(18px);
        background-size: poTorem(18px) poTorem(18px);
        transition: all 0.3s ease;
      }
      .rotate_pos {
        transform: rotate(180deg);
      }
    }
  }
  .switch_tc {
    width: 9rem;
    margin-top: poTorem(48px);
    margin-left: 8.45rem;
    border-radius: poTorem(3px);
    .switch_list {
      width: 95%;
      margin: 0 auto;
      color: #525252;
      font-weight: 600;
      font-size: poTorem(18px);
      .switch_list_li {
        text-align: center;
        height: poTorem(40px);
        line-height: poTorem(40px);
        border-top: poTorem(1px) solid #dfdfdf;
      }
      li:nth-child(1) {
        border: 0 solid #fff;
      }
      .active {
        color: #e53939 !important;
      }
    }
  }
}
</style>
