<template>
  <div class="head_model"
       v-show="show">
    <div class="bg"
         @click="$emit('close')"></div>
    <transition enter-active-class="animated slideInDown"
                leave-active-class="animated slideOutUp">
      <div class="slot"
           @click.self="$emit('close')">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AppModel",
  props: ["show"],
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "../../css/resources.scss";
.head_model {
  .animated {
    animation-duration: 0.25s;
  }
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.5;
    z-index: 20;
  }
  .slot {
    display: flex;
    flex-wrap: wrap;
    position: fixed;
    left: 0;
    width: 100%;
    z-index: 21;
  }
}
</style>


