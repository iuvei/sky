<template>
  <div class="heads">
    <div :class="[{'phone_header_pig':isfestival},'phone_header']">
      <div class="pull_title">
        <span>开奖大厅</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      data: []
    };
  },
  computed: {
    ...mapState(['isfestival'])
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.heads {
  height: poTorem(48px);
}
.phone_header {
  @include center;
  height: poTorem(48px);
  width: 100%;
  background: url(../../../img/phone_header.png) CENTER TOP;
  position: relative;
  top: 0;
  left: 0;
  z-index: 21;
  &.phone_header_pig {
    @include pigbg;
  }
  .pull_title {
    width: 33.3%;
    @include end;
    font-size: poTorem(18px);
    color: #fff;
    font-weight: bolder;
  }
  .pull_title {
    @include center;
  }
}
</style>
