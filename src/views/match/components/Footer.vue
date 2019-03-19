<template>
  <footer class="match-footer">
    <!-- 投倍 -->
    <yd-flexbox class="double-block">
      <div class="play-toggle"
           @click="playTypeShow=!playTypeShow">{{getTypeTxt}}</div>
      <div class="triangle"></div>
      <yd-flexbox-item class="double-input">
        <span>投</span>
        <spinner min="1"
                 max="9999"
                 unit="10"
                 v-model="multiple2"
                 height="2.6rem"
                 style="width:60%;margin:0 .5rem;"></spinner>
        <span>倍</span>
      </yd-flexbox-item>
    </yd-flexbox>

    <!-- 过关方式  -->
    <yd-flexbox class="play-type-block"
                :class="{fadeInUp:playTypeShow}"
                v-show="playTypeShow">
      <div v-for="play in playTypeMap"
           :key='play.value'
           :class="['play-item', {'play-select':dg_select.includes(play.value)}, {'play-selected':playType.includes(play.value)}]"
           @click='playTypeClick(play)'>
        {{play.title}}
        <i class="selected-icon"></i>
      </div>
    </yd-flexbox>

    <!-- 投注 -->
    <yd-flexbox class="bet-button-block">
      <template v-if="page==='cart'">
        <yd-flexbox-item class="tip">
          <p style="font-size: 1.2rem;">共{{betDetail.bet_count}}注 {{betDetail.times}}倍
            <span style="color:#e2e673">{{betDetail.price}}</span>元
          </p>
          <p>预测奖金：{{betDetail.min_win_price}}元 - {{betDetail.max_win_price}}元</p>
        </yd-flexbox-item>
        <div class="picking-active-submit"
             @click="payClick">下注</div>
      </template>
      <template v-else>
        <div @click="clearClick"
             class="clear">
          <img :src="require('~/img/goucai/qingkong.png')"
               alt="">
        </div>
        <yd-flexbox-item class="tip">
          <p style="font-size: 1.2rem;"
             v-html="getTip"></p>
          <p>页面固定奖金仅供参考，请以投注时固定奖金为准</p>
        </yd-flexbox-item>
        <div class="picking-active-submit"
             @click="bettingClick">确定</div>
      </template>
    </yd-flexbox>
  </footer>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import debounce from "lodash/debounce";
import spinner from "./spinner_number";

export default {
  name: "match-footer",
  components: { spinner },
  props: ["page"],
  data() {
    return { playTypeShow: false };
  },
  computed: {
    ...mapGetters("match", [
      "noDG",
      "maxDG",
      "matchNum",
      "curGameData",
      "curRenderKey",
      "curMaxDG",
      "bet_data"
    ]),
    ...mapState("match", [
      "dgMap",
      "selectedKeys",
      "gameType",
      "gameTypeMap",
      "multiple",
      "playTypeMap",
      "playType",
      "betDetail"
    ]),
    multiple2: {
      get() {
        return this.multiple;
      },
      set(multiple) {
        this.updateField({ multiple });
      }
    },
    // user 选中的过关方式
    getTypeTxt() {
      let txt = "";
      if (!this.playTypeShow) {
        txt = this.playType
          .map(type => this.playTypeMap.find(el => el.value == type).title)
          .join(",");
      }
      txt = txt || "过关方式";
      return txt;
    },
    getTip() {
      let tip = `已选<span style="color:#e2e673">${this.matchNum}</span>场`;
      if (this.matchNum === 0) tip = "请选择比赛";
      if (this.matchNum === 1 && (this.gameType == -1 || this.noDG)) {
        tip += ',还差<span style="color:#e2e673">1</span>场';
      }
      return tip;
    },
    // 过关是否能选中
    dg_select() {
      const arr = Array.from(new Array(this.maxDG), (v, idx) => idx + "");
      if (this.gameType == -1 || this.noDG) {
        arr.shift();
      }
      return arr;
    }
  },
  watch: {
    // 改变当前选中的过关方式
    bet_data() {
      const playType = this.dg_select.length
        ? [this.dg_select[this.dg_select.length - 1]]
        : [];
      this.updateField({ playType });
    }
  },
  methods: {
    ...mapActions("match", ["updateField", "betting"]),
    clearClick() {
      this.updateField({ selectedKeys: [] });
    },
    // 选择过关方式
    playTypeClick({ value }) {
      if (!this.dg_select.includes(value)) return;
      const playType = Object.assign([], this.playType);
      const idx = playType.indexOf(value);
      if (idx === -1) {
        playType.push(value);
      } else {
        playType.splice(idx, 1);
      }
      playType.sort();
      this.updateField({ playType });
    },
    // 提交到购物车
    bettingClick() {
      if (this.gameType == -1 && this.matchNum < 2) {
        return this.$dialog.toast({
          mes: "请至少选择两场比赛"
        });
      }
      if (
        this.gameType != -1 &&
        ((this.matchNum < 2 && this.noDG) || (this.matchNum < 1 && !this.noDG))
      ) {
        return this.$dialog.toast({
          mes: "请至少选择两场比赛或选择一场单关比赛"
        });
      }
      if (!this.playType.length) {
        return window.vue.$dialog.toast({ mes: "请选择过关方式" });
      }
      this.$router.push("/match/cart");
    },
    // 下注
    payClick: debounce(async function() {
      const res = await this.betting();
      if (res && res.betslipId) {
        this.$dialog.toast({
          mes: "下注成功！",
          icon: "success"
          // timeout: 1000
        });
        const obj = {
          selectedKeys: [],
          playType: [],
          bet_obj: []
        };
        this.updateField(obj);
        this.$router.back();
      }
    }, 300)
  }
};
</script>

