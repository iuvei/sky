<template>
  <div class="xypk">
    <heads :routes="routes"
           :type="1"></heads>
    <puke :routes="routes"></puke>
  </div>
</template>
<script>
import heads from "../head";
import puke from "./components/puke";

export default {
  name: "xypk",
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
    puke
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.xypk {
  @include between;
  flex-direction: column;
}
</style>
