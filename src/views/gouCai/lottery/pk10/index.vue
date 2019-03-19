<template>
  <div class="pk10">
    <heads :routes="routes"
           :type='1'></heads>
    <pkten :routes="routes"></pkten>
  </div>
</template>
<script>
import heads from "../head";
import pkten from "./components/pk10";

export default {
  data() {
    return {
      routes: Object
    };
  },

  created() {
    if (this.$route.params.name_tag) {
      this.routes = this.$route.params;
      sessionStorage.setItem(
        "betting_route_params",
        JSON.stringify(this.$route.params)
      );
    } else {
      const params = sessionStorage.getItem("betting_route_params");
      if (params.length) {
        this.routes = JSON.parse(params);
      }
    }
  },
  mounted() {
    this.routes = this.$route.params;
  },
  activated() {
    this.routes = this.$route.params;
  },
  components: {
    heads,
    pkten
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
