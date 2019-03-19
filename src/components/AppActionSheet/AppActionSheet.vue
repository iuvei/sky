<template>
  <mt-popup
    class="popupBox"
    v-model="show"
    position="bottom"
  >
    <slot></slot>
  </mt-popup>
</template>

<script type="text/babel">
export default {
  name: "app-actionsheet",
  data() {
    return {
      // show: this.value
    };
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    cancel: String,
    maskerOpacity: {
      validator(val) {
        return /^([0]|[1-9]\d*)?(\.\d*)?$/.test(val);
      },
      default: 0.5
    }
  },

  methods: {
    close() {
      this.$emit("input", false);
    }
  },

  computed: {
    show() {
      return this.value;
    }
  },

  destroyed() {
    this.close();
    // pageScroll.unlock();
  }
};
</script>

<style lang="scss" scoped>
.popupBox {
  width: 100%;
  height: 17.8125rem;
  background: #fff;
  margin-bottom: 0;
  border-radius: 0;
}
</style>