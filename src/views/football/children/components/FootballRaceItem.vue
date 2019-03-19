<template>
  <li class="item"
      :style="change.style">
    <div class="game-time">{{date}} </div>
    <div class="game-info">
      <div v-if="change.txt"
           class="txt">{{change.txt}}</div>
      <div class="game-info-team">
        <span class="name">{{data.h}}</span>
        <span class="tg">{{data.result_data.SC.H.TG}}</span>
        <span class="htg">{{data.result_data.SC.H.HTG}}</span>
      </div>
      <div class="game-info-team">
        <span class="name">{{data.v}}</span>
        <span class="tg">{{data.result_data.SC.V.TG}}</span>
        <span class="htg">{{data.result_data.SC.V.HTG}}</span>
        <!-- <span>{{data.v}}</span>
        <span>{{data.result_data.SC.V.TG}}</span>
        <span>{{data.result_data.SC.V.HTG}}</span> -->
      </div>

    </div>
    <div class="game-more">
      <div v-if="change.txt"></div>
      <span @click="goInfo">
        详情
      </span>
    </div>
  </li>
</template>

<script>
export default {
  name: "FootballRaceItem",
  props: ["data", "league"],
  data() {
    return {};
  },
  computed: {
    date() {
      return new Date(this.data.begin_time).format("MM-dd hh:mm");
    },
    change() {
      let txt = "";
      if (this.data.is_master) {
        txt += "冠军  ";
      }
      if (this.data.is_corner) {
        txt += "角球";
      }
      if (txt) {
        return {
          txt,
          style: { height: "7rem" }
        };
      }
      return {};
    }
  },

  methods: {
    goInfo() {
      this.$router.push({
        name: "footballRaceInfo",
        params: { data: this.data, league: this.league }
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.item {
  @include center;
  height: poTorem(100px);
  border-bottom: solid poTorem(1px) #d2d2d2;
  > div {
    height: 100%;
  }
  .game-time {
    @include center;
    width: poTorem(85px);
    padding: 0 poTorem(10px);
    border-right: solid poTorem(1px) #d2d2d2;
    font-size: poTorem(16px);
  }
  .game-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: poTorem(10px);
    .txt {
      font-size: poTorem(14px);
      color: #00479d;
    }
    &-team {
      display: flex;
      // margin-bottom: poTorem(16px);
      .name {
        width: poTorem(170px);
        font-size: poTorem(16px);
      }
      .tg,
      .htg {
        width: poTorem(60px);
        font-size: poTorem(16px);
        text-align: center;
      }
    }
  }

  .game-more {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: poTorem(25px);
    margin-right: poTorem(4px);
    font-size: poTorem(16px);
    span {
      border: 1px solid #d2d2d2;
      border-radius: poTorem(15px);
      color: #959595;
      padding: poTorem(6px) poTorem(4px);
    }
  }
}
</style>


