<template>
  <yd-infinitescroll :callback="_callback"
                     ref="infinitescrollDemo">
    <yd-list theme="1"
             slot="list">
      <tuijian></tuijian>
      <div class="remenlist_youxi">
        <div class="remenlist_top">
          <div class="remenlist_top_lfst">
            <span>热门游戏</span>
          </div>
        </div>
        <div class="remenlist_list">
          <yd-grids-item v-for="(item,index) in list"
                         :key="index"
                         class="remen_item">
            <div class='lottery_wrap'
                 slot='else'
                 @click="toOpenTry(item,tag)">
              <div class="icon">
                <img :src="item.image_url"
                     alt="">
              </div>
              <div class="contents">
                {{item.game_name}}
              </div>
              <!-- <div
                class="triangle_try"
                v-show="userinfo.accountInfo.test === 2"
              >
                <div class="djan">
                  <span>试玩</span>
                </div>
              </div> -->
            </div>
          </yd-grids-item>
        </div>
      </div>
    </yd-list>
    <!-- 数据全部加载完毕显示 -->
    <span slot="doneTip">不要在拉了,没有数据啦~~</span>
    <img slot="loadingTip"
         src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
  </yd-infinitescroll>

</template>
<script>
import { mapState } from 'vuex';
import tuijian from './tuijianYouxi';
import openTry from '../youximixin.js';
export default {
  props: ['type'],
  data() {
    return {
      pullUp: false,
      list: [],
      pageid: 0,
      basedata: [],
      isloading: false,
      gmurl: '' // 游戏链接
    };
  },
  components: {
    tuijian
  },
  activated() {
    this.getGameList_get();
  },
  deactivated() {
    this.pageid = 0;
  },
  mixins: [openTry],
  computed: {
    ...mapState(['userinfo']),
    ...mapState({
      tag: state => state.youxi.tag
    })
  },
  watch: {},
  methods: {
    getGameList_get() {
      this.$dialog.loading.open(' ');
      this.isloading = true;
      this.$ajax('request', {
        ac: 'GetH5GameList',
        tag: this.tag,
        rows: 20,
        pageid: this.pageid,
        type: this.$route.params.type
      }).then(response => {
        let _list = [];
        if (this.tag === "jjqp" && response.filter(el => el.type == "2")) {
          _list = response.filter(el => el.type == "2");
          // console.error("this.list", _list);
        } else {
          _list = response;
        }
        if (this.pullUp) _list = [...this.list, ..._list];
        this.list = _list;

        this.$dialog.loading.close();
        if (!_list.length || _list.length % 20 !== 0 || this.pageid == 10) {
          /* 所有数据加载完毕 */
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
          return;
        }
        /* 单次请求数据完毕 */
        this.pullUp = false;
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
        this.pageid++;
        this.isloading = false;
      });
    },
    _callback() {
      this.pullUp = true;
      if (!this.isloading) this.getGameList_get();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.remenlist_youxi {
  width: 100%;
  height: 100%;
  .remenlist_top {
    width: 100%;
    height: poTorem(35px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: poTorem(16px);
    border-bottom: poTorem(1px) solid #f3eeee;
    .remenlist_top_lfst {
      width: poTorem(90px);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: $mainColor;
      font-weight: 800;
      border-bottom: poTorem(1.5px) solid $mainColor;
    }
  }
  .remenlist_list {
    width: 100%;
    height: 100%;
    .remen_item {
      width: 33.3%;
    }
    a {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      color: #959595;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
      padding-top: poTorem(14px);
      .lottery_wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 80%;
        .contents {
          width: 90%;
          height: 2.5rem;
          font-size: poTorem(15px);
          // line-height: poTorem(32px);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }
        // .triangle_try {
        //   width: 100%;
        //   height: 100%;
        //   display: flex;
        //   height: 2rem;
        //   justify-content: center;
        //   align-items: center;
        //   margin-bottom: 0.5rem;
        //   .djan {
        //     width: poTorem(70px);
        //     height: poTorem(26px);
        //     border-radius: 1.25rem;
        //     border: solid 1px $mainColor;
        //     display: flex;
        //     justify-content: center;
        //     align-items: center;
        //     // margin-bottom: 0.3rem;
        //     span {
        //       font-size: poTorem(16px);
        //       color: $mainColor;
        //     }
        //   }
        // }
        .icon {
          width: poTorem(85px);
          height: poTorem(85px);
          margin-top: 0.7rem;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>