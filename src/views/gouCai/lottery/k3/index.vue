<template>
  <div class="ssc">
    <heads :routes="routes" :type='0'></heads>
    <k3 :routes="routes"></k3>
  </div>
</template>
<script>
import heads from '../head'
import k3 from './components/k3'
export default {
  data() {
    return {
      routes: Object
    }
  },
  mounted(){
    this.routes = this.$route.params
  },
  components:{
    heads,
    k3
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../css/resources.scss';
  .ssc {
    // padding: 0px;
    @include between;
    flex-direction: column;
  }
</style>
