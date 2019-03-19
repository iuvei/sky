<template>
  <div>
    <ul class="submenus"
        v-if="items && items.length > 1">
      <li v-for="(item, index) in items"
          :key="index"
          :class="{'active': curItem && curItem.name === item.name}"
          @click="itemClick(item)">{{item.name}}</li>
    </ul>
    <double-play-area :dataSet="_items"
                      :curPlayItem="curItem"
                      @clickBall="clickBall"></double-play-area>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DoublePlayArea from "./DoublePlayArea";
export default {
  name: "chat_room_submenus",

  props: {
    items: {
      type: Array,
      default: []
    }
  },

  components: {
    DoublePlayArea
  },

  data() {
    return {
      curItem: null
    };
  },

  methods: {
    itemClick(item) {
      this.curItem = item;
      this.$emit("setCurPlayItem", this.curItem);
    },

    clickBall(row, ball) {
      this.$emit("clickBall", row, ball);
    }
  },

  computed: {
    ...mapState({
      game: state => state.betting.game
    }),
    _items() {
      return [this.curItem];
    }
  },

  mounted() {
    this.curItem = this.items[0];
  },

  watch: {
    items(val) {
      if (val.length) {
        this.curItem = this.items[0];
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
