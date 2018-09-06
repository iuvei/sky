<template>
  <div id="app">
    <!-- 加载进度页面 -->
    <!-- 路由页面 -->
    <div class="page_content">
      <div class="routes" ref="routes">
        <transition :name="transitionName">
          <keep-alive>
            <router-view class="child-view"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
    <!-- 底部下载  -->
    <yd-flexbox class="download-pannel" v-show="showDownLoadApp && this.$route.name === 'shouYe'">
      <yd-flexbox-item>
        <yd-icon @click.native="showDownLoadApp=false" name="error" size="1.2rem" color="#ffffff" style="vertical-align: -.123rem;"></yd-icon>
        <yd-icon name="phone3" size="1.2rem" color="#ffffff" style="vertical-align: -.123rem;"></yd-icon>
        <em class="content-down"> 下载手机APP </em>
      </yd-flexbox-item>
      <div class="download-action">
        <a :href="sysLink">
          <yd-button type="danger" class="down-btn">
            立即下载
            <yd-icon name="play" size="1.2rem" color="#ffffff" style="vertical-align: -.123rem;"></yd-icon>
          </yd-button>
        </a>
      </div>
    </yd-flexbox>

    <!-- 底部导航 -->
    <yd-tabbar class="footer" active-class="bottom_tab" activeColor="#666" v-show="navBarIsShow">
      <yd-tabbar-item title="首页" link="/home" active>
        <span slot="icon" class="iconfont" :class="[pathName == 'shouYe' ? 'navbar_home_active' : 'navbar_home']"></span>
      </yd-tabbar-item>
      <yd-tabbar-item title="开奖" link="/lottery">
        <span slot="icon" class="iconfont" :class="[pathName == 'kaiJiang' ? 'navbar_kaijiang_active' : 'navbar_kaijiang']"></span>
      </yd-tabbar-item>
      <div class="add_button" @click="popupVisible=!popupVisible">
        <div class="quick">
          <div slot="icon" :class="['iconfont2', {active:popupVisible}] "></div>
        </div>
      </div>
      <yd-tabbar-item title="走势" link="/trend">
        <span slot="icon" class="iconfont" :class="[pathName == 'zouShi' ? 'navbar_trend_active' : 'navbar_trend']"></span>
      </yd-tabbar-item>
      <yd-tabbar-item title="我的" link="/member">
        <span slot="icon" class="iconfont" :class="[pathName == 'huiYuan' ? 'navbar_my_active' : 'navbar_my']"></span>
      </yd-tabbar-item>
    </yd-tabbar>
    <!-- 306 -->
    <mt-popup class="popupBox" v-model="popupVisible" position="bottom">
      <span class="quick_top">快捷方式</span>
      <div class="box">

        <yd-slider v-if="popupVisible">
          <yd-slider-item v-for="page in pages" :key="page">
            <div v-for="el in addQuicks.slice((page-1)*pageSize,page*pageSize)" :key="el.addgn" class="add_box" @click="feature_ck(el.path)">
              <div class="quick_icon" :style="`background-image:url(${el.src})`"></div>
              <span class="add_icon">{{el.text}}</span>
            </div>
            <div v-if="page==pages" class="add_box" @click="feature_ck('/quick')">
              <div class="add_img"></div>
              <span class="add_icon">添加</span>
            </div>
          </yd-slider-item>
        </yd-slider>
      </div>
    </mt-popup>
    <!-- 系统通知弹窗 -->
    <yd-popup v-model="sysState" position="center" width="80%" v-if="sysState">
      <div class="sys_message">
        <p>系统提示</p>
        <p class="sys_content" v-html="sysContent"></p>
        <p>
          <button @click="$store.commit('SET_SYSSTATE', false)">我知道了</button>
          <button @click="$store.commit('SET_SYSSTATE', false)">不再提示</button>
        </p>
      </div>
    </yd-popup>
    <img v-if="false" class="first_guide" src="./img/shouye/first_guide.png" @click="closeGuideImg">
  </div>
</template>
<script>
import shouYe from "./views/shouYe";
import decodeFunc from "./views/shouYe/decode.js";
import quick from "./views/quick";
import huiyuanCenter from "./views/huiYuan";
import zouShi from "./views/zouShi";
import kaiJiang from "./views/kaiJiang";
import loader from "./views/public/loader";
import { mapActions, mapState } from "vuex";
import { Popup } from "vue-ydui/dist/lib.rem/popup";

