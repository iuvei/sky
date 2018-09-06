<template>
  <header class="head">
    <div class="head_con">
      <div @click="router" class="left">
        <div class="icon"></div>
      </div>

      <div class="title" @click="toclickTitle">
        <i>{{title}}</i>
        <i class="trangle" v-if="clickTitle"></i>
      </div>
      <div class="switch">
        <div v-if="clickCategory" class="cate">
          <span>
            <!-- <app-count-down :time="time" :callback="countDownCallback" :click="countDownClick" ref="countDown"></app-count-down> -->
            <FootballTime></FootballTime>
          </span>
          <i @click="clickCategory"></i>
        </div>
        <!-- <div > -->
        <slot v-else name="right"></slot>
        <!-- </div> -->
      </div>
    </div>
  </header>
</template>
<script>
import debounce from 'lodash/debounce'
import { mapActions, mapState } from 'vuex'
import FootballTime from './FootballTime'
export default {
  name: 'footballHeader',
  components: { FootballTime },
  props: ['clickRouter', 'clickTitle', 'clickCategory', 'title'],
  data() {
    return {}
  },
  computed: {
    ...mapState('football', ['gameType', 'playType']),
    time() {
      return this.gameType === 0 ? 30 : 180
    }
  },
  // watch: {
  //   gameType() {
  //     this.countDownCallback();
  //   },
  //   playType() {
  //     this.countDownCallback();
  //   },
  // },
  // mounted() {
  //   // 初始化计算器
  //   this.bus.$on("countDown-init", this.countDownCallback);
  // },
  // beforeDestroy() {
  //   this.bus.$off("countDown-init", this.countDownCallback);
  // },
  methods: {
    router() {
      if (this.clickRouter) {
        this.clickRouter()
        return
      }
      this.$router.go(-1)
    },
    toclickTitle() {
      if (this.clickTitle) this.clickTitle()
    },
    countDownCallback: debounce(function() {
      let countDown = this.$refs.countDown
      if (!countDown) return
      countDown.str = countDown.time
      countDown.run()
      this.bus.$emit('countDown-click')
    }, 100)
  }
}
</script>
<style lang="scss" scoped>
@import "../../../css/resources.scss";
.head {
  width: 100%;
  position: relative;
  height: poTorem(48px);
  .head_con {
    @include between;
    background: url(~img/goucai/goucaibg.png);
    width: 100%;
    height: poTorem(48px);
    position: relative;
    top: 0;
    z-index: 1999;
    .left {
      position: relative;
      width: 20%;
      height: poTorem(48px);
    }
    .icon {
      background: url(~img/shouye/back.png) no-repeat;
      width: poTorem(60px);
      height: poTorem(20px);
      position: absolute;
      top: 30%;
      left: 30%;
      background-size: poTorem(20px) poTorem(20px);
    }
    .title {
      text-align: center;
      font-size: poTorem(16px);
      color: #fff;
      font-weight: bolder;
      @include center;
      i {
        font-size: poTorem(20px);
      }
      .trangle {
        width: 0px;
        height: 0px;
        border-bottom: solid poTorem(6px) #ffffff;
        border-right: solid poTorem(6px) #ffffff;
        border-top: solid poTorem(6px) #ff7c34;
        border-left: solid poTorem(6px) #ff7c34;
        margin-left: poTorem(5px);
      }
    }
    .switch {
      @include around;
      width: 20%;
      .cate {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      span {
        width: 3rem;
        font-size: poTorem(20px);
        padding-right: poTorem(8px);
        color: #fff;
        font-weight: bolder;
      }
      i {
        display: inline-block;
        background: url(~img/football/category.png) no-repeat;
        width: 2rem;
        height: poTorem(23px);
        background-size: poTorem(23px) poTorem(23px);
      }
    }
  }
  .head_model {
    .animated {
      animation-duration: 0.25s;
    }
    .bg {
      width: 100%;
      height: poTorem(736px);
      position: absolute;
      top: poTorem(48px);
      left: 0;
      background: #000;
      opacity: 0.5;
      z-index: 20;
    }
    .shadow {
      position: absolute;
      left: 0;
      width: 100%;
      height: poTorem(60px);
      background: #fff;
      z-index: 21;
      @include center;
      span {
        height: poTorem(35px);
        width: 30%;
        background: #fff;
        @include center;
        margin: 0 poTorem(20px);
        border-radius: poTorem(5px);
        font-size: poTorem(18px);
        color: #1e2123;
        font-weight: bold;
        border: 1px solid #d2d3d5;
      }
      .actives {
        background: #e13a39;
        color: #fff;
      }
    }
  }
}
</style>
