<template>
  <!-- menu -->
  <menu class="football-menu">
    <ul :class="{reset:ulClass}">
      <li v-for="(item,key) in viewPlayTypeMap" :key="key" :class="{active: key == playType}" class="item" @click="clickItem(key,item)">{{item.title}}</li>
    </ul>
  </menu>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "FootballPlayType",
  data() {
    return {
      ulClass: false,
      tabKey: 0
    };
  },
  computed: {
    ...mapState("football", [
      "playTypeMap",
      "playType",
      "gameTypeMap",
      "gameType"
    ]),
    // 迁移
    viewPlayTypeMap() {
      let map, arr;
      switch (this.gameType) {
        case 0:
          map = this.playTypeMap.slice(0,2);
          this.ulClass = true;
          break;
        case 3:
          map = this.playTypeMap.filter(r => r.value === 0);
          this.ulClass = true;
          break;
        case 4:
          map = this.playTypeMap.filter(r => r.value === 4);
          this.ulClass = true;
          break;
        default:
          // map = this.playTypeMap;
          arr = [0, 1, 2, 3];
          map = this.playTypeMap.filter(r => arr.includes(r.value));
          this.ulClass = false;
          break;
      }
      this.tabKey = 0;
      return map;
    }
  },

  methods: {
    ...mapActions("football", ["modifyFootballField"]),
    clickItem(key, item) {
      this.tabKey = key;
      this.modifyFootballField({ playType: key });
      this.$router.replace(item.path);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../css/resources.scss";
.football-menu {
  height: poTorem(52px);
  background: #fff;
  border-bottom: 1px solid #d2d2d2;
  ul {
    white-space: nowrap;
    height: poTorem(52px);
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    // background-color: #fff;
    li {
      display: inline-block;
      line-height: poTorem(52px);
      padding: 0 poTorem(25px);
      border-bottom: poTorem(5px) solid transparent;
      white-space: nowrap;
      font-size: poTorem(18px);
      color: #454545;
      border-bottom: 1px solid #d2d2d2;
      position: relative;
    }
    .active {
      color: #ff7c34;
    }
    .active::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      height: poTorem(3px);
      background-color: #ff7c34;
    }
  }
  .reset {
    flex-wrap: nowrap;
    overflow-x: none;
    justify-content: left;
  }
}
</style>


