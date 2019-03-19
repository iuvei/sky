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
      <div class="t-body-left">
        <div class="H">
          <div class="cell-name t">主</div>
          <div class="cell-data">
            <div v-for="(item,key) in itemData.H"
                 :key="key"
                 class="t-body-cell t"
                 @click="clickCell(item,'H'+key)"
                 :class="{red:active==='H'+key}">
              <span>{{item.k}}</span>
              <span>{{item.p}}</span>
              <i class="icon"
                 v-one-html="item.p"></i>
            </div>
          </div>
        </div>
        <div class="V">
          <div class="cell-name t">客</div>
          <div class="cell-data">
            <div v-for="(item,key) in itemData.V"
                 :key="key"
                 class="t-body-cell t"
                 @click="clickCell(item,'V'+key)"
                 :class="{red:active==='V'+key}">
              <span>{{item.k}}</span>
              <span>{{item.p}}</span>
              <i class="icon"
                 v-one-html="item.p"></i>
            </div>
          </div>
        </div>
        <div class="X">
          <div class="cell-name t">平</div>
          <div class="cell-data">
            <div v-for="(item,key) in itemData.X"
                 :key="key"
                 class="t-body-cell t"
                 @click="clickCell(item,'X'+key)"
                 :class="{red:active==='X'+key}">
              <span>{{item.k}}</span>
              <span>{{item.p}}</span>
              <i class="icon"
                 v-one-html="item.p"></i>
            </div>
          </div>
        </div>

      </div>
      <div class="t-body-right">
        <div v-for="item in itemData.O"
             :key="item.k"
             class="other"
             @click="clickCell(item,'O')"
             :class="{red:active==='O'}">
          <span>其他</span>
          <span>{{item.p}}</span>
          <i class="icon"
             v-one-html="item.p"></i>
        </div>
        <!-- <div class="other" @click="clickCell(item,'V'+key)">
          <span>其他</span>
          <span>{{itemData.O[0].p}}</span>
          <i class="icon" v-one-html="itemData.O[0].p"></i>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "FootballTypeWavesItem",
  props: ["data", "league", "item", "type"],
  data() {
    return {
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
    },
    itemData() {
      const bet = this.data.bet_data;
      if (this.type == "TCS") {
        return bet.TCS;
      } else {
        // HTCS
        bet.HTCS.X = bet.HTCS.X || [];
        if (bet.HTCS.H.length < 10) {
          bet.HTCS.H = [...bet.HTCS.H, ...new Array(4).fill({})];
        }
        if (bet.HTCS.V.length < 10) {
          bet.HTCS.V = [...bet.HTCS.V, ...new Array(4).fill({})];
        }
        if (bet.HTCS.X.length < 5) {
          bet.HTCS.X = [...bet.HTCS.X, ...new Array(1).fill({})];
        }
        return bet.HTCS;
      }
    }
  },

  methods: {
    ...mapActions("football", ["modifyFootballField"]),
    clickCell(cell, key) {
      // console.log()
      if (!cell.p) {
        return;
      }
      this.activeCell = key;
      if (key == "O") {
        cell.k_txt = "其他";
      }
      this.modifyFootballField({
        min_stake: this.data.min_stake,
        max_stake: this.data.max_stake
      });
      this.$emit(
        "clickCell",
        Object.assign(
          {
            schedule_id: this.data.schedule_id,
            history_id: this.data.history_id,
            team_score: this.data.team_score,
            team: key.substring(0, 1),
            h: this.data.h,
            v: this.data.v,
            k_txt: cell.k
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
  },
  activated() {
    this.key;
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
    // height: poTorem(110px);
    display: flex;
    justify-content: flex-start;
    .t-body-left {
      flex: 1;
      // width: 90%;
      display: flex;
      flex-direction: column;
      > div {
        display: flex;
      }
      .cell-name {
        width: poTorem(50px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .cell-data {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        .t-body-cell {
          width: 20%;
          height: poTorem(40px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
      .red {
        color: #e33939;
        border: solid 1px #e33939;
      }
    }
    .t-body-right {
      width: poTorem(50px);
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: poTorem(1px) solid #d2d2d2;
      .other {
        height: poTorem(41px);
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-bottom: poTorem(1px) solid #d2d2d2;
        border-left: poTorem(1px) solid transparent;
        border-top: poTorem(1px) solid #d2d2d2;
        border-right: poTorem(1px) solid transparent;
      }
      .red {
        color: #e33939;
        border: solid 1px #e33939;
      }
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
    .t {
      border-bottom: poTorem(1px) solid transparent;
      border-left: poTorem(1px) solid transparent;
      border-top: poTorem(1px) solid #d2d2d2;
      border-right: poTorem(1px) solid #d2d2d2;
    }
  }
}
</style>


