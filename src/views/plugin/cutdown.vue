<template>
  <div class="content"
       :tag="tag"
       :datas="datas"
       :indexs="indexs">
    <div class="content_top">
      <span>{{data.game_name}}</span>
      <span v-for="(item,index) in data.prev"
            :key="index"
            v-if="index == 0">
        第{{item.qishu}}期
      </span>
    </div>
    <div class="content_middle">
      <!--ssc -->
      <span v-if="data.js_tag=='ssc'"
            v-for="(item,index) in balls"
            :key="index"
            :class="[{active: item == ''},classFun(data.js_tag)]">
        {{item == '' ? '正在开奖...' : item }}
      </span>
      <!-- k3 -->
      <span v-if="data.js_tag=='k3'"
            v-for="(item,index) in balls"
            :key="index"
            :class="[{active: item == ''},classFun(data.js_tag),`kt${item}`]">
        {{item == '' ? '正在开奖...' : '' }}
      </span>
      <!-- pk10 -->
      <span v-if="data.js_tag=='pk10'"
            v-for="(item,index) in balls"
            :style="{background: item != '' && (
        colorArry[parseInt(Math.random()*10-1)]
        )}"
            :key="index"
            :class="[{active: item == ''},classFun(data.js_tag)]">
        {{item == '' ? '正在开奖...' : item }}
      </span>
      <!-- 6hc -->
      <span v-if="data.js_tag=='lhc'"
            :style="{background:`${ballToColor(parseInt(item))}`}"
            v-for="(item,index) in balls"
            :key="index"
            :class="[{active: item == ''},classFun(data.js_tag)]">
        <i v-if="index == 5 && item != ''">+</i>
        {{item == '' ? '正在开奖...' : item }}
      </span>
      <!-- pcdd -->
      <span v-if="data.js_tag=='pcdd'"
            v-for="(item,index) in balls"
            :key="index"
            :class="[{active: item == ''},classFun(data.js_tag)]">
        <i v-if="index == 2 && item != ''">=</i>
        <i v-if="index == 0 && item != ''">+</i>
        <i v-if="index == 1 && item != ''">+</i>
        {{item == '' ? '正在开奖...' : item }}
      </span>
      <!-- 11xuan5 -->
      <span v-if="data.js_tag=='11x5'"
            v-for="(item,index) in balls"
            :key="index"
            :class="[{active: item == ''},classFun(data.js_tag)]">
        {{item == '' ? '正在开奖...' : item }}
      </span>
      <!-- 3d -->
      <span v-if="data.js_tag=='3d'"
            v-for="(item,index) in balls"
            :key="index"
            :class="[{active: item == ''},classFun(data.js_tag)]">
        {{item == '' ? '正在开奖...' : item }}
      </span>
    </div>
    <div class="content_bottom">
      <span v-for="(item,index) in data.next"
            :key="index"
            v-if="index == 0">
        距离第{{item.qishu}}期截止还有:
      </span>
      <span>{{content}}</span>
    </div>
  </div>
</template>
<script>
import { BallToColor2 } from "../../js/xglhc.data.2017";
function secondsFormat(s) {
  const day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整
  let hour = Math.floor((s - day * 24 * 3600) / 3600);
  let minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
  let second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
  if (day > 0 || hour > 0) {
    hour = Math.floor(s / 3600);
    minute = Math.floor((s - hour * 3600) / 60);
    second = s - hour * 3600 - minute * 60;
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return hour + ":" + minute + ":" + second;
  }
  if (day <= 0 && hour <= 0) {
    minute = Math.floor(s / 60);
    second = s - minute * 60;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return "00:" + minute + ":" + second;
  }
}
export default {
  props: {
    tag: String,
    datas: Array,
    indexs: Number
  },
  data() {
    return {
      data: {},
      balls: Array,
      timer: Function,
      content: "",
      colorArry: [
        "#E4E600",
        "#2964AE",
        "#868B8B",
        "#F09635",
        "#7BCCDF",
        "#2A479E",
        "#CACBCC",
        "#E63339",
        "#411E21",
        "#4EB233"
      ]
    };
  },
  mounted() {
    this.data = this.datas[this.indexs];
    this.balls = this.datas[this.indexs].prev[0].balls.split(" ");
    this.cutDown(this.datas[this.indexs].next[0].jiezhitime);
  },
  methods: {
    getDatas() {
      this.$ajax("request", {
        ac: "getCPLogInfo2",
        tag: this.tag,
        pcount: 10,
        ncount: 100
      }).then(res => {
        // console.log('尼玛坑比啊',res)
        this.data = res;
        this.balls = res.prev[0].balls.split(" ");
        this.cutDown(res.next[0].jiezhitime);
      });
    },
    cutDown(timestamp) {
      let times = timestamp;
      this.timer = setInterval(() => {
        if (times > 0) {
          this.content = secondsFormat(times);
        } else {
          clearInterval(this.timer);
          this._callback();
        }
        times--;
      }, 1000);
    },
    _callback() {
      this.getDatas();
    },
    classFun(val) {
      val == "11x5" && (val = "eleven");
      val == "3d" && (val = "sand");
      return val;
    },
    ballToColor(number) {
      return BallToColor2(number);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../css/resources.scss";
.content {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  .content_middle {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    span {
      margin: poTorem(5px);
      width: poTorem(25px);
      height: poTorem(25px);
      border-radius: 50%;
      background: #e9344a;
      color: #fff;
      text-align: center;
      line-height: poTorem(25px);
      font-size: poTorem(14px);
    }
    .ssc {
      background: url(~img/balls.png);
      background-size: contain;
      color: rgb(158, 0, 0);
    }
    .pk10 {
      border-radius: 0;
    }
    .lhc {
      position: relative;
      &:last-child {
        margin-left: poTorem(15px);
      }
      i {
        position: absolute;
        right: poTorem(-26px);
        color: #939496;
        margin: 0 poTorem(10px);
        font-size: poTorem(20px);
        font-weight: bolder;
      }
    }
    @each $animal in 1, 2, 3, 4, 5, 6 {
      .kt#{$animal} {
        background: url("~img/saizi_0#{$animal}.png");
        background-size: contain;
      }
    }

    .pcdd {
      background: #a8a9aa;
      position: relative;
      margin-left: poTorem(15px);
      &:last-child {
        background: #e9344a;
      }
      i {
        position: absolute;
        right: poTorem(-26px);
        color: #939496;
        margin: 0 poTorem(10px);
        font-size: poTorem(20px);
        font-weight: bolder;
      }
    }
    .kt1 {
    }
    .active {
      background: #fff !important;
      color: #f33;
      width: 100%;
      text-align: left;
      font-size: poTorem(18px);
    }
  }
  .content_top {
    height: poTorem(28px);
    line-height: poTorem(28px);
    font-size: poTorem(14px);
    span:last-child {
      color: #666;
    }
  }
  .content_bottom {
    height: poTorem(24px);
    font-size: poTorem(12px);
    span:first-child {
      color: #666;
    }
    span:last-child {
      color: #f33;
    }
  }
  > div {
    width: poTorem(294px);
    display: flex;
    justify-content: space-between;
  }
}
</style>
