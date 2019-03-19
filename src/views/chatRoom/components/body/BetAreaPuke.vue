<template>
  <div class="k3-betting-area">
    <span :class="['odds']"
          v-if="odds && odds.length === 1">( 赔率：{{odds[0]}} )</span>
    <div class="betting_con">
      <!-- 循环投注页面 -->
      <div class="con_item"
          :style="{width: 'poTorem('+ item.width+')px',height: 'poTorem('+item.height+')px'}"
          @click="clickBall(item, item.value)"
          :class="{'choosed':item.checked}"
           v-for="(item,index) in dataSet"
           :key="index">
        <!-- 包选 -->
        <p class="tit" v-if="item.playid === 1">{{item.name}}</p>
        <div class="lizi" v-if="item.data.tit">
          <span class="text">{{item.data.tit}}</span>
          <span class="card-img" v-for="(card, cardIdx) in item.data.data" :key="cardIdx">
            <img :src="require('../../../../img/puke/card/'+ card +'.png')" alt="">
          </span>
        </div>
        <!-- 单选 -->
        <div class="dx-area" v-if="[2,3,4].includes(item.playid)">
          <span class="item-img" v-for="(card, cardIds) in item.data" :key="cardIds">
            <img :src="require('../../../../img/puke/dx/'+ card + '.png')" alt="">
          </span>
        </div>
        <div class="card-ths" v-if="[5,6].includes(item.playid)">
          <span class="item-img">
            <img :src="require('../../../../img/puke/big/'+ item.data +'.png')" alt="">
          </span>
          <span class="item-txt" v-if="item.playid === 6">顺子</span>
        </div>
        <!-- 任选 -->
        <div class="card-rx" v-if="item.playid>6">
          <img :src="require('../../../../img/puke/dx/' + item.data +'.png')" alt="">
          <!-- {{item.data}} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "puke_chat_room_bet_area",
  props: ["curPlayItem", "dataSet", "odds"],
  data() {
    return {
      show: false
    };
  },
  methods: {
    changeList(item, index) {
      this.$emit("changeList", item, index);
    },
    clickBall(item, value) {
      item.checked = !item.checked;
      this.$emit("clickBall", item, value);
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.userinfo.isLogin
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.k3-betting-area {
  height: 75vw;
  background: #f3f3f3;
  flex: 1;
  display: block;
  overflow: hidden;
  overflow-y: scroll;
  .odds {
    margin: poTorem(10px) 0 0px 0;
    font-size: 1rem;
    color: #878787;
    display: block;
    text-align: center;
  }
  .by_right {
    text-align: right;
  }
  .betting-area_bottom {
    position: fixed;
    bottom: poTorem(65px);
    width: 100%;
  }
  .tip {
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 5rem;
    text-align: center;
    margin: 6px 0;
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    border-right-style: none;
    position: relative;
    &:after {
      content: " ";
      position: absolute;
      top: poTorem(3px);
      right: poTorem(-9px);
      border-width: 0 1px 1px 0;
      border-style: solid;
      border-radius: 4px;
      border-color: #ccc;
      -webkit-transform: rotate(45deg);
      transform: rotate(-45deg);
      width: 1.5rem;
      height: 1.5rem;
      background: #fff;
    }
  }
}
 .choosed {
  border: 1px solid red !important;
  border-radius: 5px !important;
}
.betting_con {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: poTorem(10px) poTorem(15px);
  .con_item {
    background-color: #fff;
    border: 1px dashed gray;
    border-radius: 5px;
    // width: poTorem(120px);
    // min-width: 100px;
    // height: poTorem(115px);
    margin-top: poTorem(15px);
    .tit{
      text-align: center;
      width: 100%;
      height: poTorem(55px);
      line-height: poTorem(55px);
      font-size: poTorem(25px);
      color: red;
    }
    .lizi{
      display: flex;
      align-self: center;
      .text{
        display: inline-block;
        width: poTorem(25px);
        text-align: center;
        font-size: poTorem(20px);
        color: gray;
      }
      .card-img{
        img{
          display: inline-block;
          width: 25px;
        }
      }
    }
    .dx-area{
      margin: poTorem(10px);
      display: flex;
      align-items: center;
      padding-left: poTorem(14px);
      .item-img{
        margin-left: poTorem(-14px);;
        img{
          display: inline-block;
          width: poTorem(40px);
        }
      }
    }
    .card-ths{
      display: flex;
      width: poTorem(85px);
      height: poTorem(120px);
      align-items: center;
      justify-content: center;
      position: relative;
      .item-txt{
          position: absolute;
          bottom: poTorem(5px);
      }
      .item-img{
        img{
          width: poTorem(55px);
        }
      }
      
    }
    .card-rx{
      display: flex;
      padding: poTorem(15px);
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