// 兼容 dom.closest
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
      i,
      el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {}
    } while (i < 0 && (el = el.parentElement));
    return el;
  };
}

export default {
  name: "app",
  data() {
    return {
      pageSize: 8,
      showDownLoadApp: true,
      popupVisible: false,
      transitionName: "slide-left",
      routeList: ["shouYe", "quick", "gouCai", "kaiJiang", "zouShi", "huiYuan"],
      inIndex: 0,
      outIndex: 0,
      pathName: "shouYe",
      touchIndex: true,
      active: "首页",
      navBarIsShow: true,
      nextBtnIsShow: false,
      show1: false,
      onlineSysMes: "",
      offlineSysMes: "",
      offlineIsShow: false,
      onlineIsShow: false
    };
  },
  mixins: [decodeFunc],
  computed: {
    ...mapState("quick", {
      addQuicks(state) {
        let addQuicks = Object.assign([], state.addQuicks);
        let flag = addQuicks.some((el, index) => {
          if (el.addgn === "gnl-10") {
            addQuicks[index].path = this.sysinfo.service_url;
            return true;
          }
        });
        flag && this.modifyField({ addQuicks });
        return state.addQuicks;
      }
    }),
    pages() {
      let pages = Math.ceil((this.addQuicks.length + 1) / this.pageSize);
      return pages;
    },
    ...mapState({
      sysinfo: state => state.sysinfo,
      sysState: state => state.sysState,
      sysContent: state => state.sysContent,
      guideIsshow: state => state.guideIsshow,
      touchSound: state => state.member.touchSound,
      isLogin: state => state.userinfo.isLogin
    }),
    sysLink() {
      let userAgent = navigator.userAgent;
      if (userAgent.indexOf("Android") != -1) {
        return this.$store.state.sysinfo.android_link || this.$store.state.sysinfo.android_h5;
      } else {
        return this.$store.state.sysinfo.ios_link || this.$store.state.sysinfo.ios_h5;
      }
    }
  },
  components: {
    shouYe,
    quick,
    huiyuanCenter,
    zouShi,
    kaiJiang,
    loader
  },
  mounted() {
    this.scrollStop();

    const doc = window.document,
      body = doc.body;
    let canFullScreen =
      doc.requestFullscreen ||
      doc.webkitFullscreenEnabled ||
      doc.fullscreenEnable;
    if (canFullScreen) {
      body.webkitRequestFullScreen && body.webkitRequestFullScreen();
    }
    if (body.requestFullscreen) {
      body.requestFullscreen();
    }
    setTimeout(function() {
      window.scrollTo(0, 1);
    }, 100);
  },
  watch: {
    $route: "path"
  },
  created: function() {
    if (location.href.includes("/home?vip=")) {
      const vipCode = location.search.split("=")[1];
      window.localStorage.setItem("VipCode", vipCode);
      this.$router.replace({
        name: "shouYe",
        params: {
          vip: vipCode
        }
      });
    } else {
      this.userAutoLogin();
      this.$router.replace("/home");
    }
    let myAudio = document.getElementById("my_audio");
    document.addEventListener(
      "touchstart",
      e => {
        if (this.touchSound) {
          myAudio.play();
        }
      },
      false
    );
  },
  methods: {
    closeGuideImg() {
      this.$store.commit("SET_GUIDE_STATE", false);
      localStorage.setItem("guide", this.guideIsshow);
    },
    ...mapActions("quick", ["modifyField"]),
    ...mapActions(["flushPrice", "encodeLogin", "clearCart"]),
    getOfflineSysMes() {
      this.$ajax("request", {
        ac: "getNoticeAppForOffline"
      }).then(res => {
        if (res && Array.isArray(res) && res.length) {
          let a = res == 0 ? 0 : res[0].content;
          var temp = document.createElement("div");
          temp.innerHTML = this.decodeEvent(res[0].content);
          var output = temp.innerText || temp.textContent;
          temp = null;
          this.$store.commit("SET_SYSCONTENT", output);
        }
      });
    },
    getOnlineSysMes() {
      this.$ajax("request", {
        ac: "getNoticeAppForOnline",
        uid: this.$store.state.userinfo.accountInfo.uid,
        token: this.$store.state.userinfo.accountInfo.token,
        sessionkey: this.$store.state.userinfo.accountInfo.sessionkey
      }).then(res => {
        if (res && Array.isArray(res) && res.length) {
          var temp = document.createElement("div");
          temp.innerHTML = this.decodeEvent(res[0].content);
          var output = temp.innerText || temp.textContent;
          temp = null;
          this.$store.commit("SET_SYSCONTENT", output);
        }
      });
    },
    feature_ck(path) {
      if (
        typeof path === "string" &&
        (path.includes("https://") || path.includes("http://"))
      ) {
        window.location.href = path;
        return;
      }
      this.popupVisible = false;
      this.$router.push(path);
    },
    /**
     * 打开model
     */
    closeModel: function() {
      this.show = true;
    },

    /**
     * 关闭model
     */
    showModel: function() {
      this.show = !this.show;
    },

    /**
     * 页面切换方法
     */
    swipeHandler(evt) {
      if (evt.direction == "Right" && this.touchIndex) {
        if (this.inIndex - 1 < 0) {
          return;
        } else {
          this.$router.push({
            name: `${this.routeList[this.inIndex - 1]}`
          });
        }
      } else if (evt.direction == "Left" && this.touchIndex) {
        if (this.inIndex + 1 > 4) {
          return;
        } else {
          this.$router.push({
            name: `${this.routeList[this.inIndex + 1]}`
          });
        }
      }
    },
    /**判断滚动条是否停止 */
    scrollStop() {
      /**
       * Created by sky on 2017/4/6 0006.
       */
      var startx, starty;
      //获得角度
      function getAngle(angx, angy) {
        return Math.atan2(angy, angx) * 180 / Math.PI;
      }

      //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
      function getDirection(startx, starty, endx, endy) {
        var angx = endx - startx;
        var angy = endy - starty;
        var result = 0;

        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
          return result;
        }

        var angle = getAngle(angx, angy);
        if (angle >= -135 && angle <= -45) {
          result = 1;
        } else if (angle > 45 && angle < 135) {
          result = 2;
        } else if (
          (angle >= 135 && angle <= 180) ||
          (angle >= -180 && angle < -135)
        ) {
          result = 3;
        } else if (angle >= -45 && angle <= 45) {
          result = 4;
        }

        return result;
      }
      //手指接触屏幕
      document.addEventListener(
        "touchstart",
        this._preventDefault,
        // { passive: false },
        function(e) {
          console.log("touchstart");
          startx = e.touches[0].pageX;
          starty = e.touches[0].pageY;
        },
        false
      );
      //手指离开屏幕
      let _this = this;
      document.addEventListener(
        "touchend",
        this._preventDefault,
        // { passive: false },
        function(e) {
          console.log("touchend");
          var endx, endy;
          endx = e.changedTouches[0].pageX;
          endy = e.changedTouches[0].pageY;
          var direction = getDirection(startx, starty, endx, endy);
          switch (direction) {
            case 0:
              // _this.touchIndex = true;
              // console.log("未滑动！");
              break;
            case 1:
              _this.touchIndex = false;
              setTimeout(() => {
                _this.touchIndex = true;
              }, 300);
              // console.log("向上", _this.touchIndex);
              break;
            case 2:
              _this.touchIndex = false;
              setTimeout(() => {
                _this.touchIndex = true;
              }, 300);
              // console.log("向下", _this.touchIndex);
              break;
            case 3:
              // _this.touchIndex = true;
              // console.log("向左！");
              break;
            case 4:
              // _this.touchIndex = true;
              // console.log("向右！");
              break;
            default:
          }
        },
        false
      );
    },
    // stopevent() {
    //   /**阻止浏览器滑动默认事件 */
    //   let xStart, xEnd, yStart, yEnd;
    //   document.addEventListener(
    //     "touchmove",
    //     this._preventDefault,
    //     // { passive: false },
    //     function(evt) {
    //       xEnd = evt.touches[0].pageX;
    //       yEnd = evt.touches[0].pageY;
    //       Math.abs(xStart - xEnd) > Math.abs(yStart - yEnd) &&
    //         evt.preventDefault();
    //     },
    //     false
    //   );
    //   document.addEventListener(
    //     "touchstart",
    //     this._preventDefault,
    //     // { passive: false },
    //     function(evt) {
    //       xStart = evt.touches[0].pageX;
    //       yStart = evt.touches[0].pageY;
    //     },
    //     false
    //   );
    // },
    /**@description 路由加载方法 */
    path(to, from) {
      // 加入判断首页引导图是否需要消失
      if (from.name == "shouYe" && this.guideIsshow) {
        this.$store.commit("SET_GUIDE_STATE", false);
      }
      const pathArr = ["ssc", "k3", "pk10", "3d", "lhc", "11x5", "pcdd"];
      if (pathArr.includes(from.name) && to.name != "shopCart") {
        this.clearCart();
      }
      this.popupVisible = false;
      const list = this.routeList; // 将需要切换效果的路由名称组成一个数组
      const toName = to.name; // 即将进入的路由名字
      const fromName = from.name; // 即将离开的路由名字
      this.inIndex = list.indexOf(toName); // 进入下标
      this.outIndex = list.indexOf(fromName); // 离开下标

      const isVivoBrowser = window.navigator.userAgent
        .toLowerCase()
        .includes("vivobrowser");

      if (!isVivoBrowser) {
        this.transitionName =
          this.inIndex < this.outIndex ? "slide-left" : "slide-right";
        if (to.name === "shopCar") {
          this.transitionName = "slide-left";
        }
        if (to.name === "shouYe") {
          document.title = this.sysinfo.web_title;
          this.transitionName = "slide-right";
          if (this.isLogin) this.flushPrice();
        }
        if (to.name === "huiYuan") {
          if (this.isLogin) this.flushPrice();
        }
      } else {
        this.transitionName = "";
      }

      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      this.pathName = to.name;

      let arrList = ["shouYe", "zouShi", "kaiJiang", "huiYuan"];
      this.disableToLogin(to, from);
      this.navBarIsShow = arrList.includes(to.name);
    },
    /**用户自动登录 */
    userAutoLogin() {
      /**前端控制是否登录超时 10分钟 */
      let isAutoLogin =
        new Date().getTime() - localStorage.getItem("expire") < 1800000;
      console.log("是否自动登录", isAutoLogin);
      if (localStorage.getItem("autoToken") && isAutoLogin) {
        // if (localStorage.getItem("autoToken") && true) {
        this.encodeLogin().then(res => {
          if (res && !Array.isArray(res)) this.getOnlineSysMes();
        });
      } else {
        // this.$dialog.alert({mes: '登录超时，请重新登录'})
        this.getOfflineSysMes();
        //localStorage.clear();
      }
    },
    //登陆后到首页，点击返回不允许跳回登陆页
    disableToLogin(to, from) {
      if (to.name === "login" && this.$store.state.userinfo.isLogin) {
        this.$router.replace("/home");
      }
    }
  }
};
</script>

