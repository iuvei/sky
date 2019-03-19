<template>
  <yd-infinitescroll :callback="_callback"
                     ref="infinitescrollDemo">
    <yd-list theme="1"
             slot="list"
             class="yd_list">
      <ul class="left">
        <li class="title">
          <span>期号</span>
        </li>
        <li v-for="(item, index) in list"
            v-if="index >=0"
            :key="index">{{(item.qishu+'').substr(-4)}}期</li>
      </ul>
      <ul class="left_number">
        <li class="title">
          <span>平码</span>
        </li>
        <li v-for="(item,index) in list"
            :key="index"
            v-if="index >=0">
          <span class="clearance"
                v-if="item.balls.length">
            <i v-color>{{item.balls.length ? item.balls.split('+')[0] : '-'}}</i>
            <i v-color>{{item.balls.length ? item.balls.split('+')[1] : '-'}}</i>
            <i v-color>{{item.balls.length ? item.balls.split('+')[2] : '-'}}</i>
            <i v-color>{{item.balls.length ? item.balls.split('+')[3] : '-'}}</i>
            <i v-color>{{item.balls.length ? item.balls.split('+')[4] : '-'}}</i>
            <i v-color>{{item.balls.length ? item.balls.split('+')[5] : '-'}}</i>
          </span>
          <span v-if="!item.balls.length"
                style="color:#e33939;">
            正在开奖
          </span>
        </li>
      </ul>
      <ul class="left_number_tema">
        <li class="title">
          <span>特码</span>
        </li>
        <li v-for="(item,index) in list"
            :key="index"
            v-if="index >=0">
          <span>
            <i v-color>{{item.balls.length ? item.balls.split('+')[6]: '-'}}</i>
          </span>
        </li>
      </ul>
      <div class="right">
        <ul>
          <li v-for="(item,index) in dataprev"
              :key="index">{{item.text}}</li>
        </ul>
        <ul class="content"
            v-for="(item,index) in list"
            :key="index"
            v-if="index >=0">
          <li>{{item.balls?returnShengXiao(item.balls.split('+')[6], item.qishu):'-'}}</li>
          <li>{{item.balls?returnDanShuang(item.balls.split('+')[6]):'-'}}</li>
          <li>{{item.balls?returnColor(item.balls.split('+')[6]):'-'}}</li>
          <li>{{item.balls?returnAttribute(item.balls.split('+')[6], item.qishu):'-'}}</li>
          <li>{{item.balls?returnSpecialHead(item.balls.split('+')[6]):'-'}}头</li>
          <li>{{item.balls?returnMantissa(item.balls.split('+')[6]):'-'}}尾</li>
          <li>合{{item.balls?returnHeZhi(item.balls.split('+')[6]):'-'}}</li>
        </ul>
      </div>
    </yd-list>
    <!-- 数据全部加载完毕显示 -->
    <span slot="doneTip">不要在拉了,没有数据啦~~</span>
    <img slot="loadingTip"
         src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />
  </yd-infinitescroll>
</template>
<script>
import { mapState } from "vuex";
import { selectBalls } from "../../../../js/lhc.template";
// import index from "axios";
const redArr = [
    "01",
    "02",
    "07",
    "08",
    "12",
    "13",
    "18",
    "19",
    "23",
    "24",
    "29",
    "30",
    "34",
    "35",
    "40",
    "45",
    "46"
  ],
  blueArr = [
    "03",
    "04",
    "09",
    "10",
    "14",
    "15",
    "20",
    "25",
    "26",
    "31",
    "36",
    "37",
    "41",
    "42",
    "47",
    "48"
  ],
  greenArr = [
    "05",
    "06",
    "11",
    "16",
    "17",
    "21",
    "22",
    "27",
    "28",
    "32",
    "33",
    "38",
    "39",
    "43",
    "44",
    "49"
  ];
