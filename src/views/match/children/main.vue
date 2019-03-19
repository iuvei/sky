<template>
  <div class="main-betting">
    <yd-accordion accordion>
      <AppEmpty v-if="!gameList.length"></AppEmpty>
      <yd-accordion-item v-for="(allMatch, dayIdx) in gameList" :key="dayIdx" :title="allMatch.scheduleDate" open>

        <betting :oneMatch="match" v-for="(match, matchIdx) in allMatch.scheduleList" :key="matchIdx"></betting>

      </yd-accordion-item>

    </yd-accordion>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import betting from '../components/matchBettingItem'
export default {
  name: 'match-main-betting',
  components: { betting },
  data() {
    return {}
  },
  computed: {
    ...mapState('match', ['gameType', 'gameList'])
  },
  watch: {
    gameType: 'getJingcaiGameList'
  },
  activated() {
    const { lotter_id: jingcai_id } = this.$route.params
    if (jingcai_id) {
      this.updateField({ jingcai_id })
    }
    this.getJingcaiGameList()
  },
  methods: {
    ...mapActions('match', ['updateField', 'getJingcaiGameList'])
  }
}
</script>
<style lang="scss">
@import '~css/resources.scss';
.main-betting {
  .yd-accordion-title {
    color: #070101;
    line-height: 2.4rem;
    font-size: 1.2rem;
  }
}
</style>


