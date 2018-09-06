<template>
  <div class="header_main_body">
    <div class="heads">
      <div>
        <router-link to="/login" v-show="!isLogin">
          <span class="denglu">登录</span>
        </router-link>
        <div v-show="isLogin">

          <img src="../../../img/shouye/jump_gift.png" alt="" v-if="userFlag.redGift && test!=2" class="rubberBand gift animated" @click="getGifts">
          <img class="gift" src="../../../img/shouye/personal_msg.png" alt="" @click="$router.push('/moreService/personalMessage')" v-if="!userFlag.redGift || test==2">
          <i :class="{'flag_mark':userFlag.message}" v-if="!userFlag.redGift && userFlag.message && test!=2"></i>
        </div>

      </div>
      <!-- <p v-show="isLogin"></p> -->
      <div class="phone_logo">
        <img :src="phoneLogo">
      </div>
      <div @click="shouyeRoutes">
        <span v-show="isLogin" style="font-size:1rem">¥:</span>
        <span :class="[{account_balance:isLogin}, 'zhuce']">{{isLogin? userBalance:'注册'}}</span>
        <span v-show="isLogin" style="font-size:1rem">元</span>
      </div>
    </div>
    <yd-popup v-model="isShow" position="center" width="90%" class="gift_pop_win">
      <div class="main_content">
        <p>
          <span>{{giftTitle}}</span>
          <span>获得
            <i style="color: #e53f3f;font-size: 1.5rem;">{{giftMoney}}</i> 元现金红包</span>
          <span>请注意查收!</span>
        </p>
        <p>
          <button @click="isShow=false">确定</button>
        </p>
      </div>
      <!-- <div>
        <img src="../../../img/shouye/close.png" alt="" @click="isShow=false">
      </div> -->
    </yd-popup>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      isShow: false,
      giftMoney: 0,
      giftTitle: ''
    }
  },
  created() {},
  computed: {
    ...mapState({
      isLogin: state => state.userinfo.isLogin,
      userBalance: state => state.userinfo.accountInfo.price,
      phoneLogo: state => state.sysinfo.phone_logo,
      test: state => state.userinfo.accountInfo.test
    }),
    ...mapState(['userFlag'])
  },
  watch: {
    isLogin(n, o) {
      //  if(n) this.userBalance = this.$store.state.userinfo.accountInfo.price
    }
  },
  methods: {
    ...mapActions(['flushPrice']),
    shouyeRoutes() {
      if (!this.isLogin) this.$router.push('registe')
      // this.$router.push("member");
    },
    getGifts() {
      this.isShow = true
      this.$dialog.loading.open(' ')
      this.$ajax('request', {
        ac: 'UserGetEventAward'
      }).then(res => {
        this.$dialog.loading.close()
        this.giftMoney = res.price
        this.giftTitle = res.title
        // this.$dialog.loading.open("正在刷新");
        // this.$ajax("request", {
        //   ac: "flushPrice"
        // })
        //   .then(res => {
        //     this.$store.commit("SET_BALANCE", res.price);
        //     // this.$dialog.loading.open("刷新成功");
        //     this.isShow = true;
        //   })
        //   .finally(() => {
        //     setTimeout(() => {
        //       this.$dialog.loading.close();
        //     }, 500);
        //   });
        this.flushPrice()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
.header_main_body {
  position: relative;
  height: 3rem;
  background: url(../../../img/phone_header.png) CENTER TOP;
  width: 100%;
  // position: fixed;
  // top: 0;
  // left: 0;
  // z-index: 1000000;
}
.heads {
  display: flex;
  width: 100%;
  height: poTorem(48px) !important;
  justify-content: center;
  align-items: center;
  position: relative;
  // top: 0;
  // left: 0;
  // z-index: 800;
  // background: url(../../../img/phone_header.png) CENTER TOP;
  > div {
    &:first-child {
      // width: 50%;
      // float:left;
      position: absolute;
      top: 50%;
      left: poTorem(10px);
      transform: translateY(-50%);
    }
    &:nth-child(2) {
      width: 100%;
      height: 100%;
      img {
        height: 100%;
        padding-right: 1rem;
      }
    }
    &:last-child {
      // width: 50%;
      // float:right;
      position: absolute;
      top: 50%;
      right: poTorem(10px);
      transform: translateY(-50%);
    }
    text-align: center;
  }
  .flag_mark {
    position: relative;
    right: poTorem(9px);
    top: poTorem(-12px);
    display: inline-block;
    height: poTorem(10px);
    width: poTorem(10px);
    border: poTorem(5px) solid #f00;
    border-radius: poTorem(5px);
  }
  // img {
  //   width: poTorem(218px);
  //   display: flex;
  //   height: poTorem(48px);
  //   justify-content: center;
  // }
  .gift {
    width: poTorem(25px);
    height: poTorem(25px);
    animation-iteration-count: infinite;
  }
  span {
    width: poTorem(60px);
    text-align: center;
    line-height: poTorem(48px);
    color: #fff;
    font-size: 1.4rem;
    font-weight: bold;
  }
  p {
    width: poTorem(60px);
  }
  .zhuce,
  .denglu {
    font-size: 1.25rem;
  }
  .account_balance {
    color: #f1fa51;
    font-size: 1rem;
  }
}
.gift_pop_win {
  .main_content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0 1rem 0;
    p {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      span {
        color: #000;
        &:first-child {
          font-size: poTorem(20px);
        }
        &:nth-child(n + 2) {
          font-size: 1rem;
        }
      }
      button {
        width: poTorem(120px);
        height: poTorem(35px);
        border-radius: poTorem(5px);
        font-size: poTorem(14px);
        color: #ff0737;
        background-color: #fff;
        text-align: center;
        line-height: poTorem(35px);
      }
    }
  }
}
</style>
