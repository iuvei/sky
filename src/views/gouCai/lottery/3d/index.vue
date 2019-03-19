<template>
  <div class="fc3d">
    <heads :routes="routes"
           :type='1'></heads>
    <sandi :routes="routes"></sandi>
  </div>
</template>
<script>
import heads from "../head";
import sandi from "./components/3d";
export default {
  name: "fc3d",
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
    sandi
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.fc3d {
  @include between;
  flex-direction: column;
}
</style>
