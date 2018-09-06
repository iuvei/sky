<template>
  <div class="head_model">
    <div class="bg" v-show="show" @click="show = !show"></div>
    <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
      <div class="shadow" v-show="show">
        <div>
          <span class="item" v-for="(item, index) in playItems" :key="index" :class="{actives: title == item.name}" @click="switchs(item)">
            {{item.name}}
          </span>
        </div>
       
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'switchPlay',
  props: ['modal_show'],
  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapState({
      curPlayItem: state => state.betting.curPlayItem,
      title: state => state.betting.switch,
      betData: state => state.betting.betData
    }),
    playItems() {
      let configs = this.$store.state.betting.playConfigs
      return configs && Array.isArray(configs) ? configs : []
    }
  },
  watch: {
    title(name){
      this.bus.$emit('changeTitle', name)
    },
    modal_show(val) {
      this.show = !!val
    },
    // 初始化玩法
    playItems(playItems){
      let curPlayItem = playItems[0] || {}
      // this.playSwitch(curPlayItem.name)
      curPlayItem = curPlayItem.submenu && curPlayItem.submenu[0] && curPlayItem.submenu[0].playlist || []
      curPlayItem = curPlayItem[0] || {}
      this.updateField({curPlayItem})
      // this.description(
      //   `<b>范例</b>：${curPlayItem.play_fanli}<br><br><b>玩法说明</b>：${
      //     curPlayItem.play_shuoming
      //   }`
      // );
    },
    // 当前玩法变化
    curPlayItem(curPlayItem){
      this.bus.$emit('changeTitle', curPlayItem.playname)
      this.playSwitch(curPlayItem.playname)
      this.description(
        `<b>范例</b>：${curPlayItem.play_fanli}<br><br><b>玩法说明</b>：${
          curPlayItem.play_shuoming
        }`
      );
    }
  },
  mounted(){
   
  },
  activated() {
    
  },
  deactivated() {
    
  },
  methods: {
    ...mapActions(['playSwitch', 'description', 'updateField']),
    // 切换双面玩法或者官方玩法
    switchs({name, submenu}) {
      this.show = !this.show
      let curPlayItem = submenu[0] && submenu[0].playlist || []
      curPlayItem = curPlayItem[0] || {}
      this.updateField({curPlayItem, ncSelected: {}})
      // this.description(
      //   `<b>范例</b>：${curPlayItem.play_fanli}<br><br><b>玩法说明</b>：${
      //     curPlayItem.play_shuoming
      //   }`
      // );
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../css/resources.scss";
.head_model {
  .animated {
    animation-duration: 0.25s;
  }
  .bg {
    width: 100%;
    height: calc(100vh - 3rem);
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
    background: #fff;
    z-index: 21;
    > div {
      line-height: 2;
      @include start;
      margin: 1rem 0;
      flex-wrap: wrap;
    }
    > div:nth-child(2) {
      justify-content: flex-start;
      flex-wrap: wrap;
      .item {
        margin: 10px 0.4rem;
        width: 21%;
      }
    }
    .item {
      width: 28%;
      background: #fff;
      @include center;
      margin-bottom: 4%;
      margin-left: 4%;
      border-radius: poTorem(5px);
      font-size: poTorem(18px);
      color: rgb(24, 23, 23);
      font-weight: bold;
      border: 1px solid #d2d3d5;
    }
    .actives {
      background: #e13a39;
      color: #fff;
      border: 1px solid #e13a39;
    }
    .active {
      color: #e13a39;
      border: 1px solid #e13a39;
    }
  }
  .sub-menu {
    margin: 0 !important;
    box-shadow: 0 14px 28px -8px #eeeeee inset;
    .row {
      width: 100%;
      @include center;
      padding: 0.5rem 0.4rem;
      margin: 10px 0;
      justify-content: flex-start;
      .left {
        width: 20%;
        @include center;
        justify-content: flex-start;
        align-items: center;
        font-size: poTorem(16px);
        color: #666;
        margin-top: poTorem(-7px);
      }
      .circle {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 5px solid #d2d2d2;
        display: block;
        margin-right: 10px;
      }
      .play-list {
        @include center;
        justify-content: flex-start;
        flex: 1;
        flex-wrap: wrap;
        .item {
          margin: 0 poTorem(4px) poTorem(10px) poTorem(4px);
          font-weight: normal;
        }
      }
    }
  }
  .time_line_wrap {
    width: 100%;
    padding: 0 1rem;
  }
  .yd-timeline-custom-item:first-child,
  .yd-timeline-item:first-child,
  .yd-timeline-item {
    margin-top: poTorem(14px);
    padding: poTorem(4px) 0;
    color: #666;
    display: flex;
    span {
      width: poTorem(60px);
      margin-top: poTorem(4px);
      flex: none;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        height: 2.1875rem;
        min-width: poTorem(86px);
        background: #fff;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 poTorem(6px);
        margin: 0 poTorem(10px) poTorem(10px) 0;
        border-radius: 0.3125rem;
        font-size: 1.125rem;
        color: #666;
        border: 1px solid #d2d3d5;
        &.active {
          color: #e13a39;
          border: 1px solid #e13a39;
        }
      }
    }
  }

  .yd-timeline-custom-item:not(:last-child):after,
  .yd-timeline-item:not(:last-child):after {
    border-bottom-style: dashed;
  }

  .yd-timeline-item:first-child:before {
    background: none;
  }

  .yd-timeline-item:first-child > .yd-timeline-icon {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 5px solid #d2d2d2;
    display: block;
    margin-right: 10px;
  }
  .yd-timeline-item .yd-timeline-icon {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 4px solid #e4e5e9;
    background: #fff;
  }
}
</style>
<style lang="scss">
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
.head_model .yd-timeline-item .yd-timeline-icon {
  width: poTorem(18px);
  height: poTorem(18px);
  border-radius: 50%;
  border: 5px solid #d2d2d2;
  display: block;
  margin-right: poTorem(10px);
  background: #fff;
  top: poTorem(12px);
}
.head_model .yd-timeline-item:first-child .yd-timeline-icon:before {
  content: "";
  display: block;
  width: 4px;
  height: 12px;
  position: absolute;
  background: #fff;
  top: -17px;
  left: 0;
}
</style>

