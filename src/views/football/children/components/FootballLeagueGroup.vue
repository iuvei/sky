<template>
  <ul class="football-league-group">
    <FootballLeagueItem v-for="(item,key) in data" :key="key" class="item" :item="item" @changeCheckbox="changeCheckbox" :value="getvalue(item.league_id)"></FootballLeagueItem>
  </ul>
</template>

<script>
// import FootballType from "../footballType/index";
import { mapActions, mapState } from "vuex";
import FootballLeagueItem from "../components/FootballLeagueItem";

export default {
  name: "FootballLeagueGroup",
  components: { FootballLeagueItem },
  props: ["data"],
  data() {
    return {
      tabType: 1,
    };
  },
  computed: {
    ...mapState("football", ["leagueList"]),
  },
  methods: {
    ...mapActions("football", ["setSportLeagueList"]),
    getvalue(id) {
      return this.leagueList.some(v => v === id);
    },
    changeCheckbox(val, item) {
      if (val) {
        this.setSportLeagueList({ type: "add", val: item.league_id });
      } else {
        this.setSportLeagueList({ type: "del", val: item.league_id });
      }
      this.$emit("changeCheckbox");
    },
    clickItem(key, item) {
      this.tabType = key;
      console.log(item);
      // console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.football-league-group {
  border-bottom: 1px solid #d2d2d2;
  .item {
    // display: flex;
    @include between;
    height: poTorem(52px);
    align-items: center;
    padding: 0 poTorem(12px);
    border-bottom: 1px solid transparent;
    white-space: nowrap;
    font-size: poTorem(18px);
    color: #454545;
    border-bottom: solid poTorem(1px) #d2d2d2;
  }
  .active {
    color: $mainColor;
    border-bottom: 1px solid $mainColor;
  }
}
</style>


