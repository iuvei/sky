<template>
  <div class="trend_head">
    <span v-for="(item,index) in digits"
          :key="index"
          @click='light(index)'
          :class="{'active':$store.state.trend.trendval==index}">
      {{item}}
    </span>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      gameName: state => state.trend.gameName,
      gameId: state => state.trend.gameId,
      digits: state => state.trend.digits
    })
  },
  methods: {
    ...mapActions(['setTrendval']),
    light(index) {
      this.setTrendval(index);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.trend_head {
  width: 100%;
  background: #fff;
  padding: poTorem(10px) 0 poTorem(10px) 0;
  position: fixed;
  left: 0;
  top: poTorem(48px);
  z-index: 12;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #f3f3f3;
  span {
    flex: 1;
    text-align: center;
    color: #666;
    box-sizing: border-box;
    border-radius: poTorem(4px);
    height: poTorem(30px);
    line-height: poTorem(30px);
    font-size: poTorem(16px);
    margin: 0.5%;
    font-weight: bold;
    flex-basis: 65px;
  }
  .active {
    background-color: #f93;
    color: #fff;
  }
}
</style>
