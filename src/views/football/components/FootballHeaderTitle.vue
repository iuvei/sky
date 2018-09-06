<template>
  <AppModel :show="show" @close="()=>{this.$emit('close')}">
    <div class="shadow" v-show="show">
      <span v-for="(item, index) in gameTypeMap" :key="index" :class="{active: index==gameType}" @click="switchs(index,item)">
        <i>{{item.label}}</i>
        <i class="red">{{data[item.field]}}</i>
      </span>
    </div>
  </AppModel>

</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "FootballHeaderTitle",
  props: ["show"],
  data() {
    return {
      title: "",
      data: {},
    };
  },
  watch: {
    show(v){
      if(v){
        this.togetSportMatchList();
      }
    }
  },
  computed: {
    ...mapState("football", ["gameTypeMap", "gameType", "playTypeMap"]),
  },
  methods: {
    ...mapActions("football", ["changeTitle", "getSportMatchList"]),
    switchs(key, item) {
      this.changeTitle({ key, item });
      this.$emit("close");
      this.$router.replace(
        this.playTypeMap.find(r => r.value == this.gameTypeMap[key].playType)
          .path
      );
    },
    async togetSportMatchList() {
      this.data = await this.getSportMatchList();
    },
  },
  mounted() {
    this.togetSportMatchList();
  },
};
</script>

<style lang="scss" scoped>
@import "../../../css/resources.scss";
.shadow {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  left: 0;
  width: 100%;
  padding: .5rem 1rem;
  background: #fff;
  z-index: 21;
   @include start;
  span {
    height: poTorem(35px);
    width: 31%;
    background: #fff;
    @include center;
    border-radius: poTorem(5px);
    font-size: poTorem(16px);
    color: #1e2123;
    font-weight: bold;
    border: 1px solid #d2d3d5;
    margin: .2rem;
  }
  .red {
    color: #f00;
    padding-left: poTorem(4px);
  }
  .active {
    // background: #e13a39;
    color: #f00;
    border: solid 1px #e33939;
    background: no-repeat right bottom url(~img/football/title-active.png);
    background-size: poTorem(23px) poTorem(23px);
  }
}
</style>


