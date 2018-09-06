<template>
  <div class="goucai">
    <!--头部-->
    <!-- <heads></heads> -->
    <!--投注页面-->
    <lottery></lottery>
  </div>
</template>
<script>
// import heads from "./components/header";
import lottery from "./components/lottery";

import { mapActions } from "vuex";
export default {
  name: "goucai",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  components: {
    // heads,
    lottery
  }
};
</script>
<style lang="scss" scoped>
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
.goucai {
  overflow: auto;
}
</style>
<style lang="scss">
  .heads_bottom{
    .yd-accordion-head {
      display: none;
    }
    .color-red {
      color: #eb3349;
    }
    .color-blue{
      color: #54BAEA;
    }
    .times {
      display: flex;
      .haoma {
        span {
          height: poTorem(25px);
          // background: url(~img/goucai/timestamp.png) no-repeat;
          background-size: 5.4rem poTorem(25px);
          color: #eb3349;
          line-height: poTorem(25px);
          text-align: center;
          letter-spacing: poTorem(2px);
          // text-indent: poTorem(3px);
        }
        i {
          margin: 0 poTorem(2px);
        }
      }
      .haoma:last-child{
        flex:1;
        text-align: right;
      }
    }
  }
</style>
