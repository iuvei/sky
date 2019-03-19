<template>
  <div :class="[{'ios_lotteryHistory': !iosKaijiang}, 'lotteryHistory']">
    <div class="top_naviga">
      <ul :class="[{'ios_history_tab': isnested}, 'history_tab']"
          v-if="heads.length">
        <li v-for="(item, index) in heads"
            :key="index"
            :class="{'active': activeIndex==index}"
            @click="light(index)">{{item}}</li>
      </ul>
      <div v-if="isLhc"
           :class="[{'ios_history_tab': isnested}, 'history_tab']">
        <div class="lhc_special">开奖结果</div>
      </div>
      <div v-if="activeIndex==0 || isLhc"
           :class="[{'ios_tab_content': isnested}, 'tab_content']">
        <lotterySsckjxq :datas="listType"
                        :indexFlag="indexFlag"
                        class="animtes"
                        v-if="listType.js_tag === 'ssc'"></lotterySsckjxq>
        <lotteryLhckjxq :datas="listType"
                        :indexFlag="indexFlag"
                        class="animtes"
                        v-if="listType.js_tag === 'lhc'"></lotteryLhckjxq>
        <lotterySdkjxq :datas="listType"
                       :indexFlag="indexFlag"
                       class="animtes"
                       v-if="listType.js_tag === '3d'"></lotterySdkjxq>
        <lotterySyxwkjxq :datas="listType"
                         :indexFlag="indexFlag"
                         class="animtes"
                         v-if="listType.js_tag === '11x5'"></lotterySyxwkjxq>
        <lotteryPkskjxq :datas="listType"
                        :indexFlag="indexFlag"
                        class="animtes"
                        v-if="['pk10'].includes(listType.js_tag)"></lotteryPkskjxq>
        <lotteryPcddkjxq :datas="listType"
                         :indexFlag="indexFlag"
                         class="animtes"
                         v-if="listType.js_tag === 'pcdd'"></lotteryPcddkjxq>
        <lotteryKskjxq :datas="listType"
                       :indexFlag="indexFlag"
                       class="animtes"
                       v-if="listType.js_tag === 'k3'"></lotteryKskjxq>

        <lotteryHnqxckjxq :datas="listType"
                          :indexFlag="indexFlag"
                          class="animtes"
                          v-if="listType.js_tag === 'qxc'"></lotteryHnqxckjxq>
        <lotteryJdtzkjxq :datas="listType"
                         :indexFlag="indexFlag"
                         class="animtes"
                         v-if="listType.js_tag === 'tzyx'"></lotteryJdtzkjxq>
        <lotteryXypkkjxq :datas="listType"
                         :indexFlag="indexFlag"
                         class="animtes"
                         v-if="listType.js_tag === 'xypk'"></lotteryXypkkjxq>
        <lotteryPknnkjxq :datas="listType"
                         :indexFlag="indexFlag"
                         class="animtes"
                         v-if="listType.js_tag === 'pkniuniu'"></lotteryPknnkjxq>
        <lotteryXynckjxq :datas="listType"
                         :indexFlag="indexFlag"
                         class="animtes"
                         v-if="listType.js_tag === 'xync'"></lotteryXynckjxq>
      </div>
      <div v-show="activeIndex > 0 && !isLhc"
           :class="[{'ios_tab_content': isnested}, 'tab_content']">
        <trend-list :lotterid="gameId"></trend-list>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import lotterySsckjxq from "./components/lotterySsckjxq";
import lotteryLhckjxq from "./components/lotteryLhckjxq";
import lotteryKskjxq from "./components/lotteryKskjxq";
import lotteryPkskjxq from "./components/lotteryPkskjxq";
import lotterySyxwkjxq from "./components/lotterySyxwkjxq";
import lotteryPcddkjxq from "./components/lotteryPcddkjxq";
import lotterySdkjxq from "./components/lotterySdkjxq";

