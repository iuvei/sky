<template>
  <div class="heads">
    <div :class="[{'heads_con_pig': isfestival},'heads_con']">
      <router-link to="/" class="youxi_return">
        <div class="icon"></div>
      </router-link>
      <div class="title">
        <div class="center_box">
          {{$route.params.sub_name}}{{$route.params.suffix}}
        </div>
      </div>
      <div class="switch" @click="forcedRefresh()">
        <div>{{user_price || 0}}</div>
        <img src="~img/personal_center/refresh.png" alt="">
      </div>
    </div>
    <div class="scroll_box">
      <sousuo></sousuo>
      <remenlist v-show="!searchView"></remenlist>
    </div>
  </div>

</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
import sousuo from "./youxifenlei/sousuo";
import remenlist from "./youxifenlei/remenYouxi";
import { to } from "~/js/functions";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapMutations("youxi", ["SET_GMGAME_TAG"]),
    ...mapState(['isfestival']),
    ...mapState("youxi", ["searchView"]),
    ...mapState({
      user_price: store => store.userinfo.accountInfo.price,
      tag: state => state.youxi.tag
    }),
    ...mapState("youxi", ["forceTag"])
  },
  components: {
    sousuo,
    remenlist
  },
  activated() {},
  mounted() {},
  methods: {
    ...mapActions(["manualFlushprice"]),
    async forcedRefresh() {
      // this.manualFlushprice({ tag: this.$route.params.tag });
      // 接口有限制,所以提示
      const [err, datajr] = await to(
        this.manualFlushprice({
          tag: this.tag || this.forceTag || this.$route.params.tag
        })
      );

      if (datajr) {
        this.$dialog.toast({ mes: "强制刷新余额成功", timeout: 1000 });
      }
      if (err) {
        this.$dialog.toast({ mes: "请6秒后再强制刷新余额", timeout: 800 });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.heads {
  width: 100%;
  height: poTorem(48px);
  .heads_con {
    @include between;
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
      position: relative;
      width: 20%;
      height: poTorem(48px);
    }
    .youxi_return {
      width: 33%;
      height: 100%;
      .icon {
        background: url(~img/shouye/back.png) no-repeat;
        background-size: poTorem(20px) poTorem(20px);
        width: poTorem(40px);
        height: poTorem(35px);
        position: absolute;
        top: 30%;
        left: 13%;
      }
    }
    .title {
      width: 33%;
      // border: #fff 1px solid;
      @include center;
      font-size: poTorem(18px);
      color: #fff;
      font-weight: bolder;
      .center_box {
        text-align: center;
      }
    }
    .switch {
      @include end;
      width: 33%;
      font-size: poTorem(15px);
      color: #f1fa51;
      font-weight: bolder;
      padding-right: poTorem(6px);
      img {
        width: poTorem(20px);
        height: poTorem(20px);
        margin: 0 poTorem(5px) 0 poTorem(2px);
      }
    }
  }
}
</style>
