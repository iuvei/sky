<template>
  <div class="k3-betting-area">
    <span :class="['odds']"
          v-if="odds && odds.length === 1">( 赔率：{{odds[0]}} )</span>
    <div class="betting_con">
      <!-- 循环投注页面 -->
      <div class="con_item"
           v-for="(item,index) in dataSet"
           :key="index">
        <span class="tip"
              v-if="item.name">{{item.name}}</span>
        <ul ref="ballOptions"
            :class="{'type4-wrapper': item.data[0].type === 4}">
          <li class="sm"
              @click="clickBall(item, ball)"
              v-for="(ball,indexs) in item.data"
              :key="indexs"
              :class="{'choosed': ball.checked,
              'type2':item.data[0].type === 2,
              'type3':item.data[0].type === 3, 
              'type4':item.data[0].type === 4}">
            <div :class="[{'ball':ball.type===1,'choosed': ball.checked, 'square':ball.type > 1}]">{{ball.name}}</div>
            <div class="peilv_num"
                 v-if="odds.length !== 1">{{ball.peilv}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "k3_chat_room_bet_area",
  props: ["curPlayItem", "dataSet", "odds"],

  data() {
    return {
      show: false
    };
  },

  methods: {
    changeList(item, index) {
      this.$emit("changeList", item, index);
    },
    clickBall(row, ball) {
      ball.checked = !ball.checked;
      this.$emit("clickBall", row, ball);
    }
  },

  computed: {
    ...mapState({
      isLogin: state => state.userinfo.isLogin
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.k3-betting-area {
  height: calc(97.5vw - 6rem);
  background: #f3f3f3;
  flex: 1;
  display: block;
  overflow: hidden;
  overflow-y: scroll;
  .odds {
    margin: poTorem(10px) 0 0px 0;
    font-size: 1rem;
    color: #878787;
    display: block;
    text-align: center;
  }
  .by_right {
    text-align: right;
  }
  .betting-area_bottom {
    position: fixed;
    bottom: poTorem(65px);
    width: 100%;
  }
  .tip {
    width: 6.5rem;
    text-align: center;
    margin: 6px 0;
    height: 2.5rem;
    line-height: 2.5rem;
    background: url(~img/goucai/morenzhuangtai.png) no-repeat;
    background-size: contain;
    background-position: center;
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
        background-color: #f3f3f3;
        // position: relative;
        outline: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        @include center;
        width: poTorem(45px);
        margin-left: poTorem(16px);
        margin-top: poTorem(10px);
        font-size: poTorem(20px);
        font-weight: 900;
        color: #e33939;
        &.type2 {
          width: 20%;
        }
        &.type3 {
          width: 29%;
          .square {
            width: 100%;
          }
        }
        &.type4 {
          width: 50%;
          .square {
            width: 100%;
          }
        }
      }
      li {
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
          background-color: #fff;
        }
        .square {
          background-color: #fff;
          display: inline-block;
          border-radius: 4px;
          border: poTorem(1px) solid #dbdbdb;
          line-height: 3rem;
          font-size: 1.5rem;
          height: 3rem;
          width: 5rem;
          text-align: center;
        }
        .peilv_num {
          color: #878787;
          // font-size: poTorem(12px);
          font-size: 12px;
          margin-top: 4px;
          font-weight: normal;
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
.type4-wrapper {
  justify-content: center !important;
}
</style>
