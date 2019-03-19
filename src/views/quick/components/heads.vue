<template>
  <div class="heads">
    <div :class="[{'heads_con_pig': isfestival},'heads_con']">
      <router-link to="/">
        <div class="icon"></div>
      </router-link>
      <div class="title">
        <div class="center_box">添加快捷方式</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(['isfestival'])
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources";
.heads {
  width: 100%;
  height: poTorem(48px);
  position: relative;
  z-index: 9;
  .heads_con {
    @include left;
    background: url(~img/goucai/goucaibg.png);
    width: 100%;
    height: poTorem(48px);
    position: relative;
    top: 0;
    &.heads_con_pig {
      @include pigbg;
    }
    a {
      width: 20%;
      height: poTorem(48px);
      position: relative;
    }
    .icon {
      background: url(~img/shouye/back.png) no-repeat;
      width: poTorem(40px);
      height: poTorem(20px);
      position: absolute;
      text-align: center;
      top: 30%;
      left: 30%;
      background-size: poTorem(20px) poTorem(20px);
    }
    .title {
      width: 60%;
      text-align: center;
      font-size: poTorem(18px);
      color: #fff;
      font-weight: bolder; // @include center;
    }
  }
}
</style>