<style lang="scss" scoped>
@import "~css/resources.scss";
.match-footer {
  text-align: center;
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  .fadeInUp {
    animation-name: fadeInUp;
    animation-duration: 500ms;
  }
  .double-block {
    line-height: 3.6rem;
    border-top: 1px solid #dedede;
    .play-toggle {
      width: 6rem;
      padding-left: 0.2rem;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .triangle {
      width: 0;
      height: 0;
      border-top: 0.4rem solid #d5d5d5;
      border-left: 0.4rem solid transparent;
      border-right: 0.4rem solid transparent;
      transform: rotate(-45deg);
      margin: 0.3rem 1rem 0;
    }
    .double-input {
      @include center;
    }
  }
  .play-type-block {
    flex-wrap: wrap;
    justify-content: space-evenly;
    color: #a0a0a0;
    overflow: hidden;
    .play-item {
      width: 22%;
      height: 3rem;
      line-height: 3rem;
      background-color: #e5e5e5;
      border: 1px solid #d9d9d9;
      border-radius: 0.2rem;
      margin-bottom: 0.7rem;
      position: relative;
      &.play-select {
        background-color: #ffffff;
        color: #333333;
      }
      &.play-selected {
        border: 1px solid #ef0404;
        .selected-icon {
          width: 0;
          height: 0;
          border-top: 1rem solid #ef0404;
          border-left: 1rem solid transparent;
          border-right: 1rem solid transparent;
          transform: rotate(-45deg);
          position: absolute;
          right: -0.7rem;
          bottom: -0.2rem;
          &::before {
            font-family: "YDUI-ICONS";
            content: "\E617";
            transform: rotate(45deg);
            color: #ffffff;
            position: absolute;
            right: -0.5rem;
            bottom: -1rem;
          }
        }
      }
    }
  }
  .bet-button-block {
    padding: 0.3rem 0;
    background-color: #232323;
    .clear {
      width: 4rem;
      border-right: 1px solid #606060;
      margin-right: 0.7rem;
      img {
        width: 1.6rem;
      }
    }
    .tip {
      color: #fff;
    }

    .picking-active-submit {
      width: 6rem;
      line-height: 3rem;
      font-size: 1.2rem;
      color: #fff;
      background-color: #e33939;
      border-radius: 0.3rem;
      margin: 0 0.7rem;
    }
  }
}
</style>
<style lang="scss">
.match-footer {
  .yd-spinner > a:after,
  .yd-spinner > input {
    font-size: 1rem;
  }
}
</style>


