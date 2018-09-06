<template>
  <div class="ssc">
    <heads :routes="routes" :type="1"></heads>
    <lhc :routes="routes"></lhc>
  </div>
</template>
<script>
import heads from '../head'
import lhc from './components/lhc'
export default {
  data() {
    return {
      routes: Object
    }
  },
  mounted() {
    this.routes = this.$route.params
  },
  components: {
    heads,
    lhc
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.ssc {
  // padding: 0px;
  @include between;
  flex-direction: column;
}
</style>
