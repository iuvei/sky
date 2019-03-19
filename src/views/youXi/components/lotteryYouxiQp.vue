<template>
  <div class="lottery_youxi_qp">
    <ul v-for="(item,index) in this.dataQpPt"
        :key="index">
      <li>
        <div>
          <div class="big_box">
            <div class="icon">
              <img :src="item.icon"
                   alt="">
            </div>
            <div class="content">
              <div class="content_top">
                <span class="game_name">
                  {{item.sub_name}}棋牌
                </span>
              </div>
              <div class="content_bottom">
                <yd-cell-group title="">
                  <yd-cell-item>
                    <yd-rate slot="left"
                             v-model="item.score"
                             :readonly="true"
                             size="14px"></yd-rate>
                  </yd-cell-item>
                </yd-cell-group>
                <span class="right">
                  {{item.number}}
                  <i>人在玩</i>
                </span>
              </div>
            </div>
            <div class="triangle"
                 @click="toOpen(item)">
              <div class="djan">
                <span>进入</span>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: ["dataQpPt"],
  data() {
    return {
      // datalist: []
    };
  },
  computed: {},
  mounted() {
    // this.getGameList_get();
  },
  watch: {},
  components: {},
  methods: {
    ...mapMutations("youxi", ["SET_GMGAME_TAG"]),
    toOpen(item) {
      // enable 1=维护状态 0=正常
      if (item.enable === 1) {
        this.$dialog.toast({ mes: "该游戏平台正在维护中···", timeout: 600 });
        return;
      }
      this.$router.push({
        name: "youxi",
        params: {
          pt_id: item.pt_id,
          pt_name: item.pt_name,
          tag: item.tag,
          sub_name: item.sub_name,
          // type: item.type,
          type: 2,
          class_type: item.class_type,
          suffix: "棋牌"
        }
      });
      this.SET_GMGAME_TAG(item.tag);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources";
.lottery_youxi_qp {
  background-color: #fff;
  > ul {
    .big_box {
      display: flex;
      width: 100%;
      height: poTorem(90.3px);
      // min-height: poTorem(90px);
      border-bottom: solid 1px #dbdbdb;
      justify-content: space-around;
      align-items: center;
      .icon {
        width: 22%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        img {
          width: poTorem(58px);
          height: poTorem(58px);
          border-radius: 50%;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        flex: 1;
        // border: solid 1px #c6e66e;
        .content_top {
          font-size: poTorem(15px);
          margin: poTorem(8px) 0;
        }
        .content_bottom {
          display: flex;
          justify-content: space-between;
          height: poTorem(22px);
          line-height: poTorem(18px);
          font-size: poTorem(13px);
          color: #959595;
          .right {
            width: 50%;
            margin-right: poTorem(18px);
            i {
              padding-left: 0.2rem;
              font-size: 1rem;
            }
          }
        }
      }
      .triangle {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
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
.lottery_youxi_qp {
  .yd-cell::after {
    border-bottom: solid 0 #fff;
  }
  .yd-rate .rate-active {
    color: $mainColor !important;
  }
  .yd-rate a {
    color: $mainColor !important;
  }
  .yd-cell-item {
    padding: 0;
  }
}
</style>
