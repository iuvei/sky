<template>
  <div class="heads">
    <div :class="[{'heads_con_pig': isfestival},'heads_con']">
      <router-link to="/">
        <div class="icon"></div>
      </router-link>
      <div class="title">
        <div class="center_box">
          {{gameName+"路纸图"}}
        </div>
      </div>
    </div>
    <countdown></countdown>
  </div>
</template>
<script>
import { mapState } from "vuex";
import countdown from "./countdown";
export default {
  // props: [''],
  data() {
    return {
      data: []
    };
  },
  activated() {},
  watch: {},
  components: {
    countdown
  },
  computed: {
    ...mapState({
      gameName: state => state.betting.gameName,
      gameId: state => state.betting.gameId
    }),
    ...mapState(['isfestival'])
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
@import "../../css/resources.scss";
.heads {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .heads_con {
    @include center;
    background: url(~img/goucai/goucaibg.png);
    width: 100%;
    height: poTorem(48px);
    position: fixed;
    z-index: 1000 !important;
    top: 0;
    &.heads_con_pig {
      @include pigbg;
    }
    a {
      position: fixed;
      width: 20%;
      height: poTorem(48px);
    }
    .icon {
      background: url(~img/shouye/back.png) no-repeat;
      width: poTorem(40px);
      height: poTorem(48px);
      display: flex;
      justify-content: center;
      align-items: center;
      // position: absolute;
      position: fixed;
      margin-left: poTorem(-145px);
      margin-top: poTorem(13px);
      background-size: poTorem(20px) poTorem(20px);
    }
    .title {
      width: 60%;
      @include center;
      font-size: poTorem(18px);
      color: #fff;
      font-weight: bolder;
      // border: 1px solid red;
      .center_box {
        text-align: center;
        font-size: poTorem(19px);
      }
    }
  }
}
</style>
