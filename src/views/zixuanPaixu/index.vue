<template>
  <div class="zixuanPaixu">
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
.zixuanPaixu {
}
</style>
