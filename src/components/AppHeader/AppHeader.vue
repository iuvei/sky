<template>
  <header class="head">
    <div class="head_con" :style="bgImg">
      <div @click="router" class="left">
        <div class="icon"></div>
      </div>

      <div class="title" @click="toclickTitle">
        <i>{{title}}</i>
        <i class="trangle" v-if="clickTitle"></i>
      </div>
      <div class="switch" @click="toclickCategory">
        <slot name="right">
          <i v-show="typeof clickCategory === 'function'"></i>
        </slot>
      </div>
    </div>
  </header>
</template>
<script>
import jss from "./jss";
export default {
  name: "AppHeader",
  props: ["clickRouter", "clickTitle", "clickCategory", "title", "type"],

  data() {
    return {};
  },
  computed: {
    bgImg() {
      return jss.bgImg(this.type);
    },
  },
  methods: {
    router() {
      if (this.clickRouter) {
        this.clickRouter();
        return;
      }
      this.$router.go(-1);
    },
    toclickTitle() {
      if (this.clickTitle) this.clickTitle();
    },
    toclickCategory() {
      if (this.clickCategory) this.clickCategory();
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "../../css/resources.scss";
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
      width: 60%;
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
        margin-top: poTorem(5px);
      }
    }
    .switch {
      @include around;
      width: 20%;
      i {
        display: inline-block;
        background: url(~img/football/category.png);
        width: poTorem(23px);
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
