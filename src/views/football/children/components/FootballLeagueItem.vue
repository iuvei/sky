<template>
  <li class="item">
    <div>
      <AppCheckbox :on='true' :off="false" :value='value' @change="changeCheckbox" onColor="#ff7c34" offColor="#7d7d7d">
        <span slot class="label" :style="style">{{item.league_name}}</span>
      </AppCheckbox>
    </div>
    <span> {{item.game_cnt}}</span>
  </li>
</template>

<script>
// import FootballType from "../footballType/index";
export default {
  name: "FootballLeagueItem",
  props: {
    item: {
      default: {},
    },
    value: {
      default: false,
    },
  },
  computed: {
    style() {
      return this.value ? { color: "#ff7c34" } : { color: "#7d7d7d" };
    },
  },
  data() {
    return {
      tabType: 1,
      inValue: true,
    };
  },
  methods: {
    changeCheckbox(val) {
      this.$emit("changeCheckbox", val, this.item);
    },
    clickItem(key, item) {
      this.tabType = key;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.item {
  .label {
    margin-left: poTorem(14px);
  }
}
</style>


