<template>
  <div class="match-league-select">
    <Mheader title='赛事赛选'></Mheader>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Mheader from './components/header'
export default {
  name: 'match-league-select',
  components: { Mheader },
  data() {
    return {}
  },
  computed: {
    ...mapState('football', ['maintained', 'sysinfo'])
  }
}
</script>
<style lang="scss" scoped>
@import '~css/resources.scss';
.match-league-select {
}
</style>