<style lang="scss">
@import "./css/common.scss";
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
.mint-popup {
  position: absolute;
}
#app {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  -webkit-overflow-scrolling: touch; // safari惯性滑动
  .first_guide {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 100001;
  }
}
// #app .yd-input a,
#app .yd-input span {
  display: none;
}
.page_content {
  position: relative;
  // height: 100%;
  // flex-grow: 1;
  flex: 1;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
}
.download-pannel {
  position: absolute;
  bottom: 3.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: poTorem(57px);
  padding: 10px;
  font-size: 0.8rem;
  color: #ffffff;
  z-index: 102;
  .yd-btn {
    height: 1.6rem;
    font-size: 0.75rem;
  }
  .down-btn {
    background-color: #f57606;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    height: 1.8rem;
    line-height: 1.8rem;
  }
  .content-down {
    font-size: 1rem;
  }
}
.footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: poTorem(57px) !important;
  background: #f3f3f3 !important;
  //   position: fixed;
  z-index: 10000 !important;
  .iconfont {
    font-size: poTorem(29px);
    width: poTorem(29px);
    height: poTorem(29px);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-size: contain !important;

    i {
      font-size: 14px;
    }
  }
  .navbar_home {
    background: url(./img/shouye/home2.png);
  }
  .navbar_home_active {
    background: url(./img/shouye/home.png);
  }

  .navbar_buy {
    background: url(./img/shouye/buy.png);
  }
  .navbar_buy_active {
    background: url(./img/shouye/buy2.png);
  }

  .navbar_quick {
    background: url(./img/shouye/quick.png);
    background-size: contain !important;
  }
  .navbar_quick_active {
    background: url(./img/shouye/quick2.png);
    background-size: contain !important;
  }
  // 插件
  .add_button {
    width: poTorem(93px);
    height: poTorem(50px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: -2rem;
    .quick {
      width: poTorem(48px);
      height: poTorem(48px);
      border-radius: 50%;
      border: poTorem(1px) solid #a6a6a6;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: #fff;
      z-index: 10000 !important;
      .img {
        width: poTorem(16px);
        height: poTorem(16px);
        background: url(./img/shouye/quick2.png);
        background-size: contain;
      }

      .iconfont2 {
        width: poTorem(20px);
        height: poTorem(20px);
        background: url(./img/shouye/quick.png);
        background-size: contain;
      }
      // 旋转45
      .iconfont2.active {
        transition: 0.1s;
        transform: rotate(45deg);
        -o-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
      }
    }
  }

  .navbar_kaijiang {
    background: url(./img/shouye/kaijiang.png);
  }
  .navbar_kaijiang_active {
    background: url(./img/shouye/kaijiang2.png);
  }
  .navbar_my {
    background: url(./img/shouye/my.png);
  }
  .navbar_my_active {
    background: url(./img/shouye/my2.png);
  }
  .navbar_trend {
    background: url(./img/shouye/trend.png);
  }
  .navbar_trend_active {
    background: url(./img/shouye/trend2.png);
  }
  .yd-tabbar-icon {
    width: poTorem(29px);
    height: poTorem(29px);
    display: flex;
    justify-content: center;
  }
  .yd-tabbar-txt {
    font-size: poTorem(14px);
  }
  .bottom_tab {
    span {
      color: #fd7d34;
    }
  }
}

