<template>
  <div class="lhc-bet-area">
    <div class="con_item"
         v-for="(item,index) in dataSet"
         :key="index">
      <!-- 快捷操作-->
      <div class="head">
        <span class="arrow">{{setArrowTitle(item)}}</span>
        <span data-v="2"
              class="odds"
              v-if="showPeilv">(赔率：{{peilv}})</span>
        <bet-actions v-if="showActions"
                     :row="item"
                     @doAction="doAction"></bet-actions>
      </div>
    </div>
    <div class="betting_right">
      <div class="betting_con">
        <!-- 循环投注页面 -->
        <div class="con_item"
             v-for="(item,index) in dataSet"
             :key="index">
          <ul :class="{'around':[3].includes(curPlayItem.playid)}">
            <!-- 其他 -->
            <li @click="clickBall(item, ball, indexs)"
                v-for="(ball, indexs) in item.data"
                :key="indexs"
                :class="[{l_ball:ball.type==3},{xxl_ball: ball.type==0},{xl_ball: ball.type==4},{s_ball:ball.type==2}, {m_ball:ball.type==1}]">
              <div ref="ballOptions"
                   :class="[{medium_box:ball.type==3},{big_box: ball.type==0},{xxl_box: ball.type==4},{lottery_options:ball.type==2}, {square_box:ball.type==1, 'choosed': ball.checked}]">
                <span>
                  {{ball.name}}
                </span>
                <div v-if="[0, 3, 4].includes(ball.type)"
                     :class="{grid:[3,9].includes(curPlayItem.playid),wxgrid:[9].includes(curPlayItem.playid) && !isSupportGridLayout,flexgrid:[3].includes(curPlayItem.playid)}">
                  <span v-for="(item, index) in ball.numbers "
                        :key="index ">
                    {{item}}
                  </span>
                </div>
              </div>
              <div v-if="peilvs.length"
                   class="peilv_num">{{Array.isArray(peilvs) && peilvs.length && peilvs.length > 0 ? peilvs[indexs] : '-'}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BetActions from "./BetActions";
import mixin from "./betAreaMixin";
export default {
  name: "BetAreaLhc",

  mixins: [mixin],

  components: {
    BetActions
  },

  props: ["curPlayItem", "dataSet", "placeholder", "odds", "instance"],

  data() {
    return {
      myPlaceholder: "",
      danshiExcl: "",
      peilvs: this.odds,
      peilv: this.odds.length === 1 ? this.odds[0] : "-",
      isSupportGridLayout: CSS.supports("display", "grid")
    };
  },

  methods: {
    // 选择球
    clickBall(item, ball) {
      ball.checked = !ball.checked;
      this.linkToFastSelect(item);
      this.$emit("clickBall", item, ball);
      if (this.isDynamicOdd) {
        this.$emit("clickBall", item, ball, this.calcDynamicOdd);
      } else this.$emit("clickBall", item, ball);
    },

    // 计算选球时显示的动态赔率
    calcDynamicOdd() {
      const len = this.dataSet[0].data.filter(x => x.checked).length;
      switch (this.curPlayItem.playid) {
        case 8:
          this.peilv = len - 2 >= 0 ? this.odds[len - 2] : "0.0";
          break;
        case 21:
          this.peilv = len - 6 >= 0 ? this.odds[len - 6] : "0.0";
          break;
      }
    },

    // 设置赔率
    setOdds(playid) {
      switch (playid) {
        case 30:
          this.peilv = (this.odds || this.peilvs).join("|");
          this.peilvs = [];
          break;
        case 8:
        case 21:
          this.peilv = "0.0";
          this.peilvs = [];
          break;
        default:
          if (this.odds == this.peilvs) return;
          this.peilvs = this.odds;
          this.peilv = this.odds.length === 1 ? this.odds[0] : "-";
          break;
      }
    }
  },

  computed: {
    showPeilv() {
      return (
        this.curPlayItem &&
        [8, 21, 30, 31, 32, 33, 34, 35].includes(this.curPlayItem.playid)
      );
    },
    // 是否是动态赔率
    isDynamicOdd() {
      // 合肖，自选不中 需要根据选球的个数来显示不同的赔率
      return this.curPlayItem && [8, 21].includes(this.curPlayItem.playid);
    }
  },

  beforeMount() {
    this.setFastSelect(this.dataSet);
  },
  activated() {
    this.setFastSelect(this.dataSet);
  },

  watch: {
    curPlayItem(val) {
      if (val && val.playid) {
        // switch (val.playid) {
        //   case 30:
        //     this.peilv = this.peilvs.join("|");
        //     this.peilvs = [];
        //     break;
        //   case 8:
        //   case 21:
        //     this.peilv = "0.0";
        //     this.peilvs = [];
        //     break;
        //   default:
        //     if (this.odds == this.peilvs) return;
        //     this.peilvs = this.odds;
        //     this.peilv = this.odds.length === 1 ? this.odds[0] : "-";
        //     break;
        // }
        this.setOdds(val.playid);
      }
    },
    odds(val, oldVal) {
      if (val !== oldVal) {
        // this.peilvs = this.odds;
        // this.peilv = this.odds.length === 1 ? this.odds[0] : "-";
        this.setOdds(this.curPlayItem.playid);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.lhc-bet-area {
  height: calc(97.5vw - 6rem);
  background: rgb(243, 243, 243);
  width: 100%;
  padding: 0.85rem;
  flex: 1;
  display: block;
  overflow-y: scroll;
  .betting_right {
    flex: 1;
    display: block;
    overflow: scroll;
    .odds {
      color: #535353;
      margin: poTorem(10px) 0 0px 0;
      font-size: poTorem(14px);
      display: block;
      text-align: center;
    }
  }
  .betting_con {
    @include column;
    width: 100%;
    .con_item {
      width: 100%;
      @include column;
      border-bottom: poTorem(1px) solid #dbdbdb;
      margin-top: poTorem(5px);
      &:last-child {
        border-bottom: none;
      }
      > span {
        align-self: flex-start;
        color: #707070;
        font-size: poTorem(16px);
      }
      ul {
        @include around;
        justify-content: flex-start;
        flex-wrap: wrap;
        &.around {
          @include start;
        }
        li {
          position: relative;
          outline: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          @include column;
          padding: poTorem(5px) poTorem(5px);
          color: #707070;
          .big_box,
          .medium_box,
          .xxl_box {
            background-color: #fff;
            color: #e33939;
            width: poTorem(165px);
            height: poTorem(100px);
            border: poTorem(1px) solid #dbdbdb;
            border-radius: poTorem(5px);
            text-align: center;
            > div {
              display: flex;
              justify-content: space-around;
              > span {
                font-size: 0.9rem;
              }
            }
            > div.grid {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              grid-gap: poTorem(3px);
              padding: 0 2px;
            }
            > div.flexgrid {
              justify-content: flex-start;
              flex-wrap: wrap;
              > span {
                // padding: 0.3rem poTorem(8px);
                padding: 0 poTorem(6px);
                font-size: poTorem(12px);
              }
            }
            > div.wxgrid {
              justify-content: flex-start;
              flex-wrap: wrap;
              > span {
                // display: inline-block;
                // width: poTorem(21px);
                // height: poTorem(21px);
                display: inline-block;
                width: 1.3125rem;
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                width: 100%;
              }
            }
            > span {
              font-size: poTorem(18px);
              display: block;
            }
            p {
              @include start;
              flex-wrap: wrap;
              padding: 0 poTorem(10px);
              span {
                display: inline-block;
                width: poTorem(25px);
                font-size: poTorem(16px);
              }
            }
          }
          .big_box {
            height: 7rem;
            > p {
              font-size: 1rem;
              text-align: justify;
              line-height: 1.6;
            }
          }
          .medium_box,
          .xxl_box {
            width: poTorem(165px);
            height: poTorem(50px);
            p {
              @include around;
              padding: 0;
              span {
                width: auto;
              }
            }
          }
          .xxl_box {
            height: poTorem(88px);
            p > span:first-child {
              padding: 0 1px;
            }
            > p {
              text-align: center;
              line-height: 1.5;
            }
          }
          .medium_box {
            width: poTorem(115px);
          }
          div {
            text-align: center;
          }
          .lottery_options {
            width: poTorem(45px);
            height: poTorem(45px);
            border-radius: 50%;
            background: #fff;
            border: poTorem(1px) solid #dbdbdb;
            font-size: poTorem(22px);
            line-height: poTorem(43px);
            color: #e33939;
            font-weight: 900;
          }
          .square_box {
            width: poTorem(70px);
            height: poTorem(40px);
            border: poTorem(1px) solid #dbdbdb;
            border-radius: poTorem(5px);
            font-size: poTorem(18px);
            line-height: poTorem(38px);
            color: #e33939;
            background-color: #fff;
          }
          > .choosed {
            background-color: #e33939;
            color: #fff;
            border: none;
          }
          .peilv_num {
            padding-top: 0.5rem;
            // font-weight: 900;
            color: #878787;
          }
          label {
            width: 100%;
            height: 100%;
            position: absolute;
            opacity: 0;
            input {
              width: 100%;
              height: 100%;
              border: none;
            }
          }
        }
        .s_ball {
          padding-right: 2rem;
          &:nth-child(5n) {
            padding-right: 0;
          }
        }
        .m_ball {
          padding-right: 1.7rem;
          &:nth-child(4n) {
            padding-right: 0;
          }
        }
        .l_ball {
          padding-right: 0.6rem;
          &:nth-child(3n) {
            padding-right: 0;
          }
        }
        .xl_ball {
          padding-right: 2rem;
          &:nth-child(2n) {
            padding-right: 0;
          }
        }
        .xxl_ball {
          padding-right: 2.5rem;
          &:nth-child(2) {
            padding-right: 0;
          }
        }
      }
    }
  }
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
}
</style>
