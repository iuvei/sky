<template>
  <div class="youxi">
    <heads></heads>
  </div>
</template>
<script>
  import heads from "./heads";
  import { mapActions, mapState } from "vuex";
  export default {
    data() {
      return {
        data: [],
      };
    },
    components: {
      heads
    },
  };
</script>
<style lang="scss" scoped>
  @import "~css/resources.scss";
  .youxi {
    width: 100%;
    height: 100%;
  }
</style>
