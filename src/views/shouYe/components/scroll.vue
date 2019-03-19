<template>
  <div class="scroll">
    <!--横向文字滚动-->
    <div class="box_scroll">
      <div class="notice_icon">
        <img src="../../../img/shouye/notice.png"
             alt="">
      </div>
      <div id="marquee_str"
           ref="marquee_str"
           v-show="sysNotice.length">
        <ul @click="toNotice">
          <!-- <li
            v-for="(item, index) in sysNotice"
            :key="index"
          >
            <div style="display:inline-block">{{decodeEvent(item.content)}}</div>
          </li> -->
          <li v-for="(item, index) in sysNotice"
              :key="index"
              style="margin-left:22.375rem;font-size:1rem" v-html="decodeEvent(item.content)"></li>
          <!-- <li></li> -->
          <li id="scroll_end"
              ref="scroll_end"></li>
        </ul>
      </div>
      <div v-show="!sysNotice.length"
           class="no_content">
        <ul>
          <li>暂无公告</li>
        </ul>
      </div>
      <div class="notice_more iconfont icon-icon"></div>
    </div>
    <!--导航标题-->
    <div class="main_menu">
      <div class="main_menu_item"
           @click="$router.push('/moreService/Nrecharge')">
        <div class="_menu_icon">
          <div class="phone_all_icon">
            <img :src="require(`../../../img/${imgUrl}/recharge.png`)"
                 alt="">
          </div>
        </div>
        <div class="title">在线充值</div>
      </div>
      <div class="main_menu_item"
           @click="$router.push('/moreService/NgetCash')">
        <div class="_menu_icon">
          <div class="phone_all_icon">
            <img :src="require(`../../../img/${imgUrl}/get_cash.png`)"
                 alt="">
          </div>
        </div>
        <div class="title">在线提现</div>
      </div>
      <div class="main_menu_item">
        <router-link to="/promotion">
          <div class="_menu_icon">
            <div class="phone_all_icon">
              <!-- <img v-if="userFlag.redGift" src="../../../img/shouye/sales_red_dot.png" alt=""> -->
              <img :src="require(`../../../img/${imgUrl}/sales.png`)" alt="">
            </div>
          </div>
          <div class="title">优惠活动</div>
        </router-link>
      </div>
      <div class="main_menu_item"
           @click="openbigwin(sysinfo.service_url)">
        <div class="_menu_icon">
          <div class="phone_all_icon">
            <img :src="require(`../../../img/${imgUrl}/online_service.png`)"
                 alt="">
          </div>
        </div>
        <div class="title">在线客服</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import decodeEvent from "../decode";
export default {
  data() {
    return {
      sysNotice: []
    };
  },
  mixins: [decodeEvent],
  computed: {
    ...mapState(["userFlag", "sysinfo", 'isfestival']),
    imgUrl() {
      return this.isfestival ? 'theme' : 'shouye'
    }
  },
  mounted() {
    this.getNotice();
    this.Marquee();
  },
  methods: {
    ...mapActions(["getServiceUrl"]),
    /** 文字横向滚动 */
    Marquee() {
      const _this = this;
      const marquee_str = _this.$refs.marquee_str;
      const scroll_end = _this.$refs.scroll_end;
      // const test = 5;
      function Marquees() {
        if (scroll_end && marquee_str) {
          if (
            scroll_end &&
            scroll_end.offsetLeft - marquee_str.scrollLeft < 0
          ) {
            marquee_str.scrollLeft -= scroll_end.offsetLeft;
          } else {
            marquee_str.scrollLeft += 1;
            // console.log(test+=0.5)
          }
        }
      }
      setInterval(Marquees, 25);
    },
    /** 打开客服窗口 */
    async openbigwin() {
      const url = await this.getServiceUrl();
      window.location.href = url;
    },
    getNotice() {
      this.$ajax("request", {
        ac: "getSystemNotice",
        type: 0,
        ispage: 0
      }).then(res => {
        res.length && (this.sysNotice = res);
      });
    },
    toNotice() {
      this.$router.push({
        name: "xitonggonggao",
        params: {
          message: this.sysNotice
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.scroll {
  background-color: #fff;
}
.main_menu {
  width: 100%;
  height: poTorem(65px);
  display: flex;
  > div {
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    border-left: solid 1px #f3f3f3;
    ._menu_icon {
      height: poTorem(40px);
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .phone_all_icon {
        display: inline-block;
        margin-top: poTorem(2px);
        width: 40px;
        height: 40px;
        @include center;
        font-size: poTorem(36px);
        color: #a1a1a1;
        img {
          width: poTorem(34px);
          height: poTorem(34px);
        }
      }
    }
    .title {
      padding-bottom: poTorem(5px);
      color: #9c9c9c;
      font-size: 0.875rem;
      text-align: center;
    }
  }
}
.box_scroll {
  border-top: solid 1px #f3f3f3;
  border-bottom: solid 1px #f3f3f3;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  #scroll_end {
    display: inline;
  }
  #marquee_str {
    font-size: 0.75rem;
    width: 100%;
    height: poTorem(30px);
    line-height: poTorem(30px);
    text-align: center;
    font-family: "Microsoft Yahei";
    overflow: hidden;
    display: flex;
    position: relative;
    ul {
      display: flex;
      position: absolute;
      height: 1.87rem;
      width: 10000000000rem;
      overflow: hidden;
    }
  }
  .no_content {
    flex: 1;
    ul {
      li {
        text-align: center;
        font-size: 1rem;
        font-weight: 500;
      }
    }
  }
  .notice_icon {
    font-size: poTorem(20px);
    @include center;
    // padding: 0 poTorem(5px);
    color: #666;
    height: 2.6875rem;
    img {
      width: poTorem(12px);
      height: poTorem(12px);
    }
  }
  .notice_more {
    width: poTorem(24px);
    height: poTorem(30px);
    @include center;
    font-size: poTorem(18px);
    color: #666;
  }
}
</style>
