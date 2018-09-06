<template>
  <div class="trend">
    <trend-head></trend-head>
    <trend-list :lotterid="gameId"></trend-list>
    <div class="trend_bottom">
      <span>{{gameName}}</span>
      <div @click="$router.push('/betting')">去投一注</div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import trendList from "./trendList";
import trendHead from "./trendHead";
export default {
  components: {
    trendList,
    trendHead
  },
  computed: {
    ...mapState({
      gameName: state => state.trend.gameName,
      gameId: state => state.trend.gameId
    })
  },
  activated() {
    // this.$nextTick(() => {
    //   let chart = document.querySelector(".echart");
    //   if (chart) {
    //     let tab = document.querySelector(".tab_content");
    //     tab.addEventListener(
    //       "scroll",
    //       function(e) {
    //         console.log("cccc");
    //       },
    //       false
    //     );
    //   }
    // });
    // console.log("indexvue activated");
    // document.body.addEventListener(
    //   "click",
    //   function() {
    //     console.log("233");
    //   },
    //   false
    // );
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.tab_content,
.trend {
  -webkit-overflow-scrolling: auto;
}
.trend {
  .trend_bottom {
    position: fixed;
    bottom: poTorem(57px);
    background: #fff;
    z-index: 109;
    width: 100%;
    padding: poTorem(8px) 0 poTorem(8px) 0;
    height: poTorem(48px);
    font-size: poTorem(15px);
    text-indent: 1em;
    box-sizing: border-box;
    border-top: 1px solid #ddd;
    @include between;
    div {
      display: inline-block;
      width: poTorem(100px);
      text-indent: 0;
      text-align: center;
      border-radius: 3px;
      color: #fff;
      background: #ff7c34;
      height: poTorem(30px);
      line-height: poTorem(30px);
      margin-right: 1em;
      font-weight: 600;
    }
  }
}
</style>
