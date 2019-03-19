<template>
  <div class="home">
    <!-- 加载进度页面 -->
    <loader></loader>
    <!--首页头部-->
    <heads></heads>

    <div class="other-block">
      <!--轮播图-->
      <div class="swipe">
        <yd-slider autoplay="3000">
          <yd-slider-item v-for="(item, index) in slideImg" :key="index">
            <img :src="item.banner" @click="$router.push('/promotion')">
          </yd-slider-item>
        </yd-slider>
      </div>
      <!--横向滚动文字-->
      <scroll></scroll>
      <!-- 聊天室入口 -->
      <chatRoom v-show="showChatRoom"></chatRoom>
      <!-- <chatRoom v-show="true"></chatRoom> -->

      <!-- <button @click="$router.push({name: 'jingcai_key'})">竞彩</button> -->

      <!-- 插入购彩页面 -->
      <buyLottery></buyLottery>
      <!--纵向文字滚动-->
      <!-- <newScroll v-show="number"></newScroll> -->
      <newScroll></newScroll>
    </div>

    <!-- 游客试玩提示框 -->
    <welcomeGuest :show="guest" @closeWelcPop="guest=false"></welcomeGuest>

    <!-- 抢红包 -->
    <div class="grabhongbao" @click="$router.push('/grabhb')" v-if="sysinfo.event_gift*1 == 1" v-drag>
      <img src="../../img/grabhongbao/grabhongbao.png" alt="">
    </div>
  </div>
</template>

<script>
import config from '~/config'
import { mapGetters, mapActions, mapState } from 'vuex'
import heads from './components/header'
import scroll from './components/scroll'
import chatRoomComponent from './components/chatRoom'
import welcomeGuest from './components/welcomeGuest'
import newScroll from './components/newScroll'
import loader from '../public/loader'
import buyLottery from '../gouCai/index'
export default {
  data: () => ({
    a: 0,
    config,
    number: false,
    guest: false,
    slideImg: [
      { banner: require('../../img/shouye/default_banner.jpg') },
      { banner: require('../../img/shouye/default_banner.jpg') }
    ]
  }),
  components: {
    chatRoom: chatRoomComponent,
    heads,
    scroll,
    newScroll,
    loader,
    buyLottery,
    welcomeGuest
  },
  computed: {
    ...mapState(['loader', 'sysinfo', 'userinfo', 'chatRoom']),
    ...mapGetters({
      product: 'cartProducts'
    }),
    showChatRoom() {
      return this.sysinfo.talking_on * 1
      // if (this.sysinfo.talking_on == 0) {
      //   return false;
      // }
      // // return ;
      // if (this.userinfo.isLogin) {
      //   return this.chatRoom.loginIsShow;
      // }
      // return this.chatRoom.unLoginIsSHow;
    }
  },
  methods: {
    ...mapActions(['reqLoader'])
  },
  watch: {
    loader: {
      /** 判断进度条显示路由 */
      handler(val) {
        val.percent === 1 &&
          setTimeout(() => {
            this.number = true
          }, 1000)
      },
      deep: true
    }
  },
  created() {
    this.reqLoader([
      'getSysinfo',
      'getGameList',
      'getGamePlayConfigs',
      'getUnloginOdds'
    ])
  },
  beforeRouteEnter(t, f, n) {
    n(vm => {
      if (vm.$route.query.user === 'guest') {
        vm.$nextTick(() => {
          vm.guest = true
        })
      }
    })
  },
  mounted() {
    this.number = this.$router.currentRoute.query.stage

    this.$ajax('request', {
      ac: 'getSystemBanner'
    }).then(res => {
      if (
        Array.isArray(res) &&
        res.length &&
        res[0].banner.indexOf('http') !== -1
      ) {
        this.slideImg = res
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
.home {
  .other-block {
    flex: 1;
    overflow: auto;
  }
  .swipe {
    width: 100%;
    height: poTorem(151px);
    img {
      width: 100%;
      height: poTorem(151px);
    }
  }
  .main_menu {
    width: 100%;
    height: poTorem(65px);
  }
  .grabhongbao {
    position: fixed;
    // bottom: 15%;
    // right: 3%;
    top: 70%;
    left: 80%;
    z-index: 100;
    img {
      width: poTorem(80px);
    }
  }
}
</style>

