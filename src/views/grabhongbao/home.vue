<template>
  <div class="grab-hb">
    <grabHead :tit='title'
              class="head"
              :isRule='isRule'></grabHead>
    <div class="contain-box">
      <img src="../../img/grabhongbao/containbg.jpg"
           alt="">
      <div class="hongbao-wp">
        <div class="hongbao">
          <div>
            <img src="../../img/grabhongbao/hongbao.png"
                 alt="">
            <div class="start-time">{{beginTime}} 开始</div>
            <div class="end-time">{{endTime}} 结束</div>
          </div>
          <div class="grab-btn"
               @click="grabImediate()">
            <img src="../../img/grabhongbao/grabhbbtn.png"
                 alt="">
          </div>
        </div>
        <div class="jihui">您当前还剩<span style="color:red;padding:0 5px;"> {{remainTimes ? remainTimes : 0}} </span> 次机会</div>
        <div class="hb-btns">
          <div class="btn"
               @click="goToSubItem(item)"
               v-for="(item, index) in titleArr"
               :key="index">
            <img src="../../img/grabhongbao/nav-btn.png"
                 alt="">
            <div class="btn-text">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <yd-popup v-model="isShow"
              position="center"
              width="100%"
              masker-opacity="0.8"
              class="gift_pop_win">
      <div class="open-hb">
        <!-- 抢红包 -->
        <img class="openhb-img"
             src="~img/grabhongbao/openhb.png"
             alt="">
        <!-- 光背景 -->
        <div class="light">
          <img src="~img/grabhongbao/lightbg.png"
               alt="">
        </div>
        <div class="content"
             v-if="gift.price">
          <p class="head">{{gift.info.substr(0,3)}}</p>
          <p class="mid">{{gift.info.substr(3)}}</p>
          <p class="bottom">获得<i>{{gift.price}}</i>元</p>
        </div>
        <div class="content"
             v-else>
          <p class="head">很抱歉</p>
          <p class="mid">您未满足本次抢红包</p>
          <p class="bottom">活动条件！</p>
        </div>
      </div>
      <div class="close"
           @click="isShow = false">
        <img src="../../img/grabhongbao/close.png"
             alt="">
      </div>
    </yd-popup>
  </div>
</template>
<script>
import grabHead from "./head";

import { mapState, mapActions } from "vuex";
import decodeFunc from "../shouYe/decode.js";

