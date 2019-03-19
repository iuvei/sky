<template>
  <div class="ladder">
    <heads :routes="routes"></heads>
    <div class="other-block">
      <div class="one-block">
        <div v-show="showPanel"
             class="count-down">
          <second-time ref="countDown"
                       :time="countDown"
                       :callback="timer_callback"></second-time>
        </div>
        <canvas id="canvas"
                :width="canvasWidth"
                :height="canvasHeight"
                :style="{width:cssWidth+'px',height:cssHeight+'px'}"></canvas>
      </div>
      <history @ladder="ladderReady"></history>
      <betting></betting>

    </div>
    <!-- 购物车 -->
    <shop :quotation="closeIsShow"
          @clearAll='transmit'></shop>

  </div>
</template>
<script>
import { mapState } from "vuex";
import heads from "../head";
import ladder from "./ladder.js";
import secondTime from "./components/secondTime";
import history from "./components/history";
import betting from "./components/betting";
// import shop from "./components/shop";
import shop from "../shop";

const canvasWidth = 230;
const canvasHeight = 160;
export default {
  name: "ladder-index",
  components: {
    heads,
    secondTime,
    history,
    betting,
    shop
  },
  data() {
    return {
      routes: {},
      showPanel: false,
      countDown: 3,
      canvasWidth,
      canvasHeight,
      ladder: null,
      ladder_status: []
    };
  },
  computed: {
    ...mapState({
      closeIsShow: state => state.betting.closeIsShow
    }),
    cssWidth() {
      // console.error(window.devicePixelRatio)
      return (this.canvasWidth / window.devicePixelRatio) * 1.5;
    },
    cssHeight() {
      return (this.canvasHeight / window.devicePixelRatio) * 1.5;
    }
  },
  watch: {
    // showPanel(showPanel) {
    //   if (showPanel) {
    //       this.$refs.countDown.run();
    //       this.ladder.drawBg();
    //   } else {
    //     // 开奖
    //     const fourRoot = Math.random() > 0.5;
    //     const right = Math.random() > 0.5;
    //     this.ladder.drawBg(right, fourRoot);
    //     this.ladder.move(this.finishedMove);
    //   }
    // }
  },
  activated() {},
  deactivated() {},
  mounted() {
    this.routes = this.$route.params;
    window.addEventListener("resize", this.ladderInit);
    this.ladderInit();
  },
  methods: {
    ladderReady(balls) {
      // console.error("ladderReady", balls, leftTime);
      this.showPanel = true;
      this.$refs.countDown.run();
      this.ladder_status = [balls[0] * 1, balls[1] * 1];
      this.ladder.drawBg();
    },
    finishedMove() {
      // window.setTimeout(() => {
      //   this.showPanel = true;
      // }, 2000);
    },
    timer_callback() {
      this.showPanel = false;
      this.$nextTick(() => {
        this.ladder.drawBg(...this.ladder_status);
        this.ladder.move();
      });
    },
    ladderInit() {
      const clientWidth = document.body.clientWidth - 30;
      this.canvasWidth = (clientWidth / 300) * canvasWidth;
      this.canvasHeight = (clientWidth / 300) * canvasHeight;
      this.$nextTick(() => {
        if (!this.ladder) this.ladder = new ladder("canvas");
        this.ladder.drawBg();
      });
    },
    transmit() {
      this.bus.$emit("clearBalls");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.ladder {
  @include between;
  flex-direction: column;
  .slidedown {
    background-image: url(~img/goucai/switch.png) !important;
  }
  .white-color {
    color: #ffffff;
    font-size: 1rem;
  }
  .one-block {
    background-image: url("~img/goucai/ladder-bg-0.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 0.7rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .count-down {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 15rem;
      height: 4rem;
      background-image: url("~img/goucai/ladder-bg-1.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
      line-height: 4rem;
      color: #fff;
      text-align: center;
      font-size: 3rem;
      font-weight: 600;
      background-color: rgba(115, 93, 79, 0.05);
    }
  }
}
</style>
