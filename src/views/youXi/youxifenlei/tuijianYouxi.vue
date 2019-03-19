<template>
  <div class="tuijian_youxi">
    <div class="tuijian_top">
      <div class="tuijian_top_lfst">
        <span>推荐游戏</span>
      </div>
      <!-- <div class="tuijian_top_right">
        <span>更多游戏</span>
        <img src="../../../../src/img/youxi/jiantou_tj.png" alt="图片">
      </div> -->
    </div>
    <div class="tuijian_list">
      <yd-slider autoplay="3000">
        <yd-slider-item v-for="page in pages"
                        :key="page">
          <div v-for="el in tjlist.slice((page-1)*pageSize,page*pageSize)"
               @click="toOpenTry(el,tag)"
               :key="el"
               class="func_part">
            <div class="icon">
              <img :src="el.image_url"
                   alt="图片">
            </div>
            <span class="contents">{{el.game_name}}</span>
            <div class="triangle_try"
                 v-show="userinfo.accountInfo.test === 2">
              <div class="djan">
                <span>试玩</span>
              </div>
            </div>
          </div>
        </yd-slider-item>
      </yd-slider>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import openTry from '../youximixin.js';
export default {
  data() {
    return {
      pageSize: 3,
      tjlist: [],
      gmurl: ''
    };
  },
  mixins: [openTry],
  computed: {
    ...mapState(['userinfo']),
    ...mapState({
      tag: state => state.youxi.tag
    }),
    pages() {
      const pages = Math.ceil(this.tjlist.length / this.pageSize);
      return pages;
    }
  },
  activated() {
    this.getGameList_get();
  },
  methods: {
    getGameList_get() {
      this.$dialog.loading.open(' ');
      this.$ajax('request', {
        ac: 'GetWebGameHotList',
        tag: this.tag
      }).then(res => {
        this.tjlist = res;
        this.$dialog.loading.close();
      });
    },
    game_events(el) {
      window.location.href = el;
    }
  },
  components: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.tuijian_youxi {
  width: 100%;
  min-height: 11.2rem;
  .tuijian_top {
    width: 100%;
    height: 2.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: poTorem(16px);
    border-bottom: poTorem(1px) solid #f3eeee;
    .tuijian_top_lfst {
      width: poTorem(90px);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: $mainColor;
      font-weight: 800;
      border-bottom: poTorem(1.5px) solid $mainColor;
    }
    .tuijian_top_right {
      img {
        width: poTorem(12px);
        height: poTorem(12px);
        margin-right: poTorem(8px);
      }
    }
  }
  .tuijian_list {
    display: flex;
    align-content: space-around;
    flex-wrap: wrap;
    width: 100%;
    .func_part {
      width: 33.3%;
      display: inline-flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: poTorem(85px);
        height: poTorem(85px);
        margin-top: 0.5rem;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .contents {
        color: #454545;
        margin-top: poTorem(5px);
        margin-bottom: 1rem;
        font-size: poTorem(16px);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
      .triangle_try {
        width: 100%;
        height: 3.3rem;
        display: flex;
        justify-content: center;
        margin-top: -0.7rem;
        .djan {
          width: poTorem(70px);
          height: poTorem(26px);
          border-radius: 20px;
          border: solid 1px $mainColor;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: poTorem(16px);
            color: $mainColor;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
@import "~css/resources.scss";
.tuijian_youxi {
  .yd-slider-item {
    display: flex;
    flex-wrap: wrap;
  }
  .yd-slider-pagination-item-active {
    background: $mainColor !important;
  }
  .yd-slider-pagination {
    bottom: -0.3rem;
  }
}
</style>