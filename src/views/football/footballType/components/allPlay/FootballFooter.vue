<template>
  <footer class="picking"
          :class="{fadeInUp:allPlayFooter}"
          v-show="allPlayFooter">
    <div v-if="gameType === 3 && zhgg_preview">
      <div class="picking-active">
        <div class="picking-active-money">
          <span class="name">{{bet_txt}}串1</span>
          <span class="value">@{{getPl}}</span>
          <span>{{tip}}</span>
        </div>
        <div class="picking-active-submit"
             @click="previewClick">下一步</div>
      </div>
    </div>
    <div v-else>
      <!-- 赔率 -->
      <div class="picking-info">
        <div class="picking-info-team">
          <span class="name">{{bet_txt}}</span>
          <span class="value">@{{getPl}}</span>
        </div>
        <div>
          <AppCheckbox :value='is_better'
                       @change="changeCheckbox"
                       onColor="#313131"
                       offColor="#7d7d7d">
            <span slot
                  class="label">自动接受较佳赔率</span>
          </AppCheckbox>
        </div>
      </div>
      <!-- 投注 -->
      <div class="picking-active">
        <div class="picking-active-money">
          <input type="number"
                 v-model.number="money"
                 @input="updateMoney"
                 @click="input_focus">
          <span>
            元，可赢
            <span class="money">{{win}}</span>
            元
          </span>
        </div>
        <div class="picking-active-submit"
             @click="bettingClick">下注</div>
      </div>
    </div>
  </footer>
</template>

<script>
import debounce from "lodash/debounce";
import { mapState, mapActions, mapGetters } from "vuex";
const wangfas = ["HC", "HHC", "GL", "HGL"];

export default {
  name: "allPlayFooter",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("football", ["getPl", "getAllPlaySelected"]),
    ...mapState("football", [
      "is_better",
      "money",
      "bet_txt",
      "bet_data",
      "min_stake",
      "gameType",
      "zhgg_preview"
    ]),
    allPlayFooter() {
      const show = this.getAllPlaySelected && this.bet_data.length;
      return show;
    },
    tip() {
      let tip = "";
      if (this.gameType === 3) {
        if (this.bet_txt < 3) tip = "(最小串3关)";
        else if (this.bet_txt > 10) tip = "(最大串10关)";
      }
      return tip;
    },
    win() {
      let bet_pl = this.getPl;
      const wanfa = (this.bet_data[0] && this.bet_data[0].play_method) || "";
      if (!wangfas.includes(wanfa)) {
        bet_pl = bet_pl - 1;
      }

      return (bet_pl * this.money).toFixed(2);
    }
  },
  watch: {
    min_stake(min_stake) {
      console.error(111);
      if (min_stake > 0) {
        this.modifyFootballField({ money: min_stake });
      }
    }
  },
  methods: {
    ...mapActions("football", [
      "modifyFootballField",
      "betting",
      "queryComputed"
    ]),
    input_focus({ target }) {
      target.focus();
      target.value = "";
    },
    updateMoney({ target }) {
      const money = Math.round(target.value * 1) || "";
      target.value = money;
      this.modifyFootballField({ money });
    },
    changeCheckbox(val) {
      this.modifyFootballField({ is_better: val });
    },
    previewClick() {
      if (this.bet_txt < 3 || this.bet_txt > 10) {
        return this.$dialog.toast({
          mes: "不符合串关要求"
        });
      }

      this.queryComputed(["reset"]);
      this.modifyFootballField({ zhgg_preview: false });
      this.$router.push({ name: "zhggPreview" });
    },
    bettingClick: debounce(async function() {
      const res = await this.betting();
      if (res && res.id_list && res.id_list.length > 0) {
        this.$dialog.toast({
          mes: "下注成功！",
          icon: "success",
          timeout: 1000
        });

        const obj = {
          money: 2,
          bet_data: [],
          is_better: true
        };
        this.modifyFootballField(obj);
      }
    }, 600)
  }
};
</script>

<style lang="scss" scoped>
@import "~css/resources.scss";
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
  animation-duration: 800ms;
}
.picking {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: bottom 2s;
  z-index: 80;
  border-top: 1px solid #d2d2d2;
  &-info {
    @include start;
    height: poTorem(46px);
    background-color: #eaeaea;
    font-size: poTorem(14px);
    padding: 0 poTorem(7px);
    &-team {
      flex: 1;

      color: #313131;
      .value {
        color: #e33939;
      }
    }
    .label {
      margin-left: poTorem(8px);
    }
  }
  &-active {
    @include start;
    height: poTorem(56px);
    background-color: #434343;
    &-money {
      flex: 1;
      font-size: poTorem(18px);
      padding-left: poTorem(14px);
      color: #fff;
      input {
        width: poTorem(96px);
        padding: poTorem(2px) poTorem(8px);
        border: solid 1px #626161;
        border-radius: poTorem(8px);
        background-color: #ffffff;
      }
      .money {
        color: #e33939;
      }
    }
    &-submit {
      @include center;
      flex-basis: poTorem(100px);
      height: poTorem(56px);
      font-size: poTorem(18px);
      color: #fff;
      background-color: #e33939;
    }
  }
}
</style>


