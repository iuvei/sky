<template>
  <div class="lottery_list">
    <div class="list_head">
      <span>热门彩票</span>
      <span class="phone_all_icon">
        <img src="../../../img/shouye/home_msg.png" alt="">
      </span>
    </div>
    <div class="list_content">
      <ul>
        <li v-for="(item, index) in data" :key="index" v-if="index<11">
          <a href="">
            <span class="icon" :style="{background:`url(${item.lottery_image})`}"></span>
            <span class="game_name">{{item.lottery_name}}</span>
            <span class="game_sum">全天{{item.lottery_date}}期</span>
          </a>
        </li>
        <li>
          <a href="">
            <span class="iconfont icon-jiahaoyou"></span>
            <span class="game_name">更多彩种</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      data: []
    }
  },
  methods: {
    ...mapActions(['setPlayItem'])
  },
  activated() {
    this.setPlayItem(null)
  }
}
</script>

<style lang="scss" scoped>
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
.list_head {
  width: poTorem(414px);
  height: poTorem(28px);
  display: flex;
  justify-content: space-between;
  padding: 0 poTorem(5px);
  box-sizing: border-box;
  align-items: center;
  font-size: poTorem(15px);
  background: #f3f3f3;
  font-weight: 600;
  .phone_all_icon {
    width: poTorem(20px);
    height: poTorem(20px);
    font-size: poTorem(20px);
    color: #ababab;
    img {
      width: poTorem(18px);
      height: poTorem(18px);
    }
  }
}
.list_content {
  > ul {
    width: poTorem(414px);
    height: poTorem(484px);
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    > li {
      > a {
        box-sizing: border-box;
        border-bottom: solid 1px #dbdbdb;
        width: poTorem(138px);
        height: poTorem(121px);
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding: poTorem(5px) 0;
        > .icon {
          width: poTorem(52px);
          height: poTorem(52px);
          border-radius: 50%;
        }
        .iconfont {
          font-size: poTorem(32px);
        }
        > .game_sum {
          font-size: poTorem(13px);
          color: #9c9c9c;
        }
      }
    }
  }
}
</style>
