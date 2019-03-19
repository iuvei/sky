<template>
  <!-- 投注界面 -->
  <div class="lucky-farm-betting">
    <div class="bet-area">
      <ul class="submenus"
          v-if="dataSet.length>1">
        <li v-for="(item, index) in dataSet"
            :key="index"
            :class="{'active': curSub === index}"
            @click="curSub=index">{{item.name}}</li>
      </ul>
      <div class="con_item">
        <!-- 快捷操作-->
        <div class="head"
             v-if="dataSet.length==1">
          <span class="arrow">{{dataSet[curSub].name}}</span>
        </div>
        <ul class="balls">
          <li @click.stop="clickBall(ball)"
              v-for="ball in dataSet[curSub].data"
              :key="ball.value"
              class="shift_line">
            <div class="ball"
                 ref="ballOptions"
                 :class="[{choosed: ball.checked}]">{{ball.name}}</div>
            <div class="peilv-num">{{ball.peilv}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "chat_room_bet_area_lucky_farm",
  props: ["curPlayItem", "odds", "dataSet"],
  data() {
    return {
      curSub: 0
    };
  },
  computed: {
    ...mapState({
      playItem: state => state.betting.curPlayItem
    }),
    playid() {
      return (this.playItem && this.playItem.playid) || 1;
    }
  },
  watch: {},
  activated() {},
  deactivated() {},
  methods: {
    ...mapActions(["setBetNumber"]),
    clickBall(ball) {
      ball.checked = !ball.checked;
      const count = this.dataSet.reduce((f, el) => el.data.filter(el => el.checked).length + f, 0);
      this.setBetNumber(count);
    },
    clearBalls() {
      this.setBetNumber(0);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.lucky-farm-betting {
  height: calc(97.5vw - 6rem);
  overflow-y: scroll;
  user-select: none;
  text-align: center;
  font-size: 1rem;
  background: rgb(243, 243, 243);
  .submenus {
    width: 100%;
    height: 2.5rem;
    display: flex;
    flex-wrap: nowrap;
    background-color: #f3f3f3;
    overflow-x: auto;
    z-index: 13;
    margin-bottom: 1.5rem;
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
      padding: 0 15px;
      font-size: 1rem;
      &.active {
        color: #e33939;
        border-bottom: 2px solid #e33939;
      }
    }
  }
  .bet-area {
    width: 100%;
    padding: 1rem 0.7rem;
    flex: 1;
    overflow-y: scroll;
    .head {
      @include center;
      justify-content: flex-start;
    }
    .arrow {
      @include center;
      background: url(~img/goucai/morenzhuangtai.png) no-repeat;
      min-width: 30%;
      padding: 0.7rem;
      background-size: contain;
      background-position: center;
      font-size: poTorem(16px);
      // color: #e13939;
      color: #666;
      // margin-right: poTorem(20px);
      margin-right: poTorem(10px);
    }
    .con_item {
      margin-bottom: 1rem;
    }
    .balls {
      @include center;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0.3rem 0.7rem;
      > li {
        position: relative;
        width: 25%;
      }
      .peilv-num {
        padding: 0.3rem 0 0.5rem;
        font-weight: 900;
        color: #535353;
        text-align: center;
      }
      .ball {
        width: 94%;
        margin-left: 3%;
        background: #fff;
        border-radius: 0.3rem;
        border: 1px solid #999;
        color: #e33939;
        font-size: poTorem(20px);
        line-height: poTorem(42px);
        text-align: center;
        transition: all 0.2s ease;
        &.choosed {
          background: #e33939;
          border: 1px solid #e33939;
          color: #fff;
        }
      }
      input {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
}
</style>
