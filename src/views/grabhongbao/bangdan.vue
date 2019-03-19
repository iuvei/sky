<template>
  <div>
    <grabHead :tit='title'
              class="head"
              :isRule='isRule'></grabHead>
    <div class="myhb other-block">
      <div class="myhb-contain">
        <div class="contain-box">
          <div class="head-img">
            <img src="~img/grabhongbao/paihanbang.png"
                 alt="">
          </div>
          <div class="head-item">
            <div>排名</div>
            <div class="time">账号</div>
            <div>红包类型</div>
            <div>金额</div>
          </div>
          <div class="hb-list"
               v-for="(item, index) in myHbList"
               :key="index">
            <div class="paiming"
                 v-if="index >= 3">{{index+1}}</div>
            <div v-else><img class="paihang"
                   :src="require('../../img/grabhongbao/'+ (index+1) +'.png')"
                   alt=""></div>
            <div>{{item.username}}</div>
            <div>{{item.reward_type}}</div>
            <div>{{item.price}}</div>
          </div>
          <div class="none-record"
               v-if="!myHbList.length">
            <img src="~img/grabhongbao/none_record.png"
                 alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import grabHead from "./head";
export default {
  name: "hongbaobangdan",
  data() {
    return {
      myHbList: [],
      title: "人品榜单",
      isRule: true
    };
  },
  components: {
    grabHead
  },
  methods: {
    // 获取我的红包列表
    async getBangDan() {
      await this.$ajax("request", {
        ac: "RobGiftUserRankingList"
      }).then(res => {
        this.myHbList = res ? res : [];
      });
    }
  },
  mounted() {
    this.getBangDan();
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.myhb {
  width: 100%;
  position: relative;
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
    width: 100%;
    padding: 2rem poTorem(10px);
    .contain-box {
      width: 100%;
      margin-top: poTorem(25px);
      min-height: poTorem(550px);
      border-radius: poTorem(10px);
      background-color: #fdf1e1;
      .head-img {
        width: 100%;
        position: relative;
        height: poTorem(60px);
        display: flex;
        justify-content: center;
        img {
          display: inline-block;
          width: 80%;
          position: absolute;
          top: -35px;
        }
      }
      .head-item {
        width: 100%;
        display: flex;
        padding: poTorem(15px) poTorem(10px);
        justify-content: space-around;
        align-items: center;
        font-size: poTorem(18px);
        color: #934144;
        border-bottom: 1px solid #fbe5c7;
        div {
          text-align: center;
        }
        div:nth-child(1) {
          width: 14%;
        }
        div:nth-child(2) {
          flex: 1;
        }
        div:nth-child(3) {
          width: 22%;
        }
        div:nth-child(4) {
          width: 28%;
        }
      }
      .hb-list {
        width: 100%;
        padding: poTorem(10px) poTorem(10px);
        border-bottom: 1px solid #fbe5c7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: poTorem(16px);
        color: #934144;
        .paiming {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #882e33;
          font-size: poTorem(16px);
        }
        div:nth-child(1) {
          width: 14%;
        }
        div:nth-child(2) {
          flex: 1;
        }
        div:nth-child(3) {
          width: 22%;
        }
        div:nth-child(4) {
          width: 28%;
        }
        div {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          .paihang {
            display: inline-block;
            height: poTorem(30px);
          }
        }
      }
      .none-record {
        width: 100%;
        height: poTorem(450px);
        // background-color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          display: inline-block;
          width: poTorem(120px);
        }
      }
    }
  }
}
</style>


