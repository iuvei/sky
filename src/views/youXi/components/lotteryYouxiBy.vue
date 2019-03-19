<template>
  <div class="remenlist_youxi">
    <div class="remenlist_list">
      <yd-grids-item v-for="(item,index) in this.dataByPt"
                     :key="index"
                     class="remen_item">
        <div class='lottery_wrap'
             slot='else'
             @click="toFishing(item)">
          <div class="icon">
            <img :src="item.icon" alt="">
            <img :src="require('~/img/youxi/'+item.tag+'.png')" class="tt" alt="">
          </div>
          <div class="contents">
            {{item.pt_name}}
          </div>
          <div class="triangle_try">
            <div class="djan">
              <span>{{item.info}}</span>
            </div>
          </div>
        </div>
      </yd-grids-item>
    </div>
  </div>

</template>
<script>
import { mapState } from "vuex";
import openTry from "../youximixin.js";

export default {
  props: ["dataByPt"],
  data() {
    return {
      pullUp: false,
      list: [],
      // datali: [],
      pageid: 0,
      basedata: [],
      gmurl: "" // 游戏链接
    };
  },
  components: {},
  mounted() {
    // this.getGameList_get();
  },
  mixins: [openTry],
  computed: {
    ...mapState(["userinfo"]),
    ...mapState({
      tag: state => state.youxi.tag // 没有
    })
  },
  watch: {},
  methods: {
    // 点击
    toFishing(item) {
      if (item.enable == 1) {
        this.$dialog.toast({ mes: "该游戏正在维护中···", timeout: 600 });
        return;
      } else {
        this.toOpenTry({
          gameid: item.gameid,
          tag: item.tag,
          shibie: 1
        });
      }
    }
    // getGameList_get: debounce(async function() {
    //   this.$ajax("request", {
    //     ac: "GetH5GameList",
    //     // tag: this.tag,
    //     tag: "jjqp",
    //     rows: 20,
    //     pageid: this.pageid
    //   }).then(response => {
    //     if (response.filter(el => el.type == "3")) {
    //       return (this.datali = response.filter(el => el.type == "3"));
    //     }
    //   });
    // }, 300)
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.remenlist_youxi {
  width: 100%;
  height: 100%;
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
          height: 2.2rem;
          font-size: poTorem(15px);
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
        .icon {
          position: relative;
          width: poTorem(85px);
          height: poTorem(85px);
          margin-top: 0.9rem;
          img {
            width: 100%;
          }
        }
        .tt {
          position: absolute;
          bottom: 0;
          right: 0;
        }
        .triangle_try {
          width: 100%;
          height: 100%;
          margin-bottom: 0.9rem;
          .djan {
            width: 100%;
            height: poTorem(24px);
            display: flex;
            justify-content: center;
            font-size: poTorem(16px);
            margin-top: -0.5rem;
          }
        }
      }
    }
  }
}
</style>