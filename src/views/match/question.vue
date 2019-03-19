<template>
  <div class="match-question">
    <Mheader title='玩法说明'></Mheader>
    <section v-html="rule" class="other-block rule-content"></section>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Mheader from './components/header'
import ruleFT from './components/rule-fb'
import ruleBK from './components/rule-bk'
const rules = {
  2101: ruleFT,
  2102: ruleBK
}
export default {
  name: 'match-question',
  components: { Mheader },
  data() {
    return {}
  },
  computed: {
    ...mapState('match', ['jingcai_id']),
    rule() {
      return rules[~~this.jingcai_id]
    }
  }
}
</script>
<style lang="scss">
@import '~css/resources.scss';
.match-question {
  background-clip: #ffffff;
  .rule-content {
    font-size: 1rem;
    padding: 1rem;
    .betTips > li {
      list-style: decimal;
      list-style-position: inside;
      margin-bottom: 0.6rem;
    }
  }
}
</style>


