<template>
  <div class="xync">
    <heads :routes="routes"
           :type='1'></heads>
    <xync></xync>
  </div>
</template>
<script>
import heads from "../head";
import xync from "./components/xync";

export default {
  name: "xync-index",
  data() {
    return {
      routes: Object
    };
  },
  mounted() {
    this.routes = this.$route.params;
  },
  components: {
    heads,
    xync
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.xync {
  @include between;
  flex-direction: column;
}
</style>
