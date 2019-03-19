<template>
  <!-- menu -->
  <menu class="football-menu">
    <ul :class="{reset:ulClass, full: viewPlayTypeMap.length === 3}">
      <li v-for="(item,key) in viewPlayTypeMap"
          :key="key"
          :class="['item', {active: item.value == playType}]"
          @click="clickItem(key,item)">{{item.title}}</li>
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
      "playTypeMap2",
      "playType",
      "gameTypeMap",
      "gameType"
    ]),
    // 迁移
    viewPlayTypeMap() {
      let arr = [];
      switch (this.gameType) {
        case 0:
          arr = [0];
          this.ulClass = true;
          break;
        case 1:
          arr = [0, 4, 5];
          this.ulClass = true;
          break;
        case 2:
          arr = [0, 4, 5];
          this.ulClass = true;
          break;
        case 3:
          arr = [0];
          this.ulClass = true;
          break;
        case 4:
          arr = [4];
          this.ulClass = true;
          break;
        default:
          // map = this.playTypeMap;
          arr = [0, 1, 2, 3];
          this.ulClass = false;
          break;
      }
      const map = this.playTypeMap2.filter(r => arr.includes(r.value));
      this.tabKey = 0;
      return map;
    }
  },

  methods: {
    ...mapActions("football", ["modifyFootballField"]),
    clickItem(key, item) {
      this.tabKey = key;
      this.modifyFootballField({ playType: item.value });
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
  .full li {
    width: 33.3%;
    text-align: center;
  }
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
      color: $mainColor;
    }
    .active::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      height: poTorem(3px);
      background-color: $mainColor;
    }
  }
  .reset {
    flex-wrap: nowrap;
    overflow-x: none;
    justify-content: left;
  }
}
</style>


