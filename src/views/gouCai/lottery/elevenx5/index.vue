<template>
  <div class="pk10">
    <heads :routes="routes" :type='1'></heads>
    <eleventxfive :routes="routes"></eleventxfive>
  </div>
</template>
<script>
import heads from "../head";
import eleventxfive from "./components/elevenx5";
import { mapActions, mapState } from "vuex";
export default {
  name: "elevenx5",
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
    eleventxfive
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.pk10 {
  @include between;
  flex-direction: column;
}
</style>
