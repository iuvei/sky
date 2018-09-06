<template>
  <div class="shouye_lottery_content">
    <ul>
      <li v-for="(item,index) in datas" :key="index" @click="toBuyLottery(item, index)">
        <div class="icon">
          <img :class="{'active': index == val, 'lottery_disable': item.enable==2}" :src="item.icon" alt="">
          <img class="delete_betting" src="../../../img/goucai/delete.png" alt="" v-if="index==val">
        </div>
        <div :class="[{'add_betting': item.game_name == '添加彩种'}, 'contents']">{{item.game_name}}</div>
        <div class="text" v-if="item.game_id != 'add'">{{item.tip}}</div>
      </li>
      <li v-if="indexFlag == 1" @click="$router.push('./betting')">
        <div class="icon">
          <img class="iconfont" src="../../../img/shouye/more_lottery.png">
        </div>
        <span class="contents">更多</span>
        <span class="text">更多彩种分类</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import daojishi from '../../plugin/daojishi'
export default {
  name: 'LotteryContent',
  props: ['indexFlag', 'datas'],
  data() {
    return {
      data: [],
      flag: '',
      timer: Function,
      val: -1,
      throwAway: -1,
      loadedCount: 0
    }
  },
  mounted() {
    this.flag = this.indexFlag
    this.data = this.datas
  },
  components: {
    daojishi
  },
  watch: {
    indexFlag: function(val) {
      this.flag = val
    },
    datas: function(val) {
      this.data = val
    }
  },
  computed: {
    ...mapState({
      sysinfo: state => state.sysinfo
    })
  },
  methods: {
    imgOnload(item, index) {
      item.imgLoaded = true
      this.loadedCount++
      if (this.loadedCount === this.data.length) {
        this.data = [...this.data]
      }
    },
    toBuyLottery(item, i) {
      if (item.enable == 2) {
        this.$dialog.toast({ mes: '该彩种正在维护中···', timeout: 500 })
      } else {
        if (item.game_name === '足球') {
          this.$store.commit('football/FOOTBALL_SET_SPORT_ID', item.game_id)
        }
        this.$router.push({
          name: item.js_tag,
          params: {
            lotter_id: item.game_id,
            name_tag: item.tag,
            game_name: item.game_name,
            js_tag: item.js_tag,
            speed: item.speed,
            isHome: true,
            play_type: item.play_type
          }
        })
      }
    },
    classFun(val) {
      val == '11x5' && (val = 'eleven')
      val == '3d' && (val = 'sand')
      return val
    },
    startInterval(e, i) {
      if (this.indexFlag == 1 && i != 1) {
        clearTimeout(this.timer) // 防止重复注册事件
        this.timer = setTimeout(() => {
          this.val = i
        }, 1000)
      }
    },
    callback() {
      clearTimeout(this.timer)
    },
    toBetting(item, index) {
      this.$router.push({
        name: item.js_tag,
        params: {
          lotter_id: item.game_id,
          name_tag: item.tag,
          game_name: item.game_name,
          js_tag: item.js_tag
        }
      })
    },
    deleteBetting(e, i) {
      e.preventDefault && e.preventDefault()
      this.throwAway = i
      let _this = this
      setTimeout(() => {
        _this.throwAway = -1
        _this.data.splice(i, 1)
        if (!i) {
          let a = _this.data[1]
          _this.data[1] = _this.data[0]
          _this.data[0] = a
        }
        _this.val = -1
      }, 1000)
    },
    stopDefault(e) {
      e.preventDefault && e.preventDefault()
    }
  }
}
</script>
<style lang="scss" scoped>
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
.img-placeholder {
  width: 3.625rem;
  height: 3.625rem;
  position: relative;
  margin: 0;
  padding: 0;
  background: #eee;
  border-radius: 50%;
}
.shouye_lottery_content {
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    > li {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 33.3%;
      height: poTorem(140px);
      border-top: poTorem(1px) solid #f3f3f3;
      border-bottom: poTorem(1px) solid #f3f3f3;
      font-size: poTorem(16px);
      color: #333;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
      .text {
        font-size: poTorem(12px);
        color: #959595;
      }
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .contents {
        font-size: poTorem(16px);
        line-height: poTorem(32px);
      }
      .add_betting {
        padding-top: 1rem;
      }
      .icon {
        width: poTorem(58px);
        height: poTorem(58px);
        position: relative;
        img {
          width: 100%;
          border-radius: 50%;
        }
        .delete_betting {
          width: poTorem(20px);
          height: poTorem(20px);
          position: absolute;
          top: 0;
          right: 0;
          background-color: #fff;
        }
        .active {
          box-shadow: #333 poTorem(2px) poTorem(2px) poTorem(10px);
        }
        .lottery_disable {
          -webkit-filter: grayscale(100%);
          -moz-filter: grayscale(100%);
          -ms-filter: grayscale(100%);
          -o-filter: grayscale(100%);
          filter: grayscale(100%);
          filter: gray;
        }
      }
      .iconfont {
        width: poTorem(50px);
      }
    }
  }
}
</style>
