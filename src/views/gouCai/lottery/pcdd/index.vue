<template>
  <div class="fc3d">
    <heads :routes="routes" :type='0'></heads>
    <pcdandan :routes="routes"></pcdandan>
  </div>
</template>
<script>
import heads from "../head";
import pcdandan from "./components/pcdd";
import { mapActions, mapState } from "vuex";
export default {
  name: "pcdd",
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
    pcdandan
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
