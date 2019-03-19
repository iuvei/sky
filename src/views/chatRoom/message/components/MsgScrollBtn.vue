<template>
  <div class='msg-scroll-btn'
       @click="click">
    <img :src="src"
         alt="">
    <slot></slot>
    <img src="../img/msg-lock-arrow.png"
         alt="">
  </div>
</template>
<script>
export default {
  name: "ScrollBtn",
  model: {
    prop: "checked",
    event: "click"
  },
  props: {
    checked: Boolean,
    lock: Boolean
  },
  computed: {
    src() {
      return this.lock === this.checked
        ? require("../img/msg-lock-select.png")
        : require("../img/msg-lock-default.png");
    }
  },
  methods: {
    click() {
      this.$emit("click", this.lock);
    }
  }
};
</script>
<style lang='scss' scoped>
.msg-scroll-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 5.125rem;
  height: 1.75rem;
  border: 0.0625rem solid #dcdcdc;
  padding: 0 0.125rem;
  color: #434343;
  border-top-left-radius: 0.875rem;
  border-bottom-left-radius: 0.875rem;
  // margin-bottom: 0.625rem;
  z-index: 10;
  background-color: #fff;
  img {
    height: 0.9375rem;
    width: 0.9375rem;
  }
}
</style>