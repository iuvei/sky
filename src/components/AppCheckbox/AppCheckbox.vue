<template>
  <div class="app-checkbox" @click='handleClick' @dblclick.stop='()=>{}'>
    <div class="app-checkbox-input" :class="{ 'app-checkbox-input_checked':value}" :style="style">
      <i :style="style"></i>
    </div>
    <span class="app-checkbox-content">
      <slot></slot>
    </span>
  </div>
</template>
<script>
/**
 * on  value 为true的值
 * off value 为false的值
 * onColor value 为true的颜色
 * onColor value 为false的颜色
 */
export default {
  name: "AppCheckbox",
  props: {
    on: { default: true },
    off: { default: false },
    value: { default: false },
    onColor: { default: "" },
    offColor: { default: "" },
  },
  computed: {
    style() {
      if (!this.value && this.offColor) {
        return { borderColor: this.offColor };
      }
      if (this.value && this.onColor) {
        return { borderColor: this.onColor };
      }
      return {};
    },
  },
  methods: {
    handleClick() {
      // this.$emit("input", this.value ? this.off : this.on);
      this.$emit("change", this.value ? this.off : this.on);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../css/resources.scss";
$border: #505050;
$border-checked: #13cb75;
.app-checkbox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &-input {
    width: poTorem(20px);
    height: poTorem(20px);
    border: solid poTorem(1px) $border;
    border-radius: poTorem(3px);
    transition: all 0.3s;
    position: relative;
    i {
      width: poTorem(6px);
      height: poTorem(10px);
      opacity: 0;
      transition: all 0.3s;
      position: absolute;
      display: block;
      top: poTorem(3px);
      left: poTorem(6px);
      transform: rotate(45deg);
      background: transparent;
      border-right: 2px solid $border-checked;
      border-bottom: 2px solid $border-checked;
    }
    &_checked {
      border-color: $border-checked;
      i {
        opacity: 1;
      }
    }
  }
  &-content {
    // margin-left: poTorem(14px);
    color: inherit;
    // font-size: 14px;
  }
}
</style>
