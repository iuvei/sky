<template>
  <!-- 投注界面 -->
  <div class="ladder-betting">
    <div class="one-game">
      <div class="wanfa-title"
           style="display:none">双面</div>
      <yd-flexbox>
        <yd-flexbox-item>号码</yd-flexbox-item>
        <yd-flexbox-item>赔率</yd-flexbox-item>
        <yd-flexbox-item>号码</yd-flexbox-item>
        <yd-flexbox-item>赔率</yd-flexbox-item>
      </yd-flexbox>

      <yd-flexbox>
        <yd-flexbox-item>
          <yd-badge bgcolor="#dcdcdc"
                    color="#333">左</yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:dataSet2[0].checked}]"
                         @click.native="selectClick(keys[0])">
          {{dataSet2[0].peilv}}
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-badge bgcolor="#dcdcdc"
                    color="#333">右</yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:dataSet2[1].checked}]"
                         @click.native="selectClick(keys[1])">
          {{dataSet2[1].peilv}}
        </yd-flexbox-item>
      </yd-flexbox>

      <yd-flexbox>
        <yd-flexbox-item>
          <yd-badge bgcolor="#626262"
                    color="#FFF">3</yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:dataSet2[2].checked}]"
                         @click.native="selectClick(keys[2])">
          {{dataSet2[2].peilv}}
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-badge bgcolor="#626262"
                    color="#FFF">4</yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:dataSet2[3].checked}]"
                         @click.native="selectClick(keys[3])">
          {{dataSet2[3].peilv}}
        </yd-flexbox-item>
      </yd-flexbox>

      <yd-flexbox>
        <yd-flexbox-item>
          <yd-badge bgcolor="#1AA1E7"
                    color="#FFF">单</yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:dataSet2[4].checked}]"
                         @click.native="selectClick(keys[4])">
          {{dataSet2[4].peilv}}
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-badge bgcolor="#E33B3F"
                    color="#FFF">双</yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:dataSet2[5].checked}]"
                         @click.native="selectClick(keys[5])">
          {{dataSet2[5].peilv}}
        </yd-flexbox-item>
      </yd-flexbox>

    </div>

    <div class="one-game">
      <div class="wanfa-title">终点X梯子</div>
      <yd-flexbox>
        <yd-flexbox-item>号码</yd-flexbox-item>
        <yd-flexbox-item>赔率</yd-flexbox-item>
        <yd-flexbox-item>号码</yd-flexbox-item>
        <yd-flexbox-item>赔率</yd-flexbox-item>
      </yd-flexbox>

      <yd-flexbox>
        <yd-flexbox-item>
          <yd-badge bgcolor="#1AA1E7"
                    color="#FFF">
            单
            <yd-badge bgcolor="#626262"
                      color="#FFF"
                      style="right:-.5rem;top:0;">3</yd-badge>
          </yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:dataSet2[6].checked}]"
                         @click.native="selectClick(keys[6])">
          {{dataSet2[6].peilv}}
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-badge bgcolor="#E33B3F"
                    color="#FFF">
            双
            <yd-badge bgcolor="#626262"
                      color="#FFF"
                      style="left:-.5rem;top:0;">3</yd-badge>
          </yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:dataSet2[7].checked}]"
                         @click.native="selectClick(keys[7])">
          {{dataSet2[7].peilv}}
        </yd-flexbox-item>
      </yd-flexbox>

      <yd-flexbox>
        <yd-flexbox-item>
          <yd-badge bgcolor="#1AA1E7"
                    color="#FFF">
            单
            <yd-badge bgcolor="#626262"
                      color="#FFF"
                      style="left:-.5rem;top:0;">4</yd-badge>
          </yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:dataSet2[8].checked}]"
                         @click.native="selectClick(keys[8])">
          {{dataSet2[8].peilv}}
        </yd-flexbox-item>
        <yd-flexbox-item>
          <yd-badge bgcolor="#E33B3F"
                    color="#FFF">
            双
            <yd-badge bgcolor="#626262"
                      color="#FFF"
                      style="right:-.5rem;top:0;">4</yd-badge>
          </yd-badge>
        </yd-flexbox-item>
        <yd-flexbox-item :class="['bet-area',{selected:dataSet2[9].checked}]"
                         @click.native="selectClick(keys[9])">
          {{dataSet2[9].peilv}}
        </yd-flexbox-item>
      </yd-flexbox>
    </div>

  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
const keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// const labels = ['左', '右', '三', '四', '单', '双', '单3', '双3', '单4', '双4']
export default {
  name: "chat_room_bet_area_ladder",
  props: ["curPlayItem", "dataSet"],
  data() {
    return {
      keys
    };
  },
  computed: {
    ...mapState({
      playItem: state => state.betting.curPlayItem
    }),
    dataSet2() {
      return (
        (this.dataSet[0] &&
          this.dataSet[0].data.length === 10 &&
          this.dataSet[0].data) ||
        Array(10).fill({})
      );
    }
  },
  watch: {},
  activated() {},
  deactivated() {},
  methods: {
    ...mapActions(["setBetNumber"]),
    selectClick(n) {
      this.dataSet[0].data[n].checked = !this.dataSet[0].data[n].checked;
      this.setBetNumber(this.dataSet[0].data.filter(el => el.checked).length);
    },
    clearBalls() {
      this.setBetNumber(0);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.ladder-betting {
  height: calc(97.5vw - 6rem);
  overflow-y: scroll;
  user-select: none;
  text-align: center;
  font-size: 1rem;
  padding: 0.7rem;
  .bet-area {
    background-color: #ffffff;
  }
  .one-game {
    margin-bottom: 0.7rem;
    background-color: #f5f5f5;
    border-radius: 0.3rem;
    border: 1px solid #dddddd;
    .wanfa-title {
      color: #313131;
      line-height: 3.1rem;
      font-size: 1.2rem;
      border-bottom: 1px solid #dddddd;
    }
    .yd-flexbox {
      line-height: 3rem;
      height: 3rem;
      &:nth-of-type(n + 3) {
        border-top: 1px solid #dddddd;
        .yd-flexbox-item:nth-child(n + 2) {
          // color: red;
          border-left: 1px solid #dddddd;
        }
      }
      .yd-flexbox-item {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        & > .yd-badge {
          position: relative;
          min-width: 2.5rem;
          min-height: 2.5rem;
          padding: 0;
          font-size: 1rem;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          .yd-badge {
            position: absolute;
            min-width: 1rem;
            min-height: 1rem;
            padding: 0;
            font-size: 0.8rem;
            display: inline-flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .yd-flexbox-item.selected {
        background-color: #e33b3f;
        color: #ffffff;
      }
    }
  }
}
</style>
