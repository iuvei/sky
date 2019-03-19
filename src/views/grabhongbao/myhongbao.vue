<template>
  <div>
    <grabHead :tit="title"
              class="head"
              :isRule="isRule"></grabHead>
    <div class="myhb">
      <div class="myhb-head">
        <div class="all-price">红包总额：<span>{{myHbList.sum_price || 0}}</span></div>
        <div class="hb-num">红包个数：<span>{{myHbList.number || 0}}</span></div>
      </div>
      <div class="myhb-contain">
        <!-- <div class="contain-box"> -->
        <div class="head-item">
          <div class="time">时间</div>
          <div class="type">红包类型</div>
          <div class="price">金额</div>
        </div>
        <!-- <yd-layout> -->
        <yd-infinitescroll :callback="getMyHbList"
                           ref="redPacket"
                           class="infinitiCom">
          <div slot="list"
               class="scroll_box">
            <div class="hb-list"
                 v-for="(item, index) in myHbList.list"
                 :key="index">
              <div class="time">{{item.date}}</div>
              <div class="type">{{item.type}}</div>
              <div class="price">{{item.price}}</div>
            </div>
            <div class="none-record"
                 v-if="Array.isArray(myHbList.list) && !myHbList.list.length">
              <img src="~img/grabhongbao/none_record.png"
                   alt="">
            </div>
          </div>
          <span slot="doneTip">{{(Array.isArray(myHbList.list) && !myHbList.list.length) ? '' : '啦啦啦,后面没有数据啦~~'}}</span>
          <!-- <span slot="doneTip">啦啦啦,后面没有数据啦~~</span> -->
          <!-- <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/> -->
        </yd-infinitescroll>
        <!-- </yd-layout> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import grabHead from "./head";
export default {
  name: "myhongbao",
  components: {
    grabHead
  },
  data() {
    return {
      myHbList: {
        list: []
      },
      title: "我的红包",
      isRule: true,
      pageId: 0
    };
  },
  methods: {
    // 获取我的红包列表
    getMyHbList() {
      // this.$refs.redPacket.$emit('ydui.infinitescroll.reInit');
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "getMyGiftList",
        pageid: this.pageId
      }).then(res => {
        console.log(res);
        this.$dialog.loading.close();
        if (this.pageId) {
          const temp = this.myHbList.list;
          this.myHbList.list = [...temp, ...res.list];
        } else {
          this.myHbList = res;
        }
        if (res.list.length < 20) {
          this.$refs.redPacket.$emit("ydui.infinitescroll.loadedDone");
          return;
        }
        this.pageId++;
        this.$refs.redPacket.$emit("ydui.infinitescroll.finishLoad");
      });
    },
    pageUp() {
      this.getMyHbList();
    }
  },
  activated() {
    this.pageId = 0;
    this.$refs.redPacket.$emit("ydui.infinitescroll.reInit");
    this.getMyHbList();
  }
};
</script>
<style lang="scss" scoped>
@import "../../css/resources.scss";
.myhb {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  // flex: 1;
  // height: 0;
  height: 100%;
  align-items: center;
  background-image: url("~img/grabhongbao/indexbg.jpg");
  .myhb-head {
    width: 100%;
    display: flex;
    height: poTorem(50px);
    justify-content: space-between;
    align-items: center;
    div {
      padding: 0 poTorem(15px);
      font-size: poTorem(18px);
      color: #f4b492;
      span {
        color: #fff001;
      }
    }
  }
  .myhb-contain {
    flex: 0.95;
    // height: 0;
    height: 100%;
    overflow: auto;
    width: 100%;
    // padding: 0 poTorem(15px) poTorem(25px) poTorem(15px);
    // .contain-box {
    width: 90%;
    // margin-top: poTorem(25px);
    // min-height: poTorem(550px);
    border-radius: poTorem(10px);
    background-color: #fdf1e1;
    display: flex;
    flex-direction: column;
    .head-item {
      width: 100%;
      display: flex;
      padding: poTorem(15px) poTorem(20px);
      justify-content: space-around;
      align-items: center;
      font-size: poTorem(18px);
      color: #934144;
      border-bottom: 1px solid #fbe5c7;
      .time {
        width: 50%;
        text-align: center;
      }
      .price {
        width: 25%;
        text-align: center;
      }
      .type {
        width: 25%;
        text-align: center;
      }
    }
    .infinitiCom {
      flex: 1;
      // height: 100%;
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      // overflow-x: hidden;
      // overflow-y: auto;
      // height: 500px;
      // height: poTorem(500px);
      // position: relative;
      // overflow: auto;
      .scroll_box {
        flex: 1;
        // height: 100%;
        overflow: auto;
        position: relative;
        .hb-list {
          width: 100%;
          padding: poTorem(10px) 0.6rem;
          border-bottom: 1px solid #fbe5c7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: poTorem(16px);
          color: #934144;
          div {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
          }
          .time {
            width: 50%;
          }
          .price {
            width: 25%;
          }
          .type {
            width: 25%;
          }
        }
      }
    }
    .none-record {
      width: 100%;
      height: poTorem(450px);
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        display: inline-block;
        width: poTorem(120px);
      }
    }
    // }
  }
}
</style>


