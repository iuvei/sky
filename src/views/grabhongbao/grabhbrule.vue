<template>
  <div>
    <grabHead :tit='title' class="head" :isRule='isRule'></grabHead>
    <div class="rule-box other-block">
      <div v-html="grabhbrule.detail">
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import grabHead from './head'
export default {
  data() {
    return {
      title: '活动规则',
      isRule: false
    }
  },
  components: {
    grabHead
  },
  name: 'grabhbrule',
  mounted() {},
  methods: {},
  computed: {
    ...mapState(['grabhbrule'])
  }
}
</script>
<style lang="scss" scoped>
.rule-box {
  // position: relative;
  background-image: url(~img/grabhongbao/indexbg.jpg);
  padding: 0.375rem 0.625rem;
}
</style>


