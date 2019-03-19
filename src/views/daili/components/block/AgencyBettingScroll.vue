<template>
  <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo" class="bet-record">
    <yd-list theme="1" slot="list">
      <div class="hasContent" @click="toDetails(item)" v-for="(item, index) in allData" :key="index" v-if="allData.length!=0">
        <div class="left">
          <p class="first_row">
            <span>{{item.username}}</span>
            <span>{{item.game_name}}</span>
          </p>
          <p>{{item.tz_time}}</p>
        </div>
        <p class="center"></p>
        <div class="right">
          <div>
            <p>-{{item.price}}元</p>
            <!-- <slot name="txt" v-if="!selfTxt"></slot> -->
            <p v-if="selfTxt">{{selfTxt}}</p>
            <!-- <p :class="[{'win_word': item.win!=0}, 'no_win_word']">{{item.win==0?'未中奖':'赢'+item.win}}</p> -->
            <p :class="[{'win_word': item.win!=0}, 'no_win_word']" v-if="tabkey==0||tabkey==2">{{item.win==0?'未中奖':'赢'+item.win}}</p>
          </div>
          <div>
            <img src="../../../../img/bet_record/arrow.png" alt="">
          </div>
        </div>
      </div>
    </yd-list>
    <!-- <div class="empty" v-show="allData.length==0">
      <img src="../../../img/bet_record/noRecords.png" alt="">
      <p>暂无记录</p>
    </div> -->
    <p class="g-all-present" slot="loadingTip">正在拼命加载中</p>
    <p class="g-all-present" slot="doneTip">已显示全部</p>
    <!-- 数据全部加载完毕显示 -->
    <!-- <span slot="doneTip">已显示全部</span> -->
    <!-- 加载中提示，不指定，将显示默认加载中图标 -->
    <!-- <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" /> -->
  </yd-infinitescroll>
</template>

<script>
export default {
  name: "AgencyBettingScroll",
  props: ["allData", "tabkey", "selfTxt"],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    loadList() {
      if (this.loading) return;
      this.loading = true;
      this.$emit("loadMore", b => {
        this.loading = false;
        if (b) {
          /* 单次请求数据完毕 */
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
          return;
        }
        /* 所有数据加载完毕 */
        this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
      });
    },
    toDetails(item) {
      // console.log("object", item);
      this.$router.push({
        name: "dailigoucaixiangqing",
        params: item,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.bet-record {
  .empty {
    padding-top: 50%;
    @include column;
    img {
      width: poTorem(93px);
      // height: poTorem(81px);
    }
    p {
      font-size: poTorem(14px);
      height: poTorem(20px);
      line-height: poTorem(20px);
      color: #bfbfbf;
      font-weight: 700;
    }
    button {
      width: poTorem(93px);
      padding: 5px 0 5px 0;
      font-size: 14px;
      text-align: center;
      font-weight: 700;
      border-radius: 5px;
      color: #fff;
      background-color: #f93;
      outline: none;
      border: none;
    }
  }
  .hasContent {
    @include around;
    padding: poTorem(10px) poTorem(20px);
    border-bottom: poTorem(1px) solid #eee;
    .left {
      width: 60%;
      p {
        &:first-child {
          @include between;
          font-size: poTorem(14px);
          line-height: 2rem;
          color: #313131;
          span {
            width: 50%;
          }
        }
        &:last-child {
          font-size: poTorem(12px);
          color: #a0a0a0;
        }
      }
    }
    .center {
      font-size: poTorem(12px);
      color: #313131;
    }
    .right {
      width: 30%;
      @include end;
      >div {
        // text-align: right;
        // height: poTorem(37px);
        &:first-child {
          font-size: poTorem(13px);
          p {
            &:first-child {
              color: #e33939;
            }
          }
          .no_win_word {
            color: #a0a0a0;
          }
          .win_word {
            color: #097c25;
          }
        }
        &:last-child {
          line-height: poTorem(37px);
        }
        img {
          width: poTorem(16px);
        }
      }
    }
  }
  .all_present {
    width: 100%;
    text-align: center;
    margin-top: poTorem(20px);
    font-size: 1rem;
    color: #a0a0a0;
    font-weight: 400;
    background-color: transparent;
  }
}
</style>


<style lang="scss">
@import "../../../../css/resources.scss";
.bet-record {
  .yd-list-loading,
  .yd-list-donetip {
    height: poTorem(50px);
  }
  .g-all-present {
    height: poTorem(50px);
    margin-top: poTorem(10px);
  }
}
</style>