import lotteryHnqxckjxq from "./components/lotteryHnqxckjxq"; // 0813
import lotteryJdtzkjxq from "./components/lotteryJdtzkjxq"; // 0813
import lotteryXypkkjxq from "./components/lotteryXypkkjxq"; // 0813
import lotteryPknnkjxq from "./components/lotteryPknnkjxq"; // 0813
import lotteryXynckjxq from "./components/lotteryXynckjxq"; // 0813
import trendList from "../../zouShi/components/trend/trendList";
import { getTrendDigitByName } from "~/js/trendUtil";
export default {
  props: ["listType", "iosKaijiang"],
  data() {
    return {
      indexFlag: "1",
      gameId: "",
      // heads: [],
      sscHead: [
        "开奖结果",
        "万位走势",
        "千位走势",
        "百位走势",
        "十位走势",
        "个位走势"
      ],
      xyncHead: ["开奖结果", "小区", "大区"],
      hnqxcHead: ["开奖结果", "千位走势", "百位走势", "十位走势", "个位走势"],
      sandiHead: ["开奖结果", "百位走势", "十位走势", "个位走势"],
      elevenFiveHead: [
        "开奖结果",
        "一位走势",
        "二位走势",
        "三位走势",
        "四位走势",
        "五位走势"
      ],
      pk10Head: [
        "开奖结果",
        "冠军",
        "亚军",
        "季军",
        "第四名",
        "第五名",
        "第六名",
        "第七名",
        "第八名",
        "第九名",
        "第十名"
      ],
      pknnHead: [
        "开奖结果",
        "冠军",
        "亚军",
        "季军",
        "第四名",
        "第五名",
        "第六名",
        "第七名",
        "第八名",
        "第九名",
        "第十名"
      ],
      pcddHead: ["开奖结果", "正码一", "正码二", "正码三"],
      k3Head: ["开奖结果", "一位走势", "二位走势", "三位走势"],
      activeIndex: 1,
      heads: []
    };
  },
  components: {
    lotterySsckjxq,
    lotteryLhckjxq,
    lotteryKskjxq,
    lotteryPkskjxq,
    lotterySyxwkjxq,
    lotteryPcddkjxq,
    lotterySdkjxq,
    trendList,
    lotteryHnqxckjxq,
    lotteryJdtzkjxq,
    lotteryXypkkjxq,
    lotteryPknnkjxq,
    lotteryXynckjxq
  },
  computed: {
    ...mapState({
      digits: state => state.trend.digits,
      isnested: state => state.isnested
    }),
    isLhc() {
      return (
        this.listType.js_tag === "lhc" ||
        this.listType.js_tag === "tzyx" ||
        this.listType.js_tag === "xypk"
      );
    }
    // heads() {
    //   let heads = heads[this.listType.js_tag];
    //   heads[this.listType.js_tag];
    //   return heads ? heads : [];
    // }
  },
  methods: {
    light(i) {
      console.log(i);
      this.activeIndex = i;
      this.setTrendval(i - 1);
      this.gameId = this.listType.lotter_id;
    },
    getHeads() {
      const headObj = {
          // 0813
          xync: this.xyncHead,
          pkniuniu: this.pknnHead,
          qxc: this.hnqxcHead,

          ssc: this.sscHead,
          "3d": this.sandiHead,
          "11x5": this.elevenFiveHead,
          pk10: this.pk10Head,
          pcdd: this.pcddHead,
          k3: this.k3Head
        },
        heads = headObj[this.listType.js_tag];
      // heads[this.listType.js_tag];
      this.heads = heads ? heads : [];
    },
    ...mapActions(["setTrendval", "setGameNumbers"])
  },
  watch: {
    listType(newVal, oldVal) {
      // 第一次加载
      if (newVal && newVal.lotter_id && !oldVal.lotter_id) {
        this.setGameNumbers(getTrendDigitByName(newVal.game_name));
        const isKJXQ = this.$route.name == "kjxq" ? 0 : 1;
        this.light(isKJXQ);
        this.getHeads();
      }
      // 后续加载
      if (newVal && newVal.lotter_id && oldVal && oldVal.lotter_id) {
        this.setGameNumbers(getTrendDigitByName(newVal.game_name));
        const isKJXQ = this.$route.name == "kjxq" ? 0 : 1;
        this.light(isKJXQ);
        this.getHeads();
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setGameNumbers(getTrendDigitByName(this.listType.game_name));
    });
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.lotteryHistory {
  padding-bottom: 3rem;
  width: 100%;
  flex: 1;
  height: 0;
  height: calc(100% - 3rem);
  .top_naviga {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .lhc_special {
      height: 2.5rem;
      width: 100%;
      line-height: 2.5rem;
      background-color: #fff;
      text-align: center;
      font-size: poTorem(16px);
      color: $mainColor;
      border-bottom: poTorem(2px) solid $mainColor;
    }
    .history_tab {
      width: 100%;
      position: relative;
      height: 2.5rem;
      display: flex;
      flex-wrap: nowrap;
      background-color: #fff;
      overflow-x: auto;
      z-index: 13;
      &::-webkit-scrollbar {
        display: none;
      }
      li {
        flex: none;
        float: left;
        width: poTorem(100px);
        font-size: poTorem(16px);
        color: #585858;
        line-height: 2.5rem;
        text-align: center;
      }
      .active {
        border-bottom: poTorem(2px) solid $mainColor;
      }
    }
    .ios_history_tab {
      top: 0;
    }
    .tab_content {
      flex: 1;
      width: 100%;
      background-color: #fff;
      height: 0;
      height: calc(100% - 2.5rem);
      background-color: #fff;
      overflow-y: auto;
    }
    .ios_tab_content {
      padding-top: 0;
    }
  }
}

.ios_lotteryHistory {
  padding: 0;
}
</style>