// 金   18, 19, 26, 27, 34, 35, 48, 49, '04', '05'
// 木   16, 17, 30, 31, 38, 39, 46, 47, '01', '08', '09'
// 水   14, 15, 22, 23, 36, 37, 44, 45, '06', '07'
// 火   10, 11, 24, 25, 32, 33, 40, 41, '02', '03'
// 土   12, 13, 20, 21, 28, 29, 42, 43
// const goldArr = ["04", "05", "18", "19", "26", "27", "34", "35", "48", "49"],
//   woodArr = ["01", "08", "09", "16", "17", "30", "31", "38", "39", "46", "47"],
//   waterArr = ["06", "07", "14", "15", "22", "23", "36", "37", "44", "45"],
//   theFireArr = ["02", "03", "10", "11", "24", "25", "32", "33", "40", "41"],
//   soilArr = ["12", "13", "20", "21", "28", "29", "42", "43"];
export default {
  directives: {
    color: {
      inserted(el) {
        if (redArr.includes(el.innerHTML)) {
          el.style.color = "#eb3349";
        } else if (blueArr.includes(el.innerHTML)) {
          el.style.color = "#00a0eb";
        } else if (greenArr.includes(el.innerHTML)) {
          el.style.color = "#30b16c";
        }
      }
    },
    ball: {
      inserted(el) {
        if (redArr.includes(el.innerHTML)) {
          el.style.backgroundColor = "#eb3349";
        } else if (blueArr.includes(el.innerHTML)) {
          el.style.backgroundColor = "#00a0eb";
        } else if (greenArr.includes(el.innerHTML)) {
          el.style.backgroundColor = "#30b16c";
        } else {
          el.style.color = "#535353";
        }
      }
    }
  },
  props: ["indexFlag", "datas"],
  data() {
    return {
      pullUp: false,
      routeLists: {},
      list: [],
      show: false,
      balls: [],
      timer: Function,
      content: [],
      val: "",
      pageid: 0,
      dataprev: [
        { text: "生肖" },
        { text: "单双" },
        { text: "色波" },
        { text: "五行" },
        { text: "特头" },
        { text: "尾数" },
        { text: "单双" }
      ]
    };
  },
  computed: {
    ...mapState(["betting"])
  },
  mounted() {
    this.routeList = this.$route.params;
    this.getData(this.datas.name_tag);
    this.name = this.datas.name_tag;
  },
  beforeUpdate() {},
  watch: {
    datas(val) {
      this.list = [];
      this.pageid = 0;
      this.getData(val.name_tag);
    }
  },
  filters: {},

  methods: {
    greet(val) {
      this.val = val;
    },
    returnHeZhi(balls) {
      const arr = [];
      let _balls = balls;
      if (typeof _balls === "string") {
        _balls = balls.split("");
      }
      const sum = parseInt(_balls[0]) + parseInt(_balls[1]);
      arr.push(sum % 2 == 0 ? "双" : "单");
      return arr.join("");
    },
    returnSpecialHead(balls) {
      const arr = [];
      let _balls = balls;
      if (typeof _balls === "string") {
        _balls = balls.split("");
      }
      const sum = parseInt(_balls[0], 10);
      arr.push(sum);
      return arr.join("");
    },
    returnMantissa(balls) {
      const arr = [];
      let _balls = balls;
      if (typeof _balls === "string") {
        _balls = balls.split("");
      }
      const sum = parseInt(_balls[1], 10);
      arr.push(sum);
      return arr.join("");
    },
    returnDanShuang(val) {
      let b;
      val % 2 == 0 ? (b = "双") : (b = "单");
      return b;
    },
    returnColor(val) {
      if (redArr.includes(val)) {
        return "红";
      } else if (blueArr.includes(val)) {
        return "蓝";
      } else if (greenArr.includes(val)) {
        return "绿";
      }
    },
    returnAttribute(val, qishu) {
      const { wuxing } = selectBalls(qishu);

      if (wuxing.wuxing_jin.balls.findIndex(el => el * 1 == val * 1) != -1) {
        return "金";
      } else if (
        wuxing.wuxing_mu.balls.findIndex(el => el * 1 == val * 1) != -1
      ) {
        return "木";
      } else if (
        wuxing.wuxing_shui.balls.findIndex(el => el * 1 == val * 1) != -1
      ) {
        return "水";
      } else if (
        wuxing.wuxing_huo.balls.findIndex(el => el * 1 == val * 1) != -1
      ) {
        return "火";
      } else if (
        wuxing.wuxing_tu.balls.findIndex(el => el * 1 == val * 1) != -1
      ) {
        return "土";
      }
    },
    returnShengXiao(val, qishu) {
      let yearid = this.datas.yearid;
      if (yearid == 0) {
        yearid = qishu > 2019014 ? yearid : 11;
      } else {
        yearid = qishu > 2019014 ? yearid : yearid - 1;
      }
      const shengxiao = selectBalls(yearid).shengxiao;
      for (const i in shengxiao) {
        if (shengxiao[i].balls.includes(val)) {
          return shengxiao[i].name;
        }
      }
    },
    getData(name) {
      this.$dialog.loading.open(" ");
      this.$ajax("request", {
        ac: "getKjCpLog",
        tag: name,
        date: 0,
        pcount: 20,
        pageid: this.pageid
      }).then(response => {
        this.$dialog.loading.close();
        const _list = response;
        if (this.pullUp) this.list = [...this.list, ..._list];
        else this.list = _list;
        if (_list.length < 20 || this.pageid == 19) {
          /* 所有数据加载完毕 */
          this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone");
          return;
        }
        /* 单次请求数据完毕 */
        this.pullUp = false;
        this.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad");
      });
    },
    _callback() {
      this.pullUp = true;
      this.pageid++;
      this.getData(this.name);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~css/resources.scss";
.yd_list {
  overflow: hidden;
  margin: 0;
  padding: 0;
  .left {
    float: left;
    list-style: none;
    width: 16%;
    li {
      width: 100%;
      height: poTorem(35px);
      font-size: poTorem(14px);
      line-height: poTorem(35px);
      color: rgb(103, 99, 99);
      text-align: center;
      border-top: poTorem(1px) solid rgb(221, 221, 221);
      border-right: poTorem(1px) solid rgb(221, 221, 221);
    }
    .title {
      height: poTorem(36px);
      @include around;
      border-top: poTorem(1px) solid rgb(221, 221, 221);
      border-right: poTorem(1px) solid rgb(221, 221, 221);
      span {
        display: inline-block;
        line-height: poTorem(36px);
        &:first-child {
          align-self: flex-end;
        }
        &:last-child {
          align-self: flex-start;
        }
      }
    }
  }
  .left_number {
    float: left;
    list-style: none;
    width: 42%;
    li {
      width: 100%;
      height: poTorem(35px);
      font-size: 0.9rem;
      line-height: poTorem(35px);
      color: rgb(103, 99, 99);
      text-align: center;
      display: flex;
      justify-content: space-around;
      border-top: poTorem(1px) solid rgb(221, 221, 221);
      border-right: poTorem(1px) solid rgb(221, 221, 221);
      .and_such {
        color: #e33939;
      }
      .Colorno {
        font-size: 0.9rem;
      }
      i {
        margin: 0.1rem;
      }
    }
    .title {
      height: poTorem(36px);
      @include around;
      border-top: poTorem(1px) solid rgb(221, 221, 221);
      border-right: poTorem(1px) solid rgb(221, 221, 221);
      span {
        display: inline-block;
        // width: poTorem(150px);
        line-height: poTorem(36px);
        &:first-child {
          align-self: flex-end;
        }
        &:last-child {
          align-self: flex-start;
        }
      }
    }
  }
  .left_number_tema {
    float: left;
    list-style: none;
    width: 10%;
    li {
      width: 100%;
      height: poTorem(35px);
      font-size: 0.9rem;
      line-height: poTorem(35px);
      color: rgb(103, 99, 99);
      text-align: center;
      display: flex;
      justify-content: space-around;
      border-top: poTorem(1px) solid rgb(221, 221, 221);
      border-right: poTorem(1px) solid rgb(221, 221, 221);
      .and_such {
        color: #e33939;
      }
      .Colorno {
        font-size: 0.9rem;
      }
    }
    .title {
      height: poTorem(36px);
      @include around;
      border-top: poTorem(1px) solid rgb(221, 221, 221);
      border-right: poTorem(1px) solid rgb(221, 221, 221);
      span {
        display: inline-block;
        width: poTorem(120px);
        line-height: poTorem(36px);
        &:first-child {
          align-self: flex-end;
        }
        &:last-child {
          align-self: flex-start;
        }
      }
    }
  }
  .right {
    float: right;
    overflow: auto;
    width: 32%;
    ul {
      @include between;
      width: 235%;
      li {
        flex: 1;
        text-align: center;
        height: poTorem(36px);
        font-size: 0.9rem;
        line-height: poTorem(36px);
        color: #666;
        border-top: poTorem(1px) solid rgb(221, 221, 221);
        border-right: poTorem(1px) solid rgb(221, 221, 221);
      }
    }
    .content {
      li {
        height: poTorem(35px);
        line-height: poTorem(35px);
      }
    }
  }
}
.left li:nth-child(odd) {
  background: #fff;
}
.left_number li:nth-child(odd) {
  background: #fff;
}
.left_number_tema li:nth-child(odd) {
  background: #fff;
}
.left li:nth-child(even) {
  background: rgb(238, 238, 238);
}
.left_number li:nth-child(even) {
  background: rgb(238, 238, 238);
}
.left_number_tema li:nth-child(even) {
  background: rgb(238, 238, 238);
}
.right ul:nth-child(odd) {
  background: #fff;
}
.right ul:nth-child(even) {
  background: rgb(238, 238, 238);
}
</style>
