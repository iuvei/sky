<template>
  <div>
    <ul class="submenus">
      <li v-for="(item, index) in officalList"
          :key="index"
          :class="{'active': curItem && curItem.menuid === item.menuid}"
          @click="itemClick(item)">{{item.name}}</li>
    </ul>
    <child-menu v-if="curItem"
                :gameItem="gameItem"
                :menuItems="curItem.submenu"></child-menu>
  </div>
</template>

<script>
import ChildMenu from "./ChildMenu";
import { mapState } from "vuex";
import api from "../../../../../api/betting";
export default {
  name: "chat_room_submenus",

  props: {
    gameItem: {
      type: Object,
      default: {}
    }
  },

  components: {
    ChildMenu
  },

  data() {
    return {
      curItem: null,
      items: []
    };
  },

  methods: {
    itemClick(item) {
      this.curItem = item;
    },
    getDoubleItem(items) {
      const obj = {
        js_tag: items[0].js_tag,
        menuid: 999,
        name: "双面玩法",
        showofficial: 0,
        submenu: [
          {
            menuid: 9999,
            name: "综合",
            playlist: items.map(x =>
              Object.assign(x.submenu[0].playlist[0], { isDouble: true })
            )
          }
        ]
      };

      return obj;
    },

    async getPlayConfig() {
      if (!this.gameItem || !Object.keys(this.gameItem).length) return [];
      return (await api.getGamePlayConfig(this.gameItem.js_tag)) || [];
    }
  },

  computed: {
    ...mapState({
      game: state => state.betting.game
    }),
    officalList() {
      const doubleList = this.doubleList,
        officalList = this.items.filter(x => x.showofficial === 0);
      if (doubleList.length) {
        return [this.getDoubleItem(doubleList), ...officalList];
      }
      return officalList;
    },
    doubleList() {
      return this.items.filter(x => x.showofficial === 1);
    }
  },

  async mounted() {
    this.items = await this.getPlayConfig(this.gameItem.js_tag);
  },

  watch: {
    items(val) {
      if (
        val.length &&
        (!this.curItem || val[0].js_tag !== this.curItem.js_tag)
      ) {
        this.curItem = this.officalList[0];
      }
    },
    async gameItem(val) {
      if (val) {
        this.items = await this.getPlayConfig(val.js_tag);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.submenus {
  width: 100%;
  height: 2.5rem;
  display: flex;
  flex-wrap: nowrap;
  background-color: #f3f3f3;
  overflow-x: auto;
  z-index: 13;
  &::-webkit-scrollbar {
    display: none;
  }
  li {
    flex: none;
    float: left;
    width: poTorem(100px);
    font-size: poTorem(16px);
    color: #585858;
    line-height: 2.5rem;
    text-align: center;
    padding: 0 15px;
    font-size: 1rem;
    &.active {
      color: #e33939;
      border-bottom: 2px solid #e33939;
    }
  }
}
</style>
