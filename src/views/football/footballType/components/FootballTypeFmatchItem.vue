<template>
  <section class="item">
    <div class="t-head">
      <div class="t-head-name">
        <span class="left">{{data.h}}【主】</span>
        <span>vs</span>
        <span class="right">{{data.v}}</span>
      </div>
      <div class="t-head-time">{{date}}</div>
    </div>
    <div class="t-body">
      <div v-for="(item,key) in data.bet_data.HFT"
           :key="key"
           class="t-body-cell"
           @click="clickCell(item,key)"
           :class="{red:active===key}">
        <span>{{txt(item.k)}}</span>
        <span>{{item.p}}</span>
        <i class="icon"
           v-one-html="item.p"></i>
      </div>
      <div class="t-body-cell"
           @click="allGame()">
        <p>所有</p>
        <p>玩法</p>
        <img src="~img/football/more-game.png"
             alt=""
             style="width: .8rem">
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "FootballTypeFmatchItem",
  props: ["data", "league", "item"],
  data() {
    return {
      rule: {
        H: "主",
        V: "客",
        X: "和"
      },
      activeCell: ""
    };
  },
  computed: {
    date() {
      return new Date(this.data.begin_time).format("MM-dd hh:mm");
    },
    active() {
      if (this.data.history_id === this.item.active) {
        return this.activeCell;
      }
      return false;
    }
  },

  methods: {
    ...mapActions("football", ["modifyFootballField"]),
    allGame() {
      // return this.$dialog.toast({
      //   mes: "暂未开放，敬请期待！",
      //   timeout: 1000
      // });
      this.modifyFootballField({
        allPlay_schedule_id_prefix: this.data.schedule_id,
        allPlayTeam: this.data
      });
      this.$router.push("/football/allPlay");
    },
    txt(k) {
      Object.keys(this.rule).forEach(i => {
        const exp = new RegExp("(" + i + ")", "g");
        if (exp.test(k)) {
          k = k.replace(exp, this.rule[i]);
        }
      });
      return k;
    },
    clickCell(cell, key) {
      this.modifyFootballField({
        min_stake: this.data.min_stake,
        max_stake: this.data.max_stake
      });
      this.activeCell = key;
      this.$emit(
        "clickCell",
        Object.assign(
          {
            schedule_id: this.data.schedule_id,
            history_id: this.data.history_id,
            team_score: this.data.team_score,
            h: this.data.h,
            v: this.data.v,
            k_txt: this.txt(cell.k)
          },
          cell
        )
      );
    }
  },
  directives: {
    oneHtml: {
      bind() {},
      update(el, { value, oldValue }) {
        const className = el.classList;
        className.remove("p_up", "p_down");
        if (value * 1 > oldValue * 1) {
          className.add("p_up");
        }
        if (value * 1 < oldValue * 1) {
          className.add("p_down");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.item {
  margin: poTorem(18px) poTorem(10px) 0;
  border: poTorem(1px) solid #d2d2d2;
  border-radius: poTorem(6px);
  .t-head {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: poTorem(70px);
    background-color: #f6f6f6;
    > div {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      color: #313131;
    }
    &-name {
      font-size: poTorem(18px);
      .left {
        flex: 1;
        text-align: center;
      }
      .right {
        flex: 1;
        text-align: center;
      }
    }
    &-time {
      font-size: poTorem(16px);
    }
  }
  .t-body {
    height: poTorem(110px);
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    > div {
      position: relative;
      width: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-bottom: poTorem(1px) solid transparent;
      border-left: poTorem(1px) solid transparent;
      border-top: poTorem(1px) solid #d2d2d2;
      border-right: poTorem(1px) solid #d2d2d2;
    }
    div:nth-child(5n) {
      border-right: none;
    }
    .red {
      color: #e33939;
      border: solid 1px #e33939;
    }

    .p_down {
      background: url("~img/football/p_down.png");
    }
    .p_up {
      background: url("~img/football/p_up.png");
    }
    .icon {
      position: absolute;
      right: poTorem(10px);
      background-size: poTorem(10px) poTorem(16px);
      height: poTorem(16px);
      width: poTorem(10px);
    }
  }
}
</style>


