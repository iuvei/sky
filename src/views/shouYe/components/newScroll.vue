<template>
  <div class="new_scroll" @click="$router.push('/winList')">
    <div class="scroll_head">
      <span>最新中奖榜</span>
    </div>
    <ul ref="scroll_ul" :style="{ transform:`translateY(${top})`, transition }">
      <li v-for="(item,index) in winData" :key="index">
        <div>
          <div class="win_user">
            <span></span>
            <span>{{item.username.substr(0, 3)}}***</span>
          </div>
          <div class="win_price">恭喜中{{item.win}}元</div>
          <div class="win_game">{{item.gamename}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import api from '../../../../api/lottery'
export default {
  name: 'newScroll',
  data() {
    return {
      activeIndex: 0,
      winData: []
    }
  },
  computed: {
    top() {
      return -this.activeIndex * 28 / 16 + 'rem'
    },
    transition() {
      return this.activeIndex === 0 ? 'none' : 'all 1s'
    }
  },
  async mounted() {
    await this.getData()
  },
  methods: {
    async getData() {
      let res = await api.getUserWinList()
      if (res && Array.isArray(res.res) && res.res.length) {
        this.winData = res.res

        let scroll_ul = res.res.length / 2
        setInterval(_ => {
          if (this.activeIndex < scroll_ul) {
            this.activeIndex += 1
          } else {
            this.activeIndex = 0
          }
        }, 2000)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@function poTorem($px) {
  @return $px / 16px * 1rem;
}

.new_scroll {
  height: poTorem(134px);
  overflow: hidden;
  position: relative;

  background-color: #fff;
  .scroll_head {
    position: relative;
    z-index: 1;
    width: 100%;
    height: poTorem(28px);
    background: #f3f3f3;
    display: flex;
    align-items: center;
    padding-left: poTorem(10px);
    span {
      font-size: poTorem(13px);
      font-weight: 600;
    }
  }
  > ul {
    z-index: -9;
    height: poTorem(106px);
    width: 100%;
    li {
      display: inline-block;
      width: 100%;
      height: poTorem(28px);
      line-height: poTorem(28px);
      box-sizing: border-box;
      > div {
        display: flex;
        justify-content: space-between;
        padding: 0 poTorem(10px);
        align-items: center;
        .win_user {
          display: flex;
          align-items: center;
          width: 25%;
          > span:first-child {
            width: poTorem(28px);
            height: poTorem(28px);
            display: inline-block;
            background: url(../../../img/main_win_icon.png) center no-repeat;
            background-size: auto 60%;
          }
          span {
            font-size: poTorem(14px);
            color: #666;
          }
        }
        .win_price {
          width: 45%;
          font-size: poTorem(14px);
          color: #f33;
        }
        .win_game {
          width: 30%;
          font-size: poTorem(14px);
          color: #666;
        }
      }
    }
  }
}
</style>
