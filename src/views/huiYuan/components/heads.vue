<template>
  <div class="heads">
    <div class="phone_header">
      <div class="pull_left">
      </div>
      <div class="pull_title">
        <span>个人中心</span>
      </div>
  </div>
  </div>
</template>
<script>
import { mapActions,mapState } from "vuex";
export default {
  data() {
    return {
      show1: false,
      data: {}
    };
  },
  mounted() {
    
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.heads{
  height: poTorem(48px);
}
.phone_header {
  @include center;
  height: poTorem(48px);
  background: url(../../../img/phone_header.png) CENTER TOP;
  position: relative;
  top: 0;
  left: 0;
  z-index: 21;
  .pull_title{
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
