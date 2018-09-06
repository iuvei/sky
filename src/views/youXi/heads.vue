<template>
  <div class="heads">
    <div class="heads_con">
      <router-link to="/">
        <div class="icon"></div>
      </router-link>
      <div class="title">
        <div class="center_box">
          {{$route.params.pt_name}}
        </div>
      </div>
      <div class="switch"></div>
    </div>
    <div class="scroll_box">
      <sousuo></sousuo>
      <remenlist v-show="!searchView"></remenlist>
    </div>
  </div>

</template>
<script>
import { mapActions, mapState } from 'vuex'
import sousuo from './youxifenlei/sousuo'
import remenlist from './youxifenlei/remenYouxi'
export default {
    data() {
        return {}
    },
    computed: { ...mapState('youxi', ['searchView']) },
    components: {
        sousuo,
        remenlist
    },
    activated() {},
    mounted() {},
    methods: {}
}
</script>
<style lang="scss" scoped>
@import '~css/resources.scss';
.heads {
    width: 100%;
    height: poTorem(48px);
    .heads_con {
        @include between;
        background: url(~img/goucai/goucaibg.png);
        width: 100%;
        position: relative;
        position: fixed;
        z-index: 1000 !important;
        top: 0;
        a {
            position: relative;
            width: 20%;
            height: poTorem(48px);
        }
        .icon {
            background: url(~img/shouye/back.png) no-repeat;
            width: poTorem(40px);
            height: poTorem(35px);
            position: absolute;
            top: 30%;
            left: 30%;
            background-size: poTorem(20px) poTorem(20px);
        }
        .title {
            width: 60%;
            @include center;
            font-size: poTorem(18px);
            color: #fff;
            font-weight: bolder;
            .center_box {
                text-align: center;
            }
        }
        .switch {
            @include around;
            width: 20%;
        }
    }
}
</style>
