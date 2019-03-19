<template>
  <div class='emoji'>
    <div v-for="(item,key) in Emoji"
         :key="key"
         class="td"
         @click="getTxt(item.txt)">
      {{item.txt}}
    </div>
  </div>
</template>
<script>
import Emoji from "../js/emoji.js";
export default {
  name: "emoji-vue",
  data() {
    return {
      Emoji
    };
  },
  methods: {
    getTxt(txt) {
      this.$emit("txt", txt);
    }
  }
};
</script>
<style lang='scss' scoped>
.emoji {
  height: 6rem;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.125rem;
  .td {
    width: 3.125rem;
    text-align: center;
  }
}
</style>