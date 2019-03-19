<template>
  <div class="bet-area"
       :class="{ 'pcdd' : game.js_tag === 'pcdd'}">
    <div class="con_item"
         v-for="(item, index) in items"
         :key="index">
      <ul class="balls"
          v-if="item && item.data"
          :class="{'elex5': item.data.length === 11}">
        <li @click="clickBall(item, ball)"
            v-for="(ball, ball_index) in item.data"
            :key="ball_index"
            :data-val="ball.value"
            :class="{'shift_line' : curPlayItem.playid == 7 && ball_index == 5}">
          <div ref="ballOptions"
               :class="[{'choosed': ball.checked},'ball']">{{ball.name}}</div>
          <div class="peilv_num"
               v-if="ball.peilv !== '-'">{{ball.peilv}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "chat_room_double_play_area",
  props: ["dataSet", "curPlayItem"],
  data() {
    return {
      items: this.dataSet
    };
  },

  computed: {
    ...mapState({
      game: state => state.betting.game
    })
  },

  methods: {
    // 设置箭头标题
    setArrowTitle(item) {
      if (!item) return "";
      return item.name;
    },
    // 选择球
    clickBall(row, ball) {
      this.$emit("clickBall", row, ball);
    }
  },

  watch: {
    dataSet(val) {
      if (val) this.items = val;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.bet-area {
  // height: 60vw;
  height: 18rem;
  background: rgb(243, 243, 243);
  width: 100%;
  padding: 0.85rem;
  flex: 1;
  display: block;
  overflow-y: scroll;

  .head {
    @include center;
    justify-content: flex-start;
  }
  .arrow {
    @include center;
    background: url(~img/goucai/morenzhuangtai.png) no-repeat;
    width: 24%;
    height: poTorem(50px);
    background-size: contain;
    background-position: center;
    font-size: poTorem(16px);
    color: #666;
    margin-right: poTorem(10px);
  }
  .actions {
    flex: 1;
    background: rgb(220, 220, 220);
    border-radius: poTorem(20px);
    @include center;
    padding: poTorem(3px) 0;
    > span {
      width: poTorem(34px);
      height: poTorem(34px);
      display: inline-block;
      color: #666;
      background: #fff;
      border-radius: 50%;
      font-size: poTorem(18px);
      line-height: poTorem(34px);
      text-align: center;
      margin: 0 poTorem(2px);
      border: 1px solid #ccc;
      &.active {
        background: #e33939;
        color: #fff;
      }
    }
  }
  .balls {
    @include center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 4px 0;
    &.elex5 {
      justify-content: flex-start;
      .ball {
        margin: poTorem(8px) poTorem(10px);
      }
    }
    .ball {
      width: 3rem;
      height: 3rem;
      margin: poTorem(8px) poTorem(13px);
      background: #fff;
      border-radius: 50%;
      border: 1px solid #999;
      color: #e33939;
      font-size: poTorem(22px);
      font-weight: bold;
      line-height: 3rem;
      text-align: center;
      transition: all 0.2s ease;
      &.choosed {
        background: #e33939;
        border: 1px solid #e33939;
        color: #fff;
      }
    }
    .peilv_num {
      text-align: center;
      padding-top: 0.5rem;
      // font-weight: 900;
      color: #878787;
    }
  }
}
.bet-area.pcdd {
  padding: 0.85rem 0;
  .balls {
    .ball {
      font-weight: inherit;
    }
  }
}
</style>
