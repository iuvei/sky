<template>
  <div class="lottery_content">
    <yd-grids-group :rows="3" class="func_part">
      <yd-grids-item v-for="(item,index) in datas" :key="index">
        <div class='lottery_wrap' @click='toBetting(item, index)' slot='else'>
          <div class="icon">
            <img :class="{'gray': gray, 'lottery_disable': item.enable==2}" :src="item.icon" alt="">
          </div>
          <div class="contents">{{item.game_name}}</div>
          <div class="text">{{item.tip}}</div>
        </div>
      </yd-grids-item>
    </yd-grids-group>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ["datas", 'gray'],
  data() {
    return {
      data: [],
    };
  },
  mounted() {
  },
  watch: {
    datas: function(val) {
      this.data = val;
    }
  },
  computed: {
    ...mapState({
      sysinfo: state => state.sysinfo
    })
  },
  methods: {
    toBetting(item, index) {
      // if(this.$router.currentRoute.fullPath == '/betting') {
        if(item.enable == 2) {
          this.$dialog.toast({mes: '该彩种正在维护中···', timeout: 500})
        } else {
          this.$router.push({
            name: item.js_tag,
            params: {
              lotter_id: item.game_id,
              name_tag:item.tag,
              game_name:item.game_name,
              js_tag: item.js_tag,
              speed: item.speed,
              isHome: true,
              play_type: item.play_type
            }
            })
        }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../css/common.scss';
@function poTorem($px) {
    @return $px / 16px * 1rem;
}
.lottery_content {
    .func_part {
        a {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            // width: poTorem(138px);
            height: poTorem(140px);
            // border-top: poTorem(1px) solid #f3f3f3;
            // border-bottom: poTorem(1px) solid #f3f3f3;
            font-size: poTorem(16px);
            color: #333;
            -webkit-user-select: none;
            -webkit-touch-callout: none;
            .text {
                font-size: poTorem(12px);
                color: #959595;
            }
            .lottery_wrap {
                display: flex;
                flex-direction: column;
                align-items: center;
                .contents {
                    font-size: poTorem(16px);
                    line-height: poTorem(32px);
                }
                .add_betting {
                    padding-top: 1rem;
                }
                .icon {
                    width: poTorem(58px);
                    height: poTorem(58px);
                    // border-radius: 50%;
                    position: relative;
                    img {
                        width: 100%;
                        border-radius: 50%;
                    }
                    .gray,
                    .lottery_disable {
                        -webkit-filter: grayscale(100%);
                        -moz-filter: grayscale(100%);
                        -ms-filter: grayscale(100%);
                        -o-filter: grayscale(100%);
                        filter: grayscale(100%);
                        filter: gray;
                    }
                }
            }
        }
    }
}
</style>
<style lang="scss">
.lottery_content .func_part {
    .yd-grids-item.router-link-active::before {
        // border-right: 0 solid #f3f3f3;
        // display: none !important;
    }
}
</style>
