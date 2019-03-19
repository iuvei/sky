<template>
  <ul class="chat-room-child-menu">
    <li v-for="(obj,idx) in menuItems"
        :key="idx"
        class="submenu">
      <span class="submenu-name">{{obj.name}}</span>
      <ul class="playlist">
        <li class="playlist-item"
            v-for="(item,index) in obj.playlist"
            :key="index"
            @click="itemClick(item,index)"
            :class="{'active': (gameItem.js_tag === 'pcdd') ? index === key : curItem && curItem.playid === item.playid, 'long':item.playname.length > 5}">
          {{item.playname}}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "chat-room-child-menu",

  props: {
    menuItems: {
      type: Array,
      default: []
    },
    gameItem: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      curItem: null,
      key: 0
    };
  },
  activated() {
    this.$root.Bus.$emit("betMenu", this.curItem);
    if (!this.curPlayItem && this.curItem) this.setItem(this.curItem);
  },
  methods: {
    ...mapActions(["setPlayItem", "setBetNumber"]),
    itemClick(item, i) {
      this.key = i;
      this.setItem(item);
      this.bus.$emit("hideSubmenu");
    },
    setItem(item) {
      this.curItem = item;
      this.setPlayItem(item);
      this.setBetNumber(0);
    }
  },

  mounted() {
    this.setItem(this.menuItems[0].playlist[0]);
  },

  watch: {
    curItem() {
      this.$root.Bus.$emit("betMenu", this.curItem);
    },
    menuItems(val) {
      this.key = 0;
      this.$root.Bus.$emit("betMenu", val[0].playlist[0]);
      if (val && val.length) {
        // this.curItem = val[0].playlist[0];
        this.setItem(val[0].playlist[0]);
      }
    }
  },
  computed: {
    ...mapState({
      curPlayItem: state => state.betting.curPlayItem
    })
  }
};
</script>

<style scoped lang="scss">
.chat-room-child-menu {
  height: calc(97.5vw - 8.5rem);
  overflow-y: scroll;
  background: #f3f3f3;
  ul {
    display: flex;
    width: 100%;
  }
  li {
    width: 20%;
  }
  .submenu {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    text-align: center;
    margin: 10px 0;
    .submenu-name {
      padding: 4px 10px;
      width: 30%;
      font-size: 1rem;
      color: #6a6a6a;
      line-height: 2;
    }
  }
  .playlist {
    flex-wrap: wrap;
    .playlist-item {
      border: 1px solid #a5a5a5;
      background-color: #fff;
      border-radius: 4px;
      width: 30%;
      margin-right: 3%;
      margin-bottom: 1rem;
      height: 2.4rem;
      line-height: 2.4rem;
      font-size: 1rem;
      color: #525252;
      &.long {
        width: 45%;
      }
      &.active {
        background-color: #e33939;
        border: 1px solid #e33939;
        color: #fff;
      }
    }
  }
}
</style>
