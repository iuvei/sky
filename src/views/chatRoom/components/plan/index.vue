<template>
  <div class="plan">
    <heads></heads>
    <!-- <PlanDetails></PlanDetails> -->
  </div>
</template>
<script>
import heads from "./heads";
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {},
  watch: {},
  created() {},
  components: {
    heads
    // PlanDetails
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.plan {
  width: 100%;
  height: 100%;
}
</style>
