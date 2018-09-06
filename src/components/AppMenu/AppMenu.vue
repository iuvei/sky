<template>
  <menu class="football-menu">
    <ul>
      <li v-for="(item,key) in data" :key="key" :class="{active: key === index()}" class="item" @click="clickItem(key,item)">{{item.label}}</li>
    </ul>
  </menu>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "AppMenu",
  props: {
    data: { default: [] },
    propsKey: { default: 0 },
  },

  data() {
    return {
      key: 0,
    };
  },

  methods: {
    index() {
      return this.propsKey || this.key;
    },
    clickItem(key, item) {
      console.log(key, item);
      this.key = key;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../css/resources.scss";
.football-menu {
  border-bottom: 1px solid #d2d2d2;
  ul {
    display: flex;
    // flex-wrap: nowrap;
    justify-content: space-around;
    height: poTorem(52px);
    // overflow-x: auto;
    li {
      display: flex;
      height: poTorem(52px);
      align-items: center;
      padding: 0 poTorem(10px);
      border-bottom: poTorem(5px) solid transparent;
      white-space: nowrap;
      font-size: poTorem(18px);
      color: #454545;
    }
    .active {
      color: #ff7c34;
      border-bottom: poTorem(5px) solid #ff7c34;
    }
  }
}
</style>