export default {
  name: "grabhongbao",
  components: {
    grabHead
  },
  data() {
    return {
      titleArr: [
        { name: "人品榜单", path: "/grabhb/bangdan" },
        { name: "我的红包", path: "/grabhb/myhb" },
        { name: "在线客服", path: "/service" }
      ],
      title: "抢红包",
      isRule: true, // 是否显示"规则"
      gift: {}, // 红包
      remainTimes: "",
      isShow: false
    };
  },
  computed: {
    ...mapState(["sysinfo", "grabhbrule", "userinfo"]),
    beginTime() {
      if (!this.grabhbrule.btime) {
        return "__-__-__ -- : -- : --";
      }
      return new Date(this.grabhbrule.btime * 1000).format(
        "yyyy-MM-dd hh:mm:ss"
      );
    },
    endTime() {
      if (!this.grabhbrule.etime) {
        return "__-__-__ -- : -- : --";
      }
      return new Date(this.grabhbrule.etime * 1000).format(
        "yyyy-MM-dd hh:mm:ss"
      );
    }
  },
  mixins: [decodeFunc],
  methods: {
    // ...mapMutations(['setGrabhbrule']),
    ...mapActions(["RobEventGiftIndex", "getServiceUrl"]),
    // 立即抢红包
    async grabImediate() {
      this.gift = {};
      if (!this.userinfo.isLogin) {
        this.$dialog.confirm({
          title: "温馨提示",
          mes: "您未登录，请先登录",
          opts: () => {
            this.$router.push({
              path: "/login",
              query: { redirect: this.$router.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
          }
        });
        return;
      }
      if (this.remainTimes <= 0) {
        this.isShow = true;
      }
      if (this.remainTimes * 1) {
        this.$dialog.loading.open("正在抢红包...");
        await this.$ajax("request", {
          ac: "RobGiftReward"
        }).then(res => {
          this.isShow = true;
          this.$dialog.loading.close();
          this.gift = res;
          // console.error('res',this.gift);
          this.remainTimes = res.number;
        });
      }
    },
    async openbigwin() {
      const url = await this.getServiceUrl();
      window.location.href = url;
    },
    // 隐藏规则
    hideRule() {
      this.title = "规则";
      this.isRule = false;
    },
    goToSubItem(item) {
      if (item.name == "在线客服") {
        this.openbigwin();
        // window.location.href = this.sysinfo.service_url;
        return;
      }
      this.$router.push(item.path);
    },

    // 获取抢红包剩余次数
    getRmain() {
      this.$ajax("request", {
        ac: "RobGiftRemainNumber"
      }).then(res => {
        // console.error('remain',res)
        this.remainTimes = res;
      });
    }
  },
  async activated() {
    if (this.userinfo.isLogin) {
      await this.getRmain();
    }
    await this.RobEventGiftIndex();
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.grab-hb {
  position: relative;
  z-index: 15000;
  .indexhonbao-bg {
    display: inline-block;
    height: 100%;
    position: fixed;
    z-index: 100;
  }
  .contain-box {
    flex: 1;
    width: 100%;
    height: 0;
    img {
      vertical-align: bottom;
      display: inline-block;
      width: 100%;
      z-index: 150;
    }
    .hongbao-wp {
      position: absolute;
      width: 100%;
      bottom: poTorem(20px);
      .hongbao {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .start-time,
        .end-time {
          width: 100%;
          text-align: center;
          position: absolute;
          top: 40%;
          left: 0;
          color: #fff;
          font-size: poTorem(15px);
        }
        .end-time {
          top: 55%;
        }
        .grab-btn {
          position: absolute;
          bottom: poTorem(40px);
          img {
            width: poTorem(150px);
          }
        }
        img {
          display: inline-block;
          width: poTorem(250px);
        }
      }
      .jihui {
        width: 100%;
        height: poTorem(55px);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: poTorem(20px);
        color: #730e17;
      }
      .hb-btns {
        width: 100%;
        display: flex;
        justify-content: space-around;
        padding: 0 poTorem(10px);
        .btn {
          position: relative;
          text-align: center;
          img {
            width: poTorem(100px);
          }
          .btn-text {
            width: 100%;
            position: absolute;
            top: poTorem(5px);
            font-size: poTorem(16px);
            color: #fff;
          }
        }
      }
    }
  }
  .gift_pop_win {
    .open-hb {
      position: relative;
      width: 100%;
      height: 32rem;
      text-align: center;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      // margin-left: 1.2rem;
      // top: -13rem;
      .light {
        width: 100%;
        text-align: center;
        position: absolute;
        z-index: -40;
        top: 1rem;
        left: 0;
        img {
          width: 26rem;
          animation: lightMove 8s linear infinite;
        }
      }
      .openhb-img {
        // position: absolute;
        width: 20rem;
        z-index: 10;
        margin-top: 9rem;
      }

      @keyframes lightMove {
        from {
          transform-origin: center;
          transform: rotate(0deg);
        }
        to {
          transform-origin: center;
          transform: rotate(360deg);
        }
      }
      .content {
        top: 10rem;
        width: 100%;
        position: absolute;
        height: 10rem;
        z-index: 15;
        margin-top: 0.5rem;
        color: #730e17;
        p {
          font-size: 20px;
          text-align: center;
          padding-bottom: 0.2rem;
        }
        p:nth-child(1) {
          font-size: 25px;
        }
        p:nth-child(3) {
          i {
            font-style: normal;
            color: red;
          }
        }
      }
    }
  }
  .close {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    img {
      width: poTorem(30px);
    }
  }
}
</style>