<template>
  <div class="pkniuniu">
    <heads :routes="routes"></heads>
    <pkniuniu :routes="routes"></pkniuniu>
  </div>
</template>
<script>
import heads from "../head";
import pkniuniu from "./components/pkniuniu";        
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      routes: Object
    };
  },
  mounted() {
    this.routes = this.$route.params;
  },
  activated() {
    this.routes = this.$route.params;
  },
  components: {
    heads,
    pkniuniu
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.pkniuniu {
  @include between;
  flex-direction: column;
}
</style>
