<template>
  <div class="ssc">
    <heads :routes="routes" :type='1'></heads>
    <shishi-cai :routeList="routes"></shishi-cai>
  </div>
</template>
<script>
import heads from '../head'
import shishiCai from './components/shishicai'
export default {
  data() {
    return {
      routes: Object
    }
  },
  activated(){
    this.routes = this.$route.params
  },
  components:{
    heads,
    shishiCai
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../css/resources.scss';
  .ssc {
    // padding: 0px;
    @include between;
    flex-direction: column
  }
</style>