.popupBox {
  width: poTorem(335px);
  height: poTorem(285px);
  background: #fff;
  margin-bottom: poTorem(70px);
  border-radius: 2%;
  .quick_top {
    display: flex;
    height: poTorem(55px);
    justify-content: center;
    align-items: center;
    font-size: poTorem(18px);
    color: #414141;
    margin: 0 poTorem(20px);
    border-bottom: 1px dashed #bfbfbf;
  }
  .box {
    display: flex;
    align-content: space-around;
    flex-wrap: wrap;
    width: poTorem(333px);
    height: poTorem(224px);
    .yd-slider-item {
      display: flex;
      flex-wrap: wrap;
    }
    .add_box {
      width: 25%;
      // height: poTorem(80px);
      display: inline-flex;
      order: 100000;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-top: 1rem;
      .quick_icon {
        width: 4rem;
        height: 4rem;
        display: table;
        border-radius: 50%;
        box-shadow: 0 0 0.9375rem #ededed;
        background-size: 50%;
        background-repeat: no-repeat;
        background-position: 50%;
      }
      .add_img {
        width: 4rem;
        height: 4rem;
        display: table;
        background: url(./img/shouye/add.png);
        background-size: contain;
        background-repeat: no-repeat;
      }
      .add_icon {
        color: #454545;
        margin-top: poTorem(5px);
        font-size: poTorem(14px);
        line-height: poTorem(22px);
      }
    }
  }
}
.sys_message {
  padding-top: poTorem(10px);
  background-color: #fff;
  > p {
    font-size: poTorem(16px);
    text-align: center;
    &:first-child {
      padding-left: poTorem(20px);
      color: #ff7c34;
      text-align: left;
    }

    &:last-child {
      @include around;
      button {
        line-height: poTorem(50px);
        width: 50%;
        outline: none;
        border: none;
        color: #535353;
        &:last-child {
          color: #e33939;
          border-left: poTorem(1px) solid #eee;
        }
      }
    }
  }
  .sys_content {
    height: 20rem;
    overflow: scroll;
    padding: poTorem(20px);
    font-size: poTorem(18px);
    border-bottom: poTorem(1px) solid #eee;
    p {
      color: #535353;
    }
  }
}
.yd-popup-center {
	top: 40%!important;
  background-color: #fff;
}
.yd-tab-nav-scoll {
  white-space: nowrap;
  .yd-tab-nav {
    width: 100% !important;
  }
}
.child-view {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  transition: all 0.25s ease-in-out;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 9;
}
.routes {
  height: 100%;
}
.slide-left-enter,
.slide-right-leave-active {
  transform: translate(100%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  transform: translate(-100%, 0);
}
</style>

