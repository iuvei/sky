<template>
  <div class="modle" @click="triggerClose" v-if="player">
    <yd-popup v-model="show" position="center" width="90%">
      <div class="modle_title">
        <span>{{modelTitle}}</span>
        <i class="icon" @click.native="triggerClose"></i>
      </div>
      <div class="time_line_box">
        <yd-timeline class="time_line_wrap">
          <yd-timeline-item v-for="(item,index) in player.submenu" :key="index">
            <span>{{item.name}}</span>
            <ul>
              <li @click="clickMenu(items,'',index,indexs,item)" v-for="(items,indexs) in item.playlist" :key="indexs" :class="{active: curMenu && items.menuid === curMenu.menuid }">{{items.playname}}</li>
            </ul>
          </yd-timeline-item>
        </yd-timeline>
      </div>
    </yd-popup>
  </div>
</template>

<script>
export default {
  name: 'betting_modal',
  props: ['player', 'show'],
  methods: {
    // 点击菜单
    clickMenu(menu, show, parentIndex, index, parentItem) {
      this.$emit('clickMenu', menu, show, parentIndex, index, parentItem)
    },
    triggerClose() {
      this.$emit('close')
    }
  },
  computed: {
    modelTitle() {
      return this.player ? this.player.name : ''
    },
    curMenu() {
      if (this.player) {
        return this.player.submenu[0].playlist[0]
      }
      return null
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../../css/resources.scss";
// 弹窗
.modle {
  .modle_title {
    @include center;
    width: 100%;
    color: #535353;
    height: poTorem(50px);
    border-bottom: (1px) dashed #dbdbdb;
    font-size: poTorem(20px);
    position: relative;
  }
  .icon {
    position: absolute;
    right: poTorem(10px);
    background: url(~img/goucai/close.png) no-repeat;
    background-size: contain;
    width: poTorem(18px);
    height: poTorem(18px);
  }
  .time_line_box {
    .time_line_wrap {
      .active {
        color: #eb384d;
        border-color: #eb384d;
      }
    }
  }
}
</style>
