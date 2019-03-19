<template>
  <div class="qxc">
    <publichead :routes="routes"
                :type="1"></publichead>
    <selfhead :routeList="routes"></selfhead>
  </div>
</template>
<script>
import publichead from "../head";
import selfhead from "./components/head";
export default {
  name: "qxc_index",
  data() {
    return {
      routes: Object
    };
  },
  activated() {
    this.routes = this.$route.params;
  },
  components: {
    publichead,
    selfhead
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.qxc {
  @include between;
  flex-direction: column;
  height: calc(100vh - 3rem);
}
</style>
