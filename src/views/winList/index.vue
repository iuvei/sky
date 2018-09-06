<template>
  <div class="new_scroll">
    <AppHeader :title="title"></AppHeader>
    <div class="grid-head">
      <span>用户名</span>
      <span>中奖金额</span>
      <span>彩种</span>
    </div>
    <ul ref="scroll_ul">
      <li v-for="(item, index) in list" :key="index">
        <div>
          <div class="win_user">
            {{item.username.substr(0, 3)}}***
          </div>
          <div class="win_price">恭喜中{{item.win}}元</div>
          <div class="win_game">{{item.gamename}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "winList",
  data() {
    return {
      list: [],
      title: "中奖榜"
    };
  },
  activated() {
    let list = JSON.parse(sessionStorage.getItem("winlist"));
    if (list.res.length) {
      this.list = list.res;
    }
  }
};
</script>

<style lang="scss" scoped>
@function poTorem($px) {
  @return $px / 16px * 1rem;
}
.new_scroll {
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  .grid-head {
    display: flex;
    justify-items: center;
    height: 2rem;
    align-items: center;
    background-color: rgba(240, 240, 240, 1);
    > span {
      line-height: 2rem;
      text-align: center !important;
      font-size: poTorem(14px);
      font-weight: bold;
      width: 33%;
    }
  }
  .win_user,
  .win_price,
  .win_game {
    height: poTorem(28px);
    line-height: poTorem(28px);
    text-align: center;
    font-size: poTorem(14px);
  }
  .win_user {
    width: 20%;
  }
  .win_price {
    color: #f33;
    width: 50%;
  }
  .win_game {
    width: 30%;
    color: #666;
  }
  > ul {
    // display: flex;
    // flex-direction: column;
    height: calc(100vh - 5rem);
    // position: absolute;
    // top: 5rem;
    // overflow: hidden;
    overflow-y: scroll;
    // z-index: 1;
    li {
      display: block;
      width: 100%;
      height: poTorem(28px);
      line-height: poTorem(28px);
      box-sizing: border-box;
      > div {
        display: flex;
        justify-content: space-between;
        padding: 0 poTorem(10px);
        align-items: center;
      }
    }
  }
}
</style>

