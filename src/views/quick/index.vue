<template>
  <div class="quick">
    <!-- 头部 -->
    <heads></heads>
    <gongneng ref="gongneng"></gongneng>
  </div>
</template>
<script>
import heads from "./components/heads";
import gongneng from "./components/gongneng";
export default {
  data() {
    return {
      data: []
    };
  },
  // beforeRouteLeave(to, from, next) {
  //     this.$refs.gongneng.$intro().exit();
  //     next();
  // },
  mounted() {},
  methods: {},
  components: {
    heads,
    gongneng
  }
};
</script>
<style lang="scss" scoped>
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
.quick {
  // overflow: auto;
  // z-index: 10001;
}
</style>
