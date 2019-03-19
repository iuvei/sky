<template>
  <div class="betting_right">
    <div class="select"
         style="border:none;height:1rem;"></div>
    <span :class="['odds']"
          v-if="odd && odd.length">(赔率：{{odd}})</span>
    <div class="betting_con">
      <!-- 循环投注页面 -->
      <div class="con_item"
           v-for="(item,index) in dataSet"
           :key="index">
        <span>{{item.name}}</span>
        <ul ref="ballOptions">
          <!-- 其他 -->
          <li class="sm"
              @click="clickBall(item, ball)"
              v-for="(ball,indexs) in item.data"
              :key="indexs"
              :class="{'choosed': ball.checked}">
            <label for=""><input type="checkbox"
                     v-model="ball.checked"></label>
            <div class="ball"
                 :class="[{'choosed': ball.checked}]">{{ball.name}}</div>
            <div class="peilv_num"
                 v-if="!odd || !odd.length">{{ball.peilv}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "qxc_doubleplay",
  props: ["switchs", "playList", "curPlayItem", "dataSet"],
  data() {
    return {
      show: false
    };
  },
  methods: {
    changeList(item, index) {
      this.$emit("changeList", item, index);
    },
    changeGameType() {
      // this.show = !this.show
      // this.playList.map((item, index) => {
      //   item.name == val && (this.player = item)
      // })
    },
    clickBall(row, ball) {
      this.$emit("chooseBall", row, ball);
    }
  },
  computed: {
    ...mapState({
      odd: state => {
        const odd = state.betting.odd;
        if (odd) {
          return odd.includes("|") ? "" : odd;
        }
        return "";
      }
    }),
    modelTitle() {
      return (this.curPlayItem ? this.curPlayItem.playname : "") || "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
.betting_right {
  flex: 1;
  display: block;
  overflow: scroll;
  .select {
    @include center;
    width: poTorem(240px);
    height: poTorem(39px);
    border: poTorem(1px) solid #eaeaea;
    border-radius: poTorem(5px);
    font-size: poTorem(16px);
    color: #434343;
    position: relative;
    margin: 0 auto;
    margin-top: poTorem(15px);
  }
  .odds {
    color: #535353;
    margin: poTorem(10px) 0 0px 0;
    font-size: poTorem(14px);
    display: block;
    text-align: center;
  }
  .by_right {
    text-align: right;
  }
  .betting_right_bottom {
    position: fixed;
    bottom: poTorem(65px);
    width: 100%;
  }
}
.betting_con {
  @include column;
  width: 100%;
  .con_item {
    width: 100%;
    @include column;
    border-bottom: poTorem(1px) solid #dbdbdb;
    padding: 0 poTorem(18px) 0 poTorem(24px);
    margin-top: poTorem(5px);
    &:last-child {
      border-bottom: none;
    }
    span {
      align-self: flex-start;
      color: #707070;
      font-size: poTorem(16px);
    }
    ul {
      &.lhd {
        justify-content: space-around;
      }
      @include start;
      width: 100%;
      flex-wrap: wrap;
      margin-bottom: poTorem(10px);
      li {
        position: relative;
        outline: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        @include center;
        width: poTorem(45px);
        height: poTorem(45px);
        border-radius: 50%;
        background: #fff;
        margin-left: poTorem(16px);
        margin-top: poTorem(10px);
        border: poTorem(1px) solid #dbdbdb;
        font-size: poTorem(20px);
        font-weight: 900;
        color: #e33939;
      }
      li.sm {
        height: auto;
        border-radius: unset;
        border: none;
        flex-wrap: wrap;
        .ball {
          display: inline-block;
          border: poTorem(1px) solid #dbdbdb;
          line-height: poTorem(43px);
          text-align: center;
          font-size: poTorem(20px);
          color: #e33939;
          height: poTorem(45px);
          width: poTorem(45px);
          border-radius: 50%;
          transition: background-color 0.2s ease;
        }
        .peilv_num {
          color: #707070;
          font-size: poTorem(12px);
        }
        > label {
          width: 100%;
          height: 100%;
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          input {
            opacity: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
        }
        .choosed {
          background-color: #e33939;
          color: #fff !important;
          border: none;
        }
      }
    }
    .danshi {
      width: 100%;
      height: 100%;
      p {
        font-size: poTorem(16px);
        color: #535353;
      }
      .caution {
        color: $mainColor;
      }
      textarea {
        width: 100%;
        height: 100%;
        font-size: 1rem;
        letter-spacing: poTorem(2px);
        padding: poTorem(5px) poTorem(10px);
        border: poTorem(1px) solid #d3d3d3;
        border-radius: poTorem(5px);
        margin-bottom: poTorem(30px);
      }
    }
  }
}
</style>
