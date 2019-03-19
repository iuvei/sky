<template>
  <div class="betting_right">
    <span v-if="showSinglePeilv"
          :class="[{'by_right':peilvIsRight},'odds']">( 赔率：{{peilv ? peilv : '-.- '}})</span>
    <div class="betting_con">
      <div class="con_item"
           v-for="(item,index) in dataSet"
           :key="index"
           v-if="curPlayItem.playid != 2">
        <span>{{item.name}}</span>
        <ul>
          <li @click.stop="clickBall(item, ball)"
              v-for="(ball, indexs) in item.data"
              :key="indexs"
              style="position:relative"
              :data-val="ball.value"
              class="ball">
            <div class="ball"
                 ref="ballOptions"
                 :class="[{choosed: ball.checked}]">{{ball.name}}</div>
            <div class="peilv_num"
                 v-if="peilvs.length">{{ball.peilv}}</div>
            <label for=""><input type="checkbox"
                     v-model="ball.checked"></label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "betting-content",
  props: [
    "dataSet",
    "showSinglePeilv",
    "peilvIsRight",
    "curPlayItem",
    "peilv",
    "peilvs",
    "isDanshi"
  ],
  methods: {
    clickBall(item, ball) {
      this.$emit("filter", item, ball);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../css/resources.scss";
.betting_right {
  flex: 1;
  display: block;
  overflow: scroll;
  .select {
    @include center;
    width: poTorem(240px);
    height: poTorem(39px);
    border: poTorem(1px) solid #eaeaea;
    border-radius: poTorem(5px);
    font-size: poTorem(16px);
    color: #434343;
    position: relative;
    margin: 0 auto;
    margin-top: poTorem(15px);
    .icon {
      position: absolute;
      background: url(~img/goucai/sanjiao.png) no-repeat;
      background-size: contain;
      width: poTorem(29px);
      height: poTorem(14px);
      right: 0px;
    }
  }
  .odds {
    color: #535353;
    margin: poTorem(10px) 0 0px 0;
    font-size: poTorem(14px);
    display: block;
    text-align: center;
  }
  .by_right {
    text-align: right;
  }
}
.betting_con {
  @include column;
  width: 100%;
  .con_item {
    width: 100%;
    @include column;
    border-bottom: poTorem(1px) solid #dbdbdb;
    padding: 0 poTorem(18px);
    margin-top: poTorem(5px);
    &:last-child {
      border-bottom: none;
    }
    span {
      align-self: flex-start;
      color: #707070;
      font-size: poTorem(16px);
    }
    ul {
      @include start;
      flex-wrap: wrap;
      margin-bottom: poTorem(10px);
      li {
        @include center;
        width: poTorem(48px);
        height: poTorem(48px);
        border-radius: 50%;
        background: #fff;
        margin-left: poTorem(16px);
        margin-top: poTorem(10px);
        border: poTorem(1px) solid #dbdbdb;
        font-size: poTorem(22px);
        color: #e33939;
        font-weight: 900;
      }
      li.ball {
        border: none;
        height: auto;
        flex-wrap: wrap;
        > div:nth-child(1) {
          @include center;
          width: poTorem(48px);
          height: poTorem(48px);
          border-radius: 50%;
          background: #fff;
          border: poTorem(1px) solid #dbdbdb;
          font-size: poTorem(22px);
          color: #e33939;
          font-weight: 900;
        }
        > div:nth-child(2) {
          width: 100%;
          height: 2rem;
          line-height: 2rem;
          text-align: center;
          font-size: poTorem(12px);
          color: #707070;
        }
        > label {
          width: 100%;
          height: 100%;
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          input {
            opacity: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
        }
      }
      li.lhd-item {
        width: 100%;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-evenly;
        border: none;
        margin: 0;
        align-items: center;
        padding: 1.6rem 0;
        > span {
          padding: 0 1.1rem;
          line-height: 2;
          border: 1px solid #ccc;
          border-radius: 4px;
          align-self: unset;
          color: #e33939;
          user-select: none;
        }
        > span:nth-child(2) {
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          line-height: 2rem;
          text-align: center;
          padding: 0;
          color: #707070;
        }
      }
      .choosed {
        background-color: #e33939 !important;
        color: #fff !important;
        border: poTorem(1px) solid #e33939 !important;
      }
    }
    ul.smp {
      justify-content: center;
      li {
        margin-bottom: poTorem(20px);
        position: relative;
        span {
          position: absolute;
          bottom: -1.4rem;
          left: 0;
          display: block;
          text-align: center;
          width: 100%;
          user-select: none;
        }
      }
      li.choosed {
        background-color: #e33939;
        color: #fff !important;
        border: poTorem(1px) solid #e33939 !important;
      }
    }
  }
}
</style>
